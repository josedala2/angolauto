

## Plano: Converter Hero da homepage num slideshow

Transformar o `HeroSection` estático num carousel fullscreen com múltiplos slides, reutilizando as mesmas imagens dos veículos e a mesma mecânica de autoplay/parallax do `HighlightsCarousel`.

### Slides do Hero

| # | Imagem | Título | Subtítulo | CTA |
|---|--------|--------|-----------|-----|
| 1 | `hero-bg.jpg` | A SUA PRÓXIMA VIAGEM COMEÇA AQUI | Suzuki · DFSK · Ineos · Scania | Ver Catálogo |
| 2 | `jimny-hero.jpg` | SUZUKI JIMNY | O ícone off-road está de volta | Ver Modelos Suzuki |
| 3 | `glory580-hero.jpg` | DFSK GLORY 580 | Conforto e espaço para toda a família | Ver Modelos DFSK |
| 4 | `grenadier-hero.jpg` | INEOS GRENADIER | Construído com propósito | Explorar Ineos |
| 5 | `r500-hero.jpg` | SCANIA R 500 | Força bruta no transporte pesado | Saber Mais |

### Alterações

**Ficheiro: `src/components/HeroSection.tsx`**

- Converter de componente estático para slideshow fullscreen
- Adicionar array de slides com imagem, título, subtítulo, link e CTA
- Reutilizar a mesma lógica do `HighlightsCarousel`:
  - `requestAnimationFrame` para progresso suave (6s por slide)
  - `AnimatePresence` com transições parallax direcionais
  - Ken Burns (zoom lento) no background
  - Pausa ao hover
  - Barras de progresso na parte inferior
  - Setas de navegação esquerda/direita
- Manter o indicador de scroll (ChevronDown) e o layout `min-h-screen`
- Manter os gradientes `from-background` para integração com o tema claro/escuro

### Ficheiros afectados
- `src/components/HeroSection.tsx` — reescrita completa

Nenhuma alteração a outros ficheiros ou à base de dados.

