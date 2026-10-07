"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { birthdayConfig } from "@/config/birthdayConfig";

export function MemoryMap() {
  const [activeLocation, setActiveLocation] = useState<number | null>(null);

  return (
    <section className="relative w-full py-32 bg-midnight-950 flex flex-col items-center justify-center overflow-hidden" id="memorymap">
      
      <div className="relative z-10 w-full max-w-6xl px-6">
        
        <div className="text-center mb-16">
          <span className="text-rose-400 tracking-[0.3em] text-xs uppercase mb-4 font-sans block">
            Our World
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-ivory-100 tracking-wide mb-4">
            {birthdayConfig.MEMORY_MAP.title}
          </h2>
          <p className="text-ivory-100/60 font-sans text-lg italic max-w-2xl mx-auto">
            "{birthdayConfig.MEMORY_MAP.subtitle}"
          </p>
        </div>

        <div className="relative w-full aspect-square md:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(229,193,133,0.05)] bg-midnight-900">
          
          {/* Abstract Map Background */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')]" />
          
          {/* Map Nodes */}
          {birthdayConfig.MEMORY_MAP.locations.map((loc) => (
            <div
              key={loc.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
              style={{ top: loc.top, left: loc.left }}
              onClick={() => setActiveLocation(activeLocation === loc.id ? null : loc.id)}
            >
              {/* Pulse effect */}
              <div className="absolute w-12 h-12 bg-champagne-400/20 rounded-full animate-ping pointer-events-none" />
              
              <div className="relative z-10 w-8 h-8 bg-midnight-950 border-2 border-champagne-400 rounded-full flex items-center justify-center shadow-glow-gold group-hover:scale-110 transition-transform">
                <MapPin className="w-4 h-4 text-champagne-400" />
              </div>

              {/* Tooltip / Info Card */}
              <AnimatePresence>
                {activeLocation === loc.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute top-12 left-1/2 -translate-x-1/2 w-48 bg-midnight-950/90 backdrop-blur-md border border-champagne-400/30 rounded-lg p-4 text-center shadow-xl z-20"
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-midnight-950 border-t border-l border-champagne-400/30 transform rotate-45" />
                    <h4 className="relative z-10 text-champagne-400 font-sans tracking-widest text-xs uppercase mb-2">
                      {loc.name}
                    </h4>
                    <p className="relative z-10 text-ivory-100/70 font-sans text-xs">
                      {loc.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
