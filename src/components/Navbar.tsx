"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
import { EASE_LUX } from "@/lib/motion";

const LINKS = [
  { label: "Story", hash: "#story" },
  { label: "Collection", hash: "#collection" },
  { label: "Ingredients", hash: "#ingredients" },
  { label: "Réserve", hash: "#finale" },
];

function scrollToHash(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el as HTMLElement, { duration: 1.6 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (hash: string) => {
    setOpen(false);
    setTimeout(() => scrollToHash(hash), open ? 350 : 0);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* backdrop layer — kept out of the blend context */}
        <div
          aria-hidden
          className={`absolute inset-0 transition-lux ${
            scrolled
              ? "bg-black/35 backdrop-blur-md border-b border-gold/10"
              : "bg-transparent border-b border-transparent"
          }`}
        />
        <div className="relative flex items-center justify-between px-6 py-4 md:px-10 md:py-5">
          <button
            onClick={() => go("#top")}
            data-hover
            className="group relative block transition-opacity duration-700 ease-lux hover:opacity-85"
            aria-label="Mihan Prima — back to top"
          >
            <Image
              src="/mihan-prima.png"
              alt="Mihan Prima"
              width={226}
              height={281}
              priority
              className="h-11 w-auto md:h-12 drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-lux group-hover:scale-[1.03]"
            />
          </button>

          <nav className="hidden items-center gap-10 md:flex mix-blend-difference text-white" aria-label="Primary">
            {LINKS.map((l) => (
              <button
                key={l.hash}
                onClick={() => go(l.hash)}
                data-hover
                className="group relative smallcaps text-[10px] tracking-[0.32em] opacity-70 transition-lux hover:opacity-100"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-700 ease-lux group-hover:scale-x-100" />
              </button>
            ))}
          </nav>

          <div className="hidden md:block smallcaps text-[10px] tracking-[0.32em] opacity-70 mix-blend-difference text-white">
            Item&nbsp; — Double&nbsp;Chocolate
          </div>

          <button
            onClick={() => setOpen(true)}
            data-hover
            className="flex items-center gap-3 md:hidden smallcaps text-[10px] tracking-[0.3em] mix-blend-difference text-white"
            aria-label="Open menu"
            aria-expanded={open}
          >
            Menu
            <Plus className="h-4 w-4" strokeWidth={1.25} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_LUX }}
            className="fixed inset-0 z-[80] flex flex-col bg-black/[0.97] backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <Image
                src="/mihan-prima.png"
                alt="Mihan Prima"
                width={226}
                height={281}
                className="h-9 w-auto"
              />
              <button
                onClick={() => setOpen(false)}
                data-hover
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 text-gold transition-lux hover:border-gold/60"
              >
                <Plus className="h-4 w-4 rotate-45" strokeWidth={1.25} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-2" aria-label="Menu">
              {LINKS.map((l, i) => (
                <div key={l.hash} className="overflow-hidden py-2">
                  <motion.button
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%", transition: { duration: 0.4 } }}
                    transition={{ duration: 0.9, ease: EASE_LUX, delay: 0.12 + i * 0.07 }}
                    onClick={() => go(l.hash)}
                    data-hover
                    className="font-display text-5xl font-light text-ivory transition-lux hover:text-gold sm:text-6xl"
                  >
                    {l.label}
                  </motion.button>
                </div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col items-center gap-5 pb-10"
            >
              <div className="hairline-x w-40" />
              <Image src="/mihan-prima.png" alt="" width={44} height={54} className="w-10 opacity-80" />
              <p className="smallcaps text-[9px] tracking-[0.4em] text-gold/70">
                Maison de Glace — Est. 1980
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
