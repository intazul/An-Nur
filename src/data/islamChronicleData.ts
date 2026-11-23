import { BattleBreakdown, TimelineHadith, TimelineRevelation } from '../types/timeline';

export type ChronicleEpochId =
  | 'epoch-1-creation'
  | 'epoch-2-early-prophets'
  | 'epoch-3-bani-israil-isa'
  | 'epoch-4-makkah-youth'
  | 'epoch-5-makkan-revelation'
  | 'epoch-6-madinah-state'
  | 'epoch-7-farewell-completion'
  | 'epoch-8-rashidun-preservation';

export interface ChronicleBattleMeta extends BattleBreakdown {
  yearLabel: string;
  location: string;
  muslimStrengthCount: number;
  opponentStrengthCount: number;
  muslimStrengthLabel: string;
  opponentStrengthLabel: string;
  durationOrDecisiveMoment: string;
  islamicEthicsEstablished: string[];
}

export interface ChronicleChapter {
  id: string;
  epochId: ChronicleEpochId;
  order: number;
  timeframeLabel: string;
  hijriOrEraLabel: string;
  location: string;
  title: string;
  subtitle: string;
  category: 'origins' | 'prophets' | 'revelation' | 'war_diplomacy' | 'preservation';
  keyFigures: string[];
  beforeContext: string;
  whatHappenedSummary: string;
  stepByStepNarrative: string[];
  howQuranCameDown: string;
  aftermathAndImpact: string;
  keyTakeaways: string[];
  revelations: TimelineRevelation[];
  sahihHadiths: TimelineHadith[];
  battle?: ChronicleBattleMeta;
}

export interface ChronicleEpoch {
  id: ChronicleEpochId;
  numberRoman: string;
  title: string;
  spanLabel: string;
  summary: string;
  centralTheme: string;
}

export interface AsbabAlNuzulEntry {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  ayahRangeLabel: string;
  surahName: string;
  era: 'Makki' | 'Madani';
  yearOrMoment: string;
  category: 'revelation_origin' | 'creed' | 'worship_law' | 'battle_crisis' | 'character_justice';
  title: string;
  whatWasHappeningBefore: string;
  howItWasRevealed: string;
  exactWisdomAndRuling: string;
  hadithProof: TimelineHadith;
}

export interface GradualStageStep {
  stageNumber: number;
  stageLabel: string;
  timeframe: string;
  surahNumber: number;
  ayahNumber: number;
  ayahRangeLabel: string;
  situationAndTrigger: string;
  rulingEstablished: string;
  hadithNote?: string;
}

export interface GradualRevelationSeries {
  id: string;
  title: string;
  subtitle: string;
  whyGradual: string;
  steps: GradualStageStep[];
}

export interface RevelationModeFact {
  id: string;
  title: string;
  modeName: string;
  description: string;
  source: string;
  narrator: string;
}

export const MODES_OF_WAHI: RevelationModeFact[] = [
  {
    id: 'wahi-truth-dreams',
    title: '1. True Righteous Dreams (Al-Ru’ya as-Sadiqah)',
    modeName: 'Six Months Before Hira',
    description:
      'For the six months preceding Cave Hira, every dream the Prophet ﷺ saw broke forth with crystal clarity like the morning dawn—preparing his heart gently to bear direct angelic revelation.',
    source: 'Sahih al-Bukhari 3 & Sahih Muslim 160a',
    narrator: 'Aishah (RA)',
  },
  {
    id: 'wahi-bell-resonance',
    title: '2. Like the Ringing of a Bell (Salsalat al-Jaras)',
    modeName: 'Heaviest Mode of Descent',
    description:
      'Harith ibn Hisham (RA) asked how revelation came. The Prophet ﷺ replied: "Sometimes it comes to me like the ringing of a bell—and that is the hardest upon me. When it ceases, I have retained all that was spoken." Aishah (RA) testified seeing sweat stream from his forehead even on bitterly cold winter days.',
    source: 'Sahih al-Bukhari 2',
    narrator: 'Aishah (RA)',
  },
  {
    id: 'wahi-human-form',
    title: '3. Angel Jibril Appearing in Human Form',
    modeName: 'Often Resembling Dihyah al-Kalbi (RA)',
    description:
      'At times Jibril (AS) took human form and spoke directly until every word was memorized—most famously when he appeared in pure white garments before all companions to teach Islam, Iman, Ihsan, and the Signs of the Hour.',
    source: 'Sahih al-Bukhari 2 & Sahih Muslim 8',
    narrator: 'Aishah & Umar ibn al-Khattab (RA)',
  },
  {
    id: 'wahi-original-angelic',
    title: '4. Jibril in His True Angelic 600-Winged Majesty',
    modeName: 'Twice in Prophetic History',
    description:
      'The Prophet ﷺ beheld Jibril in his true created form covering the entire horizon twice: once after Fatrat al-Wahi near Makkah and once at Sidrat al-Muntaha during Al-Isra wal-Mi‘raj.',
    source: 'Sahih al-Bukhari 3234 & Sahih Muslim 174',
    narrator: 'Abdullah ibn Mas‘ud (RA)',
  },
  {
    id: 'wahi-direct-divine',
    title: '5. Direct Inspiration & Speech Behind the Veil',
    modeName: 'Al-Mi‘raj Gift Without Intermediary',
    description:
      'Above the seventh heaven at Sidrat al-Muntaha, Allah spoke directly to His Messenger ﷺ—obligating the five daily prayers and granting the concluding two verses of Surah Al-Baqarah (2:285–286) directly.',
    source: 'Sahih Muslim 173 & Sahih al-Bukhari 3207',
    narrator: 'Abdullah ibn Mas‘ud & Anas (RA)',
  },
];

export const CHRONICLE_EPOCHS: ChronicleEpoch[] = [
  {
    id: 'epoch-1-creation',
    numberRoman: 'I',
    title: 'Creation of the Universe, Angels & The First Covenant',
    spanLabel: 'Before Earthly Time',
    summary:
      'How Islam begins before Adam (AS): Al-Qalam inscribing destiny, creation of the Heavens and Earth, the angelic hosts, Jinn, and humanity’s primordial testimony to Tawhid.',
    centralTheme: 'Absolute Oneness of Allah (Tawhid) & Cosmic Purpose',
  },
  {
    id: 'epoch-2-early-prophets',
    numberRoman: 'II',
    title: 'Adam (AS) to Ibrahim (AS) — Dawn of Humanity & The Ka‘bah',
    spanLabel: 'Creation → c. 1800 BCE',
    summary:
      'The ascent and descent of Adam (AS), nine and a half centuries of Nuh (AS), fallen nations of ‘Ad and Thamud, and Ibrahim & Isma‘il raising the Sacred House in Makkah.',
    centralTheme: 'Original Purity, Repentance & Monotheistic Sanctuary',
  },
  {
    id: 'epoch-3-bani-israil-isa',
    numberRoman: 'III',
    title: 'Musa, Dawud, Sulayman & Isa (AS) — Scriptures & Foretelling',
    spanLabel: 'c. 1500 BCE → 570 CE',
    summary:
      'Liberation from Pharaoh, revelation of the Torah, Dawud’s triumph over Jalut, Sulayman’s justice, and Prophet Isa (AS) heralding the final Messenger Ahmad.',
    centralTheme: 'Unbroken Prophetic Brotherhood & Prior Scriptures',
  },
  {
    id: 'epoch-4-makkah-youth',
    numberRoman: 'IV',
    title: 'Pre-Islamic Arabia & Preparation of Al-Amin',
    spanLabel: '570 – 610 CE',
    summary:
      'The Year of the Elephant, Abraha’s defeat, orphanhood in Makkah, desert upbringing, Hilf al-Fudul, Khadijah (RA), and preventing war over the Black Stone.',
    centralTheme: 'Moral Character Before Prophethood',
  },
  {
    id: 'epoch-5-makkan-revelation',
    numberRoman: 'V',
    title: 'Cave Hira, Early Converts & 13 Years of Makkan Persecution',
    spanLabel: '610 – 622 CE',
    summary:
      'Exact descent of the first verses, three years of silent teaching, open call at Mount Safa, torture of Bilal & Sumayyah, Abyssinia, Boycott, Ta’if, Al-Mi‘raj, and Hijrah.',
    centralTheme: 'Building Unshakable Creed Under Persecution',
  },
  {
    id: 'epoch-6-madinah-state',
    numberRoman: 'VI',
    title: 'Madinah Statehood, Legislative Revelations & Defensive Wars',
    spanLabel: '1 – 9 AH (622 – 631 CE)',
    summary:
      'Constitution of Madinah, Qiblah shift, Badr, Uhud, Trench, Hudaybiyyah, Khaybar, Mu’tah, Conquest of Makkah, Hunayn, Tabuk, and gradual social laws revealed piece by piece.',
    centralTheme: 'Justice, Mercy in Warfare & Complete Living Society',
  },
  {
    id: 'epoch-7-farewell-completion',
    numberRoman: 'VII',
    title: 'Completion of the Religion & Farewell Legacy',
    spanLabel: '10 – 11 AH (632 CE)',
    summary:
      'Over 100,000 believers at Arafat, universal human rights proclamation, final Quranic verses descending, and the Prophet’s ﷺ dignified return to the Highest Companion.',
    centralTheme: 'Universal Charter & Perfection of the Din',
  },
  {
    id: 'epoch-8-rashidun-preservation',
    numberRoman: 'VIII',
    title: 'Rightly Guided Caliphs, Yamamah & Preserving Quran & Hadith',
    spanLabel: '11 – 40 AH (632 – 661 CE)',
    summary:
      'How Abu Bakr, Umar, Uthman, and Ali (RA) safeguarded Islam after 11 AH: compiling the master Mushaf after Yamamah, liberating Jerusalem, and preserving Sahih Hadith chains.',
    centralTheme: 'Guarding the Revelation for Every Generation',
  },
];

