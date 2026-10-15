"use client";

import React, { useState, useEffect, useRef } from "react";
import { Heart } from "lucide-react";

interface FictionalErrorScreenProps {
  onReveal: () => void;
}

export function FictionalErrorScreen({ onReveal }: FictionalErrorScreenProps) {
  const [clickCount, setClickCount] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [heartPulsing, setHeartPulsing] = useState(false);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  // Handle secret 3-click on tiny violet heart
  const handleSecretClick = (e: React.MouseEvent | React.TouchEvent | React.KeyboardEvent) => {
    e.stopPropagation(); // Prevent background click from resetting counter
    if (isTransitioning) return;

    // Reset previous timeout
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    const nextCount = clickCount + 1;
    setHeartPulsing(true);
    setTimeout(() => setHeartPulsing(false), 200);

    if (nextCount >= 3) {
      // 3 clicks achieved!
      setClickCount(3);
      setIsTransitioning(true);

      // Allow glitch/dissolve transition animation to play before revealing original site
      setTimeout(() => {
        onReveal();
      }, 950);
    } else {
      setClickCount(nextCount);
      // Reset counter if next click doesn't occur within 1.5 seconds
      resetTimerRef.current = setTimeout(() => {
        setClickCount(0);
      }, 1500);
    }
  };

  // Keyboard accessibility (Enter or Space)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSecretClick(e);
    }
  };

  // Background click resets the secret counter if interrupted
  const handleBackgroundClick = () => {
    if (clickCount > 0 && !isTransitioning) {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
      setClickCount(0);
    }
  };

  return (
    <main
      onClick={handleBackgroundClick}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#07050d] text-zinc-300 font-mono select-none overflow-hidden transition-all duration-1000 ${
        isTransitioning
          ? "opacity-0 scale-95 blur-sm filter"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Subtle CRT scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(18, 16, 26, 0) 50%, rgba(255, 255, 255, 0.4) 50%)",
          backgroundSize: "100% 4px",
        }}
        aria-hidden="true"
      />

      {/* Ambient center violet glow */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40"
        aria-hidden="true"
      >
        <div className="w-[520px] h-[520px] rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      {/* Screen Vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(5,3,10,0.85)_100%)]"
        aria-hidden="true"
      />

      {/* Subtle moving glitch scanline beam */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/25 to-transparent animate-[scanlineBeam_8s_linear_infinite]"
        aria-hidden="true"
      />

      {/* Transition Glitch Burst Overlay */}
      {isTransitioning && (
        <div
          className="pointer-events-none absolute inset-0 z-30 bg-violet-950/20 mix-blend-screen animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Central Terminal Container */}
      <section
        onClick={(e) => e.stopPropagation()} // Prevent card body click from resetting
        className="relative z-10 w-full max-w-xl mx-4 sm:mx-6 p-6 sm:p-10 rounded-2xl bg-[#0d091a]/85 border border-violet-500/20 shadow-[0_0_60px_-15px_rgba(139,92,246,0.18)] backdrop-blur-xl transition-all duration-300"
        aria-label="System Notice"
      >
        {/* Terminal Window Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-violet-500/15">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-950 border border-violet-600/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-violet-900/40 border border-violet-500/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500/30 border border-violet-400/50" />
          </div>
          <span className="text-[11px] font-mono tracking-wider text-violet-400/50 uppercase">
            terminal://notice.sys
          </span>
        </div>

        {/* System Notice Status Badge */}
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-violet-950/50 border border-violet-500/30 text-violet-300 text-xs font-mono tracking-wider uppercase mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
          <span>SYSTEM NOTICE: PROJECT STATUS UNKNOWN</span>
        </div>

        {/* Error Code & Title */}
        <h1 className="text-xl sm:text-2xl font-mono font-semibold text-zinc-100 tracking-tight flex flex-wrap items-center gap-2 mb-6">
          <span className="text-violet-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]">
            Error 404:
          </span>
          <span className="text-zinc-200">Feelings Not Found</span>
        </h1>

        {/* Emotional Message Body */}
        <div className="border-l-2 border-violet-500/30 pl-4 sm:pl-5 py-1 my-6 space-y-3.5 text-zinc-300/95 text-xs sm:text-sm leading-relaxed">
          <p>
            &ldquo;This little corner of the internet might look like a useless pile of code, unnecessary pixels, and a few broken dreams.
          </p>
          <p>
            Maybe it isn&apos;t perfect. Maybe it doesn&apos;t make sense to everyone.
          </p>
          <p>
            But someone spent hours building it, filling it with memories, love, and feelings that were difficult to put into words.
          </p>
          <p>
            Sometimes, what looks like nothing to someone else means everything to the person who created it.&rdquo;
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-violet-500/15 pt-4 mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs font-mono">
          <span className="text-violet-300/70 tracking-wide text-[11px] sm:text-xs">
            No errors can measure the feelings behind this project.
          </span>
          <span className="text-zinc-600 text-[10px] tracking-widest uppercase">
            DIAG_0x1410
          </span>
        </div>
      </section>

      {/* Hidden Three-Click Interaction: Tiny violet heart in corner */}
      <div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleSecretClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          aria-label="Diagnostic node"
          style={{ touchAction: "manipulation" }}
          className="group relative p-3 rounded-full cursor-pointer outline-none focus:ring-1 focus:ring-violet-500/30 transition-transform duration-300 active:scale-90"
        >
          {/* Subtle tiny violet heart icon */}
          <Heart
            className={`w-3.5 h-3.5 transition-all duration-300 ${
              heartPulsing
                ? "scale-125 text-violet-300 fill-violet-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                : clickCount > 0
                ? "text-violet-400 fill-violet-500/30 drop-shadow-[0_0_6px_rgba(168,85,247,0.5)] scale-110"
                : "text-violet-400/30 fill-transparent hover:text-violet-300/70 hover:scale-110"
            }`}
          />
        </button>
      </div>
    </main>
  );
}
