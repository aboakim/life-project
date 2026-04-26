"use client";

import { useEffect, useState } from "react";
import AdSenseBanner from "@/components/ads/AdSenseBanner";
import CommunityBoard from "@/components/community/CommunityBoard";
import MarketingPageShell from "@/components/layout/MarketingPageShell";
import { getCommunityCopy } from "@/lib/i18n/community-page";
import { getSiteExtras } from "@/lib/i18n/site-extras";
import { getUi } from "@/lib/i18n/ui";
import {
  isAppLocale,
  type AppLocale,
} from "@/lib/i18n/locale";
import { DEFAULT_LOCALE } from "@/lib/locale-default";
import { readLocaleCookieClient } from "@/lib/locale-cookie";
import { LOCALE_CHANGE_EVENT } from "@/lib/locale-sync";

const LOCALE_KEY = "lde-locale";

export default function CommunityPageClient() {
  const [locale, setLocale] = useState<AppLocale>(DEFAULT_LOCALE);

  useEffect(() => {
    const raw = localStorage.getItem(LOCALE_KEY);
    const fromCookie = readLocaleCookieClient();
    let resolved: AppLocale = DEFAULT_LOCALE;
    if (raw !== null && isAppLocale(raw)) {
      resolved = raw;
    } else if (fromCookie !== null) {
      resolved = fromCookie;
    }
    setLocale(resolved);
    if (raw === null || !isAppLocale(raw)) {
      localStorage.setItem(LOCALE_KEY, resolved);
    }
  }, []);

  useEffect(() => {
    function syncFromNav() {
      const raw = localStorage.getItem(LOCALE_KEY);
      if (raw && isAppLocale(raw)) setLocale(raw);
    }
    window.addEventListener(LOCALE_CHANGE_EVENT, syncFromNav);
    return () => window.removeEventListener(LOCALE_CHANGE_EVENT, syncFromNav);
  }, []);

  const t = getCommunityCopy(locale);
  const sx = getSiteExtras(locale);
  const ui = getUi(locale);

  return (
    <MarketingPageShell
      eyebrow="Community"
      title={t.pageTitle}
      subtitle={t.pageSubtitle}
    >
      <AdSenseBanner
        reserveWhenDisabled
        placeholderEyebrow={ui.adReservedEyebrow}
        placeholderHint={ui.adReservedHint}
      />
      <CommunityBoard
        t={t}
        locale={locale}
        moderationNote={sx.moderationNote}
        filterLangLabel={sx.filterLang}
        filterAllLabel={sx.filterAll}
      />
    </MarketingPageShell>
  );
}
