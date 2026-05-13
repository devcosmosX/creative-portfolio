"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Environment } from "@react-three/drei";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, 
  SiPython, SiMongodb, SiTailwindcss, SiThreedotjs, 
  SiFramer, SiStreamlit 
} from "react-icons/si";

const TARGETED_SKILLS = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Three.js", Icon: SiThreedotjs, color: "#FFFFFF" },
  { name: "Framer", Icon: SiFramer, color: "#0055FF" },
  { name: "Streamlit", Icon: SiStreamlit, color: "#FF4B4B" },
];

// Clean, elegant orbital ring layout with a gentle wave
function getOrbitalRingPoints(samples: number, radius: number) {
  const points = [];
  for (let i = 0; i < samples; i++) {
    const angle = (i / samples) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    // Add a gentle sine wave on the Y axis so they aren't perfectly flat
    const y = Math.sin(angle * 3) * 1.5; 
    points.push(new THREE.Vector3(x, y, z));
  }
  return points;
}

function SkillCard({ position, skill }: { position: THREE.Vector3, skill: typeof TARGETED_SKILLS[0] }) {
  const cardRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (cardRef.current) {
      // Make the card always face the camera seamlessly
      cardRef.current.quaternion.copy(state.camera.quaternion);
      
      // Ultra-smooth scale interpolation on hover
      const targetScale = hovered ? 1.15 : 1;
      cardRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group ref={cardRef} position={position}>
      <Html 
        transform 
        center 
        distanceFactor={15}
        zIndexRange={[100, 0]}
      >
        <div 
          onPointerEnter={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
          onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
          className="relative flex flex-col items-center justify-center p-4 w-28 h-28 rounded-2xl backdrop-blur-sm transition-all duration-500 group select-none"
          style={{
            backgroundColor: hovered ? `${skill.color}15` : 'rgba(255,255,255,0.02)',
            border: `1px solid ${hovered ? skill.color : 'rgba(255,255,255,0.05)'}`,
            boxShadow: hovered ? `0 0 30px ${skill.color}30` : 'none',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Real SVG Icon */}
          <skill.Icon 
            className="w-10 h-10 transition-all duration-500"
            style={{ 
              color: hovered ? skill.color : 'rgba(255,255,255,0.4)',
              filter: hovered ? `drop-shadow(0 0 10px ${skill.color})` : 'none',
              transform: hovered ? 'translateZ(20px) scale(1.1)' : 'translateZ(0px) scale(1)'
            }} 
          />
          
          {/* Skill Name */}
          <span 
            className="mt-3 text-[10px] font-medium tracking-[0.15em] uppercase transition-all duration-500"
            style={{ 
              color: hovered ? '#fff' : 'rgba(255,255,255,0.3)',
              transform: hovered ? 'translateZ(10px)' : 'translateZ(0px)'
            }}
          >
            {skill.name}
          </span>
        </div>
      </Html>
    </group>
  );
}

function SkillCluster() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Radius of 8 gives a wide, majestic orbit
  const positions = useMemo(() => getOrbitalRingPoints(TARGETED_SKILLS.length, 8), []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Clean horizontal carousel rotation
      groupRef.current.rotation.y -= delta * 0.15;
      
      // Gently bob the entire cluster up and down for organic feel
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {TARGETED_SKILLS.map((skill, i) => (
        <SkillCard key={skill.name} position={positions[i]} skill={skill} />
      ))}
    </group>
  );
}

export default function Skills3D() {
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "200px" });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[100vh] min-h-[800px] bg-black overflow-hidden flex flex-col items-center justify-center border-t border-white/10">
      
      {/* Vintage film grain overlay matching the dark aesthetic */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute top-32 left-6 lg:left-12 z-10 pointer-events-none">
        <motion.h3 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase"
        >
          Arsenal
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/40 mt-4 text-xl max-w-xl font-light"
        >
          Specialized stack. Interactive orbit. Drag to explore.
        </motion.p>
      </div>

      {/* 3D Canvas - Only render on client to avoid hydration errors */}
      <div className="w-full h-full cursor-grab active:cursor-grabbing relative z-10">
        {isMounted && (
          // Adjusted camera position to look down at the ring from an angle
          <Canvas frameloop={inView ? "always" : "demand"} camera={{ position: [0, 4, 18], fov: 40 }} dpr={[1, 2]}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
            
            <SkillCluster />
            
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              rotateSpeed={0.8}
              autoRotate={false}
              maxPolarAngle={Math.PI / 1.5} // Restrict camera so you can't look from straight below
              minPolarAngle={Math.PI / 3}   // Restrict camera so you can't look from straight above
            />
            
            <Environment preset="city" />
          </Canvas>
        )}
      </div>

      {/* Subtle bottom gradient to blend seamlessly into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent z-20" />
    </section>
  );
}
