"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";

// The secret embedded information capsules that users have to find and click
const PODS = [
  { id: 1, title: "The Aesthetic", text: "Bridging abstract design and uncompromising minimalism. Every interaction is highly intentional, focusing on dark, atmospheric composition.", color: "bg-blue-600/10", glow: "group-hover:bg-blue-500/20" },
  { id: 2, title: "The Engine", text: "Under the hood it's unconditionally about raw performance. Buttery smooth 60fps animations utilizing the modern React architecture and rigid mathematical layouts.", color: "bg-purple-600/10", glow: "group-hover:bg-purple-500/20" },
  { id: 3, title: "The Blueprint", text: "Building massively scalable, composable frontend systems that not only flex across all screens but remain fundamentally grounded without ever sacrificing user experience.", color: "bg-emerald-600/10", glow: "group-hover:bg-emerald-500/20" }
];

export default function CreativePhilosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [activePod, setActivePod] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // STAGE 1: The GSAP Video Scroll Integration
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || !trackRef.current) return;
    const pods = trackRef.current.children;

    // Pinning the huge interactive playground screen in place for 300vh
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth interpolation binding
      }
    });

    // Sub-Animation 1: Elements shoot out from the abyss perfectly synchronized to scroll momentum
    tl.fromTo(pods, 
      { y: 1000, rotation: 25, opacity: 0, scale: 0.5 },
      { y: 0, rotation: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 2, ease: "power3.out" },
      0
    );

    // Sub-Animation 2: The pods elegantly drift upwards as you push closer towards the end of the scroll
    tl.to(pods, {
      y: -100,
      rotation: () => Math.random() * 20 - 10,
      stagger: 0.05,
      duration: 3,
      ease: "sine.inOut",
    }, 2);
    
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  // STAGE 2: The Interactive Click Expansion Overlays
  useEffect(() => {
    if (activePod !== null && overlayRef.current) {
      // Cinematic explosion mask animation pulling from a dot out to fullscreen
      document.body.style.overflow = "hidden"; // Lock global scroll while interacting
      gsap.fromTo(overlayRef.current, 
        { clipPath: "circle(0% at 50% 50%)", opacity: 0 },
        { clipPath: "circle(150% at 50% 50%)", opacity: 1, duration: 0.8, ease: "power4.inOut" }
      );
    }
  }, [activePod]);

  const closePod = () => {
    if (overlayRef.current) {
      // Clean up and reverse the mask explosion
      gsap.to(overlayRef.current, {
        clipPath: "circle(0% at 50% 50%)",
        opacity: 0,
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: () => {
          setActivePod(null);
          document.body.style.overflow = ""; // Release scroll
        }
      });
    } else {
      setActivePod(null);
      document.body.style.overflow = "";
    }
  };

  const activeData = activePod !== null ? PODS.find(p => p.id === activePod) : null;

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-[#000000]">
      
      {/* Pinned Playground Screen */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center border-t border-white/5 bg-[#050505]">
        
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

        {/* Dynamic Interactive Label */}
        <div className="absolute top-32 lg:top-40 left-8 lg:left-24 z-20 pointer-events-none">
          <h2 className="text-xs md:text-sm tracking-[0.3em] font-medium text-white/50 uppercase">
            The Sandbox
          </h2>
          <p className="text-emerald-500 text-[10px] uppercase mt-2 tracking-widest font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            Scroll, Hover, & Click to interact
          </p>
        </div>

        {/* GSAP Managed Interactive Track */}
        <div ref={trackRef} className="relative z-10 flex flex-wrap justify-center gap-6 md:gap-16 items-center px-4 w-full max-w-7xl">
          {PODS.map((pod) => (
            <button
              key={pod.id}
              onClick={() => setActivePod(pod.id)}
              className={`group flex items-center justify-center w-32 h-32 md:w-56 md:h-56 rounded-full border border-white/10 ${pod.color} hover:scale-110 hover:border-white/40 transition-all duration-500 cursor-pointer shadow-2xl relative overflow-hidden backdrop-blur-xl`}
            >
              {/* Internal glow interaction */}
              <div className={`absolute inset-0 opacity-0 ${pod.glow} transition-opacity duration-500 rounded-full`} />
              
              <span className="text-white font-semibold tracking-widest uppercase text-[10px] md:text-xs z-10 drop-shadow-md group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,1)] transition-all">
                {pod.title}
              </span>
            </button>
          ))}
        </div>

        {/* FULLSCREEN MASK OVERLAY EXPANSION */}
        <div 
          ref={overlayRef}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 p-6 backdrop-blur-2xl"
          style={{ opacity: 0, pointerEvents: activePod !== null ? "auto" : "none", clipPath: "circle(0% at 50% 50%)" }}
        >
          {activeData && (
            <div className="relative max-w-4xl w-full mx-auto flex flex-col items-center text-center p-8 md:p-24 border border-white/10 bg-[#0a0a0a] rounded-[2rem] md:rounded-[3rem] shadow-[0_0_100px_rgba(255,255,255,0.02)] overflow-hidden">
              <button 
                onClick={closePod}
                className="absolute top-6 right-6 md:top-8 md:right-8 text-white/40 hover:text-white transition-all hover:rotate-90 duration-300 z-50 bg-white/5 hover:bg-white/10 p-3 rounded-full"
              >
                 <X size={24} strokeWidth={1.5} />
              </button>
              
              <p className="text-white/30 text-[10px] uppercase tracking-[0.4em] font-medium mb-6">Information Unlocked</p>
              
              <h3 className="text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter mb-6 md:mb-10 text-balance leading-tight drop-shadow-2xl">
                {activeData.title}
              </h3>
              
              <p className="text-lg md:text-2xl lg:text-3xl font-light text-white/50 leading-relaxed max-w-3xl text-balance">
                {activeData.text}
              </p>
            </div>
          )}
        </div>
        
      </div>
    </section>
  );
}
