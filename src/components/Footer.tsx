"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/ghansham-gavande/" },
    { name: "GitHub", url: "https://github.com/GKSVSNJEBSJSB" },
    { name: "Instagram", url: "https://www.instagram.com/_._ghansham._._" },
  ];

  return (
    <footer className="relative z-20 bg-black pt-32 pb-12 px-6 lg:px-12 border-t border-white/10 overflow-hidden">
      {/* Decorative noise background matching Projects visually linking the sections */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/40 tracking-[0.3em] text-sm md:text-base uppercase mb-6"
        >
          Let's Work Together
        </motion.p>
        
        <motion.a
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          href="mailto:ghanshamgavande49@gmail.com"
          className="text-5xl md:text-7xl lg:text-9xl font-black text-white hover:text-white/80 transition-transform hover:scale-[1.02] duration-500 tracking-tighter"
        >
          Get in touch
        </motion.a>

        <div className="w-full h-px bg-white/10 my-24 lg:my-32" />

        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-12 md:gap-0 text-white/50 text-xs md:text-sm font-medium">
          <div className="flex gap-6 md:gap-8">
            {socialLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.url} 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-white transition-colors tracking-wider uppercase"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex gap-3 items-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
            <p className="tracking-widest uppercase text-white/80 shadow-sm">Open for opportunities</p>
          </div>

          <p className="tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Ghansham Gavande
          </p>
        </div>
      </div>
    </footer>
  );
}
