import { motion, useInView } from "framer-motion";
import { Shield, Wrench, Award, Truck } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const features = [
  { icon: Shield, title: "Garantia Oficial", desc: "Todos os veículos com garantia de fábrica e suporte técnico certificado." },
  { icon: Wrench, title: "Assistência Técnica", desc: "Oficina equipada com técnicos formados e peças originais." },
  { icon: Award, title: "Representante Exclusivo", desc: "Único representante oficial das 4 marcas em Angola." },
  { icon: Truck, title: "Entrega em Angola", desc: "Entrega em todo o território nacional com acompanhamento." },
];

const stats = [
  { value: 20, suffix: "+", label: "Anos de Experiência" },
  { value: 4, suffix: "", label: "Marcas Representadas" },
  { value: 500, suffix: "+", label: "Veículos Vendidos" },
  { value: 100, suffix: "%", label: "Peças Originais" },
];

function AnimatedCounter({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function WhyUsSection() {
  return (
    <section className="py-32 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] mb-3">
            VANTAGENS
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            PORQUÊ A <span className="text-gradient-gold">ANGOLAUTO</span>
          </h2>
        </motion.div>

        {/* Stats counters */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={item} className="text-center">
              <p className="font-display text-4xl md:text-5xl font-bold text-gradient-gold">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs text-muted-foreground font-display tracking-wider mt-2 uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="section-divider mb-16" />

        {/* Feature cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="glass-card rounded-lg p-6 text-center hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500 group"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
