# Changelog

Registro de mudanças por commit. As mais recentes no topo.

## Botão flutuante "voltar ao topo"

- Novo `BackToTop.tsx`: botão flutuante discreto (canto inferior direito) que
  aparece após rolar ~60% da viewport e leva ao topo com rolagem suave
  (respeita `prefers-reduced-motion`). Acessível e com variantes dark.

## Logo oficial no header e footer

- **Header** e **footer** passam a exibir a logo oficial `/logo.svg` (via
  `next/image`; no header com `priority`) no lugar do componente `Logo`
  desenhado. O componente `Logo.tsx` deixou de ser usado.

## Imagens reais — Cidades e Gamificação

- Cards de **Cidades** agora usam fotos reais: `/cataguases.png`,
  `/leopoldina.jpg`, `/itamarati.png` (Piacatuba/Itamarati).
- **Gamificação**: o marco ilustrativo passa a usar `/cataguases.png`.
- Todas as imagens da página agora estão conectadas (sem placeholders restantes).

## Imagens reais — Hero e carrossel

- `Placeholder` agora aceita `src` (e `sizes`) e renderiza a imagem real com
  `next/image` (lazy-load, `object-cover`); sem `src`, mantém a moldura
  placeholder.
- **Hero**: mockup usa `/inicio.jpeg`.
- **Carrossel**: telas usam `/rotas.jpeg`, `/audio.jpeg`, `/qr.jpeg`,
  `/medalhas.jpeg`, `/guia.jpeg`.
- Pendentes (seguem placeholder): fotos das cidades e o QR da seção Gamificação.

## Ajuste — Carrossel: centralização e controles

- Corrigido o `transform` inline dos slides para incluir a centralização
  (`translate(-50%, -50%)`), que antes era sobrescrita pelas classes utilitárias
  do Tailwind — os celulares agora ficam **centralizados** na tela.
- Aumentada a altura do palco (`h-[480px] sm:h-[540px]`) para os celulares não
  transbordarem; as **setas e indicadores ficam abaixo** do carrossel, sem
  sobreposição.

## Lote 3 — Popups "em breve" e carrossel de telas do app

- **Popup "em breve"** (`kind="coming-soon"`) nos botões de download/exploração,
  já que o app ainda não foi lançado:
  - "Baixar o app" (Header, desktop e mobile);
  - "Baixe na App Store" / "Google Play" (`StoreButtons`, no Hero e CTA final);
  - "Explorar no app" (cards de Cidades).
  `StoreButtons` virou client e ganhou `interactive` (false = ilustrativo).
- **Carrossel `Carousel.tsx`** na seção "Como funciona": coverflow 3D
  autorrotativo, com setas, indicadores, navegação por teclado, pausa no
  hover/foco e respeito a `prefers-reduced-motion`.
- **Docs** atualizadas (funcionalidades, componentes).

## Lote 2 — Contato no footer, institucional em modal e formulário de parceiros

- **Infra de modais**: `Modal`, `ModalsHost`, `ModalTrigger` e `lib/modal.ts`
  (abertura por evento de janela, diálogo acessível). Host montado em `page.tsx`.
- **Footer › Institucional**: **Termos de Uso** e **Política de Privacidade**
  agora abrem como **popup/modal** (texto template em PT-BR, revisar
  juridicamente). O item "Contato" deixou de ser um link na lista institucional.
- **Footer › Contato**: nova coluna com **e-mail** (`mailto:`) e **telefone**
  (`tel:`), configuráveis em `siteConfig.contact`.
- **"Seja um parceiro"**: passa a abrir um **formulário externo** em nova aba
  (`siteConfig.links.partnerForm`, placeholder `<<URL_FORMS_PARCEIRO>>`).
- **Config**: `config.ts` reorganizado (adicionados `contact` e
  `links.partnerForm`; removidos `legal`, `partners`, `partnerWhatsApp` e redes
  não usadas).

## Lote 1 — Tema escuro padrão, limpeza de seção e footer

- **Modo escuro como padrão**: a aplicação agora inicia no tema escuro; o
  usuário pode alternar para claro pelo widget no navbar (persistido em
  `localStorage`). Script anti-flash atualizado em `layout.tsx`.
- **Seção "Acessibilidade de verdade" removida** da página. A acessibilidade
  (fonte ajustável + claro/escuro) permanece no navbar (`Header`).
- **Footer**: removidos os links de **YouTube** e **Facebook** (mantido apenas o
  Instagram) e a coluna **"Realização e parceiros"**.
- **Documentação**: criada a pasta `docs/` com arquitetura, componentes,
  funcionalidades, configuração e este changelog.

> Próximos lotes (planejados):
> - Lote 2: footer com contato (e-mail + telefone), Termos/Política como modal,
>   "Seja um parceiro" abrindo formulário externo.
> - Lote 3: popup "em breve" nos botões de download/explorar e carrossel dinâmico
>   de telas do app na seção "Como funciona".
