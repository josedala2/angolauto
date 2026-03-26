import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEOHead({
  title = "Angolauto — Representante Oficial Suzuki, DFSK, Ineos & Scania em Angola",
  description = "Plataforma oficial da Angolauto. Venda de veículos novos Suzuki, DFSK, Ineos Grenadier e Scania em Angola. Peças, assistência técnica e financiamento.",
  image = "/og-image.jpg",
  url,
  type = "website",
}: SEOHeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      {url && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Angolauto",
        description: "Representante oficial em Angola das marcas Suzuki, DFSK, Ineos Grenadier e Scania.",
        url: "https://angolauto.co.ao",
        address: { "@type": "PostalAddress", addressLocality: "Luanda", addressCountry: "AO" },
      })}</script>
    </Helmet>
  );
}
