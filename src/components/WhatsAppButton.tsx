import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "244923000000";

interface Props {
  message?: string;
}

export default function WhatsAppButton({ message }: Props) {
  const defaultMsg = "Olá! Gostaria de obter mais informações sobre os veículos disponíveis na Angolauto.";
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message || defaultMsg)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] shadow-lg shadow-[hsl(142,70%,45%)]/30 flex items-center justify-center text-white transition-colors group"
      aria-label="Contactar via WhatsApp"
    >
      <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
      <span className="absolute -top-10 right-0 bg-card text-foreground text-[10px] font-display tracking-wider px-3 py-1.5 rounded-lg border border-border shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Fale connosco
      </span>
    </motion.a>
  );
}
