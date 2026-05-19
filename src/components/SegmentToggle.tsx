import { motion } from "framer-motion";
import { toast } from "sonner";
import { useSegment, type Segment } from "@/context/SegmentContext";

interface Props {
  compact?: boolean;
  className?: string;
}

const options: { value: Segment; label: string }[] = [
  { value: "particulares", label: "Particulares" },
  { value: "empresas", label: "Empresas" },
];

export default function SegmentToggle({ compact = false, className = "" }: Props) {
  const { segment, setSegment } = useSegment();

  const handleChange = (next: Segment) => {
    if (next === segment) return;
    setSegment(next);
    toast.success(
      next === "empresas"
        ? "A ver oferta para Empresas"
        : "A ver oferta para Particulares",
      { duration: 1800 }
    );
  };

  return (
    <div
      role="tablist"
      aria-label="Segmento de cliente"
      className={`relative inline-flex items-center rounded-full border border-border/50 bg-background/40 backdrop-blur-md p-0.5 ${
        compact ? "h-8" : "h-9"
      } ${className}`}
    >
      {options.map((opt) => {
        const active = segment === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={`Ver oferta para ${opt.label}`}
            tabIndex={active ? 0 : -1}
            onClick={() => handleChange(opt.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                const next = options.find((o) => o.value !== segment);
                if (next) handleChange(next.value);
              }
            }}
            className={`relative z-10 px-3 h-full rounded-full font-display tracking-[0.15em] uppercase transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${
              compact ? "text-[10px]" : "text-[11px]"
            } ${active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {active && (
              <motion.span
                layoutId="segment-pill"
                className="absolute inset-0 rounded-full bg-primary -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
