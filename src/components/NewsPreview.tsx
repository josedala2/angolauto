import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, ArrowRight, Tag } from "lucide-react";

const categoryLabels: Record<string, string> = {
  lancamento: "Lançamento",
  evento: "Evento",
  sector: "Sector",
};

export default function NewsPreview() {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("news")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .limit(3)
      .then(({ data }) => setNews(data || []));
  }, []);

  if (news.length === 0) return null;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="flex items-end justify-between mb-10">
          <div>
            <p className="text-primary font-display text-sm tracking-[0.3em] mb-2">ACTUALIDADES</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              ÚLTIMAS <span className="text-gradient-gold">NOTÍCIAS</span>
            </h2>
          </div>
          <Link to="/noticias" className="hidden md:inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all font-display tracking-wider">
            VER TODAS <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((article, i) => (
            <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link to={`/noticias/${article.slug}`} className="group block glass-card rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-500 h-full">
                {article.image_url && (
                  <div className="aspect-video overflow-hidden">
                    <img src={article.image_url} alt={article.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-display tracking-wider">
                      {categoryLabels[article.category] || article.category}
                    </span>
                    {article.published_at && (
                      <span className="text-xs text-muted-foreground">
                        {new Date(article.published_at).toLocaleDateString("pt-AO")}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  {article.summary && <p className="text-xs text-muted-foreground line-clamp-2">{article.summary}</p>}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden text-center mt-6">
          <Link to="/noticias" className="inline-flex items-center gap-2 text-sm text-primary font-display tracking-wider">
            VER TODAS <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
