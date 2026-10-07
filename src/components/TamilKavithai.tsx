"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function TamilKavithai() {
  return (
    <section className="relative w-full py-32 px-6 flex flex-col items-center justify-center min-h-[80vh] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-rose-glow/10 to-transparent opacity-50 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-3xl glass-card rounded-[3rem] p-10 md:p-16 border-rose-gold/20 shadow-romantic text-center"
      >
        <Sparkles className="w-8 h-8 text-rose-gold mx-auto mb-8 animate-pulse" />
        
        <h2 className="text-3xl md:text-5xl font-serif text-rose-sparkle mb-12 leading-relaxed">
          காதல் கவிதை
        </h2>

        <div className="space-y-6 text-xl md:text-3xl text-white/90 font-serif leading-loose tracking-wide">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            உன் சிரிப்பில் என் உலகம் அடங்கும்,
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            உன் விழிகளில் என் வாழ்க்கை தொடங்கும்.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0, duration: 1 }}
          >
            நீ அருகில் இருந்தால்,
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.4, duration: 1 }}
            className="text-rose-gold font-bold"
          >
            இந்த நொடி கூட யுகமாக மாறும்... ❤️
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
