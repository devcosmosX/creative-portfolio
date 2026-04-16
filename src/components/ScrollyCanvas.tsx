"use client";
import React, { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Overlay from "./Overlay";

const FRAME_COUNT = 128; // We have frame_000 to frame_127

const ScrollyCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track the scroll progress within this 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Keep track of the current frame so we don't redraw unnecessarily
  const currentFrameRef = useRef(-1);

  const [images, setImages] = useState<HTMLImageElement[]>([]);

  // Preload images into memory
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      // Pad index to match filename format: frame_000_delay-0.062s.png
      const num = i.toString().padStart(3, "0");
      img.src = `/sequence/frame_${num}_delay-0.062s.png`;
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const drawImage = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, width: number, height: number) => {
    // Implement object-fit: cover logic
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
    
    // Attempt drawing
    const draw = () => {
      // Must ensure context exists when function evaluates
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
      
      // If we already drew a frame, re-draw the current one on resize
      const frameToDraw = currentFrameRef.current >= 0 ? currentFrameRef.current : 0;
      renderFrame(frameToDraw);
    };

    handleResize(); // Initial setup
    
    // Attempt drawing the first frame immediately
    renderFrame(0);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  // Hook into the scroll event using Framer Motion
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map scroll progress (0-1) to the sequence array index
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.floor(latest * FRAME_COUNT))
    );
    
    if (frameIndex !== currentFrameRef.current) {
      renderFrame(frameIndex);
    }
  });

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#121212]">
      {/* 
        This sticky block holds BOTH the canvas and the text overlay 
        so they remain completely pinned and perfectly stationary
        in the viewport while the sequence scrubs.
      */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-full w-full block"
        />
        {/* Subtle dark gradient overlay to ensure text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#121212]" />
        
        {/* 
          Pass the intrinsic scroll progress of THIS 500vh container to the text Overlay.
          This ensures texts fade in and out precisely synced with the frames.
        */}
        <Overlay progress={scrollYProgress} />
      </div>
    </div>
  );
};

export default ScrollyCanvas;
