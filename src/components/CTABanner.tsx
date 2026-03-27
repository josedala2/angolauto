import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] mb-3">
            PRÓXIMO PASSO
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
            PRONTO PARA O SEU{" "}
            <span className="text-gradient-gold">PRÓXIMO VEÍCULO</span>?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-lg">
            Agende um test drive ou fale com um dos nossos consultores. 
            Estamos aqui para encontrar o veículo ideal para si.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/contacto">
              <Button variant="hero">
                Agendar Test Drive <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contacto">
              <Button variant="heroOutline" className="text-white border-white/30 hover:bg-white/5 hover:border-white/60">
                <Phone className="w-4 h-4" /> Falar com Consultor
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
