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
  monetagVignetteZone,
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
 * Loads all Monetag formats (In-Page Push, Vignette, MultiTag) when:
 *  - ads consent is accepted
 *  - path is a content page (not /analyze, /admin, forms)
 *  - after idle (won't fight first paint)
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
            injectZoneScript(inPage, "https://nap5k.com/tag.min.js");
          }

          const vignette = monetagVignetteZone();
          if (vignette) {
            injectZoneScript(vignette, "https://n6wxm.com/vignette.min.js");
          }

          const multi = monetagMultitagZone();
          if (multi) {
            injectZoneScript(multi, "https://quge5.com/88/tag.min.js");
          }
        },
        { idleTimeoutMs: 5000, fallbackDelayMs: 3500 },
      );
    };

    const onConsent = () => tryLoad();
    window.addEventListener(MONETAG_CONSENT_EVENT, onConsent);

    const onScroll = () => {
      if (idleArmed) return;
      idleArmed = true;
      window.setTimeout(tryLoad, 1200);
    };
    window.addEventListener("scroll", onScroll, { passive: true, once: true });

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
