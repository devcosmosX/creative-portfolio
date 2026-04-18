"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";

const FRAME_COUNT = 128; 

export default function CinematicHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress purely within the 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track the current frame
  const currentFrameRef = useRef(-1);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  // Preload images into memory immediately on mount
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        const num = i.toString().padStart(3, "0");
        img.src = `/sequence/frame_${num}_delay-0.062s.png`;
        loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const drawImage = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, width: number, height: number) => {
    // Math to ensure the image covers the exact dimensions fully (object-fit:cover logic)
    const imageAspect = img.width / img.height;
    const canvasAspect = width / height;
    
    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (imageAspect > canvasAspect) {
        drawWidth = height * imageAspect;
        offsetX = -(drawWidth - width) / 2;
    } else {
        drawHeight = width / imageAspect;
        offsetY = -(drawHeight - height) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  const renderFrame = (index: number) => {
    if (!canvasRef.current || !images[index]) return;
    const canvas = canvasRef.current;
    
    const draw = () => {
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;
        drawImage(ctx, images[index], canvas.width, canvas.height);
        currentFrameRef.current = index;
    };

    if (images[index].complete) {
        draw();
    } else {
        images[index].onload = draw;
    }
  };

  // Setup initial canvas dimensions and resize listener
  useEffect(() => {
    const handleResize = () => {
        if (!canvasRef.current) return;
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        const frameToDraw = currentFrameRef.current >= 0 ? currentFrameRef.current : 0;
        renderFrame(frameToDraw);
    };

    handleResize(); 
    renderFrame(0);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  // Read scroll progress visually into canvas framing
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(latest * FRAME_COUNT)));
    if (frameIndex !== currentFrameRef.current) {
        renderFrame(frameIndex);
    }
  });

  // ========== TEXT ANIMATION TIMINGS (Based strictly on frame progression scroll bounds) ========== 
  // Phase 1 (0 to 0.15): Start static, then the Title naturally rises and fades out
  const titleY = useTransform(scrollYProgress, [0.05, 0.15], ["0%", "-100%"]);
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.15], [1, 0]);

  // Phase 2 (0.2 to 0.45): "About Me" segment
  const aboutY = useTransform(scrollYProgress, [0.2, 0.25, 0.4, 0.45], ["100%", "0%", "0%", "-100%"]);
  const aboutOpacity = useTransform(scrollYProgress, [0.2, 0.25, 0.4, 0.45], [0, 1, 1, 0]);

  // Phase 3 (0.5 to 0.9): "Skills & Stack" segment
  const skillsY = useTransform(scrollYProgress, [0.5, 0.55, 0.85, 0.9], ["100%", "0%", "0%", "-100%"]);
  const skillsOpacity = useTransform(scrollYProgress, [0.5, 0.55, 0.85, 0.9], [0, 1, 1, 0]);

  return (
    // We make the body exact 500vh to ensure it is the ONLY part of the website locking sequence
    <div ref={containerRef} className="relative h-[500vh] bg-black">
      
      {/* Sticky block isolates exactly 1 screen viewport in height */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black text-white selection:bg-white/30">
        
        {/* Background Film Layer */}
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full block object-cover opacity-80" />
        
        {/* Cinematic Vignette/Gradient Layer */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        <div className="pointer-events-none absolute inset-0 bg-black/20" /> {/* Slight dark wash */}

        {/* Global Nav removed and handled in absolute layout wrapper */}

        {/* ======================= SCROLL-DRIVEN CONTENT LAYERS ======================= */}

        {/* 1. Title Layer */}
        <motion.div 
            style={{ y: titleY, opacity: titleOpacity }}
            className="absolute inset-x-8 bottom-24 flex flex-col items-start justify-end text-left pointer-events-none"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-white drop-shadow-2xl mix-blend-plus-lighter">
            Ghansham
            <br />
            <span className="text-white/80">Gavande</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-light text-white/50 tracking-wider">
            Creative Developer
          </p>
        </motion.div>

        {/* 2. About Area */}
        <motion.div 
            style={{ y: aboutY, opacity: aboutOpacity }}
            className="absolute inset-x-8 lg:inset-x-16 bottom-24 flex flex-col items-start justify-end max-w-4xl text-left pointer-events-none"
        >
          <p className="text-sm tracking-[0.2em] text-white/50 mb-6 uppercase font-medium border-l-2 border-white/30 pl-4">About Me</p>
          <h2 className="text-3xl md:text-5xl font-light text-white leading-tight md:leading-relaxed drop-shadow-2xl mix-blend-plus-lighter mb-4">
            Creative developer blending logic and imagination to build meaningful, engaging experiences.
          </h2>
          <p className="text-xl md:text-2xl text-white/60 font-extralight tracking-wide">
            Always learning and exploring new ideas.
          </p>
        </motion.div>

        {/* The Experience block has been extracted and elevated to its own dedicated component */}

        {/* Scroll Indicator (Static) */}
        <div className="absolute bottom-8 w-full flex flex-col items-center z-50">
          <p className="text-xs tracking-[0.3em] font-medium text-white/30 uppercase mb-4">Scroll to discover</p>
          <motion.div 
            animate={{ height: ["0%", "100%", "0%"], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-white/40 overflow-hidden relative"
          >
             <div className="absolute top-0 w-full h-full bg-white" />
          </motion.div>
        </div>

      </div>
    </div>
  );
}
