"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EXPERIENCES = [
  {
    id: 1,
    company: "IBM",
    role: "Quality Assurance Engineer",
    type: "Full-time",
    date: "Dec 2025 - Present · 5 mos",
    location: "Pune, India · On-site",
    skills: "COM, SBUS and +6 skills",
    logoColor: "from-blue-600 to-blue-400"
  },
  {
    id: 2,
    company: "WebNCraft",
    role: "Full-stack Developer",
    type: "Freelance",
    date: "May 2025 - Jan 2026 · 9 mos",
    location: "United States · Remote",
    skills: "Search Engine Optimization (SEO), MERN Stack and +10 skills",
    logoColor: "from-violet-600 to-violet-400"
  },
  {
    id: 3,
    company: "Zidio Development",
    role: "Data Science & Analytics Intern",
    type: "Internship",
    date: "Mar 2025 - Sep 2025 · 7 mos",
    location: "India · Remote",
    skills: "Data Analytics, Python, Machine Learning",
    logoColor: "from-emerald-600 to-emerald-400"
  },
  {
    id: 4,
    company: "NASWIZ RETAILS",
    role: "Network Marketing Specialist",
    type: "Part-time",
    date: "Jan 2023 - Mar 2025 · 2 yrs 3 mos",
    location: "Nashik, India",
    skills: "Lead Generation and Search Engine Marketing (SEM)",
    logoColor: "from-orange-600 to-orange-400"
  },
  {
    id: 5,
    company: "DevTown",
    role: "Data Scientist intern",
    type: "Internship",
    date: "May 2024 - Dec 2024 · 8 mos",
    location: "India · Remote",
    skills: "Data Science, Visualization, SQL",
    logoColor: "from-rose-600 to-rose-400"
  }
];

export default function Experience() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Track scroll exactly within this 400vh block container
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Moves the cards extremely cleanly across the window horizontal axis
  // 0% maps to start mapping, -85% ensures we reach the end of the array globally.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-black" id="about">
      
      {/* Background Vintage Noise */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Sticky boundary locking precisely to the viewport dimensions */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-black z-10 border-t border-white/5">
        
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
        <motion.div style={{ x }} className="flex gap-8 px-8 lg:px-24 pt-20">
          
          {EXPERIENCES.map((exp, index) => {
            return (
              <div 
                key={exp.id} 
                className="group relative flex flex-col justify-between w-[85vw] md:w-[450px] lg:w-[500px] h-[550px] p-8 md:p-10 shrink-0 bg-[#050505] border border-white/10 hover:border-white/20 transition-colors duration-500 overflow-hidden"
              >
                {/* Background glow casting color based on the logo/company theme */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${exp.logoColor} opacity-5 blur-[80px] group-hover:opacity-[0.15] transition-opacity duration-1000`} />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <p className="font-mono text-white/20 text-sm">{(index + 1).toString().padStart(2, '0')}</p>
                    <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.2em]">{exp.date}</p>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-4">{exp.company}</h3>
                  <p className="text-lg md:text-xl text-white/70 font-light tracking-wide">{exp.role}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-8">
                    <span className="px-3 py-1.5 bg-white/5 border border-white/10 text-[10px] md:text-xs font-semibold text-white/60 tracking-widest uppercase">
                      {exp.type}
                    </span>
                    <span className="px-3 py-1.5 bg-white/5 border border-white/10 text-[10px] md:text-xs font-semibold text-white/60 tracking-widest uppercase">
                      {exp.location.split(',')[0]}
                    </span>
                  </div>
                </div>

                <div className="relative z-10 mt-8 border-t border-white/10 pt-8">
                  <p className="text-[10px] md:text-xs text-white/30 uppercase tracking-[0.3em] mb-4">Key Skills & Tools</p>
                  <p className="text-white/60 font-light leading-relaxed">{exp.skills}</p>
                </div>
              </div>
            );
          })}
          
          {/* Safe-space buffer container ensuring the final card scrolls to the center natively */}
          <div className="w-[30vw] shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}
