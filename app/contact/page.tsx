import type { Metadata } from "next";
import Link from "next/link";
import MarketingPageShell from "@/components/layout/MarketingPageShell";
import ContactMailtoForm from "@/components/contact/ContactMailtoForm";

export const metadata: Metadata = {
  title: "Contact — Life Decision Engine",
  description:
    "How to reach the Life Decision Engine team: support questions, privacy requests, expert partnerships, and press.",
  alternates: { canonical: "/contact" },
};

function getContactEmail(): string {
  const raw = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  if (raw && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) return raw;
  return "hello@lifedecisions.space";
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
          <ContactMailtoForm email={email} />
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
