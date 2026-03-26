import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/PageHero";
import ineosShowcase from "@/assets/ineos-showcase.jpg";

const categoryLabels: Record<string, string> = {
  lancamento: "Lançamento",
  evento: "Evento",
  sector: "Sector",
};

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchNews = async () => {
      let query = supabase
        .from("news")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (filter !== "all") query = query.eq("category", filter);

      const { data } = await query;
      setNews(data || []);
      setLoading(false);
    };
    fetchNews();
  }, [filter]);

  return (
    <main className="pt-20 pb-16 min-h-screen">
      <SEOHead title="Notícias — Angolauto" description="Acompanhe as últimas novidades do sector automóvel, lançamentos e eventos da Angolauto." />

      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="text-primary font-display text-sm tracking-[0.3em] mb-2">ACTUALIDADES</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold">
            NOTÍCIAS E <span className="text-gradient-gold">NOVIDADES</span>
          </h1>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[{ id: "all", label: "Todas" }, { id: "lancamento", label: "Lançamentos" }, { id: "evento", label: "Eventos" }, { id: "sector", label: "Sector" }].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-sm text-sm font-display tracking-wider transition-all border ${
                filter === cat.id ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-muted-foreground border-border hover:border-primary/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-muted-foreground text-sm">A carregar notícias...</p>
        ) : news.length === 0 ? (
          <div className="glass-card rounded-lg p-12 text-center">
            <p className="text-muted-foreground">Sem notícias de momento. Volte em breve!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, i) => (
              <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link to={`/noticias/${article.slug}`} className="group block glass-card rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-500 h-full">
                  {article.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img src={article.image_url} alt={article.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-display tracking-wider flex items-center gap-1">
                        <Tag className="w-3 h-3" /> {categoryLabels[article.category] || article.category}
                      </span>
                      {article.published_at && (
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {new Date(article.published_at).toLocaleDateString("pt-AO")}
                        </span>
                      )}
                    </div>
                    <h2 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    {article.summary && <p className="text-sm text-muted-foreground line-clamp-3">{article.summary}</p>}
                    <span className="inline-flex items-center gap-1 text-xs text-primary mt-3 group-hover:gap-2 transition-all">
                      Ler mais <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
