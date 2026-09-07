# Segurança

## Chave de API do Firebase no código-fonte

Esta extensão inclui, em texto plano dentro de `content.js`, a `apiKey` do Web App do projeto Firebase `musixmatch-logs`, usada apenas para o recurso opcional de backup na nuvem (login com Google + sincronização via Firestore).

Isso é intencional e seguro **desde que as Regras do Firestore estejam corretas**: ao contrário de uma chave de API tradicional, a `apiKey` de um app Web do Firebase não concede acesso por si só — ela apenas identifica o projeto ao qual o app pertence. Qualquer pessoa que use o app (extensão) tem acesso a essa mesma chave, publicada ou não em código aberto; é assim que toda extensão/site que usa Firebase funciona.

A segurança real do backup depende de:

1. **Firestore Security Rules** garantindo que cada usuário autenticado só possa ler/escrever documentos associados ao próprio UID.
2. O fluxo de autenticação (login com Google via `identity`/OAuth) continuar exigindo login real — sem esse login, não há `idToken` válido pra fazer qualquer chamada ao Firestore.

### Se você for mantenedor deste projeto

Antes de aceitar contribuições externas ou divulgar amplamente o repositório, vale conferir/reforçar:

- Regras do Firestore restringindo leitura/escrita ao próprio UID (`request.auth.uid == resource.data.uid` ou equivalente).
- Restrição da API key no Google Cloud Console por aplicativo (extensão específica), se ainda não estiver configurada.
- Cotas/alertas de uso no Firebase, pra detectar uso anômalo caso a chave seja usada fora da extensão.

## Reportando problemas de segurança

Se você encontrar uma vulnerabilidade (ex: uma forma de acessar dados de outro usuário, burlar autenticação, etc.), abra uma issue privada ou entre em contato diretamente com o mantenedor antes de divulgar publicamente.
