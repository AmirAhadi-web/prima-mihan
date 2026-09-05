"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const STATS = ["12 Hrs Churned", "31° Tempered", "70% Cacao"];

export default function Finale() {
  const sectionRef = useRef<HTMLElement>(null);
  const cupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cup = cupRef.current;
    if (!section || !cup) return;

    const ctx = gsap.context(() => {
      /* the glass enters like it is being set down */
      gsap.fromTo(
        cup,
        { scale: 0.9, rotate: 2.5, y: 90 },
        {
          scale: 1,
          rotate: 0,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: cup,
            start: "top 96%",
            end: "top 38%",
            scrub: 0.8,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-rv]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="finale"
      className="relative overflow-hidden px-6 pt-36 pb-28 md:pt-52 md:pb-36"
    >
      {/* atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 42% at 50% 62%, rgba(139,0,0,0.2), transparent 68%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 light-rays" />

      <div className="relative flex flex-col items-center text-center">
        <p data-rv className="smallcaps text-[10px] tracking-[0.45em] text-gold">
          The Réserve
        </p>
        <h2
          data-rv
          className="mt-8 font-display text-[clamp(2.6rem,6vw,5.4rem)] font-light leading-[1.02] text-ivory"
        >
          One glass. <span className="italic text-gold-soft">No apology.</span>
        </h2>

        {/* the creation */}
        <div ref={cupRef} className="group relative mt-16 md:mt-20 will-change-transform" data-hover>
          <div className="drift relative" style={{ "--d": "9s" } as React.CSSProperties}>
            <div className="relative h-[52vh] w-[74vw] max-w-[380px] md:h-[62vh] md:max-w-[430px]">
              <Image
                src="/products/final-creation.png"
                alt="The Final Creation — a clear glass dessert cup of creamy chocolate-milk mousse dusted with cocoa, chocolate sauce tracing the inner rim"
                fill
                sizes="(min-width: 768px) 430px, 74vw"
                priority={false}
                className="object-contain transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.02]"
              />
            </div>

            {/* floor reflection */}
            <div
              aria-hidden
              className="relative h-[14vh] w-[74vw] max-w-[380px] -scale-y-100 md:max-w-[430px]"
              style={{
                maskImage: "linear-gradient(to top, rgba(0,0,0,0.35), transparent 65%)",
                WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.35), transparent 65%)",
              }}
            >
              <Image
                src="/products/final-creation.png"
                alt=""
                fill
                sizes="(min-width: 768px) 430px, 74vw"
                aria-hidden
                className="object-contain opacity-50 blur-[3px]"
              />
            </div>

            {/* frosted hover label */}
            <div className="pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 translate-y-2 whitespace-nowrap border border-gold/25 bg-white/[0.05] px-6 py-3 opacity-0 backdrop-blur-md transition-all duration-700 ease-lux group-hover:translate-y-0 group-hover:opacity-100">
              <span className="smallcaps text-[9px] tracking-[0.38em] text-gold">
                Nº 1 — Double Chocolate Réserve
              </span>
            </div>
          </div>

          {/* aura */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120%] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-0 blur-3xl transition-opacity duration-1000 ease-lux group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(201,169,97,0.16), transparent 70%)",
            }}
          />
        </div>

        <p data-rv className="mt-20 max-w-xl font-body text-[15px] font-light leading-[1.95] text-ivory/55 md:mt-24">
          A coupé of chocolate-milk silk, clouded with cocoa and signed with a single stroke of
          dark sauce. Served at minus two, gone in minutes — remembered far longer.
        </p>

        {/* stats */}
        <div data-rv className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {STATS.map((s, i) => (
            <span key={s} className="flex items-center gap-8">
              {i > 0 && <span aria-hidden className="hidden h-1 w-1 rotate-45 bg-gold/60 sm:block" />}
              <span className="smallcaps text-[9px] tracking-[0.4em] text-ivory/45">{s}</span>
            </span>
          ))}
        </div>

        {/* cta */}
        <a
          data-rv
          data-hover
          href="mailto:atelier@mihanprima.com?subject=The%20Tasting%20—%20Mihan%20Prima"
          className="group relative mt-14 inline-flex items-center gap-4 overflow-hidden border border-gold/40 px-12 py-5 transition-all duration-700 ease-lux hover:border-gold"
        >
          <span
            aria-hidden
            className="absolute inset-0 origin-bottom scale-y-0 bg-gold/10 transition-transform duration-700 ease-lux group-hover:scale-y-100"
          />
          <span className="smallcaps relative text-[10px] tracking-[0.42em] text-gold">
            Reserve the Tasting
          </span>
          <ArrowUpRight className="relative h-4 w-4 text-gold transition-transform duration-700 ease-lux group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.25} />
        </a>
      </div>
    </section>
  );
}
