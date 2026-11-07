import { WaqfSignInfo } from '../types/quran';

export const TAJWEED_STOPPING_SIGNS: Record<string, WaqfSignInfo> = {
  'مـ': {
    symbol: 'مـ',
    arabicName: 'وَقْفٌ لَازِمٌ (وقف م)',
    name: 'Compulsory Stop',
    ruleSimple: '🛑 MUST STOP HERE',
    instruction: 'You must stop your recitation here. Continuing into the next sentence changes or distorts the sacred divine meaning.',
    category: 'must_stop',
    badgeColor: 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/40',
  },
  'قلى': {
    symbol: 'قلى',
    arabicName: 'الْوَقْفُ أَوْلَى (قلى)',
    name: 'Better to Stop',
    ruleSimple: '🟢 BETTER TO PAUSE HERE',
    instruction: 'It is preferred and recommended to pause and take a breath here, though continuing is permissible.',
    category: 'better_stop',
    badgeColor: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40',
  },
  'ج': {
    symbol: 'ج',
    arabicName: 'وَقْفٌ جَائِزٌ (ج)',
    name: 'Permissible Pause',
    ruleSimple: '🟡 EQUAL CHOICE',
    instruction: 'You may either stop or continue reciting; both options are equally good and valid.',
    category: 'can_stop',
    badgeColor: 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40',
  },
  'صلى': {
    symbol: 'صلى',
    arabicName: 'الْوَصْلُ أَوْلَى (صلى)',
    name: 'Better to Continue',
    ruleSimple: '🔵 BETTER TO CONTINUE',
    instruction: 'It is preferred to connect and continue reading without stopping. If you run out of breath, pausing is allowed.',
    category: 'better_continue',
    badgeColor: 'bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/40',
  },
  'لا': {
    symbol: 'لا',
    arabicName: 'لَا تَقِفْ (لا)',
    name: 'Do NOT Stop',
    ruleSimple: '⛔ DO NOT STOP HERE',
    instruction: 'Do not stop here because the sentence is still ongoing. If you stop due to running out of breath, repeat the previous word before continuing.',
    category: 'do_not_stop',
    badgeColor: 'bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/40',
  },
  '∴': {
    symbol: '∴',
    arabicName: 'تَعَانُقُ الْوَقْفِ (معانقة)',
    name: 'Embracing Stop',
    ruleSimple: '⚖️ STOP AT ONE ONLY',
    instruction: 'These three dots appear in pairs. You must stop at either the first mark OR the second mark, but NEVER stop at both.',
    category: 'can_stop',
    badgeColor: 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/40',
  },
  'س': {
    symbol: 'س',
    arabicName: 'سَكْتَةٌ لَطِيفَةٌ (س)',
    name: 'Silent Breathless Pause',
    ruleSimple: '⏸️ PAUSE WITHOUT BREATH',
    instruction: 'Pause your voice briefly (about 1 second) without drawing breath, then resume reading immediately.',
    category: 'saktah',
    badgeColor: 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-500/40',
  },
  '۩': {
    symbol: '۩',
    arabicName: 'سَجْدَةُ التِّلَاوَةِ (سجدة)',
    name: 'Prostration of Recitation',
    ruleSimple: '🕌 PROSTRATE (SAJDAH)',
    instruction: 'It is a beloved prophetic Sunnah to perform one prostration (Sujud) to Allah upon reciting or listening to this verse.',
    category: 'sajdah',
    badgeColor: 'bg-emerald-600/25 text-emerald-800 dark:text-emerald-200 border-emerald-500',
  },
};

/**
 * Returns Tajweed stopping signs present or relevant for a specific verse
 */
export function getVerseWaqfSigns(surahNumber: number, ayahNumber: number, textArabic: string): WaqfSignInfo[] {
  const signs: WaqfSignInfo[] = [];

  // Check Sajdah verses (e.g., 7:206, 13:15, 16:50, 17:109, 19:58, 22:18, 22:77, 25:60, 27:26, 32:15, 38:24, 41:38, 53:62, 84:21, 96:19)
  const sajdahVerses: Record<string, boolean> = {
    '7:206': true, '13:15': true, '16:50': true, '17:109': true, '19:58': true,
    '22:18': true, '22:77': true, '25:60': true, '27:26': true, '32:15': true,
    '38:24': true, '41:38': true, '53:62': true, '84:21': true, '96:19': true,
  };

  if (sajdahVerses[`${surahNumber}:${ayahNumber}`]) {
    signs.push(TAJWEED_STOPPING_SIGNS['۩']);
  }

  // Detect embedded Unicode Waqf marks in text (U+06D6 through U+06DC)
  // U+06D6: Small High Ligature Sad With Lam With Alef Maksura (صلى)
  // U+06D7: Small High Ligature Qaf With Lam With Alef Maksura (قلى)
  // U+06D8: Small High Meem Initial Form (مـ)
  // U+06D9: Small High Lam Alef (لا)
  // U+06DA: Small High Jeem (ج)
  // U+06DB: Small High Three Dots (∴)
  // U+06DC: Small High Seen (س)
  if (textArabic.includes('\u06D8') || textArabic.includes('مـ')) {
    signs.push(TAJWEED_STOPPING_SIGNS['مـ']);
  }
  if (textArabic.includes('\u06D7') || textArabic.includes('قلى')) {
    signs.push(TAJWEED_STOPPING_SIGNS['قلى']);
  }
  if (textArabic.includes('\u06DA') || textArabic.includes('ج')) {
    signs.push(TAJWEED_STOPPING_SIGNS['ج']);
  }
  if (textArabic.includes('\u06D6') || textArabic.includes('صلى')) {
    signs.push(TAJWEED_STOPPING_SIGNS['صلى']);
  }
  if (textArabic.includes('\u06D9')) {
    signs.push(TAJWEED_STOPPING_SIGNS['لا']);
  }
  if (textArabic.includes('\u06DB')) {
    signs.push(TAJWEED_STOPPING_SIGNS['∴']);
  }
  if (textArabic.includes('\u06DC')) {
    signs.push(TAJWEED_STOPPING_SIGNS['س']);
  }

  // If none explicitly in raw string, assign intuitive standard ending rule for the verse
  if (signs.length === 0) {
    // In Quran, pausing at the end of an Ayah is Sunnah (Waqf Kafi / Al-Waqf al-Awla)
    signs.push({
      symbol: '۝',
      arabicName: 'رَأْسُ الْآيَةِ (سُنَّةٌ)',
      name: 'End of Ayah (Sunnah Stop)',
      ruleSimple: '🟢 SUNNAH STOP AT END OF VERSE',
      instruction: 'Stopping at the end of every Ayah is the authentic Sunnah of the Prophet Muhammad (ﷺ). Take a breath before beginning the next verse.',
      category: 'better_stop',
      badgeColor: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
    });
  }

  return signs;
}
