# Componentes

Cada seção da página é um componente em `src/components/`. A ordem de montagem
está em `src/app/page.tsx`.

## Seções (ordem da página)

| # | Componente            | Papel |
|---|-----------------------|-------|
| 1 | `Header.tsx`          | Header fixo (transparente → sólido no scroll), navegação, widget de acessibilidade e CTA "Baixar o app". Client. |
| 2 | `Hero.tsx`            | Hero com degradê azul, headline, CTAs de loja e mockup do app. |
| 3 | `HowItWorks.tsx`      | "Como funciona" em 3 passos. |
| 4 | `Features.tsx`        | Grid de funcionalidades com ícones. |
| 5 | `Cities.tsx`          | Cidades do circuito (cards). |
| 6 | `Gamification.tsx`    | Conquistas/medalhas e coleta por QR. |
| 7 | `LocalGuide.tsx`      | Guia Local + CTA "Seja um parceiro". |
| 8 | `FinalCTA.tsx`        | Faixa final de download. |
| 9 | `Footer.tsx`          | Rodapé: marca, redes sociais e institucional. |

> A antiga seção **"Acessibilidade de verdade"** foi removida da página. A
> acessibilidade continua disponível no **navbar** (widget no `Header`).

## UI / compartilhados

| Componente                 | Papel |
|----------------------------|-------|
| `Logo.tsx`                 | Marca "Luz de Minas" (variações light/dark). |
| `StoreButtons.tsx`         | Botões App Store / Google Play. |
| `AccessibilityControls.tsx`| Widget: tamanho de fonte (A/A+/A++) e alternância claro/escuro. Client. |
| `Reveal.tsx`               | Anima entrada ao entrar na viewport. Client. |
| `SectionHeading.tsx`       | Cabeçalho padrão de seção (eyebrow + título + descrição). |
| `Placeholder.tsx`          | Placeholder visual de imagem (trocar por `next/image`). |
| `Icons.tsx`                | Ícones SVG inline. |

## Tema escuro nos componentes

As superfícies claras usam variantes `dark:` do Tailwind (ex.: `dark:bg-night-card`,
`dark:text-slate-300`, `dark:text-brand-sky` para acentos). Tokens de cor do
modo escuro estão em `tailwind.config.ts` (`night`, `night.card`, `night.soft`,
`brand.sky`).
