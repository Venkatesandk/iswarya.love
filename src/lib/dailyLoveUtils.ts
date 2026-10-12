import { dailyGreetingsMap, fallbackGreetings, DailyGreeting } from "../data/dailyGreetings";
import { tamilKavithaigalMap, allTamilKavithaigal, TamilKavithaiItem } from "../data/tamilKavithaigal";

// Official IST Unlock Target: 14 October 2026 00:00:00 IST (+05:30)
export const UNLOCK_TARGET_IST_STRING = "2026-10-14T00:00:00+05:30";
export const UNLOCK_TARGET_TIMESTAMP = new Date(UNLOCK_TARGET_IST_STRING).getTime();

// Starting date for Tamil Kavithai: 13 October 2026 00:00:00 IST
export const KAVITHAI_START_DATEKEY = "2026-10-13";

export interface KolkataDateInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  dateKey: string; // "YYYY-MM-DD"
  formattedDisplayDate: string; // e.g. "12 October 2026"
  formattedShortDate: string; // e.g. "12 October"
  isBefore13Oct: boolean;
  shouldShowKavithai: boolean;
  isUnlocked: boolean;
}

/**
 * Extracts date parts strictly in Asia/Kolkata timezone
 */
export function getKolkataDateInfo(currentMs: number = Date.now()): KolkataDateInfo {
  const d = new Date(currentMs);

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(d);
  const partMap: Record<string, string> = {};
  for (const part of parts) {
    partMap[part.type] = part.value;
  }

  const year = parseInt(partMap.year, 10);
  const month = parseInt(partMap.month, 10);
  const day = parseInt(partMap.day, 10);
  const hour = parseInt(partMap.hour, 10);
  const minute = parseInt(partMap.minute, 10);
  const second = parseInt(partMap.second, 10);

  const pad = (n: number) => String(n).padStart(2, "0");
  const dateKey = `${year}-${pad(month)}-${pad(day)}`;

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = monthNames[month - 1] || "October";
  const formattedDisplayDate = `${day} ${monthName} ${year}`;
  const formattedShortDate = `${day} ${monthName}`;

  // Check conditions
  const isBefore13Oct = dateKey < KAVITHAI_START_DATEKEY;
  const shouldShowKavithai = !isBefore13Oct;
  const isUnlocked = currentMs >= UNLOCK_TARGET_TIMESTAMP;

  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    dateKey,
    formattedDisplayDate,
    formattedShortDate,
    isBefore13Oct,
    shouldShowKavithai,
    isUnlocked,
  };
}

/**
 * Deterministically get the daily romantic greeting for a dateKey
 */
export function getDailyGreetingForDate(dateKey: string): DailyGreeting {
  if (dailyGreetingsMap[dateKey]) {
    return dailyGreetingsMap[dateKey];
  }

  // Parse YYYY-MM-DD
  const [y, m, d] = dateKey.split("-").map((v) => parseInt(v, 10) || 0);
  const hash = Math.abs(y * 372 + m * 31 + d);
  const index = hash % fallbackGreetings.length;
  const item = fallbackGreetings[index];

  return {
    ...item,
    displayDate: `${d} October`,
  };
}

/**
 * Deterministically get the Tamil Kavithai for a dateKey
 */
export function getTamilKavithaiForDate(dateKey: string): TamilKavithaiItem {
  if (tamilKavithaigalMap[dateKey]) {
    return tamilKavithaigalMap[dateKey];
  }

  // Fallback indexing across all 16 poems without repeating consecutive days
  const [y, m, d] = dateKey.split("-").map((v) => parseInt(v, 10) || 0);
  const hash = Math.abs(y * 372 + m * 31 + d);
  const index = hash % allTamilKavithaigal.length;
  return allTamilKavithaigal[index];
}

/**
 * Calculate countdown time remaining until 14 October 2026 00:00 IST
 */
export interface TimeRemaining {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isUnlocked: boolean;
}

export function getTimeRemaining(currentMs: number = Date.now()): TimeRemaining {
  const diff = UNLOCK_TARGET_TIMESTAMP - currentMs;

  if (diff <= 0) {
    return {
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isUnlocked: true,
    };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return {
    totalMs: diff,
    days,
    hours,
    minutes,
    seconds,
    isUnlocked: false,
  };
}
