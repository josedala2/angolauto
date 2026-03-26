import { motion } from "framer-motion";

interface TimelineItem {
  year: string;
  title: string;
  description?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  variant?: "centered" | "left";
}

export default function Timeline({ items, variant = "centered" }: TimelineProps) {
  if (variant === "left") {
    return <TimelineLeft items={items} />;
  }
  return <TimelineCentered items={items} />;
}

function TimelineCentered({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative">
      {/* Central vertical line — desktop */}
      <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-[2px] hidden md:block overflow-hidden">
        <div className="w-full h-full bg-gradient-to-b from-primary via-primary/40 to-transparent" />
        <motion.div
          className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-primary/80 to-transparent"
          animate={{ y: ["0%", "400%", "0%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Mobile left line */}
      <div className="absolute left-[1.375rem] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary/40 to-transparent md:hidden" />

      <div className="space-y-6 md:space-y-0">
        {items.map((item, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div key={`${item.year}-${i}`} className="relative">
              {/* Desktop layout */}
              <div className="hidden md:grid md:grid-cols-[1fr_80px_1fr] items-center">
                {/* Left side */}
                <div className={isLeft ? "" : "order-3"}>
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                    className={isLeft ? "pr-6" : "pl-6"}
                  >
                    <TimelineCard item={item} align={isLeft ? "right" : "left"} index={i} />
                  </motion.div>
                </div>

                {/* Center node */}
                <div className="flex justify-center order-2">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.1 + 0.15, type: "spring", stiffness: 200 }}
                    className="relative z-10"
                  >
                    <div className="w-14 h-14 rounded-full bg-background border-2 border-primary/50 flex items-center justify-center shadow-[0_0_20px_hsl(var(--primary)/0.2)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:scale-110 hover:border-primary transition-all duration-500 group cursor-default">
                      <span className="font-display text-xs font-bold text-primary group-hover:text-foreground transition-colors duration-300">
                        {item.year}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Right side — empty when isLeft */}
                <div className={isLeft ? "order-3" : ""} />
              </div>

              {/* Connector lines — desktop */}
              <div className="hidden md:block absolute top-1/2 -translate-y-px h-[2px] bg-gradient-to-r from-primary/30 to-primary/10" style={{
                left: isLeft ? "calc(50% - 40px)" : "auto",
                right: isLeft ? "auto" : "calc(50% - 40px)",
                width: "40px",
                transform: isLeft ? "translateY(-50%) scaleX(-1)" : "translateY(-50%)",
              }} />

              {/* Mobile layout */}
              <div className="md:hidden flex gap-4 items-start py-3">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
                  className="relative z-10 shrink-0"
                >
                  <div className="w-11 h-11 rounded-full bg-background border-2 border-primary/50 flex items-center justify-center shadow-[0_0_15px_hsl(var(--primary)/0.15)]">
                    <span className="font-display text-[10px] font-bold text-primary">
                      {item.year}
                    </span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.1, duration: 0.5 }}
                  className="pt-0.5 flex-1"
                >
                  <TimelineCard item={item} align="left" index={i} />
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TimelineLeft({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative">
      {/* Left vertical line */}
      <div className="absolute left-[1.375rem] top-0 bottom-0 w-[2px] overflow-hidden">
        <div className="w-full h-full bg-gradient-to-b from-primary via-primary/40 to-transparent" />
      </div>

      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={`${item.year}-${i}`} className="flex gap-4 items-start py-2">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
              className="relative z-10 shrink-0"
            >
              <div className="w-11 h-11 rounded-full bg-background border-2 border-primary/50 flex items-center justify-center shadow-[0_0_15px_hsl(var(--primary)/0.15)] hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)] hover:scale-110 hover:border-primary transition-all duration-500 group cursor-default">
                <span className="font-display text-[10px] font-bold text-primary group-hover:text-foreground transition-colors duration-300">
                  {item.year}
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 + 0.1, duration: 0.5, ease: "easeOut" }}
              className="pt-0.5 flex-1"
            >
              <TimelineCard item={item} align="left" index={i} />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineCard({ item, align, index }: { item: TimelineItem; align: "left" | "right"; index: number }) {
  const hasDescription = item.description && item.description.trim().length > 0;

  return (
    <div
      className={`glass-card rounded-lg p-5 hover:border-primary/30 transition-all duration-500 hover:shadow-[var(--shadow-gold)] group ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      <div className={`flex items-center gap-2 mb-1.5 ${align === "right" ? "justify-end" : ""}`}>
        <div className={`h-px w-6 bg-gradient-to-r from-primary/60 to-transparent group-hover:w-10 transition-all duration-500 ${align === "right" ? "order-2 rotate-180" : ""}`} />
        <span className="font-display text-[10px] tracking-[0.3em] text-primary/70 font-medium">
          {item.year}
        </span>
      </div>
      <h3 className="font-display text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
        {item.title}
      </h3>
      {hasDescription && (
        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
      )}
    </div>
  );
}
