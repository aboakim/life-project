"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Any overlap with the viewport counts as “already seen” — avoids opacity-0 on first paint for partially visible sections (helps Speed Index). */
function overlapsViewport(el: HTMLElement): boolean {
  const r = el.getBoundingClientRect();
  const vh =
    typeof window !== "undefined" ? window.visualViewport?.height ?? window.innerHeight : 0;
  const vw =
    typeof window !== "undefined" ? window.visualViewport?.width ?? window.innerWidth : 0;
  return r.bottom > 0 && r.top < vh && r.right > 0 && r.left < vw;
}

export default function RevealOnScroll({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setVisible(true);
      return;
    }
    if (overlapsViewport(el)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setVisible(true);
      },
      {
        threshold: [0, 0.06, 0.12],
        rootMargin: "80px 0px 120px 0px",
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${visible ? "reveal-on-scroll--visible" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
