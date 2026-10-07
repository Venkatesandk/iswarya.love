"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { birthdayConfig } from "@/config/birthdayConfig";
import { Heart, RotateCcw, Share } from "lucide-react";

export function FinalCinematic() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Reveal sequence based on scroll position
  const opacity1 = useTransform(scrollYProgress, [0.05, 0.15, 0.25, 0.3], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.45, 0.55, 0.65, 0.7], [0, 1, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 0.9], [0, 1, 1, 0]);
  const finalReveal = useTransform(scrollYProgress, [0.9, 0.95], [0, 1]);

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // In a full implementation, this could also reset the global `entered` state in page.tsx
    // to trigger the CinematicOpening again, but scrolling to top is a solid fallback.
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: birthdayConfig.WEBSITE_NAME,
          text: birthdayConfig.TAGLINE,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed", err);
      }
    }
  };

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] bg-midnight-950" id="finale">
      {/* Sticky container that stays fixed while scrolling through the 300vh */}
      <div className="sticky top-0 w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden">
        
        {/* Deep night sky background */}
        <motion.div 
          style={{ opacity: scrollYProgress }}
          className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-[#030508] to-[#010203]"
        />
        <motion.div 
          style={{ opacity: scrollYProgress }}
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-80" 
        />

        {/* Narrative Sequence */}
        <div className="relative z-10 w-full max-w-4xl px-6 text-center h-[40vh] flex items-center justify-center">
          <div className="absolute w-full">
            <motion.p style={{ opacity: opacity1 }} className="text-2xl md:text-4xl font-serif text-ivory-100 font-light mb-8 absolute w-full -translate-y-1/2 top-1/2 left-0">
              "If I could give you one thing..."
            </motion.p>
            <motion.p style={{ opacity: opacity2 }} className="text-2xl md:text-4xl font-serif text-ivory-100 font-light mb-8 absolute w-full -translate-y-1/2 top-1/2 left-0">
              "...it would be the ability to see yourself through my eyes."
            </motion.p>
            <motion.p style={{ opacity: opacity3 }} className="text-2xl md:text-4xl font-serif text-ivory-100 font-light mb-8 absolute w-full -translate-y-1/2 top-1/2 left-0">
              "Maybe then you'd understand..."
            </motion.p>
            <motion.p style={{ opacity: opacity4 }} className="text-2xl md:text-4xl font-serif text-champagne-400 font-light absolute w-full -translate-y-1/2 top-1/2 left-0 italic">
              "...how incredibly special you are to me."
            </motion.p>
          </div>
        </div>

        {/* Final Lockup Reveal */}
        <motion.div 
          style={{ opacity: finalReveal, scale: finalReveal }}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-midnight-950/90 backdrop-blur-sm"
        >
          <div className="text-center px-6">
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif text-ivory-100 tracking-widest mb-4">
              HAPPY BIRTHDAY
            </h1>
            <h2 className="text-6xl md:text-9xl lg:text-[10rem] font-handwriting text-champagne-400 mb-8 leading-none">
              {birthdayConfig.HER_NAME.toUpperCase()} <span className="text-rose-400">❤️</span>
            </h2>
            <p className="text-champagne-400 tracking-[0.5em] text-sm md:text-xl uppercase font-sans font-light mb-12">
              14 • 10 • 2026
            </p>
            <p className="text-xl md:text-3xl font-serif text-ivory-100/80 italic mb-8">
              "{birthdayConfig.FINAL_MESSAGE.closingLove}"
            </p>
            <p className="text-lg md:text-xl font-serif text-champagne-400/90 italic mb-24 max-w-2xl mx-auto leading-relaxed">
              "உன்னை பார்த்த நாள் முதல் என் இதயம் உனக்காக மட்டுமே துடிக்கிறது. உன் ஒரு புன்னகை என் வாழ்வை முழுமையாக்குகிறது. என் அன்பே, என் அழகே, பிறந்தநாள் வாழ்த்துக்கள்!"
            </p>

            {/* Interaction Footer */}
            <div className="flex flex-col items-center gap-6">
              <span className="text-xs tracking-[0.3em] font-sans text-ivory-100/40 uppercase">
                KEEP THIS MEMORY ✨
              </span>
              <div className="flex items-center gap-6">
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-ivory-100 hover:bg-white/10 hover:border-champagne-400 transition-all font-sans text-sm tracking-widest"
                >
                  Share <Share className="w-4 h-4 ml-1" />
                </button>
                <button 
                  onClick={handleReplay}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-champagne-400 text-midnight-950 font-bold hover:shadow-[0_0_20px_rgba(229,193,133,0.4)] transition-all font-sans text-sm tracking-widest"
                >
                  Replay Experience <RotateCcw className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
