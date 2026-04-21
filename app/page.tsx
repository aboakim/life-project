import { Suspense } from "react";
import DecisionStudioShell from "@/components/home/DecisionStudioShell";

export default function Home() {
  return (
    <main id="main">
      <Suspense
        fallback={
          <div className="relative z-10 min-h-screen bg-[rgb(var(--surface))]" />
        }
      >
        <DecisionStudioShell />
      </Suspense>
    </main>
  );
}
