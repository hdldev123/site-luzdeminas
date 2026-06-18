# Changelog

Registro de mudanças por commit. As mais recentes no topo.

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
