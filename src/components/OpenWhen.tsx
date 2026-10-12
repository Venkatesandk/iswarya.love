"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const envelopes = [
  {
    id: 1,
    title: "Open when...",
    subtitle: "You miss me",
    content: "Whenever you miss me, just know that I am thinking about you too. I'm always just a call away, and my heart is always with you.",
    color: "from-rose-400/20 to-champagne-400/20"
  },
  {
    id: 2,
    title: "Open when...",
    subtitle: "You feel low",
    content: "You are the strongest, most beautiful person I know. This is just a bad day, not a bad life. Take a deep breath, I believe in you.",
    color: "from-champagne-400/20 to-purple-400/20"
  },
  {
    id: 3,
    title: "Open when...",
    subtitle: "You need a smile",
    content: "Remember that time we couldn't stop laughing at the most random thing? Your smile is my favorite thing in the world. Keep smiling for me.",
    color: "from-purple-400/20 to-rose-400/20"
  }
];

export function OpenWhen() {
  const [openedId, setOpenedId] = useState<number | null>(null);

  return (
    <section className="relative w-full py-32 bg-midnight-950 flex flex-col items-center justify-center overflow-hidden" id="open-when">
      
      <div className="text-center mb-20 relative z-10 px-6">
        <span className="text-rose-400 tracking-[0.3em] text-xs uppercase mb-4 font-sans block">
          Chapter 08
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-ivory-100 tracking-wide mb-4">
          Open When...
        </h2>
        <p className="text-ivory-100/60 font-sans text-lg italic max-w-xl mx-auto">
          Letters for every mood, sealed with love.
        </p>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex flex-wrap justify-center gap-8 md:gap-12">
        {envelopes.map((env) => {
          const isOpened = openedId === env.id;
          
          return (
            <motion.div 
              key={env.id}
              className="relative w-full max-w-sm"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: env.id * 0.1 }}
            >
              {/* Envelope Flap */}
              <motion.div
                className={`absolute top-0 left-0 w-full h-[60%] bg-midnight-900 border border-white/10 origin-top z-30 transition-transform duration-700 ${isOpened ? '-rotate-x-180 opacity-0 pointer-events-none' : 'rotate-x-0 cursor-pointer hover:bg-midnight-800'}`}
                style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0)" }}
                onClick={() => setOpenedId(env.id)}
              >
                <div className="absolute inset-0 flex items-center justify-center flex-col top-[-20%]">
                  <div className="w-12 h-12 rounded-full bg-rose-900/30 border border-rose-400/30 flex items-center justify-center shadow-glow-rose backdrop-blur-sm">
                    <span className="text-rose-400 text-xl font-serif">❤️</span>
                  </div>
                  <span className="mt-4 text-xs font-sans tracking-widest text-champagne-400 uppercase">Tap to open</span>
                </div>
              </motion.div>

              {/* Envelope Body */}
              <div 
                className="relative w-full h-64 bg-midnight-800 border border-white/5 shadow-2xl rounded-sm z-20 flex flex-col items-center justify-end pb-8 cursor-pointer"
                onClick={() => !isOpened && setOpenedId(env.id)}
              >
                <div className="text-center px-6">
                  <h3 className="text-ivory-100/40 text-xs font-sans tracking-[0.2em] uppercase mb-2">{env.title}</h3>
                  <h4 className="text-2xl font-serif text-champagne-400 italic">{env.subtitle}</h4>
                </div>
              </div>

              {/* Letter Inside */}
              <AnimatePresence>
                {isOpened && (
                  <motion.div
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: -80, opacity: 1 }}
                    exit={{ y: 0, opacity: 0 }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    className="absolute inset-x-4 top-10 bottom-4 bg-[#F8F3EA] z-10 rounded-sm shadow-xl p-6 md:p-8 flex flex-col border border-[#E5C185]/30 overflow-y-auto custom-scrollbar"
                  >
                    <div className="w-full flex justify-between items-start mb-6">
                      <span className="font-handwriting text-2xl text-rose-900/40">Dear AmuLuu,</span>
                      <button 
                        onClick={() => setOpenedId(null)}
                        className="text-xs uppercase tracking-widest text-midnight-950/40 hover:text-rose-600 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                    <p className="font-serif text-midnight-950/80 leading-relaxed text-sm md:text-base">
                      {env.content}
                    </p>
                    <div className="mt-auto pt-6 text-right font-handwriting text-2xl text-rose-900/60">
                      Love, always.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
