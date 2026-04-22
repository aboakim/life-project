"use client";

import { useSearchParams } from "next/navigation";
import DecisionStudio from "@/components/DecisionStudio";

export type InitialPreset = "relocate" | "job" | "relationship" | null;

type ShellProps = { focusLayout?: boolean };

export default function DecisionStudioShell({ focusLayout = false }: ShellProps) {
  const searchParams = useSearchParams();
  const raw = searchParams.get("preset");
  const initialPreset: InitialPreset =
    raw === "relocate" || raw === "job" || raw === "relationship"
      ? raw
      : null;
  return (
    <DecisionStudio
      initialPreset={initialPreset}
      focusLayout={focusLayout}
    />
  );
}
