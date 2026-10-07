import { WishItem } from './supabase';
import fs from 'fs';
import path from 'path';

// Pre-seeded sample wishes to populate the Wish Wall & Guestbook beautifully from day 1
const sampleWishes: WishItem[] = [
  {
    id: "wish-1",
    name: "Aria Vance",
    relationship: "Best Friend",
    message: "Happy Birthday Amuluu! ✨ You bring so much light and laughter into everyone's lives. May this year be your most magical one yet!",
    photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    approved: true,
    likes: 12
  },
  {
    id: "wish-2",
    name: "Marcus & Elena",
    relationship: "Family",
    message: "Wishing you a day filled with infinite joy, cozy coffee dates, and endless love! So proud of the amazing woman you are.",
    photo_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
    created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
    approved: true,
    likes: 18
  },
  {
    id: "wish-3",
    name: "Sophia Chen",
    relationship: "Close Friend",
    message: "Happy Birthday queen! 👑 Can't wait for our next trip and late-night stargazing sessions. Keep shining bright!",
    photo_url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400",
    created_at: new Date(Date.now() - 3600000 * 10).toISOString(),
    approved: true,
    likes: 9
  },
  {
    id: "wish-4",
    name: "David Miller",
    relationship: "Special Person",
    message: "To the most special girl in the universe—Happy Birthday! You deserve all the happiness this world has to offer.",
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    approved: true,
    likes: 24
  }
];

// Persistent local storage file path
const DATA_FILE = path.join(process.cwd(), 'data_wishes.json');

export function getLocalWishes(): WishItem[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error reading data_wishes.json", err);
  }
  // If file does not exist, save sampleWishes and return
  saveLocalWishes(sampleWishes);
  return sampleWishes;
}

export function saveLocalWishes(wishes: WishItem[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(wishes, null, 2), 'utf-8');
  } catch (err) {
    console.error("Error writing data_wishes.json", err);
  }
}

export function addLocalWish(wish: Omit<WishItem, 'id' | 'created_at' | 'likes' | 'approved'>): WishItem {
  const wishes = getLocalWishes();
  const newWish: WishItem = {
    ...wish,
    id: `wish-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    created_at: new Date().toISOString(),
    approved: true, // Default auto-approve for seamless instant demo experience
    likes: 0,
  };
  wishes.unshift(newWish);
  saveLocalWishes(wishes);
  return newWish;
}

export function likeLocalWish(id: string): WishItem | null {
  const wishes = getLocalWishes();
  const index = wishes.findIndex((w) => w.id === id);
  if (index !== -1) {
    wishes[index].likes += 1;
    saveLocalWishes(wishes);
    return wishes[index];
  }
  return null;
}

export function updateWishApproval(id: string, approved: boolean): boolean {
  const wishes = getLocalWishes();
  const index = wishes.findIndex((w) => w.id === id);
  if (index !== -1) {
    wishes[index].approved = approved;
    saveLocalWishes(wishes);
    return true;
  }
  return false;
}

export function deleteLocalWish(id: string): boolean {
  let wishes = getLocalWishes();
  const initialLength = wishes.length;
  wishes = wishes.filter((w) => w.id !== id);
  if (wishes.length !== initialLength) {
    saveLocalWishes(wishes);
    return true;
  }
  return false;
}
