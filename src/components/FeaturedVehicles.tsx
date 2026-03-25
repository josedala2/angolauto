import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Fuel, Gauge, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { vehicles } from "@/data/vehicles";

const featured = vehicles.filter((v) => v.featured).slice(0, 4);

export default function FeaturedVehicles() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-primary font-display text-sm tracking-[0.3em] mb-3">
              DESTAQUES
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              VEÍCULOS EM <span className="text-gradient-gold">DESTAQUE</span>
            </h2>
          </div>
          <Link to="/veiculos" className="hidden md:block">
            <Button variant="outline" className="gap-2">
              Ver Todos <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-lg overflow-hidden group hover:border-primary/30 transition-all duration-500"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] tracking-[0.2em] text-primary font-display">
                    {v.brand}
                  </span>
                  <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {v.year}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {v.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                  {v.description}
                </p>

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
                  <span className="text-xs text-primary font-medium">{v.price}</span>
                  <Link
                    to="/contacto"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    Saber mais <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden mt-8 text-center">
          <Link to="/veiculos">
            <Button variant="outline" className="gap-2">
              Ver Todos <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
