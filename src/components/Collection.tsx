"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Chapter = {
  no: string;
  title: string;
  italic: string;
  copy: string;
  img: string;
  alt: string;
  ratio: string;
  chip: string;
  reverse?: boolean;
};

const CHAPTERS: Chapter[] = [
  {
    no: "01",
    title: "The Double",
    italic: "Chocolate",
    copy: "A slow-set heart of chocolate cream, frozen at the precise second it turns to silk — then enrobed, twice, in single-origin dark. The first shell cracks. The second whispers.",
    img: "/products/double-chocolate-bar.png",
    alt: "Mihan Prima Double Chocolate ice cream bar floating in a black void under a golden spotlight",
    ratio: "aspect-[3/4]",
    chip: "70% Cacao Shell",
  },
  {
    no: "02",
    title: "Melted to",
    italic: "Perfection",
    copy: "Cacao surrendered to slow heat until it moves like liquid night. No shortcuts, no haste — only temperature, time, and the exact thirty-one degrees at which chocolate learns to shine.",
    img: "/products/melted.png",
    alt: "A wave of molten dark chocolate frozen mid-explosion against a black background",
    ratio: "aspect-[4/3]",
    chip: "Tempered at 31°",
    reverse: true,
  },
  {
    no: "03",
    title: "Creamy",
    italic: "Chocolate Milk",
    copy: "Morning milk, poured cold into molten cacao and folded — never whipped — until silk learns to flow. Twelve hours of patience inside every pour.",
    img: "/products/creamy-milk.png",
    alt: "Milk being poured and swirling into dark chocolate forming a silky vortex on black",
    ratio: "aspect-[4/5]",
    chip: "Slow-Churned 12 Hrs",
  },
  {
    no: "04",
    title: "The Final",
    italic: "Creation",
    copy: "The dégustation. A glass coupé of chocolate-milk mousse, clouded with hand-dusted cocoa and signed with one stroke of dark sauce along the inner rim.",
    img: "/products/final-creation.png",
    alt: "Clear glass dessert cup of creamy chocolate-milk mousse dusted with cocoa under a golden spotlight",
    ratio: "aspect-[3/4]",
    chip: "Served at −2°",
    reverse: true,
  },
];

function Corners() {
  const base =
    "pointer-events-none absolute h-7 w-7 border-gold/45 transition-all duration-700 ease-lux group-hover:border-gold/90";
  return (
    <>
      <span aria-hidden className={`${base} -left-3 -top-3 border-l border-t group-hover:-translate-x-1 group-hover:-translate-y-1`} />
      <span aria-hidden className={`${base} -right-3 -top-3 border-r border-t group-hover:translate-x-1 group-hover:-translate-y-1`} />
      <span aria-hidden className={`${base} -bottom-3 -left-3 border-b border-l group-hover:-translate-x-1 group-hover:translate-y-1`} />
      <span aria-hidden className={`${base} -bottom-3 -right-3 border-b border-r group-hover:translate-x-1 group-hover:translate-y-1`} />
    </>
  );
}

export default function Collection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* parallax on framed imagery */
      gsap.utils.toArray<HTMLElement>("[data-para]").forEach((el) => {
        const amt = parseFloat(el.dataset.para || "6");
        gsap.fromTo(
          el,
          { yPercent: amt },
          {
            yPercent: -amt,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          }
        );
      });

      /* editorial reveals */
      gsap.utils.toArray<HTMLElement>("[data-rv]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 84%" },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="collection" className="relative overflow-hidden px-6 md:px-14 lg:px-24">
      {/* section header */}
      <div className="flex flex-col items-center pt-32 pb-8 text-center md:pt-44">
        <p data-rv className="smallcaps text-[10px] tracking-[0.45em] text-gold">
          The Collection
        </p>
        <h2
          data-rv
          className="mt-8 font-display text-[clamp(2.4rem,5.5vw,4.8rem)] font-light leading-[1.05] text-ivory"
        >
          Four movements <span className="italic text-gold-soft">in chocolate.</span>
        </h2>
        <div data-rv aria-hidden className="hairline-x mt-10 w-28" />
      </div>

      {CHAPTERS.map((c) => (
        <article
          key={c.no}
          className="relative grid items-center gap-14 py-20 md:grid-cols-12 md:gap-10 md:py-32 lg:gap-16"
        >
          {/* ghost numeral */}
          <span
            aria-hidden
            className={`ghost-num pointer-events-none absolute -top-2 select-none font-display text-[34vw] leading-none md:text-[15rem] ${
              c.reverse ? "-right-4 md:right-0" : "-left-4 md:left-0"
            }`}
          >
            {c.no}
          </span>

          {/* copy */}
          <div
            className={`relative z-10 md:col-span-5 ${c.reverse ? "md:order-2 md:pl-6" : "md:order-1 md:pr-6"}`}
          >
            <div data-rv className="flex items-baseline gap-5">
              <span className="smallcaps text-[10px] tracking-[0.4em] text-gold">{c.no}</span>
              <span aria-hidden className="hairline-x w-12 translate-y-[-3px]" />
            </div>
            <h3
              data-rv
              className="mt-7 font-display text-[clamp(2.6rem,4.8vw,4.4rem)] font-light leading-[1.02] text-ivory"
            >
              {c.title} <span className="italic text-gold-soft">{c.italic}</span>
            </h3>
            <p data-rv className="mt-8 max-w-md font-body text-[15px] font-light leading-[1.9] text-ivory/55">
              {c.copy}
            </p>
            <p data-rv className="smallcaps mt-10 text-[9px] tracking-[0.4em] text-ivory/35">
              Mihan Prima · {c.chip}
            </p>
          </div>

          {/* framed imagery */}
          <figure
            className={`relative z-10 md:col-span-7 ${c.reverse ? "md:order-1" : "md:order-2"} ${
              c.ratio === "aspect-[4/3]" ? "md:px-10" : "md:px-16 lg:px-24"
            }`}
          >
            <div data-rv className="group relative" data-hover>
              <div data-para="6" className="relative">
                <div className={`relative ${c.ratio} overflow-hidden`}>
                  <Image
                    src={c.img}
                    alt={c.alt}
                    fill
                    sizes="(min-width: 768px) 55vw, 92vw"
                    className="object-cover transition-transform duration-[1200ms] ease-lux group-hover:scale-[1.02]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 transition-opacity duration-1000 group-hover:opacity-30"
                  />
                </div>
                <Corners />
              </div>

              {/* frosted glass floating label */}
              <figcaption
                className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2 translate-y-2 whitespace-nowrap border border-gold/25 bg-white/[0.05] px-6 py-3 backdrop-blur-md transition-all duration-700 ease-lux group-hover:translate-y-0 group-hover:opacity-100 opacity-0 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
              >
                <span className="smallcaps text-[9px] tracking-[0.38em] text-gold">{c.chip}</span>
              </figcaption>

              {/* gold border glow on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-1000 ease-lux group-hover:opacity-100 shadow-[0_0_90px_-18px_rgba(201,169,97,0.4)]"
              />
            </div>
          </figure>
        </article>
      ))}
    </section>
  );
}
