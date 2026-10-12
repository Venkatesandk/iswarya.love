"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Heart,
  Music,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Home,
  BookOpen,
  Image as ImageIcon,
  Mail,
  Gift,
  MessageCircle,
  ListMusic,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Send,
  X,
  Instagram,
  Youtube,
  Radio,
  Clock,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { birthdayConfig } from "@/config/birthdayConfig";
import { tamilKavithaigalMap } from "@/data/tamilKavithaigal";

interface WishItem {
  id: string;
  name: string;
  message: string;
  timeAgo: string;
}

const INITIAL_WISHES: WishItem[] = [
  {
    id: "w1",
    name: "Pranav",
    message: "Happy Birthday Iswarya! Stay happy always! ♡",
    timeAgo: "2 hours ago",
  },
  {
    id: "w2",
    name: "Aarthi",
    message: "May all your dreams come true! ♡",
    timeAgo: "5 hours ago",
  },
  {
    id: "w3",
    name: "Kavya",
    message: "Stay beautiful, kind and always happy! ♡",
    timeAgo: "1 day ago",
  },
];

const MEMORY_PHOTOS = [
  {
    id: 1,
    title: "My Beautiful Iswarya ♡",
    category: "Selfies",
    url: "/hero.jpg",
  },
  {
    id: 2,
    title: "Beautiful Evenings ♡",
    category: "Special Days",
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Candid Moments ♡",
    category: "Candid",
    url: "/hero.jpg",
  },
  {
    id: 4,
    title: "Exploring Together ♡",
    category: "Travel",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    title: "Simple Joys ♡",
    category: "Special Days",
    url: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800",
  },
];

