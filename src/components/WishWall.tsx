"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Wish = {
  id: string;
  name: string;
  relationship: string;
  message: string;
  photo_url?: string;
  created_at: string;
  category: 'FAMILY' | 'FRIENDS' | 'SPECIAL' | 'ALL';
};

export function WishWall() {
  const [wishes, setWishes] = useState<Wish[]>([]);

  useEffect(() => {
    fetchWishes();
    if (!supabase) return;

    // Subscribe to new wishes
    const channel = supabase
      .channel('public:wishes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'wishes' }, (payload) => {
        setWishes((current) => [payload.new as Wish, ...current]);
      })
      .subscribe();

    return () => {
      supabase?.removeChannel(channel);
    };
  }, []);

  const fetchWishes = async () => {
    if (!supabase) return;

    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      // In case the DB doesn't have categories yet, we map a random category for the demo
      const mappedData = data.map(w => ({
        ...w,
        category: w.category || ['FAMILY', 'FRIENDS', 'SPECIAL'][Math.floor(Math.random() * 3)]
      })) as Wish[];
      setWishes(mappedData);
    }
  };

  const filteredWishes = wishes;

  return (
    <section className="relative w-full py-32 bg-midnight-900 overflow-hidden" id="wall">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-ivory-100 tracking-wide mb-4">
            A Wall Full of Love
          </h2>
          <p className="text-ivory-100/60 font-sans text-lg italic max-w-2xl mx-auto">
            Messages from the people who love you most.
          </p>
        </div>

        {/* Masonry Grid of Floating Glass Cards */}
        <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          <AnimatePresence>
            {filteredWishes.map((wish) => (
              <motion.div
                key={wish.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="break-inside-avoid relative p-6 md:p-8 bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-2xl hover:shadow-glow-rose transition-shadow group"
              >
                {wish.photo_url && (
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-6">
                    <Image
                      src={wish.photo_url}
                      alt={wish.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                <p className="text-ivory-100/90 font-serif text-lg leading-relaxed mb-6 italic">
                  "{wish.message}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-champagne-400 font-sans tracking-widest text-sm uppercase">
                      {wish.name}
                    </h4>
                    <span className="text-ivory-100/40 text-xs font-sans">
                      {wish.relationship || "Friend"}
                    </span>
                  </div>
                  <button className="text-rose-400/50 hover:text-rose-400 transition-colors">
                    <Heart className="w-5 h-5 fill-current" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
