## Faixa de modelos (chips) abaixo do hero

Adicionar uma barra horizontal de "chips" estilo Renault (`JP4x4 · CARE · RENAULT 4 · SYMBIOZ · CAPTUR · 5`) logo após o `HeroSection` na homepage, permitindo navegação rápida para modelos em destaque.

### Novo componente: `src/components/ModelChipsBar.tsx`

- Estilo: barra full-width com `glass-card`/borda subtil, sticky **não**, apenas inline.
- Conteúdo: lista horizontal scrollável (`overflow-x-auto` em mobile, centrado em desktop) com os modelos featured.
- Cada chip:
  - `Link` para `/veiculos/{id}` (ou `/veiculos?marca={brand}` como fallback se a rota de detalhe não existir — verificar `App.tsx` antes).
  - Conteúdo: nome do modelo em `font-display tracking-wider uppercase` + marca em texto pequeno mute.
  - Estado hover: borda inferior dourada (primary), leve translateY, transição com easing `cubic-bezier(0.22, 1, 0.36, 1)`.
  - Padding `px-5 py-3`, separadores visuais discretos (border-r border-border/30).
- Lista de modelos (top 5–6, mistura de marcas, alinhada com slides do hero):
  - Suzuki Jimny, Suzuki Vitara, DFSK Glory 580, Ineos Grenadier, Scania R 500.
- Fonte de dados: `import { vehicles } from "@/data/vehicles"` filtrando `featured` ou hardcoded por IDs para garantir ordem editorial.
- Animação de entrada: fade+slide-up via Framer Motion com stagger ligeiro por chip.

### Integração

- Editar `src/pages/Index.tsx`:
  ```
  <HeroSection />
  <ModelChipsBar />
  <BrandShowcase />
  ...
  ```
- Sem alterações em Hero ou outras secções.

### Responsivo

- Mobile: scroll horizontal com `snap-x snap-mandatory`, padding lateral, sem scrollbar visível (`scrollbar-hide` utility ou inline style).
- Desktop (≥lg): chips centrados, sem scroll, espaçamento generoso.

### Notas

- Apenas UI/navegação, sem backend.
- Reusa tokens existentes (`primary`, `border`, `glass-card`); sem novos tokens.
- Verificar em `App.tsx` a rota de detalhe de veículo para escolher entre `/veiculos/{id}` vs filtro por marca.
