import { useState, useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LogIn, UserPlus, ArrowLeft } from "lucide-react";

export default function AuthPage() {
  const { user, loading: authLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect authenticated users
  if (!authLoading && user) {
    return <Navigate to="/minha-conta" replace />;
  }

  const inputClass =
    "w-full bg-secondary/50 border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Login efectuado com sucesso!");
        navigate("/minha-conta");
        return;
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Conta criada! Verifique o seu email para confirmar.");
      }
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> Voltar ao site
        </Link>

        <div className="glass-card rounded-lg p-8">
          <h1 className="font-display text-2xl font-bold text-foreground mb-1">
            {isLogin ? "ENTRAR" : "CRIAR CONTA"}
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            {isLogin ? "Aceda à sua conta Angolauto" : "Registe-se para solicitar propostas e test drives"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                required
                placeholder="Nome completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={inputClass}
              />
            )}
            <input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
            <input
              required
              type="password"
              placeholder="Palavra-passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              minLength={6}
            />

            <Button type="submit" disabled={loading} className="w-full gap-2">
              {isLogin ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
              {loading ? "A processar..." : isLogin ? "Entrar" : "Criar Conta"}
            </Button>

            {isLogin && (
              <button
                type="button"
                onClick={() => { setEmail("demo@angolauto.co.ao"); setPassword("demo1234"); }}
                className="w-full text-xs text-muted-foreground hover:text-accent border border-border/50 rounded-sm py-2 mt-2 transition-colors"
              >
                🔑 Preencher com conta demo (Admin)
              </button>
            )}
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin ? "Não tem conta? Registe-se" : "Já tem conta? Entre"}
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
