import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        midnight: {
          900: "#0A0F1A", // Deep midnight navy
          950: "#05070D",
        },
        burgundy: {
          800: "#4A001F", // Deep wine
          900: "#310014", 
        },
        rose: {
          100: "#FCE8EB", // Warm ivory/rose tint
          300: "#E6A8B1",
          400: "#D4808C", // Soft rose
          500: "#C25969",
        },
        champagne: {
          400: "#E5C185", // Champagne gold
          500: "#D4AF37",
        },
        ivory: {
          100: "#FFFFF0", // Warm ivory
          200: "#FDF5E6",
        }
      },
      fontFamily: {
        serif: ["var(--font-cormorant)"],
        sans: ["var(--font-manrope)"],
        handwriting: ["var(--font-great-vibes)"],
      },
      backgroundImage: {
        'cinematic-gradient': 'linear-gradient(to bottom, #0A0F1A, #310014, #4A001F, #0A0F1A)',
      },
      boxShadow: {
        'glow-rose': '0 0 50px -10px rgba(212, 128, 140, 0.5)',
        'glow-gold': '0 0 50px -10px rgba(229, 193, 133, 0.4)',
      }
    },
  },
  plugins: [],
};
export default config;
