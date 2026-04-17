import type { Metadata } from "next";
import Link from "next/link";
import MarketingPageShell from "@/components/layout/MarketingPageShell";

export const metadata: Metadata = {
  title: "Page not found — Life Decision Engine",
  description:
    "That page doesn't exist on Life Decision Engine. Try the blog, FAQ, experts directory, or head home.",
  robots: { index: false, follow: true },
};

const SHORTCUTS: { href: string; label: string; hint: string }[] = [
  {
    href: "/",
    label: "Home",
    hint: "Open the structured decision analyzer.",
  },
  {
    href: "/blog",
    label: "Blog",
    hint: "Long-form essays on real decisions.",
  },
  {
    href: "/faq",
    label: "FAQ",
    hint: "Answers to common questions.",
  },
  {
    href: "/experts",
    label: "Experts",
    hint: "Psychologists, lawyers, financial pros.",
  },
  {
    href: "/pricing",
    label: "Pricing",
    hint: "Free and premium plans.",
  },
  {
    href: "/contact",
    label: "Contact",
    hint: "Report a broken link or get in touch.",
  },
];

export default function NotFound() {
  return (
    <MarketingPageShell
      eyebrow="404"
      title="That page isn't here."
      subtitle={
        <p>
          The link may be old, the URL may have a typo, or the page may have
          moved. Here are the places most people are looking for.
        </p>
      }
    >
      <ul className="grid max-w-3xl gap-4 sm:grid-cols-2">
        {SHORTCUTS.map((s) => (
          <li
            key={s.href}
            className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-5 transition hover:-translate-y-0.5 hover:border-[rgb(var(--accent))]/25"
          >
            <Link
              href={s.href}
              className="block text-[rgb(var(--ink))] transition hover:text-[rgb(var(--accent-2))]"
            >
              <span className="text-sm font-semibold">{s.label}</span>
              <span className="mt-1 block text-xs text-[rgb(var(--ink-soft))]">
                {s.hint}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm text-[rgb(var(--ink-soft))]/85">
        Still can&rsquo;t find what you were looking for?{" "}
        <Link
          href="/contact"
          className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
        >
          Let us know
        </Link>
        .
      </p>
    </MarketingPageShell>
  );
}
