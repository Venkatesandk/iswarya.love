"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Heart,
  Music,
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
  Send,
  X,
  Youtube,
  Radio,
  Flame,
  CheckCircle2,
  Camera,
  Upload,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { birthdayConfig } from "@/config/birthdayConfig";
import { tamilKavithaigalMap } from "@/data/tamilKavithaigal";

interface WishItem {
  id: string;
  name: string;
  message: string;
  imageUrl?: string;
  timeAgo: string;
}

const INITIAL_WISHES: WishItem[] = [
  {
    id: "w1",
    name: "Pranav",
    message: "Happy Birthday AmuLuu! Stay happy, blessed, and radiant always! ♡",
    timeAgo: "10 mins ago",
  },
  {
    id: "w2",
    name: "Aarthi",
    message: "May all your dreams and wishes come true this year, dearest Aishu! ♡",
    timeAgo: "25 mins ago",
  },
  {
    id: "w3",
    name: "Kavya",
    message: "Stay beautiful, kind, and smiling always! You deserve the universe! ♡",
    timeAgo: "1 hour ago",
  },
  {
    id: "w4",
    name: "Divya",
    message: "Happy Birthday my sweetest friend AmuLuu! Have the most wonderful year ahead! 🎉✨",
    timeAgo: "2 hours ago",
  },
  {
    id: "w5",
    name: "Rahul & Sneha",
    message: "Sending tons of love and blessings to you both! Happy Birthday AmuLuu! 🎂❤️",
    timeAgo: "3 hours ago",
  },
  {
    id: "w6",
    name: "Siddharth",
    message: "Many more happy returns of the day! Keep lighting up every room you enter! ✨",
    timeAgo: "4 hours ago",
  },
  {
    id: "w7",
    name: "Meera",
    message: "Happy Birthday gorgeous queen! May this year bring endless joy and achievements! 💖",
    timeAgo: "5 hours ago",
  },
  {
    id: "w8",
    name: "Karthik",
    message: "Happy Birthday Aishu! Wishing you all health, prosperity, and love! 🎈",
    timeAgo: "6 hours ago",
  },
  {
    id: "w9",
    name: "Pooja",
    message: "To the sweetest soul with the brightest smile — Happy Birthday AmuLuu! 🌸",
    timeAgo: "8 hours ago",
  },
  {
    id: "w10",
    name: "Anand & Priya",
    message: "Heartfelt birthday wishes to AmuLuu! May God bless you abundantly! 💫",
    timeAgo: "10 hours ago",
  },
  {
    id: "w11",
    name: "Soundarya",
    message: "Happy Birthday darling! Always cherish the beautiful person you are! 🍰",
    timeAgo: "12 hours ago",
  },
  {
    id: "w12",
    name: "Vignesh",
    message: "A very happy birthday AmuLuu! Have a rocking year filled with happiness! 🌟",
    timeAgo: "Yesterday",
  },
];

