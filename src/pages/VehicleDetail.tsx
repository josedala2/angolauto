import { useState, useEffect, useCallback } from "react";
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
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft, ArrowRight, Fuel, Gauge, Settings2, Calendar, Zap, Shield,
  ChevronLeft, ChevronRight, Send, Car, Phone, X, Maximize2, Download
} from "lucide-react";
import ShareButtons from "@/components/ShareButtons";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => setShowStickyCTA(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard nav for lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!lightboxOpen) return;
    if (e.key === "Escape") setLightboxOpen(false);
    if (e.key === "ArrowRight") setGalleryIndex((i) => (i + 1) % (vehicle ? getVehicleGallery(vehicle.name, vehicle.brand).length : 1));
    if (e.key === "ArrowLeft") setGalleryIndex((i) => (i === 0 ? (vehicle ? getVehicleGallery(vehicle.name, vehicle.brand).length - 1 : 0) : i - 1));
  }, [lightboxOpen, vehicle]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

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
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground text-sm">A carregar veículo...</p>
        </div>
      </div>
    );
  }

  const gallery = getVehicleGallery(vehicle.name, vehicle.brand);
  const inputClass = "w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all";

  const specs = [
    { icon: Gauge, label: "Potência", value: vehicle.power, highlight: true },
    { icon: Settings2, label: "Transmissão", value: vehicle.transmission },
    { icon: Fuel, label: "Combustível", value: vehicle.fuel_type },
    { icon: Zap, label: "Motor", value: vehicle.engine },
    { icon: Calendar, label: "Ano", value: vehicle.year?.toString() },
    { icon: Car, label: "Categoria", value: vehicle.category },
  ].filter((s) => s.value);

  const prevImage = () => setGalleryIndex((i) => (i === 0 ? gallery.length - 1 : i - 1));
  const nextImage = () => setGalleryIndex((i) => (i === gallery.length - 1 ? 0 : i + 1));

  const faqs = [
    {
      q: "Qual é o prazo de garantia?",
      a: `O ${vehicle.brand} ${vehicle.name} inclui garantia oficial de fábrica. O prazo e condições específicas podem variar — entre em contacto connosco para detalhes completos sobre a cobertura.`,
    },
    {
      q: "Posso fazer um test drive antes de comprar?",
      a: "Sim! Pode agendar um test drive directamente nesta página clicando em \"Agendar Test Drive\". Escolha a data e hora mais convenientes e a nossa equipa irá preparar o veículo para si.",
    },
    {
      q: "Quais são as opções de financiamento disponíveis?",
      a: "Oferecemos diversas soluções de financiamento adaptadas ao seu perfil. Utilize o simulador de financiamento nesta página para ter uma estimativa, ou solicite uma proposta personalizada.",
    },
    {
      q: "A manutenção é feita na vossa oficina?",
      a: "Sim, dispomos de oficina própria com técnicos certificados e peças originais. Todos os serviços de manutenção preventiva e correctiva podem ser realizados nas nossas instalações.",
    },
    {
      q: "O veículo está disponível para entrega imediata?",
      a: "A disponibilidade varia conforme o modelo e configuração pretendida. Contacte-nos para confirmar o stock actual e prazos de entrega estimados.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <main className="pt-16 min-h-screen">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      {/* Hero Gallery - Immersive */}
      <section className="relative h-[55vh] md:h-[70vh] overflow-hidden group cursor-pointer" onClick={() => setLightboxOpen(true)}>
        <AnimatePresence mode="wait">
          <motion.img
            key={galleryIndex}
            src={gallery[galleryIndex]}
            alt={`${vehicle.brand} ${vehicle.name}`}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
        </AnimatePresence>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />

        {/* Fullscreen hint */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-background/60 backdrop-blur-md rounded-full p-4">
            <Maximize2 className="w-6 h-6 text-foreground" />
          </div>
        </div>

        {/* Gallery nav arrows */}
        {gallery.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/40 backdrop-blur-sm flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background/60"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/40 backdrop-blur-sm flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background/60"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image counter */}
        {gallery.length > 1 && (
          <div className="absolute bottom-6 right-6 bg-background/50 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs text-foreground font-display tracking-wider">
            {galleryIndex + 1} / {gallery.length}
          </div>
        )}

        {/* Thumbnail strip at bottom */}
        {gallery.length > 1 && (
          <div className="absolute bottom-6 left-6 flex gap-2">
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setGalleryIndex(i); }}
                className={`w-16 h-10 md:w-20 md:h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  i === galleryIndex
                    ? "border-primary shadow-lg shadow-primary/20 scale-105"
                    : "border-transparent opacity-50 hover:opacity-90"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}

        {/* Breadcrumbs */}
        <div
          className="absolute top-20 left-6 z-20 bg-black/30 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <Breadcrumbs
            variant="overlay"
            items={[
              { label: "Veículos", to: "/veiculos" },
              { label: vehicle.brand, to: `/veiculos?marca=${vehicle.brand}` },
              { label: vehicle.name },
            ]}
          />
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-4">
          {/* Main info */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="text-primary font-display text-sm tracking-[0.3em] uppercase">{vehicle.brand}</span>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mt-1 mb-3">
                {vehicle.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="text-xs bg-secondary/60 text-secondary-foreground px-3 py-1.5 rounded-full border border-border/50">
                  {vehicle.category}
                </span>
                <span className="text-xs bg-secondary/60 text-secondary-foreground px-3 py-1.5 rounded-full border border-border/50">
                  {vehicle.year}
                </span>
                {vehicle.featured && (
                  <span className="text-xs bg-primary/20 text-primary px-3 py-1.5 rounded-full font-medium">
                    ★ Destaque
                  </span>
                )}
              </div>

              {vehicle.description && (
                <p className="text-muted-foreground leading-relaxed text-base mb-10 max-w-2xl">
                  {vehicle.description}
                </p>
              )}

              {/* Specs Grid - Premium */}
              <div className="mb-12">
                <h2 className="font-display text-lg font-semibold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-primary rounded-full" />
                  ESPECIFICAÇÕES TÉCNICAS
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {specs.map((spec, index) => (
                    <motion.div
                      key={spec.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.4 }}
                      className={`relative rounded-xl p-5 border transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 group/spec ${
                        spec.highlight
                          ? "bg-primary/5 border-primary/20"
                          : "bg-secondary/30 border-border/50"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                          spec.highlight ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground group-hover/spec:text-primary"
                        }`}>
                          <spec.icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs text-muted-foreground font-display tracking-wider uppercase">
                          {spec.label}
                        </span>
                      </div>
                      <p className="text-base font-semibold text-foreground">{spec.value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Vehicle highlights */}
              <div className="mb-12">
                <h2 className="font-display text-lg font-semibold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-primary rounded-full" />
                  DESTAQUES
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: Shield, title: "Garantia de Fábrica", desc: "Cobertura oficial com assistência técnica certificada" },
                    { icon: Settings2, title: "Peças Originais", desc: "Disponibilidade de peças originais e acessórios" },
                    { icon: Car, title: "Test Drive", desc: "Experimente este modelo antes de decidir" },
                    { icon: Zap, title: "Financiamento", desc: "Condições especiais de financiamento disponíveis" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-secondary/20 border border-border/30 hover:border-primary/20 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              {/* FAQ */}
              <div className="mb-12">
                <h2 className="font-display text-lg font-semibold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-primary rounded-full" />
                  PERGUNTAS FREQUENTES
                </h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {faqs.map((faq, i) => (
                    <AccordionItem
                      key={i}
                      value={`faq-${i}`}
                      className="rounded-xl border border-border/50 bg-secondary/20 px-5 data-[state=open]:bg-secondary/40 transition-colors"
                    >
                      <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - CTA + Price */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-xl p-6 sticky top-24 border border-border/50"
            >
              <div className="mb-6">
                <p className="text-xs text-muted-foreground font-display tracking-wider mb-1">PREÇO DESDE</p>
                <p className="font-display text-3xl font-bold text-gradient-gold">{vehicle.price}</p>
              </div>

              <div className="space-y-3">
                <Button variant="hero" className="w-full text-base py-6" onClick={() => setShowProposal(true)}>
                  Solicitar Proposta
                </Button>
                <Button variant="heroOutline" className="w-full" onClick={() => setShowTestDrive(true)}>
                  Agendar Test Drive
                </Button>
              </div>

              <FinancingSimulator vehiclePrice={vehicle.price || ""} vehicleName={vehicle.name} />

              <div className="mt-6 pt-6 border-t border-border/30 space-y-3">
                {[
                  "Garantia oficial de fábrica",
                  "Assistência técnica certificada",
                  "Peças originais disponíveis",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <Shield className="w-4 h-4 text-primary shrink-0" />
                    {text}
                  </div>
                ))}
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
          <section className="mt-20 pb-20">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-primary rounded-full" />
              OUTROS MODELOS <span className="text-gradient-gold">{vehicle.brand}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedVehicles.map((rv, i) => (
                <motion.div
                  key={rv.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link to={`/veiculo/${rv.id}`} className="group block">
                    <div className="glass-card rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={getVehicleImage(rv.name, rv.brand)}
                          alt={`${rv.brand} ${rv.name}`}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-5">
                        <span className="text-xs text-primary font-display tracking-[0.2em]">{rv.brand}</span>
                        <h3 className="font-display text-lg font-semibold text-foreground mt-0.5">{rv.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{rv.power} · {rv.fuel_type}</p>
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors mt-3">
                          Ver detalhes <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 text-white/60 text-sm font-display tracking-wider z-10">
              {galleryIndex + 1} / {gallery.length}
            </div>

            {/* Vehicle name */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-display tracking-wider z-10">
              {vehicle.brand} {vehicle.name}
            </div>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={galleryIndex}
                src={gallery[galleryIndex]}
                alt={`${vehicle.brand} ${vehicle.name}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              />
            </AnimatePresence>

            {/* Nav arrows */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}

            {/* Thumbnail strip */}
            {gallery.length > 1 && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setGalleryIndex(i); }}
                    className={`w-16 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                      i === galleryIndex ? "border-white scale-110" : "border-transparent opacity-40 hover:opacity-80"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

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
              className="glass-card rounded-xl p-6 w-full max-w-lg border border-border"
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

      {/* Sticky CTA bar */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-t border-border/50 shadow-2xl"
          >
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 rounded overflow-hidden hidden sm:block">
                  <img src={gallery[0]} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-foreground">{vehicle.brand} {vehicle.name}</p>
                  <p className="text-xs text-primary font-display">{vehicle.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button size="sm" onClick={() => setShowProposal(true)}>
                  Solicitar Proposta
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowTestDrive(true)} className="hidden sm:inline-flex">
                  Test Drive
                </Button>
                <a href="https://wa.me/244923000000" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="ghost" className="gap-1.5">
                    <Phone className="w-3.5 h-3.5" /> <span className="hidden md:inline">WhatsApp</span>
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
