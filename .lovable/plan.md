

## Diagnóstico: Veículos não aparecem em nenhuma página

### Análise do código actual

O código de `Vehicles.tsx`, `FeaturedVehicles.tsx` e `VehicleDetail.tsx` está estruturalmente correcto — todos fazem fetch à tabela `vehicles` da base de dados. A base de dados tem 10 veículos activos confirmados. Não há erros na consola.

### Causa provável

A query ao backend pode estar a falhar silenciosamente (timeout, problema de rede) ou a retornar array vazio sem disparar erro, resultando em `0 veículo(s) encontrado(s)` e nenhum card renderizado.

### Plano de correcção

**Adicionar fallback com dados estáticos** — quando a base de dados não retorna veículos, usar os dados do ficheiro `src/data/vehicles.ts` como fallback para garantir que o catálogo nunca fica vazio.

#### Ficheiros a alterar

1. **`src/pages/Vehicles.tsx`**
   - Importar `vehicles` de `@/data/vehicles` como `staticVehicles`
   - Após o fetch, se `data` for vazio ou null, usar `staticVehicles` mapeados para o formato da DB (campos snake_case: `fuel_type`, `fuelType` → adaptação)
   - Adicionar `console.error` mais detalhado quando o fetch falha

2. **`src/components/FeaturedVehicles.tsx`**
   - Mesma lógica: importar dados estáticos, filtrar os `featured: true`, e usar como fallback se o fetch retornar vazio

3. **`src/data/vehicles.ts`**
   - Adicionar função helper `toDbFormat()` que converte os veículos estáticos para o formato snake_case da DB (ex: `fuelType` → `fuel_type`)
   - Garantir que os IDs estáticos são consistentes para os links funcionarem

### Resultado esperado

Os veículos aparecem sempre, independentemente do estado da ligação ao backend. Quando a base de dados responde, usa esses dados; quando falha, mostra os dados estáticos como fallback.

### Secção técnica

```text
Fluxo de dados:
  useEffect → supabase.from("vehicles") → data?
    ├─ data.length > 0 → setVehicles(data)    ← normal
    └─ data.length === 0 or error → setVehicles(staticFallback)  ← NEW
```

Mapeamento de campos necessário em `vehicles.ts`:
- `fuelType` → `fuel_type`
- `engine` → `engine` (igual)
- Adicionar campos `active: true`, `created_at`, `updated_at` com defaults

