"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Music, Volume2, VolumeX } from "lucide-react";
import { birthdayConfig } from "@/config/birthdayConfig";

export function OurSongPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const song = birthdayConfig.OUR_SONG;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Attempt autoplay
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Auto-play was prevented by browser, wait for user interaction
          setIsPlaying(false);
          
          // Add a one-time global click listener to start audio
          const startAudioOnFirstClick = () => {
            audio.play();
            setIsPlaying(true);
            document.removeEventListener('click', startAudioOnFirstClick);
          };
          document.addEventListener('click', startAudioOnFirstClick);
        });
    }

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

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className="fixed top-6 right-6 md:top-8 md:right-[250px] z-[60] flex items-center gap-4 scale-75 md:scale-100 origin-top-right"
    >
      <audio 
        ref={audioRef} 
        src={birthdayConfig.BACKGROUND_MUSIC_URL} 
        preload="metadata"
        loop
      />

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, width: 0, x: -20 }}
            animate={{ opacity: 1, width: "auto", x: 0 }}
            exit={{ opacity: 0, width: 0, x: -20 }}
            className="overflow-hidden"
          >
            <div className="glass-card bg-midnight-950/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4 shadow-2xl min-w-[280px]">
              
              {/* Vinyl Animation */}
              <div className="relative w-12 h-12 rounded-full border border-white/10 shadow-glow-rose overflow-hidden shrink-0 flex items-center justify-center bg-black">
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={song.coverUrl}
                    alt={song.title}
                    fill
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 border-[4px] border-black rounded-full" />
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-midnight-950 rounded-full transform -translate-x-1/2 -translate-y-1/2 border border-white/20" />
                </motion.div>
              </div>

              {/* Track Info */}
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-ivory-100 font-sans text-sm font-medium truncate">
                  {song.title}
                </span>
                <span className="text-ivory-100/50 font-sans text-xs truncate">
                  {song.artist}
                </span>
                
                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-champagne-400 rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleMute}
                  className="p-2 text-ivory-100/50 hover:text-ivory-100 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={togglePlay}
                  className="w-8 h-8 rounded-full bg-champagne-400 text-midnight-950 flex items-center justify-center hover:scale-105 transition-transform"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full flex flex-col items-center justify-center gap-1 shadow-2xl backdrop-blur-xl border transition-colors ${
          isExpanded 
            ? 'bg-rose-900/50 border-rose-400/50' 
            : 'bg-midnight-950/80 border-white/10 hover:border-white/30'
        }`}
      >
        <Music className={`w-5 h-5 ${isExpanded ? 'text-rose-400' : 'text-ivory-100/70'}`} />
        
        {/* Soft Equalizer / Playing Indicator */}
        {isPlaying && !isExpanded && (
          <div className="flex items-end gap-0.5 h-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: ["4px", "8px", "4px"] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                className="w-1 bg-champagne-400 rounded-t-sm"
              />
            ))}
          </div>
        )}
        {!isPlaying && !isExpanded && (
          <span className="text-[0.5rem] uppercase tracking-widest text-ivory-100/50 font-sans">
            Play
          </span>
        )}
      </motion.button>
    </motion.div>
  );
}
