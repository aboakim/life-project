import { ImageResponse } from "next/og";

/**
 * Site-wide OpenGraph image (used when pages do not define their own).
 * 1200×630 is the recommended size for Twitter/LinkedIn/Facebook preview.
 */
export const alt =
  "Life Decision Engine — Stop overthinking. Decide in seconds.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          background:
            "linear-gradient(135deg, rgb(22,18,42) 0%, rgb(38,28,74) 50%, rgb(22,18,42) 100%)",
          fontFamily: "system-ui, sans-serif",
          color: "white",
        }}
      >
        {/* Top: brand mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, rgb(172,132,255), rgb(56,232,208), rgb(245,150,255))",
              fontSize: 46,
              fontWeight: 800,
              letterSpacing: "-0.04em",
            }}
          >
            L
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: "rgb(230,226,255)",
            }}
          >
            Life Decision Engine
          </div>
        </div>

        {/* Middle: headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontSize: 56,
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "white",
            }}
          >
            Stop overthinking. Decide in seconds.
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              color: "rgb(196,194,232)",
              fontWeight: 500,
            }}
          >
            Get instant clarity on any decision using AI-powered scenarios—not
            random chat.
          </div>
        </div>

        {/* Bottom: URL + tags */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "rgb(172,170,215)",
          }}
        >
          <span style={{ fontWeight: 600 }}>lifedecisions.space</span>
          <span>
            Private session · Structured scenarios · Experts optional
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
