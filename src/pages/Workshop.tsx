import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Send, Wrench, Calendar } from "lucide-react";
import SEOHead from "@/components/SEOHead";

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
    <main className="pt-20 pb-16 min-h-screen">
      <SEOHead title="Oficina — Angolauto" description="Agende o serviço de oficina para o seu veículo. Manutenção, reparação e revisão com técnicos certificados." />

      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Wrench className="w-8 h-8 text-primary" />
          </div>
          <p className="text-primary font-display text-sm tracking-[0.3em] mb-2">SERVIÇOS</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            AGENDAMENTO DE <span className="text-gradient-gold">OFICINA</span>
          </h1>
          <p className="text-muted-foreground">
            Agende o serviço para o seu veículo. A nossa equipa de técnicos certificados está ao seu dispor.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-lg p-6 md:p-8">
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
              <Calendar className="w-4 h-4" /> {submitting ? "A enviar..." : "Agendar Serviço"}
            </Button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
