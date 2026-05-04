import { ImageResponse } from "next/og";

/**
 * Site-wide OpenGraph image — matches home hero copy and visual language
 * (accent gradients, dark base). 1200×630 for Twitter/LinkedIn/Telegram.
 */
export const alt =
  "Life Decision Engine — Stop overthinking. Decide in seconds.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

/** Mirrors `lib/i18n/ui.ts` English home hero (brand + H1 + subtitle + ribbon). */
const COPY = {
  brand: "Life Decision Engine",
  heroLine1: "Stop overthinking.",
  heroAccent: "Decide in seconds.",
  subtitle:
    "Get instant clarity on any decision using AI-powered scenarios—not random chat.",
  ribbon: "Private session · Structured scenarios · Experts optional",
  domain: "lifedecisions.space",
  tags: "Career · Relocation · Relationships · Money",
} as const;

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
          padding: "72px 88px",
          backgroundColor: "#16122a",
          backgroundImage: [
            "radial-gradient(ellipse 820px 520px at 8% 88%, rgba(108,232,200,0.2), transparent 56%)",
            "radial-gradient(ellipse 760px 480px at 92% 8%, rgba(154,158,255,0.22), transparent 55%)",
            "radial-gradient(ellipse 640px 420px at 48% 42%, rgba(226,198,248,0.1), transparent 58%)",
            "linear-gradient(165deg, rgb(18,14,36) 0%, rgb(28,22,52) 45%, rgb(16,14,34) 100%)",
          ].join(", "),
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, rgb(172,132,255), rgb(56,232,208), rgb(245,150,255))",
              fontSize: 42,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "white",
            }}
          >
            L
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "rgb(232,228,255)",
            }}
          >
            {COPY.brand}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: 1020,
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "baseline",
              gap: "10px 14px",
            }}
          >
            <span
              style={{
                fontSize: 52,
                lineHeight: 1.05,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "rgb(248,246,255)",
              }}
            >
              {COPY.heroLine1}
            </span>
            <span
              style={{
                fontSize: 52,
                lineHeight: 1.05,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                backgroundImage:
                  "linear-gradient(90deg, rgb(154,158,255), rgb(72,224,188), rgb(132,218,178))",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {COPY.heroAccent}
            </span>
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.42,
              color: "rgb(198,196,232)",
              fontWeight: 500,
              maxWidth: 980,
            }}
          >
            {COPY.subtitle}
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "0.02em",
              color: "rgb(120,220,200)",
            }}
          >
            {COPY.ribbon}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 21,
            color: "rgb(168,166,210)",
          }}
        >
          <span style={{ fontWeight: 700, color: "rgb(210,208,240)" }}>
            {COPY.domain}
          </span>
          <span style={{ fontWeight: 500 }}>{COPY.tags}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
