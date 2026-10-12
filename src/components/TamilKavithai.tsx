"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { getKolkataDateInfo, getDailyGreetingForDate, getTamilKavithaiForDate } from "@/lib/dailyLoveUtils";
import { birthdayConfig } from "@/config/birthdayConfig";

interface TamilKavithaiProps {
  overrideDateKey?: string;
}

// Delicate Rose Flourish
function RoseFlourish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`w-8 h-8 text-pink-300/40 ${className}`} fill="currentColor">
      <path d="M50 20 C40 10 20 25 35 45 C15 50 20 75 40 70 C45 85 65 85 70 70 C85 75 90 50 70 45 C85 25 65 10 50 20 Z" opacity="0.3" />
      <path d="M50 30 C45 25 35 32 42 42 C30 45 32 60 45 58 C48 68 62 68 65 58 C75 60 78 45 65 42 C72 32 62 25 50 30 Z" opacity="0.6" />
      <circle cx="50" cy="45" r="6" opacity="0.9" />
    </svg>
  );
}

export function TamilKavithai({ overrideDateKey }: TamilKavithaiProps) {
  const kolkataInfo = getKolkataDateInfo();
  const activeDateKey = overrideDateKey || kolkataInfo.dateKey;
  const greeting = getDailyGreetingForDate(activeDateKey);
  const kavithai = getTamilKavithaiForDate(activeDateKey);

  return (
    <section className="relative w-full py-24 md:py-32 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden" id="daily-love">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-violet-600/10 via-transparent to-transparent opacity-60 pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl space-y-12">
        {/* Section Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-violet-950/60 border border-violet-400/30 text-violet-300 text-xs font-sans uppercase tracking-[0.3em]">
            <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-pulse" />
            <span>Daily Love &amp; Kavithaigal</span>
            <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-pulse" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-100 to-violet-300">
            A Love That Words Cannot Hold
          </h2>
        </div>

        {/* 1. Daily Message Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative rounded-3xl p-6 sm:p-8 md:p-10 bg-gradient-to-b from-violet-950/70 via-purple-950/50 to-violet-950/70 border border-violet-400/25 shadow-[0_0_40px_rgba(139,92,246,0.18)] backdrop-blur-xl text-center"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-pink-300 text-sm">✨</span>
            <h3 className="text-base sm:text-lg md:text-xl font-serif text-violet-200 font-normal">
              Today&apos;s Little Message for You, {birthdayConfig.HER_NAME} 💜
            </h3>
            <span className="text-pink-300 text-sm">✨</span>
          </div>

          <div className="mb-4">
            <span className="inline-block px-3.5 py-1 text-[11px] font-sans uppercase tracking-[0.2em] rounded-full bg-violet-900/40 text-violet-300/90 border border-violet-400/20">
              {greeting.displayDate} — {greeting.dayTitle}
            </span>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl font-serif text-ivory-100/95 leading-relaxed tracking-wide italic max-w-2xl mx-auto">
            &ldquo;{greeting.message}&rdquo;
          </p>
        </motion.div>

        {/* 2. Tamil Kavithai Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative rounded-3xl p-6 sm:p-10 md:p-14 bg-gradient-to-b from-[#251347]/80 via-[#1d0e3b]/85 to-[#14082c]/85 border border-purple-300/30 shadow-[0_0_50px_rgba(192,132,252,0.22)] backdrop-blur-2xl text-center overflow-hidden"
        >
          {/* Corner Rose Flourishes */}
          <div className="absolute top-4 left-4">
            <RoseFlourish className="rotate-[-15deg]" />
          </div>
          <div className="absolute top-4 right-4">
            <RoseFlourish className="scale-x-[-1] rotate-[15deg]" />
          </div>

          {/* Glowing Heart Icon */}
          <div className="flex justify-center mb-5">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-500/40 rounded-full blur-xl animate-pulse" />
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-purple-800 to-pink-600/80 border border-pink-300/40 flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white fill-white animate-pulse" />
              </div>
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-100 to-rose-200 mb-6 font-normal tracking-wide">
            {kavithai.sectionHeading}
          </h3>

          <div className="mb-6">
            <span className="inline-block px-3 py-0.5 text-xs font-sans rounded-full bg-purple-900/40 text-purple-200/80 border border-purple-400/20">
              {kavithai.displayDate} • {kavithai.sentiment}
            </span>
          </div>

          <div className="font-tamil text-lg sm:text-xl md:text-2xl text-purple-100 font-medium leading-[2.2] md:leading-[2.4] tracking-wide space-y-2 mb-8 max-w-2xl mx-auto drop-shadow-sm">
            {kavithai.lines.map((line, idx) => (
              <p key={idx} className="transition-all hover:text-white">
                {line}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
