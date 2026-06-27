"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { readLocaleCookieClient } from "@/lib/locale-cookie";
import { DEFAULT_LOCALE } from "@/lib/locale-default";
import { LOCALE_CHANGE_EVENT } from "@/lib/locale-sync";

/** Re-fetch server components when locale cookie changes (no heavy client i18n bundles). */
export default function LocaleRefreshBridge() {
  const router = useRouter();

  useEffect(() => {
    const cookieLocale = readLocaleCookieClient();
    if (cookieLocale && cookieLocale !== DEFAULT_LOCALE) {
      router.refresh();
    }
  }, [router]);

  useEffect(() => {
    const onLocaleChange = () => router.refresh();
    window.addEventListener(LOCALE_CHANGE_EVENT, onLocaleChange);
    return () =>
      window.removeEventListener(LOCALE_CHANGE_EVENT, onLocaleChange);
  }, [router]);

  return null;
}
