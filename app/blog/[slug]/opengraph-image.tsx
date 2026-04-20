import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog/posts";

/**
 * Per-article OG image. Each blog post gets a unique, readable preview so
 * the link looks professional when shared on social platforms and appears
 * as a quality signal to AdSense reviewers checking representative pages.
 */
export const alt = "Life Decision Engine article preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "Life Decision Engine";
  const eyebrow = post?.hero?.eyebrow ?? "Life Decision Engine";
  const lede =
    post?.hero?.lede ??
    post?.description ??
    "Structured AI analysis for big life decisions.";

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
          background:
            "linear-gradient(135deg, rgb(22,18,42) 0%, rgb(42,32,84) 50%, rgb(22,18,42) 100%)",
          fontFamily: "system-ui, sans-serif",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, rgb(172,132,255), rgb(56,232,208), rgb(245,150,255))",
                fontSize: 38,
                fontWeight: 800,
                letterSpacing: "-0.04em",
              }}
            >
              L
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: "rgb(230,226,255)",
              }}
            >
              Life Decision Engine
            </div>
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgb(172,132,255)",
              padding: "8px 18px",
              border: "1px solid rgba(172,132,255,0.4)",
              borderRadius: 999,
              background: "rgba(172,132,255,0.12)",
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            maxWidth: 1020,
          }}
        >
          <div
            style={{
              fontSize: title.length > 80 ? 56 : 66,
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "white",
            }}
          >
            {title}
          </div>
          {lede ? (
            <div
              style={{
                fontSize: 24,
                lineHeight: 1.4,
                color: "rgb(196,194,232)",
                fontWeight: 500,
                maxWidth: 980,
              }}
            >
              {lede.length > 180 ? lede.slice(0, 177) + "…" : lede}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            color: "rgb(172,170,215)",
          }}
        >
          <span style={{ fontWeight: 600 }}>lifedecisions.space</span>
          <span>{post?.readingMinutes ?? 8} min read · Editorial Team</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
