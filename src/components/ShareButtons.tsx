import { Facebook, MessageCircle, Link2 } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const shareUrl = url || window.location.href;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copiado!");
  };

  return (
    <div className="flex items-center gap-3">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
        aria-label="Partilhar no Facebook"
      >
        <Facebook className="w-4 h-4" />
      </a>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
        aria-label="Partilhar no WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
      </a>
      <button
        onClick={copyLink}
        className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
        aria-label="Copiar link"
      >
        <Link2 className="w-4 h-4" />
      </button>
    </div>
  );
}
