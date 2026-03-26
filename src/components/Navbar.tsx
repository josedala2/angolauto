import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, Shield, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import logoDefault from "@/assets/logo.svg";
import logoWhite from "@/assets/logo-white.svg";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre Nós" },
  {
    label: "Marcas",
    children: [
      { to: "/marcas/suzuki", label: "Suzuki" },
      { to: "/marcas/dfsk", label: "DFSK" },
      { to: "/marcas/ineos", label: "Ineos Grenadier" },
      { to: "/marcas/scania", label: "Scania" },
      { to: "/marcas", label: "Todas as Marcas" },
    ],
  },
  {
    label: "Veículos",
    children: [
      { to: "/veiculos", label: "Veículos Novos" },
      { to: "/veiculos-usados", label: "Viaturas Usadas" },
      { to: "/comparar", label: "Comparar" },
    ],
  },
  { to: "/oficina", label: "Oficina" },
  { to: "/noticias", label: "Notícias" },
  { to: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(!document.documentElement.classList.contains("light"));
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => { setOpen(false); setDropdown(null); }, [location]);

  const logo = isDark ? logoWhite : logoDefault;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-card border-b border-border/50 shadow-lg" : "bg-transparent border-b border-transparent"}`}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Angolauto" className="h-10" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative" onMouseEnter={() => setDropdown(link.label)} onMouseLeave={() => setDropdown(null)}>
                <button className="flex items-center gap-1 text-sm font-medium tracking-wider uppercase transition-colors duration-300 text-muted-foreground hover:text-foreground">
                  {link.label} <ChevronDown className={`w-3 h-3 transition-transform ${dropdown === link.label ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {dropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 glass-card border border-border/50 rounded-lg py-2 min-w-[200px] shadow-lg"
                    >
                      {link.children.map((child) => (
                        <Link key={child.to} to={child.to} className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors">
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link key={link.to} to={link.to!} className={`text-sm font-medium tracking-wider uppercase transition-colors duration-300 ${location.pathname === link.to ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                {link.label}
              </Link>
            )
          )}
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

        <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden glass-card border-t border-border/30">
            <div className="flex flex-col p-4 gap-3">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <button onClick={() => setDropdown(dropdown === link.label ? null : link.label)} className="flex items-center gap-1 text-sm font-medium tracking-wider uppercase text-muted-foreground w-full">
                      {link.label} <ChevronDown className={`w-3 h-3 transition-transform ${dropdown === link.label ? "rotate-180" : ""}`} />
                    </button>
                    {dropdown === link.label && (
                      <div className="ml-4 mt-2 space-y-2">
                        {link.children.map((child) => (
                          <Link key={child.to} to={child.to} onClick={() => setOpen(false)} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={link.to} to={link.to!} onClick={() => setOpen(false)} className={`text-sm font-medium tracking-wider uppercase ${location.pathname === link.to ? "text-primary" : "text-muted-foreground"}`}>
                    {link.label}
                  </Link>
                )
              )}
              {isAdmin && (
                <Link to="/admin" onClick={() => setOpen(false)} className="text-sm font-medium tracking-wider uppercase text-primary flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> Admin
                </Link>
              )}
              <div className="flex items-center gap-2 mt-2">
                <ThemeToggle />
              </div>
              {user ? (
                <Button size="sm" variant="outline" onClick={() => { signOut(); setOpen(false); }} className="mt-2 gap-1">
                  <LogOut className="w-3.5 h-3.5" /> Sair
                </Button>
              ) : (
                <Link to="/auth" onClick={() => setOpen(false)}>
                  <Button size="sm" className="mt-2 w-full">Entrar</Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
