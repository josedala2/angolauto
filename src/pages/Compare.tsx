import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { getVehicleImage } from "@/data/vehicleImages";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, X, Gauge, Settings2, Fuel, Zap, Calendar, Car, Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import grenadierHero from "@/assets/vehicles/grenadier-hero.jpg";

export default function ComparePage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    supabase.from("vehicles").select("*").eq("active", true).order("brand").order("name").then(({ data }) => setVehicles(data || []));
  }, []);

  const compared = useMemo(() => vehicles.filter((v) => selected.includes(v.id)), [vehicles, selected]);

  const addVehicle = (id: string) => {
    if (selected.length < 3 && !selected.includes(id)) {
      setSelected([...selected, id]);
    }
    setShowPicker(false);
  };

  const removeVehicle = (id: string) => setSelected(selected.filter((s) => s !== id));

  const specs = [
    { key: "power", label: "Potência", icon: Gauge },
    { key: "engine", label: "Motor", icon: Zap },
    { key: "transmission", label: "Transmissão", icon: Settings2 },
    { key: "fuel_type", label: "Combustível", icon: Fuel },
    { key: "year", label: "Ano", icon: Calendar },
    { key: "category", label: "Categoria", icon: Car },
  ];

  return (
    <main className="pt-20 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <Link to="/veiculos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" /> Voltar ao catálogo
          </Link>
          <p className="text-primary font-display text-sm tracking-[0.3em] mb-2">ANÁLISE</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            COMPARAR <span className="text-gradient-gold">VEÍCULOS</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-2">Seleccione até 3 veículos para comparar lado a lado.</p>
        </motion.div>

        {/* Selected vehicles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[0, 1, 2].map((i) => {
            const v = compared[i];
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                {v ? (
                  <div className="glass-card rounded-lg overflow-hidden">
                    <div className="relative aspect-video">
                      <img src={getVehicleImage(v.name, v.brand)} alt={`${v.brand} ${v.name}`} className="w-full h-full object-cover" />
                      <button onClick={() => removeVehicle(v.id)} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/80 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-4 text-center">
                      <span className="text-[10px] text-primary font-display tracking-[0.2em]">{v.brand}</span>
                      <h3 className="font-display text-lg font-bold text-foreground">{v.name}</h3>
                      <p className="text-sm text-accent font-display mt-1">{v.price}</p>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setShowPicker(true)} className="glass-card rounded-lg aspect-[4/3] flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border/50 hover:border-primary/40 transition-all">
                    <Plus className="w-8 h-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground font-display">Adicionar veículo</span>
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Specs Table */}
        {compared.length >= 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-lg overflow-hidden">
            <div className="p-4 border-b border-border/30">
              <h2 className="font-display text-sm font-semibold text-foreground tracking-wider">COMPARAÇÃO DE ESPECIFICAÇÕES</h2>
            </div>
            <div className="divide-y divide-border/20">
              {specs.map((spec) => (
                <div key={spec.key} className="grid grid-cols-4 gap-4 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <spec.icon className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground font-display tracking-wider">{spec.label}</span>
                  </div>
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="text-sm text-foreground font-medium">
                      {compared[i] ? (compared[i][spec.key]?.toString() || "—") : ""}
                    </div>
                  ))}
                </div>
              ))}
              {/* Price row */}
              <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-secondary/20">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-accent font-display tracking-wider font-semibold">PREÇO</span>
                </div>
                {[0, 1, 2].map((i) => (
                  <div key={i} className="text-sm text-accent font-display font-bold">
                    {compared[i]?.price || ""}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {compared.length < 2 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="font-display">Seleccione pelo menos 2 veículos para comparar</p>
          </div>
        )}

        {/* Vehicle Picker Modal */}
        {showPicker && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={() => setShowPicker(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} onClick={(e) => e.stopPropagation()} className="glass-card rounded-lg p-6 w-full max-w-lg border border-border max-h-[70vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-bold text-foreground">SELECCIONAR VEÍCULO</h3>
                <button onClick={() => setShowPicker(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-2">
                {vehicles.filter((v) => !selected.includes(v.id)).map((v) => (
                  <button key={v.id} onClick={() => addVehicle(v.id)} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors text-left">
                    <img src={getVehicleImage(v.name, v.brand)} alt="" className="w-16 h-10 object-cover rounded" />
                    <div className="flex-1">
                      <span className="text-[10px] text-primary font-display tracking-wider">{v.brand}</span>
                      <p className="text-sm font-display font-semibold text-foreground">{v.name}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{v.price}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
