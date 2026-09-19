/* Echoform — camada de compatibilidade com o Google Chrome (content script).

   Carregado ANTES do content.js e SÓ pelo manifest do Chrome
   (manifest.chrome.json). Este arquivo nunca entra no pacote do Firefox, onde
   o content.js continua funcionando exatamente como sempre funcionou.

   Faz duas coisas:

   1) Shim do namespace `browser`. O content.js foi escrito pro Firefox e chama
      `browser.storage`, `browser.runtime` etc. O Chrome só expõe `chrome`, que
      em Manifest V3 devolve Promises quando chamado sem callback — o mesmo
      contrato que o content.js espera.

   2) Proxy de fetch cross-origin. No Firefox o content script herda as
      host_permissions e consegue chamar Firebase/Firestore/Drive/is.gd/etc.
      direto. No Chrome (MV3) o fetch de um content script obedece ao CORS da
      PÁGINA (curators.musixmatch.com), então essas chamadas seriam bloqueadas.
      Aqui o window.fetch DO MUNDO ISOLADO do content script (a página não é
      afetada) manda essas requisições pro service worker (ver
      'mxm-log-fetch-proxy' em background.js), que tem os privilégios das
      host_permissions, e reconstrói uma Response normal com o resultado. O
      content.js não precisa saber que existe proxy.

   Requisições pra qualquer outro host (inclusive o próprio curators.musixmatch
   .com, que precisa dos cookies da página) continuam no fetch nativo. */
(function () {
  'use strict';

  const g = globalThis;

  // Sinalizador lido pelo content.js (globalThis.MXM_IS_CHROME). No Firefox
  // este arquivo não é carregado, então o valor lá fica undefined (= falso).
  g.MXM_IS_CHROME = true;

  if (typeof g.browser === 'undefined' && typeof g.chrome !== 'undefined') {
    g.browser = g.chrome;
  }

  // Precisa espelhar HOSTS_PROXY_FETCH de background.js (que também é a
  // barreira de segurança: o background recusa qualquer host fora da lista).
  // Não inclui api.frankfurter.dev de propósito — esse host não está nas
  // host_permissions e tem CORS liberado, então segue pelo fetch nativo.
  const HOSTS_PROXY = new Set([
    'economia.awesomeapi.com.br',
    'identitytoolkit.googleapis.com',
    'securetoken.googleapis.com',
    'firestore.googleapis.com',
    'www.googleapis.com',
    'is.gd',
    'itunes.apple.com',
    'api.deezer.com',
  ]);

  const STATUS_SEM_CORPO = new Set([101, 204, 205, 304]);

  const fetchNativo = typeof g.fetch === 'function' ? g.fetch.bind(g) : null;
  if (!fetchNativo || !g.chrome || !g.chrome.runtime) return;

  function cabecalhosParaObjeto(h) {
    const saida = {};
    if (!h) return saida;
    if (Array.isArray(h)) {
      for (const par of h) saida[par[0]] = par[1];
    } else if (typeof h.forEach === 'function') {
      h.forEach((valor, nome) => {
        saida[nome] = valor;
      });
    } else {
      Object.assign(saida, h);
    }
    return saida;
  }

  function base64ParaBytes(b64) {
    const binario = atob(b64);
    const bytes = new Uint8Array(binario.length);
    for (let i = 0; i < binario.length; i++) bytes[i] = binario.charCodeAt(i);
    return bytes;
  }

  function erroDeAborto() {
    return new DOMException('The operation was aborted.', 'AbortError');
  }

  g.fetch = function fetchComProxy(input, init) {
    // só strings/URL entram no proxy; Request e afins seguem no fetch nativo.
    if (typeof input !== 'string' && !(input instanceof URL)) return fetchNativo(input, init);

    let url;
    try {
      url = new URL(String(input), g.location && g.location.href);
    } catch (e) {
      return fetchNativo(input, init);
    }
    if (url.protocol !== 'https:' || !HOSTS_PROXY.has(url.hostname)) return fetchNativo(input, init);

    const opcoes = init || {};
    const headers = cabecalhosParaObjeto(opcoes.headers);
    let corpo = opcoes.body;

    if (corpo != null) {
      if (typeof URLSearchParams !== 'undefined' && corpo instanceof URLSearchParams) {
        if (!Object.keys(headers).some((k) => k.toLowerCase() === 'content-type')) {
          headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        }
        corpo = corpo.toString();
      } else if (typeof corpo !== 'string') {
        // Blob/FormData/ArrayBuffer: o proxy só transporta texto. O content.js
        // hoje só manda string, mas se isso mudar, cai no fetch nativo (que
        // pode falhar por CORS) em vez de corromper o corpo em silêncio.
        return fetchNativo(input, init);
      }
    }

    const sinal = opcoes.signal || null;
    if (sinal && sinal.aborted) return Promise.reject(erroDeAborto());

    return new Promise((resolve, reject) => {
      let concluido = false;
      const aoAbortar = () => {
        if (concluido) return;
        concluido = true;
        reject(erroDeAborto());
      };
      if (sinal) sinal.addEventListener('abort', aoAbortar, { once: true });

      const finalizar = () => {
        if (sinal) sinal.removeEventListener('abort', aoAbortar);
      };

      g.chrome.runtime
        .sendMessage({
          type: 'mxm-log-fetch-proxy',
          url: url.href,
          method: opcoes.method || 'GET',
          headers,
          body: corpo == null ? null : corpo,
          cache: opcoes.cache || 'default',
        })
        .then((resposta) => {
          if (concluido) return;
          concluido = true;
          finalizar();

          if (!resposta || resposta.ok !== true) {
            reject(new TypeError((resposta && resposta.erro) || 'Failed to fetch'));
            return;
          }

          let corpoResposta = null;
          if (!STATUS_SEM_CORPO.has(resposta.status)) {
            if (typeof resposta.bodyB64 === 'string') corpoResposta = base64ParaBytes(resposta.bodyB64);
            else if (typeof resposta.bodyText === 'string') corpoResposta = resposta.bodyText;
          }
          try {
            resolve(
              new Response(corpoResposta, {
                status: resposta.status,
                statusText: resposta.statusText || '',
                headers: resposta.headers || [],
              })
            );
          } catch (erro) {
            reject(new TypeError(String((erro && erro.message) || erro)));
          }
        })
        .catch((erro) => {
          if (concluido) return;
          concluido = true;
          finalizar();
          reject(new TypeError(String((erro && erro.message) || erro) || 'Failed to fetch'));
        });
    });
  };
})();
