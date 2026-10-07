"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { birthdayConfig } from "@/config/birthdayConfig";

export function DigitalScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill canvas with gold/champagne color
    ctx.fillStyle = "#D4AF37";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add text overlay
    ctx.font = "24px Cormorant Garamond";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("Scratch Here", canvas.width / 2, canvas.height / 2);

  }, []);

  const getPointerPos = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const scratch = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!isDrawing || isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getPointerPos(e);
    
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    checkRevealed();
  };

  const checkRevealed = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;
    const totalPixels = imageData.data.length / 4;

    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparentPixels++;
    }

    if (transparentPixels / totalPixels > 0.5) {
      setIsRevealed(true);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <section className="relative w-full py-32 bg-midnight-950 flex flex-col items-center justify-center overflow-hidden" id="scratch">
      <div className="relative z-10 w-full max-w-2xl px-6 text-center">
        
        <span className="text-rose-400 tracking-[0.3em] text-xs uppercase mb-4 font-sans block">
          A Little Secret
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-ivory-100 tracking-wide mb-6">
          {birthdayConfig.SCRATCH_CARD.title}
        </h2>
        <p className="text-ivory-100/60 font-sans text-lg mb-16 italic">
          "{birthdayConfig.SCRATCH_CARD.subtitle}"
        </p>

        <div className="relative w-full max-w-sm mx-auto aspect-video rounded-2xl overflow-hidden shadow-glow-gold border border-champagne-400/20 bg-ivory-100 flex items-center justify-center">
          
          {/* The Hidden Message */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <h3 className="text-2xl font-serif text-midnight-950 mb-2">You Unlocked It!</h3>
            <p className="text-burgundy-900 font-sans text-lg">
              {birthdayConfig.SCRATCH_CARD.hiddenMessage}
            </p>
          </div>

          {/* The Scratch Canvas */}
          <canvas
            ref={canvasRef}
            width={400}
            height={225}
            onMouseDown={(e) => { setIsDrawing(true); scratch(e); }}
            onMouseMove={scratch}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
            onTouchStart={(e) => { setIsDrawing(true); scratch(e); }}
            onTouchMove={scratch}
            onTouchEnd={() => setIsDrawing(false)}
            className={`absolute inset-0 w-full h-full cursor-crosshair transition-opacity duration-1000 ${isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          />
        </div>

      </div>
    </section>
  );
}
