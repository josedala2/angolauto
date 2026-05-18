import HeroSection from "@/components/HeroSection";
import ModelChipsBar from "@/components/ModelChipsBar";
import BrandShowcase from "@/components/BrandShowcase";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import NewsPreview from "@/components/NewsPreview";
import WhyUsSection from "@/components/WhyUsSection";
import CTABanner from "@/components/CTABanner";
import SEOHead from "@/components/SEOHead";

export default function Index() {
  return (
    <main>
      <SEOHead />
      <HeroSection />
      <ModelChipsBar />
      <BrandShowcase />
      <FeaturedVehicles />
      <NewsPreview />
      <WhyUsSection />
      <CTABanner />
    </main>
  );
}
