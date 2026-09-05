"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Overlay = {
  range: [number, number];
  eyebrow: string;
  lines: [string, string];
  outFade?: boolean;
};

const OVERLAYS: Overlay[] = [
  { range: [0.15, 0.25], eyebrow: "Maison de Glace · Est. 1980", lines: ["Double", "Chocolate."] },
  { range: [0.35, 0.45], eyebrow: "Movement I — The Eruption", lines: ["Dark, then", "darker."] },
  { range: [0.6, 0.7], eyebrow: "Movement II — The Embrace", lines: ["Silk, folded", "into night."] },
  {
    range: [0.85, 1.04],
    eyebrow: "The Final Creation",
    lines: ["Surrender", "to the dark."],
    outFade: false,
  },
];

/* windowed 0→1→0 envelope across a progress range */
function windowed(p: number, a: number, b: number, inF = 0.3, outF = 0.28) {
  if (p <= a || p >= b) return 0;
  const t = (p - a) / (b - a);
  if (t < inF) return t / inF;
  if (t > 1 - outF) return (1 - t) / outF;
  return 1;
}

const PARTICLES = [
  { l: "12%", t: "30%", s: 5, d: 9, dl: 0 },
  { l: "22%", t: "62%", s: 3, d: 7, dl: 1.2 },
  { l: "78%", t: "24%", s: 4, d: 8, dl: 0.6 },
  { l: "85%", t: "58%", s: 3, d: 10, dl: 2 },
  { l: "66%", t: "76%", s: 5, d: 7.5, dl: 0.3 },
  { l: "35%", t: "18%", s: 3, d: 8.5, dl: 1.6 },
  { l: "8%", t: "78%", s: 4, d: 9.5, dl: 2.4 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const endFadeRef = useRef<HTMLDivElement>(null);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    video.muted = true;
    video.load();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ease = reduced ? 1 : 0.11;

    let duration = 12;
    const syncDuration = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) duration = video.duration;
    };
    if (video.readyState >= 1) syncDuration();
    video.addEventListener("loadedmetadata", syncDuration);

    /* force-decode first frame so the poster handoff is seamless */
    const onData = () => {
      if (video.paused && video.currentTime < 0.04) video.currentTime = 0.04;
    };
    video.addEventListener("loadeddata", onData);

    const state = { target: 0, current: 0 };

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        state.target = self.progress;
      },
    });

    const tick = () => {
      state.current += (state.target - state.current) * ease;
      if (Math.abs(state.target - state.current) < 0.0004) state.current = state.target;
      const p = state.current;

      /* scrub the film itself — seek only while paused */
      const t = p * Math.max(0.1, duration - 0.08);
      if (video.paused && video.readyState >= 2 && !video.seeking && Math.abs(video.currentTime - t) > 0.035) {
        video.currentTime = t;
      }

      /* cinematic push-in */
      gsap.set(stageRef.current, { scale: 1 + p * 0.14 });

      /* intro card */
      if (introRef.current) {
        const o = Math.min(Math.max(1 - Math.max(0, p - 0.015) / 0.055, 0), 1);
        gsap.set(introRef.current, { opacity: o, y: (1 - o) * -30 });
        introRef.current.style.pointerEvents = o > 0.5 ? "auto" : "none";
      }
      if (cueRef.current) {
        gsap.set(cueRef.current, { opacity: Math.min(Math.max(1 - p / 0.05, 0), 1) });
      }

      /* chapter overlays */
      OVERLAYS.forEach((ov, i) => {
        const el = overlayRefs.current[i];
        if (!el) return;
        const o = windowed(p, ov.range[0], ov.range[1], 0.32, ov.outFade === false ? 0.999 : 0.3);
        gsap.set(el, { opacity: o, y: (1 - o) * 42 });
      });

      /* blend to black into the next act */
      if (endFadeRef.current) {
        const f = Math.min(Math.max((p - 0.965) / 0.035, 0), 1);
        gsap.set(endFadeRef.current, { opacity: f });
      }
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      video.removeEventListener("loadedmetadata", syncDuration);
      video.removeEventListener("loadeddata", onData);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[480vh]" aria-label="Mihan Prima — Double Chocolate film">
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-void">
        {/* the film */}
        <div ref={stageRef} className="absolute inset-0 will-change-transform">
          <video
            ref={videoRef}
            id="hero-video"
            className="h-full w-full object-cover"
            src="/hero.mp4"
            poster="/hero-poster.jpg"
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nodownload noplaybackrate"
            aria-label="Molten chocolate turning in slow darkness"
          />
        </div>

        {/* atmosphere */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/15 to-black/70" />
        <div aria-hidden className="absolute inset-0 crimson-haze opacity-80" />
        <div aria-hidden className="absolute inset-0 light-rays" />
        <div aria-hidden className="absolute inset-0 vignette" />

        {/* suspended cocoa dust */}
        {PARTICLES.map((pt, i) => (
          <span
            key={i}
            aria-hidden
            className="drift absolute rounded-full bg-gold/35 blur-[1.5px]"
            style={
              {
                left: pt.l,
                top: pt.t,
                width: pt.s,
                height: pt.s,
                "--d": `${pt.d}s`,
                "--dl": `${pt.dl}s`,
              } as React.CSSProperties
            }
          />
        ))}

        {/* opening card */}
        <div
          ref={introRef}
          className="absolute inset-x-0 top-[16%] flex flex-col items-center px-6 text-center md:top-[18%]"
        >
          <p className="smallcaps text-[10px] tracking-[0.5em] text-gold md:text-xs">
            Mihan&nbsp;Prima&nbsp;Presents
          </p>
          <div className="hairline-x mt-6 w-24" />

        </div>

        {/* scroll cue */}
        <div ref={cueRef} className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-4">
          <span className="smallcaps text-[9px] tracking-[0.45em] text-ivory/50">Scroll</span>
          <span aria-hidden className="hairline-y scroll-cue h-14" />
        </div>

        {/* chapter overlays */}
        {OVERLAYS.map((ov, i) => (
          <div
            key={i}
            ref={(el) => {
              overlayRefs.current[i] = el;
            }}
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0"
            aria-hidden
          >
            <div className="flex items-center gap-4 md:gap-6">
              <span aria-hidden className="hairline-x w-8 md:w-14" />
              <p className="smallcaps text-[9px] tracking-[0.42em] text-gold md:text-[11px]">{ov.eyebrow}</p>
              <span aria-hidden className="hairline-x w-8 md:w-14" />
            </div>
            <h2 className="mt-8 font-display font-light leading-[0.93] text-ivory">
              <span className="block text-[clamp(3.4rem,11vw,9.5rem)] tracking-[0.02em]">{ov.lines[0]}</span>
              <span className="block text-[clamp(3.4rem,11vw,9.5rem)] italic tracking-[0.02em] text-gold-soft">
                {ov.lines[1]}
              </span>
            </h2>
          </div>
        ))}

        {/* fade into the story */}
        <div ref={endFadeRef} aria-hidden className="pointer-events-none absolute inset-0 bg-void opacity-0" />
      </div>
    </section>
  );
}
