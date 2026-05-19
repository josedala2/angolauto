export type StockTone = "available" | "order";

export interface StockStatus {
  label: string;
  tone: StockTone;
}

export function getStockStatus(vehicle: { brand?: string | null; category?: string | null; name?: string | null }): StockStatus {
  const brand = (vehicle.brand || "").toLowerCase();
  const category = (vehicle.category || "").toLowerCase();

  // Camiões pesados (Scania) e Ineos Grenadier → importação dedicada
  if (category === "camião" || category === "camiao" || brand === "scania" || brand === "ineos") {
    return { label: "Por encomenda", tone: "order" };
  }

  return { label: "Stock disponível", tone: "available" };
}
