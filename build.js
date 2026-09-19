#!/usr/bin/env node
/* ============================================================================
   Echoform — build único pra Firefox e Chrome a partir do MESMO
   content.js / background.js / injected.js.

   Uso:
     node build.js            # gera dist/echoform-firefox-vX.zip e dist/echoform-chrome-vX.zip
     node build.js --dev      # build de Chrome com "key" fixa (ID estável pra testar OAuth)
     node build.js --sem-segredo   # pacote de TESTE sem o client_secret (login Google/Drive não funciona)

   O build precisa do client_secret do Google OAuth (item 10 do mapa): defina a variável
   de ambiente ECHOFORM_GOOGLE_CLIENT_SECRET ou crie secrets.local.json (modelo em
   secrets.local.example.json). O secret NÃO está no repositório.

   ----------------------------------------------------------------------------
   MAPA DE DIFERENÇAS ENTRE AS DUAS BUILDS (leia isto antes de mexer em algo)
   ----------------------------------------------------------------------------
   content.js, background.js, injected.js e a pasta i18n/ são IDÊNTICOS nos
   dois pacotes. Isso só é possível porque tratamos os pontos abaixo. Se um dia o Chrome
   quebrar de novo (ou o Firefox), comece por aqui — é a lista completa dos
   lugares onde os dois navegadores divergem:

   1. Namespace `browser` vs `chrome`
      Onde:  chrome-compat.js (arquivo novo, só no pacote Chrome)
      O quê: cria `browser = chrome` quando `browser` não existe.
      Por quê: content.js e background.js foram escritos chamando
      `browser.*` (padrão Firefox/WebExtensions). O Chrome só expõe
      `chrome.*`, mas em MV3 ele já devolve Promise sem callback — mesmo
      contrato que o código espera. Resolve ~95% das chamadas sem tocar
      em mais nada.

   2. browser.menus (Firefox) vs chrome.contextMenus (Chrome)
      Onde:  topo de background.js (procure "PONTO DE PORT 2")
      O quê: `browser.menus = chrome.contextMenus` só quando browser.menus
      não existir nativamente.
      Por quê: são APIs com NOMES DIFERENTES, não apelidos uma da outra —
      o alias genérico do item 1 não resolve isso sozinho. O manifest
      também precisa da permissão certa: "menus" no Firefox,
      "contextMenus" no Chrome (ver DIFFS.chrome abaixo).

   3. URL.createObjectURL no service worker
      Onde:  background.js, listener 'mxm-log-backup-automatico'
      (procure "PONTO DE PORT 3")
      O quê: em vez de Blob + createObjectURL, usamos uma `data:` URL
      (funciona em ambos).
      Por quê: o service worker MV3 do Chrome não tem DOM completo —
      URL.createObjectURL não está disponível nesse contexto. `data:`
      URL é suportada em background page (Firefox) e service worker
      (Chrome) igualmente. Efeito colateral: revokeObjectURL também foi
      removido (não existe/não é necessário pra `data:` URL).

   4. Manifest: background.scripts (Firefox MV2-like) vs
      background.service_worker (Chrome MV3)
      Onde:  DIFFS.firefox / DIFFS.chrome abaixo
      Por quê: sintaxe de declaração de background diferente entre os
      dois; não tem shim que resolva isso, é campo de manifest mesmo.

   5. browser_specific_settings (chave gecko)
      Onde:  DIFFS.firefox abaixo
      Por quê: só o Firefox/AMO lê essa chave (id da extensão, versão
      mínima, permissões de coleta de dados). O Chrome rejeita o pacote
      se essa chave aparecer no manifest dele — por isso ela SÓ entra na
      variante Firefox.

   6. Limite de tamanho da `description` no manifest
      Onde:  DIFFS.chrome abaixo
      Por quê: a Chrome Web Store rejeita upload se description > 132
      caracteres (a AMO do Firefox aceita textos bem mais longos). Por
      isso existem DUAS descriptions: a longa em manifest.base.json
      (usada como está na build Firefox) e uma curta, exclusiva,
      hardcoded em DIFFS.chrome — com um `falhar()` de segurança caso
      alguém a alongue de novo sem perceber.
      NOTA: isso é diferente do campo "Descrição" (0/16.000) da PÁGINA da
      Web Store — aquele é preenchido manualmente no Console, não vem do
      manifest, e pode ficar longo à vontade.

   7. `key` fixa no manifest (só Chrome, só --dev)
      Onde:  DIFFS.chrome abaixo, bloco `if (MODO_DEV)`
      Por quê: sem uma `key` fixa, cada vez que a extensão é recarregada
      via "Carregar sem compactação" o Chrome pode gerar um ID diferente,
      quebrando o redirect URI do OAuth (que depende do ID). Fixando a
      key (de chrome-dev-key.json, não versionado) o ID fica estável
      durante o desenvolvimento. Pacote de loja (sem --dev) NUNCA deve
      ter "key" — é a própria Web Store que atribui o ID final.

   8. injected.js e browser.identity.*
      NÃO precisaram de tratamento especial: `getRedirectURL()` e
      `launchWebAuthFlow()` existem com a mesma assinatura em
      `browser.*` e `chrome.*`, então o alias do item 1 já resolve.
      Documentado aqui só pra registrar que foi checado — se o Google
      mudar essa API no futuro, é aqui que provavelmente vai quebrar.

   9. Dicionários de idioma em i18n/ (pt.js, en.js, el.js)
      Onde:  pasta i18n/, manifest.base.json (content_scripts[0].js),
      constante I18N_IDIOMAS e função validarI18n() neste arquivo.
      O quê: cada idioma é um content script próprio, carregado ANTES do
      content.js. Ele só faz `globalThis.__ECHOFORM_I18N.<codigo> = {...}`;
      o content.js lê esse objeto em `const STRINGS`.
      Por quê: content scripts não suportam import/export, mas todos os
      scripts do mesmo manifest compartilham o mesmo mundo isolado. O
      content.js encolheu ~13% e adicionar um idioma vira "criar um
      arquivo". Idêntico nos dois navegadores (mesmo contrato do item 1:
      o chrome-compat.js só entra antes de TUDO, ver DIFFS.chrome).
      Riscos que o build checa: (a) idioma faltando no zip → a extensão
      quebraria em silêncio; (b) chaves diferentes entre idiomas → texto
      cru aparecendo na interface. Ambos derrubam o build (validarI18n).
      Para adicionar um idioma: criar i18n/xx.js, incluir 'xx' em
      I18N_IDIOMAS aqui, em manifest.base.json e em IDIOMAS_DISPONIVEIS
      no content.js.

   10. client_secret do Google OAuth (NÃO fica no repositório)
      Onde:  marcador '__ECHOFORM_GOOGLE_CLIENT_SECRET__' em background.js;
      carregarSegredoGoogle() e aplicarSegredo() neste arquivo;
      secrets.local.json (ignorado pelo git) ou a variável de ambiente
      ECHOFORM_GOOGLE_CLIENT_SECRET.
      O quê: ao copiar background.js pros pacotes, o build troca o marcador
      pelo secret real. Igual nos dois navegadores.
      Por quê: o client OAuth do tipo "Aplicativo da Web" exige client_secret
      na troca de tokens, então o valor precisa ir dentro do pacote
      publicado (limitação conhecida, comentada em background.js) — mas não
      deve ir pra um repositório público, onde varredores automáticos
      (inclusive o secret scanning do GitHub, que pode avisar o Google) o
      encontram e podem invalidá-lo, derrubando o login de todos os usuários.
      Sem o secret o build FALHA (evita publicar pacote com login quebrado).
      `--sem-segredo` gera um pacote de teste com sufixo "-sem-segredo" no nome.

   ----------------------------------------------------------------------------
   Como funciona o build em si:
     - manifest.base.json tem os campos comuns aos dois navegadores.
     - pra cada navegador, aplicamos só o "diff" acima (função em DIFFS).
     - content.js, background.js, injected.js e i18n/*.js são copiados sem
       alteração nenhuma pros dois pacotes (ver ARQUIVOS_COMUNS e
       I18N_IDIOMAS) — a única diferença de ARQUIVOS entre os pacotes é
       chrome-compat.js, que existe só no Chrome.
============================================================================ */
'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const crypto = require('crypto');

