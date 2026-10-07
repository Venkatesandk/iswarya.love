"use client";
import { useEffect, useRef } from "react";
import { Music, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  src: string;
}

export function AudioPlayer({ isPlaying, setIsPlaying, src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Autoplay was prevented by browser, handle gracefully
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, setIsPlaying]);

  return (
    <>
      <audio ref={audioRef} src={src} loop />
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed top-6 right-6 z-50 p-3 glass-card rounded-full hover:bg-white/10 transition-colors duration-300 group"
        aria-label={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? (
          <Music className="w-5 h-5 text-rose-sparkle animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5 text-white/50 group-hover:text-white" />
        )}
      </button>
    </>
  );
}
