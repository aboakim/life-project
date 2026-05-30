import { preload } from "react-dom";
import HomeHeroStatic from "@/components/home/HomeHeroStatic";
import HomeSectionNavStatic from "@/components/home/HomeSectionNavStatic";
import HomeAtAGlanceStatic from "@/components/home/HomeAtAGlanceStatic";
import HomeWhatItFixesStatic from "@/components/home/HomeWhatItFixesStatic";
import HomeProductBentoStatic from "@/components/home/HomeProductBentoStatic";
import HomeTrustStatic from "@/components/home/HomeTrustStatic";
import HomeHowItWorksStatic from "@/components/home/HomeHowItWorksStatic";
import HomePublisherStatic from "@/components/home/HomePublisherStatic";
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
      <HomeSectionNavStatic locale={locale} />
      <HomeHeroStatic locale={locale} />
      <HomeAtAGlanceStatic locale={locale} />
      <HomeWhatItFixesStatic locale={locale} />
      <HomeProductBentoStatic locale={locale} />
      <HomeTrustStatic locale={locale} />
      <HomeHowItWorksStatic locale={locale} />
      <HomePublisherStatic locale={locale} />
      <HomeSocialProofStatic locale={locale} />
      <DeferredHomeStudio />
    </main>
  );
}
