import React from "react";
import { PROJECTS } from "@/lib/projects";
import { notFound } from "next/navigation";
import ProjectPageClient from "./ProjectPageClient";

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

  return <ProjectPageClient project={project} nextProject={nextProject} />;
}

// Made with Bob
