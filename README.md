# Echoform - Log de Envios

Extensão de navegador (Google Chrome & Mozilla Firefox, Manifest V3) para o **Musixmatch Curators Studio**, que adiciona um painel de log/acompanhamento de envios e várias ferramentas de apoio ao trabalho de curadoria de letras.

> ⚠️ Projeto não oficial e não afiliado à Musixmatch. Feito pra uso pessoal e compartilhado por conveniência de quem também usa o Curators Studio.

## Funcionalidades

- **Log de Envios**: registra data/hora de cada envio, missão associada (inclusive manual), duração da faixa, com painel de resumo (foto do curator, atividade por dia/mês) e busca/filtro na lista.
- **Aba Reward**: soma total ganho, com conversão de moedas (USD, BRL, IDR, EUR, GBP, etc.) usando cotação ao vivo.
- **Diff Check**: comparador de versões de letra com visual inspirado no [diffchecker.com](https://www.diffchecker.com) (diff por caractere, alinhamento de linhas, cores fixas de alto contraste), incluindo Diff manual e Diffs salvos.
- **Compartilhar diff por link**: gera um link autocontido (sem servidor/banco de dados) que abre o diff em qualquer navegador, com encurtamento automático via [is.gd](https://is.gd).
- Captura opcional da letra da faixa.
- Temas do Tabs V3 (beta).
- Backup completo em `.json` (importar/exportar) e backup opcional na nuvem via Firebase (login com conta Google).
- Tela de boas-vindas com termos de uso e tour inicial.
- Interface multilíngue com dicionários modulares: Português, Inglês, Grego e Bahasa Indonesia (PT/EN/EL/ID).

## Instalação e Testes Locais

### Google Chrome & Chromium (Modo Desenvolvedor)
1. Clone ou baixe este repositório.
2. Abra o Chrome e acesse `chrome://extensions`.
3. Ative o interruptor **Modo do desenvolvedor** (canto superior direito).
4. Clique em **Carregar sem compactação** (*Load unpacked*).
5. Selecione a pasta raiz deste projeto.

### Mozilla Firefox (Modo Desenvolvedor)
1. Abra `about:debugging#/runtime/this-firefox` no Firefox.
2. Clique em **Carregar extensão temporária...** (*Load Temporary Add-on...*).
3. Selecione o arquivo `manifest.json` da pasta raiz deste projeto.

## Build & Empacotamento para Publicação

O projeto conta com scripts automatizados para validar e empacotar a extensão para Chrome e Firefox:

```bash
# Validar sintaxe JS e conformidade do manifest.json
npm run check

# Empacotar para AMBOS os navegadores (Chrome e Firefox)
npm run pack
# ou: npm run build

# Empacotar somente para o Google Chrome (Chrome Web Store)
npm run pack:chrome

# Empacotar somente para o Mozilla Firefox (AMO / .xpi)
npm run pack:firefox
```

Os artefatos prontos para publicação são gerados na pasta `dist/`:
- 📦 `dist/echoform-chrome-v3.5.65.zip` — Para upload no [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).
- 🦊 `dist/echoform-firefox-v3.5.65.xpi` — Para instalação direta ou distribuição no Firefox.
- 🦊 `dist/echoform-firefox-v3.5.65.zip` — Para envio no [Mozilla Developer Hub (AMO)](https://addons.mozilla.org/developers/).

## Estrutura do projeto

```
manifest.json     # Configuração da extensão (Manifest V3 compatível com Chrome e Firefox)
background.js     # Background script / Service worker (atualizações, login Google, menus)
content.js        # Lógica principal da interface (painel de log, Diff Check, etc.)
injected.js       # Script injetado na página pra capturar dados internos do Studio
locales/          # Dicionários de idiomas modulares (pt.js, en.js, el.js, id.js)
icons/            # Ícones da extensão
sounds/           # Efeitos sonoros (erro, atualização, resumo de música)
scripts/          # Scripts de validação e empacotamento (pack, validate)
dist/             # Arquivos de saída empacotados (.zip e .xpi)
```

## Backup na nuvem (Firebase)

O recurso opcional de backup na nuvem usa Firebase Authentication (login com Google) e Firestore, associado ao projeto `musixmatch-logs`. A `apiKey` do Firebase Web presente no código **não é um segredo** — esse tipo de chave só identifica o projeto; a segurança de verdade vem das Regras do Firestore, que restringem cada usuário a ler/escrever apenas os próprios dados. Ver [`SECURITY.md`](./SECURITY.md) para mais detalhes.

## Compartilhar diff por link (nota para quem for contribuir)

O recurso de "Compartilhar link" do Diff Check depende de uma páginazinha estática publicada via GitHub Pages (repositório separado, ex. `mxm-diff-viewer`) que só lê o fragmento da URL e renderiza o HTML do diff. Se for publicar seu próprio fork com esse recurso ativo, troque a constante `MXM_DIFF_VIEWER_URL_BASE` em `content.js` pela URL da sua própria página publicada.

## Contribuindo

Issues e PRs são bem-vindos. Antes de abrir um PR grande, abra uma issue descrevendo a mudança proposta.

## Licença

[MIT](./LICENSE)
