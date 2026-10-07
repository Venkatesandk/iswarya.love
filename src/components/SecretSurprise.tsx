"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "@/config/birthdayConfig";

export function SecretSurprise() {
  const [revealed, setRevealed] = useState(false);
  const surprise = birthdayConfig.SECRET_SURPRISE;

  const handleReveal = () => {
    setRevealed(true);
    // In a full implementation, this could also trigger a global state to change the background music
  };

  return (
    <section className="relative w-full py-40 bg-midnight-950 flex flex-col items-center justify-center min-h-screen overflow-hidden" id="surprise">
      
      <div className="relative z-10 w-full max-w-4xl px-6 text-center flex flex-col items-center">
        
        <span className="text-rose-400 tracking-[0.3em] text-xs uppercase mb-4 font-sans block">
          Chapter 07
        </span>

        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="mystery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <h2 className="text-4xl md:text-6xl font-serif text-ivory-100 tracking-wide mb-6">
                {surprise.title}
              </h2>
              <p className="text-ivory-100/60 font-sans text-xl md:text-2xl mb-16 italic">
                {surprise.subtitle}
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReveal}
                className="group relative px-12 py-5 bg-transparent border border-champagne-400 rounded-full overflow-hidden hover:bg-champagne-400/10 transition-all duration-500 shadow-[0_0_20px_rgba(229,193,133,0.1)] hover:shadow-[0_0_40px_rgba(229,193,133,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-champagne-400/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                <span className="relative z-10 text-sm tracking-[0.3em] font-sans font-bold text-champagne-400 flex items-center gap-3">
                  I'M READY <span className="text-xl group-hover:scale-125 transition-transform duration-300">✨</span>
                </span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight-950 p-6"
            >
              {/* Starry background */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-midnight-950/50 to-midnight-950" />
              
              {/* Confetti particles */}
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={`confetti-${i}`}
                  initial={{ 
                    y: "-10vh", 
                    x: `${Math.random() * 100}vw`,
                    rotate: 0,
                    opacity: 1 
                  }}
                  animate={{ 
                    y: "110vh", 
                    x: `${Math.random() * 100}vw`,
                    rotate: 360,
                    opacity: [1, 1, 0] 
                  }}
                  transition={{ 
                    duration: Math.random() * 3 + 4, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: Math.random() * 2
                  }}
                  className={`absolute w-3 h-3 rounded-sm ${['bg-champagne-400', 'bg-rose-400', 'bg-ivory-100'][Math.floor(Math.random() * 3)]}`}
                />
              ))}

              <div className="relative z-10 text-center max-w-2xl bg-midnight-900/80 p-12 rounded-2xl border border-champagne-400/20 backdrop-blur-xl shadow-[0_0_100px_rgba(229,193,133,0.15)]">
                <motion.h2 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 15, delay: 0.5 }}
                  className="text-5xl md:text-7xl font-handwriting text-champagne-400 mb-8 capitalize"
                >
                  A special gift for you...
                </motion.h2>
                
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="text-ivory-100 font-sans text-xl md:text-3xl leading-relaxed font-light"
                >
                  {surprise.unlockedContent}
                </motion.p>
                
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3 }}
                  onClick={() => setRevealed(false)}
                  className="mt-12 px-8 py-3 text-sm text-champagne-400/50 hover:text-champagne-400 tracking-widest uppercase font-sans border-b border-champagne-400/0 hover:border-champagne-400/50 transition-all"
                >
                  Close Surprise
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
