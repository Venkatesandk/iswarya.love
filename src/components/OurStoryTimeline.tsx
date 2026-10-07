"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { birthdayConfig } from "@/config/birthdayConfig";

export function OurStoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-midnight-950 overflow-hidden" id="our-story">
      {/* Ambient background glow */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-burgundy-900/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-rose-900/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Chapter Header */}
        <motion.div 
          style={{ opacity }}
          className="text-center mb-24 flex flex-col items-center"
        >
          <span className="text-champagne-400 tracking-[0.3em] text-xs uppercase mb-4 font-sans block">
            Chapter 02
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-ivory-100 tracking-wide mb-6">
            And then our paths crossed.
          </h2>
          <div className="w-px h-16 bg-gradient-to-b from-champagne-400 to-transparent" />
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Central Animated Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/5 transform md:-translate-x-1/2" />
          <motion.div 
            style={{ scaleY: pathLength, transformOrigin: "top" }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-champagne-400 via-rose-400 to-transparent transform md:-translate-x-1/2 shadow-[0_0_15px_#E5C185]"
          />

          <div className="space-y-32">
            {birthdayConfig.TIMELINE.map((item, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className="relative flex items-center justify-between md:justify-normal w-full group">
                  
                  {/* Glowing Node */}
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-midnight-950 border-2 border-champagne-400 transform -translate-x-1/2 z-20 group-hover:bg-champagne-400 group-hover:scale-150 transition-all duration-500 shadow-[0_0_20px_rgba(229,193,133,0.5)]">
                    <div className="absolute inset-0 rounded-full bg-champagne-400 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Content Container */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`w-full md:w-5/12 pl-16 md:pl-0 ${
                      isEven ? "md:pr-16 md:text-right" : "md:ml-auto md:pl-16 md:text-left"
                    }`}
                  >
                    <div className="flex flex-col gap-4">
                      
                      {/* Date & Icon */}
                      <div className={`flex items-center gap-4 ${isEven ? "md:justify-end" : "justify-start"}`}>
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-champagne-400 font-sans tracking-[0.2em] text-xs uppercase">
                          {item.date}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-3xl md:text-4xl font-serif text-ivory-100 leading-tight">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-ivory-100/60 font-sans font-light leading-relaxed">
                        {item.description}
                      </p>

                      {/* Image - Glassmorphic Polaroid Style */}
                      <div className={`relative mt-6 p-2 glass-card rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transform transition-all duration-700 group-hover:-translate-y-2 group-hover:shadow-glow-rose ${isEven ? "md:ml-auto" : ""}`}>
                        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                          <Image
                            src={item.photoUrl}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale-[20%] group-hover:grayscale-0"
                          />
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </section>
  );
}
