"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { birthdayConfig } from "@/config/birthdayConfig";

export function InteractiveStarMap() {
  const [isAligning, setIsAligning] = useState(false);
  const [alignment, setAlignment] = useState(0); // 0 to 100
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAligning = () => {
    setIsAligning(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setAlignment((prev) => {
        if (prev >= 100) {
          clearInterval(intervalRef.current!);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
  };

  const stopAligning = () => {
    setIsAligning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setAlignment((prev) => {
        if (prev <= 0) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 3;
      });
    }, 30);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const isAligned = alignment === 100;

  return (
    <section className="relative w-full py-16 md:py-32 bg-midnight-950 flex flex-col items-center justify-center overflow-hidden" id="starmap">
      
      {/* Cinematic Night Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-950 via-[#030508] to-midnight-950" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-60 pointer-events-none" />
      
      {/* Dynamic Background Glow based on alignment */}
      <motion.div 
        animate={{ opacity: alignment / 100 * 0.5 }}
        className="absolute top-1/2 left-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-champagne-400 rounded-full filter blur-[100px] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" 
      />

      <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24">
        
        {/* Star Map Visual */}
        <div className="relative w-64 md:w-[400px] aspect-square group">
          {/* Glowing Rings */}
          <motion.div 
            animate={{ opacity: isAligned ? 1 : 0.3 }}
            className="absolute inset-0 rounded-full border border-champagne-400/20 shadow-[inset_0_0_100px_rgba(229,193,133,0.1)] transition-opacity duration-500" 
          />
          <div className="absolute inset-[2px] rounded-full border border-champagne-400/10" />
          <motion.div 
            animate={{ rotate: isAligning ? 360 : 0 }}
            transition={{ duration: isAligning ? 5 : 100, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[10px] rounded-full border border-dashed border-champagne-400/30" 
          />

          {/* Interactive Constellation */}
          <div className="absolute inset-[20px] rounded-full bg-black/60 backdrop-blur-md overflow-hidden flex items-center justify-center border border-white/5 shadow-2xl">
            
            <motion.svg 
              viewBox="0 0 100 100" 
              className="w-full h-full"
              animate={{ rotate: alignment / 100 * 45 }} // Rotates into place
            >
              {/* Star Connections (Lines) */}
              <motion.path 
                d="M30 40 L50 60 L70 40 L80 70 M50 60 L60 80" 
                stroke="#E5C185" 
                strokeWidth="0.5" 
                fill="none" 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: alignment / 100, 
                  opacity: (alignment / 100) * 0.8 
                }}
                transition={{ duration: 0.1 }}
              />
              
              {/* Main Stars (Nodes) */}
              {/* Start scattered, move to correct positions based on alignment */}
              <motion.circle 
                cx={30 + ((100 - alignment) * 0.2)} cy={40 - ((100 - alignment) * 0.3)} r="1.5" fill="#E5C185" 
                style={{ filter: `drop-shadow(0 0 ${alignment / 10}px #E5C185)` }} 
              />
              <motion.circle 
                cx={50 - ((100 - alignment) * 0.4)} cy={60 + ((100 - alignment) * 0.1)} r="2.5" fill="#E5C185" 
                style={{ filter: `drop-shadow(0 0 ${alignment / 5}px #E5C185)` }} 
              />
              <motion.circle 
                cx={70 + ((100 - alignment) * 0.1)} cy={40 + ((100 - alignment) * 0.4)} r="1.5" fill="#E5C185" 
                style={{ filter: `drop-shadow(0 0 ${alignment / 10}px #E5C185)` }} 
              />
              <motion.circle 
                cx={80 + ((100 - alignment) * 0.3)} cy={70 - ((100 - alignment) * 0.2)} r="1" fill="#E5C185" 
                style={{ filter: `drop-shadow(0 0 ${alignment / 10}px #E5C185)` }} 
              />
              <motion.circle 
                cx={60 - ((100 - alignment) * 0.2)} cy={80 + ((100 - alignment) * 0.3)} r="2.5" fill="#E5C185" 
                style={{ filter: `drop-shadow(0 0 ${alignment / 5}px #E5C185)` }} 
              />
            </motion.svg>
            
          </div>
        </div>

        {/* Story Content */}
        <div className="text-center md:text-left w-full max-w-sm relative z-20 flex flex-col items-center md:items-start">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-rose-400 tracking-[0.4em] text-[10px] md:text-xs uppercase block mb-4"
          >
            Written in the stars
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-serif text-ivory-100 font-light leading-tight mb-4 md:mb-8 drop-shadow-lg"
          >
            The Stars The <br className="hidden md:block" />
            <span className="italic">Night We Met</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-ivory-100/60 font-serif text-sm md:text-lg italic mb-8 md:mb-12 border-l border-champagne-400/30 pl-4 max-w-[280px] md:max-w-none"
          >
            "Because the universe aligned just for us."
          </motion.p>
          
          {/* Interactive Button Feature */}
          <div className="mb-8 md:mb-12 flex flex-col items-center md:items-start w-full">
            <button
              onMouseDown={startAligning}
              onMouseUp={stopAligning}
              onMouseLeave={stopAligning}
              onTouchStart={startAligning}
              onTouchEnd={stopAligning}
              className={`relative overflow-hidden px-8 py-3 rounded-full border transition-all duration-300 w-full md:w-auto ${
                isAligned 
                  ? 'border-champagne-400 bg-champagne-400/20 text-champagne-400 shadow-[0_0_30px_rgba(229,193,133,0.3)]' 
                  : 'border-white/20 bg-white/5 text-ivory-100/70 hover:border-white/40'
              }`}
            >
              {/* Progress Fill Background */}
              <div 
                className="absolute inset-0 bg-champagne-400/20 origin-left transition-transform duration-75"
                style={{ transform: `scaleX(${alignment / 100})` }}
              />
              <span className="relative z-10 font-sans text-xs tracking-widest uppercase">
                {isAligned ? 'The Stars Are Aligned ✨' : 'Hold to align the stars'}
              </span>
            </button>
          </div>

          {/* Metadata - Compact on mobile */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-3 font-sans text-[9px] md:text-xs tracking-widest text-ivory-100/40 uppercase items-center md:items-start"
          >
            <div className="flex items-center gap-4">
              <div className="w-4 md:w-8 h-px bg-champagne-400/30" />
              <span className="text-champagne-400/80">AUGUST 12, 2024</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-4 md:w-8 h-px bg-champagne-400/30" />
              <span>CHENNAI, INDIA</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-4 md:w-8 h-px bg-champagne-400/30" />
              <span>13.0827° N, 80.2707° E</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
