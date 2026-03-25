import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, User, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { to: "/", label: "Início" },
  { to: "/veiculos", label: "Veículos" },
  { to: "/marcas", label: "Marcas" },
  { to: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Angolauto" className="h-10" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={`text-sm font-medium tracking-wider uppercase transition-colors duration-300 ${location.pathname === link.to ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin" className={`text-sm font-medium tracking-wider uppercase transition-colors duration-300 flex items-center gap-1 ${location.pathname === "/admin" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              <Shield className="w-3.5 h-3.5" /> Admin
            </Link>
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-xs text-muted-foreground">{user.email}</span>
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

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden overflow-hidden glass-card border-t border-border/30">
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className={`text-sm font-medium tracking-wider uppercase ${location.pathname === link.to ? "text-primary" : "text-muted-foreground"}`}>
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link to="/admin" onClick={() => setOpen(false)} className="text-sm font-medium tracking-wider uppercase text-primary flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> Admin
                </Link>
              )}
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
