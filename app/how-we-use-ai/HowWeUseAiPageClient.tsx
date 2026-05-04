"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MarketingPageShell from "@/components/layout/MarketingPageShell";
import PageEducation from "@/components/layout/PageEducation";
import { getSiteExtras } from "@/lib/i18n/site-extras";
import {
  isAppLocale,
  type AppLocale,
} from "@/lib/i18n/locale";
import { DEFAULT_LOCALE } from "@/lib/locale-default";
import { readLocaleCookieClient } from "@/lib/locale-cookie";
import { LOCALE_CHANGE_EVENT } from "@/lib/locale-sync";

const LOCALE_KEY = "lde-locale";

export default function HowWeUseAiPageClient() {
  const [locale, setLocale] = useState<AppLocale>(DEFAULT_LOCALE);

  useEffect(() => {
    const raw = window.localStorage.getItem(LOCALE_KEY);
    const fromCookie = readLocaleCookieClient();
    let resolved: AppLocale = DEFAULT_LOCALE;
    if (raw !== null && isAppLocale(raw)) resolved = raw;
    else if (fromCookie !== null) resolved = fromCookie;
    setLocale(resolved);
    if (raw === null || !isAppLocale(raw)) {
      window.localStorage.setItem(LOCALE_KEY, resolved);
    }
  }, []);

  useEffect(() => {
    function sync() {
      const raw = window.localStorage.getItem(LOCALE_KEY);
      if (raw && isAppLocale(raw)) setLocale(raw);
    }
    window.addEventListener(LOCALE_CHANGE_EVENT, sync);
    return () => window.removeEventListener(LOCALE_CHANGE_EVENT, sync);
  }, []);

  const t = getSiteExtras(locale);
  const sections = [
    { h: t.howAiS1h, p: t.howAiS1p },
    { h: t.howAiS2h, p: t.howAiS2p },
    { h: t.howAiS3h, p: t.howAiS3p },
    { h: t.howAiS4h, p: t.howAiS4p },
  ];

  return (
    <MarketingPageShell
      eyebrow={t.navHowAi}
      title={t.howAiTitle}
      subtitle={<p>{t.howAiLead}</p>}
    >
      <div className="max-w-3xl space-y-10 text-[15px] leading-relaxed text-[rgb(var(--ink-soft))]">
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
              {s.h}
            </h2>
            <p className="mt-3 [text-wrap:pretty]">{s.p}</p>
          </section>
        ))}

        <p>
          <Link
            href="/privacy"
            className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            Privacy Policy →
          </Link>
        </p>
        <p>
          <Link
            href="/"
            className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            ← Home
          </Link>
        </p>

        <PageEducation
          intro={
            <>
              <p>
                Life Decision Engine uses large language models in three
                places: to expand a one-paragraph brief into named
                scenarios, to apply a fixed set of analytical lenses to
                each scenario, and to draft the longer playbook articles
                that an editor then reviews before publication. The three
                surfaces have different rules, because the cost of a
                mistake is different in each one.
              </p>
              <p>
                In the analyzer, the model never operates on hidden
                history: each call sees only the brief you typed, plus the
                same prompt template that anyone else gets. There is no
                fine-tuning on user data, no per-user memory, and no
                training-time use of submitted briefs. The model
                provider for the default tier is OpenAI&apos;s GPT-4o-mini
                (or the model named in the public environment), and the
                provider&apos;s standard zero-retention API mode is used
                where available.
              </p>
            </>
          }
          sections={[
            {
              heading: "What the AI is allowed to do",
              body: (
                <ul className="list-disc space-y-2 ps-5 marker:text-[rgb(var(--accent-2))]/70">
                  <li>
                    Generate three to four named scenarios from a brief
                    (best, base, rough, contingency).
                  </li>
                  <li>
                    Apply structured lenses — money, mind, risk,
                    opportunity — and produce short paragraphs for each.
                  </li>
                  <li>
                    Produce a numerical score with a written reason that
                    cites the lenses, not magic numbers.
                  </li>
                  <li>
                    Draft long-form articles that are then reviewed,
                    fact-checked, and edited by a human editor before
                    publishing — every article carries the editorial
                    transparency block at the bottom.
                  </li>
                </ul>
              ),
            },
            {
              heading: "What the AI is not allowed to do",
              body: (
                <ul className="list-disc space-y-2 ps-5 marker:text-rose-300/80">
                  <li>
                    Diagnose medical, psychiatric, legal, or financial
                    conditions. The wording of every report names this
                    explicitly.
                  </li>
                  <li>
                    Recommend a specific medication, attorney, broker, or
                    crypto position.
                  </li>
                  <li>
                    Reach the open internet at runtime. Briefs are not
                    enriched with live web search; that keeps the
                    privacy story simple and avoids citing hallucinated
                    URLs.
                  </li>
                  <li>
                    Train on your brief. We do not opt user submissions
                    into provider training pipelines; where the provider
                    offers a no-train data setting, we use it.
                  </li>
                </ul>
              ),
            },
            {
              heading: "How errors and edge cases are handled",
              body: (
                <p>
                  When the model produces something that an editor flags
                  in review (factual error, too-confident phrasing,
                  policy-sensitive recommendation) we either re-run with a
                  tightened prompt or rewrite the section by hand. The
                  prompt templates live in version control and are
                  reviewed quarterly. If you spot something that looks
                  wrong, write to the editorial team — the contact link
                  is at the bottom of every page — and we will correct
                  the article and the prompt.
                </p>
              ),
            },
          ]}
          faq={[
            {
              q: "Will my analyzer brief be used to train an AI model?",
              a: "No. Briefs are sent to the model provider in zero-retention mode where available, and we do not maintain our own training corpus from user input. We log the high-level event (a brief was analyzed) and aggregate metrics for capacity planning; we do not log the contents.",
            },
            {
              q: "Why is there an AI badge on every blog post?",
              a: (
                <>
                  Because being honest about it is the only ethical option
                  and because Google&apos;s guidance on AI-assisted content
                  asks publishers to disclose. See the{" "}
                  <Link
                    href="/editorial-standards"
                    className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                  >
                    editorial standards
                  </Link>{" "}
                  for the full review checklist that every article passes
                  before publishing.
                </>
              ),
            },
            {
              q: "Can I opt out of AI-touched content?",
              a: "The analyzer itself is the AI tool, so opting out means not using it. The blog posts are AI-drafted and human-edited; if you only want fully human-written content, the experts directory and the community board are the right places.",
            },
          ]}
          lastReviewed="May 5, 2026"
          lastReviewedISO="2026-05-05"
        />
      </div>
    </MarketingPageShell>
  );
}
