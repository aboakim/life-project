"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";

type Props = {
  children: ReactNode;
  /** Scene (perspective box) */
  className?: string;
  /** Inner layer that receives rotate / translateZ */
  innerClassName?: string;
  /** Max tilt in degrees toward cursor */
  maxTilt?: number;
  /** Pop toward viewer on hover */
  floatZ?: number;
};

/**
 * Mouse-reactive 3D tilt. Respects `prefers-reduced-motion` (no transform).
 */
export default function TiltPlane({
  children,
  className = "",
  innerClassName = "",
  maxTilt = 8,
  floatZ = 12,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const reducedRef = useRef(false);
  const leaveTimerRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(
    () => () => {
      if (leaveTimerRef.current) window.clearTimeout(leaveTimerRef.current);
    },
    [],
  );

  const onLeave = useCallback(() => {
    const plane = planeRef.current;
    if (!plane || reducedRef.current) return;
    if (leaveTimerRef.current) window.clearTimeout(leaveTimerRef.current);
    plane.style.transition =
      "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.55s ease";
    plane.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px)";
    plane.style.boxShadow = "";
    leaveTimerRef.current = window.setTimeout(() => {
      plane.style.transition = "";
      leaveTimerRef.current = null;
    }, 560);
  }, []);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const root = rootRef.current;
      const plane = planeRef.current;
      if (!root || !plane || reducedRef.current) return;
      const r = root.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      const ry = x * 2 * maxTilt;
      const rx = -y * 2 * maxTilt;
      plane.style.transition = "";
      plane.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${floatZ}px)`;
      const dy = 18 + rx * 0.35;
      const dx = -ry * 0.5;
      plane.style.boxShadow = `${dx}px ${dy}px 44px -16px rgba(0,0,0,0.38), 0 0 52px -14px rgba(139,92,246,0.2)`;
    },
    [maxTilt, floatZ],
  );

  return (
    <div
      ref={rootRef}
      className={`tilt-scene ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div ref={planeRef} className={`tilt-plane h-full ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}
