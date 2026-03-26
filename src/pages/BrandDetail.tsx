import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Gauge, Settings2, Fuel, MapPin, Phone, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getVehicleImage } from "@/data/vehicleImages";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import Timeline from "@/components/Timeline";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getVehicleImage } from "@/data/vehicleImages";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

import suzukiImg from "@/assets/suzuki-showcase.jpg";
import dfskImg from "@/assets/dfsk-showcase.jpg";
import ineosImg from "@/assets/ineos-showcase.jpg";
import scaniaImg from "@/assets/scania-showcase.jpg";

interface BrandInfo {
  name: string;
  displayName: string;
  tagline: string;
  heroImg: string;
  founded: string;
  origin: string;
  website: string;
  description: string;
  history: string[];
  strengths: string[];
}

const brandData: Record<string, BrandInfo> = {
  suzuki: {
    name: "Suzuki",
    displayName: "Suzuki",
    tagline: "Way of Life",
    heroImg: suzukiImg,
    founded: "1909",
    origin: "Hamamatsu, Japão",
    website: "suzuki.co.jp",
    description:
      "A Suzuki Motor Corporation é uma multinacional japonesa especializada em veículos compactos, eficientes e fiáveis. Com mais de um século de história, a marca destaca-se pela engenharia inteligente que maximiza desempenho e economia.",
    history: [
      "1909 — Michio Suzuki funda a Suzuki Loom Works em Hamamatsu",
      "1955 — Lançamento do primeiro automóvel: o Suzulight",
      "1970 — Expansão global com exportações para a Europa e Ásia",
      "1981 — Parceria com General Motors reforça presença internacional",
      "1998 — Lançamento do icónico Jimny de 3ª geração",
      "2020 — Nova geração de modelos híbridos com tecnologia SHVS",
      "2024 — Representação oficial em Angola pela Angolauto",
    ],
    strengths: [
      "Eficiência de combustível líder de mercado",
      "Tecnologia AllGrip 4x4 comprovada",
      "Fiabilidade excepcional com baixo custo de manutenção",
      "Veículos compactos ideais para terrenos angolanos",
    ],
  },
  dfsk: {
    name: "DFSK",
    displayName: "DFSK",
    tagline: "Drive Your Ambition",
    heroImg: dfskImg,
    founded: "2003",
    origin: "Chongqing, China",
    website: "dfskglobal.com",
    description:
      "A DFSK (Dongfeng Sokon) é uma joint venture entre a Dongfeng Motor e a Sokon Industry Group, especializada em SUVs e veículos comerciais com excelente relação qualidade-preço. A marca tem crescido rapidamente em mercados emergentes.",
    history: [
      "2003 — Fundação da DFSK como joint venture Dongfeng-Sokon",
      "2007 — Início da exportação para mercados internacionais",
      "2015 — Lançamento da série Glory com foco em SUVs familiares",
      "2018 — Glory 580 torna-se best-seller em múltiplos mercados",
      "2021 — Introdução do EC35, van 100% eléctrica para logística urbana",
      "2024 — Entrada no mercado angolano através da Angolauto",
    ],
    strengths: [
      "Preços competitivos sem comprometer qualidade",
      "SUVs espaçosos com até 7 lugares",
      "Soluções comerciais eléctricas pioneiras",
      "Garantia alargada e peças disponíveis",
    ],
  },
  ineos: {
    name: "Ineos",
    displayName: "Ineos Grenadier",
    tagline: "Built On Purpose",
    heroImg: ineosImg,
    founded: "2017",
    origin: "Londres, Reino Unido",
    website: "ineosgrenadier.com",
    description:
      "O Ineos Grenadier é um veículo utilitário sem compromissos, concebido para os terrenos mais exigentes do planeta. Inspirado nos clássicos off-roaders, combina engenharia alemã (motor BMW) com construção robusta sobre chassis ladder frame.",
    history: [
      "2017 — Sir Jim Ratcliffe anuncia o projecto Grenadier",
      "2019 — Parceria com BMW para motorização e com ZF para transmissão",
      "2020 — Definição do design final inspirado em veículos utilitários clássicos",
      "2022 — Início da produção na fábrica de Hambach, França",
      "2023 — Lançamento do Quartermaster (versão pickup)",
      "2024 — Chegada a Angola como representante oficial Angolauto",
    ],
    strengths: [
      "Motor BMW de 6 cilindros (gasolina ou diesel)",
      "Chassis ladder frame e eixos rígidos para máxima robustez",
      "Capacidade off-road de nível militar",
      "Interior funcional e resistente a condições extremas",
    ],
  },
  scania: {
    name: "Scania",
    displayName: "Scania",
    tagline: "King of the Road",
    heroImg: scaniaImg,
    founded: "1891",
    origin: "Södertälje, Suécia",
    website: "scania.com",
    description:
      "A Scania é líder mundial em soluções de transporte pesado. Com mais de 130 anos de história, fabrica camiões, autocarros e motores industriais reconhecidos pela durabilidade, eficiência e inovação tecnológica.",
    history: [
      "1891 — Fundação da Vabis em Södertälje, Suécia",
      "1911 — Fusão com a Scania, formando a Scania-Vabis",
      "1969 — Fusão com a Saab, criando o grupo Saab-Scania",
      "1996 — Scania torna-se empresa independente na bolsa de Estocolmo",
      "2014 — Volkswagen Group adquire controlo total da Scania",
      "2020 — Lançamento de camiões eléctricos e a hidrogénio",
      "2024 — Presença reforçada em Angola através da Angolauto",
    ],
    strengths: [
      "Motores V8 lendários com potência e eficiência",
      "Sistema modular que permite configuração personalizada",
      "Transmissão Opticruise para máximo conforto do motorista",
      "Rede de assistência e peças robusta",
    ],
  },
};

