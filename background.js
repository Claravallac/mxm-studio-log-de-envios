'use strict';

// Espelha as ações que no userscript (Tampermonkey) eram registradas com
// GM_registerMenuCommand — aqui viram itens de browser.menus no ícone da
// extensão (contexts: ['action']), cada um repassado ao content script via
// mensagem (ver MENU_ACOES em content.js).
const MENUS = [
  { id: 'config', title: 'Abrir configurações' },
  { id: 'exportar', title: 'Exportar log (.txt)' },
  { id: 'backup_exportar', title: 'Exportar backup completo (.json)' },
  { id: 'backup_importar', title: 'Importar backup completo (.json)' },
  { id: 'console', title: 'Ver log no console' },
  { id: 'manual', title: 'Ativar/desativar modo manual' },
  // atalho direto pro retrato ao vivo do mês em andamento (mesma
  // ação do botão "Ver resumo agora" na aba Reward do painel — ver
  // abrirResumoAtual e MENU_ACOES.resumo_agora em content.js).
  { id: 'resumo_agora', title: 'Ver resumo mensal agora' },
];

// idiomas disponíveis no script — mantido em sincronia manual com
// IDIOMAS_DISPONIVEIS em content.js (não dá pra importar/compartilhar
// direto entre background e content script).
const IDIOMAS = [
  { codigo: 'pt', nome: 'Português' },
  { codigo: 'en', nome: 'English' },
  { codigo: 'el', nome: 'Ελληνικά' },
];

const MENUS_FINAIS = [
  ...MENUS,
  { id: 'idioma', title: 'Idioma' },
  ...IDIOMAS.map((idioma) => ({
    id: 'idioma_' + idioma.codigo,
    parentId: 'idioma',
    title: idioma.nome,
  })),
  { id: 'tour', title: 'Rever tour inicial' },
  { id: 'limpar', title: 'Limpar log' },
];

async function setupMenus() {
  await browser.menus.removeAll();
  for (const item of MENUS_FINAIS) {
    const props = {
      id: item.id,
      title: item.title,
      contexts: ['action'],
    };
    if (item.parentId) props.parentId = item.parentId;
    await browser.menus.create(props);
  }
}

function sendToTab(tabId, acao) {
  browser.tabs.sendMessage(tabId, { type: 'mxm-log-menu', acao }).catch(() => {});
}

setupMenus();
browser.runtime.onInstalled.addListener(setupMenus);
browser.runtime.onStartup.addListener(setupMenus);

const AMO_ADDON_SLUG = 'mxm-studio-log';
const AMO_API_URL = `https://addons.mozilla.org/api/v5/addons/addon/${AMO_ADDON_SLUG}/`;
const AMO_API_TIMEOUT_MS = 8000;

async function checarAtualizacaoAmo() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), AMO_API_TIMEOUT_MS);
  try {
    const res = await fetch(AMO_API_URL, {
      signal: controller.signal,
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    const versaoRemota = data && data.current_version && data.current_version.version;
    if (!versaoRemota) throw new Error('resposta da AMO sem current_version.version');
    // release_notes é opcional — só vem preenchido se o autor escreveu
    // alguma coisa no campo "Release Notes" ao publicar essa versão na
    // AMO. É um objeto traduzido por idioma (ex. {"en-US": "...", "pt-BR": "..."}),
    // não uma string única — quem consome decide o idioma.
    const notas = (data && data.current_version && data.current_version.release_notes) || null;
    return { ok: true, versaoRemota: String(versaoRemota), notas };
  } catch (erro) {
    return { ok: false, erro: String((erro && erro.message) || erro) };
  } finally {
    clearTimeout(timeoutId);
  }
}

browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || msg.type !== 'mxm-log-check-update') return undefined;
  checarAtualizacaoAmo().then(sendResponse);
  return true; // mantém o canal aberto pra resposta assíncrona
});

