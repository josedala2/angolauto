import { Phone, Mail } from "lucide-react";
import SegmentToggle from "@/components/SegmentToggle";

export default function TopUtilityBar() {
  return (
    <div className="hidden lg:block border-b border-border/40 bg-secondary/60 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between h-8 px-4 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-5">
          <a href="tel:+244923000000" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Phone className="w-3 h-3" /> +244 923 000 000
          </a>
          <a href="mailto:info@angolauto.co.ao" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Mail className="w-3 h-3" /> info@angolauto.co.ao
          </a>
        </div>
        <SegmentToggle compact />
      </div>
    </div>
  );
}
