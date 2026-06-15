# Documentação · Luz de Minas (Landing Page)

Documentação técnica e funcional da landing page de divulgação do app **Luz de
Minas** — turismo histórico e cultural da Zona da Mata mineira (Circuito Luz de
Minas: Cataguases, Leopoldina e Piacatuba/Itamarati).

> Esta documentação é **atualizada a cada commit**. Veja o histórico em
> [CHANGELOG.md](./CHANGELOG.md).

## Índice

- [Arquitetura](./arquitetura.md) — stack, estrutura de pastas e decisões técnicas.
- [Componentes](./componentes.md) — o que cada componente faz e como se conecta.
- [Funcionalidades](./funcionalidades.md) — tema (modo escuro padrão),
  acessibilidade, popups/modais, carrossel e comportamentos interativos.
- [Configuração](./configuracao.md) — onde trocar links, imagens, textos,
  contatos e formulários.
- [CHANGELOG](./CHANGELOG.md) — registro de mudanças por commit.

## Visão rápida

| Item              | Valor                                            |
| ----------------- | ------------------------------------------------ |
| Stack             | Next.js 14 (App Router) + TypeScript + Tailwind  |
| Renderização      | Estática (SSG) — `/` pré-renderizada             |
| Idioma            | Português do Brasil (pt-BR)                      |
| Tema padrão       | **Escuro** (alternável para claro pelo usuário)  |
| Acessibilidade    | Fonte ajustável + modo claro/escuro no navbar    |

## Como rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
```

> ⚠️ **OneDrive**: ao buildar dentro de uma pasta sincronizada pelo OneDrive, o
> arquivo `.next/trace` pode ser bloqueado (erro `EPERM`). Rode com o OneDrive
> pausado, mantenha o projeto fora da sincronização, ou builde numa cópia local.
> O deploy (Vercel/Netlify) não é afetado, pois o build roda no servidor.
