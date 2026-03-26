

## Plano: Modo claro como default

### Problema
O tema escuro é o default — a inicialização assume `isDark = true` e só muda para claro se `localStorage` tiver `"light"`. Além disso, o `index.html` e o CSS usam `:root` como escuro e `.light` como claro.

### Alterações

1. **`src/components/ThemeToggle.tsx`**
   - Mudar o estado inicial de `isDark` para `false` (linha 9: `return true` → `return false`)
   - Ajustar a lógica do `useEffect` de localStorage (linha 23-26): verificar se `saved === "dark"` para activar modo escuro, em vez de verificar `"light"`
   - Na inicialização, adicionar classe `light` por default ao `<html>`

2. **`index.html`** — Adicionar `class="light"` ao elemento `<html>` para garantir que o primeiro render já é claro (evita flash escuro)

### Ficheiros afectados
- `src/components/ThemeToggle.tsx` — lógica de default invertida
- `index.html` — classe `light` no `<html>`