// IMPORTANTE — testado e confirmado na prática: browser.runtime.requestUpdateCheck()
// NÃO existe no Firefox (é uma API só do Chrome/Chromium; chamar isso aqui
// sempre lança "TypeError: browser.runtime.requestUpdateCheck is not a
// function", em qualquer instalação, sempre). Por isso não dá pra "pedir"
// ao Firefox que cheque agora — só dá pra ESCUTAR quando ele mesmo (sozinho,
// no timer periódico dele, ou por causa de alguém clicar em "Verificar
// atualizações" no about:addons) já tiver baixado e preparado uma versão
// nova. runtime.onUpdateAvailable esse sim existe e funciona no Firefox —
// então em vez de tentar forçar, mantemos um listener permanente (não só
// durante um clique no botão) escutando esse evento a vida toda da
// extensão: assim que ele disparar por QUALQUER motivo, aplicamos sozinhos
// com runtime.reload(), sem esperar o usuário reiniciar o navegador nem
// visitar about:addons/AMO manualmente.
let atualizacaoAplicada = false;
function aplicarAssimQuePronta() {
  if (atualizacaoAplicada) return;
  atualizacaoAplicada = true;
  // pequeno atraso só pra não competir com uma resposta sendo entregue
  // nesse exato instante (ver mensagem 'mxm-log-apply-update' abaixo).
  setTimeout(() => browser.runtime.reload(), 150);
}
browser.runtime.onUpdateAvailable.addListener(aplicarAssimQuePronta);

// browser.management.getSelf() não precisa de nenhuma permissão extra
// (ver MDN) e devolve installType — pra uma extensão carregada via
// about:debugging > "Carregar extensão temporária" isso vem como
// 'development'. É um caso especial importante: o Firefox NÃO gerencia
// atualização automática pra instalação temporária de jeito nenhum — o
// evento onUpdateAvailable nunca dispara aqui, pra sempre, não importa o
// que a AMO tenha publicado. Cacheado porque o tipo de instalação não
// muda durante a vida da extensão.
let installTypeCache = null;
async function getInstallType() {
  if (installTypeCache) return installTypeCache;
  try {
    const info = await browser.management.getSelf();
    installTypeCache = (info && info.installType) || 'desconhecido';
  } catch (erro) {
    installTypeCache = 'desconhecido';
  }
  return installTypeCache;
}

async function verificarEinstalarAtualizacao() {
  try {
    const installType = await getInstallType();
    if (installType === 'development') {
      return { ok: true, aplicada: false, motivo: 'instalacao_temporaria' };
    }

    if (typeof browser.runtime.requestUpdateCheck !== 'function') {
      // Firefox: não existe jeito de forçar a checagem agora — só dá pra
      // avisar que já está escutando em segundo plano (o listener
      // permanente acima cuida de aplicar sozinho assim que o Firefox
      // achar a atualização, seja pelo timer dele ou por um clique manual
      // em "Verificar atualizações" no about:addons).
      return { ok: true, aplicada: false, motivo: 'sem_forcar_checagem' };
    }

    // Chrome/Chromium (ou uma futura versão do Firefox que implemente):
    // aqui sim dá pra pedir a checagem imediata de verdade.
    const resultado = await browser.runtime.requestUpdateCheck();
    const status = Array.isArray(resultado) ? resultado[0] : resultado && resultado.status;
    if (status !== 'update_available') {
      return { ok: true, aplicada: false, motivo: String(status || 'desconhecido') };
    }
    // deixa o listener permanente (aplicarAssimQuePronta) cuidar de quando
    // o onUpdateAvailable disparar — não precisa duplicar a lógica aqui.
    return { ok: true, aplicada: false, motivo: 'update_available' };
  } catch (erro) {
    return { ok: false, erro: String((erro && erro.message) || erro) };
  }
}

browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || msg.type !== 'mxm-log-apply-update') return undefined;
  verificarEinstalarAtualizacao().then(sendResponse);
  return true; // mantém o canal aberto pra resposta assíncrona
});

