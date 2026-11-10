import { Ayah, SurahDetail } from '../types/quran';

export interface ThematicParagraph {
  id: string;
  surahNumber: number;
  fromAyah: number;
  toAyah: number;
  topicTitle: string; // e.g. "Order to Worship God Alone"
  topicQuestion: string; // e.g. "Why is Allah alone worthy of all human devotion and gratitude?"
  ayahs: Ayah[];
  keyTheme?: string;
}

export interface ThematicSlidePage {
  id: string;
  pageIndex: number;
  fromAyah: number;
  toAyah: number;
  paragraphs: ThematicParagraph[];
  allAyahs: Ayah[];
  primaryTopicTitle: string;
}

interface CuratedThemeRule {
  from: number;
  to: number;
  title: string;
  question: string;
  keyTheme?: string;
}

// Curated thematic paragraphs matching classical exegeses & thematic Quran structures
const CURATED_SURAH_THEMES: Record<number, CuratedThemeRule[]> = {
  // Surah 1: Al-Fatihah
  1: [
    {
      from: 1,
      to: 4,
      title: 'Praise of the Lord of Mercy and Sovereign of Judgment',
      question: 'Who is Allah and how do we cultivate deep gratitude and awe of His eternal majesty?',
      keyTheme: 'Tawheed & Divine Attributes',
    },
    {
      from: 5,
      to: 5,
      title: 'The Solemn Covenant of Devotion and Ultimate Reliance',
      question: 'Where do we direct all our prayers, and from Whom alone do we seek true help and refuge?',
      keyTheme: 'Exclusivity in Worship (Ibadah & Isti\'ana)',
    },
    {
      from: 6,
      to: 7,
      title: 'The Universal Prayer for the Straight Path',
      question: 'What is the Straight Path, and how are we preserved from incurring anger or going astray?',
      keyTheme: 'Guidance (Sirat al-Mustaqeem)',
    },
  ],

  // Surah 2: Al-Baqarah (The Cow) - Matches exact thematic sections shown in reference
  2: [
    {
      from: 1,
      to: 5,
      title: 'Qualities of the Mindful Believers',
      question: 'What are the defining spiritual traits of those who attain true divine guidance and ultimate success?',
      keyTheme: 'The Righteous (Al-Muttaqoon)',
    },
    {
      from: 6,
      to: 7,
      title: 'Those Who Persist in Denial',
      question: 'Why do stubborn hearts become sealed against spiritual warnings and divine truth?',
      keyTheme: 'Spiritual Blindness (Kufr)',
    },
    {
      from: 8,
      to: 16,
      title: 'The Anatomy of Hypocrisy',
      question: 'How do hypocrites deceive themselves while claiming they are only bringing peace and reformation?',
      keyTheme: 'Hypocrisy (Nifaq)',
    },
    {
      from: 17,
      to: 18,
      title: 'The Parable of the Extinguished Fire',
      question: 'What happens to those who catch a fleeting spark of truth only to trade it away for utter darkness?',
      keyTheme: 'The Parable of Lost Light',
    },
    {
      from: 19,
      to: 20,
      title: 'Another Example: The Terrifying Storm',
      question: 'How do the hesitant and fearful react when thunderclaps and lightning strike during trials?',
      keyTheme: 'Fear and Vacillation in Faith',
    },
    {
      from: 21,
      to: 22,
      title: 'Order to Worship God Alone',
      question: 'Why is Allah alone worthy of all human worship, and what are His immense physical provisions for us?',
      keyTheme: 'Monotheism & Cosmic Sustenance',
    },
    {
      from: 23,
      to: 24,
      title: 'The Challenge of the Quran',
      question: 'Can all of humanity and their helpers produce even a single chapter comparable to the Quran?',
      keyTheme: 'The Miraculous Inimitability of the Quran',
    },
    {
      from: 25,
      to: 25,
      title: 'Reward of the Believers',
      question: 'What eternal joy, pristine gardens with flowing rivers, and pure companions await the righteous?',
      keyTheme: 'Paradise & Eternal Bliss',
    },
    {
      from: 26,
      to: 27,
      title: 'Wisdom Behind Parables',
      question: 'Why does God not shy away from using the parable of a mosquito or something smaller to guide the sincere?',
      keyTheme: 'Divine Wisdom in Similitudes',
    },
    {
      from: 28,
      to: 29,
      title: 'God\'s Creation and the Origin of Life',
      question: 'How can any mortal deny God after being granted existence from lifelessness and given seven heavens?',
      keyTheme: 'Creation & Resurrection',
    },
    {
      from: 30,
      to: 34,
      title: 'Honouring Adam & Humanity\'s Stewardship',
      question: 'Why did God designate humanity as stewards upon earth and command the angels to prostrate to Adam?',
      keyTheme: 'Human Origin & The Heavenly Mandate',
    },
    {
      from: 35,
      to: 39,
      title: 'The Garden Test, Temptation, and Forgiveness',
      question: 'How did Adam and Eve seek repentance after the slip, and what words of guidance did God bestow?',
      keyTheme: 'Repentance and Divine Mercy',
    },
    {
      from: 40,
      to: 48,
      title: 'The Call to the Children of Israel to Fulfill the Covenant',
      question: 'How does God summon communities of scripture to embrace truth without bartering it for petty gain?',
      keyTheme: 'Covenant & Integrity',
    },
    {
      from: 255,
      to: 255,
      title: 'Ayat al-Kursi: The Throne of Divine Majesty',
      question: 'What makes this the greatest verse in the Quran, affirming absolute sovereignty, life, and knowledge?',
      keyTheme: 'The Supreme Verse of Monotheism',
    },
    {
      from: 256,
      to: 257,
      title: 'No Compulsion in Religion and the Unbreakable Handhold',
      question: 'How has clear truth been distinctly distinguished from falsehood, and who is the true Protector?',
      keyTheme: 'Spiritual Freedom & Light',
    },
    {
      from: 284,
      to: 286,
      title: 'The Climax: Comprehensive Faith and Supplication',
      question: 'What nocturnal supplications did the Prophet (ﷺ) state are sufficient for every human need and trial?',
      keyTheme: 'Forgiveness, Mercy, and Victory',
    },
  ],

  // Surah 36: Ya-Sin (Heart of the Quran)
  36: [
    {
      from: 1,
      to: 6,
      title: 'The Wisdom of Revelation and the Prophetic Mission',
      question: 'Why was the Noble Messenger sent with a decisive Book to awaken heedless communities?',
      keyTheme: 'Prophethood & Divine Warning',
    },
    {
      from: 7,
      to: 12,
      title: 'Spiritual Obstinacy and the Eternal Record of Deeds',
      question: 'How are human footsteps, deeds, and legacies permanently inscribed in the Clear Ledger?',
      keyTheme: 'Accountability & The Ledger',
    },
    {
      from: 13,
      to: 19,
      title: 'The Parable of the City and the Envoys of Truth',
      question: 'Why do arrogant cities brand messengers of truth as omens of evil when warned of consequences?',
      keyTheme: 'Historical Parables & Denial',
    },
    {
      from: 20,
      to: 27,
      title: 'Habib the Believer: Courage in the Face of Tyranny',
      question: 'What inspired the believer from the outskirts of the town to declare faith and enter Paradise rejoicing?',
      keyTheme: 'Moral Courage & Martyrdom',
    },
    {
      from: 28,
      to: 32,
      title: 'The Tragic Regret of Heedless Generations',
      question: 'Why does humanity endlessly mock the callers to God before the sudden single cry of their demise?',
      keyTheme: 'The Vanishing World',
    },
    {
      from: 33,
      to: 36,
      title: 'Signs in the Earth and Bountiful Vegetation',
      question: 'How does lifeless, barren soil burst into grain, palm dates, and grapes by divine command?',
      keyTheme: 'Cosmic Proofs of Resurrection',
    },
    {
      from: 37,
      to: 40,
      title: 'The Celestial Dance of Sun, Moon, and Orbits',
      question: 'How do the sun and moon glide along their predetermined celestial paths without collision?',
      keyTheme: 'Cosmology & Perfect Order',
    },
    {
      from: 41,
      to: 44,
      title: 'The Sign of the Laden Ark upon the Oceans',
      question: 'Who carries heavy ships across turbulent waters and saves travelers from drowning by pure mercy?',
      keyTheme: 'Divine Preservation on the Seas',
    },
    {
      from: 45,
      to: 48,
      title: 'Heedlessness of Charity and the Hour of Judgment',
      question: 'Why do hardened souls refuse to spend on the needy while demanding: "When will this promise occur?"',
      keyTheme: 'Arrogance & Defiance',
    },
    {
      from: 49,
      to: 54,
      title: 'The Single Blast and the Awakening of the Graves',
      question: 'What occurs when the Trumpet sounds and mortals emerge from their resting places to face reality?',
      keyTheme: 'The Resurrection (Ba\'th)',
    },
    {
      from: 55,
      to: 58,
      title: 'The Peaceful Delights of the People of Paradise',
      question: 'What is the greatest greeting bestowed upon the righteous by the All-Merciful Lord?',
      keyTheme: 'Peace (Salam) in Paradise',
    },
    {
      from: 59,
      to: 65,
      title: 'The Separation of the Guilty and Limbs Bearing Witness',
      question: 'How will human hands speak and feet testify to deeds when mouths are sealed on the Day of Judgment?',
      keyTheme: 'Uncompromising Divine Justice',
    },
    {
      from: 66,
      to: 70,
      title: 'The Quran: A Pure Reminder for Living Hearts',
      question: 'Why is the Quran not poetry, but a vital clear warning meant to resurrect slumbering souls?',
      keyTheme: 'Living Revelation',
    },
    {
      from: 71,
      to: 76,
      title: 'The Blessing of Domesticated Livestock',
      question: 'Who subjugated cattle and animals for human nourishment, clothing, and transport?',
      keyTheme: 'Blessings & Ingratitude',
    },
    {
      from: 77,
      to: 83,
      title: 'The Supreme Answer to Resurrection and the Command "Be!"',
      question: 'Can He Who ignited green trees into burning fire and created the cosmos fail to recreate decayed bones?',
      keyTheme: 'The Absolute Decree: Kun fa-Yakun',
    },
  ],

  // Surah 55: Ar-Rahman (The Lord of Mercy)
  55: [
    {
      from: 1,
      to: 13,
      title: 'The Teaching of the Quran and the Scale of Justice',
      question: 'Which of the immense cosmic and spiritual favors of your Lord will you dare to deny?',
      keyTheme: 'Divine Generosity & The Cosmic Balance',
    },
    {
      from: 14,
      to: 25,
      title: 'Creation of Clay and Smokeless Fire, and the Two Seas',
      question: 'How do sweet and salty seas converge with a divine barrier preventing transgression?',
      keyTheme: 'Creation & Marine Splendor',
    },
    {
      from: 26,
      to: 30,
      title: 'All Creation Perishes; The Majestic Face of Allah Abides',
      question: 'What remains when all fleeting temporal life fades away?',
      keyTheme: 'Immortality of God Alone (Al-Baqi)',
    },
    {
      from: 31,
      to: 36,
      title: 'The Inescapable Domain of Heavens and Earth',
      question: 'Can humans or jinn pass beyond the bounds of the celestial zones without supreme divine power?',
      keyTheme: 'Human Vulnerability before Omnipotence',
    },
    {
      from: 37,
      to: 45,
      title: 'The Splitting Sky and the Reality of Transgression',
      question: 'What will the heavens look like when torn asunder like red molten leather?',
      keyTheme: 'The Terrors of the Final Hour',
    },
    {
      from: 46,
      to: 61,
      title: 'The Two Verdant Gardens for Those Who Awed the Divine',
      question: 'Is the reward for excellence in faith anything other than divine excellence?',
      keyTheme: 'Ihsan & Higher Paradise',
    },
    {
      from: 62,
      to: 78,
      title: 'The Two Twin Paradises and the Blessed Divine Name',
      question: 'How does this glorious chapter conclude in veneration of the Owner of Majesty and Honor?',
      keyTheme: 'Dhu-l-Jalali wal-Ikram',
    },
  ],

  // Surah 56: Al-Waqi'ah (The Inevitable Event)
  56: [
    {
      from: 1,
      to: 10,
      title: 'The Inevitable Reality and the Three Destinies of Humanity',
      question: 'When the earth shakes violently, who are the Foremost, the Companions of Right, and of Left?',
      keyTheme: 'The Three Groups of Souls',
    },
    {
      from: 11,
      to: 26,
      title: 'The Highest Station: The Foremost Brought Near to Allah',
      question: 'What serene words and absence of idle talk define the paradise of the closest souls to God?',
      keyTheme: 'The Near (Al-Muqarraboon)',
    },
    {
      from: 27,
      to: 40,
      title: 'The Abundant Bounties of the Companions of the Right',
      question: 'What thornless lote trees, perpetual shade, and gushing waters await the righteous?',
      keyTheme: 'Companions of the Right (Ashab al-Yameen)',
    },
    {
      from: 41,
      to: 56,
      title: 'The Grim Consequence of the Companions of the Left',
      question: 'What leads souls to denial of resurrection and the scorching winds of regret?',
      keyTheme: 'The Heedless Luxury and Consequences',
    },
    {
      from: 57,
      to: 74,
      title: 'Four Undeniable Signs: Life, Harvest, Freshwater, and Fire',
      question: 'Did you create the seed in the earth, the rain from the clouds, or the fire you ignite?',
      keyTheme: 'Proof of Sovereign Provision',
    },
    {
      from: 75,
      to: 87,
      title: 'The Oath by the Positions of the Stars & The Inviolable Quran',
      question: 'Why is the Holy Quran protected in a Preserved Tablet, touched only by the pure in heart?',
      keyTheme: 'The Sacredness of Revelation',
    },
    {
      from: 88,
      to: 96,
      title: 'The Final Breath and the Supreme Glorification',
      question: 'How will you face the departure of your soul when it reaches the collarbone at death?',
      keyTheme: 'The Certain Truth (Haqq al-Yaqeen)',
    },
  ],

  // Surah 67: Al-Mulk (The Dominion)
  67: [
    {
      from: 1,
      to: 5,
      title: 'Sovereignty of God and the Purpose of Life and Death',
      question: 'Why did God create death and life? To test which of you is finest in conduct and character.',
      keyTheme: 'The Existential Test',
    },
    {
      from: 6,
      to: 12,
      title: 'The Remorse of Denial vs The Secret Reverence of Believers',
      question: 'What is the lament of those who admit: "Had we only listened or reasoned, we would not be here"?',
      keyTheme: 'Intellect, Hearing, and Salvation',
    },
    {
      from: 13,
      to: 15,
      title: 'The Knower of Inward Thoughts and the Subdued Earth',
      question: 'Does He Who crafted the human heart not know what it conceals, while He is the All-Subtle?',
      keyTheme: 'Omniscience & The Tamed Earth',
    },
    {
      from: 16,
      to: 19,
      title: 'Security from Divine Power and the Flight of the Birds',
      question: 'Who holds the birds suspended in air as they expand and fold their wings without falling?',
      keyTheme: 'Vulnerability and Atmospheric Harmony',
    },
    {
      from: 20,
      to: 27,
      title: 'Helpless Armies and the Clear Guidance of the Upright',
      question: 'Is one who walks stumbling upon his face better guided than one walking upright upon a true path?',
      keyTheme: 'True Guidance vs Stumbling Blindness',
    },
    {
      from: 28,
      to: 30,
      title: 'If Your Drinking Water Were to Vanish into Deep Depths',
      question: 'If all groundwater was swallowed up deep into the earth, who could bring you pure flowing water?',
      keyTheme: 'The Essential Gift of Water',
    },
  ],

  // Surah 18: Al-Kahf (The Cave)
  18: [
    {
      from: 1,
      to: 8,
      title: 'Praise for the Flawless Book and Warning against Falsehood',
      question: 'Why has the Quran been revealed free of crookedness to give joyful glad tidings to the faithful?',
      keyTheme: 'Straight Revelation & The Adornment of Earth',
    },
    {
      from: 9,
      to: 16,
      title: 'The Youth of the Cave: Standing Firm for Pure Monotheism',
      question: 'How did a handful of young believers retreat to a rocky cave to protect their faith from corruption?',
      keyTheme: 'Youthful Conviction & Sanctuary',
    },
    {
      from: 17,
      to: 26,
      title: 'The Miraculous Slumber and Awakening Centuries Later',
      question: 'How did God turn them right and left in sleep for over three centuries as a sign of resurrection?',
      keyTheme: 'Divine Protection & Time Transcended',
    },
    {
      from: 27,
      to: 31,
      title: 'Patience with the Sincere and the True Adornment',
      question: 'Why must we keep company with those who call upon their Lord morning and evening seeking His Face?',
      keyTheme: 'Sincere Companionship & Renouncing Vanity',
    },
    {
      from: 32,
      to: 44,
      title: 'The Parable of the Two Men and the Ruined Gardens',
      question: 'What brought ruin to the wealthy garden owner who forgot to say "Masha\'Allah, la quwwata illa billah"?',
      keyTheme: 'Ingratitude & The Fragility of Wealth',
    },
    {
      from: 45,
      to: 49,
      title: 'The Transient Parable of Earthly Life and the Clear Book',
      question: 'How does worldly pomp resemble rain that blooms vegetation only to turn to dry chaff in the wind?',
      keyTheme: 'The Nature of Dunya & Everlasting Good Deeds',
    },
    {
      from: 50,
      to: 54,
      title: 'Iblis, Rebellion, and the Clear Arguments of the Quran',
      question: 'Why would humanity take Satan and his progeny as allies instead of the All-Compassionate Creator?',
      keyTheme: 'The Archenemy & Stubborn Disputation',
    },
    {
      from: 107,
      to: 110,
      title: 'The Inexhaustible Ocean of God\'s Words & Pure Devotion',
      question: 'If the sea were ink for the words of my Lord, would it run dry before the words of God end?',
      keyTheme: 'Boundless Divine Knowledge & Pure Sincerity',
    },
  ],

  // Surah 93: Ad-Duha (The Morning Brightness)
  93: [
    {
      from: 1,
      to: 5,
      title: 'Divine Consolation and the Promise of Ultimate Favor',
      question: 'Your Lord has not forsaken you, nor is He displeased: how does this soothe every burdened heart?',
      keyTheme: 'Reassurance & Endless Hope',
    },
    {
      from: 6,
      to: 11,
      title: 'Remembering Past Mercy and Caring for the Vulnerable',
      question: 'Did He not find you an orphan and shelter you? How must we treat the seeker and orphan in return?',
      keyTheme: 'Gratitude & Compassion for the Needy',
    },
  ],

  // Surah 94: Ash-Sharh (The Expansion)
  94: [
    {
      from: 1,
      to: 8,
      title: 'Relief Following Hardship and Devotion in Free Time',
      question: 'With every hardship comes ease: how does this divine law empower us to strive persistently in prayer?',
      keyTheme: 'Expansion of the Chest & Relief',
    },
  ],

  // Surah 97: Al-Qadr (The Night of Destiny)
  97: [
    {
      from: 1,
      to: 5,
      title: 'The Night of Majesty and Descent of Angels of Peace',
      question: 'What makes a single night of sincere devotion and prayer greater than a thousand months of worship?',
      keyTheme: 'The Descent of the Quran & Angelic Peace',
    },
  ],

  // Surah 103: Al-Asr (The Declining Day)
  103: [
    {
      from: 1,
      to: 3,
      title: 'The Divine Oath by Time and the Four Pillars of Success',
      question: 'How does humanity escape existential loss through faith, righteous deeds, truth, and patience?',
      keyTheme: 'The Universal Formula for Salvation',
    },
  ],

  // Surah 108: Al-Kawthar (Abundance)
  108: [
    {
      from: 1,
      to: 3,
      title: 'The Celestial Gift of Abundance and the Prayer of Sacrifice',
      question: 'What is the river of Al-Kawthar, and why is the enemy of the Prophet cut off from all legacy?',
      keyTheme: 'Abundant Blessings & Divine Vindication',
    },
  ],

  // Surah 110: An-Nasr (The Divine Help)
  110: [
    {
      from: 1,
      to: 3,
      title: 'The Climax of Victory and the Duty of Glorification',
      question: 'When divine victory arrives and people enter faith in crowds, why must we glorify and seek forgiveness?',
      keyTheme: 'Humility in Triumph & Istighfar',
    },
  ],

  // Surah 112: Al-Ikhlas (Pure Sincerity)
  112: [
    {
      from: 1,
      to: 4,
      title: 'The Decisive Definition of Pure Monotheism (Tawheed)',
      question: 'Why is this brief chapter equal to one-third of the Quran in declaring God\'s unshared uniqueness?',
      keyTheme: 'Absolute Monotheism (As-Samad)',
    },
  ],

  // Surah 113: Al-Falaq (The Daybreak)
  113: [
    {
      from: 1,
      to: 5,
      title: 'Seeking Sanctuary with the Lord of the Daybreak',
      question: 'How do we seek divine refuge from darkness, envy, and the unseen harms of creation?',
      keyTheme: 'Protection from Envy & Evil',
    },
  ],

  // Surah 114: An-Nas (Mankind)
  114: [
    {
      from: 1,
      to: 6,
      title: 'Seeking Protection with the King and God of Humanity',
      question: 'How are human hearts safeguarded against insidious whisperings from unseen and human tempters?',
      keyTheme: 'Spiritual Shield against Whispers (Waswas)',
    },
  ],
};

