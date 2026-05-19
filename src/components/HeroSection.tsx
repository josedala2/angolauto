import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import jimnyHero from "@/assets/vehicles/jimny-hero.jpg";
import glory580Hero from "@/assets/vehicles/glory580-hero.jpg";
import grenadierHero from "@/assets/vehicles/grenadier-hero.jpg";
import r500Hero from "@/assets/vehicles/r500-hero.jpg";
import { useSegment } from "@/context/SegmentContext";
import SegmentPanel from "@/components/SegmentPanel";

const slides = [
  {
    image: heroBg,
    subtitle: "REPRESENTANTE OFICIAL EM ANGOLA",
    title: "A SUA PRÓXIMA",
    titleHighlight: "VIAGEM",
    titleEnd: "COMEÇA AQUI",
    description: "Suzuki · DFSK · Ineos Grenadier · Scania — Veículos novos com garantia oficial e serviço de excelência.",
    cta: "Ver Catálogo",
    ctaLink: "/veiculos",
    ctaSecondary: "Agendar Test Drive",
    ctaSecondaryLink: "/contacto",
  },
  {
    image: jimnyHero,
    subtitle: "SUZUKI",
    title: "SUZUKI",
    titleHighlight: "JIMNY",
    titleEnd: "",
    description: "O ícone off-road está de volta — aventura sem limites.",
    cta: "Ver Modelos Suzuki",
    ctaLink: "/veiculos?marca=Suzuki",
  },
  {
    image: glory580Hero,
    subtitle: "DFSK",
    title: "DFSK",
    titleHighlight: "GLORY 580",
    titleEnd: "",
    description: "Conforto e espaço para toda a família.",
    cta: "Ver Modelos DFSK",
    ctaLink: "/veiculos?marca=DFSK",
  },
  {
    image: grenadierHero,
    subtitle: "INEOS",
    title: "INEOS",
    titleHighlight: "GRENADIER",
    titleEnd: "",
    description: "Construído com propósito, sem compromissos.",
    cta: "Explorar Ineos",
    ctaLink: "/veiculos?marca=Ineos",
  },
  {
    image: r500Hero,
    subtitle: "SCANIA",
    title: "SCANIA",
    titleHighlight: "R 500",
    titleEnd: "",
    description: "Força bruta — camiões e transporte pesado.",
    cta: "Saber Mais",
    ctaLink: "/veiculos?marca=Scania",
  },
];

const SLIDE_DURATION = 6000;

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const { isEmpresa } = useSegment();

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
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background images with Ken Burns + parallax */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`hero-bg-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <motion.img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            animate={{ scale: [1.05, 1.15] }}
            transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
        </motion.div>
      </AnimatePresence>

      {/* Content with parallax offset */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`hero-content-${current}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 container mx-auto px-4 pt-20"
        >
          <div className="max-w-2xl">
            <p className="text-primary font-display text-sm tracking-[0.3em] mb-4" aria-live="polite">
              {current === 0 ? (
                <>
                  <SegmentPanel value="particulares" keepMounted>MOBILIDADE PARA SI</SegmentPanel>
                  <SegmentPanel value="empresas" keepMounted>FROTAS E SOLUÇÕES B2B</SegmentPanel>
                </>
              ) : slide.subtitle}
            </p>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-6 text-white">
              {slide.title}
              <br />
              <span className="text-gradient-gold">{slide.titleHighlight}</span>
              {slide.titleEnd && (
                <>
                  <br />
                  {slide.titleEnd}
                </>
              )}
            </h1>

            <p className="text-white/70 text-lg max-w-md mb-10 font-body">
              {slide.description}
            </p>

            <div className="flex items-center gap-6">
              <Link to={slide.ctaLink}>
                <Button variant="hero">
                  {slide.cta} <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              {slide.ctaSecondary && slide.ctaSecondaryLink && (
                <Link
                  to={isEmpresa && slide.ctaSecondaryLink === "/contacto" ? "/contacto?segmento=empresas" : slide.ctaSecondaryLink}
                  className="group text-sm font-display tracking-widest uppercase text-white/80 hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  {isEmpresa && slide.ctaSecondaryLink === "/contacto" ? "Pedido de Frota" : slide.ctaSecondary}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors z-20"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors z-20"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Progress bars */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
              setProgress(0);
            }}
            className="relative w-12 h-1 rounded-full bg-white/20 overflow-hidden"
          >
            <div
              className="absolute inset-0 rounded-full bg-primary transition-none"
              style={{
                transformOrigin: "left",
                transform: `scaleX(${i === current ? progress / 100 : i < current ? 1 : 0})`,
              }}
            />
          </button>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
