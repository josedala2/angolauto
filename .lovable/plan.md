

## Plano: Elevar UX e Layout ao Nível de Grandes Marcas Mundiais

Auditoria completa de todas as 15+ páginas e componentes. Abaixo, as melhorias organizadas por área de impacto.

---

### 1. Hero Pages com Impacto Visual nas Páginas Internas

**Problema**: Páginas como Veículos, Contacto, Notícias, Oficina e Carreiras começam directamente com texto sobre fundo plano — sem imagem hero, sem drama visual. Sites como Toyota, BMW ou Mercedes têm sempre um hero visual de impacto em cada página.

**Solução**:
- Adicionar hero banners fullwidth (30-40vh) com imagem de fundo + overlay gradiente nas páginas: Veículos, Contacto, Notícias, Oficina, Carreiras, Comparar, Minha Conta
- Reutilizar imagens existentes das marcas/veículos
- Manter o padrão subtitle + título + descrição mas sobre a imagem

**Ficheiros**: `Vehicles.tsx`, `Contact.tsx`, `News.tsx`, `Workshop.tsx`, `Careers.tsx`, `Compare.tsx`, `MyAccount.tsx`

---

### 2. Navbar Premium com Mega-Menu

**Problema**: O dropdown da navbar é básico — uma lista simples. Marcas como Porsche ou Land Rover usam mega-menus com imagens e descrições.

**Solução**:
- Transformar dropdown "Marcas" num mega-menu com logo/imagem de cada marca + tagline
- Dropdown "Veículos" com ícones por categoria
- Adicionar indicador visual (linha animada) no link activo
- Efeito de navbar que muda de transparente para sólida ao fazer scroll

**Ficheiro**: `Navbar.tsx`

---

### 3. Cards e Grelhas com Hierarquia Visual

**Problema**: Todos os cards de veículos têm o mesmo tamanho e peso visual. Não há destaque visual para o "featured" nem diferenciação.

**Solução**:
- Na homepage, primeiro veículo em destaque ocupa 2 colunas (layout assimétrico tipo editorial)
- Adicionar badge "Novo" ou "Destaque" mais visível com cor contrastante
- Cards com efeito de elevação ao hover (sombra + ligeiro translate-y)
- Na página de marcas, layout alternado com imagem maior e sobreposição de texto (estilo magazine)

**Ficheiros**: `FeaturedVehicles.tsx`, `Vehicles.tsx`, `Brands.tsx`, `BrandShowcase.tsx`

---

### 4. Micro-Interacções e Animações

**Problema**: As animações são todas iguais (fade-up com delay). Falta variedade e refinamento.

**Solução**:
- Stagger animations nos grids (items entram um a um com efeito cascata)
- Botões com efeito de ripple ou scale ao click
- Counter animado nos números/estatísticas (ex: "20+ anos", "4 marcas", "500+ veículos")
- Scroll-triggered counters na secção "Porquê Angolauto" com números animados
- Transição suave entre páginas (page transition wrapper)
- Cursor personalizado nos botões CTA principais (opcional)

**Ficheiros**: `WhyUsSection.tsx`, `About.tsx`, `BrandDetail.tsx`, componentes globais

---

### 5. Tipografia e Espaçamento Premium

**Problema**: Algumas secções são muito compactadas; o espaçamento entre secções não é consistente. O texto `text-[10px]` é demasiado pequeno em várias áreas.

**Solução**:
- Normalizar tamanho mínimo para `text-xs` (12px) — eliminar `text-[10px]`
- Aumentar espaçamento entre secções (py-24 → py-32 nas secções principais)
- Adicionar dividers visuais entre secções (linhas subtis, padrões geométricos ou espaço negativo)
- Subtítulos de secção com decoração (linha lateral ou underline animado)

**Ficheiros**: `index.css`, todos os componentes de página

---

### 6. Footer Redesenhado

**Problema**: O footer é funcional mas básico. Marcas premium têm footers com newsletter, certificações e layout em camadas.

**Solução**:
- Adicionar barra de newsletter no topo do footer ("Receba as últimas novidades")
- Secção de certificações/parceiros com logos
- Layout mais respirado com separadores visuais
- Links com hover animado (underline que cresce da esquerda)

**Ficheiro**: `Footer.tsx`

---

### 7. Loading States e Empty States

**Problema**: Os estados de loading são texto simples ("A carregar..."). Empty states são genéricos.

**Solução**:
- Skeleton loaders animados (shimmer) nos cards de veículos e notícias
- Spinner branded com o logotipo Angolauto para loading de página
- Empty states com ilustrações/ícones maiores e CTAs claros
- Suspense boundaries com fallbacks visuais

**Ficheiros**: `Vehicles.tsx`, `News.tsx`, `VehicleDetail.tsx`, `MyAccount.tsx`, `Compare.tsx`

---

### 8. Mobile Experience

**Problema**: O menu mobile é uma lista linear sem hierarquia. Os cards são empilhados sem adaptação.

**Solução**:
- Menu mobile fullscreen com animação slide-in e secções colapsáveis
- Swipe gestures no hero slideshow e galeria de veículos
- Bottom sheet para filtros no catálogo de veículos (em vez de filtros no topo)
- Botão "Voltar ao topo" flutuante
- Navbar mobile com ícones + labels reduzidos

**Ficheiros**: `Navbar.tsx`, `Vehicles.tsx`, `HeroSection.tsx`

---

### 9. CTAs Estratégicos e Conversão

**Problema**: Os CTAs são homogéneos. Falta urgência e diferenciação entre acções primárias e secundárias.

**Solução**:
- Sticky CTA bar na página de detalhe do veículo (aparece ao fazer scroll passando o sidebar)
- CTA flutuante "Solicitar Proposta" no catálogo de veículos
- Breadcrumbs em todas as páginas internas para navegação contextual
- Secção "Precisa de ajuda?" com link directo para WhatsApp em páginas de formulário
- Banner promocional dismissível no topo do site (para campanhas)

**Ficheiros**: `VehicleDetail.tsx`, `Vehicles.tsx`, `Contact.tsx`, novo componente `PromoBanner.tsx`

---

### Prioridade de Implementação

| Fase | Itens | Impacto |
|------|-------|---------|
| 1 | Hero pages internas + Navbar scroll | Alto — muda percepção imediata |
| 2 | Cards assimétricos + Skeleton loaders | Alto — experiência de browse |
| 3 | Footer + CTAs estratégicos | Médio — conversão |
| 4 | Micro-interacções + Tipografia | Médio — polish |
| 5 | Mobile + Mega-menu | Alto — audiência mobile |

### Ficheiros Afectados (resumo)
- Navbar.tsx, Footer.tsx, HeroSection.tsx
- Todas as páginas: Vehicles, Contact, News, Workshop, Careers, Compare, MyAccount, VehicleDetail, About, BrandDetail, Brands
- Novos componentes: PromoBanner, SkeletonCard, Breadcrumbs, ScrollToTop
- index.css (tipografia + tokens)

Nenhuma alteração à base de dados.

