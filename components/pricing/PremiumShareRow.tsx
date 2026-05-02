"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { PricingCopy } from "@/lib/i18n/pricing-page";
import { getSiteUrlString } from "@/lib/site-url";

type Props = {
  t: PricingCopy;
  /** Social buttons render only after the user opens Share */
  open: boolean;
  onClose: () => void;
};

export default function PremiumShareRow({ t, open, onClose }: Props) {
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

  const rowClass =
    "inline-flex w-full items-center justify-between rounded-xl border border-white/12 bg-white/[0.04] px-3 py-2.5 text-sm font-medium text-[rgb(var(--ink))] transition hover:border-white/20 hover:bg-white/[0.08]";

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center p-4"
      id="premium-share-panel"
      role="region"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close share options"
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
      />
      <div className="relative z-[96] w-full max-w-sm rounded-3xl border border-white/15 bg-[rgb(var(--surface))]/95 p-4 shadow-2xl shadow-black/45">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-[rgb(var(--ink))]">
            {t.premiumShareIntro}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/15 px-2 py-1 text-xs text-[rgb(var(--ink-soft))] hover:bg-white/10"
          >
            ✕
          </button>
        </div>
        <div className="space-y-2">
          {canNativeShare ? (
            <button type="button" onClick={onNative} className={rowClass}>
              <span>[S] {t.shareNative}</span>
              <span aria-hidden>→</span>
            </button>
          ) : null}
          <a href={urls.facebook} target="_blank" rel="noopener noreferrer" className={rowClass}>
            <span>[F] {t.shareFacebook}</span>
            <span aria-hidden>↗</span>
          </a>
          <a href={urls.x} target="_blank" rel="noopener noreferrer" className={rowClass}>
            <span>[X] {t.shareX}</span>
            <span aria-hidden>↗</span>
          </a>
          <a href={urls.linkedin} target="_blank" rel="noopener noreferrer" className={rowClass}>
            <span>[in] {t.shareLinkedIn}</span>
            <span aria-hidden>↗</span>
          </a>
          <a href={urls.whatsapp} target="_blank" rel="noopener noreferrer" className={rowClass}>
            <span>[WA] {t.shareWhatsApp}</span>
            <span aria-hidden>↗</span>
          </a>
          <a href={urls.telegram} target="_blank" rel="noopener noreferrer" className={rowClass}>
            <span>[TG] {t.shareTelegram}</span>
            <span aria-hidden>↗</span>
          </a>
          <a href={urls.reddit} target="_blank" rel="noopener noreferrer" className={rowClass}>
            <span>[R] {t.shareReddit}</span>
            <span aria-hidden>↗</span>
          </a>
          <a href={urls.email} className={rowClass}>
            <span>[Mail] {t.shareEmail}</span>
            <span aria-hidden>↗</span>
          </a>
          <button type="button" onClick={onCopy} className={rowClass}>
            <span>[Link] {t.copySiteLink}</span>
            <span aria-hidden>→</span>
          </button>
        </div>
        {copied ? (
          <p className="mt-3 text-xs text-emerald-300/95" role="status">
            {t.siteLinkCopied}
          </p>
        ) : null}
      </div>
    </div>
  );
}
