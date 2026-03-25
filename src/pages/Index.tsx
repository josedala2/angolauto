import HeroSection from "@/components/HeroSection";
import BrandShowcase from "@/components/BrandShowcase";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import WhyUsSection from "@/components/WhyUsSection";

export default function Index() {
  return (
    <main>
      <HeroSection />
      <BrandShowcase />
      <FeaturedVehicles />
      <WhyUsSection />
    </main>
  );
}
