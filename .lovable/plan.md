

## Plano: Página Institucional, Notícias, Redes Sociais e Funcionalidades Adicionais

### Resumo

Adicionar conteúdo institucional, sistema de notícias, integração com redes sociais, candidatura espontânea, agendamento de oficina, e melhorias de SEO.

---

### 1. Nova página "Sobre Nós" (`src/pages/About.tsx`)

Página institucional com secções:
- **Quem Somos** — missão, visão, valores
- **História** — timeline da Angolauto em Angola
- **Marcas Representadas** — cards com links para cada marca
- **Localização** — mapa embebido (Google Maps iframe de Luanda) + contactos completos

Rota: `/sobre`

### 2. Sistema de Notícias

**Base de dados** — nova tabela `news`:
- `id`, `title`, `slug`, `summary`, `content` (text), `image_url`, `category` (lançamento/evento/sector), `published`, `published_at`, `created_at`
- RLS: leitura pública para `published = true`, CRUD admin

**Páginas**:
- `src/pages/News.tsx` — lista de notícias com filtro por categoria, cards com imagem + resumo
- `src/pages/NewsDetail.tsx` — artigo individual (rota `/noticias/:slug`)
- Secção de notícias recentes na homepage (3 últimas)

**Admin** — tab "Notícias" no painel admin para criar/editar/publicar artigos

### 3. Slideshow de Destaques na Homepage

Componente `src/components/HighlightsCarousel.tsx`:
- Carousel automático com novos modelos, promoções e campanhas
- Dados estáticos iniciais (imagens das marcas + CTAs)
- Posicionado na homepage abaixo do hero ou substituindo-o como alternância

### 4. Redes Sociais

**Footer e página "Sobre"** — ícones com links para:
- Facebook: `facebook.com/angolauto`
- Instagram Suzuki: `instagram.com/suzukiangola`
- Instagram DFSK: `instagram.com/dfskangola`
- Instagram Ineos: `instagram.com/ineosangola`

**Botões de partilha** — nas páginas de veículos e notícias (partilhar via Facebook, WhatsApp, copiar link)

### 5. Candidatura Espontânea (`src/pages/Careers.tsx`)

- Formulário: nome, email, telefone, área de interesse, mensagem, upload de CV
- Storage bucket `cvs` para ficheiros
- Tabela `job_applications`: `id`, `name`, `email`, `phone`, `area`, `message`, `cv_url`, `created_at`
- RLS: inserção pública, leitura admin
- Rota: `/carreiras`

### 6. Agendamento de Oficina (`src/pages/Workshop.tsx`)

- Formulário: nome, email, telefone, veículo (texto livre), tipo de serviço (manutenção/reparação/revisão), data preferida, descrição
- Tabela `workshop_bookings`: `id`, `name`, `email`, `phone`, `vehicle_info`, `service_type`, `preferred_date`, `description`, `status`, `created_at`
- RLS: inserção pública, leitura admin, leitura própria
- Rota: `/oficina`
- Tab "Oficina" no painel admin

### 7. Navegação Actualizada

**Navbar** — reestruturar com dropdown/mega-menu:
- Início
- Sobre Nós
- Marcas (com sub-links para cada marca)
- Veículos (com sub-link "Usados")
- Serviços → Oficina
- Notícias
- Contacto
- Carreiras (no footer)

### 8. SEO

- Componente `src/components/SEOHead.tsx` com `react-helmet-async`
- Meta tags dinâmicas (title, description, og:image) em cada página
- Structured data (JSON-LD) para `Organization` e `Vehicle`
- Sitemap estático em `public/sitemap.xml`

### 9. Página de Viaturas Usadas

- Rota `/veiculos-usados` — página simples com texto placeholder "Em breve" ou ligação ao filtro de usados quando disponível

---

### Ficheiros novos
- `src/pages/About.tsx`
- `src/pages/News.tsx`, `src/pages/NewsDetail.tsx`
- `src/pages/Careers.tsx`
- `src/pages/Workshop.tsx`
- `src/pages/UsedVehicles.tsx`
- `src/components/HighlightsCarousel.tsx`
- `src/components/NewsPreview.tsx` (secção homepage)
- `src/components/ShareButtons.tsx`
- `src/components/SEOHead.tsx`
- `public/sitemap.xml`

### Ficheiros editados
- `src/App.tsx` — novas rotas
- `src/components/Navbar.tsx` — menu reestruturado
- `src/components/Footer.tsx` — redes sociais + links carreiras/oficina
- `src/pages/Index.tsx` — adicionar NewsPreview + HighlightsCarousel
- `src/pages/Admin.tsx` — tabs para Notícias e Oficina
- `src/pages/VehicleDetail.tsx` — botões de partilha

### Migrações DB
- Tabela `news` + RLS
- Tabela `job_applications` + storage bucket `cvs` + RLS
- Tabela `workshop_bookings` + RLS

