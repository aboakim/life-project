"use client";

import DecisionStudio from "@/components/DecisionStudio";
import type { InitialPreset } from "@/lib/home/initial-preset";

export type { InitialPreset };

type ShellProps = {
  initialPreset?: InitialPreset;
  focusLayout?: boolean;
  /** Home: hero is server-rendered; studio loads below after idle. */
  skipHero?: boolean;
};

/** Client wrapper — preset comes from the server page (no useSearchParams → no Suspense blank gap). */
export default function DecisionStudioShell({
  initialPreset = null,
  focusLayout = false,
  skipHero = false,
}: ShellProps) {
  return (
    <DecisionStudio
      initialPreset={initialPreset}
      focusLayout={focusLayout}
      skipHero={skipHero}
    />
  );
}