/**
 * Intelligent dynamic fallback: generates specific, coherent topic names and contemplative questions
 * for any verse range or Surah across the 114 chapters.
 */
function generateDynamicParagraphTitle(
  surah: SurahDetail,
  fromAyah: number,
  toAyah: number,
  ayahs: Ayah[]
): { title: string; question: string } {
  // Analyze verse texts to determine focal theme
  const combinedEnglish = ayahs.map((a) => a.textEnglish).join(' ').toLowerCase();

  if (combinedEnglish.includes('paradise') || combinedEnglish.includes('garden') || combinedEnglish.includes('reward')) {
    return {
      title: `The Eternal Rewards and Bounties of Paradise`,
      question: `What lasting delights and pure peace await the truthful servants of God?`,
    };
  }

  if (combinedEnglish.includes('fire') || combinedEnglish.includes('hell') || combinedEnglish.includes('punishment') || combinedEnglish.includes('doom')) {
    return {
      title: `The Consequences of Injustice and Denying Truth`,
      question: `Why does divine justice warn mortals against persisting in corruption and heedlessness?`,
    };
  }

  if (combinedEnglish.includes('create') || combinedEnglish.includes('heavens') || combinedEnglish.includes('earth') || combinedEnglish.includes('sky') || combinedEnglish.includes('water')) {
    return {
      title: `Cosmic Signs of Divine Creation and Sustenance`,
      question: `How do the wonders of the natural world testify to the Creator's wisdom and provision?`,
    };
  }

  if (combinedEnglish.includes('moses') || combinedEnglish.includes('pharaoh') || combinedEnglish.includes('noah') || combinedEnglish.includes('abraham') || combinedEnglish.includes('jesus') || combinedEnglish.includes('messenger')) {
    return {
      title: `Prophetic Guidance and Lessons from History`,
      question: `What eternal moral lessons can we draw from the struggles of the noble messengers?`,
    };
  }

  if (combinedEnglish.includes('resurrection') || combinedEnglish.includes('hour') || combinedEnglish.includes('day of') || combinedEnglish.includes('trumpet') || combinedEnglish.includes('grave')) {
    return {
      title: `The Reality of Resurrection and Final Accountability`,
      question: `How does awareness of standing before God transform our conduct and choices in this life?`,
    };
  }

  if (combinedEnglish.includes('worship') || combinedEnglish.includes('praise') || combinedEnglish.includes('lord') || combinedEnglish.includes('allah') || combinedEnglish.includes('merciful')) {
    return {
      title: `Devotion, Monotheism, and Divine Attributes`,
      question: `Why is the All-Merciful alone worthy of all human devotion, gratitude, and surrender?`,
    };
  }

  if (combinedEnglish.includes('charity') || combinedEnglish.includes('spend') || combinedEnglish.includes('poor') || combinedEnglish.includes('orphan') || combinedEnglish.includes('righteous')) {
    return {
      title: `Compassion, Righteous Deeds, and Moral Integrity`,
      question: `How does sincere charity and helping the vulnerable purify the human heart?`,
    };
  }

  // Fallback to Surah-specific contextual title
  if (fromAyah === toAyah) {
    return {
      title: `Contemplation on Ayah ${fromAyah} of Surah ${surah.nameEnglish}`,
      question: `What core divine wisdom and daily life guidance does this sacred verse impart?`,
    };
  }

  return {
    title: `Divine Guidance & Reflection (Ayahs ${fromAyah}–${toAyah})`,
    question: `How does this passage illuminate our relationship with our Creator and fellow humanity?`,
  };
}

