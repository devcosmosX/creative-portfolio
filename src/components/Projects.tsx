"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ProjectRow from "./ProjectRow";
import HoverModal from "./HoverModal";

import { PROJECTS } from "@/lib/projects";

export default function Projects() {
  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <section className="relative z-20 min-h-screen bg-black py-40 px-6 lg:px-12 border-t border-white/10 overflow-hidden">
      {/* Vintage film grain overlay matching the dark aesthetic */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Gradient to flawlessly blend the transition where the 3D Sequence hero image ends */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#121212] to-transparent z-10" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <motion.h3 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase"
            >
              Work
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/40 mt-4 text-xl max-w-xl font-light"
            >
              A collection of digital products, platforms, and interactive experiences.
            </motion.p>
          </div>
          
          <motion.a 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            href="#" 
            className="group inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors uppercase tracking-widest text-sm font-medium"
          >
            All Projects 
            <span className="w-8 h-[1px] bg-white/60 group-hover:bg-white group-hover:w-12 transition-all duration-300" />
          </motion.a>
        </div>
        
        {/* Project List Container */}
        <div className="flex flex-col w-full">
          {PROJECTS.map((project, idx) => (
            <ProjectRow
              key={project.id}
              index={idx}
              title={project.title}
              category={project.category}
              slug={project.slug}
              setModal={setModal}
            />
          ))}
          {/* Bottom border to close the list loop */}
          <div className="border-t border-white/5 w-full"></div>
        </div>

        {/* Big "More Work" CTA Button */}
        <div className="mt-24 flex justify-center">
          <motion.a 
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex h-40 w-40 items-center justify-center rounded-full border border-white/10 bg-white/5 overflow-hidden transition-colors hover:bg-white"
          >
            {/* Magnetic/Hover Fill effect */}
            <div className="absolute inset-0 translate-y-[100%] bg-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />
            <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-white group-hover:text-black transition-colors duration-500">
              More Work
            </span>
          </motion.a>
        </div>
      </div>
      
      {/* 
        The Modal is mounted absolutely inside the Section or Window 
        depending on bounds. It's passed the active state and index. 
      */}
      <HoverModal modal={modal} projects={PROJECTS} />

    </section>
  );
}
