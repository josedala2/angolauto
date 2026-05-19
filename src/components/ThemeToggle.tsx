import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved === "dark";
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("light");
    } else {
      root.classList.add("light");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const sizing = compact ? "w-6 h-6" : "w-9 h-9";
  const iconSize = compact ? "w-3 h-3" : "w-4 h-4";

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className={`${sizing} rounded-full flex items-center justify-center border border-border/50 bg-secondary/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
      aria-label={isDark ? "Modo diurno" : "Modo nocturno"}
    >
      {isDark ? <Sun className={iconSize} /> : <Moon className={iconSize} />}
    </button>
  );
}
