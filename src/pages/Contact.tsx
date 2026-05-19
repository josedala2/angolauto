import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSegment } from "@/context/SegmentContext";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/PageHero";
import dfskShowcase from "@/assets/dfsk-showcase.jpg";

const premiumEasing = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: premiumEasing } },
};

export default function ContactPage() {
  const { user } = useAuth();
  const { isEmpresa, setSegment } = useSegment();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", vehicle_id: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("segmento") === "empresas") setSegment("empresas");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    supabase.from("vehicles").select("id, name, brand").eq("active", true).order("brand").then(({ data }) => {
      setVehicles(data || []);
    });
  }, []);

  useEffect(() => {
    if (window.location.hash === "#localizacao") {
      setTimeout(() => {
        document.getElementById("localizacao")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("proposals").insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      vehicle_id: form.vehicle_id || null,
      message: form.message || null,
      user_id: user?.id || null,
    });

    if (error) {
      toast.error("Erro ao enviar. Tente novamente.");
    } else {
      toast.success("Mensagem enviada com sucesso! Entraremos em contacto em breve.");
      setForm({ name: "", email: "", phone: "", vehicle_id: "", message: "" });
    }
    setLoading(false);
  };

  const inputClass =
    "w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all";

  const contactItems = [
    { icon: MapPin, label: "Morada", value: "Luanda, Angola", href: undefined },
    { icon: Phone, label: "Telefone", value: "+244 923 000 000", href: "tel:+244923000000" },
    { icon: Mail, label: "Email", value: "info@angolauto.co.ao", href: "mailto:info@angolauto.co.ao" },
    { icon: Clock, label: "Horário", value: "Seg-Sex: 08h-17h\nSáb: 08h-13h", href: undefined },
  ];

  return (
    <main className="pb-16 min-h-screen">
      <SEOHead title="Contacto — Angolauto" description="Entre em contacto com a Angolauto. Solicite uma proposta, agende um test drive ou visite o nosso stand em Luanda." />
      <PageHero image={dfskShowcase} subtitle="FALE CONNOSCO" title="" highlight="CONTACTO" description="Estamos à sua disposição para qualquer questão ou proposta." />
      <div className="container mx-auto px-4 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: premiumEasing }} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card rounded-lg p-6 space-y-5">
              <SegmentPanel value="empresas">
                <div className="flex items-center gap-2 text-[10px] font-display tracking-[0.2em] uppercase text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5 w-fit">
                  <Briefcase className="w-3 h-3" /> Atendimento Empresas
                </div>
              </SegmentPanel>
              <SegmentPanel value="particulares" keepMounted>
                <h2 className="font-display text-lg font-semibold text-foreground mb-2">Solicitar Proposta / Test Drive</h2>
              </SegmentPanel>
              <SegmentPanel value="empresas" keepMounted>
                <h2 className="font-display text-lg font-semibold text-foreground mb-2">Solicitar Proposta para Frota</h2>
              </SegmentPanel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input required placeholder="Nome completo" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input placeholder="Telefone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
                <select value={form.vehicle_id} onChange={(e) => setForm({ ...form, vehicle_id: e.target.value })} className={inputClass}>
                  <option value="">Seleccionar veículo (opcional)</option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>{v.brand} {v.name}</option>
                  ))}
                </select>
              </div>
              <textarea rows={4} placeholder="Mensagem..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass + " resize-none"} />
              <Button type="submit" disabled={loading} className="gap-2 w-full sm:w-auto">
                <Send className="w-4 h-4" /> {loading ? "A enviar..." : "Enviar Mensagem"}
              </Button>
            </form>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-2 space-y-4"
          >
            {contactItems.map((ci) => {
              const Wrapper = ci.href ? "a" : "div";
              const wrapperProps = ci.href ? { href: ci.href, target: ci.href.startsWith("mailto") ? undefined : undefined } : {};
              return (
                <motion.div key={ci.label} variants={cardVariant}>
                  <Wrapper
                    {...wrapperProps}
                    className={`glass-card rounded-lg p-5 flex items-start gap-4 transition-all duration-300 ${ci.href ? "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 cursor-pointer" : ""}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <ci.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-display tracking-wider mb-1">{ci.label}</p>
                      <p className="text-sm text-foreground whitespace-pre-line">{ci.value}</p>
                    </div>
                  </Wrapper>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Map */}
        <motion.section
          id="localizacao"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: premiumEasing }}
          className="mt-16 scroll-mt-24"
        >
          <h2 className="font-display text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" /> Onde Estamos
          </h2>
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
        </motion.section>
      </div>
    </main>
  );
}
