"use client";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { ThreeGate } from "./ThreeGate";

import { birthdayConfig } from "@/config/birthdayConfig";

export function ThreeGateOverlay({ onEnter }: { onEnter: () => void }) {
  const [isEntering, setIsEntering] = useState(false);
  const [step, setStep] = useState(0);

  const handleEnterClick = () => {
    setStep(1); // Hide button immediately
    
    // Sequence timing
    setTimeout(() => setStep(2), 1000); // There are billions...
    setTimeout(() => setStep(3), 5000); // ...but only one...
    setTimeout(() => setStep(4), 9000); // Iswarya...
    setTimeout(() => {
      setStep(5);
      setIsEntering(true); // Trigger 3D camera fly through!
    }, 13000);
  };

  return (
    <AnimatePresence>
      <motion.div 
        key="gate"
        className="fixed inset-0 z-50 bg-midnight-950"
      >
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <ThreeGate onEnter={onEnter} startAnimation={isEntering} />
          </Canvas>
        </div>

        {/* DOM Overlay */}
        <div className="absolute inset-0 z-50 pointer-events-none flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="start"
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                transition={{ duration: 0.8 }}
                className="pointer-events-auto flex flex-col items-center"
              >
                {/* Glowing Orb Illusion Behind Text */}
                <div className="absolute w-32 h-32 bg-champagne-400/20 rounded-full blur-3xl animate-pulse" />
                
                <button 
                  onClick={handleEnterClick}
                  className="relative z-10 px-12 py-5 border border-champagne-400/30 text-champagne-400 font-sans tracking-[0.3em] uppercase text-sm rounded-full bg-midnight-950/50 hover:bg-champagne-400/10 hover:border-champagne-400 transition-all shadow-[0_0_20px_rgba(229,193,133,0.1)] hover:shadow-[0_0_40px_rgba(229,193,133,0.3)] group"
                >
                  Enter Her Universe
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.h2
                key="text1"
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-2xl md:text-4xl font-serif text-ivory-100 tracking-wide font-light leading-relaxed text-center px-6 pointer-events-none"
              >
                There are billions of people in this world...
              </motion.h2>
            )}
            
            {step === 3 && (
              <motion.h2
                key="text2"
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-2xl md:text-4xl font-serif text-ivory-100 tracking-wide font-light leading-relaxed text-center px-6 pointer-events-none"
              >
                ...but only one person has her own universe.
              </motion.h2>
            )}

            {step === 4 && (
              <motion.h1
                key="text3"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="text-6xl md:text-9xl font-handwriting text-champagne-400 pointer-events-none"
              >
                {birthdayConfig.HER_NAME}.
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
