import type { Metadata } from "next";
import TrustPageView from "@/components/trust/TrustPageView";
import type { TrustPageId } from "@/lib/i18n/trust-pages/types";
import { getTrustPageCopy } from "@/lib/i18n/trust-pages/get-copy";
import { getServerPageLocale } from "@/lib/i18n/trust-pages/server-locale";

export function makeTrustPage(id: TrustPageId, canonical: string) {
  async function generateMetadata(): Promise<Metadata> {
    const locale = await getServerPageLocale();
    const copy = getTrustPageCopy(id, locale);
    return {
      title: copy.metaTitle,
      description: copy.metaDescription,
      alternates: { canonical },
    };
  }

  async function TrustPage() {
    const locale = await getServerPageLocale();
    const copy = getTrustPageCopy(id, locale);
    return <TrustPageView copy={copy} locale={locale} />;
  }

  return { generateMetadata, default: TrustPage };
}
