

## Análise da Homepage — Problemas e Melhorias

### Problemas identificados

1. **Hero sem imagem de fundo (crítico)** — O hero principal aparece totalmente branco/vazio em modo claro. A imagem de fundo não está a carregar, tornando a primeira impressão fraca e sem impacto visual.

2. **Redundância Hero ↔ HighlightsCarousel** — O hero principal e o carrossel "Novidades e Campanhas" mostram exactamente os mesmos veículos (Jimny, Glory 580, Grenadier, R 500) com as mesmas imagens. Isto cria repetição visual e dá a sensação de conteúdo duplicado.

3. **Falta de separação visual entre secções** — As transições entre secções são abruptas. Não há divisores, mudanças de fundo ou espaçamento diferenciado que criem ritmo visual e guie o olhar.

4. **Sem CTA forte antes do footer** — A página termina com "Porquê a Angolauto" (vantagens) e vai directamente para a newsletter/footer. Falta um bloco de conversão final (test drive, contacto, ou "pronto para o seu próximo veículo?").

5. **Secção de Notícias pode estar vazia** — Se não houver notícias publicadas, a secção desaparece completamente, criando um salto visual.

### Plano de melhorias

#### 1. Corrigir hero — imagem de fundo
- Verificar se o ficheiro `hero-bg.jpg` existe em `src/assets/`
- Se não existir, criar um fallback com gradiente escuro ou usar uma das imagens de veículos como fundo principal
- Garantir que o overlay funciona tanto em modo claro como escuro

#### 2. Diferenciar HighlightsCarousel do Hero
- Opção A: Transformar o HighlightsCarousel em campanhas/promoções reais (conteúdo diferente dos slides do hero)
- Opção B: Remover o HighlightsCarousel e adicionar uma secção diferente (ex: testemunhos de clientes, parceiros, ou um CTA visual)
- Recomendação: **Opção B** — substituir por uma secção de CTA imersiva com texto forte e imagem de fundo

#### 3. Adicionar ritmo visual entre secções
- Usar o componente `section-divider` existente entre secções
- Alternar fundos (`bg-background` / `bg-card`) de forma consistente
- Adicionar `py-32` consistente nas secções para mais respiração

#### 4. Adicionar CTA banner antes do footer
- Nova secção fullwidth com imagem de fundo
- Texto: "Pronto para o seu próximo veículo?" + botões "Agendar Test Drive" e "Falar com consultor"
- Posicionar entre WhyUsSection e o Footer

#### 5. Reordenar secções para melhor fluxo
```text
Ordem actual:                  Ordem proposta:
Hero                          Hero (com imagem corrigida)
BrandShowcase                 BrandShowcase
FeaturedVehicles              FeaturedVehicles
HighlightsCarousel (repetido) [REMOVIDO ou substituído por CTA]
NewsPreview                   NewsPreview
WhyUsSection                  WhyUsSection
                              CTABanner (NOVO)
Footer                        Footer
```

### Detalhe técnico

**Ficheiros afectados:**
- `src/pages/Index.tsx` — reordenar/remover HighlightsCarousel, adicionar CTABanner
- `src/components/HeroSection.tsx` — verificar/corrigir carregamento da imagem de fundo
- `src/components/CTABanner.tsx` — novo componente de conversão
- `src/components/BrandShowcase.tsx` — ajustar padding para consistência
- `src/components/FeaturedVehicles.tsx` — adicionar section-divider

**Impacto:** Reduz redundância, melhora o ritmo visual, adiciona conversão, e corrige o problema crítico da imagem do hero.

