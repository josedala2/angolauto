import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, ArrowRight, Send, Clock, Wrench, Car, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import logoDefault from "@/assets/logo.svg";
import logoWhite from "@/assets/logo-white.svg";

export default function Footer() {
  const [isDark, setIsDark] = useState(!document.documentElement.classList.contains("light"));
  const [email, setEmail] = useState("");

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(!document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Subscrito com sucesso! Receberá as últimas novidades.");
    setEmail("");
  };

  const logo = isDark ? logoWhite : logoDefault;

  return (
    <footer className="mt-auto">
      {/* Newsletter bar */}
      <div className="bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-foreground/20 rounded-full blur-3xl -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground tracking-wide">
                Receba as Últimas Novidades
              </h3>
              <p className="text-primary-foreground/70 text-sm mt-2 max-w-md">
                Novos modelos, promoções exclusivas e eventos — directamente no seu email.
              </p>
            </div>
            <form onSubmit={handleNewsletter} className="flex w-full lg:w-auto gap-2">
              <input
                type="email"
                placeholder="O seu email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 lg:w-80 bg-primary-foreground/10 border border-primary-foreground/20 rounded-sm px-5 py-3.5 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 transition-all"
              />
              <Button type="submit" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2 shrink-0 px-6">
                <Send className="w-4 h-4" /> Subscrever
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Quick info strip */}
      <div className="bg-card border-t border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border/30">
            {[
              { icon: Car, title: "Vendas", desc: "Veículos novos e usados" },
              { icon: Wrench, title: "Oficina", desc: "Manutenção e reparação" },
              { icon: Shield, title: "Garantia", desc: "Cobertura completa" },
              { icon: Clock, title: "Horário", desc: "Seg–Sex: 08h–17h" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 py-4 px-4 lg:px-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-card">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Brand column */}
            <div className="lg:col-span-4">
              <img src={logo} alt="Angolauto" className="h-10 mb-5" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
                Representante oficial em Angola das marcas Suzuki, DFSK, Ineos Grenadier e Scania. Mais de 20 anos ao serviço do mercado angolano.
              </p>
              <div className="flex items-center gap-3 mb-6">
                {[
                  { href: "https://facebook.com/angolauto", label: "Facebook", icon: Facebook },
                  { href: "https://instagram.com/suzukiangola", label: "Instagram Suzuki", icon: Instagram },
                  { href: "https://instagram.com/dfskangola", label: "Instagram DFSK", icon: Instagram },
                  { href: "https://instagram.com/ineosangola", label: "Instagram Ineos", icon: Instagram },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="lg:col-span-2">
              <h4 className="font-display text-sm font-semibold text-foreground mb-5 tracking-wider">MARCAS</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { to: "/marcas/suzuki", label: "Suzuki" },
                  { to: "/marcas/dfsk", label: "DFSK" },
                  { to: "/marcas/ineos", label: "Ineos Grenadier" },
                  { to: "/marcas/scania", label: "Scania" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5 group">
                      <ChevronRight className="w-3 h-3 text-primary/40 group-hover:text-primary transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Platform */}
            <div className="lg:col-span-2">
              <h4 className="font-display text-sm font-semibold text-foreground mb-5 tracking-wider">PLATAFORMA</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { to: "/sobre", label: "Sobre Nós" },
                  { to: "/veiculos", label: "Veículos Novos" },
                  { to: "/veiculos-usados", label: "Veículos Usados" },
                  { to: "/noticias", label: "Notícias" },
                  { to: "/oficina", label: "Oficina" },
                  { to: "/carreiras", label: "Carreiras" },
                  { to: "/contacto", label: "Contacto" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5 group">
                      <ChevronRight className="w-3 h-3 text-primary/40 group-hover:text-primary transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-4">
              <h4 className="font-display text-sm font-semibold text-foreground mb-5 tracking-wider">CONTACTO</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-xs uppercase tracking-wider mb-1">Morada</p>
                    <span>Rua Major Kanhangulo, Luanda, Angola</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-xs uppercase tracking-wider mb-1">Telefone</p>
                    <a href="tel:+244923000000" className="hover:text-primary transition-colors">+244 923 000 000</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-xs uppercase tracking-wider mb-1">Email</p>
                    <a href="mailto:info@angolauto.co.ao" className="hover:text-primary transition-colors">info@angolauto.co.ao</a>
                  </div>
                </li>
              </ul>

              <div className="mt-6">
                <Link to="/contacto" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
                  Fale connosco <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/30">
          <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Angolauto. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link to="/sobre" className="hover:text-primary transition-colors">Termos & Condições</Link>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              <Link to="/contacto" className="hover:text-primary transition-colors">Política de Privacidade</Link>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              <span>Representante oficial Suzuki · DFSK · Ineos · Scania</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
