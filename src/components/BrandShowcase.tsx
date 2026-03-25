import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import suzukiImg from "@/assets/suzuki-showcase.jpg";
import dfskImg from "@/assets/dfsk-showcase.jpg";
import ineosImg from "@/assets/ineos-showcase.jpg";
import scaniaImg from "@/assets/scania-showcase.jpg";

const brandData = [
  { id: "Suzuki", name: "Suzuki", tagline: "Way of Life", img: suzukiImg },
  { id: "DFSK", name: "DFSK", tagline: "Drive Your Ambition", img: dfskImg },
  { id: "Ineos", name: "Ineos Grenadier", tagline: "Built On Purpose", img: ineosImg },
  { id: "Scania", name: "Scania", tagline: "King of the Road", img: scaniaImg },
];

export default function BrandShowcase() {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] mb-3">
            PORTFÓLIO
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            AS NOSSAS <span className="text-gradient-gold">MARCAS</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brandData.map((brand, i) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/veiculos?marca=${brand.id}`}
                className="group block glass-card rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={brand.img}
                    alt={brand.name}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {brand.name}
                  </h3>
                  <p className="text-xs text-primary tracking-[0.2em] mt-1 mb-3">
                    {brand.tagline}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    Ver modelos <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
