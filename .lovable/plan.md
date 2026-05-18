## Simplificar CTAs do Hero

Atualmente o primeiro slide do hero tem dois botões com peso visual semelhante ("Ver Catálogo" + "Agendar Test Drive"), criando concorrência entre ações. A proposta é manter **1 CTA primário** + **1 link secundário discreto** (sem peso de botão), como fazem Volkswagen.pt e Renault.pt.

### Alterações em `src/components/HeroSection.tsx`

**1. Estrutura de dados dos slides**
- Manter `cta` + `ctaLink` como CTA primário em todos os slides.
- Renomear o conceito de `ctaSecondary` para um link textual leve:
  - Slide 1 (institucional): CTA primário "Ver Catálogo" → `/veiculos`; link secundário "Agendar test drive →" → `/contacto`.
  - Slides de marca: apenas CTA primário (sem link secundário), como já estão.

**2. Renderização dos CTAs (linhas 168–179)**
- Substituir o `Button variant="heroOutline"` por um `Link` textual:
  - Estilo: `text-sm font-display tracking-widest uppercase text-white/80 hover:text-primary transition-colors inline-flex items-center gap-2`.
  - Inclui seta `ArrowRight` mais pequena.
  - Alinhado verticalmente ao centro do botão primário (`items-center` no container).
- Remover `flex-wrap gap-4` em favor de `flex items-center gap-6` para criar hierarquia clara.

**3. Hierarquia visual**
- CTA primário mantém `variant="hero"` (preenchido, dourado, com glow).
- Link secundário fica subordinado: sem borda, sem fundo, apenas texto + chevron — claramente um "saber mais" e não um "agir agora" concorrente.

### Notas
- Só altera presentation no `HeroSection.tsx` — nenhum impacto noutros componentes, rotas ou backend.
- Mantém o `ArrowRight` já importado.
- Não toca em accessibility/SEO (continua um único H1 por hero).
