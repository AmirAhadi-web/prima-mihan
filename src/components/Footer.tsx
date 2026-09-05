"use client";

import Image from "next/image";
import { InstagramIcon, XIcon } from "@/components/icons";

const NAV = [
  { label: "Story", hash: "#story" },
  { label: "Collection", hash: "#collection" },
  { label: "Ingredients", hash: "#ingredients" },
  { label: "Réserve", hash: "#finale" },
];

function scrollToHash(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el as HTMLElement, { duration: 1.8 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export default function Footer() {
  return (
    <footer className="relative px-6 pt-8 pb-12 md:pb-16">
      <div aria-hidden className="hairline-x mx-auto w-full max-w-6xl" />

      <div className="mx-auto flex max-w-6xl flex-col items-center pt-16">
        <Image
          src="/mihan-prima.png"
          alt="Mihan Prima emblem"
          width={96}
          height={118}
          className="w-16 opacity-90 md:w-[72px]"
        />

        <nav aria-label="Footer" className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {NAV.map((l) => (
            <button
              key={l.hash}
              onClick={() => scrollToHash(l.hash)}
              data-hover
              className="smallcaps text-[10px] tracking-[0.34em] text-ivory/55 transition-colors duration-500 hover:text-gold"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="mt-10 flex items-center gap-5">
          <a
            href="https://mihan-food.com/social"
            target="_blank"
            rel="noreferrer"
            aria-label="Mihan Prima on Instagram"
            data-hover
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/20 text-ivory/60 transition-all duration-700 ease-lux hover:border-gold/60 hover:text-gold"
          >
            <InstagramIcon className="h-[17px] w-[17px]" strokeWidth={1.25} />
          </a>
          <a
            href="https://mihan-food.com/social"
            target="_blank"
            rel="noreferrer"
            aria-label="Mihan Prima on X"
            data-hover
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/20 text-ivory/60 transition-all duration-700 ease-lux hover:border-gold/60 hover:text-gold"
          >
            <XIcon className="h-[16px] w-[16px]" />
          </a>
        </div>

        <div aria-hidden className="hairline-x mt-14 w-40 opacity-70" />

        <p className="smallcaps mt-9 text-center text-[9px] leading-relaxed tracking-[0.4em] text-ivory/35">
          © 2026 Mihan Prima · All Rights Reserved
        </p>
        <p className="smallcaps mt-4 text-center text-[8px] tracking-[0.45em] text-gold/40">
          Tehran — Dubai — Paris
        </p>
      </div>
    </footer>
  );
}
