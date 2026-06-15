# Luz de Minas — Landing Page

Landing page de divulgação (one-page, responsiva, foco em conversão) do app
**Luz de Minas**: turismo histórico e cultural da Zona da Mata mineira e do
**Circuito Luz de Minas** (Cataguases, Leopoldina e Piacatuba/Itamarati).

Construída com **Next.js (App Router) + Tailwind CSS + TypeScript**, mobile-first,
acessível (contraste AA, navegação por teclado, semântica) e otimizada para SEO.

---

## 🚀 Como rodar

Pré-requisitos: **Node.js 18.18+** (testado em Node 20) e npm.

```bash
npm install      # instala as dependências
npm run dev      # ambiente de desenvolvimento → http://localhost:3000
```

Para produção:

```bash
npm run build    # gera o build otimizado
npm run start    # serve o build em produção
```

---

## 🗂️ Estrutura

```
src/
├─ app/
│  ├─ layout.tsx        # <head>, SEO, Open Graph, JSON-LD, fonte Inter
│  ├─ page.tsx          # monta as seções na ordem da página
│  ├─ globals.css       # estilos base + acessibilidade + animação Reveal
│  └─ icon.svg          # favicon (gerado pelo Next)
├─ components/          # uma seção por componente
│  ├─ Header.tsx        # 1. header fixo + menu mobile + acessibilidade
│  ├─ Hero.tsx          # 2. hero com degradê, CTAs e mockup
│  ├─ HowItWorks.tsx    # 3. como funciona (3 passos)
│  ├─ Features.tsx      # 4. grid de funcionalidades
│  ├─ Cities.tsx        # 5. cidades do circuito
│  ├─ Gamification.tsx  # 6. conquistas / QR
│  ├─ LocalGuide.tsx    # 7. guia local + "Seja um parceiro"
│  ├─ Accessibility.tsx # 8. compromisso de acessibilidade
│  ├─ FinalCTA.tsx      # 9. faixa final de download
│  ├─ Footer.tsx        # 10. rodapé (links, parceiros, redes)
│  └─ ... (UI: Logo, StoreButtons, Reveal, Placeholder, Icons, etc.)
└─ lib/
   └─ config.ts         # ⚙️ links, contatos e parceiros (centralizado)
```

---

## ✏️ Onde trocar conteúdo

### Links das lojas, contatos e parceiros
Tudo centralizado em **`src/lib/config.ts`**:

- `links.appStore` / `links.googlePlay` → substitua `<<URL_APP_STORE>>` e
  `<<URL_GOOGLE_PLAY>>` pelos links reais das lojas.
- `links.partnerWhatsApp` → número/mensagem do botão **"Seja um parceiro"**.
- `social` → Instagram, Facebook, YouTube.
- `legal` → Política de Privacidade, Termos de Uso, Contato.
- `partners` → créditos/realização do rodapé (ex.: **Energisa**, **Prefeitura**).

### Imagens (placeholders)
As imagens aparecem como molduras com rótulos `<<...>>` via o componente
`src/components/Placeholder.tsx`. Para usar fotos reais:

1. Coloque o arquivo em `public/` (ex.: `public/cataguases.jpg`).
2. Troque `<Placeholder label="<<foto-cataguases>>" ... />` por:
   ```tsx
   import Image from "next/image";
   <Image src="/cataguases.jpg" alt="..." width={800} height={600}
          className="..." loading="lazy" />
   ```
   O `alt` sugerido já está no atributo `alt` de cada `Placeholder`.

Placeholders existentes: `<<screenshot-hero>>`, `<<foto-cataguases>>`,
`<<foto-leopoldina>>`, `<<foto-piacatuba>>`, `<<qr-marco>>`.

### Imagem de compartilhamento (Open Graph) e ícones
- Adicione `public/og-image.jpg` (**1200×630**) — referenciada em `layout.tsx`.
- Ajuste `SITE_URL` em `src/app/layout.tsx` para o domínio real.
- Favicon: edite `src/app/icon.svg`.

### Textos / copy
Cada componente em `src/components/` tem seus textos em PT-BR no topo do arquivo
(arrays `FEATURES`, `STEPS`, `CITIES`, etc.). Edite diretamente ali.

---

## ♿ Acessibilidade

O widget no header **funciona de verdade** (não é só ilustração):

- **Tamanho de fonte** ajustável (A / A+ / A++) via variável CSS `--font-scale`.
- **Modo escuro** alternável (classe `dark` no `<html>`, com `darkMode: "class"`
  no Tailwind). Respeita `prefers-color-scheme` no primeiro acesso e é aplicado
  antes da pintura (sem flash) via script inline em `layout.tsx`.

As preferências são persistidas em `localStorage` (`ldm-theme`, `ldm-font-scale`).
O código também inclui: skip link, foco visível, `prefers-reduced-motion`,
landmarks semânticos e textos alternativos.

---

## 🔍 SEO

- `title`, `meta description` e `keywords` em `layout.tsx`.
- **Open Graph** + **Twitter Card** (título, descrição, imagem).
- **Dados estruturados** (JSON-LD `MobileApplication`).
- Manifest em `public/site.webmanifest`.

---

## 🎨 Identidade visual

Definida em `tailwind.config.ts`:

| Token              | Cor       | Uso                         |
| ------------------ | --------- | --------------------------- |
| `brand-blue`       | `#00478F` | Azul institucional          |
| `brand-dark`       | `#002D72` | Degradê do hero             |
| `brand-darker`     | `#001A44` | Base do degradê             |
| `brand-orange`     | `#FF6B35` | Destaque / CTA              |
| `surface`          | `#F9FAFB` | Fundo claro                 |
| `ink`              | `#1F2937` | Texto                       |

Tipografia: **Inter** (via `next/font`). Animações de entrada sutis (componente
`Reveal`, com fallback para `prefers-reduced-motion`).
