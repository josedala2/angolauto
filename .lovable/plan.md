# Menu por Segmento na Navbar

Adicionar um novo dropdown "Segmentos" na navbar desktop e uma secção colapsável no menu mobile, com atalhos para SUV, Pickup, Comercial e Pesados (camiões). Cada item navega para `/veiculos?categoria=<valor>` e a página de Veículos pré-seleciona automaticamente esse filtro de categoria.

## Itens do menu

- **SUV** → `/veiculos?categoria=SUV` (ícone Mountain)
- **Pickup** → `/veiculos?categoria=Pickup` (ícone Truck)
- **Comercial** → `/veiculos?categoria=Comercial` (ícone Package)
- **Pesados** → `/veiculos?categoria=Camião` (ícone TruckIcon)

Os valores correspondem exatamente às categorias já existentes em `src/data/vehicles.ts` (SUV, Pickup, Comercial, Camião).

## Alterações técnicas

**`src/components/Navbar.tsx`**
- Criar array `segmentItems` com label, categoria, ícone e curta descrição.
- Desktop: novo dropdown "Segmentos" entre "Veículos" e o restante, seguindo o padrão visual do dropdown "Veículos" (glass-card, ChevronDown, hover state, indicador animado quando ativo).
- Mobile: nova secção colapsável "Segmentos" com o mesmo padrão das secções Marcas/Veículos existentes.
- Estado ativo: destacado a `text-primary` quando `location.pathname === "/veiculos"` e o `searchParams.get("categoria")` corresponder.

**`src/pages/Vehicles.tsx`**
- Ler `searchParams.get("categoria")` no mount e usá-lo como valor inicial de `selectedCategory` (já existe a state). Mantém retrocompatibilidade com `?marca=` e `?q=`.
- Reagir a mudanças do parâmetro (`useEffect` dependente de `searchParams`) para que clicar noutro segmento enquanto já se está em `/veiculos` atualize o filtro.

## Fora do escopo

- Não altera lógica de negócio, dados ou backend.
- Não mexe noutras categorias visíveis (Off-Road, Sedan continuam acessíveis pelo filtro lateral).
