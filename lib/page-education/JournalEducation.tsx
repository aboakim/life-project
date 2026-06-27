import ToolPageEducation from "@/components/trust/ToolPageEducation";

export default function JournalEducation() {
  return (
    <ToolPageEducation
      intro={
        <>
          <p>
            A decision journal is a deliberately small habit: one or two
            lines, captured at the moment a real choice is in front of
            you, written before you know how it turned out. Done over
            weeks and months, it becomes the single most useful artefact
            you can have when you face the next hard call — because it
            shows you, in your own handwriting, how your past predictions
            actually compared to reality.
          </p>
          <p>
            This page is intentionally minimal: a textarea and a list.
            Nothing is sent to a server. Entries are stored only in your
            browser&apos;s localStorage on this device. If you clear your
            browser data, the journal goes with it; if you switch
            devices, it does not follow. That trade-off is on purpose —
            the smaller the surface that can leak, the more honestly
            most people write.
          </p>
        </>
      }
      sections={[
        {
          heading: "Why keep a decision journal",
          body: (
            <ul className="list-disc space-y-2 ps-5 marker:text-[rgb(var(--accent-2))]/70">
              <li>
                It separates <em>process quality</em> from{" "}
                <em>outcome quality</em>. Good decisions can have bad
                outcomes; bad decisions can get lucky. A journal lets you
                judge the reasoning, not just the result.
              </li>
              <li>
                It defeats hindsight bias. Six months from now, you will
                feel certain you &quot;always knew&quot; the answer. The
                journal is your honest record that you didn&apos;t.
              </li>
              <li>
                It makes patterns legible. After ten or twenty entries
                you start seeing your repeated mistakes — being too
                optimistic about timelines, anchoring on sunk cost,
                deferring conflict — and you can address the pattern
                instead of the next instance.
              </li>
            </ul>
          ),
        },
        {
          heading: "What to actually write",
          body: (
            <>
              <p>
                A useful entry has four pieces and fits in two short
                sentences:
              </p>
              <ol className="list-decimal space-y-2 ps-5 marker:font-semibold marker:text-[rgb(var(--accent-2))]">
                <li>
                  <strong className="text-[rgb(var(--ink))]">
                    The decision in plain words.
                  </strong>{" "}
                  &quot;Going to accept the Berlin offer over staying in
                  the current role.&quot;
                </li>
                <li>
                  <strong className="text-[rgb(var(--ink))]">
                    Your prediction.
                  </strong>{" "}
                  &quot;I expect to be glad I moved within six months;
                  worried about the salary cut.&quot;
                </li>
                <li>
                  <strong className="text-[rgb(var(--ink))]">
                    Your confidence.
                  </strong>{" "}
                  A rough percentage, e.g. &quot;70 percent.&quot;
                </li>
                <li>
                  <strong className="text-[rgb(var(--ink))]">
                    What you would update on.
                  </strong>{" "}
                  &quot;If I am still anxious about the language at
                  month four, I will reconsider.&quot;
                </li>
              </ol>
            </>
          ),
        },
        {
          heading: "How this pairs with the analyzer",
          body: (
            <p>
              When you run a decision through the analyzer on the
              homepage, copy the headline from the report — the score,
              or the single sentence that captures the recommendation —
              into a journal entry as your prediction. Months later,
              open the same entry, write a one-liner about how it
              actually played out, and you have a closed feedback loop
              for the AI&apos;s reasoning as well as your own.
            </p>
          ),
        },
      ]}
      faq={[
        {
          q: "Is there a way to back up entries?",
          a: "Not yet inside the page itself. As a workaround you can copy the entries you want to keep into a plain text file or a notes app. We are evaluating an export-to-JSON button for a future release.",
        },
        {
          q: "Will entries sync between my phone and laptop?",
          a: "No — localStorage is per-device, per-browser. That is a privacy choice, not an oversight. If a device-spanning history matters to you, write the entries in a notes app you already trust (Apple Notes, Google Keep, Obsidian) and use this page only for one-line captures during a session.",
        },
        {
          q: "How long should I keep doing it?",
          a: "Most of the value shows up between entry 10 and entry 30. If after a month you have written nothing, the page is honest feedback that the format is not your style — try a paper notebook or a recurring weekly note instead.",
        },
      ]}
      lastReviewed="May 5, 2026"
      lastReviewedISO="2026-05-05"
    />
  );
}
