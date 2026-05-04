"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MarketingPageShell from "@/components/layout/MarketingPageShell";
import PageEducation from "@/components/layout/PageEducation";
import { getGuidelinesPage } from "@/lib/i18n/guidelines-page";
import {
  isAppLocale,
  type AppLocale,
} from "@/lib/i18n/locale";
import { DEFAULT_LOCALE } from "@/lib/locale-default";
import { readLocaleCookieClient } from "@/lib/locale-cookie";
import { LOCALE_CHANGE_EVENT } from "@/lib/locale-sync";

const LOCALE_KEY = "lde-locale";

export default function GuidelinesPageClient() {
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

  const g = getGuidelinesPage(locale);

  return (
    <MarketingPageShell
      eyebrow={g.eyebrow}
      title={g.title}
      subtitle={<p>{g.subtitle}</p>}
    >
      <div className="max-w-3xl space-y-10 text-[15px] leading-relaxed text-[rgb(var(--ink-soft))]">
        {g.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
              {s.heading}
            </h2>
            <p className="mt-3 [text-wrap:pretty]">{s.body}</p>
          </section>
        ))}
        <p>
          <Link
            href="/community"
            className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            ← Community Q&A
          </Link>
        </p>

        <PageEducation
          intro={
            <p>
              These guidelines exist for one reason: to keep the Q&amp;A
              board useful for someone reading it at four in the morning
              with a real life decision in front of them. Everything below
              follows from that. We aim for light moderation rather than
              heavy moderation, but the rules are firm where the cost of
              being wrong is high — disinformation about medication, legal
              shortcuts, or financial schemes.
            </p>
          }
          sections={[
            {
              heading: "What posts should look like",
              body: (
                <ul className="list-disc space-y-2 ps-5 marker:text-[rgb(var(--accent-2))]/70">
                  <li>
                    Plain text, in any of the supported languages. No
                    images, attachments, or links to closed groups.
                  </li>
                  <li>
                    A specific question grounded in a specific situation —
                    not a survey, not a poll, not &ldquo;am I the
                    asshole?&rdquo;
                  </li>
                  <li>
                    Personal context is welcome (your country, your role,
                    your family situation) but no document IDs, addresses,
                    or phone numbers — yours or anyone else&apos;s.
                  </li>
                  <li>
                    One question per post. If you have three questions,
                    split them or pick the most blocking one.
                  </li>
                </ul>
              ),
            },
            {
              heading: "What gets removed",
              body: (
                <ul className="list-disc space-y-2 ps-5 marker:text-rose-300/80">
                  <li>
                    <strong className="text-[rgb(var(--ink))]">
                      Specific medical, legal, or financial advice given as
                      certainty.
                    </strong>{" "}
                    Suggestions, frameworks, &ldquo;here is what I did&rdquo;
                    are fine. &ldquo;Take this medication, sue your
                    landlord, buy this stock&rdquo; will be removed.
                  </li>
                  <li>
                    Advertising — links to commercial services, &ldquo;DM me
                    for help&rdquo; replies, recruiting for paid programs.
                  </li>
                  <li>
                    Doxxing or sharing identifying information about a
                    third party (an ex, a former employer, a school).
                  </li>
                  <li>
                    Hate speech, harassment, threats. We escalate threats
                    of self-harm to the user with crisis-line links and
                    pause the thread.
                  </li>
                  <li>
                    Coordinated brigading or sock-puppet voting on
                    &ldquo;Helpful&rdquo; reactions.
                  </li>
                </ul>
              ),
            },
            {
              heading: "Editor process & timing",
              body: (
                <p>
                  Editors review the queue daily on weekdays and within 48
                  hours on weekends. We try to err on the side of
                  publishing; when a post is borderline we will trim or
                  add a clarifying note rather than delete. If your post
                  is removed and you disagree, write to{" "}
                  <Link
                    href="/contact"
                    className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
                  >
                    /contact
                  </Link>{" "}
                  with the post text and we will re-review.
                </p>
              ),
            },
          ]}
          faq={[
            {
              q: "Can I link to my own blog or substack?",
              a: "If the link is directly relevant to the question (for example you wrote about exactly the relocation the asker is considering) and it is not a paywall, yes — but mention up front that it is your work. Promotional posts disguised as answers are removed.",
            },
            {
              q: "Why no usernames or accounts?",
              a: "Anonymity lowers the cost of asking the embarrassing question that often matters most. The trade-off is that we cannot let identity travel between threads. We think the trade is worth it for a decision-support board.",
            },
            {
              q: "Will my post stay up forever?",
              a: "Posts older than 18 months may be archived (still indexable, marked as historical) so the active board reflects current, answerable threads. You can request earlier deletion of your own post by writing to /contact and including the post text.",
            },
          ]}
        />
      </div>
    </MarketingPageShell>
  );
}
