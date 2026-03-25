import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Fuel, Gauge, Settings2, ArrowRight, Filter } from "lucide-react";
import { vehicles, type VehicleBrand, type VehicleCategory } from "@/data/vehicles";
import { Button } from "@/components/ui/button";

const allBrands: VehicleBrand[] = ["Suzuki", "DFSK", "Ineos", "Scania"];
const allCategories: VehicleCategory[] = ["SUV", "Sedan", "Pickup", "Comercial", "Off-Road", "Camião"];

export default function VehiclesPage() {
  const [searchParams] = useSearchParams();
  const initialBrand = searchParams.get("marca") as VehicleBrand | null;

  const [selectedBrand, setSelectedBrand] = useState<VehicleBrand | null>(initialBrand);
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return vehicles.filter((v) => {
      if (selectedBrand && v.brand !== selectedBrand) return false;
      if (selectedCategory && v.category !== selectedCategory) return false;
      if (query && !`${v.brand} ${v.name} ${v.description}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [selectedBrand, selectedCategory, query]);

  return (
    <main className="pt-20 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <p className="text-primary font-display text-sm tracking-[0.3em] mb-2">CATÁLOGO</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            TODOS OS <span className="text-gradient-gold">VEÍCULOS</span>
          </h1>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-lg p-4 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Pesquisar veículo..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-secondary/50 border border-border rounded-sm pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Brand filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedBrand(null)}
                className={`px-3 py-1.5 text-xs font-display tracking-wider rounded-sm border transition-all ${
                  !selectedBrand ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
                }`}
              >
                Todas
              </button>
              {allBrands.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(selectedBrand === b ? null : b)}
                  className={`px-3 py-1.5 text-xs font-display tracking-wider rounded-sm border transition-all ${
                    selectedBrand === b ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border/30">
            <Filter className="w-3.5 h-3.5 text-muted-foreground mt-1" />
            {allCategories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(selectedCategory === c ? null : c)}
                className={`px-2.5 py-1 text-[10px] tracking-wider rounded-full border transition-all ${
                  selectedCategory === c ? "bg-primary/20 text-primary border-primary/40" : "bg-transparent text-muted-foreground border-border/50 hover:border-primary/30"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        <p className="text-xs text-muted-foreground mb-4">{filtered.length} veículo(s) encontrado(s)</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-lg p-5 hover:border-primary/30 transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] tracking-[0.2em] text-primary font-display">{v.brand}</span>
                <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{v.category}</span>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-1">{v.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{v.description}</p>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="flex flex-col items-center gap-1 text-center">
                  <Gauge className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] text-muted-foreground">{v.power}</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <Settings2 className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] text-muted-foreground">{v.transmission.split("/")[0].trim()}</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <Fuel className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] text-muted-foreground">{v.fuelType}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <span className="text-sm text-primary font-display font-medium">{v.price}</span>
                <Link to="/contacto" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                  Solicitar proposta <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="font-display text-lg">Nenhum veículo encontrado</p>
            <p className="text-sm mt-2">Tente ajustar os filtros de pesquisa.</p>
          </div>
        )}
      </div>
    </main>
  );
}
