import ToolPageEducation from "@/components/trust/ToolPageEducation";

export default function ChecklistsEducation() {
  return (
    <ToolPageEducation
      intro={
        <>
          <p>
            Three printable checklists live on this page: relocation, a
            job offer, and a relationship-or-cohabitation conversation.
            Each one is a tight one-pager that you can print, save as a
            PDF, or screenshot — whichever way you actually keep
            paperwork. They are the kind of lists you will not regret
            running through before you sign a lease, accept an offer,
            or have the conversation you have been postponing.
          </p>
          <p>
            The checklists are deliberately readable in two minutes.
            They are not exhaustive — that is the point. A 200-item
            relocation checklist is comforting to write and useless to
            actually use; the 18 items on this page are the ones that
            most often go wrong when people skip them.
          </p>
        </>
      }
      sections={[
        {
          heading: "How to use the checklists",
          body: (
            <ol className="list-decimal space-y-2 ps-5 marker:font-semibold marker:text-[rgb(var(--accent-2))]">
              <li>
                Pick the theme (Dark glass / Paper / Ink) that prints
                best on your printer or reads best on your screen, then
                tap <em>Print</em>. Modern browsers let you save as PDF
                from the same dialog.
              </li>
              <li>
                Walk through the items as questions, not chores. Each
                one ends in something concrete — a number, a name, a
                date, a yes/no — so you can tell whether you really
                have the answer.
              </li>
              <li>
                For items that turn into a real worry, drop the worry
                into the analyzer on the homepage as a question, or ask
                the community. The checklist surfaces the question; the
                rest of the site helps you decide.
              </li>
            </ol>
          ),
        },
        {
          heading: "Why a small checklist beats a long one",
          body: (
            <p>
              Decision researchers have a polite term for the long
              version: completionism. The longer the list, the more it
              invites scanning instead of doing. We picked the items by
              reading our blog archive plus the published checklists of
              major airlines, relocation firms, and family-law clinics,
              then keeping only the items that were either expensive to
              miss (visa categories, deposit clauses) or emotionally
              expensive to revisit (the conversation that does not
              happen). Everything else is in longer reading on the
              blog.
            </p>
          ),
        },
        {
          heading: "Combining checklists with the analyzer",
          body: (
            <p>
              A checklist is excellent at making sure you have not
              missed a category. It is bad at telling you which option
              is actually right for your particular trade-offs. That
              is the analyzer&apos;s job. Run the checklist first to
              surface the items you cannot answer, then take the two
              or three open questions into the analyzer or the experts
              directory.
            </p>
          ),
        },
      ]}
      faq={[
        {
          q: "Can I print the checklists?",
          a: "Yes. Each page has a Print button that opens your browser's print dialog. From there you can send to a paper printer or save as a PDF — both produce a clean one-pager without the site chrome.",
        },
        {
          q: "Are these checklists translated?",
          a: "Yes. The labels and items follow the same eight-language localization as the rest of the site (English, Armenian, Russian, German, French, Spanish, Italian, Arabic). Switch language in the header and the printable view follows.",
        },
        {
          q: "Can I edit a checklist before printing?",
          a: "There is no built-in editor; the items are picked deliberately and we don't want to invite drift. If you need to add a personal item, print to PDF and annotate it with a free PDF reader (Preview, Adobe Reader, or any browser).",
        },
        {
          q: "Why these three checklists and not more?",
          a: "Relocation, a job offer, and a relationship-or-cohabitation conversation cover the three decisions that most often arrive with a hard deadline and a paper trail. Other decisions (kids, health, retirement) deserve longer essays rather than checklists, and live on the blog.",
        },
      ]}
      lastReviewed="May 5, 2026"
      lastReviewedISO="2026-05-05"
    />
  );
}
