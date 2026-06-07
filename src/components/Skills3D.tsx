"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Environment, Stars, Sparkles } from "@react-three/drei";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs,
  SiPython, SiMongodb, SiTailwindcss, SiThreedotjs,
  SiFramer, SiStreamlit, SiDocker, SiGit, SiGraphql, SiRedis
} from "react-icons/si";

const TARGETED_SKILLS = [
  { name: "React", Icon: SiReact, color: "#61DAFB", category: "Frontend", proficiency: 95 },
  { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF", category: "Frontend", proficiency: 90 },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6", category: "Language", proficiency: 88 },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933", category: "Backend", proficiency: 85 },
  { name: "Python", Icon: SiPython, color: "#3776AB", category: "Language", proficiency: 82 },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248", category: "Database", proficiency: 80 },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4", category: "Styling", proficiency: 92 },
  { name: "Three.js", Icon: SiThreedotjs, color: "#FFFFFF", category: "3D", proficiency: 78 },
  { name: "Framer", Icon: SiFramer, color: "#0055FF", category: "Animation", proficiency: 85 },
  { name: "Streamlit", Icon: SiStreamlit, color: "#FF4B4B", category: "Tools", proficiency: 75 },
  { name: "Docker", Icon: SiDocker, color: "#2496ED", category: "DevOps", proficiency: 80 },
  { name: "Git", Icon: SiGit, color: "#F05032", category: "Tools", proficiency: 90 },
  { name: "GraphQL", Icon: SiGraphql, color: "#E10098", category: "API", proficiency: 75 },
  { name: "Redis", Icon: SiRedis, color: "#DC382D", category: "Database", proficiency: 70 },
];

// Enhanced spiral galaxy layout with multiple orbital rings
function getSpiralGalaxyPoints(samples: number, baseRadius: number) {
  const points = [];
  const ringsCount = 3; // Multiple orbital rings
  
  for (let i = 0; i < samples; i++) {
    const ringIndex = Math.floor(i / (samples / ringsCount));
    const radius = baseRadius + ringIndex * 2.5;
    const angle = (i / samples) * Math.PI * 2 + ringIndex * 0.5;
    
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    // Create a dynamic wave pattern that varies by ring
    const y = Math.sin(angle * 4 + ringIndex) * (2 - ringIndex * 0.3);
    
    points.push(new THREE.Vector3(x, y, z));
  }
  return points;
}

// Particle system for ambient effects
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 100;
  
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      
      colors[i * 3] = Math.random();
      colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
      colors[i * 3 + 2] = 1;
    }
    
    return { positions, colors };
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.6} />
    </points>
  );
}

