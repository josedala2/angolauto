import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { vehicles } from "@/data/vehicles";

const EASING = [0.22, 1, 0.36, 1] as const;

// Curated editorial order — mistura de marcas em destaque
const FEATURED_IDS = [
  "suzuki-jimny",
  "suzuki-vitara",
  "dfsk-glory-580",
  "ineos-grenadier",
  "scania-r500",
];

export default function ModelChipsBar() {
  const items = FEATURED_IDS
    .map((id) => vehicles.find((v) => v.id === id))
    .filter((v): v is NonNullable<typeof v> => Boolean(v));

  if (items.length === 0) return null;

  return (
    <section
      aria-label="Modelos em destaque"
      className="border-y border-border/40 bg-background/60 backdrop-blur-md"
    >
      <div className="container mx-auto px-4">
        <div
          className="flex items-stretch gap-0 overflow-x-auto snap-x snap-mandatory lg:justify-center"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASING }}
              className="snap-start shrink-0 border-r border-border/30 last:border-r-0"
            >
              <Link
                to={`/veiculos?marca=${encodeURIComponent(v.brand)}&q=${encodeURIComponent(v.name)}`}
                className="group flex flex-col items-center justify-center px-6 py-4 min-w-[140px] relative transition-transform duration-300 hover:-translate-y-0.5"
                style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
              >
                <span className="font-display tracking-[0.18em] uppercase text-sm text-foreground group-hover:text-primary transition-colors">
                  {v.name}
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-0.5">
                  {v.brand}
                </span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-2/3" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
