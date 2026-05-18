## Atalho "Onde estamos" no Header

Adicionar um link permanente no header, com ícone de pin (MapPin do lucide-react), que leva os utilizadores à localização dos stands/concessionários.

### Alterações

**1. `src/components/Navbar.tsx` (desktop)**
- Adicionar entre os `simpleLinks` e os botões da direita um novo `Link` para `/contacto#localizacao`:
  - Ícone `MapPin` (3.5 w/h) + texto "Onde Estamos"
  - Estilo coerente com os restantes itens (`text-sm font-medium tracking-wider uppercase`, hover para `text-primary`)
  - Visível em `lg:flex`

**2. `src/components/Navbar.tsx` (mobile)**
- Adicionar `{ to: "/contacto#localizacao", label: "Onde Estamos", icon: MapPin }` ao array `simpleLinks` para aparecer também no menu fullscreen mobile.

**3. `src/pages/Contact.tsx`**
- Garantir que a secção do mapa/morada tem `id="localizacao"` para o âncora funcionar.
- Adicionar scroll suave ao hash quando a página carrega (caso ainda não exista via `ScrollToTop`).

### Notas técnicas
- Apenas alterações de UI/navegação — sem backend, sem novas dependências.
- Reutilizar `MapPin` de `lucide-react` (já disponível no projeto).
- Manter consistência visual com o resto do header (sem novos tokens de cor).
