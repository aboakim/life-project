"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-xl font-semibold text-[rgb(var(--ink))]">
        Something went wrong
      </h1>
      <p className="mt-3 whitespace-pre-wrap break-words text-sm text-[rgb(var(--ink-soft))]">
        {isDev
          ? error.message
          : "Please try again. If it keeps happening, contact support with the reference code below."}
      </p>
      {error.digest ? (
        <p className="mt-2 font-mono text-xs text-[rgb(var(--ink-soft))]/80">
          {error.digest}
        </p>
      ) : null}
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-xl bg-white/10 px-4 py-2 text-sm text-[rgb(var(--ink))]"
      >
        Try again
      </button>
    </div>
  );
}
