"use client";

import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServer() {
  return false;
}

type Props = {
  children: ReactNode;
  className?: string;
  /** Extra classes on the inner transformed layer */
  innerClassName?: string;
  /** Max tilt in degrees (each axis). */
  tiltMax?: number;
  /** Multiplier for pointer distance → tilt. */
  sensitivity?: number;
  /** Moving specular highlight */
  glare?: boolean;
};

/**
 * Pointer-driven 3D tilt + optional glare. Disabled when the user prefers reduced motion.
 */
export default function Surface3D({
  children,
  className = "",
  innerClassName = "",
  tiltMax = 7,
  sensitivity = 1,
  glare = true,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServer
  );
  const [style, setStyle] = useState<CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<CSSProperties>({
    opacity: 0,
    background:
      "radial-gradient(ellipse 120% 80% at 50% 50%, rgb(255 255 255 / 0.22), transparent 55%)",
  });

  const reset = useCallback(() => {
    setStyle({
      transform: "rotateX(0deg) rotateY(0deg) translateZ(0)",
    });
    setGlareStyle((g) => ({ ...g, opacity: 0 }));
  }, []);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = rootRef.current;
      if (!el || reduceMotion) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      const k = tiltMax * 2 * sensitivity;
      const rotX = (-y * k).toFixed(2);
      const rotY = (x * k).toFixed(2);
      setStyle({
        transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`,
      });
      if (glare) {
        const gx = ((e.clientX - r.left) / r.width) * 100;
        const gy = ((e.clientY - r.top) / r.height) * 100;
        setGlareStyle({
          opacity: 0.22 + Math.min(0.2, (Math.abs(x) + Math.abs(y)) * 0.25),
          background: `radial-gradient(ellipse 95% 75% at ${gx}% ${gy}%, rgb(255 255 255 / 0.38), transparent 52%)`,
        });
      }
    },
    [glare, reduceMotion, sensitivity, tiltMax]
  );

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={rootRef}
      className={`surface3d-perspective ${className}`.trim()}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      <div
        className={`surface3d-inner relative transform-gpu transition-transform duration-200 ease-out will-change-transform ${innerClassName}`.trim()}
        style={style}
      >
        {children}
        {glare ? (
          <div
            className="pointer-events-none absolute inset-0 z-[1] mix-blend-soft-light transition-opacity duration-200"
            style={glareStyle}
            aria-hidden
          />
        ) : null}
      </div>
    </div>
  );
}
