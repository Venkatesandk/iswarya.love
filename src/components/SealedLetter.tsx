"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "@/config/birthdayConfig";

export function SealedLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative w-full py-32 bg-midnight-950 flex flex-col items-center justify-center min-h-screen overflow-hidden" id="letter">
      {/* Background ambient light */}
      <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center">
        <div className="w-[50vw] h-[50vw] bg-burgundy-900/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-3xl px-6 text-center flex flex-col items-center">
        
        <span className="text-rose-400 tracking-[0.3em] text-xs uppercase mb-4 font-sans block">
          Chapter 05
        </span>

        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed-envelope"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <h2 className="text-4xl md:text-5xl font-serif text-ivory-100 tracking-wide mb-16">
                {birthdayConfig.LOVE_LETTER.title}
              </h2>
              
              {/* Elegant Envelope Graphic */}
              <div className="relative w-64 h-40 md:w-80 md:h-48 bg-gradient-to-br from-ivory-100 to-ivory-200 shadow-2xl rounded-sm mb-12 flex items-center justify-center border border-white/20">
                {/* Envelope Flap lines */}
                <div className="absolute inset-0 overflow-hidden rounded-sm">
                  <div className="absolute top-0 left-0 w-full h-full border-t-[80px] border-l-[160px] md:border-t-[96px] md:border-l-[160px] border-t-ivory-200 border-l-transparent" />
                  <div className="absolute top-0 right-0 w-full h-full border-t-[80px] border-r-[160px] md:border-t-[96px] md:border-r-[160px] border-t-ivory-200 border-r-transparent" />
                </div>
                {/* Wax Seal */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-burgundy-800 rounded-full shadow-lg flex items-center justify-center border-2 border-burgundy-900">
                  <span className="text-champagne-400 font-handwriting text-xl">I</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="px-8 py-4 bg-champagne-400 text-midnight-950 rounded-full font-sans tracking-[0.2em] text-xs font-bold shadow-[0_0_20px_rgba(229,193,133,0.3)] hover:shadow-[0_0_30px_rgba(229,193,133,0.5)] transition-shadow"
              >
                OPEN WHEN YOU'RE READY
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="opened-letter"
              initial={{ opacity: 0, y: 100, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative w-full max-w-2xl bg-ivory-100 shadow-[0_0_50px_rgba(255,255,240,0.1)] rounded-sm p-8 md:p-16 text-left transform perspective-1000"
              style={{
                backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')"
              }}
            >
              {/* Decorative pin */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/50 rounded-full blur-sm" />
              
              <h3 className="text-3xl md:text-5xl font-handwriting text-burgundy-900 mb-8">
                {birthdayConfig.LOVE_LETTER.greeting}
              </h3>
              
              <div className="space-y-6 text-midnight-950/80 font-serif text-lg md:text-xl leading-relaxed">
                {birthdayConfig.LOVE_LETTER.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-16 text-right">
                <p className="text-midnight-950/60 font-serif italic mb-2">
                  {birthdayConfig.LOVE_LETTER.closing}
                </p>
                <p className="text-4xl md:text-5xl font-handwriting text-burgundy-900">
                  {birthdayConfig.LOVE_LETTER.sender}
                </p>
                <p className="text-xs font-sans tracking-widest text-midnight-950/40 mt-4 uppercase">
                  {birthdayConfig.LOVE_LETTER.date}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
