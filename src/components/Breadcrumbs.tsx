import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  variant?: "default" | "overlay";
}

export default function Breadcrumbs({ items, className = "", variant = "default" }: BreadcrumbsProps) {
  const isOverlay = variant === "overlay";

  return (
    <nav aria-label="Breadcrumb" className={`${isOverlay ? "" : "mb-6"} ${className}`}>
      <ol className={`flex items-center gap-1.5 text-xs flex-wrap ${
        isOverlay ? "text-white/80" : "text-muted-foreground"
      }`}>
        <li>
          <Link to="/" className={`hover:text-primary transition-colors inline-flex items-center gap-1 ${
            isOverlay ? "text-white/70 hover:text-white" : ""
          }`}>
            <Home className="w-3 h-3" />
            <span>Início</span>
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className={`w-3 h-3 ${isOverlay ? "text-white/40" : "text-muted-foreground/50"}`} />
            {item.to ? (
              <Link to={item.to} className={`transition-colors ${
                isOverlay ? "text-white/70 hover:text-white" : "hover:text-primary"
              }`}>
                {item.label}
              </Link>
            ) : (
              <span className={`font-medium ${isOverlay ? "text-white" : "text-foreground"}`}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