const GOOGLE_OAUTH_CLIENT_ID = '315724734446-ai0t1ragg82322jl13hi8jilhs8pk2qv.apps.googleusercontent.com';
// Client tipo "Aplicativo da Web" no Google Cloud — mesmo usando PKCE,
// esse tipo de client exige client_secret na troca do code por tokens e
// na renovação via refresh_token (diferente de clients "públicos", tipo
// Chrome App/Desktop, que dispensam o secret). Cole aqui o valor gerado
// no Console (Credenciais → esse Client OAuth → gerar nova chave secreta).
// NOTA DE SEGURANÇA: um secret dentro do background.js de uma extensão é
// inspecionável (o código roda no navegador do usuário). É uma limitação
// aceita nesse tipo de projeto client-side — não há como evitar 100% sem
// mover a troca de tokens pra um servidor próprio.
// Removido do código publicado — preencha com o secret real localmente
// (Google Cloud Console → Credenciais) antes de empacotar/buildar.
const GOOGLE_OAUTH_CLIENT_SECRET = 'COLE_AQUI_O_CLIENT_SECRET';

async function fazerLoginGoogle() {
  const redirectUri = browser.identity.getRedirectURL();
  const nonce = Math.random().toString(36).slice(2) + Date.now().toString(36);

  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', GOOGLE_OAUTH_CLIENT_ID);
  authUrl.searchParams.set('response_type', 'id_token');
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('scope', 'openid email profile');
  authUrl.searchParams.set('nonce', nonce);
  authUrl.searchParams.set('prompt', 'select_account');

  const urlResposta = await browser.identity.launchWebAuthFlow({
    url: authUrl.toString(),
    interactive: true,
  });

  // O Google devolve o id_token no fragmento (#) da URL de redirect, não
  // na query string — por isso o parse manual em vez de URL.searchParams.
  const fragmento = new URL(urlResposta).hash.replace(/^#/, '');
  const params = new URLSearchParams(fragmento);
  const idToken = params.get('id_token');
  const erro = params.get('error');
  if (erro) throw new Error(erro);
  if (!idToken) throw new Error('Google não devolveu id_token.');
  return idToken;
}

browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || msg.type !== 'mxm-log-google-signin') return undefined;
  fazerLoginGoogle()
    .then((idToken) => sendResponse({ ok: true, idToken }))
    .catch((erro) => sendResponse({ ok: false, erro: String((erro && erro.message) || erro) }));
  return true; // mantém o canal aberto pra resposta assíncrona
});

// Fluxo separado pro backup no Google Drive (ver docs/backup-google-drive.md).
// Usa authorization code + PKCE (não o fluxo implícito de fazerLoginGoogle
// acima) porque só esse fluxo devolve um refresh_token de verdade — sem
// ele, o access_token do Drive (validade ~1h) expirava e a única forma de
// renovar era reabrir o popup de login, o que a pessoa sentia como "ficar
// sempre deslogando" a cada F5 depois de ~1h de sessão. Com PKCE não
// precisamos de client_secret (que não daria pra guardar com segurança
// numa extensão) — o "segredo" da troca é o code_verifier, gerado e
// mantido só nesta função, nunca persistido. Sempre interativo: a
// renovação sem popup depois da primeira vez usa o refresh_token (ver
// renovarAccessTokenGoogleDrive), não este fluxo.
async function fazerLoginGoogleDrive() {
  const redirectUri = browser.identity.getRedirectURL();

  // PKCE: code_verifier aleatório + code_challenge = SHA-256(verifier) em
  // base64url. O Google exige isso pra clients públicos (sem segredo).
  const codeVerifier = gerarCodeVerifierPkce();
  const codeChallenge = await gerarCodeChallengePkce(codeVerifier);

  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', GOOGLE_OAUTH_CLIENT_ID);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('scope', 'https://www.googleapis.com/auth/drive.file');
  authUrl.searchParams.set('code_challenge', codeChallenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');
  // access_type=offline é o que faz o Google devolver refresh_token;
  // prompt=consent garante isso mesmo se a pessoa já tiver autorizado
  // antes (sem consent explícito, o Google só manda refresh_token na
  // PRIMEIRA autorização de cada client_id+conta — precisamos garantir
  // que ele venha aqui, já que é o único lugar que pede esse escopo).
  authUrl.searchParams.set('access_type', 'offline');
  authUrl.searchParams.set('prompt', 'consent');

  const urlResposta = await browser.identity.launchWebAuthFlow({
    url: authUrl.toString(),
    interactive: true,
  });

  const params = new URL(urlResposta).searchParams;
  const code = params.get('code');
  const erro = params.get('error');
  if (erro) throw new Error(erro);
  if (!code) throw new Error('Google não devolveu authorization code.');

  // Troca o code pelo par access_token + refresh_token. Client tipo
  // "Aplicativo da Web" exige client_secret aqui mesmo usando PKCE — o
  // code_verifier sozinho não basta pra esse tipo de client (ao contrário
  // de clients públicos, que dispensariam o secret).
  const respostaToken = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: GOOGLE_OAUTH_CLIENT_ID,
      client_secret: GOOGLE_OAUTH_CLIENT_SECRET,
      code,
      code_verifier: codeVerifier,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    }),
  });
  const dadosToken = await respostaToken.json();
  if (!respostaToken.ok) {
    throw new Error((dadosToken && dadosToken.error_description) || (dadosToken && dadosToken.error) || `HTTP ${respostaToken.status}`);
  }
  if (!dadosToken.access_token) throw new Error('Google não devolveu access_token na troca do code.');

  return {
    accessToken: dadosToken.access_token,
    expiresIn: Number(dadosToken.expires_in) || 3600,
    // só vem na primeira autorização (ver access_type=offline acima);
    // em renovações via refresh_token (renovarAccessTokenGoogleDrive)
    // isso fica undefined e quem chamou mantém o refresh_token que já tinha.
    refreshToken: dadosToken.refresh_token || null,
  };
}

