import DecisionStudioShell from "@/components/home/DecisionStudioShell";
import { HERO_SLIDE_IMAGE_URLS } from "@/lib/home/hero-slide-images";

/** Static route — `?preset=` is applied client-side in DecisionStudio (no searchParams → faster prerender). */
export default function Home() {
  const heroLcpSrc = HERO_SLIDE_IMAGE_URLS[0];

  return (
    <>
      <link rel="preload" as="image" href={heroLcpSrc} fetchPriority="high" />
      <main id="main">
        <DecisionStudioShell />
      </main>
    </>
  );
}