const RAIZ = __dirname;
const DIST = path.join(RAIZ, 'dist');
const MODO_DEV = process.argv.includes('--dev');
const SEM_SEGREDO = process.argv.includes('--sem-segredo');
// marcador que o background.js traz no lugar do client_secret (item 10 do mapa)
const MARCADOR_SEGREDO = '__ECHOFORM_GOOGLE_CLIENT_SECRET__';
let SEGREDO_INJETADO = false;

// arquivos comuns aos dois navegadores (sem mudança nenhuma entre eles —
// ver item 1 do mapa acima: chrome-compat.js é quem absorve a diferença)
const ARQUIVOS_COMUNS = ['background.js', 'content.js', 'injected.js'];
// idiomas da interface: cada um é i18n/<codigo>.js (ver item 9 do mapa).
// A ORDEM importa só pra leitura; o content.js exige pelo menos pt e en.
const I18N_IDIOMAS = ['pt', 'en', 'el', 'id'];
const PASTAS_COMUNS = [
  { dir: 'sounds', filtro: () => true },
  { dir: 'icons', filtro: (nome) => /^icon-\d+\.png$/.test(nome) },
];

// -------------------------------------------------------------- diffs
// Só o que muda de fato entre os dois manifests. Tudo o mais vem do
// manifest.base.json. Cada mudança abaixo tem o número correspondente
// no mapa de diferenças no topo do arquivo — não adicione um diff aqui
// sem também descrever o "por quê" lá em cima.
const DIFFS = {
  firefox: (base) => {
    const m = structuredClone(base);
    // item 4: sintaxe de background do Firefox
    m.background = { scripts: ['background.js'] };
    // browser.menus já existe nativamente no Firefox — nome de permissão
    // continua "menus" no manifest (é o que o Firefox espera).
    // item 5: chave só lida pelo Firefox/AMO — NUNCA deixar isso vazar
    // pro manifest do Chrome (ele rejeita o pacote com essa chave).
    m.browser_specific_settings = {
      gecko: {
        id: 'mxm-studio-log-envios@nero',
        strict_min_version: '140.0',
        data_collection_permissions: { required: ['none'] },
      },
      gecko_android: { strict_min_version: '142.0' },
    };
    return m;
  },
  chrome: (base) => {
    const m = structuredClone(base);
    // item 4: sintaxe de background do Chrome MV3 (sem isso, service
    // worker não sobe e a extensão inteira fica inerte)
    m.background = { service_worker: 'background.js' };
    // item 6: Chrome Web Store rejeita description > 132 caracteres.
    // A description longa do manifest.base.json é só pro Firefox/AMO.
    m.description =
      'Registra envios no MXM Studio: painel de log, aba Reward (USD+BRL), Diff Check, backup automático (disco/nuvem/Drive), temas Tabs V3';
    if (m.description.length > 132) {
      falhar('description do Chrome tem ' + m.description.length + ' caracteres (máx. 132): ' + m.description);
    }
    // item 2: "menus" (Firefox) → "contextMenus" (Chrome); o shim em
    // background.js (PONTO DE PORT 2: browser.menus = chrome.contextMenus)
    // cobre o resto sem tocar na lógica do código.
    m.permissions = m.permissions.map((p) => (p === 'menus' ? 'contextMenus' : p));
    // item 1: chrome-compat.js entra ANTES do content.js só nesta
    // variante — é ele quem cria o alias browser = chrome pro resto do
    // código funcionar sem saber que está no Chrome.
    // Deriva da lista do manifest base (que já traz i18n/*.js + content.js)
    // em vez de reescrevê-la à mão — assim nenhum idioma novo é perdido.
    m.content_scripts[0].js = ['chrome-compat.js', ...m.content_scripts[0].js];
    // item 7: key fixa só em build --dev, pra manter o ID (e o redirect
    // URI do OAuth) estável entre reloads durante o desenvolvimento.
    // Pacote de loja (sem --dev) fica sem "key" de propósito.
    if (MODO_DEV) {
      const chavePath = path.join(RAIZ, 'chrome-dev-key.json');
      if (fs.existsSync(chavePath)) {
        m.key = JSON.parse(fs.readFileSync(chavePath, 'utf8')).key;
        m.name = m.name + ' (dev)';
      } else {
        console.warn(
          '  ⚠ --dev sem chrome-dev-key.json: o pacote sai SEM "key" e o ID da extensão muda a cada carga ' +
            '(o redirect URI do OAuth deixa de bater). O arquivo é ignorado pelo git de propósito — copie-o pra raiz (item 7 do mapa).'
        );
      }
    }
    return m;
  },
};

