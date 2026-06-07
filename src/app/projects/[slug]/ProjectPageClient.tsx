"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  category: string;
  slug: string;
  url: string;
  date: string;
  color: string;
  role: string;
  services: string;
  location: string;
  description: string;
  video: string;
  image: string;
}

interface ProjectPageClientProps {
  project: Project;
  nextProject: Project;
}

export default function ProjectPageClient({ project, nextProject }: ProjectPageClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <main className="min-h-screen bg-[#F5F5F5] text-black selection:bg-black/20">
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-6 flex items-center justify-between bg-[#F5F5F5]/90 backdrop-blur-lg border-b border-black/5">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-black/50 hover:text-black transition-all duration-300 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back</span>
        </Link>
        
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full text-sm font-medium transition-all duration-300 hover:bg-black/90 hover:gap-3"
        >
          <span>Visit Live Site</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </a>
      </nav>

      {/* HERO SECTION */}
      <motion.div 
        ref={heroRef}
        style={{ opacity, scale }}
        className="relative h-screen flex items-center justify-center px-6 lg:px-12 pt-24"
      >
        <div className="max-w-[1400px] w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-[15vw] lg:text-[12vw] leading-[0.85] font-bold tracking-tight mb-8">
              {project.title}
            </h1>
          </motion.div>

          {/* Metadata Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm"
          >
            <div>
              <p className="text-black/40 uppercase tracking-wider text-xs mb-2">Role / Services</p>
              <p className="font-medium">{project.role}</p>
            </div>
            <div>
              <p className="text-black/40 uppercase tracking-wider text-xs mb-2">Credits</p>
              <p className="font-medium">{project.services}</p>
            </div>
            <div>
              <p className="text-black/40 uppercase tracking-wider text-xs mb-2">Location & Year</p>
              <p className="font-medium">{project.location} © {project.date}</p>
            </div>
            <div>
              <p className="text-black/40 uppercase tracking-wider text-xs mb-2">Category</p>
              <p className="font-medium">{project.category}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* HERO IMAGE/VIDEO */}
      <div className="relative w-full h-screen sticky top-0 overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={project.video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F5F5F5]" />
      </div>

      {/* PROJECT OVERVIEW */}
      <div className="relative z-10 bg-[#F5F5F5] px-6 lg:px-12 py-32 lg:py-48">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-4"
            >
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40 mb-6">
                About the project
              </h2>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-8"
            >
              <p className="text-3xl lg:text-5xl font-light leading-[1.3] text-black/90">
                {project.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* IMAGE GALLERY SECTION 1 */}
      <div className="relative z-10 bg-[#F5F5F5] px-6 lg:px-12 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-black/5"
          >
            <Image
              src={project.image}
              alt={`${project.title} showcase 1`}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* LAPTOP MOCKUP SECTION */}
      <div className="relative z-10 bg-[#E5E5E5] px-6 lg:px-12 py-32">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Laptop Frame */}
            <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-2xl p-4 shadow-2xl">
              <div className="w-full h-full bg-black rounded-lg overflow-hidden">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover"
                >
                  <source src={project.video} type="video/mp4" />
                </video>
              </div>
            </div>
            {/* Laptop Base */}
            <div className="relative w-full h-4 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-xl">
              <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-32 h-1 bg-gray-600 rounded-t-lg" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* MOBILE MOCKUPS SECTION */}
      <div className="relative z-10 bg-[#F5F5F5] px-6 lg:px-12 py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative"
              >
                {/* Phone Frame */}
                <div className="relative w-full aspect-[9/19] bg-black rounded-[3rem] p-3 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`${project.title} mobile ${index}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Notch */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* PROJECT DETAILS SECTION */}
      <div className="relative z-10 bg-white px-6 lg:px-12 py-32 lg:py-48">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40 mb-6">
                The Challenge
              </h3>
              <p className="text-xl lg:text-2xl font-light leading-relaxed text-black/80">
                Creating a seamless user experience that balances aesthetic appeal with functional performance. 
                The project required innovative solutions to complex technical challenges while maintaining 
                design integrity across all platforms.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40 mb-6">
                The Solution
              </h3>
              <p className="text-xl lg:text-2xl font-light leading-relaxed text-black/80">
                Implemented cutting-edge technologies and design patterns to deliver a high-performance 
                application. Focus on user-centric design principles ensured an intuitive interface that 
                exceeded client expectations and user requirements.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FINAL SHOWCASE IMAGE */}
      <div className="relative z-10 bg-white px-6 lg:px-12 pb-32">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden bg-black/5"
          >
            <Image
              src={project.image}
              alt={`${project.title} final showcase`}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* NEXT PROJECT FOOTER */}
      <div className="relative z-10 bg-black text-white overflow-hidden">
        <Link 
          href={`/projects/${nextProject.slug}`}
          className="block group"
        >
          <div className="relative min-h-screen flex flex-col items-center justify-center px-6 lg:px-12 py-32">
            {/* Background Image with Parallax */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full"
              >
                <Image
                  src={nextProject.image}
                  alt={nextProject.title}
                  fill
                  className="object-cover opacity-20"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50 mb-8"
              >
                Next case
              </motion.p>
              
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-[12vw] lg:text-[10vw] leading-none font-bold tracking-tight mb-8 group-hover:scale-105 transition-transform duration-700"
              >
                {nextProject.title}
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-3 text-sm font-medium text-white/70 group-hover:text-white transition-colors"
              >
                <span>View project</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.div>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}

// Made with Bob
