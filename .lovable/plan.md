

## Plano: Melhorias de UX em 6 Páginas Internas

### 1. Sobre Nós (`About.tsx`)

**Problemas:**
- Missão/Visão/Valores usa `animate` (dispara imediatamente) em vez de `whileInView` — sem efeito de scroll
- Secção "Redes Sociais" fraca — links são botões de texto sem ícones reais (Facebook, Instagram)
- Falta animação premium (scale, stagger) nos cards, inconsistente com a homepage
- Secção de contacto duplica info do footer e da página Contacto — redundante

**Melhorias:**
- Aplicar animações `whileInView` com easing premium e stagger nos cards Missão/Visão/Valores
- Adicionar ícones de redes sociais reais (Facebook, Instagram) usando lucide-react
- Remover secção de contacto duplicada (já existe na página Contacto e no footer)
- Adicionar secção CTA final ("Fale connosco" / "Agende uma visita") antes do final

---

### 2. Marcas (`Brands.tsx`)

**Problemas:**
- Sem animações refinadas — usa `whileInView` básico sem stagger, scale, ou easing premium
- Layout alternado (esquerda/direita) funciona mas falta separação visual entre marcas
- Sem secção de cabeçalho ou contagem de marcas
- `mt-8` depois do hero cria pouca separação

**Melhorias:**
- Aplicar animações com easing `[0.22, 1, 0.36, 1]` e scale `0.96→1`
- Adicionar separadores visuais (linha dourada fina) entre cada marca
- Aumentar espaçamento para `py-16` entre blocos de marca
- Adicionar CTA no final ("Não encontrou o que procura? Contacte-nos")

---

### 3. Oficina (`Workshop.tsx`)

**Problemas:**
- Página muito simples — apenas um formulário sem contexto visual
- Sem informação sobre os serviços disponíveis (que tipos, vantagens, equipa)
- Formulário estreito (`max-w-2xl`) parece isolado numa página larga
- Sem icons ou secção visual que transmita confiança

**Melhorias:**
- Adicionar grid de serviços (ícones + descrição) acima do formulário: Manutenção, Reparação, Revisão, Diagnóstico
- Layout 2 colunas em desktop: info/serviços à esquerda, formulário à direita (como a página Contacto)
- Adicionar strip de vantagens (Técnicos Certificados, Peças Originais, Garantia de Serviço)
- Input de data usar o componente Calendar em vez de `<input type="date">` nativo

---

### 4. Notícias (`News.tsx`)

**Problemas:**
- Filtros de categoria muito pequenos e sem destaque visual
- Sem animações premium (usa easing `easeOut` genérico em vez do custom)
- Falta paginação — se houver muitas notícias, ficam todas na mesma página
- Empty state funcional mas podia ter CTA ("Subscreva a newsletter")

**Melhorias:**
- Refinar animações com easing premium e scale
- Melhorar filtros visuais com contagem de artigos por categoria
- Adicionar paginação simples (6-9 artigos por página)
- Empty state com link para newsletter

---

### 5. Contacto (`Contact.tsx`)

**Problemas:**
- Falta SEOHead (ao contrário das outras páginas)
- Sem mapa — existe na página Sobre mas não na de Contacto (onde faz mais sentido)
- Cards de informação no lado direito são básicos — sem hover states nem links clicáveis (telefone, email)
- Sem horário de funcionamento visualmente destacado

**Melhorias:**
- Adicionar SEOHead com título e descrição
- Adicionar mapa Google Maps abaixo do formulário (fullwidth)
- Tornar telefone e email clicáveis (`tel:`, `mailto:`)
- Adicionar hover states nos cards de informação
- Mover mapa da página Sobre para cá (ou manter em ambas)

---

### 6. TestDrive Modal (`TestDriveModal.tsx`)

**Problemas:**
- Modal é funcional mas visualmente denso — calendário + time slots + formulário tudo junto
- Sem indicador de progresso (steps) — o utilizador não sabe o que falta preencher
- Sem pré-preenchimento quando o user está autenticado (nome/email do perfil)
- Calendário pode ser difícil de usar em mobile

**Melhorias:**
- Dividir em 2 steps visuais: Step 1 (dados pessoais) → Step 2 (data + hora)
- Pré-preencher nome e email se o utilizador estiver autenticado
- Adicionar barra de progresso visual (step indicator)
- Melhorar layout mobile do calendário

---

### Detalhe técnico

**Ficheiros afectados:**
- `src/pages/About.tsx` — animações, ícones sociais, remover contacto duplicado, adicionar CTA
- `src/pages/Brands.tsx` — animações premium, separadores, CTA final
- `src/pages/Workshop.tsx` — layout 2 colunas, grid de serviços, calendar component
- `src/pages/News.tsx` — animações, paginação, filtros melhorados
- `src/pages/Contact.tsx` — SEOHead, mapa, links clicáveis
- `src/components/TestDriveModal.tsx` — multi-step, pré-preenchimento, progress bar

**Padrão consistente:** Todas as páginas passam a usar o easing `[0.22, 1, 0.36, 1]`, stagger `0.12s`, e scale `0.96→1` já aplicados na homepage.

