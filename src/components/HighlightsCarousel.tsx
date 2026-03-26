import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import jimnyHero from "@/assets/vehicles/jimny-hero.jpg";
import glory580Hero from "@/assets/vehicles/glory580-hero.jpg";
import grenadierHero from "@/assets/vehicles/grenadier-hero.jpg";
import r500Hero from "@/assets/vehicles/r500-hero.jpg";

const slides = [
  {
    title: "NOVO SUZUKI JIMNY",
    subtitle: "O ícone off-road está de volta",
    cta: "Descobrir",
    link: "/veiculos?marca=Suzuki",
    image: jimnyHero,
  },
  {
    title: "DFSK GLORY 580",
    subtitle: "Conforto e espaço para toda a família",
    cta: "Ver Modelos",
    link: "/veiculos?marca=DFSK",
    image: glory580Hero,
  },
  {
    title: "INEOS GRENADIER",
    subtitle: "Construído com propósito, sem compromissos",
    cta: "Explorar",
    link: "/veiculos?marca=Ineos",
    image: grenadierHero,
  },
  {
    title: "SCANIA R 500",
    subtitle: "Força bruta — camiões e transporte pesado",
    cta: "Saber Mais",
    link: "/veiculos?marca=Scania",
    image: r500Hero,
  },
];

const SLIDE_DURATION = 5000;

export default function HighlightsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % slides.length);
    setProgress(0);
  }, []);
  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (paused) return;
    startRef.current = performance.now() - (progress / 100) * SLIDE_DURATION;

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        next();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [current, paused, next]);

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

        <div className="relative rounded-lg overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {/* Background images with parallax */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`bg-${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {/* Ken Burns slow zoom */}
              <motion.img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                animate={{ scale: [1.05, 1.15] }}
                transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            </motion.div>
          </AnimatePresence>

          {/* Content with parallax offset */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 120, y: 20 }),
                center: { opacity: 1, x: 0, y: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -60, y: -10 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative z-10 p-8 md:p-16 flex flex-col items-center text-center min-h-[350px] md:min-h-[420px] justify-end"
            >
              <h3 className="font-display text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">{slide.title}</h3>
              <p className="text-white/80 text-lg mb-6 drop-shadow">{slide.subtitle}</p>
              <Link to={slide.link}>
                <Button variant="hero">{slide.cta}</Button>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors z-20">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors z-20">
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Progress bars */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, i) => (
              <button key={i} onClick={() => { setCurrent(i); setProgress(0); }} className="relative w-12 h-1 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="absolute inset-0 rounded-full bg-white transition-none"
                  style={{
                    transformOrigin: "left",
                    transform: `scaleX(${i === current ? progress / 100 : i < current ? 1 : 0})`,
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
