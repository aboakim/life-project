import { preload } from "react-dom";
import DecisionStudioShell from "@/components/home/DecisionStudioShell";
import { HERO_SLIDE_IMAGE_URLS } from "@/lib/home/hero-slide-images";

/** LCP image — preload before the client bundle hydrates the hero carousel. */
preload(HERO_SLIDE_IMAGE_URLS[0], { as: "image", fetchPriority: "high" });

/** Static route — `?preset=` is applied client-side in DecisionStudio (no searchParams → faster prerender). */
export default function Home() {
  return (
    <main id="main">
      <DecisionStudioShell />
    </main>
  );
}
