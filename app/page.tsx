import { Suspense } from "react";
import { preload } from "react-dom";
import DecisionStudioShell from "@/components/home/DecisionStudioShell";
import HomeHeroFallback from "@/components/home/HomeHeroFallback";
import { HERO_SLIDE_IMAGE_URLS } from "@/lib/home/hero-slide-images";

/** LCP image — same URL as fallback <img> and carousel slide 0 (unoptimized). */
preload(HERO_SLIDE_IMAGE_URLS[0], { as: "image", fetchPriority: "high" });

/** Static route — `?preset=` is applied client-side in DecisionStudio (no searchParams → faster prerender). */
export default function Home() {
  return (
    <main id="main">
      <Suspense fallback={<HomeHeroFallback />}>
        <DecisionStudioShell />
      </Suspense>
    </main>
  );
}
