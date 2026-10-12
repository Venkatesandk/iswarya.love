"use client";
import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Image as DreiImage, Sparkles } from "@react-three/drei";
import { motion } from "framer-motion";
import { birthdayConfig } from "@/config/birthdayConfig";
import * as THREE from "three";

function FloatingHearts() {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: 15 }).map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={2} position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5]}>
          <Text color="#C97B84" fontSize={0.5} font="/fonts/CormorantGaramond-Italic.ttf">
            ♥
          </Text>
        </Float>
      ))}
    </group>
  );
}

export function HeroSection() {
  // We're converting this to the new 3D WebGL Hero
  return (
    <section className="relative w-full h-screen flex items-center justify-start overflow-hidden bg-midnight-950" id="hero">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={1.5} />
            
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
              <DreiImage url="/hero.jpg" scale={[4, 5]} position={[2, 0, -2]} transparent opacity={0.8} />
            </Float>

            <Sparkles count={200} scale={10} size={2} speed={0.4} opacity={0.5} color="#D8B77A" />
            <FloatingHearts />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 px-6 md:px-24 w-full max-w-7xl flex flex-col items-start pointer-events-auto">
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-champagne-400 font-serif italic text-2xl md:text-4xl mb-4"
        >
          Happy Birthday
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-6xl md:text-[9rem] leading-none font-serif text-ivory-100 uppercase tracking-widest relative"
          style={{ textShadow: "0 0 40px rgba(216, 183, 122, 0.3)" }}
        >
          {birthdayConfig.HER_NAME}
        </motion.h1>
      </div>

      {/* Big countdown placed bottom center */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 w-full px-4 flex justify-center pointer-events-auto">
         <div className="flex gap-4 items-center">
           <div className="text-center bg-midnight-950/40 backdrop-blur-md border border-champagne-400/20 rounded-xl p-4 min-w-[100px] shadow-glow-gold">
             <span className="text-4xl text-champagne-400 font-serif">14</span>
             <p className="text-xs text-ivory-100/50 uppercase tracking-widest mt-2">Days</p>
           </div>
           <div className="text-center bg-midnight-950/40 backdrop-blur-md border border-champagne-400/20 rounded-xl p-4 min-w-[100px] shadow-glow-gold">
             <span className="text-4xl text-champagne-400 font-serif">00</span>
             <p className="text-xs text-ivory-100/50 uppercase tracking-widest mt-2">Hours</p>
           </div>
         </div>
      </div>
    </section>
  );
}