/**
 * Splits a Surah into structured Thematic Paragraphs (one paragraph per slide).
 * Uses exact curated thematic rules where present, and smart chunking for all other verses.
 */
export function getThematicParagraphs(surah: SurahDetail): ThematicParagraph[] {
  if (!surah || !surah.ayahs || surah.ayahs.length === 0) return [];

  const curated = CURATED_SURAH_THEMES[surah.number];
  const paragraphs: ThematicParagraph[] = [];

  if (curated && curated.length > 0) {
    // We have curated themes for this Surah
    let coveredUpTo = 0;

    for (const rule of curated) {
      // Check if there are verses before this rule that weren't covered
      if (rule.from > coveredUpTo + 1) {
        // Chunk the intermediate verses into small paragraphs of 2-3 verses
        const intermediateAyahs = surah.ayahs.filter(
          (a) => a.numberInSurah > coveredUpTo && a.numberInSurah < rule.from
        );
        chunkAndPushParagraphs(surah, intermediateAyahs, paragraphs);
      }

      const matchingAyahs = surah.ayahs.filter(
        (a) => a.numberInSurah >= rule.from && a.numberInSurah <= rule.to
      );

      if (matchingAyahs.length > 0) {
        // Subdivide large sections if they exceed 3 verses so every slide fits viewport with zero vertical scroll
        if (matchingAyahs.length > 3) {
          chunkAndPushParagraphs(surah, matchingAyahs, paragraphs);
        } else {
          paragraphs.push({
            id: `${surah.number}:${rule.from}-${rule.to}`,
            surahNumber: surah.number,
            fromAyah: rule.from,
            toAyah: rule.to,
            topicTitle: rule.title,
            topicQuestion: rule.question,
            ayahs: matchingAyahs,
            keyTheme: rule.keyTheme,
          });
        }
        coveredUpTo = Math.max(coveredUpTo, rule.to);
      }
    }

    // Check if remaining verses after the last rule need chunking
    if (coveredUpTo < surah.numberOfAyahs) {
      const remainingAyahs = surah.ayahs.filter((a) => a.numberInSurah > coveredUpTo);
      chunkAndPushParagraphs(surah, remainingAyahs, paragraphs);
    }

    return paragraphs;
  }

  // Fallback for any other Surah without manual mapping: chunk systematically
  chunkAndPushParagraphs(surah, surah.ayahs, paragraphs);
  return paragraphs;
}

