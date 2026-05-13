"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Lock scrolling while loading
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const duration = 2400; 
    const interval = 24; 
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
          // Unlock scrolling slightly after all blind animations complete
          setTimeout(() => {
            document.body.style.overflow = "auto";
          }, 1500); 
        }, 500); // Brief hold at 100% before triggering exit
      }
    }, interval);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
        >
          {/* Vertical Shutter Blinds Background */}
          <div className="absolute inset-0 flex pointer-events-auto">
            {[...Array(5)].map((_, i) => (
              <motion.div 
                key={i}
                initial={{ y: 0 }}
                exit={{ y: i % 2 === 0 ? "-100%" : "100%" }}
                transition={{ duration: 1.2, delay: i * 0.08, ease: [0.76, 0, 0.24, 1] }}
                className="w-1/5 h-full bg-[#030303] border-r border-white/[0.02]"
              />
            ))}
          </div>
          
          {/* Top Left Coordinates & Counter */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className="absolute top-8 left-8 md:top-12 md:left-12 flex flex-col gap-1 text-[10px] font-medium tracking-[0.3em] uppercase text-white/30"
          >
            <span className="text-white/60">SYS.INIT // {progress}%</span>
            <span>LAT.19.0760 N</span>
            <span>LON.72.8777 E</span>
          </motion.div>

          {/* Bottom Right Progress */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-[10px] font-medium tracking-[0.3em] uppercase text-white/30"
          >
            LOADING_ASSETS...
          </motion.div>

          {/* Center SVG Laser Draw Animation */}
          <motion.div 
            exit={{ opacity: 0, scale: 4, filter: "blur(20px)" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="relative z-10 w-full max-w-2xl flex flex-col items-center justify-center pointer-events-none"
          >
            <svg viewBox="0 0 400 200" className="w-full h-auto drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              <motion.text
                x="50%"
                y="55%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[140px] font-black tracking-tighter"
                style={{ fill: "transparent", strokeWidth: 1.5, stroke: "rgba(255,255,255,0.8)" }}
                initial={{ strokeDasharray: "0 1000", fill: "rgba(255,255,255,0)" }}
                animate={{ 
                  strokeDasharray: ["0 1000", "1000 0"], 
                  fill: ["rgba(255,255,255,0)", "rgba(255,255,255,0)", "rgba(255,255,255,1)"] 
                }}
                transition={{ 
                  strokeDasharray: { duration: 2, ease: "easeInOut" },
                  fill: { duration: 0.5, delay: 1.5, ease: "easeIn" }
                }}
              >
                GG
              </motion.text>
            </svg>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="mt-[-30px] text-[10px] md:text-[12px] font-bold tracking-[0.8em] text-white/60 uppercase"
            >
              Ghansham Gavand
            </motion.div>
          </motion.div>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}
