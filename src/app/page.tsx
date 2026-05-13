import dynamic from "next/dynamic";
import CinematicHero from "@/components/CinematicHero";
import LazyLoader from "@/components/LazyLoader";

const Experience = dynamic(() => import("@/components/Experience"));
const Skills3D = dynamic(() => import("@/components/Skills3D"));
const Projects = dynamic(() => import("@/components/Projects"));
const Milestones = dynamic(() => import("@/components/Milestones"));
const Footer = dynamic(() => import("@/components/Footer"));
const Preloader = dynamic(() => import("@/components/Preloader"));

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black selection:bg-white/20">
      <Preloader />
      {/* 1. Fully pinned canvas Image sequence playing on scroll */}
      <CinematicHero />

      {/* 2. Horizontal sticky scroll showcasing heavy data rows (Roles/Experience) */}
      <LazyLoader minHeight="400vh">
        <Experience />
      </LazyLoader>

      {/* 3. Interactive 3D Skills Component */}
      <LazyLoader minHeight="100vh">
        <Skills3D />
      </LazyLoader>

      {/* 4. Follows identically right after the hero sequence releases */}
      <LazyLoader>
        <Projects />
      </LazyLoader>
      
      {/* 5. Milestones & Achievements Bento Grid */}
      <LazyLoader>
        <Milestones />
      </LazyLoader>

      {/* 6. The grand finale contact/social component seamlessly appended */}
      <LazyLoader rootMargin="500px">
        <Footer />
      </LazyLoader>
    </main>
  );
}
