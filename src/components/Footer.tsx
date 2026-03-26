import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.svg";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border/50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src={logo} alt="Angolauto" className="h-10 mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Representante oficial em Angola das marcas Suzuki, DFSK, Ineos Grenadier e Scania.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4 tracking-wider">Marcas</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/veiculos?marca=Suzuki" className="hover:text-primary transition-colors">Suzuki</Link></li>
              <li><Link to="/veiculos?marca=DFSK" className="hover:text-primary transition-colors">DFSK</Link></li>
              <li><Link to="/veiculos?marca=Ineos" className="hover:text-primary transition-colors">Ineos Grenadier</Link></li>
              <li><Link to="/veiculos?marca=Scania" className="hover:text-primary transition-colors">Scania</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4 tracking-wider">Serviços</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Venda de Veículos</li>
              <li>Peças e Acessórios</li>
              <li>Assistência Técnica</li>
              <li>Financiamento</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4 tracking-wider">Contacto</h4>
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
