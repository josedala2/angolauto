import { motion } from "framer-motion";
import { Target, Eye, Heart, Facebook, Instagram, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/PageHero";
import Timeline from "@/components/Timeline";
import BrandShowcase from "@/components/BrandShowcase";
import suzukiShowcase from "@/assets/suzuki-showcase.jpg";

const premiumEasing = [0.22, 1, 0.36, 1] as const;

const timelineItems = [
  { year: "2005", title: "Fundação", description: "Início das operações em Luanda como representante automóvel." },
  { year: "2010", title: "Parceria Suzuki", description: "Tornamo-nos representante oficial da Suzuki em Angola." },
  { year: "2015", title: "Expansão DFSK", description: "Adição da marca DFSK ao portfólio de veículos comerciais." },
  { year: "2020", title: "Ineos Grenadier", description: "Representação exclusiva do Ineos Grenadier para Angola." },
  { year: "2023", title: "Scania", description: "Parceria com a Scania para camiões e veículos pesados." },
];

const values = [
  { icon: Target, title: "Missão", desc: "Oferecer soluções de mobilidade de excelência, com veículos de qualidade superior e serviço personalizado para o mercado angolano." },
  { icon: Eye, title: "Visão", desc: "Ser a referência na comercialização automóvel em Angola, reconhecidos pela confiança, inovação e compromisso com os nossos clientes." },
  { icon: Heart, title: "Valores", desc: "Integridade, excelência no atendimento, compromisso com a qualidade e responsabilidade social." },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: premiumEasing } },
};

export default function AboutPage() {
  return (
    <main className="pb-16 min-h-screen">
      <SEOHead title="Sobre Nós — Angolauto" description="Conheça a Angolauto, representante oficial em Angola das marcas Suzuki, DFSK, Ineos Grenadier e Scania." />
      <PageHero
        image={suzukiShowcase}
        subtitle="QUEM SOMOS"
        title="A SUA REFERÊNCIA"
        highlight="AUTOMÓVEL"
        description="A Angolauto é o representante oficial em Angola das marcas Suzuki, DFSK, Ineos Grenadier e Scania. Com anos de experiência no mercado angolano, oferecemos veículos de qualidade, serviço de excelência e soluções completas de mobilidade."
      />

      {/* Mission / Vision / Values */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {values.map((v) => (
              <motion.div key={v.title} variants={cardVariant} className="glass-card rounded-lg p-8 text-center hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-7 h-7 text-primary" />
                </div>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">{v.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: premiumEasing }} className="text-center mb-12">
            <p className="text-primary font-display text-sm tracking-[0.3em] mb-2">PERCURSO</p>
            <h2 className="font-display text-3xl font-bold">A NOSSA <span className="text-gradient-gold">HISTÓRIA</span></h2>
          </motion.div>
          <div className="max-w-4xl mx-auto">
            <Timeline items={timelineItems} />
          </div>
        </div>
      </section>

      {/* Brands */}
      <BrandShowcase />

      {/* Social Media */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: premiumEasing }}>
            <p className="text-primary font-display text-sm tracking-[0.3em] mb-2">SIGA-NOS</p>
            <h2 className="font-display text-3xl font-bold mb-8">NAS <span className="text-gradient-gold">REDES SOCIAIS</span></h2>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              { href: "https://facebook.com/angolauto", icon: Facebook, label: "Facebook Angolauto" },
              { href: "https://instagram.com/suzukiangola", icon: Instagram, label: "Instagram Suzuki" },
              { href: "https://instagram.com/dfskangola", icon: Instagram, label: "Instagram DFSK" },
              { href: "https://instagram.com/ineosangola", icon: Instagram, label: "Instagram Ineos" },
            ].map((s) => (
              <motion.a
                key={s.label}
                variants={cardVariant}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-lg px-6 py-4 hover:border-primary/30 transition-all duration-500 flex items-center gap-3 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
              >
                <s.icon className="w-5 h-5 text-primary" />
                <span className="text-foreground font-display text-sm tracking-wider">{s.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEasing }}
            className="glass-card rounded-lg p-12 text-center max-w-3xl mx-auto"
          >
            <p className="text-primary font-display text-sm tracking-[0.3em] mb-2">PRÓXIMO PASSO</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Pronto para conhecer os nossos <span className="text-gradient-gold">veículos</span>?
            </h2>
            <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
              Visite o nosso stand em Luanda ou agende um test drive online. A nossa equipa está ao seu dispor.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contacto">
                <Button className="gap-2">Fale Connosco <ArrowRight className="w-4 h-4" /></Button>
              </Link>
              <Link to="/veiculos">
                <Button variant="outline" className="gap-2">Ver Veículos <ArrowRight className="w-4 h-4" /></Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
