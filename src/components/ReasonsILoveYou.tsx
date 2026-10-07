"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "@/config/birthdayConfig";

export function ReasonsILoveYou() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reasons = birthdayConfig.REASONS.items;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reasons.length);
  };

  return (
    <section className="relative w-full py-32 bg-midnight-950 flex flex-col items-center justify-center overflow-hidden min-h-screen" id="reasons">
      {/* Background ambient light */}
      <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center">
        <div className="w-[60vw] h-[60vw] bg-champagne-400/5 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6 text-center flex flex-col items-center">
        
        <span className="text-rose-400 tracking-[0.3em] text-xs uppercase mb-4 font-sans block">
          Chapter 04
        </span>
        <h2 className="text-4xl md:text-6xl font-serif text-ivory-100 tracking-wide mb-24">
          {birthdayConfig.REASONS.title}
        </h2>

        <div className="relative w-full min-h-[300px] flex items-center justify-center mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute w-full flex flex-col items-center"
            >
              <span className="text-champagne-400 font-serif text-6xl md:text-8xl opacity-30 mb-8 block font-light">
                {(currentIndex + 1).toString().padStart(2, '0')}
              </span>
              <p className="text-2xl md:text-4xl font-serif text-ivory-100 leading-relaxed max-w-2xl text-center italic">
                "{reasons[currentIndex]}"
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="group relative px-10 py-5 bg-transparent border border-champagne-400/30 rounded-full overflow-hidden hover:border-champagne-400/80 transition-all duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-champagne-400/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
          <span className="relative z-10 text-sm tracking-[0.2em] font-sans font-medium text-champagne-400 flex items-center gap-2">
            SHOW ME ANOTHER <span className="text-rose-400 text-lg group-hover:scale-125 transition-transform">❤️</span>
          </span>
        </motion.button>

      </div>
    </section>
  );
}
