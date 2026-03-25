// Vehicle image mapping - maps vehicle names to their hero images
import jimnyHero from "@/assets/vehicles/jimny-hero.jpg";
import vitaraHero from "@/assets/vehicles/vitara-hero.jpg";
import swiftHero from "@/assets/vehicles/swift-hero.jpg";
import glory580Hero from "@/assets/vehicles/glory580-hero.jpg";
import glory500Hero from "@/assets/vehicles/glory500-hero.jpg";
import ec35Hero from "@/assets/vehicles/ec35-hero.jpg";
import grenadierHero from "@/assets/vehicles/grenadier-hero.jpg";
import quartermasterHero from "@/assets/vehicles/quartermaster-hero.jpg";
import r500Hero from "@/assets/vehicles/r500-hero.jpg";
import g410Hero from "@/assets/vehicles/g410-hero.jpg";

// Brand showcase images as fallback
import suzukiShowcase from "@/assets/suzuki-showcase.jpg";
import dfskShowcase from "@/assets/dfsk-showcase.jpg";
import ineosShowcase from "@/assets/ineos-showcase.jpg";
import scaniaShowcase from "@/assets/scania-showcase.jpg";

const vehicleImages: Record<string, string> = {
  "Jimny": jimnyHero,
  "Vitara": vitaraHero,
  "Swift": swiftHero,
  "Glory 580": glory580Hero,
  "Glory 500": glory500Hero,
  "EC35": ec35Hero,
  "Grenadier": grenadierHero,
  "Quartermaster": quartermasterHero,
  "R 500": r500Hero,
  "G 410": g410Hero,
};

const brandFallback: Record<string, string> = {
  "Suzuki": suzukiShowcase,
  "DFSK": dfskShowcase,
  "Ineos": ineosShowcase,
  "Scania": scaniaShowcase,
};

export function getVehicleImage(name: string, brand: string): string {
  return vehicleImages[name] || brandFallback[brand] || suzukiShowcase;
}

export function getVehicleGallery(name: string, brand: string): string[] {
  const hero = vehicleImages[name];
  const showcase = brandFallback[brand];
  const images: string[] = [];
  if (hero) images.push(hero);
  if (showcase) images.push(showcase);
  return images.length > 0 ? images : [suzukiShowcase];
}
