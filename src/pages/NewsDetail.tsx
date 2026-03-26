import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";
import SEOHead from "@/components/SEOHead";

const categoryLabels: Record<string, string> = {
  lancamento: "Lançamento",
  evento: "Evento",
  sector: "Sector",
};

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("news").select("*").eq("slug", slug).eq("published", true).maybeSingle();
      if (!data) { navigate("/noticias"); return; }
      setArticle(data);
      setLoading(false);
    };
    fetch();
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  if (loading || !article) return <div className="min-h-screen flex items-center justify-center pt-20"><p className="text-muted-foreground">A carregar...</p></div>;

  return (
    <main className="pt-20 pb-16 min-h-screen">
      <SEOHead title={`${article.title} — Angolauto`} description={article.summary || ""} />

      <div className="container mx-auto px-4 max-w-3xl">
        <Link to="/noticias" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Voltar às notícias
        </Link>

        {article.image_url && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="aspect-video rounded-lg overflow-hidden mb-8">
            <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-display tracking-wider flex items-center gap-1">
              <Tag className="w-3 h-3" /> {categoryLabels[article.category] || article.category}
            </span>
            {article.published_at && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {new Date(article.published_at).toLocaleDateString("pt-AO")}
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">{article.title}</h1>

          {article.summary && (
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed border-l-2 border-primary pl-4">{article.summary}</p>
          )}

          <div className="prose prose-invert max-w-none text-foreground/90 leading-relaxed whitespace-pre-line mb-8">
            {article.content}
          </div>

          <div className="border-t border-border/50 pt-6">
            <p className="text-xs text-muted-foreground mb-3 font-display tracking-wider">PARTILHAR</p>
            <ShareButtons title={article.title} />
          </div>
        </motion.div>
      </div>
    </main>
  );
}
