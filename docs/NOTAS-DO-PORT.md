# Echoform — notas de estado do projeto

Notas de trabalho do port: o que já foi decidido e testado, IDs e status
nas lojas. A documentação de uso e de build está no `README.md` da raiz.
Ao retomar o trabalho numa nova conversa com o assistente, envie o projeto
e peça pra ler ESTE arquivo primeiro, pra não repetir trabalho.

## O que tem aqui

- `background.js`, `content.js`, `injected.js` e `i18n/` — os arquivos que
  rodam IDÊNTICOS nos dois pacotes (Firefox e Chrome). `background.js` tem
  2 pequenos trechos marcados com `PONTO DE PORT 2` e `PONTO DE PORT 3`
  (procure por esse texto) que resolvem diferenças de API entre
  navegadores.
- `i18n/pt.js`, `i18n/en.js`, `i18n/el.js`, `i18n/id.js` — os textos da interface, um
  arquivo por idioma (773 chaves cada). Foram extraídos do antigo
  `const STRINGS = {...}` do `content.js` (que encolheu de ~1,63 MB para
  ~1,41 MB). Content scripts não têm `import`, então cada arquivo apenas
  registra `globalThis.__ECHOFORM_I18N.<codigo> = {...}` e é carregado
  ANTES do `content.js` (ordem em `manifest.base.json`). O `content.js`
  lê esse objeto em `const STRINGS`. Ver item 9 do mapa em `build.js`.
- `chrome-compat.js` — shim que cria `browser = chrome`, carregado só na
  build Chrome, antes do content.js. Não precisa mexer nele.
- `manifest.base.json` — manifest com os campos comuns aos dois
  navegadores.
- `build.js` — script único que gera as duas builds. **Leia o cabeçalho
  dele primeiro** — tem um "MAPA DE DIFERENÇAS" numerado (1 a 8)
  explicando CADA divergência entre Firefox e Chrome, o quê, onde e por
  quê. Isso evita reconstruir esse raciocínio do zero numa sessão nova.
\1
- `chrome-dev-private-key.pem` — chave privada correspondente. Guarde em
  lugar seguro, NÃO precisa estar no projeto/repo, o build.js não lê
  esse arquivo (só lê o .json com a chave pública em base64).
- `icons/`, `sounds/` — assets usados nos dois pacotes.
- (removido do repositório) o `manifest.json` original do Firefox: ficou
  desatualizado após a refatoração pra `i18n/`. Os manifests finais são
  gerados pelo build a partir de `manifest.base.json`, em
  `dist/firefox/manifest.json` e `dist/chrome/manifest.json`.

## Como usar / adicionar idioma

Ver `README.md` (build, segredo do Google OAuth, idiomas).

## IDs de extensão relevantes

- **Produção (Web Store, item real)**: `anpojlpjcpcbkpcbnekjbicigcplhhbd`
  — redirect URI: `https://anpojlpjcpcbkpcbnekjbicigcplhhbd.chromiumapp.org/`
- **Dev (chrome-dev-key.json)**: `kbagijpmgmnebciipekoldbmkpmkeibj`
  — redirect URI: `https://kbagijpmgmnebciipekoldbmkpmkeibj.chromiumapp.org/`

Ambos os redirect URIs acima precisam estar cadastrados em
**console.cloud.google.com → APIs e serviços → Credenciais → o Client
OAuth do Echoform → URIs de redirecionamento autorizados** para o login
Google (backup na nuvem/Drive) funcionar. Se aparecer erro
`redirect_uri_mismatch` de novo, é isso que precisa ser checado primeiro.

## Versões publicadas

- **Firefox (AMO): 3.5.65 já publicada.** A build com os idiomas separados
  em `i18n/` + indonésio (`id`) sobe como **3.5.66**. A versão é lida só de
  `manifest.base.json` (o `content.js` usa `browser.runtime.getManifest()`),
  então é o único lugar a alterar; `node build.js` propaga pros dois pacotes.
  O AMO exige versão MAIOR que a já publicada.
