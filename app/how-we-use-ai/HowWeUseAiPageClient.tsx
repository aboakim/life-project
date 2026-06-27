"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MarketingPageShell from "@/components/layout/MarketingPageShell";
import { getSiteExtras } from "@/lib/i18n/site-extras";
import {
  isAppLocale,
  type AppLocale,
} from "@/lib/i18n/locale";
import { DEFAULT_LOCALE } from "@/lib/locale-default";
import { readLocaleCookieClient } from "@/lib/locale-cookie";
import { LOCALE_CHANGE_EVENT } from "@/lib/locale-sync";

const LOCALE_KEY = "lde-locale";

export default function HowWeUseAiPageClient() {
  const [locale, setLocale] = useState<AppLocale>(DEFAULT_LOCALE);

  useEffect(() => {
    const raw = window.localStorage.getItem(LOCALE_KEY);
    const fromCookie = readLocaleCookieClient();
    let resolved: AppLocale = DEFAULT_LOCALE;
    if (raw !== null && isAppLocale(raw)) resolved = raw;
    else if (fromCookie !== null) resolved = fromCookie;
    setLocale(resolved);
    if (raw === null || !isAppLocale(raw)) {
      window.localStorage.setItem(LOCALE_KEY, resolved);
    }
  }, []);

  useEffect(() => {
    function sync() {
      const raw = window.localStorage.getItem(LOCALE_KEY);
      if (raw && isAppLocale(raw)) setLocale(raw);
    }
    window.addEventListener(LOCALE_CHANGE_EVENT, sync);
    return () => window.removeEventListener(LOCALE_CHANGE_EVENT, sync);
  }, []);

  const t = getSiteExtras(locale);
  const sections = [
    { h: t.howAiS1h, p: t.howAiS1p },
    { h: t.howAiS2h, p: t.howAiS2p },
    { h: t.howAiS3h, p: t.howAiS3p },
    { h: t.howAiS4h, p: t.howAiS4p },
  ];

  return (
    <MarketingPageShell
      eyebrow={t.navHowAi}
      title={t.howAiTitle}
      subtitle={<p>{t.howAiLead}</p>}
    >
      <div className="max-w-3xl space-y-10 text-[15px] leading-relaxed text-[rgb(var(--ink-soft))]">
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
              {s.h}
            </h2>
            <p className="mt-3 [text-wrap:pretty]">{s.p}</p>
          </section>
        ))}

        <p>
          <Link
            href="/privacy"
            className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            Privacy Policy →
          </Link>
        </p>
        <p>
          <Link
            href="/"
            className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            ← Home
          </Link>
        </p>
      </div>
    </MarketingPageShell>
  );
}
