"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Word = { t: string; accent?: boolean };

const SENTENCE: Word[] = [
  { t: "Patience," },
  { t: "rendered" },
  { t: "in" },
  { t: "chocolate.", accent: true },
  { t: "We" },
  { t: "stone-grind" },
  { t: "single-origin" },
  { t: "cacao" },
  { t: "until" },
  { t: "it" },
  { t: "surrenders" },
  { t: "into" },
  { t: "liquid" },
  { t: "night,", accent: true },
  { t: "fold" },
  { t: "it" },
  { t: "through" },
  { t: "cream" },
  { t: "churned" },
  { t: "slower" },
  { t: "than" },
  { t: "sleep," },
  { t: "and" },
  { t: "finish" },
  { t: "each" },
  { t: "glass" },
  { t: "beneath" },
  { t: "a" },
  { t: "breath" },
  { t: "of" },
  { t: "hand-dusted" },
  { t: "cocoa.", accent: true },
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const words = wordsRef.current;
    if (!section || !words) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words.querySelectorAll("[data-word]"),
        { opacity: 0.13 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            end: "center 42%",
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        section.querySelectorAll("[data-fade]"),
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          stagger: 0.18,
          scrollTrigger: { trigger: section, start: "top 78%" },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative flex min-h-svh flex-col items-center justify-center px-6 py-36 md:py-48"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 crimson-haze opacity-60" />

      <p data-fade className="smallcaps relative text-[10px] tracking-[0.45em] text-gold">
        The House of Mihan Prima
      </p>
      <div data-fade aria-hidden className="hairline-x relative mt-7 w-20" />

      <p
        ref={wordsRef}
        className="relative mt-12 max-w-4xl text-center font-display text-[clamp(1.65rem,3.4vw,2.9rem)] font-light leading-[1.42] text-ivory"
      >
        {SENTENCE.map((w, i) => (
          <span
            key={i}
            data-word
            className={w.accent ? "italic text-gold-soft" : undefined}
          >
            {w.t}{" "}
          </span>
        ))}
      </p>

      <p data-fade className="smallcaps relative mt-14 text-[9px] tracking-[0.4em] text-ivory/40">
        — From the Atelier, Tehran
      </p>
    </section>
  );
}
