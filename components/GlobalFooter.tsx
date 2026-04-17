import Link from "next/link";

type FooterLink = { href: string; label: string };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { href: "/#section-workspace", label: "Analyzer" },
      { href: "/experts", label: "Experts" },
      { href: "/community", label: "Community Q&A" },
      { href: "/pricing", label: "Pricing" },
      { href: "/monetize", label: "Revenue" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/faq", label: "FAQ" },
      { href: "/about", label: "About" },
      { href: "/experts/register", label: "Join as expert" },
    ],
  },
  {
    title: "Company & legal",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

export default function GlobalFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 mt-24 border-t border-white/[0.07] bg-[rgb(var(--surface))]/80 pt-14 pb-10 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="text-sm font-semibold text-[rgb(var(--ink))]">
              Life Decision Engine
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
              A structured workspace for big life decisions — scenarios,
              lenses, timelines, and a score. Built to help you think clearly,
              not to replace professionals.
            </p>
            <p className="mt-5 text-xs text-[rgb(var(--ink-soft))]/75">
              Not medical, legal, or therapeutic advice.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title} className="text-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[rgb(var(--accent-dim))]">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[rgb(var(--ink-soft))] transition hover:text-[rgb(var(--ink))]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-xs text-[rgb(var(--ink-soft))]/85 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Life Decision Engine. All rights reserved.</p>
          <p>
            Independent project · operated internationally · built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
