

## Plano: Aumentar espaçamento do texto nos Hero Banners

O problema é que o `PageHero` usa `flex items-end` com apenas `pb-8` de padding inferior, e não tem padding superior suficiente para compensar a navbar fixa. A secção tem `h-[35vh] min-h-[280px]`, o que deixa o conteúdo muito próximo do topo.

### Alteração em `src/components/PageHero.tsx`

1. Aumentar a altura mínima de `min-h-[280px]` para `min-h-[340px]` e `max-h-[420px]` para `max-h-[500px]` — dá mais espaço vertical
2. Adicionar `pt-24` (96px) ao container de conteúdo para garantir distância da navbar (que ocupa ~64-80px)
3. Aumentar `pb-8` para `pb-12` para mais respiração na base

Resultado: o texto fica centrado verticalmente na metade inferior do hero, com separação clara da navbar.

### Ficheiro afectado
- `src/components/PageHero.tsx` — 1 linha alterada

