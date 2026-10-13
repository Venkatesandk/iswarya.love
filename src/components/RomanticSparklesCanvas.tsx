"use client";

import React, { useMemo } from "react";

/**
 * RomanticFloatingHearts Theme
 * Floating romantic hearts drifting upwards across the background.
 * Beautiful heart silhouettes with soft gradient fills, gentle sway, and dreamy opacities.
 * 100% hardware-accelerated CSS, pointer-events disabled, silky smooth on mobile & desktop.
 */
export function RomanticSparklesCanvas() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        left: `${(i * 4.6 + 2) % 96}%`,
        size: 14 + (i % 6) * 4, // 14px to 34px
        duration: 12 + (i % 7) * 2.5, // 12s to 27s gentle floating speed
        delay: -(i * 1.6), // evenly staggered initial heights
        swayDuration: 3.5 + (i % 4) * 1.2,
        opacity: 0.18 + (i % 4) * 0.08, // soft romantic translucency (18% - 42%)
        rotate: ((i * 19) % 36) - 18, // natural romantic tilt: -18deg to +18deg
        colorType: i % 4, // 0: Rose Pink, 1: Fuchsia Lavender, 2: Warm Blush, 3: Soft Ruby
      })),
    []
  );

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {hearts.map((h) => {
        const fillGradients = [
          "url(#heartGradRose)",
          "url(#heartGradLavender)",
          "url(#heartGradBlush)",
          "url(#heartGradRuby)",
        ];
        return (
          <div
            key={h.id}
            className="absolute -bottom-12"
            style={{
              left: h.left,
              animation: `heartFloatUp ${h.duration}s linear infinite`,
              animationDelay: `${h.delay}s`,
            }}
          >
            <div
              style={{
                animation: `heartSway ${h.swayDuration}s ease-in-out infinite alternate`,
                opacity: h.opacity,
                transform: `rotate(${h.rotate}deg)`,
              }}
            >
              {/* Crisp, recognizable romantic heart SVG */}
              <svg
                width={h.size}
                height={h.size}
                viewBox="0 0 24 24"
                fill={fillGradients[h.colorType]}
                stroke="rgba(255, 255, 255, 0.4)"
                strokeWidth="0.5"
                className="drop-shadow-xs"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>
        );
      })}

      {/* SVG Gradient Definitions for Romantic Hearts */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <linearGradient id="heartGradRose" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fb7185" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="heartGradLavender" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d946ef" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="heartGradBlush" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="heartGradRuby" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e11d48" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.75" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
