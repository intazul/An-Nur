export type HijriMonthSignificance = 'ramadan' | 'sacred' | 'blessed' | 'standard';

export interface HijriMonthMeta {
  number: number; // 1..12
  nameEnglish: string;
  nameArabic: string;
  significance: HijriMonthSignificance;
  badgeLabel: string;
  virtueSummary: string;
  referenceSource: string;
  referenceText: string;
  quranSurah?: number;
  quranAyah?: number;
}

export interface QuranVerseCitation {
  label: string;
  surahNumber: number;
  ayahNumber: number;
  arabic?: string;
  english: string;
  revelationContext?: string;
}

export interface HadithActionItem {
  practiceTitle: string;
  hadithSource: string;
  narrator: string;
  hadithText: string;
}

export interface IslamicCalendarEvent {
  id: string;
  month: number; // 1..12
  day: number; // 1..30
  endDay?: number;
  title: string;
  category: 'fasting' | 'eid' | 'revelation' | 'history' | 'worship';
  summary: string;
  historicalDetails: string[];
  quranVerses: QuranVerseCitation[];
  hadithActions: HadithActionItem[];
  // Legacy single fields retained for compact list summaries
  quranRef?: {
    label: string;
    surahNumber: number;
    ayahNumber: number;
    arabic?: string;
    english: string;
  };
  hadithRef: {
    source: string;
    narrator: string;
    text: string;
  };
}

export interface RamadanAshraInfo {
  ashraNumber: 1 | 2 | 3;
  title: string;
  subtitle: string;
  dayRange: string;
  arabicDua: string;
  transliteration: string;
  englishMeaning: string;
  reference: string;
  dhikrTarget: number;
}

export const HIJRI_MONTHS_META: HijriMonthMeta[] = [
  {
    number: 1,
    nameEnglish: 'Muharram',
    nameArabic: 'الْمُحَرَّم',
    significance: 'sacred',
    badgeLabel: 'Sacred Month · 1st of Al-Ashhur al-Hurum',
    virtueSummary:
      'One of the four Sacred Months ordained by Allah where fighting was forbidden and righteous worship carries heightened honor.',
    referenceSource: "Qur'an 9:36 · Sahih Muslim 1163a",
    referenceText:
      '“The most virtuous fasting after Ramadan is in Allah’s month of al-Muharram, and the best prayer after the obligatory prayer is the night prayer.”',
    quranSurah: 9,
    quranAyah: 36,
  },
  {
    number: 2,
    nameEnglish: 'Safar',
    nameArabic: 'صَفَر',
    significance: 'standard',
    badgeLabel: 'Hijri Month 02',
    virtueSummary:
      'The Messenger of Allah ﷺ abolished pre-Islamic superstitions regarding Safar; in late Safar, he ﷺ and Abu Bakr (RA) departed Makkah for the Cave of Thawr.',
    referenceSource: 'Sahih al-Bukhari 5757 · Sahih al-Bukhari 3905',
    referenceText:
      '“There is no infection by itself, no bad omen, no owl omen, and no omen in the month of Safar.”',
    quranSurah: 9,
    quranAyah: 40,
  },
  {
    number: 3,
    nameEnglish: "Rabi' al-Awwal",
    nameArabic: 'رَبِيع الأَوَّل',
    significance: 'blessed',
    badgeLabel: 'Month of Hijrah & Prophetic Sirah',
    virtueSummary:
      'Month in which the Messenger of Allah ﷺ was born on a Monday, arrived in Quba and Madinah completing the Hijrah, and returned to Allah in 11 AH.',
    referenceSource: 'Sahih Muslim 1162a · Sahih al-Bukhari 3906',
    referenceText:
      'Asked about fasting Mondays, he ﷺ said: “That is the day on which I was born and the day on which revelation first came to me.”',
    quranSurah: 33,
    quranAyah: 21,
  },
  {
    number: 4,
    nameEnglish: "Rabi' al-Thani",
    nameArabic: 'رَبِيع الثَّانِي',
    significance: 'standard',
    badgeLabel: 'Hijri Month 04',
    virtueSummary:
      'Month during the Madinan era carrying the established Prophetic Sunnah rhythm of fasting Mondays, Thursdays, and the White Days (13–15).',
    referenceSource: "Qur'an 3:103 · Jami' at-Tirmidhi 761",
    referenceText:
      '“Hold firmly to the rope of Allah all together and do not become divided.”',
    quranSurah: 3,
    quranAyah: 103,
  },
  {
    number: 5,
    nameEnglish: 'Jumada al-Ula',
    nameArabic: 'جُمَادَى الأُولَى',
    significance: 'standard',
    badgeLabel: 'Hijri Month 05',
    virtueSummary:
      'In Jumada al-Ula 8 AH occurred the Battle of Mu’tah, where Zayd ibn Harithah, Ja’far ibn Abi Talib, and Abdullah ibn Rawahah (RA) held the standard in succession.',
    referenceSource: 'Sahih al-Bukhari 4261',
    referenceText:
      '“Zayd took the banner and was martyred; then Ja’far took it and was martyred; then Ibn Rawahah took it and was martyred—his eyes overflowing with tears.”',
    quranSurah: 3,
    quranAyah: 169,
  },
  {
    number: 6,
    nameEnglish: 'Jumada al-Akhirah',
    nameArabic: 'جُمَادَى الآخِرَة',
    significance: 'standard',
    badgeLabel: 'Hijri Month 06',
    virtueSummary:
      'In Jumada al-Akhirah 13 AH, Abu Bakr as-Siddiq (RA) passed away after initiating the unified Mushaf compilation, and Umar ibn al-Khattab (RA) succeeded as Caliph.',
    referenceSource: 'Sahih al-Bukhari 4986 · Qur’an 15:9',
    referenceText:
      '“Indeed, it is We who sent down the Reminder, and indeed, We will be its guardian.”',
    quranSurah: 15,
    quranAyah: 9,
  },
  {
    number: 7,
    nameEnglish: 'Rajab',
    nameArabic: 'رَجَب',
    significance: 'sacred',
    badgeLabel: 'Sacred Month · 2nd of Al-Ashhur al-Hurum',
    virtueSummary:
      'A revered Sacred Month mentioned in Surah At-Tawbah and associated in historical Sirah with al-Isra wal-Mi’raj when the five daily prayers were enjoined.',
    referenceSource: "Qur'an 9:36 · Qur'an 17:1 · Sahih al-Bukhari 3207",
    referenceText:
      '“Exalted is He who took His Servant by night from al-Masjid al-Haram to al-Masjid al-Aqsa, whose surroundings We have blessed.”',
    quranSurah: 17,
    quranAyah: 1,
  },
  {
    number: 8,
    nameEnglish: "Sha'ban",
    nameArabic: 'شَعْبَان',
    significance: 'blessed',
    badgeLabel: 'Month of Elevated Deeds & Qiblah Change',
    virtueSummary:
      'The Prophet ﷺ fasted more voluntary days in Sha’ban than in any other month outside Ramadan, as deeds are raised to the Lord of the Worlds during it.',
    referenceSource: "Sunan an-Nasa'i 2357 · Sahih al-Bukhari 1969",
    referenceText:
      '“It is a month between Rajab and Ramadan that people neglect, and in it deeds are raised to the Lord of the Worlds; I love that my deeds be raised while I am fasting.”',
    quranSurah: 2,
    quranAyah: 144,
  },
  {
    number: 9,
    nameEnglish: 'Ramadan',
    nameArabic: 'رَمَضَان',
    significance: 'ramadan',
    badgeLabel: 'Month of the Qur’an · Gates of Jannah Opened',
    virtueSummary:
      'The ninth Hijri month in which the Qur’an was sent down, fasting was made obligatory, Badr and the Conquest of Makkah took place, and Laylatul Qadr occurs.',
    referenceSource: "Qur'an 2:185 · Sahih al-Bukhari 1899 & 1901",
    referenceText:
      '“Whoever fasts Ramadan out of sincere faith and hoping for Allah’s reward will have all his previous sins forgiven.”',
    quranSurah: 2,
    quranAyah: 185,
  },
  {
    number: 10,
    nameEnglish: 'Shawwal',
    nameArabic: 'شَوَّال',
    significance: 'blessed',
    badgeLabel: 'Eid al-Fitr & Six Sunnah Fasts',
    virtueSummary:
      'Opens with Eid al-Fitr on 1 Shawwal (on which fasting is forbidden) and carries the Prophetic Sunnah of fasting six days after Ramadan.',
    referenceSource: 'Sahih Muslim 1164a · Sahih al-Bukhari 1991',
    referenceText:
      '“Whoever fasts Ramadan and follows it with six days of Shawwal, it is as if he fasted the entire year.”',
    quranSurah: 2,
    quranAyah: 185,
  },
  {
    number: 11,
    nameEnglish: "Dhu al-Qi'dah",
    nameArabic: 'ذُو الْقَعْدَة',
    significance: 'sacred',
    badgeLabel: 'Sacred Month · 3rd of Al-Ashhur al-Hurum',
    virtueSummary:
      'One of the four Sacred Months and first month of Hajj; the Prophet ﷺ performed all four of his ‘Umrahs in Dhu al-Qi’dah and concluded the Treaty of Hudaybiyyah in 6 AH.',
    referenceSource: "Sahih al-Bukhari 1778 · Qur'an 48:1",
    referenceText:
      '“Anas (RA) narrated: The Messenger of Allah ﷺ performed four ‘Umrahs, all of them in Dhu al-Qi’dah except the one alongside his Hajj.”',
    quranSurah: 48,
    quranAyah: 1,
  },
  {
    number: 12,
    nameEnglish: 'Dhu al-Hijjah',
    nameArabic: 'ذُو الْحِجَّة',
    significance: 'sacred',
    badgeLabel: 'Sacred Month · Ten Greatest Days & Hajj',
    virtueSummary:
      'Contains the ten days most beloved to Allah, the Day of ‘Arafah, Eid al-Adha (Yawm an-Nahr), and the Days of Tashreeq.',
    referenceSource: "Sahih al-Bukhari 969 · Qur'an 89:1–2",
    referenceText:
      '“There are no days in which righteous deeds are more beloved to Allah than these ten days.”',
    quranSurah: 22,
    quranAyah: 27,
  },
];

