## Fluxo Ver → Configurar → Reservar

Hoje o `VehicleCard` (em `FeaturedVehicles.tsx`) só tem o link "Ver detalhes". Vou acrescentar um botão **Configurar** ao lado, ligado ao `FinancingSimulator` da página de detalhe, e fechar o ciclo com uma CTA **Reservar** dentro do simulador.

### 1. `src/components/FeaturedVehicles.tsx` — adicionar CTA "Configurar"

No rodapé do card (linha ~66), substituir o bloco do preço + "Ver detalhes" por uma estrutura com dois CTAs:
- "Ver detalhes" → continua o `Link` envolvente do card (já existe).
- "Configurar" → `Link` para `/veiculo/{id}#configurar`, com `e.stopPropagation()` para não competir com o card; estilo `text-xs` com `Sliders` icon, hover dourado.

Layout: preço à esquerda, dois mini-CTAs à direita separados por `·`.

### 2. `src/components/FinancingSimulator.tsx` — abrir automaticamente via hash + CTA "Reservar"

- Envolver o componente num `<div id="configurar" className="scroll-mt-24">`.
- `useEffect` que verifica `window.location.hash === "#configurar"`: define `setOpen(true)` e faz `scrollIntoView({ behavior: "smooth" })` após 200ms.
- Trocar o label do botão de toggle de "Simular Financiamento" → mantém, mas adiciona um chevron rotativo.
- Dentro do bloco `open`, no fim (após o disclaimer), adicionar CTA primário **"Reservar este veículo"** (`variant="hero"`, `w-full`, ícone `CheckCircle2`).
- Como o componente não conhece o handler do `setShowProposal`, aceitar uma prop opcional `onReserve?: () => void`. Quando ausente, o botão funciona como `Link` para `/contacto?veiculo={vehicleName}`. Quando passado (no `VehicleDetail`), chama `onReserve` que abre o modal de proposta existente.

### 3. `src/pages/VehicleDetail.tsx` — passar `onReserve`

- Em `<FinancingSimulator ... />` (linha 417) acrescentar `onReserve={() => setShowProposal(true)}`.
- Manter botões "Solicitar Proposta" / "Agendar Test Drive" como estão.

### Notas

- Tudo UI/navegação; sem backend, sem novas rotas.
- Mantém tokens existentes (primary, gold gradient, glass-card) e easing `cubic-bezier(0.22, 1, 0.36, 1)`.
- O hash `#configurar` torna o fluxo partilhável (link directo abre simulador expandido).
