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

O componente `Placeholder.tsx` aceita a prop **`src`**: com `src`, ele renderiza
a imagem real via `next/image` (lazy-load, `object-cover`); sem `src`, mostra a
moldura de placeholder com o rótulo `<<...>>`.

Para usar uma imagem real:

1. Coloque o arquivo em `public/` (ex.: `public/cataguases.jpg`).
2. Passe `src` no `Placeholder` correspondente:
   ```tsx
   <Placeholder src="/cataguases.jpg" alt="..." className="aspect-[4/3]" />
   ```

**Imagens já conectadas** (em `public/`):

| Uso        | Arquivo        |
|------------|----------------|
| Hero       | `/inicio.jpeg` |
| Carrossel  | `/rotas.jpeg`, `/audio.jpeg`, `/qr.jpeg`, `/medalhas.jpeg`, `/guia.jpeg` |
| Cidades    | `/cataguases.png`, `/leopoldina.jpg`, `/itamarati.png` |
| Gamificação| `/cataguases.png` (marco ilustrativo) |

Todas as imagens da página já estão conectadas. Para trocar qualquer uma, basta
substituir o arquivo em `public/` (mesmo nome) ou ajustar o `src` no componente.

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
