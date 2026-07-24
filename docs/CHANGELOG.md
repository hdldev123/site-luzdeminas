# Changelog

Registro de mudanças por commit. As mais recentes no topo.

## Termos e Política em modal de abas (texto real)

- Os links do rodapé agora abrem um único modal com **duas abas** (`LegalModal`):
  Termos de Uso e Política de Privacidade. O link clicado define a aba inicial.
- Saiu o texto-template com o aviso "substitua pelo texto jurídico oficial".
- **Política**: reproduz fielmente a versão oficial publicada em
  `hdldev123.github.io/politica-privacidade` (LGPD, dados coletados, base legal,
  transferência internacional, retenção, direitos, DPO).
- **Termos**: redigidos do zero para os recursos reais do app (rotas, QR Code,
  conquistas, Guia Local, conteúdo do usuário, foro de Cataguases/MG).
- Abas acessíveis (padrão ARIA tabs, navegação ←/→) e fixas no topo enquanto o
  conteúdo rola. `ModalsHost` deixou de carregar os dois modais separados.

## Brevo como destino das inscrições

- Nova cadeia de destinos em `/api/inscrever`: **Brevo** (`BREVO_API_KEY`) →
  Formspree → CSV local. O Formspree grátis para em 50 inscrições/mês e é um
  relay de e-mail, não uma lista: no lançamento não haveria para quem disparar.
  O Brevo guarda até 100 mil contatos no grátis e envia a campanha.
- `sendToBrevo` em `leads.ts` usa `updateEnabled: true` (reinscrição atualiza
  em vez de falhar) e grava a cidade no atributo `CIDADE`.
- **Retry de uma tentativa** em falhas transitórias (rede, 5xx, 401, 408, 429).
  Medido contra a API real: 25% de falha na 1ª tentativa caiu para 8% com a 2ª.
- "Seja um parceiro" segue no Formspree — contato pontual, não lista.

## Inscrição passa a captar a cidade

- `SubscribeForm` ganhou o campo **cidade** abaixo do e-mail, obrigatório, com
  `<datalist>` sugerindo as cidades do circuito sem impedir outras.
- Layout do formulário passou de "e-mail + botão lado a lado" para os dois
  campos empilhados com o botão em largura total.
- `POST /api/inscrever` valida a cidade (2 a 80 caracteres), envia ao Formspree
  e grava na nova coluna do `data/inscricoes.csv`. O assunto da notificação
  passou a incluir a cidade ("Nova inscrição — Cataguases").

## "Seja um parceiro" vira modal com formulário

- O botão do Guia Local deixou de abrir um link externo e passou a abrir um
  modal (`kind="partner"`) com **`PartnerForm.tsx`**: nome, e-mail, telefone
  (obrigatórios) e mensagem (opcional), no mesmo padrão do `SubscribeForm`.
- Nova rota **`POST /api/parceiro`** → Formspree via `FORMSPREE_PARCEIRO_ENDPOINT`,
  com fallback em `data/parceiros.csv` (com escape de CSV, já que a mensagem
  livre pode conter vírgulas e aspas).
- Lógica comum das duas rotas extraída para **`src/lib/leads.ts`** — validação,
  rate limit por rota, envio ao Formspree e escrita em CSV.
- **Correção de UX**: o rate limit passou a ser verificado **depois** da
  validação. Antes, tentativas inválidas contavam para o teto, então errar o
  preenchimento 3 vezes travava o usuário por 10 minutos.
- `siteConfig.links.partnerForm` removido — não há mais formulário externo.

## Paleta do site: azul → verde-escuro + laranja

- O site adota a identidade atual do app. O verde foi **amostrado pixel a pixel**
  das capturas (`#153727` no header, `#24533F` nos cards), não estimado no olho.
- Tokens renomeados para não mentirem sobre o conteúdo:
  `brand-blue` → **`brand-green`** (23 usos) e `brand-sky` → **`brand-leaf`** (11).
  `brand-dark` / `brand-darker` mantiveram o nome, com valores verdes.
- Modo escuro deixou o navy e virou verde profundo (`night` `#0A1712`,
  `night-card` `#13291F`, `night-soft` `#0F1F17`); sombras `soft`/`card`
  passaram a usar rgba verde.
- Atualizados também `themeColor` (`layout.tsx`), `theme_color`
  (`site.webmanifest`) e o fundo do favicon (`icon.svg`).
- **Laranja mantido em `#FF6B35`** (o do app é `#FF6600`): com texto branco o do
  app cai para ~2,9:1 e reprovaria em AA até para texto grande. Diferença visual
  imperceptível, ganho de acessibilidade real.

## Carrossel — telas novas do app

- Imagens substituídas com o mesmo nome (`rotas`, `medalhas`, `guia`, `inicio`)
  e **4 telas novas**: `caminhadas`, `eventos`, `perfil`, `menu`.
- `SLIDES` reordenado em narrativa (descobrir → percorrer → viver a cidade →
  colecionar → seu espaço) e legendas reescritas para descrever a tela real —
  elas também alimentam o `alt` de cada imagem.
- **`qr.jpeg` saiu do carrossel**: a captura mostra o estado de erro do scanner
  ("Você ainda não chegou ao local"), além de ser da identidade visual antiga.
- `inicio.jpeg` segue apenas como mockup do Hero, para não repetir a mesma tela.
- **Privacidade**: o e-mail pessoal visível em `menu.jpeg` e `perfil.jpeg` foi
  borrado (pixelização + desfoque gaussiano, irreversível) antes de a imagem ir
  para uma página pública.

## "Baixar o app" vira "Inscreva-se" (captação de e-mails)

- O CTA do **header** (desktop e mobile) passou de "Baixar o app" para
  **"Inscreva-se"**. Continua abrindo o mesmo modal `coming-soon`, com o mesmo
  título e o mesmo texto.
- Dentro do modal, os botões ilustrativos de App Store / Google Play deram lugar
  ao novo **`SubscribeForm.tsx`**: campo de e-mail + botão "Inscrever-se", com
  validação, estados de envio/sucesso/erro e feedback em `aria-live`.
- Nova rota **`POST /api/inscrever`**: valida e normaliza o e-mail, honeypot
  `_gotcha`, rate limit por IP e envio ao **Formspree** via `FORMSPREE_ENDPOINT`
  — sem a variável, cai no fallback `data/inscricoes.csv` (ignorado pelo git).
- Novo `.env.example` documentando a variável.
- `StoreButtons` segue no **Hero** e no **CTA final** — apenas saiu do modal.

## Fix — rolagem horizontal no mobile (botão de menu sumindo)

- As "asas" laterais do carrossel 3D (slides com `translateX` grande) estouravam
  a largura da tela e geravam **rolagem horizontal**, empurrando o botão de menu
  para fora no mobile.
- Correções: `overflow-hidden` no palco do carrossel (recorta as laterais) e
  `overflow-x: hidden` no `body` como trava de segurança global.

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
