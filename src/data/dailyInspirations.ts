export interface DailyInspirationItem {
  id: string;
  type: 'ayah' | 'hadith';
  theme: string;
  arabicText: string;
  englishText: string;
  reference: string;
  reflection: string;
}

export const DAILY_INSPIRATIONS: DailyInspirationItem[] = [
  {
    id: 'day_1',
    type: 'ayah',
    theme: 'Ease After Hardship',
    arabicText: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا • إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    englishText: 'For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.',
    reference: 'Surah Ash-Sharh 94:5-6',
    reflection: 'No trial in this life is devoid of divine mercy. Relief is already interwoven with your struggle.',
  },
  {
    id: 'day_2',
    type: 'hadith',
    theme: 'Patience & Gratitude',
    arabicText: 'عَجَبًا لِأَمْرِ الْمُؤْمِنِ إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ',
    englishText: 'How wonderful is the affair of the believer, for his affairs are all good. If something good happens to him, he is thankful and that is good for him. If something bad happens to him, he bears it with patience and that is good for him.',
    reference: 'Sahih Muslim 2999',
    reflection: 'A believer is victorious in both abundance and adversity through gratitude and steadfast patience.',
  },
  {
    id: 'day_3',
    type: 'ayah',
    theme: 'Proximity to Allah',
    arabicText: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ',
    englishText: 'And when My servants ask you concerning Me, indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.',
    reference: 'Surah Al-Baqarah 2:186',
    reflection: 'You are never speaking into a void. Allah is nearer to you than your own breath, listening to every whisper.',
  },
  {
    id: 'day_4',
    type: 'hadith',
    theme: 'Spreading Kindness',
    arabicText: 'خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ',
    englishText: 'The best of people are those that bring the most benefit to the rest of mankind.',
    reference: 'Al-Mu’jam al-Awsat (Sahih al-Albani)',
    reflection: 'True spiritual devotion reflects immediately in how selflessly you serve and uplift others.',
  },
  {
    id: 'day_5',
    type: 'ayah',
    theme: 'Trust in Divine Decree (Tawakkul)',
    arabicText: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ',
    englishText: 'And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.',
    reference: 'Surah At-Talaq 65:3',
    reflection: 'Surrender your anxious thoughts to the One who fashioned the stars. He will suffice you.',
  },
  {
    id: 'day_6',
    type: 'hadith',
    theme: 'Good Character',
    arabicText: 'إِنَّ مِنْ أَحَبِّكُمْ إِلَيَّ وَأَقْرَبِكُمْ مِنِّي مَجْلِسًا يَوْمَ الْقِيَامَةِ أَحَاسِنَكُمْ أَخْلَاقًا',
    englishText: 'The most beloved of you to me and the closest of you to me on the Day of Resurrection are the best of you in character.',
    reference: 'Jami` at-Tirmidhi 2018',
    reflection: 'Gentleness, patience, and warmth are the ultimate proof of an illuminated soul.',
  },
  {
    id: 'day_7',
    type: 'ayah',
    theme: 'Divine Mercy',
    arabicText: 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ',
    englishText: 'Say, "O My servants who have transgressed against themselves, do not despair of the mercy of Allah. Indeed, Allah forgives all sins."',
    reference: 'Surah Az-Zumar 39:53',
    reflection: 'Never let your past mistakes convince you that the door of return is closed. Turn back today.',
  },
];

/**
 * Returns today's Ayah and Hadith deterministically based on day of year
 */
export function getTodaysInspirations(date: Date = new Date()): {
  ayah: DailyInspirationItem;
  hadith: DailyInspirationItem;
} {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  const ayahs = DAILY_INSPIRATIONS.filter((i) => i.type === 'ayah');
  const hadiths = DAILY_INSPIRATIONS.filter((i) => i.type === 'hadith');

  const ayahIndex = dayOfYear % ayahs.length;
  const hadithIndex = dayOfYear % hadiths.length;

  return {
    ayah: ayahs[ayahIndex],
    hadith: hadiths[hadithIndex],
  };
}
