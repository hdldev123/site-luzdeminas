# Arquitetura

## Stack

- **Next.js 14** (App Router) — renderização estática (SSG).
- **TypeScript** — tipagem em todo o projeto.
- **Tailwind CSS** — estilos utilitários, com `darkMode: "class"`.
- **next/font (Inter)** — tipografia auto-hospedada.

## Estrutura de pastas

```
src/
├─ app/
│  ├─ layout.tsx        # <head>, SEO, Open Graph, JSON-LD, fonte, tema padrão (dark)
│  ├─ page.tsx          # monta as seções na ordem da página
│  ├─ globals.css       # base + tema escuro + animações
│  └─ icon.svg          # favicon (gerado pelo Next)
├─ components/          # uma seção/UI por arquivo (ver componentes.md)
└─ lib/
   └─ config.ts         # ⚙️ links, contatos, formulários e textos configuráveis

docs/                   # esta documentação
public/                 # assets estáticos (og-image, fotos, manifest)
```

## Decisões técnicas

### Tema (modo escuro como padrão)
- Tailwind em `darkMode: "class"` — o tema é controlado pela classe `dark` no
  elemento `<html>`.
- O `<html>` já é renderizado com `class="dark"` (padrão escuro). Um script
  inline em `layout.tsx` roda **antes da pintura** e apenas **remove** `dark` se
  o usuário tiver salvo a preferência `light` em `localStorage` — evitando o
  "flash" de tema (FOUC).
- A preferência é persistida em `localStorage` na chave `ldm-theme`
  (`"dark"` | `"light"`).

### Renderização estática
- A página é 100% estática (`○ (Static)`), ótima para performance/SEO e
  compatível com hospedagem em CDN.

### Animações
- Entradas suaves via componente `Reveal` (IntersectionObserver) com fallback
  automático para `prefers-reduced-motion`.

## Testes / verificação

- **Tipos**: `npx tsc --noEmit`.
- **Build**: `npm run build` (em ambiente sem o bloqueio do OneDrive).
