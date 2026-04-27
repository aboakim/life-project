"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import HeroVisualSlider from "@/components/home/HeroVisualSlider";
import HeroMomentStrips from "@/components/home/HeroMomentStrips";
import HomeSectionNav from "@/components/home/HomeSectionNav";
import RevealOnScroll from "@/components/home/RevealOnScroll";
import AdSenseBanner from "@/components/ads/AdSenseBanner";
import AmbientDriftLayer from "@/components/ui/AmbientDriftLayer";
import ChromeHorizon from "@/components/ui/ChromeHorizon";
import LatticeSheen from "@/components/ui/LatticeSheen";
import OrbDecor from "@/components/ui/OrbDecor";
import TiltPlane from "@/components/ui/TiltPlane";
import { getExpertsCopy } from "@/lib/i18n/experts-network";
import { getPricingCopy } from "@/lib/i18n/pricing-page";
import type { DecisionAnalysis, MatchedExpertSummary } from "@/lib/types";
import { roleLabel, type ExpertRoleKey } from "@/lib/i18n/experts-network";
import {
  LOCALE_OPTIONS,
  type AppLocale,
  isAppLocale,
  isRtlLocale,
} from "@/lib/i18n/locale";
import { getUi } from "@/lib/i18n/ui";
import { DEFAULT_LOCALE } from "@/lib/locale-default";
import {
  readLocaleCookieClient,
  syncLocaleCookieClient,
} from "@/lib/locale-cookie";
import {
  HERO_SLIDE_IMAGE_URLS,
  PRODUCT_STRIP_IMAGE_URLS,
} from "@/lib/home/hero-slide-images";
import { getDecisionBriefCopy } from "@/lib/i18n/decision-brief";
import {
  LOCALE_CHANGE_EVENT,
  dispatchLocaleChanged,
} from "@/lib/locale-sync";
import type { InitialPreset } from "@/components/home/DecisionStudioShell";
import { getHomeThematicBands } from "@/lib/i18n/home-thematic-bands";
import {
  getDelightCopy,
  milestoneMessage,
} from "@/lib/i18n/delight-extras";
import { getSiteExtras, getWarmPresets } from "@/lib/i18n/site-extras";
import { getNoveltyCopy } from "@/lib/i18n/novelty-extras";
import {
  THEMATIC_BAND_A_IMAGE,
  THEMATIC_BAND_B_IMAGE,
} from "@/lib/home/thematic-banners";
import { getPostAnalysisCopy } from "@/lib/i18n/post-analysis";
import { getSolveSectionCopy } from "@/lib/i18n/home-solve-section";
import {
  getAtAGlanceShortLines,
  getHowShortLines,
  getTrustShortLines,
} from "@/lib/i18n/home-visual-captions";
import { getVisualStoryImage } from "@/lib/home/visual-story-images";
import {
  pushHistory,
  isReminderDue,
  clearReminder,
} from "@/lib/analysis-local";
import { safeDecisionAnalysis } from "@/lib/safe-decision-analysis";
import { getStoredSubscriberId } from "@/lib/reminder-subscriber-storage";
import { buildAnalysisSpeechText } from "@/lib/tts-build-report-text";
import VoiceDictateButton from "@/components/home/VoiceDictateButton";
import VoiceWhisperButton from "@/components/home/VoiceWhisperButton";
import ReadAloudReportButton from "@/components/home/ReadAloudReportButton";

const KonamiSurprise = dynamic(
  () => import("@/components/home/KonamiSurprise"),
  { ssr: false, loading: () => null },
);
const ShortcutsHelpModal = dynamic(
  () => import("@/components/home/ShortcutsHelpModal"),
  { ssr: false, loading: () => null },
);

const WelcomeModal = dynamic(() => import("@/components/home/WelcomeModal"), {
  ssr: false,
  loading: () => null,
});
const PreAnalysisEmailModal = dynamic(
  () => import("@/components/home/PreAnalysisEmailModal"),
  { ssr: false, loading: () => null },
);
const WhatItFixesSection = dynamic(
  () => import("@/components/home/WhatItFixesSection"),
);
const ThematicImageBand = dynamic(
  () => import("@/components/home/ThematicImageBand"),
);
const ProductSceneStrip = dynamic(
  () => import("@/components/home/ProductSceneStrip"),
);
const VisualStoryCard = dynamic(
  () => import("@/components/home/VisualStoryCard"),
);

const DecisionBriefWizard = dynamic(
  () => import("@/components/home/DecisionBriefWizard"),
  {
    loading: () => (
      <div
        className="min-h-[10rem] rounded-2xl border border-white/[0.08] bg-white/[0.03]"
        aria-hidden
      />
    ),
  },
);
const AnalysisResultTools = dynamic(
  () => import("@/components/home/AnalysisResultTools"),
);
const SparkShuffleStrip = dynamic(
  () => import("@/components/home/SparkShuffleStrip"),
);
const PlayCorner = dynamic(() => import("@/components/home/PlayCorner"), {
  ssr: false,
});
const TimeCapsuleCard = dynamic(
  () => import("@/components/home/TimeCapsuleCard"),
);
const BriefSignatureStrip = dynamic(
  () => import("@/components/home/BriefSignatureStrip"),
);

const LOCALE_STORAGE_KEY = "lde-locale";
const VISIT_COUNT_KEY = "lde-home-visits";
const VISITOR_BANNER_DISMISS_KEY = "lde-visitor-path-dismissed";

type ApiResponse = {
  analysis: DecisionAnalysis;
  mode: "live" | "demo" | "fallback";
  hint?: string;
  warning?: string;
  matchedExperts?: MatchedExpertSummary[];
};

const NO_MATCHED_EXPERTS: MatchedExpertSummary[] = [];

const DIRECTORY_ROLE_OPTIONS: ExpertRoleKey[] = [
  "PSYCHOLOGIST",
  "LAWYER",
  "FINANCIAL",
  "PHYSICIAN",
  "COACH",
  "IMMIGRATION",
];

function buildExpertsNeedsHref(
  pick: ExpertRoleKey | "UNSURE",
  decisionText: string,
): string {
  const q = decisionText.trim().slice(0, 200);
  if (pick === "UNSURE") {
    return q ? `/experts?q=${encodeURIComponent(q)}` : "/experts";
  }
  const base = `/experts?role=${encodeURIComponent(pick)}`;
  return q ? `${base}&q=${encodeURIComponent(q)}` : base;
}

function previewHref(
  section: "workspace" | "product" | "language"
): string {
  const m = {
    workspace: "section-workspace",
    product: "section-product",
    language: "section-language",
  } as const;
  return `#${m[section]}`;
}