// Renova o access_token do Drive usando um refresh_token já salvo — sem
// popup, sem depender de prompt=none/sessão do navegador (diferente da
// tentativa anterior). Mesmo princípio do refresh do Firebase em
// mxmFirebaseGarantirAuth (content.js), só que aqui é direto na API do
// Google em vez do endpoint do Firebase.
async function renovarAccessTokenGoogleDrive(refreshToken) {
  const resposta = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: GOOGLE_OAUTH_CLIENT_ID,
      client_secret: GOOGLE_OAUTH_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });
  const dados = await resposta.json();
  if (!resposta.ok) {
    // erro típico aqui é invalid_grant (refresh_token revogado/expirado de
    // verdade — ex.: usuário removeu o acesso da extensão na conta Google).
    // Isso sim justifica pedir login de novo (com popup), diferente de um
    // access_token só vencido, que este endpoint resolve sem popup nenhum.
    throw new Error((dados && dados.error_description) || (dados && dados.error) || `HTTP ${resposta.status}`);
  }
  return {
    accessToken: dados.access_token,
    expiresIn: Number(dados.expires_in) || 3600,
  };
}

// ---- helpers PKCE (RFC 7636) ----
function gerarCodeVerifierPkce() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return base64UrlDeBytes(bytes);
}

async function gerarCodeChallengePkce(verifier) {
  const bytesVerifier = new TextEncoder().encode(verifier);
  const hash = await crypto.subtle.digest('SHA-256', bytesVerifier);
  return base64UrlDeBytes(new Uint8Array(hash));
}

function base64UrlDeBytes(bytes) {
  let binario = '';
  for (const b of bytes) binario += String.fromCharCode(b);
  return btoa(binario).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || msg.type !== 'mxm-log-google-drive-signin') return undefined;
  fazerLoginGoogleDrive()
    .then((resultado) => sendResponse({ ok: true, ...resultado }))
    .catch((erro) => sendResponse({ ok: false, erro: String((erro && erro.message) || erro) }));
  return true; // mantém o canal aberto pra resposta assíncrona
});

browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || msg.type !== 'mxm-log-google-drive-refresh') return undefined;
  renovarAccessTokenGoogleDrive(msg.refreshToken)
    .then((resultado) => sendResponse({ ok: true, ...resultado }))
    .catch((erro) => sendResponse({ ok: false, erro: String((erro && erro.message) || erro) }));
  return true; // mantém o canal aberto pra resposta assíncrona
});


// PoC: preview de 30s (iTunes Search API) pros slides de música do resumo
// mensal. A busca em si roda direto no content.js (buscarPreviewAppleMusicCache)
// via fetch simples — não precisa de handler aqui no background.

