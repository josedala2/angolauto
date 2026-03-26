

## Plano: Corrigir sobreposição da marca/nome sobre o breadcrumb

### Problema
O bloco de conteúdo (marca + nome do veículo) usa `-mt-16 relative z-10` (linha 274), puxando o texto para cima sobre a zona do hero. Como o breadcrumb está posicionado `absolute` dentro do hero com `z-20`, e o conteúdo abaixo tem `z-10`, em certos viewports o texto grande do nome do veículo (`text-7xl`) pode sobrepor visualmente o breadcrumb.

### Solução
1. **Reduzir o `z-index` do conteúdo** de `z-10` para `z-[5]` na linha 274, garantindo que o breadcrumb (`z-20`) fica sempre por cima.
2. **Adicionar `relative z-30`** ao wrapper do breadcrumb (linha 258-259) para reforçar a prioridade.
3. Alternativamente, se o problema é que o conteúdo sobe demasiado: reduzir `-mt-16` para `-mt-8`, criando mais separação entre o hero e o bloco de título.

### Alteração em `src/pages/VehicleDetail.tsx`
- **Linha 259**: Aumentar z-index do breadcrumb de `z-20` para `z-30`
- **Linha 274**: Reduzir margin negativo de `-mt-16` para `-mt-8` e manter `z-10`, ou baixar para `z-[5]`

### Ficheiro afectado
- `src/pages/VehicleDetail.tsx` — 2 linhas ajustadas

