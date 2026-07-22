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

### Institucional (Termos / Política)
No footer, **Termos de Uso** e **Política de Privacidade** abrem modais
(`kind="terms"` / `kind="privacy"`). O conteúdo é um **template** em PT-BR no
`ModalsHost.tsx` — revise com apoio jurídico antes de publicar.

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

Destino do e-mail, nesta ordem:

1. **Formspree** — se `FORMSPREE_ENDPOINT` estiver definida, envia `POST` JSON
   com `email` (vira reply-to), `_subject`, `origem` e `data`. Aceita a URL
   completa ou só o ID do formulário. Erros são lidos de `errors[].message`.
2. **Fallback local** — grava em `data/inscricoes.csv` (`email,data,origem`),
   ignorando duplicados. A pasta `/data` está no `.gitignore`.

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
