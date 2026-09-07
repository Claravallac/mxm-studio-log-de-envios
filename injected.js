/* MXM Studio - Log de Envios — script injetado no MUNDO REAL da
   página (não no content script, que roda isolado no Firefox).
   Trabalho: grampear o window.fetch (e o XMLHttpRequest) verdadeiros da
   página pra pegar respostas de rede que interessam ao script e repassar
   pro content script via CustomEvent (window.postMessage/CustomEvent é a
   única ponte possível entre os dois mundos). Equivale ao que o userscript
   fazia com unsafeWindow.fetch.

   Grampeia especificamente o richsync da IA (p/miss/v1/batch),
   track.lyrics.get e track.lyrics.validate (candidatos a fonte de rede pro
   corpo real da letra, cobrindo fetch E XHR), e também TODA resposta JSON
   de curators.musixmatch.com enquanto a tela é de Sincronização
   (mode=sync) — repassando tudo pro content script guardar num só lugar e
   avisar automaticamente se achar chave suspeita de estrutura em
   qualquer uma. */
(function () {
  'use strict';

  if (window.__mxmLogEnviosRichsyncInstalado) return;
  window.__mxmLogEnviosRichsyncInstalado = true;

  // URLs que interessam, além do richsync — e o nome do endpoint que vai
  // junto no CustomEvent, pra content.js separar get de validate.
  function endpointDeLetraOuNull(url) {
    if (url.indexOf('track.lyrics.validate') !== -1) return 'validate';
    if (url.indexOf('track.lyrics.get') !== -1) return 'get';
    return null;
  }

  function despacharCandidatoDeLetra(endpoint, url, data) {
    window.dispatchEvent(
      new CustomEvent('mxm-log-envios-lyrics-endpoint', { detail: { endpoint, url, data } })
    );
  }

  function estaNaTelaDeSincronizacao() {
    try {
      return new URLSearchParams(window.location.search).get('mode') === 'sync';
    } catch (e) {
      return false;
    }
  }

  function despacharRespostaDeRedeAmpla(url, data) {
    if (!estaNaTelaDeSincronizacao()) return;
    if (
      url.indexOf('curators.musixmatch.com') === -1 &&
      url.indexOf('curators-beta.musixmatch.com') === -1
    )
      return;
    window.dispatchEvent(new CustomEvent('mxm-log-envios-resposta-rede', { detail: { url, data } }));
  }

  // ---------- fetch ----------
  const fetchOriginal = window.fetch;
  if (typeof fetchOriginal === 'function') {
    window.fetch = function (...args) {
      const url = args[0] && args[0].toString ? args[0].toString() : String(args[0] || '');
      const promessa = fetchOriginal.apply(this, args);
      if (url.indexOf('/p/miss/v1/batch') !== -1) {
        promessa
          .then((res) => res.clone().json())
          .then((data) => {
            window.dispatchEvent(new CustomEvent('mxm-log-envios-richsync', { detail: data }));
          })
          .catch(() => {});
      }
      const endpointLetra = endpointDeLetraOuNull(url);
      if (endpointLetra) {
        promessa
          .then((res) => res.clone().json())
          .then((data) => despacharCandidatoDeLetra(endpointLetra, url, data))
          .catch(() => {});
      }
      // captura ampla — roda em paralelo às específicas acima, sem
      // atrapalhar (só mais um .then() na mesma promessa clonada).
      promessa
        .then((res) => res.clone().json())
        .then((data) => despacharRespostaDeRedeAmpla(url, data))
        .catch(() => {});
      return promessa;
    };
  }

  // ---------- XMLHttpRequest ----------
  const xhrOpenOriginal = XMLHttpRequest.prototype.open;
  const xhrSendOriginal = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (method, url, ...resto) {
    this.__mxmUrl = url && url.toString ? url.toString() : String(url || '');
    return xhrOpenOriginal.call(this, method, url, ...resto);
  };

  XMLHttpRequest.prototype.send = function (...args) {
    const url = this.__mxmUrl || '';
    const endpointLetra = endpointDeLetraOuNull(url);
    this.addEventListener('load', function () {
      try {
        const contentType = this.getResponseHeader('content-type') || '';
        if (contentType.indexOf('json') === -1) return;
        const data = JSON.parse(this.responseText);
        if (endpointLetra) despacharCandidatoDeLetra(endpointLetra, url, data);
        despacharRespostaDeRedeAmpla(url, data);
      } catch (e) {
        /* não é JSON, ignora */
      }
    });
    return xhrSendOriginal.apply(this, args);
  };
})();
