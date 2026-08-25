"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { LOCALE_CHANGE_EVENT } from "@/lib/locale-sync";

/**
 * Re-fetch server components when the user changes language.
 * No mount-time refresh — HTML already matches the locale cookie from SSR.
 */
export default function LocaleRefreshBridge() {
  const router = useRouter();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onLocaleChange = () => {
      if (timer.current) clearTimeout(timer.current);
      // Debounce: nav + studio may both react to the same change.
      timer.current = setTimeout(() => router.refresh(), 80);
    };
    window.addEventListener(LOCALE_CHANGE_EVENT, onLocaleChange);
    return () => {
      window.removeEventListener(LOCALE_CHANGE_EVENT, onLocaleChange);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [router]);

  return null;
}
