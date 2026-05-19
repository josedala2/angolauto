# Badge "Stock disponível" vs "Por encomenda"

Adicionar um badge visual nos cards de veículos (grid e lista em `/veiculos`, e em `FeaturedVehicles`) a indicar disponibilidade. Como o esquema da BD não tem ainda um campo de stock, o estado é derivado de uma regra simples baseada nos dados existentes (marca + categoria), encapsulada num helper reutilizável — fácil de substituir mais tarde por um campo real.

## Regra de derivação

Helper `getStockStatus(vehicle)` em `src/lib/stockStatus.ts`:

- **Por encomenda** → camiões pesados (`category === "Camião"`, ou seja Scania) e Ineos Grenadier (importação dedicada).
- **Stock disponível** → restantes (Suzuki, DFSK e modelos ligeiros em geral).

Retorna `{ label, tone }` onde `tone` é `"available" | "order"`.

## Componente novo

`src/components/StockBadge.tsx` — pequeno badge com:

- `tone="available"`: ponto verde + texto "Stock disponível", fundo `bg-emerald-500/10`, texto `text-emerald-600 dark:text-emerald-400`, borda subtil.
- `tone="order"`: ponto âmbar + texto "Por encomenda", fundo `bg-amber-500/10`, texto `text-amber-600 dark:text-amber-400`.
- Estilo glass/pill consistente com os outros chips do card (`rounded-full`, `text-[10px]` tracking-wider uppercase).

## Onde aparece

- **`src/pages/Vehicles.tsx`** — no card grid (sobreposto na imagem, canto sup. esquerdo) e no card list (junto ao nome/categoria).
- **`src/components/FeaturedVehicles.tsx`** — sobreposto na imagem, canto sup. esquerdo, ao lado de eventuais badges existentes.

## Fora do escopo

- Não cria migração nem altera schema da BD (pode ser feito num pedido seguinte se o utilizador quiser controlar manualmente o stock).
- Sem alterações em filtros/ordenação.
