import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, ArrowRight, Send } from "lucide-react";
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
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground">
                Receba as Últimas Novidades
              </h3>
              <p className="text-primary-foreground/70 text-sm mt-1">
                Novos modelos, promoções exclusivas e eventos — directamente no seu email.
              </p>
            </div>
            <form onSubmit={handleNewsletter} className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="O seu email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 md:w-72 bg-primary-foreground/10 border border-primary-foreground/20 rounded-sm px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary-foreground/50"
              />
              <Button type="submit" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2 shrink-0">
                <Send className="w-4 h-4" /> Subscrever
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-card border-t border-border/50">
        <div className="container mx-auto px-4 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <img src={logo} alt="Angolauto" className="h-10 mb-5" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
                Representante oficial em Angola das marcas Suzuki, DFSK, Ineos Grenadier e Scania. Mais de 20 anos ao serviço do mercado angolano.
              </p>
              <div className="flex items-center gap-3">
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
                    className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-display text-sm font-semibold text-foreground mb-5 tracking-wider">MARCAS</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { to: "/marcas/suzuki", label: "Suzuki" },
                  { to: "/marcas/dfsk", label: "DFSK" },
                  { to: "/marcas/ineos", label: "Ineos Grenadier" },
                  { to: "/marcas/scania", label: "Scania" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-muted-foreground hover:text-primary transition-colors relative group inline-flex items-center gap-1">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm font-semibold text-foreground mb-5 tracking-wider">PLATAFORMA</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { to: "/sobre", label: "Sobre Nós" },
                  { to: "/veiculos", label: "Veículos" },
                  { to: "/noticias", label: "Notícias" },
                  { to: "/oficina", label: "Oficina" },
                  { to: "/carreiras", label: "Carreiras" },
                  { to: "/contacto", label: "Contacto" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-muted-foreground hover:text-primary transition-colors relative group inline-flex items-center gap-1">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm font-semibold text-foreground mb-5 tracking-wider">CONTACTO</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>Luanda, Angola</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <a href="tel:+244923000000" className="hover:text-primary transition-colors">+244 923 000 000</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <a href="mailto:info@angolauto.co.ao" className="hover:text-primary transition-colors">info@angolauto.co.ao</a>
                </li>
              </ul>

              <div className="mt-6">
                <Link to="/contacto" className="inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all">
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
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <span>Representante oficial Suzuki · DFSK · Ineos · Scania</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