export const CHRONICLE_CHAPTERS: ChronicleChapter[] = [
  {
    id: 'ch-01-pen-and-throne',
    epochId: 'epoch-1-creation',
    order: 1,
    timeframeLabel: 'Before Heavens & Earth',
    hijriOrEraLabel: 'Primordial Creation',
    location: 'Al-‘Arsh (The Divine Throne) & Al-Lawh al-Mahfuz',
    title: 'The Throne Upon Water, The First Pen & The Preserved Tablet',
    subtitle: 'What Allah created first and how the entire story of humanity was inscribed fifty millennia beforehand',
    category: 'origins',
    keyFigures: ['Allah (Al-Khaliq)', 'Al-Qalam (The Pen)', 'Jibril (AS)', 'Angels of Light'],
    beforeContext:
      'Before stars, galaxies, Earth, or time existed, only Allah existed—Self-Sufficient, Eternal, First without anything before Him. His Throne rested above cosmic water.',
    whatHappenedSummary:
      'Allah created the Pen (Al-Qalam) and commanded it to write every event until the Day of Resurrection upon the Preserved Tablet (Al-Lawh al-Mahfuz), followed by the creation of the heavens and earth in six periods, angels from light, and jinn from smokeless flame.',
    stepByStepNarrative: [
      '1. Fifty thousand years before shaping the skies and Earth, Allah commanded Al-Qalam: "Write!" The Pen asked what to write, and Allah ordered: "Write the measure of all things until the Last Hour arrives."',
      '2. Allah created the heavens and earth across six cosmic days/periods and placed mercy above His wrath—inscribing on the Throne itself: "My Mercy prevails over My Wrath."',
      '3. Angels were fashioned from pure light—never tiring of glorification, executing rain, sustenance, recording deeds, and delivering revelation under Jibril (AS)—while the Jinn were created earlier from smokeless fire and inhabited earth first.',
    ],
    howQuranCameDown:
      'Surah Al-Buruj (85:21–22) and Al-Hadid (57:22) affirm that the entire Quran itself originated inscribed upon Al-Lawh al-Mahfuz before later descending in full during Laylat al-Qadr to the lowest heaven (Bayt al-‘Izzah), and from there verse by verse over 23 years.',
    aftermathAndImpact:
      'Establishes the bedrock Islamic worldview: existence is neither accidental nor chaotic; every trial, victory, and guidance occurs within Allah’s supreme wisdom and mercy.',
    keyTakeaways: [
      'Islam starts with Tawhid before time itself—not merely in 7th-century Arabia.',
      'Allah inscribed "My Mercy prevails over My Wrath" directly above His Throne.',
      'Knowledge of destiny fosters courage, not laziness—believers strive with trust in Allah.',
    ],
    revelations: [
      {
        surahNumber: 85,
        ayahNumber: 21,
        ayahRangeLabel: 'Surah Al-Buruj 85:21–22',
        contextEnglish: 'Affirms the Glorious Quran rests guarded upon the Preserved Tablet (Al-Lawh al-Mahfuz).',
      },
      {
        surahNumber: 11,
        ayahNumber: 7,
        ayahRangeLabel: 'Surah Hud 11:7',
        contextEnglish: 'Declares Allah created the heavens and earth while His Throne was over water to test who is best in deeds.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih Muslim 2653b & Sahih al-Bukhari 3191',
        narrator: 'Abdullah ibn Amr & Imran ibn Husayn (RA)',
        textEnglish:
          'The Prophet ﷺ said: "Allah recorded the decrees of all creation fifty thousand years before He created the heavens and the earth, while His Throne was over the water."',
      },
      {
        source: 'Sahih al-Bukhari 3194',
        narrator: 'Abu Hurayrah (RA)',
        textEnglish:
          'When Allah completed creation, He wrote in His Book beside Him above the Throne: "Verily, My Mercy prevails over My Wrath."',
      },
      {
        source: 'Sahih Muslim 2996',
        narrator: 'Aishah (RA)',
        textEnglish:
          'The Prophet ﷺ explained: "The angels were created from light, the jinn were created from a smokeless flame of fire, and Adam was created from that which has been described to you."',
      },
    ],
  },
  {
    id: 'ch-02-adam-and-covenant',
    epochId: 'epoch-2-early-prophets',
    order: 2,
    timeframeLabel: 'Dawn of Humanity',
    hijriOrEraLabel: 'First Human Generation',
    location: 'Al-Jannah (Paradise) → Earth',
    title: 'Adam (AS), Hawwa & The Primordial Covenant of Tawhid',
    subtitle: 'Why humanity exists on Earth, Iblis’s vow of enmity, and how Allah taught Adam repentance',
    category: 'origins',
    keyFigures: ['Adam (AS)', 'Hawwa (AS)', 'Iblis (Satan)', 'Habil & Qabil'],
    beforeContext:
      'Allah announced to the angels that He would place a Khalifah (moral steward) on Earth, shaping Adam sixty cubits tall directly with His Own Hands from clay gathered across every soil of the globe.',
    whatHappenedSummary:
      'Every angel bowed out of respect to Adam—except Iblis (from the Jinn), consumed by racial/elemental arrogance ("I am made of fire, he of clay"). Placed in Paradise, Adam and Hawwa slipped once when deceived by Iblis swearing falsely in Allah’s name, repented wholeheartedly, and began humanity’s earthly test—after every future human soul testified "Yes, You are our Lord!" at Alastu.',
    stepByStepNarrative: [
      '1. Allah taught Adam the names and nature of all creation, demonstrating to the angels why humanity possessed unique capacity for reason and choice.',
      '2. Iblis circled Adam’s clay body before life entered, noticed his hollow abdomen (signaling hunger and desire), and resolved to exploit human appetite. When ordered to prostrate in honor, Iblis refused out of pride and vowed to mislead humanity.',
      '3. Drawn forth from Adam’s loins in the valley of Na‘man, every human soul bore witness to Allah’s Lordship ("Alastu bi-Rabbikum? — Bala!"). Thus pure monotheism (Fitrah) is woven into every child born.',
      '4. After slipping at the forbidden tree, unlike Iblis who blamed Allah, Adam & Hawwa owned their fault and begged forgiveness—returning humanity’s story to hope through Tawbah.',
    ],
    howQuranCameDown:
      'Al-Baqarah 2:30–37 and Al-A‘raf 7:11–25 & 7:172 were revealed in Makkah and early Madinah to remind Quraysh and People of the Book that every tribe shares one father (Adam), one mother (Hawwa), and one original creed—Islam.',
    aftermathAndImpact:
      'Murder entered the world only when jealousy drove Qabil to slay Habil—proving sin arises from arrogance and envy, while salvation lies in humility and sincere repentance.',
    keyTakeaways: [
      'Every child is born upon Fitrah (natural inclination to recognize Allah alone).',
      'Repentance (Tawbah) distinguishes Adam’s humility from Iblis’s prideful defiance.',
      'Every Prophet since Adam taught the exact same core Islam: worship Allah alone.',
    ],
    revelations: [
      {
        surahNumber: 2,
        ayahNumber: 30,
        ayahRangeLabel: 'Surah Al-Baqarah 2:30–37',
        contextEnglish: 'Adam’s appointment, Iblis’s refusal, and the taught words of repentance.',
      },
      {
        surahNumber: 7,
        ayahNumber: 172,
        ayahRangeLabel: 'Surah Al-A‘raf 7:172',
        contextEnglish: 'The primordial Covenant of Alastu taken from every soul in Adam’s progeny.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3326',
        narrator: 'Abu Hurayrah (RA)',
        textEnglish:
          'Allah created Adam sixty cubits tall and instructed him to greet the angels with "As-Salamu alaykum"—establishing the greeting of Paradise. Everyone entering Paradise will enter in Adam’s tall, perfected form.',
      },
      {
        source: 'Sahih al-Bukhari 1385 & Sahih Muslim 2658',
        narrator: 'Abu Hurayrah (RA)',
        textEnglish:
          'The Prophet ﷺ said: "Every child is born upon the Fitrah (pure monotheism), then his parents make him a Jew, a Christian, or a Magian."',
      },
    ],
  },
  {
    id: 'ch-03-nuh-flood-ibrahim-kabah',
    epochId: 'epoch-2-early-prophets',
    order: 3,
    timeframeLabel: 'Antediluvian Era → c. 1800 BCE',
    hijriOrEraLabel: 'First Messengers & Father of Prophets',
    location: 'Mesopotamia → Mount Judi → Ur → Syria → Makkah',
    title: 'Nuh (AS), The Flood & Ibrahim Raising the Ka‘bah in Makkah',
    subtitle: 'How idolatry first entered humanity, how civilizations fell, and how Makkah’s Sacred Sanctuary was built',
    category: 'prophets',
    keyFigures: ['Nuh (AS)', 'Hud (AS)', 'Salih (AS)', 'Ibrahim (AS)', 'Hajar & Isma‘il (AS)'],
    beforeContext:
      'For ten generations after Adam, humanity remained pure monotheists (Bukhari / Ibn Abbas). Idolatry entered subtly when people carved statues of pious deceased saints (Wadd, Suwa‘, Yaghuth) to remember them—and later generations worshipped the statues.',
    whatHappenedSummary:
      'Nuh (AS) called his people tirelessly day and night for 950 years before constructing the Ark that survived the Flood atop Mount Judi. Later, nations of ‘Ad and Thamud collapsed through tyranny. Then Ibrahim (AS) smashed his nation’s idols, survived Nimrod’s furnace cool and safe, brought Hajar and infant Isma‘il to barren Makkah—where Zamzam gushed—and raised the stone foundations of the Ka‘bah, praying for a final Messenger from Isma‘il’s line.',
    stepByStepNarrative: [
      '1. Ten centuries of pure monotheism ended when grief and Satan turned memorial statues of five righteous elders into idols.',
      '2. After 950 years of patient preaching yielded barely a shipful of believers, torrential rains and earth springs carried Nuh’s Ark to rest on Mount Judi.',
      '3. Ibrahim (AS) stood alone against King Nimrod and his entire civilization; when hurled by catapult into a towering inferno, Allah commanded the fire: "Be coolness and peace for Ibrahim!"',
      '4. Guided to the barren valley of Bakkah (Makkah), Hajar ran seven times between Safa and Marwah searching for water for baby Isma‘il until Angel Jibril struck the earth with his wing—bringing forth the eternal spring of Zamzam.',
      '5. Years later, father and son rebuilt the Ka‘bah stone by stone and prayed: "Our Lord, send among them a Messenger from themselves who recites Your verses and purifies them"—answered centuries later in Prophet Muhammad ﷺ.',
    ],
    howQuranCameDown:
      'Surahs Hud (11), Nuh (71), and Ibrahim (14) descended in Makkah at the peak of Quraysh ridicule to console the Prophet ﷺ and show that earlier superpowers far stronger than Quraysh vanished when rejecting truth.',
    aftermathAndImpact:
      'Every Hajj ritual today—Sa‘i between Safa & Marwah, drinking Zamzam, sacrificing on Eid al-Adha, and facing the Ka‘bah—re-enacts the devotion of Ibrahim, Hajar, and Isma‘il (AS).',
    keyTakeaways: [
      'Shirk began through over-venerating graves/statues of pious ancestors.',
      'Makkah’s sanctity and Hajj rites stem directly from Ibrahim, Hajar, and Isma‘il (AS).',
      'Prophet Muhammad ﷺ explicitly described himself as "the answer to Ibrahim’s prayer."',
    ],
    revelations: [
      {
        surahNumber: 2,
        ayahNumber: 127,
        ayahRangeLabel: 'Surah Al-Baqarah 2:127–129',
        contextEnglish: 'Ibrahim and Isma‘il raising the Ka‘bah foundations and praying for the final Messenger.',
      },
      {
        surahNumber: 21,
        ayahNumber: 68,
        ayahRangeLabel: 'Surah Al-Anbiya 21:68–69',
        contextEnglish: 'Allah turning Nimrod’s roaring furnace into coolness and safety for Ibrahim (AS).',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 4920',
        narrator: 'Abdullah ibn Abbas (RA)',
        textEnglish:
          'Ibn Abbas narrated that the names Wadd, Suwa‘, Yaghuth, Ya‘uq, and Nasr were originally righteous pious men from Nuh’s people; when they died, Satan inspired their followers to erect statues in their gathering places, which subsequent unlearned generations began worshipping.',
      },
      {
        source: 'Sahih al-Bukhari 3364 & 3365',
        narrator: 'Abdullah ibn Abbas (RA)',
        textEnglish:
          'Comprehensive Hadith detailing Hajar’s trust ("Did Allah command you to leave us here? Then He will not abandon us!"), Sa‘i between Safa and Marwah, Jibril uncovering Zamzam, and Ibrahim & Isma‘il later raising the Ka‘bah’s walls.',
      },
    ],
  },
  {
    id: 'ch-04-musa-dawud-isa',
    epochId: 'epoch-3-bani-israil-isa',
    order: 4,
    timeframeLabel: 'c. 1500 BCE → c. 30 CE',
    hijriOrEraLabel: 'Torah, Zabur & Injil',
    location: 'Egypt, Sinai, Jerusalem & Palestine',
    title: 'Musa (AS), Talut vs Jalut, Dawud, Sulayman & Isa (AS)',
    subtitle: 'Exodus from tyranny, the first Quranically detailed Battle of Faith (Talut & Jalut), and Isa prophesying Ahmad',
    category: 'prophets',
    keyFigures: ['Musa (AS)', 'Harun (AS)', 'Al-Khidr', 'Talut & Dawud (AS)', 'Sulayman (AS)', 'Maryam & Isa (AS)'],
    beforeContext:
      'From Ibrahim’s son Ishaq and grandson Ya‘qub (Isra’il), twelve tribes settled in Egypt under Yusuf (AS), later enslaved ruthlessly by Pharaoh who ordered Israelite infant boys slaughtered.',
    whatHappenedSummary:
      'Saved from the Nile inside Pharaoh’s own palace, Musa (AS) spoke directly to Allah at Mount Tur, confronted Pharaoh with nine miracles, led Bani Isra’il across the parted Red Sea, and received the Torah. Centuries later, faithful outnumbered warriors under King Talut and young shepherd Dawud (AS) defeated towering Jalut (Goliath). Eventually, miraculous virgin-born Isa ibn Maryam (AS) preached pure Tawhid and foretold the coming final Messenger Ahmad.',
    stepByStepNarrative: [
      '1. Musa’s staff became a living serpent crushing court sorcery; when Pharaoh chased believers to the Red Sea, Allah parted twelve dry pathways and drowned Pharaoh’s pursuing host.',
      '2. Later when giants occupied the Holy Land and oppressed believers, loyal troops drank sparingly from a river test under Talut; slender youth Dawud (AS) struck down armored champion Jalut with a sling-stone—earning the Zabur and iron-softening kingship.',
      '3. Sulayman (AS) inherited wisdom over wind, jinn, and speech of birds and ants—standing up for justice across kingdoms including Queen Bilqis of Saba.',
      '4. Last among Bani Isra’il prophets, Isa (AS) spoke in the cradle defending mother Maryam’s honor, healed the blind and lepers by Allah’s leave, and announced: "I give good news of a Messenger to come after me whose name is Ahmad"—before Allah saved Isa from crucifixion by raising him alive to Heaven.',
    ],
    howQuranCameDown:
      'Al-Baqarah 2:246–251 (Talut vs Jalut) was revealed in Madinah right before the Battle of Badr to teach the 313 companions that victory rests on patience and faith rather than giant numbers.',
    aftermathAndImpact:
      'When Bani Isra’il scriptures suffered distortion and divisions over centuries, Arabia stood poised for the final, universally preserved Revelation.',
    keyTakeaways: [
      'Prophet Muhammad ﷺ linked Ashura fasting directly to thanking Allah for saving Musa from Pharaoh.',
      'Talut & Dawud’s battle served as the divine blueprint for Muslims outnumbered at Badr.',
      'All prophets are half-brothers: differing in legal details, united completely in Islam (Tawhid).',
    ],
    revelations: [
      {
        surahNumber: 2,
        ayahNumber: 249,
        ayahRangeLabel: 'Surah Al-Baqarah 2:249–251',
        contextEnglish: '"How many a small company has overcome a large company by permission of Allah!" (Talut & Dawud).',
      },
      {
        surahNumber: 61,
        ayahNumber: 6,
        ayahRangeLabel: 'Surah As-Saff 61:6',
        contextEnglish: 'Isa ibn Maryam explicitly heralding the coming Messenger named Ahmad ﷺ.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3443 & 3397',
        narrator: 'Abu Hurayrah & Ibn Abbas (RA)',
        textEnglish:
          'The Prophet ﷺ declared: "Both in this world and in the Hereafter, I am the nearest of all people to Isa the son of Maryam. The prophets are paternal brothers; their mothers are different, but their religion (Tawhid) is one."',
      },
      {
        source: 'Sahih al-Bukhari 2004',
        narrator: 'Abdullah ibn Abbas (RA)',
        textEnglish:
          'Arriving in Madinah and seeing Jews fasting on the 10th of Muharram (Ashura) in gratitude for Allah saving Musa and drowning Pharaoh, the Prophet ﷺ said: "We have a closer right to Musa than you!" and fasted Ashura.',
      },
    ],
    battle: {
      yearLabel: 'c. 1020 BCE (Prophetic Era Battle)',
      location: 'Valley of Elah / Sacred Land Frontier',
      cause: 'Reclaiming freedom and sacred territory after oppressive Amalekite invaders expelled Israelite families.',
      commanders: 'Believers: King Talut & Prophet Dawud (AS) · Opponents: Giant Champion Jalut (Goliath)',
      forces: 'Believers: Small core of ~313 faithful after river discipline test · Opponents: Vast heavily armored host',
      muslimStrengthCount: 313,
      opponentStrengthCount: 3000,
      muslimStrengthLabel: '313 Tested Believers (same number later at Badr)',
      opponentStrengthLabel: 'Overwhelming Armored Host of Jalut',
      durationOrDecisiveMoment: 'Decided when young Dawud felled Jalut with a single sling-stone',
      howItUnfolded:
        'Talut purified his ranks by testing thirst at a river; only those displaying self-restraint marched onward. Stepping into single combat chanting "Our Lord, pour upon us patience and plant our feet firmly," Dawud felled Jalut and routed his army.',
      outcomeAndLesson:
        'Al-Bara ibn Azib (RA) explicitly recalled companions noting their Badr number (313) matched Talut’s tested faithful exactly (Sahih al-Bukhari 3957).',
      islamicEthicsEstablished: [
        'Self-discipline before combat determines victory over huge numbers.',
        'Supplicating Allah for patience and firm footing precedes every decisive action.',
      ],
    },
  },
  {
    id: 'ch-05-jahiliyyah-birth-youth',
    epochId: 'epoch-4-makkah-youth',
    order: 5,
    timeframeLabel: '570 – 609 CE',
    hijriOrEraLabel: 'Pre-Prophetic Years (Ages 0–39)',
    location: 'Makkah, Ta’if Valley & Damascus Trade Route',
    title: 'Jahiliyyah, Abraha’s Defeat, Birth & Al-Amin’s Noble Youth',
    subtitle: 'Why humanity needed final guidance, how Allah defended the Ka‘bah, and how Muhammad ﷺ grew untainted by idolatry',
    category: 'origins',
    keyFigures: ['Abd al-Muttalib', 'Aminah & Abdullah', 'Halimah al-Sa‘diyyah', 'Abu Talib', 'Khadijah (RA)'],
    beforeContext:
      'By 570 CE, 360 stone idols ringed Ibrahim’s Ka‘bah; tribal vendettas burned for decades, infant girls were buried alive, widows were inherited as property, and Rome and Persia drained each other in endless wars.',
    whatHappenedSummary:
      'Just ~50 days before Muhammad’s ﷺ birth, Aksumite viceroy Abraha marched a massive elephant-led army from Yemen to demolish the Ka‘bah. Allah sent flocks of birds (Ababil) pelting them with baked clay stones—preserving Makkah. Born an orphan, raised in pure desert humility with Banu Sa‘d (where angels washed his heart), Muhammad ﷺ earned universal fame as As-Sadiq Al-Amin, championed the weak in Hilf al-Fudul, married noble Khadijah (RA), and prevented inter-tribal war by wisely arbitrating placement of the Black Stone.',
    stepByStepNarrative: [
      '1. Re-excavating Zamzam years earlier, grandfather Abd al-Muttalib watched helplessly as Abraha’s lead elephant Mahmud knelt and refused to take a single step toward the Ka‘bah before Ababil birds annihilated the invaders.',
      '2. Orphaned before birth (father Abdullah buried in Yathrib) and at age six (mother Aminah buried at Al-Abwa), he tasted poverty early, shepherded sheep for pennies around Makkah, and refused ever to bow before an idol or taste pagan feasts.',
      '3. Aged 20, witnessing a Yemeni merchant robbed inside Makkah, he joined clan chiefs inside Ibn Jud‘an’s home swearing Hilf al-Fudul—never to allow oppression inside Makkah regardless of status.',
      '4. Aged 25, his spotless honesty leading Khadijah’s caravan to Syria led Khadijah (RA) to propose marriage; aged 35, spread upon his cloak, all rival clans jointly lifted the Black Stone back into the rebuilt Ka‘bah.',
    ],
    howQuranCameDown:
      'Surah Al-Fil (105), Surah Quraysh (106), and Surah Ad-Duha (93:6–8) later recalled these exact Makkan protective miracles as living proof Quraysh themselves remembered firsthand.',
    aftermathAndImpact:
      'Even his fiercest future enemies never once accused Al-Amin of lying or dishonesty before Prophethood—leaving his forty pre-prophetic years as ironclad proof of his message.',
    keyTakeaways: [
      'Before receiving a single Quran verse, his integrity was undisputed across all Makkah.',
      'Every prophet shepherded flocks first to cultivate patience for leading people.',
      'Hilf al-Fudul proves Islam champions justice for every human regardless of background.',
    ],
    revelations: [
      {
        surahNumber: 105,
        ayahNumber: 1,
        ayahRangeLabel: 'Surah Al-Fil 105:1–5',
        contextEnglish: 'Describes Allah destroying Abraha’s elephant army in 570 CE—within living memory of Makkah’s elders.',
      },
      {
        surahNumber: 93,
        ayahNumber: 6,
        ayahRangeLabel: 'Surah Ad-Duha 93:6–8',
        contextEnglish: 'Recalls Allah sheltering his orphanhood and guiding his youth.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih Muslim 1162 & Sahih Muslim 162',
        narrator: 'Abu Qatadah & Anas ibn Malik (RA)',
        textEnglish:
          'He ﷺ fasted Mondays explaining "That is the day I was born and the day revelation descended upon me," and Anas narrated Jibril splitting and washing his heart with Zamzam while a boy with Halimah.',
      },
      {
        source: 'Sahih al-Bukhari 2262',
        narrator: 'Abu Hurayrah (RA)',
        textEnglish:
          'Every prophet sent by Allah shepherded sheep—including Muhammad ﷺ himself herding Makkah’s flocks for qirats.',
      },
    ],
  },
  {
    id: 'ch-06-cave-hira-first-revelation',
    epochId: 'epoch-5-makkan-revelation',
    order: 6,
    timeframeLabel: '610 CE · Ramadan (Age 40)',
    hijriOrEraLabel: 'Year 1 of Prophethood',
    location: 'Cave of Hira (Jabal al-Nur), Makkah',
    title: 'Cave of Hira — Exactly How the First Verses of the Quran Came Down',
    subtitle: 'True dreams, solitude atop Jabal al-Nur, Jibril’s triple embrace, and Khadijah & Waraqah’s historic witness',
    category: 'revelation',
    keyFigures: ['Muhammad ﷺ', 'Angel Jibril (AS)', 'Khadijah bint Khuwaylid (RA)', 'Waraqah ibn Nawfal'],
    beforeContext:
      'Repulsed by Makkah’s idol worship and cruelty, Muhammad ﷺ began carrying food and water up steep Jabal al-Nur for nights of pure contemplation—preceded for six months by crystal-clear true dreams.',
    whatHappenedSummary:
      'During the Night of Power (Laylat al-Qadr) in Ramadan 610 CE, Angel Jibril appeared inside dark Cave Hira commanding "Iqra (Read)!" Three times Jibril embraced him tight until breathless, releasing him and reciting the first five ayahs of Surah Al-‘Alaq. Trembling, the Prophet ﷺ hurried home to Khadijah (RA), who comforted him and sought her elder scripture-scholar cousin Waraqah ibn Nawfal.',
    stepByStepNarrative: [
      '1. Alone in Cave Hira, Jibril seized him saying "Read!" The unlettered Prophet ﷺ answered "I cannot read!"—twice more Jibril pressed him forcefully to imprint upon his heart the gravity of the trust.',
      '2. On the third release, Jibril recited Al-‘Alaq 96:1–5: "Read in the name of your Lord who created—created humanity from a clinging clot. Read! Your Lord is Most Generous, Who taught by the pen..."',
      '3. Rushing down Jabal al-Nur with heart pounding ("Zammiluni, cover me!"), Khadijah wrapped him warmly and immediately listed five unshakable moral proofs why Allah would never forsake him.',
      '4. Listening carefully, blind elder Waraqah ibn Nawfal gasped: "This is the same Namus (Jibril) Allah sent down to Musa! Would that I were young when your own people expel you!"—shocking Muhammad ﷺ that Makkans who adored Al-Amin would ever drive him out.',
    ],
    howQuranCameDown:
      'In addition to descending bit by bit from that night across 23 years, Ibn Abbas (RA) confirms the entire Quran descended on Laylat al-Qadr as one whole from Al-Lawh al-Mahfuz to Bayt al-‘Izzah (lowest heaven), and Jibril brought passages down sequentially as needs and questions arose (Sahih/Hakim/Ibn Abbas & Surah Al-Qadr 97:1).',
    aftermathAndImpact:
      'First converts entered Islam immediately: Khadijah (first person & woman), Zayd ibn Harithah, young cousin Ali ibn Abi Talib, and lifelong best friend Abu Bakr al-Siddiq (RA).',
    keyTakeaways: [
      'Islam’s very first divine word was "Read!"—uniting worship with literacy and knowledge.',
      'Khadijah (RA) stood as the first believer, shielding the Messenger emotionally and financially.',
      'Waraqah warned beforehand that preaching pure truth invites exile from vested interests.',
    ],
    revelations: [
      {
        surahNumber: 96,
        ayahNumber: 1,
        ayahRangeLabel: 'Surah Al-‘Alaq 96:1–5',
        contextEnglish: 'The first five Quranic verses ever revealed on Earth inside Cave Hira.',
      },
      {
        surahNumber: 97,
        ayahNumber: 1,
        ayahRangeLabel: 'Surah Al-Qadr 97:1–5',
        contextEnglish: 'Commemorates that Blessed Night in Ramadan when the Quran began descending.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3 & 4953',
        narrator: 'Aishah (RA)',
        textEnglish:
          'Complete famous Hadith detailing the six months of true dreams, solitude in Hira, Jibril’s triple squeeze ("Iqra!"), rushing trembling to Khadijah, Khadijah’s immortal reassurance, and Waraqah’s testimony.',
      },
      {
        source: 'Sahih al-Bukhari 3818',
        narrator: 'Abu Hurayrah (RA)',
        textEnglish:
          'Jibril came instructing the Prophet ﷺ: "Convey peace (Salam) to Khadijah from her Lord and from me, and give her glad tidings of a palace in Paradise built of hollowed pearl with neither noise nor toil."',
      },
    ],
  },
  {
    id: 'ch-07-secret-open-boycott-taif',
    epochId: 'epoch-5-makkan-revelation',
    order: 7,
    timeframeLabel: '610 – 620 CE',
    hijriOrEraLabel: 'Years 1–10 of Prophethood',
    location: 'Dar al-Arqam, Mount Safa, Abyssinia, Shi‘b Abi Talib & Ta’if',
    title: 'Mount Safa Proclamation, Abyssinia, Ravine Boycott & Mercy at Ta’if',
    subtitle: 'How open Da‘wah shook Makkah, why Bilal & Sumayyah endured torture, and how Jinn believed after Ta’if bled him',
    category: 'revelation',
    keyFigures: ['Abu Bakr', 'Bilal', 'Sumayyah & Yasir (RA)', 'Ja‘far & King Najashi', 'Abu Lahab & Abu Jahl'],
    beforeContext:
      'After Cave Hira, revelation paused briefly (Fatrat al-Wahi) until Surah Al-Muddaththir (74:1–5) resumed the mission quietly for three years inside Dar al-Arqam at the foot of Safa.',
    whatHappenedSummary:
      'Commanded via Surah 26:214 to warn close kin openly, the Prophet ﷺ stood upon Mount Safa asking Quraysh whether they trusted him; when Abu Lahab cursed him, Surah Al-Masad descended. Quraysh responded by torturing defenseless converts (killing Sumayyah—Islam’s first martyr), prompting safe migration to Christian King Najashi in Abyssinia, followed by a brutal three-year starvation boycott, the Year of Sorrow (losing Khadijah & Abu Talib), and stoning at Ta’if.',
    stepByStepNarrative: [
      '1. Mount Safa & Al-Masad: Every clan confessed "We have never known a lie from you!" Yet pride made Abu Lahab shout ruin—triggering Surah 111.',
      '2. Crucible of Torture: Umayyah ibn Khalaf pinned Bilal under scorching noon boulders; Yasir and Sumayyah bled to martyrdom under Abu Jahl’s spear rather than utter disbelief.',
      '3. Migration to Abyssinia (615 CE): Ja‘far ibn Abi Talib (RA) recited Surah Maryam before righteous King Najashi, who drew a line in the dirt refusing to surrender Muslim refugees.',
      '4. Shi‘b Abi Talib & Year of Sorrow (616–619 CE): Banu Hashim ate desert leaves during a 3-year blockade until termites ate the unjust pact except "Bismika Allahumma." Weeks after relief, Khadijah and protector Abu Talib both passed away.',
      '5. Ta’if & Company of Jinn: Stoned out of Ta’if bleeding into his sandals, the Prophet ﷺ declined the Angel of Mountains’ offer to crush the town, praying for their future believing children. That night at Nakhlah, a delegation of Jinn overheard his dawn Quran recitation and rushed home as believers (Surah Al-Ahqaf 46:29 & Surah Al-Jinn 72).',
    ],
    howQuranCameDown:
      'Surah Al-Muddaththir (74), Al-Masad (111), Al-Kafirun (109, rejecting compromise), Al-Ikhlas (112, answering Quraysh’s question on God’s nature), Maryam (19), and Al-Jinn (72) descended precisely across these Makkan confrontations.',
    aftermathAndImpact:
      'Makkan cruelty never broke belief—instead proving Islam’s universal reach across races (Bilal), kingdoms (Abyssinia), and even unseen realms (Jinn).',
    keyTakeaways: [
      'Islam’s very first martyr in history was a woman—Sumayyah bint Khayyat (RA).',
      'At humanity’s lowest moment of grief in Ta’if, mercy prevailed over vengeance.',
      'Honest non-Muslim rulers like Najashi stood honored as allies of justice.',
    ],
    revelations: [
      {
        surahNumber: 74,
        ayahNumber: 1,
        ayahRangeLabel: 'Surah Al-Muddaththir 74:1–7',
        contextEnglish: 'Ended the pause in revelation, launching the active prophetic mission.',
      },
      {
        surahNumber: 26,
        ayahNumber: 214,
        ayahRangeLabel: 'Surah Ash-Shu‘ara 26:214',
        contextEnglish: 'Commanded public proclamation beginning atop Mount Safa.',
      },
      {
        surahNumber: 46,
        ayahNumber: 29,
        ayahRangeLabel: 'Surah Al-Ahqaf 46:29–32',
        contextEnglish: 'Records the group of Jinn listening to the Prophet’s ﷺ recitation near Ta’if and believing.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 4770',
        narrator: 'Abdullah ibn Abbas (RA)',
        textEnglish:
          'Eyewitness account of the Prophet ﷺ climbing Mount Safa upon Surah 26:214’s descent, Quraysh testifying to his total honesty, and Abu Lahab’s outburst triggering Surah Al-Masad.',
      },
      {
        source: 'Sahih al-Bukhari 3231',
        narrator: 'Aishah (RA)',
        textEnglish:
          'The Prophet ﷺ named his rejection and stoning at Ta’if even harder than Uhud—yet answered the Angel of the Mountains with prayer for their descendants.',
      },
    ],
  },
  {
    id: 'ch-08-isra-miraj-hijrah',
    epochId: 'epoch-5-makkan-revelation',
    order: 8,
    timeframeLabel: '620 – 622 CE (1 AH)',
    hijriOrEraLabel: 'Night Journey → Emigration',
    location: 'Makkah → Jerusalem (Al-Aqsa) → Seven Heavens → Cave Thawr → Madinah',
    title: 'Al-Isra wal-Mi‘raj, Aqabah Pledges & The Hijrah to Madinah',
    subtitle: 'Fifty prayers reduced to five, leading all Prophets in Jerusalem, and escaping Quraysh’s assassination plot',
    category: 'revelation',
    keyFigures: ['Muhammad ﷺ', 'Jibril (AS)', 'All Previous Prophets', 'Abu Bakr (RA)', 'Ali (RA)', 'Ansar of Yathrib'],
    beforeContext:
      'Struck by the Year of Sorrow and hostile rejection inside Makkah and Ta’if, Allah honored His Messenger ﷺ with humanity’s greatest spiritual ascent and prepared a welcoming homeland in Yathrib (Madinah).',
    whatHappenedSummary:
      'In a single night, Jibril bore Muhammad ﷺ upon Al-Buraq from Al-Masjid al-Haram to Al-Masjid al-Aqsa—where he led every Prophet in prayer—and ascended through seven heavens past Sidrat al-Muntaha, receiving the 5 daily prayers and Al-Baqarah’s final two verses directly from Allah. Soon after, 75 delegates from Madinah swore loyalty at Aqabah, and the Prophet ﷺ migrated with Abu Bakr (RA) via Cave Thawr.',
    stepByStepNarrative: [
      '1. Seven Heavens Encounter: In heavens 1 to 7, the Prophet ﷺ greeted Adam, Yahya & Isa, Yusuf, Idris, Harun, Musa, and Ibrahim (AS) leaning against Al-Bayt al-Ma‘mur where 70,000 angels enter daily never returning twice.',
      '2. Direct Divine Gift: Initially obligated at 50 daily prayers, Musa (AS) lovingly advised asking relief until Allah finalized 5 daily prayers carrying the complete reward of 50 (Sahih Muslim 162)—plus the concluding 2 verses of Surah Al-Baqarah and forgiveness of non-shirk sins.',
      '3. Pledges of Aqabah & Armed Plot: After Mus‘ab ibn Umayr taught Madinah peacefully for a year, tribes pledged defense. Outraged Quraysh picked one assassin from every clan to strike at dawn—yet Muhammad ﷺ walked unseen past them reciting Ya-Sin 36:9, leaving Ali (RA) safely returning citizens’ trusts.',
      '4. Cave Thawr & Suraqah: Pursuers stood directly over Cave Thawr’s mouth while Allah shielded the two; later Suraqah’s galloping horse sank repeatedly in solid sand until he begged amnesty before the Prophet ﷺ promised him Persia’s golden royal bracelets!',
    ],
    howQuranCameDown:
      'Surah Al-Isra (17:1) and An-Najm (53:13–18) document Al-Mi‘raj; Surah Al-Anfal (8:30) recounts the assassination plot; Surah At-Tawbah (9:40) immortalizes Cave Thawr ("Do not grieve, Allah is with us"); and Surah Al-Hajj (22:39) granted the very first Quranic permission for oppressed believers to defend themselves.',
    aftermathAndImpact:
      'Marked Year 1 of the Islamic Hijri Calendar—transitioning Muslims from a persecuted minority into an organized, principled sanctuary state in Madinah.',
    keyTakeaways: [
      'Salah is the single pillar prescribed directly in Heaven rather than on Earth.',
      'Leading all earlier Prophets at Al-Aqsa sealed Muhammad ﷺ as Imam and Finality of all Messengers.',
      'Even fleeing for his life, the Prophet ﷺ arranged for every enemy’s entrusted money to be returned intact.',
    ],
    revelations: [
      {
        surahNumber: 17,
        ayahNumber: 1,
        ayahRangeLabel: 'Surah Al-Isra 17:1',
        contextEnglish: 'Affirms the Night Journey linking Makkah and Al-Aqsa forever.',
      },
      {
        surahNumber: 9,
        ayahNumber: 40,
        ayahRangeLabel: 'Surah At-Tawbah 9:40',
        contextEnglish: 'Records Abu Bakr’s companionship in Cave Thawr and Sakinah descending.',
      },
      {
        surahNumber: 22,
        ayahNumber: 39,
        ayahRangeLabel: 'Surah Al-Hajj 22:39–40',
        contextEnglish: 'First verse ever permitting self-defense for believers expelled unjustly from their homes.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3207 & Sahih Muslim 162, 173',
        narrator: 'Anas ibn Malik & Abdullah ibn Mas‘ud (RA)',
        textEnglish:
          'Complete heavenly tour meeting the Prophets in each heaven, lightening fifty prayers to five with full fiftyfold reward, and receiving Al-Baqarah 2:285–286 directly below Sidrat al-Muntaha.',
      },
      {
        source: 'Sahih al-Bukhari 3653 & 3906',
        narrator: 'Abu Bakr & Al-Bara ibn Azib (RA)',
        textEnglish:
          'Inside Cave Thawr ("What do you think of two when Allah is their third?") and Suraqah’s miracle pursuit during the Hijrah.',
      },
    ],
  },
  {
    id: 'ch-09-madinah-badr',
    epochId: 'epoch-6-madinah-state',
    order: 9,
    timeframeLabel: '1 – 2 AH · 622 – 624 CE',
    hijriOrEraLabel: '1–2 AH · Ramadan 17',
    location: 'Madinah, Masjid Qiblatayn & Wells of Badr',
    title: 'Constitution of Madinah, Qiblah Shift & Battle of Badr (Yawm al-Furqan)',
    subtitle: 'Founding a multi-faith civic state, turning prayer to Makkah mid-Salah, and 313 defeating 1,000',
    category: 'war_diplomacy',
    keyFigures: ['Muhammad ﷺ', 'Abu Bakr', 'Umar', 'Ali', 'Hamzah', 'Sa‘d ibn Mu‘adh', 'Abu Jahl'],
    beforeContext:
      'In Madinah, Muhajirin had arrived penniless while Ansar shared half their orchards and homes. Quraysh confiscated Makkan emigrants’ houses and packed their assets into Abu Sufyan’s rich trade caravan returning from Syria.',
    whatHappenedSummary:
      'After enacting the written Constitution of Madinah uniting tribes and signing peace treaties with neighboring clans, revealing fasting (Ramadan) and shifting the Qiblah toward the Ka‘bah, 313 lightly armed believers marched to intercept their confiscated wealth—only to face Abu Jahl’s 1,000-man elite Makkan army at Badr. Answering the Prophet’s ﷺ tearful all-night prayer, Allah sent gentle rain and 1,000 angels, routing Quraysh decisively.',
    stepByStepNarrative: [
      '1. Mu’akhat & Constitution: Pairings like Sa‘d ibn al-Rabi‘ & Abd al-Rahman ibn Awf erased refugee poverty, while the Sahifah established rule of law and religious freedom in Madinah.',
      '2. Qiblah Shift (Sha‘ban 2 AH): Sixteen months after Hijrah, while praying inside Masjid Bani Salamah (Masjid Qiblatayn), Al-Baqarah 2:144 descended mid-Salah—companions turned smoothly 180 degrees facing Makkah.',
      '3. Badr Strategy: Guided by Al-Hubab ibn al-Mundhir’s tactical suggestion, Muslims secured the closest spring and covered rear wells before building a shaded command shelter.',
      '4. Night Rain & Du‘a: Light rain hardened shifting sand under Muslim boots while bogging down Quraysh’s valley floor. Raising his hands until his cloak dropped, the Prophet ﷺ cried for divine fulfillment.',
      '5. Climax & Mercy: Following single combat victories by Hamzah, Ali, and Ubaydah, Muslims surged forward with angelic aid, capturing 70 prisoners—offering freedom to anyone who taught ten Madinan children to read and write.',
    ],
    howQuranCameDown:
      'Surah Al-Baqarah 2:142–150 legislated the Qiblah change; 2:183–187 established Ramadan fasting; and Surah Al-Anfal (8:1–48) revealed in the direct aftermath answered questions on battle conduct, angelic aid, and fair spoils distribution.',
    aftermathAndImpact:
      'Badr shattered Makkah’s prestige forever, silenced hostile mockers across Arabia, and proved a disciplined community relying on Allah outmatches threefold odds.',
    keyTakeaways: [
      'True victory rests on sincere du‘a and tactical preparation together.',
      'Reclaiming rights in Madinah established constitutional rule of law and mercy toward captives.',
      'Turning mid-Salah at Masjid Qiblatayn shows instant obedience once revelation arrives.',
    ],
    revelations: [
      {
        surahNumber: 8,
        ayahNumber: 9,
        ayahRangeLabel: 'Surah Al-Anfal 8:9–12 & 41',
        contextEnglish: 'Describes 1,000 angels descending rank after rank at Badr and names it Yawm al-Furqan.',
      },
      {
        surahNumber: 2,
        ayahNumber: 144,
        ayahRangeLabel: 'Surah Al-Baqarah 2:144',
        contextEnglish: 'Command redirecting Muslim prayer permanently toward Al-Masjid al-Haram.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih Muslim 1763 & Sahih al-Bukhari 3953',
        narrator: 'Umar ibn al-Khattab & Ibn Abbas (RA)',
        textEnglish:
          'Umar witnessed the Prophet ﷺ’s agonizing night supplication at Badr until Abu Bakr hugged him gently saying "Enough, O Messenger of Allah—Allah will fulfill His promise!" And Jibril confirmed angels who fought at Badr were the best of angels.',
      },
    ],
    battle: {
      yearLabel: '17 Ramadan 2 AH · March 624 CE',
      location: 'Wells of Badr (~130 km SW of Madinah)',
      cause: 'Reclaiming plundered Makkan emigrant wealth and halting Quraysh’s armed blockade/threats against Madinah.',
      commanders: 'Muslims: Prophet Muhammad ﷺ (Hamzah, Ali, Sa‘d ibn Mu‘adh) · Quraysh: Abu Jahl & Utbah ibn Rabi‘ah',
      forces: 'Muslims: 313 men, 2 horses, 70 camels · Quraysh: ~1,000 armored warriors, 100 horses, 600 coats of mail',
      muslimStrengthCount: 313,
      opponentStrengthCount: 1000,
      muslimStrengthLabel: '313 Believers (2 horses)',
      opponentStrengthLabel: '1,000 Quraysh (100 cavalry)',
      durationOrDecisiveMoment: 'Single morning battle; Abu Jahl fell in the central clash',
      howItUnfolded:
        'Following individual champions’ duels (Hamzah, Ali, Ubaydah), disciplined Muslim ranks fired arrows in tight formation before charging as rain-firmed sand and angelic reinforcement broke Quraysh’s center.',
      outcomeAndLesson:
        '70 Quraysh commanders slain, 70 captured; 14 Muslim martyrs. Literate captives freed by teaching 10 Madinan children each.',
      islamicEthicsEstablished: [
        'Prisoners must be fed the same food eaten by their captors.',
        'Education & literacy ransom replaces cruel retaliation.',
        'Never execute captives who cannot fight or pose no treason.',
      ],
    },
  },
  {
    id: 'ch-10-uhud-nadir-khandaq',
    epochId: 'epoch-6-madinah-state',
    order: 10,
    timeframeLabel: '3 – 5 AH · 625 – 627 CE',
    hijriOrEraLabel: 'Years 3–5 AH · Crucible of Madinah',
    location: 'Mount Uhud, SE Madinah & Northern Trench Rim',
    title: 'Battle of Uhud, Banu Nadir, Trial of Al-Ifk & Siege of the Trench',
    subtitle: 'How disobedience cost Uhud, how a 5.5 km Persian trench foiled 10,000 invaders, and how Aishah (RA) was exonerated',
    category: 'war_diplomacy',
    keyFigures: ['Muhammad ﷺ', 'Hamzah', 'Nusaybah bint Ka‘b', 'Salman al-Farsi', 'Aishah (RA)', 'Khalid ibn al-Walid'],
    beforeContext:
      'Humiliated by Badr, Quraysh devoted caravan profits to mobilize 3,000 fighters (Uhud) and later allied with Ghatafan and exiled Banu Nadir chiefs to raise a massive 10,000-man annihilation coalition (Khandaq).',
    whatHappenedSummary:
      'At Uhud (3 AH), initial Muslim victory reversed when 40 archers descended the ridge for spoils—allowing Khalid ibn al-Walid to flank them, injuring the Prophet ﷺ and martyring 70 including Hamzah (RA). Two years later (5 AH), after hypocrites slandered Aishah (RA) following Al-Muraysi‘ and Banu Nadir plotted assassination, 10,000 Confederates marched on Madinah. Digging a 5.5 km trench per Salman al-Farsi’s plan, believers endured 27 freezing days—including surviving Banu Qurayzah’s rear-flank treason—until fierce divine wind dispersed the coalition.',
    stepByStepNarrative: [
      '1. Archers’ Hill at Uhud: Against explicit command ("Do not leave even if birds snatch us"), 40 of 50 archers left Jabal al-Rumah; Khalid swung around, wounding the Prophet’s ﷺ face and breaking his tooth while Nusaybah & Talhah shielded him physically.',
      '2. Hamra al-Asad Deterrence: Next dawn, wounded Muslims marched out to show unbroken morale—forcing Abu Sufyan to retreat to Makkah.',
      '3. Exoneration of Aishah (Al-Ifk, 5 AH): For 30 painful days rumors tested Madinah until Surah An-Nur 24:11–26 descended in winter, clearing Aishah (RA) permanently and outlawing false accusation.',
      '4. Trench (Khandaq) & Qurayzah: Working hungry beside companions, the Prophet ﷺ struck sparks off a boulder foretelling the future liberation of Syria, Persia, and Yemen. After Nu‘aym ibn Mas‘ud sowed discord among invaders and Banu Qurayzah broke defense treaties inside Madinah, hurricane winds shattered enemy camps—and former Qurayzah ally Sa‘d ibn Mu‘adh judged their wartime treason.',
    ],
    howQuranCameDown:
      'Ali ‘Imran 3:139–175 diagnoses Uhud candidly without hiding Muslim mistakes; Surah Al-Hashr 59 details Banu Nadir; Surah An-Nur 24 establishes privacy & slander penalties; and Surah Al-Ahzab 33:9–27 describes the siege of the Trench minute by minute.',
    aftermathAndImpact:
      'After Khandaq’s failure, Quraysh never dared mount another offensive against Madinah—shifting momentum permanently toward Islam.',
    keyTakeaways: [
      'Uhud proved obedience to leadership outweighs temptation of spoils.',
      'Surah An-Nur cleared Aishah (RA) while outlawing unverified rumor across Muslim society.',
      'Welcoming Salman’s Trench idea proves wisdom belongs to every background.',
    ],
    revelations: [
      {
        surahNumber: 3,
        ayahNumber: 139,
        ayahRangeLabel: 'Surah Ali ‘Imran 3:139–175',
        contextEnglish: 'Exhaustive divine post-mortem of Uhud warning against disobedience and praising steadfastness.',
      },
      {
        surahNumber: 24,
        ayahNumber: 11,
        ayahRangeLabel: 'Surah An-Nur 24:11–21',
        contextEnglish: 'Forever clears Mother of the Believers Aishah (RA) from false gossip after Al-Muraysi‘.',
      },
      {
        surahNumber: 33,
        ayahNumber: 9,
        ayahRangeLabel: 'Surah Al-Ahzab 33:9–27',
        contextEnglish: 'Recounts the 10,000-strong Trench siege, unseen winds, and wartime betrayal aftermath.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3039, 4043 & 4101',
        narrator: 'Al-Bara ibn Azib & Jabir ibn Abdullah (RA)',
        textEnglish:
          'Details the exact orders given to Abdullah ibn Jubayr’s archers at Uhud, Fatimah (RA) binding the Prophet’s ﷺ bleeding wound, and companions digging the Khandaq trench through bitter starvation.',
      },
      {
        source: 'Sahih al-Bukhari 4141 & 4750',
        narrator: 'Aishah (RA)',
        textEnglish:
          'Gripping 30-day first-person account of Al-Ifk until revelation overtook the Prophet ﷺ in her parents’ home and he smiled wiping sweat from his brow: "Rejoice, O Aishah—Allah has declared your innocence!"',
      },
    ],
    battle: {
      yearLabel: 'Shawwal 3 AH (Uhud) · Shawwal 5 AH (Trench / Khandaq)',
      location: 'Mount Uhud & Northern Rim of Madinah',
      cause: 'Uhud: Quraysh vengeance for Badr · Khandaq: Pan-Arab Confederate coalition attempting total extermination of Madinah.',
      commanders: 'Muslims: Muhammad ﷺ, Salman al-Farsi, Ali, Hamzah · Opponents: Abu Sufyan, Khalid (pre-Islam), Uyaynah',
      forces: 'Uhud: 700 Muslims vs 3,000 Quraysh · Trench: 3,000 defenders vs 10,000 Confederates',
      muslimStrengthCount: 3000,
      opponentStrengthCount: 10000,
      muslimStrengthLabel: '3,000 Defenders behind 5.5km Trench (700 at Uhud)',
      opponentStrengthLabel: '10,000 Confederate Siege Army (3,000 at Uhud)',
      durationOrDecisiveMoment: '27-day trench blockade ended by icy gale winds',
      howItUnfolded:
        'At Uhud, leaving tactical posts inverted victory into survival; learning that lesson completely at Khandaq, Muslims innovated the deep perimeter trench, repelled knight crossings (Ali slaying champion Amr ibn Abd Wudd), and trusted Allah until storms scattered all 10,000 invaders.',
      outcomeAndLesson:
        'Never again did Quraysh besiege Madinah. Complete obedience to strategy and unity overcame existential encirclement.',
      islamicEthicsEstablished: [
        'Mutilation of fallen foes (such as Hind’s abuse of Hamzah at Uhud) is strictly forbidden in Islam.',
        'Military innovation (Salman’s Persian trench strategy) is embraced as wisdom.',
      ],
    },
  },
  {
    id: 'ch-11-hudaybiyyah-khaybar-mutah',
    epochId: 'epoch-6-madinah-state',
    order: 11,
    timeframeLabel: '6 – 8 AH · 628 – 629 CE',
    hijriOrEraLabel: 'Years 6–8 AH',
    location: 'Hudaybiyyah, Royal Courts, Khaybar Oasis & Mu’tah (Jordan)',
    title: 'Treaty of Hudaybiyyah, Letters to Emperors, Khaybar & Mu’tah',
    subtitle: 'Why a seemingly humble 10-year truce was proclaimed a "Clear Victory" and how Islam stepped onto the world stage',
    category: 'war_diplomacy',
    keyFigures: ['Muhammad ﷺ', 'Uthman ibn Affan', 'Ali ibn Abi Talib', 'Zayd, Ja‘far & Khalid (RA)', 'Heraclius'],
    beforeContext:
      'Blocked from Makkah for six years, the Prophet ﷺ saw a true dream entering the Sacred Mosque and marched peacefully with 1,400 unarmed pilgrims in Ihram only seeking Umrah.',
    whatHappenedSummary:
      'Halted at Hudaybiyyah, 1,400 believers pledged beneath a tree (Bay‘at al-Ridwan) before signing a 10-year non-aggression treaty. Though some companions felt disheartened by one-sided clauses, Surah Al-Fath revealed immediately calling it "Fathan Mubina" (Manifest Victory). Freed from southern conflict, the Prophet ﷺ sent envoys to Byzantium, Persia, Egypt, and Abyssinia, neutralized the northern hostile citadels of Khaybar, and faced a 100,000 imperial coalition courageously at Mu’tah.',
    stepByStepNarrative: [
      '1. Treaty of Hudaybiyyah (6 AH): Peaceful dialogue ended Quraysh’s propaganda barrier—twice as many people embraced Islam in 2 peaceful years than in the prior 19 years combined!',
      '2. Diplomatic Envoys (7 AH): Emperor Heraclius questioned Abu Sufyan in Jerusalem and privately confirmed Muhammad ﷺ was indeed the promised Prophet.',
      '3. Fall of Khaybar (7 AH): Curing Ali’s painful eyes, the Prophet ﷺ handed him the banner before fortress Al-Qamus; Ali felled warrior Marhab, while farmers retained orchards peacefully under fair harvest sharing.',
      '4. Battle of Mu’tah (8 AH): When envoy Harith ibn Umayr was murdered, 3,000 Muslims stood six days against reported 100,000+ imperial troops. Zayd, Ja‘far (holding the flag even with severed hands), and Ibn Rawahah fell martyrs before Khalid ibn al-Walid maneuvered an undefeated withdrawal.',
    ],
    howQuranCameDown:
      'Surah Al-Fath (48:1–29) descended directly on the camel-back journey returning from Hudaybiyyah—comforting believers that Allah’s peace opens hearts faster than swords, and promising Khaybar exclusively to those who pledged at the Tree (48:18–20).',
    aftermathAndImpact:
      'By removing fear of war, tribes streamed toward Islam—while Mu’tah broke the psychological dread of Byzantine superpowers.',
    keyTakeaways: [
      'Patient diplomacy at Hudaybiyyah won more hearts in 2 years than nearly 20 years prior.',
      'Diplomatic envoys reached Caesar, Chosroes, Muqawqis, and Najashi peacefully.',
      'At Mu’tah, strategic withdrawal saved the outnumbered army intact against 100,000+ troops.',
    ],
    revelations: [
      {
        surahNumber: 48,
        ayahNumber: 1,
        ayahRangeLabel: 'Surah Al-Fath 48:1–20',
        contextEnglish: 'Names the Hudaybiyyah peace pact a "Clear Victory" and promises imminent relief at Khaybar.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 2731, 4185 & 4210',
        narrator: 'Al-Bara, Al-Miswar & Sahl ibn Sa‘d (RA)',
        textEnglish:
          'Al-Bara explained companions considered Bay‘at al-Ridwan the true Victory; at Khaybar the Prophet ﷺ cured Ali’s eyes and instructed: "If Allah guides one person through you, it is better than red camels."',
      },
      {
        source: 'Sahih al-Bukhari 4262 & 3757',
        narrator: 'Anas ibn Malik & Ibn Umar (RA)',
        textEnglish:
          'Live prophetic tearful report in Madinah announcing martyrdoms of Zayd, Ja‘far (with 50+ frontal wounds), and Ibn Rawahah until "Sword of Allah" Khalid rescued the army.',
      },
    ],
    battle: {
      yearLabel: '7 AH (Khaybar) · 8 AH (Mu’tah)',
      location: 'Khaybar Fortresses (~150 km N of Madinah) & Mu’tah, Jordan',
      cause: 'Khaybar: Neutralizing northern coalition financing attacks · Mu’tah: Seeking justice for murdered diplomat al-Harith ibn Umayr.',
      commanders: 'Muslims: Muhammad ﷺ & Ali (Khaybar); Zayd → Ja‘far → Ibn Rawahah → Khalid (Mu’tah)',
      forces: 'Khaybar: 1,400 vs 10,000 inside 8 forts · Mu’tah: 3,000 vs 100,000+ imperial host',
      muslimStrengthCount: 3000,
      opponentStrengthCount: 100000,
      muslimStrengthLabel: '3,000 Fighters at Mu’tah (1,400 at Khaybar)',
      opponentStrengthLabel: '100,000+ Byzantine Coalition (10,000 at Khaybar)',
      durationOrDecisiveMoment: 'Khalid broke 9 swords before orchestrating a night tactical reshuffle & withdrawal',
      howItUnfolded:
        'At Khaybar, forts fell sequentially with peaceful agricultural accords afterward; at Mu’tah, three commanders held the line unto martyrdom before Khalid swapped flank formations overnight to fool imperial scouts and withdraw safely with only 12 recorded martyrs.',
      outcomeAndLesson:
        'Earned Khalid title Sayfullah ("Sword of Allah") and demonstrated supreme tactical discipline even outnumbered 30-to-1.',
      islamicEthicsEstablished: [
        'Diplomatic envoys are strictly inviolable.',
        'Invite opponents peacefully to truth before any clash.',
        'Discretion and saving soldiers’ lives via tactical withdrawal is victory, not defeat.',
      ],
    },
  },
  {
    id: 'ch-12-makkah-hunayn-tabuk',
    epochId: 'epoch-6-madinah-state',
    order: 12,
    timeframeLabel: '8 – 9 AH · 630 – 631 CE',
    hijriOrEraLabel: 'Years 8–9 AH',
    location: 'Makkah, Hunayn Gorge, Ta’if & Tabuk Frontier',
    title: 'Bloodless Conquest of Makkah, Hunayn & The Campaign of Tabuk',
    subtitle: 'General amnesty inside Makkah, turning defeat in Hunayn’s canyon, and 30,000 marching through summer drought to Tabuk',
    category: 'war_diplomacy',
    keyFigures: ['Muhammad ﷺ', 'Abu Sufyan', 'Bilal (RA)', 'Al-Abbas', 'Uthman ibn Affan', 'Ka‘b ibn Malik (RA)'],
    beforeContext:
      'Barely 22 months after signing Hudaybiyyah, Quraysh secretly supplied weapons for a dawn massacre against Muslim-allied Banu Khuza‘ah inside the Sanctuary—voiding the peace treaty.',
    whatHappenedSummary:
      'Marching secretly in Ramadan 8 AH with 10,000 troops, lighting 10,000 watchfires over Makkah hills, Muhammad ﷺ entered Makkah nearly bloodlessly, shattered 360 idols around the Ka‘bah reciting Surah 17:81, and forgave all past persecutors. Weeks later, a 12,000-man army nearly routed in Hawazin’s canyon ambush at Hunayn until the Prophet ﷺ held firm alone and rallied believers. Next summer (9 AH), 30,000 marched 700 km to Tabuk—securing Arabia’s northern frontier and inaugurating the Year of Delegations.',
    stepByStepNarrative: [
      '1. Conquest of Makkah (20 Ramadan 8 AH): Riding bowed in total humility upon his camel, he rejected Saad ibn Ubadah’s boast of bloodshed, proclaiming: "Today is the Day of Mercy!" Asked what he would do to Quraysh persecutors, he replied like Yusuf (AS): "Go, you are free!" Bilal climbed atop the Ka‘bah echoing the Adhan.',
      '2. Hunayn Canyon Ambush (Shawwal 8 AH): Overconfident in having 12,000 troops, the vanguard broke under dawn arrows until the Prophet ﷺ spurred his mule straight forward while Al-Abbas roared out calling the Ansar and People of the Tree back into line.',
      '3. Magnanimity After Hunayn & Ta’if: Returning 6,000 Hawazin women and children freed the whole tribe’s hearts into embracing Islam soon after.',
      '4. Tabuk — Hour of Hardship (Rajab 9 AH): Despite blistering summer famine, Abu Bakr gave 100% of his wealth and Uthman outfitted 300 camels + 1,000 dinars. Three sincere believers (Ka‘b ibn Malik, Murarah, Hilal) who lagged behind told the plain truth instead of hypocrite lies—and endured 50 days of boycott until At-Tawbah 9:118 descended joyfully sealing their pardon.',
    ],
    howQuranCameDown:
      'Surah An-Nasr (110) marked mass conversion following Makkah; At-Tawbah 9:25–26 humbled pride after Hunayn; and At-Tawbah 9:117–118 permanently recorded the honesty & repentance of Ka‘b ibn Malik from Tabuk.',
    aftermathAndImpact:
      'Every tribe across the Arabian Peninsula dispatched delegations to Madinah in 9 AH embracing Islam peacefully.',
    keyTakeaways: [
      'Total amnesty inside conquered Makkah defeated vengeance permanently.',
      'Hunayn proved numerical strength fails without inner reliance on Allah.',
      'Ka‘b ibn Malik’s honesty at Tabuk earned Allah’s everlasting pardon.',
    ],
    revelations: [
      {
        surahNumber: 17,
        ayahNumber: 81,
        ayahRangeLabel: 'Surah Al-Isra 17:81 & An-Nasr 110:1–3',
        contextEnglish: '"Truth has come and falsehood vanished" recited toppling Makkah’s idols; Surah 110 heralds mass entry into Islam.',
      },
      {
        surahNumber: 9,
        ayahNumber: 25,
        ayahRangeLabel: 'Surah At-Tawbah 9:25 & 9:118',
        contextEnglish: 'Lesson of Hunayn against trusting numbers & Ka‘b ibn Malik’s accepted 50-day repentance at Tabuk.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 4287, 4316 & 4418',
        narrator: 'Ibn Mas‘ud, Al-Bara & Ka‘b ibn Malik (RA)',
        textEnglish:
          'Toppling 360 idols at Makkah; Al-Bara testifying the Prophet ﷺ alone never retreated an inch during Hunayn’s ambush; and Ka‘b ibn Malik’s unforgettable dawn announcement: "Rejoice with the best day since your mother bore you!"',
      },
    ],
    battle: {
      yearLabel: '8 – 9 AH · 630 – 631 CE',
      location: 'Makkah, Hunayn Valley & Tabuk Border',
      cause: 'Makkah: Quraysh treaty violation & Khuza‘ah massacre · Hunayn: Hawazin preemption · Tabuk: Byzantine frontier threat.',
      commanders: 'Muslims: Muhammad ﷺ, Khalid ibn al-Walid, Zubayr, Abu Ubaydah · Hawazin: Malik ibn Awf',
      forces: 'Makkah: 10,000 (bloodless) · Hunayn: 12,000 vs 20,000 ambush · Tabuk: 30,000 expedition (no battle fought)',
      muslimStrengthCount: 12000,
      opponentStrengthCount: 20000,
      muslimStrengthLabel: '10k (Makkah) → 12k (Hunayn) → 30k (Tabuk)',
      opponentStrengthLabel: '20,000 Hawazin & Thaqif Ambusher Force',
      durationOrDecisiveMoment: 'Bloodless entry into Makkah; Al-Abbas’s rally cry reversed Hunayn within hours',
      howItUnfolded:
        'Four columns entered Makkah peacefully from every pass; at Hunayn, initial panic gave way to complete victory once companions rallied around the fearless Prophet ﷺ; at Tabuk, sheer 30,000-man resolve deterred imperial clash entirely.',
      outcomeAndLesson:
        'General amnesty conquered Makkah’s hearts forever; numerical pride is fatal while truthfulness (like Ka‘b at Tabuk) earns divine pardon.',
      islamicEthicsEstablished: [
        'Total forgiveness over revenge upon victory ("Antum at-Tulaqa — you are free").',
        'Protect idols-free monotheistic worship without harming civilians or destroying homes.',
      ],
    },
  },
  {
    id: 'ch-13-farewell-and-passing',
    epochId: 'epoch-7-farewell-completion',
    order: 13,
    timeframeLabel: '10 – 11 AH · 632 CE',
    hijriOrEraLabel: 'Dhul-Hijjah 10 AH → Rabi al-Awwal 11 AH',
    location: 'Mount Arafat (Makkah) & Madinah al-Munawwarah',
    title: 'The Farewell Pilgrimage, Final Verse & Passing of the Prophet ﷺ',
    subtitle: '100,000 witnesses at Arafat, completion of Islam, the very last Quran verses, and Monday morning in Aishah’s chamber',
    category: 'revelation',
    keyFigures: ['Muhammad ﷺ', 'Abu Bakr', 'Umar', 'Aishah (RA)', 'Fatimah (RA)', 'Jabir ibn Abdullah'],
    beforeContext:
      'Having united Arabia in peace, freed Makkah, and taught every pillar practically, the Prophet ﷺ announced his pilgrimage in 10 AH—drawing over 100,000 believers from every tribe.',
    whatHappenedSummary:
      'On 9 Dhul-Hijjah at Arafat, Allah revealed Surah Al-Ma’idah 5:3 sealing the perfection of Islam. In his immortal Farewell Sermon, Muhammad ﷺ declared blood, property, and honor sacred, abolished racism and usury, honored women’s rights, and left the Quran and Sunnah. Three months later back in Madinah, days after Surah Al-Baqarah 2:281 descended as the final legal reminder, he appointed Abu Bakr to lead prayers and passed peacefully on 12 Rabi al-Awwal 11 AH.',
    stepByStepNarrative: [
      '1. Sermon at Arafat (9 Dhul-Hijjah 10 AH): "An Arab has no superiority over a non-Arab, nor white over black, except by righteousness (Taqwa)!" Ending blood feuds starting with his own cousin’s and canceling riba debts starting with his uncle Abbas’s.',
      '2. Revelation of Perfection (5:3): When Umar (RA) wept hearing "Today I have perfected your religion for you," he realized completion signals imminent departure.',
      '3. Final Verse on Earth: Scholars like Ibn Abbas record Al-Baqarah 2:281 ("And fear a Day when you will be returned to Allah...") descended barely nine nights before his passing.',
      '4. Passing (12 Rabi al-Awwal 11 AH): Refusing to cling to wealth (giving his final 7 dirhams in charity), smiling one last time at his praying community at Fajr, he whispered "With the Highest Companion" leaning gently on Aishah (RA). When shock paralyzed Umar, Abu Bakr stood firm reciting Ali ‘Imran 3:144.',
    ],
    howQuranCameDown:
      'For 23 years Jibril had reviewed the entire Quran with him every Ramadan—and in this final Ramadan (10 AH), Jibril reviewed the complete Quran with him twice (Sahih al-Bukhari 4998), locking its exact chapter & verse sequence.',
    aftermathAndImpact:
      'Though Muhammad ﷺ returned to his Lord, the completed Quran, preserved Sunnah, and 100,000+ eyewitness companions carried the torch onward unbroken.',
    keyTakeaways: [
      'Arafat established universal human equality and sanctity of life and property.',
      'Surah Al-Ma’idah 5:3 sealed Islam completely; Jibril reviewed the full Quran twice in Ramadan 10 AH.',
      'Even in his final breaths, Muhammad ﷺ urged prayer and care for families before passing peacefully.',
    ],
    revelations: [
      {
        surahNumber: 5,
        ayahNumber: 3,
        ayahRangeLabel: 'Surah Al-Ma’idah 5:3',
        contextEnglish: 'Perfected the Din and completed Allah’s favor upon believers on the Plain of Arafat.',
      },
      {
        surahNumber: 2,
        ayahNumber: 281,
        ayahRangeLabel: 'Surah Al-Baqarah 2:281',
        contextEnglish: 'Reported by Ibn Abbas (RA) as the final Quranic verse revealed days before the Prophet’s ﷺ passing.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih Muslim 1218 & Sahih al-Bukhari 4449, 4463, 4998',
        narrator: 'Jabir ibn Abdullah, Aishah & Abu Hurayrah (RA)',
        textEnglish:
          'Complete Farewell Hajj sermon text ("Hold fast to the Book of Allah"), twice-completed final Ramadan Quran review with Jibril, and his serene final moments using the miswak and choosing "the Highest Companion."',
      },
    ],
  },
  {
    id: 'ch-14-rashidun-yamamah-quran-preservation',
    epochId: 'epoch-8-rashidun-preservation',
    order: 14,
    timeframeLabel: '11 – 40 AH · 632 – 661 CE',
    hijriOrEraLabel: 'Khulafa al-Rashidun',
    location: 'Madinah, Yamamah, Yarmouk, Qadisiyyah, Jerusalem & Damascus',
    title: 'Abu Bakr, Battle of Yamamah & Preserving Quran & Sahih Hadith Forever',
    subtitle: 'How the martyrdom of 70 Huffaz at Yamamah led to compiling the Mushaf, liberation of Jerusalem, Uthmani copies & Hadith Isnad',
    category: 'preservation',
    keyFigures: ['Abu Bakr (RA)', 'Umar (RA)', 'Uthman (RA)', 'Ali (RA)', 'Zayd ibn Thabit (RA)', 'Khalid ibn al-Walid'],
    beforeContext:
      'Within hours of 12 Rabi al-Awwal 11 AH, apostate rebellions, Zakah refusal, and false prophets (led by Musaylimah al-Kadhdhab commanding 40,000+ fighters in Yamamah) threatened to extinguish nascent Islam.',
    whatHappenedSummary:
      'Elected first Caliph at Saqifah, Abu Bakr (RA) refused to compromise even a camel’s tether of Zakah, dispatched Usamah ibn Zayd as ordered, and quelled false claimants—culminating in the fierce Battle of Yamamah (11 AH). Because 70+ expert Quran memorizers fell martyrs at Yamamah, Umar (RA) urgently urged Abu Bakr to commission Zayd ibn Thabit (RA) to compile the entire Quran into a single verified master volume (later standardized across all provinces by Uthman RA in 25 AH). Meanwhile under Umar, Muslim armies triumphed at Yarmouk and Qadisiyyah and entered Jerusalem in unmatched peace—while Companions established strict eyewitness Isnad standards preserving Sahih Hadith.',
    stepByStepNarrative: [
      '1. Battle of Yamamah (11 AH): Khalid ibn al-Walid led believers through the "Garden of Death" defeating Musaylimah’s 40,000-man army; Salim Mawla Abi Hudhayfah and 70+ Huffaz gave their lives guarding the Quran.',
      '2. Master Mushaf Compilation (12 AH): Shaken by losing so many reciters, Umar convinced Abu Bakr; lead scribe Zayd ibn Thabit accepted only verses verified BOTH by living memory AND written parchment penned in the Prophet’s ﷺ presence with two witnesses.',
      '3. Yarmouk, Qadisiyyah & Liberation of Jerusalem (15–16 AH): Outnumbered forces under Khalid, Abu Ubaydah, and Sa‘d ibn Abi Waqqas toppled Sassanid & Byzantine military dominance—yet entering Al-Quds calmly on a single camel, Umar (RA) signed a Covenant guaranteeing churches, synagogues, and citizen safety, and refused to pray inside the Church of the Holy Sepulchre lest later generations convert it.',
      '4. Uthmani Standardization (25 AH) & Hadith Science: Noticing distant non-Arab regions varying slightly in dialectal reading, Caliph Uthman (RA) convened Zayd’s committee to produce master copies from Hafsah’s (RA) original Suhuf and distributed them to Makkah, Kufah, Basrah, Damascus, and Madinah—giving the world one identical, unchanged Mushaf letter-for-letter today!',
    ],
    howQuranCameDown:
      'Allah’s promise in Surah Al-Hijr (15:9)—"Indeed, it is We who sent down the Reminder, and indeed We will be its Guardian"—was fulfilled historically step by step through Zayd ibn Thabit, Abu Bakr, Hafsah, and Uthman (RA), documented verbatim in Sahih al-Bukhari 4986–4987!',
    aftermathAndImpact:
      'Every Mushaf on Earth today traces its verified chain directly to Uthman’s committee & Abu Bakr’s Suhuf; and every Sahih Hadith chain (Isnad) traces through named, tested Companions to Imam al-Bukhari & Imam Muslim.',
    keyTakeaways: [
      'The single biggest catalyst for compiling the Quran into one bound book was the Battle of Yamamah (11 AH).',
      'Not a single verse entered the master Mushaf without BOTH living memorization AND physical Prophetic-era parchment + two witnesses.',
      'Umar’s peaceful entry into Jerusalem set an eternal standard of inter-community religious protection.',
    ],
    revelations: [
      {
        surahNumber: 15,
        ayahNumber: 9,
        ayahRangeLabel: 'Surah Al-Hijr 15:9',
        contextEnglish: 'Divine guarantee guarding the Quran from alteration across every century.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 4986 & 4987',
        narrator: 'Zayd ibn Thabit & Anas ibn Malik (RA)',
        textEnglish:
          'Classic foundational Hadiths narrating step-by-step how Umar approached Abu Bakr directly after the Battle of Yamamah, how Zayd compiled every verse on leather & palm stalks with double verification, and how Caliph Uthman later standardized official copies from Hafsah’s manuscript.',
      },
      {
        source: 'Sahih al-Bukhari 3689 & 3176',
        narrator: 'Abu Hurayrah & Tariq ibn Shihab (RA)',
        textEnglish:
          'Documents the Prophet’s ﷺ foretelling of Yarmouk/Byzantine & Persian lands opening peacefully and Umar ibn al-Khattab’s historic journey and justice in Ash-Sham & Jerusalem.',
      },
    ],
    battle: {
      yearLabel: '11 AH / December 632 CE (Yamamah) · 15 AH (Yarmouk & Qadisiyyah)',
      location: 'Al-Yamamah (Najd), Yarmouk Valley & Al-Qadisiyyah (Iraq)',
      cause: 'Yamamah: Halting armed apostate invasion led by false prophet Musaylimah · Yarmouk/Qadisiyyah: Defending northern borders against Sassanid & Byzantine counter-offensives.',
      commanders: 'Khalid ibn al-Walid, Abu Ubaydah ibn al-Jarrah, Sa‘d ibn Abi Waqqas, Bara ibn Malik (RA)',
      forces: 'Yamamah: ~13,000 Muslims vs 40,000 Musaylimah army · Yarmouk: ~30,000 vs imperial coalition',
      muslimStrengthCount: 13000,
      opponentStrengthCount: 40000,
      muslimStrengthLabel: '13,000 Believers at Yamamah',
      opponentStrengthLabel: '40,000 Armed Insurgents under Musaylimah',
      durationOrDecisiveMoment: 'Bara ibn Malik catapulted over the Garden of Death walls to throw open the gates',
      howItUnfolded:
        'After heavy initial losses among Ansar & Huffaz, Khalid regrouped Muhajirin and Ansar separately by banner; Wahshi and a companion felled Musaylimah inside the walled Garden of Death, ending the rebellion—directly inspiring compilation of the complete written Quran.',
      outcomeAndLesson:
        'Martyrdom of 70+ memorizers at Yamamah awakened Umar and Abu Bakr (RA) to safeguard the written Mushaf permanently for all mankind.',
      islamicEthicsEstablished: [
        'Preserving sacred scripture & community unity takes immediate priority after crisis.',
        'Cities surrendering peacefully (such as Jerusalem under Umar) retain full protection of life, houses of worship, and property.',
      ],
    },
  },
];

