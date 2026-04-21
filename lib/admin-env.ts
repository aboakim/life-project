/**
 * Reads ADMIN_SECRET with trim (avoids failed checks from accidental spaces in the host UI).
 * Returns null if unset or shorter than 16 characters.
 */
export function readAdminSecret(): string | null {
  const s = process.env.ADMIN_SECRET?.trim() ?? "";
  if (s.length < 16) return null;
  return s;
}
