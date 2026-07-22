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

## Inscrições por e-mail — Formspree

O formulário "Inscreva-se" envia para `POST /api/inscrever`. O destino depende da
variável de ambiente **`FORMSPREE_ENDPOINT`**:

| Cenário | Comportamento |
|---------|---------------|
| Variável **definida** | A inscrição vai para o **Formspree** (`POST` JSON com `email`, `_subject`, `origem`, `data`). |
| Variável **ausente**  | Fallback: grava em `data/inscricoes.csv` na raiz (pasta no `.gitignore`). Útil em dev. |

### Como configurar

1. Crie uma conta em [formspree.io](https://formspree.io) e um **novo formulário**.
2. Copie o endpoint em **Forms → seu form → Integration** — algo como
   `https://formspree.io/f/abcdwxyz`.
3. Copie `.env.example` para **`.env.local`** na raiz e preencha:

```bash
FORMSPREE_ENDPOINT="https://formspree.io/f/abcdwxyz"
```

4. Reinicie o `npm run dev` (variáveis de ambiente só são lidas na inicialização).
5. Em produção, cadastre a mesma variável no painel da hospedagem
   (Vercel: *Settings → Environment Variables*).

> O campo aceita **a URL completa ou só o ID** do formulário (`abcdwxyz`).
>
> O primeiro envio precisa ser confirmado no e-mail que o Formspree manda para
> ativar o formulário — antes disso ele responde com erro.

### Detalhes de implementação

- `email` é campo especial do Formspree: vira o **reply-to** da notificação.
- `_subject` define o assunto ("Nova inscrição — Luz de Minas").
- `_gotcha` é um **honeypot** invisível no formulário; se vier preenchido, a
  requisição é descartada silenciosamente (bot).
- Erros do Formspree são lidos do campo `errors[].message` e logados no servidor;
  o usuário vê uma mensagem genérica.

> ⚠️ Em hospedagem **serverless** (Vercel/Netlify) o disco é efêmero: o CSV do
> fallback não persiste. Em produção, configurar o Formspree é obrigatório.

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

A paleta é **verde-escuro + laranja**, amostrada das telas reais do app para o
site e o aplicativo lerem como a mesma marca.

| Token          | Cor       | Uso                         |
| -------------- | --------- | --------------------------- |
| `brand-green`  | `#24533F` | Verde institucional         |
| `brand-dark`   | `#153727` | Verde do header do app      |
| `brand-darker` | `#0C2118` | Base do degradê / footer    |
| `brand-orange` | `#FF6B35` | Destaque / CTA              |
| `brand-leaf`   | `#6FD69B` | Acento sobre fundo escuro   |
| `surface`      | `#F9FAFB` | Fundo claro                 |
| `ink`          | `#1F2937` | Texto (tema claro)          |
| `night`        | `#0A1712` | Fundo (tema escuro)         |
| `night-card`   | `#13291F` | Cartões (tema escuro)       |
| `night-soft`   | `#0F1F17` | Seções alternadas (escuro)  |

> `#153727` é a cor do header do app — amostrada pixel a pixel das capturas.
> Ela também alimenta o `themeColor` em `layout.tsx`, o `theme_color` do
> `site.webmanifest` e o fundo do favicon (`src/app/icon.svg`).

**Contraste (WCAG):** texto branco sobre os verdes rende de 8,8:1 a 16,9:1 —
folgado para AA e AAA. O `brand-orange` com texto branco fica em ~3,1:1: passa
em AA apenas para **texto grande**, que é como ele é usado (botões e títulos).
Por isso o laranja do site (`#FF6B35`) foi mantido em vez do laranja do app
(`#FF6600`, ~2,9:1), que reprovaria até nesse critério.