export const FIXED_ISLAMIC_EVENTS: IslamicCalendarEvent[] = [
  // MUHARRAM (Month 1)
  {
    id: 'muh-1',
    month: 1,
    day: 1,
    title: 'Islamic New Year · Opening of Al-Muharram (Sacred Month)',
    category: 'history',
    summary:
      'During the caliphate of Umar ibn al-Khattab (RA), the Companions established the Hijri calendar starting from Muharram of the year of the Hijrah (1 AH).',
    historicalDetails: [
      'In 17 AH, Abu Musa al-Ash’ari (RA) wrote to Caliph Umar ibn al-Khattab (RA) that official state letters arrived dated only with months, causing uncertainty over which year they belonged to.',
      'Umar (RA) consulted the senior Companions in Madinah; proposals included dating from the Prophet’s ﷺ birth, first revelation, passing, or Hijrah.',
      'Uthman ibn Affan and Ali ibn Abi Talib (RA) concurred with Umar’s decision to begin the calendar from the year of the Hijrah (622 CE) because the Hijrah distinguished truth from falsehood.',
      'Although the Prophet ﷺ reached Quba in Rabi’ al-Awwal, they chose Muharram as the first month of the calendar because the pledge of migration (Second Pledge of ‘Aqabah) had concluded in Dhu al-Hijjah, making Muharram the first month immediately after.',
    ],
    quranVerses: [
      {
        label: "Qur'an 9:36",
        surahNumber: 9,
        ayahNumber: 36,
        arabic:
          'إِنَّ عِدَّةَ الشُّهُورِ عِندَ اللَّهِ اثْنَا عَشَرَ شَهْرًا فِي كِتَابِ اللَّهِ يَوْمَ خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ مِنْهَا أَرْبَعَةٌ حُرُمٌ',
        english:
          'Indeed, the number of months with Allah is twelve months in the register of Allah from the day He created the heavens and the earth; of these, four are sacred.',
        revelationContext:
          'Revealed in 9 AH after the Tabuk expedition, affirming the twelve lunar months and the sanctity of the four Sacred Months: Dhu al-Qi’dah, Dhu al-Hijjah, Muharram, and Rajab.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Voluntary Fasting in Allah’s Month of Muharram',
        hadithSource: 'Sahih Muslim 1163a',
        narrator: 'Abu Hurairah (RA)',
        hadithText:
          'The Messenger of Allah ﷺ said: “The best fasting after Ramadan is the month of Allah al-Muharram, and the best prayer after the obligatory prayer is the night prayer.”',
      },
      {
        practiceTitle: 'Refraining from Conflict & Wrongdoing During Sacred Months',
        hadithSource: 'Sahih al-Bukhari 4662',
        narrator: 'Abu Bakrah (RA)',
        hadithText:
          'The Prophet ﷺ said in his Farewell Sermon: “Time has rotated back to its original state as on the day Allah created the heavens and the earth. The year is twelve months, of which four are sacred: three consecutive—Dhu al-Qi’dah, Dhu al-Hijjah, and al-Muharram—and Rajab of Mudar.”',
      },
    ],
    quranRef: {
      label: "Qur'an 9:36",
      surahNumber: 9,
      ayahNumber: 36,
      english:
        'Indeed, the number of months with Allah is twelve months in the register of Allah from the day He created the heavens and the earth; of these, four are sacred.',
    },
    hadithRef: {
      source: 'Sahih Muslim 1163a · Sahih al-Bukhari 3934',
      narrator: 'Abu Hurairah & Sahl ibn Sa’d (RA)',
      text: '“The best fasting after Ramadan is the month of Allah al-Muharram, and the best prayer after the obligatory prayer is the night prayer.”',
    },
  },
  {
    id: 'muh-9',
    month: 1,
    day: 9,
    title: 'Day of Tasu‘a (9th of Muharram)',
    category: 'fasting',
    summary:
      'Before passing away, the Messenger of Allah ﷺ resolved to fast the 9th of Muharram alongside the 10th (‘Ashura).',
    historicalDetails: [
      'Toward the end of his life in Madinah, after it was mentioned to the Prophet ﷺ that the People of the Book only singled out the 10th of Muharram for fasting, he resolved to add the 9th day so Muslim practice remained distinct.',
      'He ﷺ expressed this firm intention for the coming year in 10 AH, though he passed away in Rabi’ al-Awwal 11 AH before the next Muharram arrived.',
      'Based on his explicit statement recorded in Sahih Muslim, the Companions including Abdullah ibn Abbas (RA) practiced fasting both the 9th and 10th of Muharram.',
    ],
    quranVerses: [
      {
        label: "Qur'an 59:7",
        surahNumber: 59,
        ayahNumber: 7,
        arabic: 'وَمَا آتَاكُمُ الرَّسُولُ فَخُذُوهُ وَمَا نَهَاكُمْ عَنْهُ فَانتَهُوا',
        english:
          'And whatever the Messenger has given you—take; and what he has forbidden you—refrain from.',
        revelationContext:
          'Establishes following the explicit Prophetic instruction and Sunnah intention.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Fast the 9th of Muharram Together with the 10th',
        hadithSource: 'Sahih Muslim 1134a',
        narrator: 'Abdullah ibn Abbas (RA)',
        hadithText:
          'When the Messenger of Allah ﷺ fasted the day of ‘Ashura and commanded that it be fasted, the Companions said: “O Messenger of Allah, it is a day venerated by the Jews and Christians.” He ﷺ said: “So when next year comes, if Allah wills, we shall fast the ninth day.”',
      },
      {
        practiceTitle: 'Distinction of Fast Days as Narrated by Ibn Abbas (RA)',
        hadithSource: 'Sahih Muslim 1134b',
        narrator: 'Al-Hakam ibn al-A‘raj',
        hadithText:
          'I came to Ibn Abbas (RA) and asked him about fasting ‘Ashura. He replied: “When you see the crescent of Muharram, count the days and begin fasting on the morning of the ninth.” I asked: “Was that how the Messenger of Allah ﷺ used to fast?” He replied: “Yes.”',
      },
    ],
    hadithRef: {
      source: 'Sahih Muslim 1134a',
      narrator: 'Abdullah ibn Abbas (RA)',
      text: '“If I remain alive until next year, I will certainly fast on the ninth day (of Muharram as well).”',
    },
  },
  {
    id: 'muh-10',
    month: 1,
    day: 10,
    title: 'Day of ‘Ashura (10th of Muharram)',
    category: 'fasting',
    summary:
      'The day Allah parted the sea to rescue Prophet Musa (AS) and Bani Isra’il from Pharaoh; fasting ‘Ashura expiates the minor sins of the previous year.',
    historicalDetails: [
      'When Pharaoh pursued Prophet Musa (AS) and Bani Isra’il to the edge of the sea, Allah revealed to Musa (AS) to strike the sea with his staff; it parted into twelve dry paths while Pharaoh and his army were drowned behind them.',
      'When the Prophet ﷺ migrated to Madinah in 1 AH, he found the Jewish tribes fasting on 10 Muharram. On asking why, they answered: “This is the righteous day when Allah saved Moses and the Children of Israel from their enemy, so Moses fasted it.”',
      'The Messenger of Allah ﷺ replied: “We have more right to Moses than you,” so he fasted it and commanded the Muslims to fast it. When Ramadan became obligatory in 2 AH, fasting ‘Ashura became a cherished voluntary Sunnah.',
      'In 61 AH on 10 Muharram, Al-Husayn ibn Ali (RA), grandson of the Prophet ﷺ, along with members of the Prophetic household, was tragically martyred at Karbala.',
    ],
    quranVerses: [
      {
        label: "Qur'an 26:63–66",
        surahNumber: 26,
        ayahNumber: 63,
        arabic:
          'فَأَوْحَيْنَا إِلَىٰ مُوسَىٰ أَنِ اضْرِب بِّعَصَاكَ الْبَحْرَ ۖ فَانفَلَقَ فَكَانَ كُلُّ فِرْقٍ كَالطَّوْدِ الْعَظِيمِ',
        english:
          'Then We inspired to Moses, “Strike with your staff the sea,” and it parted, and each portion was like a great towering mountain. And We saved Moses and those with him, all together.',
        revelationContext:
          'Surah Ash-Shu’ara recounts the exact deliverance of Musa (AS) and his people from Pharaoh honored by the Day of ‘Ashura.',
      },
      {
        label: "Qur'an 10:90–92",
        surahNumber: 10,
        ayahNumber: 90,
        arabic: 'وَجَاوَزْنَا بِبَنِي إِسْرَائِيلَ الْبَحْرَ فَأَتْبَعَهُمْ فِرْعَوْنُ وَجُنُودُهُ بَغْيًا وَعَدْوًا',
        english:
          'And We took the Children of Israel across the sea, and Pharaoh and his soldiers pursued them in tyranny and enmity until, when drowning overtook him...',
        revelationContext: 'Surah Yunus narrates the crossing of Bani Isra’il and drowning of Pharaoh.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Fast ‘Ashura (Expiation of the Preceding Year)',
        hadithSource: 'Sahih Muslim 1162b',
        narrator: 'Abu Qatadah (RA)',
        hadithText:
          'The Messenger of Allah ﷺ was asked about fasting on the day of ‘Ashura, and he said: “It expiates the sins of the preceding year.”',
      },
      {
        practiceTitle: 'Historical Reason Confirmed by the Prophet ﷺ',
        hadithSource: 'Sahih al-Bukhari 2004',
        narrator: 'Abdullah ibn Abbas (RA)',
        hadithText:
          'The Prophet ﷺ came to Madinah and saw the Jews fasting on the day of ‘Ashura. He said: “What is this?” They said: “This is a good day when Allah saved Bani Isra’il from their enemy, so Moses fasted on this day.” The Prophet ﷺ said: “We are closer to Moses than you are.” So he fasted it and instructed people to fast it.',
      },
      {
        practiceTitle: 'Distinction of ‘Ashura from Lamentation Customs',
        hadithSource: 'Sahih al-Bukhari 1294',
        narrator: 'Abdullah ibn Mas’ud (RA)',
        hadithText:
          'The Prophet ﷺ said: “He is not one of us who strikes the cheeks, tears the garments, or calls out with the calls of the Days of Ignorance (Jahiliyyah).”',
      },
    ],
    quranRef: {
      label: "Qur'an 26:63–66",
      surahNumber: 26,
      ayahNumber: 63,
      english:
        'Then We inspired to Moses, “Strike with your staff the sea,” and it parted, and each portion was like a great towering mountain.',
    },
    hadithRef: {
      source: 'Sahih Muslim 1162b · Sahih al-Bukhari 2004',
      narrator: 'Abu Qatadah & Ibn Abbas (RA)',
      text: '“Fasting the day of ‘Ashura, I hope from Allah that it will expiate for the sins of the previous year.”',
    },
  },

  // SAFAR (Month 2)
  {
    id: 'saf-27',
    month: 2,
    day: 27,
    title: 'Night Departure to Cave of Thawr (Start of the Great Hijrah)',
    category: 'history',
    summary:
      'In late Safar (14th year of Prophethood / 622 CE), Prophet Muhammad ﷺ left Makkah with Abu Bakr as-Siddiq (RA) and sheltered three nights in the Cave of Thawr.',
    historicalDetails: [
      'Quraysh chiefs convened at Dar an-Nadwah and plotted to assign one armed youth from every clan to assassinate the Prophet ﷺ simultaneously at dawn.',
      'Jibril (AS) informed the Prophet ﷺ of the plot; the Prophet ﷺ instructed Ali ibn Abi Talib (RA) to sleep in his green Hadrami cloak and return all trusts left with him by the Makkans.',
      'While reciting verses of Surah Ya-Sin (36:9), the Prophet ﷺ walked unseen past the armed besiegers and met Abu Bakr as-Siddiq (RA), who had prepared two camels.',
      'They climbed south up Mount Thawr rather than north toward Madinah, hiding in the cave for three days while Abdullah ibn Abi Bakr brought intelligence by night, Asma bint Abi Bakr (RA) brought food in her torn waistband (earning the title Dhat an-Nitaqayn), and Amir ibn Fuhayrah erased their tracks with sheep.',
    ],
    quranVerses: [
      {
        label: "Qur'an 9:40",
        surahNumber: 9,
        ayahNumber: 40,
        arabic:
          'إِلَّا تَنصُرُوهُ فَقَدْ نَصَرَهُ اللَّهُ إِذْ أَخْرَجَهُ الَّذِينَ كَفَرُوا ثَانِيَ اثْنَيْنِ إِذْ هُمَا فِي الْغَارِ إِذْ يَقُولُ لِصَاحِبِهِ لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا',
        english:
          'If you do not aid the Prophet—Allah has already aided him when those who disbelieved had driven him out [of Makkah] as one of two, when they were in the cave and he said to his companion, “Do not grieve; indeed Allah is with us.”',
        revelationContext:
          'Directly commemorates the three nights in the Cave of Thawr when Allah sent down tranquility (Sakinah) and unseen forces upon the Prophet ﷺ and Abu Bakr (RA).',
      },
      {
        label: "Qur'an 8:30",
        surahNumber: 8,
        ayahNumber: 30,
        arabic:
          'وَإِذْ يَمْكُرُ بِكَ الَّذِينَ كَفَرُوا لِيُثْبِتُوكَ أَوْ يَقْتُلُوكَ أَوْ يُخْرِجُوكَ ۚ وَيَمْكُرُونَ وَيَمْكُرُ اللَّهُ ۖ وَاللَّهُ خَيْرُ الْمَاكِرِينَ',
        english:
          'And [remember] when those who disbelieved plotted against you to restrain you or kill you or evict you. But they plan, and Allah plans. And Allah is the best of planners.',
        revelationContext: 'Refers to the Quraysh plot at Dar an-Nadwah immediately preceding this night.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Complete Reliance Upon Allah in Moments of Siege',
        hadithSource: 'Sahih al-Bukhari 3653',
        narrator: 'Anas ibn Malik (RA) from Abu Bakr as-Siddiq (RA)',
        hadithText:
          'Abu Bakr said to the Prophet ﷺ while in the cave: “If any of them looks beneath his feet, he will surely see us.” He ﷺ answered: “O Abu Bakr, what do you think of two persons when Allah is the Third with them?”',
      },
      {
        practiceTitle: 'Rejection of Omens Attributed to the Month of Safar',
        hadithSource: 'Sahih al-Bukhari 5757',
        narrator: 'Abu Hurairah (RA)',
        hadithText:
          'The Messenger of Allah ﷺ said: “There is no ‘adwa (contagion by itself), no tiyarah (evil omen), no hamah (owl superstition), and no safar (unlucky omen in Safar).”',
      },
    ],
    quranRef: {
      label: "Qur'an 9:40",
      surahNumber: 9,
      ayahNumber: 40,
      english:
        'When the two were in the cave and he said to his companion, “Do not grieve; indeed Allah is with us.”',
    },
    hadithRef: {
      source: 'Sahih al-Bukhari 3653',
      narrator: 'Anas ibn Malik (RA) from Abu Bakr (RA)',
      text: '“What do you think of two persons when Allah is the Third with them?”',
    },
  },

  // RABI AL-AWWAL (Month 3)
  {
    id: 'raw-1',
    month: 3,
    day: 1,
    title: 'Departure from Cave of Thawr Toward Madinah (1 AH)',
    category: 'history',
    summary:
      'After three nights in Cave Thawr, the Prophet ﷺ and Abu Bakr (RA) began the Red Sea coastal journey toward Quba and Madinah.',
    historicalDetails: [
      'On 1 Rabi’ al-Awwal, Abdullah ibn Urayqit brought the two prepared riding camels as arranged to the base of Mount Thawr.',
      'The four travelers—Prophet Muhammad ﷺ, Abu Bakr (RA), Amir ibn Fuhayrah, and guide Abdullah ibn Urayqit—headed south first, then west to the Red Sea coast to evade Quraysh search parties.',
      'Along the route, Suraqah ibn Malik tracked them seeking the 100-camel bounty, but his horse sank repeatedly into firm sand until he begged for peace and was promised the bracelets of Khosrow (Chosroes).',
      'Passing the tent of Umm Ma’bad al-Khuza’iyah, the Prophet ﷺ touched the udder of an exhausted barren sheep which yielded abundant milk for all present.',
    ],
    quranVerses: [
      {
        label: "Qur'an 28:85",
        surahNumber: 28,
        ayahNumber: 85,
        arabic: 'إِنَّ الَّذِي فَرَضَ عَلَيْكَ الْقُرْآنَ لَرَادُّكَ إِلَىٰ مَعَادٍ',
        english:
          'Indeed, He who imposed upon you the Qur’an will take you back to a place of return.',
        revelationContext:
          'Revealed at al-Juhfah during the Hijrah migration, reassuring the Prophet ﷺ that Allah would return him victorious to Makkah.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Steadfast Fulfillment of the Hijrah & Trust in Allah’s Promise',
        hadithSource: 'Sahih al-Bukhari 3905 & 3906',
        narrator: 'Aishah & Al-Bara ibn ‘Azib (RA)',
        hadithText:
          'They departed at night guided along unfamiliar coastal paths; when Suraqah caught up and his horse sank in the earth, he realized the Prophet’s ﷺ cause would prevail and asked for a written covenant of safety.',
      },
    ],
    hadithRef: {
      source: 'Sahih al-Bukhari 3905',
      narrator: 'Aishah (RA)',
      text: 'The Prophet ﷺ hired Abdullah ibn Urayqit as a skilled guide and departed toward Madinah after three nights in the cave.',
    },
  },
  {
    id: 'raw-8',
    month: 3,
    day: 8,
    title: 'Arrival at Quba & Foundation of Masjid Quba',
    category: 'history',
    summary:
      'On Monday, 8 Rabi’ al-Awwal 1 AH, the Prophet ﷺ reached Quba outside Madinah and laid the foundation of the first Masjid in Islam—Masjid Quba.',
    historicalDetails: [
      'The Ansar in Yathrib waited daily beneath the date palms until the noon heat forced them indoors; a Jewish townsman spotting the riders in white shouted that the one they awaited had arrived.',
      'The Prophet ﷺ stayed at Quba among Banu ‘Amr ibn ‘Awf for four days (others say fourteen), staying in the home of Kulthum ibn al-Hidm (RA).',
      'He ﷺ personally carried stones alongside the Companions to build Masjid Quba—the very first public Masjid built openly in Islamic history.',
      'Ali ibn Abi Talib (RA), having fulfilled all Makkan trusts, walked on foot and reunited with the Prophet ﷺ at Quba.',
    ],
    quranVerses: [
      {
        label: "Qur'an 9:108",
        surahNumber: 9,
        ayahNumber: 108,
        arabic:
          'لَّمَسْجِدٌ أُسِّسَ عَلَى التَّقْوَىٰ مِنْ أَوَّلِ يَوْمٍ أَحَقُّ أَن تَقُومَ فِيهِ ۚ فِيهِ رِجَالٌ يُحِبُّونَ أَن يَتَطَهَّرُوا',
        english:
          'A mosque founded on righteousness from the first day is more worthy for you to stand in. Within it are men who love to purify themselves; and Allah loves those who purify themselves.',
        revelationContext:
          'Allah directly praised Masjid Quba and the people of Quba for loving physical and spiritual purification.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Making Wudu at Home and Praying Two Rak‘ahs in Masjid Quba',
        hadithSource: 'Sahih al-Bukhari 1191 · Sunan Ibn Majah 1412 (Sahih)',
        narrator: 'Abdullah ibn Umar & Sahl ibn Hunayf (RA)',
        hadithText:
          'The Messenger of Allah ﷺ said: “Whoever purifies himself in his house, then comes to Masjid Quba and prays one prayer (two rak‘ahs) in it, will have a reward like that of an ‘Umrah.” And Ibn Umar (RA) narrated the Prophet ﷺ used to visit Masjid Quba riding or walking every Saturday.',
      },
    ],
    quranRef: {
      label: "Qur'an 9:108",
      surahNumber: 9,
      ayahNumber: 108,
      english:
        'A mosque founded on righteousness from the first day is more worthy for you to stand in.',
    },
    hadithRef: {
      source: 'Sahih al-Bukhari 1191 · Sunan Ibn Majah 1412',
      narrator: 'Abdullah ibn Umar & Sahl ibn Hunayf (RA)',
      text: '“Whoever purifies himself at home and goes to Masjid Quba and prays two rak’ahs has the reward of an ‘Umrah.”',
    },
  },
  {
    id: 'raw-12',
    month: 3,
    day: 12,
    title: 'Prophetic Monday Milestones · Birth, Madinah Entry & Passing',
    category: 'history',
    summary:
      'Historically recorded date of Monday events in the Prophetic biography: the birth of Muhammad ﷺ (Year of the Elephant), completion of the Hijrah into Madinah (1 AH), and his passing (11 AH).',
    historicalDetails: [
      'Monday in the Year of the Elephant (570/571 CE): Birth of Muhammad ibn Abdullah ﷺ in Makkah among Banu Hashim after the defeat of Abraha’s elephant army.',
      'Friday/Monday in Rabi’ al-Awwal (1 AH): After leading his first Jumu’ah in Wadi Ranuna among Banu Salim ibn ‘Awf, the Prophet ﷺ entered central Madinah. Every clan invited him to hold his camel Qaswa’s reins, and he replied: “Leave her, for she is commanded,” until she knelt at the drying yard of Sahl and Suhayl—where Al-Masjid an-Nabawi was built.',
      'Monday, 12 Rabi’ al-Awwal 11 AH: After leading the Ummah for 23 years of revelation and completing the Farewell Pilgrimage, the Prophet ﷺ passed away in the chamber of Aishah (RA) with his head resting on her chest, saying: “O Allah, the Highest Companion.”',
    ],
    quranVerses: [
      {
        label: "Qur'an 33:21",
        surahNumber: 33,
        ayahNumber: 21,
        arabic:
          'لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ لِّمَن كَانَ يَرْجُو اللَّهَ وَالْيَوْمَ الْآخِرَ',
        english:
          'There has certainly been for you in the Messenger of Allah an excellent pattern for anyone whose hope is in Allah and the Last Day and [who] remembers Allah often.',
        revelationContext: 'Establishes the Messenger of Allah ﷺ as the living model for the Ummah across every circumstance.',
      },
      {
        label: "Qur'an 3:144",
        surahNumber: 3,
        ayahNumber: 144,
        arabic:
          'وَمَا مُحَمَّدٌ إِلَّا رَسُولٌ قَدْ خَلَتْ مِن قَبْلِهِ الرُّسُلُ ۚ أَفَإِن مَّاتَ أَوْ قُتِلَ انقَلَبْتُمْ عَلَىٰ أَعْقَابِكُمْ',
        english:
          'Muhammad is not but a messenger. [Other] messengers have passed on before him. So if he was to die or be killed, would you turn back on your heels?',
        revelationContext:
          'Recited aloud by Abu Bakr as-Siddiq (RA) on 12 Rabi’ al-Awwal 11 AH to steady the Companions upon the passing of the Prophet ﷺ.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Fasting Mondays in Gratitude as Practiced by the Prophet ﷺ',
        hadithSource: 'Sahih Muslim 1162a',
        narrator: 'Abu Qatadah al-Ansari (RA)',
        hadithText:
          'The Messenger of Allah ﷺ was asked about fasting on Mondays, and he said: “That is the day on which I was born and the day on which I received revelation (or the Qur’an was sent down to me).”',
      },
      {
        practiceTitle: 'Adhering Strictly to Prophetic Sunnah Without Innovation',
        hadithSource: 'Sahih al-Bukhari 2697 · Sahih Muslim 1718a',
        narrator: 'Aishah (RA)',
        hadithText:
          'The Messenger of Allah ﷺ said: “Whoever introduces into this affair of ours (Islam) something that is not part of it will have it rejected.”',
      },
      {
        practiceTitle: 'Sending Abundant Salawat Upon the Messenger of Allah ﷺ',
        hadithSource: 'Sahih Muslim 408',
        narrator: 'Abu Hurairah (RA)',
        hadithText:
          'The Messenger of Allah ﷺ said: “Whoever sends blessings (Salah) upon me once, Allah sends blessings upon him tenfold.”',
      },
    ],
    quranRef: {
      label: "Qur'an 33:21",
      surahNumber: 33,
      ayahNumber: 21,
      english:
        'There has certainly been for you in the Messenger of Allah an excellent pattern for anyone whose hope is in Allah and the Last Day.',
    },
    hadithRef: {
      source: 'Sahih Muslim 1162a · Sahih al-Bukhari 3906',
      narrator: 'Abu Qatadah & Al-Bara ibn ‘Azib (RA)',
      text: 'Asked about fasting Mondays, he ﷺ said: “That is the day on which I was born and the day on which revelation first came to me.”',
    },
  },

  // RAJAB (Month 7)
  {
    id: 'raj-1',
    month: 7,
    day: 1,
    title: 'Opening of Rajab · Second Sacred Month (Al-Ashhur al-Hurum)',
    category: 'worship',
    summary:
      'Rajab is the lone Sacred Month between Jumada al-Akhirah and Sha’ban, highlighted by Allah in Surah At-Tawbah.',
    historicalDetails: [
      'In pre-Islamic Arabia, tribes respected four Sacred Months by laying down weapons so travelers could pass safely; Islam affirmed these exact four months—Dhu al-Qi’dah, Dhu al-Hijjah, Muharram, and Rajab—while abolishing tampering (Nasi’) with the lunar calendar.',
      'Classical scholars note no specific single prayer or fast was legislated exclusively for Rajab itself beyond general righteousness, avoiding injustice, and the regular Sunnah fasts.',
    ],
    quranVerses: [
      {
        label: "Qur'an 9:36",
        surahNumber: 9,
        ayahNumber: 36,
        arabic: 'فَلَا تَظْلِمُوا فِيهِنَّ أَنفُسَكُمْ',
        english: 'So do not wrong yourselves during them (the four Sacred Months).',
        revelationContext: 'Command in Surah At-Tawbah specifically concerning the four Sacred Months.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Honoring the Four Sacred Months Without Unfounded Innovations',
        hadithSource: 'Sahih al-Bukhari 4662 · Sahih Muslim 1679',
        narrator: 'Abu Bakrah (RA)',
        hadithText:
          'The Prophet ﷺ addressed the people at Mina saying: “The year is twelve months, four of which are sacred: three consecutive—Dhu al-Qi’dah, Dhu al-Hijjah, and al-Muharram—and Rajab of Mudar which falls between Jumada and Sha’ban.”',
      },
      {
        practiceTitle: 'Avoiding Over-Fasting the Entire Month Outside Ramadan',
        hadithSource: 'Sunan Abi Dawud 2430 · Sahih al-Bukhari 1971',
        narrator: 'Abdullah ibn Abbas (RA)',
        hadithText:
          'The Messenger of Allah ﷺ never completed fasting an entire month except Ramadan (and Umar ibn al-Khattab used to deter treating Rajab like a second Ramadan).',
      },
    ],
    quranRef: {
      label: "Qur'an 9:36",
      surahNumber: 9,
      ayahNumber: 36,
      english: 'So do not wrong yourselves during them (the four Sacred Months).',
    },
    hadithRef: {
      source: 'Sahih al-Bukhari 4662',
      narrator: 'Abu Bakrah (RA)',
      text: '“Three consecutive months: Dhu al-Qi’dah, Dhu al-Hijjah, and Muharram—and Rajab of Mudar which falls between Jumada and Sha’ban.”',
    },
  },
  {
    id: 'raj-27',
    month: 7,
    day: 27,
    title: 'Commemoration of Al-Isra wal-Mi‘raj (Night Journey & 5 Daily Prayers)',
    category: 'revelation',
    summary:
      'Commemorates Allah taking His Messenger ﷺ by night from Al-Masjid al-Haram to Al-Masjid al-Aqsa and ascending through the seven heavens, where the five daily Salah were prescribed.',
    historicalDetails: [
      'In late Makkan years after the Year of Sorrow (loss of Abu Talib and Khadijah RA, and severe rejection at Ta’if), Jibril (AS) brought Al-Buraq to the Prophet ﷺ beside the Ka’bah.',
      'The Night Journey (Al-Isra) carried him ﷺ to Al-Masjid al-Aqsa in Jerusalem, where he led all earlier Prophets (Adam, Ibrahim, Musa, ‘Isa, and others) in congregation prayer.',
      'On the Ascension (Al-Mi‘raj) through the seven heavens, he greeted Adam (1st heaven), Yahya and ‘Isa (2nd), Yusuf (3rd), Idris (4th), Harun (5th), Musa (6th), and Ibrahim (7th, reclining against Al-Bayt al-Ma‘mur).',
      'At Sidrat al-Muntaha above the seventh heaven, Allah directly enjoined fifty daily prayers—without an angelic intermediary—then reduced them upon Musa (AS)’s counsel to five daily prayers carrying the full reward of fifty, plus the final two verses of Surah Al-Baqarah (2:285–286).',
    ],
    quranVerses: [
      {
        label: "Qur'an 17:1",
        surahNumber: 17,
        ayahNumber: 1,
        arabic:
          'سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى الَّذِي بَارَكْنَا حَوْلَهُ لِنُرِيَهُ مِنْ آيَاتِنَا',
        english:
          'Exalted is He who took His Servant by night from al-Masjid al-Haram to al-Masjid al-Aqsa, whose surroundings We have blessed, to show him of Our signs.',
        revelationContext: 'Direct Qur’anic declaration of the Night Journey (Al-Isra).',
      },
      {
        label: "Qur'an 53:13–18",
        surahNumber: 53,
        ayahNumber: 13,
        arabic: 'وَلَقَدْ رَآهُ نَزْلَةً أُخْرَىٰ ۝ عِندَ سِدْرَةِ الْمُنتَهَىٰ ۝ عِندَهَا جَنَّةُ الْمَأْوَىٰ',
        english:
          'And he certainly saw him in another descent at the Lote Tree of the Utmost Boundary—near it is the Garden of Refuge.',
        revelationContext: 'Surah An-Najm describes what the Prophet ﷺ witnessed at Sidrat al-Muntaha during Al-Mi‘raj.',
      },
      {
        label: "Qur'an 2:285–286",
        surahNumber: 2,
        ayahNumber: 285,
        arabic: 'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ',
        english:
          'The Messenger has believed in what was revealed to him from his Lord, and [so have] the believers...',
        revelationContext:
          'In Sahih Muslim (173), these final two verses of Surah Al-Baqarah were among the three gifts bestowed upon the Prophet ﷺ at Sidrat al-Muntaha.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Guarding the Five Daily Prayers Enjoined Above the Heavens',
        hadithSource: 'Sahih al-Bukhari 349 & 3207 · Sahih Muslim 162a',
        narrator: 'Anas ibn Malik (RA)',
        hadithText:
          'Allah said: “O Muhammad, these are five prayers every day and night; for each prayer there is ten, so that is fifty prayers! Whoever intends a good deed and does not do it, one good deed is recorded for him; and if he does it, ten are recorded.”',
      },
      {
        practiceTitle: 'Reciting the Last Two Verses of Surah Al-Baqarah Each Night',
        hadithSource: 'Sahih Muslim 173 · Sahih al-Bukhari 5009',
        narrator: 'Abdullah ibn Mas’ud (RA)',
        hadithText:
          'When the Prophet ﷺ ascended to Sidrat al-Muntaha he was given three things: the five daily prayers, the concluding verses of Surah Al-Baqarah, and forgiveness for major sins for whoever does not associate anything with Allah. And he ﷺ said: “Whoever recites the last two verses of Surah Al-Baqarah at night, they will suffice him.”',
      },
    ],
    quranRef: {
      label: "Qur'an 17:1",
      surahNumber: 17,
      ayahNumber: 1,
      english:
        'Exalted is He who took His Servant by night from al-Masjid al-Haram to al-Masjid al-Aqsa, whose surroundings We have blessed, to show him of Our signs.',
    },
    hadithRef: {
      source: 'Sahih al-Bukhari 349 & 3207',
      narrator: 'Anas ibn Malik (RA)',
      text: '“They are five (prayers), yet they carry the reward of fifty; My Word does not change.”',
    },
  },

  // SHABAN (Month 8)
  {
    id: 'shb-14',
    month: 8,
    day: 14,
    title: 'Change of the Qiblah & Prophetic Fasting in Sha‘ban',
    category: 'revelation',
    summary:
      'In Sha’ban of 2 AH (~16–17 months after arriving in Madinah), Allah commanded Muslims to turn in prayer forever from Masjid al-Aqsa to the Sacred Ka’bah in Makkah.',
    historicalDetails: [
      'For the first 16 to 17 months after the Hijrah to Madinah, the Prophet ﷺ prayed toward Bayt al-Maqdis (Jerusalem) while longing and turning his gaze skyward hoping for Allah’s permission to face Ibrahim’s Ka’bah.',
      'During Dhuhr (or Asr) prayer in Madinah (at Masjid Banu Salamah—later named Masjid al-Qiblatayn), Surah Al-Baqarah 2:144 was revealed; the Prophet ﷺ turned mid-prayer 180 degrees from north to south toward Makkah, and the congregation turned with him without breaking Salah.',
      'In the same blessed month of Sha’ban in 2 AH, fasting Ramadan was also revealed shortly ahead of the first Ramadan fast.',
    ],
    quranVerses: [
      {
        label: "Qur'an 2:144",
        surahNumber: 2,
        ayahNumber: 144,
        arabic:
          'قَدْ نَرَىٰ تَقَلُّبَ وَجْهِكَ فِي السَّمَاءِ ۖ فَلَنُوَلِّيَنَّكَ قِبْلَةً تَرْضَاهَا ۚ فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ',
        english:
          'We have certainly seen the turning of your face, [O Muhammad], toward the heaven, and We will surely turn you to a qiblah with which you will be pleased. So turn your face toward al-Masjid al-Haram.',
        revelationContext: 'Commanding the permanent change of Qiblah to Al-Masjid al-Haram in Makkah in Sha’ban 2 AH.',
      },
      {
        label: "Qur'an 2:143",
        surahNumber: 2,
        ayahNumber: 143,
        arabic: 'وَكَذَٰلِكَ جَعَلْنَاكُمْ أُمَّةً وَسَطًا',
        english:
          'And thus We have made you a just community that you will be witnesses over the people...',
        revelationContext:
          'Revealed alongside the Qiblah change, comforting the Companions that prayers performed toward the former Qiblah would never go to waste.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Increasing Voluntary Fasts During Sha‘ban',
        hadithSource: "Sunan an-Nasa'i 2357 (Sahih)",
        narrator: 'Usamah ibn Zayd (RA)',
        hadithText:
          'I said: “O Messenger of Allah, I do not see you fasting in any month as much as you fast in Sha‘ban.” He ﷺ replied: “That is a month people neglect between Rajab and Ramadan; it is a month in which deeds are raised to the Lord of the Worlds, and I love that my deeds be raised while I am fasting.”',
      },
      {
        practiceTitle: 'Prophetic Pattern of Sha‘ban Fasting (Aishah RA)',
        hadithSource: 'Sahih al-Bukhari 1969 · Sahih Muslim 1156a',
        narrator: 'Aishah (RA)',
        hadithText:
          '“The Messenger of Allah ﷺ never fasted an entire month except Ramadan, and I never saw him fast more in any month than he did in Sha‘ban.”',
      },
    ],
    quranRef: {
      label: "Qur'an 2:144",
      surahNumber: 2,
      ayahNumber: 144,
      english:
        'So turn your face toward al-Masjid al-Haram. And wherever you [believers] are, turn your faces toward it [in prayer].',
    },
    hadithRef: {
      source: "Sunan an-Nasa'i 2357 · Sahih al-Bukhari 4486",
      narrator: 'Usamah ibn Zayd & Al-Bara (RA)',
      text: '“That is a month people neglect between Rajab and Ramadan; in it deeds are raised to the Lord of the Worlds.”',
    },
  },
  {
    id: 'shb-15',
    month: 8,
    day: 15,
    title: 'Mid-Sha‘ban Night (Laylatul Bara‘ah / Nisf Sha‘ban)',
    category: 'worship',
    summary:
      'Authentic Hadith records that on the night of mid-Sha’ban Allah pardons His creation except one who commits Shirk or harbors rancor against his brother.',
    historicalDetails: [
      'Occurs on the fifteenth night of Sha’ban—also falling on the 3rd White Day (15th) of the month.',
      'Muhaddithun confirm the Hadith regarding Allah’s mercy descending on this night and withholding forgiveness from polytheism and bitter enmity, while noting no fixed congregational celebration was prescribed exclusively for this single night.',
    ],
    quranVerses: [
      {
        label: "Qur'an 59:10",
        surahNumber: 59,
        ayahNumber: 10,
        arabic: 'رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِّلَّذِينَ آمَنُوا',
        english:
          'Our Lord, forgive us and our brothers who preceded us in faith and put not in our hearts [any] resentment toward those who have believed.',
        revelationContext: 'Qur’anic supplication seeking cleansing of the heart from malice (ghill) and rancor.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Clearing the Heart of Shirk and Malice Against Fellow Believers',
        hadithSource: 'Sunan Ibn Majah 1390 · Sahih Ibn Hibban 5665 (Sahih)',
        narrator: 'Abu Musa al-Ash’ari & Mu’adh ibn Jabal (RA)',
        hadithText:
          'The Messenger of Allah ﷺ said: “Allah looks down on the night of mid-Sha’ban and forgives all of His creation except a mushrik (one who associates partners with Him) or a mushahin (one who harbors bitter enmity/hatred).”',
      },
      {
        practiceTitle: 'Prohibition of Fasting Only 1–2 Days Directly Preceding Ramadan',
        hadithSource: 'Sahih al-Bukhari 1914',
        narrator: 'Abu Hurairah (RA)',
        hadithText:
          'The Prophet ﷺ said: “None of you should fast a day or two before Ramadan except a man who has a regular habit of fasting (such as Monday/Thursday)—let him fast that day.”',
      },
    ],
    quranRef: {
      label: "Qur'an 59:10",
      surahNumber: 59,
      ayahNumber: 10,
      english:
        'Our Lord, forgive us and our brothers who preceded us in faith and put not in our hearts [any] resentment toward those who have believed.',
    },
    hadithRef: {
      source: 'Sunan Ibn Majah 1390 · Sahih Ibn Hibban 5665',
      narrator: 'Abu Musa al-Ash’ari (RA)',
      text: '“Allah looks down on the night of mid-Sha’ban and forgives all of His creation except one who associates partners with Him or harbors hatred.”',
    },
  },

  // RAMADAN (Month 9) — Highlighted Key Fixed Days (Other Ramadan days 1-30 use enriched RAMADAN_DAILY_MILESTONES below)
  {
    id: 'ram-1',
    month: 9,
    day: 1,
    title: '1st Ramadan · Obligation of Fasting & Gates of Jannah Opened',
    category: 'revelation',
    summary:
      'Beginning of the obligatory fast of Ramadan (legislated in 2 AH); when the crescent appears, the gates of Paradise open, the gates of Hell lock, and devils are chained.',
    historicalDetails: [
      'Before 2 AH, Muslims fasted three days each month and on ‘Ashura; in Sha’ban 2 AH Allah revealed Surah Al-Baqarah 2:183–187 making the fast of the entire month of Ramadan obligatory upon every healthy adult believer.',
      'The first complete Ramadan fasted by the Prophet ﷺ and the Companions in Madinah took place in 2 AH—the very same Ramadan in which the Battle of Badr and Zakat al-Fitr were also legislated.',
    ],
    quranVerses: [
      {
        label: "Qur'an 2:183",
        surahNumber: 2,
        ayahNumber: 183,
        arabic:
          'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
        english:
          'O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous.',
        revelationContext: 'Command ordaining the fast of Ramadan in Madinah (2 AH).',
      },
      {
        label: "Qur'an 2:185",
        surahNumber: 2,
        ayahNumber: 185,
        arabic:
          'شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ وَبَيِّنَاتٍ مِّنَ الْهُدَىٰ وَالْفُرْقَانِ ۚ فَمَن شَهِدَ مِنكُمُ الشَّهْرَ فَلْيَصُمْهُ',
        english:
          'The month of Ramadan [is that] in which was revealed the Qur’an, a guidance for the people and clear proofs of guidance and criterion. So whoever sights [the new moon of] the month, let him fast it.',
        revelationContext: 'Connects Ramadan directly to the descent of the Qur’an and witnessing the crescent.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Sighting the Crescent & Sincere Faith Seeking Forgiveness',
        hadithSource: 'Sahih al-Bukhari 1899 & 1901 · Sahih Muslim 1079a',
        narrator: 'Abu Hurairah (RA)',
        hadithText:
          'The Messenger of Allah ﷺ said: “When Ramadan begins, the gates of Paradise are opened, the gates of Hell are closed, and the devils are chained.” And: “Whoever fasts Ramadan out of faith (Iman) and hoping for reward (Ihtisab), his previous sins will be forgiven.”',
      },
      {
        practiceTitle: 'Forming the Intention Before Fajr for Obligatory Fasts',
        hadithSource: "Sunan Abi Dawud 2454 · Sunan an-Nasa'i 2331 (Sahih)",
        narrator: 'Hafsah bint Umar (RA)',
        hadithText:
          'The Prophet ﷺ said: “Whoever does not determine to fast before Fajr, there is no fast for him.”',
      },
      {
        practiceTitle: 'Supplication Upon Sighting the New Crescent Moon',
        hadithSource: "Jami' at-Tirmidhi 3451 (Sahih)",
        narrator: 'Talhah ibn Ubaydillah (RA)',
        hadithText:
          'Upon seeing the crescent, the Prophet ﷺ said: “Allahumma ahillahu ‘alayna bil-yumni wal-iman was-salamati wal-Islam; Rabbi wa Rabbuk-Allah (O Allah, let this crescent appear over us with security and faith, safety and Islam; my Lord and your Lord is Allah).”',
      },
    ],
    quranRef: {
      label: "Qur'an 2:183 & 2:185",
      surahNumber: 2,
      ayahNumber: 185,
      english:
        'The month of Ramadan [is that] in which was revealed the Qur’an, a guidance for the people and clear proofs of guidance and criterion.',
    },
    hadithRef: {
      source: 'Sahih al-Bukhari 1899 & 1901 · Sahih Muslim 1079a',
      narrator: 'Abu Hurairah (RA)',
      text: '“When the month of Ramadan enters, the gates of Paradise are opened, the gates of Hell are closed, and the devils are chained.”',
    },
  },
  {
    id: 'ram-10',
    month: 9,
    day: 10,
    title: '10th Ramadan · Passing of Mother of the Believers Khadijah (RA)',
    category: 'history',
    summary:
      'On 10 Ramadan (10th year of Prophethood, 3 years before Hijrah), Khadijah bint Khuwaylid (RA), first believer and wife of the Prophet ﷺ for 25 years, passed away in Makkah.',
    historicalDetails: [
      'Born in Makkah from Banu Asad, Khadijah (RA) married Muhammad ﷺ 15 years before revelation and supported him unconditionally for 25 years without another co-wife.',
      'When Jibril (AS) appeared at Cave Hira with the first verses of Surah Al-‘Alaq, she comforted the trembling Prophet ﷺ: “Never! By Allah, Allah will never disgrace you,” and took him to her cousin Waraqah ibn Nawfal.',
      'She endured the three-year Shi‘b Abi Talib starvation boycott alongside Banu Hashim, sacrificing her entire fortune for the survival of the early Muslim community, and passed away shortly after the boycott ended in Ramadan of the Year of Sorrow.',
      'All surviving children of the Prophet ﷺ except Ibrahim were borne by her, including Fatimah az-Zahra (RA). Angel Jibril (AS) conveyed Salam directly from Allah to her.',
    ],
    quranVerses: [
      {
        label: "Qur'an 93:6–8",
        surahNumber: 93,
        ayahNumber: 8,
        arabic: 'وَوَجَدَكَ عَائِلًا فَأَغْنَىٰ',
        english: 'And He found you poor and made [you] self-sufficient.',
        revelationContext:
          'Allah granted sufficiency in Makkah through her partnership and loyalty during the first decade of Da‘wah.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Honoring the Virtue of Khadijah (RA) as Proclaimed in Sahih Hadith',
        hadithSource: 'Sahih al-Bukhari 3820 & 3821',
        narrator: 'Abu Hurairah & Aishah (RA)',
        hadithText:
          'Jibril came to the Prophet ﷺ and said: “O Messenger of Allah, here comes Khadijah carrying a vessel of food or drink. When she comes to you, convey to her greetings of Salam from her Lord and from me, and give her glad tidings of a palace in Paradise made of Qasab pearls wherein there is neither noise nor fatigue.”',
      },
      {
        practiceTitle: 'Maintaining Loyalty Toward Loved Ones & Friends of Deceased Parents/Spouses',
        hadithSource: 'Sahih al-Bukhari 3818',
        narrator: 'Aishah (RA)',
        hadithText:
          'Whenever the Prophet ﷺ slaughtered a sheep, he would send portions of it to the female friends of Khadijah (RA) out of enduring faithfulness to her.',
      },
    ],
    hadithRef: {
      source: 'Sahih al-Bukhari 3820',
      narrator: 'Abu Hurairah (RA)',
      text: 'Jibril said: “Give Khadijah glad tidings of a palace of Qasab pearls in Paradise wherein there is neither noise nor fatigue.”',
    },
  },
  {
    id: 'ram-17',
    month: 9,
    day: 17,
    title: '17th Ramadan · Yawm al-Furqan (The Great Battle of Badr, 2 AH)',
    category: 'history',
    summary:
      'On Friday 17 Ramadan 2 AH at the wells of Badr, 313 fasting Companions led by the Prophet ﷺ defeated over 1,000 heavily armed Quraysh with 1,000 supporting angels.',
    historicalDetails: [
      'A small Muslim force of 313 men (with only 2 horses and 70 shared camels) set out to intercept Abu Sufyan’s Quraysh caravan transporting confiscated Makkan Muslim wealth; Abu Sufyan diverted the caravan and escaped, yet Abu Jahl insisted on marching over 1,000 armed Quraysh warriors to Badr to crush Islam.',
      'Following the counsel of Al-Hubab ibn al-Mundhir (RA), the Muslims camped at the nearest well of Badr and built a cistern; Allah sent down a soothing night rain that compacted the sand under Muslim feet and softened the ground beneath Quraysh.',
      'Throughout the night of 17 Ramadan, the Prophet ﷺ stood in continuous prayer and weeping Dua beneath an ‘Arish shelter with Abu Bakr (RA) behind him until his cloak fell off his shoulders.',
      'After the opening triple duel (Hamzah, Ali, and ‘Ubaydah ibn al-Harith vs. ‘Utbah, Shaybah, and Al-Walid), Allah reinforced the believers with 1,000 angels led by Jibril (AS); seventy Quraysh leaders including Abu Jahl were killed and seventy captured.',
    ],
    quranVerses: [
      {
        label: "Qur'an 8:9",
        surahNumber: 8,
        ayahNumber: 9,
        arabic:
          'إِذْ تَسْتَغِيثُونَ رَبَّكُمْ فَاسْتَجَابَ لَكُمْ أَنِّي مُمِدُّكُم بِأَلْفٍ مِّنَ الْمَلَائِكَةِ مُرْدِفِينَ',
        english:
          '[Remember] when you asked help of your Lord, and He answered you, “Indeed, I will reinforce you with a thousand from the angels, following one another.”',
        revelationContext:
          'Direct response revealed in Surah Al-Anfal after the Prophet ﷺ cried out in Dua on the eve and morning of Badr.',
      },
      {
        label: "Qur'an 3:123",
        surahNumber: 3,
        ayahNumber: 123,
        arabic: 'وَلَقَدْ نَصَرَكُمُ اللَّهُ بِبَدْرٍ وَأَنتُمْ أَذِلَّةٌ ۖ فَاتَّقُوا اللَّهَ لَعَلَّكُمْ تَشْكُرُونَ',
        english:
          'And already had Allah given you victory at Badr while you were few in number. Then fear Allah; perhaps you will be grateful.',
        revelationContext: 'Reminds the Ummah that victory came solely from Allah despite severe numerical weakness.',
      },
      {
        label: "Qur'an 8:41",
        surahNumber: 8,
        ayahNumber: 41,
        arabic: 'وَمَا أَنزَلْنَا عَلَىٰ عَبْدِنَا يَوْمَ الْفُرْقَانِ يَوْمَ الْتَقَى الْجَمْعَانِ',
        english:
          'And what We sent down to Our Servant on the Day of Criterion—the day when the two armies met.',
        revelationContext: 'Allah named 17 Ramadan “Yawm al-Furqan” (The Day of Criterion between truth and falsehood).',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Turning to Allah in Humble Supplication in Times of Trial',
        hadithSource: 'Sahih Muslim 1763a',
        narrator: 'Umar ibn al-Khattab (RA)',
        hadithText:
          'On the Day of Badr, the Prophet ﷺ looked at the polytheists who were 1,000 while his Companions were 313. He faced the Qiblah, raised his hands, and cried: “O Allah, fulfill what You promised me! O Allah, if this small band of Muslims is destroyed, You will not be worshipped on earth.” He continued pleading until his cloak fell from his shoulders and Abu Bakr comforted him.',
      },
      {
        practiceTitle: 'Recognizing the Elevated Rank of the People of Badr',
        hadithSource: 'Sahih al-Bukhari 3983 & 3992',
        narrator: 'Rifa‘ah ibn Rafi‘ az-Zuraqi (RA)',
        hadithText:
          'Jibril came to the Prophet ﷺ and asked: “How do you regard the people of Badr among you?” He ﷺ said: “Among the best of the Muslims.” Jibril said: “So too are the angels who witnessed Badr.”',
      },
    ],
    quranRef: {
      label: "Qur'an 3:123 & 8:9",
      surahNumber: 3,
      ayahNumber: 123,
      english:
        'And already had Allah given you victory at Badr while you were few in number. Then fear Allah; perhaps you will be grateful.',
    },
    hadithRef: {
      source: 'Sahih Muslim 1763a · Sahih al-Bukhari 3983',
      narrator: 'Umar ibn al-Khattab & Rifa‘ah ibn Rafi‘ (RA)',
      text: '“O Allah, fulfill what You promised me! Allah revealed: ‘I will reinforce you with a thousand of the angels following one another.’”',
    },
  },
  {
    id: 'ram-20',
    month: 9,
    day: 20,
    title: '20th Ramadan · Peaceful Conquest of Makkah (Fath Makkah, 8 AH)',
    category: 'history',
    summary:
      'On 20 Ramadan 8 AH, after Quraysh allies broke the Treaty of Hudaybiyyah, the Prophet ﷺ entered Makkah with 10,000 Companions practically unopposed, purified the Ka’bah of 360 idols, and pardoned the Makkans.',
    historicalDetails: [
      'When Banu Bakr (backed secretly by Quraysh) attacked the Muslim-allied Banu Khuza’ah inside the Sanctuary in breach of Hudaybiyyah, the Prophet ﷺ marched silently in Ramadan 8 AH with 10,000 Companions.',
      'Near Marr az-Zahran, 10,000 campfires were lit; Abu Sufyan embraced Islam that night, and the Prophet ﷺ divided the army into four columns entering Makkah peacefully from all sides with orders never to fight unless attacked.',
      'Riding his she-camel al-Qaswa with his head bowed so low his beard nearly touched the saddle in humility to Allah, the Prophet ﷺ performed Tawaf and struck the 360 idols around the Ka’bah with his staff while reciting Qur’an 17:81.',
      'Before Quraysh gathered trembling at the Ka’bah door, he asked: “What do you expect me to do to you?” They said: “A noble brother, son of a noble brother.” He replied with Prophet Yusuf’s words (12:92): “No blame upon you today; go, for you are free!” Bilal (RA) then climbed atop the Ka’bah and gave the first Adhan in conquered Makkah.',
    ],
    quranVerses: [
      {
        label: "Qur'an 17:81",
        surahNumber: 17,
        ayahNumber: 81,
        arabic: 'وَقُلْ جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ ۚ إِنَّ الْبَاطِلَ كَانَ زَهُوقًا',
        english:
          'And say, “Truth has come, and falsehood has departed. Indeed is falsehood, [by nature], ever bound to depart.”',
        revelationContext:
          'Recited aloud by the Prophet ﷺ inside Al-Masjid al-Haram as every idol fell upon its face during Fath Makkah.',
      },
      {
        label: "Qur'an 110:1–3",
        surahNumber: 110,
        ayahNumber: 1,
        arabic:
          'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ ۝ وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا ۝ فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ',
        english:
          'When the victory of Allah has come and the conquest, and you see the people entering into the religion of Allah in multitudes, then exalt [Him] with praise of your Lord and ask forgiveness of Him.',
        revelationContext:
          'Surah An-Nasr was fulfilled at the Conquest of Makkah as delegations poured into Islam across Arabia.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Humility, Istighfar, and Tasbih Upon Achievement (Surah 110 Practice)',
        hadithSource: 'Sahih al-Bukhari 4968 · Sahih Muslim 484',
        narrator: 'Aishah (RA)',
        hadithText:
          'After the revelation of Surah An-Nasr (110), the Prophet ﷺ frequently recited in his bowing (Ruku’) and prostration (Sujud): “Subhanaka Allahumma Rabbana wa bihamdika, Allahummaghfir li (Glory be to You O Allah our Lord and praise be to You; O Allah forgive me)” in compliance with the Qur’an.',
      },
      {
        practiceTitle: 'Praying Eight Rak‘ahs of Duha Upon Victory or Entering Peacefully',
        hadithSource: 'Sahih al-Bukhari 357 & 4291',
        narrator: 'Umm Hani bint Abi Talib (RA)',
        hadithText:
          'On the day of the Conquest of Makkah, the Prophet ﷺ bathed inside Umm Hani’s house and prayed eight rak‘ahs (Duha prayer) draped in a single garment.',
      },
      {
        practiceTitle: 'Purifying Heart and Action from Idolatry & Falsehood',
        hadithSource: 'Sahih al-Bukhari 4287',
        narrator: 'Abdullah ibn Mas’ud (RA)',
        hadithText:
          'When the Prophet ﷺ entered Makkah, around the Ka’bah were 360 idols. He struck them with a stick in his hand saying: “Truth has come and falsehood has departed,” and “Truth has come, and falsehood neither originates nor returns.”',
      },
    ],
    quranRef: {
      label: "Qur'an 17:81 & 110:1–3",
      surahNumber: 17,
      ayahNumber: 81,
      english:
        'And say, “Truth has come, and falsehood has departed. Indeed is falsehood, [by nature], ever bound to depart.”',
    },
    hadithRef: {
      source: 'Sahih al-Bukhari 4287 & 4291',
      narrator: 'Abdullah ibn Mas’ud & Umm Hani (RA)',
      text: 'The Prophet ﷺ entered Makkah while around the Ka’bah stood 360 idols; he struck them reciting Qur’an 17:81 until every idol fell.',
    },
  },
  {
    id: 'ram-21',
    month: 9,
    day: 21,
    title: '21st Night of Ramadan · Beginning of Final Ten Nights & I‘tikaf',
    category: 'worship',
    summary:
      'Sunset ending the 20th day ushers in the first of the Last Ten Nights and the first Odd Night in which the Prophet ﷺ entered I‘tikaf and stayed up through the night.',
    historicalDetails: [
      'Until 20 Ramadan in his Madinan years, the Prophet ﷺ initially entered I’tikaf in the middle ten nights seeking Laylatul Qadr; Jibril informed him it was in the final ten nights, so from then onward he observed I’tikaf strictly during the last ten days and nights until Allah took his soul.',
      'At sunset before Night 21, he withdrew from daily household routines into a small tent pitched inside Al-Masjid an-Nabawi so his entire night and day were devoted exclusively to Salah, Qur’an, and Dhikr.',
    ],
    quranVerses: [
      {
        label: "Qur'an 97:1–5",
        surahNumber: 97,
        ayahNumber: 1,
        arabic: 'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ',
        english: 'Indeed, We sent the Qur’an down during the Night of Decree.',
        revelationContext: 'Surah Al-Qadr reveals the rank of Laylatul Qadr sought from Night 21 onward.',
      },
      {
        label: "Qur'an 2:187",
        surahNumber: 2,
        ayahNumber: 187,
        arabic: 'وَلَا تُبَاشِرُوهُنَّ وَأَنتُمْ عَاكِفُونَ فِي الْمَسَاجِدِ',
        english: 'And do not have relations with them as long as you are staying for worship in the mosques.',
        revelationContext: 'Qur’anic legislation of spiritual seclusion (I’tikaf) in the mosques.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Striving Harder in Worship & Waking One’s Family During the Last Ten Nights',
        hadithSource: 'Sahih al-Bukhari 2024 · Sahih Muslim 1174',
        narrator: 'Aishah (RA)',
        hadithText:
          '“When the last ten nights entered, the Prophet ﷺ would tighten his waist belt (striving in worship), stay awake through the night, and wake up his family.”',
      },
      {
        practiceTitle: 'Observing I‘tikaf in the Masjid During the Final Ten Days',
        hadithSource: 'Sahih al-Bukhari 2026',
        narrator: 'Aishah (RA)',
        hadithText:
          '“The Prophet ﷺ used to practice I‘tikaf in the last ten days of Ramadan until Allah took his soul, and after him his wives practiced I‘tikaf.”',
      },
      {
        practiceTitle: 'Seeking Laylatul Qadr on the Odd Nights',
        hadithSource: 'Sahih al-Bukhari 2017',
        narrator: 'Aishah (RA)',
        hadithText:
          'The Messenger of Allah ﷺ said: “Search for Laylatul Qadr in the odd nights of the last ten days of Ramadan.”',
      },
    ],
    quranRef: {
      label: "Qur'an 97:1–5",
      surahNumber: 97,
      ayahNumber: 1,
      english: 'Indeed, We sent the Qur’an down during the Night of Decree.',
    },
    hadithRef: {
      source: 'Sahih al-Bukhari 2024 & 2026',
      narrator: 'Aishah (RA)',
      text: '“When the last ten nights entered, the Prophet ﷺ tightened his lower garment, enlivened his night, and woke his family.”',
    },
  },
  {
    id: 'ram-23',
    month: 9,
    day: 23,
    title: '23rd Night of Ramadan · 2nd Odd Night (Night of Water & Clay)',
    category: 'worship',
    summary:
      'Second odd night of the final Ashra; recorded in Sahih al-Bukhari and Sahih Muslim when heavy rain fell over the palm-frond roof of Al-Masjid an-Nabawi while the Prophet ﷺ prayed till dawn.',
    historicalDetails: [
      'In Madinah, Abu Sa’id al-Khudri (RA) narrated that the Prophet ﷺ saw Laylatul Qadr in a dream—where he prostrated in mud and water on an odd morning—and then forgot which exact night it was, instructing the Companions to seek it in the last ten odd nights.',
      'Rain fell during the 21st and 23rd nights through the palm-leaf roof of Al-Masjid an-Nabawi; Abdullah ibn Unays (RA) specifically narrated that the Prophet ﷺ stood in Qiyam on the 23rd night until Fajr, and Abu Sa’id saw traces of mud and water on the Prophet’s ﷺ forehead and nose.',
    ],
    quranVerses: [
      {
        label: "Qur'an 73:20",
        surahNumber: 73,
        ayahNumber: 20,
        arabic:
          'إِنَّ رَبَّكَ يَعْلَمُ أَنَّكَ تَقُومُ أَدْنَىٰ مِن ثُلُثَيِ اللَّيْلِ وَنِصْفَهُ وَثُلُثَهُ وَطَائِفَةٌ مِّنَ الَّذِينَ مَعَكَ',
        english:
          'Indeed, your Lord knows, [O Muhammad], that you stand [in prayer] almost two thirds of the night or half of it or a third of it, and [so do] a group of those with you.',
        revelationContext: 'Describes the Prophetic Qiyam al-Layl in devotion and measured Qur’an recitation.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Qiyam Until Dawn on the 23rd Night',
        hadithSource: 'Sahih Muslim 1168a',
        narrator: 'Abdullah ibn Unays (RA)',
        hadithText:
          'The Prophet ﷺ stood in night prayer on the twenty-third night of Ramadan after rain fell over the Masjid, continuing in prayer until morning with traces of water and mud upon his forehead.',
      },
      {
        practiceTitle: 'Forgiveness for Whoever Stands in Prayer Out of Faith on Laylatul Qadr',
        hadithSource: 'Sahih al-Bukhari 1901',
        narrator: 'Abu Hurairah (RA)',
        hadithText:
          'The Messenger of Allah ﷺ said: “Whoever establishes night prayer on Laylatul Qadr out of sincere faith and hoping for Allah’s reward will have all his previous sins forgiven.”',
      },
    ],
    quranRef: {
      label: "Qur'an 73:20",
      surahNumber: 73,
      ayahNumber: 20,
      english:
        'Indeed, your Lord knows, [O Muhammad], that you stand [in prayer] almost two thirds of the night or half of it or a third of it.',
    },
    hadithRef: {
      source: 'Sahih Muslim 1168a · Sahih al-Bukhari 2018',
      narrator: 'Abdullah ibn Unays & Abu Sa’id al-Khudri (RA)',
      text: 'The Prophet ﷺ prayed until morning on the 23rd night after rain softened the floor of the Masjid, with traces of mud and water on his forehead.',
    },
  },
  {
    id: 'ram-25',
    month: 9,
    day: 25,
    title: '25th Night of Ramadan · 3rd Odd Night of Laylatul Qadr',
    category: 'worship',
    summary:
      'Middle odd night of the final ten nights; Abdullah ibn Abbas (RA) narrated seeking Laylatul Qadr explicitly on the nights of 29, 27, and 25.',
    historicalDetails: [
      'Because Allah concealed which specific odd night holds Laylatul Qadr—after two Companions quarreled outside while the Prophet ﷺ came out to announce the exact date—the Ummah was commanded to seek it across the final odd nights including Night 25.',
      'Ibn Abbas (RA) narrated a specific Hadith instructing seekers to look when nine nights remain, seven remain, or five remain (21st, 23rd, 25th, 27th, 29th depending on a 29- or 30-day month).',
    ],
    quranVerses: [
      {
        label: "Qur'an 44:3–4",
        surahNumber: 44,
        ayahNumber: 3,
        arabic: 'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةٍ مُّبَارَكَةٍ ۚ إِنَّا كُنَّا مُنذِرِينَ ۝ فِيهَا يُفْرَقُ كُلُّ أَمْرٍ حَكِيمٍ',
        english:
          'Indeed, We sent it down during a blessed night. Indeed, We were to warn [mankind]. On that night is made distinct every precise matter.',
        revelationContext: 'Surah Ad-Dukhan describes the Blessed Night in which annual decrees are apportioned to the angels.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Seeking the Remaining 9, 7, and 5 Nights of Ramadan',
        hadithSource: 'Sahih al-Bukhari 2021',
        narrator: 'Abdullah ibn Abbas (RA)',
        hadithText:
          'The Prophet ﷺ said: “Look for it in the last ten nights of Ramadan: when nine remain, when seven remain, and when five remain (nights 21, 23, 25).”',
      },
      {
        practiceTitle: 'Leading the Congregation in Extended Qiyam on Nights 23, 25 & 27',
        hadithSource: 'Sunan Abi Dawud 1375 (Sahih)',
        narrator: 'Abu Dharr al-Ghifari (RA)',
        hadithText:
          'The Prophet ﷺ led his Companions in night prayer on the 23rd until one-third of the night passed, on the 25th until half the night passed, and on the 27th until they feared missing Suhoor (Falah).',
      },
    ],
    quranRef: {
      label: "Qur'an 44:3–4",
      surahNumber: 44,
      ayahNumber: 3,
      english:
        'Indeed, We sent it down during a blessed night. On that night is made distinct every precise matter.',
    },
    hadithRef: {
      source: 'Sahih al-Bukhari 2021 · Sunan Abi Dawud 1375',
      narrator: 'Ibn Abbas & Abu Dharr (RA)',
      text: 'The Prophet ﷺ led the Companions until half the night passed on the 25th and until near Sahoor on the 27th.',
    },
  },
  {
    id: 'ram-27',
    month: 9,
    day: 27,
    title: '27th Night of Ramadan · Foremost Night Associated with Laylatul Qadr',
    category: 'revelation',
    summary:
      'The night Ubayy ibn Ka’b (RA) swore to in Sahih Muslim by the sign of the gentle sunrise without scorching rays—and the night of the ‘Afuwwun Dua taught to Aishah (RA).',
    historicalDetails: [
      'A single night worth more than 1,000 months (83 years and 4 months): during it the Qur’an was sent down in totality from Al-Lawh al-Mahfuz to Bayt al-‘Izzah in the lowest heaven (according to Ibn Abbas RA), before descending piecemeal to the Prophet ﷺ over 23 years.',
      'Angels descend led by Jibril (ar-Ruh) in vast numbers carrying peace (Salam) until the rising of Fajr dawn.',
      'In Sahih Muslim (762a), Ubayy ibn Ka’b (RA) affirmed that by the Prophetic sign—the sun rising the following morning white and without blinding rays—it is the 27th night; while Aishah (RA) asked the Prophet ﷺ what exact Dua to recite if she knew which night was Laylatul Qadr.',
    ],
    quranVerses: [
      {
        label: "Qur'an 97:1–5",
        surahNumber: 97,
        ayahNumber: 3,
        arabic:
          'لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ ۝ تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِم مِّن كُلِّ أَمْرٍ ۝ سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ',
        english:
          'The Night of Decree is better than a thousand months. The angels and the Spirit descend therein by permission of their Lord for every matter. Peace it is until the emergence of dawn.',
        revelationContext: 'Complete Qur’anic testimony to the unmatched rank, angelic descent, and serenity of Laylatul Qadr.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Reciting the Prophetic ‘Afuwwun Supplication Taught to Aishah (RA)',
        hadithSource: "Jami' at-Tirmidhi 3513 · Sunan Ibn Majah 3850 (Sahih)",
        narrator: 'Aishah (RA)',
        hadithText:
          'I said: “O Messenger of Allah, if I know which night is Laylatul Qadr, what should I say in it?” He ﷺ said: “Say: Allahumma innaka ‘Afuwwun tuhibbul-‘afwa fa‘fu ‘anni (O Allah, You are Pardoning and love to pardon, so pardon me).”',
      },
      {
        practiceTitle: 'Observing Qiyam Al-Layl Seeking Pardon & Watching the Sign',
        hadithSource: 'Sahih Muslim 762a · Sahih al-Bukhari 1901',
        narrator: 'Ubayy ibn Ka’b & Abu Hurairah (RA)',
        hadithText:
          'Ubayy ibn Ka’b (RA) said: “By Allah, I know which night it is—the night the Messenger of Allah ﷺ commanded us to stand in prayer, the 27th night. Its sign is that the sun rises on its morning white without scorching rays.”',
      },
      {
        practiceTitle: 'Praying Through Until Near Suhoor (Like the 27th Night in Hadith)',
        hadithSource: 'Sunan Abi Dawud 1375 (Sahih)',
        narrator: 'Abu Dharr al-Ghifari (RA)',
        hadithText:
          'On the 27th night the Prophet ﷺ gathered his family, wives, and Companions and prayed with them until we feared we would miss Falah (Suhoor).',
      },
    ],
    quranRef: {
      label: "Qur'an 97:3–5",
      surahNumber: 97,
      ayahNumber: 3,
      english:
        'The Night of Decree is better than a thousand months. The angels and the Spirit descend therein by permission of their Lord for every matter.',
    },
    hadithRef: {
      source: "Jami' at-Tirmidhi 3513 (Sahih) · Sahih Muslim 762a",
      narrator: 'Aishah & Ubayy ibn Ka’b (RA)',
      text: '“O Allah, You are Pardoning and love to pardon, so pardon me.” (Allahumma innaka ‘Afuwwun tuhibbul-‘afwa fa‘fu ‘anni).',
    },
  },
  {
    id: 'ram-29',
    month: 9,
    day: 29,
    title: '29th Ramadan · Final Odd Night, Moon-Sighting & Zakat al-Fitr',
    category: 'worship',
    summary:
      'Final odd night of the last ten nights; at sunset Muslims observe the horizon for the Shawwal crescent and fulfill Zakat al-Fitr before Eid prayer.',
    historicalDetails: [
      'A lunar Hijri month has either 29 or 30 days; therefore at sunset on 29 Ramadan Muslims look westward for the Shawwal crescent—if sighted, Eid is the next morning, otherwise Ramadan completes 30 days.',
      'In 2 AH, alongside the fast of Ramadan, the Messenger of Allah ﷺ ordained Zakat al-Fitr (one Sa‘ of food—dates, barley, wheat, raisins, or staple grain) upon every Muslim, young and old, free or servant, to be delivered before people depart for the Eid prayer.',
    ],
    quranVerses: [
      {
        label: "Qur'an 2:185",
        surahNumber: 2,
        ayahNumber: 185,
        arabic: 'وَلِتُكْمِلُوا الْعِدَّةَ وَلِتُكَبِّرُوا اللَّهَ عَلَىٰ مَا هَدَاكُمْ وَلَعَلَّكُمْ تَشْكُرُونَ',
        english:
          'And [He wants] for you to complete the period and to glorify Allah for that [to] which He has guided you; and perhaps you will be grateful.',
        revelationContext: 'Orders completing the prescribed number of Ramadan days and glorifying Allah with Takbir upon reaching Eid.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Discharging Zakat al-Fitr Before Departing for Eid Prayer',
        hadithSource: 'Sahih al-Bukhari 1503 & 1509 · Sunan Abi Dawud 1609 (Sahih)',
        narrator: 'Abdullah ibn Umar & Abdullah ibn Abbas (RA)',
        hadithText:
          '“The Messenger of Allah ﷺ enjoined Zakat al-Fitr as a purification for the fasting person from idle and obscene speech and as food for the poor. Whoever pays it before the Eid prayer, it is an accepted Zakat; whoever pays it after the prayer, it is ordinary charity.”',
      },
      {
        practiceTitle: 'Rule of Sighting the Crescent & Completing 30 Days if Overcast',
        hadithSource: 'Sahih al-Bukhari 1909 · Sahih Muslim 1081',
        narrator: 'Abu Hurairah (RA)',
        hadithText:
          'The Prophet ﷺ said: “Fast upon seeing it (the Ramadan crescent) and break the fast upon seeing it (the Shawwal crescent); and if it is obscured by clouds, complete thirty days.”',
      },
    ],
    quranRef: {
      label: "Qur'an 2:185",
      surahNumber: 2,
      ayahNumber: 185,
      english:
        'He wants for you to complete the period and to glorify Allah for that [to] which He has guided you.',
    },
    hadithRef: {
      source: 'Sahih al-Bukhari 1503 & 1909 · Sunan Abi Dawud 1609',
      narrator: 'Ibn Umar, Ibn Abbas & Abu Hurairah (RA)',
      text: 'The Messenger of Allah ﷺ made Zakat al-Fitr obligatory as a purification for the fasting person from idle speech and as food for the poor.',
    },
  },

  // SHAWWAL (Month 10)
  {
    id: 'shw-1',
    month: 10,
    day: 1,
    title: 'Eid al-Fitr (1st of Shawwal)',
    category: 'eid',
    summary:
      'Day of gratitude, Takbir, congregation Eid prayer at the open Musalla, eating an odd number of dates before prayer, and strict prohibition of fasting.',
    historicalDetails: [
      'When the Prophet ﷺ migrated to Madinah, he found the Ansar celebrating two pre-Islamic festival days; he ﷺ declared: “Allah has replaced them for you with two better days: the Day of Fitr and the Day of Adha.”',
      'The first Eid al-Fitr was celebrated on 1 Shawwal 2 AH immediately following the first Ramadan fast and victory at Badr.',
      'From the night preceding Eid until the Imam arrives for Eid prayer, the Muslim community proclaims Takbir aloud in fulfillment of Qur’an 2:185.',
    ],
    quranVerses: [
      {
        label: "Qur'an 2:185",
        surahNumber: 2,
        ayahNumber: 185,
        arabic: 'وَلِتُكَبِّرُوا اللَّهَ عَلَىٰ مَا هَدَاكُمْ وَلَعَلَّكُمْ تَشْكُرُونَ',
        english:
          'And [He wants for you] to glorify Allah for that [to] which He has guided you; and perhaps you will be grateful.',
        revelationContext: 'Direct foundation for the Takbir of Eid al-Fitr upon completing Ramadan.',
      },
      {
        label: "Qur'an 87:14–15",
        surahNumber: 87,
        ayahNumber: 14,
        arabic: 'قَدْ أَفْلَحَ مَن تَزَكَّىٰ ۝ وَذَكَرَ اسْمَ رَبِّهِ فَصَلَّىٰ',
        english:
          'He has certainly succeeded who purifies himself, and mentions the name of his Lord and prays.',
        revelationContext:
          'Earlier scholars cited these verses regarding purifying oneself with Zakat al-Fitr, remembering Allah in Takbir, and praying Eid Salah.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Eating an Odd Number of Dates Before Departing for Eid Prayer',
        hadithSource: 'Sahih al-Bukhari 953',
        narrator: 'Anas ibn Malik (RA)',
        hadithText:
          '“Allah’s Messenger ﷺ never proceeded (to the prayer ground) on the Day of Fitr until he had eaten some dates; and he ate an odd number of them.”',
      },
      {
        practiceTitle: 'Performing Ghusl, Wearing Best Attire & Taking Two Different Routes',
        hadithSource: 'Sahih al-Bukhari 986 · Sahih al-Bukhari 948',
        narrator: 'Jabir ibn Abdullah & Abdullah ibn Umar (RA)',
        hadithText:
          '“On the day of Eid, the Prophet ﷺ used to return by a different route from the one he took going out.” And Ibn Umar (RA) used to wear his finest garment for the two Eids.',
      },
      {
        practiceTitle: 'Strict Prohibition of Fasting on 1st Shawwal',
        hadithSource: 'Sahih al-Bukhari 1991',
        narrator: 'Abu Sa’id al-Khudri (RA)',
        hadithText:
          '“The Prophet ﷺ forbade fasting on two days: the day of Fitr and the day of Sacrifice (Adha).”',
      },
      {
        practiceTitle: 'Prayer Before Sermon & Attendance of Women at the Musalla',
        hadithSource: 'Sahih al-Bukhari 956 & 974',
        narrator: 'Abdullah ibn Abbas & Umm ‘Atiyyah (RA)',
        hadithText:
          'The Prophet ﷺ prayed two rak‘ahs of Eid before delivering the sermon without Adhan or Iqamah, and commanded young women and even menstruating women to come out to witness the goodness and gathering of the Muslims (remaining apart from the prayer area).',
      },
    ],
    quranRef: {
      label: "Qur'an 2:185",
      surahNumber: 2,
      ayahNumber: 185,
      english:
        'He wants for you to complete the period and to glorify Allah for that [to] which He has guided you; and perhaps you will be grateful.',
    },
    hadithRef: {
      source: 'Sahih al-Bukhari 953, 986 & 1991',
      narrator: 'Anas, Jabir & Abu Sa’id al-Khudri (RA)',
      text: '“Allah’s Messenger ﷺ never proceeded on the Day of Fitr until he had eaten an odd number of dates, and he forbade fasting on the Day of Fitr.”',
    },
  },
  {
    id: 'shw-2',
    month: 10,
    day: 2,
    endDay: 7,
    title: 'Six Sunnah Fasts of Shawwal',
    category: 'fasting',
    summary:
      'Beginning from 2nd Shawwal (the day after Eid al-Fitr), fasting any six days in Shawwal grants the reward of fasting the entire year.',
    historicalDetails: [
      'Because Allah multiplies every good deed tenfold (Qur’an 6:160), fasting 30 days of Ramadan equals 300 days (10 months), and adding 6 days of Shawwal equals 60 days (2 months), totaling 360 days—the full lunar year.',
      'Jurists clarify the six days may be fasted consecutively starting from 2 Shawwal or spread across any days of Shawwal except 1 Shawwal (Eid).',
    ],
    quranVerses: [
      {
        label: "Qur'an 6:160",
        surahNumber: 6,
        ayahNumber: 160,
        arabic: 'مَن جَاءَ بِالْحَسَنَةِ فَلَهُ عَشْرُ أَمْثَالِهَا',
        english: 'Whoever comes [on the Day of Judgment] with a good deed will have ten times the like thereof [to his credit].',
        revelationContext: 'Establishes the tenfold reward multiplication explained in the Sunan for the six days of Shawwal.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Fasting Six Days of Shawwal After Completing Ramadan',
        hadithSource: 'Sahih Muslim 1164a',
        narrator: 'Abu Ayyub al-Ansari (RA)',
        hadithText:
          'The Messenger of Allah ﷺ said: “Whoever fasts Ramadan and then follows it with six days of Shawwal, it will be like fasting for an entire year (perpetually).”',
      },
      {
        practiceTitle: 'Tenfold Calculation Explicit in Sunan Narration',
        hadithSource: 'Sunan Ibn Majah 1715 · Musnad Ahmad 22412 (Sahih)',
        narrator: 'Thawban (RA)',
        hadithText:
          'The Prophet ﷺ said: “Allah has made each good deed worth tenfold: one month is equal to ten months, and fasting six days after breaking the fast completes the year.”',
      },
    ],
    quranRef: {
      label: "Qur'an 6:160",
      surahNumber: 6,
      ayahNumber: 160,
      english: 'Whoever comes with a good deed will have ten times the like thereof.',
    },
    hadithRef: {
      source: 'Sahih Muslim 1164a · Sunan Ibn Majah 1715',
      narrator: 'Abu Ayyub al-Ansari & Thawban (RA)',
      text: '“Whoever fasts Ramadan and then follows it with six days of Shawwal, it will be like fasting perpetually.”',
    },
  },
  {
    id: 'shw-7',
    month: 10,
    day: 7,
    title: 'Battle of Uhud (Shawwal 3 AH)',
    category: 'history',
    summary:
      'In Shawwal 3 AH at Mount Uhud north of Madinah, early Muslim victory turned to severe trial after archers left their assigned pass, and seventy Companions including Hamzah (RA) were martyred.',
    historicalDetails: [
      'A year after Badr, Quraysh marched 3,000 fighters to Uhud to avenge their defeat. The Prophet ﷺ marched out with 1,000 men, though Abdullah ibn Ubayy withdrew 300 hypocrites en route, leaving 700 Muslims.',
      'The Prophet ﷺ stationed 50 archers led by Abdullah ibn Jubayr (RA) on Jabal ar-Rumat with strict orders: “Even if you see birds snatching us, do not leave this post until I send word to you.”',
      'Initially the Muslims routed Quraysh; seeing booty left behind, forty archers descended against Ibn Jubayr’s warning. Khalid ibn al-Walid seized the empty ridge, wheeling cavalry behind Muslim lines.',
      'The Prophet ﷺ was wounded in the cheek, lost a lower incisor tooth, and seventy Companions—including Hamzah ibn Abd al-Muttalib (Master of Martyrs), Mus‘ab ibn Umayr, and Hanzalah—were martyred. Surah Ali ‘Imran (3:121–179) descended analyzing every lesson.',
    ],
    quranVerses: [
      {
        label: "Qur'an 3:139–140",
        surahNumber: 3,
        ayahNumber: 139,
        arabic: 'وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ',
        english:
          'So do not weaken and do not grieve, and you will be superior if you are [true] believers.',
        revelationContext: 'Revealed immediately after the Battle of Uhud to console and strengthen the battered Muslim ranks.',
      },
      {
        label: "Qur'an 3:169",
        surahNumber: 3,
        ayahNumber: 169,
        arabic: 'وَلَا تَحْسَبَنَّ الَّذِينَ قُتِلُوا فِي سَبِيلِ اللَّهِ أَمْوَاتًا ۚ بَلْ أَحْيَاءٌ عِندَ رَبِّهِمْ يُرْزَقُونَ',
        english:
          'And never think of those who have been killed in the cause of Allah as dead. Rather, they are alive with their Lord, receiving provision.',
        revelationContext: 'Revealed honoring the seventy martyrs of Uhud.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Steadfast Obedience to Prophetic Commands & Seeking Refuge in Patience',
        hadithSource: 'Sahih al-Bukhari 4043 & 3039',
        narrator: 'Al-Bara ibn ‘Azib (RA)',
        hadithText:
          'On the day of Uhud, the Prophet ﷺ placed Abdullah ibn Jubayr in command of fifty infantry archers saying: “Even if you see birds snatching us away, do not move from this place until I send for you.”',
      },
      {
        practiceTitle: 'Sending Peace Upon the Martyrs of Uhud',
        hadithSource: 'Sahih Muslim 2396 · Sahih al-Bukhari 4042',
        narrator: 'Uqbah ibn ‘Amir & Jabir ibn Abdullah (RA)',
        hadithText:
          'Before his passing, the Prophet ﷺ prayed over the martyrs of Uhud as one prays over the dead, bidding them farewell after eight years; and when visiting graves the Sunnah taught by him ﷺ is saying: “As-salamu ‘alaykum ahla ad-diyar minal-mu’minina wal-muslimin, wa inna in sha Allahu bikum lahiqun.”',
      },
    ],
    quranRef: {
      label: "Qur'an 3:139–140",
      surahNumber: 3,
      ayahNumber: 139,
      english:
        'So do not weaken and do not grieve, and you will be superior if you are [true] believers.',
    },
    hadithRef: {
      source: 'Sahih al-Bukhari 4043',
      narrator: 'Al-Bara ibn ‘Azib (RA)',
      text: '“Do not leave your positions on the pass even if you see birds snatching us—until I send word to you.”',
    },
  },
  {
    id: 'shw-15',
    month: 10,
    day: 15,
    title: 'Siege of the Trench (Ghazwah al-Ahzab / Khandaq, Shawwal 5 AH)',
    category: 'history',
    summary:
      'In Shawwal 5 AH, a 10,000-strong coalition besieged Madinah; upon Salman al-Farisi’s counsel, 3,000 Muslims dug a defensive trench until Allah routed the coalition with a freezing gale and unseen angels.',
    historicalDetails: [
      'A confederation of Quraysh, Ghatafan, and allied tribes numbering 10,000 marched against Madinah. Accepting Salman al-Farisi’s (RA) proposal, the Muslims excavated a deep trench across the exposed northern flank.',
      'During nearly a month of severe hunger, cold, and fear, the Prophet ﷺ tied a stone over his stomach, broke an immovable boulder in three strikes prophesying the openings of Syria, Persia, and Yemen, and fed 1,000 workers miraculously from Jabir’s small portion of barley and a kid goat.',
      'When Banu Qurayzah broke their pact from the rear, the believers stood steadfast until Allah sent a piercing east wind (Saba) that overturned the coalition tents and extinguished their fires without full-scale battle.',
    ],
    quranVerses: [
      {
        label: "Qur'an 33:9",
        surahNumber: 33,
        ayahNumber: 9,
        arabic:
          'يَا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا نِعْمَةَ اللَّهِ عَلَيْكُمْ إِذْ جَاءَتْكُمْ جُنُودٌ فَأَرْسَلْنَا عَلَيْهِمْ رِيحًا وَجُنُودًا لَّمْ تَرَوْهَا',
        english:
          'O you who have believed, remember the favor of Allah upon you when armies came to [attack] you and We sent upon them a wind and armies [of angels] you did not see.',
        revelationContext: 'Surah Al-Ahzab recounts the divine wind that broke the 10,000-man siege at the Trench.',
      },
      {
        label: "Qur'an 33:22",
        surahNumber: 33,
        ayahNumber: 22,
        arabic: 'وَلَمَّا رَأَى الْمُؤْمِنُونَ الْأَحْزَابَ قَالُوا هَٰذَا مَا وَعَدَنَا اللَّهُ وَرَسُولُهُ وَصَدَقَ اللَّهُ وَرَسُولُهُ',
        english:
          'And when the believers saw the companies, they said, “This is what Allah and His Messenger had promised us, and Allah and His Messenger spoke the truth.” And it increased them only in faith and acceptance.',
        revelationContext: 'Contrasts the unwavering Iman of the sincere Companions with the panic of the hypocrites during Khandaq.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Prophetic Supplication Taught Against Confederates & Adversity',
        hadithSource: 'Sahih al-Bukhari 4115 · Sahih Muslim 1742',
        narrator: 'Abdullah ibn Abi Awfa (RA)',
        hadithText:
          'During the Days of the Confederates (Ahzab), the Messenger of Allah ﷺ supplicated: “Allahumma Munzil al-Kitab, Sari‘ al-Hisab, ihzim al-Ahzab; Allahumma-hzimhum wa zalzilhum (O Allah, Revealer of the Book, Swift in reckoning, defeat the Confederates; O Allah, defeat them and shake them).”',
      },
      {
        practiceTitle: 'Affirming There Is No True Life Except the Life of the Hereafter',
        hadithSource: 'Sahih al-Bukhari 4100 & 4102',
        narrator: 'Anas ibn Malik & Sahl ibn Sa’d (RA)',
        hadithText:
          'As the Companions carried soil on their backs while digging the Trench, they chanted together with the Prophet ﷺ: “Allahumma la ‘aysha illa ‘ayshul-Akhirah, faghfir lil-Ansari wal-Muhajirah (O Allah, there is no life except the life of the Hereafter, so forgive the Ansar and Muhajirun).”',
      },
    ],
    quranRef: {
      label: "Qur'an 33:9",
      surahNumber: 33,
      ayahNumber: 9,
      english:
        'O you who have believed, remember the favor of Allah upon you when armies came to [attack] you and We sent upon them a wind and armies [of angels] you did not see.',
    },
    hadithRef: {
      source: 'Sahih al-Bukhari 4102 & 4115',
      narrator: 'Sahl ibn Sa’d & Ibn Abi Awfa (RA)',
      text: 'The Companions carried earth alongside the Prophet ﷺ saying: “O Allah, there is no life except the life of the Hereafter, so forgive the Ansar and Muhajirun!”',
    },
  },

  // DHU AL-QI'DAH (Month 11)
  {
    id: 'dhq-1',
    month: 11,
    day: 1,
    title: 'Dhu al-Qi‘dah · Sacred Month, Prophetic ‘Umrahs & Hudaybiyyah',
    category: 'history',
    summary:
      'Third Sacred Month and first month of Hajj; in Dhu al-Qi’dah 6 AH the Prophet ﷺ marched peacefully with 1,400 Companions and concluded the Treaty of Hudaybiyyah, named “Fathan Mubina” (A Clear Victory).',
    historicalDetails: [
      'In Dhu al-Qi’dah 6 AH, following a true dream of performing Tawaf in Makkah, the Prophet ﷺ departed Madinah with ~1,400 Companions in Ihram, driving sacrificial camels with zero offensive weapons.',
      'Halted at Al-Hudaybiyyah on the boundary of the Makkan Sanctuary, Quraysh blocked entry; after rumors of Uthman’s (RA) death, the Companions gave the Bay‘at ar-Ridwan under the acacia tree.',
      'Suhayl ibn ‘Amr negotiated the ten-year truce delaying ‘Umrah to the next year (Dhu al-Qi’dah 7 AH). Though some terms felt severe initially, Surah Al-Fath (48:1) descended on the return road declaring it “A Clear Conquest.”',
      'All four of the Prophet’s ﷺ ‘Umrahs—Hudaybiyyah (6 AH), ‘Umrat al-Qada (7 AH), Ji‘ranah after Hunayn (8 AH), and his Farewell Hajj ‘Umrah (10 AH)—began during Dhu al-Qi’dah.',
    ],
    quranVerses: [
      {
        label: "Qur'an 48:1–2",
        surahNumber: 48,
        ayahNumber: 1,
        arabic: 'إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا ۝ لِّيَغْفِرَ لَكَ اللَّهُ مَا تَقَدَّمَ مِن ذَنبِكَ وَمَا تَأَخَّرَ',
        english:
          'Indeed, We have given you, [O Muhammad], a clear conquest that Allah may forgive for you what preceded of your sin and what will follow.',
        revelationContext: 'Revealed between Makkah and Madinah right after signing the Treaty of Hudaybiyyah in Dhu al-Qi’dah 6 AH.',
      },
      {
        label: "Qur'an 48:18",
        surahNumber: 48,
        ayahNumber: 18,
        arabic: 'لَّقَدْ رَضِيَ اللَّهُ عَنِ الْمُؤْمِنِينَ إِذْ يُبَايِعُونَكَ تَحْتَ الشَّجَرَةِ',
        english:
          'Certainly was Allah pleased with the believers when they pledged allegiance to you, [O Muhammad], under the tree, and He knew what was in their hearts.',
        revelationContext: 'Affirms Allah’s eternal pleasure with the 1,400 Companions of Bay‘at ar-Ridwan.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Honoring the Sunnah of Performing ‘Umrah in Dhu al-Qi‘dah',
        hadithSource: 'Sahih al-Bukhari 1778 · Sahih Muslim 1253a',
        narrator: 'Anas ibn Malik (RA)',
        hadithText:
          '“The Messenger of Allah ﷺ performed four ‘Umrahs, all of them in Dhu al-Qi’dah except the one that was alongside his Hajj: the ‘Umrah from Hudaybiyyah in Dhu al-Qi’dah, the ‘Umrah of the following year in Dhu al-Qi’dah, the ‘Umrah from al-Ji‘ranah where he divided the spoils of Hunayn in Dhu al-Qi’dah, and the ‘Umrah with his Hajj.”',
      },
      {
        practiceTitle: 'Honoring Sacred Boundaries & Covenant Fulfilment',
        hadithSource: 'Sahih al-Bukhari 2731 & 2732',
        narrator: 'Al-Miswar ibn Makhramah & Marwan ibn al-Hakam (RA)',
        hadithText:
          'Despite intense disappointment among some Companions when ordered to return before Tawaf, obeying Allah and His Messenger ﷺ by shaving and sacrificing at Hudaybiyyah yielded peace through which more people entered Islam in two years than in all previous years combined.',
      },
    ],
    quranRef: {
      label: "Qur'an 48:1",
      surahNumber: 48,
      ayahNumber: 1,
      english: 'Indeed, We have given you, [O Muhammad], a clear conquest.',
    },
    hadithRef: {
      source: 'Sahih al-Bukhari 1778 & 2731',
      narrator: 'Anas ibn Malik & Al-Miswar ibn Makhramah (RA)',
      text: '“The Messenger of Allah ﷺ performed four ‘Umrahs, all of them in Dhu al-Qi’dah except the one alongside his Hajj.”',
    },
  },

  // DHU AL-HIJJAH (Month 12)
  {
    id: 'dhh-1',
    month: 12,
    day: 1,
    endDay: 8,
    title: 'First Ten Greatest Days of Dhu al-Hijjah',
    category: 'worship',
    summary:
      'Allah swore in Surah Al-Fajr by these ten nights; the Prophet ﷺ affirmed that no days contain righteous deeds more beloved to Allah than Days 1–10 of Dhu al-Hijjah.',
    historicalDetails: [
      'Before the Farewell Pilgrimage in 10 AH and throughout Madinah, the Prophet ﷺ taught that righteous deeds—Salah, charity, fasting Days 1–9, Takbir, Tahlil, and Tahmid—during the first ten days of Dhu al-Hijjah surpass even striving on ordinary days unless one sacrifices both wealth and life.',
      'Companions Ibn Umar and Abu Hurairah (RA) used to go out to the markets during these ten days reciting Takbir aloud so people echoed Takbir together.',
      'For those intending to offer Udhiyah (Qurbani) on Eid al-Adha, the Prophet ﷺ forbade trimming hair or nails once the crescent of Dhu al-Hijjah enters until the sacrifice is offered.',
    ],
    quranVerses: [
      {
        label: "Qur'an 89:1–2",
        surahNumber: 89,
        ayahNumber: 1,
        arabic: 'وَالْفَجْرِ ۝ وَلَيَالٍ عَشْرٍ',
        english: 'By the dawn, and [by] ten nights.',
        revelationContext: 'Ibn Abbas, Ibn az-Zubayr, and Mujahid explained “ten nights” refers directly to the first ten days of Dhu al-Hijjah.',
      },
      {
        label: "Qur'an 22:28",
        surahNumber: 22,
        ayahNumber: 28,
        arabic: 'وَيَذْكُرُوا اسْمَ اللَّهِ فِي أَيَّامٍ مَّعْلُومَاتٍ',
        english: 'And mention the name of Allah on known days.',
        revelationContext: 'Ibn Abbas (RA) stated “known days” (Ayyam Ma‘lumat) are the ten days of Dhu al-Hijjah.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Increasing Tahlil, Takbir, Tahmid & Righteous Deeds (Days 1–10)',
        hadithSource: 'Sahih al-Bukhari 969 · Musnad Ahmad 5446',
        narrator: 'Abdullah ibn Abbas & Abdullah ibn Umar (RA)',
        hadithText:
          'The Prophet ﷺ said: “There are no days in which righteous deeds are more beloved to Allah than these ten days.” They asked: “Not even Jihad in Allah’s cause?” He said: “Not even Jihad, except a man who goes out with his life and wealth and returns with neither.” And in Musnad Ahmad: “Increase in them Tahlil (La ilaha illallah), Takbir (Allahu Akbar), and Tahmid (Alhamdulillah).”',
      },
      {
        practiceTitle: 'Fasting Days 1–9 of Dhu al-Hijjah (As Reported by His Wives)',
        hadithSource: "Sunan Abi Dawud 2437 · Sunan an-Nasa'i 2417 (Sahih)",
        narrator: 'Hunaydah ibn Khalid from his wife from one of the wives of the Prophet ﷺ',
        hadithText:
          '“The Messenger of Allah ﷺ used to fast the first nine days of Dhu al-Hijjah, the day of ‘Ashura, and three days of each month.”',
      },
      {
        practiceTitle: 'Refraining from Cutting Hair or Nails if Offering Qurbani (Udhiyah)',
        hadithSource: 'Sahih Muslim 1977a',
        narrator: 'Umm Salamah (RA)',
        hadithText:
          'The Prophet ﷺ said: “When the ten days of Dhu al-Hijjah enter and any of you intends to offer a sacrifice, let him not touch (cut) any of his hair or nails until he sacrifices.”',
      },
    ],
    quranRef: {
      label: "Qur'an 89:1–2",
      surahNumber: 89,
      ayahNumber: 1,
      english: 'By the dawn, and [by] ten nights.',
    },
    hadithRef: {
      source: 'Sahih al-Bukhari 969 · Sahih Muslim 1977a',
      narrator: 'Ibn Abbas & Umm Salamah (RA)',
      text: '“There are no days in which righteous deeds are more beloved to Allah than these ten days.”',
    },
  },
  {
    id: 'dhh-8',
    month: 12,
    day: 8,
    title: 'Day of Tarwiyah (8th of Dhu al-Hijjah · Departure to Mina)',
    category: 'worship',
    summary:
      'On 8 Dhu al-Hijjah, pilgrims enter Ihram for Hajj (Tamattu‘) and travel to Mina, shortening four-rak‘ah prayers to two rak‘ahs without combining them.',
    historicalDetails: [
      'Named Yawm at-Tarwiyah (“Day of Watering”) because pilgrims historically drew and carried water from Makkah to Mina where water was scarce before departing for ‘Arafah.',
      'During the Farewell Pilgrimage (10 AH), the Prophet ﷺ ordered those in Tamattu‘ to enter Ihram on 8 Dhu al-Hijjah and set out toward Mina before noon, praying Dhuhr, Asr, Maghrib, Isha, and Fajr (of the 9th) in Mina.',
    ],
    quranVerses: [
      {
        label: "Qur'an 22:27–28",
        surahNumber: 22,
        ayahNumber: 27,
        arabic: 'وَأَذِّن فِي النَّاسِ بِالْحَجِّ يَأْتُوكَ رِجَالًا وَعَلَىٰ كُلِّ ضَامِرٍ يَأْتِينَ مِن كُلِّ فَجٍّ عَمِيقٍ',
        english:
          'And proclaim to the people the Hajj [pilgrimage]; they will come to you on foot and on every lean camel; they will come from every distant pass.',
        revelationContext: 'Command to Ibrahim (AS) initiating the timeless rites of Hajj culminating in 8–13 Dhu al-Hijjah.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Talbiyah, Shortening Prayers in Mina & Fasting the 8th (Non-Pilgrims)',
        hadithSource: 'Sahih Muslim 1218a · Sahih al-Bukhari 1653',
        narrator: 'Jabir ibn Abdullah & Anas ibn Malik (RA)',
        hadithText:
          'Jabir (RA) narrated: “On the Day of Tarwiyah they proceeded toward Mina and assumed Ihram for Hajj; the Prophet ﷺ rode and prayed there Dhuhr, Asr, Maghrib, Isha, and Fajr, then stayed briefly until the sun rose before heading to ‘Arafah.”',
      },
    ],
    quranRef: {
      label: "Qur'an 22:27–28",
      surahNumber: 22,
      ayahNumber: 28,
      english:
        'That they may witness benefits for themselves and mention the name of Allah on known days.',
    },
    hadithRef: {
      source: 'Sahih Muslim 1218a',
      narrator: 'Jabir ibn Abdullah (RA)',
      text: 'On the Day of Tarwiyah, the pilgrims proceeded toward Mina where the Prophet ﷺ led Dhuhr, Asr, Maghrib, Isha, and Fajr.',
    },
  },
  {
    id: 'dhh-9',
    month: 12,
    day: 9,
    title: 'Day of ‘Arafah (9th of Dhu al-Hijjah · Perfection of Religion)',
    category: 'fasting',
    summary:
      'On 9 Dhu al-Hijjah 10 AH during the Farewell Pilgrimage, Allah revealed Surah Al-Ma’idah 5:3 (“This day I have perfected for you your religion”); fasting ‘Arafah for non-pilgrims expiates two years of minor sins.',
    historicalDetails: [
      'On Friday 9 Dhu al-Hijjah 10 AH, the Prophet ﷺ stood on the plain of ‘Arafah before more than 100,000 Companions, delivering the Farewell Sermon affirming sanctity of life, property, women’s rights, abolition of usury and racial superiority, and clinging to the Qur’an and Sunnah.',
      'As he stood at ‘Arafah that Friday afternoon, Qur’an 5:3 was revealed declaring Islam perfected and complete.',
      'He combined Dhuhr and Asr shortened at Masjid Namirah, then stood facing the Qiblah raising his hands in continuous supplication until sunset without fasting himself—so pilgrims stay energized for Du‘a.',
    ],
    quranVerses: [
      {
        label: "Qur'an 5:3",
        surahNumber: 5,
        ayahNumber: 3,
        arabic:
          'الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي وَرَضِيتُ لَكُمُ الْإِسْلَامَ دِينًا',
        english:
          'This day I have perfected for you your religion and completed My favor upon you and have approved for you Islam as religion.',
        revelationContext:
          'Confirmed by Umar ibn al-Khattab (RA) in Sahih al-Bukhari (45): revealed on Friday evening while the Prophet ﷺ stood at ‘Arafah.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Fasting the Day of ‘Arafah (For Non-Pilgrims — Expiates 2 Years)',
        hadithSource: 'Sahih Muslim 1162b',
        narrator: 'Abu Qatadah al-Ansari (RA)',
        hadithText:
          'The Messenger of Allah ﷺ was asked about fasting on the Day of ‘Arafah, and he said: “It expiates the sins of the previous year and the coming year.” (While in Sahih al-Bukhari 1989, pilgrims at ‘Arafah do not fast).',
      },
      {
        practiceTitle: 'Best Supplication on the Day of ‘Arafah (Tahlil)',
        hadithSource: "Jami' at-Tirmidhi 3585 (Hasan Sahih)",
        narrator: '‘Amr ibn Shu‘ayb from his father from his grandfather (RA)',
        hadithText:
          'The Prophet ﷺ said: “The best supplication is the supplication on the Day of ‘Arafah, and the best of what I and the Prophets before me have said is: La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa Huwa ‘ala kulli shay’in Qadir.”',
      },
      {
        practiceTitle: 'Beginning Takbir al-Muqayyad From Fajr of 9th Dhu al-Hijjah Until Asr of 13th',
        hadithSource: 'Sahih Muslim 1348 · Al-Hakim / Al-Bayhaqi (Athars of Umar & Ali RA)',
        narrator: 'Aishah, Umar & Ali (RA)',
        hadithText:
          'In Sahih Muslim 1348: “There is no day on which Allah frees more servants from the Fire than the Day of ‘Arafah.” And Ali and Ibn Mas’ud (RA) consistently recited Takbir after every obligatory prayer starting from Fajr of the Day of ‘Arafah until Asr of the last day of Tashreeq.',
      },
    ],
    quranRef: {
      label: "Qur'an 5:3",
      surahNumber: 5,
      ayahNumber: 3,
      english:
        'This day I have perfected for you your religion and completed My favor upon you and have approved for you Islam as religion.',
    },
    hadithRef: {
      source: 'Sahih Muslim 1162b & 1348 · Jami’ at-Tirmidhi 3585',
      narrator: 'Abu Qatadah & Aishah (RA)',
      text: '“Fasting the Day of ‘Arafah, I hope from Allah that it will expiate for the year before it and the year after it.”',
    },
  },
  {
    id: 'dhh-10',
    month: 12,
    day: 10,
    title: 'Eid al-Adha · Yawm an-Nahr (10th of Dhu al-Hijjah)',
    category: 'eid',
    summary:
      'The greatest day in the sight of Allah; commemorates Prophet Ibrahim (AS)’s total submission when Allah ransomed Isma‘il (AS) with a great sacrifice.',
    historicalDetails: [
      'Ibrahim (AS) saw in a dream (prophetic revelation) that he was sacrificing his beloved son Isma‘il (AS); both father and son submitted wholly to Allah’s command until Allah called out and ransomed the boy with a mighty ram.',
      'For pilgrims at Mina on 10 Dhu al-Hijjah, four rites take place: stoning Jamrat al-‘Aqabah (7 pebbles), offering the Hady sacrifice, shaving/trimming the head, and performing Tawaf al-Ifadah.',
      'For Muslims worldwide, the morning opens with Takbir, the two-rak‘ah Eid al-Adha prayer, and offering Udhiyah (Qurbani) after the prayer, sharing its meat with the poor, neighbors, and family.',
    ],
    quranVerses: [
      {
        label: "Qur'an 108:2",
        surahNumber: 108,
        ayahNumber: 2,
        arabic: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ',
        english: 'So pray to your Lord and sacrifice [to Him alone].',
        revelationContext: 'Orders uniting both the Eid Salah and the Udhiyah sacrifice solely for Allah.',
      },
      {
        label: "Qur'an 37:107",
        surahNumber: 37,
        ayahNumber: 107,
        arabic: 'وَفَدَيْنَاهُ بِذِبْحٍ عَظِيمٍ',
        english: 'And We ransomed him with a great sacrifice.',
        revelationContext: 'Narrates Allah’s ransom of Isma‘il (AS) honored through the annual Udhiyah.',
      },
      {
        label: "Qur'an 22:37",
        surahNumber: 22,
        ayahNumber: 37,
        arabic: 'لَن يَنَالَ اللَّهَ لُحُومُهَا وَلَا دِمَاؤُهَا وَلَٰكِن يَنَالُهُ التَّقْوَىٰ مِنكُمْ',
        english:
          'Their meat will not reach Allah, nor will their blood, but what reaches Him is piety (Taqwa) from you.',
        revelationContext: 'Clarifies that sincerity and Taqwa—not outward flesh—reach Allah in sacrifice.',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Delaying Eating on Eid al-Adha Until After Eid Prayer & Sacrifice',
        hadithSource: "Jami' at-Tirmidhi 542 (Sahih)",
        narrator: 'Buraydah ibn al-Husayb (RA)',
        hadithText:
          '“The Prophet ﷺ would not go out on the Day of Fitr until he had eaten, and he would not eat on the Day of Sacrifice (Adha) until he had prayed (and eaten from his sacrifice).”',
      },
      {
        practiceTitle: 'Offering Udhiyah Only After the Eid Prayer Is Completed',
        hadithSource: 'Sahih al-Bukhari 5560 · Sahih Muslim 1961',
        narrator: 'Al-Bara ibn ‘Azib (RA)',
        hadithText:
          'The Prophet ﷺ said: “The first thing we begin with on this day is that we pray, then return and slaughter our sacrifice. Whoever does this has followed our Sunnah; whoever slaughters before the prayer, it is merely meat he provided for his family, nothing of the rite of sacrifice.”',
      },
      {
        practiceTitle: 'Prohibition of Fasting on the Day of Sacrifice',
        hadithSource: 'Sahih al-Bukhari 1991 · Sunan Abi Dawud 1765',
        narrator: 'Abu Sa’id al-Khudri & Abdullah ibn Qurt (RA)',
        hadithText:
          '“The greatest day before Allah is the Day of Sacrifice, then the day of settling (11th),” and fasting on the Day of Adha is strictly forbidden.',
      },
    ],
    quranRef: {
      label: "Qur'an 108:2 & 37:107",
      surahNumber: 108,
      ayahNumber: 2,
      english: 'So pray to your Lord and sacrifice [to Him alone].',
    },
    hadithRef: {
      source: 'Sunan Abi Dawud 1765 · Sahih al-Bukhari 5560 · Jami’ at-Tirmidhi 542',
      narrator: 'Abdullah ibn Qurt, Al-Bara & Buraydah (RA)',
      text: '“The greatest day before Allah is the Day of Sacrifice, then the day of settling.”',
    },
  },
  {
    id: 'dhh-11',
    month: 12,
    day: 11,
    endDay: 13,
    title: 'Days of Tashreeq (11–13 Dhu al-Hijjah)',
    category: 'worship',
    summary:
      'The three days following Eid al-Adha when pilgrims stone all three Jamarat at Mina, Udhiyah continues until sunset of the 13th, and fasting is prohibited.',
    historicalDetails: [
      'Named Ayyam at-Tashreeq because historically sacrificial meat was sliced and spread out in the sun (shuruq) to dry for travel.',
      'During these three days, Hajj pilgrims remain in Mina stoning all three Jamarat each afternoon; those who leave early after the 12th before sunset commit no sin, and those who remain through the 13th complete all stoning as explicitly stated in Qur’an 2:203.',
    ],
    quranVerses: [
      {
        label: "Qur'an 2:203",
        surahNumber: 2,
        ayahNumber: 203,
        arabic: 'وَاذْكُرُوا اللَّهَ فِي أَيَّامٍ مَّعْدُودَاتٍ',
        english: 'And remember Allah during [specific] numbered days.',
        revelationContext: 'Ibn Abbas (RA) confirmed “numbered days” (Ayyam Ma‘dudat) are the Days of Tashreeq (11–13 Dhu al-Hijjah).',
      },
    ],
    hadithActions: [
      {
        practiceTitle: 'Eating, Drinking & Remembering Allah (Fasting Is Forbidden)',
        hadithSource: 'Sahih Muslim 1141a · Sahih al-Bukhari 1997',
        narrator: 'Nubayshah al-Hudhali & Aishah & Ibn Umar (RA)',
        hadithText:
          'The Messenger of Allah ﷺ said: “The days of Tashreeq are days of eating, drinking, and remembering Allah.” And Aishah and Ibn Umar (RA) stated: “No concession was given to fast during the days of Tashreeq except for one who could not find a sacrificial animal (Hady).”',
      },
    ],
    quranRef: {
      label: "Qur'an 2:203",
      surahNumber: 2,
      ayahNumber: 203,
      english: 'And remember Allah during [specific] numbered days.',
    },
    hadithRef: {
      source: 'Sahih Muslim 1141a · Sahih al-Bukhari 1997',
      narrator: 'Nubayshah al-Hudhali (RA)',
      text: '“The days of Tashreeq are days of eating, drinking, and remembering Allah.”',
    },
  },
];

