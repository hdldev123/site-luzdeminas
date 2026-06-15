# Configuração — onde trocar conteúdo

Tudo o que muda com frequência está centralizado em **`src/lib/config.ts`**.

## Links, contatos e formulários (`src/lib/config.ts`)

| Campo                     | Descrição |
|---------------------------|-----------|
| `links.appStore`          | Link da App Store (placeholder `<<URL_APP_STORE>>`). |
| `links.googlePlay`        | Link do Google Play (placeholder `<<URL_GOOGLE_PLAY>>`). |
| `links.partnerForm`       | Formulário do botão "Seja um parceiro" (`<<URL_FORMS_PARCEIRO>>`). |
| `contact.email`           | E-mail exibido no footer (`mailto:`). |
| `contact.phoneDisplay`    | Telefone para exibição (ex.: `(32) 99999-9999`). |
| `contact.phoneHref`       | Telefone em E.164 para o link `tel:` (ex.: `+5532999999999`). |
| `social.instagram`        | Perfil do Instagram (única rede exibida no footer). |

> Itens marcados como `<<...>>` são **placeholders** — troque pelos valores reais.
>
> **Termos de Uso** e **Política de Privacidade** são modais; o texto fica em
> `src/components/ModalsHost.tsx` (template — revisar juridicamente).

## Imagens

Os placeholders visuais usam o componente `Placeholder.tsx` com rótulos `<<...>>`
(ex.: `<<screenshot-hero>>`, `<<foto-cataguases>>`). Para usar imagens reais:

1. Coloque o arquivo em `public/` (ex.: `public/cataguases.jpg`).
2. Substitua `<Placeholder ... />` por `next/image`:
   ```tsx
   import Image from "next/image";
   <Image src="/cataguases.jpg" alt="..." width={800} height={600} loading="lazy" />
   ```

## SEO / compartilhamento

- `src/app/layout.tsx`: `title`, `description`, Open Graph, Twitter Card e JSON-LD.
- Ajuste `SITE_URL` para o domínio real.
- Adicione `public/og-image.jpg` (1200×630) para o compartilhamento.

## Textos / copy

Os textos de cada seção ficam no topo do respectivo componente em
`src/components/` (arrays como `FEATURES`, `STEPS`, `CITIES`). Edite diretamente.

## Identidade visual (`tailwind.config.ts`)

| Token          | Cor       | Uso                         |
| -------------- | --------- | --------------------------- |
| `brand-blue`   | `#00478F` | Azul institucional          |
| `brand-dark`   | `#002D72` | Degradê do hero             |
| `brand-darker` | `#001A44` | Base do degradê / footer    |
| `brand-orange` | `#FF6B35` | Destaque / CTA              |
| `brand-sky`    | `#4DA3FF` | Acento sobre fundo escuro   |
| `surface`      | `#F9FAFB` | Fundo claro                 |
| `ink`          | `#1F2937` | Texto (tema claro)          |
| `night`        | `#0A1426` | Fundo (tema escuro)         |
| `night-card`   | `#13213D` | Cartões (tema escuro)       |
| `night-soft`   | `#0F1B33` | Seções alternadas (escuro)  |
