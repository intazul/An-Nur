import { Reciter } from '../types/quran';

export const ARABIC_RECITERS: Reciter[] = [
  {
    id: 'alafasy',
    name: 'Mishary Rashid Alafasy',
    style: 'Murattal (Clear & Melodious)',
    subfolder: 'Alafasy_128kbps',
    language: 'ar',
  },
  {
    id: 'abdulbasit',
    name: 'Abdul Basit Murattal',
    style: 'Traditional Egyptian Tarteel',
    subfolder: 'Abdul_Basit_Murattal_192kbps',
    language: 'ar',
  },
  {
    id: 'ghamadi',
    name: 'Saad Al-Ghamdi',
    style: 'Reverent & Flowing',
    subfolder: 'Ghamadi_40kbps',
    language: 'ar',
  },
  {
    id: 'sudais',
    name: 'Abdur-Rahman as-Sudais',
    style: 'Haramain Emotional Tarteel',
    subfolder: 'Abdurrahmaan_As-Sudais_192kbps',
    language: 'ar',
  },
];

export const URDU_RECITERS: Reciter[] = [
  {
    id: 'shamshad',
    name: 'Shamshad Ali Khan (شمشاد علی خان)',
    style: 'Fateh Muhammad Jalandhri Urdu Translation',
    subfolder: 'translations/urdu_shamshad_ali_khan_46kbps',
    language: 'ur',
  },
  {
    id: 'farhat',
    name: 'Dr. Farhat Hashmi (ڈاکٹر فرحت ہاشمی)',
    style: 'Urdu Translation & Word-by-Word Exegesis',
    subfolder: 'translations/urdu_farhat_hashmi',
    language: 'ur',
  },
];

export const RECITERS: Reciter[] = [...ARABIC_RECITERS, ...URDU_RECITERS];

/**
 * Returns the direct verse audio URL from everyayah CDN
 * Format: {subfolder}/{3-digit surah}{3-digit ayah}.mp3
 * e.g., Alafasy_128kbps/001001.mp3 or translations/urdu_shamshad_ali_khan_46kbps/001001.mp3
 */
export function getAyahAudioUrl(
  surahNumber: number,
  ayahNumber: number,
  reciterId: string = 'alafasy',
  isUrdu: boolean = false,
  urduReciterId: string = 'shamshad'
): string {
  const sStr = String(surahNumber).padStart(3, '0');
  const aStr = String(ayahNumber).padStart(3, '0');

  if (isUrdu) {
    const urduReciter = URDU_RECITERS.find((r) => r.id === urduReciterId) || URDU_RECITERS[0];
    return `https://everyayah.com/data/${urduReciter.subfolder}/${sStr}${aStr}.mp3`;
  }

  const reciter =
    ARABIC_RECITERS.find((r) => r.id === reciterId) ||
    RECITERS.find((r) => r.id === reciterId) ||
    ARABIC_RECITERS[0];
  return `https://everyayah.com/data/${reciter.subfolder}/${sStr}${aStr}.mp3`;
}
