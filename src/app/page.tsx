import CinematicHero from "@/components/CinematicHero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black selection:bg-white/30">
      {/* 1. Fully pinned canvas Image sequence playing on scroll */}
      <CinematicHero />

      {/* 2. Horizontal sticky scroll showcasing heavy data rows (Roles/Experience) */}
      <Experience />

      {/* 3. Follows identically right after the hero sequence releases */}
      <Projects />
      
      {/* 4. The grand finale contact/social component seamlessly appended */}
      <Footer />
    </main>
  );
}
