"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

export default function Overlay({ progress }: { progress: MotionValue<number> }) {
  // We keep the text perfectly static vertically, only manipulating opacity,
  // to ensure the hero section feels completely "pinned" and stationary during scroll.

  // Section 1: Intro (starts visible, fades out cleanly without translating)
  const opacity1 = useTransform(progress, [0, 0.25], [1, 0]);

  // Section 2: About me (fades in, delays, fades out without translating)
  const opacity2 = useTransform(progress, [0.25, 0.35, 0.65, 0.75], [0, 1, 1, 0]);

  // Section 3: Passion (fades in, delays, fades out without translating)
  const opacity3 = useTransform(progress, [0.75, 0.85, 0.95, 1], [0, 1, 1, 0]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 w-full h-full p-8 lg:p-16">
      {/* Section 1 - Intro */}
      <motion.div
        style={{ opacity: opacity1 }}
        className="absolute inset-0 flex flex-col items-center justify-end pb-32 px-4"
      >
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-[0.15em] uppercase mb-4 text-white drop-shadow-2xl mix-blend-screen text-center">
          Ghansham Gavande
        </h1>
        <p className="text-sm md:text-xl font-light text-white/80 tracking-[0.3em] uppercase drop-shadow-lg text-center">
          Creative Developer
        </p>
      </motion.div>

      {/* Section 2 - About Me */}
      <motion.div
        style={{ opacity: opacity2 }}
        className="absolute inset-0 flex flex-col items-start justify-center max-w-7xl mx-auto px-8 md:px-16"
      >
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-relaxed drop-shadow-2xl mix-blend-screen text-left">
            Creative developer blending <span className="font-medium italic text-white/90">logic</span> and <span className="font-medium italic text-white/90">imagination</span> to build meaningful, engaging experiences.
          </h2>
          <p className="mt-8 text-sm md:text-xl font-extralight text-white/60 tracking-[0.2em] uppercase text-left">
            Always learning and exploring new ideas
          </p>
        </div>
      </motion.div>

      {/* Section 3 - Passion */}
      <motion.div
        style={{ opacity: opacity3 }}
        className="absolute inset-0 flex flex-col items-end justify-center max-w-7xl mx-auto px-8 text-right"
      >
        <div className="max-w-xl bg-black/10 backdrop-blur-sm p-8 rounded-2xl border border-white/5">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase text-white leading-tight tracking-tight drop-shadow-2xl mix-blend-plus-lighter">
            Passion
          </h2>
          <h3 className="text-xl md:text-3xl font-light mt-4 text-white/80">
            Creative Developer <br /> <span className="italic font-serif text-white/60">& Vibe Coder</span>
          </h3>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity: opacity1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-white/50">Scroll</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-16 bg-gradient-to-b from-white/80 to-transparent"
        />
      </motion.div>
    </div>
  );
}
