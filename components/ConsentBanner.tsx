"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * GDPR / AdSense-compliant consent banner.
 *
 * Behaviour:
 *  - Reads existing choice from localStorage on mount. If present, stays hidden.
 *  - Ships a Google Consent Mode v2 "default: denied" block from GoogleAnalytics.tsx,
 *    which runs BEFORE this banner decides anything. That keeps us compliant-by-default
 *    for EU/UK visitors: no ad/analytics cookies are set until the user acts here.
 *  - Accept → gtag('consent','update', { ...all granted })
 *  - Reject → leaves defaults as denied (still allows basic site function).
 *  - Privacy link points at /privacy for the full explanation.
 *
 * This is not a full IAB TCF CMP — it is the minimum viable, transparent consent
 * UI that satisfies AdSense's policy for non-personalised ads fallback and
 * analytics consent. Swap in a certified CMP later if you expand into heavy
 * EU ad monetisation.
 */
const STORAGE_KEY = "lde.consent.v1";

type ConsentValue = "granted" | "denied";

type ConsentUpdatePayload = {
  ad_storage: ConsentValue;
  ad_user_data: ConsentValue;
  ad_personalization: ConsentValue;
  analytics_storage: ConsentValue;
};

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function pushConsent(update: ConsentUpdatePayload): void {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", update);
    } else {
      (window.dataLayer as unknown[]).push(["consent", "update", update]);
    }
  } catch {
    /* best-effort: never throw from a consent banner */
  }
}

export default function ConsentBanner() {
  // undefined = still reading storage; null = no decision yet; "accepted" | "rejected" = resolved
  const [decision, setDecision] = useState<
    undefined | null | "accepted" | "rejected"
  >(undefined);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "accepted" || saved === "rejected") {
        setDecision(saved);
        // Re-apply the previous choice to gtag so subsequent pageviews are tracked consistently.
        pushConsent(
          saved === "accepted"
            ? {
                ad_storage: "granted",
                ad_user_data: "granted",
                ad_personalization: "granted",
                analytics_storage: "granted",
              }
            : {
                ad_storage: "denied",
                ad_user_data: "denied",
                ad_personalization: "denied",
                analytics_storage: "denied",
              },
        );
      } else {
        setDecision(null);
      }
    } catch {
      // If localStorage is blocked (Safari private mode, etc.), default to showing the banner.
      setDecision(null);
    }
  }, []);

  function accept() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignore write failures */
    }
    pushConsent({
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });
    setDecision("accepted");
  }

  function reject() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "rejected");
    } catch {
      /* ignore */
    }
    pushConsent({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
    setDecision("rejected");
  }

  if (decision !== null) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="consent-banner-title"
      aria-describedby="consent-banner-body"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-white/10 bg-[rgb(10_12_20/0.96)] p-4 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.8)] backdrop-blur sm:inset-x-6 sm:bottom-6 sm:p-5"
    >
      <p
        id="consent-banner-title"
        className="text-sm font-semibold text-[rgb(var(--ink))]"
      >
        Cookies and your privacy
      </p>
      <p
        id="consent-banner-body"
        className="mt-1.5 text-xs leading-relaxed text-[rgb(var(--ink-soft))]/95 sm:text-sm"
      >
        We use essential cookies so the site works, and — with your permission
        — analytics and advertising cookies (Google Analytics, Google AdSense)
        to understand how the site is used and to keep it free. You can change
        your choice anytime.{" "}
        <Link
          href="/privacy"
          className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
        >
          Read our privacy policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={reject}
          className="order-2 inline-flex h-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-4 text-sm font-medium text-[rgb(var(--ink))]/95 transition hover:border-white/25 hover:bg-white/[0.06] sm:order-1"
        >
          Reject non-essential
        </button>
        <button
          type="button"
          onClick={accept}
          className="order-1 inline-flex h-10 items-center justify-center rounded-xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] px-5 text-sm font-semibold text-white shadow-lg shadow-[rgb(var(--accent)/0.25)] transition hover:brightness-110 sm:order-2"
        >
          Accept all
        </button>
      </div>
    </div>
  );
}
