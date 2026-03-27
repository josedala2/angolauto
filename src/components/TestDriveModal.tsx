import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { CalendarDays, Clock, Send, X, ArrowRight, ArrowLeft, User } from "lucide-react";
import { cn } from "@/lib/utils";

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"
];

interface Props {
  open: boolean;
  onClose: () => void;
  vehicleId?: string;
  vehicleName?: string;
  vehicleBrand?: string;
}

export default function TestDriveModal({ open, onClose, vehicleId, vehicleName, vehicleBrand }: Props) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);

  // Pre-fill from auth profile
  useEffect(() => {
    if (user && open) {
      const fetchProfile = async () => {
        const { data } = await supabase
          .from("profiles")
          .select("full_name, phone")
          .eq("user_id", user.id)
          .maybeSingle();
        setForm((prev) => ({
          ...prev,
          name: data?.full_name || prev.name,
          email: user.email || prev.email,
          phone: data?.phone || prev.phone,
        }));
      };
      fetchProfile();
    }
  }, [user, open]);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setStep(1);
      setDate(undefined);
      setTime("");
      if (!user) setForm({ name: "", email: "", phone: "", notes: "" });
    }
  }, [open, user]);

  const inputClass = "w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all";

  const handleNext = () => {
    if (!form.name || !form.email) {
      toast.error("Preencha o nome e email.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      toast.error("Seleccione uma data para o test drive.");
      return;
    }
    if (!time) {
      toast.error("Seleccione um horário.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("test_drives").insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      vehicle_id: vehicleId || null,
      preferred_date: date.toISOString().split("T")[0],
      preferred_time: time,
      notes: form.notes || null,
      user_id: user?.id || null,
    });

    if (error) {
      toast.error("Erro ao agendar. Tente novamente.");
    } else {
      toast.success("Test drive agendado com sucesso! Entraremos em contacto para confirmar.");
      onClose();
    }
    setSubmitting(false);
  };

  const stepLabels = ["Dados Pessoais", "Data & Hora"];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card rounded-lg p-6 w-full max-w-2xl border border-border max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-display text-xl font-bold text-foreground">AGENDAR TEST DRIVE</h3>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            {vehicleBrand && vehicleName && (
              <p className="text-sm text-primary font-display mb-4">{vehicleBrand} {vehicleName}</p>
            )}

            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                {stepLabels.map((label, i) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                      step > i + 1 ? "bg-primary text-primary-foreground" :
                      step === i + 1 ? "bg-primary text-primary-foreground" :
                      "bg-secondary text-muted-foreground"
                    )}>
                      {i + 1}
                    </span>
                    <span className={cn("text-xs font-display tracking-wider", step === i + 1 ? "text-foreground" : "text-muted-foreground")}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <Progress value={step === 1 ? 50 : 100} className="h-1" />
            </div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-primary" />
                      <span className="text-xs font-display tracking-wider text-muted-foreground">DADOS PESSOAIS</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input required placeholder="Nome completo *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                      <input required type="email" placeholder="Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
                    </div>
                    <input placeholder="Telefone (opcional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
                    <textarea rows={2} placeholder="Observações (opcional)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={inputClass + " resize-none"} />
                    <div className="flex justify-end">
                      <Button type="button" onClick={handleNext} className="gap-2">
                        Seguinte <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <CalendarDays className="w-4 h-4 text-primary" />
                          <span className="text-xs font-display tracking-wider text-muted-foreground">DATA PREFERIDA</span>
                        </div>
                        <div className="flex justify-center">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(d) => d < new Date() || d.getDay() === 0}
                            className={cn("rounded-lg border border-border/50 pointer-events-auto")}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-xs font-display tracking-wider text-muted-foreground">HORÁRIO</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setTime(t)}
                              className={`px-3 py-2.5 rounded-sm text-sm font-medium border transition-all ${
                                time === t
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "bg-secondary/40 text-muted-foreground border-border/50 hover:border-primary/50 hover:text-foreground"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                        {date && (
                          <p className="text-xs text-muted-foreground mt-3">
                            Selecionado: <span className="text-foreground">{date.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long" })}</span>
                            {time && <> às <span className="text-foreground">{time}</span></>}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="gap-2">
                        <ArrowLeft className="w-4 h-4" /> Voltar
                      </Button>
                      <Button type="submit" disabled={submitting} className="gap-2 flex-1">
                        <Send className="w-4 h-4" /> {submitting ? "A agendar..." : "Confirmar Agendamento"}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
