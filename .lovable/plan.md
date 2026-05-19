## Toggle Particulares / Empresas

Adicionar um segmentador global no header que define o "modo" do utilizador (`particulares` | `empresas`), com persistência local e pequenos ajustes de conteúdo nos pontos onde faz sentido (hero, simulador de financiamento, CTAs).

### 1. Contexto global — `src/context/SegmentContext.tsx` (novo)

- `type Segment = "particulares" | "empresas"`
- `SegmentProvider` com `useState` inicializado a partir de `localStorage.getItem("segment")` (fallback `"particulares"`); `useEffect` sincroniza ao mudar.
- Expõe `{ segment, setSegment, isEmpresa }` via `useSegment()` hook.
- Envolver `<App />` em `src/App.tsx` (dentro de `BrowserRouter`).

### 2. Componente `src/components/SegmentToggle.tsx` (novo)

- Pill com dois botões "Particulares" / "Empresas", estilo glass-card, altura compacta (h-8), `font-display tracking-wider uppercase text-[11px]`.
- Estado activo: fundo `bg-primary` + `text-primary-foreground`; inactivo: `text-muted-foreground hover:text-foreground`.
- Animação `layoutId="segment-pill"` (Framer Motion) para o highlight deslizante.
- Aceita prop `compact?: boolean` para versão mobile.

### 3. `src/components/Navbar.tsx` — integrar

- Desktop: inserir `<SegmentToggle />` no cluster da direita (linha ~205), antes do `<ThemeToggle />`, separado por divisor vertical fino `border-l border-border/40 pl-3`.
- Mobile: dentro do bloco "Bottom actions" do menu fullscreen, mostrar `<SegmentToggle />` acima dos botões de login (com label "EU SOU…" pequena por cima).

### 4. Personalização de conteúdo (mínima, focada)

Aplicar `useSegment()` em três sítios onde traz valor imediato, sem inventar copy nova:

a. **`src/components/HeroSection.tsx`** — eyebrow/badge acima do título alterna:
   - particulares: "MOBILIDADE PARA SI"
   - empresas: "FROTAS E SOLUÇÕES B2B"
   E o CTA secundário aponta para `/contacto?segmento=empresas` quando empresas (mantém destino actual para particulares).

b. **`src/components/FinancingSimulator.tsx`** — quando `isEmpresa`:
   - Label do botão muda para "Simular Leasing/ALD"
   - Defaults: `downPercent=20`, `months=60`, `rate=14` (taxa empresarial mais baixa)
   - Linha extra no resultado: "IVA dedutível (estimado)" = `monthly * 0.14`
   - CTA final: "Pedir proposta para frota" (mantém handler `onReserve`).

c. **`src/components/Footer.tsx`** (se existir bloco de CTA) ou **`src/pages/Contact.tsx`** — se `?segmento=empresas` na URL, pré-selecciona campo "Tipo de cliente" (se houver) ou mostra badge "ATENDIMENTO EMPRESAS" no topo do form. Verificar antes se o form tem esse campo; caso não tenha, limitar a um badge informativo.

### 5. Persistência e URL

- `localStorage` chave `"segment"`.
- Quando muda, dispara `toast` discreto ("A ver oferta para Empresas").
- Não altera rotas; apenas conteúdo condicional.

### Notas técnicas

- Sem backend, sem migrations.
- Reutiliza tokens existentes (primary, border, glass-card, font-display).
- Easing standard `[0.22, 1, 0.36, 1]`.
- Pode escalar para mais páginas no futuro graças ao contexto.
