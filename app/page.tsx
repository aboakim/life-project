import { Suspense } from "react";
import DecisionStudioShell from "@/components/home/DecisionStudioShell";
import { HERO_SLIDE_IMAGE_URLS } from "@/lib/home/hero-slide-images";

export default function Home() {
  const heroLcpSrc = HERO_SLIDE_IMAGE_URLS[0];

  return (
    <>
      <link rel="preload" as="image" href={heroLcpSrc} fetchPriority="high" />
      <main id="main">
      <Suspense
        fallback={
          <div className="relative z-10 min-h-screen bg-[rgb(var(--surface))]" />
        }
      >
        <DecisionStudioShell />
      </Suspense>
    </main>
    </>
  );
}