export function ApprovedUniverseView() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState("home");

  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Gallery filter
  const [galleryFilter, setGalleryFilter] = useState("All");

  // Wish submission form
  const [wishName, setWishName] = useState("");
  const [wishMessage, setWishMessage] = useState("");
  const [wishesList, setWishesList] = useState<WishItem[]>(INITIAL_WISHES);
  const [wishSentSuccess, setWishSentSuccess] = useState(false);

  // Modals state
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [letterModalOpen, setLetterModalOpen] = useState(false);
  const [kavithaiModalOpen, setKavithaiModalOpen] = useState(false);
  const [cakeModalOpen, setCakeModalOpen] = useState(false);
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const [slideshowModalOpen, setSlideshowModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);

  // Cake blown out state
  const [candlesBlown, setCandlesBlown] = useState(false);

  // Gift scratched/revealed state
  const [giftRevealed, setGiftRevealed] = useState(false);

  // Live countdown state for bottom chapters section
  const [timeState, setTimeState] = useState({
    days: "365",
    hours: "12",
    minutes: "30",
    seconds: "20",
  });

  // Confetti helper
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#a855f7", "#ec4899", "#f43f5e", "#fbbf24", "#d8b4fe"],
      });
    } catch (e) {
      // fallback
    }
  };

  // Audio play/pause toggle
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  // Live timer tick
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeState({
        days: "365",
        hours: String(23 - now.getHours()).padStart(2, "0"),
        minutes: String(59 - now.getMinutes()).padStart(2, "0"),
        seconds: String(59 - now.getSeconds()).padStart(2, "0"),
      });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Submit birthday wish
  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishMessage.trim()) return;

    const newWish: WishItem = {
      id: "w-" + Date.now(),
      name: wishName.trim() || "Someone Special",
      message: wishMessage.trim(),
      timeAgo: "Just now",
    };

    setWishesList([newWish, ...wishesList]);
    setWishMessage("");
    setWishName("");
    setWishSentSuccess(true);
    triggerConfetti();

    setTimeout(() => {
      setWishSentSuccess(false);
    }, 4000);
  };

  // Filtered photos
  const filteredPhotos =
    galleryFilter === "All"
      ? MEMORY_PHOTOS
      : MEMORY_PHOTOS.filter((p) => p.category === galleryFilter);

  return (
    <div className="relative min-h-screen w-full bg-[#faf5ff] text-purple-950 font-sans selection:bg-purple-200 selection:text-purple-900 overflow-x-hidden">
      {/* Background audio element */}
      <audio
        ref={audioRef}
        src={birthdayConfig.BACKGROUND_MUSIC_URL}
        loop
        preload="auto"
      />

      {/* Subtle Floating Ambient Petals and Purple Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-200/40 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] rounded-full bg-pink-100/50 blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-fuchsia-100/40 blur-3xl" />

        {/* Ambient floating hearts */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "105vh", opacity: 0 }}
            animate={{
              y: "-5vh",
              opacity: [0, 0.4, 0.4, 0],
              x: [0, i % 2 === 0 ? 15 : -15, 0],
            }}
            transition={{
              duration: 12 + (i % 4) * 3,
              delay: (i * 2) % 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              left: `${(i * 12 + 6) % 94}%`,
            }}
          >
            <Heart className="w-3.5 h-3.5 text-purple-300/40 fill-purple-300/20" />
          </motion.div>
        ))}
      </div>

      {/* ========================================================= */}
      {/* 1. MASTER NAVBAR: ELYSIA | Pill Links | Happy Birthday Button */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-purple-100/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Left: ELYSIA Brand Logo with Lotus Icon */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-700 to-fuchsia-600 flex items-center justify-center text-white shadow-xs">
              {/* Lotus / Floral SVG Icon */}
              <svg
                className="w-4.5 h-4.5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C12 2 13.5 6.5 15.5 8C17.5 9.5 22 10 22 10C22 10 18.5 12.5 17.5 14.5C16.5 16.5 17 21 17 21C17 21 14 18.5 12 18.5C10 18.5 7 21 7 21C7 21 7.5 16.5 6.5 14.5C5.5 12.5 2 10 2 10C2 10 6.5 9.5 8.5 8C10.5 6.5 12 2 12 2Z" />
              </svg>
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.18em] text-purple-950 block leading-tight">
                ELYSIA
              </span>
              <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.22em] text-purple-600/90 block leading-none">
                For Iswarya, With Love
              </span>
            </div>
          </div>

          {/* Center: Navigation Pill Links (matching screenshot) */}
          <nav className="hidden lg:flex items-center gap-1 bg-purple-50/80 p-1 rounded-full border border-purple-100">
            <a
              href="#home"
              onClick={() => setActiveTab("home")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === "home"
                  ? "bg-purple-700 text-white shadow-xs"
                  : "text-purple-900 hover:text-purple-700"
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </a>

            <a
              href="#story"
              onClick={() => setActiveTab("story")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === "story"
                  ? "bg-purple-700 text-white shadow-xs"
                  : "text-purple-900/80 hover:text-purple-700"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Our Story</span>
            </a>

            <a
              href="#memories"
              onClick={() => setActiveTab("memories")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === "memories"
                  ? "bg-purple-700 text-white shadow-xs"
                  : "text-purple-900/80 hover:text-purple-700"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Memories</span>
            </a>

            <a
              href="#letter"
              onClick={() => setActiveTab("letters")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === "letters"
                  ? "bg-purple-700 text-white shadow-xs"
                  : "text-purple-900/80 hover:text-purple-700"
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Letters</span>
            </a>

            <a
              href="#kavithaigal"
              onClick={() => setActiveTab("kavithaigal")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === "kavithaigal"
                  ? "bg-purple-700 text-white shadow-xs"
                  : "text-purple-900/80 hover:text-purple-700"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tamil Kavithaigal</span>
            </a>

            <a
              href="#surprises"
              onClick={() => setActiveTab("surprises")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === "surprises"
                  ? "bg-purple-700 text-white shadow-xs"
                  : "text-purple-900/80 hover:text-purple-700"
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Surprises</span>
            </a>

            <a
              href="#wishes"
              onClick={() => setActiveTab("wishes")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === "wishes"
                  ? "bg-purple-700 text-white shadow-xs"
                  : "text-purple-900/80 hover:text-purple-700"
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Wishes</span>
            </a>

            <button
              onClick={toggleAudio}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-purple-900/80 hover:text-purple-700 transition-all"
              title="Toggle Music"
            >
              <ListMusic className="w-3.5 h-3.5" />
              <span>{isPlaying ? "Pause Music" : "Playlist"}</span>
            </button>
          </nav>

          {/* Right: Happy Birthday Iswarya ♡ Button */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                triggerConfetti();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-purple-700 via-fuchsia-600 to-purple-800 text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-purple-300 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Happy Birthday Iswarya ♡</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. HERO SECTION: To My Iswarya | A little universe... | Framed Photo */}
      {/* ========================================================= */}
      <section
        id="home"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Subtitle, Action Buttons, Stats */}
          <div className="lg:col-span-7 space-y-6">
            {/* Script Tag */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-caveat text-2xl sm:text-3xl text-purple-700 font-bold tracking-wide"
            >
              To My Iswarya ♡
            </motion.p>

            {/* Main Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-purple-950 leading-[1.12] tracking-tight"
            >
              A little universe,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-fuchsia-700 to-purple-900">
                made just for you.
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-purple-900/80 font-sans leading-relaxed max-w-xl"
            >
              Every moment, every smile, every little thing I adore. ♡
            </motion.p>

            {/* Action Buttons Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <a
                href="#story"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-700 via-purple-800 to-fuchsia-700 text-white text-sm font-semibold shadow-lg shadow-purple-300/50 hover:shadow-purple-400/60 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Heart className="w-4 h-4 fill-current text-pink-200" />
                <span>Enter Her Universe →</span>
              </a>

              <button
                onClick={toggleAudio}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/80 border border-purple-200 text-purple-900 text-sm font-semibold shadow-xs hover:bg-purple-50/80 hover:border-purple-300 transition-all"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 text-purple-700" />
                    <span>Pause Music</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-purple-700 text-purple-700" />
                    <span>Play Music</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Stats Row (matching screenshot) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-4 max-w-lg"
            >
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-100/60 border border-purple-200/60">
                <Calendar className="w-4 h-4 text-purple-700 shrink-0" />
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-purple-950 leading-tight">
                    365+
                  </span>
                  <span className="block text-[10px] sm:text-[11px] text-purple-800/80">
                    Beautiful Days
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-100/60 border border-purple-200/60">
                <Heart className="w-4 h-4 text-fuchsia-600 fill-fuchsia-600/30 shrink-0" />
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-purple-950 leading-tight">
                    1000+
                  </span>
                  <span className="block text-[10px] sm:text-[11px] text-purple-800/80">
                    Reasons to Love You
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-100/60 border border-purple-200/60">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <span className="block text-xs sm:text-sm font-bold text-purple-950 leading-tight">
                    ∞
                  </span>
                  <span className="block text-[10px] sm:text-[11px] text-purple-800/80">
                    And Many More to Come
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Floral Framed Photo of Iswarya with Lantern & Notes */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Script Text Above Photo */}
            <div className="absolute -top-7 left-4 sm:left-10 z-20">
              <span className="font-caveat text-xl sm:text-2xl text-purple-800 font-bold -rotate-6 block">
                You Make My World Brighter ♡
              </span>
            </div>

            {/* Hanging Card on Right */}
            <div className="absolute -right-2 sm:-right-4 top-10 z-20 bg-[#fffdfa] border border-amber-200/80 shadow-lg rounded-xl p-3 sm:p-4 rotate-3 max-w-[125px] sm:max-w-[140px] text-center">
              <p className="font-caveat text-base sm:text-lg text-purple-900 font-bold leading-tight">
                Happy Birthday
                <br />
                Iswarya
              </p>
              <Heart className="w-4 h-4 text-pink-400 fill-pink-300 mx-auto mt-1" />
            </div>

            {/* Hanging Warm Lantern */}
            <div className="absolute -right-6 sm:-right-8 top-36 z-20 flex flex-col items-center">
              <div className="w-0.5 h-6 bg-amber-800/60" />
              <div className="w-7 h-9 rounded-md bg-amber-500/20 border border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.6)] flex items-center justify-center">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-400 animate-pulse" />
              </div>
            </div>

            {/* Main Arch Frame */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative p-2.5 sm:p-3 rounded-[32px] bg-gradient-to-b from-purple-200/70 via-fuchsia-100/50 to-purple-200/70 shadow-2xl border border-white/80 max-w-sm sm:max-w-md w-full"
            >
              {/* Outer Floral Accent border */}
              <div className="relative rounded-[26px] overflow-hidden bg-purple-950 aspect-[4/5] shadow-inner">
                {/* Real Iswarya Photo */}
                <img
                  src="/hero.jpg"
                  alt="Iswarya"
                  className="w-full h-full object-cover object-center filter brightness-[1.02] contrast-[1.02] hover:scale-105 transition-transform duration-700"
                />

                {/* Soft gradient overlay for photo edge elegance */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/40 via-transparent to-purple-950/20 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. SECTION: OUR STORY (Polaroids Connected by Dotted Ribbon) */}
      {/* ========================================================= */}
      <section id="story" className="relative z-10 py-16 bg-white/60 border-y border-purple-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Story Intro */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-purple-700 fill-purple-700/20" />
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-purple-950">
                  Our Story
                </h2>
              </div>
              <p className="text-sm sm:text-base text-purple-900/80 leading-relaxed">
                From a simple conversation to a beautiful journey, every moment with you feels like a blessing. I&apos;m so grateful to have you in my life, Iswarya. ♡
              </p>
              <button
                onClick={() => setStoryModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-purple-800 hover:bg-purple-900 text-white text-xs sm:text-sm font-semibold shadow-md hover:scale-[1.02] transition-all"
              >
                <span>Read Our Story →</span>
              </button>
            </div>

            {/* Right Horizontal Polaroids Timeline */}
            <div className="lg:col-span-8 relative">
              {/* Polaroids Row */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-3.5 pt-2">
                {/* 1. First Conversation */}
                <div className="bg-white p-2.5 pb-3 rounded-xl shadow-md border border-purple-100/80 -rotate-2 hover:rotate-0 hover:scale-105 transition-all text-center">
                  <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-purple-100">
                    <img
                      src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=400"
                      alt="First Conversation"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-caveat text-sm font-bold text-purple-950 leading-tight">
                    First Conversation
                  </p>
                  <p className="text-[10px] text-purple-600 font-sans">Jan 2023</p>
                </div>

                {/* 2. Getting to Know You */}
                <div className="bg-white p-2.5 pb-3 rounded-xl shadow-md border border-purple-100/80 rotate-2 hover:rotate-0 hover:scale-105 transition-all text-center">
                  <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-purple-100">
                    <img
                      src="/hero.jpg"
                      alt="Getting to Know You"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-caveat text-sm font-bold text-purple-950 leading-tight">
                    Getting to Know You
                  </p>
                  <p className="text-[10px] text-purple-600 font-sans">Feb 2023</p>
                </div>

                {/* 3. Special Moments */}
                <div className="bg-white p-2.5 pb-3 rounded-xl shadow-md border border-purple-100/80 -rotate-1 hover:rotate-0 hover:scale-105 transition-all text-center">
                  <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-purple-100">
                    <img
                      src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=400"
                      alt="Special Moments"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-caveat text-sm font-bold text-purple-950 leading-tight">
                    Special Moments
                  </p>
                  <p className="text-[10px] text-purple-600 font-sans">Apr 2023</p>
                </div>

                {/* 4. Travel Adventures */}
                <div className="bg-white p-2.5 pb-3 rounded-xl shadow-md border border-purple-100/80 rotate-1 hover:rotate-0 hover:scale-105 transition-all text-center">
                  <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-purple-100">
                    <img
                      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=400"
                      alt="Travel Adventures"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-caveat text-sm font-bold text-purple-950 leading-tight">
                    Travel Adventures
                  </p>
                  <p className="text-[10px] text-purple-600 font-sans">Aug 2023</p>
                </div>

                {/* 5. Today & Always */}
                <div className="col-span-2 sm:col-span-1 bg-white p-2.5 pb-3 rounded-xl shadow-md border border-purple-100/80 -rotate-2 hover:rotate-0 hover:scale-105 transition-all text-center">
                  <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-purple-100">
                    <img
                      src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=400"
                      alt="Today & Always"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-caveat text-sm font-bold text-purple-950 leading-tight">
                    Today & Always
                  </p>
                  <p className="text-[10px] text-rose-500 font-bold font-sans">Now ♡</p>
                </div>
              </div>

              {/* Side Cursive Script Accent */}
              <div className="mt-4 text-right">
                <span className="font-caveat text-base sm:text-lg text-purple-700/90 font-bold">
                  Good Times Beautiful Memories Always Us ♡
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. SECTION: OUR MEMORIES (Gallery Filters + 6 Cards) */}
      {/* ========================================================= */}
      <section id="memories" className="relative z-10 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Category Filters and View All Photos */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-purple-200/70 flex items-center justify-center text-purple-800">
              <ImageIcon className="w-4 h-4" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-purple-950">
              Our Memories
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-purple-100/50 p-1 rounded-full border border-purple-200/60">
            {["All", "Selfies", "Travel", "Food", "Special Days", "Candid"].map((cat) => (
              <button
                key={cat}
                onClick={() => setGalleryFilter(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  galleryFilter === cat
                    ? "bg-purple-800 text-white shadow-xs"
                    : "text-purple-800/80 hover:text-purple-950 hover:bg-purple-200/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View All Photos Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setGalleryModalOpen(true)}
              className="px-4 py-1.5 rounded-full border border-purple-300 text-purple-900 hover:bg-purple-100/70 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <span>View All Photos →</span>
            </button>
          </div>
        </div>

        {/* 6 Photo Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {filteredPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-purple-100/80 p-2 text-center group cursor-pointer"
              onClick={() => setGalleryModalOpen(true)}
            >
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-purple-100 mb-2">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-xs font-semibold text-purple-950 truncate px-1">
                {photo.title}
              </p>
            </motion.div>
          ))}

          {/* 6th Card: + More Photos Card */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => setGalleryModalOpen(true)}
            className="bg-gradient-to-b from-[#2e1065] to-[#1e0842] rounded-2xl overflow-hidden shadow-md border border-purple-400/40 p-4 text-center flex flex-col items-center justify-center cursor-pointer min-h-[160px] group"
          >
            <div className="w-10 h-10 rounded-full bg-purple-700/60 border border-purple-400/50 flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform">
              <span className="text-xl font-bold">+</span>
            </div>
            <p className="text-sm font-semibold text-white">More Photos</p>
            <p className="text-[10px] text-purple-200/80 mt-0.5">Click to view all</p>
          </motion.div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. SECTION: A LETTER FOR YOU & TAMIL KAVITHAIGAL */}
      {/* ========================================================= */}
      <section
        id="letter"
        className="relative z-10 py-16 bg-gradient-to-b from-purple-100/40 via-purple-50/60 to-purple-100/40 border-y border-purple-200/60"
      >
        <div id="kavithaigal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: A Letter For You */}
            <div className="lg:col-span-3 space-y-3.5 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-purple-900">
                <Mail className="w-5 h-5 text-purple-700" />
                <h3 className="font-display text-xl sm:text-2xl font-bold text-purple-950">
                  A Letter For You
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-purple-900/80 leading-relaxed">
                A little letter from my heart, for the most special person in my life, Iswarya. ♡
              </p>
              <button
                onClick={() => setLetterModalOpen(true)}
                className="px-4 py-2 rounded-full bg-purple-800 hover:bg-purple-900 text-white text-xs font-semibold shadow-md transition-all"
              >
                Read My Letter →
              </button>
            </div>

            {/* Center Column: Vintage Handwritten Parchment Letter */}
            <div className="lg:col-span-6 relative">
              <div className="relative bg-[#fcf9f2] rounded-2xl p-6 sm:p-8 shadow-xl border border-amber-200/70 -rotate-1 hover:rotate-0 transition-transform">
                {/* Paper texture lines */}
                <div className="space-y-2">
                  <p className="font-caveat text-xl sm:text-2xl text-purple-950 font-bold leading-tight">
                    My Dearest Iswarya,
                  </p>
                  <p className="font-caveat text-base sm:text-lg text-purple-900 font-medium leading-relaxed">
                    On this special day, I just want you to know how much you mean to me. You bring so much light, joy and happiness into my life. I&apos;m so lucky to have you. Happy Birthday my love. Here&apos;s to more beautiful memories together.
                  </p>
                  <p className="font-caveat text-lg sm:text-xl text-purple-950 font-bold pt-2">
                    Always and Forever,
                    <br />
                    ♡
                  </p>
                </div>

                {/* Vintage Fountain Pen Accent */}
                <div className="absolute -bottom-3 right-4 rotate-12 flex items-center">
                  <div className="w-16 h-2 bg-gradient-to-r from-amber-700 via-amber-900 to-black rounded-full shadow-md" />
                  <div className="w-3 h-1.5 bg-amber-400 rotate-45" />
                </div>
              </div>
            </div>

            {/* Right Column: Tamil Kavithaigal Card */}
            <div className="lg:col-span-3 space-y-3.5 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-purple-900">
                <BookOpen className="w-5 h-5 text-purple-700" />
                <h3 className="font-display text-xl sm:text-2xl font-bold text-purple-950">
                  Tamil Kavithaigal
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-purple-900/80 leading-relaxed font-tamil">
                Unakkaaga... En manadhin varigal... Kaadhal, Natpu, Pirandha Naal, Anaiththum unakkaaga. ♡
              </p>
              <button
                onClick={() => setKavithaiModalOpen(true)}
                className="px-4 py-2 rounded-full bg-purple-800 hover:bg-purple-900 text-white text-xs font-semibold shadow-md transition-all"
              >
                Read Tamil Kavithaigal →
              </button>

              {/* Tamil Quote Card (from reference screenshot) */}
              <div className="p-3.5 rounded-xl bg-purple-100/70 border border-purple-200/80 text-center font-tamil text-xs sm:text-sm text-purple-950 font-medium leading-relaxed shadow-xs">
                “... உன் சிரிப்பு என் உலகத்தை வெளிச்சமாக்கும், என்றென்றும் என் மனதில் நீ மட்டும்தான்... ♡”
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. SECTION: BIRTHDAY SURPRISES (4 Cards with Open ->) */}
      {/* ========================================================= */}
      <section id="surprises" className="relative z-10 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 text-purple-800 font-semibold">
            <Gift className="w-5 h-5 text-purple-700" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-purple-950">
              Birthday Surprises
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-purple-900/80">
            Here are some meaningful surprises to make your special day even more magical. ♡
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Birthday Wish (Cake) */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-purple-100 p-3 flex flex-col justify-between hover:shadow-lg transition-all group">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-purple-100 mb-3">
              <img
                src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600"
                alt="Birthday Wish Cake"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="space-y-1 mb-3">
              <h4 className="font-display text-base font-bold text-purple-950">
                Birthday Wish
              </h4>
              <p className="text-xs text-purple-800/80">
                A special wish just for you.
              </p>
            </div>
            <button
              onClick={() => setCakeModalOpen(true)}
              className="w-full py-2 rounded-xl bg-purple-800 hover:bg-purple-900 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1"
            >
              <span>Open →</span>
            </button>
          </div>

          {/* Card 2: Virtual Gift */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-purple-100 p-3 flex flex-col justify-between hover:shadow-lg transition-all group">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-purple-100 mb-3">
              <img
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600"
                alt="Virtual Gift"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="space-y-1 mb-3">
              <h4 className="font-display text-base font-bold text-purple-950">
                Virtual Gift
              </h4>
              <p className="text-xs text-purple-800/80">
                Tap to see your surprise.
              </p>
            </div>
            <button
              onClick={() => setGiftModalOpen(true)}
              className="w-full py-2 rounded-xl bg-purple-800 hover:bg-purple-900 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1"
            >
              <span>Open →</span>
            </button>
          </div>

          {/* Card 3: Memory Slideshow */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-purple-100 p-3 flex flex-col justify-between hover:shadow-lg transition-all group">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-purple-100 mb-3">
              <img
                src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=600"
                alt="Memory Slideshow"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="space-y-1 mb-3">
              <h4 className="font-display text-base font-bold text-purple-950">
                Memory Slideshow
              </h4>
              <p className="text-xs text-purple-800/80">
                A beautiful journey together.
              </p>
            </div>
            <button
              onClick={() => setSlideshowModalOpen(true)}
              className="w-full py-2 rounded-xl bg-purple-800 hover:bg-purple-900 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1"
            >
              <span>Open →</span>
            </button>
          </div>

          {/* Card 4: Special Video */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-purple-100 p-3 flex flex-col justify-between hover:shadow-lg transition-all group">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-purple-100 mb-3">
              <img
                src="https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&q=80&w=600"
                alt="Special Video"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="space-y-1 mb-3">
              <h4 className="font-display text-base font-bold text-purple-950">
                Special Video
              </h4>
              <p className="text-xs text-purple-800/80">
                A video from my heart.
              </p>
            </div>
            <button
              onClick={() => setVideoModalOpen(true)}
              className="w-full py-2 rounded-xl bg-purple-800 hover:bg-purple-900 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1"
            >
              <span>Open →</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. SECTION: SEND YOUR WISH & RECENT WISHES */}
      {/* ========================================================= */}
      <section id="wishes" className="relative z-10 py-16 bg-white/70 border-t border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Send Your Wish Form */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-purple-950">
                <MessageCircle className="w-5 h-5 text-purple-700" />
                <h3 className="font-display text-2xl font-bold">Send Your Wish</h3>
              </div>
              <p className="text-xs sm:text-sm text-purple-900/80 leading-relaxed">
                Wish Iswarya on this special day! You can leave a message, a quote, or a simple blessing. ♡
              </p>

              <form onSubmit={handleSendWish} className="space-y-3 pt-2">
                <input
                  type="text"
                  value={wishName}
                  onChange={(e) => setWishName(e.target.value)}
                  placeholder="Your Name (Optional)"
                  className="w-full py-2 px-3.5 rounded-xl border border-purple-200/80 text-xs sm:text-sm text-purple-950 placeholder-purple-400 bg-purple-50/50 focus:outline-none focus:border-purple-400"
                />

                <div className="relative">
                  <textarea
                    rows={4}
                    maxLength={300}
                    value={wishMessage}
                    onChange={(e) => setWishMessage(e.target.value)}
                    placeholder="Write your birthday wish for Iswarya..."
                    className="w-full py-2.5 px-3.5 rounded-xl border border-purple-200/80 text-xs sm:text-sm text-purple-950 placeholder-purple-400 bg-purple-50/50 focus:outline-none focus:border-purple-400 resize-none"
                  />
                  <div className="absolute right-3 bottom-2 text-[10px] text-purple-400">
                    {wishMessage.length}/300
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-purple-800 hover:bg-purple-900 text-white text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center gap-1.5"
                  >
                    <span>Send Wish →</span>
                  </button>

                  {wishSentSuccess && (
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Wish sent with love! ♡
                    </span>
                  )}
                </div>
              </form>
            </div>

            {/* Right: Recent Wishes List */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-purple-950">
                <Heart className="w-4 h-4 text-fuchsia-600 fill-fuchsia-600/30" />
                <h4 className="font-display text-xl font-bold">Recent Wishes</h4>
              </div>

              <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                {wishesList.map((wish) => (
                  <div
                    key={wish.id}
                    className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-100 flex items-start gap-3 shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-200 text-purple-800 font-bold flex items-center justify-center text-xs shrink-0">
                      {wish.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-purple-950">{wish.name}</span>
                        <span className="text-[10px] text-purple-500">{wish.timeAgo}</span>
                      </div>
                      <p className="text-xs text-purple-900/90 mt-0.5 leading-relaxed">
                        “{wish.message}”
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. SECTION: HERE'S TO MANY MORE CHAPTERS (Twilight Banner) */}
      {/* ========================================================= */}
      <section className="relative z-10 w-full bg-gradient-to-r from-[#17092c] via-[#240e42] to-[#12071f] text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-pink-300 flex items-center justify-center lg:justify-start gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-pink-300" />
              ALWAYS TOGETHER
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Here&apos;s To Many
              <br />
              More Chapters
            </h2>
            <p className="text-xs sm:text-sm text-purple-200/80 max-w-md leading-relaxed">
              No matter where life takes us, I look forward to creating many more beautiful memories with you, my Iswarya. ♡
            </p>
            <button
              onClick={triggerConfetti}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-purple-700 hover:bg-purple-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-purple-900/50 transition-all"
            >
              <span>Always Together →</span>
            </button>
          </div>

          {/* Right Live Countdown / Lifetime Counter */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-end text-center lg:text-right space-y-3">
            <span className="font-caveat text-xl sm:text-2xl text-pink-300 font-bold">
              You Make My World Brighter ♡
            </span>

            {/* 4 Counter Boxes */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-sm">
              <div className="py-2.5 px-1 rounded-xl bg-purple-950/80 border border-purple-400/30 text-center">
                <span className="block text-xl sm:text-2xl font-bold text-white font-sans">
                  {timeState.days}
                </span>
                <span className="block text-[9px] uppercase tracking-wider text-purple-300 font-semibold">
                  Days
                </span>
              </div>

              <div className="py-2.5 px-1 rounded-xl bg-purple-950/80 border border-purple-400/30 text-center">
                <span className="block text-xl sm:text-2xl font-bold text-white font-sans">
                  {timeState.hours}
                </span>
                <span className="block text-[9px] uppercase tracking-wider text-purple-300 font-semibold">
                  Hours
                </span>
              </div>

              <div className="py-2.5 px-1 rounded-xl bg-purple-950/80 border border-purple-400/30 text-center">
                <span className="block text-xl sm:text-2xl font-bold text-white font-sans">
                  {timeState.minutes}
                </span>
                <span className="block text-[9px] uppercase tracking-wider text-purple-300 font-semibold">
                  Minutes
                </span>
              </div>

              <div className="py-2.5 px-1 rounded-xl bg-purple-950/80 border border-purple-400/30 text-center">
                <span className="block text-xl sm:text-2xl font-bold text-white font-sans">
                  {timeState.seconds}
                </span>
                <span className="block text-[9px] uppercase tracking-wider text-purple-300 font-semibold">
                  Seconds
                </span>
              </div>
            </div>

            <p className="text-xs text-purple-300/80 italic font-sans">
              And a lifetime of love to go... ♡
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. MASTER FOOTER */}
      {/* ========================================================= */}
      <footer className="relative z-10 w-full bg-white border-t border-purple-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-purple-700 flex items-center justify-center text-white">
              <Heart className="w-3.5 h-3.5 fill-current" />
            </div>
            <div>
              <span className="font-serif text-base font-bold tracking-widest text-purple-950">
                ELYSIA
              </span>
              <span className="text-[9px] text-purple-600 block tracking-widest uppercase">
                For Iswarya, With Love
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-purple-800">
            <a href="#home" className="hover:text-purple-600">Home</a>
            <a href="#story" className="hover:text-purple-600">Our Story</a>
            <a href="#memories" className="hover:text-purple-600">Memories</a>
            <a href="#letter" className="hover:text-purple-600">Letters</a>
            <a href="#kavithaigal" className="hover:text-purple-600">Tamil Kavithaigal</a>
            <a href="#surprises" className="hover:text-purple-600">Surprises</a>
            <a href="#wishes" className="hover:text-purple-600">Wishes</a>
          </div>

          {/* Social / Music icon buttons */}
          <div className="flex items-center gap-2.5 text-purple-700">
            <button
              onClick={toggleAudio}
              className="w-8 h-8 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center text-purple-800 transition-colors"
              title="Music"
            >
              <Music className="w-4 h-4" />
            </button>
            <a
              href={birthdayConfig.OUR_SONG.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center text-purple-800 transition-colors"
              title="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href={birthdayConfig.OUR_SONG.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center text-purple-800 transition-colors"
              title="Spotify"
            >
              <Radio className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* MODALS SECTION */}
      {/* ========================================================= */}

      {/* 1. Cake Modal (Blow out candles!) */}
      <AnimatePresence>
        {cakeModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
            onClick={() => setCakeModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white border border-purple-200 text-center shadow-2xl relative"
            >
              <button
                onClick={() => setCakeModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-purple-100 text-purple-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-pink-100 border border-pink-200 flex items-center justify-center mx-auto mb-3">
                <Flame className={`w-8 h-8 ${candlesBlown ? "text-gray-400" : "text-amber-500 fill-amber-400 animate-bounce"}`} />
              </div>

              <h3 className="font-display text-2xl font-bold text-purple-950 mb-1">
                Make A Birthday Wish!
              </h3>
              <p className="text-xs sm:text-sm text-purple-800 mb-6">
                Close your eyes, make a wish in your heart, and blow out the candles!
              </p>

              <div className="relative py-4 my-2">
                <img
                  src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600"
                  alt="Birthday Cake"
                  className="w-44 h-44 object-cover rounded-2xl mx-auto shadow-md"
                />
              </div>

              <div className="pt-4">
                {!candlesBlown ? (
                  <button
                    onClick={() => {
                      setCandlesBlown(true);
                      triggerConfetti();
                    }}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-purple-700 to-pink-600 text-white font-bold text-sm shadow-md hover:scale-[1.02] transition-all"
                  >
                    Blow Out The Candles! 🎂✨
                  </button>
                ) : (
                  <div className="space-y-3">
                    <p className="font-caveat text-2xl text-purple-800 font-bold">
                      May all your wishes come true, Iswarya! ♡
                    </p>
                    <button
                      onClick={() => setCandlesBlown(false)}
                      className="text-xs text-purple-600 underline font-sans"
                    >
                      Light candles again
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Virtual Gift Modal (Scratch / Unwrap) */}
      <AnimatePresence>
        {giftModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
            onClick={() => setGiftModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white border border-purple-200 text-center shadow-2xl relative"
            >
              <button
                onClick={() => setGiftModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-purple-100 text-purple-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                <Gift className="w-8 h-8 text-purple-700" />
              </div>

              <h3 className="font-display text-2xl font-bold text-purple-950 mb-1">
                Your Special Gift
              </h3>
              <p className="text-xs sm:text-sm text-purple-800 mb-6">
                Tap the ribbon to unwrap your special surprise!
              </p>

              {!giftRevealed ? (
                <div
                  onClick={() => {
                    setGiftRevealed(true);
                    triggerConfetti();
                  }}
                  className="cursor-pointer py-12 px-6 rounded-2xl bg-gradient-to-tr from-purple-800 to-fuchsia-700 text-white shadow-lg hover:scale-105 transition-all text-center"
                >
                  <Gift className="w-12 h-12 mx-auto mb-2 animate-bounce text-pink-200" />
                  <p className="font-bold text-base">🎁 Tap to Unwrap Gift</p>
                  <p className="text-xs text-purple-200 mt-1">Prepared with all my love</p>
                </div>
              ) : (
                <div className="py-6 px-4 rounded-2xl bg-pink-50 border border-pink-200 text-center space-y-2">
                  <Heart className="w-8 h-8 text-pink-500 fill-pink-500 mx-auto" />
                  <h4 className="font-display text-lg font-bold text-purple-950">
                    A Surprise Weekend Getaway! ✈️🏖️
                  </h4>
                  <p className="text-xs sm:text-sm text-purple-800 leading-relaxed">
                    {birthdayConfig.SECRET_SURPRISE.unlockedContent}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Full Story Modal */}
      <AnimatePresence>
        {storyModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
            onClick={() => setStoryModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-white border border-purple-200 shadow-2xl relative"
            >
              <button
                onClick={() => setStoryModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-purple-100 text-purple-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-display text-2xl font-bold text-purple-950 mb-4 text-center">
                Our Story Timeline ♡
              </h3>

              <div className="space-y-6">
                {birthdayConfig.TIMELINE.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start p-3 rounded-2xl bg-purple-50/80 border border-purple-100">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-purple-200">
                      <img src={item.photoUrl} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-purple-600 block uppercase">
                        {item.date}
                      </span>
                      <h4 className="font-display text-base font-bold text-purple-950">
                        {item.title}
                      </h4>
                      <p className="text-xs text-purple-900/80 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Letter Modal */}
      <AnimatePresence>
        {letterModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
            onClick={() => setLetterModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#fcf9f2] border border-amber-200 text-purple-950 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setLetterModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-amber-100 text-purple-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <h3 className="font-caveat text-3xl font-bold text-purple-950">
                  {birthdayConfig.LOVE_LETTER.greeting}
                </h3>
                {birthdayConfig.LOVE_LETTER.paragraphs.map((para, i) => (
                  <p key={i} className="font-caveat text-lg text-purple-900 leading-relaxed">
                    {para}
                  </p>
                ))}
                <div className="pt-4 font-caveat text-xl font-bold text-purple-950">
                  <p>{birthdayConfig.LOVE_LETTER.closing}</p>
                  <p className="text-purple-700">{birthdayConfig.LOVE_LETTER.sender}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Tamil Kavithaigal Modal */}
      <AnimatePresence>
        {kavithaiModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
            onClick={() => setKavithaiModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-white border border-purple-200 shadow-2xl relative"
            >
              <button
                onClick={() => setKavithaiModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-purple-100 text-purple-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-display text-2xl font-bold text-purple-950 mb-1 text-center">
                இதயம் சொல்லும் காதல் ❤️
              </h3>
              <p className="text-xs text-purple-600 mb-6 text-center font-tamil">
                உனக்காக மட்டுமே எழுதப்பட்ட கவிதைகள்
              </p>

              <div className="space-y-4">
                {Object.values(tamilKavithaigalMap).slice(0, 6).map((kav, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 text-center">
                    <span className="text-[10px] text-purple-500 uppercase tracking-wider block mb-1">
                      {kav.displayDate}
                    </span>
                    <h5 className="font-serif font-bold text-purple-900 text-sm mb-2">
                      {kav.themeTitle}
                    </h5>
                    <div className="font-tamil text-sm text-purple-950 leading-loose space-y-1">
                      {kav.lines.map((l, i) => (
                        <p key={i}>{l}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. Slideshow Modal */}
      <AnimatePresence>
        {slideshowModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSlideshowModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg p-6 rounded-3xl bg-white border border-purple-200 shadow-2xl relative text-center"
            >
              <button
                onClick={() => setSlideshowModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-purple-100 text-purple-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-display text-xl font-bold text-purple-950 mb-3">
                Memory Slideshow
              </h3>

              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-purple-950 mb-4 shadow-inner">
                <img src="/hero.jpg" alt="Memory" className="w-full h-full object-cover" />
              </div>

              <p className="font-caveat text-xl text-purple-900 font-bold">
                “Every smile of yours is my favorite memory, Iswarya.”
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. Special Video Modal */}
      <AnimatePresence>
        {videoModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl p-6 rounded-3xl bg-white border border-purple-200 shadow-2xl relative text-center"
            >
              <button
                onClick={() => setVideoModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-purple-100 text-purple-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-display text-xl font-bold text-purple-950 mb-3">
                A Video From My Heart 🎥
              </h3>

              <div className="aspect-video rounded-2xl overflow-hidden bg-black mb-3">
                <iframe
                  className="w-full h-full"
                  src={birthdayConfig.VIDEO_MESSAGE.videoUrl}
                  title="Special Message"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <p className="text-xs text-purple-700 font-sans">
                Made with all my heart for your special day. ♡
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 8. Full Gallery Lightbox Modal */}
      <AnimatePresence>
        {galleryModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setGalleryModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-white border border-purple-200 shadow-2xl relative"
            >
              <button
                onClick={() => setGalleryModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-purple-100 text-purple-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-display text-2xl font-bold text-purple-950 mb-2 text-center">
                All Our Memories ♡
              </h3>
              <p className="text-xs text-purple-600 text-center mb-6">
                A treasure of smiles and unforgettable moments
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {birthdayConfig.GALLERY.photos.map((p, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden bg-purple-100 shadow-md">
                    <img src={p.url} alt={p.caption} className="w-full h-44 object-cover" />
                    <p className="p-2.5 text-xs text-center font-medium text-purple-900">
                      {p.caption}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
