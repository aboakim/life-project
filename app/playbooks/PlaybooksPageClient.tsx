"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MarketingPageShell from "@/components/layout/MarketingPageShell";
import PageEducation from "@/components/layout/PageEducation";
import { getPlaybooksPage } from "@/lib/i18n/playbooks-page";
import {
  isAppLocale,
  type AppLocale,
} from "@/lib/i18n/locale";
import { DEFAULT_LOCALE } from "@/lib/locale-default";
import { readLocaleCookieClient } from "@/lib/locale-cookie";
import { LOCALE_CHANGE_EVENT } from "@/lib/locale-sync";

const LOCALE_KEY = "lde-locale";

export default function PlaybooksPageClient() {
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

  const p = getPlaybooksPage(locale);

  return (
    <MarketingPageShell
      eyebrow={p.eyebrow}
      title={p.title}
      subtitle={<p>{p.subtitle}</p>}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {p.cards.map((c) => (
          <article
            key={c.title}
            className="glass card-glow flex flex-col rounded-3xl border border-white/[0.1] p-6"
          >
            <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
              {c.title}
            </h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
              {c.body}
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                  >
                    {l.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="mt-10">
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
              A playbook is a curated reading path for one specific kind of
              decision. Instead of leaving you to wander through 22 separate
              blog posts, a playbook stitches the three or four most useful
              articles together in the order an editor would actually
              recommend reading them — first the one that frames the
              decision, then the one that handles the most common
              objections, then the one that gives you a checklist or a
              first concrete step.
            </p>
            <p>
              Three playbook tracks are live today: relocation (moving
              countries or cities), career (offers, promotions, layoffs,
              switching industries), and relationships (cohabiting,
              breakups, family conversations). More are added when we have
              at least three articles deep enough to warrant a path.
            </p>
          </>
        }
        sections={[
          {
            heading: "How playbooks are curated",
            body: (
              <p>
                The editorial team picks articles that pass three filters:
                they describe a decision (not a feeling), they include at
                least one named framework or example, and they have been
                read end-to-end by a human editor in the past 90 days.
                Articles older than that are re-read and either re-listed
                or quietly retired. We do not auto-list every blog post by
                tag.
              </p>
            ),
          },
          {
            heading: "How to use a playbook",
            body: (
              <ol className="list-decimal space-y-2 ps-5 marker:font-semibold marker:text-[rgb(var(--accent-2))]">
                <li>
                  Pick the playbook closest to the decision in front of
                  you. Skim the three to four articles in order; they are
                  short.
                </li>
                <li>
                  Open the analyzer in a new tab and run a short brief —
                  one paragraph of your own situation — alongside the
                  reading. The combination is more useful than either
                  alone.
                </li>
                <li>
                  Save what you learn into the{" "}
                  <Link
                    href="/journal"
                    className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                  >
                    decision journal
                  </Link>{" "}
                  as a one-line prediction. Read it back in three months.
                </li>
              </ol>
            ),
          },
          {
            heading: "Who playbooks are for",
            body: (
              <p>
                Anyone facing a real decision in the next 90 days. They are
                less useful as general inspiration reading; the articles are
                action-oriented and assume you have skin in the game.
                Casual readers usually prefer the{" "}
                <Link
                  href="/blog"
                  className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                >
                  blog
                </Link>{" "}
                index, which is sortable by tag.
              </p>
            ),
          },
        ]}
        faq={[
          {
            q: "How is a playbook different from the blog index?",
            a: "The blog index lists every article we've published, sorted by date or tag. A playbook is a curated, opinionated path of three to four articles for one specific decision — chosen by an editor in a deliberate reading order rather than alphabetical or chronological.",
          },
          {
            q: "Are playbooks free?",
            a: "Yes. Every article in every playbook is free to read with no signup. The playbook itself is also free; we don't gate the reading order behind a paywall.",
          },
          {
            q: "Can I suggest a new playbook track?",
            a: "Yes. Reach out via the contact page with the decision you'd want a playbook for and a sentence on why you're stuck. We add a new track when we have at least three articles deep enough to make the path useful.",
          },
          {
            q: "What if I want a real human's opinion after reading?",
            a: "After working through a playbook, the next step is usually a short conversation with someone who has skin in the same game. The experts directory lists psychologists, lawyers, financial planners, and immigration counsel who take 30 to 60 minute first conversations.",
          },
        ]}
        lastReviewed="May 5, 2026"
        lastReviewedISO="2026-05-05"
      />
    </MarketingPageShell>
  );
}