export default function BrandDetailPage() {
  const { brandId } = useParams<{ brandId: string }>();
  const brand = brandId ? brandData[brandId.toLowerCase()] : null;
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!brand) return;
    const fetchVehicles = async () => {
      const { data } = await supabase
        .from("vehicles")
        .select("*")
        .eq("active", true)
        .eq("brand", brand.name)
        .order("featured", { ascending: false })
        .order("name");
      setVehicles(data || []);
      setLoading(false);
    };
    fetchVehicles();
  }, [brand]);

  if (!brand) return <Navigate to="/marcas" replace />;

  return (
    <main className="pt-20 pb-16 min-h-screen">
      <SEOHead
        title={`${brand.displayName} em Angola | Angolauto`}
        description={brand.description}
      />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={brand.heroImg}
          alt={brand.displayName}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-primary font-display text-sm tracking-[0.3em] mb-2">
              {brand.tagline.toUpperCase()}
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground">
              {brand.displayName}
            </h1>
            <p className="text-muted-foreground mt-3 max-w-xl text-sm leading-relaxed">
              {brand.description}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Quick Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-8 relative z-10 mb-16"
        >
          {[
            { label: "Fundada", value: brand.founded },
            { label: "Origem", value: brand.origin },
            { label: "Modelos em Angola", value: `${vehicles.length}` },
            { label: "Website", value: brand.website },
          ].map((fact) => (
            <div key={fact.label} className="glass-card rounded-lg p-4 text-center">
              <p className="text-xs text-muted-foreground tracking-[0.2em] font-display mb-1">
                {fact.label.toUpperCase()}
              </p>
              <p className="text-sm font-semibold text-foreground">{fact.value}</p>
            </div>
          ))}
        </motion.div>

        {/* History Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] mb-3">CRONOLOGIA</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-10">
            HISTÓRIA DA <span className="text-gradient-gold">{brand.displayName.toUpperCase()}</span>
          </h2>
          <div className="relative pl-8 border-l-2 border-primary/30 space-y-8">
            {brand.history.map((item, i) => {
              const [year, ...rest] = item.split(" — ");
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="relative"
                >
                  <div className="absolute -left-[2.55rem] top-1 w-4 h-4 rounded-full bg-primary/20 border-2 border-primary" />
                  <p className="text-primary font-display text-xs tracking-wider font-semibold">
                    {year}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{rest.join(" — ")}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Strengths */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] mb-3">VANTAGENS</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">
            PORQUÊ <span className="text-gradient-gold">{brand.displayName.toUpperCase()}</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {brand.strengths.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-lg p-5 flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-primary font-display text-sm font-bold">{i + 1}</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{s}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Models Gallery */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-primary font-display text-sm tracking-[0.3em] mb-3">MODELOS</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                GAMA{" "}
                <span className="text-gradient-gold">{brand.displayName.toUpperCase()}</span>
              </h2>
            </div>
            <Link to={`/veiculos?marca=${brand.name}`}>
              <Button variant="outline" size="sm" className="gap-2">
                Ver todos <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="glass-card rounded-lg h-80 animate-pulse" />
              ))}
            </div>
          ) : vehicles.length === 0 ? (
            <p className="text-muted-foreground text-sm">Nenhum modelo disponível de momento.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((v, i) => (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link to={`/veiculo/${v.id}`} className="block group">
                    <div className="glass-card rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-500">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={getVehicleImage(v.name, v.brand)}
                          alt={`${v.brand} ${v.name}`}
                          loading="lazy"
                          width={800}
                          height={450}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs tracking-[0.2em] text-primary font-display">
                            {v.year}
                          </span>
                          {v.featured && (
                            <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full font-display">
                              Destaque
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-xl font-bold text-foreground mb-1">
                          {v.name}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                          {v.description}
                        </p>
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <div className="flex flex-col items-center gap-1 text-center">
                            <Gauge className="w-3.5 h-3.5 text-primary" />
                            <span className="text-xs text-muted-foreground">{v.power}</span>
                          </div>
                          <div className="flex flex-col items-center gap-1 text-center">
                            <Settings2 className="w-3.5 h-3.5 text-primary" />
                            <span className="text-xs text-muted-foreground">
                              {v.transmission?.split("/")[0]?.trim()}
                            </span>
                          </div>
                          <div className="flex flex-col items-center gap-1 text-center">
                            <Fuel className="w-3.5 h-3.5 text-primary" />
                            <span className="text-xs text-muted-foreground">{v.fuel_type}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-border/50">
                          <span className="text-sm text-primary font-display font-medium">
                            {v.price}
                          </span>
                          <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                            Ver detalhes <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-lg p-8 md:p-12 text-center mb-12"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">
            Interessado na {brand.displayName}?
          </h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
            Contacte-nos para mais informações, solicite uma proposta ou agende um test drive.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contacto">
              <Button className="gap-2">
                Solicitar Proposta <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to={`/veiculos?marca=${brand.name}`}>
              <Button variant="outline" className="gap-2">
                Ver Modelos <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
