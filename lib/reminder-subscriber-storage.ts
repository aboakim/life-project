export const REMINDER_SUBSCRIBER_ID_KEY = "lde-reminder-subscriber-id";

export function getStoredSubscriberId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(REMINDER_SUBSCRIBER_ID_KEY);
    return v && v.length > 0 ? v : null;
  } catch {
    return null;
  }
}

export function setStoredSubscriberId(id: string): void {
  try {
    window.localStorage.setItem(REMINDER_SUBSCRIBER_ID_KEY, id);
  } catch {
    /* ignore */
  }
}
