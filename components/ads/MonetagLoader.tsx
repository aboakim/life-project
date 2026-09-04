"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { isGdprCountry } from "@/lib/ad-geo";
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

function readGeoCookie(): string {
  try {
    const m = document.cookie.match(/(?:^|; )lde-geo=([^;]*)/);
    return m ? decodeURIComponent(m[1] ?? "").toUpperCase().slice(0, 2) : "";
  } catch {
    return "";
  }
}

/** Monetag: blocked only on explicit Reject. Outside GDPR, loads without Accept. */
function canLoadMonetag(): boolean {
  try {
    const v = window.localStorage.getItem(MONETAG_CONSENT_STORAGE_KEY);
    if (v === "rejected") return false;
    if (v === "accepted") return true;
    return !isGdprCountry(readGeoCookie() || null);
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
 * Injects Monetag worldwide after consent rules:
 * - GDPR: only after Accept
 * - US / other: load unless user Rejected
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
      if (!canLoadMonetag()) return;
      if (!isMonetagPathAllowed(window.location.pathname)) return;
      armed.current = true;
      injectAllMonetagZones();
    };

    window.addEventListener(MONETAG_CONSENT_EVENT, tryLoad);
    window.addEventListener("scroll", tryLoad, { passive: true, once: true });
    window.addEventListener("pointerdown", tryLoad, { once: true });

    window.setTimeout(tryLoad, canLoadMonetag() ? 200 : 400);
    queueMicrotask(tryLoad);

    return () => {
      cancelled = true;
      window.removeEventListener(MONETAG_CONSENT_EVENT, tryLoad);
      window.removeEventListener("scroll", tryLoad);
      window.removeEventListener("pointerdown", tryLoad);
    };
  }, [pathname]);

  return null;
}
