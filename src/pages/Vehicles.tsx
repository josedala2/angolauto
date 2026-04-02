import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Fuel, Gauge, Settings2, ArrowRight, Filter, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getVehicleImage } from "@/data/vehicleImages";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import { SkeletonVehicleCard } from "@/components/SkeletonCard";
import suzukiShowcase from "@/assets/suzuki-showcase.jpg";

const allBrands = ["Suzuki", "DFSK", "Ineos", "Scania"];
const allCategories = ["SUV", "Sedan", "Pickup", "Comercial", "Off-Road", "Camião"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function VehiclesPage() {
  const [searchParams] = useSearchParams();
  const initialBrand = searchParams.get("marca");

  const [selectedBrand, setSelectedBrand] = useState<string | null>(initialBrand);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        
        const { data, error } = await supabase
          .from("vehicles")
          .select("*")
          .eq("active", true)
          .order("brand")
          .order("name");
        
        if (error) console.error("Error fetching vehicles:", error);
        setVehicles(data || []);
      } catch (err) {
        console.error("[Vehicles] Catch:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const filtered = useMemo(() => {
    return vehicles.filter((v) => {
      if (selectedBrand && v.brand !== selectedBrand) return false;
      if (selectedCategory && v.category !== selectedCategory) return false;
      if (query && !`${v.brand} ${v.name} ${v.description}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [vehicles, selectedBrand, selectedCategory, query]);

  return (
    <main className="pb-16 min-h-screen">
      <PageHero image={suzukiShowcase} subtitle="CATÁLOGO" title="TODOS OS" highlight="VEÍCULOS" description="Explore a nossa gama completa de veículos novos das melhores marcas." />
      <div className="container mx-auto px-4 mt-8">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-lg p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Pesquisar veículo..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-secondary/50 border border-border rounded-sm pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setSelectedBrand(null)} className={`px-4 py-2 text-xs font-display tracking-wider rounded-sm border transition-all min-h-[40px] ${!selectedBrand ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-muted-foreground border-border hover:border-primary/50"}`}>Todas</button>
              {allBrands.map((b) => (
                <button key={b} onClick={() => setSelectedBrand(selectedBrand === b ? null : b)} className={`px-4 py-2 text-xs font-display tracking-wider rounded-sm border transition-all min-h-[40px] ${selectedBrand === b ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-muted-foreground border-border hover:border-primary/50"}`}>{b}</button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border/30">
            <Filter className="w-3.5 h-3.5 text-muted-foreground mt-1" />
            {allCategories.map((c) => (
              <button key={c} onClick={() => setSelectedCategory(selectedCategory === c ? null : c)} className={`px-3 py-1.5 text-xs tracking-wider rounded-full border transition-all min-h-[36px] ${selectedCategory === c ? "bg-primary/20 text-primary border-primary/40" : "bg-transparent text-muted-foreground border-border/50 hover:border-primary/30"}`}>{c}</button>
            ))}
          </div>
        </motion.div>

        <p className="text-xs text-muted-foreground mb-4">{loading ? "" : `${filtered.length} veículo(s) encontrado(s)`}</p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => <SkeletonVehicleCard key={n} />)}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((v) => (
              <motion.div key={v.id} variants={item}>
                <Link to={`/veiculo/${v.id}`} className="block group">
                  <div className="glass-card rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={getVehicleImage(v.name, v.brand)}
                        alt={`${v.brand} ${v.name}`}
                        loading="lazy"
                        width={800}
                        height={450}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {v.featured && (
                        <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2.5 py-0.5 rounded-sm text-xs font-display tracking-wider flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" /> Destaque
                        </div>
                      )}
                      {v.year >= new Date().getFullYear() && !v.featured && (
                        <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2.5 py-0.5 rounded-sm text-xs font-display tracking-wider">
                          NOVO
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs tracking-[0.2em] text-primary font-display">{v.brand}</span>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{v.category}</span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-1">{v.name}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">{v.description}</p>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="flex flex-col items-center gap-1 text-center">
                          <Gauge className="w-3.5 h-3.5 text-primary" />
                          <span className="text-xs text-muted-foreground">{v.power}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 text-center">
                          <Settings2 className="w-3.5 h-3.5 text-primary" />
                          <span className="text-xs text-muted-foreground">{v.transmission?.split("/")[0]?.trim()}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 text-center">
                          <Fuel className="w-3.5 h-3.5 text-primary" />
                          <span className="text-xs text-muted-foreground">{v.fuel_type}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-border/50">
                        <span className="text-sm text-primary font-display font-medium">{v.price}</span>
                        <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                          Ver detalhes <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Search className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="font-display text-lg text-foreground">Nenhum veículo encontrado</p>
            <p className="text-sm mt-2 text-muted-foreground">Tente ajustar os filtros de pesquisa.</p>
            <Button variant="outline" className="mt-4" onClick={() => { setSelectedBrand(null); setSelectedCategory(null); setQuery(""); }}>
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
