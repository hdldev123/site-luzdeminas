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

Tipos de modal (`ModalKind`): `terms`, `privacy`, `partner`.
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

### Download nas lojas (`StoreButtons`)
O app **Rotas Luz de Minas** está publicado na App Store e no Google Play. Os
links ficam em `siteConfig.links` (`src/lib/config.ts`).

- **Hero** e **CTA final** (`#baixar`) exibem os botões "Baixe na App Store" e
  "Disponível no Google Play" (`StoreButtons`), que abrem a loja em nova aba e
  mantêm o efeito magnético do `MagneticButton` (prop `href`).
- **"Baixar o app"** no `Header` (desktop e mobile) e **"Explorar no app"** nos
  cards de Cidades rolam até a seção `#baixar`.
- No Safari do iOS, a meta `apple-itunes-app` (`metadata.itunes` em
  `layout.tsx`, com `siteConfig.appStoreId`) exibe o **Smart App Banner** da
  App Store no topo da página.
- O JSON-LD `MobileApplication` lista as duas lojas em `installUrl`.

> O antigo popup "em breve" com pré-cadastro por e-mail (`SubscribeForm` +
> `POST /api/inscrever` + Brevo) foi removido quando o app chegou às lojas.

## Footer — contato

A coluna **Contato** exibe **e-mail** (`mailto:`) e **telefone** (`tel:`),
configurados em `siteConfig.contact`.

## "Seja um parceiro" (`kind="partner"`)

O botão na seção Guia Local abre um **modal com formulário de cadastro**
(`PartnerForm.tsx`) — antes ele levava a um formulário externo em nova aba.

Campos: **nome** do negócio/responsável, **e-mail**, **telefone/WhatsApp**
(todos obrigatórios) e **mensagem** (opcional, até 2000 caracteres). Tem
validação no cliente e no servidor, estados de
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
