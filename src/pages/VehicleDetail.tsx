import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import FinancingSimulator from "@/components/FinancingSimulator";
import TestDriveModal from "@/components/TestDriveModal";
import { useAuth } from "@/hooks/useAuth";
import { getVehicleImage, getVehicleGallery } from "@/data/vehicleImages";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  ArrowLeft, ArrowRight, Fuel, Gauge, Settings2, Calendar, Zap, Shield,
  ChevronLeft, ChevronRight, Send, Car, Phone
} from "lucide-react";
import ShareButtons from "@/components/ShareButtons";
import Breadcrumbs from "@/components/Breadcrumbs";
export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showProposal, setShowProposal] = useState(false);
  const [showTestDrive, setShowTestDrive] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [relatedVehicles, setRelatedVehicles] = useState<any[]>([]);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const fetchVehicle = async () => {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("id", id)
        .eq("active", true)
        .maybeSingle();

      if (error || !data) {
        navigate("/veiculos");
        return;
      }
      setVehicle(data);

      // Fetch related vehicles (same brand, exclude current)
      const { data: related } = await supabase
        .from("vehicles")
        .select("*")
        .eq("brand", data.brand)
        .eq("active", true)
        .neq("id", data.id)
        .limit(3);
      setRelatedVehicles(related || []);
      setLoading(false);
    };
    fetchVehicle();
    setGalleryIndex(0);
    setShowStickyCTA(false);
    window.scrollTo(0, 0);
  }, [id, navigate]);

  // Show sticky CTA when scrolling past the sidebar
  useEffect(() => {
    const handleScroll = () => setShowStickyCTA(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmitProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from("proposals").insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      vehicle_id: vehicle.id,
      message: form.message || null,
      user_id: user?.id || null,
    });
    if (error) {
      toast.error("Erro ao enviar proposta.");
    } else {
      toast.success("Proposta enviada com sucesso!");
      setShowProposal(false);
      setForm({ name: "", email: "", phone: "", message: "" });
    }
    setSubmitting(false);
  };

  if (loading || !vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="text-muted-foreground">A carregar...</p>
      </div>
    );
  }

  const gallery = getVehicleGallery(vehicle.name, vehicle.brand);
  const inputClass = "w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all";

  const specs = [
    { icon: Gauge, label: "Potência", value: vehicle.power },
    { icon: Settings2, label: "Transmissão", value: vehicle.transmission },
    { icon: Fuel, label: "Combustível", value: vehicle.fuel_type },
    { icon: Zap, label: "Motor", value: vehicle.engine },
    { icon: Calendar, label: "Ano", value: vehicle.year?.toString() },
    { icon: Car, label: "Categoria", value: vehicle.category },
  ].filter((s) => s.value);

  return (
    <main className="pt-16 min-h-screen">
      {/* Hero Gallery */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={galleryIndex}
            src={gallery[galleryIndex]}
            alt={`${vehicle.brand} ${vehicle.name}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
            width={1280}
            height={720}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />

        {/* Gallery nav */}
        {gallery.length > 1 && (
          <div className="absolute bottom-6 right-6 flex gap-2">
            <button
              onClick={() => setGalleryIndex((i) => (i === 0 ? gallery.length - 1 : i - 1))}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-foreground hover:text-primary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setGalleryIndex((i) => (i === gallery.length - 1 ? 0 : i + 1))}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-foreground hover:text-primary transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Gallery dots */}
        {gallery.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {gallery.map((_, i) => (
              <button
                key={i}
                onClick={() => setGalleryIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === galleryIndex ? "bg-primary w-6" : "bg-foreground/30"}`}
              />
            ))}
          </div>
        )}

        {/* Back button */}
        <div className="absolute top-6 left-6">
          <Link to="/veiculos" className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground glass-card rounded-full px-4 py-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </Link>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main info */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-primary font-display text-sm tracking-[0.3em]">{vehicle.brand}</span>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mt-1 mb-2">
                {vehicle.name}
              </h1>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs bg-secondary/60 text-secondary-foreground px-3 py-1 rounded-full border border-border/50">
                  {vehicle.category}
                </span>
                <span className="text-xs bg-secondary/60 text-secondary-foreground px-3 py-1 rounded-full border border-border/50">
                  {vehicle.year}
                </span>
                {vehicle.featured && (
                  <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">
                    Destaque
                  </span>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                {vehicle.description}
              </p>

              {/* Specs Grid */}
              <h2 className="font-display text-lg font-semibold text-foreground mb-4 line-accent">
                ESPECIFICAÇÕES
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                {specs.map((spec) => (
                  <div key={spec.label} className="glass-card rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <spec.icon className="w-4 h-4 text-primary" />
                      <span className="text-[10px] text-muted-foreground font-display tracking-wider uppercase">
                        {spec.label}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Thumbnail gallery */}
              {gallery.length > 1 && (
                <>
                  <h2 className="font-display text-lg font-semibold text-foreground mb-4 line-accent">
                    GALERIA
                  </h2>
                  <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
                    {gallery.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => { setGalleryIndex(i); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className={`shrink-0 w-32 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          i === galleryIndex ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* Sidebar - CTA + Price */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-lg p-6 sticky top-24"
            >
              <div className="mb-6">
                <p className="text-xs text-muted-foreground font-display tracking-wider mb-1">PREÇO</p>
                <p className="font-display text-2xl font-bold text-gradient-gold">{vehicle.price}</p>
              </div>

              <div className="space-y-3">
                <Button
                  variant="hero"
                  className="w-full"
                  onClick={() => setShowProposal(true)}
                >
                  Solicitar Proposta
                </Button>
                <Link to="/contacto" className="block">
                  <Button variant="heroOutline" className="w-full" onClick={(e) => { e.preventDefault(); setShowTestDrive(true); }}>
                    Agendar Test Drive
                  </Button>
                </Link>
              </div>

              <FinancingSimulator vehiclePrice={vehicle.price || ""} vehicleName={vehicle.name} />

              <div className="mt-6 pt-6 border-t border-border/30 space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4 text-primary" />
                  Garantia oficial de fábrica
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4 text-primary" />
                  Assistência técnica certificada
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4 text-primary" />
                  Peças originais disponíveis
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border/30">
                <p className="text-xs text-muted-foreground mb-3 font-display tracking-wider">PARTILHAR</p>
                <ShareButtons title={`${vehicle.brand} ${vehicle.name}`} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related vehicles */}
        {relatedVehicles.length > 0 && (
          <section className="mt-16 pb-16">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              OUTROS MODELOS <span className="text-gradient-gold">{vehicle.brand}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedVehicles.map((rv) => (
                <Link key={rv.id} to={`/veiculo/${rv.id}`} className="group">
                  <div className="glass-card rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-500">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={getVehicleImage(rv.name, rv.brand)}
                        alt={`${rv.brand} ${rv.name}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] text-primary font-display tracking-[0.2em]">{rv.brand}</span>
                      <h3 className="font-display text-lg font-semibold text-foreground">{rv.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{rv.power} · {rv.fuel_type}</p>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors mt-3">
                        Ver detalhes <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Proposal Modal */}
      <AnimatePresence>
        {showProposal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowProposal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-lg p-6 w-full max-w-lg border border-border"
            >
              <h3 className="font-display text-xl font-bold text-foreground mb-1">SOLICITAR PROPOSTA</h3>
              <p className="text-sm text-primary font-display mb-4">{vehicle.brand} {vehicle.name}</p>

              <form onSubmit={handleSubmitProposal} className="space-y-4">
                <input required placeholder="Nome completo" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
                <input placeholder="Telefone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
                <textarea rows={3} placeholder="Mensagem ou dúvidas..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass + " resize-none"} />
                <div className="flex gap-3">
                  <Button type="submit" disabled={submitting} className="gap-2 flex-1">
                    <Send className="w-4 h-4" /> {submitting ? "A enviar..." : "Enviar Proposta"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowProposal(false)}>Cancelar</Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <TestDriveModal
        open={showTestDrive}
        onClose={() => setShowTestDrive(false)}
        vehicleId={vehicle.id}
        vehicleName={vehicle.name}
        vehicleBrand={vehicle.brand}
      />
    </main>
  );
}
