

## Plano: Mover Breadcrumbs para dentro do Hero (substituir botão Voltar)

### Problema
O `Breadcrumbs` está posicionado na linha 271, dentro do container de conteúdo com `-mt-16`, sobrepondo potencialmente a lightbox. Além disso, existe redundância entre o botão "Voltar" (linha 258-266, posicionado `absolute top-6 left-6` sobre o hero) e o breadcrumb.

### Solução
Substituir o botão "Voltar" pelo `Breadcrumbs` directamente no hero, na mesma posição (`absolute top-6 left-6`). Remover o breadcrumb duplicado da secção de conteúdo abaixo.

### Alterações em `src/pages/VehicleDetail.tsx`

1. **Linhas 257-266** — Substituir o bloco do botão "Voltar" pelo componente `Breadcrumbs` com estilo adaptado ao overlay (texto claro, fundo semi-transparente com blur):
   - Envolver num `div` com `absolute top-6 left-6 z-20`
   - Aplicar classes de estilo glass (`bg-background/40 backdrop-blur-sm rounded-full px-4 py-2`) ao `nav` do breadcrumb
   - Adicionar `onClick stopPropagation` para não abrir a lightbox ao clicar

2. **Linhas 271-275** — Remover o bloco `<Breadcrumbs>` que está no container de conteúdo

### Detalhe técnico
O componente `Breadcrumbs` aceita `items` mas não aceita `className`. Será necessário envolver num `div` estilizado com o efeito glass, ou passar o estilo inline. Como o componente é simples, envolver num `div` é suficiente.

### Ficheiro afectado
- `src/pages/VehicleDetail.tsx` — 2 blocos alterados

