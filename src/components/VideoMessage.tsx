"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { birthdayConfig } from "@/config/birthdayConfig";

export function VideoMessage() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative w-full py-32 bg-midnight-950 flex flex-col items-center justify-center overflow-hidden" id="video">
      <div className="relative z-10 w-full max-w-5xl px-6 text-center flex flex-col items-center">
        
        <h2 className="text-4xl md:text-5xl font-serif text-ivory-100 tracking-wide mb-4">
          {birthdayConfig.VIDEO_MESSAGE.title}
        </h2>
        <p className="text-ivory-100/60 font-sans text-lg mb-16 italic">
          {birthdayConfig.VIDEO_MESSAGE.subtitle}
        </p>

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(229,193,133,0.15)] border border-champagne-400/20 bg-black">
          {!isPlaying ? (
            <div className="absolute inset-0 flex items-center justify-center bg-midnight-900/50 backdrop-blur-sm">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPlaying(true)}
                className="w-20 h-20 bg-champagne-400 rounded-full flex items-center justify-center pl-2 text-midnight-950 shadow-glow-gold transition-all"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.button>
            </div>
          ) : (
            <iframe
              src={`${birthdayConfig.VIDEO_MESSAGE.videoUrl}?autoplay=1`}
              title="Special Message"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          )}
        </div>
      </div>
    </section>
  );
}
