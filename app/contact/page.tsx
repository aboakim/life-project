import type { Metadata } from "next";
import Link from "next/link";
import MarketingPageShell from "@/components/layout/MarketingPageShell";

export const metadata: Metadata = {
  title: "Contact — Life Decision Engine",
  description:
    "How to reach the Life Decision Engine team: support questions, privacy requests, expert partnerships, and press.",
  alternates: { canonical: "/contact" },
};

function getContactEmail(): string {
  const raw = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  if (raw && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) return raw;
  return "hello@life-decision-engine.app";
}

type ChannelCard = {
  title: string;
  blurb: string;
  cta: { label: string; href: string };
};

const CHANNELS: ChannelCard[] = [
  {
    title: "Product support",
    blurb:
      "Something broken, confusing, or missing in the analyzer, blog, or FAQ? Email us and we read every message.",
    cta: { label: "Email support", href: "#contact-form" },
  },
  {
    title: "Privacy & data requests",
    blurb:
      "Deletion, access, or correction requests under GDPR/CCPA or similar. We respond within a reasonable timeframe.",
    cta: { label: "Read our Privacy Policy", href: "/privacy" },
  },
  {
    title: "Become a listed expert",
    blurb:
      "Licensed psychologists, lawyers, and financial professionals can apply to be listed in the experts directory.",
    cta: { label: "Apply as expert", href: "/experts/register" },
  },
  {
    title: "Press & partnerships",
    blurb:
      "Journalists, podcasters, and partners — use the form below with a quick note about what you are working on.",
    cta: { label: "Open contact form", href: "#contact-form" },
  },
];

export default function ContactPage() {
  const email = getContactEmail();
  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(
    "Life Decision Engine inquiry",
  )}`;

  return (
    <MarketingPageShell
      eyebrow="Contact"
      title="Talk to the team"
      subtitle={
        <p>
          We try to reply to every genuine message. Pick the channel that fits
          your question, or use the form at the bottom of the page. We are a
          small team and occasional delays happen — thank you for being
          patient.
        </p>
      }
    >
      <div className="max-w-4xl space-y-12 text-[15px] leading-relaxed text-[rgb(var(--ink-soft))]">
        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Direct email
          </h2>
          <p className="mt-3">
            The fastest channel is email:
          </p>
          <a
            href={mailtoHref}
            className="mt-3 inline-flex items-center gap-2 rounded-xl border border-[rgb(var(--accent))]/35 bg-[rgb(var(--accent))]/10 px-4 py-2.5 text-sm font-semibold text-[rgb(var(--ink))] transition hover:border-[rgb(var(--accent))]/60"
          >
            <span aria-hidden="true">✉</span>
            {email}
          </a>
          <p className="mt-3 text-xs text-[rgb(var(--ink-soft))]/85">
            If the mail link does not work in your environment, copy the
            address manually into your mail client.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Choose a channel
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {CHANNELS.map((c) => (
              <li
                key={c.title}
                className="flex flex-col rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-5 transition hover:-translate-y-0.5 hover:border-[rgb(var(--accent))]/25"
              >
                <h3 className="text-sm font-semibold text-[rgb(var(--ink))]">
                  {c.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed">
                  {c.blurb}
                </p>
                {c.cta.href.startsWith("#") ? (
                  <a
                    href={c.cta.href}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[rgb(var(--accent-2))] hover:underline"
                  >
                    {c.cta.label} <span aria-hidden="true">→</span>
                  </a>
                ) : (
                  <Link
                    href={c.cta.href}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[rgb(var(--accent-2))] hover:underline"
                  >
                    {c.cta.label} <span aria-hidden="true">→</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section id="contact-form" className="scroll-mt-32">
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Contact form
          </h2>
          <p className="mt-3">
            Submitting this form opens your default email client with the
            message pre-filled. No data is collected or stored by our
            servers from this form.
          </p>
          <form
            action={`mailto:${email}`}
            method="post"
            encType="text/plain"
            className="mt-6 space-y-4 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-5 sm:p-6"
          >
            <div>
              <label
                htmlFor="contact-name"
                className="block text-sm font-medium text-[rgb(var(--ink))]"
              >
                Your name
              </label>
              <input
                id="contact-name"
                name="name"
                required
                autoComplete="name"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/25 px-4 py-2.5 text-sm text-[rgb(var(--ink))] placeholder:text-[rgb(var(--ink-soft))]/65 outline-none transition focus:border-[rgb(var(--accent))]/45 focus:ring-2 focus:ring-[rgb(var(--accent))]/15"
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block text-sm font-medium text-[rgb(var(--ink))]"
              >
                Your email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/25 px-4 py-2.5 text-sm text-[rgb(var(--ink))] placeholder:text-[rgb(var(--ink-soft))]/65 outline-none transition focus:border-[rgb(var(--accent))]/45"
                placeholder="jane@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="contact-subject"
                className="block text-sm font-medium text-[rgb(var(--ink))]"
              >
                Subject
              </label>
              <select
                id="contact-subject"
                name="subject"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/25 px-4 py-2.5 text-sm text-[rgb(var(--ink))] outline-none transition focus:border-[rgb(var(--accent))]/45"
                defaultValue="Product support"
              >
                <option>Product support</option>
                <option>Privacy / data request</option>
                <option>Expert partnership</option>
                <option>Press / media</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-medium text-[rgb(var(--ink))]"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm leading-relaxed text-[rgb(var(--ink))] placeholder:text-[rgb(var(--ink-soft))]/65 outline-none transition focus:border-[rgb(var(--accent))]/45"
                placeholder="How can we help?"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[rgb(var(--accent)/0.28)] transition hover:brightness-110"
            >
              Send message
              <span aria-hidden="true">→</span>
            </button>
          </form>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[rgb(var(--ink))]">
            Response expectations
          </h2>
          <p className="mt-3">
            We aim to reply to genuine messages within 3–5 business days.
            Automated replies, spam, and unsolicited sales pitches are not
            prioritised. For urgent safety concerns, please contact emergency
            services or a local professional rather than relying on email.
          </p>
        </section>

        <p className="pt-4">
          <Link
            href="/"
            className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </MarketingPageShell>
  );
}
