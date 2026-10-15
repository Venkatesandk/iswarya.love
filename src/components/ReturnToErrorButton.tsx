"use client";

import React from "react";
import { Terminal } from "lucide-react";

interface ReturnToErrorButtonProps {
  onReturn: () => void;
}

export function ReturnToErrorButton({ onReturn }: ReturnToErrorButtonProps) {
  return (
    <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 pointer-events-auto">
      <button
        type="button"
        onClick={onReturn}
        title="System Notice"
        aria-label="Return to System Notice"
        className="group flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-black/40 hover:bg-violet-950/60 border border-white/5 hover:border-violet-500/30 text-violet-400/30 hover:text-violet-300 backdrop-blur-md opacity-25 hover:opacity-100 transition-all duration-300 cursor-pointer shadow-lg outline-none focus:opacity-100 focus:ring-1 focus:ring-violet-500/40"
      >
        <Terminal className="w-3 h-3 transition-transform duration-300 group-hover:scale-110" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-[10px] font-mono tracking-wider transition-all duration-300 group-hover:max-w-xs pr-0 group-hover:pr-1">
          SYSTEM NOTICE
        </span>
      </button>
    </div>
  );
}
