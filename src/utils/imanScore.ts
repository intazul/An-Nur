import { DailyPrayers, ImanDayRecord, UserProfileData } from '../types/quran';

export const FARD_PRAYER_KEYS: (keyof DailyPrayers)[] = [
  'fajr',
  'dhuhr',
  'asr',
  'maghrib',
  'isha',
];

export const NAWAFIL_PRAYER_KEYS: (keyof DailyPrayers)[] = ['tahajjud', 'duha'];

export const DEFAULT_DAILY_VERSE_GOAL = 10;
export const DEFAULT_DAILY_DHIKR_GOAL = 33;
export const DEFAULT_DAILY_HADITH_GOAL = 5;

export interface ImanScoreBreakdown {
  totalPercent: number;
  completedFard: number;
  completedNawafil: number;
  versesRead: number;
  dhikrCount: number;
  hadithsStudied: number;
  verseGoal: number;
  dhikrGoal: number;
  hadithGoal: number;
  prayersPercent: number;
  versesPercent: number;
  dhikrPercent: number;
  hadithsPercent: number;
  prayersPoints: number; // out of 40
  versesPoints: number; // out of 20
  dhikrPoints: number; // out of 20
  hadithPoints: number; // out of 20
  bonusPoints: number; // Nawafil / Heart State bonus (capped at total 100)
}

/**
 * Single source of truth for daily Iman Level across the entire app:
 * - 5 Daily Fard Prayers: 40% (8% each)
 * - Qur'an Ayahs Read:    20%
 * - Sacred Dhikr:         20%
 * - Hadiths Studied:      20%
 * Plus subtle Nawafil/Heart State bonus (capped at 100%).
 * Every prayer checked, ayah read, dhikr tapped, and hadith studied moves the Iman level immediately.
 */
export function calculateImanBreakdown(
  record: ImanDayRecord,
  profile?: Pick<UserProfileData, 'dailyVerseGoal' | 'dailyDhikrGoal' | 'dailyHadithGoal'>
): ImanScoreBreakdown {
  const verseGoal = Math.max(1, profile?.dailyVerseGoal || DEFAULT_DAILY_VERSE_GOAL);
  const dhikrGoal = Math.max(1, profile?.dailyDhikrGoal || DEFAULT_DAILY_DHIKR_GOAL);
  const hadithGoal = Math.max(1, profile?.dailyHadithGoal || DEFAULT_DAILY_HADITH_GOAL);

  const completedFard = FARD_PRAYER_KEYS.filter((k) => Boolean(record.prayers?.[k])).length;
  const completedNawafil = NAWAFIL_PRAYER_KEYS.filter((k) => Boolean(record.prayers?.[k])).length;

  const versesRead = Math.max(0, record.versesRead || 0);
  const dhikrCount = Math.max(0, record.dhikrCount || 0);
  const hadithsStudied = Math.max(0, record.hadithsStudied || 0);

  const prayersPercent = Math.round((completedFard / 5) * 100);
  const versesPercent = Math.min(100, Math.round((versesRead / verseGoal) * 100));
  const dhikrPercent = Math.min(100, Math.round((dhikrCount / dhikrGoal) * 100));
  const hadithsPercent = Math.min(100, Math.round((hadithsStudied / hadithGoal) * 100));

  const prayersPoints = (completedFard / 5) * 40;
  const versesPoints = Math.min(1, versesRead / verseGoal) * 20;
  const dhikrPoints = Math.min(1, dhikrCount / dhikrGoal) * 20;
  const hadithPoints = Math.min(1, hadithsStudied / hadithGoal) * 20;

  const bonusPoints = (completedNawafil > 0 ? Math.min(4, completedNawafil * 2) : 0) + (record.heartState ? 1 : 0);

  const rawTotal = prayersPoints + versesPoints + dhikrPoints + hadithPoints + bonusPoints;
  const totalPercent = Math.min(100, Math.round(rawTotal));

  return {
    totalPercent,
    completedFard,
    completedNawafil,
    versesRead,
    dhikrCount,
    hadithsStudied,
    verseGoal,
    dhikrGoal,
    hadithGoal,
    prayersPercent,
    versesPercent,
    dhikrPercent,
    hadithsPercent,
    prayersPoints: Number(prayersPoints.toFixed(1)),
    versesPoints: Number(versesPoints.toFixed(1)),
    dhikrPoints: Number(dhikrPoints.toFixed(1)),
    hadithPoints: Number(hadithPoints.toFixed(1)),
    bonusPoints,
  };
}
