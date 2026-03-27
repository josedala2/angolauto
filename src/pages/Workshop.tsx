import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Send, Wrench, Calendar, Search, Settings, ShieldCheck, Award, Clock } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/PageHero";
import scaniaShowcase from "@/assets/scania-showcase.jpg";

const premiumEasing = [0.22, 1, 0.36, 1] as const;

const services = [
  { icon: Wrench, title: "Manutenção", desc: "Manutenção preventiva e programada para o seu veículo." },
  { icon: Settings, title: "Reparação", desc: "Diagnóstico e reparação com peças originais." },
  { icon: Search, title: "Diagnóstico", desc: "Análise completa do estado do veículo." },
  { icon: Calendar, title: "Revisão", desc: "Revisões periódicas segundo padrões do fabricante." },
];

const advantages = [
  { icon: ShieldCheck, label: "Técnicos Certificados" },
  { icon: Award, label: "Peças Originais" },
  { icon: Clock, label: "Garantia de Serviço" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: premiumEasing } },
};

export default function WorkshopPage() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", phone: "", vehicle_info: "", service_type: "manutencao", preferred_date: "", description: "" });
  const [submitting, setSubmitting] = useState(false);

  const inputClass = "w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase.from("workshop_bookings").insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      vehicle_info: form.vehicle_info || null,
      service_type: form.service_type,
      preferred_date: form.preferred_date || null,
      description: form.description || null,
      user_id: user?.id || null,
    });

    if (error) {
      toast.error("Erro ao agendar serviço.");
    } else {
      toast.success("Agendamento enviado com sucesso! Entraremos em contacto para confirmar.");
      setForm({ name: "", email: "", phone: "", vehicle_info: "", service_type: "manutencao", preferred_date: "", description: "" });
    }
    setSubmitting(false);
  };

  return (
    <main className="pb-16 min-h-screen">
      <SEOHead title="Oficina — Angolauto" description="Agende o serviço de oficina para o seu veículo. Manutenção, reparação e revisão com técnicos certificados." />
      <PageHero image={scaniaShowcase} subtitle="SERVIÇOS" title="AGENDAMENTO DE" highlight="OFICINA" description="Agende o serviço para o seu veículo. A nossa equipa de técnicos certificados está ao seu dispor." />

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {services.map((s) => (
              <motion.div key={s.title} variants={cardVariant} className="glass-card rounded-lg p-6 text-center hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-sm font-semibold text-foreground mb-1">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Advantages strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: premiumEasing }}
            className="flex flex-wrap justify-center gap-6 mb-16"
          >
            {advantages.map((a) => (
              <div key={a.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <a.icon className="w-4 h-4 text-primary" />
                <span className="font-display tracking-wider text-xs">{a.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Form - 2 column layout */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: premiumEasing }}
              className="lg:col-span-2 flex flex-col justify-center"
            >
              <p className="text-primary font-display text-sm tracking-[0.3em] mb-2">AGENDE JÁ</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Marque o seu <span className="text-gradient-gold">serviço</span>
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Preencha o formulário e a nossa equipa entrará em contacto para confirmar o agendamento. Garantimos um serviço rápido e de qualidade.
              </p>
              <div className="space-y-4">
                {[
                  { n: "1", text: "Preencha os seus dados e seleccione o serviço" },
                  { n: "2", text: "Escolha a data preferida para o agendamento" },
                  { n: "3", text: "Receba confirmação da nossa equipa" },
                ].map((step) => (
                  <div key={step.n} className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">{step.n}</span>
                    <p className="text-sm text-muted-foreground pt-1">{step.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: premiumEasing, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="glass-card rounded-lg p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block font-display tracking-wider">NOME *</label>
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Nome completo" maxLength={100} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block font-display tracking-wider">EMAIL *</label>
                      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="seu@email.com" maxLength={255} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block font-display tracking-wider">TELEFONE</label>
                      <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="+244 9XX XXX XXX" maxLength={20} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block font-display tracking-wider">VEÍCULO</label>
                      <input value={form.vehicle_info} onChange={(e) => setForm({ ...form, vehicle_info: e.target.value })} className={inputClass} placeholder="Ex: Suzuki Vitara 2023" maxLength={100} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block font-display tracking-wider">TIPO DE SERVIÇO *</label>
                      <select required value={form.service_type} onChange={(e) => setForm({ ...form, service_type: e.target.value })} className={inputClass}>
                        <option value="manutencao">Manutenção</option>
                        <option value="reparacao">Reparação</option>
                        <option value="revisao">Revisão</option>
                        <option value="diagnostico">Diagnóstico</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block font-display tracking-wider">DATA PREFERIDA</label>
                      <input type="date" value={form.preferred_date} onChange={(e) => setForm({ ...form, preferred_date: e.target.value })} className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block font-display tracking-wider">DESCRIÇÃO DO PROBLEMA / SERVIÇO</label>
                    <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputClass + " resize-none"} placeholder="Descreva o serviço necessário..." maxLength={1000} />
                  </div>
                  <Button type="submit" disabled={submitting} className="w-full gap-2">
                    <Send className="w-4 h-4" /> {submitting ? "A enviar..." : "Agendar Serviço"}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
