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

const premiumEasing = [0.22, 1, 0.36, 1] as const;

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

      <div className="container mx-auto px-4 py-16">
        <div className="space-y-0">
          {brands.map((brand, i) => {
            const brandVehicles = vehicles.filter((v) => v.brand === brand.id);
            const isEven = i % 2 === 0;

            return (
              <div key={brand.id}>
                {i > 0 && (
                  <div className="flex items-center justify-center py-8">
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: premiumEasing, delay: 0.05 }}
                  className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 items-center py-8`}
                >
                  <motion.div
                    className="lg:w-1/2"
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: premiumEasing, delay: 0.15 }}
                  >
                    <div className="rounded-lg overflow-hidden aspect-[4/3] relative group">
                      <img
                        src={brandImages[brand.id]}
                        alt={brand.name}
                        loading="lazy"
                        width={800}
                        height={600}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-6">
                        <img
                          src={brandLogos[brand.id]}
                          alt={`${brand.name} logo`}
                          className="h-12 w-auto object-contain drop-shadow-lg invert"
                        />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="lg:w-1/2"
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: premiumEasing, delay: 0.25 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={brandLogos[brand.id]}
                        alt={`${brand.name} logo`}
                        className="h-8 w-auto object-contain dark:invert opacity-80"
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
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: premiumEasing }}
          className="mt-20 glass-card rounded-lg p-12 text-center max-w-3xl mx-auto"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] mb-2">PRECISA DE AJUDA?</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Não encontrou o que <span className="text-gradient-gold">procura</span>?
          </h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
            A nossa equipa está disponível para o ajudar a encontrar o veículo ideal para as suas necessidades.
          </p>
          <Link to="/contacto">
            <Button className="gap-2">Contacte-nos <ArrowRight className="w-4 h-4" /></Button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
