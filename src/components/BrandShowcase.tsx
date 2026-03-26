import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import suzukiImg from "@/assets/suzuki-showcase.jpg";
import dfskImg from "@/assets/dfsk-showcase.jpg";
import ineosImg from "@/assets/ineos-showcase.jpg";
import scaniaImg from "@/assets/scania-showcase.jpg";
import suzukiLogo from "@/assets/brands/suzuki-logo.png";
import dfskLogo from "@/assets/brands/dfsk-logo.png";
import ineosLogo from "@/assets/brands/ineos-logo.png";
import scaniaLogo from "@/assets/brands/scania-logo.png";

const brandData = [
  { id: "Suzuki", name: "Suzuki", tagline: "Way of Life", img: suzukiImg, logo: suzukiLogo },
  { id: "DFSK", name: "DFSK", tagline: "Drive Your Ambition", img: dfskImg, logo: dfskLogo },
  { id: "Ineos", name: "Ineos Grenadier", tagline: "Built On Purpose", img: ineosImg, logo: ineosLogo },
  { id: "Scania", name: "Scania", tagline: "King of the Road", img: scaniaImg, logo: scaniaLogo },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function BrandShowcase() {
  return (
    <section className="py-32 bg-card">
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

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {brandData.map((brand) => (
            <motion.div key={brand.id} variants={item}>
              <Link
                to={`/marcas/${brand.id.toLowerCase()}`}
                className="group block glass-card rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={brand.img}
                    alt={brand.name}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Logo overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-center pb-4">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="h-10 w-auto object-contain drop-shadow-lg opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
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
        </motion.div>
      </div>
    </section>
  );
}
