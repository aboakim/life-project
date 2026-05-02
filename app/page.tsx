import DecisionStudioShell from "@/components/home/DecisionStudioShell";

/** Static route — `?preset=` is applied client-side in DecisionStudio (no searchParams → faster prerender). */
export default function Home() {
  return (
    <main id="main">
      <DecisionStudioShell />
    </main>
  );
}
