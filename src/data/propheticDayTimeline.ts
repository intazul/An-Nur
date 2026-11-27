import { PrayerStatus, getLocationCurrentMinutes } from '../utils/prayerTimes';

export interface SunnahDuaItem {
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
}

export interface SunnahFavoriteAct {
  title: string;
  detail: string;
  reference: string;
}

export interface SunnahFavoriteSurah {
  label: string;
  surahNumber: number;
  ayahNumber: number;
  whenRecited: string;
  reference: string;
}

export interface SunnahHadithReference {
  source: string;
  narrator: string;
  text: string;
}

export interface SunnahMinuteEtiquette {
  aspect: string;
  detail: string;
  reference: string;
}

export interface PropheticDayStage {
  id: string;
  order: number;
  phaseTag: string;
  title: string;
  arabicTitle: string;
  briefAction: string;
  briefHighlight: string;
  iconKey:
    | 'moon_stars'
    | 'sunrise_prayer'
    | 'sun_horizon'
    | 'sun_beam'
    | 'briefcase_heart'
    | 'sun_zenith'
    | 'afternoon_clock'
    | 'sunset_shield'
    | 'utensils_family'
    | 'night_prayer'
    | 'quran_fortress'
    | 'sleep_peace';
  stepsToDo: string[];
  minuteDetails: SunnahMinuteEtiquette[];
  duas: SunnahDuaItem[];
  favoriteActs: SunnahFavoriteAct[];
  favoriteSurahs: SunnahFavoriteSurah[];
  hadiths: SunnahHadithReference[];
}

export interface ResolvedPropheticStage extends PropheticDayStage {
  windowStartMinutes: number;
  windowEndMinutes: number;
  windowTimeLabel: string;
  isActiveNow: boolean;
  hasPassedToday: boolean;
}

