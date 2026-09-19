# Echoform

Extensão de navegador para **Firefox** e **Chrome** que registra data/hora de
cada envio no MXM Studio (curators.musixmatch.com), com painel de log, aba
Reward (USD + BRL), Diff Check, temas do Tabs V3, backup em `.json`, disco,
nuvem (Firestore) e Google Drive. Interface em PT, EN, EL e ID.

Este repositório é o código-fonte do port: um único código
(`content.js`, `background.js`, `injected.js`) gera os dois pacotes.

## Estrutura

| Caminho | O que é |
|---|---|
| `content.js`, `background.js`, `injected.js` | código da extensão, idêntico nos dois navegadores |
| `i18n/pt.js`, `en.js`, `el.js`, `id.js` | textos da interface, um arquivo por idioma |
| `chrome-compat.js` | shim `browser = chrome`, só no pacote Chrome |
| `manifest.base.json` | manifest comum; o build gera os dois finais (a **versão** vive só aqui) |
| `build.js` | build único (Firefox + Chrome); o cabeçalho traz o mapa de diferenças entre os navegadores |
| `icons/`, `sounds/` | assets |
| `secrets.local.example.json` | modelo do arquivo de segredo local (o real fica fora do git) |
| `docs/NOTAS-DO-PORT.md` | notas de estado do projeto (IDs, status das lojas, decisões) |

## Requisitos

Node.js 18 ou superior (o build usa `structuredClone`; testado no Node 22).
Sem dependências npm.

## Build

```
node build.js                 # gera dist/echoform-firefox-vX.zip e dist/echoform-chrome-vX.zip
node build.js --dev           # Chrome com "key" fixa (ID estável p/ testar OAuth; precisa de chrome-dev-key.json)
node build.js --sem-segredo   # pacote de TESTE sem o client_secret (login Google/Drive não funciona)
```

O build também valida os dicionários de idioma: derruba a execução se faltar
arquivo, se as chaves divergirem de `pt.js`, se houver erro de sintaxe ou se o
manifest carregar um idioma depois do `content.js`.

### Segredo do Google OAuth

O client OAuth do tipo "Aplicativo da Web" exige um `client_secret`. Ele **não
está neste repositório**: `background.js` traz só o marcador
`__ECHOFORM_GOOGLE_CLIENT_SECRET__` e o build o substitui ao montar os
pacotes. Informe o valor de uma destas formas:

1. copie `secrets.local.example.json` para `secrets.local.json` (ignorado pelo
   git) e preencha `googleClientSecret`; ou
2. defina a variável de ambiente `ECHOFORM_GOOGLE_CLIENT_SECRET`.

Sem o valor o build falha, pra não gerar um pacote com login quebrado.
Com `--sem-segredo` ele gera um pacote de teste com o sufixo `-sem-segredo`
no nome do arquivo.

## Como adicionar um idioma

1. Copie `i18n/en.js` para `i18n/xx.js`, troque `.en =` por `.xx =` e
   traduza os VALORES (nunca renomeie as chaves — o build exige as
   mesmas 773 chaves de `pt.js`).
2. Inclua `'xx'` em `I18N_IDIOMAS` no `build.js`.
3. Inclua `"i18n/xx.js"` no `manifest.base.json` (antes de `content.js`).
4. Inclua `{ codigo: 'xx', rotulo: 'XX', nome: '...' }` em
   `IDIOMAS_DISPONIVEIS` no `content.js` e adicione o idioma em
   `MESES_ABREV` e `DIAS_SEMANA_ABREV` (continuam no `content.js`).
5. ATENÇÃO — o build NÃO detecta esta parte: o `content.js` tem lógica de
   idioma escrita à mão (`if (idioma === 'en') ... else if (idioma ===
   'el') ... else <português>`). Um idioma novo cai no ramo padrão
   (português) se você não tratá-lo. Procure por `idioma === 'el'` e
   `FRASES_BRINCADEIRA_INSTRUMENTAL` e cubra: `formatarContagemDias`,
   `formatarDiasEstiloSite` (dias/horas/minutos), `escolherNotasAtualizacao`
   (chaves de nota por idioma) e `FRASES_BRINCADEIRA_INSTRUMENTAL` (sem
   frases próprias, o `id` usa as do inglês).
6. `node build.js` — ele derruba o build se faltar arquivo, se as chaves
   divergirem de `pt.js`, se o arquivo tiver erro de sintaxe ou se o
   manifest carregar o idioma depois do `content.js`.

## Versão

Altere só o campo `version` de `manifest.base.json`; `node build.js`
propaga pros dois pacotes (o `content.js` lê a versão do próprio manifest).
Lojas exigem número MAIOR que o já publicado.

## Licença

MIT, conforme declarado no cabeçalho do `content.js`.
