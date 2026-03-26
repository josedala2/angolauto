import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, ArrowRight, Tag, Newspaper } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/PageHero";
import { SkeletonNewsCard } from "@/components/SkeletonCard";
import { Button } from "@/components/ui/button";
import ineosShowcase from "@/assets/ineos-showcase.jpg";

const categoryLabels: Record<string, string> = {
  lancamento: "Lançamento",
  evento: "Evento",
  sector: "Sector",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
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
    <main className="pb-16 min-h-screen">
      <SEOHead title="Notícias — Angolauto" description="Acompanhe as últimas novidades do sector automóvel, lançamentos e eventos da Angolauto." />
      <PageHero image={ineosShowcase} subtitle="ACTUALIDADES" title="NOTÍCIAS E" highlight="NOVIDADES" />

      <div className="container mx-auto px-4 mt-8">

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => <SkeletonNewsCard key={n} />)}
          </div>
        ) : news.length === 0 ? (
          <div className="glass-card rounded-lg p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="font-display text-lg text-foreground">Sem notícias de momento</p>
            <p className="text-sm text-muted-foreground mt-2">Volte em breve para novidades!</p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {news.map((article) => (
              <motion.div key={article.id} variants={item}>
                <Link to={`/noticias/${article.slug}`} className="group block glass-card rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-500 h-full hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                  {article.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img src={article.image_url} alt={article.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-display tracking-wider flex items-center gap-1">
                        <Tag className="w-3 h-3" /> {categoryLabels[article.category] || article.category}
                      </span>
                      {article.published_at && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
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
          </motion.div>
        )}
      </div>
    </main>
  );
}