// Fallback: Deezer Search API — segunda tentativa quando a iTunes não acha
// prévia (faixas mais nichadas, versões diferentes, etc.). Precisa rodar
// aqui no background e não no content script porque a Deezer não devolve
// cabeçalho Access-Control-Allow-Origin pra chamadas de outra origem — o
// navegador bloqueia o fetch direto de dentro de curators.musixmatch.com.
// Chamadas feitas por aqui (background do MV3) não sofrem esse bloqueio de
// CORS, desde que o host esteja declarado em host_permissions (ver
// manifest.json — https://api.deezer.com/*).
async function buscarPreviewDeezer(termo) {
  const resposta = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(termo)}&limit=1`);
  if (!resposta.ok) throw new Error(`Deezer Search API respondeu ${resposta.status}`);
  const dados = await resposta.json();
  const faixa = dados && Array.isArray(dados.data) ? dados.data[0] : null;
  if (!faixa || !faixa.preview) return null;
  return {
    previewUrl: faixa.preview,
    trackName: faixa.title || null,
    artistName: (faixa.artist && faixa.artist.name) || null,
  };
}

browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || msg.type !== 'mxm-log-preview-deezer') return undefined;
  buscarPreviewDeezer(String(msg.termo || ''))
    .then((resultado) => sendResponse({ ok: true, resultado }))
    .catch((erro) => sendResponse({ ok: false, erro: String((erro && erro.message) || erro) }));
  return true; // mantém o canal aberto pra resposta assíncrona
});

browser.menus.onClicked.addListener((info, tab) => {
  if (!tab || tab.id == null) return;
  sendToTab(tab.id, info.menuItemId);
});

browser.action.onClicked.addListener((tab) => {
  if (!tab || tab.id == null) return;
  const url = tab.url || '';
  if (
    url.startsWith('https://curators.musixmatch.com/') ||
    url.startsWith('https://curators-beta.musixmatch.com/')
  ) {
    sendToTab(tab.id, 'config');
  } else {
    browser.tabs.create({ url: 'https://curators.musixmatch.com/' });
  }
});

browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || msg.type !== 'mxm-log-backup-automatico') return undefined;

  const blob = new Blob([msg.conteudo], { type: 'application/json;charset=utf-8' });
  const objectUrl = URL.createObjectURL(blob);

  browser.downloads
    .download({
      url: objectUrl,
      filename: msg.filename,
      saveAs: false,
      conflictAction: 'overwrite',
    })
    .then((downloadId) => {
      function aoMudar(delta) {
        if (delta.id !== downloadId || !delta.state) return;
        const estado = delta.state.current;
        if (estado === 'complete' || estado === 'interrupted') {
          URL.revokeObjectURL(objectUrl);
          browser.downloads.onChanged.removeListener(aoMudar);
        }
      }
      browser.downloads.onChanged.addListener(aoMudar);
      sendResponse({ ok: true });
    })
    .catch((erro) => {
      URL.revokeObjectURL(objectUrl);
      sendResponse({ ok: false, erro: String((erro && erro.message) || erro) });
    });

  return true; // mantém o canal aberto pra resposta assíncrona
});

// Modo "Notificar pelo Windows" (Configurações > opções de visualização):
// quando ativo, content.js para de desenhar o popup próprio da extensão
// (showPopup) e manda o texto pra cá, que dispara uma notificação nativa
// do sistema operacional via browser.notifications — assim ela aparece
// como notificação de verdade do Windows (central de notificações, som
// e comportamento do próprio SO) em vez de um card sobreposto na página.
let contadorNotificacaoNativa = 0;
browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || msg.type !== 'mxm-log-notificacao-nativa') return undefined;

  const idNotificacao = `mxm-log-envio-${Date.now()}-${contadorNotificacaoNativa++}`;
  browser.notifications
    .create(idNotificacao, {
      type: 'basic',
      iconUrl: browser.runtime.getURL('icons/icon-128.png'),
      title: msg.titulo || 'Echoform',
      message: msg.mensagem || '',
    })
    .then(() => sendResponse({ ok: true }))
    .catch((erro) => sendResponse({ ok: false, erro: String((erro && erro.message) || erro) }));

  return true; // mantém o canal aberto pra resposta assíncrona
});
