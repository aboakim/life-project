"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { scheduleIdle } from "@/components/ads/ensure-adsbygoogle";
import {
  MONETAG_CONSENT_EVENT,
  MONETAG_CONSENT_STORAGE_KEY,
  isMonetagPathAllowed,
  monetagClassicPushScriptSrc,
  monetagClassicPushZone,
  monetagEnabled,
  monetagExtraZones,
  monetagInPageZone,
  monetagMultitagZone,
  monetagOnclickPopunderScriptSrc,
  monetagOnclickPopunderZone,
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
  if (!zone || !src || typeof document === "undefined") return;
  if (document.querySelector(`script[${LOADED_MARK}="${zone}"]`)) return;

  const s = document.createElement("script");
  s.async = true;
  s.dataset.zone = zone;
  s.src = src;
  s.setAttribute(LOADED_MARK, zone);
  document.body.appendChild(s);
}

/** HTTPS Classic Push needs /sw.js (already in public/, zone 11474462). */
function ensurePushServiceWorker(): void {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  void navigator.serviceWorker.register("/sw.js").catch(() => {
    /* ignore — private mode / blocked */
  });
}

function injectAllMonetagZones(): void {
  const inPage = monetagInPageZone();
  if (inPage) {
    injectZoneScript(inPage, "https://nap5k.com/tag.min.js");
  }

  for (const zone of monetagExtraZones()) {
    injectZoneScript(zone, "https://nap5k.com/tag.min.js");
  }

  const vignette = monetagVignetteZone();
  if (vignette) {
    injectZoneScript(vignette, "https://n6wxm.com/vignette.min.js");
  }

  const multi = monetagMultitagZone();
  if (multi) {
    injectZoneScript(multi, "https://quge5.com/88/tag.min.js");
  }

  const pushZone = monetagClassicPushZone();
  if (pushZone) {
    ensurePushServiceWorker();
    injectZoneScript(pushZone, monetagClassicPushScriptSrc());
  }

  const onclickZone = monetagOnclickPopunderZone();
  if (onclickZone) {
    injectZoneScript(onclickZone, monetagOnclickPopunderScriptSrc());
  }
}

/**
 * Loads Monetag on all public pages after cookie consent
 * (In-Page, Excited extras, Vignette, MultiTag, Classic Push, Onclick).
 */
export default function MonetagLoader() {
  const pathname = usePathname() || "/";
  const armed = useRef(false);

  useEffect(() => {
    if (!monetagEnabled()) return;
    if (!isMonetagPathAllowed(pathname)) return;

    let cancelled = false;

    const tryLoad = () => {
      if (cancelled || armed.current) return;
      if (!hasAdConsent()) return;
      if (!isMonetagPathAllowed(window.location.pathname)) return;

      armed.current = true;
      scheduleIdle(
        () => {
          if (cancelled) return;
          injectAllMonetagZones();
        },
        { idleTimeoutMs: 1200, fallbackDelayMs: 800 },
      );
    };

    const onConsent = () => tryLoad();
    window.addEventListener(MONETAG_CONSENT_EVENT, onConsent);

    const onScroll = () => {
      window.setTimeout(tryLoad, 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true, once: true });
    window.addEventListener("pointerdown", tryLoad, { once: true });

    if (hasAdConsent()) {
      window.setTimeout(tryLoad, 900);
    }

    return () => {
      cancelled = true;
      window.removeEventListener(MONETAG_CONSENT_EVENT, onConsent);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", tryLoad);
    };
  }, [pathname]);

  return null;
}
