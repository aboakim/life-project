"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
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

function ensurePushServiceWorker(): void {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  void navigator.serviceWorker.register("/sw.js").catch(() => {
    /* ignore */
  });
}

function injectAllMonetagZones(): void {
  const inPage = monetagInPageZone();
  if (inPage) injectZoneScript(inPage, "https://nap5k.com/tag.min.js");

  for (const zone of monetagExtraZones()) {
    injectZoneScript(zone, "https://nap5k.com/tag.min.js");
  }

  const vignette = monetagVignetteZone();
  if (vignette) injectZoneScript(vignette, "https://n6wxm.com/vignette.min.js");

  const multi = monetagMultitagZone();
  if (multi) injectZoneScript(multi, "https://quge5.com/88/tag.min.js");

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
 * Injects all Monetag formats ASAP after cookie Accept on public pages.
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
      injectAllMonetagZones();
    };

    window.addEventListener(MONETAG_CONSENT_EVENT, tryLoad);
    window.addEventListener("scroll", tryLoad, { passive: true, once: true });
    window.addEventListener("pointerdown", tryLoad, { once: true });

    if (hasAdConsent()) {
      // Next tick — avoid blocking first paint, but don't wait seconds.
      queueMicrotask(tryLoad);
      window.setTimeout(tryLoad, 400);
    }

    return () => {
      cancelled = true;
      window.removeEventListener(MONETAG_CONSENT_EVENT, tryLoad);
      window.removeEventListener("scroll", tryLoad);
      window.removeEventListener("pointerdown", tryLoad);
    };
  }, [pathname]);

  return null;
}
