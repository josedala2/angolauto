import { Phone, Mail } from "lucide-react";
import SegmentToggle from "@/components/SegmentToggle";

export default function TopUtilityBar() {
  return (
    <div
      role="region"
      aria-label="Contactos rápidos e segmento de cliente"
      className="hidden md:block fixed top-0 left-0 right-0 z-[60] border-b border-border/40 bg-secondary/80 backdrop-blur-md"
    >
      <div className="container mx-auto flex items-center justify-between h-8 px-4 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-3 lg:gap-5">
          <a
            href="tel:+244923000000"
            aria-label="Ligar para o número +244 923 000 000"
            title="+244 923 000 000"
            className="flex items-center gap-1.5 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            <Phone className="w-3.5 h-3.5 lg:w-3 lg:h-3" aria-hidden="true" />
            <span className="hidden lg:inline">+244 923 000 000</span>
          </a>
          <a
            href="mailto:info@angolauto.co.ao"
            aria-label="Enviar email para info@angolauto.co.ao"
            title="info@angolauto.co.ao"
            className="flex items-center gap-1.5 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            <Mail className="w-3.5 h-3.5 lg:w-3 lg:h-3" aria-hidden="true" />
            <span className="hidden lg:inline">info@angolauto.co.ao</span>
          </a>
        </div>
        <SegmentToggle compact />
      </div>
    </div>
  );
}
