import HeroSection from "@/components/HeroSection";
import BrandShowcase from "@/components/BrandShowcase";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import HighlightsCarousel from "@/components/HighlightsCarousel";
import NewsPreview from "@/components/NewsPreview";
import WhyUsSection from "@/components/WhyUsSection";
import SEOHead from "@/components/SEOHead";

export default function Index() {
  return (
    <main>
      <SEOHead />
      <HeroSection />
      <BrandShowcase />
      <FeaturedVehicles />
      <HighlightsCarousel />
      <NewsPreview />
      <WhyUsSection />
    </main>
  );
}
