"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { birthdayConfig } from "@/config/birthdayConfig";
import { X } from "lucide-react";

export function MemoryGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-midnight-900 overflow-hidden" id="memories">
      
      {/* Chapter Header */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-20 text-center">
        <span className="text-rose-400 tracking-[0.3em] text-xs uppercase mb-4 font-sans block">
          Chapter 03
        </span>
        <h2 className="text-4xl md:text-6xl font-serif text-ivory-100 tracking-wide mb-6">
          {birthdayConfig.GALLERY.title}
        </h2>
        <p className="text-ivory-100/50 font-light text-lg md:text-xl max-w-2xl mx-auto font-sans">
          {birthdayConfig.GALLERY.subtitle}
        </p>
      </div>

      {/* Editorial Masonry/Asymmetric Grid */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {birthdayConfig.GALLERY.photos.map((photo, index) => {
            // Create asymmetric layout classes based on index
            let colSpan = "col-span-12 md:col-span-4";
            let marginTop = "mt-0";
            let yTransform = y1;

            if (index % 5 === 0) {
              colSpan = "col-span-12 md:col-span-8"; // Large feature image
              yTransform = y2;
            } else if (index % 5 === 1) {
              colSpan = "col-span-12 md:col-span-4";
              marginTop = "md:mt-32"; // Offset downwards
              yTransform = y3;
            } else if (index % 5 === 2) {
              colSpan = "col-span-12 md:col-span-5";
              yTransform = y1;
            } else if (index % 5 === 3) {
              colSpan = "col-span-12 md:col-span-7";
              marginTop = "md:mt-16";
              yTransform = y2;
            }

            return (
              <motion.div
                key={index}
                style={{ y: yTransform }}
                className={`${colSpan} ${marginTop} group cursor-pointer relative`}
                onClick={() => setSelectedPhoto(index)}
              >
                <div className="relative p-3 md:p-4 bg-white/[0.02] border border-white/5 backdrop-blur-sm rounded-xl transition-all duration-700 hover:bg-white/[0.05] hover:shadow-glow-rose hover:-translate-y-4">
                  <div className={`relative w-full overflow-hidden rounded-lg ${photo.size === 'large' ? 'aspect-[16/9]' : 'aspect-[3/4]'}`}>
                    <Image
                      src={photo.url}
                      alt={photo.caption}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105 filter saturate-50 group-hover:saturate-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <p className="mt-4 text-ivory-100/70 font-sans font-light text-sm italic text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {photo.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}

        </div>
      </div>

      {/* Cinematic Fullscreen Viewer */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-midnight-950/95 backdrop-blur-xl p-4 md:p-12 cursor-pointer"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(null);
              }}
              className="absolute top-6 left-6 md:top-12 md:right-12 md:left-auto z-[80] p-4 text-ivory-100/80 hover:text-rose-400 transition-colors bg-black/20 rounded-full backdrop-blur-sm"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl h-[80vh] flex flex-col items-center justify-center gap-8 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full shadow-2xl rounded-sm overflow-hidden border border-white/10">
                <Image
                  src={birthdayConfig.GALLERY.photos[selectedPhoto].url}
                  alt={birthdayConfig.GALLERY.photos[selectedPhoto].caption}
                  fill
                  className="object-contain"
                />
              </div>
              
              <div className="text-center">
                <span className="text-rose-400 font-handwriting text-3xl md:text-4xl block mb-2">
                  One of my favorite memories.
                </span>
                <p className="text-ivory-100/70 font-sans font-light tracking-wide uppercase text-sm">
                  {birthdayConfig.GALLERY.photos[selectedPhoto].caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
