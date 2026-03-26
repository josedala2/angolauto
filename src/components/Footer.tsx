import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import logoDefault from "@/assets/logo.svg";
import logoWhite from "@/assets/logo-white.svg";

export default function Footer() {
  const [isDark, setIsDark] = useState(!document.documentElement.classList.contains("light"));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(!document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const logo = isDark ? logoWhite : logoDefault;

  return (
    <footer className="bg-card border-t border-border/50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <img src={logo} alt="Angolauto" className="h-10 mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Representante oficial em Angola das marcas Suzuki, DFSK, Ineos Grenadier e Scania.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://facebook.com/angolauto" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/suzukiangola" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram Suzuki">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/dfskangola" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram DFSK">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/ineosangola" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram Ineos">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4 tracking-wider">MARCAS</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/veiculos?marca=Suzuki" className="hover:text-primary transition-colors">Suzuki</Link></li>
              <li><Link to="/veiculos?marca=DFSK" className="hover:text-primary transition-colors">DFSK</Link></li>
              <li><Link to="/veiculos?marca=Ineos" className="hover:text-primary transition-colors">Ineos Grenadier</Link></li>
              <li><Link to="/veiculos?marca=Scania" className="hover:text-primary transition-colors">Scania</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4 tracking-wider">PLATAFORMA</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/sobre" className="hover:text-primary transition-colors">Sobre Nós</Link></li>
              <li><Link to="/noticias" className="hover:text-primary transition-colors">Notícias</Link></li>
              <li><Link to="/oficina" className="hover:text-primary transition-colors">Oficina</Link></li>
              <li><Link to="/carreiras" className="hover:text-primary transition-colors">Carreiras</Link></li>
              <li><Link to="/contacto" className="hover:text-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4 tracking-wider">CONTACTO</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                Luanda, Angola
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                +244 923 000 000
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                info@angolauto.co.ao
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Angolauto. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
