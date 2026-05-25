import { preload } from "react-dom";
import HomeHeroStatic from "@/components/home/HomeHeroStatic";
import HomePublisherStatic from "@/components/home/HomePublisherStatic";
import HomeSectionNavStatic from "@/components/home/HomeSectionNavStatic";
import HomeSocialProofStatic from "@/components/home/HomeSocialProofStatic";
import DeferredHomeStudio from "@/components/home/DeferredHomeStudio";
import { HERO_LCP_IMAGE_URL } from "@/lib/home/hero-slide-images";
import { getServerPageLocale } from "@/lib/i18n/trust-pages/server-locale";

/** LCP — small static JPEG in initial HTML (no client bundle). */
preload(HERO_LCP_IMAGE_URL, { as: "image", fetchPriority: "high" });

/** Static route — `?preset=` is applied client-side in DecisionStudio (no searchParams → faster prerender). */
export default async function Home() {
  const locale = await getServerPageLocale();

  return (
    <main id="main">
      <link
        rel="preload"
        as="image"
        href={HERO_LCP_IMAGE_URL}
        fetchPriority="high"
      />
      <HomeHeroStatic locale={locale} />
      <HomePublisherStatic locale={locale} />
      <HomeSectionNavStatic locale={locale} />
      <HomeSocialProofStatic locale={locale} />
      <DeferredHomeStudio />
    </main>
  );
}
