"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <html lang="en-US">
      <body style={{ background: "#0a0a0f", color: "#e8e6f0", padding: 24 }}>
        <h1 style={{ fontSize: 20 }}>Application error</h1>
        <p style={{ marginTop: 16, fontSize: 14, opacity: 0.9, maxWidth: 480 }}>
          {isDev
            ? error.message
            : "Something went wrong. Please try again. If it keeps happening, contact support with the reference code below."}
        </p>
        {error.digest ? (
          <p style={{ marginTop: 12, fontFamily: "monospace", fontSize: 12, opacity: 0.75 }}>
            {error.digest}
          </p>
        ) : null}
        <button
          type="button"
          onClick={() => reset()}
          style={{
            marginTop: 24,
            padding: "8px 16px",
            borderRadius: 12,
            border: "1px solid #333",
            background: "#1a1a24",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
