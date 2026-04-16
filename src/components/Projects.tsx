"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ProjectRow from "./ProjectRow";
import HoverModal from "./HoverModal";

import image1 from "../image/image-1.png";
import image2 from "../image/image-2.png";
import image3 from "../image/image-3.png";
import image4 from "../image/image-4.png";

const PROJECTS = [
  {
    id: 1,
    title: "SKITRO",
    category: "Full Stack Application",
    slug: "skitro",
    url: "https://v0-skitro.vercel.app/",
    date: "2023",
    color: "#2C3E50", 
    image: image1.src,
  },
  {
    id: 2,
    title: "COGNITOFLOW",
    category: "Web Application",
    slug: "cognitoflow",
    url: "https://cognitoflow.framer.ai/",
    date: "2023",
    color: "#8E44AD", 
    image: image2.src,
  },
  {
    id: 3,
    title: "LUMIERE",
    category: "Storefront",
    slug: "lumiere",
    url: "https://v0-luxury-beauty-storefront.vercel.app/",
    date: "2022",
    color: "#16A085", 
    image: image3.src,
  },
  {
    id: 4,
    title: "PREMIERTECH",
    category: "Agency Landing",
    slug: "premiertech",
    url: "https://premiertechagency.netlify.app/",
    date: "2021",
    color: "#C0392B", 
    image: image4.src,
  },
];

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
              url={project.url}
              setModal={setModal}
            />
          ))}
          {/* Bottom border to close the list loop */}
          <div className="border-t border-white/5 w-full"></div>
        </div>
      </div>
      
      {/* 
        The Modal is mounted absolutely inside the Section or Window 
        depending on bounds. It's passed the active state and index. 
      */}
      <HoverModal modal={modal} projects={PROJECTS} />

      {/* Footer */}
      <footer className="mt-40 border-t border-white/10 pt-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-white/40 text-sm">
        <p>&copy; {new Date().getFullYear()} Ghansham Gavande.</p>
        <div className="flex gap-8 mt-4 md:mt-0 font-medium tracking-wide">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </footer>
    </section>
  );
}
