"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] as [number, number, number, number] },
  },
};

interface HoverModalProps {
  modal: { active: boolean; index: number };
  projects: Array<{ id: number; title: string; color: string; image: string }>;
}

export default function HoverModal({ modal, projects }: HoverModalProps) {
  const { active, index } = modal;

  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Move Container
    const xMoveContainer = gsap.quickTo(modalContainer.current, "left", { duration: 0.8, ease: "power3" });
    const yMoveContainer = gsap.quickTo(modalContainer.current, "top", { duration: 0.8, ease: "power3" });
    
    // Move cursor
    const xMoveCursor = gsap.quickTo(cursor.current, "left", { duration: 0.5, ease: "power3" });
    const yMoveCursor = gsap.quickTo(cursor.current, "top", { duration: 0.5, ease: "power3" });
    
    // Move cursor label
    const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", { duration: 0.45, ease: "power3" });
    const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", { duration: 0.45, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      xMoveContainer(clientX);
      yMoveContainer(clientY);
      xMoveCursor(clientX);
      yMoveCursor(clientY);
      xMoveCursorLabel(clientX);
      yMoveCursorLabel(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed z-50 flex h-[350px] w-[400px] items-center justify-center overflow-hidden bg-transparent"
        style={{ left: "50%", top: "50%" }}
      >
        {/* Slider container that moves up/down to show the active project block */}
        <div
          className="absolute h-full w-full transition-all duration-500 cubic-bezier(0.76, 0, 0.24, 1)"
          style={{ top: `${index * -100}%` }}
        >
          {projects.map((project, idx) => (
            <div
              key={`modal_${idx}`}
              className="relative flex h-full w-full items-center justify-center"
              style={{ backgroundColor: project.color }}
            >
              <img 
                src={project.image} 
                alt={`${project.title} project showcase from sequence`} 
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        ref={cursor}
        className="pointer-events-none fixed z-[51] flex h-20 w-20 items-center justify-center rounded-full bg-[#404040]"
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        style={{ left: "50%", top: "50%" }}
      />
      <motion.div
        ref={cursorLabel}
        className="pointer-events-none fixed z-[52] flex h-20 w-20 items-center justify-center bg-transparent font-medium tracking-widest text-white text-xs uppercase"
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        style={{ left: "50%", top: "50%" }}
      >
        View
      </motion.div>
    </>
  );
}
