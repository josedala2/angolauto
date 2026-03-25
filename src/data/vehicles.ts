export type VehicleBrand = "Suzuki" | "DFSK" | "Ineos" | "Scania";
export type VehicleCategory = "SUV" | "Sedan" | "Pickup" | "Comercial" | "Off-Road" | "Camião";

export interface Vehicle {
  id: string;
  name: string;
  brand: VehicleBrand;
  category: VehicleCategory;
  year: number;
  price: string;
  engine: string;
  power: string;
  transmission: string;
  fuelType: string;
  description: string;
  featured: boolean;
}

export const vehicles: Vehicle[] = [
  {
    id: "suzuki-jimny",
    name: "Jimny",
    brand: "Suzuki",
    category: "Off-Road",
    year: 2025,
    price: "Sob consulta",
    engine: "1.5L Petrol",
    power: "102 CV",
    transmission: "Manual 5V / Automático 4V",
    fuelType: "Gasolina",
    description: "O lendário off-roader compacto. Capacidade 4x4 incomparável em chassis ladder frame.",
    featured: true,
  },
  {
    id: "suzuki-vitara",
    name: "Vitara",
    brand: "Suzuki",
    category: "SUV",
    year: 2025,
    price: "Sob consulta",
    engine: "1.5L Hybrid",
    power: "115 CV",
    transmission: "Automático 6V",
    fuelType: "Híbrido",
    description: "SUV compacto versátil com tecnologia AllGrip e eficiência híbrida.",
    featured: true,
  },
  {
    id: "suzuki-swift",
    name: "Swift",
    brand: "Suzuki",
    category: "Sedan",
    year: 2025,
    price: "Sob consulta",
    engine: "1.2L DualJet",
    power: "83 CV",
    transmission: "Manual 5V / CVT",
    fuelType: "Gasolina",
    description: "Citadino ágil e económico. Design jovem com tecnologia de segurança avançada.",
    featured: false,
  },
  {
    id: "dfsk-glory-580",
    name: "Glory 580",
    brand: "DFSK",
    category: "SUV",
    year: 2025,
    price: "Sob consulta",
    engine: "1.5T Turbo",
    power: "150 CV",
    transmission: "CVT",
    fuelType: "Gasolina",
    description: "SUV espaçoso com 7 lugares, ideal para família. Equipamento completo a preço competitivo.",
    featured: true,
  },
  {
    id: "dfsk-glory-500",
    name: "Glory 500",
    brand: "DFSK",
    category: "SUV",
    year: 2025,
    price: "Sob consulta",
    engine: "1.5L",
    power: "116 CV",
    transmission: "Manual 5V",
    fuelType: "Gasolina",
    description: "SUV compacto acessível com design moderno e excelente relação qualidade-preço.",
    featured: false,
  },
  {
    id: "dfsk-ec35",
    name: "EC35",
    brand: "DFSK",
    category: "Comercial",
    year: 2025,
    price: "Sob consulta",
    engine: "Eléctrico",
    power: "60 kW",
    transmission: "Automático",
    fuelType: "Eléctrico",
    description: "Van eléctrica para logística urbana. Zero emissões, custo operacional mínimo.",
    featured: false,
  },
  {
    id: "ineos-grenadier",
    name: "Grenadier",
    brand: "Ineos",
    category: "Off-Road",
    year: 2025,
    price: "Sob consulta",
    engine: "3.0L BMW B58 Turbo",
    power: "285 CV",
    transmission: "Automático 8V ZF",
    fuelType: "Gasolina",
    description: "O veículo utilitário sem compromissos. Construído para ir a qualquer lugar e fazer qualquer trabalho.",
    featured: true,
  },
  {
    id: "ineos-quartermaster",
    name: "Quartermaster",
    brand: "Ineos",
    category: "Pickup",
    year: 2025,
    price: "Sob consulta",
    engine: "3.0L BMW B57 Turbo Diesel",
    power: "249 CV",
    transmission: "Automático 8V ZF",
    fuelType: "Diesel",
    description: "Pickup robusta com plataforma de carga. A mesma capacidade off-road do Grenadier.",
    featured: false,
  },
  {
    id: "scania-r500",
    name: "R 500",
    brand: "Scania",
    category: "Camião",
    year: 2025,
    price: "Sob consulta",
    engine: "13L V8",
    power: "500 CV",
    transmission: "Opticruise",
    fuelType: "Diesel",
    description: "Camião de longa distância com máxima eficiência de combustível e conforto para o motorista.",
    featured: true,
  },
  {
    id: "scania-g410",
    name: "G 410",
    brand: "Scania",
    category: "Camião",
    year: 2025,
    price: "Sob consulta",
    engine: "13L Inline-6",
    power: "410 CV",
    transmission: "Opticruise",
    fuelType: "Diesel",
    description: "Versátil para construção e distribuição regional. Robusto para condições angolanas.",
    featured: false,
  },
];

export const brands = [
  { id: "Suzuki" as VehicleBrand, name: "Suzuki", tagline: "Way of Life", description: "Veículos compactos, eficientes e fiáveis para o dia-a-dia e aventura." },
  { id: "DFSK" as VehicleBrand, name: "DFSK", tagline: "Drive Your Ambition", description: "SUVs e comerciais com excelente relação qualidade-preço." },
  { id: "Ineos" as VehicleBrand, name: "Ineos Grenadier", tagline: "Built On Purpose", description: "O utilitário sem compromissos, construído para os terrenos mais exigentes." },
  { id: "Scania" as VehicleBrand, name: "Scania", tagline: "King of the Road", description: "Camiões e soluções de transporte pesado de classe mundial." },
];
