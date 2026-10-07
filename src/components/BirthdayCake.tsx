"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function BirthdayCake() {
  const [wished, setWished] = useState(false);

  const handleMakeWish = () => {
    setWished(true);
  };

  return (
    <section className="relative w-full py-40 bg-midnight-950 flex flex-col items-center justify-center min-h-screen overflow-hidden" id="cake">
      {/* Soft spotlight from above */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-gradient-to-b from-champagne-400/5 to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl px-6 text-center flex flex-col items-center">
        
        <span className="text-rose-400 tracking-[0.3em] text-xs uppercase mb-4 font-sans block">
          Chapter 08
        </span>

        <AnimatePresence mode="wait">
          {!wished ? (
            <motion.div
              key="pre-wish"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center"
            >
              <h2 className="text-4xl md:text-6xl font-serif text-ivory-100 tracking-wide mb-2">
                Close your eyes.
              </h2>
              <p className="text-2xl md:text-4xl font-serif text-champagne-400 italic mb-16">
                Make a wish.
              </p>

              {/* Elegant Minimalist Cake Graphic */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 mb-16">
                {/* Cake Base */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-24 bg-ivory-200 rounded-lg shadow-2xl border border-white/20">
                  <div className="absolute top-0 w-full h-3 bg-rose-100/50 rounded-t-lg" />
                </div>
                {/* Cake Top Tier */}
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-ivory-100 rounded-lg shadow-xl border border-white/20">
                  <div className="absolute top-0 w-full h-2 bg-rose-100/50 rounded-t-lg" />
                </div>
                
                {/* Candles */}
                <div className="absolute bottom-44 left-1/2 -translate-x-1/2 flex gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="relative w-2 h-12 bg-champagne-400 rounded-t-sm shadow-inner">
                      {/* Flame */}
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [-2, 2, -2],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ 
                          duration: 0.5 + Math.random() * 0.5, 
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        className="absolute -top-6 left-1/2 -translate-x-1/2 w-3 h-6 bg-gradient-to-t from-orange-400 via-yellow-300 to-transparent rounded-full blur-[1px] shadow-[0_0_15px_#FCD34D]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMakeWish}
                className="px-10 py-4 bg-transparent border border-champagne-400 text-champagne-400 rounded-full font-sans tracking-[0.2em] text-sm font-bold shadow-[0_0_20px_rgba(229,193,133,0.1)] hover:bg-champagne-400/10 hover:shadow-[0_0_30px_rgba(229,193,133,0.3)] transition-all flex items-center gap-2"
              >
                MAKE MY WISH <span className="text-xl">✨</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="post-wish"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="flex flex-col items-center justify-center min-h-[50vh]"
            >
              {/* Particle Burst Effects */}
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={`burst-${i}`}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{ 
                    x: (Math.random() - 0.5) * window.innerWidth * 0.8,
                    y: (Math.random() - 0.5) * window.innerHeight * 0.8,
                    scale: Math.random() * 2 + 0.5,
                    opacity: 0
                  }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="absolute w-2 h-2 bg-champagne-400 rounded-full shadow-glow-gold"
                />
              ))}

              <motion.div
                initial={{ scale: 0.8, filter: "blur(20px)", opacity: 0 }}
                animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              >
                <h2 className="text-4xl md:text-6xl font-handwriting text-champagne-400 mb-8 leading-tight">
                  I hope every beautiful thing you wish for finds you.
                </h2>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
