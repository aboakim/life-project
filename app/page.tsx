import { preload } from "react-dom";
import HomeHeroStatic from "@/components/home/HomeHeroStatic";
import HomeSectionNavStatic from "@/components/home/HomeSectionNavStatic";
import HomeAtAGlanceStatic from "@/components/home/HomeAtAGlanceStatic";
import HomeWhatItFixesStatic from "@/components/home/HomeWhatItFixesStatic";
import HomeProductBentoStatic from "@/components/home/HomeProductBentoStatic";
import HomeTrustStatic from "@/components/home/HomeTrustStatic";
import HomeHowItWorksStatic from "@/components/home/HomeHowItWorksStatic";
import HomeNewsStatic from "@/components/home/HomeNewsStatic";
import HomePublisherStatic from "@/components/home/HomePublisherStatic";
import HomeSocialProofStatic from "@/components/home/HomeSocialProofStatic";
import DeferredHomeStudio from "@/components/home/DeferredHomeStudio";
import ContentAdRegion from "@/components/ads/ContentAdRegion";
import ExpertsRecruitBanner from "@/components/experts/ExpertsRecruitBanner";
import { HERO_LCP_IMAGE_URL } from "@/lib/home/hero-slide-images";
import { getServerPageLocale } from "@/lib/i18n/trust-pages/server-locale";

/** LCP — small static JPEG in initial HTML (no client bundle). */
preload(HERO_LCP_IMAGE_URL, { as: "image", fetchPriority: "high" });

/**
 * Cookie-driven locale so nav language changes refresh home copy via
 * LocaleRefreshBridge. Crawlers without `lde-locale` still get DEFAULT_LOCALE.
 * `?preset=` is applied client-side in DecisionStudio (no searchParams).
 */
export default async function Home() {
  const locale = await getServerPageLocale();

  return (
    <main id="main">
      <HomeSectionNavStatic locale={locale} />
      <HomeHeroStatic locale={locale} />
      <HomeAtAGlanceStatic locale={locale} />
      <HomeWhatItFixesStatic locale={locale} />
      <HomeProductBentoStatic locale={locale} />
      <HomeTrustStatic locale={locale} />
      <HomePublisherStatic locale={locale} />
      <HomeHowItWorksStatic locale={locale} />
      <div className="px-4 py-8 sm:px-6 sm:py-10">
        <ExpertsRecruitBanner locale={locale} />
      </div>
      <HomeNewsStatic locale={locale} />
      <ContentAdRegion placement="mid" className="px-4 sm:px-6" />
      <HomeSocialProofStatic locale={locale} />
      <DeferredHomeStudio />
    </main>
  );
}
