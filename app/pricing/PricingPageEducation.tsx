import PublisherEducationView from "@/components/trust/PublisherEducationView";
import { getPricingEducationCopy } from "@/lib/i18n/trust-pages/get-copy";
import { getServerPageLocale } from "@/lib/i18n/trust-pages/server-locale";

/** Server-rendered publisher copy for /pricing (all locales). */
export default async function PricingPageEducation() {
  const locale = await getServerPageLocale();
  const copy = getPricingEducationCopy(locale);
  return <PublisherEducationView copy={copy} locale={locale} />;
}
