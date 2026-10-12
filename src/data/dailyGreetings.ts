export interface DailyGreeting {
  dateKey?: string; // "YYYY-MM-DD"
  displayDate: string; // e.g. "12 October"
  dayTitle: string; // e.g. "A Little Thought for You"
  heading: string; // "Today's Little Message for You, AmuLuu 💜"
  message: string;
  emoji: string;
}

// Predefined collection of romantic messages indexed by date
export const dailyGreetingsMap: Record<string, DailyGreeting> = {
  "2026-10-10": {
    displayDate: "10 October",
    dayTitle: "Counting Down",
    heading: "Today's Little Message for You, AmuLuu 💜",
    message: "Counting down every heartbeat until we celebrate the most special person in this universe. You make my entire life brighter, my Aishu. ✨",
    emoji: "💫",
  },
  "2026-10-11": {
    displayDate: "11 October",
    dayTitle: "Whisper of Love",
    heading: "Today's Little Message for You, AmuLuu 💜",
    message: "Just a gentle morning reminder: you are deeply cherished, endlessly adored, and loved beyond what words could ever say. 🌸",
    emoji: "🌸",
  },
  "2026-10-12": {
    displayDate: "12 October",
    dayTitle: "A Little Thought for You",
    heading: "Today's Little Message for You, AmuLuu 💜",
    message: "Some people make ordinary days extraordinary. You are that person in my life, AmuLuu. 💜",
    emoji: "💜",
  },
  "2026-10-13": {
    displayDate: "13 October",
    dayTitle: "One Day Closer",
    heading: "Today's Little Message for You, AmuLuu 💜",
    message: "One more day, one more reason to smile, and one more little surprise waiting just for you, my sweet Aishu. ❤️",
    emoji: "❤️",
  },
  "2026-10-14": {
    displayDate: "14 October",
    dayTitle: "Your Special Day",
    heading: "Today's Little Message for You, AmuLuu 💜",
    message: "Happy Birthday, my dearest AmuLuu (Aishu)! Today, the world celebrates you, and my heart celebrates the happiness you bring into my life. 🎂💜",
    emoji: "🎂",
  },
  "2026-10-15": {
    displayDate: "15 October",
    dayTitle: "Endless Celebration",
    heading: "Today's Little Message for You, AmuLuu 💜",
    message: "The celebration of you doesn't end with your birthday. Every sunrise with you is a gift, and every moment is worth celebrating, AmuLuu. ✨",
    emoji: "✨",
  },
  "2026-10-16": {
    displayDate: "16 October",
    dayTitle: "Morning Sunshine",
    heading: "Today's Little Message for You, AmuLuu 💜",
    message: "Waking up knowing you are in this world makes everything so much brighter. Have the sweetest and most joyful day, my love Aishu. ☀️💜",
    emoji: "☀️",
  },
  "2026-10-17": {
    displayDate: "17 October",
    dayTitle: "Thinking of You",
    heading: "Today's Little Message for You, AmuLuu 💜",
    message: "Whenever you feel tired today, remember there's someone whose whole world revolves around your happiness and beautiful smile, AmuLuu. 🌙💜",
    emoji: "🌙",
  },
  "2026-10-18": {
    displayDate: "18 October",
    dayTitle: "Melody of Joy",
    heading: "Today's Little Message for You, AmuLuu 💜",
    message: "Your laughter is my favorite song, and your happiness is my favorite dream come true. Never stop smiling, AmuLuu. 🎵💜",
    emoji: "🎵",
  },
  "2026-10-19": {
    displayDate: "19 October",
    dayTitle: "Grateful Heart",
    heading: "Today's Little Message for You, AmuLuu 💜",
    message: "Thank you for being the calm in my storm and the sweetest comfort in my life. I am eternally grateful to have found you, Aishu. ☕❤️",
    emoji: "☕",
  },
  "2026-10-20": {
    displayDate: "20 October",
    dayTitle: "My Safe Haven",
    heading: "Today's Little Message for You, AmuLuu 💜",
    message: "Out of 8 billion people on this planet, my heart found its safest, warmest home right beside you, AmuLuu. 🏡💖",
    emoji: "🏡",
  },
  "2026-10-21": {
    displayDate: "21 October",
    dayTitle: "Radiant Soul",
    heading: "Today's Little Message for You, AmuLuu 💜",
    message: "No matter how busy today gets, pause and smile. You possess the purest heart and the most radiant soul I have ever known, my Aishu. 🪞✨",
    emoji: "🪞",
  },
  "2026-10-22": {
    displayDate: "22 October",
    dayTitle: "Warmest Hugs",
    heading: "Today's Little Message for You, AmuLuu 💜",
    message: "Sending you an invisible hug, a thousand warm kisses, and all my love to carry you effortlessly through today, AmuLuu. 🤗💜",
    emoji: "🤗",
  },
  "2026-10-23": {
    displayDate: "23 October",
    dayTitle: "Written in Stars",
    heading: "Today's Little Message for You, AmuLuu 💜",
    message: "Life with you feels like poetry written in the stars. Every chapter with you is my favorite story, Aishu. 🌌❤️",
    emoji: "🌌",
  },
  "2026-10-24": {
    displayDate: "24 October",
    dayTitle: "Irreplaceable",
    heading: "Today's Little Message for You, AmuLuu 💜",
    message: "Just in case no one told you today: you are irreplaceable, breathtaking, and everything I ever hoped and prayed for, AmuLuu. 🌷💜",
    emoji: "🌷",
  },
  "2026-10-25": {
    displayDate: "25 October",
    dayTitle: "Eternal Memories",
    heading: "Today's Little Message for You, AmuLuu 💜",
    message: "Every memory we've made is etched into my soul, and I can't wait to create a million more beautiful memories with you, my sweet Aishu. 📸💖",
    emoji: "📸",
  },
};

// Fallback pool for dates beyond October 25 (deterministic modulo lookup)
export const fallbackGreetings: DailyGreeting[] = [
  {
    displayDate: "Today",
    dayTitle: "My Whole World",
    heading: "Today's Little Message for You, AmuLuu 💜",
    message: "You are the sweetest thought I wake up to and the peaceful dream I fall asleep with. Always and forever yours, AmuLuu. 💜",
    emoji: "💜",
  },
  {
    displayDate: "Today",
    dayTitle: "A Gentle Whisper",
    heading: "Today's Little Message for You, AmuLuu 💜",
    message: "Wherever you go today, know that you are wrapped in my love and prayers. Have a magical day, AmuLuu (Aishu)! ✨",
    emoji: "✨",
  },
  {
    displayDate: "Today",
    dayTitle: "Pure Happiness",
    heading: "Today's Little Message for You, AmuLuu 💜",
    message: "Nothing in this world compares to the happiness I feel when you smile. Keep shining, my Aishu. 🌸",
    emoji: "🌸",
  },
  {
    displayDate: "Today",
    dayTitle: "Always Beside You",
    heading: "Today's Little Message for You, AmuLuu 💜",
    message: "Through every high and low, I will always be right here, cheering for you and loving you more each day, AmuLuu. ❤️",
    emoji: "❤️",
  },
];