export const RAMADAN_ASHRAS: RamadanAshraInfo[] = [
  {
    ashraNumber: 1,
    title: '1st Ashra · Mercy (Rahmah)',
    subtitle: 'Days 1–10 · Opening the Month in Submission',
    dayRange: 'Ramadan 1 – 10',
    arabicDua: 'رَبِّ اغْفِرْ وَارْحَمْ وَأَنْتَ خَيْرُ الرَّاحِمِينَ',
    transliteration: 'Rabbi-ghfir warham wa Anta Khayrur-Rahimin',
    englishMeaning: 'My Lord, forgive and have mercy, and You are the Best of the merciful.',
    reference: "Qur'an 23:118",
    dhikrTarget: 100,
  },
  {
    ashraNumber: 2,
    title: '2nd Ashra · Forgiveness (Maghfirah)',
    subtitle: 'Days 11–20 · Seeking Pardon & Repentance',
    dayRange: 'Ramadan 11 – 20',
    arabicDua: 'أَسْتَغْفِرُ اللَّهَ رَبِّي مِنْ كُلِّ ذَنْبٍ وَأَتُوبُ إِلَيْهِ',
    transliteration: 'Astaghfirullaha Rabbi min kulli dhanbin wa atubu ilayh',
    englishMeaning:
      'I seek forgiveness of Allah my Lord from every sin and turn in repentance unto Him.',
    reference: 'Sahih Muslim 2702 · Istighfar Narration',
    dhikrTarget: 100,
  },
  {
    ashraNumber: 3,
    title: '3rd Ashra · Refuge & Laylatul Qadr',
    subtitle: 'Days 21–30 · Last Ten Nights & Al-Qadr',
    dayRange: 'Ramadan 21 – 30',
    arabicDua: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
    transliteration: 'Allahumma innaka ‘Afuwwun tuhibbul-‘afwa fa‘fu ‘anni',
    englishMeaning: 'O Allah, You are Pardoning and love to pardon, so pardon me.',
    reference: "Jami' at-Tirmidhi 3513 (Sahih)",
    dhikrTarget: 100,
  },
];

