# Funcionalidades e comportamentos

## Tema: modo escuro como padrão

- A aplicação **inicia no modo escuro**.
- O usuário pode alternar para claro pelo widget no `Header`
  (`AccessibilityControls`). A escolha é salva em `localStorage` (`ldm-theme`).
- Implementação: classe `dark` no `<html>` + script anti-flash no `layout.tsx`
  (ver [arquitetura](./arquitetura.md)).

## Acessibilidade (widget no navbar)

- **Tamanho de fonte** ajustável: A / A+ / A++ (variável CSS `--font-scale`,
  salva em `ldm-font-scale`).
- **Modo claro/escuro**: alternância com ícone de sol/lua.
- Extras: skip link ("Pular para o conteúdo"), foco visível, respeito a
  `prefers-reduced-motion`, HTML semântico e textos alternativos.

## Animações

- `Reveal` aplica fade + slide quando o elemento entra na viewport.
- Desativadas automaticamente para quem prefere menos movimento.

## Modais (popups)

Mecanismo desacoplado por evento de janela:

- `src/lib/modal.ts` — `openModal(kind)` dispara um `CustomEvent`.
- `src/components/ModalsHost.tsx` — montado uma vez na página, escuta o evento e
  renderiza o conteúdo conforme `kind`.
- `src/components/Modal.tsx` — diálogo acessível (role/aria, ESC, clique no
  overlay, trava de scroll, retorno de foco).
- `src/components/ModalTrigger.tsx` — botão cliente que chama `openModal`, usado
  dentro de componentes de servidor.

Tipos de modal (`ModalKind`): `terms`, `privacy`, `coming-soon`, `partner`.
Os dois primeiros abrem o mesmo `LegalModal` em abas diferentes.

### Institucional (Termos / Política)
No footer, **Termos de Uso** e **Política de Privacidade** abrem o mesmo modal
com **duas abas** (`LegalModal.tsx`). O link clicado define a aba inicial:
`kind="terms"` abre em Termos, `kind="privacy"` em Política.

- **Política de Privacidade**: reproduz o texto oficial publicado em
  `hdldev123.github.io/politica-privacidade` (LGPD, DPO, direitos do titular).
  Ao atualizar a política, sincronize os dois lugares.
- **Termos de Uso**: redigidos para os recursos reais do app (rotas, QR Code,
  conquistas, Guia Local, conteúdo do usuário). **Não substituem revisão
  jurídica** antes de um uso contratual estrito.

### Popup "em breve" + inscrição (`kind="coming-soon"`)
Como o app ainda não foi lançado, os botões de download/exploração abrem um
popup informando que o lançamento será em breve, em vez de levar às lojas:

- **"Inscreva-se"** no `Header` (desktop e mobile).
- **"Baixe na App Store" / "Google Play"** (`StoreButtons`) no Hero e no CTA
  final.
- **"Explorar no app"** nos cards de Cidades (`Cities`).

Dentro do popup, no lugar dos botões das lojas, fica o **`SubscribeForm`**:
campos de **e-mail** e **cidade** (ambos obrigatórios) e o botão "Inscrever-se",
que envia `POST /api/inscrever`. Estados tratados: validação local, envio,
sucesso (substitui o formulário pela confirmação) e erro (mensagem em
`aria-live`).

O campo cidade tem um `<datalist>` sugerindo as cidades do circuito
(Cataguases, Leopoldina, Piacatuba, Itamarati de Minas), mas **aceita qualquer
cidade digitada** — turistas de fora são justamente o público-alvo.

### Captação de e-mails (`POST /api/inscrever`)
Rota em `src/app/api/inscrever/route.ts` (runtime Node). Valida formato e
tamanho do **e-mail** (normalizado para minúsculas) e da **cidade** (2 a 80
caracteres), descarta envios com o **honeypot** `_gotcha` preenchido e aplica
**rate limit** simples em memória (5 envios por IP a cada 10 min → HTTP 429).

> O rate limit é conferido **depois** da validação: só envios válidos contam.
> Assim quem erra o preenchimento não fica travado, e as tentativas inválidas
> param antes de qualquer I/O.

