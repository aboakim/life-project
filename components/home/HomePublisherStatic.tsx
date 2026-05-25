import Link from "next/link";
import { cookies } from "next/headers";
import {
  LDE_LOCALE_COOKIE_NAME,
  localeFromCookieValue,
} from "@/lib/locale-cookie";
import { getUi } from "@/lib/i18n/ui";

/**
 * Server-rendered publisher block on `/` — visible without the deferred
 * DecisionStudio bundle (AdSense "publisher content" signal).
 */
export default async function HomePublisherStatic() {
  const jar = await cookies();
  const locale = localeFromCookieValue(
    jar.get(LDE_LOCALE_COOKIE_NAME)?.value,
  );
  const t = getUi(locale);

  return (
    <section
      aria-label="About Life Decision Engine"
      className="relative z-[1] mx-auto max-w-3xl px-4 pb-10 pt-2 sm:px-6"
    >
      <div className="space-y-6 rounded-3xl border border-white/[0.1] bg-white/[0.04] p-6 text-[15px] leading-relaxed text-[rgb(var(--ink-soft))] sm:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[rgb(var(--accent-dim))]">
          Publisher overview
        </p>
        <p className="text-[rgb(var(--ink))]/95">
          {t.subtitle} Life Decision Engine publishes original frameworks on
          this site and in our{" "}
          <Link
            href="/blog"
            className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            blog
          </Link>{" "}
          — career moves, relocation, relationships, money under uncertainty,
          and the psychology of large choices. Every article is written or
          reviewed by our{" "}
          <Link
            href="/editorial-team"
            className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            editorial team
          </Link>{" "}
          under{" "}
          <Link
            href="/editorial-standards"
            className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            published standards
          </Link>
          .
        </p>
        <p>
          The interactive analyzer below turns your question into scenarios,
          four lenses, a timeline, and a score — the same engine available on{" "}
          <Link
            href="/analyze"
            className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            /analyze
          </Link>
          . When a human professional is appropriate, browse the{" "}
          <Link
            href="/experts"
            className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            experts directory
          </Link>{" "}
          or read{" "}
          <Link
            href="/faq"
            className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            frequently asked questions
          </Link>
          . We are not a social network: no public feed of private decisions,
          no engagement bait.
        </p>
        <ul className="list-disc space-y-2 ps-5 marker:text-[rgb(var(--accent-2))]/60">
          <li>
            <Link
              href="/privacy"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              Privacy
            </Link>{" "}
            — cookies, AdSense, GDPR/CCPA
          </li>
          <li>
            <Link
              href="/terms"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              Terms
            </Link>{" "}
            — subscriptions, acceptable use
          </li>
          <li>
            <Link
              href="/content-policy"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              Content policy
            </Link>{" "}
            — what we publish and how we moderate
          </li>
          <li>
            <Link
              href="/contact"
              className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
            >
              Contact
            </Link>{" "}
            — editorial, press, and support
          </li>
        </ul>
        <p className="text-xs text-[rgb(var(--ink-soft))]/80">
          Last reviewed May 25, 2026 ·{" "}
          <Link
            href="/disclaimer"
            className="underline-offset-2 hover:underline"
          >
            Disclaimer
          </Link>
        </p>
      </div>
    </section>
  );
}
