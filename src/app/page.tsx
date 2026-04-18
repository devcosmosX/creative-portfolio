import CinematicHero from "@/components/CinematicHero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills3D from "@/components/Skills3D";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black selection:bg-white/30 overflow-x-hidden">
      {/* 1. Fully pinned canvas Image sequence playing on scroll */}
      <CinematicHero />

      {/* 2. Horizontal sticky scroll showcasing heavy data rows (Roles/Experience) */}
      <Experience />

      {/* 3. Follows identically right after the hero sequence releases */}
      <Projects />
      
      {/* 4. Massive Flowing 3D CSS Spheres containing Skills mapped purely to GSAP */}
      <Skills3D />

      {/* 5. The grand finale contact/social component seamlessly appended */}
      <Footer />
    </main>
  );
}
