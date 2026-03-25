import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { vehicles } from "@/data/vehicles";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", vehicle: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensagem enviada com sucesso! Entraremos em contacto em breve.");
    setForm({ name: "", email: "", phone: "", vehicle: "", message: "" });
  };

  const inputClass =
    "w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all";

  return (
    <main className="pt-20 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <p className="text-primary font-display text-sm tracking-[0.3em] mb-2">FALE CONNOSCO</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            <span className="text-gradient-gold">CONTACTO</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-lg p-6 space-y-5">
              <h2 className="font-display text-lg font-semibold text-foreground mb-2">Solicitar Proposta / Test Drive</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  required
                  placeholder="Nome completo"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  placeholder="Telefone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                />
                <select
                  value={form.vehicle}
                  onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Seleccionar veículo (opcional)</option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.brand} {v.name}
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                rows={4}
                placeholder="Mensagem..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={inputClass + " resize-none"}
              />

              <Button type="submit" className="gap-2 w-full sm:w-auto">
                <Send className="w-4 h-4" /> Enviar Mensagem
              </Button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {[
              { icon: MapPin, label: "Morada", value: "Luanda, Angola" },
              { icon: Phone, label: "Telefone", value: "+244 923 000 000" },
              { icon: Mail, label: "Email", value: "info@angolauto.co.ao" },
              { icon: Clock, label: "Horário", value: "Seg-Sex: 08h-17h\nSáb: 08h-13h" },
            ].map((item) => (
              <div key={item.label} className="glass-card rounded-lg p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-display tracking-wider mb-1">{item.label}</p>
                  <p className="text-sm text-foreground whitespace-pre-line">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
