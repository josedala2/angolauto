import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import { brands, vehicles } from "@/data/vehicles";
import suzukiImg from "@/assets/suzuki-showcase.jpg";
import dfskImg from "@/assets/dfsk-showcase.jpg";
import ineosImg from "@/assets/ineos-showcase.jpg";
import scaniaImg from "@/assets/scania-showcase.jpg";
import suzukiLogo from "@/assets/brands/suzuki-logo.png";
import dfskLogo from "@/assets/brands/dfsk-logo.png";
import ineosLogo from "@/assets/brands/ineos-logo.png";
import scaniaLogo from "@/assets/brands/scania-logo.png";

const brandImages: Record<string, string> = {
  Suzuki: suzukiImg,
  DFSK: dfskImg,
  Ineos: ineosImg,
  Scania: scaniaImg,
};

const brandLogos: Record<string, string> = {
  Suzuki: suzukiLogo,
  DFSK: dfskLogo,
  Ineos: ineosLogo,
  Scania: scaniaLogo,
};

export default function BrandsPage() {
  return (
    <main className="pb-16 min-h-screen">
      <PageHero image={suzukiImg} subtitle="PORTFÓLIO" title="AS NOSSAS" highlight="MARCAS" description="Conheça as marcas que representamos oficialmente em Angola." />
      <div className="container mx-auto px-4 mt-8">

        <div className="space-y-16">
          {brands.map((brand, i) => {
            const brandVehicles = vehicles.filter((v) => v.brand === brand.id);
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 items-center`}
              >
                <div className="lg:w-1/2">
                  <div className="rounded-lg overflow-hidden aspect-[4/3] relative">
                    <img
                      src={brandImages[brand.id]}
                      alt={brand.name}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                    {/* Logo overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-6">
                      <img
                        src={brandLogos[brand.id]}
                        alt={`${brand.name} logo`}
                        className="h-12 w-auto object-contain drop-shadow-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={brandLogos[brand.id]}
                      alt={`${brand.name} logo`}
                      className="h-8 w-auto object-contain invert dark:invert-0 opacity-80"
                    />
                    <p className="text-primary font-display text-xs tracking-[0.3em]">{brand.tagline}</p>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{brand.name}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{brand.description}</p>

                  <div className="mb-6">
                    <p className="text-xs text-muted-foreground mb-3 font-display tracking-wider">MODELOS DISPONÍVEIS</p>
                    <div className="flex flex-wrap gap-2">
                      {brandVehicles.map((v) => (
                        <span key={v.id} className="text-xs bg-secondary/60 text-secondary-foreground px-3 py-1.5 rounded-sm border border-border/50">
                          {v.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link to={`/marcas/${brand.id.toLowerCase()}`}>
                    <Button variant="outline" className="gap-2">
                      Ver {brand.name} <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
