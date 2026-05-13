"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useVelocity, useMotionTemplate, useMotionValue } from "framer-motion";

const EXPERIENCES = [
  {
    id: 1,
    company: "IBM",
    role: "Quality Assurance Engineer",
    type: "Full-time",
    date: "Dec 2025 - Present · 5 mos",
    location: "Pune, India · On-site",
    skills: "COM, SBUS and +6 skills",
    spotlightColor: "rgba(37, 99, 235, 0.15)" // Blue
  },
  {
    id: 2,
    company: "WebNCraft",
    role: "Full-stack Developer",
    type: "Freelance",
    date: "May 2025 - Jan 2026 · 9 mos",
    location: "United States · Remote",
    skills: "Search Engine Optimization (SEO), MERN Stack and +10 skills",
    spotlightColor: "rgba(124, 58, 237, 0.15)" // Violet
  },
  {
    id: 3,
    company: "Zidio Development",
    role: "Data Science & Analytics Intern",
    type: "Internship",
    date: "Mar 2025 - Sep 2025 · 7 mos",
    location: "India · Remote",
    skills: "Data Analytics, Python, Machine Learning",
    spotlightColor: "rgba(5, 150, 105, 0.15)" // Emerald
  },
  {
    id: 4,
    company: "NASWIZ RETAILS",
    role: "Network Marketing Specialist",
    type: "Part-time",
    date: "Jan 2023 - Mar 2025 · 2 yrs 3 mos",
    location: "Nashik, India",
    skills: "Lead Generation and Search Engine Marketing (SEM)",
    spotlightColor: "rgba(234, 88, 12, 0.15)" // Orange
  },
  {
    id: 5,
    company: "DevTown",
    role: "Data Scientist intern",
    type: "Internship",
    date: "May 2024 - Dec 2024 · 8 mos",
    location: "India · Remote",
    skills: "Data Science, Visualization, SQL",
    spotlightColor: "rgba(225, 29, 72, 0.15)" // Rose
  }
];

// Interactive Card Component
function ExperienceCard({ exp, index, skewX }: { exp: typeof EXPERIENCES[0], index: number, skewX: any }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      style={{ skewX }}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col justify-between w-[85vw] md:w-[450px] lg:w-[500px] h-[550px] p-8 md:p-10 shrink-0 bg-[#050505] border border-white/5 hover:border-white/20 transition-colors duration-500 overflow-hidden rounded-3xl"
    >
      {/* Interactive Mouse Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              800px circle at ${mouseX}px ${mouseY}px,
              ${exp.spotlightColor},
              transparent 60%
            )
          `,
        }}
      />
      
      {/* Subtle Grain Overlay inside card */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 pointer-events-none">
        <div className="flex justify-between items-start mb-12">
          <p className="font-mono text-white/20 text-sm">{(index + 1).toString().padStart(2, '0')}</p>
          <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.2em]">{exp.date}</p>
        </div>
        
        <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-4">{exp.company}</h3>
        <p className="text-lg md:text-xl text-white/70 font-light tracking-wide">{exp.role}</p>
        
        <div className="flex flex-wrap gap-2 mt-8">
          <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] md:text-xs font-semibold text-white/60 tracking-widest uppercase backdrop-blur-md">
            {exp.type}
          </span>
          <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] md:text-xs font-semibold text-white/60 tracking-widest uppercase backdrop-blur-md">
            {exp.location.split(',')[0]}
          </span>
        </div>
      </div>

      <div className="relative z-10 mt-8 border-t border-white/10 pt-8 pointer-events-none">
        <p className="text-[10px] md:text-xs text-white/30 uppercase tracking-[0.3em] mb-4">Key Skills & Tools</p>
        <p className="text-white/60 font-light leading-relaxed">{exp.skills}</p>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Track scroll exactly within this 400vh block container
  const { scrollYProgress, scrollY } = useScroll({
    target: targetRef,
  });

  // Moves the cards extremely cleanly across the window horizontal axis
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);
  
  // Parallax Background Text mapping (Reverse direction)
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Calculate Velocity for Kinetic Skewing
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  // Map high velocity to a maximum of 5 degrees skew
  const skewX = useTransform(smoothVelocity, [-1000, 1000], [5, -5]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-black" id="about">
      
      {/* Sticky boundary locking precisely to the viewport dimensions */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-black z-10 border-t border-white/5">
        
        {/* Massive Parallax Typography */}
        <motion.div 
          style={{ x: bgX }} 
          className="absolute top-1/2 -translate-y-1/2 left-[-20%] whitespace-nowrap text-[25vw] font-black pointer-events-none select-none"
        >
          <span 
            className="text-transparent" 
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.03)" }}
          >
            CAREER JOURNEY EXPERIENCE
          </span>
        </motion.div>

        {/* Isolated Section Label */}
        <div className="absolute top-32 lg:top-40 left-8 lg:left-24 z-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs md:text-sm tracking-[0.3em] font-medium text-white/50 uppercase"
          >
            My Experience
          </motion.h2>
        </div>

        {/* Dynamic Horizontal Scroll Wrapper */}
        <motion.div style={{ x, willChange: "transform" }} className="flex gap-8 px-8 lg:px-24 pt-20">
          
          {EXPERIENCES.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} skewX={skewX} />
          ))}
          
          {/* Safe-space buffer container ensuring the final card scrolls to the center natively */}
          <div className="w-[30vw] shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}