As duas rotas compartilham `src/lib/leads.ts` (validação, rate limit por rota,
envio ao Formspree e escrita em CSV).

Destino, nesta ordem de preferência:

1. **Brevo** — se `BREVO_API_KEY` estiver definida, cadastra o contato via
   `POST https://api.brevo.com/v3/contacts` com `updateEnabled: true` (reinscrição
   atualiza em vez de dar erro de duplicado) e a cidade no atributo `CIDADE`.
   `BREVO_LIST_ID` é opcional. **É o destino recomendado**: sem teto baixo de
   inscrições e permite disparar a campanha de lançamento para a lista.
2. **Formspree** — relay de e-mail (`email` vira reply-to, mais `_subject`,
   `origem` e `data`). Plano grátis limitado a 50 envios/mês.
3. **Fallback local** — grava em `data/inscricoes.csv`
   (`email,cidade,origem,data`), ignorando duplicados. `/data` está no
   `.gitignore`.

> ⚠️ No Brevo, atributos personalizados precisam **existir na conta** antes de
> serem usados. Se `CIDADE` não estiver criado em Contatos → Configurações →
> Atributos, o valor é ignorado em silêncio — o contato entra sem a cidade.

O envio ao Brevo faz **uma tentativa extra** em caso de falha de rede, 5xx, 401,
408 ou 429 (com 400ms de intervalo). O cadastro é idempotente por causa do
`updateEnabled`, então repetir é seguro. Erros 4xx de dados não são repetidos —
tentar de novo não mudaria o resultado.

> ⚠️ **Restrição de IP do Brevo.** Em *Segurança → IPs autorizados* é possível
> bloquear chamadas de IPs não reconhecidos. Com isso ligado, a API responde
> **401** citando o IP. Em hospedagem serverless o IP de saída é dinâmico, então
> não há endereço fixo para autorizar: **deixe a restrição desligada** ou
> hospede em servidor com IP fixo. O retry reduz o estrago, não o elimina.

Configuração passo a passo em [configuracao.md](./configuracao.md).

> ⚠️ Em hospedagem **serverless** (Vercel/Netlify) o disco é efêmero e o
> fallback em arquivo não persiste — em produção, use o Formspree.

## Footer — contato

A coluna **Contato** exibe **e-mail** (`mailto:`) e **telefone** (`tel:`),
configurados em `siteConfig.contact`.

## "Seja um parceiro" (`kind="partner"`)

O botão na seção Guia Local abre um **modal com formulário de cadastro**
(`PartnerForm.tsx`) — antes ele levava a um formulário externo em nova aba.

Campos: **nome** do negócio/responsável, **e-mail**, **telefone/WhatsApp**
(todos obrigatórios) e **mensagem** (opcional, até 2000 caracteres). Mesmo
padrão do `SubscribeForm`: validação no cliente e no servidor, estados de
envio/sucesso/erro, feedback em `aria-live` e honeypot anti-spam.

### `POST /api/parceiro`
Valida os campos (nome ≥ 2 caracteres, e-mail no formato, telefone com ao menos
10 dígitos ignorando máscara) e envia para **`FORMSPREE_PARCEIRO_ENDPOINT`**.
Sem a variável, grava em `data/parceiros.csv` com escape de CSV — a mensagem
livre pode conter vírgulas, aspas e quebras de linha.

> O endpoint do Formspree fica **no servidor**: o navegador só conhece
> `/api/parceiro`. Nada de chave ou URL de formulário no HTML.

## Carrossel de telas do app

`src/components/Carousel.tsx`, exibido na seção **"Como funciona"**:

- Estilo **coverflow 3D** (rotação + profundidade) com transições suaves.
- **Autorrotativo** (3,5s), com **pausa** ao passar o mouse / focar.
- Navegação por **setas**, **indicadores** e **teclado** (← / →).
- Respeita `prefers-reduced-motion` (sem autoplay).
- As telas usam `Placeholder` (`<<screenshot-...>>`) — troque por imagens reais
  editando o array `SLIDES` no componente.
