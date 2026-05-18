import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, Shield, ChevronDown, ChevronRight, Car, Wrench, BarChart3, Home, Info, Newspaper, Phone as PhoneIcon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import logoDefault from "@/assets/logo.svg";
import logoWhite from "@/assets/logo-white.svg";
import ThemeToggle from "@/components/ThemeToggle";
import suzukiImg from "@/assets/suzuki-showcase.jpg";
import dfskImg from "@/assets/dfsk-showcase.jpg";
import ineosImg from "@/assets/ineos-showcase.jpg";
import scaniaImg from "@/assets/scania-showcase.jpg";

const brandItems = [
  { to: "/marcas/suzuki", label: "Suzuki", tagline: "Way of Life", img: suzukiImg },
  { to: "/marcas/dfsk", label: "DFSK", tagline: "Drive Your Ambition", img: dfskImg },
  { to: "/marcas/ineos", label: "Ineos Grenadier", tagline: "Built On Purpose", img: ineosImg },
  { to: "/marcas/scania", label: "Scania", tagline: "King of the Road", img: scaniaImg },
];

const vehicleItems = [
  { to: "/veiculos", label: "Veículos Novos", icon: Car, desc: "Catálogo completo" },
  { to: "/veiculos-usados", label: "Viaturas Usadas", icon: Car, desc: "Seminovos certificados" },
  { to: "/comparar", label: "Comparar", icon: BarChart3, desc: "Compare modelos" },
];

const simpleLinks = [
  { to: "/", label: "Início", icon: Home },
  { to: "/sobre", label: "Sobre Nós", icon: Info },
  { to: "/oficina", label: "Oficina", icon: Wrench },
  { to: "/noticias", label: "Notícias", icon: Newspaper },
  { to: "/contacto", label: "Contacto", icon: PhoneIcon },
  { to: "/contacto#localizacao", label: "Onde Estamos", icon: MapPin },
];

function isActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname.startsWith(to);
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(!document.documentElement.classList.contains("light"));
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(!document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setOpen(false); setDropdown(null); setMobileSection(null); }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const logo = isDark ? logoWhite : logoDefault;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-card border-b border-border/50 shadow-lg" : "bg-transparent border-b border-transparent"}`}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Angolauto" className="h-10" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {simpleLinks.slice(0, 2).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative text-sm font-medium tracking-wider uppercase transition-colors duration-300 py-1 ${
                isActive(location.pathname, link.to) ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {isActive(location.pathname, link.to) && (
                <motion.span layoutId="nav-indicator" className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}

          {/* Marcas Mega-Menu */}
          <div className="relative" onMouseEnter={() => setDropdown("Marcas")} onMouseLeave={() => setDropdown(null)}>
            <button className={`flex items-center gap-1 text-sm font-medium tracking-wider uppercase transition-colors duration-300 py-1 relative ${
              location.pathname.startsWith("/marcas") ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}>
              Marcas <ChevronDown className={`w-3 h-3 transition-transform ${dropdown === "Marcas" ? "rotate-180" : ""}`} />
              {location.pathname.startsWith("/marcas") && (
                <motion.span layoutId="nav-indicator" className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
            <AnimatePresence>
              {dropdown === "Marcas" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 glass-card border border-border/50 rounded-lg shadow-xl w-[520px] p-4"
                >
                  <div className="grid grid-cols-2 gap-3">
                    {brandItems.map((brand) => (
                      <Link
                        key={brand.to}
                        to={brand.to}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors group"
                      >
                        <div className="w-16 h-12 rounded-md overflow-hidden shrink-0">
                          <img src={brand.img} alt={brand.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div>
                          <p className="text-sm font-display font-semibold text-foreground">{brand.label}</p>
                          <p className="text-xs text-primary tracking-wider">{brand.tagline}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-border/30 mt-3 pt-3">
                    <Link to="/marcas" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                      Ver todas as marcas <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Veículos Dropdown */}
          <div className="relative" onMouseEnter={() => setDropdown("Veículos")} onMouseLeave={() => setDropdown(null)}>
            <button className={`flex items-center gap-1 text-sm font-medium tracking-wider uppercase transition-colors duration-300 py-1 relative ${
              location.pathname.startsWith("/veiculo") || location.pathname.startsWith("/comparar") ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}>
              Veículos <ChevronDown className={`w-3 h-3 transition-transform ${dropdown === "Veículos" ? "rotate-180" : ""}`} />
              {(location.pathname.startsWith("/veiculo") || location.pathname.startsWith("/comparar")) && (
                <motion.span layoutId="nav-indicator" className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
            <AnimatePresence>
              {dropdown === "Veículos" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-3 glass-card border border-border/50 rounded-lg shadow-xl min-w-[240px] py-2"
                >
                  {vehicleItems.map((vi) => (
                    <Link
                      key={vi.to}
                      to={vi.to}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-primary/5 transition-colors"
                    >
                      <vi.icon className="w-4 h-4 text-primary shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{vi.label}</p>
                        <p className="text-xs text-muted-foreground">{vi.desc}</p>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {simpleLinks.slice(2).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative text-sm font-medium tracking-wider uppercase transition-colors duration-300 py-1 ${
                isActive(location.pathname, link.to) ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {isActive(location.pathname, link.to) && (
                <motion.span layoutId="nav-indicator" className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}

          {isAdmin && (
            <Link to="/admin" className={`text-sm font-medium tracking-wider uppercase transition-colors duration-300 flex items-center gap-1 ${location.pathname === "/admin" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              <Shield className="w-3.5 h-3.5" /> Admin
            </Link>
          )}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <>
              <Link to="/minha-conta">
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="w-3.5 h-3.5" /> Minha Conta
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={signOut} className="gap-1">
                <LogOut className="w-3.5 h-3.5" /> Sair
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="w-3.5 h-3.5" /> Entrar
                </Button>
              </Link>
              <Link to="/contacto">
                <Button size="sm">Test Drive</Button>
              </Link>
            </>
          )}
        </div>

        <button className="lg:hidden text-foreground p-1" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden fixed inset-0 top-16 z-50 bg-background/98 backdrop-blur-xl overflow-y-auto"
          >
            <div className="flex flex-col p-6 gap-1 min-h-full">
              {/* Simple links */}
              {simpleLinks.map((link, i) => (
                <motion.div key={link.to} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-4 py-4 border-b border-border/20 ${
                      isActive(location.pathname, link.to) ? "text-primary" : "text-foreground"
                    }`}
                  >
                    <link.icon className="w-5 h-5 text-primary" />
                    <span className="font-display text-lg tracking-wider uppercase">{link.label}</span>
                    {isActive(location.pathname, link.to) && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-primary" />
                    )}
                  </Link>
                </motion.div>
              ))}

              {/* Marcas section */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                <button
                  onClick={() => setMobileSection(mobileSection === "marcas" ? null : "marcas")}
                  className="flex items-center gap-4 py-4 border-b border-border/20 w-full text-foreground"
                >
                  <Car className="w-5 h-5 text-primary" />
                  <span className="font-display text-lg tracking-wider uppercase">Marcas</span>
                  <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${mobileSection === "marcas" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileSection === "marcas" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="py-3 space-y-2">
                        {brandItems.map((brand) => (
                          <Link
                            key={brand.to}
                            to={brand.to}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                          >
                            <div className="w-14 h-10 rounded-md overflow-hidden shrink-0">
                              <img src={brand.img} alt={brand.label} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-sm font-display font-semibold text-foreground">{brand.label}</p>
                              <p className="text-xs text-primary tracking-wider">{brand.tagline}</p>
                            </div>
                          </Link>
                        ))}
                        <Link to="/marcas" onClick={() => setOpen(false)} className="block text-xs text-muted-foreground hover:text-primary pl-3 pt-1 transition-colors">
                          Ver todas as marcas →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Veículos section */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <button
                  onClick={() => setMobileSection(mobileSection === "veiculos" ? null : "veiculos")}
                  className="flex items-center gap-4 py-4 border-b border-border/20 w-full text-foreground"
                >
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span className="font-display text-lg tracking-wider uppercase">Veículos</span>
                  <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${mobileSection === "veiculos" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileSection === "veiculos" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="py-3 space-y-1">
                        {vehicleItems.map((vi) => (
                          <Link
                            key={vi.to}
                            to={vi.to}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                          >
                            <vi.icon className="w-4 h-4 text-primary shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{vi.label}</p>
                              <p className="text-xs text-muted-foreground">{vi.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {isAdmin && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                  <Link to="/admin" onClick={() => setOpen(false)} className="flex items-center gap-4 py-4 border-b border-border/20 text-primary">
                    <Shield className="w-5 h-5" />
                    <span className="font-display text-lg tracking-wider uppercase">Admin</span>
                  </Link>
                </motion.div>
              )}

              {/* Bottom actions */}
              <div className="mt-auto pt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-display tracking-wider">TEMA</span>
                  <ThemeToggle />
                </div>
                {user ? (
                  <div className="flex gap-3">
                    <Link to="/minha-conta" onClick={() => setOpen(false)} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full gap-2">
                        <User className="w-4 h-4" /> Minha Conta
                      </Button>
                    </Link>
                    <Button size="sm" variant="ghost" onClick={() => { signOut(); setOpen(false); }} className="gap-1">
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Link to="/auth" onClick={() => setOpen(false)}>
                    <Button size="sm" className="w-full gap-2">
                      <User className="w-4 h-4" /> Entrar / Registar
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