function formatMins12h(totalMinutes: number): string {
  const mNorm = ((Math.round(totalMinutes) % 1440) + 1440) % 1440;
  const h24 = Math.floor(mNorm / 60);
  const mins = mNorm % 60;
  const period = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(mins).padStart(2, '0')} ${period}`;
}

export const PROPHETIC_DAY_STAGES: PropheticDayStage[] = [
  {
    id: 'waking-tahajjud',
    order: 1,
    phaseTag: 'Last Third of Night',
    title: 'Waking Up & Tahajjud',
    arabicTitle: 'الِاسْتِيقَاظُ وَالتَّهَجُّد',
    briefAction: 'Praise Allah upon waking, use the Miswak, pray Tahajjud (2+2) and close the night with Witr.',
    briefHighlight: 'Āl ‘Imrān 3:190 · Witr Surahs 87, 109, 112',
    iconKey: 'moon_stars',
    stepsToDo: [
      'Sit up, wipe the trace of sleep from the face with both hands, recite the waking Dua, and scrub the teeth immediately with a Miswak.',
      'Look up toward the sky and slowly recite the closing ten verses of Surah Āl ‘Imrān (3:190–200).',
      'Enter the washroom with the left foot first saying the protection Dua; exit right foot first saying Ghufrānak.',
      'Perform Wudu mindfully (~1 mudd of water, starting right limbs, running wet fingers through beard, fingers, and toes), then open Tahajjud with two short Rak‘ahs.',
      'Pray measured pairs (2+2 or 4+4) pausing at each verse, rest briefly if drowsy, and close the night with Witr + Subḥānal-Malikil-Quddūs (3×).',
    ],
    minuteDetails: [
      {
        aspect: 'Wiping Sleep & Immediate Miswak',
        detail: 'Before speaking or eating, he sat up, rubbed sleep from his eyes/face, looked to the sky reciting 3:190–200, and brushed lengthwise across teeth and tongue with an Arak twig.',
        reference: 'Sahih al-Bukhari 183 · Sahih al-Bukhari 245 · Sahih Muslim 255',
      },
      {
        aspect: 'Washroom Foot Order & Moderation',
        detail: 'Entered left foot first whispering “Allāhumma innī a‘ūdhu bika minal-khubuthi wal-khabā’ith”; exited right foot first saying “Ghufrānak”; washed privately with left hand alone and shielded from view.',
        reference: 'Sahih al-Bukhari 142 · Sunan Abi Dawud 30 · Jami‘ at-Tirmidhi 7',
      },
      {
        aspect: 'Exact Wudu Mechanics (Takhlīl & Water)',
        detail: 'Said Bismillāh, washed hands 3× before dipping into vessel, rinsed mouth & nose together 3× inhaling deeply & blowing out with left hand, washed right limbs before left, interlocked wet fingers/toes (takhlīl), passed wet fingers upward through his beard, and used only ~1 mudd (~0.6 L) of water without wasting even by a river.',
        reference: 'Sahih al-Bukhari 201 · Sunan Abi Dawud 142 · Sunan Ibn Majah 425',
      },
      {
        aspect: 'Pacing Tahajjud & Witr Closing',
        detail: 'Began with 2 brief Rak‘ahs, recited with slow pauses (stopping at every Ayah—making mercy verses a plea for mercy and warning verses a plea for refuge), and after Witr Salam said “Subḥānal-Malikil-Quddūs” three times, raising and extending his voice on the third.',
        reference: 'Sahih Muslim 767 · Sahih Muslim 772 · Sunan Abi Dawud 1430',
      },
    ],
    duas: [
      {
        title: 'Upon Waking Up',
        arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
        transliteration: 'Al-ḥamdu lillāhi alladhī aḥyānā ba‘da mā amātanā wa ilayhin-nushūr.',
        translation: 'All praise is for Allah who gave us life after causing us to die, and to Him is the resurrection.',
        reference: 'Sahih al-Bukhari 6312',
      },
      {
        title: 'Entering & Exiting the Washroom',
        arabic: 'بِسْمِ اللَّهِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ  ·  (الخروج): غُفْرَانَكَ',
        transliteration: 'Entry (left foot): Bismillāh, Allāhumma innī a‘ūdhu bika minal-khubuthi wal-khabā’ith. · Exit (right foot): Ghufrānak.',
        translation: 'In Allah’s Name; O Allah, I seek refuge in You from male and female impure spirits. · Upon exit: I seek Your forgiveness.',
        reference: 'Sahih al-Bukhari 142 · Sunan Abi Dawud 30 · Jami‘ at-Tirmidhi 7',
      },
      {
        title: 'Upon Completing Wudu (Eight Gates of Paradise)',
        arabic: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
        transliteration: 'Ash-hadu an lā ilāha illallāhu waḥdahū lā sharīka lah, wa ash-hadu anna Muḥammadan ‘abduhū wa rasūluh. Allāhummaj-‘alnī minat-tawwābīna waj-‘alnī minal-mutaṭahhirīn.',
        translation: 'I bear witness none is worthy of worship except Allah alone... O Allah, make me among those who constantly repent and those who purify themselves.',
        reference: 'Sahih Muslim 234 · Jami‘ at-Tirmidhi 55',
      },
      {
        title: 'Opening Supplication in Night Prayer (Tahajjud)',
        arabic: 'اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ قَيِّمُ السَّمَاوَاتِ وَالْأَرْضِ وَمَنْ فِيهِنَّ وَلَكَ الْحَمْدُ أَنْتَ نُورُ السَّمَاوَاتِ وَالْأَرْضِ',
        transliteration: 'Allāhumma lakal-ḥamdu anta qayyimus-samāwāti wal-arḍi wa man fīhinna, wa lakal-ḥamdu anta nūrus-samāwāti wal-arḍ.',
        translation: 'O Allah, to You belongs all praise; You are the Sustainer of the heavens and the earth and all within them, and to You belongs all praise; You are the Light of the heavens and the earth.',
        reference: 'Sahih al-Bukhari 1120 · Sahih Muslim 769',
      },
    ],
    favoriteActs: [
      {
        title: 'First Action Upon Waking: Miswak',
        detail: 'Hudhayfah (RA) reported that whenever the Prophet (ﷺ) got up for Tahajjud at night, he would clean his mouth thoroughly with the Miswak before anything else.',
        reference: 'Sahih al-Bukhari 245 · Sahih Muslim 255',
      },
      {
        title: 'Steady 11 Rak‘ahs with Long Standing',
        detail: '‘A’ishah (RA) narrated that he never exceeded eleven Rak‘ahs in Ramadan or outside it, praying four, then four (of extraordinary beauty and length), then three Witr.',
        reference: 'Sahih al-Bukhari 1147 · Sahih Muslim 738',
      },
    ],
    favoriteSurahs: [
      {
        label: 'Āl ‘Imrān 3:190–200 (Upon Waking)',
        surahNumber: 3,
        ayahNumber: 190,
        whenRecited: 'Looked toward the heavens upon waking for night prayer and recited the last ten verses.',
        reference: 'Sahih al-Bukhari 4569 · Sahih Muslim 256',
      },
      {
        label: 'Al-A‘lā (87) · 1st Rak‘ah of Witr',
        surahNumber: 87,
        ayahNumber: 1,
        whenRecited: 'Beloved opening Surah in the three-Rak‘ah Witr prayer.',
        reference: 'Sunan Abi Dawud 1423 · Jami‘ at-Tirmidhi 462',
      },
      {
        label: 'Al-Kāfirūn (109) & Al-Ikhlāṣ (112) · Witr',
        surahNumber: 109,
        ayahNumber: 1,
        whenRecited: 'Recited Al-Kāfirūn in the 2nd Rak‘ah and Al-Ikhlāṣ in the 3rd Rak‘ah of Witr.',
        reference: 'Sunan an-Nasa’i 1732 · Sunan Abi Dawud 1423',
      },
    ],
    hadiths: [
      {
        source: 'Sahih al-Bukhari 1145 · Sahih Muslim 758',
        narrator: 'Abu Hurayrah (RA)',
        text: '“Our Lord descends every night to the lowest heaven when the last third of the night remains and says: ‘Who will call upon Me, that I may answer him? Who will ask of Me, that I may give him? Who will seek My forgiveness, that I may forgive him?’”',
      },
      {
        source: 'Sahih Muslim 1163',
        narrator: 'Abu Hurayrah (RA)',
        text: '“The best prayer after the obligatory prayers is the night prayer (Tahajjud).”',
      },
    ],
  },

  {
    id: 'fajr-sunnah-fard',
    order: 2,
    phaseTag: 'True Dawn',
    title: 'Fajr: Sunnah & Dawn Salah',
    arabicTitle: 'سُنَّةُ الْفَجْرِ وَصَلَاةُ الصُّبْحِ',
    briefAction: 'Pray the 2 brief Sunnah Rak‘ahs better than the entire world, then Fajr in congregation.',
    briefHighlight: 'Surah 109 & 112 in Sunnah · Friday: 32 & 76',
    iconKey: 'sunrise_prayer',
    stepsToDo: [
      'Repeat every phrase of the Fajr Adhan softly (saying Lā ḥawla wa lā quwwata illā billāh on Ḥayya ‘alaṣ-Ṣalāh), then send Salawat and say the Wasilah Dua.',
      'Pray the 2 brief Sunnah Rak‘ahs at home with Al-Kāfirūn and Al-Ikhlāṣ so swiftly ‘A’ishah wondered if he had recited Al-Fatihah.',
      'Lie briefly on your right side resting calmly, then walk tranquilly to the Masjid without running—even if Iqamah has begun.',
      'Step into the Masjid right foot first asking for Allah’s gates of mercy, pray Fajr attentively (60–100 verses aloud), then sit in Dhikr.',
    ],
    minuteDetails: [
      {
        aspect: 'Putting on Shoes (Right Foot First)',
        detail: 'Always slipped his right foot into his sandal first and took off the left foot first, saying: “Let the right be the first to be put on and the last to be taken off.”',
        reference: 'Sahih al-Bukhari 5856 · Sahih Muslim 2097',
      },
      {
        aspect: 'Masjid Entry & Exit Foot Etiquette',
        detail: 'Entered the Masjid right foot first reciting “Allāhummaftaḥ lī abwāba raḥmatik” (Open the gates of Your mercy); exited left foot first asking “Allāhumma innī as’aluka min faḍlik” (I ask You of Your bounty).',
        reference: 'Sahih Muslim 713 · Sunan Abi Dawud 465',
      },
      {
        aspect: 'Walking Pace & Gentle Demeanor',
        detail: 'Even when Iqamah sounded, he forbade running out of breath: “Walk calmly and with dignity (*sakīnah* and *waqār*); whatever portion of prayer you catch, pray it, and complete what you missed.”',
        reference: 'Sahih al-Bukhari 636 · Sahih Muslim 602',
      },
      {
        aspect: 'Right-Side Pause Between Sunnah & Fard',
        detail: 'He never mingled voluntary Fajr Sunnah directly with Fard; at home he spoke briefly with his family if awake or rested briefly on his right side waiting for Bilal’s call.',
        reference: 'Sahih al-Bukhari 626 · Sahih Muslim 736',
      },
    ],
    duas: [
      {
        title: 'Dua While Walking to Fajr Prayer',
        arabic: 'اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي بَصَرِي نُورًا، وَفِي سَمْعِي نُورًا، وَعَنْ يَمِينِي نُورًا',
        transliteration: 'Allāhummaj-‘al fī qalbī nūrā, wa fī baṣarī nūrā, wa fī sam‘ī nūrā, wa ‘an yamīnī nūrā.',
        translation: 'O Allah, place light in my heart, light in my sight, light in my hearing, and light on my right.',
        reference: 'Sahih al-Bukhari 6316 · Sahih Muslim 763',
      },
      {
        title: 'Immediately After Salam from Obligatory Prayer',
        arabic: 'أَسْتَغْفِرُ اللَّهَ (ثَلَاثًا) اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
        transliteration: 'Astaghfirullāh (3×). Allāhumma antas-Salāmu wa minkas-salām, tabārakta yā Dhal-Jalāli wal-Ikrām.',
        translation: 'I seek Allah’s forgiveness (3×). O Allah, You are Peace and from You comes peace. Blessed are You, O Possessor of Majesty and Honor.',
        reference: 'Sahih Muslim 591',
      },
    ],
    favoriteActs: [
      {
        title: 'Most Guarded Voluntary Prayer',
        detail: '‘A’ishah (RA) said the Prophet (ﷺ) was never more regular and careful about any voluntary prayer than the two Rak‘ahs before Fajr — he never abandoned them even on journeys.',
        reference: 'Sahih al-Bukhari 1169 · Sahih Muslim 724',
      },
      {
        title: 'Lying Briefly on the Right Side',
        detail: 'When he finished praying the two Sunnah Rak‘ahs before Fajr at home, he would lie down on his right side until Bilal called him for the obligatory prayer.',
        reference: 'Sahih al-Bukhari 626 · Sahih Muslim 736',
      },
    ],
    favoriteSurahs: [
      {
        label: 'Al-Kāfirūn (109) & Al-Ikhlāṣ (112) · Fajr Sunnah',
        surahNumber: 109,
        ayahNumber: 1,
        whenRecited: 'Consistently recited in the two Sunnah Rak‘ahs before Fajr.',
        reference: 'Sahih Muslim 726',
      },
      {
        label: 'Surah Qāf (50:1) · Fajr Fard Recitation',
        surahNumber: 50,
        ayahNumber: 1,
        whenRecited: 'He used to recite 60 to 100 verses in Fajr, frequently Surah Qāf.',
        reference: 'Sahih Muslim 458 · Sahih al-Bukhari 771',
      },
      {
        label: 'As-Sajdah (32) & Al-Insān (76) · Friday Fajr',
        surahNumber: 32,
        ayahNumber: 1,
        whenRecited: 'Beloved pairing recited in Fajr prayer every Friday morning.',
        reference: 'Sahih al-Bukhari 891 · Sahih Muslim 880',
      },
    ],
    hadiths: [
      {
        source: 'Sahih Muslim 725a',
        narrator: '‘A’ishah (RA)',
        text: '“The two Rak‘ahs of Fajr (Sunnah) are better than this world and everything it contains.”',
      },
      {
        source: 'Sahih Muslim 657',
        narrator: 'Jundub ibn ‘Abdillah (RA)',
        text: '“Whoever prays the Dawn prayer (Fajr) is under the protection of Allah.”',
      },
    ],
  },

  {
    id: 'fajr-to-ishraq',
    order: 3,
    phaseTag: 'Dawn to Sunrise',
    title: 'Morning Adhkar & Ishraq',
    arabicTitle: 'أَذْكَارُ الصَّبَاحِ وَصَلَاةُ الْإِشْرَاقِ',
    briefAction: 'Stay seated in Dhikr until sunrise, say Morning Adhkar, then pray 2 Rak‘ahs of Ishraq.',
    briefHighlight: 'Sayyidul Istighfar · 3 Quls 3× · Āyat al-Kursī',
    iconKey: 'sun_horizon',
    stepsToDo: [
      'After Salam, remain seated facing the congregation, say Astaghfirullāh 3× and Allāhumma antas-Salām before moving.',
      'Sit cross-legged (*tarabbu‘*) in your prayer place remembering Allah, reading Qur’an, or teaching until the sun rises clearly.',
      'Recite Sayyidul Istighfar, Subḥānallāhi wa biḥamdih (100×), Āyat al-Kursī, and the Three Quls (3× each).',
      'Once the sun rises a spear’s height above the horizon (~15 minutes after sunrise), pray 2 Rak‘ahs of Ishraq.',
    ],
    minuteDetails: [
      {
        aspect: 'Post-Salah Facing & Posture',
        detail: 'Stayed briefly facing Qiblah just long enough for “Allāhumma antas-Salām wa minkas-salām, tabārakta yā Dhal-Jalāli wal-Ikrām,” then turned toward the people to sit cross-legged in Dhikr.',
        reference: 'Sahih Muslim 591 · Sahih Muslim 592 · Sahih Muslim 670',
      },
      {
        aspect: 'Counting Dhikr on the Right Fingers',
        detail: 'Yusayrah (RA) reported he instructed women (and companions) to count Tasbih, Tahlil, and Taqdis on their right fingertips, explaining: “For they will be questioned and made to speak on the Day of Judgment.”',
        reference: 'Sunan Abi Dawud 1501 · Jami‘ at-Tirmidhi 3583',
      },
      {
        aspect: 'No Prayer During Exact Sunrise Window',
        detail: 'Avoided praying voluntary Salah during the ~12–15 minutes while the sun’s edge is rising until it climbs cleanly above the horizon.',
        reference: 'Sahih Muslim 827 · Sahih Muslim 831',
      },
    ],
    duas: [
      {
        title: 'Sayyidul Istighfar (Master Supplication for Forgiveness)',
        arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
        transliteration: 'Allāhumma anta Rabbī lā ilāha illā ant, khalaqtanī wa anā ‘abduk, wa anā ‘alā ‘ahdika wa wa‘dika mastaṭa‘t, a‘ūdhu bika min sharri mā ṣana‘t, abū’u laka bini‘matika ‘alayya wa abū’u bidhanbī faghfir lī fa-innahū lā yaghfirudh-dhunūba illā ant.',
        translation: 'O Allah, You are my Lord; none has the right to be worshipped except You. You created me and I am Your servant... forgive me, for none forgives sins except You.',
        reference: 'Sahih al-Bukhari 6306',
      },
      {
        title: 'Morning Invocation After Fajr',
        arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا',
        transliteration: 'Allāhumma innī as’aluka ‘ilman nāfi‘ā, wa rizqan ṭayyibā, wa ‘amalan mutaqabbalā.',
        translation: 'O Allah, I ask You for beneficial knowledge, goodly pure provision, and accepted deeds.',
        reference: 'Sunan Ibn Majah 925',
      },
    ],
    favoriteActs: [
      {
        title: 'Sitting Cross-Legged in the Masjid Until Sunrise',
        detail: 'Jabir ibn Samurah (RA) narrated that when the Prophet (ﷺ) prayed Fajr, he remained seated cross-legged in his prayer place remembering Allah until the sun had fully risen.',
        reference: 'Sahih Muslim 670',
      },
      {
        title: 'Seeking Early-Morning Barakah',
        detail: 'He blessed the early morning hours and dispatched companions, travelers, and daily affairs right after Fajr.',
        reference: 'Sunan Abi Dawud 2606 · Jami‘ at-Tirmidhi 1212',
      },
    ],
    favoriteSurahs: [
      {
        label: 'Āyat al-Kursī (2:255) · Morning Shield',
        surahNumber: 2,
        ayahNumber: 255,
        whenRecited: 'Recited once each morning to be protected from jinn until evening.',
        reference: 'Al-Mustadrak 2064 (Sahih) · An-Nasa’i al-Kubra',
      },
      {
        label: 'Al-Ikhlāṣ, Al-Falaq, An-Nās (112–114 · 3×)',
        surahNumber: 112,
        ayahNumber: 1,
        whenRecited: '“Recite Qul Huwa Allāhu Aḥad and Al-Mu‘awwidhatayn three times in the morning and evening; they will suffice you in all respects.”',
        reference: 'Sunan Abi Dawud 5082 · Jami‘ at-Tirmidhi 3575',
      },
    ],
    hadiths: [
      {
        source: 'Jami‘ at-Tirmidhi 586',
        narrator: 'Anas ibn Malik (RA)',
        text: '“Whoever prays Fajr in congregation, then sits remembering Allah until the sun rises, then prays two Rak‘ahs, will have a reward like that of Hajj and ‘Umrah—complete, complete, complete.”',
      },
      {
        source: 'Jami‘ at-Tirmidhi 1212',
        narrator: 'Sakhr al-Ghamidi (RA)',
        text: '“O Allah, bless my Ummah in their early mornings.”',
      },
    ],
  },

  {
    id: 'duha-forenoon',
    order: 4,
    phaseTag: 'Forenoon Light',
    title: 'Salat ad-Duha & Morning Grace',
    arabicTitle: 'صَلَاةُ الضُّحَى',
    briefAction: 'Pray 2–8 Rak‘ahs of Duha as charity for every joint; dress cleanly and wear pleasant scent.',
    briefHighlight: 'Charity for 360 joints · Surah Aḍ-Ḍuḥā 93',
    iconKey: 'sun_beam',
    stepsToDo: [
      'When morning warmth grows, pray 2, 4, or 8 Rak‘ahs of Salat ad-Duha.',
      'Groom carefully starting with the right side: bathe, comb and oil hair/beard, wear clean simple garments (white preferred), and apply musk/oud perfume.',
      'Check fingernails/mustache/cleanliness on Fridays and mornings, greet every person warmly with a calm smile, and keep speech measured.',
      'Say Istighfar 70–100× across morning gatherings and give daily charity through kind words and helpful deeds.',
    ],
    minuteDetails: [
      {
        aspect: 'Combing, Oiling & Beginning Right-First',
        detail: '‘A’ishah (RA) said: “The Messenger of Allah (ﷺ) loved to start from the right in wearing sandals, combing his hair, purifying himself, and in all his honorable affairs.” He oiled his hair frequently and parted it cleanly.',
        reference: 'Sahih al-Bukhari 168 · Ash-Shama’il al-Muhammadiyyah 31',
      },
      {
        aspect: 'Clothing Length, Color & Never Refusing Perfume',
        detail: 'Wore his lower garment mid-shin (above ankles out of humility), favored clean white linen/cotton robes, kept a silver ring on his left/right little finger, and never refused offered perfume or cushioned pillows.',
        reference: 'Jami‘ at-Tirmidhi 994 · Sahih al-Bukhari 5892 · Ash-Shama’il 52',
      },
      {
        aspect: 'Walking Gait & Never Turning Half-Headed',
        detail: 'Walked briskly with firm balanced steps leaning gently forward as though descending a slight slope, kept gaze lowered toward the ground more than skyward, and when someone called him, turned his entire body—never glancing awkwardly over one shoulder.',
        reference: 'Ash-Shama’il al-Muhammadiyyah 118–121',
      },
      {
        aspect: 'Speech Rhythm & Gentle Smiling',
        detail: 'Never spoke fast or rambled; articulated clearly enough that a listener could count every word, repeated crucial points three times so listeners grasped them, and his laughter was a quiet radiant smile (*tabassum*)—never loud roaring guffaws.',
        reference: 'Sahih al-Bukhari 3567 · Sahih al-Bukhari 95 · Jami‘ at-Tirmidhi 3641',
      },
    ],
    duas: [
      {
        title: 'Forenoon Glorification Taught by the Prophet (ﷺ)',
        arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ',
        transliteration: 'Subḥānallāhi wa biḥamdih, ‘adada khalqih, wa riḍā nafsih, wa zinata ‘arshih, wa midāda kalimātih.',
        translation: 'Glory and praise be to Allah, as numerous as His creation, as pleasing to Himself, as heavy as His Throne, and as boundless as His words. (3×)',
        reference: 'Sahih Muslim 2726',
      },
      {
        title: 'Prophetic Istighfar in Morning Gatherings',
        arabic: 'رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ',
        transliteration: 'Rabbigh-fir lī wa tub ‘alayya innaka antat-Tawwābur-Raḥīm.',
        translation: 'My Lord, forgive me and accept my repentance; verily You are the Acceptor of Repentance, the Most Merciful.',
        reference: 'Sunan Abi Dawud 1516 · Jami‘ at-Tirmidhi 3434',
      },
    ],
    favoriteActs: [
      {
        title: 'Prayer of the Penitents (Awabin)',
        detail: 'On the Conquest of Makkah, the Prophet (ﷺ) bathed and prayed eight Rak‘ahs of Duha; in ordinary days he regularly prayed two or four, and urged Abu Hurayrah and Abu Dharr never to leave it.',
        reference: 'Sahih al-Bukhari 357 · Sahih Muslim 719 · Sahih Muslim 721',
      },
      {
        title: 'Love for Perfume & White Clean Garments',
        detail: 'He declared scent (ṭīb) and prayer among the most beloved things to him, and preferred clean white garments.',
        reference: 'Sunan an-Nasa’i 3939 · Jami‘ at-Tirmidhi 994',
      },
    ],
    favoriteSurahs: [
      {
        label: 'Surah Aḍ-Ḍuḥā (93:1–11)',
        surahNumber: 93,
        ayahNumber: 1,
        whenRecited: 'Reminds the heart of morning brightness, Allah’s unwavering care, and gratitude for past blessings.',
        reference: 'Sahih al-Bukhari 4950',
      },
      {
        label: 'Surah Ash-Shams (91:1–10)',
        surahNumber: 91,
        ayahNumber: 1,
        whenRecited: 'Frequent short surah reflecting purification of the soul in daylight.',
        reference: 'Sahih al-Bukhari 705',
      },
    ],
    hadiths: [
      {
        source: 'Sahih Muslim 720',
        narrator: 'Abu Dharr (RA)',
        text: '“In the morning, charity is due from every joint of your body: every SubḥānAllāh is charity, every Alḥamdulillāh is charity... and two Rak‘ahs prayed at Duha suffice for all of that.”',
      },
      {
        source: 'Sahih Muslim 748b',
        narrator: 'Zayd ibn Arqam (RA)',
        text: '“The prayer of those who turn frequently to Allah (Ṣalāt al-Awwābīn) is when the young camels feel the heat of the forenoon sun.”',
      },
    ],
  },

  {
    id: 'midday-service-work',
    order: 5,
    phaseTag: 'Late Morning',
    title: 'Home Service, Honest Work & Qaylulah',
    arabicTitle: 'خِدْمَةُ الْأَهْلِ وَالْعَمَلُ وَالْقَيْلُولَة',
    briefAction: 'Serve your household joyfully, deal honestly with people, keep a light tongue & rest briefly before Dhuhr.',
    briefHighlight: 'Khidmat at home · Qaylulah nap · Surah Al-‘Aṣr 103',
    iconKey: 'briefcase_heart',
    stepsToDo: [
      'Say the travel/door Dua when stepping out right-foot-first and the entry Dua when entering home with Salam.',
      'Serve family members without pride: sew tears, repair sandals, assist with housework, and share small joys.',
      'Greet everyone first—including young children in the street—never belittle small gifts, and speak gently without harsh blame.',
      'Enjoy a light nutritious morning/midday bite (dates, barley, honey-water) and take a brief midday rest (Qaylulah) to recharge for night prayer.',
    ],
    minuteDetails: [
      {
        aspect: 'Domestic Service (Khidmat al-Ahl)',
        detail: 'Far from demanding royal service at home, he patched his own thobe, mended his own leather sandals, tied his camel, swept his room, fed animals, and ate alongside household helpers.',
        reference: 'Sahih al-Bukhari 676 · Musnad Ahmad 24903 · Sahih al-Bukhari 6039',
      },
      {
        aspect: 'Greeting Children & Answering Everyone',
        detail: 'Anas (RA) passed young playing children with him and saw the Prophet (ﷺ) gently greet the children first with As-Salāmu ‘Alaykum and touch their cheeks tenderly. He never pulled his hand away from a handshake before the other person let go.',
        reference: 'Sahih al-Bukhari 6247 · Jami‘ at-Tirmidhi 2490',
      },
      {
        aspect: 'Ten Years Without One Scolding Word',
        detail: 'Anas ibn Malik (RA) testified: “I served the Prophet (ﷺ) for ten full years. By Allah, he never once said ‘Uff’ to me, never asked ‘Why did you do that?’ nor ‘Why didn’t you do that?’”',
        reference: 'Sahih al-Bukhari 6038 · Sahih Muslim 2309',
      },
      {
        aspect: 'Qaylulah (Midday Renewal Nap)',
        detail: 'Took a brief midday rest around pre-Dhuhr or just after Dhuhr, saying: “Take the Qaylulah nap, for devils do not take the midday nap”—giving strength for calm Tahajjud at night.',
        reference: 'Al-Mu‘jam al-Awsat 28 · Sahih al-Adab al-Mufrad',
      },
    ],
    duas: [
      {
        title: 'Leaving Home',
        arabic: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
        transliteration: 'Bismillāh, tawakkaltu ‘alallāh, wa lā ḥawla wa lā quwwata illā billāh.',
        translation: 'In the Name of Allah, I place my trust in Allah, and there is no power nor strength except through Allah.',
        reference: 'Sunan Abi Dawud 5095 · Jami‘ at-Tirmidhi 3426',
      },
      {
        title: 'Entering Home',
        arabic: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
        transliteration: 'Bismillāhi walajnā, wa bismillāhi kharajnā, wa ‘alallāhi Rabbinā tawakkalnā.',
        translation: 'In the Name of Allah we enter, in the Name of Allah we leave, and upon Allah our Lord we rely.',
        reference: 'Sunan Abi Dawud 5096',
      },
    ],
    favoriteActs: [
      {
        title: 'At the Service of His Family',
        detail: 'Asked what the Prophet (ﷺ) did at home, ‘A’ishah (RA) answered: “He used to serve his family (mending his sandals, patching his garment, and milking his sheep), and when prayer time came, he went out to pray.”',
        reference: 'Sahih al-Bukhari 676 · Musnad Ahmad 24903',
      },
      {
        title: 'Smiling & Gentle Conduct with All',
        detail: 'Jarir (RA) said: “The Messenger of Allah (ﷺ) never turned me away from seeing him, nor did he ever look at me except with a smile on his face.”',
        reference: 'Sahih al-Bukhari 3035 · Jami‘ at-Tirmidhi 1956',
      },
    ],
    favoriteSurahs: [
      {
        label: 'Surah Al-‘Aṣr (103:1–3)',
        surahNumber: 103,
        ayahNumber: 1,
        whenRecited: 'The Companions did not part from one another until they recited Surah Al-‘Aṣr—guiding faith, righteous action, truth, and patience.',
        reference: 'Al-Mu‘jam al-Awsat (Sahih al-Albani)',
      },
      {
        label: 'Surah Al-Mā‘ūn (107:1–7)',
        surahNumber: 107,
        ayahNumber: 1,
        whenRecited: 'Reminds believers to pair worship with compassion toward orphans, neighbors, and everyday kindness.',
        reference: 'Qur’an 107:1–7',
      },
    ],
    hadiths: [
      {
        source: 'Sahih al-Bukhari 2072',
        narrator: 'Al-Miqdam (RA)',
        text: '“Nobody has ever eaten a better meal than that which one has earned by working with his own hands.”',
      },
      {
        source: 'Sahih al-Bukhari 6406 · Sahih Muslim 2694',
        narrator: 'Abu Hurayrah (RA)',
        text: '“Two words are light on the tongue, heavy on the Scale, and beloved to the Most Merciful: Subḥānallāhi wa biḥamdih, Subḥānallāhil-‘Aẓīm.”',
      },
    ],
  },

  {
    id: 'dhuhr-prayer',
    order: 6,
    phaseTag: 'Midday Zenith',
    title: 'Dhuhr: Gates of Heaven Open',
    arabicTitle: 'صَلَاةُ الظُّهْرِ وَسُنَنُهَا',
    briefAction: 'Answer the Adhan, pray 4 Sunnahs before Dhuhr, 4 Fard, then 2–4 Sunnahs after.',
    briefHighlight: '4 before & 4 after Dhuhr · Fridays: Al-Kahf 18',
    iconKey: 'sun_zenith',
    stepsToDo: [
      'Repeat every phrase of the Adhan, send Salawat, recite the Wasilah Dua, and make earnest private Dua before Iqamah.',
      'Pray 4 calm Sunnah Rak‘ahs before Dhuhr, 4 Fard in congregation, then 2 (or 4) Sunnah Rak‘ahs after.',
      'If standing for Fard Prayer, keep eyes gently lowered to the spot of prostration without glancing around.',
      'On Fridays: wash completely (Ghusl), trim nails/mustache, wear best clean robe + fragrance, arrive early walking calmly, listen silently to Khutbah, and recite Surah Al-Kahf.',
    ],
    minuteDetails: [
      {
        aspect: 'Straightening Lines Shoulder-to-Shoulder',
        detail: 'Turned to examine the prayer rows before Takbir saying: “Straighten your rows, stand shoulder-to-shoulder and foot-to-foot, lest Allah divide your hearts.”',
        reference: 'Sahih al-Bukhari 717 · Sahih Muslim 433',
      },
      {
        aspect: 'Balanced Tranquility (Ṭuma’nīnah) in Every Posture',
        detail: 'Paused calmly until every bone settled in bowing (*Rukū‘* — back flat enough water would rest still on it), standing up straight after Rukū‘, sitting straight between the two Sujūd, and lowering his knees/hands gently without dropping like a camel.',
        reference: 'Sahih al-Bukhari 792 · Sunan Abi Dawud 858 · Sahih Muslim 498',
      },
      {
        aspect: 'No Interlocking Fingers Walking to Salah',
        detail: 'Advised companions on their way to prayer not to lace fingers together (a sign of restlessness/fitnah), keeping hands relaxed until standing before Allah.',
        reference: 'Sunan Abi Dawud 562 · Jami‘ at-Tirmidhi 386',
      },
      {
        aspect: 'Friday Secret Hour & Silent Khutbah Focus',
        detail: 'Warned against saying even “Be quiet!” to a neighbor during the Friday sermon—keeping total attentive silence for the Khutbah and seeking the hidden Friday hour of answered Dua.',
        reference: 'Sahih al-Bukhari 934 · Sahih al-Bukhari 935',
      },
    ],
    duas: [
      {
        title: 'Dua Immediately After the Adhan',
        arabic: 'اللَّهُمَّ رَبَّ هَٰذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ',
        transliteration: 'Allāhumma Rabba hādhihid-da‘watit-tāmmah, waṣ-ṣalātil-qā’imah, āti Muḥammadanil-wasīlata wal-faḍīlah, wab‘ath-hu maqāman maḥmūdanil-ladhī wa‘adtah.',
        translation: 'O Allah, Lord of this perfect call and established prayer, grant Muhammad the highest station and honor, and raise him to the praised station You have promised him.',
        reference: 'Sahih al-Bukhari 614',
      },
    ],
    favoriteActs: [
      {
        title: 'Four Rak‘ahs When the Sun Declines',
        detail: 'The Prophet (ﷺ) consistently prayed four Rak‘ahs after midday before Dhuhr and explained: “It is an hour in which the gates of heaven are opened, and I love that a righteous deed of mine ascends therein.”',
        reference: 'Jami‘ at-Tirmidhi 478',
      },
      {
        title: 'Friday Beloved Devotion (Jumu‘ah)',
        detail: 'Taking Ghusl, cleaning with Miswak, wearing fragrance, walking early without stepping over necks, and reading Surah Al-Kahf.',
        reference: 'Sahih al-Bukhari 883 · Al-Mustadrak 3392',
      },
    ],
    favoriteSurahs: [
      {
        label: 'Surah Al-Kahf (18:1) · Every Friday',
        surahNumber: 18,
        ayahNumber: 1,
        whenRecited: '“Whoever recites Surah Al-Kahf on Friday will have a light shining for him between the two Fridays.”',
        reference: 'Al-Mustadrak 3392 · Sunan al-Bayhaqi (Sahih)',
      },
      {
        label: 'Al-A‘lā (87) & Al-Ghāshiyah (88) · Jumu‘ah',
        surahNumber: 87,
        ayahNumber: 1,
        whenRecited: 'Frequently recited by the Prophet (ﷺ) in the Friday congregational prayer.',
        reference: 'Sahih Muslim 878',
      },
    ],
    hadiths: [
      {
        source: 'Jami‘ at-Tirmidhi 428 · Sunan Abi Dawud 1269',
        narrator: 'Umm Habibah (RA)',
        text: '“Whoever maintains four Rak‘ahs before Dhuhr and four after it, Allah forbids him from the Fire.”',
      },
      {
        source: 'Jami‘ at-Tirmidhi 212 · Sunan Abi Dawud 521',
        narrator: 'Anas ibn Malik (RA)',
        text: '“The supplication made between the Adhan and the Iqamah is not rejected.”',
      },
    ],
  },

  {
    id: 'asr-and-afternoon',
    order: 7,
    phaseTag: 'Afternoon',
    title: '‘Asr: The Guarded Middle Prayer',
    arabicTitle: 'صَلَاةُ الْعَصْرِ وَالْوُسْطَى',
    briefAction: 'Guard ‘Asr immediately at its prime time, complete Tasbih Fatimah & visit/benefit companions.',
    briefHighlight: 'Angels gather at Fajr & ‘Asr · Al-Baqarah 2:238',
    iconKey: 'afternoon_clock',
    stepsToDo: [
      'Optionally pray 4 gentle Sunnah Rak‘ahs before ‘Asr, then establish 4 Fard ‘Asr in its prime bright window.',
      'Complete Tasbih Fatimah (33·33·34) and Āyat al-Kursī silently with deep awareness before standing.',
      'Check lovingly on family households, visit any sick neighbor, comfort widows/poor, and attend gatherings with humility.',
      'On Fridays right before Maghrib, sit facing the Qiblah absorbed in tearful personal Dua until sunset.',
    ],
    minuteDetails: [
      {
        aspect: 'Daily Visits Across Every Household',
        detail: 'After ‘Asr, he regularly walked round visiting the apartments of his wives, inquiring calmly about each household’s well-being before spending the night in that evening’s scheduled home.',
        reference: 'Sahih al-Bukhari 5216 · Sunan Abi Dawud 2135',
      },
      {
        aspect: 'Sitting Wherever Space Remained (Never Front-Row Privilege)',
        detail: 'When joining companions sitting in circles, he sat cleanly wherever space opened rather than demanding a throne or special elevated seat—so strangers walking in had to ask “Which one of you is Muhammad?”',
        reference: 'Sahih al-Bukhari 63 · Sunan Abi Dawud 4824',
      },
      {
        aspect: 'Sick Visitation & Holding Cool Hands on Forehead',
        detail: 'Whenever visiting the sick, he sat right by their head asking “Lā ba’sa, ṭahūrun in shā Allāh” (No harm; a purification if Allah wills), placed his cool palm gently on their forehead and chest, and stayed briefly so not to tire them.',
        reference: 'Sahih al-Bukhari 5656 · Sahih al-Bukhari 5659',
      },
    ],
    duas: [
      {
        title: 'Seeking Refuge from Anxiety, Grief, Laziness & Debt',
        arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
        transliteration: 'Allāhumma innī a‘ūdhu bika minal-hammi wal-ḥazan, wal-‘ajzi wal-kasal, wal-bukhli wal-jubn, wa ḍala‘id-dayni wa ghalabatir-rijāl.',
        translation: 'O Allah, I seek refuge in You from worry and grief, from helplessness and laziness, from miserliness and cowardice, and from being overwhelmed by debt and overpowered by men.',
        reference: 'Sahih al-Bukhari 6369',
      },
      {
        title: 'Post-Salah Tasbih (33 · 33 · 33 + 1)',
        arabic: 'سُبْحَانَ اللَّهِ (٣٣) · الْحَمْدُ لِلَّهِ (٣٣) · اللَّهُ أَكْبَرُ (٣٣) · لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'SubḥānAllāh (33×), Al-ḥamdu lillāh (33×), Allāhu Akbar (33×), completed at 100 with Lā ilāha illallāhu waḥdahū lā sharīka lah, lahul-mulku wa lahul-ḥamdu wa huwa ‘alā kulli shay’in qadīr.',
        translation: '“Whoever recites this after every obligatory prayer will have his sins forgiven even if they are like the foam of the sea.”',
        reference: 'Sahih Muslim 597',
      },
    ],
    favoriteActs: [
      {
        title: 'Four Light Sunnahs Before ‘Asr',
        detail: 'The Prophet (ﷺ) loved mercy for those who pray four voluntary Rak‘ahs before ‘Asr: “May Allah have mercy on a person who prays four before ‘Asr.”',
        reference: 'Sunan Abi Dawud 1271 · Jami‘ at-Tirmidhi 430',
      },
      {
        title: 'Compassion Toward Widows, Poor & Neighbors',
        detail: 'He regularly checked on households in need, visited the sick, and comforted companions with tenderness.',
        reference: 'Sahih al-Bukhari 5353 · Sahih Muslim 2982',
      },
    ],
    favoriteSurahs: [
      {
        label: 'Al-Baqarah 2:238 · The Middle Prayer',
        surahNumber: 2,
        ayahNumber: 238,
        whenRecited: '“Guard strictly your prayers, especially the Middle Prayer (‘Asr), and stand before Allah in devout obedience.”',
        reference: 'Sahih Muslim 627 · Sahih al-Bukhari 4534',
      },
      {
        label: 'Āyat al-Kursī (2:255) · After Every Fard Salah',
        surahNumber: 2,
        ayahNumber: 255,
        whenRecited: '“Whoever recites Āyat al-Kursī after every obligatory prayer, nothing prevents him from entering Paradise except death.”',
        reference: 'An-Nasa’i al-Kubra 9928 (Sahih)',
      },
    ],
    hadiths: [
      {
        source: 'Sahih al-Bukhari 555 · Sahih Muslim 632',
        narrator: 'Abu Hurayrah (RA)',
        text: '“Angels take turns among you by night and by day, and they all assemble together at the time of Fajr and ‘Asr prayers.”',
      },
      {
        source: 'Sahih al-Bukhari 552',
        narrator: 'Ibn ‘Umar (RA)',
        text: '“Whoever misses the ‘Asr prayer (deliberately), it is as if he lost his family and his property.”',
      },
    ],
  },

  {
    id: 'maghrib-and-adhkar',
    order: 8,
    phaseTag: 'Sunset',
    title: 'Dusk, Maghrib & Evening Adhkar',
    arabicTitle: 'صَلَاةُ الْمَغْرِبِ وَأَذْكَارُ الْمَسَاءِ',
    briefAction: 'Bring children indoors at dusk, pray Maghrib + 2 Sunnahs & shield the night with Evening Adhkar.',
    briefHighlight: 'Evening Adhkar · Surah 109 & 112 in Sunnah',
    iconKey: 'sunset_shield',
    stepsToDo: [
      'Just as sunset settles, bring children indoors, shut exterior doors, tie water-skins, and cover dishes mentioning “Bismillāh.”',
      'If breaking a fast, eat fresh ripe dates (*ruṭab*)—or dry dates—or sip pure water before praying Maghrib.',
      'Pray 3 Fard Rak‘ahs of Maghrib promptly right after sunset, then pray 2 Sunnah Rak‘ahs at home.',
      'Complete Evening Adhkar: Amsaynā, Sayyidul Istighfar, Three Quls (3×), Āyat al-Kursī, and protection in Allah’s perfect words.',
    ],
    minuteDetails: [
      {
        aspect: 'Odd Numbers Breaking Fast & Pre-Prayer Lightness',
        detail: 'Anas (RA) saw him break fast before praying Maghrib with a few fresh dates (or dry dates, or a few sips of water) without delaying Maghrib prayer.',
        reference: 'Sunan Abi Dawud 2356 · Jami‘ at-Tirmidhi 696',
      },
      {
        aspect: 'Why Doors & Food Vessels Need Bismillāh at Dusk',
        detail: 'Instructed that when night falls, whispering *Bismillāh* while shutting doors and laying even a small twig across uncovered pots seals them spiritually—nothing breaks what was shut with Allah’s Name.',
        reference: 'Sahih al-Bukhari 3304 · Sahih Muslim 2012',
      },
      {
        aspect: 'Praying Voluntary Rak‘ahs at Home',
        detail: 'Turned his homes into places of light by praying Maghrib’s 2 Sunnahs inside his house rather than treating homes like dark graves devoid of worship.',
        reference: 'Sahih al-Bukhari 1180 · Sahih Muslim 777',
      },
    ],
    duas: [
      {
        title: 'Evening Remembrance Upon Sunset',
        arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        transliteration: 'Amsaynā wa amsal-mulku lillāh, wal-ḥamdu lillāh, lā ilāha illallāhu waḥdahū lā sharīka lah, lahul-mulku wa lahul-ḥamdu wa huwa ‘alā kulli shay’in qadīr.',
        translation: 'We have reached the evening and at this evening the whole dominion belongs to Allah, and all praise is for Allah...',
        reference: 'Sahih Muslim 2723',
      },
      {
        title: 'Evening Protection in Perfect Words of Allah',
        arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
        transliteration: 'A‘ūdhu bikalimātillāhit-tāmmāti min sharri mā khalaq. (3×)',
        translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
        reference: 'Sahih Muslim 2708 · Jami‘ at-Tirmidhi 3604',
      },
    ],
    favoriteActs: [
      {
        title: 'Household Safeguard at Dusk',
        detail: '“When night falls, keep your children indoors, for the devils spread out at that time... and shut your doors mentioning Allah’s Name.”',
        reference: 'Sahih al-Bukhari 3304 · Sahih Muslim 2012',
      },
      {
        title: 'Two Rak‘ahs After Maghrib at Home',
        detail: 'The Prophet (ﷺ) consistently prayed the two Sunnah Rak‘ahs following Maghrib.',
        reference: 'Sahih al-Bukhari 1180 · Sahih Muslim 729',
      },
    ],
    favoriteSurahs: [
      {
        label: 'Surah Aṭ-Ṭūr (52:1) & Al-Mursalāt (77:1) · Maghrib',
        surahNumber: 52,
        ayahNumber: 1,
        whenRecited: 'Heard recited aloud by the Prophet (ﷺ) in Maghrib, stirring deep awe in listeners’ hearts.',
        reference: 'Sahih al-Bukhari 765 · Sahih al-Bukhari 763',
      },
      {
        label: 'Al-Kāfirūn (109) & Al-Ikhlāṣ (112) · Maghrib Sunnah',
        surahNumber: 109,
        ayahNumber: 1,
        whenRecited: 'Beloved pairing in the two Rak‘ahs right after Maghrib.',
        reference: 'Jami‘ at-Tirmidhi 431',
      },
    ],
    hadiths: [
      {
        source: 'Sahih Muslim 2012',
        narrator: 'Jabir ibn ‘Abdillah (RA)',
        text: '“Cover the vessels, tie the waterskins, close the doors, and keep your children close at dusk—and mention the Name of Allah over them.”',
      },
      {
        source: 'Jami‘ at-Tirmidhi 3575',
        narrator: '‘Abdullah ibn Khubayb (RA)',
        text: '“Recite Qul Huwa Allāhu Aḥad and Al-Mu‘awwidhatayn three times every evening and morning; they will suffice you against everything.”',
      },
    ],
  },

  {
    id: 'evening-dinner-family',
    order: 9,
    phaseTag: 'Evening & Family',
    title: 'Prophetic Dinner & Warm Companionship',
    arabicTitle: 'آدَابُ الطَّعَامِ وَأُنْسُ الْأَهْلِ',
    briefAction: 'Eat together with Bismillah and right hand, fill 1/3 food · 1/3 water · 1/3 breath, and converse kindly.',
    briefHighlight: 'Shared platter · Never faulted food · Moderation',
    iconKey: 'utensils_family',
    stepsToDo: [
      'Wash hands before and after meals, sit humbly upright (never reclining luxuriously), and share food together over one mat/table.',
      'Say Bismillāh aloud enough to remind others, eat strictly with the right hand using three fingers from the outer edges inward—never from the center mound.',
      'Lick fingers clean and wipe the dish clean before leaving so blessing is not wasted, never blow onto hot food, and never criticize any dish.',
      'Drink seated in 3 separate gentle sips—removing the cup from the lips to breathe between sips and saying Alḥamdulillāh at the end.',
    ],
    minuteDetails: [
      {
        aspect: 'Seated Posture & Three Fingers Only',
        detail: 'Never ate leaning lazily on a cushion: sat modestly on his knees/left foot or squatting upright saying “I sit as a servant sits and eat as a servant eats,” lifting modest bites using thumb, index, and middle fingers.',
        reference: 'Sahih al-Bukhari 5399 · Sahih Muslim 2032',
      },
      {
        aspect: 'Eating From Edges Inward & Licking Fingers Clean',
        detail: 'Taught: “Blessing descends into the middle of the food—so eat from its outer edges toward the center,” and instructed licking fingers and wiping the dish clean because “You do not know in which morsel the blessing lies.”',
        reference: 'Jami‘ at-Tirmidhi 1805 · Sahih Muslim 2033 · Sahih Muslim 2034',
      },
      {
        aspect: 'Drinking in 3 Separate Breaths (Never Blowing Into Cup)',
        detail: 'Never chugged water in one gulp or breathed into the vessel; drank seated in three paused breaths—starting Bismillāh, saying Alḥamdulillāh, praising it, and forbidding blowing onto hot food/drinks.',
        reference: 'Sahih Muslim 2028 · Jami‘ at-Tirmidhi 1885 · Jami‘ at-Tirmidhi 1888',
      },
      {
        aspect: 'Prophetic Favorite Foods & Milk Dua',
        detail: 'Loved chilled sweet water, barley porridge (*talbīnah*) soothing sadness, fresh dates paired with cool cucumber or melon, olive oil, vinegar, pumpkin (*dubbā’*), honey mixed in morning cool water, and after drinking milk prayed: “O Allah, bless us in it and increase us from it.”',
        reference: 'Sahih al-Bukhari 5440 · Sahih al-Bukhari 5417 · Jami‘ at-Tirmidhi 3455',
      },
    ],
    duas: [
      {
        title: 'Beginning the Meal',
        arabic: 'بِسْمِ اللَّهِ — (وَإِنْ نَسِيَ: بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ)',
        transliteration: 'Bismillāh. (If forgotten: Bismillāhi awwalahū wa ākhirah.)',
        translation: 'In the Name of Allah. (If forgotten at first: In the Name of Allah at its beginning and its end.)',
        reference: 'Sahih al-Bukhari 5376 · Sunan Abi Dawud 3767',
      },
      {
        title: 'When Drinking Milk',
        arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِيهِ وَزِدْنَا مِنْهُ',
        transliteration: 'Allāhumma bārik lanā fīhi wa zidnā minh.',
        translation: 'O Allah, bless it for us and grant us even more of it.',
        reference: 'Jami‘ at-Tirmidhi 3455 · Sunan Abi Dawud 3730',
      },
      {
        title: 'Upon Finishing a Meal',
        arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَٰذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
        transliteration: 'Al-ḥamdu lillāhi alladhī aṭ‘amanī hādhā wa razaqanīhi min ghayri ḥawlin minnī wa lā quwwah.',
        translation: 'All praise is for Allah who fed me this and provided it for me without any might or power from me.',
        reference: 'Sunan Abi Dawud 4023 · Jami‘ at-Tirmidhi 3458',
      },
    ],
    favoriteActs: [
      {
        title: 'Never Found Fault with Food',
        detail: 'Abu Hurayrah (RA) narrated: “The Messenger of Allah (ﷺ) never ever criticized food. If he liked it, he ate it; and if he disliked it, he simply left it.”',
        reference: 'Sahih al-Bukhari 3563 · Sahih Muslim 2064',
      },
      {
        title: 'Eating Together Over One Dish',
        detail: 'When Companions said they ate and did not feel satisfied, he advised: “Gather together over your food and mention the Name of Allah over it; He will bless it for you.”',
        reference: 'Sunan Abi Dawud 3764 · Sunan Ibn Majah 3286',
      },
    ],
    favoriteSurahs: [
      {
        label: 'Surah Al-A‘rāf 7:31 · Balanced Nourishment',
        surahNumber: 7,
        ayahNumber: 31,
        whenRecited: '“Eat and drink, yet do not waste by excess; indeed He does not love the extravagant.”',
        reference: 'Qur’an 7:31',
      },
      {
        label: 'Surah Quraysh (106:1–4) · Gratitude for Provision & Security',
        surahNumber: 106,
        ayahNumber: 1,
        whenRecited: 'Honors the Lord of the Sacred House who feeds against hunger and secures against fear.',
        reference: 'Qur’an 106:1–4',
      },
    ],
    hadiths: [
      {
        source: 'Jami‘ at-Tirmidhi 2380 · Sunan Ibn Majah 3349',
        narrator: 'Al-Miqdam ibn Ma‘dikarib (RA)',
        text: '“No human fills a vessel worse than his stomach. A few morsels to keep his back upright suffice; or else one third for food, one third for drink, and one third for breath.”',
      },
      {
        source: 'Sahih al-Bukhari 5376',
        narrator: '‘Umar ibn Abi Salamah (RA)',
        text: '“O young boy, say Bismillāh, eat with your right hand, and eat from what is directly in front of you.”',
      },
    ],
  },

  {
    id: 'isha-prayer',
    order: 10,
    phaseTag: 'Nightfall',
    title: '‘Isha Prayer & Quiet Evenings',
    arabicTitle: 'صَلَاةُ الْعِشَاءِ',
    briefAction: 'Pray ‘Isha in congregation (equal to half a night of Qiyam), pray 2 Sunnahs & avoid idle chatter.',
    briefHighlight: 'Half-night Qiyam reward · Surah 95 / 91',
    iconKey: 'night_prayer',
    stepsToDo: [
      'Stay awake until ‘Isha (he disliked sleeping beforehand lest ‘Isha be missed), praying 4 Fard Rak‘ahs with moderate soothing recitation.',
      'Pray 2 Sunnah Rak‘ahs after ‘Isha, ask Allah to aid your remembrance and worship, and make an early quiet night.',
      'Speak only of beneficial family warmth, guests, or necessary counsel—avoiding pointless late-night chatter.',
    ],
    minuteDetails: [
      {
        aspect: 'Gentle Empathy for Workers in Congregational Recitation',
        detail: 'When leading ‘Isha, chose refreshing medium Surahs (91, 92, 95); when Mu‘adh recited Al-Baqarah tiring a laborer, the Prophet cautioned: “Are you putting people to trial, Mu‘adh?”—and whenever a baby cried during prayer, he shortened his recitation so the mother wouldn’t panic.',
        reference: 'Sahih al-Bukhari 705 · Sahih al-Bukhari 709',
      },
      {
        aspect: 'Suhbah & Ending Any Gathering With Kaffārat al-Majlis',
        detail: 'Before dispersing from any night family or companion gathering, whispered “Subḥānaka Allāhumma wa biḥamdika, ash-hadu an lā ilāha illā anta, astaghfiruka wa atūbu ilayk”—erasing slips in the sitting.',
        reference: 'Jami‘ at-Tirmidhi 3433 · Sunan Abi Dawud 4859',
      },
    ],
    duas: [
      {
        title: 'Heartfelt Dua Taught to Mu‘adh (RA) After Every Prayer',
        arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ',
        transliteration: 'Allāhumma a‘innī ‘alā dhikrik, wa shukrik, wa ḥusni ‘ibādatik.',
        translation: 'O Allah, help me to remember You, to thank You, and to worship You in the finest manner.',
        reference: 'Sunan Abi Dawud 1522 · Sunan an-Nasa’i 1303',
      },
    ],
    favoriteActs: [
      {
        title: 'Disliking Sleep Before ‘Isha & Talk After ‘Isha',
        detail: 'Abu Barzah (RA) reported that the Messenger of Allah (ﷺ) disliked sleeping before the ‘Isha prayer and disliked idle conversation after it.',
        reference: 'Sahih al-Bukhari 568 · Sahih Muslim 647',
      },
      {
        title: 'Encouraging Moderate Balanced Recitation',
        detail: 'He urged Imams praying ‘Isha with the community to choose medium-length Surahs like Ash-Shams and Al-A‘lā so workers and the elderly pray comfortably.',
        reference: 'Sahih al-Bukhari 705 · Sahih Muslim 465',
      },
    ],
    favoriteSurahs: [
      {
        label: 'Surah At-Tīn (95:1–8) · ‘Isha Recitation',
        surahNumber: 95,
        ayahNumber: 1,
        whenRecited: 'Al-Bara’ ibn ‘Azib (RA) heard the Prophet (ﷺ) recite Wat-Tīni waz-Zaytūn in ‘Isha, saying he never heard a sweeter voice.',
        reference: 'Sahih al-Bukhari 767 · Sahih Muslim 464',
      },
      {
        label: 'Surah Al-Layl (92:1) · Night Prayer Reading',
        surahNumber: 92,
        ayahNumber: 1,
        whenRecited: 'Recommended among balanced Surahs for the ‘Isha congregation.',
        reference: 'Sahih al-Bukhari 705',
      },
    ],
    hadiths: [
      {
        source: 'Sahih Muslim 656',
        narrator: '‘Uthman ibn ‘Affan (RA)',
        text: '“Whoever prays ‘Isha in congregation, it is as if he stood in prayer for half the night; and whoever prays Fajr in congregation, it is as if he prayed the entire night.”',
      },
      {
        source: 'Sahih al-Bukhari 568',
        narrator: 'Abu Barzah al-Aslami (RA)',
        text: '“The Prophet (ﷺ) used to dislike sleeping before ‘Isha and talking after it.”',
      },
    ],
  },

  {
    id: 'pre-sleep-fortress',
    order: 11,
    phaseTag: 'Before Bedtime',
    title: 'Pre-Sleep Qur’an & Fortress of Protection',
    arabicTitle: 'أَوْرَادُ النَّوْمِ وَالسُّوَرُ الْمُحَبَّبَةُ',
    briefAction: 'Perform Wudu, forgive everyone, recite As-Sajdah, Al-Mulk, 2:285–286, Āyat al-Kursī & 3 Quls.',
    briefHighlight: 'Surah 32, 67, 2:255, 2:285–286 & 3 Quls',
    iconKey: 'quran_fortress',
    stepsToDo: [
      'Perform fresh Wudu as you would for Salah and brush gently with Miswak or oral hygiene.',
      'Sweep/dust the bed sheet three times with the inside hem of your garment while saying Bismillāh.',
      'Recite Surah As-Sajdah (32), Surah Al-Mulk (67), Āyat al-Kursī (2:255), Al-Baqarah 2:285–286, and Surah Al-Kāfirūn (109).',
      'Join cupped palms together, blow lightly into them, recite 112, 113, and 114, and wipe head, face, and body 3×.',
      'Count Tasbih Fatimah (33·33·34) on your fingers and consciously pardon every person who wronged you today.',
    ],
    minuteDetails: [
      {
        aspect: 'Shaking Out the Mattress 3× With Garment Edge',
        detail: 'Never dropped straight onto a bed uninspected: dusted the bedding three times with the inner edge of his lower robe saying Bismillāh so nothing hidden remained beneath.',
        reference: 'Sahih al-Bukhari 6320 · Sahih Muslim 2714',
      },
      {
        aspect: 'Three-Pass Palm Wiping Order (Head & Front First)',
        detail: 'Cupped both palms upright before his mouth, breathed softly (*nafth*), recited Al-Ikhlāṣ, Al-Falaq, and An-Nās, then rubbed gently starting from crown of the head and face downward as far as hands could reach—repeating 3 full times.',
        reference: 'Sahih al-Bukhari 5017 · Sahih Muslim 2192',
      },
      {
        aspect: 'Apply Ithmid Kohl (3× Right, 3× Left) Before Rest',
        detail: 'Kept a kohl applicator (*mukḥulah*) by his bedside and frequently applied cooling antimony (*Ithmid*) three times in each eye before sleeping to nourish eyesight and eyelashes.',
        reference: 'Jami‘ at-Tirmidhi 1757 · Sunan Ibn Majah 3497',
      },
    ],
    duas: [
      {
        title: 'Bedtime Tasbih Taught to Fatimah & ‘Ali (RA)',
        arabic: 'سُبْحَانَ اللَّهِ (٣٣) · الْحَمْدُ لِلَّهِ (٣٣) · اللَّهُ أَكْبَرُ (٣٤)',
        transliteration: 'SubḥānAllāh (33×) · Al-ḥamdu lillāh (33×) · Allāhu Akbar (34×).',
        translation: '“This is better for both of you than a servant when you retire to your beds.”',
        reference: 'Sahih al-Bukhari 3705 · Sahih Muslim 2727',
      },
      {
        title: 'Forgiving Everyone Before Sleep (Heart Purification)',
        arabic: 'رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِلَّذِينَ آمَنُوا',
        transliteration: 'Rabbanagh-fir lanā wa li-ikhwāninal-ladhīna sabaqūnā bil-īmāni wa lā taj‘al fī qulūbinā ghillan lilladhīna āmanū.',
        translation: 'Our Lord, forgive us and our brothers who preceded us in faith, and put not in our hearts any resentment toward those who believe. (Qur’an 59:10)',
        reference: 'Musnad Ahmad 12697 (Man of Paradise with clean heart every night)',
      },
    ],
    favoriteActs: [
      {
        title: 'Never Slept Before Reciting As-Sajdah & Al-Mulk',
        detail: 'Jabir (RA) narrated: “The Prophet (ﷺ) would not go to sleep until he had recited Alif-Lām-Mīm Tanzīl (Surah As-Sajdah 32) and Tabārakalladhī bi-yadihil-Mulk (Surah Al-Mulk 67).”',
        reference: 'Jami‘ at-Tirmidhi 2892 · Musnad Ahmad 14659',
      },
      {
        title: 'Cupped Palms & Three Quls Three Times',
        detail: 'Every night when retiring to bed, he brought his palms together, blew into them, recited Al-Ikhlāṣ, Al-Falaq, and An-Nās, and wiped over as much of his body as he could reach three times.',
        reference: 'Sahih al-Bukhari 5017',
      },
    ],
    favoriteSurahs: [
      {
        label: 'Surah Al-Mulk (67:1–30) · Nightly Intercessor',
        surahNumber: 67,
        ayahNumber: 1,
        whenRecited: '“A Surah of thirty verses interceded for a man until he was forgiven: it is Tabārakalladhī bi-yadihil-Mulk.”',
        reference: 'Jami‘ at-Tirmidhi 2891 · Sunan Abi Dawud 1400',
      },
      {
        label: 'Surah As-Sajdah (32:1–30) · Every Night Before Sleep',
        surahNumber: 32,
        ayahNumber: 1,
        whenRecited: 'Recited consistently alongside Surah Al-Mulk before resting.',
        reference: 'Jami‘ at-Tirmidhi 2892',
      },
      {
        label: 'Al-Baqarah 2:285–286 · Suffices Through the Night',
        surahNumber: 2,
        ayahNumber: 285,
        whenRecited: '“Whoever recites the last two verses of Surah Al-Baqarah at night, those two will suffice him.”',
        reference: 'Sahih al-Bukhari 5009 · Sahih Muslim 808',
      },
      {
        label: 'Āyat al-Kursī (2:255) · Guardian Angel Until Dawn',
        surahNumber: 2,
        ayahNumber: 255,
        whenRecited: 'When recited upon lying down, a protector from Allah remains with you until morning.',
        reference: 'Sahih al-Bukhari 2311',
      },
      {
        label: 'Surah Al-Kāfirūn (109:1–6) · Freedom from Shirk',
        surahNumber: 109,
        ayahNumber: 1,
        whenRecited: '“Recite Qul yā ayyuhal-Kāfirūn and then sleep after finishing it, for it is disavowal from shirk.”',
        reference: 'Sunan Abi Dawud 5055 · Jami‘ at-Tirmidhi 3403',
      },
    ],
    hadiths: [
      {
        source: 'Sahih al-Bukhari 5017',
        narrator: '‘A’ishah (RA)',
        text: '“Every night when the Prophet (ﷺ) went to his bed, he would cup his hands together, blow into them, and recite Qul Huwa Allāhu Aḥad, Qul A‘ūdhu bi-Rabbil-Falaq, and Qul A‘ūdhu bi-Rabbin-Nās, then wipe over his body three times.”',
      },
      {
        source: 'Sahih al-Bukhari 6320 · Sahih Muslim 2714',
        narrator: 'Abu Hurayrah (RA)',
        text: '“When any of you goes to bed, let him dust off his bed with the inside edge of his lower garment three times, for he does not know what has come onto it after he left it.”',
      },
    ],
  },

  {
    id: 'sleep-sunnah',
    order: 12,
    phaseTag: 'Rest & Surrender',
    title: 'Sleeping on the Right Side',
    arabicTitle: 'النَّوْمُ عَلَى الشِّقِّ الْأَيْمَنِ',
    briefAction: 'Extinguish lamps, lie on your right side with right hand under cheek, and surrender your soul to Allah.',
    briefHighlight: 'Right side · Final Dua of Fitrah · Az-Zumar 39:42',
    iconKey: 'sleep_peace',
    stepsToDo: [
      'Extinguish fires, dim open lights, lock doors, and leave water/milk jars cleanly covered.',
      'Lie down upon your right side—never flat on the stomach—placing your right palm gently beneath your right cheek.',
      'Keep a covered cup of clean water and a Miswak close by your bedside for Tahajjud.',
      'Make your very last spoken words the Prophetic surrender Dua: “Bismika Allāhumma amūtu wa aḥyā” and “Allāhumma aslamtu nafsī ilayk.”',
    ],
    minuteDetails: [
      {
        aspect: 'Exact Sleeping Posture (Right Side · Palm Under Cheek)',
        detail: 'Slept on a modest leather mat stuffed with palm fibers—resting on his right side with knees lightly relaxed and his right palm tucked squarely beneath his right cheek; forbade sleeping face-down on the stomach.',
        reference: 'Sahih al-Bukhari 6314 · Sunan Abi Dawud 5045 · Jami‘ at-Tirmidhi 2768',
      },
      {
        aspect: 'Bedside Preparation for Midnight Waking',
        detail: 'Always kept three things ready near his sleeping mat: covered water for Wudu, his Miswak twig, and a comb—so waking in the dark last third of night took zero friction.',
        reference: 'Sahih al-Bukhari 245 · Musnad Ahmad',
      },
      {
        aspect: 'Waking Startled or Turning Over at Night',
        detail: 'Whenever turning over at night he whispered: “Lā ilāha illallāhul-Wāḥidul-Qahhār, Rabbus-samāwāti wal-arḍi wa mā baynahumal-‘Azīzul-Ghaffār”; and if seeing a bad dream, puffed lightly 3× left, sought refuge in Allah, never told anyone, and turned to the other side.',
        reference: 'An-Nasa’i al-Kubra 10620 (Sahih) · Sahih Muslim 2261',
      },
    ],
    duas: [
      {
        title: 'Right Hand Under Cheek Upon Sleeping',
        arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
        transliteration: 'Bismika Allāhumma amūtu wa aḥyā.',
        translation: 'In Your Name, O Allah, I die and I live.',
        reference: 'Sahih al-Bukhari 6324 · Sahih Muslim 2711',
      },
      {
        title: 'Final Words of Surrender Before Sleep',
        arabic: 'اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَوَجَّهْتُ وَجْهِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، لَا مَلْجَأَ وَلَا مَنْجَا مِنْكَ إِلَّا إِلَيْكَ، آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ',
        transliteration: 'Allāhumma aslamtu nafsī ilayk, wa fawwaḍtu amrī ilayk, wa wajjahtu wajhī ilayk, wa alja’tu ẓahrī ilayk, raghbatan wa rahbatan ilayk, lā malja’a wa lā manja minka illā ilayk, āmantu bikitābikal-ladhī anzalta wa binabiyyikal-ladhī arsalt.',
        translation: 'O Allah, I submit my soul to You, entrust my affair to You, turn my face to You, and lean my back upon You in hope and fear of You. There is no refuge nor escape from You except to You. I believe in Your Book which You sent down and in Your Prophet whom You sent.',
        reference: 'Sahih al-Bukhari 247 · Sahih Muslim 2710',
      },
    ],
    favoriteActs: [
      {
        title: 'Lying on the Right Side with Tranquility',
        detail: 'Al-Bara’ ibn ‘Azib (RA) reported that the Prophet (ﷺ) taught him to perform Wudu as for prayer, then lie down upon his right side and recite the surrender supplication last.',
        reference: 'Sahih al-Bukhari 247',
      },
      {
        title: 'Putting Out Fires & Lights Before Sleep',
        detail: '“Extinguish the lamps when you go to sleep, close the doors, cover the vessels, and cover food and drink.”',
        reference: 'Sahih al-Bukhari 5623 · Sahih Muslim 2012',
      },
    ],
    favoriteSurahs: [
      {
        label: 'Surah Az-Zumar 39:42 · Souls in Sleep',
        surahNumber: 39,
        ayahNumber: 42,
        whenRecited: '“Allah takes the souls at the time of their death, and those that do not die [He takes] during their sleep...”',
        reference: 'Qur’an 39:42',
      },
    ],
    hadiths: [
      {
        source: 'Sahih al-Bukhari 247 · Sahih Muslim 2710',
        narrator: 'Al-Bara’ ibn ‘Azib (RA)',
        text: '“Make these the last words you speak; then if you die that night, you will die upon the Fitrah (pure innate faith).”',
      },
      {
        source: 'Sunan Abi Dawud 5045 · Jami‘ at-Tirmidhi 3398',
        narrator: 'Hudhayfah & Hafsah (RA)',
        text: '“When the Messenger of Allah (ﷺ) wanted to sleep, he placed his right hand under his right cheek and said: ‘O Allah, protect me from Your punishment on the Day You resurrect Your servants.’”',
      },
    ],
  },
];

/**
 * Dynamically maps each of the 12 Prophetic Daily Stages onto the user's real calculated
 * solar prayer times and detects which stage corresponds to the user's live local clock.
 */
export function resolvePropheticTimelineWindows(
  prayerStatus: PrayerStatus,
  now: Date = new Date()
): {
  stages: ResolvedPropheticStage[];
  activeStageId: string;
  currentMinutes: number;
} {
  const fajr = prayerStatus.prayers.find((p) => p.id === 'fajr')?.timeMinutes ?? 315;
  const sunrise = prayerStatus.prayers.find((p) => p.id === 'sunrise')?.timeMinutes ?? 390;
  const dhuhr = prayerStatus.prayers.find((p) => p.id === 'dhuhr')?.timeMinutes ?? 740;
  const asr = prayerStatus.prayers.find((p) => p.id === 'asr')?.timeMinutes ?? 940;
  const maghrib = prayerStatus.prayers.find((p) => p.id === 'maghrib')?.timeMinutes ?? 1070;
  const isha = prayerStatus.prayers.find((p) => p.id === 'isha')?.timeMinutes ?? 1150;
  const tahajjud = prayerStatus.prayers.find((p) => p.id === 'tahajjud')?.timeMinutes ?? 210;

  // Dynamic chronological boundaries (0..1439 minutes from midnight, with night wrap for sleep)
  const duhaStart = sunrise + 20;
  const middayStart = Math.min(dhuhr - 45, Math.round(duhaStart + (dhuhr - duhaStart) * 0.55));
  const fajrFardEnd = Math.min(sunrise - 5, fajr + 25);
  const ishraqEnd = sunrise + 20;
  const dhuhrEnd = Math.min(asr - 10, dhuhr + 60);
  const maghribPreStart = maghrib - 10;
  const dinnerStart = maghrib + 40;
  const ishaEnd = Math.min(1380, isha + 55);
  const preSleepStart = ishaEnd;
  const sleepStart = Math.min(1435, preSleepStart + 35);

  const ranges: Record<string, { start: number; end: number }> = {
    'waking-tahajjud': { start: tahajjud, end: fajr },
    'fajr-sunnah-fard': { start: fajr, end: fajrFardEnd },
    'fajr-to-ishraq': { start: fajrFardEnd, end: ishraqEnd },
    'duha-forenoon': { start: duhaStart, end: middayStart },
    'midday-service-work': { start: middayStart, end: dhuhr },
    'dhuhr-prayer': { start: dhuhr, end: Math.max(dhuhrEnd, dhuhr + 45) },
    'asr-and-afternoon': { start: asr, end: maghribPreStart },
    'maghrib-and-adhkar': { start: maghribPreStart, end: dinnerStart },
    'evening-dinner-family': { start: dinnerStart, end: isha },
    'isha-prayer': { start: isha, end: preSleepStart },
    'pre-sleep-fortress': { start: preSleepStart, end: sleepStart },
    'sleep-sunnah': { start: sleepStart, end: tahajjud }, // wraps past midnight
  };

  // Fill gentle gaps between Dhuhr active block and Asr cleanly without missing any minute of the day
  ranges['dhuhr-prayer'].end = asr;

  const currentMinutes = getLocationCurrentMinutes(prayerStatus, now);

  const isMinuteInRange = (m: number, start: number, end: number): boolean => {
    if (start <= end) {
      return m >= start && m < end;
    }
    // Crosses midnight (e.g. 22:30 -> 03:30)
    return m >= start || m < end;
  };

  let activeId = PROPHETIC_DAY_STAGES[0].id;
  for (const stage of PROPHETIC_DAY_STAGES) {
    const r = ranges[stage.id];
    if (r && isMinuteInRange(currentMinutes, r.start, r.end)) {
      activeId = stage.id;
      break;
    }
  }

  const activeOrder =
    PROPHETIC_DAY_STAGES.find((s) => s.id === activeId)?.order ?? 1;

  const stages: ResolvedPropheticStage[] = PROPHETIC_DAY_STAGES.map((stage) => {
    const r = ranges[stage.id];
    const startM = r.start;
    const endM = r.end;
    const isActiveNow = stage.id === activeId;
    const hasPassedToday = stage.order < activeOrder;

    return {
      ...stage,
      windowStartMinutes: startM,
      windowEndMinutes: endM,
      windowTimeLabel: `${formatMins12h(startM)} – ${formatMins12h(endM)}`,
      isActiveNow,
      hasPassedToday,
    };
  });

  return {
    stages,
    activeStageId: activeId,
    currentMinutes,
  };
}
