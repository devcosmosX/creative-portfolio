import CinematicHero from "@/components/CinematicHero";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="bg-black selection:bg-white/30">
      {/* 
        This is the ONLY hero element. It is natively scroll-jacked 
        for 500vh to ensure frames scrub dynamically inside it 
        before releasing scroll to the normal lower sections.
      */}
      <CinematicHero />

      {/* 
        This follows identically right after the hero sequence releases
      */}
      <Projects />
    </main>
  );
}
