import { preload } from "react-dom";
import HomeHeroStatic from "@/components/home/HomeHeroStatic";
import DeferredHomeStudio from "@/components/home/DeferredHomeStudio";
import { HERO_LCP_IMAGE_URL } from "@/lib/home/hero-slide-images";

/** LCP — small static JPEG in initial HTML (no client bundle). */
preload(HERO_LCP_IMAGE_URL, { as: "image", fetchPriority: "high" });

/** Static route — `?preset=` is applied client-side in DecisionStudio (no searchParams → faster prerender). */
export default function Home() {
  return (
    <main id="main">
      <HomeHeroStatic />
      <DeferredHomeStudio />
    </main>
  );
}
