"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { EASE_LUX } from "@/lib/motion";

const WORD = "MIHAN PRIMA".split("");
const EASE = EASE_LUX;

export default function Preloader() {
  const [phase, setPhase] = useState<"in" | "out" | "gone">("in");

  useEffect(() => {
    const MIN = 2100;
    const MAX = 4200;
    const start = performance.now();

    const ready = new Promise<void>((resolve) => {
      if (document.readyState === "complete") return resolve();
      window.addEventListener("load", () => resolve(), { once: true });
    });

    Promise.race([ready, new Promise((r) => setTimeout(r, MAX))]).then(() => {
      const wait = Math.max(0, MIN - (performance.now() - start));
      setTimeout(() => setPhase("out"), wait);
    });
  }, []);

  if (phase === "gone") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
      initial={false}
      animate={phase === "out" ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => phase === "out" && setPhase("gone")}
      aria-hidden={phase !== "in"}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: phase === "out" ? 0 : 1, scale: 1, y: phase === "out" ? -24 : 0 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="flex flex-col items-center"
      >
        <Image
          src="/mihan-prima.png"
          alt=""
          width={120}
          height={148}
          priority
          className="mb-10 w-[74px] opacity-90 md:w-[88px]"
        />
        <div className="flex overflow-hidden">
          {WORD.map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: EASE, delay: 0.35 + i * 0.045 }}
              className="font-display text-[clamp(1.8rem,5vw,3.2rem)] font-light tracking-[0.28em] text-ivory"
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.9 }}
          className="hairline-x mt-7 w-44 origin-center md:w-56"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.25 }}
          className="smallcaps mt-6 text-[9px] text-gold/80 md:text-[10px]"
        >
          Maison de Glace — Est. 1980
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
