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

Tipos de modal (`ModalKind`): `terms`, `privacy`, `coming-soon`.

### Institucional (Termos / Política)
No footer, **Termos de Uso** e **Política de Privacidade** abrem modais
(`kind="terms"` / `kind="privacy"`). O conteúdo é um **template** em PT-BR no
`ModalsHost.tsx` — revise com apoio jurídico antes de publicar.

### Popup "em breve" (`kind="coming-soon"`)
Como o app ainda não foi lançado, os botões de download/exploração abrem um
popup informando que o lançamento será em breve, em vez de levar às lojas:

- **"Baixar o app"** no `Header` (desktop e mobile).
- **"Baixe na App Store" / "Google Play"** (`StoreButtons`) no Hero e no CTA
  final. O `StoreButtons` aceita `interactive={false}` para uso ilustrativo
  dentro do próprio modal.
- **"Explorar no app"** nos cards de Cidades (`Cities`).

## Footer — contato

A coluna **Contato** exibe **e-mail** (`mailto:`) e **telefone** (`tel:`),
configurados em `siteConfig.contact`.

## "Seja um parceiro"

O botão na seção Guia Local abre o **formulário de parceiros** em nova aba
(`siteConfig.links.partnerForm` — placeholder `<<URL_FORMS_PARCEIRO>>`).

## Carrossel de telas do app

`src/components/Carousel.tsx`, exibido na seção **"Como funciona"**:

- Estilo **coverflow 3D** (rotação + profundidade) com transições suaves.
- **Autorrotativo** (3,5s), com **pausa** ao passar o mouse / focar.
- Navegação por **setas**, **indicadores** e **teclado** (← / →).
- Respeita `prefers-reduced-motion` (sem autoplay).
- As telas usam `Placeholder` (`<<screenshot-...>>`) — troque por imagens reais
  editando o array `SLIDES` no componente.
