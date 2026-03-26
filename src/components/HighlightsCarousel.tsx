import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "NOVO SUZUKI JIMNY",
    subtitle: "O ícone off-road está de volta",
    cta: "Descobrir",
    link: "/veiculos?marca=Suzuki",
    gradient: "from-primary/20 to-transparent",
  },
  {
    title: "DFSK GLORY 580",
    subtitle: "Conforto e espaço para toda a família",
    cta: "Ver Modelos",
    link: "/veiculos?marca=DFSK",
    gradient: "from-accent/20 to-transparent",
  },
  {
    title: "INEOS GRENADIER",
    subtitle: "Construído com propósito, sem compromissos",
    cta: "Explorar",
    link: "/veiculos?marca=Ineos",
    gradient: "from-primary/15 to-transparent",
  },
  {
    title: "SCANIA — FORÇA BRUTA",
    subtitle: "Camiões e soluções de transporte pesado",
    cta: "Saber Mais",
    link: "/veiculos?marca=Scania",
    gradient: "from-accent/15 to-transparent",
  },
];

export default function HighlightsCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-8">
          <p className="text-primary font-display text-sm tracking-[0.3em] mb-2">DESTAQUES</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            NOVIDADES E <span className="text-gradient-gold">CAMPANHAS</span>
          </h2>
        </motion.div>

        <div className="relative glass-card rounded-lg overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 p-8 md:p-16 flex flex-col items-center text-center min-h-[250px] justify-center"
            >
              <h3 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3">{slide.title}</h3>
              <p className="text-muted-foreground text-lg mb-6">{slide.subtitle}</p>
              <Link to={slide.link}>
                <Button variant="hero">{slide.cta}</Button>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-card flex items-center justify-center text-foreground hover:text-primary transition-colors z-20">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-card flex items-center justify-center text-foreground hover:text-primary transition-colors z-20">
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-foreground/30"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