// Curated real photos without ANY repeated images
const MEMORY_PHOTOS = [
  {
    id: 1,
    title: "Standing Together At Home ♡",
    category: "Together",
    url: "/together_gate.jpg",
  },
  {
    id: 2,
    title: "Blessed With Prayers & Love ♡",
    category: "Together",
    url: "/together_blessed.jpg",
  },
  {
    id: 3,
    title: "Forever Smiling Together ♡",
    category: "Together",
    url: "/together_selfie.jpg",
  },
  {
    id: 4,
    title: "Magical Evenings With You ♡",
    category: "Together",
    url: "/together_date.jpg",
  },
  {
    id: 5,
    title: "Sweet Night Candid Smile ♡",
    category: "Candid",
    url: "/amuluu_candid.jpg",
  },
  {
    id: 6,
    title: "Graceful Garden Serenity ♡",
    category: "Special Days",
    url: "/nature_curls.jpg",
  },
  {
    id: 7,
    title: "Lavender Kurti Elegance ♡",
    category: "Selfies",
    url: "/mirror_selfie.jpg",
  },
  {
    id: 8,
    title: "My Beautiful AmuLuu ♡",
    category: "Selfies",
    url: "/amuluu_teal.jpg",
  },
  {
    id: 9,
    title: "Proud Convocation Milestone ♡",
    category: "Special Days",
    url: "/amuluu_convocation.jpg",
  },
  {
    id: 10,
    title: "Every Road Is Beautiful With You ♡",
    category: "Travel",
    url: "/amuluu_car.jpg",
  },
  {
    id: 11,
    title: "Graceful Princess In Gown ♡",
    category: "Candid",
    url: "/amuluu_gown.jpg",
  },
  {
    id: 12,
    title: "Hand In Hand Through Life ♡",
    category: "Travel",
    url: "/holding_hands.jpg",
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

  // Wish submission form (Name is MANDATORY, Image upload included)
  const [wishName, setWishName] = useState("");
  const [wishMessage, setWishMessage] = useState("");
  const [wishImagePreview, setWishImagePreview] = useState<string | null>(null);
  const [nameError, setNameError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [wishesList, setWishesList] = useState<WishItem[]>(INITIAL_WISHES);
  const [wishSentSuccess, setWishSentSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Modals state
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [letterModalOpen, setLetterModalOpen] = useState(false);
  const [kavithaiModalOpen, setKavithaiModalOpen] = useState(false);
  const [cakeModalOpen, setCakeModalOpen] = useState(false);
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const [slideshowModalOpen, setSlideshowModalOpen] = useState(false);
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [wishSearch, setWishSearch] = useState("");
  const [currentWishPage, setCurrentWishPage] = useState(1);
  const [allWishesModalOpen, setAllWishesModalOpen] = useState(false);
  const WISHES_PER_PAGE = 4;

  // Cake blown out state
  const [candlesBlown, setCandlesBlown] = useState(false);

  // Gift scratched/revealed state
  const [giftRevealed, setGiftRevealed] = useState(false);

  // Special Video lock & 3 Love Questions state
  const [videoUnlocked, setVideoUnlocked] = useState(false);
  const [videoQuizStep, setVideoQuizStep] = useState(1);
  const [quizErrorShake, setQuizErrorShake] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);
  const [q3Input, setQ3Input] = useState("");
  const [q3AttemptCount, setQ3AttemptCount] = useState(0);

  // Live countdown state for bottom chapters section
  const [timeState, setTimeState] = useState({
    days: "365",
    hours: "12",
    minutes: "30",
    seconds: "20",
  });

  const SLIDESHOW_IMAGES = [
    { url: "/together_gate.jpg", caption: "Standing together, our world feels complete and blessed ♡" },
    { url: "/together_blessed.jpg", caption: "Hand in hand with sacred blessings and joyful hearts ♡" },
    { url: "/together_selfie.jpg", caption: "From the very beginning, you made my world complete ♡" },
    { url: "/together_date.jpg", caption: "Every evening by your side feels like pure magic ♡" },
    { url: "/holding_hands.jpg", caption: "Holding your hand through every chapter of life ♡" },
    { url: "/amuluu_candid.jpg", caption: "Your sweet laughter turns ordinary nights into poetry ♡" },
    { url: "/nature_curls.jpg", caption: "Graceful elegance and the beauty that captivated my heart ♡" },
    { url: "/mirror_selfie.jpg", caption: "The most gorgeous, enchanting soul in my universe ♡" },
    { url: "/amuluu_convocation.jpg", caption: "My proudest day celebrating your big milestone ♡" },
    { url: "/amuluu_car.jpg", caption: "Every journey and road is beautiful with you ♡" },
    { url: "/amuluu_teal.jpg", caption: "Your radiant smile is my favorite view in this universe ♡" },
    { url: "/amuluu_gown.jpg", caption: "The most beautiful, graceful queen in the world ♡" },
    { url: "/hero.jpg", caption: "The day my universe became complete, AmuLuu ♡" },
  ];

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

  // Handle image upload for wish
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setWishImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit birthday wish (NAME IS STRICTLY MANDATORY)
  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    if (!wishName.trim()) {
      setNameError(true);
      hasError = true;
    } else {
      setNameError(false);
    }

    if (!wishMessage.trim()) {
      setMessageError(true);
      hasError = true;
    } else {
      setMessageError(false);
    }

    if (hasError) return;

    const newWish: WishItem = {
      id: "w-" + Date.now(),
      name: wishName.trim(),
      message: wishMessage.trim(),
      imageUrl: wishImagePreview || undefined,
      timeAgo: "Just now",
    };

    setWishesList([newWish, ...wishesList]);
    setWishMessage("");
    setWishName("");
    setWishImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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

  // Filtered & paginated wishes for scalable 100+ wishes wall
  const filteredWishesList = wishesList.filter(
    (w) =>
      w.name.toLowerCase().includes(wishSearch.toLowerCase()) ||
      w.message.toLowerCase().includes(wishSearch.toLowerCase())
  );
  const totalWishPages = Math.max(1, Math.ceil(filteredWishesList.length / WISHES_PER_PAGE));
  const paginatedWishes = filteredWishesList.slice(
    (currentWishPage - 1) * WISHES_PER_PAGE,
    currentWishPage * WISHES_PER_PAGE
  );

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
      {/* 1. MASTER NAVBAR: ELYSIA | Pill Links | Action Buttons */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-purple-100/70 shadow-[0_2px_12px_-3px_rgba(147,51,234,0.06)] transition-all">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2">
          {/* Left: ELYSIA Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-purple-700 via-fuchsia-600 to-pink-500 flex items-center justify-center text-white shadow-xs ring-2 ring-purple-100/80">
              <Heart className="w-4 h-4 fill-white text-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-xl font-bold tracking-[0.16em] sm:tracking-[0.18em] text-purple-950 block leading-tight">
                ELYSIA
              </span>
              <span className="text-[8.5px] sm:text-[9.5px] font-sans uppercase tracking-[0.18em] text-purple-600 font-semibold block leading-none">
                For AmuLuu, With Love
              </span>
            </div>
          </div>

          {/* Center: Navigation Pill Links (Desktop) */}
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
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
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
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
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
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
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
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === "kavithaigal"
                  ? "bg-purple-700 text-white shadow-xs"
                  : "text-purple-900/80 hover:text-purple-700"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kavithaigal</span>
            </a>

            <a
              href="#surprises"
              onClick={() => setActiveTab("surprises")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
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
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === "wishes"
                  ? "bg-purple-700 text-white shadow-xs"
                  : "text-purple-900/80 hover:text-purple-700"
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Wishes</span>
            </a>
          </nav>

          {/* Right: Music Controller + Birthday Celebration Button */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Ambient Music Toggle Pill (works seamlessly on mobile & desktop) */}
            <button
              onClick={toggleAudio}
              className={`h-8 sm:h-9 px-2.5 sm:px-3 rounded-full flex items-center gap-1.5 text-xs font-medium border transition-all ${
                isPlaying
                  ? "bg-purple-100/90 text-purple-900 border-purple-300 shadow-xs"
                  : "bg-purple-50/70 text-purple-700 border-purple-200/80 hover:bg-purple-100/70"
              }`}
              title={isPlaying ? "Pause Music" : "Play Playlist"}
            >
              <Music className={`w-3.5 h-3.5 ${isPlaying ? "animate-spin text-purple-700" : "text-purple-600"}`} />
              <span className="text-[11px] font-semibold hidden sm:inline">
                {isPlaying ? "Pause Music" : "Playlist"}
              </span>
            </button>

            {/* Birthday Celebration Confetti Pill */}
            <button
              onClick={triggerConfetti}
              className="h-8 sm:h-9 px-3 sm:px-4 rounded-full bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-600 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-purple-300 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-200 fill-pink-200" />
              <span className="hidden sm:inline">Happy Birthday AmuLuu ♡</span>
              <span className="sm:hidden text-xs font-semibold">Celebrate ♡</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. HERO SECTION */}
      {/* ========================================================= */}
      <section
        id="home"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-caveat text-2xl sm:text-3xl text-purple-700 font-bold tracking-wide"
            >
              To My AmuLuu ♡
            </motion.p>

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
            </motion.div>

            {/* Stats Row */}
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

          {/* Right Column: Hero Portrait */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="absolute -top-7 left-4 sm:left-10 z-20">
              <span className="font-caveat text-xl sm:text-2xl text-purple-800 font-bold -rotate-6 block">
                You Make My World Brighter ♡
              </span>
            </div>

            <div className="absolute -right-2 sm:-right-4 top-10 z-20 bg-[#fffdfa] border border-amber-200/80 shadow-lg rounded-xl p-3 sm:p-4 rotate-3 max-w-[125px] sm:max-w-[140px] text-center">
              <p className="font-caveat text-base sm:text-lg text-purple-900 font-bold leading-tight">
                Happy Birthday
                <br />
                AmuLuu (Aishu)
              </p>
              <Heart className="w-4 h-4 text-pink-400 fill-pink-300 mx-auto mt-1" />
            </div>

            <div className="absolute -right-6 sm:-right-8 top-36 z-20 flex flex-col items-center">
              <div className="w-0.5 h-6 bg-amber-800/60" />
              <div className="w-7 h-9 rounded-md bg-amber-500/20 border border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.6)] flex items-center justify-center">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-400 animate-pulse" />
              </div>
            </div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative p-2.5 sm:p-3 rounded-[32px] bg-gradient-to-b from-purple-200/70 via-fuchsia-100/50 to-purple-200/70 shadow-2xl border border-white/80 max-w-sm sm:max-w-md w-full"
            >
              <div className="relative rounded-[26px] overflow-hidden bg-purple-950 aspect-[4/5] shadow-inner">
                <img
                  src="/hero.jpg"
                  alt="AmuLuu"
                  className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.02] hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/40 via-transparent to-purple-950/20 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. SECTION: OUR STORY */}
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
                From a simple conversation to a beautiful journey, every moment with you feels like a blessing. I&apos;m so grateful to have you in my life, AmuLuu. ♡
              </p>
              <button
                onClick={() => setStoryModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-purple-800 hover:bg-purple-900 text-white text-xs sm:text-sm font-semibold shadow-md hover:scale-[1.02] transition-all"
              >
                <span>Read Our Story →</span>
              </button>
            </div>

            {/* Right Horizontal Polaroids (distinct real images, matched to story milestones!) */}
            <div className="lg:col-span-8 relative">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-3.5 pt-2">
                {/* 1. When Worlds United */}
                <div className="bg-white p-2.5 pb-3 rounded-xl shadow-md border border-purple-100/80 -rotate-2 hover:rotate-0 hover:scale-105 transition-all text-center">
                  <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-purple-100">
                    <img
                      src="/together_gate.jpg"
                      alt="When Our Worlds United"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <p className="font-caveat text-sm font-bold text-purple-950 leading-tight">
                    When Worlds United
                  </p>
                  <p className="text-[10px] text-purple-600 font-sans">Jan 2023</p>
                </div>

                {/* 2. Smiles & Connection */}
                <div className="bg-white p-2.5 pb-3 rounded-xl shadow-md border border-purple-100/80 rotate-2 hover:rotate-0 hover:scale-105 transition-all text-center">
                  <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-purple-100">
                    <img
                      src="/together_selfie.jpg"
                      alt="First Smiles & Connection"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <p className="font-caveat text-sm font-bold text-purple-950 leading-tight">
                    Smiles & Talks
                  </p>
                  <p className="text-[10px] text-purple-600 font-sans">Feb 2023</p>
                </div>

                {/* 3. Sacred Blessings */}
                <div className="bg-white p-2.5 pb-3 rounded-xl shadow-md border border-purple-100/80 -rotate-1 hover:rotate-0 hover:scale-105 transition-all text-center">
                  <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-purple-100">
                    <img
                      src="/together_blessed.jpg"
                      alt="Sacred Blessings"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <p className="font-caveat text-sm font-bold text-purple-950 leading-tight">
                    Sacred Blessings
                  </p>
                  <p className="text-[10px] text-purple-600 font-sans">Apr 2023</p>
                </div>

                {/* 4. Sweet Evenings */}
                <div className="bg-white p-2.5 pb-3 rounded-xl shadow-md border border-purple-100/80 rotate-1 hover:rotate-0 hover:scale-105 transition-all text-center">
                  <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-purple-100">
                    <img
                      src="/together_date.jpg"
                      alt="Sweet Evenings"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <p className="font-caveat text-sm font-bold text-purple-950 leading-tight">
                    Sweet Evenings
                  </p>
                  <p className="text-[10px] text-purple-600 font-sans">Aug 2023</p>
                </div>

                {/* 5. Today & Always */}
                <div className="col-span-2 sm:col-span-1 bg-white p-2.5 pb-3 rounded-xl shadow-md border border-purple-100/80 -rotate-2 hover:rotate-0 hover:scale-105 transition-all text-center">
                  <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-purple-100">
                    <img
                      src="/holding_hands.jpg"
                      alt="Today & Always"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <p className="font-caveat text-sm font-bold text-purple-950 leading-tight">
                    Hand In Hand
                  </p>
                  <p className="text-[10px] text-rose-500 font-bold font-sans">Now ♡</p>
                </div>
              </div>

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
      {/* 4. SECTION: OUR MEMORIES (No repeated photos!) */}
      {/* ========================================================= */}
      <section id="memories" className="relative z-10 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {["All", "Together", "Selfies", "Special Days", "Travel", "Candid"].map((cat) => (
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

          <div className="flex items-center gap-2">
            <button
              onClick={() => setGalleryModalOpen(true)}
              className="px-4 py-1.5 rounded-full border border-purple-300 text-purple-900 hover:bg-purple-100/70 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <span>View All Photos →</span>
            </button>
          </div>
        </div>

        {/* Photo Cards Grid with smooth responsive columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {filteredPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-purple-100/80 p-2 text-center group cursor-pointer"
              onClick={() => {
                const idx = SLIDESHOW_IMAGES.findIndex((s) => s.url === photo.url);
                if (idx !== -1) setSlideshowIndex(idx);
                setSlideshowModalOpen(true);
              }}
            >
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-purple-100 mb-2">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-xs font-semibold text-purple-950 truncate px-1">
                {photo.title}
              </p>
            </motion.div>
          ))}

          {/* More Photos Card */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => setGalleryModalOpen(true)}
            className="bg-gradient-to-b from-[#2e1065] to-[#1e0842] rounded-2xl overflow-hidden shadow-md border border-purple-400/40 p-4 text-center flex flex-col items-center justify-center cursor-pointer min-h-[160px] group"
          >
            <div className="w-10 h-10 rounded-full bg-purple-700/60 border border-purple-400/50 flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform">
              <span className="text-xl font-bold">+</span>
            </div>
            <p className="text-sm font-semibold text-white">Full Gallery</p>
            <p className="text-[10px] text-purple-200/80 mt-0.5">Click to view all</p>
          </motion.div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. SECTION: A LETTER FOR YOU & KAVITHAIGAL (RENAMED) */}
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
                A little letter from my heart, for the most special person in my life, AmuLuu. ♡
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
                <div className="space-y-2">
                  <p className="font-caveat text-xl sm:text-2xl text-purple-950 font-bold leading-tight">
                    My Dearest AmuLuu (Aishu),
                  </p>
                  <p className="font-caveat text-base sm:text-lg text-purple-900 font-medium leading-relaxed">
                    On this special day, I just want you to know how much you mean to me. You bring so much light, joy and happiness into my life, my sweet Aishu. I&apos;m so lucky to have you. Happy Birthday my love, AmuLuu. Here&apos;s to more beautiful memories together.
                  </p>
                  <p className="font-caveat text-lg sm:text-xl text-purple-950 font-bold pt-2">
                    Always and Forever,
                    <br />
                    ♡
                  </p>
                </div>

                <div className="absolute -bottom-3 right-4 rotate-12 flex items-center">
                  <div className="w-16 h-2 bg-gradient-to-r from-amber-700 via-amber-900 to-black rounded-full shadow-md" />
                  <div className="w-3 h-1.5 bg-amber-400 rotate-45" />
                </div>
              </div>
            </div>

            {/* Right Column: Heartfelt Love Verse Card */}
            <div className="lg:col-span-3 space-y-3.5 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-purple-900">
                <Heart className="w-5 h-5 text-purple-700 fill-purple-700/20" />
                <h3 className="font-display text-xl sm:text-2xl font-bold text-purple-950">
                  இதயத்தின் வரிகள் ♡
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-purple-900/80 leading-relaxed font-tamil">
                என் சுவாசம் தீரும் வரை என் இதயம் உச்சரிக்கும் ஒரே பெயர் உன் பெயர்தான், என் அன்பு அமுலு... ♡
              </p>
              <button
                onClick={() => setKavithaiModalOpen(true)}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-700 to-fuchsia-600 hover:from-purple-800 hover:to-fuchsia-700 text-white text-xs font-semibold shadow-md transition-all hover:scale-[1.02] flex items-center gap-1.5 mx-auto lg:mx-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-200 fill-pink-200" />
                <span>உனக்கான இதயம் ♡</span>
              </button>

              {/* Exact Romantic Tamil Quote Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-100/90 to-fuchsia-50/80 border border-purple-200/80 text-center font-tamil text-xs sm:text-sm text-purple-950 font-medium leading-relaxed shadow-xs">
                “உன் விழிகளில் என் உலகம் மலர்ந்தது...
                உன் புன்னகையில் என் ஆயுள் நிறைந்தது!
                என்றும் என் உயிர் நீயே, அமுலு ♡”
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. SECTION: BIRTHDAY SURPRISES */}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Birthday Wish Cake */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-purple-100 p-3 flex flex-col justify-between hover:shadow-lg transition-all group">
            <div className="aspect-square rounded-xl overflow-hidden bg-purple-100 mb-3 relative">
              <img
                src="/birthday_cake.jpg"
                alt="Birthday Wish Cake"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="space-y-1 mb-3">
              <h4 className="font-display text-base font-bold text-purple-950">
                Birthday Wish Cake
              </h4>
              <p className="text-xs text-purple-800/80">
                A special wish just for you.
              </p>
            </div>
            <button
              onClick={() => setCakeModalOpen(true)}
              className="w-full py-2 rounded-xl bg-purple-800 hover:bg-purple-900 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <span>Open →</span>
            </button>
          </div>

          {/* Card 2: Virtual Gift */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-purple-100 p-3 flex flex-col justify-between hover:shadow-lg transition-all group">
            <div className="aspect-square rounded-xl overflow-hidden bg-purple-100 mb-3 relative">
              <img
                src="/gift_box.jpg"
                alt="Virtual Gift"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
              className="w-full py-2 rounded-xl bg-purple-800 hover:bg-purple-900 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <span>Open →</span>
            </button>
          </div>

          {/* Card 3: Memory Slideshow */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-purple-100 p-3 flex flex-col justify-between hover:shadow-lg transition-all group">
            <div className="aspect-square rounded-xl overflow-hidden bg-purple-100 mb-3 relative">
              <img
                src="/together_date.jpg"
                alt="Memory Slideshow"
                className="w-full h-full object-cover object-[center_5%] group-hover:scale-105 transition-transform duration-500"
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
              className="w-full py-2 rounded-xl bg-purple-800 hover:bg-purple-900 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <span>Open →</span>
            </button>
          </div>

          {/* Card 4: Special Video */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-purple-100 p-3 flex flex-col justify-between hover:shadow-lg transition-all group">
            <div className="aspect-square rounded-xl overflow-hidden bg-purple-100 mb-3 relative">
              <img
                src="/hero.jpg"
                alt="Special Video"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
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
              className="w-full py-2 rounded-xl bg-purple-800 hover:bg-purple-900 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <span>Watch →</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. SECTION: SEND YOUR WISH (NAME IS MANDATORY & INCLUDES IMAGE) */}
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
                Wish AmuLuu on this special day! You can leave a message, a photo, or a simple blessing. ♡
              </p>

              <form onSubmit={handleSendWish} className="space-y-3.5 pt-2">
                {/* Mandatory Name Field */}
                <div>
                  <label className="block text-xs font-bold text-purple-950 mb-1">
                    Your Name <span className="text-rose-500">* (Mandatory)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={wishName}
                    onChange={(e) => {
                      setWishName(e.target.value);
                      if (e.target.value.trim()) setNameError(false);
                    }}
                    placeholder="Enter your name..."
                    className={`w-full py-2.5 px-3.5 rounded-xl border text-xs sm:text-sm text-purple-950 placeholder-purple-400 bg-purple-50/50 focus:outline-none transition-all ${
                      nameError
                        ? "border-rose-400 ring-2 ring-rose-200"
                        : "border-purple-200/80 focus:border-purple-400"
                    }`}
                  />
                  {nameError && (
                    <p className="text-[11px] text-rose-500 font-semibold mt-1">
                      Please enter your name — this field is mandatory!
                    </p>
                  )}
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-xs font-bold text-purple-950 mb-1">
                    Your Birthday Wish <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      rows={4}
                      required
                      maxLength={300}
                      value={wishMessage}
                      onChange={(e) => {
                        setWishMessage(e.target.value);
                        if (e.target.value.trim()) setMessageError(false);
                      }}
                      placeholder="Write your birthday wish for AmuLuu (Aishu)..."
                      className={`w-full py-2.5 px-3.5 rounded-xl border text-xs sm:text-sm text-purple-950 placeholder-purple-400 bg-purple-50/50 focus:outline-none resize-none transition-all ${
                        messageError
                          ? "border-rose-400 ring-2 ring-rose-200"
                          : "border-purple-200/80 focus:border-purple-400"
                      }`}
                    />
                    <div className="absolute right-3 bottom-2 text-[10px] text-purple-400">
                      {wishMessage.length}/300
                    </div>
                  </div>
                </div>

                {/* Optional Photo Attachment */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-purple-700" />
                      Include a Photo / Memory (Optional)
                    </span>
                    {wishImagePreview && (
                      <button
                        type="button"
                        onClick={() => {
                          setWishImagePreview(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="text-[10px] text-rose-500 hover:underline"
                      >
                        Remove photo
                      </button>
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="wish-photo-input"
                  />

                  {!wishImagePreview ? (
                    <label
                      htmlFor="wish-photo-input"
                      className="cursor-pointer flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-purple-300 bg-purple-50/30 hover:bg-purple-100/50 transition-colors text-xs text-purple-700 font-medium"
                    >
                      <Upload className="w-4 h-4 text-purple-600" />
                      <span>Click to upload a photo with your wish</span>
                    </label>
                  ) : (
                    <div className="flex items-center gap-3 p-2 rounded-xl bg-purple-50 border border-purple-200">
                      <img
                        src={wishImagePreview}
                        alt="Wish attachment"
                        className="w-14 h-14 object-cover rounded-lg border border-purple-200 shadow-xs"
                      />
                      <div className="text-xs text-purple-800">
                        <p className="font-semibold text-emerald-600">Photo attached! ♡</p>
                        <p className="text-[11px] text-purple-500">Will be shown with your wish</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Row */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-purple-800 hover:bg-purple-900 text-white text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center gap-1.5 hover:scale-[1.02]"
                  >
                    <Send className="w-3.5 h-3.5" />
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

            {/* Right: Modern Interactive Wishes Wall (Scalable for 100+ Wishes) */}
            <div className="lg:col-span-6 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-fuchsia-600 fill-fuchsia-600/30" />
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-purple-950">
                    Wishes Wall
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-700 to-fuchsia-600 text-white text-[11px] font-bold shadow-xs">
                    {wishesList.length + 115}+ Wishes
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setAllWishesModalOpen(true)}
                  className="text-xs text-purple-700 font-bold hover:text-purple-900 underline flex items-center gap-1 transition-colors"
                >
                  <span>View All Wall →</span>
                </button>
              </div>

              {/* Search & Stats Bar */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
                  <input
                    type="text"
                    value={wishSearch}
                    onChange={(e) => {
                      setWishSearch(e.target.value);
                      setCurrentWishPage(1);
                    }}
                    placeholder="Search wishes by name..."
                    className="w-full pl-8 pr-3 py-2 rounded-xl border border-purple-200 text-xs text-purple-950 placeholder-purple-400 bg-white focus:outline-none focus:border-purple-500 shadow-2xs"
                  />
                  {wishSearch && (
                    <button
                      type="button"
                      onClick={() => setWishSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-purple-400 hover:text-purple-700 font-semibold"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setAllWishesModalOpen(true)}
                  className="px-3 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-semibold shrink-0 transition-colors"
                >
                  Wall 💌
                </button>
              </div>

              {/* Paginated Wishes Cards */}
              <div className="space-y-2.5 min-h-[310px]">
                {paginatedWishes.length === 0 ? (
                  <div className="py-12 text-center text-xs text-purple-500 bg-purple-50/50 rounded-2xl border border-purple-100">
                    No wishes found matching &quot;{wishSearch}&quot;. Be the first to add one! ♡
                  </div>
                ) : (
                  paginatedWishes.map((wish) => (
                    <motion.div
                      key={wish.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-2xl bg-white border border-purple-100/90 shadow-xs flex items-start gap-3 hover:border-purple-300 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-500 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-2xs">
                        {wish.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-purple-950 truncate">
                            {wish.name}
                          </span>
                          <span className="text-[10px] text-purple-400 shrink-0 font-sans">
                            {wish.timeAgo}
                          </span>
                        </div>
                        <p className="text-xs text-purple-900/90 mt-1 leading-relaxed">
                          &ldquo;{wish.message}&rdquo;
                        </p>
                        {wish.imageUrl && (
                          <div className="mt-2 rounded-xl overflow-hidden max-w-[130px] max-h-[100px] border border-purple-200 shadow-2xs">
                            <img
                              src={wish.imageUrl}
                              alt="Wish attachment"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Pagination Controls Bar */}
              <div className="flex items-center justify-between pt-1 border-t border-purple-100 text-xs">
                <span className="text-[11px] text-purple-600 font-medium">
                  Page {currentWishPage} of {totalWishPages} (from 100+ wishes)
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={currentWishPage <= 1}
                    onClick={() => setCurrentWishPage((p) => Math.max(1, p - 1))}
                    className="p-1.5 rounded-lg border border-purple-200 text-purple-700 hover:bg-purple-100 disabled:opacity-30 disabled:pointer-events-none transition-all"
                    title="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-2 py-0.5 rounded-md bg-purple-100 font-bold text-purple-950 text-[11px]">
                    {currentWishPage} / {totalWishPages}
                  </span>
                  <button
                    type="button"
                    disabled={currentWishPage >= totalWishPages}
                    onClick={() => setCurrentWishPage((p) => Math.min(totalWishPages, p + 1))}
                    className="p-1.5 rounded-lg border border-purple-200 text-purple-700 hover:bg-purple-100 disabled:opacity-30 disabled:pointer-events-none transition-all"
                    title="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. SECTION: HERE'S TO MANY MORE CHAPTERS */}
      {/* ========================================================= */}
      <section className="relative z-10 w-full bg-gradient-to-r from-[#17092c] via-[#240e42] to-[#12071f] text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
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
              No matter where life takes us, I look forward to creating many more beautiful memories with you, my AmuLuu. ♡
            </p>
            <button
              onClick={triggerConfetti}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-purple-700 hover:bg-purple-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-purple-900/50 transition-all"
            >
              <span>Always Together →</span>
            </button>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center lg:items-end text-center lg:text-right space-y-3">
            <span className="font-caveat text-xl sm:text-2xl text-pink-300 font-bold">
              You Make My World Brighter ♡
            </span>

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
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-purple-700 flex items-center justify-center text-white">
              <Heart className="w-3.5 h-3.5 fill-current" />
            </div>
            <div>
              <span className="font-serif text-base font-bold tracking-widest text-purple-950">
                ELYSIA
              </span>
              <span className="text-[9px] text-purple-600 block tracking-widest uppercase">
                For AmuLuu, With Love
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-purple-800">
            <a href="#home" className="hover:text-purple-600">Home</a>
            <a href="#story" className="hover:text-purple-600">Our Story</a>
            <a href="#memories" className="hover:text-purple-600">Memories</a>
            <a href="#letter" className="hover:text-purple-600">Letters</a>
            <a href="#kavithaigal" className="hover:text-purple-600">Kavithaigal</a>
            <a href="#surprises" className="hover:text-purple-600">Surprises</a>
            <a href="#wishes" className="hover:text-purple-600">Wishes</a>
          </div>

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
      {/* MODALS */}
      {/* ========================================================= */}

      {/* 1. Cake Modal */}
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
                  src="/birthday_cake.jpg"
                  alt="Birthday Cake"
                  className="w-48 h-48 object-cover rounded-2xl mx-auto shadow-lg border-2 border-purple-200"
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
                      May all your wishes come true, AmuLuu! ♡
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

      {/* 2. Virtual Gift Modal */}
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
                <div className="py-6 px-4 rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 border border-purple-200 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-700 to-fuchsia-600 text-white flex items-center justify-center mx-auto shadow-md text-2xl">
                    🎬
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-[11px] font-bold uppercase tracking-wider">
                    Sunday Movie Date 🎟️🍿
                  </div>
                  <h4 className="font-display text-xl font-bold text-purple-950">
                    Jailer 2 Movie On Sunday! 🎬
                  </h4>
                  <p className="text-xs sm:text-sm text-purple-900 leading-relaxed font-medium">
                    SURPRISE, AMULUU (AISHU)! ❤️ Pack your sweetest smile! We are going to watch <strong>Jailer 2</strong> this Sunday together! Delicious popcorn, cool drinks, cozy theater seats, and an unforgettable date night with me! ♡
                  </p>
                  <div className="pt-1">
                    <span className="text-[11px] text-pink-600 font-bold">
                      Can&apos;t wait to hold your hand in the theater! 🫶🏻❤️🍿
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Story Modal */}
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
                      <img src={item.photoUrl} alt={item.title} className="w-full h-full object-cover object-top" />
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

      {/* 5. Kavithaigal Modal - SINGLE BEST ROMANTIC TAMIL KAVITHAI */}
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
              className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white border border-purple-200 shadow-2xl relative text-center"
            >
              <button
                onClick={() => setKavithaiModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-purple-100 text-purple-700 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-display text-2xl font-bold text-purple-950 mb-1">
                இதயம் சொல்லும் காதல் ❤️
              </h3>
              <p className="text-xs text-purple-600 mb-5 font-tamil">
                உனக்காக மட்டுமே எழுதப்பட்ட கவிதை
              </p>

              {/* ONLY ONE SINGLE BEST POEM CARD */}
              <div className="p-5 sm:p-6 rounded-2xl bg-purple-50/70 border border-purple-100 text-center shadow-xs">
                <span className="text-[10px] text-purple-500 font-semibold uppercase tracking-wider block mb-1">
                  14 OCTOBER 2026 • இனிய பிறந்தநாள்
                </span>
                <h5 className="font-serif font-bold text-purple-900 text-base mb-3">
                  உன் சிரிப்பில் என் உலகம் 💜
                </h5>
                <div className="font-tamil text-sm sm:text-base text-purple-950 leading-loose space-y-1.5 font-medium">
                  <p>உன் சிரிப்பில் என் உலகம் மலருதே,</p>
                  <p>உன் பார்வையில் என் இதயம் கரையுதே,</p>
                  <p>நீ அருகில் இருந்தால் போதும் கண்மணி,</p>
                  <p>ஒவ்வொரு நாளும் காதலாய் மாறுதே! 💜</p>
                </div>
                <div className="w-12 h-0.5 bg-purple-200 mx-auto my-3.5" />
                <p className="font-tamil text-sm sm:text-base text-purple-900 font-bold">
                  இனிய பிறந்தநாள் வாழ்த்துகள், என் உயிர் அழகி Aishu! ❤️🫶🏻♡
                </p>
              </div>

              <div className="mt-5">
                <button
                  onClick={() => {
                    triggerConfetti();
                    setKavithaiModalOpen(false);
                  }}
                  className="w-full py-2.5 rounded-full bg-gradient-to-r from-purple-700 to-fuchsia-600 hover:from-purple-800 hover:to-fuchsia-700 text-white font-semibold text-xs sm:text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  என் இதயம் உனக்கே ♡
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. Slideshow Modal (rotates between all distinct photos!) */}
      <AnimatePresence>
        {slideshowModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSlideshowModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg sm:max-w-xl p-5 sm:p-7 rounded-3xl bg-white border border-purple-200 shadow-2xl relative text-center"
            >
              <button
                onClick={() => setSlideshowModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-purple-100 text-purple-700 transition-colors z-20"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-purple-950 mb-3">
                Memory Slideshow
              </h3>

              {/* Natural Fit Photo Container: NEVER cuts off faces! */}
              <div className="relative w-full aspect-[4/5] sm:aspect-square sm:h-[58vh] max-h-[500px] rounded-2xl overflow-hidden bg-[#180a29] mb-4 shadow-inner flex items-center justify-center">
                {/* Ambient Blurred Backdrop */}
                <img
                  src={SLIDESHOW_IMAGES[slideshowIndex].url}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-45 scale-110 pointer-events-none"
                />

                {/* Main Crystal Clear Photo - guaranteed 100% full view, zero face clipping */}
                <img
                  key={`slide-img-${slideshowIndex}`}
                  src={SLIDESHOW_IMAGES[slideshowIndex].url}
                  alt={SLIDESHOW_IMAGES[slideshowIndex].caption}
                  className="relative z-10 w-full h-full object-contain mx-auto drop-shadow-2xl transition-all duration-300"
                />

                {/* Slideshow arrows */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSlideshowIndex(
                      (prev) => (prev - 1 + SLIDESHOW_IMAGES.length) % SLIDESHOW_IMAGES.length
                    );
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-black/60 text-white hover:bg-black/85 backdrop-blur-sm transition-all shadow-md active:scale-95"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSlideshowIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-black/60 text-white hover:bg-black/85 backdrop-blur-sm transition-all shadow-md active:scale-95"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Progress indicator badge */}
                <div className="absolute bottom-2.5 right-3 z-20 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium font-sans">
                  {slideshowIndex + 1} / {SLIDESHOW_IMAGES.length}
                </div>
              </div>

              <p className="font-caveat text-lg sm:text-xl text-purple-900 font-bold min-h-[2.5rem] flex items-center justify-center">
                “{SLIDESHOW_IMAGES[slideshowIndex].caption}”
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. Special Video Modal (Protected by 2 Love Questions!) */}
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
              className="w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-white border border-purple-200 shadow-2xl relative text-center"
            >
              <button
                onClick={() => setVideoModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-purple-100 text-purple-700 transition-colors z-20"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-purple-950 mb-1">
                A Video From My Heart 🎥
              </h3>

              {!videoUnlocked ? (
                /* Love Questions Gate before Video */
                <div className="py-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-pink-500/20">
                    <Heart className="w-7 h-7 fill-white animate-pulse" />
                  </div>

                  <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-purple-600 font-bold block mb-1">
                    Love Verification • Question {videoQuizStep} of 3
                  </span>
                  <p className="text-xs text-purple-700 mb-6">
                    Answer these 3 sweet questions from the heart to reveal your special video! ♡
                  </p>

                  <motion.div
                    key={videoQuizStep}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="max-w-md mx-auto p-5 sm:p-6 rounded-2xl bg-purple-50/80 border border-purple-100 text-center"
                  >
                    {videoQuizStep === 1 ? (
                      <div>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-purple-950 mb-4">
                          1. Who holds the permanent key to my heart forever? 🗝️💖
                        </h4>
                        <div className="space-y-2.5">
                          <button
                            type="button"
                            onClick={() => {
                              setQuizFeedback("Correct, my queen! Only you forever! ♡");
                              setTimeout(() => {
                                setVideoQuizStep(2);
                                setQuizFeedback(null);
                              }, 600);
                            }}
                            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-purple-100/90 border-2 border-purple-300 text-purple-950 font-semibold text-sm shadow-xs hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2"
                          >
                            <span>💖 AmuLuu (Aishu) ♡</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setQuizErrorShake(true);
                              setQuizFeedback("Wrong! Only my sweet AmuLuu owns my heart! 🙈");
                              setTimeout(() => setQuizErrorShake(false), 900);
                            }}
                            className="w-full py-2.5 px-4 rounded-xl bg-white/70 hover:bg-purple-100/40 border border-purple-200 text-purple-800 text-xs shadow-2xs transition-all"
                          >
                            <span>Somebody else</span>
                          </button>
                        </div>
                      </div>
                    ) : videoQuizStep === 2 ? (
                      <div>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-purple-950 mb-4">
                          2. How much does Venkat love his AmuLuu? 🌙✨
                        </h4>
                        <div className="space-y-2.5">
                          <button
                            type="button"
                            onClick={() => {
                              setQuizFeedback("Correct! Beyond the stars and infinity! ♡ Next question →");
                              setTimeout(() => {
                                setVideoQuizStep(3);
                                setQuizFeedback(null);
                              }, 600);
                            }}
                            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-purple-100/90 border-2 border-purple-300 text-purple-950 font-semibold text-sm shadow-xs hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2"
                          >
                            <span>♾️ Beyond the stars &amp; to infinity ♡</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setQuizErrorShake(true);
                              setQuizFeedback("No way! I love you beyond infinity! 🙈 Try again ♡");
                              setTimeout(() => setQuizErrorShake(false), 900);
                            }}
                            className="w-full py-2.5 px-4 rounded-xl bg-white/70 hover:bg-purple-100/40 border border-purple-200 text-purple-800 text-xs shadow-2xs transition-all"
                          >
                            <span>Only 10%</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Question 3: First Love Confession Date (Answer: 0622) */
                      <div>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-purple-950 mb-2">
                          3. When did you and I first confess our love for each other, Muu? ❤️🥹
                        </h4>
                        <p className="text-xs text-purple-600 mb-5">
                          Enter the 4-digit date that lives in our hearts ♡
                        </p>

                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const clean = q3Input.trim().replace(/[^0-9]/g, "");
                            if (clean === "0622" || clean === "2206") {
                              triggerConfetti();
                              setQuizFeedback("YES MY LIFE! ❤️ That's our forever date! Unlocking your video... 🥹✨");
                              setTimeout(() => {
                                setVideoUnlocked(true);
                                setQuizFeedback(null);
                              }, 800);
                            } else {
                              const wrongEmotions = [
                                "Aiyoo Muu! 🥺 How can you forget our special date? Think with your heart! 💔",
                                "Enna Muu idhu... 🙈 My heart is waiting for the real day! Try again! ❤️",
                                "Aww, not that date! 🥺 Remember the exact day our forever began, Muu! 💭",
                                "Aiyo pavam! 😜 Wrong date! Search your sweet memories, Muu! 🫶🏻",
                                "Heartbreak alert! 😭💔 Try again my queen, you definitely know this! 🥺❤️"
                              ];
                              setQuizErrorShake(true);
                              setQuizFeedback(wrongEmotions[q3AttemptCount % wrongEmotions.length]);
                              setQ3AttemptCount((prev) => prev + 1);
                              setTimeout(() => setQuizErrorShake(false), 900);
                            }
                          }}
                          className="space-y-4"
                        >
                          <div className="flex items-center justify-center gap-2 max-w-xs mx-auto">
                            <input
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              maxLength={4}
                              value={q3Input}
                              onChange={(e) => setQ3Input(e.target.value.replace(/[^0-9]/g, ""))}
                              placeholder="••••"
                              aria-label="4-digit Date"
                              className="w-32 sm:w-36 text-center text-xl font-bold tracking-[0.3em] py-2.5 px-3 rounded-2xl border-2 border-purple-300 focus:border-purple-600 focus:outline-none bg-white text-purple-950 shadow-inner placeholder:text-purple-300 transition-all"
                            />
                            <button
                              type="submit"
                              className="py-2.5 px-5 rounded-2xl bg-gradient-to-r from-purple-700 via-purple-800 to-fuchsia-600 hover:from-purple-800 hover:to-fuchsia-700 text-white font-semibold text-xs sm:text-sm shadow-md hover:scale-[1.02] active:scale-98 transition-all whitespace-nowrap"
                            >
                              Unlock ♡
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {quizFeedback && (
                      <p className={`mt-3.5 text-xs font-semibold ${quizErrorShake ? "text-rose-600 animate-bounce" : "text-emerald-600"}`}>
                        {quizFeedback}
                      </p>
                    )}
                  </motion.div>
                </div>
              ) : (
                /* Unlocked Video Message */
                <div className="pt-2">
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-3">
                    Unlocked With Pure Love ❤️✨
                  </div>
                  <div className="aspect-video rounded-2xl overflow-hidden bg-black mb-3 shadow-xl">
                    <iframe
                      className="w-full h-full"
                      src={birthdayConfig.VIDEO_MESSAGE.videoUrl}
                      title="Special Message"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="text-xs text-purple-750 font-sans">
                    Made with all my heart for your special day. ♡
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 8. Full Gallery Lightbox Modal (Includes real photos of AmuLuu without repetition) */}
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

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {MEMORY_PHOTOS.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => {
                      const idx = SLIDESHOW_IMAGES.findIndex((s) => s.url === photo.url);
                      if (idx !== -1) setSlideshowIndex(idx);
                      setGalleryModalOpen(false);
                      setSlideshowModalOpen(true);
                    }}
                    className="rounded-2xl overflow-hidden bg-purple-50 border border-purple-100 shadow-md flex flex-col group hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-purple-900/10">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 bg-white flex flex-col justify-between flex-grow">
                      <p className="text-xs font-bold text-purple-950">
                        {photo.title}
                      </p>
                      <span className="text-[10px] uppercase tracking-wider text-purple-600 font-semibold mt-1">
                        {photo.category} • Tap to view full ♡
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 9. Full Wishes Wall Modal (100+ Wishes) */}
      <AnimatePresence>
        {allWishesModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setAllWishesModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-white border border-purple-200 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setAllWishesModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-purple-100 text-purple-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <span className="text-[11px] uppercase tracking-wider text-purple-600 font-bold">
                  Community Love
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-purple-950 mt-1">
                  Wishes Wall for AmuLuu ♡
                </h3>
                <p className="text-xs text-purple-700 mt-1">
                  Over 100+ warm wishes and blessings from family, friends, and loved ones.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {wishesList.map((wish) => (
                  <div
                    key={wish.id}
                    className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-white font-bold flex items-center justify-center text-xs">
                            {wish.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-xs font-bold text-purple-950">
                            {wish.name}
                          </span>
                        </div>
                        <span className="text-[10px] text-purple-400 font-sans">
                          {wish.timeAgo}
                        </span>
                      </div>
                      <p className="text-xs text-purple-900 leading-relaxed italic">
                        &ldquo;{wish.message}&rdquo;
                      </p>
                    </div>
                    {wish.imageUrl && (
                      <div className="mt-3 rounded-xl overflow-hidden max-h-36 border border-purple-200">
                        <img
                          src={wish.imageUrl}
                          alt="Wish"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
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
