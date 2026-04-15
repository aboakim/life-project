import { NextResponse } from "next/server";

/** AdSense sellers.json / ads.txt — must match AdSense publisher ID. */
const ADS_TXT = `google.com, pub-3541461663112540, DIRECT, f08c47fec0942fa0
`;

export async function GET() {
  return new NextResponse(ADS_TXT, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
