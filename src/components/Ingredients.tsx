"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const INGREDIENTS = [
  {
    name: "Dark Cacao",
    sub: "70% single-origin, stone-ground to velvet",
    img: "/images/ingredient-chocolate.png",
    alt: "Stack of dark chocolate chunks and shavings under golden rim light on black",
    d: 8,
    dl: 0,
    para: 5,
  },
  {
    name: "Raw Milk Cream",
    sub: "Poured cold, folded slow — never rushed",
    img: "/images/ingredient-milk.png",
    alt: "A frozen crown splash of fresh cream suspended mid-air on black",
    d: 9.5,
    dl: 1.4,
    para: 8,
  },
  {
    name: "Cocoa & Flakes",
    sub: "A final breath of bitter, dusted by hand",
    img: "/images/ingredient-cocoa.png",
    alt: "A cloud of cocoa powder and chocolate flakes caught in golden side light on black",
    d: 7.2,
    dl: 0.7,
    para: 6,
  },
];

export default function Ingredients() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-para]").forEach((el) => {
        const amt = parseFloat(el.dataset.para || "6");
        gsap.fromTo(
          el,
          { y: amt * 9 },
          {
            y: -amt * 9,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-rv]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ingredients"
      className="relative overflow-hidden px-6 py-36 md:px-14 md:py-56 lg:px-24"
    >
      {/* atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 100%, rgba(139,0,0,0.16), transparent 65%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 light-rays opacity-70" />

      <div className="relative flex flex-col items-center text-center">
        <p data-rv className="smallcaps text-[10px] tracking-[0.45em] text-gold">
          The Ingredients
        </p>
        <h2
          data-rv
          className="mt-8 max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4.8rem)] font-light leading-[1.05] text-ivory"
        >
          Only what the <span className="italic text-gold-soft">dark demands.</span>
        </h2>
        <div data-rv aria-hidden className="hairline-x mt-10 w-28" />
      </div>

      <div className="relative mx-auto mt-24 grid max-w-6xl gap-20 md:mt-32 md:grid-cols-3 md:gap-10 lg:gap-14">
        {INGREDIENTS.map((ing) => (
          <div key={ing.name} data-rv className="group flex flex-col items-center" data-hover>
            <div data-para={ing.para} className="relative w-full max-w-[320px]">
              <div
                className="drift relative"
                style={{ "--d": `${ing.d}s`, "--dl": `${ing.dl}s` } as React.CSSProperties}
              >
                {/* arch frame */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-full ring-1 ring-gold/15 transition-all duration-1000 ease-lux group-hover:ring-gold/35">
                  <Image
                    src={ing.img}
                    alt={ing.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 80vw"
                    className="object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.045]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10"
                  />
                </div>
                {/* glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-6 -z-10 rounded-t-full opacity-0 transition-opacity duration-1000 ease-lux group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(ellipse 65% 60% at 50% 55%, rgba(201,169,97,0.14), transparent 70%)",
                  }}
                />
              </div>
            </div>

            {/* frosted label */}
            <div className="relative z-10 -mt-2 flex flex-col items-center border border-gold/20 bg-white/[0.04] px-8 py-5 backdrop-blur-md transition-all duration-700 ease-lux group-hover:border-gold/40 group-hover:bg-white/[0.06] shadow-[0_24px_70px_-20px_rgba(0,0,0,0.85)]">
              <span className="smallcaps text-[10px] tracking-[0.38em] text-ivory">{ing.name}</span>
              <span className="mt-3 font-display text-sm font-light italic text-gold-soft/90">
                {ing.sub}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
