import { motion } from "framer-motion";

interface PageHeroProps {
  image: string;
  subtitle: string;
  title: string;
  highlight: string;
  description?: string;
}

export default function PageHero({ image, subtitle, title, highlight, description }: PageHeroProps) {
  return (
    <section className="relative h-[40vh] min-h-[380px] max-h-[520px] flex items-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pt-32 pb-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] mb-2">
            {subtitle}
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold">
            {title} <span className="text-gradient-gold">{highlight}</span>
          </h1>
          {description && (
            <p className="text-muted-foreground mt-3 max-w-xl text-sm md:text-base">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
