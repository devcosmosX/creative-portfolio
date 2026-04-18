"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PHRASE = "I bridge the gap between abstract design and rigid engineering, crafting digital experiences that don't just look seamlessly beautiful, but feel physically grounded, buttery smooth, and fundamentally engaging.";

export default function CreativePhilosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register the essential GSAP ScrollTrigger plugin natively in Next.js
    gsap.registerPlugin(ScrollTrigger);
    
    // INTERACTIVE PARALLAX DEPTH:
    // A massive atmospheric glowing orb physically follows the user's mouse.
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbRef.current) return;
      const xOffset = (e.clientX / window.innerWidth - 0.5) * 150;
      const yOffset = (e.clientY / window.innerHeight - 0.5) * 150;
      
      gsap.to(orbRef.current, { 
        x: xOffset, 
        y: yOffset, 
        duration: 1.5, 
        ease: "power3.out" 
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);

    // CINEMATIC SCROLL-DRIVEN ANIMATION:
    if (!containerRef.current || !textRef.current) return;
    const words = textRef.current.children;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", // Fires exactly when the section touches the absolute top window
        end: "bottom bottom", // Unlocks exactly at 400vh
        scrub: 1, // Extremely buttery 1-second interpolated catching delay scrubbing
      }
    });

    // Phase 1: Sequential Timeline Masking - word by word highlighting synced to scroll percentage
    tl.to(words, {
      opacity: 1,
      stagger: 0.1,
      duration: 5,
      ease: "none"
    }, 0);

    // Phase 2: Grand Scale - The entire philosophy scales down and fades out cleanly into the abyss before hitting the Footer
    tl.to(textRef.current, {
      scale: 0.85,
      y: -50,
      opacity: 0,
      duration: 2,
      ease: "power2.inOut"
    }, 5);

    // Cleanup phase to ensure it's SPA and React strict-mode safe
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-black">
      
      {/* Sticky boundary that captures exactly one viewport to serve as the theater screen */}
      <div className="sticky top-0 h-screen overflow-hidden bg-black pointer-events-none border-t border-white/5">
        
        {/* Dynamic Parallax Interactive Lighting effect targeting depth processing */}
        <div 
           ref={orbRef}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-white/5 to-transparent rounded-full blur-[100px] md:blur-[140px]"
        />
        
        <div className="absolute inset-0 bg-black/40 z-0" /> {/* Darkener washout overlay */}
        
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-8 lg:px-24">
          <p className="text-xs md:text-sm tracking-[0.4em] font-medium text-white/30 uppercase mb-12">
            My Philosophy
          </p>
          
          <div ref={textRef} className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-3 md:gap-x-5 gap-y-4 md:gap-y-6 pointer-events-auto cursor-default">
            {PHRASE.split(" ").map((word, idx) => (
              <span 
                key={idx} 
                className="text-4xl md:text-6xl lg:text-[5rem] font-bold tracking-tighter text-white opacity-[0.15] hover:text-white hover:opacity-100 hover:scale-105 transition-all duration-300 drop-shadow-2xl"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