export const ASBAB_AL_NUZUL_ARCHIVE: AsbabAlNuzulEntry[] = [
  {
    id: 'asbab-alaq-96',
    surahNumber: 96,
    ayahNumber: 1,
    ayahRangeLabel: '96:1–5',
    surahName: 'Al-‘Alaq',
    era: 'Makki',
    yearOrMoment: '610 CE · Ramadan (Night of Power)',
    category: 'revelation_origin',
    title: 'First Five Verses Ever Sent to Humanity',
    whatWasHappeningBefore:
      'Muhammad ﷺ, age 40, spent Ramadan nights alone in Cave Hira worshiping the Lord of Ibrahim away from Makkah’s idols, preceded by six months of crystal-clear true dreams.',
    howItWasRevealed:
      'Jibril (AS) appeared inside the dark cave commanding "Read!" He embraced the unlettered Prophet three times until breathless, releasing him on the third squeeze and reciting these five verses.',
    exactWisdomAndRuling:
      'Establishes reading, reflection, pen/literacy, and recognition of the Creator as the opening pillars of Islam.',
    hadithProof: {
      source: 'Sahih al-Bukhari 3',
      narrator: 'Aishah (RA)',
      textEnglish: '"He seized me and pressed me until I could bear it no more... then said: Read in the name of your Lord who created."',
    },
  },
  {
    id: 'asbab-muddaththir-74',
    surahNumber: 74,
    ayahNumber: 1,
    ayahRangeLabel: '74:1–5',
    surahName: 'Al-Muddaththir',
    era: 'Makki',
    yearOrMoment: '610 CE · Immediately After Pause of Revelation',
    category: 'revelation_origin',
    title: 'Resumption of Wahi & Launching the Prophetic Call',
    whatWasHappeningBefore:
      'After Cave Hira, revelation paused briefly (Fatrat al-Wahi), leaving the Prophet ﷺ deeply anxious walking the mountains.',
    howItWasRevealed:
      'Hearing a voice from the sky, he looked up and saw the exact Angel from Hira seated on a throne between heaven and earth. Hurrying home saying "Wrap me in a cloak!", these verses came calling him to arise and warn.',
    exactWisdomAndRuling:
      'Al-‘Alaq commissioned him a Prophet; Al-Muddaththir commissioned him an active Messenger purifying outward clothes, inward heart, and society.',
    hadithProof: {
      source: 'Sahih al-Bukhari 4 & 4925',
      narrator: 'Jabir ibn Abdullah (RA)',
      textEnglish: 'Jabir confirmed the Prophet ﷺ described seeing Jibril upon a throne between heaven and earth, wrapping up at home, whereupon "O you who wraps himself! Arise and warn!" descended.',
    },
  },
  {
    id: 'asbab-duha-93',
    surahNumber: 93,
    ayahNumber: 1,
    ayahRangeLabel: '93:1–11',
    surahName: 'Ad-Duha',
    era: 'Makki',
    yearOrMoment: 'Early Makkan Years',
    category: 'revelation_origin',
    title: 'Divine Solace When Quraysh Mocked Revelation’s Pause',
    whatWasHappeningBefore:
      'When two or three nights passed without new revelation while the Prophet ﷺ was unwell, mockers (including Umm Jamil, Abu Lahab’s wife) taunted: "Your devil/companion has forsaken you!"',
    howItWasRevealed:
      'Allah swore by bright morning light and tranquil night—"Your Lord has neither forsaken you nor detests you!"—reminding him of past orphan care and promising an even greater Hereafter.',
    exactWisdomAndRuling:
      'Teaches believers that spiritual dry spells are never rejection; recall past blessings and never oppress an orphan or turn away a sincere petitioner.',
    hadithProof: {
      source: 'Sahih al-Bukhari 4950',
      narrator: 'Jundub ibn Sufyan (RA)',
      textEnglish: 'A woman mocked the Prophet ﷺ when revelation paused briefly for two or three nights—whereupon "By the morning brightness... your Lord has not forsaken you" was revealed.',
    },
  },
  {
    id: 'asbab-masad-111',
    surahNumber: 111,
    ayahNumber: 1,
    ayahRangeLabel: '111:1–5',
    surahName: 'Al-Masad',
    era: 'Makki',
    yearOrMoment: '613 CE · Mount Safa Proclamation',
    category: 'creed',
    title: 'Response to Abu Lahab’s Outburst at Mount Safa',
    whatWasHappeningBefore:
      'Receiving Surah 26:214 ("Warn your closest kin"), the Prophet ﷺ gathered every Quraysh clan on Mount Safa. Even after testifying he never lied, his own uncle Abu Lahab cursed: "May you perish! Is this why you gathered us?"',
    howItWasRevealed:
      'Immediately Surah Al-Masad descended declaring Abu Lahab’s own hands and wealth helpless against Allah’s justice.',
    exactWisdomAndRuling:
      'A striking historical miracle: declared years before Abu Lahab died that he would never accept Islam—despite daily opportunity to pretend just to disprove it, he never did!',
    hadithProof: {
      source: 'Sahih al-Bukhari 4770',
      narrator: 'Abdullah ibn Abbas (RA)',
      textEnglish: 'Records the exact dialogue at Mount Safa ending with Abu Lahab’s curse and the immediate descent of "Perish the hands of Abu Lahab!"',
    },
  },
  {
    id: 'asbab-ikhlas-112',
    surahNumber: 112,
    ayahNumber: 1,
    ayahRangeLabel: '112:1–4',
    surahName: 'Al-Ikhlas',
    era: 'Makki',
    yearOrMoment: 'Early-Mid Makkan Era',
    category: 'creed',
    title: 'Answering "Describe the Lineage of Your Lord!"',
    whatWasHappeningBefore:
      'Polytheists approached the Prophet ﷺ demanding: "Tell us the genealogy/nature of your Lord—is He gold, silver, or descended from anyone?"',
    howItWasRevealed:
      'Surah Al-Ikhlas descended defining Allah’s absolute uniqueness in four concise, crystal sentences: One (Ahad), Eternal Refuge (As-Samad), neither begetting nor begotten, comparable to nothing.',
    exactWisdomAndRuling:
      'Equals one-third of the Quran in reward because a full third of the Quran establishes pure Creed (Tawhid).',
    hadithProof: {
      source: 'Sahih al-Bukhari 5013 & Jami‘ at-Tirmidhi 3364 (Sahih)',
      narrator: 'Ubayy ibn Ka‘b & Abu Sa‘id al-Khudri (RA)',
      textEnglish: 'Records polytheists asking for the Prophet’s Lord’s lineage before Al-Ikhlas descended—and the Prophet ﷺ confirming Al-Ikhlas equals one-third of the Quran.',
    },
  },
  {
    id: 'asbab-kafirun-109',
    surahNumber: 109,
    ayahNumber: 1,
    ayahRangeLabel: '109:1–6',
    surahName: 'Al-Kafirun',
    era: 'Makki',
    yearOrMoment: 'Mid-Makkan Negotiations',
    category: 'creed',
    title: 'Rejecting Religious Compromise Without Coercion',
    whatWasHappeningBefore:
      'Wealthy Quraysh leaders proposed a "peace deal": "Worship our idols for one year, and we will worship your God Allah for one year!"',
    howItWasRevealed:
      'Surah Al-Kafirun drew an unbreakable line separating pure worship from idolatry—ending with "To you be your religion, and to me my religion."',
    exactWisdomAndRuling:
      'Monotheism admits zero partnership, while coexistence prohibits forced conversion ("There is no compulsion in religion").',
    hadithProof: {
      source: 'Sahih Muslim 376 & 811',
      narrator: 'Abu Hurayrah & Jabir (RA)',
      textEnglish: 'The Prophet ﷺ regularly recited Al-Kafirun and Al-Ikhlas in the two Sunnah units before Fajr and after Tawaf to renew pure Tawhid daily.',
    },
  },
  {
    id: 'asbab-isra-baqarah-end',
    surahNumber: 2,
    ayahNumber: 285,
    ayahRangeLabel: '17:1 & 2:285–286',
    surahName: 'Al-Baqarah (Final 2 Verses)',
    era: 'Makki',
    yearOrMoment: '621 CE · Night of Al-Mi‘raj',
    category: 'worship_law',
    title: 'Given Directly Beneath Sidrat al-Muntaha Without Angel',
    whatWasHappeningBefore:
      'Every other verse of the Quran descended on Earth via Jibril—yet in the darkest hour after the Year of Sorrow and Ta’if, Allah raised His Messenger ﷺ above the seventh heaven.',
    howItWasRevealed:
      'Inside the highest realm beside Sidrat al-Muntaha, Allah granted three unique gifts: the 5 daily prayers, forgiveness for all sins short of shirk, and directly revealed the concluding two verses of Surah Al-Baqarah.',
    exactWisdomAndRuling:
      'Declares Allah never burdens any soul beyond its capacity and forgives forgetful mistakes—reciting 2:285–286 at night suffices for protection!',
    hadithProof: {
      source: 'Sahih Muslim 173 & Sahih al-Bukhari 5009',
      narrator: 'Abdullah ibn Mas‘ud & Abu Mas‘ud (RA)',
      textEnglish: '"The Messenger of Allah ﷺ was given three things [during Al-Mi‘raj]: the five prayers, the concluding verses of Surah Al-Baqarah, and forgiveness of major sins for whoever does not associate anything with Allah."',
    },
  },
  {
    id: 'asbab-hajj-22-39',
    surahNumber: 22,
    ayahNumber: 39,
    ayahRangeLabel: '22:39–40',
    surahName: 'Al-Hajj',
    era: 'Madani',
    yearOrMoment: '1 AH · Arrival in Madinah',
    category: 'battle_crisis',
    title: 'The Very First Verse Ever Permitting Self-Defense',
    whatWasHappeningBefore:
      'For 13 full years in Makkah, believers were commanded strictly: "Hold back your hands and establish prayer!" Even when dragged on coals or driven out of homes, armed retaliation was forbidden.',
    howItWasRevealed:
      'Only after believers were expelled from their homes solely for saying "Our Lord is Allah," Allah revealed 22:39 granting permission to resist oppression—and safeguarding mosques, monasteries, synagogues, and churches.',
    exactWisdomAndRuling:
      'Defense in Islam came strictly as protection for victims of aggression and freedom of conscience—never unprovoked conquest.',
    hadithProof: {
      source: 'Jami‘ at-Tirmidhi 3171 & Al-Mustadrak (Sahih per Ibn Abbas)',
      narrator: 'Abdullah ibn Abbas (RA)',
      textEnglish: 'Ibn Abbas testified: When the Prophet ﷺ left Makkah, Abu Bakr sighed "They drove out their Prophet! Surely they are ruined." Then "Permission is granted to those who are being fought because they were wronged" descended.',
    },
  },
  {
    id: 'asbab-qiblah-2-144',
    surahNumber: 2,
    ayahNumber: 144,
    ayahRangeLabel: '2:142–144',
    surahName: 'Al-Baqarah',
    era: 'Madani',
    yearOrMoment: '2 AH · Rajab / Sha‘ban (Madinah)',
    category: 'worship_law',
    title: 'Changing the Qiblah Mid-Prayer Toward Makkah',
    whatWasHappeningBefore:
      'After arriving in Madinah, believers prayed toward Bayt al-Maqdis (Jerusalem) for 16–17 months, while the Prophet ﷺ glanced yearningly skyward hoping Allah would turn prayer back toward Ibrahim’s Ka‘bah.',
    howItWasRevealed:
      'Mid-afternoon prayer inside Masjid Bani Salamah (Masjid Qiblatayn), revelation descended commanding: "Turn your face toward Al-Masjid al-Haram!" Immediately, the congregation rotated 180 degrees mid-Salah!',
    exactWisdomAndRuling:
      'Also answered believers worrying about companions who passed away praying toward Jerusalem earlier: Allah comforted them with 2:143 ("Allah would never cause your faith/prayers to go to waste").',
    hadithProof: {
      source: 'Sahih al-Bukhari 40 & 4486',
      narrator: 'Al-Bara ibn Azib (RA)',
      textEnglish: 'Confirmed praying 16–17 months toward Jerusalem before the Qiblah shifted to the Ka‘bah—and assured companions that earlier prayers of deceased Muslims remained fully accepted.',
    },
  },
  {
    id: 'asbab-ramadan-2-187',
    surahNumber: 2,
    ayahNumber: 187,
    ayahRangeLabel: '2:183–187',
    surahName: 'Al-Baqarah',
    era: 'Madani',
    yearOrMoment: '2 AH · Ramadan Legislation',
    category: 'worship_law',
    title: 'How Nighttime Eating & Family Mercy During Ramadan Were Eased',
    whatWasHappeningBefore:
      'Initially during Ramadan, fasting believers thought once someone fell asleep after sunset, they could no longer eat, drink, or approach spouses until the next Maghrib—causing severe fainting (like tired farmer Qays ibn Sirmah al-Ansari collapsing at midday).',
    howItWasRevealed:
      'Surah Al-Baqarah 2:187 came down explicitly easing the rule: eating, drinking, and lawful intimacy are blessed all night straight until the white thread of Fajr dawn becomes distinct from the black thread of night!',
    exactWisdomAndRuling:
      'Even comedic human honesty shines in Sahih Hadith: companion Adi ibn Hatim initially placed a literal black and white string under his pillow looking for light until the Prophet ﷺ chuckled explaining it means night’s darkness and dawn’s light!',
    hadithProof: {
      source: 'Sahih al-Bukhari 1915 & 1916',
      narrator: 'Al-Bara ibn Azib & Adi ibn Hatim (RA)',
      textEnglish: 'Narrates Qays ibn Sirmah fainting after falling asleep before Iftar, Adi placing literal black and white threads under his pillow, and 2:187 bringing eternal ease to Ramadan nights.',
    },
  },
  {
    id: 'asbab-anfal-badr-8',
    surahNumber: 8,
    ayahNumber: 1,
    ayahRangeLabel: '8:1 & 8:9–12',
    surahName: 'Al-Anfal',
    era: 'Madani',
    yearOrMoment: '2 AH · Ramadan 17 (Badr)',
    category: 'battle_crisis',
    title: 'Answering Spoils Dispute & Revealing 1,000 Angels at Badr',
    whatWasHappeningBefore:
      'Right after Badr’s astonishing victory, older guards who protected the Prophet’s shelter and younger pursuers argued gently over how captured battlefield property should be shared.',
    howItWasRevealed:
      'Surah Al-Anfal descended immediately reminding everyone all property belongs to Allah & His Messenger, ordering believers to mend ties among themselves first, and reminding them how Allah answered their desperate midnight du‘a with rain and 1,000 angels.',
    exactWisdomAndRuling:
      'Established disciplined ethical distribution of state revenue (4/5th combatants + 1/5th poor, orphans, travelers) ending chaotic tribal pillaging.',
    hadithProof: {
      source: 'Sahih Muslim 1749 & Sunan Abi Dawud 2737 (Sahih)',
      narrator: 'Ubadah ibn al-Samit & Sa‘d ibn Abi Waqqas (RA)',
      textEnglish: 'Ubadah affirmed Surah Al-Anfal came down regarding our dispute after Badr—until the Prophet ﷺ reconciled hearts completely and distributed justice equally.',
    },
  },
  {
    id: 'asbab-alcohol-5-90',
    surahNumber: 5,
    ayahNumber: 90,
    ayahRangeLabel: '5:90–91',
    surahName: 'Al-Ma’idah',
    era: 'Madani',
    yearOrMoment: '4–6 AH · Final Stage of Prohibition',
    category: 'worship_law',
    title: 'How Alcohol Was Forbidden Gradually & Poured Into Madinah Streets',
    whatWasHappeningBefore:
      'Deeply ingrained across pre-Islamic Arab culture, drinking was dismantled wisely in four careful stages—first praising wholesome dates (16:67), then warning harm outweighs benefit (2:219), then banning intoxication near prayer (4:43) after someone misread Surah Al-Kafirun!',
    howItWasRevealed:
      'When Umar (RA) repeatedly prayed "O Allah, give us a crystal-clear verdict on wine!", Surah 5:90–91 came declaring intoxicants and gambling abominations of Satan and commanding: "Will you not then abstain?" Hearing that, Umar cried: "We have abstained, O Lord!"',
    exactWisdomAndRuling:
      'Anas (RA) was serving date-wine in Abu Talhah’s home when a town crier shouted in the alley that wine had been forbidden; immediately he smashed and emptied every jar so streams flowed in Madinah’s lanes without one moment of hesitation!',
    hadithProof: {
      source: 'Sahih al-Bukhari 2464 & Jami‘ at-Tirmidhi 3049 (Sahih)',
      narrator: 'Anas ibn Malik & Umar ibn al-Khattab (RA)',
      textEnglish: 'Anas said no one lingered to finish their cup—when the announcement sounded, they smashed the wine jars immediately.',
    },
  },
  {
    id: 'asbab-ifk-an-nur-24',
    surahNumber: 24,
    ayahNumber: 11,
    ayahRangeLabel: '24:11–21',
    surahName: 'An-Nur',
    era: 'Madani',
    yearOrMoment: '5 AH · After Al-Muraysi‘',
    category: 'character_justice',
    title: 'Thirty Days of Heartbreak Clearing Aishah (RA)',
    whatWasHappeningBefore:
      'Returning from Al-Muraysi‘, Aishah’s (RA) camel litter was lifted without realizing she stepped away looking for a lost necklace; Safwan ibn al-Mu‘attal escorted her safely back—prompting hypocrite Abdullah ibn Ubayy to ignite cruel slander across Madinah.',
    howItWasRevealed:
      'Heartbroken for a full month without revelation, the Prophet ﷺ visited Abu Bakr’s home gently urging clarity. Young Aishah wept saying she could only say like Prophet Ya‘qub "Sabrun Jamil." Suddenly revelation descended upon the Prophet ﷺ right there; when it lifted, he smiled wiping sweat from his brow in cold weather: "Good news, O Aishah! Allah has declared your complete innocence!"',
    exactWisdomAndRuling:
      'Established strict Islamic law forbidding gossip and requiring four eyewitnesses before anyone’s honor may be touched—instituting an 80-lash penalty for slander.',
    hadithProof: {
      source: 'Sahih al-Bukhari 4141 & 4750',
      narrator: 'Aishah (RA)',
      textEnglish: 'One of the longest, most moving narrations in Sahih al-Bukhari detailing her 30 days of tears and the exact moment Surah An-Nur cleared her name forever.',
    },
  },
  {
    id: 'asbab-women-ahzab-33-35',
    surahNumber: 33,
    ayahNumber: 35,
    ayahRangeLabel: '33:35',
    surahName: 'Al-Ahzab',
    era: 'Madani',
    yearOrMoment: '5 AH · Madinah',
    category: 'character_justice',
    title: 'Umm Salamah Asking Why Quran Addressed Men—And Immediate Answer',
    whatWasHappeningBefore:
      'Mother of the Believers Umm Salamah (RA) respectfully asked the Prophet ﷺ: "Why are men frequently addressed in Quranic virtues while women are not mentioned explicitly?"',
    howItWasRevealed:
      'While combing her hair, Umm Salamah heard the Prophet ﷺ call from the pulpit reciting the newly revealed 33:35—repeating ten spiritual ranks equally for "Muslim men and Muslim women, believing men and believing women, truthful, patient, charitable, fasting, and remembering men and women!"',
    exactWisdomAndRuling:
      'Permanently settled complete spiritual equality of reward and dignity between women and men before Allah.',
    hadithProof: {
      source: 'Jami‘ at-Tirmidhi 3211 & Musnad Ahmad (Sahih)',
      narrator: 'Umm Salamah (RA)',
      textEnglish: 'Umm Salamah dropped everything while her hair was being dressed and ran to listen in joy as 33:35 honored believing men and women equally across every single virtue.',
    },
  },
  {
    id: 'asbab-fath-hudaybiyyah-48',
    surahNumber: 48,
    ayahNumber: 1,
    ayahRangeLabel: '48:1–29',
    surahName: 'Al-Fath',
    era: 'Madani',
    yearOrMoment: '6 AH · Road Back From Hudaybiyyah',
    category: 'battle_crisis',
    title: 'Proclaiming "Clear Victory" While Companions Felt Sad',
    whatWasHappeningBefore:
      'Halted outside Makkah after agreeing to a 10-year truce with tough concessions, companions returned heavy-hearted—some asking why they hadn’t entered the Ka‘bah yet.',
    howItWasRevealed:
      'Riding between Makkah and Madinah, Surah Al-Fath descended declaring: "Indeed, We have given you a Clear Victory!" The Prophet ﷺ exclaimed joyfully to Umar: "A Surah dearer to me than everything upon which the sun rises has just been revealed to me!"',
    exactWisdomAndRuling:
      'Teaches believers not to misread apparent short-term compromise as defeat when strategic peace opens doors to massive long-term success.',
    hadithProof: {
      source: 'Sahih al-Bukhari 4177 & 4833',
      narrator: 'Umar ibn al-Khattab & Anas ibn Malik (RA)',
      textEnglish: 'Umar recounted how heavy-hearted he was at Hudaybiyyah until summoned excitedly by the Prophet ﷺ who recited the newly revealed opening of Surah Al-Fath.',
    },
  },
  {
    id: 'asbab-mujadilah-58',
    surahNumber: 58,
    ayahNumber: 1,
    ayahRangeLabel: '58:1–4',
    surahName: 'Al-Mujadilah',
    era: 'Madani',
    yearOrMoment: 'Mid-Madinan Period',
    category: 'character_justice',
    title: 'Allah Hearing Khawlah’s Whisper Above Seven Heavens',
    whatWasHappeningBefore:
      'An older Madinan woman, Khawlah bint Tha‘labah (RA), wept quietly complaining to the Prophet ﷺ inside Aishah’s small room that her husband had pronounced a pre-Islamic Zihar oath ("You are to me like my mother’s back") leaving her and her little children abandoned.',
    howItWasRevealed:
      'Even though Aishah (RA) sat right in the corner of the same room unable to hear all of Khawlah’s soft whispered words, Allah immediately revealed Surah Al-Mujadilah: "Indeed Allah has heard the speech of the woman who disputes with you concerning her husband!"—outlawing Zihar forever.',
    exactWisdomAndRuling:
      'Aishah (RA) marveled: "Blessed be He Whose hearing encompasses every whisper—I couldn’t hear parts of her voice in the same room, yet Allah heard and answered from above seven heavens!"',
    hadithProof: {
      source: 'Sahih al-Bukhari (Book of Tawhid chapter heading) & Sunan Ibn Majah 2063 (Sahih)',
      narrator: 'Aishah (RA)',
      textEnglish: 'Records Aishah’s awe at Allah answering Khawlah’s quiet plea instantaneously from above the seven heavens.',
    },
  },
  {
    id: 'asbab-kaffarah-tabuk-9-118',
    surahNumber: 9,
    ayahNumber: 118,
    ayahRangeLabel: '9:117–118',
    surahName: 'At-Tawbah',
    era: 'Madani',
    yearOrMoment: '9 AH · Fifty Days After Tabuk',
    category: 'character_justice',
    title: 'Ka‘b ibn Malik’s Sincere 50-Day Repentance Accepted at Dawn',
    whatWasHappeningBefore:
      'While 80 hypocrites invented fluent excuses for missing Tabuk, faithful poet Ka‘b ibn Malik, Murarah, and Hilal stood before the Prophet ﷺ and admitted simply: "I had no excuse whatsoever—I stayed behind out of delay." For 50 days they wept and no one spoke to them, even rejecting a flattering letter from the Christian Ghassanid king offering shelter!',
    howItWasRevealed:
      'At Fajr on the 50th morning while praying on his rooftop feeling the vast Earth tighten around him, Surah At-Tawbah 9:118 descended accepting their repentance—a rider galloped shouting "Rejoice, O Ka‘b!" so loudly that another messenger’s voice echoed from Mount Sal‘!',
    exactWisdomAndRuling:
      'Ka‘b vowed never to speak anything except pure truthfulness for the rest of his life—proving honesty during failure still saves a believer.',
    hadithProof: {
      source: 'Sahih al-Bukhari 4418 & Sahih Muslim 2769',
      narrator: 'Ka‘b ibn Malik (RA)',
      textEnglish: 'One of the richest personal repentance narratives in Sahih al-Bukhari, culminating in the Prophet’s ﷺ radiant smile like the full moon announcing Allah accepted their Tawbah.',
    },
  },
  {
    id: 'asbab-maidah-5-3-final',
    surahNumber: 5,
    ayahNumber: 3,
    ayahRangeLabel: '5:3 & 2:281',
    surahName: 'Al-Ma’idah & Al-Baqarah',
    era: 'Madani',
    yearOrMoment: '10 AH (Arafat) & 11 AH (Final Nights)',
    category: 'revelation_origin',
    title: 'Perfection of the Religion & The Last Verse Before Passing',
    whatWasHappeningBefore:
      'Standing among over 100,000 believers on Friday evening, 9 Dhul-Hijjah 10 AH at Arafat, after 22+ years of tireless struggle.',
    howItWasRevealed:
      'Allah sent down 5:3 sealing the Din completely ("Today I have perfected your religion..."). Months later, barely nine nights before passing in Rabi al-Awwal 11 AH, 2:281 descended as the closing moral reminder of accountability before Allah.',
    exactWisdomAndRuling:
      'Even a Jewish scholar later told Caliph Umar (RA): "Had this verse (5:3) descended upon us, we would have marked that day a festival!" Umar replied: "We already know the exact day & place it came—Friday on Arafat!"',
    hadithProof: {
      source: 'Sahih al-Bukhari 45 & 4544',
      narrator: 'Umar ibn al-Khattab & Abdullah ibn Abbas (RA)',
      textEnglish: 'Confirms both the exact Friday-at-Arafat context of 5:3 and Ibn Abbas’s testimony regarding Al-Baqarah 2:281 as the final verse revealed.',
    },
  },
];

