import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface Props {
  vehiclePrice: string;
  vehicleName: string;
  onReserve?: () => void;
}

function parsePrice(price: string): number {
  const cleaned = price.replace(/[^\d.,]/g, "").replace(/\./g, "").replace(",", ".");
  return parseFloat(cleaned) || 0;
}

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-AO", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " Kz";
}

export default function FinancingSimulator({ vehiclePrice, vehicleName, onReserve }: Props) {
  const totalPrice = parsePrice(vehiclePrice);
  const [downPercent, setDownPercent] = useState(30);
  const [months, setMonths] = useState(48);
  const [rate, setRate] = useState(18);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#configurar") {
      setOpen(true);
      const t = setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
      return () => clearTimeout(t);
    }
  }, []);

  const result = useMemo(() => {
    const downPayment = totalPrice * (downPercent / 100);
    const financed = totalPrice - downPayment;
    const monthlyRate = rate / 100 / 12;
    let monthly = 0;
    if (monthlyRate === 0) {
      monthly = financed / months;
    } else {
      monthly = financed * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    }
    const totalPaid = downPayment + monthly * months;
    return { downPayment, financed, monthly, totalPaid };
  }, [totalPrice, downPercent, months, rate]);

  if (totalPrice <= 0) return null;

  return (
    <div id="configurar" ref={ref} className="mt-6 scroll-mt-24">
      <Button
        variant="heroOutline"
        className="w-full gap-2"
        onClick={() => setOpen(!open)}
      >
        <Calculator className="w-4 h-4" />
        Simular Financiamento
      </Button>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 space-y-5"
        >
          {/* Down payment */}
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-muted-foreground font-display tracking-wider">ENTRADA</span>
              <span className="text-foreground font-medium">{downPercent}% — {formatCurrency(result.downPayment)}</span>
            </div>
            <Slider
              value={[downPercent]}
              onValueChange={([v]) => setDownPercent(v)}
              min={10}
              max={80}
              step={5}
            />
          </div>

          {/* Months */}
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-muted-foreground font-display tracking-wider">PRAZO</span>
              <span className="text-foreground font-medium">{months} meses</span>
            </div>
            <Slider
              value={[months]}
              onValueChange={([v]) => setMonths(v)}
              min={12}
              max={84}
              step={6}
            />
          </div>

          {/* Interest rate */}
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-muted-foreground font-display tracking-wider">TAXA ANUAL</span>
              <span className="text-foreground font-medium">{rate}%</span>
            </div>
            <Slider
              value={[rate]}
              onValueChange={([v]) => setRate(v)}
              min={5}
              max={35}
              step={0.5}
            />
          </div>

          {/* Result */}
          <div className="bg-secondary/40 rounded-lg p-4 border border-border/30 space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Valor financiado</span>
              <span className="text-foreground">{formatCurrency(result.financed)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-border/30">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-sm font-display font-semibold text-foreground">Prestação mensal</span>
              </div>
              <span className="text-lg font-display font-bold text-gradient-gold">{formatCurrency(result.monthly)}</span>
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground pt-1">
              <span>Total a pagar</span>
              <span>{formatCurrency(result.totalPaid)}</span>
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground/60 leading-relaxed">
            *Simulação meramente indicativa. Valores sujeitos a aprovação bancária e condições vigentes.
          </p>

          {onReserve ? (
            <Button variant="hero" className="w-full gap-2" onClick={onReserve}>
              <CheckCircle2 className="w-4 h-4" />
              Reservar este veículo
            </Button>
          ) : (
            <Button variant="hero" className="w-full gap-2" asChild>
              <Link to={`/contacto?veiculo=${encodeURIComponent(vehicleName)}`}>
                <CheckCircle2 className="w-4 h-4" />
                Reservar este veículo
              </Link>
            </Button>
          )}
        </motion.div>
      )}
    </div>
  );
}
