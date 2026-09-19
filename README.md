# Echoform - Log de Envios

Extensão de navegador (Firefox, Manifest V3) para o **Musixmatch Curators Studio**, que adiciona um painel de log/acompanhamento de envios e várias ferramentas de apoio ao trabalho de curadoria de letras.

> ⚠️ Projeto não oficial e não afiliado à Musixmatch. Feito pra uso pessoal e compartilhado por conveniência de quem também usa o Curators Studio.

## Funcionalidades

- **Log de Envios**: registra data/hora de cada envio, missão associada (inclusive manual), duração da faixa, com painel de resumo (foto do curator, atividade por dia/mês) e busca/filtro na lista.
- **Aba Reward**: soma total ganho, com conversão USD → BRL usando cotação ao vivo.
- **Diff Check**: comparador de versões de letra com visual inspirado no [diffchecker.com](https://www.diffchecker.com) (diff por caractere, alinhamento de linhas, cores fixas de alto contraste), incluindo Diff manual e Diffs salvos.
- **Compartilhar diff por link**: gera um link autocontido (sem servidor/banco de dados) que abre o diff em qualquer navegador, com encurtamento automático via [is.gd](https://is.gd).
- Captura opcional da letra da faixa.
- Temas do Tabs V3 (beta).
- Backup completo em `.json` (importar/exportar) e backup opcional na nuvem via Firebase (login com conta Google).
- Tela de boas-vindas com termos de uso e tour inicial.
- Interface em Português, Inglês, Grego e Bahasa Indonesia (PT/EN/EL/ID).

## Instalação e Testes

### Google Chrome (Modo Desenvolvedor)
1. Clone ou baixe este repositório (branch `chrome-support`).
2. Abra o Chrome e acesse `chrome://extensions`.
3. Ative o interruptor **Modo do desenvolvedor** (canto superior direito).
4. Clique em **Carregar sem compactação** (*Load unpacked*).
5. Selecione a pasta raiz deste projeto.

### Firefox (Modo Desenvolvedor)
1. Abra `about:debugging#/runtime/this-firefox` no Firefox.
2. Clique em **Carregar extensão temporária...** e selecione o arquivo `manifest.json` desta pasta.

### Build para o Chrome Web Store
Para gerar o arquivo `.zip` pronto para publicação no [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole):
```bash
# Validar sintaxe e integridade do manifest
npm run check

# Gerar arquivo zip na pasta dist/
npm run pack
```
O pacote será gerado em `dist/echoform-chrome-v3.5.62.zip`.

## Estrutura do projeto

```
manifest.json     # Configuração da extensão (Manifest V3)
background.js     # Service worker: atualização, login Google/Firebase, menus
content.js        # Lógica principal (painel de log, Diff Check, etc.)
injected.js        # Script injetado na página pra capturar dados internos do Studio
icons/             # Ícones da extensão
sounds/            # Efeitos sonoros (erro, atualização, resumo de música)
```

## Backup na nuvem (Firebase)

O recurso opcional de backup na nuvem usa Firebase Authentication (login com Google) e Firestore, associado ao projeto `musixmatch-logs`. A `apiKey` do Firebase Web presente no código **não é um segredo** — esse tipo de chave só identifica o projeto; a segurança de verdade vem das Regras do Firestore, que restringem cada usuário a ler/escrever apenas os próprios dados. Ver [`SECURITY.md`](./SECURITY.md) para mais detalhes.

## Compartilhar diff por link (nota para quem for contribuir)

O recurso de "Compartilhar link" do Diff Check depende de uma páginazinha estática publicada via GitHub Pages (repositório separado, ex. `mxm-diff-viewer`) que só lê o fragmento da URL e renderiza o HTML do diff. Se for publicar seu próprio fork com esse recurso ativo, troque a constante `MXM_DIFF_VIEWER_URL_BASE` em `content.js` pela URL da sua própria página publicada.

## Contribuindo

Issues e PRs são bem-vindos. Antes de abrir um PR grande, abra uma issue descrevendo a mudança proposta.

## Licença

[MIT](./LICENSE)
