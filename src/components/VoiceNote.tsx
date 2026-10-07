"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Waves } from "lucide-react";
import { birthdayConfig } from "@/config/birthdayConfig";

export function VoiceNote() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative w-full py-32 bg-midnight-900 overflow-hidden" id="voicenote">
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
        
        <span className="text-rose-400 tracking-[0.3em] text-xs uppercase mb-4 font-sans block">
          A Message For You
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-ivory-100 tracking-wide mb-4">
          {birthdayConfig.VOICE_NOTE.title}
        </h2>
        <p className="text-ivory-100/60 font-sans text-lg mb-16 italic">
          "{birthdayConfig.VOICE_NOTE.subtitle}"
        </p>

        <div className="glass-card bg-midnight-950/50 backdrop-blur-xl border border-white/10 rounded-full p-4 md:p-6 flex items-center gap-6 shadow-[0_0_50px_rgba(229,193,133,0.1)] w-full max-w-xl">
          
          <button 
            onClick={togglePlay}
            className="w-14 h-14 shrink-0 rounded-full bg-champagne-400 text-midnight-950 flex items-center justify-center hover:scale-105 transition-transform shadow-glow-gold"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </button>

          <div className="flex-1 flex items-center gap-2 overflow-hidden h-10">
            {/* Audio wave visualization */}
            {[...Array(40)].map((_, i) => {
              const isActive = (i / 40) * 100 <= progress;
              return (
                <motion.div
                  key={i}
                  animate={{ 
                    height: isPlaying ? [10, Math.random() * 30 + 10, 10] : 10 
                  }}
                  transition={{ 
                    duration: 0.5, 
                    repeat: Infinity, 
                    delay: i * 0.05 
                  }}
                  className={`w-1 md:w-1.5 rounded-full transition-colors duration-300 ${
                    isActive ? 'bg-champagne-400' : 'bg-white/10'
                  }`}
                />
              );
            })}
          </div>

          <span className="text-ivory-100/60 font-sans text-sm tracking-widest shrink-0 w-12 text-right">
            {birthdayConfig.VOICE_NOTE.duration}
          </span>

          <audio 
            ref={audioRef}
            src={birthdayConfig.VOICE_NOTE.audioUrl}
            preload="metadata"
          />
        </div>

      </div>
    </section>
  );
}
