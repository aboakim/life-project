import Link from "next/link";
import ToolPageEducation from "@/components/trust/ToolPageEducation";

export default function RegisterExpertEducation() {
  return (
    <ToolPageEducation
      intro={
        <>
          <p>
            Listing on the Life Decision Engine experts directory is open
            to independent licensed professionals — psychologists,
            lawyers, financial planners, immigration counsel, physicians
            and primary-care providers, and certified coaches — who can
            hold a private decision-support conversation with a reader in
            one of the languages the site is published in. Listings are
            free for the first cohort, and we expect to keep them free
            for individual practitioners; the optional paid tier (when it
            exists) will be for verified placement, not for visibility.
          </p>
          <p>
            The form above is the application. We do a light review (your
            public profile, your registration body or licence number,
            and the language of your bio) before the listing goes live;
            expect a reply within five business days. We are not a
            regulator and we do not validate the depth of your expertise
            — that responsibility sits with you and with the readers who
            choose you.
          </p>
        </>
      }
      sections={[
        {
          heading: "Who fits this directory",
          body: (
            <ul className="list-disc space-y-2 ps-5 marker:text-[rgb(var(--accent-2))]/70">
              <li>
                Independent practitioners or small private practices.
                Large lead-generation agencies, multi-level referral
                networks, and unregulated &ldquo;life coach&rdquo;
                resellers are not a fit.
              </li>
              <li>
                Professionals comfortable with asynchronous, written
                intakes — most readers will message you before they
                book a paid session.
              </li>
              <li>
                At least one of the eight site languages: English,
                Armenian, Russian, German, French, Spanish, Italian, or
                Arabic. Bilingual practitioners are particularly useful
                for cross-border decisions.
              </li>
            </ul>
          ),
        },
        {
          heading: "What the listing shows",
          body: (
            <p>
              Your name, role, country, optional city, languages, a 200
              to 600 character bio in your own words, and an optional
              website link. We do not display fee structures, calendar
              links, or social-media handles in the listing itself — the
              first conversation is for you to negotiate. Avatar photos
              are not shown today; we may add them later with explicit
              consent.
            </p>
          ),
        },
        {
          heading: "What we expect from listed professionals",
          body: (
            <ul className="list-disc space-y-2 ps-5 marker:text-[rgb(var(--accent-2))]/70">
              <li>
                Reply to first messages within five business days, or
                ask us to pause your listing.
              </li>
              <li>
                Be transparent about scope: if a question is outside
                your country or specialty, refer the reader on rather
                than improvising.
              </li>
              <li>
                Do not use the directory to harvest leads for unrelated
                paid programs.
              </li>
              <li>
                Tell us if your registration status changes (suspension,
                retirement, change of country) so we can update or
                remove the listing.
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: "What if my country does not have a formal regulator for my role?",
          a: "Many countries do not regulate, for example, life coaching or some forms of relationship counselling. In that case we ask for the body that issued your training certificate, the year, and a short paragraph about your scope of practice. We list the field; we do not list a registration number that does not exist.",
        },
        {
          q: "Can I list my whole team?",
          a: "The directory is for individuals. If your firm has three lawyers each fluent in different languages, register them separately so readers can pick the right person. For bigger practices, write to /contact — we will look at a small group profile.",
        },
        {
          q: "How do I change or remove my listing?",
          a: "Reply to the welcome email or write to /contact with the change. Self-serve editing is on the roadmap; today, edits go through an editor so the listing quality stays consistent.",
        },
      ]}
      footer={
        <p className="text-xs leading-relaxed text-[rgb(var(--ink-soft))]/85">
          Questions before applying?{" "}
          <Link
            href="/contact"
            className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            Contact the editorial team
          </Link>
          {" "}or read the{" "}
          <Link
            href="/experts"
            className="font-medium text-[rgb(var(--accent-2))] underline-offset-2 hover:underline"
          >
            experts directory
          </Link>
          .
        </p>
      }
      lastReviewed="June 23, 2026"
      lastReviewedISO="2026-06-23"
    />
  );
}
