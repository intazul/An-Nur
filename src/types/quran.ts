export interface SurahMeta {
  number: number;
  nameArabic: string;
  nameEnglish: string;
  nameUrdu: string;
  englishTranslation: string;
  revelationType: 'Meccan' | 'Medinan';
  numberOfAyahs: number;
}

export interface RelatedHadith {
  source: string; // e.g., "Sahih al-Bukhari 5006"
  narrator: string; // e.g., "Narrated by Abu Hurairah (RA)"
  textEnglish: string;
  textUrdu?: string;
  relevance: string; // How this Hadith illuminates the verse
}

export interface DeepTafsir {
  asbabAlNuzul?: string; // Context and occasion of revelation
  linguisticInsights?: string; // Classical Arabic roots and rhetorical elegance
  classicalExegesis: string; // Ibn Kathir, Al-Tabari, Al-Qurtubi
  spiritualTakeaway: string; // Actionable spiritual reflection for everyday life
}

export interface Ayah {
  numberInSurah: number;
  globalNumber: number;
  textArabic: string;
  textEnglish: string;
  textUrdu: string;
  textAssamese?: string;
  tafsirSummary?: string;
  deepTafsir?: DeepTafsir;
  relatedHadith?: RelatedHadith;
  audioUrl?: string;
  juz?: number;
}

export interface SurahDetail extends SurahMeta {
  bismillahPre?: boolean;
  ayahs: Ayah[];
}

export interface AudioBookmark {
  id: string;
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  timestampSeconds: number;
  reciterId: string;
  reciterName: string;
  note: string;
  createdAt: string;
}

export interface LastReadPosition {
  surahNumber: number;
  ayahNumber: number;
  surahName: string;
  updatedAt: string;
}

export interface DailyPrayers {
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
  tahajjud?: boolean;
  duha?: boolean;
}

export interface ImanDayRecord {
  date: string; // YYYY-MM-DD
  prayers: DailyPrayers;
  versesRead: number;
  dhikrCount: number;
  reflection: string;
  heartState?: 'peaceful' | 'seeking_forgiveness' | 'grateful' | 'reflective' | 'struggling';
  fasting?: boolean;
  charityDone?: boolean;
  salawatCount?: number;
}

export interface WaqfSignInfo {
  symbol: string;
  arabicName: string;
  name: string;
  ruleSimple: string; // The simplest one-line explanation
  instruction: string; // Practical guidance on what to do
  category: 'must_stop' | 'better_stop' | 'can_stop' | 'better_continue' | 'do_not_stop' | 'sajdah' | 'saktah';
  badgeColor: string;
}

export interface UserProfileData {
  name: string;
  dailyVerseGoal: number;
  preferredReciter: string;
  arabicFontSize: number;
  translationFontSize: number;
  arabicGlowMode: 'gold' | 'emerald' | 'lunar' | 'off';
  glowIntensity: 'subtle' | 'intense';
  calligraphyFont: 'amiri' | 'scheherazade';
  showEnglish: boolean;
  showUrdu: boolean;
  showAssamese: boolean;
  showTafsir: boolean;
  readingLayout: 'cards' | 'paragraph' | 'thematic'; // 'paragraph' = pure Mushaf page sliding | 'thematic' = Thematic paragraph study with topic & question | 'cards' = verse cards
  mushafPageMode?: 'flip' | 'scroll';
  mushafFontSize: number; // Small, refined and readable font size for Mushaf mode (e.g. 21px)
  showTajweedSigns: boolean; // Highlights stopping rules & guidance
  favoriteSurahs: number[];
  lastRead: LastReadPosition;
  notificationsEnabled: boolean;
  notificationTimes: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    eveningReflection: string;
  };
  recitationLanguageMode?: 'arabic' | 'urdu' | 'both'; // 'arabic' = Arabic only, 'urdu' = Urdu only, 'both' = Arabic then Urdu sequential
  preferredUrduReciter?: string; // 'shamshad' | 'farhat'
}

export type RecitationLanguageMode = 'arabic' | 'urdu' | 'both';

export interface Reciter {
  id: string;
  name: string;
  style: string;
  subfolder: string;
  language?: 'ar' | 'ur';
}

export interface DownloadedSurahInfo {
  surahNumber: number;
  nameEnglish: string;
  nameArabic: string;
  ayahCount: number;
  downloadedAt: string;
  sizeKb: number;
  hasAudio: boolean;
}
