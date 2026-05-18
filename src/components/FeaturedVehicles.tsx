import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Fuel, Gauge, Settings2, Sliders, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { getVehicleImage } from "@/data/vehicleImages";
import { vehicles as staticVehicles, toDbFormat } from "@/data/vehicles";
import { SkeletonVehicleCard } from "@/components/SkeletonCard";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function VehicleCard({ v, featured }: { v: any; featured?: boolean }) {
  const navigate = useNavigate();
  return (
    <Link to={`/veiculo/${v.id}`} className="block group h-full">
      <div className={`glass-card rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-500 h-full hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 ${featured ? "ring-1 ring-primary/20" : ""}`}>
        <div className={`${featured ? "aspect-[16/10]" : "aspect-video"} overflow-hidden relative`}>
          <img
            src={getVehicleImage(v.name, v.brand)}
            alt={`${v.brand} ${v.name}`}
            loading="lazy"
            width={800}
            height={450}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {featured && (
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-sm text-xs font-display tracking-wider flex items-center gap-1.5">
              <Star className="w-3 h-3 fill-current" /> DESTAQUE
            </div>
          )}
          {v.year >= new Date().getFullYear() && !featured && (
            <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2.5 py-0.5 rounded-sm text-xs font-display tracking-wider">
              NOVO
            </div>
          )}
        </div>
        <div className={`${featured ? "p-6" : "p-5"}`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs tracking-[0.2em] text-primary font-display">{v.brand}</span>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{v.year}</span>
          </div>
          <h3 className={`font-display ${featured ? "text-2xl" : "text-xl"} font-bold text-foreground mb-2`}>{v.name}</h3>
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
            <span className="text-xs text-primary font-medium">{v.price}</span>
            <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1">
              Ver detalhes <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedVehicles() {
  const [featured, setFeatured] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let resolved = false;
    const fallback = () => {
      if (!resolved) {
        resolved = true;
        setFeatured(staticVehicles.filter(v => v.featured).map(toDbFormat));
        setLoading(false);
      }
    };
    const timer = setTimeout(fallback, 3000);
    Promise.resolve(
      supabase.from("vehicles").select("*").eq("featured", true).eq("active", true).limit(5)
    ).then(({ data }) => {
      if (resolved) return;
      resolved = true;
      clearTimeout(timer);
      const results = data && data.length > 0 ? data : staticVehicles.filter(v => v.featured).map(toDbFormat);
      setFeatured(results);
      setLoading(false);
    }).catch(() => fallback());
  }, []);

  return (
    <section className="py-32">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="flex items-end justify-between mb-12">
          <div>
            <p className="text-primary font-display text-sm tracking-[0.3em] mb-3">DESTAQUES</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">VEÍCULOS EM <span className="text-gradient-gold">DESTAQUE</span></h2>
          </div>
          <Link to="/veiculos" className="hidden md:block">
            <Button variant="outline" className="gap-2">Ver Todos <ArrowRight className="w-4 h-4" /></Button>
          </Link>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => <SkeletonVehicleCard key={n} />)}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* First vehicle spans 2 cols as featured hero card */}
            {featured.slice(0, 1).map((v) => (
              <motion.div key={v.id} variants={item} className="md:col-span-2 md:row-span-2">
                <VehicleCard v={v} featured />
              </motion.div>
            ))}
            {featured.slice(1).map((v) => (
              <motion.div key={v.id} variants={item}>
                <VehicleCard v={v} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="md:hidden mt-8 text-center">
          <Link to="/veiculos"><Button variant="outline" className="gap-2">Ver Todos <ArrowRight className="w-4 h-4" /></Button></Link>
        </div>
      </div>
    </section>
  );
}
