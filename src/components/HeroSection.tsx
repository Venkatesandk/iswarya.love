"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { birthdayConfig } from "@/config/birthdayConfig";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse Parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  // Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const bgColor = useTransform(scrollYProgress, [0, 1], ["#090611", "#F8F3EA"]);

  useEffect(() => {
    const targetDate = new Date(birthdayConfig.BIRTH_DATE).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        clearInterval(interval);
      } else {
        setTimeLeft({
          d: Math.floor(distance / (1000 * 60 * 60 * 24)),
          h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const name = birthdayConfig.HER_NAME.toUpperCase();

  return (
    <motion.section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      style={{ backgroundColor: bgColor }}
      className="relative min-h-[100vh] w-full overflow-hidden transition-colors duration-1000"
    >
      
      {/* 1. Cinematic Environment (Image + Lighting) */}
      <motion.div 
        style={{ opacity: opacityHero }}
        className="absolute inset-0 w-full h-full"
      >
        
        {/* STEP 1: Tiny golden point of light */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 2, 50], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#D8B982] rounded-full shadow-[0_0_50px_#D8B982] z-50 pointer-events-none"
        />

        {/* STEP 3 & 4: Full Screen Image slowly fades in and zooms */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: mousePos.x * -10,
            y: mousePos.y * -10
          }}
          transition={{ 
            duration: 4, 
            delay: 1.5, // Start fading in after the point of light
            ease: "easeOut" 
          }}
          className="absolute inset-0 w-full h-full"
        >
          <motion.div style={{ y: yImage }} className="absolute inset-0 w-full h-full">
            <Image
              src={birthdayConfig.HERO_PHOTO_URL}
              alt={birthdayConfig.HER_NAME}
              fill
              className="object-cover object-center md:object-[70%_center]"
              priority
            />
            {/* Cinematic Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-midnight-950 via-midnight-950/60 to-transparent md:w-[60%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/80 via-transparent to-midnight-950/40" />
            <div className="absolute inset-0 bg-[#D8B982]/10 mix-blend-overlay" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
          </motion.div>
        </motion.div>

        {/* STEP 2: Particles */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, x: mousePos.x * -15, y: mousePos.y * -15 }}
          transition={{ delay: 1, duration: 2 }} // Fade in particles slightly after the light
          className="absolute inset-0 z-20 pointer-events-none"
        >
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-[#D8B982] blur-[1px]"
              style={{
                width: Math.random() * 3 + 1 + "px",
                height: Math.random() * 3 + 1 + "px",
              }}
              initial={{ 
                x: `${Math.random() * 100}vw`, 
                y: `${Math.random() * 100}vh`,
                opacity: 0
              }}
              animate={{ 
                y: [null, `${Math.random() * 80}vh`],
                opacity: [0, Math.random() * 0.5 + 0.2, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          ))}
        </motion.div>

        {/* Minimal Navbar */}
        <div className="absolute top-0 w-full px-8 py-10 flex justify-between items-center z-50 mix-blend-difference font-sans tracking-[0.3em] text-xs text-[#F8F3EA] uppercase">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 2 }}>
            ELYSIA
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 2 }} className="flex items-center gap-6">
            <span className="hidden md:inline">14 • 10 • 2026</span>
          </motion.div>
        </div>

        {/* STEP 5: Typography Reveal */}
        <div className="relative z-30 w-full h-full flex flex-col justify-center px-8 md:px-24 pt-10">
          <motion.div 
            animate={{ x: mousePos.x * -3, y: mousePos.y * -3 }}
            className="flex flex-col items-start max-w-2xl"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 2 }}
              className="font-sans text-[#D8B982] tracking-[0.4em] text-xs uppercase mb-8"
            >
              14 October 2026
            </motion.span>

            <h1 className="font-serif text-[#F8F3EA] leading-[1.1] mb-6 drop-shadow-2xl">
              <motion.div 
                initial="hidden" animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 3.5 } } }}
                className="text-4xl md:text-6xl font-light italic"
              >
                {Array.from("HAPPY").map((l, i) => (
                  <motion.span key={i} variants={letterVariants} className="inline-block">{l}</motion.span>
                ))}
              </motion.div>
              <motion.div 
                initial="hidden" animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 4.0 } } }}
                className="text-4xl md:text-6xl font-light italic"
              >
                {Array.from("BIRTHDAY").map((l, i) => (
                  <motion.span key={i} variants={letterVariants} className="inline-block">{l}</motion.span>
                ))}
              </motion.div>
              <motion.div 
                initial="hidden" animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 4.8 } } }}
                className="text-7xl md:text-9xl mt-2 text-[#D8B982]"
              >
                {Array.from(name).map((l, i) => (
                  <motion.span key={i} variants={letterVariants} className="inline-block">{l}</motion.span>
                ))}
              </motion.div>
            </h1>

            {/* STEP 6: The quote fades in */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 6.5, duration: 2 }}
              className="text-[#F8F3EA]/70 font-serif text-xl md:text-2xl max-w-md italic drop-shadow-lg mb-12"
            >
              "The world became a little more beautiful the day you were born."
            </motion.p>

            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 7.5, duration: 1.5 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(216, 185, 130, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('starmap')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-4 px-8 py-4 rounded-full border border-[#D8B982]/50 bg-[#D8B982]/5 backdrop-blur-md text-[#D8B982] font-sans text-xs tracking-[0.2em] shadow-[0_0_20px_rgba(216,185,130,0.1)] hover:shadow-[0_0_30px_rgba(216,185,130,0.2)] transition-all"
            >
              ENTER YOUR STORY 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 8, duration: 2 }}
          className="absolute bottom-10 left-8 md:left-24 flex items-center gap-4 z-40"
        >
          <span className="font-sans text-[10px] tracking-[0.3em] text-[#F8F3EA]/50 uppercase transform -rotate-90 origin-left translate-y-8">
            Scroll to discover
          </span>
          <div className="w-px h-16 bg-[#F8F3EA]/20 overflow-hidden ml-4">
            <motion.div 
              animate={{ y: [-64, 64] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-full h-full bg-[#D8B982]"
            />
          </div>
        </motion.div>

        {/* STEP 7: Floating Countdown fades in softly */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 8, duration: 2 }}
          className="absolute bottom-10 right-8 md:right-24 z-40 flex flex-col items-end"
        >
          <span className="font-sans text-[10px] tracking-[0.3em] text-[#D8B982] uppercase mb-4 opacity-80">
            The Countdown
          </span>
          {timeLeft ? (
            <div className="flex gap-4 font-serif text-[#F8F3EA] text-xl md:text-2xl font-light tracking-wider">
              <div className="flex flex-col items-center">
                <span>{timeLeft.d.toString().padStart(2, '0')}</span>
                <span className="font-sans text-[8px] tracking-widest text-white/40 uppercase mt-1">Days</span>
              </div>
              <span className="text-[#D8B982]/50">:</span>
              <div className="flex flex-col items-center">
                <span>{timeLeft.h.toString().padStart(2, '0')}</span>
                <span className="font-sans text-[8px] tracking-widest text-white/40 uppercase mt-1">Hours</span>
              </div>
              <span className="text-[#D8B982]/50">:</span>
              <div className="flex flex-col items-center">
                <span>{timeLeft.m.toString().padStart(2, '0')}</span>
                <span className="font-sans text-[8px] tracking-widest text-white/40 uppercase mt-1">Mins</span>
              </div>
              <span className="text-[#D8B982]/50">:</span>
              <div className="flex flex-col items-center">
                <span>{timeLeft.s.toString().padStart(2, '0')}</span>
                <span className="font-sans text-[8px] tracking-widest text-white/40 uppercase mt-1">Secs</span>
              </div>
            </div>
          ) : (
            <div className="font-serif text-[#F8F3EA] text-2xl tracking-widest">
              TODAY
            </div>
          )}
        </motion.div>

      </motion.div>
    </motion.section>
  );
}
