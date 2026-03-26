

## Plano: Melhorar visibilidade das imagens no Hero slideshow

As imagens estão escurecidas demais devido a dois overlays de gradiente pesados (linhas 138-139 do `HeroSection.tsx`):

```
from-background via-background/80 to-background/40   ← cobre 80% ao centro
from-background via-transparent to-background/30
```

### Alterações em `src/components/HeroSection.tsx`

Reduzir a opacidade dos gradientes para deixar as imagens mais visíveis, mantendo contraste suficiente para o texto:

- **Gradiente horizontal** (linha 138): `from-background/90 via-background/50 to-background/10`
- **Gradiente vertical** (linha 139): `from-background/70 via-transparent to-background/10`

Isto reduz a cobertura central de 80% para 50% e o topo de 30% para 10%, tornando as imagens significativamente mais visíveis especialmente do lado direito e centro do ecrã.

### Ficheiro afectado
- `src/components/HeroSection.tsx` — linhas 138-139

