"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { PricingCopy } from "@/lib/i18n/pricing-page";
import { getSiteUrlString } from "@/lib/site-url";

type Props = {
  t: PricingCopy;
  open: boolean;
  onClose: () => void;
  /** Backdrop + panel sit above other modals (e.g. package picker at z-[95]). */
  elevated?: boolean;
};

function IconBox({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

function IconFacebook() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

function IconTelegram() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
      />
    </svg>
  );
}

function IconReddit() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-2.597-.805-.805-.805.805-2.597 2.597a1.25 1.25 0 0 1-1.496.092 1.25 1.25 0 0 1-.554-1.042 1.25 1.25 0 0 1 .302-.832l3.402-3.402a1.25 1.25 0 0 1 1.768 0l3.402 3.402c.24.24.373.562.373.9zm-5.01 4.256c-2.21 0-4.18.93-5.58 2.41-.18.19-.28.45-.28.71 0 .26.1.52.28.71.19.18.45.28.71.28.26 0 .52-.1.71-.28 1.09-1.15 2.62-1.87 4.18-1.87 1.56 0 3.09.72 4.18 1.87.19.18.45.28.71.28.26 0 .52-.1.71-.28.18-.19.28-.45.28-.71 0-.26-.1-.52-.28-.71-1.4-1.48-3.37-2.41-5.58-2.41zm-2.5 4.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm5 0c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"
      />
    </svg>
  );
}

function IconEmail() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
      />
    </svg>
  );
}

function IconLink() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
      />
    </svg>
  );
}

function IconSystemShare() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"
      />
    </svg>
  );
}

export default function SocialShareModal({
  t,
  open,
  onClose,
  elevated = false,
}: Props) {
  const [siteUrl, setSiteUrl] = useState(getSiteUrlString);
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  const zBackdrop = elevated ? "z-[100]" : "z-[95]";
  const zPanel = elevated ? "z-[101]" : "z-[96]";

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
    "inline-flex w-full items-center gap-3 rounded-xl border border-white/12 bg-white/[0.04] px-3 py-2.5 text-sm font-medium text-[rgb(var(--ink))] transition hover:border-white/22 hover:bg-white/[0.08]";

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 ${zBackdrop} flex items-center justify-center p-4`}
      id="premium-share-panel"
      role="dialog"
      aria-modal="true"
      aria-label={t.ctaShare}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close share options"
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
      />
      <div
        className={`relative ${zPanel} w-full max-w-sm rounded-3xl border border-white/15 bg-[rgb(var(--surface))]/95 p-4 shadow-2xl shadow-black/45`}
      >
        <div className="mb-3 flex items-start justify-between gap-2">
          <p className="text-sm font-semibold leading-snug text-[rgb(var(--ink))] [text-wrap:pretty]">
            {t.premiumShareIntro}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg border border-white/15 px-2 py-1 text-xs text-[rgb(var(--ink-soft))] hover:bg-white/10"
          >
            ✕
          </button>
        </div>
        <div className="space-y-2">
          {canNativeShare ? (
            <button type="button" onClick={onNative} className={rowClass}>
              <IconBox className="bg-slate-600 text-white">
                <IconSystemShare />
              </IconBox>
              <span className="flex-1 text-start">{t.shareNative}</span>
              <span aria-hidden className="text-[rgb(var(--ink-soft))]">
                →
              </span>
            </button>
          ) : null}
          <a
            href={urls.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className={rowClass}
          >
            <IconBox className="bg-[#1877F2] text-white">
              <IconFacebook />
            </IconBox>
            <span className="flex-1 text-start">{t.shareFacebook}</span>
            <span aria-hidden className="text-[rgb(var(--ink-soft))]">
              ↗
            </span>
          </a>
          <a
            href={urls.x}
            target="_blank"
            rel="noopener noreferrer"
            className={rowClass}
          >
            <IconBox className="bg-black text-white">
              <IconX />
            </IconBox>
            <span className="flex-1 text-start">{t.shareX}</span>
            <span aria-hidden className="text-[rgb(var(--ink-soft))]">
              ↗
            </span>
          </a>
          <a
            href={urls.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={rowClass}
          >
            <IconBox className="bg-[#0A66C2] text-white">
              <IconLinkedIn />
            </IconBox>
            <span className="flex-1 text-start">{t.shareLinkedIn}</span>
            <span aria-hidden className="text-[rgb(var(--ink-soft))]">
              ↗
            </span>
          </a>
          <a
            href={urls.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={rowClass}
          >
            <IconBox className="bg-[#25D366] text-white">
              <IconWhatsApp />
            </IconBox>
            <span className="flex-1 text-start">{t.shareWhatsApp}</span>
            <span aria-hidden className="text-[rgb(var(--ink-soft))]">
              ↗
            </span>
          </a>
          <a
            href={urls.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className={rowClass}
          >
            <IconBox className="bg-[#26A5E4] text-white">
              <IconTelegram />
            </IconBox>
            <span className="flex-1 text-start">{t.shareTelegram}</span>
            <span aria-hidden className="text-[rgb(var(--ink-soft))]">
              ↗
            </span>
          </a>
          <a
            href={urls.reddit}
            target="_blank"
            rel="noopener noreferrer"
            className={rowClass}
          >
            <IconBox className="bg-[#FF4500] text-white">
              <IconReddit />
            </IconBox>
            <span className="flex-1 text-start">{t.shareReddit}</span>
            <span aria-hidden className="text-[rgb(var(--ink-soft))]">
              ↗
            </span>
          </a>
          <a href={urls.email} className={rowClass}>
            <IconBox className="bg-slate-500 text-white">
              <IconEmail />
            </IconBox>
            <span className="flex-1 text-start">{t.shareEmail}</span>
            <span aria-hidden className="text-[rgb(var(--ink-soft))]">
              ↗
            </span>
          </a>
          <button type="button" onClick={onCopy} className={rowClass}>
            <IconBox className="bg-gradient-to-br from-violet-500 to-teal-500 text-white">
              <IconLink />
            </IconBox>
            <span className="flex-1 text-start">{t.copySiteLink}</span>
            <span aria-hidden className="text-[rgb(var(--ink-soft))]">
              →
            </span>
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
