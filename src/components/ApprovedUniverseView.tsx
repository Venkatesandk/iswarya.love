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
  Shield,
  ShieldCheck,
  Pencil,
  Trash2,
  LogOut,
  ZoomIn,
  Lock,
  Unlock,
  SkipBack,
  SkipForward,
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

  // Audio playlist state (10 Continuous Romantic Tamil Love BGMs)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [musicMenuOpen, setMusicMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack =
    birthdayConfig.BGM_PLAYLIST[currentTrackIndex] ||
    birthdayConfig.BGM_PLAYLIST[0];

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

  // Admin Login & Wishes Management state
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState("");
  const [adminPinError, setAdminPinError] = useState<string | null>(null);
  const [editingWish, setEditingWish] = useState<WishItem | null>(null);
  const [editWishName, setEditWishName] = useState("");
  const [editWishMessage, setEditWishMessage] = useState("");
  const [editWishImageUrl, setEditWishImageUrl] = useState<string | null>(null);
  const [previewPhotoUrl, setPreviewPhotoUrl] = useState<string | null>(null);
  const editFileInputRef = useRef<HTMLInputElement | null>(null);
  const [adminActionNotice, setAdminActionNotice] = useState<string | null>(null);

  // Modals state
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [letterModalOpen, setLetterModalOpen] = useState(false);
  const [kavithaiModalOpen, setKavithaiModalOpen] = useState(false);
  const [selectedKavithaiKey, setSelectedKavithaiKey] = useState("2026-10-14");
  const [cakeModalOpen, setCakeModalOpen] = useState(false);
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const [slideshowModalOpen, setSlideshowModalOpen] = useState(false);
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const [slideshowUnlocked, setSlideshowUnlocked] = useState(false);
  const [slideshowQuizStep, setSlideshowQuizStep] = useState(1);
  const [slideshowQuizError, setSlideshowQuizError] = useState(false);
  const [slideshowFeedback, setSlideshowFeedback] = useState<string | null>(null);
  const [slideshowAnswerInput, setSlideshowAnswerInput] = useState("");
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

  const playTrackByIndex = (index: number) => {
    const validIndex =
      (index + birthdayConfig.BGM_PLAYLIST.length) %
      birthdayConfig.BGM_PLAYLIST.length;
    setCurrentTrackIndex(validIndex);
    const nextTrack = birthdayConfig.BGM_PLAYLIST[validIndex];
    if (audioRef.current) {
      audioRef.current.src = nextTrack.url;
      audioRef.current.volume = 0.4;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const playNextTrack = () => {
    playTrackByIndex(currentTrackIndex + 1);
  };

  const playPrevTrack = () => {
    playTrackByIndex(currentTrackIndex - 1);
  };

  // Audio play/pause toggle
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.4;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  // Autoplay Minnale Movie Mild BGM automatically when the site opens
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set gentle, mild romantic background volume (40%)
    audio.volume = 0.4;

    const playAudio = () => {
      const promise = audio.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }
    };

    // 1. Attempt immediate autoplay on site open
    playAudio();

    // 2. Fallback for strict browser autoplay policy: play automatically on very first user interaction
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

  // Synchronize custom wishes & admin login state with localStorage
  useEffect(() => {
    try {
      const savedAdmin = localStorage.getItem("iswarya_admin_mode");
      if (savedAdmin === "true") {
        setIsAdmin(true);
      }
      const savedWishes = localStorage.getItem("iswarya_custom_wishes");
      if (savedWishes) {
        const parsed = JSON.parse(savedWishes);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWishesList(parsed);
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Helper to persist wishes state and localStorage
  const persistWishes = (wishes: WishItem[]) => {
    setWishesList(wishes);
    try {
      localStorage.setItem("iswarya_custom_wishes", JSON.stringify(wishes));
    } catch (e) {
      // ignore
    }
  };

  // Admin login check (accepts birthdayConfig.ADMIN_PIN "9613", "1410", or "0622")
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = adminPinInput.trim();
    if (
      cleanPin === birthdayConfig.ADMIN_PIN ||
      cleanPin === "9613" ||
      cleanPin === "1410" ||
      cleanPin === "0622"
    ) {
      setIsAdmin(true);
      try {
        localStorage.setItem("iswarya_admin_mode", "true");
      } catch (e) {}
      setAdminModalOpen(false);
      setAdminPinInput("");
      setAdminPinError(null);
      triggerConfetti();
      setAdminActionNotice("Admin Access Unlocked! You can now Edit & Delete wishes. ✨");
      setTimeout(() => setAdminActionNotice(null), 4000);
    } else {
      setAdminPinError("Invalid Admin PIN! Please try again.");
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem("iswarya_admin_mode");
    } catch (e) {}
    setAdminActionNotice("Logged out of Admin Mode.");
    setTimeout(() => setAdminActionNotice(null), 3000);
  };

  // Open edit dialog for a specific wish
  const handleStartEditWish = (wish: WishItem) => {
    setEditingWish(wish);
    setEditWishName(wish.name);
    setEditWishMessage(wish.message);
    setEditWishImageUrl(wish.imageUrl || null);
    if (editFileInputRef.current) editFileInputRef.current.value = "";
  };

  // Handle image upload when editing a wish
  const handleEditImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditWishImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove photo from editing wish
  const handleRemoveEditPhoto = () => {
    setEditWishImageUrl(null);
    if (editFileInputRef.current) editFileInputRef.current.value = "";
  };

  // Save changes to edited wish
  const handleSaveEditWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWish) return;
    if (!editWishName.trim() || !editWishMessage.trim()) return;

    const updated = wishesList.map((w) =>
      w.id === editingWish.id
        ? {
            ...w,
            name: editWishName.trim(),
            message: editWishMessage.trim(),
            imageUrl: editWishImageUrl || undefined,
          }
        : w
    );
    persistWishes(updated);
    setEditingWish(null);
    setAdminActionNotice(`Updated wish from "${editWishName.trim()}" successfully! ✏️`);
    setTimeout(() => setAdminActionNotice(null), 4000);
  };

  // Delete a wish
  const handleDeleteWish = (wishId: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the wish from "${name}"?`)) {
      const updated = wishesList.filter((w) => w.id !== wishId);
      persistWishes(updated);
      setAdminActionNotice(`Deleted wish from "${name}". 🗑️`);
      setTimeout(() => setAdminActionNotice(null), 4000);
    }
  };

  // Restore default wishes
  const handleResetWishes = () => {
    if (window.confirm("Restore original default wishes list?")) {
      persistWishes(INITIAL_WISHES);
      setAdminActionNotice("Restored default wishes list. 🔄");
      setTimeout(() => setAdminActionNotice(null), 4000);
    }
  };

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

    persistWishes([newWish, ...wishesList]);
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

  const allKavithaiKeys = Object.keys(tamilKavithaigalMap);
  const activeKavithai = tamilKavithaigalMap[selectedKavithaiKey] || tamilKavithaigalMap["2026-10-14"];

  return (
    <div className="relative min-h-screen w-full bg-[#faf5ff] text-purple-950 font-sans selection:bg-purple-200 selection:text-purple-900 overflow-x-hidden">
      {/* Background audio element - Continuous Romantic Love BGM Playlist */}
      <audio
        ref={audioRef}
        src={currentTrack.url}
        preload="auto"
        autoPlay
        onEnded={playNextTrack}
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
            {/* Ambient Music Playlist Controller (works seamlessly on mobile & desktop) */}
            <div className="relative">
              {/* Mobile View: Just the Music Symbol */}
              <button
                onClick={() => setMusicMenuOpen((prev) => !prev)}
                className={`sm:hidden w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                  isPlaying
                    ? "bg-purple-100 text-purple-900 border-purple-300 shadow-sm ring-2 ring-purple-300/50"
                    : "bg-purple-50/70 text-purple-700 border-purple-200/80 hover:bg-purple-100/70"
                }`}
                title="Romantic Love BGMs"
                aria-label="Toggle Romantic BGM Menu"
              >
                <Music className={`w-4 h-4 ${isPlaying ? "animate-spin text-purple-700" : "text-purple-600"}`} />
              </button>

              {/* Desktop View: Full Expanded Playlist Controller with Title, Skip buttons & Counter */}
              <div
                className={`hidden sm:flex h-9 px-2.5 rounded-full items-center gap-1.5 text-xs font-medium border transition-all ${
                  isPlaying
                    ? "bg-purple-100 text-purple-900 border-purple-300 shadow-sm ring-2 ring-purple-300/50"
                    : "bg-purple-50/70 text-purple-700 border-purple-200/80 hover:bg-purple-100/70"
                }`}
              >
                <button
                  onClick={playPrevTrack}
                  title="Previous Song"
                  className="p-1 text-purple-600 hover:text-purple-950 transition-colors"
                >
                  <SkipBack className="w-3 h-3" />
                </button>
                <button
                  onClick={toggleAudio}
                  className="flex items-center gap-1.5"
                  title={isPlaying ? "Pause Music" : "Play Playlist"}
                >
                  <Music className={`w-3.5 h-3.5 ${isPlaying ? "animate-spin text-purple-700" : "text-purple-600"}`} />
                  <span className="text-[11px] font-semibold max-w-[125px] truncate">
                    {isPlaying ? currentTrack.title : "Love BGMs 🎵"}
                  </span>
                </button>
                <button
                  onClick={playNextTrack}
                  title="Next Song"
                  className="p-1 text-purple-600 hover:text-purple-950 transition-colors"
                >
                  <SkipForward className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setMusicMenuOpen((prev) => !prev)}
                  title="View Playlist (7 Songs)"
                  className="ml-0.5 px-1 py-0.5 rounded-md bg-purple-200/60 text-purple-900 text-[10px] font-bold hover:bg-purple-300 transition-colors"
                >
                  {currentTrackIndex + 1}/{birthdayConfig.BGM_PLAYLIST.length}
                </button>
              </div>

              {/* Dropdown playlist menu */}
              <AnimatePresence>
                {musicMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-72 sm:w-80 p-3 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-purple-200 z-50 text-left"
                  >
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-purple-100">
                      <div className="flex items-center gap-1.5 text-purple-900 font-bold text-xs">
                        <Music className="w-3.5 h-3.5 text-purple-700" />
                        <span>Romantic Love BGMs ({birthdayConfig.BGM_PLAYLIST.length})</span>
                      </div>
                      <button
                        onClick={() => setMusicMenuOpen(false)}
                        className="text-purple-400 hover:text-purple-700 p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                      {birthdayConfig.BGM_PLAYLIST.map((track, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            playTrackByIndex(idx);
                            setMusicMenuOpen(false);
                          }}
                          className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                            currentTrackIndex === idx
                              ? "bg-purple-100/90 text-purple-950 font-bold border border-purple-300"
                              : "text-purple-800 hover:bg-purple-50"
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-[10px] font-mono text-purple-400 w-4">
                              {idx + 1}.
                            </span>
                            <div className="truncate">
                              <p className="truncate font-medium">{track.title}</p>
                              <p className="text-[10px] text-purple-500 font-normal">
                                {track.movie} • {track.composer}
                              </p>
                            </div>
                          </div>
                          {currentTrackIndex === idx && isPlaying && (
                            <span className="text-purple-700 text-[10px] animate-pulse">● Playing</span>
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-purple-100 flex items-center justify-between text-xs">
                      <button
                        onClick={playPrevTrack}
                        className="p-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 flex items-center gap-1 text-[11px]"
                      >
                        <SkipBack className="w-3 h-3" /> Prev
                      </button>
                      <button
                        onClick={toggleAudio}
                        className="px-3 py-1.5 rounded-full bg-purple-700 hover:bg-purple-800 text-white font-semibold flex items-center gap-1 text-xs shadow-xs"
                      >
                        {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        {isPlaying ? "Pause" : "Play"}
                      </button>
                      <button
                        onClick={playNextTrack}
                        className="p-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 flex items-center gap-1 text-[11px]"
                      >
                        Next <SkipForward className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
              onClick={() => {
                if (!slideshowUnlocked) {
                  setSlideshowModalOpen(true);
                } else {
                  setGalleryModalOpen(true);
                }
              }}
              className="px-4 py-1.5 rounded-full border border-purple-300 text-purple-900 hover:bg-purple-100/70 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              {!slideshowUnlocked && <Lock className="w-3 h-3 text-purple-600" />}
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

          {/* More Photos Card / Full Gallery (Locked until quiz is passed) */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => {
              if (!slideshowUnlocked) {
                setSlideshowModalOpen(true);
              } else {
                setGalleryModalOpen(true);
              }
            }}
            className="bg-gradient-to-b from-[#2e1065] to-[#1e0842] rounded-2xl overflow-hidden shadow-md border border-purple-400/40 p-4 text-center flex flex-col items-center justify-center cursor-pointer min-h-[160px] group"
          >
            <div className="w-10 h-10 rounded-full bg-purple-700/60 border border-purple-400/50 flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform">
              {!slideshowUnlocked ? (
                <Lock className="w-5 h-5 text-pink-300 animate-pulse" />
              ) : (
                <span className="text-xl font-bold">+</span>
              )}
            </div>
            <p className="text-sm font-semibold text-white flex items-center justify-center gap-1">
              <span>Full Gallery</span>
              {!slideshowUnlocked && <Lock className="w-3 h-3 text-pink-300" />}
            </p>
            <p className="text-[10px] text-purple-200/80 mt-0.5">
              {!slideshowUnlocked ? "Answer quiz to view all" : "Click to view all"}
            </p>
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
              {!slideshowUnlocked && (
                <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-purple-950/75 backdrop-blur-md text-white text-[10px] font-semibold flex items-center gap-1 shadow-sm border border-white/20">
                  <Lock className="w-2.5 h-2.5 text-pink-300" />
                  <span>Locked</span>
                </div>
              )}
            </div>
            <div className="space-y-1 mb-3">
              <h4 className="font-display text-base font-bold text-purple-950 flex items-center gap-1.5">
                <span>Memory Slideshow</span>
                {!slideshowUnlocked ? (
                  <Lock className="w-3.5 h-3.5 text-purple-500" />
                ) : (
                  <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                )}
              </h4>
              <p className="text-xs text-purple-800/80">
                {!slideshowUnlocked ? "Answer a love question to unlock! ♡" : "A beautiful journey together."}
              </p>
            </div>
            <button
              onClick={() => setSlideshowModalOpen(true)}
              className="w-full py-2 rounded-xl bg-purple-800 hover:bg-purple-900 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              {!slideshowUnlocked ? (
                <>
                  <Lock className="w-3.5 h-3.5 text-pink-200" />
                  <span>Unlock Memories →</span>
                </>
              ) : (
                <>
                  <Unlock className="w-3.5 h-3.5 text-pink-200" />
                  <span>Open Slideshow →</span>
                </>
              )}
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

                {/* Optional Photo / Profile Picture */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-purple-700" />
                      Your Photo (Optional)
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
                      <span>Click to upload your photo to show next to your name</span>
                    </label>
                  ) : (
                    <div className="flex items-center gap-3 p-2 rounded-xl bg-purple-50 border border-purple-200">
                      <img
                        src={wishImagePreview}
                        alt="Your profile preview"
                        className="w-12 h-12 object-cover rounded-full border-2 border-purple-400 shadow-xs"
                      />
                      <div className="text-xs text-purple-800">
                        <p className="font-semibold text-emerald-600">Your photo added! ♡</p>
                        <p className="text-[11px] text-purple-500">Will be shown as your profile picture next to your name</p>
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
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-fuchsia-600 fill-fuchsia-600/30" />
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-purple-950">
                    Wishes Wall
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-700 to-fuchsia-600 text-white text-[11px] font-bold shadow-xs">
                    {wishesList.length + 115}+ Wishes
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {isAdmin ? (
                    <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded-full shadow-2xs">
                      <span className="text-[11px] text-emerald-800 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Admin Mode
                      </span>
                      <button
                        type="button"
                        onClick={handleAdminLogout}
                        className="text-[10px] text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-0.5 hover:underline pl-1 border-l border-emerald-200"
                        title="Logout admin mode"
                      >
                        <LogOut className="w-2.5 h-2.5" />
                        Exit
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setAdminPinInput("");
                        setAdminPinError(null);
                        setAdminModalOpen(true);
                      }}
                      className="px-2.5 py-1 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-800 border border-purple-200 text-[11px] font-bold flex items-center gap-1 transition-all shadow-2xs hover:scale-105"
                      title="Admin Login to edit and delete wishes"
                    >
                      <Shield className="w-3.5 h-3.5 text-purple-600" />
                      Admin Login
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setAllWishesModalOpen(true)}
                    className="text-xs text-purple-700 font-bold hover:text-purple-900 underline flex items-center gap-1 transition-colors"
                  >
                    <span>View All Wall →</span>
                  </button>
                </div>
              </div>

              {adminActionNotice && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-xs font-semibold text-purple-900 flex items-center justify-between shadow-xs"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    {adminActionNotice}
                  </span>
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={handleResetWishes}
                      className="text-[10px] text-purple-600 hover:text-purple-950 underline font-bold"
                    >
                      Reset Defaults
                    </button>
                  )}
                </motion.div>
              )}

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
                      className="p-3.5 rounded-2xl bg-white border border-purple-100/90 shadow-xs flex items-start gap-3 hover:border-purple-300 transition-all group relative"
                    >
                      {/* User's Profile Picture / Avatar to identify who wished */}
                      {wish.imageUrl ? (
                        <div
                          onClick={() => setPreviewPhotoUrl(wish.imageUrl!)}
                          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-purple-400 shadow-sm cursor-pointer group/avatar relative hover:scale-105 transition-transform bg-purple-100"
                          title={`Photo of ${wish.name} (Click to zoom)`}
                        >
                          <img
                            src={wish.imageUrl}
                            alt={wish.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center transition-opacity">
                            <ZoomIn className="w-3.5 h-3.5 text-white" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-purple-600 to-fuchsia-500 text-white font-bold flex items-center justify-center text-xs sm:text-sm shrink-0 shadow-2xs">
                          {wish.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0 pr-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-purple-950 truncate">
                            {wish.name}
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-[10px] text-purple-400 font-sans">
                              {wish.timeAgo}
                            </span>
                            {isAdmin && (
                              <div className="flex items-center gap-1 bg-purple-50 p-0.5 rounded-lg border border-purple-200">
                                <button
                                  type="button"
                                  onClick={() => handleStartEditWish(wish)}
                                  className="p-1 rounded hover:bg-purple-200 text-purple-700 transition-colors"
                                  title={`Edit wish from ${wish.name}`}
                                >
                                  <Pencil className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteWish(wish.id, wish.name)}
                                  className="p-1 rounded hover:bg-rose-100 text-rose-600 transition-colors"
                                  title={`Delete wish from ${wish.name}`}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-purple-900/90 mt-1 leading-relaxed">
                          &ldquo;{wish.message}&rdquo;
                        </p>
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

      {/* 5. Kavithaigal Modal - LUXURY ROMANTIC GLASSMORPHISM */}
      <AnimatePresence>
        {kavithaiModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/70 backdrop-blur-xl overflow-hidden"
            onClick={() => setKavithaiModalOpen(false)}
          >
            {/* Ambient Floating Hearts in Backdrop */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: "100vh", opacity: 0, x: `${(i - 2.5) * 60}px` }}
                  animate={{
                    y: "-15vh",
                    opacity: [0, 0.45, 0.45, 0],
                    x: `${(i - 2.5) * 60 + (i % 2 === 0 ? 25 : -25)}px`,
                  }}
                  transition={{
                    duration: 7 + i * 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.9,
                  }}
                  className="absolute text-rose-300/40 text-2xl select-none"
                  style={{ left: `${15 + i * 14}%` }}
                >
                  ❤️
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 25 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-[2.25rem] bg-gradient-to-b from-white/95 via-purple-50/90 to-pink-50/90 border border-white/80 p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(147,51,234,0.35),0_0_40px_rgba(244,114,182,0.25)] relative text-center backdrop-blur-2xl overflow-hidden"
            >
              {/* Internal Glowing Ambient Orbs */}
              <div className="absolute -top-24 -left-24 w-56 h-56 rounded-full bg-gradient-to-br from-rose-300/35 to-fuchsia-400/20 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-56 h-56 rounded-full bg-gradient-to-tr from-purple-400/25 to-pink-300/35 blur-2xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setKavithaiModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-rose-100 text-purple-700 hover:text-rose-600 border border-purple-100/80 shadow-xs transition-all duration-200 z-10 hover:scale-105 active:scale-95"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Romantic Pill Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50/90 border border-rose-200/80 text-[11px] font-semibold text-rose-700 shadow-xs mb-3">
                <Sparkles className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
                <span>இதயத்தின் துடிப்பு</span>
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
              </div>

              {/* Modal Main Heading */}
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-purple-950 via-purple-800 to-rose-600 bg-clip-text text-transparent mb-1 flex items-center justify-center gap-2">
                <span>இதயம் சொல்லும் காதல்</span>
                <motion.span
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                  className="inline-block text-rose-500 drop-shadow-sm"
                >
                  ❤️
                </motion.span>
              </h3>
              <p className="text-xs sm:text-sm text-purple-700/85 mb-5 font-tamil font-medium tracking-wide">
                உனக்காக மட்டுமே எழுதப்பட்ட காதல் கவிதை ✨
              </p>

              {/* Luxury Romantic Glass Inset Poem Box */}
              <div className="relative p-6 sm:p-7 rounded-2xl bg-white/80 backdrop-blur-md border border-purple-200/80 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_10px_25px_-5px_rgba(168,85,247,0.12)]">
                {/* Decorative Quotation Accent Marks */}
                <div className="absolute top-2 left-3 text-3xl font-serif text-rose-300/40 select-none pointer-events-none">“</div>
                <div className="absolute bottom-2 right-3 text-3xl font-serif text-rose-300/40 select-none pointer-events-none">”</div>

                {/* Sub-header Date Pill with Poem Switcher */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <button
                    onClick={() => {
                      const idx = allKavithaiKeys.indexOf(selectedKavithaiKey);
                      const prevIdx = (idx - 1 + allKavithaiKeys.length) % allKavithaiKeys.length;
                      setSelectedKavithaiKey(allKavithaiKeys[prevIdx]);
                    }}
                    className="p-1.5 rounded-full bg-purple-100/80 hover:bg-purple-200 text-purple-700 hover:text-purple-900 transition-all shadow-xs hover:scale-105 active:scale-95"
                    title="முந்தைய கவிதை"
                    aria-label="Previous poem"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/70 border border-purple-200/60">
                    <Calendar className="w-3 h-3 text-purple-600" />
                    <span className="text-[10px] text-purple-700 font-bold uppercase tracking-wider">
                      {activeKavithai.displayDate} • இனிய பிறந்தநாள்
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      const idx = allKavithaiKeys.indexOf(selectedKavithaiKey);
                      const nextIdx = (idx + 1) % allKavithaiKeys.length;
                      setSelectedKavithaiKey(allKavithaiKeys[nextIdx]);
                    }}
                    className="p-1.5 rounded-full bg-purple-100/80 hover:bg-purple-200 text-purple-700 hover:text-purple-900 transition-all shadow-xs hover:scale-105 active:scale-95"
                    title="அடுத்த கவிதை"
                    aria-label="Next poem"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Poem Title */}
                <h5 className="font-serif font-bold text-purple-900 text-base sm:text-lg mb-3.5 flex items-center justify-center gap-2">
                  <span>{activeKavithai.themeTitle}</span>
                  <motion.span
                    key={activeKavithai.themeTitle}
                    animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 2.2 }}
                    className="inline-block text-purple-600"
                  >
                    💜
                  </motion.span>
                </h5>

                {/* Poem Verses */}
                <div key={selectedKavithaiKey} className="font-tamil text-sm sm:text-base text-purple-950 leading-[2.1] space-y-1.5 font-medium select-none">
                  {activeKavithai.lines.map((line, idx) => (
                    <p key={idx} className="transition-all hover:text-purple-700">
                      {line}
                    </p>
                  ))}
                </div>

                {/* Rose-Gold Shimmer Divider */}
                <div className="flex items-center justify-center gap-2 my-4">
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-rose-300" />
                  <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-300 animate-pulse" />
                  <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-rose-300" />
                </div>

                {/* Special Dedicated Wish */}
                <p className="font-tamil text-sm sm:text-base font-bold bg-gradient-to-r from-purple-900 via-rose-600 to-fuchsia-700 bg-clip-text text-transparent">
                  இனிய பிறந்தநாள் வாழ்த்துகள், என் உயிர் அழகி Aishu! ❤️ 🫶🏻 ♡
                </p>
              </div>

              {/* Romantic Action CTA Button */}
              <div className="mt-5">
                <button
                  onClick={() => {
                    triggerConfetti();
                    setKavithaiModalOpen(false);
                  }}
                  className="relative group overflow-hidden w-full py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-purple-700 via-fuchsia-600 to-rose-500 hover:from-purple-800 hover:via-fuchsia-700 hover:to-rose-600 text-white font-bold text-xs sm:text-sm shadow-[0_10px_25px_rgba(168,85,247,0.35)] hover:shadow-[0_15px_35px_rgba(236,72,153,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
                  <Heart className="w-4 h-4 text-pink-200 fill-pink-200 animate-pulse" />
                  <span>என் இதயம் உனக்கே ♡</span>
                  <Sparkles className="w-4 h-4 text-pink-200 fill-pink-200" />
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
                Memory Slideshow 📸
              </h3>

              {!slideshowUnlocked ? (
                /* Love Quiz Gate before Slideshow */
                <div className="py-3 sm:py-5">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-pink-500 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-500/25">
                    <Lock className="w-7 h-7 animate-pulse text-white" />
                  </div>

                  <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-purple-600 font-bold block mb-1">
                    Love Verification • Question {slideshowQuizStep} of 3
                  </span>
                  <p className="text-xs text-purple-700 mb-5 font-medium">
                    Answer with your heart to unlock our precious memories together! ♡
                  </p>

                  <motion.div
                    key={slideshowQuizStep}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="max-w-md mx-auto p-5 sm:p-6 rounded-2xl bg-purple-50/80 border border-purple-100 text-center"
                  >
                    {slideshowQuizStep === 1 ? (
                      <div>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-purple-950 mb-4">
                          1. Where is the happiest place in the universe for Venkat? 🌍💫
                        </h4>
                        <div className="space-y-2.5">
                          <button
                            type="button"
                            onClick={() => {
                              setSlideshowFeedback("Correct, my love! Right by your side forever! ♡");
                              setTimeout(() => {
                                setSlideshowQuizStep(2);
                                setSlideshowFeedback(null);
                              }, 600);
                            }}
                            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-purple-100/90 border-2 border-purple-300 text-purple-950 font-semibold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2"
                          >
                            <span>💖 Right beside his sweet AmuLuu (Aishu) forever! ♡</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSlideshowQuizError(true);
                              setSlideshowFeedback("Nope! Venkat's happiest place is only beside his AmuLuu! 🙈");
                              setTimeout(() => setSlideshowQuizError(false), 1200);
                            }}
                            className="w-full py-2.5 px-4 rounded-xl bg-white/70 hover:bg-purple-100/40 border border-purple-200 text-purple-800 text-xs shadow-2xs transition-all"
                          >
                            <span>Somewhere else far away</span>
                          </button>
                        </div>
                      </div>
                    ) : slideshowQuizStep === 2 ? (
                      <div>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-purple-950 mb-4">
                          2. What makes every single memory with you so magical? ✨
                        </h4>
                        <div className="space-y-2.5">
                          <button
                            type="button"
                            onClick={() => {
                              setSlideshowFeedback("Correct! One final love question... ♡");
                              setTimeout(() => {
                                setSlideshowQuizStep(3);
                                setSlideshowFeedback(null);
                              }, 600);
                            }}
                            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-purple-100/90 border-2 border-purple-300 text-purple-950 font-semibold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2"
                          >
                            <span>💖 Because you are my heart, my soul, and my forever love! 💍💖</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSlideshowQuizError(true);
                              setSlideshowFeedback("Wrong! It's you who turns every moment into pure magic! ♡");
                              setTimeout(() => setSlideshowQuizError(false), 1200);
                            }}
                            className="w-full py-2.5 px-4 rounded-xl bg-white/70 hover:bg-purple-100/40 border border-purple-200 text-purple-800 text-xs shadow-2xs transition-all"
                          >
                            <span>Just ordinary photographs</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-purple-950 mb-3">
                          3. Who is the girl who owns a special place in my heart, today and forever? 👑💖
                        </h4>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const clean = slideshowAnswerInput.trim().toLowerCase();
                            if (clean === "aishu" || clean === "amuluu" || clean === "amulu" || clean === "iswarya" || clean === "aish") {
                              triggerConfetti();
                              setSlideshowUnlocked(true);
                              setSlideshowFeedback(null);
                            } else {
                              setSlideshowQuizError(true);
                              setSlideshowFeedback("Wrong! Think of who owns my heart forever! 🙈❤️");
                              setTimeout(() => setSlideshowQuizError(false), 1200);
                            }
                          }}
                          className="space-y-4 pt-1"
                        >
                          <div className="flex items-center justify-center gap-2 max-w-xs mx-auto">
                            <input
                              type="text"
                              value={slideshowAnswerInput}
                              onChange={(e) => setSlideshowAnswerInput(e.target.value)}
                              placeholder="Type your answer..."
                              className="w-48 text-center font-semibold py-2.5 px-3.5 rounded-2xl border-2 border-purple-300 focus:border-purple-600 focus:outline-none bg-white text-purple-950 shadow-inner placeholder:text-purple-300 transition-all text-sm"
                              autoFocus
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

                    {slideshowFeedback && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`mt-4 p-2.5 rounded-xl text-xs font-semibold ${
                          slideshowQuizError
                            ? "bg-rose-100 text-rose-800 border border-rose-200"
                            : "bg-purple-100 text-purple-900 border border-purple-200"
                        }`}
                      >
                        {slideshowFeedback}
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              ) : (
                /* Natural Fit Photo Container: NEVER cuts off faces! */
                <>
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
                </>
              )}
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
                                "Heartbreak alert! 😭💔 Try again my queen, you definitely know this! 🥺❤️",
                                "Chellakutty! 🙈 Close your eyes and remember that magical day, Muu! 💖",
                                "En thangamey... 🥺 That's not it! The most romantic day of our life, remember? ✨",
                                "Aiyo paaru ivangala! 😜 My heart started racing on that day, recall it Muu! 🏃‍♂️💓",
                                "Konjam yosi da pondati! 🥰 That day changed my whole destiny with you! 💍",
                                "Oops wrong guess! 🤭 A clue: June month special magic! Search with love Muu! 🌸",
                                "En uyire! 🥹 Don't break my tiny heart, you know our anniversary date! 💔❤️",
                                "Aww sweet try, but no! 🙈 The day I held your hand and whispered my love, Muu! 🤝💜",
                                "Romba yosikkadha Muu! 😜 Just feel that heartbeat, the answer is right there! 💓",
                                "En azhage! 🥺 How can you miss the date that made us WE? Try once more! 💫",
                                "Aiyo en amuluu kutty! 🙈 Think deeply my queen, that golden day in our lives! 👑✨"
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
                        <div className="flex items-center gap-2.5">
                          {wish.imageUrl ? (
                            <div
                              onClick={() => setPreviewPhotoUrl(wish.imageUrl!)}
                              className="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-purple-400 shadow-xs cursor-pointer group/avatar relative hover:scale-105 transition-transform bg-purple-100"
                              title={`Photo of ${wish.name} (Click to zoom)`}
                            >
                              <img
                                src={wish.imageUrl}
                                alt={wish.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center transition-opacity">
                                <ZoomIn className="w-3 h-3 text-white" />
                              </div>
                            </div>
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-white font-bold flex items-center justify-center text-xs shadow-2xs">
                              {wish.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <span className="text-xs font-bold text-purple-950">
                            {wish.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-purple-400 font-sans">
                            {wish.timeAgo}
                          </span>
                          {isAdmin && (
                            <div className="flex items-center gap-1 ml-1 bg-white p-0.5 rounded-lg border border-purple-200">
                              <button
                                type="button"
                                onClick={() => handleStartEditWish(wish)}
                                className="p-1 rounded hover:bg-purple-100 text-purple-700 transition-colors"
                                title={`Edit wish from ${wish.name}`}
                              >
                                <Pencil className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteWish(wish.id, wish.name)}
                                className="p-1 rounded hover:bg-rose-100 text-rose-600 transition-colors"
                                title={`Delete wish from ${wish.name}`}
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-purple-900 leading-relaxed italic">
                        &ldquo;{wish.message}&rdquo;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 10. Admin Login Modal */}
      <AnimatePresence>
        {adminModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            onClick={() => setAdminModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm p-6 rounded-3xl bg-white border border-purple-200 shadow-2xl relative text-center"
            >
              <button
                type="button"
                onClick={() => setAdminModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-purple-100 text-purple-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-200 text-purple-800 flex items-center justify-center mx-auto mb-3 shadow-xs">
                <Shield className="w-6 h-6" />
              </div>

              <h3 className="font-display text-xl font-bold text-purple-950">
                Admin Access
              </h3>
              <p className="text-xs text-purple-600 mt-1">
                Enter your Admin PIN to unlock edit and delete controls on Wishes Wall.
              </p>

              <form onSubmit={handleAdminLogin} className="mt-5 space-y-4">
                <div className="space-y-1 text-left">
                  <label className="text-[11px] font-bold text-purple-900 block">
                    Admin PIN / Password
                  </label>
                  <input
                    type="password"
                    inputMode="numeric"
                    autoFocus
                    value={adminPinInput}
                    onChange={(e) => {
                      setAdminPinInput(e.target.value);
                      setAdminPinError(null);
                    }}
                    placeholder="Enter PIN..."
                    className="w-full px-4 py-2.5 text-center text-lg tracking-[0.3em] font-bold rounded-xl border border-purple-200 focus:outline-none focus:border-purple-600 bg-purple-50/50 text-purple-950 placeholder:tracking-normal placeholder:text-xs placeholder:font-normal placeholder:text-purple-400"
                  />
                  {adminPinError && (
                    <p className="text-[11px] text-rose-500 font-semibold pt-1 text-center">
                      {adminPinError}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setAdminModalOpen(false)}
                    className="flex-1 py-2 rounded-xl border border-purple-200 text-xs font-semibold text-purple-700 hover:bg-purple-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-purple-800 hover:bg-purple-900 text-xs font-semibold text-white shadow-md hover:scale-[1.02] transition-transform"
                  >
                    Unlock Admin 🔓
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 11. Edit Wish Modal (Admin Mode) */}
      <AnimatePresence>
        {editingWish && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            onClick={() => setEditingWish(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md p-6 rounded-3xl bg-white border border-purple-200 shadow-2xl relative text-left"
            >
              <button
                type="button"
                onClick={() => setEditingWish(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-purple-100 text-purple-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                  <Pencil className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-purple-950">
                    Edit Wish (Admin Mode)
                  </h3>
                  <p className="text-[11px] text-purple-500">
                    Modify the sender name, message, or attached photo
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveEditWish} className="space-y-3.5 mt-4">
                <div>
                  <label className="text-xs font-bold text-purple-900 block mb-1">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    value={editWishName}
                    onChange={(e) => setEditWishName(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-purple-200 text-xs text-purple-950 bg-purple-50/30 focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-purple-900 block mb-1">
                    Wish Message
                  </label>
                  <textarea
                    rows={4}
                    value={editWishMessage}
                    onChange={(e) => setEditWishMessage(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-purple-200 text-xs text-purple-950 bg-purple-50/30 focus:outline-none focus:border-purple-600 leading-relaxed resize-none"
                  />
                </div>

                {/* Attached Photo Controls for Admin */}
                <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-purple-600" />
                      Attached Photo
                    </span>
                    {editWishImageUrl && (
                      <button
                        type="button"
                        onClick={handleRemoveEditPhoto}
                        className="text-[11px] text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 hover:underline"
                        title="Remove photo from this wish"
                      >
                        <Trash2 className="w-3 h-3" />
                        Remove Photo
                      </button>
                    )}
                  </div>

                  {editWishImageUrl ? (
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-24 rounded-xl overflow-hidden border border-purple-300 bg-white shadow-2xs shrink-0 flex items-center justify-center">
                        <img
                          src={editWishImageUrl}
                          alt="Edit preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-xs space-y-2 flex-1">
                        <p className="text-[11px] text-purple-700 font-medium">
                          Photo is attached. You can change or remove it if it was uploaded wrongly.
                        </p>
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-purple-300 hover:bg-purple-100 text-purple-800 font-semibold text-[11px] cursor-pointer transition-colors shadow-2xs">
                          <Upload className="w-3 h-3" />
                          <span>Change Photo</span>
                          <input
                            ref={editFileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleEditImageUpload}
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-2">
                      <label className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-dashed border-purple-300 hover:bg-purple-100/80 text-purple-800 font-semibold text-xs cursor-pointer transition-all shadow-2xs">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload / Add Photo</span>
                        <input
                          ref={editFileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleEditImageUpload}
                        />
                      </label>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingWish(null)}
                    className="px-4 py-2 rounded-xl border border-purple-200 text-xs font-semibold text-purple-700 hover:bg-purple-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-purple-800 hover:bg-purple-900 text-xs font-semibold text-white shadow-md flex items-center gap-1.5 hover:scale-[1.02] transition-transform"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 12. Full-Screen Wish Photo Lightbox */}
      <AnimatePresence>
        {previewPhotoUrl && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setPreviewPhotoUrl(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl max-h-[90vh] flex flex-col items-center"
            >
              <button
                type="button"
                onClick={() => setPreviewPhotoUrl(null)}
                className="absolute -top-11 right-0 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
                title="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={previewPhotoUrl}
                alt="Enlarged wish photo"
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/20"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>


    </div>
  );
}
