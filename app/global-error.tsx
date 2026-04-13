"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-US">
      <body style={{ background: "#0a0a0f", color: "#e8e6f0", padding: 24 }}>
        <h1 style={{ fontSize: 20 }}>Application error</h1>
        <pre
          style={{
            marginTop: 16,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            fontSize: 13,
            opacity: 0.9,
          }}
        >
          {error.message}
        </pre>
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
