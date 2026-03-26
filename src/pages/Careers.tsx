import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Send, Upload, Briefcase } from "lucide-react";
import SEOHead from "@/components/SEOHead";

export default function CareersPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", area: "", message: "" });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const inputClass = "w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    let cv_url: string | null = null;

    if (cvFile) {
      const ext = cvFile.name.split(".").pop();
      const path = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("cvs").upload(path, cvFile);
      if (uploadError) {
        toast.error("Erro ao carregar o CV.");
        setSubmitting(false);
        return;
      }
      const { data: urlData } = supabase.storage.from("cvs").getPublicUrl(path);
      cv_url = urlData.publicUrl;
    }

    const { error } = await supabase.from("job_applications").insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      area: form.area || null,
      message: form.message || null,
      cv_url,
    });

    if (error) {
      toast.error("Erro ao enviar candidatura.");
    } else {
      toast.success("Candidatura enviada com sucesso! Entraremos em contacto.");
      setForm({ name: "", email: "", phone: "", area: "", message: "" });
      setCvFile(null);
    }
    setSubmitting(false);
  };

  return (
    <main className="pt-20 pb-16 min-h-screen">
      <SEOHead title="Carreiras — Angolauto" description="Junte-se à equipa Angolauto. Envie a sua candidatura espontânea." />

      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-primary" />
          </div>
          <p className="text-primary font-display text-sm tracking-[0.3em] mb-2">CARREIRAS</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            JUNTE-SE À <span className="text-gradient-gold">NOSSA EQUIPA</span>
          </h1>
          <p className="text-muted-foreground">
            Envie a sua candidatura espontânea. Estamos sempre à procura de talentos para reforçar a nossa equipa.
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
                <label className="text-xs text-muted-foreground mb-1 block font-display tracking-wider">ÁREA DE INTERESSE</label>
                <select value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className={inputClass}>
                  <option value="">Seleccione...</option>
                  <option value="comercial">Comercial / Vendas</option>
                  <option value="oficina">Oficina / Mecânica</option>
                  <option value="administrativo">Administrativo</option>
                  <option value="marketing">Marketing</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block font-display tracking-wider">MENSAGEM</label>
              <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass + " resize-none"} placeholder="Fale-nos sobre si e a sua experiência..." maxLength={1000} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block font-display tracking-wider">CURRICULUM VITAE</label>
              <label className="flex items-center gap-3 cursor-pointer glass-card rounded-sm px-4 py-3 hover:border-primary/30 transition-all">
                <Upload className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">{cvFile ? cvFile.name : "Clique para carregar o seu CV (PDF, DOC)"}</span>
                <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => setCvFile(e.target.files?.[0] || null)} />
              </label>
            </div>
            <Button type="submit" disabled={submitting} className="w-full gap-2">
              <Send className="w-4 h-4" /> {submitting ? "A enviar..." : "Enviar Candidatura"}
            </Button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
