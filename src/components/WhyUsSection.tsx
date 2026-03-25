import { motion } from "framer-motion";
import { Shield, Wrench, Award, Truck } from "lucide-react";

const features = [
  { icon: Shield, title: "Garantia Oficial", desc: "Todos os veículos com garantia de fábrica e suporte técnico certificado." },
  { icon: Wrench, title: "Assistência Técnica", desc: "Oficina equipada com técnicos formados e peças originais." },
  { icon: Award, title: "Representante Exclusivo", desc: "Único representante oficial das 4 marcas em Angola." },
  { icon: Truck, title: "Entrega em Angola", desc: "Entrega em todo o território nacional com acompanhamento." },
];

export default function WhyUsSection() {
  return (
    <section className="py-24 bg-card">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-lg p-6 text-center hover:border-primary/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground mb-2">
                {f.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
