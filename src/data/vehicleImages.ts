// Vehicle image mapping - maps vehicle names to their hero images
import jimnyHero from "@/assets/vehicles/jimny-hero.jpg";
import jimnyInterior from "@/assets/vehicles/jimny-interior.jpg";
import jimnyRear from "@/assets/vehicles/jimny-rear.jpg";
import vitaraHero from "@/assets/vehicles/vitara-hero.jpg";
import vitaraInterior from "@/assets/vehicles/vitara-interior.jpg";
import vitaraRear from "@/assets/vehicles/vitara-rear.jpg";
import swiftHero from "@/assets/vehicles/swift-hero.jpg";
import swiftInterior from "@/assets/vehicles/swift-interior.jpg";
import glory580Hero from "@/assets/vehicles/glory580-hero.jpg";
import glory580Interior from "@/assets/vehicles/glory580-interior.jpg";
import glory500Hero from "@/assets/vehicles/glory500-hero.jpg";
import glory500Interior from "@/assets/vehicles/glory500-interior.jpg";
import ec35Hero from "@/assets/vehicles/ec35-hero.jpg";
import ec35Side from "@/assets/vehicles/ec35-side.jpg";
import grenadierHero from "@/assets/vehicles/grenadier-hero.jpg";
import grenadierInterior from "@/assets/vehicles/grenadier-interior.jpg";
import grenadierOffroad from "@/assets/vehicles/grenadier-offroad.jpg";
import quartermasterHero from "@/assets/vehicles/quartermaster-hero.jpg";
import quartermasterRear from "@/assets/vehicles/quartermaster-rear.jpg";
import r500Hero from "@/assets/vehicles/r500-hero.jpg";
import r500Side from "@/assets/vehicles/r500-side.jpg";
import r500Interior from "@/assets/vehicles/r500-interior.jpg";
import g410Hero from "@/assets/vehicles/g410-hero.jpg";
import g410Interior from "@/assets/vehicles/g410-interior.jpg";

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

// Full gallery per vehicle (hero + additional angles)
const vehicleGalleries: Record<string, string[]> = {
  "Jimny": [jimnyHero, jimnyInterior, jimnyRear],
  "Vitara": [vitaraHero, vitaraInterior, vitaraRear],
  "Swift": [swiftHero, swiftInterior],
  "Glory 580": [glory580Hero, glory580Interior],
  "Glory 500": [glory500Hero, glory500Interior],
  "EC35": [ec35Hero, ec35Side],
  "Grenadier": [grenadierHero, grenadierInterior, grenadierOffroad],
  "Quartermaster": [quartermasterHero, quartermasterRear],
  "R 500": [r500Hero, r500Side, r500Interior],
  "G 410": [g410Hero, g410Interior],
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
  const gallery = vehicleGalleries[name];
  if (gallery && gallery.length > 0) {
    // Also append brand showcase for extra variety
    const showcase = brandFallback[brand];
    return showcase ? [...gallery, showcase] : gallery;
  }
  // Fallback: hero + brand showcase
  const hero = vehicleImages[name];
  const showcase = brandFallback[brand];
  const images: string[] = [];
  if (hero) images.push(hero);
  if (showcase) images.push(showcase);
  return images.length > 0 ? images : [suzukiShowcase];
}
