import { ImageResponse } from "next/og";

/**
 * Dynamic favicon served at /icon (Next.js metadata route convention).
 * Uses the same gradient as the site brand mark so browser tabs and
 * SERP favicons are immediately recognisable as Life Decision Engine.
 */
export const size = { width: 64, height: 64 };
export const contentType = "image/png";
export const runtime = "edge";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, rgb(172,132,255) 0%, rgb(56,232,208) 55%, rgb(245,150,255) 100%)",
          color: "white",
          fontSize: 40,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          fontFamily: "system-ui, sans-serif",
          borderRadius: 14,
        }}
      >
        L
      </div>
    ),
    { ...size },
  );
}
