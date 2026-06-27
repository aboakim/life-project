/** Single source for AdSense publisher ID (verification + ad units). */
export const ADSENSE_CLIENT_ID = "ca-pub-3541461663112540";

export function readAdsenseClientId(): string {
  return process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() || ADSENSE_CLIENT_ID;
}
