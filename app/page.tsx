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
import { DEFAULT_LOCALE } from "@/lib/locale-default";

/** LCP — small static JPEG in initial HTML (no client bundle). */
preload(HERO_LCP_IMAGE_URL, { as: "image", fetchPriority: "high" });

/** Edge-cacheable HTML; non-default locale re-fetched via LocaleRefreshBridge after hydration. */
export const dynamic = "force-static";

/** Static route — `?preset=` is applied client-side in DecisionStudio (no searchParams → faster prerender). */
export default function Home() {
  const locale = DEFAULT_LOCALE;

  return (
    <main id="main">
      <HomeHeroStatic locale={locale} />
      <HomeSectionNavStatic locale={locale} />
      <HomeAtAGlanceStatic locale={locale} />
      <HomeWhatItFixesStatic locale={locale} />
      <HomeProductBentoStatic locale={locale} />
      <HomeTrustStatic locale={locale} />
      <HomePublisherStatic locale={locale} />
      <HomeHowItWorksStatic locale={locale} />
      <HomeSocialProofStatic locale={locale} />
      <DeferredHomeStudio />
    </main>
  );
}
