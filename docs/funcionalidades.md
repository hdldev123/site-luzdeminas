# Funcionalidades e comportamentos

## Tema: modo escuro como padrão

- A aplicação **inicia no modo escuro**.
- O usuário pode alternar para claro pelo widget no `Header`
  (`AccessibilityControls`). A escolha é salva em `localStorage` (`ldm-theme`).
- Implementação: classe `dark` no `<html>` + script anti-flash no `layout.tsx`
  (ver [arquitetura](./arquitetura.md)).

## Acessibilidade (widget no navbar)

- **Tamanho de fonte** ajustável: A / A+ / A++ (variável CSS `--font-scale`,
  salva em `ldm-font-scale`).
- **Modo claro/escuro**: alternância com ícone de sol/lua.
- Extras: skip link ("Pular para o conteúdo"), foco visível, respeito a
  `prefers-reduced-motion`, HTML semântico e textos alternativos.

## Animações

- `Reveal` aplica fade + slide quando o elemento entra na viewport.
- Desativadas automaticamente para quem prefere menos movimento.

---

> As funcionalidades abaixo são adicionadas nos próximos lotes e esta seção será
> atualizada conforme forem implementadas:
>
> - **Popups "em breve"** nos botões de download/explorar. _(Lote 3)_
> - **Modais institucionais** (Termos de Uso / Política de Privacidade). _(Lote 2)_
> - **"Seja um parceiro"** abrindo um formulário externo. _(Lote 2)_
> - **Carrossel dinâmico** de telas do app na seção "Como funciona". _(Lote 3)_
