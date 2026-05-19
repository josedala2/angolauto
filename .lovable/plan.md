## Objetivo

Libertar espaço na navbar principal movendo o `SegmentToggle` para uma barra utilitária fina (≈32px) por cima da navbar, sempre visível no desktop.

## Mudanças

**Novo `src/components/TopUtilityBar.tsx`**
- Faixa `h-8`, fundo `bg-secondary/60` com `border-b border-border/40` e `backdrop-blur`.
- Container centrado, `text-[11px]`, distribuído em duas zonas:
  - Esquerda: contactos rápidos (telefone `+244 923 000 000` + email `info@angolauto.co.ao`) como links discretos com ícones `Phone` / `Mail`.
  - Direita: `<SegmentToggle compact />`.
- Esconde no mobile (`hidden lg:flex`) — no mobile o toggle continua dentro do menu hambúrguer.

**`src/components/Navbar.tsx`**
- Remover o bloco `<SegmentToggle compact />` + divisor (linhas ~263-264) do cluster direito desktop. Mantém ThemeToggle, login/conta e CTA Test Drive — fica mais arejado.
- Manter o `SegmentToggle` já existente no menu mobile.

**`src/App.tsx`**
- Renderizar `<TopUtilityBar />` antes de `<Navbar />` dentro do wrapper flex.

**`src/components/Navbar.tsx` — offset do scroll**
- A navbar é `fixed top-0`. Para a utility bar não ser tapada, alterar a navbar para `top-0` apenas quando `scrolled` (esconde a utility bar ao fazer scroll), ou mais simples: deixar a utility bar como parte do fluxo normal (não fixed) e a navbar continua `fixed top-0` — ao fazer scroll a utility bar sai do viewport e a navbar fica colada no topo. Esta é a abordagem escolhida: zero alterações no comportamento atual da navbar.

## Resultado

- Navbar desktop fica com menos um elemento → respira melhor.
- Toggle continua sempre acessível no topo da página (estado inicial) e via menu mobile.
- Bónus: contactos visíveis acima da fold reforçam confiança sem ocupar a navbar.