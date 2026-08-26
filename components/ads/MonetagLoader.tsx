"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { scheduleIdle } from "@/components/ads/ensure-adsbygoogle";
import {
  MONETAG_CONSENT_EVENT,
  MONETAG_CONSENT_STORAGE_KEY,
  isMonetagPathAllowed,
  monetagEnabled,
  monetagInPageZone,
  monetagMultitagZone,
} from "@/lib/monetag-config";

const LOADED_MARK = "data-lde-monetag-zone";

function hasAdConsent(): boolean {
  try {
    return window.localStorage.getItem(MONETAG_CONSENT_STORAGE_KEY) === "accepted";
  } catch {
    return false;
  }
}

function injectZoneScript(zone: string, src: string): void {
  if (!zone || typeof document === "undefined") return;
  if (document.querySelector(`script[${LOADED_MARK}="${zone}"]`)) return;

  const s = document.createElement("script");
  s.async = true;
  s.dataset.zone = zone;
  s.src = src;
  s.setAttribute(LOADED_MARK, zone);
  document.body.appendChild(s);
}

/**
 * Loads Monetag only when:
 *  - ads consent is accepted
 *  - path is a content page (not /analyze, /admin, forms)
 *  - after idle + short delay (won't fight first paint)
 *
 * Vignette / popunder scripts are intentionally not loaded.
 */
export default function MonetagLoader() {
  const pathname = usePathname() || "/";
  const armed = useRef(false);

  useEffect(() => {
    if (!monetagEnabled()) return;
    if (!isMonetagPathAllowed(pathname)) return;

    let cancelled = false;
    let idleArmed = false;

    const tryLoad = () => {
      if (cancelled || armed.current) return;
      if (!hasAdConsent()) return;
      if (!isMonetagPathAllowed(window.location.pathname)) return;

      armed.current = true;
      scheduleIdle(
        () => {
          if (cancelled) return;
          const inPage = monetagInPageZone();
          if (inPage) {
            // In-Page Push (corner banner) — nap5k host used by Monetag zones.
            injectZoneScript(
              inPage,
              "https://nap5k.com/tag.min.js",
            );
          }
          const multi = monetagMultitagZone();
          if (multi) {
            injectZoneScript(
              multi,
              "https://quge5.com/88/tag.min.js",
            );
          }
        },
        { idleTimeoutMs: 5000, fallbackDelayMs: 3500 },
      );
    };

    const onConsent = () => tryLoad();
    window.addEventListener(MONETAG_CONSENT_EVENT, onConsent);

    // Wait for a bit of scroll so ads don't appear on first paint.
    const onScroll = () => {
      if (idleArmed) return;
      idleArmed = true;
      window.setTimeout(tryLoad, 1200);
    };
    window.addEventListener("scroll", onScroll, { passive: true, once: true });

    // Returning visitors who already consented + scrolled previously.
    if (hasAdConsent()) {
      window.setTimeout(() => {
        if (!idleArmed) tryLoad();
      }, 6000);
    }

    return () => {
      cancelled = true;
      window.removeEventListener(MONETAG_CONSENT_EVENT, onConsent);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
