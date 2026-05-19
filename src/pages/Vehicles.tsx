import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Fuel, Gauge, Settings2, ArrowRight, Filter, Star, ArrowUpDown, LayoutGrid, List } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getVehicleImage } from "@/data/vehicleImages";
import { vehicles as staticVehicles, toDbFormat } from "@/data/vehicles";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import PageHero from "@/components/PageHero";
import { SkeletonVehicleCard } from "@/components/SkeletonCard";
import suzukiShowcase from "@/assets/suzuki-showcase.jpg";

const allBrands = ["Suzuki", "DFSK", "Ineos", "Scania"];
const allCategories = ["SUV", "Sedan", "Pickup", "Comercial", "Off-Road", "Camião"];

type SortKey = "default" | "price-asc" | "price-desc" | "year-desc" | "year-asc";

function parsePrice(p: string | number | null | undefined): number {
  if (p == null) return 0;
  if (typeof p === "number") return p;
  const cleaned = p.replace(/[^\d.,]/g, "").replace(/\./g, "").replace(",", ".");
  return parseFloat(cleaned) || 0;
}

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
  const initialQuery = searchParams.get("q") ?? "";

  const [selectedBrand, setSelectedBrand] = useState<string | null>(initialBrand);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<SortKey>("default");
  const [view, setView] = useState<"grid" | "list">(() => {
    if (typeof window === "undefined") return "grid";
    return (window.localStorage.getItem("vehicles-view") as "grid" | "list") || "grid";
  });
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [yearRange, setYearRange] = useState<[number, number] | null>(null);

  useEffect(() => {
    let resolved = false;
    const fallback = () => {
      if (!resolved) {
        resolved = true;
        setVehicles(staticVehicles.map(toDbFormat));
        setLoading(false);
      }
    };
    const timer = setTimeout(fallback, 3000);
    Promise.resolve(
      supabase
        .from("vehicles")
        .select("*")
        .eq("active", true)
        .order("brand")
        .order("name")
    ).then(({ data, error }) => {
        if (resolved) return;
        resolved = true;
        clearTimeout(timer);
        if (error) console.error("Error fetching vehicles:", error);
        const results = data && data.length > 0 ? data : staticVehicles.map(toDbFormat);
        setVehicles(results);
        setLoading(false);
      }).catch(() => fallback());
  }, []);

  const priceBounds = useMemo<[number, number]>(() => {
    if (!vehicles.length) return [0, 0];
    const prices = vehicles.map((v) => parsePrice(v.price)).filter((n) => n > 0);
    if (!prices.length) return [0, 0];
    const min = Math.floor(Math.min(...prices) / 100000) * 100000;
    const max = Math.ceil(Math.max(...prices) / 100000) * 100000;
    return [min, max];
  }, [vehicles]);

  // initialise the active range once data is loaded
  useEffect(() => {
    if (priceBounds[1] > 0 && priceRange === null) {
      setPriceRange(priceBounds);
    }
  }, [priceBounds, priceRange]);

  const activeRange: [number, number] = priceRange ?? priceBounds;
  const rangeActive = priceRange !== null && (priceRange[0] > priceBounds[0] || priceRange[1] < priceBounds[1]);

  const yearBounds = useMemo<[number, number]>(() => {
    if (!vehicles.length) return [0, 0];
    const years = vehicles.map((v) => Number(v.year)).filter((n) => Number.isFinite(n) && n > 0);
    if (!years.length) return [0, 0];
    return [Math.min(...years), Math.max(...years)];
  }, [vehicles]);

  useEffect(() => {
    if (yearBounds[1] > 0 && yearRange === null) {
      setYearRange(yearBounds);
    }
  }, [yearBounds, yearRange]);

  const activeYears: [number, number] = yearRange ?? yearBounds;
  const yearActive = yearRange !== null && yearBounds[1] > yearBounds[0] && (yearRange[0] > yearBounds[0] || yearRange[1] < yearBounds[1]);

  const filtered = useMemo(() => {
    const list = vehicles.filter((v) => {
      if (selectedBrand && v.brand !== selectedBrand) return false;
      if (selectedCategory && v.category !== selectedCategory) return false;
      if (query && !`${v.brand} ${v.name} ${v.description}`.toLowerCase().includes(query.toLowerCase())) return false;
      const p = parsePrice(v.price);
      if (p > 0 && (p < activeRange[0] || p > activeRange[1])) return false;
      const y = Number(v.year);
      if (Number.isFinite(y) && y > 0 && (y < activeYears[0] || y > activeYears[1])) return false;
      return true;
    });
    if (sort === "price-asc") return [...list].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    if (sort === "price-desc") return [...list].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    if (sort === "year-desc") return [...list].sort((a, b) => Number(b.year || 0) - Number(a.year || 0));
    if (sort === "year-asc") return [...list].sort((a, b) => Number(a.year || 0) - Number(b.year || 0));
    return list;
  }, [vehicles, selectedBrand, selectedCategory, query, sort, activeRange, activeYears]);

  const formatKz = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M Kz`;
    if (n >= 1_000) return `${Math.round(n / 1_000)}K Kz`;
    return `${n} Kz`;
  };

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
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-border/30">
            <Filter className="w-3.5 h-3.5 text-muted-foreground" />
            {allCategories.map((c) => (
              <button key={c} onClick={() => setSelectedCategory(selectedCategory === c ? null : c)} className={`px-3 py-1.5 text-xs tracking-wider rounded-full border transition-all min-h-[36px] ${selectedCategory === c ? "bg-primary/20 text-primary border-primary/40" : "bg-transparent text-muted-foreground border-border/50 hover:border-primary/30"}`}>{c}</button>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="bg-secondary/50 border border-border rounded-sm px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="default">Ordenar por…</option>
                <option value="price-asc">Preço: menor → maior</option>
                <option value="price-desc">Preço: maior → menor</option>
                <option value="year-desc">Ano: mais recente</option>
                <option value="year-asc">Ano: mais antigo</option>
              </select>
            </div>
          </div>

          {(priceBounds[1] > 0 || yearBounds[1] > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3 pt-3 border-t border-border/30">
              {priceBounds[1] > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2 gap-3">
                    <span className="text-xs text-muted-foreground font-display tracking-wider uppercase">Gama de preço</span>
                    <span className={`text-xs font-medium ${rangeActive ? "text-primary" : "text-foreground"}`}>
                      {formatKz(activeRange[0])} — {formatKz(activeRange[1])}
                    </span>
                  </div>
                  <Slider
                    value={activeRange}
                    min={priceBounds[0]}
                    max={priceBounds[1]}
                    step={Math.max(50000, Math.round((priceBounds[1] - priceBounds[0]) / 100))}
                    onValueChange={(v) => setPriceRange([v[0], v[1]] as [number, number])}
                    className="mt-1"
                  />
                </div>
              )}
              {yearBounds[1] > 0 && yearBounds[1] > yearBounds[0] && (
                <div>
                  <div className="flex items-center justify-between mb-2 gap-3">
                    <span className="text-xs text-muted-foreground font-display tracking-wider uppercase">Ano modelo</span>
                    <span className={`text-xs font-medium ${yearActive ? "text-primary" : "text-foreground"}`}>
                      {activeYears[0]} — {activeYears[1]}
                    </span>
                  </div>
                  <Slider
                    value={activeYears}
                    min={yearBounds[0]}
                    max={yearBounds[1]}
                    step={1}
                    onValueChange={(v) => setYearRange([v[0], v[1]] as [number, number])}
                    className="mt-1"
                  />
                </div>
              )}
            </div>
          )}
        </motion.div>

        <div className="flex items-center justify-between mb-4 gap-3">
          <p className="text-xs text-muted-foreground">{loading ? "" : `${filtered.length} veículo(s) encontrado(s)`}</p>
          <div className="inline-flex rounded-sm border border-border overflow-hidden" role="tablist" aria-label="Modo de visualização">
            <button
              type="button"
              onClick={() => { setView("grid"); try { localStorage.setItem("vehicles-view", "grid"); } catch {} }}
              aria-pressed={view === "grid"}
              aria-label="Vista em grelha"
              className={`p-2 transition-colors ${view === "grid" ? "bg-primary text-primary-foreground" : "bg-transparent text-muted-foreground hover:text-foreground"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => { setView("list"); try { localStorage.setItem("vehicles-view", "list"); } catch {} }}
              aria-pressed={view === "list"}
              aria-label="Vista em lista"
              className={`p-2 transition-colors border-l border-border ${view === "list" ? "bg-primary text-primary-foreground" : "bg-transparent text-muted-foreground hover:text-foreground"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => <SkeletonVehicleCard key={n} />)}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}
          >
            {filtered.map((v) => (
              <motion.div key={v.id} variants={item}>
                <Link to={`/veiculo/${v.id}`} className="block group">
                  {view === "grid" ? (
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
                  ) : (
                    <div className="glass-card rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 flex flex-col sm:flex-row">
                      <div className="relative sm:w-64 md:w-72 shrink-0 overflow-hidden">
                        <div className="aspect-video sm:aspect-square sm:h-full">
                          <img
                            src={getVehicleImage(v.name, v.brand)}
                            alt={`${v.brand} ${v.name}`}
                            loading="lazy"
                            width={600}
                            height={400}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
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
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs tracking-[0.2em] text-primary font-display">{v.brand}</span>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{v.category}</span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-foreground mb-1">{v.name}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">{v.description}</p>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-muted-foreground mb-4">
                          <span className="inline-flex items-center gap-1.5"><Gauge className="w-3.5 h-3.5 text-primary" />{v.power}</span>
                          <span className="inline-flex items-center gap-1.5"><Settings2 className="w-3.5 h-3.5 text-primary" />{v.transmission?.split("/")[0]?.trim()}</span>
                          <span className="inline-flex items-center gap-1.5"><Fuel className="w-3.5 h-3.5 text-primary" />{v.fuel_type}</span>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/50">
                          <span className="text-sm text-primary font-display font-medium">{v.price}</span>
                          <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                            Ver detalhes <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
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
            <Button variant="outline" className="mt-4" onClick={() => { setSelectedBrand(null); setSelectedCategory(null); setQuery(""); setPriceRange(priceBounds); setYearRange(yearBounds); }}>
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
