"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "@/config/birthdayConfig";

export function Passcode({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const handleInput = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      setError(false);
      
      if (newPin.length === 4) {
        setTimeout(() => {
          if (newPin === birthdayConfig.ADMIN_PIN) {
            onUnlock();
          } else {
            setError(true);
            setTimeout(() => setPin(""), 500);
          }
        }, 300);
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
    setError(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-midnight-950 backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-900/10 to-midnight-950" />

      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-ivory-100/60 font-sans tracking-[0.4em] uppercase text-xs mb-8">
          Enter Passcode
        </h2>

        <div className="flex gap-4 mb-12">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                x: error ? [-5, 5, -5, 5, 0] : 0,
                borderColor: error ? "#f43f5e" : pin.length > i ? "#D8B77A" : "rgba(255,255,255,0.2)",
                backgroundColor: pin.length > i ? "#D8B77A" : "transparent"
              }}
              transition={{ duration: 0.3 }}
              className="w-4 h-4 rounded-full border border-white/20"
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 md:gap-8 max-w-[280px]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleInput(num.toString())}
              className="w-16 h-16 rounded-full border border-white/10 text-ivory-100 text-xl font-sans hover:bg-white/5 active:bg-white/10 transition-colors flex items-center justify-center"
            >
              {num}
            </button>
          ))}
          <div /> {/* Empty space for bottom row */}
          <button
            onClick={() => handleInput("0")}
            className="w-16 h-16 rounded-full border border-white/10 text-ivory-100 text-xl font-sans hover:bg-white/5 active:bg-white/10 transition-colors flex items-center justify-center"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="w-16 h-16 text-ivory-100/50 text-sm tracking-widest font-sans hover:text-ivory-100 transition-colors flex items-center justify-center uppercase"
          >
            Del
          </button>
        </div>
        
        <p className="mt-12 text-rose-400/80 font-sans text-xs tracking-widest opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]" style={{ animationDelay: error ? "0s" : "10s" }}>
          {error ? "Incorrect Passcode" : ""}
        </p>
      </div>
    </motion.div>
  );
}