export interface RamadanDayMilestone {
  day: number;
  title: string;
  fact: string;
  reference: string;
  surahNumber: number;
  ayahNumber: number;
  verseArabic: string;
  verseEnglish: string;
  verseContext: string;
  historicalDetails: string[];
  hadithActions: HadithActionItem[];
}

export const RAMADAN_DAILY_MILESTONES: RamadanDayMilestone[] = [
  {
    day: 1,
    title: '1st Ramadan · Gates of Jannah Open & Month of the Qur’an',
    fact: 'When the crescent of Ramadan appears, the gates of Paradise open, the gates of Hell shut, and a caller proclaims: “O seeker of good, come forward!”',
    reference: "Jami' at-Tirmidhi 682 · Sahih al-Bukhari 1899",
    surahNumber: 2,
    ayahNumber: 185,
    verseArabic: 'شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ',
    verseEnglish: 'The month of Ramadan [is that] in which was revealed the Qur’an, a guidance for the people.',
    verseContext: 'Reveals the unique connection between Ramadan and the revelation of the Qur’an.',
    historicalDetails: [
      'Obligatory fasting of Ramadan was revealed in Sha’ban 2 AH; on 1 Ramadan 2 AH, the Muslim community began its first obligatory month of Ramadan.',
      'According to Musnad Ahmad (16984), the Scrolls of Ibrahim were sent down on the first night of Ramadan as well.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Fasting Out of Sincere Faith & Responding to the Call of Ramadan',
        hadithSource: 'Sahih al-Bukhari 1899 · Jami’ at-Tirmidhi 682',
        narrator: 'Abu Hurairah (RA)',
        hadithText:
          '“On the first night of Ramadan, the devils and rebellious jinn are chained, the gates of Hell are closed and not one is opened, the gates of Paradise are opened and not one is closed, and a caller cries out: ‘O seeker of good, come forward; O seeker of evil, desist!’”',
      },
    ],
  },
  {
    day: 2,
    title: '2nd Ramadan · Prophetic Sunnah of Pre-Dawn Suhoor',
    fact: 'The Messenger of Allah ﷺ established Suhoor as the distinguishing feature separating Muslim fasting from earlier nations.',
    reference: 'Sahih al-Bukhari 1923 · Sahih Muslim 1096',
    surahNumber: 2,
    ayahNumber: 187,
    verseArabic: 'وَكُلُوا وَاشْرَبُوا حَتَّىٰ يَتَبَيَّنَ لَكُمُ الْخَيْطُ الْأَبْيَضُ مِنَ الْخَيْطِ الْأَسْوَدِ مِنَ الْفَجْرِ',
    verseEnglish:
      'And eat and drink until the white thread of dawn becomes distinct to you from the black thread [of night].',
    verseContext: 'Establishes the exact pre-dawn boundary of Suhoor ending at true Fajr.',
    historicalDetails: [
      'In early Islam before 2:187 was revealed, believers who slept after Maghrib could not eat again until the following sunset; Allah revealed 2:187 permitting eating and drinking up to true Fajr dawn.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Partaking of Suhoor Even With a Sip of Water',
        hadithSource: 'Sahih al-Bukhari 1923 · Musnad Ahmad 11086',
        narrator: 'Anas ibn Malik & Abu Sa’id al-Khudri (RA)',
        hadithText:
          '“Take Suhoor, for indeed in Suhoor there is blessing.” And: “Suhoor is wholly a blessing, so do not leave it even if one of you only takes a gulp of water, for Allah and His angels send blessings upon those who take Suhoor.”',
      },
      {
        practiceTitle: 'Delaying Suhoor Close to Fajr',
        hadithSource: 'Sahih al-Bukhari 1921',
        narrator: 'Zayd ibn Thabit (RA)',
        hadithText:
          '“We took Suhoor with the Prophet ﷺ and then stood up for the Fajr prayer.” Anas asked: “How much time was between the Adhan and Suhoor?” He said: “The time it takes to recite fifty verses.”',
      },
    ],
  },
  {
    day: 3,
    title: '3rd Ramadan · Fasting as an Exclusive Shield & Divine Reward',
    fact: 'In Hadith Qudsi, Allah singled out fasting among all deeds as belonging solely to Him.',
    reference: 'Sahih al-Bukhari 1904 · Sahih Muslim 1151',
    surahNumber: 2,
    ayahNumber: 183,
    verseArabic: 'كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
    verseEnglish: 'Decreed upon you is fasting as it was decreed upon those before you that you may become righteous.',
    verseContext: 'States Taqwa (God-consciousness) as the purpose of fasting.',
    historicalDetails: [
      'Narrated by Abu Hurairah (RA) in both Sahih al-Bukhari and Sahih Muslim, establishing the inward sanctuary of fasting that no human observer can verify except Allah.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Maintaining Patience & Silence Under Provocation While Fasting',
        hadithSource: 'Sahih al-Bukhari 1904',
        narrator: 'Abu Hurairah (RA)',
        hadithText:
          'The Prophet ﷺ said: “Allah said: Every deed of the son of Adam is for him except fasting—it is for Me, and I Myself shall reward it. Fasting is a shield; when one of you is fasting, let him neither use obscene speech nor shout. If anyone reviles or fights him, let him say: ‘Indeed, I am fasting.’ By Him in whose hand is Muhammad’s soul, the breath of a fasting person is sweeter to Allah than the scent of musk.”',
      },
    ],
  },
  {
    day: 4,
    title: '4th Ramadan · Guarding Speech & Conduct During Sawm',
    fact: 'Fasting extends beyond hunger and thirst to guarding the tongue from falsehood and harmful speech.',
    reference: 'Sahih al-Bukhari 1903 · Sunan Ibn Majah 1690',
    surahNumber: 49,
    ayahNumber: 11,
    verseArabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا يَسْخَرْ قَوْمٌ مِّن قَوْمٍ',
    verseEnglish: 'O you who have believed, let not a people ridicule [another] people; perhaps they may be better than them.',
    verseContext: 'Qur’anic prohibition of mockery, defamation, and evil speech.',
    historicalDetails: [
      'Delivered as a foundational ruling of Ramadan ethics in Madinah, clarifying that the purpose of Sawm is moral restraint alongside physical abstinence.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Abandoning False Speech & Ignorant Behavior While Fasting',
        hadithSource: 'Sahih al-Bukhari 1903',
        narrator: 'Abu Hurairah (RA)',
        hadithText:
          'The Messenger of Allah ﷺ said: “Whoever does not give up false speech (qawl az-zur) and acting upon it, Allah has no need of his giving up his food and drink.”',
      },
    ],
  },
  {
    day: 5,
    title: '5th Ramadan · Answered Supplication While Fasting',
    fact: 'Qur’an 2:186 sits immediately inside the verses of Ramadan fasting, affirming Allah’s nearness to the supplicant.',
    reference: "Jami' at-Tirmidhi 2526 · Sunan Ibn Majah 1752",
    surahNumber: 2,
    ayahNumber: 186,
    verseArabic: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ',
    verseEnglish:
      'And when My servants ask you, [O Muhammad], concerning Me—indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.',
    verseContext: 'Placed directly between Ramadan fasting laws (2:185 and 2:187), highlighting supplication during fasting.',
    historicalDetails: [
      'Unlike other verses beginning with “They ask you... Say: ...”, Allah removed even the word “Say” in 2:186—replying directly: “Indeed, I am near.”',
    ],
    hadithActions: [
      {
        practiceTitle: 'Supplicating Upon Breaking the Fast (Accepted Time)',
        hadithSource: "Jami' at-Tirmidhi 2526 · Sunan Abi Dawud 2357",
        narrator: 'Abu Hurairah & Abdullah ibn Umar (RA)',
        hadithText:
          'The Prophet ﷺ said: “Three supplications are never rejected: a just ruler, the fasting person until breaking the fast, and the oppressed.” And upon breaking his fast he ﷺ said: “Dhahabaz-zama’u wabtallatil-‘uruqu wa thabatal-ajru in sha Allah (The thirst has gone, the veins are moistened, and the reward is assured if Allah wills).”',
      },
    ],
  },
  {
    day: 6,
    title: '6th Ramadan · Torah Revelation Date & Joys of the Fasting Believer',
    fact: 'Musnad Ahmad (16984) records that the Torah (Tawrat) was sent down on the 6th night of Ramadan; Sahih al-Bukhari affirms two supreme joys for the fasting servant.',
    reference: 'Musnad Ahmad 16984 · Sahih al-Bukhari 1904',
    surahNumber: 7,
    ayahNumber: 145,
    verseArabic: 'وَكَتَبْنَا لَهُ فِي الْأَلْوَاحِ مِن كُلِّ شَيْءٍ مَّوْعِظَةً وَتَفْصِيلًا لِّكُلِّ شَيْءٍ',
    verseEnglish: 'And We wrote for him on the tablets [something] of all things—instruction and explanation for all things.',
    verseContext: 'Describes the revelation of the Torah to Musa (AS).',
    historicalDetails: [
      'Wathilah ibn al-Asqa‘ (RA) narrated from the Prophet ﷺ that all major divine scriptures descended during Ramadan: Scrolls of Ibrahim on 1st, Torah on 6th, Injil on 13th, and the Qur’an on 24th Ramadan.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Anticipating Both Promised Joys of Sawm',
        hadithSource: 'Sahih al-Bukhari 1904 · Sahih Muslim 1151e',
        narrator: 'Abu Hurairah (RA)',
        hadithText:
          'The Messenger of Allah ﷺ said: “The fasting person has two moments of joy: joy when he breaks his fast, and joy when he meets his Lord.”',
      },
    ],
  },
  {
    day: 7,
    title: '7th Ramadan · Nightly Qur’an Review with Jibril & Generosity',
    fact: 'Angel Jibril (AS) met the Prophet ﷺ every night of Ramadan to revise the entire Qur’an with him.',
    reference: 'Sahih al-Bukhari 6 & 1902',
    surahNumber: 2,
    ayahNumber: 261,
    verseArabic: 'مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ',
    verseEnglish:
      'The example of those who spend their wealth in the way of Allah is like a seed [of grain] which grows seven spikes; in each spike is a hundred grains.',
    verseContext: 'Illustrates multiplied reward of charity in Allah’s path.',
    historicalDetails: [
      'Narrated by Abdullah ibn Abbas (RA) in Sahih al-Bukhari (6), recording how Jibril’s nightly Qur’an session in Ramadan inspired the Prophet’s ﷺ unmatched generosity.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Pairing Qur’an Recitation with Increased Charity in Ramadan',
        hadithSource: 'Sahih al-Bukhari 6',
        narrator: 'Abdullah ibn Abbas (RA)',
        hadithText:
          '“The Messenger of Allah ﷺ was the most generous of all people, and he was even more generous in Ramadan when Jibril met him. Jibril used to meet him every night of Ramadan to teach him the Qur’an. Indeed, the Messenger of Allah ﷺ was swifter in doing good than the blowing wind.”',
      },
    ],
  },
  {
    day: 8,
    title: '8th Ramadan · Ar-Rayyan: Exclusive Gate in Paradise',
    fact: 'One of the eight gates of Paradise—named Ar-Rayyan—is reserved exclusively for those who fasted.',
    reference: 'Sahih al-Bukhari 1896 · Sahih Muslim 1152',
    surahNumber: 39,
    ayahNumber: 73,
    verseArabic: 'وَسِيقَ الَّذِينَ اتَّقَوْا رَبَّهُمْ إِلَى الْجَنَّةِ زُمَرًا ۖ حَتَّىٰ إِذَا جَاءُوهَا وَفُتِحَتْ أَبْوَابُهَا',
    verseEnglish: 'But those who feared their Lord will be driven to Paradise in groups until, when they reach it while its gates have been opened...',
    verseContext: 'Describes the opening of the gates of Paradise for the righteous.',
    historicalDetails: [
      'Transmitted by Sahl ibn Sa‘d (RA) in both Sahih al-Bukhari and Sahih Muslim describing how the call rings out specifically for the fasting believers on Judgment Day.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Steadfast Fasting Seeking Entrance Through Bab Ar-Rayyan',
        hadithSource: 'Sahih al-Bukhari 1896',
        narrator: 'Sahl ibn Sa‘d (RA)',
        hadithText:
          'The Prophet ﷺ said: “In Paradise there is a gate called Ar-Rayyan, through which those who used to fast will enter on the Day of Resurrection, and no one else will enter through it besides them. It will be said: ‘Where are those who fasted?’ They will stand up, and when the last of them enters, it will be closed so no one else enters it.”',
      },
    ],
  },
  {
    day: 9,
    title: '9th Ramadan · Hastening to Break the Fast at Sunset',
    fact: 'The Prophet ﷺ broke his fast immediately at sunset upon fresh dates, dried dates, or water before praying Maghrib.',
    reference: 'Sahih al-Bukhari 1957 · Sunan Abi Dawud 2356',
    surahNumber: 2,
    ayahNumber: 187,
    verseArabic: 'ثُمَّ أَتِمُّوا الصِّيَامَ إِلَى اللَّيْلِ',
    verseEnglish: 'Then complete the fast until the night [sunset].',
    verseContext: 'Defines sunset as the exact completion point of each day’s fast.',
    historicalDetails: [
      'Deliberately delaying Iftar past sunset until the stars appear was discouraged in Sahih Hadith as an imitation of earlier sects; hastening at sunset preserves the Prophetic Sunnah.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Breaking Fast Immediately at Sunset With Dates or Water',
        hadithSource: 'Sahih al-Bukhari 1957 · Sunan Abi Dawud 2356 (Sahih)',
        narrator: 'Sahl ibn Sa‘d & Anas ibn Malik (RA)',
        hadithText:
          '“The people will remain upon goodness as long as they hasten to break the fast.” And Anas (RA) narrated: “The Messenger of Allah ﷺ used to break his fast before praying (Maghrib) with fresh dates; if none, then dried dates; if none, then sips of water.”',
      },
    ],
  },
  {
    day: 10,
    title: '10th Ramadan · Passing of Khadijah al-Kubra (RA)',
    fact: 'Passing of Umm al-Mu’minin Khadijah bint Khuwaylid (RA) on 10 Ramadan in the Year of Sorrow (10th year of Prophethood).',
    reference: 'Sahih al-Bukhari 3820 · Sahih al-Bukhari 3',
    surahNumber: 96,
    ayahNumber: 1,
    verseArabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
    verseEnglish: 'Recite in the name of your Lord who created.',
    verseContext: 'First revelation upon whose descent Khadijah (RA) immediately comforted and believed in the Prophet ﷺ.',
    historicalDetails: [
      'Khadijah (RA) stood beside the Prophet ﷺ for twenty-five years and endured three years of siege and hunger in Shi‘b Abi Talib before passing on 10 Ramadan.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Affirming Her Rank Among the Foremost Women of Creation',
        hadithSource: 'Sahih al-Bukhari 3432 & 3820',
        narrator: 'Ali ibn Abi Talib & Abu Hurairah (RA)',
        hadithText:
          'The Prophet ﷺ said: “The best of the world’s women in her time was Maryam bint ‘Imran, and the best of its women in this time is Khadijah bint Khuwaylid.”',
      },
    ],
  },
  {
    day: 11,
    title: '11th Ramadan · Opening of Second Ten Days & Prophetic Istighfar',
    fact: 'Opening the middle ten days; the Prophet ﷺ sought Allah’s forgiveness and turned in repentance more than seventy times daily.',
    reference: 'Sahih al-Bukhari 6307 · Sahih Muslim 2702',
    surahNumber: 39,
    ayahNumber: 53,
    verseArabic: 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ',
    verseEnglish:
      'Say, “O My servants who have transgressed against themselves, do not despair of the mercy of Allah. Indeed, Allah forgives all sins.”',
    verseContext: 'Universal promise of forgiveness for all who turn to Allah in sincere Tawbah.',
    historicalDetails: [
      'Though all past and future shortcomings of the Prophet ﷺ were already forgiven, he taught the Ummah by seeking Allah’s pardon continuously day and night.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Abundant Daily Istighfar (More Than 70–100 Times)',
        hadithSource: 'Sahih al-Bukhari 6307 · Sahih Muslim 2702a',
        narrator: 'Abu Hurairah & Al-Agharr al-Muzani (RA)',
        hadithText:
          '“By Allah! I ask Allah for forgiveness and turn to Him in repentance more than seventy times a day.” And in Sahih Muslim: “O people, turn to Allah in repentance, for I repent to Him a hundred times a day.”',
      },
    ],
  },
  {
    day: 12,
    title: '12th Ramadan · Feeding a Fasting Person & Providing Iftar',
    fact: 'Offering food or even a date/sip of water to break another’s fast carries the full reward of that person’s fast.',
    reference: "Jami' at-Tirmidhi 807 (Sahih)",
    surahNumber: 76,
    ayahNumber: 8,
    verseArabic: 'وَيُطْعِمُونَ الطَّعَامَ عَلَىٰ حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا',
    verseEnglish: 'And they give food in spite of love for it to the needy, the orphan, and the captive.',
    verseContext: 'Commends selfless feeding of others purely for Allah’s countenance.',
    historicalDetails: [
      'Zayd ibn Khalid al-Juhani (RA) transmitted the direct Prophetic ruling in Jami‘ at-Tirmidhi promising equal fasting reward without diminishing the fast of the recipient.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Providing Iftar to a Fasting Person',
        hadithSource: "Jami' at-Tirmidhi 807 · Sunan Ibn Majah 1746 (Sahih)",
        narrator: 'Zayd ibn Khalid al-Juhani (RA)',
        hadithText:
          'The Messenger of Allah ﷺ said: “Whoever gives food for a fasting person to break his fast will have a reward like his, without that detracting from the fasting person’s reward in the slightest.”',
      },
    ],
  },
  {
    day: 13,
    title: '13th Ramadan · Injil Revelation Date & 1st White Day of Ramadan',
    fact: 'Musnad Ahmad (16984) places the revelation of the Injil on 13 Ramadan; it is also the 1st of the monthly three White Days (Ayyam al-Bid).',
    reference: "Musnad Ahmad 16984 · Jami' at-Tirmidhi 761",
    surahNumber: 5,
    ayahNumber: 46,
    verseArabic: 'وَآتَيْنَاهُ الْإِنجِيلَ فِيهِ هُدًى وَنُورٌ',
    verseEnglish: 'And We gave him the Gospel, in which was guidance and light.',
    verseContext: 'Refers to the original Injil revealed to ‘Isa (AS).',
    historicalDetails: [
      'Coincides with the 13th night lunar phase of near-full illumination while the Prophetic Injil revelation date is recorded in Musnad Ahmad on the 13th of Ramadan.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Observing Three Monthly Fasts (13th, 14th, 15th) Year-Round & Continuing in Ramadan',
        hadithSource: "Jami' at-Tirmidhi 761 · Sunan an-Nasa'i 2424",
        narrator: 'Abu Dharr al-Ghifari (RA)',
        hadithText:
          'The Messenger of Allah ﷺ said: “O Abu Dharr, if you fast three days of the month, fast the thirteenth, fourteenth, and fifteenth.”',
      },
    ],
  },
  {
    day: 14,
    title: '14th Ramadan · Double Intercession of Fasting & the Qur’an',
    fact: 'Both Fasting and the Holy Qur’an stand as intercessors for the believer on the Day of Resurrection.',
    reference: 'Musnad Ahmad 6626 · Mustadrak al-Hakim (Sahih)',
    surahNumber: 17,
    ayahNumber: 9,
    verseArabic: 'إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ',
    verseEnglish: 'Indeed, this Qur’an guides to that which is most upright.',
    verseContext: 'Surah Al-Isra affirms the upright guidance of the Book recited nightly in Ramadan.',
    historicalDetails: [
      'Narrated by Abdullah ibn ‘Amr (RA), describing the dialogue between Allah, Fasting, and the Qur’an on the Day of Judgment.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Combining Daytime Fasting with Nighttime Recitation of the Qur’an',
        hadithSource: 'Musnad Ahmad 6626 (Sahih)',
        narrator: 'Abdullah ibn ‘Amr ibn al-‘As (RA)',
        hadithText:
          'The Messenger of Allah ﷺ said: “Fasting and the Qur’an will both intercede for the servant on the Day of Resurrection. Fasting will say: ‘O Lord, I prevented him from food and desires during the day, so accept my intercession for him.’ The Qur’an will say: ‘I prevented him from sleeping at night, so accept my intercession for him.’ And their intercession will be accepted.”',
      },
    ],
  },
  {
    day: 15,
    title: '15th Ramadan · Full Lunar Phase, Hasan ibn Ali (RA) & Qiyam Reward',
    fact: 'Historians record the birth of Al-Hasan ibn Ali (RA) in mid-Ramadan 3 AH; night Qiyam throughout Ramadan carries forgiveness of past sins.',
    reference: 'Sahih al-Bukhari 37 & 2009 · Sahih al-Bukhari 3746',
    surahNumber: 25,
    ayahNumber: 64,
    verseArabic: 'وَالَّذِينَ يَبِيتُونَ لِرَبِّهِمْ سُجَّدًا وَقِيَامًا',
    verseEnglish: 'And those who spend [part of] the night to their Lord prostrating and standing [in prayer].',
    verseContext: 'Surah Al-Furqan describes the servants of the Most Merciful in night prayer.',
    historicalDetails: [
      'Al-Hasan ibn Ali (RA), grandson of the Prophet ﷺ, was born in Madinah during Ramadan 3 AH; the Prophet ﷺ gave Adhan in his ear, named him Al-Hasan, and later said he would reconcile two great groups of Muslims.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Establishing Night Prayer (Qiyam Ramadan / Taraweeh) Out of Faith',
        hadithSource: 'Sahih al-Bukhari 37 & 2009 · Sahih Muslim 759',
        narrator: 'Abu Hurairah (RA)',
        hadithText:
          'The Messenger of Allah ﷺ said: “Whoever stands in prayer during Ramadan (Qiyam) out of sincere faith and hoping for Allah’s reward will have all his previous sins forgiven.”',
      },
    ],
  },
  {
    day: 16,
    title: '16th Ramadan · Standing with the Imam Until Completion of Qiyam',
    fact: 'Whoever prays Qiyam behind the Imam until he finishes has an entire night of standing written in his record.',
    reference: "Sunan an-Nasa'i 1605 · Jami' at-Tirmidhi 806 (Sahih)",
    surahNumber: 73,
    ayahNumber: 20,
    verseArabic: 'فَاقْرَءُوا مَا تَيَسَّرَ مِنَ الْقُرْآنِ',
    verseEnglish: 'So recite what is easy [for you] of the Qur’an.',
    verseContext: 'Permits ease and congregation devotion in night prayer.',
    historicalDetails: [
      'When the Companions feared missing prayer with the Prophet ﷺ after he stopped coming out lest Taraweeh become obligatory, Abu Dharr (RA) asked him ﷺ to pray with them more nights, prompting this clear promise.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Completing Congregation Taraweeh with the Imam Until Witr Ends',
        hadithSource: "Jami' at-Tirmidhi 806 · Sunan an-Nasa'i 1605 (Sahih)",
        narrator: 'Abu Dharr al-Ghifari (RA)',
        hadithText:
          'The Messenger of Allah ﷺ said: “Indeed, whoever stands in prayer with the Imam until he finishes, it is recorded for him that he stood the entire night.”',
      },
    ],
  },
  {
    day: 17,
    title: '17th Ramadan · Battle of Badr (Yawm al-Furqan, 2 AH)',
    fact: 'On Friday 17 Ramadan 2 AH at Badr, 313 Muslims triumphed over 1,000 Quraysh with 1,000 supporting angels.',
    reference: "Qur'an 8:41 · Qur'an 3:123 · Sahih Muslim 1763a",
    surahNumber: 3,
    ayahNumber: 123,
    verseArabic: 'وَلَقَدْ نَصَرَكُمُ اللَّهُ بِبَدْرٍ وَأَنتُمْ أَذِلَّةٌ',
    verseEnglish: 'And already had Allah given you victory at Badr while you were few in number.',
    verseContext: 'Surah Ali ‘Imran testifies to Allah’s deliverance at Badr.',
    historicalDetails: [
      'See full historical account and complete Qur’an & Hadith citations in the fixed event entry for 17 Ramadan.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Heartfelt Dua Under Hardship Following Prophetic Example at Badr',
        hadithSource: 'Sahih Muslim 1763a',
        narrator: 'Umar ibn al-Khattab (RA)',
        hadithText:
          'On the morning of Badr, the Prophet ﷺ raised his hands toward Qiblah imploring: “O Allah, fulfill what You promised me!” until Allah sent a thousand angels in succession.',
      },
    ],
  },
  {
    day: 18,
    title: '18th Ramadan · Double Qur’an Revision & Tenfold Reward per Letter',
    fact: 'In his final Ramadan (10 AH), Jibril (AS) reviewed the complete Qur’an with the Prophet ﷺ twice; every recited letter carries ten rewards.',
    reference: "Sahih al-Bukhari 4998 · Jami' at-Tirmidhi 2910 (Sahih)",
    surahNumber: 75,
    ayahNumber: 17,
    verseArabic: 'إِنَّ عَلَيْنَا جَمْعَهُ وَقُرْآنَهُ',
    verseEnglish: 'Indeed, upon Us is its collection [in your heart] and [to make possible] its recitation.',
    verseContext: 'Allah’s guarantee to preserve and compile the Qur’an in the Prophet’s ﷺ heart.',
    historicalDetails: [
      'Fatimah az-Zahra (RA) narrated in Sahih al-Bukhari (3624 & 4998) that the Prophet ﷺ whispered to her that Jibril used to review the Qur’an with him once each Ramadan, yet reviewed it twice that final year, signaling his approaching departure.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Abundant Qur’an Recitation (Ten Rewards per Letter)',
        hadithSource: "Jami' at-Tirmidhi 2910 (Sahih) · Sahih al-Bukhari 4998",
        narrator: 'Abdullah ibn Mas’ud & Fatimah az-Zahra (RA)',
        hadithText:
          '“Whoever recites a single letter from the Book of Allah will receive one good deed, and a good deed is multiplied tenfold. I do not say Alif-Lam-Mim is one letter, rather Alif is a letter, Lam is a letter, and Mim is a letter.”',
      },
    ],
  },
  {
    day: 19,
    title: '19th Ramadan · Preparation for the Final Ten Nights & I‘tikaf',
    fact: 'At sunset following the 20th day—and prepared ahead on the 19th–20th—the Prophet ﷺ concluded his middle-ten worship and prepared for uninterrupted final-ten devotion.',
    reference: 'Sahih al-Bukhari 2024 & 2041',
    surahNumber: 2,
    ayahNumber: 187,
    verseArabic: 'وَأَنتُمْ عَاكِفُونَ فِي الْمَسَاجِدِ',
    verseEnglish: 'While you are staying in seclusion for worship in the mosques.',
    verseContext: 'Direct Qur’anic mention of I‘tikaf.',
    historicalDetails: [
      'In Sahih al-Bukhari (2041), after praying Fajr on the morning of the 20th, the Prophet ﷺ entered his place of I’tikaf—marking the transition away from worldly routine before Night 21.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Steadfastness Through Fatigue in the Last Ten Nights',
        hadithSource: 'Sahih Muslim 1175 · Sahih al-Bukhari 2024',
        narrator: 'Aishah (RA)',
        hadithText:
          '“The Messenger of Allah ﷺ used to strive harder in worship during the last ten nights of Ramadan than he ever strove at any other time.”',
      },
    ],
  },
  {
    day: 20,
    title: '20th Ramadan · Conquest of Makkah (Fath Makkah, 8 AH)',
    fact: 'On 20 Ramadan 8 AH, Prophet Muhammad ﷺ entered Makkah peacefully with 10,000 Companions, purified the Ka’bah of 360 idols, and declared general amnesty.',
    reference: "Sahih al-Bukhari 4287 · Qur'an 110:1–3",
    surahNumber: 110,
    ayahNumber: 1,
    verseArabic: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ',
    verseEnglish: 'When the victory of Allah has come and the conquest.',
    verseContext: 'Surah An-Nasr commemorates the Conquest of Makkah.',
    historicalDetails: [
      'See full historical account and complete Qur’an & Hadith citations in the fixed event entry for 20 Ramadan.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Praising Allah and Seeking Forgiveness Following Victory (Surah 110)',
        hadithSource: 'Sahih al-Bukhari 4968 · Sahih al-Bukhari 4287',
        narrator: 'Aishah & Ibn Mas’ud (RA)',
        hadithText:
          'The Prophet ﷺ bowed low in humility entering Makkah, cleared all idols reciting Qur’an 17:81, and frequently glorified and asked forgiveness of Allah in Ruku’ and Sujud.',
      },
    ],
  },
  {
    day: 21,
    title: '21st Night (1st Odd Night) · I‘tikaf & Search for Laylatul Qadr',
    fact: 'First odd night of the final ten nights, when the Prophet ﷺ tightened his belt, stayed awake at night, and woke his family.',
    reference: 'Sahih al-Bukhari 2017 & 2024',
    surahNumber: 97,
    ayahNumber: 1,
    verseArabic: 'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ',
    verseEnglish: 'Indeed, We sent the Qur’an down during the Night of Decree.',
    verseContext: 'Surah Al-Qadr.',
    historicalDetails: [
      'See full historical account in fixed entry for 21 Ramadan.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Staying Awake & Waking Household Members for Qiyam',
        hadithSource: 'Sahih al-Bukhari 2024',
        narrator: 'Aishah (RA)',
        hadithText:
          '“When the last ten nights began, the Prophet ﷺ tightened his lower garment, enlivened his night, and woke his family.”',
      },
    ],
  },
  {
    day: 22,
    title: '22nd Ramadan · Consistency Across Even & Odd Nights of the Last Ten',
    fact: 'Because the Prophet ﷺ guarded every single night of the last ten without distinction, even nights preserve unbroken Qiyam and I’tikaf.',
    reference: 'Sahih Muslim 1175 · Sahih al-Bukhari 6464',
    surahNumber: 73,
    ayahNumber: 6,
    verseArabic: 'إِنَّ نَاشِئَةَ اللَّيْلِ هِيَ أَشَدُّ وَطْئًا وَأَقْوَمُ قِيلًا',
    verseEnglish: 'Indeed, the hours of the night are more effective for concurrence [of heart and tongue] and more suitable for words.',
    verseContext: 'Affirms the spiritual clarity of late-night prayer and recitation.',
    historicalDetails: [
      'In Sahih al-Bukhari (2023), two Companions argued whether Laylatul Qadr falls on odd or even counts (counting forward vs. counting backward from month’s end); hence the Prophet ﷺ kept devotion unbroken across all ten nights.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Maintaining Regular Deeds Beloved to Allah (Even Small & Steady)',
        hadithSource: 'Sahih al-Bukhari 6464 · Sahih Muslim 1175',
        narrator: 'Aishah (RA)',
        hadithText:
          'The Prophet ﷺ said: “The most beloved deeds to Allah are those done regularly, even if they are small.”',
      },
    ],
  },
  {
    day: 23,
    title: '23rd Night (2nd Odd Night) · Rain, Water & Clay Prostration',
    fact: 'A rain-soaked Masjid floor bore witness as the Prophet ﷺ led the 23rd night vigil until dawn.',
    reference: 'Sahih al-Bukhari 2018 · Sahih Muslim 1168a',
    surahNumber: 73,
    ayahNumber: 20,
    verseArabic: 'إِنَّ رَبَّكَ يَعْلَمُ أَنَّكَ تَقُومُ أَدْنَىٰ مِن ثُلُثَيِ اللَّيْلِ',
    verseEnglish: 'Indeed, your Lord knows that you stand [in prayer] almost two thirds of the night.',
    verseContext: 'Surah Al-Muzzammil.',
    historicalDetails: [
      'See fixed entry for 23 Ramadan.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Qiyam Until Fajr Seeking Laylatul Qadr',
        hadithSource: 'Sahih Muslim 1168a',
        narrator: 'Abdullah ibn Unays (RA)',
        hadithText:
          'The Prophet ﷺ prayed until the morning on the 23rd night after rain softened the floor of the Masjid, with traces of mud and water on his forehead.',
      },
    ],
  },
  {
    day: 24,
    title: '24th Ramadan · Qur’an Descent Date & Nightly Emancipation from Hellfire',
    fact: 'Musnad Ahmad (16984) places the descent of the Qur’an on the 24th night of Ramadan; Jami‘ at-Tirmidhi confirms Allah frees servants from the Fire every single night of Ramadan.',
    reference: "Musnad Ahmad 16984 · Jami' at-Tirmidhi 682",
    surahNumber: 2,
    ayahNumber: 185,
    verseArabic: 'شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ',
    verseEnglish: 'The month of Ramadan [is that] in which was revealed the Qur’an.',
    verseContext: 'Records the descent of the Noble Qur’an in Ramadan.',
    historicalDetails: [
      'Wathilah ibn al-Asqa‘ (RA) reported in Musnad Ahmad (16984) that the Prophet ﷺ stated the Qur’an was sent down after twenty-four nights of Ramadan had passed (on the 24th/25th transition).',
      'Counting backward in a 29-day or 30-day month also includes the 24th among the nights Ibn Abbas (RA) pointed to when counting seven nights remaining.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Seeking Emancipation from Hellfire Every Single Night of Ramadan',
        hadithSource: "Jami' at-Tirmidhi 682 · Sunan Ibn Majah 1642 (Sahih)",
        narrator: 'Abu Hurairah & Jabir (RA)',
        hadithText:
          'The Messenger of Allah ﷺ said: “Allah has people whom He sets free from the Fire every single day and night of Ramadan, and for every Muslim on every day and night there is a supplication that is answered.”',
      },
    ],
  },
  {
    day: 25,
    title: '25th Night (3rd Odd Night) · Better Than 1,000 Months',
    fact: 'Third odd night of the last ten nights; the Prophet ﷺ led the congregation until half the night passed on the 25th.',
    reference: 'Sahih al-Bukhari 2021 · Sunan Abi Dawud 1375',
    surahNumber: 44,
    ayahNumber: 3,
    verseArabic: 'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةٍ مُّبَارَكَةٍ',
    verseEnglish: 'Indeed, We sent it down during a blessed night.',
    verseContext: 'Surah Ad-Dukhan.',
    historicalDetails: [
      'See fixed entry for 25 Ramadan.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Standing in Night Prayer with Faith and Hope of Reward',
        hadithSource: 'Sahih al-Bukhari 2021 · Sunan Abi Dawud 1375',
        narrator: 'Ibn Abbas & Abu Dharr (RA)',
        hadithText:
          'The Prophet ﷺ stood in night prayer with the Companions until half the night had elapsed on the 25th night.',
      },
    ],
  },
  {
    day: 26,
    title: '26th Ramadan · Generosity, Zakat al-Fitr & Relieving Need Before Eid',
    fact: 'As the final days arrive, Zakat al-Fitr is ordained so no poor person needs to beg on Eid morning.',
    reference: 'Sunan Abi Dawud 1609 · Sahih al-Bukhari 1503',
    surahNumber: 51,
    ayahNumber: 19,
    verseArabic: 'وَفِي أَمْوَالِهِمْ حَقٌّ لِّلسَّائِلِ وَالْمَحْرُومِ',
    verseEnglish: 'And from their properties was [given] the right of the [needy] petitioner and the deprived.',
    verseContext: 'Describes the righteous who stand by night in prayer (51:17–18) and give from their wealth to the needy.',
    historicalDetails: [
      'In Sahih al-Bukhari (1511), Companions like Ibn Umar (RA) used to distribute Zakat al-Fitr one or two days ahead of Eid al-Fitr to collectors appointed to feed needy families on time.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Paying Zakat al-Fitr One or Two Days Before Eid to Feed the Needy',
        hadithSource: 'Sahih al-Bukhari 1511 · Sunan ad-Daraqutni / Abi Dawud 1609',
        narrator: 'Abdullah ibn Umar & Abdullah ibn Abbas (RA)',
        hadithText:
          'Nafi‘ narrated that Abdullah ibn Umar (RA) used to send Zakat al-Fitr to those who gathered it two days or one day before Fitr, and the Prophet ﷺ ordained it “as food for the poor.”',
      },
    ],
  },
  {
    day: 27,
    title: '27th Night (4th Odd Night) · “Allahumma Innaka ‘Afuwwun”',
    fact: 'Night Ubayy ibn Ka’b (RA) swore to in Sahih Muslim and the occasion of the Prophetic ‘Afuwwun supplication.',
    reference: "Jami' at-Tirmidhi 3513 (Sahih) · Sahih Muslim 762a",
    surahNumber: 97,
    ayahNumber: 3,
    verseArabic: 'لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ',
    verseEnglish: 'The Night of Decree is better than a thousand months.',
    verseContext: 'Surah Al-Qadr.',
    historicalDetails: [
      'See fixed entry for 27 Ramadan.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Saying “Allahumma Innaka ‘Afuwwun Tuhibbul-‘Afwa Fa‘fu ‘Anni”',
        hadithSource: "Jami' at-Tirmidhi 3513 (Sahih)",
        narrator: 'Aishah (RA)',
        hadithText:
          '“O Allah, You are Pardoning and love to pardon, so pardon me.”',
      },
    ],
  },
  {
    day: 28,
    title: '28th Ramadan · Completing the Qur’an (Khatmah) & Supplicating',
    fact: 'Authentic practice reported from Anas ibn Malik (RA): upon completing the Qur’an, he gathered his household and made Dua.',
    reference: 'Sunan ad-Darimi 3474 & 3477 (Sahih Chain)',
    surahNumber: 10,
    ayahNumber: 58,
    verseArabic: 'قُلْ بِفَضْلِ اللَّهِ وَبِرَحْمَتِهِ فَبِذَٰلِكَ فَلْيَفْرَحُوا هُوَ خَيْرٌ مِّمَّا يَجْمَعُونَ',
    verseEnglish:
      'Say, “In the bounty of Allah and in His mercy—in that let them rejoice; it is better than what they accumulate.”',
    verseContext: 'Follows 10:57 describing the Qur’an as healing and guidance.',
    historicalDetails: [
      'Reported by Thabit al-Bunani in Sunan ad-Darimi (3474): whenever Anas ibn Malik (RA) was near finishing his recitation of the complete Qur’an, he would assemble his family and pray with them, as mercy descends at Khatmul-Qur’an.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Supplicating Upon Completing the Entire Qur’an',
        hadithSource: 'Sunan ad-Darimi 3474 · Musnad Ahmad (Athar of Anas ibn Malik RA)',
        narrator: 'Anas ibn Malik (RA)',
        hadithText:
          'When Anas ibn Malik (RA) completed the Qur’an, he gathered his children and household and supplicated for them. And the Prophet ﷺ said: “Read the Qur’an, and ask Allah through it before people come who read it and beg people through it.” (Jami‘ at-Tirmidhi 2917).',
      },
    ],
  },
  {
    day: 29,
    title: '29th Night (5th Odd Night) · Moon-Sighting & Zakat al-Fitr',
    fact: 'Final odd night; sunset brings observation for the Shawwal crescent and completion of Zakat al-Fitr.',
    reference: 'Sahih al-Bukhari 1909 & 1503',
    surahNumber: 2,
    ayahNumber: 185,
    verseArabic: 'وَلِتُكْمِلُوا الْعِدَّةَ وَلِتُكَبِّرُوا اللَّهَ عَلَىٰ مَا هَدَاكُمْ',
    verseEnglish: 'And [He wants] for you to complete the period and to glorify Allah for that [to] which He has guided you.',
    verseContext: 'Surah Al-Baqarah.',
    historicalDetails: [
      'See fixed entry for 29 Ramadan.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Sighting the Crescent & Delivering Zakat al-Fitr Before Eid Prayer',
        hadithSource: 'Sahih al-Bukhari 1909 & 1503',
        narrator: 'Abu Hurairah & Ibn Umar (RA)',
        hadithText:
          '“Fast upon seeing it and break the fast upon seeing it; and if it is obscured by clouds, complete thirty days.”',
      },
    ],
  },
  {
    day: 30,
    title: '30th Ramadan · Completing Thirty Days & Takbir Toward Eid',
    fact: 'When the Shawwal crescent is not sighted on evening 29, Muslims complete the 30th fast in accordance with Prophetic command.',
    reference: "Qur'an 2:185 · Sahih al-Bukhari 1909 · Sahih Muslim 1080",
    surahNumber: 2,
    ayahNumber: 185,
    verseArabic: 'وَلِتُكْمِلُوا الْعِدَّةَ وَلِتُكَبِّرُوا اللَّهَ عَلَىٰ مَا هَدَاكُمْ وَلَعَلَّكُمْ تَشْكُرُونَ',
    verseEnglish:
      'And [He wants] for you to complete the period and to glorify Allah for that [to] which He has guided you; and perhaps you will be grateful.',
    verseContext: 'Direct command to complete the full period and glorify Allah.',
    historicalDetails: [
      'In Madinah, the Prophet ﷺ taught that a Hijri month is either 29 or 30 days, forbidding guessing or doubting the ending of Ramadan and instead completing 30 full days whenever clouds obscure the crescent.',
    ],
    hadithActions: [
      {
        practiceTitle: 'Completing the Count to 30 if Obscured & Ensuring Zakat al-Fitr Is Delivered',
        hadithSource: 'Sahih al-Bukhari 1906 & 1909 · Sunan Abi Dawud 1609',
        narrator: 'Abdullah ibn Umar & Abu Hurairah (RA)',
        hadithText:
          'The Messenger of Allah ﷺ said: “The month is thus and thus and thus (showing 29, or 30); do not fast until you see the crescent and do not break fast until you see it; if it is obscured from you, complete the count to thirty.”',
      },
    ],
  },
];

