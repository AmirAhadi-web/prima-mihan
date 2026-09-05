"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dot = { x: pos.x, y: pos.y };
    const ring = { x: pos.x, y: pos.y };
    let hovering = false;
    let pressed = false;
    let raf = 0;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        dotRef.current?.style.setProperty("opacity", "1");
        ringRef.current?.style.setProperty("opacity", "1");
      }
      const t = e.target as HTMLElement | null;
      hovering = !!t?.closest("[data-hover], a, button");
    };
    const onDown = () => (pressed = true);
    const onUp = () => (pressed = false);
    const onLeave = () => {
      visible = false;
      dotRef.current?.style.setProperty("opacity", "0");
      ringRef.current?.style.setProperty("opacity", "0");
    };

    const loop = () => {
      dot.x += (pos.x - dot.x) * 0.42;
      dot.y += (pos.y - dot.y) * 0.42;
      ring.x += (pos.x - ring.x) * 0.16;
      ring.y += (pos.y - ring.y) * 0.16;

      const dotScale = pressed ? 0.6 : hovering ? 0.45 : 1;
      const ringScale = pressed ? 1.5 : hovering ? 1.9 : 1;

      dotRef.current?.style.setProperty(
        "transform",
        `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%) scale(${dotScale})`
      );
      ringRef.current?.style.setProperty(
        "transform",
        `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${ringScale})`
      );
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[130] h-10 w-10 rounded-full border border-gold/60 opacity-0 mix-blend-difference transition-opacity duration-500"
        style={{ willChange: "transform" }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[130] h-[7px] w-[7px] rounded-full bg-gold opacity-0 mix-blend-difference transition-opacity duration-500"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
