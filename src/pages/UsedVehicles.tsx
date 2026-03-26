import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/PageHero";
import dfskShowcase from "@/assets/dfsk-showcase.jpg";

export default function UsedVehiclesPage() {
  return (
    <main className="pt-20 pb-16 min-h-screen flex items-center justify-center">
      <SEOHead title="Viaturas Usadas — Angolauto" description="Brevemente disponível: viaturas usadas certificadas pela Angolauto." />

      <div className="container mx-auto px-4 text-center max-w-lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Car className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            VIATURAS <span className="text-gradient-gold">USADAS</span>
          </h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Estamos a preparar a nossa secção de viaturas usadas certificadas. 
            Em breve poderá encontrar aqui oportunidades seleccionadas pela Angolauto.
          </p>
          <Link to="/veiculos">
            <Button variant="hero">Ver Veículos Novos</Button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
