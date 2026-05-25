import PublisherEducationView from "@/components/trust/PublisherEducationView";
import { getAnalyzeEducationCopy } from "@/lib/i18n/trust-pages/get-copy";
import { getServerPageLocale } from "@/lib/i18n/trust-pages/server-locale";

/** Server-rendered publisher copy for /analyze (all locales). */
export default async function AnalyzePageEducation() {
  const locale = await getServerPageLocale();
  const copy = getAnalyzeEducationCopy(locale);
  return <PublisherEducationView copy={copy} locale={locale} />;
}
