"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Trophy, BrainCircuit, GraduationCap } from "lucide-react";

export default function Milestones() {
  return (
    <section className="relative z-20 min-h-screen bg-black py-32 px-6 lg:px-12 border-t border-white/10 overflow-hidden" id="milestones">
      
      {/* Background Noise */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-20">
          <motion.h3 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase"
          >
            Milestones
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/40 mt-4 text-xl max-w-xl font-light"
          >
            Key achievements, education, and focal points in my engineering journey.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[250px]">
          
          {/* 1. Large Block - NASA Space Apps */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className="md:col-span-2 md:row-span-2 group relative rounded-3xl overflow-hidden bg-[#050505] border border-white/5 hover:border-white/20 transition-all duration-500 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_50%)]" />
            
            <div className="relative h-full p-8 md:p-12 flex flex-col justify-end min-h-[350px] md:min-h-0">
              <div className="absolute top-8 md:top-12 left-8 md:left-12 p-4 rounded-full bg-white/5 border border-white/10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                <Sparkles className="w-8 h-8 text-indigo-400" />
              </div>
              
              <p className="text-[10px] md:text-xs tracking-[0.3em] font-medium text-white/40 uppercase mb-4">Hackathon</p>
              <h4 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">NASA Space Apps Challenge 2024</h4>
              <p className="text-base md:text-lg text-white/60 font-light max-w-xl leading-relaxed">
                Competed in the global hackathon focused on Earth data visualization and space innovation, pushing the boundaries of interactive data experiences.
              </p>
            </div>
          </motion.div>

          {/* 2. Medium Block - UI/UX Excellence */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="group relative rounded-3xl overflow-hidden bg-[#050505] border border-white/5 hover:border-white/20 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative h-full p-8 flex flex-col justify-between min-h-[250px] md:min-h-0">
              <Trophy className="w-8 h-8 text-emerald-400 opacity-80 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500" />
              <div>
                <p className="text-[10px] tracking-[0.2em] font-bold text-emerald-400/80 uppercase mb-2">Award</p>
                <h4 className="text-2xl font-bold text-white tracking-tight mb-3">UI/UX Design Excellence</h4>
                <p className="text-sm text-white/60 font-light leading-relaxed">
                  Recognized at campus innovation showcase for outstanding interface design and user experience architecture.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 3. Medium Block - AI & Data */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="group relative rounded-3xl overflow-hidden bg-[#050505] border border-white/5 hover:border-white/20 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative h-full p-8 flex flex-col justify-between min-h-[250px] md:min-h-0">
              <BrainCircuit className="w-8 h-8 text-rose-400 opacity-80 group-hover:animate-pulse" />
              <div>
                <p className="text-[10px] tracking-[0.2em] font-bold text-rose-400/80 uppercase mb-2">Focus Area</p>
                <h4 className="text-2xl font-bold text-white tracking-tight mb-3">AI Agent Engineering</h4>
                <p className="text-sm text-white/60 font-light leading-relaxed">
                  Specializing in LangChain, GPT-4 integration, and data-driven automation pipelines with Pinecone.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 4. Wide Block - Education */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="md:col-span-3 group relative rounded-3xl overflow-hidden bg-[#050505] border border-white/5 hover:border-white/20 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white-[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative h-full p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors duration-500">
                  <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-white/80 group-hover:text-white transition-colors duration-500" />
                </div>
                <div>
                  <h4 className="text-xl md:text-3xl font-bold text-white tracking-tight mb-2">Bachelor of Computer Applications</h4>
                  <p className="text-sm md:text-base text-white/50 font-light">Sandip University, Nashik</p>
                </div>
              </div>
              
              <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors duration-500">
                <span className="text-xs md:text-sm font-semibold tracking-widest text-white/80 uppercase">Class of 2025</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