function ScoreCircle({
  score,
  sublabel,
}: {
  score: number;
  sublabel: string;
}) {
  const pct = Math.min(100, Math.max(0, score));
  return (
    <div
      className="relative mx-auto size-44 rounded-full p-[3px] score-ring shadow-[0_0_60px_-12px_rgb(var(--glow))]"
      style={{ "--score": pct } as React.CSSProperties}
    >
      <div className="flex size-full items-center justify-center rounded-full bg-[rgb(var(--surface))]">
        <div className="text-center">
          <div className="text-4xl font-bold tabular-nums text-gradient">
            {pct}%
          </div>
          <div className="mt-1 px-2 text-[11px] leading-snug text-[rgb(var(--ink-soft))]">
            {sublabel}
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = { initialPreset?: InitialPreset; focusLayout?: boolean };

export default function DecisionStudio({
  initialPreset = null,
  focusLayout = false,
}: Props) {
  const [locale, setLocale] = useState<AppLocale>(DEFAULT_LOCALE);
  const t = getUi(locale);
  const sx = getSiteExtras(locale);
  const warmPresets = useMemo(() => getWarmPresets(locale), [locale]);
  const pa = useMemo(() => getPostAnalysisCopy(locale), [locale]);
  const delight = useMemo(() => getDelightCopy(locale), [locale]);
  const novelty = useMemo(() => getNoveltyCopy(locale), [locale]);
  const presetApplied = useRef(false);
  const exNav = getExpertsCopy(locale);
  const homeBands = useMemo(() => getHomeThematicBands(locale), [locale]);
  const solveCopy = useMemo(() => getSolveSectionCopy(locale), [locale]);
  const atAGlanceShort = useMemo(
    () => getAtAGlanceShortLines(locale),
    [locale],
  );
  const trustShort = useMemo(() => getTrustShortLines(locale), [locale]);
  const howShort = useMemo(() => getHowShortLines(locale), [locale]);
  const pr = getPricingCopy(locale);
  const brief = getDecisionBriefCopy(locale);
  const rtl = isRtlLocale(locale);

  const sectionLinks = useMemo(
    () => [
      { id: "section-overview" as const, label: t.sectionNavOverview },
      { id: "section-what-it-fixes" as const, label: t.sectionNavFixes },
      { id: "section-product" as const, label: t.sectionNavProduct },
      { id: "section-trust" as const, label: t.sectionNavTrust },
      { id: "section-how" as const, label: t.sectionNavHow },
      { id: "section-workspace" as const, label: t.sectionNavAnalyzer },
      { id: "section-language" as const, label: t.sectionNavLanguage },
      { id: "section-privacy" as const, label: t.sectionNavPrivacy },
    ],
    [t]
  );

  useEffect(() => {
    const raw = localStorage.getItem(LOCALE_STORAGE_KEY);
    const fromCookie = readLocaleCookieClient();
    let resolved: AppLocale = DEFAULT_LOCALE;
    if (raw !== null && isAppLocale(raw)) {
      resolved = raw;
    } else if (fromCookie !== null) {
      resolved = fromCookie;
    }
    setLocale(resolved);
    if (raw === null || !isAppLocale(raw)) {
      localStorage.setItem(LOCALE_STORAGE_KEY, resolved);
    }
  }, []);

  useEffect(() => {
    function syncFromNav() {
      const raw = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (raw && isAppLocale(raw)) setLocale(raw);
    }
    window.addEventListener(LOCALE_CHANGE_EVENT, syncFromNav);
    return () => window.removeEventListener(LOCALE_CHANGE_EVENT, syncFromNav);
  }, []);

  const [visitorBannerOpen, setVisitorBannerOpen] = useState(false);
  const [decisionReminderBanner, setDecisionReminderBanner] = useState(false);
  const [decision, setDecision] = useState("");
  const [context, setContext] = useState("");
  const [constraints, setConstraints] = useState("");
  const [stakesLevel, setStakesLevel] = useState(5);
  const [loading, setLoading] = useState(false);
  const [preAnalysisEmailOpen, setPreAnalysisEmailOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [expertNeedsPick, setExpertNeedsPick] = useState<
    ExpertRoleKey | "UNSURE" | null
  >(null);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [visitMilestoneN, setVisitMilestoneN] = useState<number | null>(null);
  const [whisperAvailable, setWhisperAvailable] = useState(false);
  /** Defer welcome modal until idle so LCP can paint hero first (mobile PSI). */
  const [deferWelcomeMount, setDeferWelcomeMount] = useState(false);
  /** Defer Orb / drift / lattice until idle — reduces TBT on desktop PSI and paint cost on mobile. */
  const [showAmbientLayers, setShowAmbientLayers] = useState(false);

  useLayoutEffect(() => {
    if (focusLayout) {
      setShowAmbientLayers(true);
      return;
    }
    const narrow = window.matchMedia("(max-width: 767.98px)").matches;
    /** Desktop: show mesh/orbs immediately for a snappy, polished feel. */
    if (!narrow) {
      setShowAmbientLayers(true);
      return;
    }
    const w = window as Window & {
      requestIdleCallback?: (
        cb: IdleRequestCallback,
        opts?: IdleRequestOptions,
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(() => setShowAmbientLayers(true), {
        timeout: 3400,
      });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setShowAmbientLayers(true), 2600);
    return () => window.clearTimeout(t);
  }, [focusLayout]);

  useEffect(() => {
    let cancel = false;
    const narrow =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767.98px)").matches;
    const runFetch = () => {
      fetch("/api/speech/available")
        .then((r) => r.json() as Promise<{ whisper?: boolean }>)
        .then((data) => {
          if (!cancel && data.whisper) setWhisperAvailable(true);
        })
        .catch(() => {
          /* ignore */
        });
    };
    const w = window as Window & {
      requestIdleCallback?: (
        cb: IdleRequestCallback,
        opts?: IdleRequestOptions,
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    const idleMs = narrow ? 6500 : 1200;
    const fallbackMs = narrow ? 3200 : 700;
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(
        () => {
          if (!cancel) runFetch();
        },
        { timeout: idleMs },
      );
      return () => {
        cancel = true;
        w.cancelIdleCallback?.(id);
      };
    }
    const t = window.setTimeout(() => {
      if (!cancel) runFetch();
    }, fallbackMs);
    return () => {
      cancel = true;
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (focusLayout) {
      setDeferWelcomeMount(true);
      return;
    }
    /**
     * Gate on `window.load` so LCP is almost always hero / hero image first — the
     * welcome dialog was stealing LCP and main-thread budget in PSI (desktop & mobile).
     * After load, short boot delay + idle so the chunk hydrates off the critical path.
     */
    let cancelled = false;
    let bootTimer: number | undefined;
    let idleHandle: number | undefined;
    let fallbackTimer: number | undefined;

    const clearScheduled = () => {
      if (bootTimer != null) window.clearTimeout(bootTimer);
      if (fallbackTimer != null) window.clearTimeout(fallbackTimer);
      const w = window as Window & {
        cancelIdleCallback?: (handle: number) => void;
      };
      if (idleHandle != null) {
        if (typeof w.cancelIdleCallback === "function") {
          w.cancelIdleCallback(idleHandle);
        } else {
          window.clearTimeout(idleHandle);
        }
      }
    };

    const armWelcomeAfterLoad = () => {
      if (cancelled) return;
      const narrow = window.matchMedia("(max-width: 767.98px)").matches;
      /** Mobile: long defer for PSI (LCP/TBT). Desktop: snappy after load. */
      const bootDelayMs = narrow ? 920 : 40;
      const idleTimeoutMs = narrow ? 5600 : 520;

      bootTimer = window.setTimeout(() => {
        if (cancelled) return;
        const w = window as Window & {
          requestIdleCallback?: (
            cb: IdleRequestCallback,
            opts?: IdleRequestOptions,
          ) => number;
        };
        if (typeof w.requestIdleCallback === "function") {
          idleHandle = w.requestIdleCallback(
            () => {
              if (!cancelled) setDeferWelcomeMount(true);
            },
            { timeout: idleTimeoutMs },
          );
        } else {
          fallbackTimer = window.setTimeout(
            () => {
              if (!cancelled) setDeferWelcomeMount(true);
            },
            narrow ? 1500 : 180,
          );
        }
      }, bootDelayMs);
    };

    const onLoad = () => armWelcomeAfterLoad();

    if (document.readyState === "complete") {
      armWelcomeAfterLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      cancelled = true;
      clearScheduled();
      window.removeEventListener("load", onLoad);
    };
  }, [focusLayout]);

  useEffect(() => {
    if (focusLayout) return;
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const scrollToTarget = () => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    scrollToTarget();
    const t1 = window.setTimeout(scrollToTarget, 120);
    const t2 = window.setTimeout(scrollToTarget, 450);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [focusLayout]);

  useEffect(() => {
    try {
      const prev = parseInt(
        window.localStorage.getItem(VISIT_COUNT_KEY) ?? "0",
        10
      );
      const next = Number.isFinite(prev) ? prev + 1 : 1;
      window.localStorage.setItem(VISIT_COUNT_KEY, String(next));
      if ([5, 10, 25, 50, 100].includes(next)) {
        const seen = window.localStorage.getItem(`lde-ms-seen-${next}`) === "1";
        if (!seen) setVisitMilestoneN(next);
      }
      const dismissed =
        window.localStorage.getItem(VISITOR_BANNER_DISMISS_KEY) === "1";
      if (next >= 3 && !dismissed) setVisitorBannerOpen(true);
    } catch {
      /* ignore */
    }
  }, []);

  const dismissVisitMilestone = useCallback(() => {
    if (visitMilestoneN != null) {
      try {
        window.localStorage.setItem(`lde-ms-seen-${visitMilestoneN}`, "1");
      } catch {
        /* ignore */
      }
    }
    setVisitMilestoneN(null);
  }, [visitMilestoneN]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (preAnalysisEmailOpen) return;
      const el = e.target;
      if (
        el instanceof HTMLElement &&
        el.closest("textarea, input, select, [contenteditable=true]")
      ) {
        return;
      }
      if (e.key === "Escape" && shortcutsOpen) {
        e.preventDefault();
        setShortcutsOpen(false);
        return;
      }
      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setShortcutsOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [preAnalysisEmailOpen, shortcutsOpen]);

  useEffect(() => {
    try {
      if (isReminderDue()) setDecisionReminderBanner(true);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!initialPreset || presetApplied.current) return;
    const pack = warmPresets[initialPreset];
    setDecision(pack.decision);
    setContext(pack.context);
    setConstraints(pack.constraints);
    presetApplied.current = true;
  }, [initialPreset, warmPresets]);

  useEffect(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    syncLocaleCookieClient(locale);
    document.documentElement.lang = locale;
    document.documentElement.setAttribute(
      "dir",
      isRtlLocale(locale) ? "rtl" : "ltr"
    );
    dispatchLocaleChanged();
  }, [locale]);

  const demoMode =
    typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_DEMO_MODE === "1";

  const canSubmit = useMemo(() => decision.trim().length > 0, [decision]);
  const formBusy = loading || preAnalysisEmailOpen;

  const runAnalysis = useCallback(async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          decision,
          context,
          constraints,
          language: locale,
          stakesLevel,
        }),
      });
      const data = (await res.json()) as ApiResponse;
      if (!res.ok) {
        setError(t.networkError);
        return;
      }
      const analysis = safeDecisionAnalysis(data.analysis);
      setResult({
        ...data,
        analysis,
      });
      try {
        pushHistory({
          decision,
          context,
          constraints,
          stakesLevel,
          analysis,
          mode: data.mode,
        });
      } catch {
        /* ignore */
      }
      setTimeout(() => {
        document.getElementById("section-results")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    } catch {
      setError(t.networkError);
    } finally {
      setLoading(false);
    }
  }, [canSubmit, context, constraints, decision, locale, stakesLevel, t]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    if (!getStoredSubscriberId()) {
      setPreAnalysisEmailOpen(true);
      return;
    }
    void runAnalysis();
  }

  const a = result?.analysis;
  const matchedExperts = result?.matchedExperts ?? NO_MATCHED_EXPERTS;

  const workspaceGreeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return delight.greetingMorning;
    if (h < 18) return delight.greetingAfternoon;
    return delight.greetingEvening;
  }, [delight]);

  const resultCheerLine = useMemo(() => {
    if (!a) return null;
    const sum = a.summary?.length ?? 0;
    const idx = (decision.length + sum) % delight.resultCheers.length;
    return delight.resultCheers[idx] ?? null;
  }, [a, decision, delight]);

  const voiceLabels = useMemo(
    () => ({
      dictate: t.voiceDictate,
      listening: t.voiceListening,
      stop: t.voiceStop,
      notSupported: t.voiceNotSupported,
    }),
    [t]
  );

  const whisperLabels = useMemo(
    () => ({
      start: t.voiceWhisperStart,
      stop: t.voiceWhisperStop,
      working: t.voiceWhisperWorking,
      error: t.voiceWhisperError,
      needMic: t.voiceWhisperNeedMic,
    }),
    [t]
  );

  const armenianBrowserSttMessage =
    locale === "hy" ? t.voiceSttArmenianUseCloud : undefined;

  const readAloudText = useMemo(
    () =>
      a
        ? buildAnalysisSpeechText(a, t, locale, {
            experts: matchedExperts,
          })
        : "",
    [a, t, locale, matchedExperts]
  );

  useEffect(() => {
    if (!a) return;
    const id = window.setTimeout(() => {
      try {
        document
          .getElementById("results-main-heading")
          ?.focus({ preventScroll: true });
      } catch {
        /* some mobile WebKit builds throw on focus() */
      }
    }, 420);
    return () => clearTimeout(id);
  }, [a]);

  useEffect(() => {
    setExpertNeedsPick(null);
  }, [result]);

  const expertsSearchHref = useMemo(() => {
    const q = decision.trim().slice(0, 160);
    return q ? `/experts?q=${encodeURIComponent(q)}` : "/experts";
  }, [decision]);

  const heroSlideDeck = useMemo(() => {
    const n = Math.min(
      HERO_SLIDE_IMAGE_URLS.length,
      t.heroSlides.length
    );
    return Array.from({ length: n }, (_, i) => ({
      src: HERO_SLIDE_IMAGE_URLS[i]!,
      alt: t.heroSlides[i]!.alt,
      caption: t.heroSlides[i]!.caption,
    }));
  }, [t.heroSlides]);

  const scrollToAnalyzer = useCallback(() => {
    window.setTimeout(() => {
      document.getElementById("analyzer")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.setTimeout(() => {
        document.getElementById("decision-input")?.focus({ preventScroll: true });
      }, 450);
    }, 30);
  }, []);

  const loadBriefFromHistory = useCallback(
    (d: string, ctx: string, cons: string, stakes?: number) => {
      setDecision(d);
      setContext(ctx);
      setConstraints(cons);
      if (typeof stakes === "number" && stakes >= 1 && stakes <= 10) {
        setStakesLevel(stakes);
      }
      window.setTimeout(() => scrollToAnalyzer(), 40);
    },
    [scrollToAnalyzer],
  );

  return (
    <div
      className="relative z-10 min-h-screen"
      style={
        rtl
          ? { fontFamily: "var(--font-ar), var(--font-noto), sans-serif" }
          : undefined
      }
    >
      {deferWelcomeMount ? (
        <WelcomeModal locale={locale} onLocaleChange={setLocale} />
      ) : null}
      <PreAnalysisEmailModal
        open={preAnalysisEmailOpen}
        onClose={() => setPreAnalysisEmailOpen(false)}
        onComplete={() => {
          setPreAnalysisEmailOpen(false);
          void runAnalysis();
        }}
        pa={pa}
        locale={locale}
      />
      <ShortcutsHelpModal
        open={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
        copy={delight}
      />
      <KonamiSurprise copy={delight} />
      {showAmbientLayers ? <OrbDecor /> : null}
      {showAmbientLayers ? <AmbientDriftLayer /> : null}
      {!focusLayout && showAmbientLayers ? <LatticeSheen /> : null}
      {!focusLayout ? (
        <div className="relative z-[8] mx-auto max-w-6xl px-4 sm:px-6">
          <ChromeHorizon className="pt-1" />
        </div>
      ) : null}
      <HomeSectionNav
        links={sectionLinks}
        navAriaLabel={t.homeSectionNavAria}
        jumpLabel={t.homeSectionJumpLabel}
        jumpPlaceholder={t.homeSectionJumpPlaceholder}
      />

      {demoMode ? (
        <div className="pointer-events-none fixed start-3 end-3 top-[4.75rem] z-[30] max-w-none rounded-xl border border-white/12 bg-white/[0.06] px-3 py-2 text-center text-[11px] font-medium leading-snug text-[rgb(var(--ink-soft))] shadow-lg backdrop-blur-md sm:start-auto sm:end-4 sm:top-[4.5rem] sm:max-w-[min(100%,20rem)] sm:text-start sm:text-xs">
          {sx.demoBadge}
        </div>
      ) : null}

      {visitorBannerOpen ? (
        <div
          className="relative z-[45] mx-auto max-w-6xl px-4 pt-4 sm:px-6"
          role="region"
          aria-label={sx.visitorTitle}
        >
          <div className="flex flex-col gap-3 rounded-2xl border border-[rgb(var(--accent-2))]/35 bg-gradient-to-br from-[rgb(var(--accent))]/14 via-white/[0.06] to-transparent px-4 py-4 shadow-[0_20px_60px_-40px_rgb(var(--accent)/0.5)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[rgb(var(--accent-2))]">
                {sx.visitorEyebrow}
              </p>
              <p className="mt-1 font-display text-base font-semibold text-[rgb(var(--ink))]">
                {sx.visitorTitle}
              </p>
              <ol className="mt-2 list-decimal space-y-1 ps-5 text-sm text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
                <li>{sx.visitorStep1}</li>
                <li>{sx.visitorStep2}</li>
                <li>{sx.visitorStep3}</li>
              </ol>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-xl border border-white/15 bg-white/[0.08] px-4 py-2 text-sm font-semibold text-[rgb(var(--ink))] transition hover:bg-white/[0.12]"
              onClick={() => {
                try {
                  window.localStorage.setItem(VISITOR_BANNER_DISMISS_KEY, "1");
                } catch {
                  /* ignore */
                }
                setVisitorBannerOpen(false);
              }}
            >
              {sx.visitorDismiss}
            </button>
          </div>
        </div>
      ) : null}

      {decisionReminderBanner ? (
        <div
          className="relative z-[44] mx-auto max-w-6xl px-4 pt-3 sm:px-6"
          role="region"
        >
          <div className="flex flex-col gap-2 rounded-2xl border border-cyan-400/25 bg-cyan-500/[0.08] px-4 py-3 text-sm text-cyan-50/95 sm:flex-row sm:items-center sm:justify-between">
            <p className="[text-wrap:pretty]">{pa.reminderBanner}</p>
            <button
              type="button"
              className="shrink-0 rounded-xl border border-white/15 bg-white/[0.08] px-3 py-1.5 text-xs font-semibold text-[rgb(var(--ink))]"
              onClick={() => {
                try {
                  clearReminder();
                } catch {
                  /* ignore */
                }
                setDecisionReminderBanner(false);
              }}
            >
              {pa.reminderDismiss}
            </button>
          </div>
        </div>
      ) : null}

      <div
        className={
          focusLayout
            ? "mx-auto max-w-6xl px-4 pb-20 pt-4 sm:px-6 sm:pt-6"
            : "mx-auto max-w-6xl max-md:pb-40 px-4 pb-32 pt-6 sm:px-6 sm:pt-8"
        }
      >
        {focusLayout && (
          <section
            className="mb-8 rounded-[1.75rem] border-2 border-[rgb(var(--accent))]/40 bg-gradient-to-br from-[rgb(var(--accent))]/[0.12] via-white/[0.08] to-white/[0.02] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_24px_80px_-32px_rgb(var(--accent)/0.45)] sm:p-7"
            aria-labelledby="analyze-focus-h"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent-2))]">
              {t.sectionNavAnalyzer}
            </p>
            <h1
              id="analyze-focus-h"
              className="font-display mt-2 text-[clamp(1.45rem,1.1rem+1.6vw,2.1rem)] font-extrabold tracking-tight text-[rgb(var(--ink))] [text-wrap:balance]"
            >
              {t.analyzePageTitle}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
              {t.analyzePageSubtitle}
            </p>
            <p className="mt-4">
              <Link
                href="/"
                className="text-sm font-semibold text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
              >
                ← {t.analyzeBackHome}
              </Link>
            </p>
            <nav
              className="mt-5 rounded-2xl border border-white/[0.12] bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-3 sm:p-4"
              aria-label={t.langLabel}
            >
              <p className="mb-2 text-xs font-medium text-[rgb(var(--ink-soft))]">
                {t.langLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {LOCALE_OPTIONS.map((opt) => {
                  const active = locale === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setLocale(opt.value)}
                      className={
                        active
                          ? "rounded-xl border border-[rgb(var(--accent))]/50 bg-gradient-to-r from-[rgb(var(--accent))]/25 to-[rgb(var(--accent-2))]/18 px-3 py-2 text-sm font-semibold text-white shadow-[0_0_24px_-8px_rgb(var(--accent))]"
                          : "rounded-xl border border-white/[0.12] bg-white/[0.06] px-3 py-2 text-sm text-[rgb(var(--ink-soft))] transition hover:border-[rgb(var(--accent-2))]/30 hover:bg-white/[0.1] hover:text-[rgb(var(--ink))]"
                      }
                    >
                      <span className="me-1.5 opacity-90" aria-hidden>
                        {opt.flag}
                      </span>
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </nav>
            <nav
              className="mt-5 rounded-2xl border border-white/[0.1] bg-black/25 p-4"
              aria-labelledby="analyze-tools-heading"
            >
              <p
                id="analyze-tools-heading"
                className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[rgb(var(--accent-warm))]/90"
              >
                {novelty.analyzeToolsEyebrow}
              </p>
              <ol className="mt-3 list-decimal space-y-2.5 ps-4 text-sm leading-relaxed text-[rgb(var(--ink-soft))] marker:font-semibold marker:text-[rgb(var(--accent-2))]">
                <li>
                  <Link
                    href="/field-notes"
                    className="font-semibold text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                  >
                    {novelty.analyzeToolFieldNotes}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/journal"
                    className="font-semibold text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                  >
                    {novelty.analyzeToolJournal}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/checklists"
                    className="font-semibold text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                  >
                    {novelty.analyzeToolChecklists}
                  </Link>
                </li>
              </ol>
            </nav>
          </section>
        )}

        {!focusLayout && (
        <>
        {/* Hero — split layout like leading SaaS landings */}
        <section
          id="section-hero"
          className="home-section-wash home-section-wash--hero animate-fade-up relative overflow-hidden rounded-[1.75rem] border border-white/[0.16] bg-gradient-to-br from-white/[0.1] via-white/[0.05] to-[rgb(var(--surface-elevated))]/55 p-4 shadow-[0_28px_80px_-48px_rgb(var(--accent)/0.35),0_0_0_1px_rgba(255,255,255,0.1)_inset] backdrop-blur-sm sm:rounded-[2.5rem] sm:p-10 lg:p-14"
        >
          <div className="pointer-events-none absolute inset-y-10 start-3 w-[5px] rounded-full bg-gradient-to-b from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] opacity-90 shadow-[0_0_20px_rgb(var(--accent)/0.4)] sm:start-5 sm:w-1.5" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgb(var(--accent)/0.1),transparent_40%,rgb(var(--accent-2)/0.07),transparent_60%,rgb(var(--accent-magenta)/0.08))]" />
          <div className="grid-view pointer-events-none absolute inset-0 opacity-[0.5]" />
          <div className="relative grid gap-12 ps-4 sm:ps-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,400px)] lg:items-center lg:ps-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.22] bg-white/[0.11] px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[rgb(var(--ink))] shadow-[0_0_32px_-10px_rgb(var(--accent)/0.45),inset_0_1px_0_0_rgba(255,255,255,0.12)] ring-1 ring-[rgb(var(--accent))]/15 backdrop-blur-sm motion-safe:transition motion-safe:duration-500 motion-safe:hover:ring-[rgb(var(--accent-2))]/25 sm:text-xs">
                <span className="motion-safe:animate-pulse-soft size-2.5 rounded-full bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] shadow-[0_0_16px_rgb(var(--accent)/0.6)]" />
                {t.brand}
              </div>
              <p className="mt-6 text-sm font-semibold leading-snug text-[rgb(var(--accent-2))] [text-wrap:balance] sm:text-base">
                {t.heroRibbon}
              </p>
              <h1 className="font-display mt-5 text-[clamp(2.1rem,1.15rem+4vw,4rem)] font-extrabold leading-[1.02] tracking-tight [text-wrap:balance]">
                <span className="text-[rgb(var(--ink))]">{t.heroLine1}</span>{" "}
                <span className="text-gradient">{t.heroAccent}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty] md:text-xl md:leading-relaxed">
                {t.subtitle}
              </p>
              <HeroMomentStrips
                stayEyebrow={sx.stayStripEyebrow}
                stayMoments={sx.stayMoments}
                labEyebrow={sx.labStripEyebrow}
                labMoments={sx.labMoments}
              />
              <div className="mt-6 flex flex-wrap gap-2.5">
                {t.features.map((f) => (
                  <span
                    key={f}
                    className="chip-interactive rounded-full border border-white/[0.14] bg-white/[0.07] px-4 py-2 text-sm font-medium text-[rgb(var(--ink))]"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <TiltPlane
                  className="inline-flex min-h-[52px] w-full min-w-[min(100%,18rem)] sm:w-auto"
                  innerClassName="rounded-2xl"
                  maxTilt={9}
                  floatZ={10}
                >
                  <Link
                    href="/analyze"
                    className="inline-flex min-h-[52px] min-w-[min(100%,18rem)] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] px-10 py-4 text-lg font-bold text-white shadow-xl shadow-[rgb(var(--accent)/0.3)] transition hover:brightness-110"
                  >
                    {t.heroCtaPrimary}
                    <span aria-hidden>→</span>
                  </Link>
                </TiltPlane>
                <Link
                  href="/experts"
                  className="btn-extrude-3d inline-flex items-center justify-center gap-2 rounded-2xl border border-white/[0.18] bg-white/[0.07] px-8 py-3.5 text-base font-bold text-[rgb(var(--ink))] transition-colors hover:bg-white/[0.12]"
                >
                  {t.heroCtaSecondary}
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 text-base font-semibold text-[rgb(var(--accent-warm))] underline-offset-4 hover:underline"
                >
                  {pr.navPricing}
                </Link>
              </div>
            </div>

            <div className="relative space-y-5">
              <div className="absolute -inset-4 -z-10 rounded-[1.75rem] bg-gradient-to-br from-[rgb(var(--accent))]/14 via-[rgb(var(--accent-magenta))]/8 to-[rgb(var(--accent-2))]/12 blur-xl" />
              <TiltPlane
                className="block w-full"
                innerClassName="space-y-5"
                maxTilt={7}
                floatZ={14}
              >
                <HeroVisualSlider slides={heroSlideDeck} />
                <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-[rgb(var(--surface-2))]/90 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                  <span className="text-xs font-semibold text-[rgb(var(--ink))]">
                    {t.previewCardTitle}
                  </span>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-200/95">
                    Live
                  </span>
                </div>
                <div className="space-y-0 divide-y divide-white/[0.06] p-2">
                  {t.previewRows.map((row) => (
                    <a
                      key={row.label}
                      href={previewHref(row.section)}
                      className="flex items-center justify-between gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-white/[0.04]"
                    >
                      <span className="text-xs text-[rgb(var(--ink-soft))]">
                        {row.label}
                      </span>
                      <span className="text-sm font-semibold text-[rgb(var(--ink))]">
                        {row.value}
                      </span>
                    </a>
                  ))}
                </div>
                <div className="border-t border-white/[0.12] bg-white/[0.06] px-4 py-3">
                  <p className="text-[11px] leading-relaxed text-[rgb(var(--ink-soft))]">
                    {exNav.homePromoLink}
                  </p>
                  <Link
                    href="/experts"
                    className="mt-2 inline-flex text-xs font-semibold text-[rgb(var(--accent-2))] hover:underline"
                  >
                    {exNav.navExperts} →
                  </Link>
                </div>
              </div>
              </TiltPlane>
            </div>
          </div>
        </section>

        {!focusLayout ? (
          <>
            <TiltPlane
              className="mt-6 block w-full"
              innerClassName="rounded-2xl"
              maxTilt={5}
              floatZ={8}
            >
              <div className="home-section-wash grid gap-3 rounded-2xl border border-white/[0.12] bg-[rgb(var(--surface-elevated))]/60 px-4 py-4 sm:px-6 sm:py-5">
                <p className="m-0 text-xs font-bold uppercase tracking-[0.16em] text-white/70">
                  {t.sectionNavTrust}
                </p>
                <ul className="m-0 grid list-none grid-cols-1 gap-2.5 p-0 sm:grid-cols-3 sm:gap-3">
                  {t.trustMicroPoints.map((line, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 rounded-xl border border-white/[0.1] border-s-2 border-s-[rgb(var(--accent))]/40 bg-black/25 px-3 py-2.5 text-sm leading-snug text-white/95 transition hover:border-white/[0.16] hover:bg-white/[0.04]"
                    >
                      <span className="shrink-0 text-base" aria-hidden>
                        {i === 0 ? "🔒" : i === 1 ? "🔐" : "🤝"}
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TiltPlane>
            <TiltPlane
              className="mt-4 block w-full"
              innerClassName="rounded-2xl"
              maxTilt={5}
              floatZ={8}
            >
            <div className="home-section-wash rounded-2xl border border-white/[0.12] bg-[rgb(var(--surface-elevated))]/55 px-4 py-5 sm:px-6">
              <p className="m-0 text-xs font-bold uppercase tracking-[0.2em] text-[rgb(var(--accent-2))]">
                {t.homeDemoEyebrow}
              </p>
              <p className="font-display mt-1 text-lg font-bold text-[rgb(var(--ink))] [text-wrap:balance]">
                {t.homeDemoTitle}
              </p>
              <ul className="mt-3 list-none space-y-2 p-0 text-sm">
                <li>
                  <Link
                    href="/analyze?preset=relocate"
                    className="font-semibold text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                  >
                    {t.homeDemoExample1} →
                  </Link>
                </li>
                <li>
                  <Link
                    href="/analyze?preset=job"
                    className="font-semibold text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                  >
                    {t.homeDemoExample2} →
                  </Link>
                </li>
                <li>
                  <Link
                    href="/analyze?preset=relationship"
                    className="font-semibold text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                  >
                    {t.homeDemoExample3} →
                  </Link>
                </li>
              </ul>
              <Link
                href="/analyze"
                className="btn-extrude-3d mt-4 inline-flex min-h-[48px] items-center justify-center rounded-2xl border border-white/15 bg-white/[0.1] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/[0.14]"
              >
                {t.homeDemoCta} →
              </Link>
            </div>
            </TiltPlane>
          </>
        ) : null}

        <RevealOnScroll>
        <section
          id="section-overview"
          className="home-section-wash home-section-wash--overview scroll-mt-36 rounded-[1.85rem] px-3 pt-12 pb-1 sm:px-4 sm:pt-14"
          aria-labelledby="overview-heading"
        >
          <div className="panel-float-hover rounded-[1.75rem] border border-white/[0.12] bg-gradient-to-br from-white/[0.1] via-white/[0.04] to-transparent p-6 shadow-[0_20px_60px_-36px_rgb(var(--accent)/0.25),0_0_0_1px_rgba(255,255,255,0.05)_inset] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent-2))]">
              {t.atAGlanceEyebrow}
            </p>
            <h2
              id="overview-heading"
              className="font-display mt-2 text-[clamp(1.35rem,1rem+1.4vw,1.95rem)] font-extrabold tracking-tight text-[rgb(var(--ink))] [text-wrap:balance]"
            >
              {t.atAGlanceTitle}
            </h2>
            <ul className="mt-6 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-3">
              {t.atAGlanceCards.map((card, i) => {
                const vis = getVisualStoryImage("overview", i);
                return (
                  <li key={card.title} className="h-full">
                    <VisualStoryCard
                      tone="overview"
                      index={i}
                      title={card.title}
                      shortLine={atAGlanceShort[i] ?? atAGlanceShort[0]}
                      fullDescription={card.body}
                      dir={rtl ? "rtl" : "ltr"}
                      imageSrc={vis.src}
                      imageAlt={vis.alt}
                    />
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/[0.06] pt-6">
              <Link
                href="/analyze"
                className="inline-flex items-center justify-center rounded-xl bg-white/[0.07] px-4 py-2.5 text-sm font-semibold text-[rgb(var(--ink))] ring-1 ring-white/10 transition hover:bg-white/[0.1]"
              >
                {t.heroCtaPrimary}
              </Link>
              <span className="text-xs text-[rgb(var(--ink-soft))]/90">
                {t.sectionNavProduct} → {t.sectionNavHow} → {t.sectionNavAnalyzer}
              </span>
            </div>
          </div>
        </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <WhatItFixesSection copy={solveCopy} />
        </RevealOnScroll>

        <RevealOnScroll>
          <ThematicImageBand
            copy={homeBands.a}
            imageSrc={THEMATIC_BAND_A_IMAGE}
            imageSide="start"
            sectionId="section-thematic-clarity"
          />
        </RevealOnScroll>

        {/* Product — bento */}
        <RevealOnScroll>
        <section
          id="section-product"
          className="home-section-wash home-section-wash--product scroll-mt-36 rounded-[1.85rem] px-3 pt-16 pb-1 sm:px-4 sm:pt-20"
          aria-labelledby="product-heading"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent-2))]">
              {t.sectionNavProduct}
            </p>
            <h2
              id="product-heading"
              className="font-display mt-2 text-[clamp(1.55rem,1.05rem+2vw,2.35rem)] font-extrabold tracking-tight text-[rgb(var(--ink))] [text-wrap:balance]"
            >
              {t.productSectionTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
              {t.productSectionSubtitle}
            </p>
          </div>
          <ProductSceneStrip
            eyebrow={t.productStripEyebrow}
            images={PRODUCT_STRIP_IMAGE_URLS}
            alts={t.productStripAlts}
            ariaLabel={t.productStripAria}
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.bentoCards.map((card) => (
              <li
                key={card.title}
                className="group list-none rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.09] to-white/[0.02] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[rgb(var(--accent))]/35 hover:shadow-[0_24px_56px_-28px_rgb(var(--accent)/0.45)]"
              >
                <span className="inline-block rounded-full bg-[rgb(var(--accent))]/12 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[rgb(var(--accent-2))]">
                  {card.pill}
                </span>
                <h3 className="mt-4 text-base font-semibold text-[rgb(var(--ink))]">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                  {card.body}
                </p>
              </li>
            ))}
          </ul>
        </section>
        </RevealOnScroll>

        {/* Trust */}
        <RevealOnScroll>
        <section
          id="section-trust"
          className="home-section-wash home-section-wash--trust scroll-mt-36 rounded-[1.85rem] px-3 pt-16 pb-1 sm:px-4 sm:pt-20"
          aria-labelledby="trust-heading"
        >
          <h2
            id="trust-heading"
            className="font-display text-[clamp(1.55rem,1.05rem+2vw,2.35rem)] font-extrabold tracking-tight text-[rgb(var(--ink))] [text-wrap:balance]"
          >
            {t.trustSectionTitle}
          </h2>
          <ul className="mt-8 grid list-none grid-cols-1 gap-4 p-0 lg:grid-cols-3">
            {t.trustCards.map((card, i) => {
              const vis = getVisualStoryImage("trust", i);
              return (
              <li key={card.title} className="h-full">
                <VisualStoryCard
                  tone="trust"
                  index={i}
                  title={card.title}
                  shortLine={trustShort[i] ?? trustShort[0]}
                  fullDescription={card.body}
                  emoji={card.emoji}
                  dir={rtl ? "rtl" : "ltr"}
                  imageSrc={vis.src}
                  imageAlt={vis.alt}
                />
              </li>
              );
            })}
          </ul>
        </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <ThematicImageBand
            copy={homeBands.b}
            imageSrc={THEMATIC_BAND_B_IMAGE}
            imageSide="end"
            sectionId="section-thematic-humans"
          />
        </RevealOnScroll>

        {/* How — timeline */}
        <RevealOnScroll>
        <section
          id="section-how"
          className="home-section-wash home-section-wash--how scroll-mt-36 rounded-[1.85rem] px-3 pt-16 pb-1 sm:px-4 sm:pt-20"
          aria-labelledby="how-heading"
        >
          <h2
            id="how-heading"
            className="font-display text-[clamp(1.55rem,1.05rem+2vw,2.35rem)] font-extrabold tracking-tight text-[rgb(var(--ink))] [text-wrap:balance]"
          >
            {t.howSectionTitle}
          </h2>
          <ol className="mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-3">
            {t.howSteps.map((step, i) => {
              const vis = getVisualStoryImage("how", i);
              return (
              <li key={step.title} className="h-full">
                <VisualStoryCard
                  tone="how"
                  index={i}
                  stepNumber={i + 1}
                  title={step.title}
                  shortLine={howShort[i] ?? howShort[0]}
                  fullDescription={step.body}
                  dir={rtl ? "rtl" : "ltr"}
                  imageSrc={vis.src}
                  imageAlt={vis.alt}
                />
              </li>
              );
            })}
          </ol>
        </section>
        </RevealOnScroll>

        {/* Language */}
        <RevealOnScroll>
        <section
          id="section-language"
          className="home-section-wash home-section-wash--language scroll-mt-36 rounded-[1.85rem] px-3 pt-16 pb-1 sm:px-4 sm:pt-20"
          aria-labelledby="lang-heading"
        >
          <h2
            id="lang-heading"
            className="font-display text-[clamp(1.55rem,1.05rem+2vw,2.35rem)] font-extrabold tracking-tight text-[rgb(var(--ink))]"
          >
            {t.langLabel}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-[rgb(var(--ink-soft))]">
            {t.heroRibbon}
          </p>
          <nav
            className="mt-8 rounded-2xl border border-white/[0.12] bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-4 shadow-[0_24px_64px_-32px_rgb(var(--accent)/0.2)] backdrop-blur-sm sm:p-6"
            aria-label={t.langLabel}
          >
            <div className="flex flex-wrap gap-2">
              {LOCALE_OPTIONS.map((opt) => {
                const active = locale === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setLocale(opt.value)}
                    className={
                      active
                        ? "rounded-xl border border-[rgb(var(--accent))]/50 bg-gradient-to-r from-[rgb(var(--accent))]/25 to-[rgb(var(--accent-2))]/18 px-3 py-2 text-sm font-semibold text-white shadow-[0_0_24px_-8px_rgb(var(--accent))]"
                        : "rounded-xl border border-white/[0.12] bg-white/[0.06] px-3 py-2 text-sm text-[rgb(var(--ink-soft))] transition hover:border-[rgb(var(--accent-2))]/30 hover:bg-white/[0.1] hover:text-[rgb(var(--ink))]"
                    }
                  >
                    <span className="me-1.5 opacity-90" aria-hidden>
                      {opt.flag}
                    </span>
                    {opt.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-[rgb(var(--ink-soft))]/85">
              ({LOCALE_OPTIONS.length} locales)
            </p>
          </nav>
        </section>
        </RevealOnScroll>
        </>
        )}

        {!focusLayout && (
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border-2 border-dashed border-[rgb(var(--accent-2))]/40 bg-gradient-to-r from-[rgb(var(--accent))]/[0.1] to-[rgb(var(--accent-magenta))]/[0.08] p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-4">
            <p className="text-sm font-medium leading-relaxed text-[rgb(var(--ink))] [text-wrap:pretty]">
              {t.homeAnalyzerPromoLine}
            </p>
            <Link
              href="/analyze"
              className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-white/[0.12] px-4 py-2.5 text-sm font-bold text-white ring-1 ring-white/20 transition hover:bg-white/[0.18]"
            >
              {t.homeAnalyzerPromoCta} →
            </Link>
          </div>
        )}

        {!focusLayout ? <AdSenseBanner className="my-2" /> : null}

        {/* Workspace: disclaimer + analyzer */}
        <RevealOnScroll>
        <section
          id="section-workspace"
          className="home-section-wash home-section-wash--workspace scroll-mt-32 rounded-[1.85rem] px-3 pt-16 pb-1 sm:px-4 sm:pt-20"
          aria-labelledby="workspace-heading"
        >
          <h2
            id="workspace-heading"
            className="font-display text-[clamp(1.55rem,1.05rem+2vw,2.35rem)] font-extrabold tracking-tight text-[rgb(var(--ink))] [text-wrap:balance]"
          >
            {t.workspaceTitle}
          </h2>
          <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-[rgb(var(--accent-2))]/90 [text-wrap:pretty]">
            {workspaceGreeting}
          </p>
          <div className="mt-5 max-w-3xl rounded-2xl border border-white/[0.1] bg-white/[0.03] px-4 py-3 sm:px-5">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[rgb(var(--accent-dim))]/90">
              {novelty.workspaceFlowEyebrow}
            </p>
            <ol className="mt-2 list-decimal space-y-2 ps-4 text-sm leading-relaxed text-[rgb(var(--ink-soft))]/95 [text-wrap:pretty] marker:font-semibold marker:text-[rgb(var(--accent-2))]">
              <li>{novelty.workspaceFlow1}</li>
              <li>{novelty.workspaceFlow2}</li>
              <li>{novelty.workspaceFlow3}</li>
            </ol>
          </div>
          <p
            className="mt-4 max-w-3xl rounded-2xl border border-[rgb(var(--accent-2))]/30 bg-white/[0.04] px-4 py-3 text-sm font-medium leading-relaxed text-[rgb(var(--ink))] [text-wrap:pretty] sm:px-5"
            role="status"
          >
            <span
              className="me-2 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[rgb(var(--accent))]/40 to-[rgb(var(--accent-2))]/30 text-xs font-bold text-white"
              aria-hidden
            >
              1
            </span>
            {t.workspaceFillHint}
          </p>
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent-2))]">
              {sx.warmEyebrow}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 rounded-2xl ring-1 ring-inset ring-[rgb(var(--accent-2))]/20 bg-white/[0.02] p-2">
              {(
                [
                  ["relocate", sx.warmRelocate, warmPresets.relocate] as const,
                  ["job", sx.warmJob, warmPresets.job] as const,
                  [
                    "relationship",
                    sx.warmRel,
                    warmPresets.relationship,
                  ] as const,
                ] as const
              ).map(([key, label, pack]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setDecision(pack.decision);
                    setContext(pack.context);
                    setConstraints(pack.constraints);
                  }}
                  className="rounded-full border border-white/[0.14] bg-white/[0.07] px-4 py-2 text-sm font-medium text-[rgb(var(--ink))] transition hover:border-[rgb(var(--accent-2))]/35 hover:bg-white/[0.1]"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300/90">
              {delight.coldStartEyebrow}
            </p>
            <div className="cold-tray-pulse mt-3 flex flex-wrap gap-2 rounded-2xl ring-1 ring-inset ring-violet-400/20 bg-violet-500/[0.05] p-2">
              {delight.coldStarts.map((pack) => (
                <button
                  key={pack.label}
                  type="button"
                  onClick={() => {
                    setDecision(pack.decision);
                    setContext(pack.context);
                    setConstraints(pack.constraints);
                  }}
                  className="chip-interactive rounded-full border border-white/[0.14] bg-white/[0.06] px-4 py-2 text-sm font-medium text-[rgb(var(--ink))] transition-colors hover:border-violet-400/40 hover:bg-white/[0.1]"
                >
                  {pack.label}
                </button>
              ))}
            </div>
          </div>
          {visitMilestoneN != null ? (
            <TiltPlane
              className="mt-5 block w-full"
              innerClassName="rounded-2xl overflow-hidden"
              maxTilt={4}
              floatZ={6}
            >
              <div
                className="flex flex-col gap-3 rounded-2xl border border-amber-400/30 bg-gradient-to-r from-amber-500/[0.12] to-orange-500/[0.06] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
                role="status"
              >
                <p className="text-sm leading-relaxed text-[rgb(var(--ink))] [text-wrap:pretty]">
                  {milestoneMessage(delight, visitMilestoneN)}
                </p>
                <button
                  type="button"
                  onClick={dismissVisitMilestone}
                  className="shrink-0 rounded-xl border border-white/15 bg-white/[0.1] px-4 py-2 text-xs font-semibold text-[rgb(var(--ink))] transition hover:bg-white/[0.14]"
                >
                  {delight.milestoneDismiss}
                </button>
              </div>
            </TiltPlane>
          ) : null}
          <TiltPlane
            className="mt-8 block w-full"
            innerClassName="rounded-3xl overflow-hidden"
            maxTilt={6}
            floatZ={10}
          >
            <SparkShuffleStrip
              eyebrow={sx.sparkStripEyebrow}
              shuffleLabel={sx.sparkShuffle}
              moments={sx.sparkMoments}
            />
          </TiltPlane>
          <p className="mt-3 max-w-2xl text-[11px] leading-relaxed text-[rgb(var(--ink-soft))]/75 [text-wrap:pretty]">
            {delight.shortcutTeaser}
          </p>
          <PlayCorner copy={delight} />
          <TimeCapsuleCard
            copy={{
              eyebrow: novelty.capsuleEyebrow,
              title: novelty.capsuleTitle,
              explain: novelty.capsuleExplain,
              placeholder: novelty.capsulePlaceholder,
              daysLabel: novelty.capsuleDaysLabel,
              seal7: novelty.capsuleSeal7,
              seal14: novelty.capsuleSeal14,
              seal30: novelty.capsuleSeal30,
              save: novelty.capsuleSave,
              full: novelty.capsuleFull,
              locked: novelty.capsuleLocked,
              reveal: novelty.capsuleReveal,
              delete: novelty.capsuleDelete,
              listAria: novelty.capsuleListAria,
            }}
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-5">
            <div className="min-h-0 lg:col-span-2">
              <TiltPlane
                className="h-full min-h-[12rem]"
                innerClassName="h-full rounded-3xl"
                maxTilt={5}
                floatZ={8}
              >
                <aside className="glass card-glow h-full min-h-[12rem] rounded-3xl p-5 lg:p-6">
                  <p className="text-sm font-semibold text-[rgb(var(--ink))]">
                    {t.disclaimerTitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                    {t.disclaimerBody}
                  </p>
                </aside>
              </TiltPlane>
            </div>

            <form
              id="analyzer"
              onSubmit={onSubmit}
              className="panel-float-hover glass card-glow ring-1 ring-inset ring-[rgb(var(--accent))]/25 rounded-3xl p-5 sm:p-6 lg:col-span-3"
            >
              <h3 className="text-lg font-semibold text-[rgb(var(--ink))]">
                {t.decision}
              </h3>

              <DecisionBriefWizard
                t={brief}
                onApply={({ decision: d, context: ctx, constraints: cons }) => {
                  setDecision(d);
                  setContext(ctx);
                  setConstraints(cons);
                }}
              />
              <p className="mt-3 text-xs leading-relaxed text-[rgb(var(--ink-soft))]/85 [text-wrap:pretty]">
                {t.voiceInputHint}
              </p>

              <div className="mt-3">
                <div className="mb-1.5 flex flex-wrap items-start justify-end gap-2">
                  <VoiceWhisperButton
                    locale={locale}
                    onAppend={(chunk) =>
                      setDecision((d) =>
                        d.trim() ? `${d.trimEnd()} ${chunk}` : chunk
                      )
                    }
                    disabled={formBusy}
                    available={whisperAvailable}
                    labels={whisperLabels}
                  />
                  <VoiceDictateButton
                    locale={locale}
                    onAppend={(chunk) =>
                      setDecision((d) =>
                        d.trim() ? `${d.trimEnd()} ${chunk}` : chunk
                      )
                    }
                    disabled={formBusy}
                    replaceWithMessage={armenianBrowserSttMessage}
                    labels={voiceLabels}
                  />
                </div>
                <textarea
                  id="decision-input"
                  value={decision}
                  onChange={(e) => setDecision(e.target.value)}
                  placeholder={t.decisionPh}
                  rows={4}
                  className="w-full resize-y rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-base leading-relaxed text-[rgb(var(--ink))] placeholder:text-[rgb(var(--ink-soft))]/65 outline-none transition focus:border-[rgb(var(--accent))]/45 focus:ring-2 focus:ring-[rgb(var(--accent))]/15"
                />
              </div>

              <label className="mt-5 block text-sm font-medium text-[rgb(var(--ink))]">
                {t.context}
              </label>
              <div className="mb-1.5 flex flex-wrap items-start justify-end gap-2">
                <VoiceWhisperButton
                  locale={locale}
                  onAppend={(chunk) =>
                    setContext((c) =>
                      c.trim() ? `${c.trimEnd()} ${chunk}` : chunk
                    )
                  }
                  disabled={formBusy}
                  available={whisperAvailable}
                  labels={whisperLabels}
                />
                <VoiceDictateButton
                  locale={locale}
                  onAppend={(chunk) =>
                    setContext((c) => (c.trim() ? `${c.trimEnd()} ${chunk}` : chunk))
                  }
                  disabled={formBusy}
                  replaceWithMessage={armenianBrowserSttMessage}
                  labels={voiceLabels}
                />
              </div>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder={t.contextPh}
                rows={3}
                className="w-full resize-y rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-base outline-none transition focus:border-[rgb(var(--accent))]/45"
              />
              <BriefSignatureStrip
                source={`${decision}\n${context}`}
                eyebrow={novelty.signatureEyebrow}
                moodPrefix={novelty.signatureMoodPrefix}
                moodNames={novelty.moodNames}
              />

              <label className="mt-5 block text-sm font-medium text-[rgb(var(--ink))]">
                {t.constraints}
              </label>
              <div className="mb-1.5 flex flex-wrap items-start justify-end gap-2">
                <VoiceWhisperButton
                  locale={locale}
                  onAppend={(chunk) =>
                    setConstraints((c) =>
                      c.trim() ? `${c.trimEnd()} ${chunk}` : chunk
                    )
                  }
                  disabled={formBusy}
                  available={whisperAvailable}
                  labels={whisperLabels}
                />
                <VoiceDictateButton
                  locale={locale}
                  onAppend={(chunk) =>
                    setConstraints((c) =>
                      c.trim() ? `${c.trimEnd()} ${chunk}` : chunk
                    )
                  }
                  disabled={formBusy}
                  replaceWithMessage={armenianBrowserSttMessage}
                  labels={voiceLabels}
                />
              </div>
              <textarea
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                placeholder={t.constraintsPh}
                rows={2}
                className="w-full resize-y rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-base outline-none transition focus:border-[rgb(var(--accent))]/45"
              />

              <div className="mt-5">
                <label
                  className="block text-sm font-medium text-[rgb(var(--ink))]"
                  htmlFor="stakes-slider"
                >
                  {t.stakesLabel}
                </label>
                <p className="mt-1 text-xs leading-relaxed text-[rgb(var(--ink-soft))]/90 [text-wrap:pretty]">
                  {t.stakesHelper}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-3 sm:max-w-md">
                  <input
                    id="stakes-slider"
                    type="range"
                    min={1}
                    max={10}
                    value={stakesLevel}
                    onChange={(e) =>
                      setStakesLevel(Number(e.target.value) || 5)
                    }
                    disabled={formBusy}
                    className="h-2 w-full min-w-[12rem] flex-1 accent-[rgb(var(--accent-2))] disabled:opacity-50"
                  />
                  <span
                    className="min-w-[3ch] text-center font-display text-lg font-bold tabular-nums text-gradient"
                    aria-live="polite"
                  >
                    {stakesLevel}
                  </span>
                </div>
              </div>

              {error && (
                <p className="mt-4 text-sm text-rose-300" role="alert">
                  {error}
                </p>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <TiltPlane
                  className="inline-flex w-full sm:w-auto"
                  innerClassName="rounded-2xl"
                  maxTilt={7}
                  floatZ={6}
                >
                  <button
                    type="submit"
                    disabled={!canSubmit || formBusy}
                    className="min-h-[48px] w-full rounded-2xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-[rgb(var(--accent)/0.28)] transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 sm:min-w-[14rem]"
                  >
                    {loading ? t.analyzing : t.analyze}
                  </button>
                </TiltPlane>
                {result ? (
                  <span className="inline-flex w-full justify-center rounded-full border border-white/15 bg-white/[0.03] px-3 py-2 text-center text-sm text-[rgb(var(--ink-soft))] sm:inline-flex sm:w-auto sm:justify-start sm:py-1.5 sm:text-xs">
                    {result.mode === "live" && t.badgeLive}
                    {result.mode === "demo" && t.badgeDemo}
                    {result.mode === "fallback" && t.badgeFallback}
                  </span>
                ) : null}
              </div>
              {loading ? (
                <div
                  className="mt-4 space-y-2"
                  role="status"
                  aria-live="polite"
                >
                  <p className="text-sm font-medium text-[rgb(var(--ink))]">
                    {t.analyzingProgressLine}
                  </p>
                  <div
                    className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10"
                    aria-hidden
                  >
                    <div
                      className="home-analyzing-bar-inner absolute start-0 top-0 h-full w-2/5 rounded-full bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-2))]"
                    />
                  </div>
                </div>
              ) : null}
              {(result?.hint || result?.warning) && (
                <p className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs leading-relaxed text-[rgb(var(--ink-soft))]">
                  {result.warning ?? result.hint}
                </p>
              )}
            </form>
          </div>
        </section>
        </RevealOnScroll>

        {a && (
          <section
            id="section-results"
            className="home-section-wash home-section-wash--results scroll-mt-28 mt-8 space-y-6 rounded-[1.85rem] border-2 border-emerald-500/30 bg-gradient-to-b from-emerald-500/[0.07] to-transparent px-3 pt-8 sm:px-4"
            aria-labelledby="results-main-heading"
          >
            <div
              id="results-main-heading"
              tabIndex={-1}
              className="results-glow-breathe animate-fade-up rounded-2xl border border-emerald-400/35 bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 px-4 py-4 sm:px-5"
            >
              <h2 className="font-display text-xl font-extrabold tracking-tight text-emerald-50/95 [text-wrap:balance] sm:text-2xl">
                <span className="me-2 text-2xl" aria-hidden>
                  ✓
                </span>
                {t.resultsYouAreHere}
              </h2>
            </div>
            {resultCheerLine ? (
              <p className="mx-auto max-w-2xl text-center text-xs font-medium italic leading-relaxed text-emerald-200/85 [text-wrap:pretty]">
                {resultCheerLine}
              </p>
            ) : null}
            <TiltPlane
              className="animate-fade-up block w-full"
              innerClassName="rounded-2xl"
              maxTilt={5}
              floatZ={8}
            >
              <div className="flex flex-col gap-4 rounded-2xl border border-[rgb(var(--accent-2))]/35 bg-gradient-to-br from-[rgb(var(--accent))]/14 via-white/[0.04] to-transparent px-4 py-4 shadow-[0_16px_48px_-28px_rgb(var(--accent)/0.45)] sm:px-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <p className="max-w-2xl text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
                    {pa.runAnotherHint}
                  </p>
                  <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-0 sm:flex-row sm:items-center sm:gap-2">
                    <ReadAloudReportButton
                      text={readAloudText}
                      locale={locale}
                      labels={{
                        readAloud: t.readAloud,
                        stop: t.readAloudStop,
                      }}
                    />
                    <button
                      type="button"
                      onClick={scrollToAnalyzer}
                      className="shrink-0 rounded-2xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgb(var(--accent)/0.28)] transition hover:brightness-110"
                    >
                      {pa.runAnotherCta}
                    </button>
                  </div>
                </div>
                <div className="border-t border-white/[0.08] pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[rgb(var(--accent-dim))]">
                    {pa.runAnotherTrustTitle}
                  </p>
                  <p className="mt-2 max-w-3xl text-xs leading-relaxed text-[rgb(var(--ink-soft))]/90 [text-wrap:pretty]">
                    {pa.runAnotherTrustBody}
                  </p>
                </div>
              </div>
            </TiltPlane>

            <section className="glass animate-fade-up rounded-3xl p-6 sm:p-7">
              <h2 className="text-lg font-semibold text-[rgb(var(--ink))]">
                {t.sectionSummary}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                {typeof a.summary === "string" ? a.summary : ""}
              </p>
              <p className="mt-3 text-sm text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
                {t.stakesResultPrefix} —{" "}
                <span className="font-semibold text-[rgb(var(--ink))]">
                  {stakesLevel}/10
                </span>
              </p>
            </section>

            {(a.professionalGuidance ?? "").trim() ? (
              <section className="glass animate-fade-up rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-500/[0.07] to-transparent p-6 sm:p-7">
                <h2 className="text-lg font-semibold text-amber-50/95">
                  {t.sectionProfessional}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty] whitespace-pre-wrap">
                  {a.professionalGuidance}
                </p>
              </section>
            ) : null}

            <section
              className="glass animate-fade-up rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/[0.06] to-transparent p-6 sm:p-7"
              aria-labelledby="needs-help-heading"
            >
              <h2
                id="needs-help-heading"
                className="text-lg font-semibold text-cyan-50/95"
              >
                {pa.needsHelpTitle}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
                {pa.needsHelpLead}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {DIRECTORY_ROLE_OPTIONS.map((role) => {
                  const suggested = a.suggestedDirectoryRole === role;
                  const selected = expertNeedsPick === role;
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setExpertNeedsPick(role)}
                      className={`inline-flex max-w-full flex-wrap items-center gap-1.5 rounded-2xl border px-3 py-2 text-left text-sm font-medium transition ${
                        selected
                          ? "border-cyan-400/55 bg-cyan-500/20 text-cyan-50 ring-2 ring-cyan-400/40"
                          : "border-white/[0.12] bg-white/[0.04] text-[rgb(var(--ink))] hover:border-cyan-400/35 hover:bg-white/[0.07]"
                      }`}
                    >
                      <span>{roleLabel(locale, role)}</span>
                      {suggested ? (
                        <span className="rounded-md bg-cyan-500/25 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cyan-100/90">
                          {pa.needsHelpSuggestedBadge}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setExpertNeedsPick("UNSURE")}
                  className={`rounded-2xl border px-3 py-2 text-sm font-medium transition ${
                    expertNeedsPick === "UNSURE"
                      ? "border-cyan-400/55 bg-cyan-500/20 text-cyan-50 ring-2 ring-cyan-400/40"
                      : "border-white/[0.12] bg-white/[0.04] text-[rgb(var(--ink-soft))] hover:border-cyan-400/35 hover:bg-white/[0.07]"
                  }`}
                >
                  {pa.needsHelpUnsure}
                </button>
              </div>
              {expertNeedsPick !== null ? (
                <div className="mt-5">
                  <Link
                    href={buildExpertsNeedsHref(expertNeedsPick, decision)}
                    className="inline-flex rounded-2xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgb(var(--accent)/0.28)] transition hover:brightness-110"
                  >
                    {expertNeedsPick === "UNSURE"
                      ? pa.needsHelpOpenExperts
                      : pa.needsHelpOpenForRole.replace(
                          "{role}",
                          roleLabel(locale, expertNeedsPick),
                        )}
                  </Link>
                </div>
              ) : null}
            </section>

            {matchedExperts.length > 0 ? (
              <section className="glass animate-fade-up rounded-3xl p-6 sm:p-7">
                <h2 className="text-lg font-semibold text-[rgb(var(--ink))]">
                  {t.sectionDirectoryExperts}
                </h2>
                <ul className="mt-4 space-y-4">
                  {matchedExperts.map((e) => (
                    <li
                      key={e.id}
                      className="flex flex-col gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-semibold text-[rgb(var(--ink))]">
                          {e.name}
                        </p>
                        <p className="text-xs font-medium text-[rgb(var(--accent-2))]">
                          {roleLabel(locale, e.role as ExpertRoleKey)} · {e.country}
                          {e.city ? ` · ${e.city}` : ""}
                        </p>
                        <p className="mt-1 line-clamp-2 text-sm text-[rgb(var(--ink-soft))]">
                          {e.bio}
                        </p>
                        <p className="mt-1 text-xs text-[rgb(var(--ink-soft))]/85">
                          {e.languages}
                        </p>
                      </div>
                      <Link
                        href={`/experts?role=${encodeURIComponent(e.role)}&highlight=${encodeURIComponent(e.id)}`}
                        className="shrink-0 self-start rounded-xl bg-gradient-to-r from-[rgb(var(--accent))]/30 to-[rgb(var(--accent-2))]/20 px-4 py-2.5 text-sm font-bold text-white ring-1 ring-white/15 sm:self-center"
                      >
                        {t.expertOpenInDirectory} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {matchedExperts.length === 0 &&
            (a.suggestedDirectoryRole ?? "UNSPECIFIED") !==
              "UNSPECIFIED" ? (
              <p className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
                {t.expertNoDirectoryMatch}{" "}
                <Link
                  href={`/experts?role=${encodeURIComponent(
                    a.suggestedDirectoryRole ?? "",
                  )}`}
                  className="font-semibold text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                >
                  {exNav.navExperts} →
                </Link>
              </p>
            ) : null}

            <section className="glass animate-fade-up rounded-3xl p-6 sm:p-7">
              <h2 className="text-lg font-semibold">{t.sectionDimensions}</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {(
                  [
                    ["finances", t.dimFinances],
                    ["psychology", t.dimPsychology],
                    ["risks", t.dimRisks],
                    ["opportunities", t.dimOpportunities],
                  ] as const
                ).map(([key, label]) => (
                  <div
                    key={key}
                    className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.05] to-transparent p-4"
                  >
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[rgb(var(--accent-dim))]">
                      {label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                      {a.dimensions[key]}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="glass animate-fade-up rounded-3xl p-6 sm:p-7">
              <h2 className="text-lg font-semibold">{t.sectionScenarios}</h2>
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.06] p-4">
                  <h3 className="text-xs font-semibold text-emerald-300/95">
                    {t.scenBest}
                  </h3>
                  <p className="mt-2 text-sm text-[rgb(var(--ink-soft))]">
                    {a.scenarios.bestCase}
                  </p>
                </div>
                <div className="rounded-2xl border border-rose-500/25 bg-rose-500/[0.06] p-4">
                  <h3 className="text-xs font-semibold text-rose-300/95">
                    {t.scenWorst}
                  </h3>
                  <p className="mt-2 text-sm text-[rgb(var(--ink-soft))]">
                    {a.scenarios.worstCase}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <h3 className="text-xs font-semibold text-[rgb(var(--ink))]">
                    {t.scenLikely}
                  </h3>
                  <p className="mt-2 text-sm text-[rgb(var(--ink-soft))]">
                    {a.scenarios.mostLikely}
                  </p>
                </div>
              </div>
            </section>

            <section className="glass animate-fade-up rounded-3xl p-6 sm:p-7">
              <h2 className="text-lg font-semibold">{t.sectionTimeline}</h2>
              <ol className="mt-5 space-y-4">
                <li className="flex gap-4">
                  <span className="mt-0.5 shrink-0 rounded-full bg-gradient-to-r from-[rgb(var(--accent))]/25 to-[rgb(var(--accent-2))]/20 px-3 py-1 text-xs font-medium text-[rgb(var(--ink))]">
                    {t.timeM6}
                  </span>
                  <p className="text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                    {a.timeline.months6}
                  </p>
                </li>
                <li className="flex gap-4">
                  <span className="mt-0.5 shrink-0 rounded-full bg-gradient-to-r from-[rgb(var(--accent))]/25 to-[rgb(var(--accent-2))]/20 px-3 py-1 text-xs font-medium text-[rgb(var(--ink))]">
                    {t.timeY2}
                  </span>
                  <p className="text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                    {a.timeline.years2}
                  </p>
                </li>
                <li className="flex gap-4">
                  <span className="mt-0.5 shrink-0 rounded-full bg-gradient-to-r from-[rgb(var(--accent))]/25 to-[rgb(var(--accent-2))]/20 px-3 py-1 text-xs font-medium text-[rgb(var(--ink))]">
                    {t.timeY5}
                  </span>
                  <p className="text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                    {a.timeline.years5}
                  </p>
                </li>
              </ol>
            </section>

            <section className="glass animate-fade-up rounded-3xl p-6 sm:p-7">
              <h2 className="text-lg font-semibold">{t.sectionScore}</h2>
              <div className="mt-6 grid gap-8 sm:grid-cols-[auto,1fr] sm:items-center">
                <ScoreCircle score={a.score} sublabel={t.scoreSublabel} />
                <p className="text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                  {a.scoreRationale}
                </p>
              </div>
            </section>

            <section className="glass animate-fade-up rounded-3xl p-6 sm:p-7">
              <h2 className="text-lg font-semibold">{t.sectionTwin}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                {a.digitalTwinNote}
              </p>
            </section>

            {result ? (
              <AnalysisResultTools
                analysis={a}
                decision={decision}
                context={context}
                constraints={constraints}
                stakesLevel={stakesLevel}
                mode={result.mode}
                pa={pa}
                expertsSearchHref={expertsSearchHref}
                onLoadBrief={loadBriefFromHistory}
              />
            ) : null}

            <section className="glass animate-fade-up rounded-3xl border border-dashed border-[rgb(var(--accent))]/35 bg-gradient-to-br from-[rgb(var(--accent))]/[0.07] to-transparent p-6 sm:p-7">
              <h2 className="text-lg font-semibold text-[rgb(var(--ink))]">
                {sx.premiumTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                {sx.premiumHint}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  disabled
                  className="cursor-not-allowed rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-[rgb(var(--ink-soft))]/80"
                  title={sx.premiumHint}
                >
                  {sx.premiumCta}
                </button>
                <Link
                  href="/pricing"
                  className="text-sm font-semibold text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                >
                  {pr.navPricing} →
                </Link>
              </div>
            </section>

            <footer className="border-t border-white/10 pt-8 text-center text-xs leading-relaxed text-[rgb(var(--ink-soft))]">
              {t.footerPremium}
            </footer>
          </section>
        )}
        <RevealOnScroll>
        <section
          id="section-privacy"
          className="home-section-wash home-section-wash--privacy scroll-mt-36 rounded-[1.85rem] px-3 pt-10 pb-1 sm:px-4 sm:pt-12"
          aria-labelledby="security-heading"
        >
          <div className="glass card-glow rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/[0.08] to-transparent p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
              <span
                className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500/15 text-[1.35rem] shadow-inner shadow-emerald-500/10"
                aria-hidden
              >
                🔒
              </span>
              <div className="min-w-0 flex-1">
                <h2
                  id="security-heading"
                  className="text-base font-semibold tracking-tight text-emerald-50/95"
                >
                  {t.securityTitle}
                </h2>
                <p className="mt-3 text-sm font-medium leading-relaxed text-[rgb(var(--ink))]/95 [text-wrap:pretty]">
                  {t.securityIntro}
                </p>
                <ul className="mt-4 list-disc space-y-2.5 ps-5 text-sm leading-relaxed text-[rgb(var(--ink-soft))] marker:text-emerald-400/90 [text-wrap:pretty]">
                  {t.securityPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
                <p className="mt-5 text-sm">
                  <Link
                    href="/privacy"
                    className="font-medium text-emerald-200/95 underline-offset-2 hover:underline"
                  >
                    Privacy Policy →
                  </Link>
                </p>
            </div>
          </div>
        </div>
        </section>
        </RevealOnScroll>

        {!focusLayout ? (
          <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 md:hidden">
            <div className="pointer-events-auto mx-auto max-w-6xl border-t border-white/10 bg-[rgb(var(--surface))]/92 px-4 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md">
              <Link
                href="/analyze"
                className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] text-base font-bold text-white shadow-lg shadow-[rgb(var(--accent)/0.25)] transition hover:brightness-110"
              >
                {t.heroCtaPrimary}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
