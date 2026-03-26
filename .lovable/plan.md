

## Plano: Adicionar logótipos das marcas no Portfólio

### Situação actual
Os cards de marca (homepage `BrandShowcase` e página `/marcas`) mostram apenas a imagem de showcase, nome em texto e tagline. Não existem ficheiros de logótipo das marcas no projecto (`src/assets/` não tem logos de Suzuki, DFSK, Ineos ou Scania).

### Solução

1. **Adicionar logótipos SVG** — criar 4 ficheiros em `src/assets/brands/`:
   - `suzuki-logo.svg`, `dfsk-logo.svg`, `ineos-logo.svg`, `scania-logo.svg`
   - SVGs simples com versão branca (para overlay na imagem) ou versão a cores para usar no card

2. **`src/components/BrandShowcase.tsx`** — Adicionar logo overlay na imagem do card:
   - Importar os 4 logos e mapear por `brand.id`
   - Posicionar o logo centrado sobre a imagem (overlay semi-transparente escuro + logo branco), ou abaixo da imagem no bloco de texto junto ao nome
   - Sugestão: logo pequeno (h-8) ao lado do nome `h3`, substituindo ou complementando o texto

3. **`src/pages/Brands.tsx`** — Mesmo tratamento: adicionar logo junto ao título de cada marca na secção alternada

### Design sugerido no card
```text
┌─────────────────┐
│   [imagem]       │
│    logo branco   │  ← overlay centralizado na imagem
│   sobre overlay  │
├─────────────────┤
│ [logo] Suzuki    │  ← ou logo pequeno ao lado do nome
│ WAY OF LIFE      │
│ Ver modelos →    │
└─────────────────┘
```

Recomendo colocar o logo no canto inferior da imagem (sobre um gradient escuro), para máximo impacto visual sem poluir o card.

### Ficheiros afectados
- `src/assets/brands/` — 4 novos SVGs (Suzuki, DFSK, Ineos, Scania)
- `src/components/BrandShowcase.tsx` — overlay com logo na imagem
- `src/pages/Brands.tsx` — logo junto ao título da marca

