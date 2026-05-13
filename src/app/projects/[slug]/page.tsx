import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/projects";
import { notFound } from "next/navigation";

// Next.js generates static pages for all these slugs at build time
export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[projectIndex];
  
  if (!project) {
    notFound();
  }

  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  return (
    <main className="min-h-screen bg-[#111111] text-white selection:bg-white/30">
      
      {/* 1. HERO HEADER */}
      <div className="px-6 lg:px-12 pt-12 lg:pt-24 pb-16 lg:pb-32 max-w-[1600px] mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold mb-16 lg:mb-24"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        {/* Massive Title */}
        <h1 className="text-[12vw] leading-[0.8] font-black tracking-tighter uppercase mb-20 lg:mb-32">
          {project.title}
        </h1>
        
        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/10 pt-12">
          <div className="md:col-span-1">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">Role / Services</h3>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium">{project.role}</p>
              <p className="text-sm text-white/50">{project.services}</p>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">Location & Year</h3>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium">{project.location}</p>
              <p className="text-sm text-white/50">{project.date}</p>
            </div>
          </div>
          
          <div className="md:col-span-2 flex md:justify-end items-start">
            <a 
              href={project.url} 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-32 h-32 rounded-full border border-white/20 bg-[#151515] hover:bg-white hover:text-black transition-all duration-500 overflow-hidden"
            >
              <div className="flex flex-col items-center gap-1 group-hover:-translate-y-1 transition-transform duration-500">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Live Site</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>
          </div>
        </div>
      </div>
      
      {/* 2. CINEMATIC VIDEO */}
      <div className="w-full">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-auto max-h-[85vh] object-cover"
        >
          <source src={project.video} type="video/mp4" />
        </video>
      </div>
      
      {/* 3. PROJECT OVERVIEW */}
      <div className="bg-white text-black px-6 lg:px-12 py-32 lg:py-48">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          <div className="lg:col-span-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-black/40">
              About the project
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-3xl lg:text-5xl font-light tracking-tight leading-[1.3] text-[#111111]">
              {project.description}
            </p>
          </div>
        </div>
      </div>
      
      {/* 4. NEXT PROJECT FOOTER */}
      <div className="bg-[#111111] border-t border-white/5 flex flex-col items-center justify-center py-32 lg:py-64 relative overflow-hidden group">
        <Link href={`/projects/${nextProject.slug}`} className="absolute inset-0 z-20" />
        
        {/* Animated Hover Background */}
        <div className="absolute inset-0 bg-[#151515] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] z-0" />
        
        <div className="relative z-10 flex flex-col items-center gap-6">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40">Next Case</p>
          <h2 className="text-[10vw] leading-none font-black tracking-tighter uppercase text-white group-hover:scale-105 transition-transform duration-700 ease-out">
            {nextProject.title}
          </h2>
        </div>
      </div>
      
    </main>
  );
}