- **Chrome (Web Store): 3.5.65 em revisão** (ver abaixo). Se a build Chrome
  for enviada de novo, use o mesmo número da build Firefox pra não divergir.

## Status na Chrome Web Store (na última atualização)

- Item: Echoform, versão 3.5.65
- Código/ID: `anpojlpjcpcbkpcbnekjbicigcplhhbd`
- Status: **Revisão pendente** (enviado, aguardando análise do Google)
- Permissões declaradas: storage, contextMenus, downloads, identity,
  notifications + host_permissions (Firebase/Google APIs, is.gd, iTunes,
  Deezer, Musixmatch, etc.)
- Uso de dados marcado no formulário: Informações de identificação
  pessoal, Informações de autenticação, Atividade do usuário, Conteúdo
  do site
- "Usando código remoto?" → respondido "Não" (confirmado: nenhum eval,
  importScripts ou <script src> externo nos 4 arquivos-fonte)
- Política de Privacidade: publicada como artifact em
  https://claude.ai/artifact/F46XW1wTajBCAj7Vg3u8z1 — ATENÇÃO: pode
  valer a pena migrar isso pra um host público "de verdade" (GitHub
  Pages, domínio próprio) caso a Web Store rejeite o link de artifact.
- URL de suporte e e-mail de contato: já resolvidos (não sei o valor
  exato usado, só que os dois bloqueios de publicação relacionados a
  eles foram removidos numa etapa anterior)

## Coisas resolvidas nesta sessão (não precisa repetir)

1. Description do manifest.json > 132 caracteres rejeitada pela Web
   Store → resolvido com description curta específica pro Chrome em
   `build.js` (ver item 6 do mapa de diferenças).
2. Blocos promocionais de imagem (440x280 e 1400x560) gerados a partir
   de uma arte de referência — não estão neste zip, foram entregues
   separadamente como PNG.
3. Textos prontos já escritos e usados: description longa (campo
   "Descrição" da página, 16.000 chars), justificativas de permissão
   (storage, contextMenus, downloads, identity, notifications, host
   permission), resposta sobre código remoto, categorias de uso de
   dados marcadas.
4. `redirect_uri_mismatch` ao tentar restaurar backup/login Google pela
   build Chrome sem `key` fixa → resolvido gerando `chrome-dev-key.json`
   (ver acima) e orientando cadastrar os 2 redirect URIs no Google Cloud
   Console.

## Possíveis próximos passos (dependendo de onde você parou)

- Aguardar resultado da revisão da Web Store (pode demorar horas a
  dias, mais por causa das permissões amplas e do `identity`).
- Se rejeitada: pedir pra ver o e-mail/motivo da rejeição e ajustar.
- Continuar o checklist de testes manuais na build Chrome (menu de
  contexto, painel, Diff Check, login Google, backup em disco/nuvem,
  notificações nativas, preview iTunes/Deezer) — ver histórico da
  conversa anterior para a lista completa passo a passo.
- Migrar a política de privacidade pra um host mais permanente, se a
  Web Store reclamar do link de artifact do claude.ai.

## Preparação do repositório (setembro/2026)

- O `client_secret` do Google OAuth estava escrito direto em `background.js`.
  Foi retirado do código-fonte: o arquivo agora traz o marcador
  `__ECHOFORM_GOOGLE_CLIENT_SECRET__` e o `build.js` injeta o valor real
  (de `secrets.local.json` ou da variável `ECHOFORM_GOOGLE_CLIENT_SECRET`)
  ao montar os pacotes. O código empacotado é o mesmo de antes: só mudaram
  5 linhas de COMENTÁRIO em `background.js` (por isso o hash do zip muda).
- O secret continua DENTRO do pacote publicado (AMO/Web Store) — é uma
  limitação do client OAuth tipo "Aplicativo da Web", já comentada em
  `background.js` — só saiu do repositório.
- A `apiKey` do Firebase em `content.js` foi mantida: é um identificador
  público por desenho (a proteção real vem das regras do Firestore e das
  restrições da chave no Google Cloud Console).
