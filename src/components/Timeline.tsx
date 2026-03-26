import { motion } from "framer-motion";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
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
      {/* Central line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent hidden md:block" />
      {/* Mobile left line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent md:hidden" />

      <div className="space-y-8 md:space-y-12">
        {items.map((item, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={`${item.year}-${i}`}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative"
            >
              {/* Desktop layout */}
              <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6 items-center">
                {/* Left content */}
                <div className={isLeft ? "pr-4" : ""}>
                  {isLeft && <TimelineCard item={item} align="right" />}
                </div>

                {/* Center node */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full glass-card border-2 border-primary/40 flex items-center justify-center hover:scale-110 hover:border-primary transition-all duration-300 group cursor-default">
                    <span className="font-display text-xs font-bold text-primary group-hover:text-foreground transition-colors">
                      {item.year}
                    </span>
                  </div>
                </div>

                {/* Right content */}
                <div className={!isLeft ? "pl-4" : ""}>
                  {!isLeft && <TimelineCard item={item} align="left" />}
                </div>
              </div>

              {/* Mobile layout */}
              <div className="md:hidden flex gap-4 items-start">
                <div className="relative z-10 shrink-0">
                  <div className="w-12 h-12 rounded-full glass-card border-2 border-primary/40 flex items-center justify-center">
                    <span className="font-display text-[10px] font-bold text-primary">
                      {item.year}
                    </span>
                  </div>
                </div>
                <div className="pt-1 flex-1">
                  <TimelineCard item={item} align="left" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function TimelineLeft({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />

      <div className="space-y-8">
        {items.map((item, i) => (
          <motion.div
            key={`${item.year}-${i}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="flex gap-4 items-start"
          >
            <div className="relative z-10 shrink-0">
              <div className="w-12 h-12 rounded-full glass-card border-2 border-primary/40 flex items-center justify-center hover:scale-110 hover:border-primary transition-all duration-300">
                <span className="font-display text-[10px] font-bold text-primary">
                  {item.year}
                </span>
              </div>
            </div>
            <div className="pt-1 flex-1">
              <TimelineCard item={item} align="left" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TimelineCard({ item, align }: { item: TimelineItem; align: "left" | "right" }) {
  return (
    <div
      className={`glass-card rounded-lg p-5 hover:border-primary/30 transition-all duration-300 hover:shadow-[var(--shadow-gold)] ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      <h3 className="font-display text-base font-semibold text-foreground mb-1">
        {item.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
    </div>
  );
}
