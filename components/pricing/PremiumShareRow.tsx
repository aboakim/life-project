"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { PricingCopy } from "@/lib/i18n/pricing-page";
import { getSiteUrlString } from "@/lib/site-url";

type Props = {
  t: PricingCopy;
  /** Social buttons render only after the user opens Share */
  open: boolean;
};

export default function PremiumShareRow({ t, open }: Props) {
  const [siteUrl, setSiteUrl] = useState(getSiteUrlString);
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(
      typeof navigator !== "undefined" &&
        typeof navigator.share === "function",
    );
    if (process.env.NODE_ENV === "development") {
      setSiteUrl(window.location.origin);
    }
  }, []);

  const fullText = useMemo(
    () => `${t.premiumShareBlurb} ${siteUrl}`.trim(),
    [siteUrl, t.premiumShareBlurb],
  );

  const urls = useMemo(() => {
    const u = encodeURIComponent(siteUrl);
    const title = encodeURIComponent(t.premiumShareBlurb);
    const body = encodeURIComponent(fullText);
    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      x: `https://twitter.com/intent/tweet?text=${body}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      whatsapp: `https://api.whatsapp.com/send?text=${body}`,
      telegram: `https://t.me/share/url?url=${u}&text=${title}`,
      reddit: `https://www.reddit.com/submit?url=${u}&title=${title}`,
      email: `mailto:?subject=${encodeURIComponent(
        t.shareEmailSubject,
      )}&body=${body}`,
    };
  }, [fullText, siteUrl, t.premiumShareBlurb, t.shareEmailSubject]);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [siteUrl]);

  const onNative = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.share) return;
    try {
      await navigator.share({
        title: t.shareEmailSubject,
        text: t.premiumShareBlurb,
        url: siteUrl,
      });
    } catch {
      /* absent or user cancelled */
    }
  }, [siteUrl, t.premiumShareBlurb, t.shareEmailSubject]);

  const linkClass =
    "inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-medium text-[rgb(var(--ink))] transition hover:border-white/20 hover:bg-white/[0.08]";

  if (!open) return null;

  return (
    <div className="mt-4 space-y-3" id="premium-share-panel" role="region">
      <p className="text-xs leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
        {t.premiumShareIntro}
      </p>
      <div className="flex flex-wrap gap-2">
        {canNativeShare ? (
          <button type="button" onClick={onNative} className={linkClass}>
            {t.shareNative}
          </button>
        ) : null}
        <a
          href={urls.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {t.shareFacebook}
        </a>
        <a
          href={urls.x}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {t.shareX}
        </a>
        <a
          href={urls.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {t.shareLinkedIn}
        </a>
        <a
          href={urls.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {t.shareWhatsApp}
        </a>
        <a
          href={urls.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {t.shareTelegram}
        </a>
        <a
          href={urls.reddit}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {t.shareReddit}
        </a>
        <a href={urls.email} className={linkClass}>
          {t.shareEmail}
        </a>
        <button type="button" onClick={onCopy} className={linkClass}>
          {t.copySiteLink}
        </button>
      </div>
      {copied ? (
        <p className="text-xs text-emerald-300/95" role="status">
          {t.siteLinkCopied}
        </p>
      ) : null}
    </div>
  );
}