/**
 * Chunks a list of ayahs into natural paragraph units (typically 2 to 4 ayahs each,
 * or 1 if very long) and assigns tailored topic headings and questions.
 */
function chunkAndPushParagraphs(
  surah: SurahDetail,
  ayahs: Ayah[],
  output: ThematicParagraph[]
) {
  if (ayahs.length === 0) return;

  // Very short Surahs (<= 7 verses) can be 1 or 2 coherent thematic slides
  if (ayahs.length <= 4) {
    const from = ayahs[0].numberInSurah;
    const to = ayahs[ayahs.length - 1].numberInSurah;
    const dynamic = generateDynamicParagraphTitle(surah, from, to, ayahs);
    output.push({
      id: `${surah.number}:${from}-${to}`,
      surahNumber: surah.number,
      fromAyah: from,
      toAyah: to,
      topicTitle: dynamic.title,
      topicQuestion: dynamic.question,
      ayahs,
    });
    return;
  }

  let currentChunk: Ayah[] = [];
  let charCount = 0;
  const MAX_PARAGRAPH_CHARS = 280; // Keeps text compact, readable, zero scroll

  for (let i = 0; i < ayahs.length; i++) {
    const ayah = ayahs[i];
    const textLen = (ayah.textEnglish?.length || 0) + (ayah.textArabic?.length || 0);

    const shouldBreak =
      currentChunk.length >= 3 ||
      (currentChunk.length >= 2 && charCount + textLen > MAX_PARAGRAPH_CHARS);

    if (shouldBreak && currentChunk.length > 0) {
      const from = currentChunk[0].numberInSurah;
      const to = currentChunk[currentChunk.length - 1].numberInSurah;
      const dynamic = generateDynamicParagraphTitle(surah, from, to, currentChunk);

      output.push({
        id: `${surah.number}:${from}-${to}`,
        surahNumber: surah.number,
        fromAyah: from,
        toAyah: to,
        topicTitle: dynamic.title,
        topicQuestion: dynamic.question,
        ayahs: currentChunk,
      });

      currentChunk = [ayah];
      charCount = textLen;
    } else {
      currentChunk.push(ayah);
      charCount += textLen;
    }
  }

  if (currentChunk.length > 0) {
    const from = currentChunk[0].numberInSurah;
    const to = currentChunk[currentChunk.length - 1].numberInSurah;
    const dynamic = generateDynamicParagraphTitle(surah, from, to, currentChunk);

    output.push({
      id: `${surah.number}:${from}-${to}`,
      surahNumber: surah.number,
      fromAyah: from,
      toAyah: to,
      topicTitle: dynamic.title,
      topicQuestion: dynamic.question,
      ayahs: currentChunk,
    });
  }
}

