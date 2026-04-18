"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-[100] w-full p-6 md:p-10 flex justify-between items-center pointer-events-none mix-blend-difference"
    >
      <div className="flex-1 pointer-events-auto hidden md:block">
         <span className="text-xl md:text-2xl font-bold tracking-tighter text-white">GG.</span>
      </div>

      <nav className="flex items-center justify-center md:justify-end flex-1 gap-6 md:gap-12 pointer-events-auto w-full md:w-auto">
        {["About", "Work", "Contact"].map((item) => (
          <a
            key={item}
            href={item === "Contact" ? "mailto:ghanshamgavande49@gmail.com" : `#${item.toLowerCase()}`}
            className="text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors"
          >
            {item}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