function falhar(msg) {
  console.error('\n✖ ' + msg);
  process.exit(1);
}

// ---------------------------------------------------------------- zip (sem dependências)
const TABELA_CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buffer) {
  let c = 0xffffffff;
  for (let i = 0; i < buffer.length; i++) c = TABELA_CRC[(c ^ buffer[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

const DOS_HORA = 0;
const DOS_DATA = (0 << 9) | (1 << 5) | 1; // 1980-01-01 fixo → zip determinístico

function criarZip(entradas) {
  const partesLocais = [];
  const partesCentral = [];
  let deslocamento = 0;

  for (const { nome, dados } of entradas) {
    const nomeBuf = Buffer.from(nome, 'utf8');
    const crc = crc32(dados);
    const comprimido = zlib.deflateRawSync(dados, { level: 9 });
    const usaDeflate = comprimido.length < dados.length;
    const corpo = usaDeflate ? comprimido : dados;
    const metodo = usaDeflate ? 8 : 0;

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(metodo, 8);
    local.writeUInt16LE(DOS_HORA, 10);
    local.writeUInt16LE(DOS_DATA, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(corpo.length, 18);
    local.writeUInt32LE(dados.length, 22);
    local.writeUInt16LE(nomeBuf.length, 26);
    local.writeUInt16LE(0, 28);
    partesLocais.push(local, nomeBuf, corpo);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(metodo, 10);
    central.writeUInt16LE(DOS_HORA, 12);
    central.writeUInt16LE(DOS_DATA, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(corpo.length, 20);
    central.writeUInt32LE(dados.length, 24);
    central.writeUInt16LE(nomeBuf.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(0, 38);
    central.writeUInt32LE(deslocamento, 42);
    partesCentral.push(central, nomeBuf);

    deslocamento += local.length + nomeBuf.length + corpo.length;
  }

  const tamanhoCentral = partesCentral.reduce((soma, b) => soma + b.length, 0);
  const fim = Buffer.alloc(22);
  fim.writeUInt32LE(0x06054b50, 0);
  fim.writeUInt16LE(entradas.length, 8);
  fim.writeUInt16LE(entradas.length, 10);
  fim.writeUInt32LE(tamanhoCentral, 12);
  fim.writeUInt32LE(deslocamento, 16);

  return Buffer.concat([...partesLocais, ...partesCentral, fim]);
}

// ---------------------------------------------------------------- segredo do Google OAuth (item 10)
function carregarSegredoGoogle() {
  let valor = (process.env.ECHOFORM_GOOGLE_CLIENT_SECRET || '').trim();
  let origem = 'variável de ambiente ECHOFORM_GOOGLE_CLIENT_SECRET';
  if (!valor) {
    const arq = path.join(RAIZ, 'secrets.local.json');
    if (fs.existsSync(arq)) {
      try {
        valor = String(JSON.parse(fs.readFileSync(arq, 'utf8')).googleClientSecret || '').trim();
      } catch (e) {
        falhar('secrets.local.json inválido: ' + e.message);
      }
      origem = 'secrets.local.json';
    }
  }
  if (!valor) {
    if (SEM_SEGREDO) return null;
    falhar(
      'client_secret do Google OAuth não informado. Defina a variável de ambiente ECHOFORM_GOOGLE_CLIENT_SECRET ' +
        'ou crie secrets.local.json (modelo: secrets.local.example.json). ' +
        'Pra um pacote de TESTE sem login Google: node build.js --sem-segredo'
    );
  }
  if (!/^GOCSPX-[A-Za-z0-9_-]{10,}$/.test(valor)) {
    falhar('client_secret em formato inesperado (esperado GOCSPX-…; fonte: ' + origem + '). Confira se não é o valor de exemplo.');
  }
  return { valor, origem };
}

// troca o marcador em background.js pelo secret. Sempre exige 1 marcador no
// arquivo — se alguém refatorar background.js e o marcador sumir, o build
// falha em vez de gerar um pacote sem o secret sem avisar.
function aplicarSegredo(nome, buf, segredo) {
  if (nome !== 'background.js') return buf;
  const alvo = "'" + MARCADOR_SEGREDO + "'";
  const partes = buf.toString('utf8').split(alvo);
  if (partes.length !== 2) falhar('background.js deve conter exatamente 1 vez ' + alvo + ' (achei ' + (partes.length - 1) + ')');
  if (!segredo) return buf; // --sem-segredo: mantém o marcador
  return Buffer.from(partes.join("'" + segredo.valor + "'"), 'utf8');
}

// ---------------------------------------------------------------- build
function coletarArquivosComuns(segredo) {
  const arquivos = new Map();
  for (const nome of ARQUIVOS_COMUNS) {
    const origem = path.join(RAIZ, nome);
    if (!fs.existsSync(origem)) falhar('arquivo obrigatório não encontrado: ' + nome);
    arquivos.set(nome, aplicarSegredo(nome, fs.readFileSync(origem), segredo));
  }
  for (const cod of I18N_IDIOMAS) {
    const nome = 'i18n/' + cod + '.js';
    const origem = path.join(RAIZ, nome);
    if (!fs.existsSync(origem)) falhar('arquivo de idioma não encontrado: ' + nome);
    arquivos.set(nome, fs.readFileSync(origem));
  }
  for (const { dir, filtro } of PASTAS_COMUNS) {
    const pasta = path.join(RAIZ, dir);
    if (!fs.existsSync(pasta)) falhar('pasta obrigatória não encontrada: ' + dir);
    for (const nome of fs.readdirSync(pasta).sort()) {
      const cheio = path.join(pasta, nome);
      if (!fs.statSync(cheio).isFile() || !filtro(nome)) continue;
      arquivos.set(dir + '/' + nome, fs.readFileSync(cheio));
    }
  }
  return arquivos;
}

// Executa os i18n/*.js num sandbox (do mesmo jeito que o navegador faz, um
// depois do outro no mesmo escopo) e confere que todos têm EXATAMENTE as
// mesmas chaves. Também garante que o manifest carrega cada idioma antes do
// content.js. Falha o build em vez de deixar o problema chegar ao usuário.
function validarI18n(baseManifest) {
  const vm = require('vm');
  const ctx = {};
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  for (const cod of I18N_IDIOMAS) {
    try {
      vm.runInContext(fs.readFileSync(path.join(RAIZ, 'i18n', cod + '.js'), 'utf8'), ctx, { filename: 'i18n/' + cod + '.js' });
    } catch (e) {
      falhar('i18n/' + cod + '.js não executa: ' + e.message);
    }
  }
  const dicts = ctx.__ECHOFORM_I18N || {};
  for (const cod of I18N_IDIOMAS) {
    if (!dicts[cod] || typeof dicts[cod] !== 'object') falhar('i18n/' + cod + '.js não registrou globalThis.__ECHOFORM_I18N.' + cod);
  }
  const ref = new Set(Object.keys(dicts.pt));
  for (const cod of I18N_IDIOMAS) {
    const chaves = new Set(Object.keys(dicts[cod]));
    const faltando = [...ref].filter((k) => !chaves.has(k));
    const sobrando = [...chaves].filter((k) => !ref.has(k));
    if (faltando.length || sobrando.length) {
      falhar(
        'i18n/' + cod + '.js diverge de pt.js — faltando: [' + faltando.slice(0, 5).join(', ') + (faltando.length > 5 ? ', …' : '') +
          '] sobrando: [' + sobrando.slice(0, 5).join(', ') + (sobrando.length > 5 ? ', …' : '') + ']'
      );
    }
  }
  const js = baseManifest.content_scripts[0].js;
  const idxContent = js.indexOf('content.js');
  for (const cod of I18N_IDIOMAS) {
    const idx = js.indexOf('i18n/' + cod + '.js');
    if (idx === -1) falhar('manifest.base.json não carrega i18n/' + cod + '.js em content_scripts[0].js');
    if (idx > idxContent) falhar('i18n/' + cod + '.js precisa vir ANTES de content.js no manifest');
  }
  console.log('  ✔ i18n: ' + I18N_IDIOMAS.join('/') + ' — ' + ref.size + ' chaves idênticas em todos os idiomas');
}

function buildNavegador(navegador, baseManifest, arquivosComuns) {
  const arquivos = new Map(arquivosComuns);

  if (navegador === 'chrome') {
    const compatPath = path.join(RAIZ, 'chrome-compat.js');
    if (!fs.existsSync(compatPath)) falhar('chrome-compat.js não encontrado (necessário pro pacote Chrome)');
    arquivos.set('chrome-compat.js', fs.readFileSync(compatPath));
  }

  const manifest = DIFFS[navegador](baseManifest);
  arquivos.set('manifest.json', Buffer.from(JSON.stringify(manifest, null, 2) + '\n', 'utf8'));

  const nomePasta = navegador === 'chrome' && MODO_DEV ? 'chrome-dev' : navegador;
  const pastaSaida = path.join(DIST, nomePasta);
  fs.rmSync(pastaSaida, { recursive: true, force: true });
  for (const [caminho, dados] of arquivos) {
    const destino = path.join(pastaSaida, caminho);
    fs.mkdirSync(path.dirname(destino), { recursive: true });
    fs.writeFileSync(destino, dados);
  }

  const entradas = [...arquivos.keys()].sort().map((nome) => ({ nome, dados: arquivos.get(nome) }));
  const zip = criarZip(entradas);
  const sufixoDev = navegador === 'chrome' && MODO_DEV ? '-dev' : '';
  const sufixoSegredo = SEGREDO_INJETADO ? '' : '-sem-segredo';
  const nomeZip = `echoform-${navegador}-v${manifest.version}${sufixoDev}${sufixoSegredo}.zip`;
  fs.mkdirSync(DIST, { recursive: true });
  fs.writeFileSync(path.join(DIST, nomeZip), zip);

  const sha = crypto.createHash('sha256').update(zip).digest('hex');
  console.log(`  ✔ ${navegador}: dist/${nomePasta}/  →  dist/${nomeZip}  (${(zip.length / 1024).toFixed(0)} KB)`);
  console.log(`    sha256 ${sha}`);
}

function main() {
  console.log(`Echoform — build único (Firefox + Chrome${MODO_DEV ? ', Chrome em modo dev' : ''})`);
  const baseManifest = JSON.parse(fs.readFileSync(path.join(RAIZ, 'manifest.base.json'), 'utf8'));
  const segredo = carregarSegredoGoogle();
  SEGREDO_INJETADO = !!segredo;
  console.log(
    segredo
      ? '  ✔ segredo Google OAuth injetado em background.js (fonte: ' + segredo.origem + ')'
      : '  ⚠ SEM segredo Google OAuth (--sem-segredo): login Google/Drive NÃO funciona neste pacote — só pra teste, não publique'
  );
  const arquivosComuns = coletarArquivosComuns(segredo);
  validarI18n(baseManifest);

  buildNavegador('firefox', baseManifest, arquivosComuns);
  buildNavegador('chrome', baseManifest, arquivosComuns);
}

main();
