import { getStockStatus } from "@/lib/stockStatus";

interface StockBadgeProps {
  vehicle: { brand?: string | null; category?: string | null; name?: string | null };
  className?: string;
}

export function StockBadge({ vehicle, className = "" }: StockBadgeProps) {
  const { label, tone } = getStockStatus(vehicle);
  const toneClasses =
    tone === "available"
      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
      : "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30";
  const dotClasses = tone === "available" ? "bg-emerald-500" : "bg-amber-500";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-display uppercase tracking-wider backdrop-blur-md ${toneClasses} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotClasses} ${tone === "available" ? "animate-pulse" : ""}`} />
      {label}
    </span>
  );
}
