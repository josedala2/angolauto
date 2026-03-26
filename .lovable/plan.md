

## Plan: Atualizar logotipo da Angolauto

O novo logotipo será integrado em formato SVG (qualidade superior e escalável) e PNG (fallback).

### Alterações

1. **Copiar ficheiros do logotipo** para `src/assets/`:
   - `logo_Angolauto.svg` → `src/assets/logo.svg`
   - `logo_Angolauto.png` → `src/assets/logo.png` (substituir o actual)

2. **Atualizar imports** nos componentes que usam o logo:
   - `src/components/Navbar.tsx` — mudar import para o SVG
   - `src/components/Footer.tsx` — mudar import para o SVG

3. **Atualizar cores do CSS** baseadas no logotipo oficial:
   - Vermelho: `#e30613` (HSL ≈ `356 94% 45%`)
   - Azul: `#003a78` (HSL ≈ `211 100% 24%`)
   - Ajustar `--primary`, `--accent`, gradients e tokens em `src/index.css` (dark e light mode)

### Ficheiros afectados
- `src/assets/logo.svg` (novo)
- `src/assets/logo.png` (substituído)
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/index.css`

