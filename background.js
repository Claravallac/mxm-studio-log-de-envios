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
