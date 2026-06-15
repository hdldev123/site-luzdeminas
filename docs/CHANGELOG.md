# Changelog

Registro de mudanças por commit. As mais recentes no topo.

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
