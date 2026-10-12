"use client";

import { useState, useEffect } from "react";
import { LockedCountdownScreen } from "@/components/LockedCountdownScreen";
import { ThreeGateOverlay } from "@/components/ThreeGateOverlay";
import { ParticleBackground } from "@/components/ParticleBackground";
import { HeroSection } from "@/components/HeroSection";
import { TamilKavithai } from "@/components/TamilKavithai";
import { InteractiveStarMap } from "@/components/InteractiveStarMap";
import { OurStoryTimeline } from "@/components/OurStoryTimeline";
import { MemoryMap } from "@/components/MemoryMap";
import { MemoryGallery } from "@/components/MemoryGallery";
import { VoiceNote } from "@/components/VoiceNote";
import { ReasonsILoveYou } from "@/components/ReasonsILoveYou";
import { SealedLetter } from "@/components/SealedLetter";
import { OpenWhen } from "@/components/OpenWhen";
import { Quiz } from "@/components/Quiz";
import { DigitalScratchCard } from "@/components/DigitalScratchCard";
import { SecretSurprise } from "@/components/SecretSurprise";
import { BirthdayWishesForm } from "@/components/BirthdayWishesForm";
import { WishWall } from "@/components/WishWall";
import { VideoMessage } from "@/components/VideoMessage";
import { OurSongPlayer } from "@/components/OurSongPlayer";
import { BirthdayCake } from "@/components/BirthdayCake";
import { FinalCinematic } from "@/components/FinalCinematic";
import { CursorTrail } from "@/components/CursorTrail";
import { getKolkataDateInfo } from "@/lib/dailyLoveUtils";

export default function Home({
  searchParams,
}: {
  searchParams?: { date?: string; preview?: string };
}) {
  const initialDate = searchParams?.date;
  const initialUnlock = searchParams?.preview === "unlocked";

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [manualUnlock, setManualUnlock] = useState(initialUnlock);
  const [entered, setEntered] = useState(false);
  const [overrideDateKey, setOverrideDateKey] = useState<string | undefined>(initialDate);

  // Check URL parameters on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const dateParam = params.get("date");
      if (dateParam) {
        setOverrideDateKey(dateParam);
      }
      const previewParam = params.get("preview");
      if (previewParam === "unlocked") {
        setManualUnlock(true);
      }
    }
  }, []);

  // Real-time automatic unlock listener for 14 October 2026 00:00 IST
  useEffect(() => {
    const checkStatus = () => {
      const info = getKolkataDateInfo();
      if (info.isUnlocked) {
        setIsUnlocked(true);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleUnlock = () => {
    setManualUnlock(true);
  };

  const handleEnter = () => {
    setEntered(true);
  };

  const siteIsUnlocked = isUnlocked || manualUnlock;

  // 1. LOCKED STATE: Before 14 October 2026, 00:00 IST
  // Main surprise, photographs, memories, and gift content are strictly hidden
  if (!siteIsUnlocked) {
    return (
      <LockedCountdownScreen
        onUnlock={handleUnlock}
        overrideDateKey={overrideDateKey}
        onOverrideChange={setOverrideDateKey}
      />
    );
  }

  // 2. UNLOCKED STATE: From 14 October 2026 00:00 IST onwards (or via Admin Unlock)
  return (
    <main className="relative min-h-screen bg-midnight-950 overflow-hidden">
      {!entered && <ThreeGateOverlay onEnter={handleEnter} />}

      {entered && (
        <div className="relative z-10 w-full flex flex-col items-center">
          <ParticleBackground />
          <CursorTrail />
          <OurSongPlayer />

          <HeroSection />

          {/* Retain Daily Romantic Greeting & Tamil Kavithai in Unlocked Website */}
          <TamilKavithai overrideDateKey={overrideDateKey} />

          <InteractiveStarMap />

          <OurStoryTimeline />

          <MemoryMap />

          <MemoryGallery />

          <VoiceNote />

          <ReasonsILoveYou />

          <SealedLetter />

          <OpenWhen />

          <Quiz />

          <DigitalScratchCard />

          <SecretSurprise />

          <BirthdayWishesForm />

          <WishWall />

          <VideoMessage />

          <BirthdayCake />

          <FinalCinematic />
        </div>
      )}
    </main>
  );
}
