

## Plano: Redesign das Timelines (Sobre Nós + Marcas)

### Problema actual
- **About.tsx**: Timeline vertical simples com círculos pequenos (40px) e texto alinhado à direita. Visualmente básica, sem destaque.
- **BrandDetail.tsx**: Linha vertical à esquerda com pontos pequenos (16px). Estilo minimalista mas pouco impactante.
- Ambas parecem genéricas e não transmitem a presença premium do site.

### Design proposto: Timeline premium com cards alternados

Criar um componente reutilizável `Timeline` que ambas as páginas usem, com o seguinte design:

1. **Layout alternado em desktop** — itens pares à esquerda, ímpares à direita da linha central. Em mobile, coluna única à direita.
2. **Linha central decorativa** — gradiente dourado (primary) com pulso animado no ponto activo.
3. **Nó do ano** — círculo maior (56px) com borda dourada, fundo glass, ano em bold. Efeito hover com scale e glow.
4. **Cards com conteúdo** — glass-card com hover elevação, título em bold, descrição em muted. Seta a apontar para a linha central.
5. **Animação staggered** — cada card entra com fade + slide lateral (da esquerda ou direita conforme o lado).
6. **Dot connector** — linha horizontal a ligar o card ao nó central.

### Estrutura técnica

**Novo ficheiro**: `src/components/Timeline.tsx`
```text
Props:
  items: { year: string; title: string; description: string }[]
  variant?: "centered" | "left" (default "centered")

Desktop centered:
  Card ──── ● ──── 
            │
       ──── ● ──── Card
            │
  Card ──── ●

Mobile / left variant:
  ● ── Card
  │
  ● ── Card
```

**Alterações**:
- `src/pages/About.tsx` — substituir timeline inline pelo componente `<Timeline>`, converter dados ao novo formato
- `src/pages/BrandDetail.tsx` — substituir timeline inline pelo componente `<Timeline>`, fazer parse do `year` e `description` a partir das strings `"YYYY — texto"`

### Ficheiros afectados
- `src/components/Timeline.tsx` (novo)
- `src/pages/About.tsx` (substituir secção timeline)
- `src/pages/BrandDetail.tsx` (substituir secção timeline)

