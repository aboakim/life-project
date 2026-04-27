/** URL ?preset= — passed from server page so we avoid client-only useSearchParams + Suspense blank flash. */
export type InitialPreset = "relocate" | "job" | "relationship" | null;

export function initialPresetFromSearchParams(
  sp: Record<string, string | string[] | undefined>,
): InitialPreset {
  const raw = sp.preset;
  const v = Array.isArray(raw) ? raw[0] : raw;
  return v === "relocate" || v === "job" || v === "relationship" ? v : null;
}