/**
 * Groups thematic paragraphs into continuous, full-page slide decks so that
 * every slide page is filled with continuous ayahs of the same Surah without
 * leaving empty blank space at the bottom of the card.
 */
export function getThematicSlidePages(surah: SurahDetail): ThematicSlidePage[] {
  const paragraphs = getThematicParagraphs(surah);
  if (paragraphs.length === 0) return [];

  // Short Surahs (10 ayahs or less, e.g. Al-Fatihah, Al-Ikhlas, Al-Falaq, An-Nas, etc.)
  // are displayed on 1 continuous, rich full-page slide with their topics
  if (surah.ayahs.length <= 10) {
    return [
      {
        id: `${surah.number}:1-${surah.ayahs.length}`,
        pageIndex: 0,
        fromAyah: 1,
        toAyah: surah.ayahs.length,
        paragraphs,
        allAyahs: surah.ayahs,
        primaryTopicTitle: paragraphs[0]?.topicTitle || surah.nameEnglish,
      },
    ];
  }

  const pages: ThematicSlidePage[] = [];
  let currentGroup: ThematicParagraph[] = [];
  let currentWeight = 0;
  // Target ~650-800 character weight comfortably fills a mobile phone slide without empty space
  const TARGET_PAGE_WEIGHT = 680;

  for (const para of paragraphs) {
    const paraWeight =
      para.ayahs.reduce(
        (sum, a) => sum + (a.textArabic?.length || 0) + (a.textEnglish?.length || 0),
        0
      ) + 120;

    if (currentGroup.length > 0 && currentWeight + paraWeight > TARGET_PAGE_WEIGHT) {
      const allAyahsInPage = currentGroup.flatMap((p) => p.ayahs);
      const from = allAyahsInPage[0].numberInSurah;
      const to = allAyahsInPage[allAyahsInPage.length - 1].numberInSurah;

      pages.push({
        id: `${surah.number}:${from}-${to}`,
        pageIndex: pages.length,
        fromAyah: from,
        toAyah: to,
        paragraphs: [...currentGroup],
        allAyahs: allAyahsInPage,
        primaryTopicTitle: currentGroup[0].topicTitle,
      });

      currentGroup = [para];
      currentWeight = paraWeight;
    } else {
      currentGroup.push(para);
      currentWeight += paraWeight;
    }
  }

  if (currentGroup.length > 0) {
    const allAyahsInPage = currentGroup.flatMap((p) => p.ayahs);
    const from = allAyahsInPage[0].numberInSurah;
    const to = allAyahsInPage[allAyahsInPage.length - 1].numberInSurah;

    pages.push({
      id: `${surah.number}:${from}-${to}`,
      pageIndex: pages.length,
      fromAyah: from,
      toAyah: to,
      paragraphs: currentGroup,
      allAyahs: allAyahsInPage,
      primaryTopicTitle: currentGroup[0].topicTitle,
    });
  }

  return pages;
}