export function getEventsForHijriDate(
  month: number,
  day: number,
  weekdayIdx: number
): IslamicCalendarEvent[] {
  const results: IslamicCalendarEvent[] = [];

  for (const ev of FIXED_ISLAMIC_EVENTS) {
    if (ev.month === month) {
      if (ev.endDay ? day >= ev.day && day <= ev.endDay : day === ev.day) {
        results.push(ev);
      }
    }
  }

  // Ramadan every single day (1..30) carries its authentic milestone if no fixed event already captured it
  if (month === 9 && day >= 1 && day <= 30) {
    const milestone = RAMADAN_DAILY_MILESTONES.find((m) => m.day === day);
    if (milestone && !results.some((r) => r.month === 9 && r.day === day)) {
      results.push({
        id: `ram-daily-${day}`,
        month: 9,
        day,
        title: milestone.title,
        category: day >= 21 && day % 2 === 1 ? 'worship' : 'fasting',
        summary: milestone.fact,
        historicalDetails: milestone.historicalDetails,
        quranVerses: [
          {
            label: `Qur'an ${milestone.surahNumber}:${milestone.ayahNumber}`,
            surahNumber: milestone.surahNumber,
            ayahNumber: milestone.ayahNumber,
            arabic: milestone.verseArabic,
            english: milestone.verseEnglish,
            revelationContext: milestone.verseContext,
          },
        ],
        hadithActions: milestone.hadithActions,
        quranRef: {
          label: `Qur'an ${milestone.surahNumber}:${milestone.ayahNumber}`,
          surahNumber: milestone.surahNumber,
          ayahNumber: milestone.ayahNumber,
          arabic: milestone.verseArabic,
          english: milestone.verseEnglish,
        },
        hadithRef: {
          source: milestone.hadithActions[0]?.hadithSource || milestone.reference,
          narrator: milestone.hadithActions[0]?.narrator || 'Authenticated Collection',
          text: milestone.hadithActions[0]?.hadithText || milestone.fact,
        },
      });
    }
  }

  // White Days (13, 14, 15 of every Hijri month) — exempt 13th Dhu al-Hijjah since fasting is forbidden in Tashreeq
  if (day >= 13 && day <= 15 && !(month === 12 && day === 13)) {
    results.push({
      id: `white-day-${month}-${day}`,
      month,
      day,
      title: `White Day · Day ${day} (Ayyam al-Bid)`,
      category: 'fasting',
      summary:
        'Fasting the 13th, 14th, and 15th of each Hijri month carries the reward of fasting perpetually throughout the year.',
      historicalDetails: [
        'Called Ayyam al-Bid (“the Bright / White Days”) because the moon illuminates almost the entire night across the 13th, 14th, and 15th of every lunar month.',
        'At tenfold reward per deed (Qur’an 6:160), fasting 3 days every lunar month equals 30 days—carrying the reward of fasting the whole year.',
        'Note: For 13 Dhu al-Hijjah, fasting is strictly prohibited because it falls within the Days of Tashreeq (Sahih Muslim 1141a).',
      ],
      quranVerses: [
        {
          label: "Qur'an 6:160",
          surahNumber: 6,
          ayahNumber: 160,
          arabic: 'مَن جَاءَ بِالْحَسَنَةِ فَلَهُ عَشْرُ أَمْثَالِهَا',
          english: 'Whoever comes [on the Day of Judgment] with a good deed will have ten times the like thereof.',
          revelationContext: 'Establishes the tenfold calculation making 3 fasts per month equal to 30 days.',
        },
      ],
      hadithActions: [
        {
          practiceTitle: 'Fasting the 13th, 14th, and 15th of Each Month',
          hadithSource: "Jami' at-Tirmidhi 761 · Sunan an-Nasa'i 2424 (Hasan Sahih)",
          narrator: 'Abu Dharr al-Ghifari (RA)',
          hadithText:
            'The Messenger of Allah ﷺ said to Abu Dharr: “If you fast three days of the month, then fast the thirteenth, fourteenth, and fifteenth.”',
        },
        {
          practiceTitle: 'Reward Equivalent to Perpetual Fasting',
          hadithSource: 'Sahih al-Bukhari 1979 · Sahih Muslim 1159a',
          narrator: 'Abdullah ibn ‘Amr ibn al-‘As & Abu Hurairah (RA)',
          hadithText:
            '“Fasting three days of every month is like fasting all the time (perpetually).”',
        },
      ],
      quranRef: {
        label: "Qur'an 6:160",
        surahNumber: 6,
        ayahNumber: 160,
        english: 'Whoever comes with a good deed will have ten times the like thereof.',
      },
      hadithRef: {
        source: "Jami' at-Tirmidhi 761 · Sunan an-Nasa'i 2424",
        narrator: 'Abu Dharr (RA)',
        text: '“If you fast three days of the month, fast the thirteenth, fourteenth, and fifteenth.”',
      },
    });
  }

  // Friday Jumu'ah
  if (weekdayIdx === 5) {
    results.push({
      id: `jumuah-${month}-${day}`,
      month,
      day,
      title: "Yawm al-Jumu'ah · Best Day the Sun Rises Upon",
      category: 'worship',
      summary:
        'Friday is the weekly Eid and finest day of the week: Adam (AS) was created on it, entered Paradise on it, and on it is an hour when no Muslim asks Allah for good except He grants it.',
      historicalDetails: [
        'In 1 AH during the Hijrah into Madinah, the Prophet ﷺ stopped in the valley of Banu Salim ibn ‘Awf and led his first Jumu’ah congregation in Islam before entering the city.',
        'Surah Al-Jumu‘ah (62:9–11) legislated ceasing all trade immediately when the call for Jumu’ah prayer is made and hastening to the remembrance of Allah.',
      ],
      quranVerses: [
        {
          label: "Qur'an 62:9",
          surahNumber: 62,
          ayahNumber: 9,
          arabic:
            'يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا نُودِيَ لِلصَّلَاةِ مِن يَوْمِ الْجُمُعَةِ فَاسْعَوْا إِلَىٰ ذِكْرِ اللَّهِ وَذَرُوا الْبَيْعَ',
          english:
            'O you who have believed, when [the adhan] is called for the prayer on the day of Jumu’ah, then proceed to the remembrance of Allah and leave trade.',
          revelationContext: 'Command in Surah Al-Jumu’ah establishing the weekly congregation prayer and prohibition of commerce after the second Adhan.',
        },
        {
          label: "Qur'an 18:1",
          surahNumber: 18,
          ayahNumber: 1,
          arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ وَلَمْ يَجْعَل لَّهُ عِوَجًا',
          english:
            '[All] praise is [due] to Allah, who has sent down upon His Servant the Book and has not made therein any deviance.',
          revelationContext: 'Opening of Surah Al-Kahf, recited on Friday according to authentic Prophetic Hadith.',
        },
      ],
      hadithActions: [
        {
          practiceTitle: 'Ghusl, Clean Attire, Perfume & Arriving Early for Jumu‘ah Prayer',
          hadithSource: 'Sahih al-Bukhari 883 & 881',
          narrator: 'Salman al-Farisi & Abu Hurairah (RA)',
          hadithText:
            '“Whoever takes a bath on Friday, purifies himself as much as he can, applies oil or perfume, leaves without separating between two people, prays what is written for him, and listens silently when the Imam speaks—his sins between that Friday and the next Friday will be forgiven.” And whoever arrives in the first hour receives the reward of offering a camel.',
      },
      {
        practiceTitle: 'Reciting Surah Al-Kahf on Friday',
        hadithSource: 'Al-Mustadrak al-Hakim 3392 · Sahih al-Jami‘ 6470',
        narrator: 'Abu Sa’id al-Khudri (RA)',
        hadithText:
          'The Prophet ﷺ said: “Whoever recites Surah Al-Kahf on Friday, a light will shine for him from beneath his feet to the clouds of the sky, shining for him between the two Fridays.”',
      },
      {
        practiceTitle: 'Increasing Salawat Upon the Prophet ﷺ on Friday',
        hadithSource: 'Sunan Abi Dawud 1047 · Sunan Ibn Majah 1636 (Sahih)',
        narrator: 'Aws ibn Aws (RA)',
        hadithText:
          '“Among the best of your days is Friday. On it Adam was created, on it his soul was taken, on it the Trumpet will be blown, and on it the swoon will occur; so send abundant blessings (Salawat) upon me on it, for your blessings are presented to me.”',
      },
      {
        practiceTitle: 'Seeking the Hour of Acceptance on Friday',
        hadithSource: 'Sahih al-Bukhari 935 · Sunan Abi Dawud 1048',
        narrator: 'Abu Hurairah & Jabir ibn Abdullah (RA)',
        hadithText:
          '“On Friday there is an hour in which no Muslim servant stands praying and asks Allah for anything except He grants it to him.” In Sunan Abi Dawud (1048): “Seek it in the last hour after Asr prayer.”',
      },
    ],
    quranRef: {
      label: "Qur'an 62:9",
      surahNumber: 62,
      ayahNumber: 9,
      english:
        'O you who have believed, when [the adhan] is called for the prayer on the day of Jumu’ah, then proceed to the remembrance of Allah.',
    },
    hadithRef: {
      source: 'Sahih Muslim 854a · Sahih al-Bukhari 883 & 935',
      narrator: 'Abu Hurairah & Salman al-Farisi (RA)',
      text: '“The best day on which the sun has risen is Friday; on it Adam was created, on it he entered Paradise, and on it is an hour in which supplications are answered.”',
    },
    });
  }

  // Monday & Thursday Sunnah fast (not on Ramadan, Eid days, or Days of Tashreeq)
  const isEidOrTashreeq =
    (month === 10 && day === 1) || (month === 12 && day >= 10 && day <= 13);
  if ((weekdayIdx === 1 || weekdayIdx === 4) && month !== 9 && !isEidOrTashreeq) {
    results.push({
      id: `mon-thu-${month}-${day}`,
      month,
      day,
      title: `${weekdayIdx === 1 ? 'Monday' : 'Thursday'} Sunnah Fast · Deeds Presented`,
      category: 'fasting',
      summary:
        'The Messenger of Allah ﷺ regularly fasted Mondays and Thursdays because deeds are presented before Allah on these two days—and Mondays mark his birth and first revelation.',
      historicalDetails: [
        'On Mondays, both the birth of Muhammad ﷺ and the descent of first revelation at Cave Hira occurred (Sahih Muslim 1162a).',
        'On both Mondays and Thursdays, the deeds of human servants are raised before Allah and the gates of Paradise open (Sahih Muslim 2565a).',
      ],
      quranVerses: [
        {
          label: "Qur'an 35:10",
          surahNumber: 35,
          ayahNumber: 10,
          arabic: 'إِلَيْهِ يَصْعَدُ الْكَلِمُ الطَّيِّبُ وَالْعَمَلُ الصَّالِحُ يَرْفَعُهُ',
          english: 'To Him ascends good speech, and righteous work raises it.',
          revelationContext: 'Affirms the elevation of righteous speech and deeds before Allah.',
        },
      ],
      hadithActions: [
        {
          practiceTitle: `Fasting ${weekdayIdx === 1 ? 'Monday' : 'Thursday'} When Deeds Are Presented`,
          hadithSource: "Jami' at-Tirmidhi 747 (Sahih) · Sahih Muslim 1162a",
          narrator: 'Abu Hurairah & Abu Qatadah (RA)',
          hadithText:
            'The Messenger of Allah ﷺ said: “Deeds are presented on Monday and Thursday, and I love that my deeds be presented while I am fasting.”',
        },
        {
          practiceTitle: 'Pardon Between Believers on Monday & Thursday',
          hadithSource: 'Sahih Muslim 2565a',
          narrator: 'Abu Hurairah (RA)',
          hadithText:
            '“The gates of Paradise are opened on Monday and Thursday, and every servant who does not associate anything with Allah is forgiven, except a man between whom and his brother there is enmity; it is said: ‘Leave these two until they reconcile.’”',
        },
      ],
      quranRef: {
        label: "Qur'an 35:10",
        surahNumber: 35,
        ayahNumber: 10,
        english: 'To Him ascends good speech, and righteous work raises it.',
      },
      hadithRef: {
        source: "Jami' at-Tirmidhi 747 · Sahih Muslim 2565a",
        narrator: 'Abu Hurairah (RA)',
        text: '“Deeds are presented on Monday and Thursday, and I love that my deeds be presented while I am fasting.”',
      },
    });
  }

  return results;
}
