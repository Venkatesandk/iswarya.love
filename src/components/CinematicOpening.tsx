"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "@/config/birthdayConfig";

export function CinematicOpening({ onEnter }: { onEnter: () => void }) {
  const [step, setStep] = useState(0);

  const handleStart = () => {
    setStep(1);
    
    // Sequence timing
    setTimeout(() => setStep(2), 2000);
    setTimeout(() => setStep(3), 6000);
    setTimeout(() => setStep(4), 10000);
    setTimeout(() => {
      setStep(5);
      setTimeout(() => onEnter(), 1000);
    }, 14000);
  };

  return (
    <AnimatePresence>
      {step < 5 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-midnight-950 overflow-hidden"
        >
          {/* Ambient tiny stars */}
          <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

          {/* Slow moving glowing light */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "100%", opacity: [0, 0.3, 0] }}
            transition={{ duration: 15, ease: "linear", repeat: Infinity }}
            className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-champagne-400/10 to-transparent blur-3xl pointer-events-none"
          />

          <div className="relative z-10 text-center px-6 max-w-4xl">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="start"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                  className="flex flex-col items-center"
                >
                  <button 
                    onClick={handleStart}
                    className="px-12 py-5 border border-champagne-400/30 text-champagne-400 font-sans tracking-[0.3em] uppercase text-sm rounded-full hover:bg-champagne-400/10 hover:border-champagne-400 transition-all shadow-glow-gold hover:shadow-[0_0_40px_rgba(229,193,133,0.3)] group"
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
                  className="text-2xl md:text-4xl font-serif text-ivory-100 tracking-wide font-light leading-relaxed"
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
                  className="text-2xl md:text-4xl font-serif text-ivory-100 tracking-wide font-light leading-relaxed"
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
                  className="text-6xl md:text-9xl font-handwriting text-champagne-400"
                >
                  {birthdayConfig.HER_NAME}.
                </motion.h1>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
