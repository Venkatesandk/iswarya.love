import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Great_Vibes } from "next/font/google";
import "./globals.css";
import { birthdayConfig } from "@/config/birthdayConfig";

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const manrope = Manrope({ 
  subsets: ["latin"],
  variable: "--font-manrope",
});

const greatVibes = Great_Vibes({ 
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  title: birthdayConfig.WEBSITE_NAME,
  description: birthdayConfig.TAGLINE,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${cormorant.variable} ${manrope.variable} ${greatVibes.variable} font-sans bg-midnight-950 text-ivory-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
