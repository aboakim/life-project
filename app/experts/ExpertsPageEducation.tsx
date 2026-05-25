import PublisherEducationView from "@/components/trust/PublisherEducationView";
import { getExpertsEducationCopy } from "@/lib/i18n/trust-pages/experts-education";
import { getServerPageLocale } from "@/lib/i18n/trust-pages/server-locale";

/**
 * Server-rendered educational content for /experts (all locales).
 * Outside Suspense so crawlers and AdSense see ~700+ words in initial HTML.
 */
export default async function ExpertsPageEducation() {
  const locale = await getServerPageLocale();
  const copy = getExpertsEducationCopy(locale);
  return (
    <PublisherEducationView
      copy={copy}
      locale={locale}
      className="pb-16 pt-2 sm:pb-24 sm:pt-4"
    />
  );
}
