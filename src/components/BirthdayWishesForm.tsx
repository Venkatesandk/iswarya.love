"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ImagePlus, X, Send, Heart } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function BirthdayWishesForm() {
  const [formData, setFormData] = useState({ name: "", relationship: "", message: "" });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Please select an image smaller than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setStatus("loading");
    if (!supabase) {
      setStatus("error");
      return;
    }
    
    try {
      const { error } = await supabase.from("wishes").insert([
        { ...formData, photo_url: imagePreview },
      ]);
      if (error) throw error;
      setStatus("success");
      setFormData({ name: "", relationship: "", message: "" });
      setImagePreview(null);
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section className="relative w-full py-32 bg-midnight-950 flex flex-col items-center justify-center overflow-hidden" id="leave-wish">
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-rose-900/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-2xl px-6">
        <div className="text-center mb-16">
          <span className="text-rose-400 tracking-[0.3em] text-xs uppercase mb-4 font-sans block">
            Chapter 06
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-ivory-100 tracking-wide mb-4">
            Leave a Wish ❤️
          </h2>
          <p className="text-ivory-100/60 font-sans text-lg italic">
            There are people who have something to say. Add your message to her universe.
          </p>
        </div>

        <div className="glass-card bg-midnight-900/60 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-2xl shadow-[0_0_50px_rgba(229,193,133,0.1)]">
          {status === "success" ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
              <Heart className="w-16 h-16 text-rose-400 mx-auto mb-6 fill-current animate-pulse" />
              <h3 className="text-2xl font-serif text-ivory-100 mb-2">Thank you!</h3>
              <p className="text-ivory-100/60 font-sans">Your beautiful wish has been added to the wall.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs tracking-widest uppercase font-sans text-champagne-400 mb-2">Name</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-ivory-100 focus:outline-none focus:border-champagne-400 transition-colors font-sans placeholder-white/20" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase font-sans text-champagne-400 mb-2">Relationship / Category</label>
                  <input type="text" value={formData.relationship} onChange={(e) => setFormData({ ...formData, relationship: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-ivory-100 focus:outline-none focus:border-champagne-400 transition-colors font-sans placeholder-white/20" placeholder="e.g. Family, Best Friend, Colleague" />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-widest uppercase font-sans text-champagne-400 mb-2">Message</label>
                <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-ivory-100 focus:outline-none focus:border-champagne-400 transition-colors font-sans placeholder-white/20 resize-none" placeholder="Write something beautiful..." />
              </div>

              <div>
                <label className="block text-xs tracking-widest uppercase font-sans text-champagne-400 mb-2">Attach a Photo (Optional)</label>
                {!imagePreview ? (
                  <div onClick={() => fileInputRef.current?.click()} className="w-full border-2 border-dashed border-white/10 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-champagne-400/50 hover:bg-white/5 transition-all group">
                    <ImagePlus className="w-8 h-8 text-white/20 group-hover:text-champagne-400 mb-2 transition-colors" />
                    <span className="text-sm font-sans text-white/40 group-hover:text-ivory-100 transition-colors">Click to upload image</span>
                  </div>
                ) : (
                  <div className="relative w-full max-w-xs aspect-[4/3] rounded-lg overflow-hidden border border-white/10 group">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setImagePreview(null)} className="absolute top-2 right-2 p-2 bg-midnight-950/80 rounded-full text-white/50 hover:text-white hover:bg-rose-900 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={status === "loading"} className="w-full py-4 bg-champagne-400 text-midnight-950 rounded-lg font-sans tracking-[0.2em] text-sm font-bold shadow-[0_0_20px_rgba(229,193,133,0.3)] hover:shadow-[0_0_30px_rgba(229,193,133,0.5)] transition-shadow flex items-center justify-center gap-2 mt-8">
                {status === "loading" ? "SENDING..." : "ADD MY WISH"} <Send className="w-4 h-4" />
              </motion.button>
              
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
