export interface TamilKavithaiItem {
  id: string;
  dateKey?: string; // e.g. "2026-10-13"
  displayDate: string; // e.g. "13 October 2026"
  sectionHeading: string; // "இதயம் சொல்லும் காதல் ❤️"
  themeTitle: string; // e.g. "உன் சிரிப்பில் என் உலகம்"
  lines: string[];
  englishMeaning: string;
  sentiment: string;
}

export const SECTION_HEADING_TAMIL = "இதயம் சொல்லும் காதல் ❤️";

// Collection of 16 original Tamil romantic poems indexed by date (starting 13 October 2026)
export const tamilKavithaigalMap: Record<string, TamilKavithaiItem> = {
  "2026-10-13": {
    id: "kavithai-2026-10-13",
    displayDate: "13 October 2026",
    sectionHeading: SECTION_HEADING_TAMIL,
    themeTitle: "உன் சிரிப்பில் என் உலகம்",
    lines: [
      "உன் சிரிப்பில் என் உலகம் மலருதே,",
      "உன் பார்வையில் என் இதயம் கரையுதே,",
      "நீ அருகில் இருந்தால் போதும் கண்மணி,",
      "ஒவ்வொரு நாளும் காதலாய் மாறுதே! 💜"
    ],
    englishMeaning: "Your smile makes my world bloom,\nYour gaze melts my heart,\nMy love, having you near is enough,\nAnd every day turns into love.",
    sentiment: "Her Smile & Presence"
  },
  "2026-10-14": {
    id: "kavithai-2026-10-14",
    displayDate: "14 October 2026",
    sectionHeading: SECTION_HEADING_TAMIL,
    themeTitle: "நீயே என் வரம் ✨",
    lines: [
      "கடவுள் எனக்கு கொடுத்த மிக அழகான வரம் நீ,",
      "என் இருண்ட உலகில் வெளிச்சம் தந்த தேவதை நீ,",
      "என்றும் உன் முகம் மலர நான் இருப்பேன் துணையாய்,",
      "பிறந்தநாள் வாழ்த்துகள் என் வாழ்வின் காதலே! 🌸💍"
    ],
    englishMeaning: "You are the most beautiful blessing the heavens bestowed on me,\nThe angel who brought radiant light and hope into my world.\nI will forever walk beside you, keeping that precious smile alive,\nHappy Birthday to the greatest love of my life! 🌸💍",
    sentiment: "Birthday Angel & Blessing"
  },
  "2026-10-15": {
    id: "kavithai-2026-10-15",
    displayDate: "15 October 2026",
    sectionHeading: SECTION_HEADING_TAMIL,
    themeTitle: "விழிகள் பேசும் மொழி",
    lines: [
      "ஆயிரம் கவிதைகள் எழுதலாம் உன் கண்களைப் பார்த்து,",
      "அமைதியாய் நீ பார்க்கும்போது காலமும் நிற்குதே தோற்று,",
      "விழி பேசும் மொழியெல்லாம் காதலின் ரகசியம்,",
      "உன் பார்வை ஒன்றே என் வாழ்வின் அற்புதம்! ✨"
    ],
    englishMeaning: "A thousand poems could be written just gazing into your eyes,\nWhen you look at me quietly, even time stands still in defeat.\nThe quiet language of your eyes holds every secret of love,\nYour glance alone is the wonder of my existence.",
    sentiment: "Her Eyes"
  },
  "2026-10-16": {
    id: "kavithai-2026-10-16",
    displayDate: "16 October 2026",
    sectionHeading: SECTION_HEADING_TAMIL,
    themeTitle: "இணைந்த பயணம்",
    lines: [
      "கடந்து போகும் தூரமெல்லாம் வசந்தமாய் மாறுதே,",
      "உன் கரம் பிடித்த நொடியில் என் கவலைகள் தீருதே,",
      "வாழ்க்கைப் பயணத்தில் உன் நிழலாய் நான் இருப்பேன்,",
      "உன் பாதைகளில் பூக்கள் தூவி காத்து நிற்பேன்! 🌸"
    ],
    englishMeaning: "Every distance we walk together turns into blossoming spring,\nThe instant I hold your hand, all my worries disappear.\nThrough this journey of life, I will walk as your gentle shadow,\nAdorning every step of yours with flowers and tenderness.",
    sentiment: "Togetherness"
  },
  "2026-10-17": {
    id: "kavithai-2026-10-17",
    displayDate: "17 October 2026",
    sectionHeading: SECTION_HEADING_TAMIL,
    themeTitle: "இனிமையான குரல்",
    lines: [
      "பேசும் போது வீணை மீட்டுகிறாய் மெல்ல,",
      "உன் குரல் கேட்கும்போது மனதிற்குள் தென்றல்,",
      "பெயரை நீ அழைத்தால் போதும் அன்பே,",
      "அதுவே என் நாளின் மிக அழகான தொடக்கம்! 🎶"
    ],
    englishMeaning: "When you speak, you gently strum the melody of a veena,\nListening to your voice is like a fragrant breeze in my heart.\nJust hearing you call my name is all I need, my love,\nIt becomes the sweetest possible start to my day.",
    sentiment: "Her Voice"
  },
  "2026-10-18": {
    id: "kavithai-2026-10-18",
    displayDate: "18 October 2026",
    sectionHeading: SECTION_HEADING_TAMIL,
    themeTitle: "அன்பின் நினைவுகள்",
    lines: [
      "காற்றோடு மிதந்து வரும் உன் நினைவின் வாசம்,",
      "கண் மூடி யோசித்தால் நெஞ்சமெல்லாம் பாசம்,",
      "எத்தனை தூரம் இருந்தாலும் என் சுவாசம் நீயே,",
      "இதயத்தின் ஒவ்வொரு துடிப்பிலும் வாழ்பவள் நீயே! 💫"
    ],
    englishMeaning: "The gentle breeze carries the sweet fragrance of your thoughts,\nWhen I close my eyes, my entire soul overflows with tenderness.\nNo matter the distance, you remain my very breath,\nLiving inside every single beat of my heart.",
    sentiment: "Missing Her & Longing"
  },
  "2026-10-19": {
    id: "kavithai-2026-10-19",
    displayDate: "19 October 2026",
    sectionHeading: SECTION_HEADING_TAMIL,
    themeTitle: "எல்லையற்ற அன்பு",
    lines: [
      "சொற்களில் அடங்காத பெருங்காதல் இது,",
      "உனக்காகவே வாழும் என் உயிர் இது,",
      "வானம் உள்ள வரை, நிலவு தேயும் வரை,",
      "உன் மீது கொண்ட அன்பு என்றும் குறையாது! 🌙"
    ],
    englishMeaning: "This is a love far greater than words could ever hold,\nA soul that exists only to cherish and protect you.\nAs long as the skies stay endless and the moon shines bright,\nMy love for you will never fade or diminish.",
    sentiment: "Unconditional Love"
  },
  "2026-10-20": {
    id: "kavithai-2026-10-20",
    displayDate: "20 October 2026",
    sectionHeading: SECTION_HEADING_TAMIL,
    themeTitle: "இதழோரப் புன்னகை",
    lines: [
      "சிறு புன்னகையால் என் இருளை நீக்குகிறாய்,",
      "சில்லென்ற மழையாய் என் மனதில் பொழிகிறாய்,",
      "உன் சந்தோஷம் ஒன்றே என் ஒரே பிரார்த்தனை,",
      "எப்போதும் சிரித்திரு என் அன்பின் அரவணைப்பே! 🌷"
    ],
    englishMeaning: "With just one tender smile, you dispel all gloom from my life,\nYou shower upon my soul like a refreshing summer rain.\nYour radiant happiness is my only prayer,\nKeep smiling forever, my sweet embrace of love.",
    sentiment: "Her Smile & Happiness"
  },
  "2026-10-21": {
    id: "kavithai-2026-10-21",
    displayDate: "21 October 2026",
    sectionHeading: SECTION_HEADING_TAMIL,
    themeTitle: "கைகோர்த்த எதிர்காலம்",
    lines: [
      "விரலோடு விரல் கோர்த்து நடக்கும் நொடிகள்,",
      "வரமாக எனக்குக் கிடைத்த பொக்கிஷ வழிகள்,",
      "நாளை வரும் காலமெல்லாம் உன்னோடு மட்டுமே,",
      "என் உலகத்தின் வெளிச்சமே நீயொருத்தி மட்டுமே! 🤝💜"
    ],
    englishMeaning: "The moments our fingers intertwine as we walk together,\nAre precious treasures gifted into my destiny.\nAll the tomorrows to come belong solely with you,\nYou alone are the eternal sunrise of my world.",
    sentiment: "Hand in Hand"
  },
  "2026-10-22": {
    id: "kavithai-2026-10-22",
    displayDate: "22 October 2026",
    sectionHeading: SECTION_HEADING_TAMIL,
    themeTitle: "அமைதியான புகலிடம்",
    lines: [
      "உலகத்தின் இரைச்சலில் என் அமைதி நீயடி,",
      "அலைபாயும் மனதிற்கு அடைக்கலத் தீவடி,",
      "உன் மடியில் சாய்ந்தால் உலகமே மறக்கும்,",
      "உன் இதயம் மட்டுமே என் சாஸ்வத சொர்க்கம்! 🕊️"
    ],
    englishMeaning: "Amid the noisy chaos of this world, you are my sanctuary of calm,\nTo my wandering heart, you are the peaceful sheltered haven.\nResting near you, every worldly burden melts away,\nYour heart alone is my true and everlasting heaven.",
    sentiment: "Peaceful Presence"
  },
  "2026-10-23": {
    id: "kavithai-2026-10-23",
    displayDate: "23 October 2026",
    sectionHeading: SECTION_HEADING_TAMIL,
    themeTitle: "வாழ்வின் வரம்",
    lines: [
      "கோடி நட்சத்திரங்கள் வானில் மின்னினாலும்,",
      "நிலவாய் என் வானில் ஒளிர்ந்தது நீயே,",
      "ஆயிரம் ஜென்மங்கள் நான் வாழக் கேட்டாலும்,",
      "ஒவ்வொரு பிறவியிலும் என் துணையாய் வேண்டும் நீயே! ⭐"
    ],
    englishMeaning: "Though billions of stars sparkle across the night sky,\nIt was you who shone as the graceful moon in my life.\nEven if I were blessed to live a thousand lifetimes,\nIn every single lifetime, I would ask only for you.",
    sentiment: "Soulmate & Blessing"
  },
  "2026-10-24": {
    id: "kavithai-2026-10-24",
    displayDate: "24 October 2026",
    sectionHeading: SECTION_HEADING_TAMIL,
    themeTitle: "என்றும் உனக்காக",
    lines: [
      "எந்த சூழலிலும் உன் கரம் விடமாட்டேன்,",
      "கண்ணீர் வரும் முன் முத்தமிட்டுத் துடைப்பேன்,",
      "என் சுவாசக் காற்று தீரும் நொடி வரை,",
      "உன் புன்னகை காக்கும் அரணாய் இருப்பேன்! 🛡️❤️"
    ],
    englishMeaning: "In every turn of life, I will never let go of your hand,\nBefore a tear can touch your cheek, I will gently kiss it away.\nUntil the very last breath leaves this heart of mine,\nI will stand as the fortress safeguarding your smile.",
    sentiment: "Eternal Promise"
  },
  "2026-10-25": {
    id: "kavithai-2026-10-25",
    displayDate: "25 October 2026",
    sectionHeading: SECTION_HEADING_TAMIL,
    themeTitle: "காலை விடியல்",
    lines: [
      "விடியலின் முதல் கிரணம் உன் முகத்தை வருட,",
      "என் நாளின் முதல் சிந்தனை உன் நினைவில் தொடங்க,",
      "இனிய காலைப் பொழுதில் என் காதல் வணக்கம்,",
      "உன் ஒவ்வொரு நொடியும் மகிழ்ச்சியாய் மலரட்டும்! ☀️🌸"
    ],
    englishMeaning: "As the first rays of dawn caress your sweet face,\nThe very first thought of my day awakens with thoughts of you.\nSending you all my love on this beautiful morning,\nMay every single second of your day blossom with pure delight!",
    sentiment: "Wishing a Beautiful Day"
  },
  "2026-10-26": {
    id: "kavithai-2026-10-26",
    displayDate: "26 October 2026",
    sectionHeading: SECTION_HEADING_TAMIL,
    themeTitle: "உயிர் தீண்டும் காதல்",
    lines: [
      "உடலால் இருவர் ஆனால் உயிரால் ஒருவர் நாம்,",
      "காலங்கள் மாறினாலும் மாறாத கவிதை நாம்,",
      "என் இதயத்தில் நீ எழுதிய அன்புச் சுவடுகள்,",
      "என்றும் அழியாத நம் காதலின் சான்றுகள்! 💖"
    ],
    englishMeaning: "Two distinct souls united into one beating heart,\nA timeless poem that never fades as seasons change.\nThe sweet imprints of love you have written in my soul,\nAre eternal testimonies of our unbreakable devotion.",
    sentiment: "Togetherness & Soul Union"
  },
  "2026-10-27": {
    id: "kavithai-2026-10-27",
    displayDate: "27 October 2026",
    sectionHeading: SECTION_HEADING_TAMIL,
    themeTitle: "வாழ்வின் வசந்தம்",
    lines: [
      "நீ என் வாழ்வில் வந்த பிறகு தான் உணர்ந்தேன்,",
      "காதல் என்பது வெறும் வார்த்தை அல்ல,",
      "அது உன் கண்களில் வழியும் கனிவும்,",
      "என் உயிரில் நிறையும் உன் இருப்பும்தான்! 💐"
    ],
    englishMeaning: "Only after you entered my life did I truly learn,\nThat love is never just a simple word,\nIt is the immense kindness shining in your eyes,\nAnd your divine presence filling every pulse of my life.",
    sentiment: "Gratitude & Devotion"
  },
  "2026-10-28": {
    id: "kavithai-2026-10-28",
    displayDate: "28 October 2026",
    sectionHeading: SECTION_HEADING_TAMIL,
    themeTitle: "முடிவிலா நேசம்",
    lines: [
      "காலத்தின் எல்லைகளைக் கடந்து நிற்கும் நம் பாசம்,",
      "என் இதயத்தின் அரியாசனத்தில் என்றும் உன் வாசம்,",
      "எத்தனை பிறவிகள் எடுத்தாலும் என் ஆசை ஒன்றே,",
      "என்றும் உனக்காகவே துடிக்க வேண்டும் என் நெஞ்சே! 💍💜"
    ],
    englishMeaning: "Our bond stands victorious beyond the confines of time,\nUpon the sacred throne of my heart resides only your love.\nHowever many lifetimes may come, my prayer stays the same:\nThis heart of mine shall beat forever only for you.",
    sentiment: "Forever Yours"
  }
};

// Deterministic array for indexing
export const allTamilKavithaigal: TamilKavithaiItem[] = Object.values(tamilKavithaigalMap);
