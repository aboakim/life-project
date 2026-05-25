import type { Metadata } from "next";
import TrustPageView from "@/components/trust/TrustPageView";
import ContactMailtoForm from "@/components/contact/ContactMailtoForm";
import { getContactCopy } from "@/lib/i18n/trust-pages/get-copy";
import { getServerPageLocale } from "@/lib/i18n/trust-pages/server-locale";

function getContactEmail(): string {
  const raw = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  if (raw && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) return raw;
  return "hello@lifedecisions.space";
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerPageLocale();
  const copy = getContactCopy(locale);
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: { canonical: "/contact" },
  };
}

export default async function ContactPage() {
  const locale = await getServerPageLocale();
  const copy = getContactCopy(locale);
  const email = getContactEmail();

  return (
    <>
      <TrustPageView copy={copy} locale={locale} />
      <div className="relative z-10 mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <section id="contact-form" className="scroll-mt-32">
          <ContactMailtoForm email={email} />
        </section>
      </div>
    </>
  );
}
