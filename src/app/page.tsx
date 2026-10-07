"use client";

import { useState } from "react";
import { CinematicOpening } from "@/components/CinematicOpening";
import { ParticleBackground } from "@/components/ParticleBackground";
import { HeroSection } from "@/components/HeroSection";
import { OurStoryTimeline } from "@/components/OurStoryTimeline";
import { MemoryGallery } from "@/components/MemoryGallery";
import { ReasonsILoveYou } from "@/components/ReasonsILoveYou";
import { SealedLetter } from "@/components/SealedLetter";
import { SecretSurprise } from "@/components/SecretSurprise";
import { BirthdayWishesForm } from "@/components/BirthdayWishesForm";
import { WishWall } from "@/components/WishWall";
import { VideoMessage } from "@/components/VideoMessage";
import { OurSongPlayer } from "@/components/OurSongPlayer";
import { BirthdayCake } from "@/components/BirthdayCake";
import { FinalCinematic } from "@/components/FinalCinematic";
import { CursorTrail } from "@/components/CursorTrail";

// New Additions
import { InteractiveStarMap } from "@/components/InteractiveStarMap";
import { VoiceNote } from "@/components/VoiceNote";
import { MemoryMap } from "@/components/MemoryMap";
import { DigitalScratchCard } from "@/components/DigitalScratchCard";

export default function Home() {
  const [entered, setEntered] = useState(false);

  const handleEnter = () => {
    setEntered(true);
  };

  return (
    <main className="relative min-h-screen bg-midnight-950 overflow-hidden">
      <ParticleBackground />
      <CursorTrail />
      
      {!entered ? (
        <CinematicOpening onEnter={handleEnter} />
      ) : (
        <div className="relative z-10 w-full flex flex-col items-center">
          <OurSongPlayer />
          
          <HeroSection />
          
          <InteractiveStarMap />
          
          <OurStoryTimeline />
          
          <MemoryMap />
          
          <MemoryGallery />
          
          <VoiceNote />
          
          <ReasonsILoveYou />
          
          <SealedLetter />
          
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
