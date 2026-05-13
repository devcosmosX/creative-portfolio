"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

const PHRASE = "I bridge the gap between abstract design and rigid engineering, crafting digital experiences that don't just look seamlessly beautiful, but feel physically grounded, buttery smooth, and fundamentally engaging.";

const Word = ({ children, progress, index, total }: { children: string, progress: any, index: number, total: number }) => {
  const step = 0.6 / total;
  const start = index * step;
  const end = start + step;
  
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  
  return (
    <motion.span 
      style={{ opacity }}
      className="text-4xl md:text-6xl lg:text-[5rem] font-bold tracking-tighter text-white hover:text-white hover:opacity-100 hover:scale-105 transition-all duration-300 drop-shadow-2xl"
    >
      {children}
    </motion.span>
  );
};

export default function CreativePhilosophy() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Phase 2: Grand Scale 
  const scale = useTransform(scrollYProgress, [0.7, 1], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0.7, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);

  // Interactive Parallax Depth Orb
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const orbX = useSpring(mouseX, { damping: 40, stiffness: 100, mass: 0.8 });
  const orbY = useSpring(mouseY, { damping: 40, stiffness: 100, mass: 0.8 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const xOffset = (e.clientX / window.innerWidth - 0.5) * 150;
      const yOffset = (e.clientY / window.innerHeight - 0.5) * 150;
      mouseX.set(xOffset);
      mouseY.set(yOffset);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const words = PHRASE.split(" ");

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-black">
      
      {/* Sticky boundary that captures exactly one viewport to serve as the theater screen */}
      <div className="sticky top-0 h-screen overflow-hidden bg-black pointer-events-none border-t border-white/5">
        
        {/* Dynamic Parallax Interactive Lighting effect targeting depth processing */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div 
             className="w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-white/5 to-transparent rounded-full blur-[100px] md:blur-[140px]"
             style={{ x: orbX, y: orbY }}
          />
        </div>
        
        <div className="absolute inset-0 bg-black/40 z-0" /> {/* Darkener washout overlay */}
        
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center z-10 px-8 lg:px-24"
          style={{ scale, y, opacity }}
        >
          <p className="text-xs md:text-sm tracking-[0.4em] font-medium text-white/30 uppercase mb-12">
            My Philosophy
          </p>
          
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-3 md:gap-x-5 gap-y-4 md:gap-y-6 pointer-events-auto cursor-default">
            {words.map((word, idx) => (
              <Word 
                key={idx} 
                progress={scrollYProgress} 
                index={idx} 
                total={words.length}
              >
                {word}
              </Word>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
