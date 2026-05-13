"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const containerX = useSpring(mouseX, { damping: 30, stiffness: 200, mass: 0.8 });
  const containerY = useSpring(mouseY, { damping: 30, stiffness: 200, mass: 0.8 });

  const cursorX = useSpring(mouseX, { damping: 25, stiffness: 300, mass: 0.5 });
  const cursorY = useSpring(mouseY, { damping: 25, stiffness: 300, mass: 0.5 });

  const labelX = useSpring(mouseX, { damping: 20, stiffness: 400, mass: 0.4 });
  const labelY = useSpring(mouseY, { damping: 20, stiffness: 400, mass: 0.4 });

  useEffect(() => {
    // Set initial position immediately if window exists
    if (typeof window !== "undefined") {
      mouseX.set(window.innerWidth / 2);
      mouseY.set(window.innerHeight / 2);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed z-50 flex h-[350px] w-[400px] items-center justify-center overflow-hidden bg-transparent"
        style={{ left: containerX, top: containerY }}
      >
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
              <Image 
                src={project.image} 
                alt={`${project.title} project showcase from sequence`} 
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="pointer-events-none fixed z-[51] flex h-20 w-20 items-center justify-center rounded-full bg-[#404040]"
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        style={{ left: cursorX, top: cursorY }}
      />
      <motion.div
        className="pointer-events-none fixed z-[52] flex h-20 w-20 items-center justify-center bg-transparent font-medium tracking-widest text-white text-xs uppercase"
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        style={{ left: labelX, top: labelY }}
      >
        View
      </motion.div>
    </>
  );
}
