import { Phone, Mail, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import SegmentToggle from "@/components/SegmentToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";

export default function TopUtilityBar() {
  const { user, signOut } = useAuth();

  return (
    <div
      role="region"
      aria-label="Contactos rápidos, conta e segmento de cliente"
      className="hidden md:block fixed top-0 left-0 right-0 z-[60] border-b border-border/40 bg-secondary/80 backdrop-blur-md"
    >
      <div className="container mx-auto flex items-center justify-between h-8 px-4 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-3 lg:gap-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="tel:+244923000000"
                aria-label="Ligar para o número +244 923 000 000"
                className="flex items-center gap-1.5 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                <Phone className="w-3.5 h-3.5 lg:w-3 lg:h-3" aria-hidden="true" />
                <span className="hidden lg:inline">+244 923 000 000</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="lg:hidden">+244 923 000 000</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="mailto:info@angolauto.co.ao"
                aria-label="Enviar email para info@angolauto.co.ao"
                className="flex items-center gap-1.5 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                <Mail className="w-3.5 h-3.5 lg:w-3 lg:h-3" aria-hidden="true" />
                <span className="hidden lg:inline">info@angolauto.co.ao</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="lg:hidden">info@angolauto.co.ao</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <SegmentToggle compact />

          <span className="h-4 w-px bg-border/60" aria-hidden="true" />

          {user ? (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/minha-conta"
                    aria-label="Minha Conta"
                    className="flex items-center gap-1.5 px-2 h-6 rounded-full border border-border/50 bg-background/40 hover:text-primary hover:border-primary/40 transition-colors text-[11px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <User className="w-3 h-3" aria-hidden="true" />
                    <span className="hidden lg:inline">Minha Conta</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="lg:hidden">Minha Conta</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={signOut}
                    aria-label="Sair"
                    className="w-6 h-6 rounded-full flex items-center justify-center border border-border/50 bg-background/40 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <LogOut className="w-3 h-3" aria-hidden="true" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Sair</TooltipContent>
              </Tooltip>
            </>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/auth"
                  aria-label="Entrar na minha conta"
                  className="flex items-center gap-1.5 px-2 h-6 rounded-full border border-border/50 bg-background/40 hover:text-primary hover:border-primary/40 transition-colors text-[11px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <User className="w-3 h-3" aria-hidden="true" />
                  <span className="hidden lg:inline">Entrar</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="lg:hidden">Entrar</TooltipContent>
            </Tooltip>
          )}

          <ThemeToggle compact />
        </div>
      </div>
    </div>
  );
}
