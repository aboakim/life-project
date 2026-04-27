/** URL ?preset= — shared by server parsing (optional) and client URL read. */
export type InitialPreset = "relocate" | "job" | "relationship" | null;

export function parsePresetQuery(value: string | null): InitialPreset {
  if (!value) return null;
  return value === "relocate" || value === "job" || value === "relationship"
    ? value
    : null;
}

export function initialPresetFromSearchParams(
  sp: Record<string, string | string[] | undefined>,
): InitialPreset {
  const raw = sp.preset;
  const v = Array.isArray(raw) ? raw[0] : raw;
  return parsePresetQuery(v ?? null);
}
