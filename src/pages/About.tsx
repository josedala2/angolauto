import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Target, Eye, Heart, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const timeline = [
  { year: "2005", title: "Fundação", desc: "Início das operações em Luanda como representante automóvel." },
  { year: "2010", title: "Parceria Suzuki", desc: "Tornamo-nos representante oficial da Suzuki em Angola." },
  { year: "2015", title: "Expansão DFSK", desc: "Adição da marca DFSK ao portfólio de veículos comerciais." },
  { year: "2020", title: "Ineos Grenadier", desc: "Representação exclusiva do Ineos Grenadier para Angola." },
  { year: "2023", title: "Scania", desc: "Parceria com a Scania para camiões e veículos pesados." },
];

const brands = [
  { name: "Suzuki", desc: "SUVs, sedans e veículos compactos reconhecidos pela fiabilidade.", link: "/veiculos?marca=Suzuki", color: "from-primary to-primary/70" },
  { name: "DFSK", desc: "Veículos comerciais e utilitários com excelente relação qualidade-preço.", link: "/veiculos?marca=DFSK", color: "from-accent to-accent/70" },
  { name: "Ineos", desc: "O Grenadier — um 4x4 puro, construído com propósito.", link: "/veiculos?marca=Ineos", color: "from-primary to-accent" },
  { name: "Scania", desc: "Camiões e veículos pesados de classe mundial.", link: "/veiculos?marca=Scania", color: "from-accent to-primary" },
];

const values = [
  { icon: Target, title: "Missão", desc: "Oferecer soluções de mobilidade de excelência, com veículos de qualidade superior e serviço personalizado para o mercado angolano." },
  { icon: Eye, title: "Visão", desc: "Ser a referência na comercialização automóvel em Angola, reconhecidos pela confiança, inovação e compromisso com os nossos clientes." },
  { icon: Heart, title: "Valores", desc: "Integridade, excelência no atendimento, compromisso com a qualidade e responsabilidade social." },
];

export default function AboutPage() {
  return (
    <main className="pt-20 pb-16 min-h-screen">
      <SEOHead title="Sobre Nós — Angolauto" description="Conheça a Angolauto, representante oficial em Angola das marcas Suzuki, DFSK, Ineos Grenadier e Scania." />

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <p className="text-primary font-display text-sm tracking-[0.3em] mb-4">QUEM SOMOS</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              A SUA REFERÊNCIA <span className="text-gradient-gold">AUTOMÓVEL</span> EM ANGOLA
            </h1>
            <p className="text-muted-foreground leading-relaxed text-lg">
              A Angolauto é o representante oficial em Angola das marcas Suzuki, DFSK, Ineos Grenadier e Scania. 
              Com anos de experiência no mercado angolano, oferecemos veículos de qualidade, serviço de excelência 
              e soluções completas de mobilidade.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card rounded-lg p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-7 h-7 text-primary" />
                </div>
                <h2 className="font-display text-xl font-bold text-foreground mb-3">{v.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-primary font-display text-sm tracking-[0.3em] mb-2">PERCURSO</p>
            <h2 className="font-display text-3xl font-bold">A NOSSA <span className="text-gradient-gold">HISTÓRIA</span></h2>
          </motion.div>
          <div className="max-w-2xl mx-auto space-y-0">
            {timeline.map((t, i) => (
              <motion.div key={t.year} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-6 pb-8 relative">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display text-xs font-bold shrink-0">{t.year}</div>
                  {i < timeline.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
                </div>
                <div className="pt-1.5">
                  <h3 className="font-display text-lg font-semibold text-foreground">{t.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-primary font-display text-sm tracking-[0.3em] mb-2">PORTFÓLIO</p>
            <h2 className="font-display text-3xl font-bold">MARCAS <span className="text-gradient-gold">REPRESENTADAS</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brands.map((b, i) => (
              <motion.div key={b.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={b.link} className="block glass-card rounded-lg p-6 hover:border-primary/30 transition-all duration-500 group h-full">
                  <div className={`w-full h-2 rounded-full bg-gradient-to-r ${b.color} mb-4`} />
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{b.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{b.desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-primary group-hover:gap-2 transition-all">
                    Ver veículos <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-primary font-display text-sm tracking-[0.3em] mb-2">ONDE ESTAMOS</p>
            <h2 className="font-display text-3xl font-bold">LOCALIZAÇÃO E <span className="text-gradient-gold">CONTACTOS</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card rounded-lg overflow-hidden h-[350px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125529.0!2d13.2!3d-8.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f15cdc4e1b2d%3A0x850c1c5c5e9a4e43!2sLuanda%2C%20Angola!5e0!3m2!1sen!2s!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Localização Angolauto"
              />
            </div>
            <div className="glass-card rounded-lg p-8 flex flex-col justify-center">
              <h3 className="font-display text-xl font-bold text-foreground mb-6">CONTACTE-NOS</h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Morada</p>
                    <p className="text-sm text-muted-foreground">Luanda, Angola</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Telefone</p>
                    <p className="text-sm text-muted-foreground">+244 923 000 000</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">info@angolauto.co.ao</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-primary font-display text-sm tracking-[0.3em] mb-2">SIGA-NOS</p>
          <h2 className="font-display text-3xl font-bold mb-8">NAS <span className="text-gradient-gold">REDES SOCIAIS</span></h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://facebook.com/angolauto" target="_blank" rel="noopener noreferrer" className="glass-card rounded-lg px-6 py-4 hover:border-primary/30 transition-all flex items-center gap-3">
              <span className="text-primary font-display text-sm tracking-wider">Facebook Angolauto</span>
            </a>
            <a href="https://instagram.com/suzukiangola" target="_blank" rel="noopener noreferrer" className="glass-card rounded-lg px-6 py-4 hover:border-primary/30 transition-all flex items-center gap-3">
              <span className="text-primary font-display text-sm tracking-wider">Instagram Suzuki</span>
            </a>
            <a href="https://instagram.com/dfskangola" target="_blank" rel="noopener noreferrer" className="glass-card rounded-lg px-6 py-4 hover:border-primary/30 transition-all flex items-center gap-3">
              <span className="text-primary font-display text-sm tracking-wider">Instagram DFSK</span>
            </a>
            <a href="https://instagram.com/ineosangola" target="_blank" rel="noopener noreferrer" className="glass-card rounded-lg px-6 py-4 hover:border-primary/30 transition-all flex items-center gap-3">
              <span className="text-primary font-display text-sm tracking-wider">Instagram Ineos</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
