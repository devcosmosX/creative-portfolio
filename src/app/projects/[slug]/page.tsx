import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  // Await the slug to access route parameters
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-[#121212] text-white p-8 lg:p-24 selection:bg-white/30">
      <div className="max-w-5xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-xs font-mono mb-24 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8">
          {slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-white/10">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-light text-white/80 mb-6 leading-relaxed">
              This is a dynamic project details view for "{slug}". Here we would load rich case study information, full-width images, and technical breakdowns demonstrating the full scope of the project.
            </h2>
            <p className="text-white/40 text-lg leading-loose">
              Leveraging Next.js dynamic routing, any slug passed to `/projects/[slug]` perfectly renders this template. From here, you can dive into deep architectural write-ups or gallery grids of final deliverables.
            </p>
          </div>
          
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Role</h3>
              <p className="text-lg">Lead Developer</p>
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Timeline</h3>
              <p className="text-lg">Q4 2023</p>
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Technologies</h3>
              <p className="text-lg">Next.js, Framer Motion, WebGL</p>
            </div>
          </div>
        </div>
        
        {/* Placeholder for case study imagery */}
        <div className="mt-32 w-full aspect-video bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center backdrop-blur-sm">
          <p className="font-mono text-white/30 tracking-widest uppercase">Hero Image Placement</p>
        </div>
      </div>
    </main>
  );
}
