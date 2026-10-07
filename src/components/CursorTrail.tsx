"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CursorTrail() {
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    let idCounter = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const newPoint = { x: e.clientX, y: e.clientY, id: idCounter++ };
      setTrail((prev) => [...prev, newPoint].slice(-20)); // Keep last 20 points
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {trail.map((point) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute w-4 h-4 bg-rose-sparkle/50 rounded-full blur-[2px] shadow-[0_0_10px_#FF2A6D]"
            style={{ left: point.x - 8, top: point.y - 8 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