function SkillCard({ position, skill, index }: { position: THREE.Vector3, skill: typeof TARGETED_SKILLS[0], index: number }) {
  const cardRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (cardRef.current) {
      // Make the card always face the camera seamlessly
      cardRef.current.quaternion.copy(state.camera.quaternion);
      
      // Ultra-smooth scale interpolation on hover with bounce effect
      const targetScale = hovered ? 1.25 : 1;
      cardRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
      
      // Subtle floating animation
      cardRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.3;
    }
    
    // Animated glow effect
    if (glowRef.current) {
      const glowIntensity = hovered ? 1 : 0.3;
      glowRef.current.scale.lerp(
        new THREE.Vector3(glowIntensity * 2, glowIntensity * 2, glowIntensity * 2),
        0.1
      );
    }
  });

  return (
    <group ref={cardRef} position={position}>
      {/* Glowing sphere behind card */}
      <mesh ref={glowRef} position={[0, 0, -0.5]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial
          color={skill.color}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      <Html
        transform
        center
        distanceFactor={15}
        zIndexRange={[100, 0]}
      >
        <div
          onPointerEnter={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
          onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
          className="relative flex flex-col items-center justify-center p-5 w-32 h-32 rounded-2xl backdrop-blur-md transition-all duration-500 group select-none"
          style={{
            backgroundColor: hovered ? `${skill.color}20` : 'rgba(255,255,255,0.03)',
            border: `2px solid ${hovered ? skill.color : 'rgba(255,255,255,0.08)'}`,
            boxShadow: hovered
              ? `0 0 40px ${skill.color}40, inset 0 0 20px ${skill.color}10`
              : '0 4px 20px rgba(0,0,0,0.3)',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Proficiency ring */}
          <div
            className="absolute inset-0 rounded-2xl transition-all duration-500"
            style={{
              background: `conic-gradient(${skill.color} ${skill.proficiency * 3.6}deg, transparent ${skill.proficiency * 3.6}deg)`,
              opacity: hovered ? 0.3 : 0.1,
              mask: 'radial-gradient(circle, transparent 85%, black 85%)'
            }}
          />
          
          {/* Category badge */}
          <div
            className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[8px] font-bold tracking-wider transition-all duration-500"
            style={{
              backgroundColor: `${skill.color}30`,
              color: skill.color,
              border: `1px solid ${skill.color}`,
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'scale(1)' : 'scale(0.8)'
            }}
          >
            {skill.category}
          </div>
          
          {/* Real SVG Icon */}
          <skill.Icon
            className="w-12 h-12 transition-all duration-500 relative z-10"
            style={{
              color: hovered ? skill.color : 'rgba(255,255,255,0.5)',
              filter: hovered ? `drop-shadow(0 0 15px ${skill.color}) drop-shadow(0 0 5px ${skill.color})` : 'none',
              transform: hovered ? 'translateZ(30px) scale(1.15) rotateY(360deg)' : 'translateZ(0px) scale(1)'
            }}
          />
          
          {/* Skill Name */}
          <span
            className="mt-3 text-[11px] font-semibold tracking-[0.15em] uppercase transition-all duration-500 relative z-10"
            style={{
              color: hovered ? '#fff' : 'rgba(255,255,255,0.4)',
              transform: hovered ? 'translateZ(15px)' : 'translateZ(0px)',
              textShadow: hovered ? `0 0 10px ${skill.color}` : 'none'
            }}
          >
            {skill.name}
          </span>
          
          {/* Proficiency percentage */}
          <span
            className="mt-1 text-[9px] font-medium transition-all duration-500"
            style={{
              color: hovered ? skill.color : 'rgba(255,255,255,0.2)',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translateZ(10px) translateY(0)' : 'translateZ(0px) translateY(5px)'
            }}
          >
            {skill.proficiency}%
          </span>
        </div>
      </Html>
    </group>
  );
}

function SkillCluster() {
  const groupRef = useRef<THREE.Group>(null);
  const orbitLinesRef = useRef<THREE.LineSegments>(null);
  
  // Enhanced spiral galaxy layout
  const positions = useMemo(() => getSpiralGalaxyPoints(TARGETED_SKILLS.length, 7), []);
  
  // Create orbital path lines
  const orbitLines = useMemo(() => {
    const points = [];
    const ringsCount = 3;
    
    for (let ring = 0; ring < ringsCount; ring++) {
      const radius = 7 + ring * 2.5;
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 4 + ring) * (2 - ring * 0.3);
        points.push(new THREE.Vector3(x, y, z));
      }
    }
    
    return points;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth carousel rotation with variable speed
      groupRef.current.rotation.y -= delta * 0.12;
      
      // Dynamic vertical movement
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.8;
      
      // Subtle tilt for depth
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    
    // Animate orbital lines
    if (orbitLinesRef.current) {
      orbitLinesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <>
      {/* Orbital path visualization */}
      <lineSegments ref={orbitLinesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={orbitLines.length}
            array={new Float32Array(orbitLines.flatMap(v => [v.x, v.y, v.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" opacity={0.05} transparent />
      </lineSegments>
      
      <group ref={groupRef}>
        {TARGETED_SKILLS.map((skill, i) => (
          <SkillCard key={skill.name} position={positions[i]} skill={skill} index={i} />
        ))}
      </group>
      
      {/* Add sparkles for magical effect */}
      <Sparkles
        count={50}
        scale={20}
        size={2}
        speed={0.3}
        opacity={0.4}
        color="#ffffff"
      />
      
      {/* Floating particles */}
      <FloatingParticles />
    </>
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
      
      {/* Enhanced animated gradient background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
            animation: 'pulse 8s ease-in-out infinite'
          }}
        />
      </div>
      
      {/* Vintage film grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute top-32 left-6 lg:left-12 z-10 pointer-events-none max-w-2xl">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase mb-2">
            Skills & Expertise
          </h3>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mb-6" />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/50 text-lg md:text-xl max-w-xl font-light leading-relaxed"
        >
          A curated collection of cutting-edge technologies.
          <span className="text-white/70 block mt-2">Drag to explore • Hover for details</span>
        </motion.p>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex gap-8 mt-8"
        >
          <div>
            <div className="text-3xl font-bold text-white">{TARGETED_SKILLS.length}+</div>
            <div className="text-sm text-white/40 uppercase tracking-wider">Technologies</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">6</div>
            <div className="text-sm text-white/40 uppercase tracking-wider">Categories</div>
          </div>
        </motion.div>
      </div>

      {/* 3D Canvas - Enhanced with better lighting and effects */}
      <div className="w-full h-full cursor-grab active:cursor-grabbing relative z-10">
        {isMounted && (
          <Canvas
            frameloop={inView ? "always" : "demand"}
            camera={{ position: [0, 5, 20], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            {/* Enhanced lighting setup */}
            <ambientLight intensity={0.4} />
            <spotLight position={[15, 15, 15]} angle={0.2} penumbra={1} intensity={1.5} castShadow />
            <spotLight position={[-15, 10, -15]} angle={0.2} penumbra={1} intensity={1} color="#4f46e5" />
            <pointLight position={[0, 10, 0]} intensity={0.5} color="#ec4899" />
            
            {/* Stars background */}
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
            
            <SkillCluster />
            
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              rotateSpeed={0.6}
              autoRotate={false}
              maxPolarAngle={Math.PI / 1.8}
              minPolarAngle={Math.PI / 4}
              dampingFactor={0.05}
              enableDamping
            />
            
            <Environment preset="night" />
          </Canvas>
        )}
      </div>

      {/* Enhanced bottom gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-20" />
      
      {/* Corner decorative elements */}
      <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/5 to-transparent z-0" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/5 to-transparent z-0" />
    </section>
  );
}