export const GRADUAL_REVELATION_SERIES: GradualRevelationSeries[] = [
  {
    id: 'gradual-khamr',
    title: 'How Alcohol Was Prohibited in Four Compassionate Stages',
    subtitle: 'Quranic psychology transforming deeply entrenched social habits step by step without fracturing early community',
    whyGradual:
      'Aishah (RA) explained in Sahih al-Bukhari 4993: "Had the first verse come saying Do not drink wine, people would have replied: We will never leave wine! So Allah first grounded hearts in Paradise, Hell, and Creed for 13 years before gradually prohibiting intoxicants."',
    steps: [
      {
        stageNumber: 1,
        stageLabel: 'Stage 1 · Gentle Contrast (Makki)',
        timeframe: 'Makkan Period',
        surahNumber: 16,
        ayahNumber: 67,
        ayahRangeLabel: 'Surah An-Nahl 16:67',
        situationAndTrigger: 'Subtle distinction between wholesome provision and fermented drink.',
        rulingEstablished:
          'Contrasts pure nutrition with "intoxicant vs good provision (rizqan hasana)"—planting quiet reflection without yet imposing legal ban.',
      },
      {
        stageNumber: 2,
        stageLabel: 'Stage 2 · Weighing Harm vs Benefit',
        timeframe: 'Early Madinah (c. 2–3 AH)',
        surahNumber: 2,
        ayahNumber: 219,
        ayahRangeLabel: 'Surah Al-Baqarah 2:219',
        situationAndTrigger: 'Umar & Mu‘adh asked directly about wine and gambling.',
        rulingEstablished:
          '"In them is great sin and some worldly benefit, yet their sin far outweighs their benefit." Many pious companions quit right here.',
      },
      {
        stageNumber: 3,
        stageLabel: 'Stage 3 · Restricted Outside Prayer Hours',
        timeframe: 'Mid-Madinah (c. 4 AH)',
        surahNumber: 4,
        ayahNumber: 43,
        ayahRangeLabel: 'Surah An-Nisa 4:43',
        situationAndTrigger: 'After a host’s meal, an intoxicated worshipper misread Surah Al-Kafirun during Maghrib prayer.',
        rulingEstablished:
          '"Do not approach prayer while intoxicated until you know what you are saying!" Since 5 prayers span the day, drinking narrowed drastically.',
      },
      {
        stageNumber: 4,
        stageLabel: 'Stage 4 · Total Permanent Ban',
        timeframe: 'c. 5–6 AH (Madinah)',
        surahNumber: 5,
        ayahNumber: 90,
        ayahRangeLabel: 'Surah Al-Ma’idah 5:90–91',
        situationAndTrigger: 'Social enmity triggered between tipsy companions; Umar’s plea for final clarity.',
        rulingEstablished:
          'Total unconditional prohibition—prompting companions across Madinah to pour out every wine barrel immediately (Bukhari 2464).',
        hadithNote: 'Sahih al-Bukhari 2464 & Abu Dawud 3670',
      },
    ],
  },
  {
    id: 'gradual-self-defense',
    title: 'How Armed Self-Defense Was Permitted Across Four Measured Phases',
    subtitle: 'From non-violent Makkan patience to defensive treaties and strict humanitarian ethics',
    whyGradual:
      'In Makkah, fragile believers could have been wiped out completely if they fought back individually; permission evolved responsibly only once a state formed in Madinah.',
    steps: [
      {
        stageNumber: 1,
        stageLabel: 'Stage 1 · Restraint & Wise Da‘wah',
        timeframe: '610 – 622 CE (13 Makkan Years)',
        surahNumber: 16,
        ayahNumber: 125,
        ayahRangeLabel: 'Surah An-Nahl 16:125 & An-Nisa 4:77',
        situationAndTrigger: 'Tortured converts begged permission to strike persecutors back in Makkah.',
        rulingEstablished:
          'Strict command: withhold hands, endure with patience, establish Salah, and preach with wisdom and kind dialogue.',
      },
      {
        stageNumber: 2,
        stageLabel: 'Stage 2 · Defensive Permission Granted',
        timeframe: '1 AH (Upon Reaching Madinah)',
        surahNumber: 22,
        ayahNumber: 39,
        ayahRangeLabel: 'Surah Al-Hajj 22:39–40',
        situationAndTrigger: 'Exiled from ancestral homes while Quraysh threatened to pursue and destroy Madinah.',
        rulingEstablished:
          '"Permission is given to those fought because they were wronged"—protecting houses of worship and oppressed families.',
      },
      {
        stageNumber: 3,
        stageLabel: 'Stage 3 · Non-Aggression & Limits',
        timeframe: '2 AH (Leading into Badr)',
        surahNumber: 2,
        ayahNumber: 190,
        ayahRangeLabel: 'Surah Al-Baqarah 2:190–193',
        situationAndTrigger: 'Organizing Madinah’s defense while protecting civilians and sanctuaries.',
        rulingEstablished:
          '"Fight those who fight you, and do NOT transgress! If they incline to peace, incline to it (8:61)." Women, children, elders, and clergy remain untouched.',
      },
      {
        stageNumber: 4,
        stageLabel: 'Stage 4 · Enforcing Broken Pacts',
        timeframe: '9 AH (After Quraysh Violated Truce)',
        surahNumber: 9,
        ayahNumber: 12,
        ayahRangeLabel: 'Surah At-Tawbah 9:12–13',
        situationAndTrigger: 'Hostile clans repeatedly breaking signed safety treaties and attacking allies.',
        rulingEstablished:
          'Honors loyal peace treaties strictly until completion (9:4), holding only treacherous oath-breakers accountable.',
        hadithNote: 'Sahih Muslim 1731 (Rules banning harm to non-combatants)',
      },
    ],
  },
  {
    id: 'gradual-quran-preservation',
    title: 'How the Entire Quran Was Preserved in Three Historical Stages',
    subtitle: 'Why not a single letter was lost between Cave Hira (610 CE) and every Mushaf on Earth today',
    whyGradual:
      'Unlike prior scriptures guarded by tiny clerical classes, Allah preserved the Quran across dual simultaneous tracks: mass living human memory (Huffaz) AND verified written documentation.',
    steps: [
      {
        stageNumber: 1,
        stageLabel: 'Stage 1 · Prophetic Scribes & Double Review',
        timeframe: '610 – 632 CE (23 Years)',
        surahNumber: 75,
        ayahNumber: 16,
        ayahRangeLabel: 'Surah Al-Qiyamah 75:16–19',
        situationAndTrigger: 'Every time verses descended, scribes (Zayd, Ubayy, Ali, Mu‘awiyah) wrote them before the Prophet ﷺ and specified exact placement.',
        rulingEstablished:
          'Jibril reviewed the entire Quran with the Prophet ﷺ every Ramadan—and twice in his final Ramadan 10 AH (Sahih al-Bukhari 4998).',
      },
      {
        stageNumber: 2,
        stageLabel: 'Stage 2 · Abu Bakr’s Master Sheets After Yamamah',
        timeframe: '12 AH (633 CE)',
        surahNumber: 15,
        ayahNumber: 9,
        ayahRangeLabel: 'Surah Al-Hijr 15:9',
        situationAndTrigger: '70+ Quran memorizers martyred fighting false prophet Musaylimah at the Battle of Yamamah.',
        rulingEstablished:
          'Umar urged Caliph Abu Bakr to commission lead scribe Zayd ibn Thabit (RA) to gather every written leaf + two witnesses + memorized confirmation into one master volume (Suhuf), kept with Hafsah (RA).',
        hadithNote: 'Sahih al-Bukhari 4986',
      },
      {
        stageNumber: 3,
        stageLabel: 'Stage 3 · Uthman’s Standardized Master Copies',
        timeframe: '25 AH (646 CE)',
        surahNumber: 54,
        ayahNumber: 17,
        ayahRangeLabel: 'Surah Al-Qamar 54:17',
        situationAndTrigger: 'Hudhayfah ibn al-Yaman warned Caliph Uthman of non-Arab soldiers arguing over regional pronunciation variants in Azerbaijan/Armenia.',
        rulingEstablished:
          'Using Abu Bakr’s original sheets held by Hafsah (RA), Zayd’s 4-man committee transcribed unified Mushafs sent to every Muslim capital with certified reciters.',
        hadithNote: 'Sahih al-Bukhari 4987',
      },
    ],
  },
];
