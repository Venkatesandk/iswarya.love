"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Calendar, Lock, Music } from "lucide-react";
import {
  getKolkataDateInfo,
  getDailyGreetingForDate,
  getTamilKavithaiForDate,
  getTimeRemaining,
  TimeRemaining,
} from "@/lib/dailyLoveUtils";
import { birthdayConfig } from "@/config/birthdayConfig";

interface LockedCountdownScreenProps {
  onUnlock: () => void;
  overrideDateKey?: string;
  onOverrideChange?: (dateKey: string | undefined) => void;
}

export function LockedCountdownScreen({
  onUnlock,
  overrideDateKey,
}: LockedCountdownScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [nowMs, setNowMs] = useState<number>(Date.now());
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    totalMs: 0,
    days: 1,
    hours: 13,
    minutes: 37,
    seconds: 0,
    isUnlocked: false,
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  // Audio state for mild love BGMs (Continuous Playlist)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack =
    birthdayConfig.BGM_PLAYLIST[currentTrackIndex] ||
    birthdayConfig.BGM_PLAYLIST[0];

  const playNextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % birthdayConfig.BGM_PLAYLIST.length;
    setCurrentTrackIndex(nextIdx);
    if (audioRef.current) {
      audioRef.current.src = birthdayConfig.BGM_PLAYLIST[nextIdx].url;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.4;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  // Autoplay Minnale Movie Mild BGM automatically when the site opens
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4;

    const playAudio = () => {
      const promise = audio.play();
      if (promise !== undefined) {
        promise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    };

    playAudio();

    const handleFirstInteraction = () => {
      if (audio.paused) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction, { passive: true });
    window.addEventListener("touchstart", handleFirstInteraction, { passive: true });
    window.addEventListener("pointerdown", handleFirstInteraction, { passive: true });
    window.addEventListener("scroll", handleFirstInteraction, { passive: true });
    window.addEventListener("keydown", handleFirstInteraction, { passive: true });

    return () => {
      removeListeners();
    };
  }, []);

  useEffect(() => {
    setMounted(true);
    const initial = getTimeRemaining(Date.now());
    setTimeLeft(initial);

    const timer = setInterval(() => {
      const current = Date.now();
      setNowMs(current);
      const remaining = getTimeRemaining(current);
      setTimeLeft(remaining);

      if (remaining.isUnlocked) {
        onUnlock();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [onUnlock]);

  const actualKolkataInfo = getKolkataDateInfo(nowMs);
  const activeDateKey = overrideDateKey || actualKolkataInfo.dateKey;
  const shouldShowKavithai = overrideDateKey
    ? activeDateKey >= "2026-10-13"
    : actualKolkataInfo.shouldShowKavithai;

  const dailyGreeting = getDailyGreetingForDate(activeDateKey);
  const dailyKavithai = getTamilKavithaiForDate(activeDateKey);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === "9613" || inputPassword === birthdayConfig.ADMIN_PIN) {
      setShowPasswordModal(false);
      onUnlock();
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#12071f] text-ivory-100 flex flex-col justify-between overflow-x-hidden selection:bg-pink-500/30">
      {/* 1. Real Cinematic High-Res Artwork Background (Matching Reference Image) */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/locked_bg.jpg')" }}
      />

      {/* Atmospheric Vignette & Soft Gradient Overlay for Optimal Readability */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/60 via-[#180a2b]/65 to-black/85 pointer-events-none" />

      {/* Subtle Floating Ambient Hearts */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "105vh", opacity: 0 }}
            animate={{
              y: "-5vh",
              opacity: [0, 0.45, 0.45, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0],
            }}
            transition={{
              duration: 9 + (i % 5) * 2,
              delay: (i * 1.5) % 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              left: `${(i * 8.5 + 4) % 94}%`,
            }}
          >
            <Heart className="w-4 h-4 text-pink-300/40 fill-pink-300/20 filter drop-shadow-[0_0_8px_rgba(244,114,182,0.4)]" />
          </motion.div>
        ))}
      </div>

      {/* Background audio element - Continuous Romantic Love BGM Playlist */}
      <audio
        ref={audioRef}
        src={currentTrack.url}
        preload="auto"
        autoPlay
        onEnded={playNextTrack}
      />

      {/* 2. Top Header Bar: 💖 For AmuLuu | Minnale BGM | A Little Surprise 🤍 */}
      <header className="relative z-20 w-full max-w-2xl mx-auto flex items-center justify-between px-6 pt-5 pb-2">
        {/* Left: 💖 For AmuLuu */}
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="w-5 h-5 text-pink-400 fill-pink-400 filter drop-shadow-[0_0_10px_rgba(244,114,182,0.9)]" />
          </motion.div>
          <span className="font-serif text-lg sm:text-xl text-white font-medium tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            For {birthdayConfig.HER_NAME}
          </span>
        </div>

        {/* Right: Music pill + A Little Surprise */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <button
            onClick={toggleAudio}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-md transition-all ${
              isPlaying
                ? "bg-pink-500/20 text-pink-200 border-pink-400/50 shadow-[0_0_12px_rgba(236,72,153,0.35)] ring-1 ring-pink-400/30"
                : "bg-white/10 text-pink-200/70 border-white/10 hover:bg-white/15"
            }`}
            title={isPlaying ? "Pause Love BGM" : "Play Love BGM"}
          >
            <Music className={`w-3.5 h-3.5 ${isPlaying ? "animate-spin text-pink-300" : "text-pink-300/70"}`} />
            <span className="text-[11px] font-semibold max-w-[110px] truncate">{isPlaying ? currentTrack.title : "Play BGM 🎵"}</span>
          </button>

          {/* Discreet prompt for password 9613 */}
          <button
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center gap-1 text-xs sm:text-sm text-pink-100/90 hover:text-white font-serif tracking-wider transition-all drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group"
            title="A Little Surprise"
          >
            <span>A Little Surprise</span>
            <Heart className="w-4 h-4 text-pink-200 fill-transparent group-hover:fill-pink-200 transition-colors" />
          </button>
        </div>
      </header>

      {/* 3. Password Modal (Accepts 9613) */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowPasswordModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm p-7 rounded-3xl bg-gradient-to-b from-[#2a1047] to-[#16062a] border border-pink-400/40 text-center shadow-[0_0_50px_rgba(236,72,153,0.35)]"
            >
              <div className="w-12 h-12 rounded-full bg-pink-500/20 border border-pink-400/40 flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                <Lock className="w-5 h-5 text-pink-300" />
              </div>
              <h3 className="text-xl font-serif text-white mb-1">Enter Password</h3>
              <p className="text-xs text-pink-200/70 mb-5">
                Unlock the universe with your secret password
              </p>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <input
                  type="password"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full py-3 px-4 text-center tracking-widest text-lg rounded-xl bg-purple-950/70 border border-pink-400/40 text-white placeholder-pink-300/40 focus:outline-none focus:border-pink-300 shadow-inner"
                  autoFocus
                />
                {passwordError && (
                  <p className="text-xs text-rose-400 font-sans">
                    Incorrect Password. Try again.
                  </p>
                )}
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-sans text-pink-200/80 bg-purple-900/40 hover:bg-purple-900/60 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(236,72,153,0.4)]"
                  >
                    Unlock
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Center Content (Clean, Beautiful, Perfectly Scaled for Mobile & Desktop) */}
      <main className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center text-center px-4 my-auto py-4 space-y-4 sm:space-y-5">
        {/* Glowing Title: Something Special is Waiting for You */}
        <div className="space-y-1">
          <h1
            className="font-romantic font-bold text-5xl sm:text-6xl md:text-7xl text-white leading-tight drop-shadow-[0_2px_15px_rgba(244,114,182,0.9)]"
            style={{
              textShadow: "0 0 20px rgba(236,72,153,0.9), 0 2px 4px rgba(0,0,0,0.8)",
            }}
          >
            Something Special
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display text-white font-semibold tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            is Waiting for You
          </h2>
        </div>

        {/* Small Heart Divider */}
        <div>
          <Heart className="w-4 h-4 text-pink-300 fill-pink-400 filter drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]" />
        </div>

        {/* Narrative Lines (From Reference Image) */}
        <div className="space-y-1 text-pink-100 font-sans text-xs sm:text-sm md:text-base font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          <p>A beautiful surprise is ready just for you, {birthdayConfig.HER_NAME}.</p>
          <p>It will open on the special date and time. 💜</p>
        </div>

        {/* Daily Love Greeting Card */}
        <motion.div
          key={`greeting-${activeDateKey}`}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full"
        >
          <div className="rounded-2xl p-4 sm:p-5 bg-[#250d3d]/55 border border-pink-400/30 shadow-[0_4px_25px_rgba(0,0,0,0.4)] backdrop-blur-md text-center">
            <div className="inline-flex items-center gap-1.5 mb-1 text-pink-200 font-sans text-xs sm:text-sm font-bold">
              <span>✨</span>
              <span>Today&apos;s Little Message for You, {birthdayConfig.HER_NAME} 💜</span>
              <span>✨</span>
            </div>

            <div className="mb-2">
              <span className="inline-block px-2.5 py-0.5 text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.2em] rounded-full bg-pink-950/60 text-pink-300 border border-pink-400/30">
                {dailyGreeting.displayDate} — {dailyGreeting.dayTitle}
              </span>
            </div>

            <p className="text-sm sm:text-base md:text-lg font-display italic text-white font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              &ldquo;{dailyGreeting.message}&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Tamil Kavithai Card (Shown from 13 October, NO English meaning) */}
        {shouldShowKavithai && (
          <motion.div
            key={`kavithai-${activeDateKey}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <div className="rounded-2xl p-4 sm:p-6 bg-[#250d3d]/65 border border-purple-300/35 shadow-[0_4px_25px_rgba(0,0,0,0.4)] backdrop-blur-md text-center">
              <div className="flex justify-center mb-2">
                <Heart className="w-5 h-5 text-pink-400 fill-pink-400 animate-pulse" />
              </div>

              <h3 className="text-lg sm:text-xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-100 to-rose-200 mb-2 font-normal">
                {dailyKavithai.sectionHeading}
              </h3>

              <div className="mb-3">
                <span className="inline-block px-2.5 py-0.5 text-[10px] font-sans rounded-full bg-purple-900/50 text-purple-200/90 border border-purple-400/20">
                  {dailyKavithai.displayDate} • {dailyKavithai.sentiment}
                </span>
              </div>

              <div className="font-tamil text-sm sm:text-base md:text-lg text-purple-100 font-medium leading-[2.1] space-y-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                {dailyKavithai.lines.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Translucent Glass Countdown Card (Exact Styling from Reference Image) */}
        <div className="w-full">
          <div className="rounded-3xl p-5 sm:p-6 bg-gradient-to-b from-[#2e104f]/45 via-[#1e0836]/50 to-[#120424]/60 border border-purple-300/35 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            {/* Header: 📅 Unlocks on 14 October 2026, 00:00 IST */}
            <div className="flex items-center justify-center gap-1.5 mb-4 text-pink-200 text-xs sm:text-sm font-sans tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              <Calendar className="w-3.5 h-3.5 text-pink-300" />
              <span>Unlocks on 14 October 2026, 00:00 IST</span>
            </div>

            {/* 4 Rounded Squircle Countdown Boxes */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {/* Days */}
              <div className="flex flex-col items-center justify-center py-3 px-1 rounded-2xl bg-gradient-to-b from-[#3a145e] to-[#200836] border border-purple-400/35 shadow-inner">
                <span
                  suppressHydrationWarning
                  className="text-2xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-normal drop-shadow-md"
                >
                  {mounted ? String(timeLeft.days).padStart(2, "0") : "01"}
                </span>
                <span className="text-[10px] sm:text-xs font-sans font-bold tracking-[0.15em] text-pink-200/90 mt-1 uppercase">
                  Days
                </span>
              </div>

              {/* Hours */}
              <div className="flex flex-col items-center justify-center py-3 px-1 rounded-2xl bg-gradient-to-b from-[#3a145e] to-[#200836] border border-purple-400/35 shadow-inner">
                <span
                  suppressHydrationWarning
                  className="text-2xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-normal drop-shadow-md"
                >
                  {mounted ? String(timeLeft.hours).padStart(2, "0") : "13"}
                </span>
                <span className="text-[10px] sm:text-xs font-sans font-bold tracking-[0.15em] text-pink-200/90 mt-1 uppercase">
                  Hours
                </span>
              </div>

              {/* Minutes */}
              <div className="flex flex-col items-center justify-center py-3 px-1 rounded-2xl bg-gradient-to-b from-[#3a145e] to-[#200836] border border-purple-400/35 shadow-inner">
                <span
                  suppressHydrationWarning
                  className="text-2xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-normal drop-shadow-md"
                >
                  {mounted ? String(timeLeft.minutes).padStart(2, "0") : "37"}
                </span>
                <span className="text-[10px] sm:text-xs font-sans font-bold tracking-[0.15em] text-pink-200/90 mt-1 uppercase">
                  Minutes
                </span>
              </div>

              {/* Seconds */}
              <div className="flex flex-col items-center justify-center py-3 px-1 rounded-2xl bg-gradient-to-b from-[#3a145e] to-[#200836] border border-purple-400/35 shadow-inner">
                <span
                  suppressHydrationWarning
                  className="text-2xl sm:text-4xl md:text-5xl font-sans font-bold text-white tracking-normal drop-shadow-md"
                >
                  {mounted ? String(timeLeft.seconds).padStart(2, "0") : "00"}
                </span>
                <span className="text-[10px] sm:text-xs font-sans font-bold tracking-[0.15em] text-pink-200/90 mt-1 uppercase">
                  Seconds
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Small Heart Divider */}
        <div>
          <Heart className="w-3.5 h-3.5 text-pink-300 fill-pink-400/80" />
        </div>

        {/* Romantic Secret Note (From Reference Image) */}
        <div className="space-y-0.5 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <p className="text-xs sm:text-sm font-sans font-medium text-pink-100 flex items-center justify-center gap-1.5">
            <span>Until then, keep this a secret</span>
            <span>😊</span>
          </p>
          <p className="text-[11px] sm:text-xs font-sans text-purple-200/90">
            Because you deserve something truly special...
          </p>
        </div>
      </main>

      {/* 5. Bottom Foreground: Elegant Romantic Keepsake & Footer */}
      <footer className="relative z-20 w-full max-w-lg mx-auto px-4 pb-6 pt-2 text-center flex flex-col items-center space-y-3">
        {/* Luxury Romantic Keepsake Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative px-8 py-3.5 rounded-2xl bg-gradient-to-b from-[#2e104f]/70 via-[#1d0836]/80 to-[#120424]/90 border border-pink-300/40 shadow-[0_8px_32px_rgba(0,0,0,0.7),0_0_25px_rgba(244,114,182,0.3)] backdrop-blur-xl group hover:border-pink-300/60 transition-all duration-300"
        >
          {/* Subtle top shimmer accent */}
          <div className="flex items-center justify-center gap-2 mb-0.5">
            <span className="w-5 h-[1px] bg-gradient-to-r from-transparent to-pink-300/60" />
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-pink-300">
              For My
            </span>
            <span className="w-5 h-[1px] bg-gradient-to-l from-transparent to-pink-300/60" />
          </div>

          <p
            className="font-romantic font-bold text-3xl sm:text-4xl text-white leading-tight drop-shadow-[0_2px_15px_rgba(244,114,182,0.9)] filter"
            style={{
              textShadow: "0 0 15px rgba(236,72,153,0.8), 0 2px 4px rgba(0,0,0,0.8)",
            }}
          >
            Dearest AmuLuu ♡
          </p>
        </motion.div>

        {/* Romantic Footer Text */}
        <p className="text-xs font-sans italic text-pink-200/90 tracking-wider drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          Made with all my love for you, {birthdayConfig.HER_NAME}. 💜
        </p>
      </footer>
    </div>
  );
}
