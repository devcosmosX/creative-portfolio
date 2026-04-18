"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X } from "lucide-react";

// The mapped collection of your professional stack extracted natively from your provided work experience
const SKILLS = [
  { id: 1, name: "MERN Stack",  desc: "Full-stack framework covering MongoDB, Express, React, and Node.js for heavy architectural production.", size: "w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64", color: "from-blue-500 to-indigo-900" },
  { id: 2, name: "Python Models", desc: "Core backend logic and advanced mathematical processing for data pipelines.", size: "w-32 h-32 md:w-48 md:h-48 lg:w-52 lg:h-52", color: "from-yellow-400 to-amber-900" },
  { id: 3, name: "Machine Learning", desc: "Engineering predictive models and raw data analytics structures to solve highly intricate problems.", size: "w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72", color: "from-fuchsia-400 to-purple-900" },
  { id: 4, name: "Data Science", desc: "Aggregating, visualizing, and decoding dense system infrastructure into actionable metrics.", size: "w-36 h-36 md:w-52 md:h-52 lg:w-60 lg:h-60", color: "from-emerald-400 to-teal-900" },
  { id: 5, name: "SEO Optimization", desc: "Deep marketing-level engineering designed explicitly to manipulate major search rankings organically.", size: "w-28 h-28 md:w-40 md:h-40 lg:w-48 lg:h-48", color: "from-orange-400 to-red-900" },
  { id: 6, name: "React JS", desc: "Developing radically immersive frontend interfaces that push performance thresholds to their limit.", size: "w-44 h-44 md:w-60 md:h-60 lg:w-64 lg:h-64", color: "from-cyan-300 to-blue-800" },
  { id: 7, name: "SQL Systems", desc: "Rigorous relational database mapping ensuring absolute zero latency and solid data integrity.", size: "w-32 h-32 md:w-44 md:h-44 lg:w-48 lg:h-48", color: "from-rose-400 to-rose-950" }
];

export default function Skills3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeSkill, setActiveSkill] = useState<number | null>(null);

  useEffect(() => {
    // Stage 1: The organic GSAP float logic wrapping all spheres
    const ctx = gsap.context(() => {
      
       ballsRef.current.forEach((ball, i) => {
         if (!ball) return;
         
         // Dynamically scatter the 3D balls across random coordinates near the center
         gsap.set(ball, {
            x: Math.random() * window.innerWidth * 0.5 - window.innerWidth * 0.25,
            y: Math.random() * window.innerHeight * 0.5 - window.innerHeight * 0.25,
            scale: 0,
            opacity: 0,
         });

         // Entrance pop animation scaling them physically into the world
         gsap.to(ball, {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            delay: i * 0.08,
            ease: "back.out(1.2)"
         });

         // The Infinite continuous flow math
         gsap.to(ball, {
            x: `+=${Math.random() * 80 - 40}`,
            y: `+=${Math.random() * 80 - 40}`,
            rotation: Math.random() * 30 - 15,
            duration: Math.random() * 4 + 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
         });
       });
       
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const handleBallClick = (index: number, id: number) => {
    setActiveSkill(id);
    const clickedBall = ballsRef.current[index];

    // GSAP physically overtakes the clicked 3D sphere and drives it dead center
    gsap.to(clickedBall, {
       x: 0,
       y: 0,
       rotation: 0, // Reset rotation perfectly flat for reading
       scale: 1.4, // Overblow the size heavily
       zIndex: 100,
       duration: 1.2,
       ease: "elastic.out(1, 0.75)"
    });

    // Pushes all sibling spheres into a deep out-of-focus background
    ballsRef.current.forEach((ball, i) => {
       if (i !== index && ball) {
         gsap.to(ball, {
            scale: 0.6,
            opacity: 0.15,
            filter: "blur(12px)",
            duration: 0.8,
            ease: "power3.out"
         });
       }
    });
  };

  const closeActiveSkill = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setActiveSkill(null);
    const clickedBall = ballsRef.current[index];

    // Restore the center ball to its native floating form
    gsap.to(clickedBall, {
       scale: 1,
       zIndex: 10,
       duration: 0.8,
       ease: "power3.inOut"
    });

    // Restore all other balls to sharp focus
    ballsRef.current.forEach((ball, i) => {
       if (i !== index && ball) {
         gsap.to(ball, {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.inOut"
         });
       }
    });
  };

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#020202] overflow-hidden flex flex-col items-center justify-center py-32 border-t border-white/5">
       
       <div className="absolute top-24 md:top-32 text-center w-full z-0 pointer-events-none">
          <p className="text-xs md:text-sm tracking-[0.4em] font-medium text-white/30 uppercase mb-4">
            Technical Arsenal
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-white/10 tracking-tight">
            Select an orb to expand
          </h2>
       </div>

       {/* Floating Canvas Box */}
       <div className="relative w-full h-[600px] lg:h-[800px] flex items-center justify-center z-10">
          
          {SKILLS.map((skill, index) => {
            const isActive = activeSkill === skill.id;
            
            return (
              <button
                key={skill.id}
                ref={(el) => { ballsRef.current[index] = el; }}
                onClick={() => !isActive && handleBallClick(index, skill.id)}
                className={`absolute rounded-full flex flex-col items-center justify-center ${skill.size} cursor-pointer hover:brightness-110 transition-all duration-300 overflow-hidden bg-gradient-to-br ${skill.color}`}
                style={{
                   boxShadow: "inset -25px -25px 60px rgba(0,0,0,0.8), inset 15px 15px 40px rgba(255,255,255,0.4), 0 30px 60px rgba(0,0,0,0.6)",
                }}
              >
                 {/* Native title of the ball */}
                 <span className={`text-white font-black tracking-tighter text-xl md:text-3xl lg:text-4xl drop-shadow-2xl p-4 leading-none text-balance transition-all duration-[800ms] ${isActive ? 'translate-y-[-2rem] scale-75 opacity-40' : 'translate-y-0 scale-100 opacity-90'}`}>
                   {skill.name}
                 </span>
                 
                 {/* Internal description strictly visible only when the ball expands smoothly */}
                 <div 
                   className={`absolute inset-0 px-6 md:px-10 flex flex-col items-center justify-center text-center text-white/90 font-light text-sm md:text-lg transition-all duration-700 ${isActive ? 'opacity-100 translate-y-4 pointer-events-auto delay-300' : 'opacity-0 translate-y-12 pointer-events-none'}`}
                 >
                    <p className="text-balance leading-relaxed drop-shadow-lg">{skill.desc}</p>
                    
                    {/* The closure interaction */}
                    <div 
                      onClick={(e) => closeActiveSkill(e, index)}
                      className="mt-6 md:mt-8 p-3 md:p-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full transition-colors cursor-pointer shadow-xl"
                    >
                      <X size={24} className="text-white" strokeWidth={1.5} />
                    </div>
                 </div>
              </button>
            )
          })}
          
       </div>
    </section>
  )
}
