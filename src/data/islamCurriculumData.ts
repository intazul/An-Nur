export type CurriculumEpochId =
  | 'epoch-1-origins'
  | 'epoch-2-early-prophets'
  | 'epoch-3-bani-israil'
  | 'epoch-4-makkah-youth'
  | 'epoch-5-makkan-mission'
  | 'epoch-6-madinan-era'
  | 'epoch-7-completion'
  | 'epoch-8-preservation';

export interface CurriculumEpoch {
  id: CurriculumEpochId;
  roman: string;
  title: string;
  span: string;
}

export interface CurriculumFactBullet {
  lead: string;
  detail: string;
  ref?: string;
}

export interface CurriculumQuranRef {
  surahNumber: number;
  ayahNumber: number;
  label: string;
  whenAndWhy: string;
}

export interface CurriculumHadithRef {
  source: string;
  narrator: string;
  factSummary: string;
  text: string;
}

export interface CurriculumChapter {
  id: string;
  order: number;
  epochId: CurriculumEpochId;
  eraLabel: string;
  location: string;
  title: string;
  coreFocus: string;
  keyFacts: CurriculumFactBullet[];
  quranVerses: CurriculumQuranRef[];
  sahihHadiths: CurriculumHadithRef[];
  verifiedTakeaways: string[];
}

export const CURRICULUM_EPOCHS: CurriculumEpoch[] = [
  { id: 'epoch-1-origins', roman: 'I', title: 'Primordial Creation & Covenant', span: 'Before Earthly Time' },
  { id: 'epoch-2-early-prophets', roman: 'II', title: 'Nuh, Ibrahim, Hajar & Yusuf (AS)', span: 'Early Mankind' },
  { id: 'epoch-3-bani-israil', roman: 'III', title: 'Musa, Dawud, Sulayman & Isa (AS)', span: 'Tawrah, Zabur & Injil' },
  { id: 'epoch-4-makkah-youth', roman: 'IV', title: 'Year of Elephant & Al-Amin’s Youth', span: '570 – 609 CE' },
  { id: 'epoch-5-makkan-mission', roman: 'V', title: '13 Years of Revelation in Makkah', span: '610 – 622 CE' },
  { id: 'epoch-6-madinan-era', roman: 'VI', title: 'Madinah State, Laws & Battles', span: '1 – 9 AH (622–631 CE)' },
  { id: 'epoch-7-completion', roman: 'VII', title: 'Farewell Hajj & Passing of Prophet ﷺ', span: '10 – 11 AH (632 CE)' },
  { id: 'epoch-8-preservation', roman: 'VIII', title: 'Rightly Guided Caliphs & Preservation', span: '11 – 40 AH (632–661 CE)' },
];

export const ISLAM_CURRICULUM_CHAPTERS: CurriculumChapter[] = [
  {
    id: 'curr-ch-01',
    order: 1,
    epochId: 'epoch-1-origins',
    eraLabel: 'Before Heavens & Earth',
    location: 'Al-‘Arsh & Al-Lawh al-Mahfuz',
    title: 'The Throne, The Pen & Creation of Angels and Jinn',
    coreFocus: 'First creations before time, Al-Qadar (Destiny), and origin of the Qur’an.',
    keyFacts: [
      { lead: 'First Created Order:', detail: 'Allah’s Throne rested over water before skies or earth existed.', ref: 'Surah Hud 11:7' },
      { lead: '50,000 Years Earlier:', detail: 'Allah created Al-Qalam (The Pen) and inscribed every decree onto Al-Lawh al-Mahfuz.', ref: 'Sahih Muslim 2653b' },
      { lead: 'Dominion of Mercy:', detail: 'Inscribed above the Throne: "My Mercy prevails over My Wrath."', ref: 'Sahih al-Bukhari 3194' },
      { lead: 'Substances of Creation:', detail: 'Angels created from light; Jinn created earlier from smokeless fire; Adam from clay.', ref: 'Sahih Muslim 2996' },
      { lead: 'Origin of Qur’an:', detail: 'The complete Qur’an is preserved eternally in Al-Lawh al-Mahfuz prior to earthly descent.', ref: 'Surah Al-Buruj 85:21–22' },
    ],
    quranVerses: [
      { surahNumber: 85, ayahNumber: 21, label: 'Al-Buruj 85:21–22', whenAndWhy: 'Establishes the Qur’an’s protected origin upon the Preserved Tablet.' },
      { surahNumber: 11, ayahNumber: 7, label: 'Hud 11:7', whenAndWhy: 'States creation of six-period heavens/earth and Throne upon water as humanity’s test.' },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3191 & 7418',
        narrator: 'Imran ibn Husayn (RA)',
        factSummary: 'Pre-eternity of Allah before space & matter',
        text: 'The Prophet ﷺ stated: "Allah existed and nothing existed before Him; His Throne was over the water, then He wrote everything in the Book and created the heavens and earth."',
      },
      {
        source: 'Sahih Muslim 2653b',
        narrator: 'Abdullah ibn Amr (RA)',
        factSummary: 'Measure of all creation written 50,000 years prior',
        text: '"Allah wrote the decrees of creation fifty thousand years before creating the heavens and the earth."',
      },
    ],
    verifiedTakeaways: [
      'Everything operates under exact Divine Knowledge (Al-Qadar).',
      'Angels obey without disobedience; Jinn preceded humans on Earth with free choice.',
    ],
  },
  {
    id: 'curr-ch-02',
    order: 2,
    epochId: 'epoch-1-origins',
    eraLabel: 'First Human Generation',
    location: 'Paradise → Na‘man Valley → Earth',
    title: 'Adam (AS), Iblis’s Refusal & Covenant of Tawhid',
    coreFocus: 'Creation of Adam 60 cubits tall, Fitrah covenant, and sin vs repentance.',
    keyFacts: [
      { lead: 'Created in Dignity:', detail: 'Shaped sixty cubits tall on a Friday and taught names/concepts of all things.', ref: 'Sahih al-Bukhari 3326' },
      { lead: 'Iblis’s Arrogance:', detail: 'Refused to prostrate claiming fire superior to clay—introducing racism and pride.', ref: 'Surah Al-A‘raf 7:12' },
      { lead: 'Primordial Oath (Alastu):', detail: 'Every human soul testified "You are our Lord!" before earthly birth.', ref: 'Surah Al-A‘raf 7:172' },
      { lead: 'Natural Creed (Fitrah):', detail: 'Every child is born upon natural monotheism (Islam); environment alters them.', ref: 'Sahih al-Bukhari 1385' },
      { lead: 'Shared Accountability & Tawbah:', detail: 'Both Adam and Hawwa slipped together and repented together—no inherited "original sin".', ref: 'Surah Al-Baqarah 2:37' },
    ],
    quranVerses: [
      { surahNumber: 2, ayahNumber: 30, label: 'Al-Baqarah 2:30–37', whenAndWhy: 'Adam’s appointment as steward, taught knowledge, slip, and accepted prayer of repentance.' },
      { surahNumber: 7, ayahNumber: 172, label: 'Al-A‘raf 7:172', whenAndWhy: 'Records the covenant of Tawhid taken from every descendant of Adam.' },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3326',
        narrator: 'Abu Hurayrah (RA)',
        factSummary: 'Adam’s height and Salam as first greeting',
        text: '"Allah created Adam sixty cubits tall and told him: Go greet those angels with As-Salamu alaykum and listen to their reply—it is your greeting and your descendants’ greeting."',
      },
      {
        source: 'Sahih al-Bukhari 1385 & Muslim 2658',
        narrator: 'Abu Hurayrah (RA)',
        factSummary: 'Universal Fitrah at birth',
        text: '"No child is born except upon the Fitrah; then parents make him a Jew, Christian, or Magian."',
      },
    ],
    verifiedTakeaways: [
      'Equal responsibility between Adam and Hawwa; zero doctrine of inherited sin.',
      'Sincere Tawbah erases disobedience; pride (Iblis) ruins eternally.',
    ],
  },
  {
    id: 'curr-ch-03',
    order: 3,
    epochId: 'epoch-2-early-prophets',
    eraLabel: '10 Centuries After Adam',
    location: 'Mesopotamia & Mount Judi',
    title: 'Nuh (AS), Birth of Idol Worship & The Flood',
    coreFocus: 'Exactly how idolatry originated on Earth and Nuh’s 950-year mission.',
    keyFacts: [
      { lead: '10 Pure Centuries:', detail: 'Ten full generations between Adam and Nuh worshipped Allah alone without idols.', ref: 'Sahih/Ibn Abbas via Hakim' },
      { lead: 'Origin of Idols:', detail: 'Statues built to honor 5 pious elders (Wadd, Suwa‘, Yaghuth, Ya‘uq, Nasr) later became objects of worship.', ref: 'Sahih al-Bukhari 4920' },
      { lead: '950 Years Preaching:', detail: 'Nuh preached publicly and privately for 950 years; only a shipful believed.', ref: 'Surah Al-‘Ankabut 29:14' },
      { lead: 'The Ark & Mount Judi:', detail: 'Allah drowned disbelievers—including Nuh’s disbelieving son—and grounded the Ark on Judi.', ref: 'Surah Hud 11:42–44' },
    ],
    quranVerses: [
      { surahNumber: 71, ayahNumber: 23, label: 'Nuh 71:23', whenAndWhy: 'Names the exact five pre-flood false idols derived from pious humans.' },
      { surahNumber: 11, ayahNumber: 40, label: 'Hud 11:40–44', whenAndWhy: 'Boarding of pairs and believers; earth swallowing floodwater atop Mount Judi.' },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 4920',
        narrator: 'Abdullah ibn Abbas (RA)',
        factSummary: 'Historical origin of statue/grave idolatry',
        text: '"Those were names of righteous men from Nuh’s people. When they died, Satan inspired people to erect statues where they used to sit. After knowledge perished, later generations worshipped them."',
      },
    ],
    verifiedTakeaways: [
      'Excessive veneration of righteous humans’ monuments is how Shirk entered humanity.',
      'Kinship to a Prophet (like Nuh’s son) never replaces personal Iman.',
    ],
  },
  {
    id: 'curr-ch-04',
    order: 4,
    epochId: 'epoch-2-early-prophets',
    eraLabel: 'c. 1900–1800 BCE',
    location: 'Ur (Iraq) → Syria → Palestine',
    title: 'Ibrahim (AS), Nimrod’s Furnace & The Sacrifice Test',
    coreFocus: 'Dismantling idol & king worship, survival in fire, and origin of Eid al-Adha.',
    keyFacts: [
      { lead: 'Destroying Temple Idols:', detail: 'Ibrahim smashed idols leaving the axe on the largest idol to prove their helplessness.', ref: 'Surah Al-Anbiya 21:58–63' },
      { lead: 'Coolness in Fire:', detail: 'Thrown into Nimrod’s furnace, he uttered "Hasbunallahu wa ni‘mal-Wakil"—Allah turned flames cool.', ref: 'Sahih al-Bukhari 4563' },
      { lead: 'First Circumcision & Fitrah:', detail: 'Ibrahim established permanent rites of purity (Fitrah) and hospitality.', ref: 'Sahih al-Bukhari 3356' },
      { lead: 'Sacrifice Obedience:', detail: 'Both father and son Isma‘il submitted willingly to Allah’s dream-command before a ram ransomed Isma‘il.', ref: 'Surah As-Saffat 37:102–107' },
    ],
    quranVerses: [
      { surahNumber: 21, ayahNumber: 69, label: 'Al-Anbiya 21:68–69', whenAndWhy: 'Command to the fire to become coolness and safety for Ibrahim (AS).' },
      { surahNumber: 37, ayahNumber: 102, label: 'As-Saffat 37:102–107', whenAndWhy: 'Willing submission of Ibrahim & Isma‘il anchoring Eid al-Adha sacrifice forever.' },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 4563',
        narrator: 'Abdullah ibn Abbas (RA)',
        factSummary: 'Identical du‘a in extreme danger',
        text: '"The last words Ibrahim spoke when thrown into the fire were: Sufficient for us is Allah, and He is the best Disposer of affairs—same spoken by Muhammad ﷺ after Uhud."',
      },
      {
        source: 'Sahih al-Bukhari 3350',
        narrator: 'Abu Hurayrah (RA)',
        factSummary: 'Divine protection of Sarah against tyrant ruler',
        text: 'Documents how Allah physically paralyzed a tyrant’s hand thrice when attempting to harm Ibrahim’s wife Sarah (AS).',
      },
    ],
    verifiedTakeaways: [
      'Islam calls Ibrahim Khalilullah (Friend of Allah) and universal model of pure Tawhid.',
      'Ibrahim was neither Jew nor Christian prior to Torah/Gospel, but a pure Hanif Muslim (3:67).',
    ],
  },
  {
    id: 'curr-ch-05',
    order: 5,
    epochId: 'epoch-2-early-prophets',
    eraLabel: 'c. 1800 BCE',
    location: 'Valley of Bakkah (Makkah)',
    title: 'Hajar, Zamzam Spring & Raising the Ka‘bah',
    coreFocus: 'Foundation of Makkah, origin of Hajj rituals, and Ibrahim’s du‘a for Muhammad ﷺ.',
    keyFacts: [
      { lead: 'Hajar’s Trust:', detail: 'Left in barren Makkah with infant Isma‘il, she verified it was Allah’s order and said: "Then He will not waste us!"', ref: 'Sahih al-Bukhari 3364' },
      { lead: 'Sa‘i & Zamzam:', detail: 'Seven sprints between Safa & Marwah yielded Jibril striking Earth to uncover Zamzam well.', ref: 'Sahih al-Bukhari 3364' },
      { lead: 'Raising the Ka‘bah:', detail: 'Years later, Ibrahim stood on Maqam Ibrahim while Isma‘il handed stones rebuilding the Ka‘bah.', ref: 'Surah Al-Baqarah 2:127' },
      { lead: 'Prayer Answered in 610 CE:', detail: 'Father and son prayed for a future Makkan Messenger—Prophet Muhammad ﷺ called himself "the answer to Ibrahim’s prayer".', ref: 'Surah Al-Baqarah 2:129' },
    ],
    quranVerses: [
      { surahNumber: 2, ayahNumber: 127, label: 'Al-Baqarah 2:127–129', whenAndWhy: 'Building of the Ka‘bah and exact prophetic du‘a praying for Muhammad ﷺ.' },
      { surahNumber: 14, ayahNumber: 37, label: 'Ibrahim 14:37', whenAndWhy: 'Ibrahim’s prayer making barren Makkah hearts’ refuge and safe sanctuary.' },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3364 & 3365',
        narrator: 'Abdullah ibn Abbas (RA)',
        factSummary: 'Exact narration of Hajar, Zamzam & rebuilding Ka‘bah',
        text: 'Long authentic narration preserving Hajar’s dialogue, Safa-Marwah running (reason pilgrims perform Sa‘i), arrival of Jurhum tribe, and father-son rebuilding of the Ka‘bah.',
      },
    ],
    verifiedTakeaways: [
      'Every Hajj ritual honors Ibrahim, Hajar, and Isma‘il’s obedience—not pre-Islamic paganism.',
      'Prophet Muhammad ﷺ directly fulfilled Ibrahim’s prayer in Surah 2:129.',
    ],
  },
  {
    id: 'curr-ch-06',
    order: 6,
    epochId: 'epoch-2-early-prophets',
    eraLabel: 'c. 1650 BCE',
    location: 'Canaan → Memphis (Egypt)',
    title: 'Prophet Yusuf (AS) — Trial, Integrity & Amnesty',
    coreFocus: 'Moral chastity in Egypt, state famine relief, and forgiving betraying brothers.',
    keyFacts: [
      { lead: 'Fourfold Noble Lineage:', detail: 'Yusuf son of Ya‘qub son of Ishaq son of Ibrahim—four straight generations of Prophethood.', ref: 'Sahih al-Bukhari 3382' },
      { lead: 'Betrayal & Slavery:', detail: 'Cast into a dry well by jealous half-brothers and sold cheaply into an Egyptian minister’s home.', ref: 'Surah Yusuf 12:15–20' },
      { lead: 'Chastity Over Power:', detail: 'Preferred prison to immoral betrayal—calling prisoners directly to pure Tawhid.', ref: 'Surah Yusuf 12:33–39' },
      { lead: 'General Amnesty Template:', detail: 'Rose to Finance Minister saving Egypt from 7-year famine and pardoned brothers: "No blame upon you today!"—same words Prophet ﷺ repeated entering Makkah.', ref: 'Surah Yusuf 12:92' },
    ],
    quranVerses: [
      { surahNumber: 12, ayahNumber: 92, label: 'Yusuf 12:92', whenAndWhy: 'Immortal forgiveness formula later quoted verbatim at Makkah’s conquest (8 AH).' },
      { surahNumber: 12, ayahNumber: 39, label: 'Yusuf 12:39–40', whenAndWhy: 'Yusuf’s prison sermon proving One God over polytheism.' },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3382',
        narrator: 'Abu Hurayrah (RA)',
        factSummary: 'Highest noble lineage confirmed by Prophet ﷺ',
        text: '"The honorable one, son of the honorable one, son of the honorable one, son of the honorable one is Yusuf, son of Ya‘qub, son of Ishaq, son of Ibrahim!"',
      },
    ],
    verifiedTakeaways: [
      'Surah Yusuf was revealed during Makkah’s Year of Sorrow to assure Muhammad ﷺ exile ends in reconciliation.',
      'Integrity during youth temptation elevates believers to lasting stewardship.',
    ],
  },
  {
    id: 'curr-ch-07',
    order: 7,
    epochId: 'epoch-3-bani-israil',
    eraLabel: 'c. 1500–1300 BCE',
    location: 'Egypt → Red Sea → Mount Sinai',
    title: 'Musa (AS), Pharaoh’s Plagues & Liberation',
    coreFocus: 'Rescued from Nile, direct speech at Sinai, Red Sea parting & reason for Ashura.',
    keyFacts: [
      { lead: 'Raised in Palace:', detail: 'Placed in a floating chest by inspiration; adopted inside Pharaoh’s palace by devout Queen Asiyah.', ref: 'Surah Al-Qasas 28:7–9' },
      { lead: 'Direct Speech & 9 Signs:', detail: 'Spoke directly with Allah at Sinai (Kalimullah); magicians bowed immediately recognizing divine staff miracle.', ref: 'Surah Taha 20:70' },
      { lead: 'Red Sea Parted & Body Saved:', detail: 'Twelve dry sea paths opened on 10 Muharram; Pharaoh drowned while his corpse was preserved as a sign.', ref: 'Surah Yunus 10:92' },
      { lead: 'Fasting Ashura:', detail: 'Finding Madinan Jews fasting 10 Muharram in thanks, Prophet ﷺ affirmed: "We have closer right to Musa!"', ref: 'Sahih al-Bukhari 2004' },
    ],
    quranVerses: [
      { surahNumber: 26, ayahNumber: 62, label: 'Ash-Shu‘ara 26:62–66', whenAndWhy: 'Musa’s total certainty trapped by the sea: "Indeed my Lord is with me; He will guide me!"' },
      { surahNumber: 10, ayahNumber: 92, label: 'Yunus 10:92', whenAndWhy: 'Preserving Pharaoh’s body as an eternal warning to arrogant tyrants.' },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 2004',
        narrator: 'Abdullah ibn Abbas (RA)',
        factSummary: 'Origin of Islamic Ashura fast on 10 Muharram',
        text: 'Seeing Madinan Jews fasting on Ashura because Allah saved Musa and drowned Pharaoh, the Prophet ﷺ said: "We have closer connection to Musa than you!" and fasted that day.',
      },
      {
        source: 'Sahih al-Bukhari 4725',
        narrator: 'Ubayy ibn Ka‘b (RA)',
        factSummary: 'Musa’s humility journey seeking knowledge with Al-Khidr',
        text: 'Detailed account of how Musa sought out Al-Khidr learning patience before hidden divine decrees (captured in Surah Al-Kahf 18:60–82).',
      },
    ],
    verifiedTakeaways: [
      'Most frequently named Prophet in the Qur’an (136+ times) as supreme lesson in liberation.',
      'Even Allah’s spokesmen seek further knowledge humbly (Musa & Al-Khidr).',
    ],
  },
  {
    id: 'curr-ch-08',
    order: 8,
    epochId: 'epoch-3-bani-israil',
    eraLabel: 'c. 1020–930 BCE',
    location: 'Holy Land & Jerusalem',
    title: 'King Talut, Young Dawud vs Jalut & Sulayman (AS)',
    coreFocus: 'River discipline test, 313 warriors blueprint, Zabur, and Sulayman’s just rule.',
    keyFacts: [
      { lead: 'Merit Over Aristocracy:', detail: 'Talut was chosen King strictly for knowledge and strength over wealth.', ref: 'Surah Al-Baqarah 2:247' },
      { lead: 'River Test & Badr Parallel:', detail: 'Only ~313 restrained soldiers crossed Talut’s river—exact number matching Badr Muslims.', ref: 'Sahih al-Bukhari 3957' },
      { lead: 'Dawud & Zabur:', detail: 'Young Dawud felled giant Jalut with a sling chanting 2:250; fasted every alternate day.', ref: 'Sahih al-Bukhari 1131' },
      { lead: 'Sulayman’s Justice:', detail: 'Commanded winds, jinn, birds, and tiny ants’ speech; invited Queen Bilqis to Tawhid without bloodshed.', ref: 'Surah An-Naml 27:18–44' },
    ],
    quranVerses: [
      { surahNumber: 2, ayahNumber: 249, label: 'Al-Baqarah 2:249–251', whenAndWhy: 'Law of quality over quantity revealed before Badr: small faithful band defeating vast hosts.' },
      { surahNumber: 27, ayahNumber: 18, label: 'An-Naml 27:18–19', whenAndWhy: 'Ant colony warning and Sulayman’s grateful smile keeping armies from crushing weak creatures.' },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3957',
        narrator: 'Al-Bara ibn Azib (RA)',
        factSummary: 'Companions noted 313 Badr match with Talut',
        text: '"The companions of Muhammad ﷺ used to tell us that the people of Badr matched the exact count of Talut’s believers who crossed the river—three hundred and thirteen men."',
      },
      {
        source: 'Sahih al-Bukhari 1131',
        narrator: 'Abdullah ibn Amr (RA)',
        factSummary: 'Highest worship standard: Dawud’s alternate-day fast',
        text: '"The most beloved fast to Allah is Dawud’s fast (fasted one day, ate one day), and the most beloved night prayer is Dawud’s prayer (slept half the night, stood a third, slept a sixth)."',
      },
    ],
    verifiedTakeaways: [
      'Self-control precedes victory.',
      'True kingship includes compassion even toward ants and gentle invitation to truth.',
    ],
  },
  {
    id: 'curr-ch-09',
    order: 9,
    epochId: 'epoch-3-bani-israil',
    eraLabel: 'c. 1–30 CE',
    location: 'Jerusalem & Bethlehem',
    title: 'Maryam (AS) & Prophet Isa Predicting Ahmad ﷺ',
    coreFocus: 'Virgin birth, cradling defense of Maryam, Injil confirmation & raising alive.',
    keyFacts: [
      { lead: 'Maryam’s Pure Rank:', detail: 'Chosen above women of all worlds (Surah 3:42); one of four perfected women in Islam.', ref: 'Surah Ali ‘Imran 3:42' },
      { lead: 'Miracle Birth & Cradle Speech:', detail: 'Born by Allah’s creative "Be!" like Adam’s parentless creation (3:59); defended his mother as newborn.', ref: 'Surah Maryam 19:30–33' },
      { lead: 'Servant Not Partner:', detail: 'Healed blind/lepers strictly "by permission of Allah" and forbade worshipping himself.', ref: 'Surah Al-Ma’idah 5:116–117' },
      { lead: 'Prophesied Ahmad & Raised Alive:', detail: 'Explicitly foretold final Messenger Ahmad (61:6); saved from cross and raised alive by Allah.', ref: 'Surah An-Nisa 4:157–158' },
    ],
    quranVerses: [
      { surahNumber: 61, ayahNumber: 6, label: 'As-Saff 61:6', whenAndWhy: 'Isa’s explicit Gospel announcement of a coming Messenger named Ahmad ﷺ.' },
      { surahNumber: 19, ayahNumber: 30, label: 'Maryam 19:30–34', whenAndWhy: 'Cradle confession recited by Ja‘far (RA) winning Abyssinian King Najashi’s tears.' },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3443',
        narrator: 'Abu Hurayrah (RA)',
        factSummary: 'Close brotherhood of all Prophets without exception',
        text: '"I am the closest of all people to Isa son of Maryam in both worlds. The prophets are paternal brothers: their mothers differ, yet their religion (Tawhid) is one."',
      },
      {
        source: 'Sahih al-Bukhari 3448',
        narrator: 'Abu Hurayrah (RA)',
        factSummary: 'Guaranteed just return of Isa before Day of Judgment',
        text: '"By Him in Whose Hand is my soul, soon the son of Maryam will descend among you as a just judge..."',
      },
    ],
    verifiedTakeaways: [
      'A Muslim cannot hold valid faith without honoring Maryam and Isa (AS) deeply.',
      'All Messengers preached strictly the worship of Allah alone.',
    ],
  },
  {
    id: 'curr-ch-10',
    order: 10,
    epochId: 'epoch-4-makkah-youth',
    eraLabel: '570 – 609 CE (Ages 0–39)',
    location: 'Makkah & Syrian Trade Caravan',
    title: 'Abraha’s Elephants, Birth & Youth of Al-Amin',
    coreFocus: 'Defense of the Ka‘bah in 570 CE, Hilf al-Fudul justice pact & 40 spotless years.',
    keyFacts: [
      { lead: 'Year of the Elephant (570 CE):', detail: 'Abraha’s war elephant knelt facing the Ka‘bah; Ababil birds annihilated invading army ~50 days before his birth.', ref: 'Surah Al-Fil 105:1–5' },
      { lead: 'Orphanhood & Heart Cleansing:', detail: 'Father Abdullah passed before birth; raised in desert Banu Sa‘d where Jibril washed his heart with Zamzam.', ref: 'Sahih Muslim 162' },
      { lead: 'Shepherd & Justice Pact (Age 20):', detail: 'Shepherded Makkah’s flocks; joined Hilf al-Fudul defending cheated foreign merchants.', ref: 'Sahih al-Bukhari 2262' },
      { lead: 'Al-Amin & Black Stone (Ages 25–35):', detail: 'Khadijah (RA) proposed after witnessing his honesty; spread his cloak uniting all clans over Black Stone.', ref: 'Sirah & Bukhari 7' },
    ],
    quranVerses: [
      { surahNumber: 105, ayahNumber: 1, label: 'Al-Fil 105:1–5', whenAndWhy: 'Reminds Makkah of Abraha’s miraculous defeat witnessing Allah’s protection of the Sanctuary.' },
      { surahNumber: 93, ayahNumber: 6, label: 'Ad-Duha 93:6–8', whenAndWhy: 'Recalls Allah sheltering his orphanhood and guiding his youth.' },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 7',
        narrator: 'Abdullah ibn Abbas (RA)',
        factSummary: 'Enemy Abu Sufyan forced to testify to his spotless honesty',
        text: 'Before Byzantine Emperor Heraclius, opponent Abu Sufyan confessed: "Have you ever accused him of lying before he claimed prophethood?"—"No, never!"',
      },
      {
        source: 'Sahih Muslim 1162 & 162',
        narrator: 'Abu Qatadah & Anas (RA)',
        factSummary: 'Monday birth/revelation fasting & heart purification',
        text: 'Fasted Mondays because he was born on Monday and received revelation on Monday; confirmed Jibril washing his child-heart clean with Zamzam.',
      },
    ],
    verifiedTakeaways: [
      'Even lifelong enemies never once questioned Al-Amin’s integrity before 610 CE.',
      'Fasting Mondays remembers his birth and Cave Hira revelation simultaneously.',
    ],
  },
  {
    id: 'curr-ch-11',
    order: 11,
    epochId: 'epoch-5-makkan-mission',
    eraLabel: '610 CE · Ramadan (Age 40)',
    location: 'Cave of Hira, Jabal al-Nur',
    title: 'Cave Hira — First Qur’an Descent & 5 Modes of Wahi',
    coreFocus: 'Exactly how Qur’an first came down on Laylat al-Qadr and Jibril’s appearances.',
    keyFacts: [
      { lead: 'Two-Stage Qur’an Descent:', detail: 'Whole Qur’an descended on Laylat al-Qadr to Bayt al-‘Izzah (lowest heaven), then verse-by-verse over 23 years.', ref: 'Surah Al-Qadr 97:1' },
      { lead: 'Five Modes of Wahi:', detail: '1) True Dawn Dreams; 2) Ringing Bell Resonance; 3) Human Form (Dihyah); 4) 600-Winged Jibril; 5) Direct Veil-less Speech.', ref: 'Sahih al-Bukhari 2 & 3' },
      { lead: 'First 5 Ayahs (Al-‘Alaq):', detail: 'Jibril pressed him thrice inside Cave Hira reciting 96:1–5 commanding reading and knowledge by pen.', ref: 'Sahih al-Bukhari 3' },
      { lead: 'Khadijah & Waraqah:', detail: 'Khadijah confirmed his five charitable virtues; scholar Waraqah certified Jibril and foretold Makkah’s exile.', ref: 'Sahih al-Bukhari 3' },
    ],
    quranVerses: [
      { surahNumber: 96, ayahNumber: 1, label: 'Al-‘Alaq 96:1–5', whenAndWhy: 'First five verses revealed anywhere on Earth inside dark Cave Hira.' },
      { surahNumber: 97, ayahNumber: 1, label: 'Al-Qadr 97:1–5', whenAndWhy: 'Marks Ramadan’s Night of Power when the Qur’an began descending.' },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3',
        narrator: 'Aishah (RA)',
        factSummary: 'Full eyewitness narrative of Cave Hira & Waraqah',
        text: '"True dreams began like morning dawn... Jibril came in Cave Hira saying Read! I said I cannot read—three times he squeezed me, then recited Al-‘Alaq 96:1–5. Khadijah comforted him and Waraqah affirmed: This is the Namus sent to Musa!"',
      },
      {
        source: 'Sahih al-Bukhari 2',
        narrator: 'Aishah (RA)',
        factSummary: 'Physical intensity of receiving Wahi',
        text: '"Sometimes revelation comes like the ringing of a bell, which is hardest on me; sweat poured from his forehead even on bitterly cold days."',
      },
    ],
    verifiedTakeaways: [
      'Islam’s opening revelation prioritized reading, creation signs, and literacy ("by the Pen").',
      'Khadijah, Zayd, Ali, and Abu Bakr (RA) stood as the very first believers.',
    ],
  },
  {
    id: 'curr-ch-12',
    order: 12,
    epochId: 'epoch-5-makkan-mission',
    eraLabel: '610 – 615 CE',
    location: 'Dar al-Arqam · Mount Safa · Abyssinia',
    title: 'Mount Safa, Persecution & Abyssinia Sanctuary',
    coreFocus: 'Resumption after pause (74:1), Surah 111 & 112 triggers, Bilal, Sumayyah & Najashi.',
    keyFacts: [
      { lead: 'Fatrat al-Wahi Ends:', detail: 'Seeing Jibril enthroned in the sky triggered Al-Muddaththir (74:1–5) launching active warning.', ref: 'Sahih al-Bukhari 4925' },
      { lead: 'Mount Safa & Al-Masad:', detail: 'Commanded via 26:214 to warn kin openly; Abu Lahab cursed him—triggering Surah 111 instantly.', ref: 'Sahih al-Bukhari 4770' },
      { lead: 'Answering Tawhid Questions:', detail: 'Al-Ikhlas (112) answered "Give us your Lord’s lineage!"; Al-Kafirun (109) rejected 1-year idol compromise.', ref: 'Bukhari 5013 & Muslim 376' },
      { lead: 'First Martyrs & Abyssinia:', detail: 'Sumayyah & Yasir martyred under Abu Jahl; Ja‘far recited Surah Maryam before Christian King Najashi winning asylum.', ref: 'Sirah & Bukhari 1320' },
    ],
    quranVerses: [
      { surahNumber: 74, ayahNumber: 1, label: 'Al-Muddaththir 74:1–5', whenAndWhy: 'Resumed revelation commanding active public propagation and inner/outer purity.' },
      { surahNumber: 112, ayahNumber: 1, label: 'Al-Ikhlas 112:1–4', whenAndWhy: 'Revealed answering polytheists asking God’s lineage; equals one-third of the Qur’an.' },
      { surahNumber: 109, ayahNumber: 1, label: 'Al-Kafirun 109:1–6', whenAndWhy: 'Zero religious compromise ("To you your religion, to me mine").' },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 4770',
        narrator: 'Abdullah ibn Abbas (RA)',
        factSummary: 'Exact dialogue atop Mount Safa triggering Surah 111',
        text: '"When 26:214 descended, he climbed Safa calling every clan; all testified we never heard a lie from you! Abu Lahab cursed him, so Perish the hands of Abu Lahab descended instantly."',
      },
      {
        source: 'Sahih al-Bukhari 3612',
        narrator: 'Khabbab ibn al-Aratt (RA)',
        factSummary: 'Forbidding premature retaliation during 13 Makkan years',
        text: 'Told tortured believers praying at the Ka‘bah: earlier believers had flesh combed by iron without quitting—victory requires steady patience.',
      },
    ],
    verifiedTakeaways: [
      'Sumayyah (RA) stands honored as the very first martyr in Islamic history.',
      'Surah Ad-Duha (93) healed temporary anxiety when revelation paused 2–3 nights (Bukhari 4950).',
    ],
  },
  {
    id: 'curr-ch-13',
    order: 13,
    epochId: 'epoch-5-makkan-mission',
    eraLabel: '616 – 620 CE',
    location: 'Shi‘b Abi Talib · Ta’if · Nakhlah',
    title: '3-Year Boycott, Year of Sorrow & Mercy at Ta’if',
    coreFocus: 'Starvation blockade, passing of Khadijah & Abu Talib, stoning at Ta’if & Jinn believing.',
    keyFacts: [
      { lead: '3-Year Starvation Ravine:', detail: 'Banu Hashim survived eating dry leaves/leather until white ants ate the boycott scroll except Allah’s Name.', ref: 'Sirah & Bukhari Records' },
      { lead: 'Year of Sorrow (619 CE):', detail: 'Beloved Khadijah (shield inside home) and guardian Abu Talib passed within weeks of lifting boycott.', ref: 'Bukhari 3818' },
      { lead: 'Ta’if & Angel of Mountains:', detail: 'Pelted bloody until heels filled with blood; declined Angel’s offer to crush Ta’if mountains hoping descendants believe.', ref: 'Sahih al-Bukhari 3231' },
      { lead: 'Jinn Embrace Islam:', detail: 'At Nakhlah valley returning lonely from Ta’if, a company of Jinn overheard his Fajr recitation and turned believers.', ref: 'Surah Al-Jinn 72:1 & 46:29' },
    ],
    quranVerses: [
      { surahNumber: 94, ayahNumber: 5, label: 'Ash-Sharh 94:5–8', whenAndWhy: '"With hardship comes double ease"—Makkan reassurance during crushing grief.' },
      { surahNumber: 46, ayahNumber: 29, label: 'Al-Ahqaf 46:29–32', whenAndWhy: 'Records the group of Jinn returning as warners after listening to dawn recitation.' },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3231',
        narrator: 'Aishah (RA)',
        factSummary: 'Harder than Uhud—yet supreme prophetic mercy',
        text: '"He told Aishah his rejection at Ta’if was harder than Uhud; when Angel of Mountains offered to crush people between two peaks, he replied: No, I hope Allah raises children from them worshipping Allah alone!"',
      },
      {
        source: 'Sahih al-Bukhari 3818',
        narrator: 'Abu Hurayrah (RA)',
        factSummary: 'Khadijah gifted a quiet pearl palace in Jannah',
        text: 'Jibril instructed: "Convey Salam to Khadijah from her Lord and give glad tidings of a palace in Paradise of hollowed pearl."',
      },
    ],
    verifiedTakeaways: [
      'Declining vengeance at Ta’if later yielded Ta’if’s wholehearted peace conversion after Hunayn.',
      'Even unseen realms of Jinn responded cleanly to plain Qur’an recitation.',
    ],
  },
  {
    id: 'curr-ch-14',
    order: 14,
    epochId: 'epoch-5-makkan-mission',
    eraLabel: 'c. 621 CE · Single Night',
    location: 'Makkah → Al-Aqsa → Seven Heavens',
    title: 'Al-Isra wal-Mi‘raj — Direct Gift of 5 Daily Prayers',
    coreFocus: 'Leading all Prophets in Jerusalem, 7 heavens tour, 5 Salahs & Baqarah 2:285–286.',
    keyFacts: [
      { lead: 'Isra (Horizontal Journey):', detail: 'Carried on Al-Buraq from Al-Masjid al-Haram to Al-Masjid al-Aqsa, leading every past Prophet in prayer.', ref: 'Surah Al-Isra 17:1' },
      { lead: 'Seven Heavens Tour:', detail: 'Greeted Adam, Isa & Yahya, Yusuf, Idris, Harun, Musa, and Ibrahim beside Al-Bayt al-Ma‘mur (70,000 angels daily).', ref: 'Sahih al-Bukhari 3207' },
      { lead: '50 Prayers → 5 With Full Reward:', detail: 'Following Musa’s compassionate counsel, Allah reduced 50 daily prayers to 5 carrying full 50-fold reward.', ref: 'Sahih Muslim 162' },
      { lead: 'Veil-Less Direct Gift (2:285–286):', detail: 'Revealed directly above 7th heaven without Angel intermediary—plus forgiveness for non-shirk sins.', ref: 'Sahih Muslim 173' },
    ],
    quranVerses: [
      { surahNumber: 17, ayahNumber: 1, label: 'Al-Isra 17:1', whenAndWhy: 'Authenticates the miraculous night journey uniting Makkah and Al-Aqsa.' },
      { surahNumber: 2, ayahNumber: 285, label: 'Al-Baqarah 2:285–286', whenAndWhy: 'Unique verses granted directly at Sidrat al-Muntaha promising no soul burdened beyond capacity.' },
    ],
    sahihHadiths: [
      {
        source: 'Sahih Muslim 173 & Bukhari 5009',
        narrator: 'Abdullah ibn Mas‘ud (RA)',
        factSummary: 'Three divine treasures granted on Mi‘raj night',
        text: '"Messenger of Allah ﷺ was given three things: five prayers, ending verses of Surah Al-Baqarah, and forgiveness of major sins for whoever does not associate partners with Allah."',
      },
      {
        source: 'Sahih al-Bukhari 3207',
        narrator: 'Anas ibn Malik (RA)',
        factSummary: 'Step-by-step account of the seven heavens & 50-to-5 ease',
        text: 'Records exact sequence of prophets across heavens 1–7, Musa’s plea for lightness, and "It is Five and equal to Fifty—My word changes not!"',
      },
    ],
    verifiedTakeaways: [
      'Salah is the sole Islamic pillar revealed directly above Heaven rather than on Earth.',
      'Abu Bakr instantly affirmed without doubt—earning immortal title Al-Siddiq.',
    ],
  },
  {
    id: 'curr-ch-15',
    order: 15,
    epochId: 'epoch-5-makkan-mission',
    eraLabel: '621 – 622 CE (Year 1 AH)',
    location: 'Aqabah → Cave Thawr → Quba → Madinah',
    title: 'Aqabah Pledges & Hijrah via Cave Thawr to Madinah',
    coreFocus: 'Mus‘ab in Yathrib, assassination plot escape, 3 nights in Cave Thawr & Calendar origin.',
    keyFacts: [
      { lead: 'Peaceful Mission to Yathrib:', detail: '12 then 75 Ansar pledged at Aqabah after ambassador Mus‘ab ibn Umayr taught Madinah peacefully.', ref: 'Bukhari 3892' },
      { lead: 'Trusts Returned Even Under Siege:', detail: 'Ali slept in the Prophet’s ﷺ bed solely to return Makkan citizens’ deposits while assassins waited outside.', ref: 'Surah Al-Anfal 8:30' },
      { lead: '3 Nights in Cave Thawr:', detail: 'Abu Bakr whispered fear seeing hunters’ feet above; answered: "What think you of two when Allah is their third?"', ref: 'Sahih al-Bukhari 3653' },
      { lead: 'Suraqah & Hijri Year 1:', detail: 'Pursuer Suraqah’s horse sank thrice—promised Persian royal bracelets! Built Masjid Quba upon arrival.', ref: 'Sahih al-Bukhari 3906 & 3934' },
    ],
    quranVerses: [
      { surahNumber: 9, ayahNumber: 40, label: 'At-Tawbah 9:40', whenAndWhy: 'Immortalizes Cave Thawr companionship: "Do not grieve; indeed Allah is with us."' },
      { surahNumber: 22, ayahNumber: 39, label: 'Al-Hajj 22:39–40', whenAndWhy: 'Very first verse granting right of self-defense after Muslims were exiled unjustly.' },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3653 & 3906',
        narrator: 'Abu Bakr & Al-Bara ibn Azib (RA)',
        factSummary: 'Divine shield inside Cave Thawr & Suraqah’s miracle',
        text: 'Abu Bakr reported hunters literally stood above Cave Thawr’s rim without looking down; then Suraqah’s galloping horse sank knee-deep in flat rock until seeking amnesty.',
      },
      {
        source: 'Sahih al-Bukhari 3934',
        narrator: 'Sahl ibn Sa‘d (RA)',
        factSummary: 'Why Umar anchored the Hijri calendar to Hijrah',
        text: 'Companions fixed Year 1 of Islam to the Hijrah because it clearly separated oppression from sanctuary statehood.',
      },
    ],
    verifiedTakeaways: [
      'Defense permission (22:39) came ONLY after 13 years of peaceful restraint and forced exile.',
      'Masjid Quba stands as Islam’s very first public mosque.',
    ],
  },
  {
    id: 'curr-ch-16',
    order: 16,
    epochId: 'epoch-6-madinan-era',
    eraLabel: '1 – 2 AH (622 – 624 CE)',
    location: 'Madinah al-Munawwarah & Masjid Qiblatayn',
    title: 'Brotherhood Pact, Constitution & Mid-Salah Qiblah Shift',
    coreFocus: 'Mu’akhat economics, Adhan revelation, pluralistic treaty, and turning prayer to Makkah.',
    keyFacts: [
      { lead: 'Mu’akhat Brotherhood:', detail: 'Ansar & homeless Muhajirin paired as full brothers; Abd al-Rahman chose market trade over handout.', ref: 'Sahih al-Bukhari 3780' },
      { lead: 'First Adhan & Mosque:', detail: 'Companions dreamt exact words of Adhan confirmed by Prophet ﷺ; Bilal became Islam’s first caller.', ref: 'Abu Dawud 499 (Sahih)' },
      { lead: 'Civic Charter (Sahifah):', detail: 'World’s earliest pluralistic municipal constitution guaranteeing religious freedom & mutual defense.', ref: 'Sirah Historical Charter' },
      { lead: 'Mid-Prayer Qiblah Shift (2 AH):', detail: 'After 16–17 months facing Jerusalem, Al-Baqarah 2:144 descended mid-Salah turning congregations toward Ka‘bah.', ref: 'Sahih al-Bukhari 40 & 4486' },
    ],
    quranVerses: [
      { surahNumber: 2, ayahNumber: 144, label: 'Al-Baqarah 2:143–144', whenAndWhy: 'Permanently directs global prayer toward Al-Masjid al-Haram while certifying prior Jerusalem prayers accepted.' },
      { surahNumber: 59, ayahNumber: 9, label: 'Al-Hashr 59:9', whenAndWhy: 'Praises selfless Ansar loving emigrants over personal need.' },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 40 & 4486',
        narrator: 'Al-Bara ibn Azib (RA)',
        factSummary: 'Assuring early martyrs’ accepted Jerusalem prayers',
        text: '"We prayed 16 or 17 months toward Bayt al-Maqdis before turned toward the Ka‘bah. People asked about deceased believers—then 2:143 came assuring Allah never wastes your faith/prayer!"',
      },
    ],
    verifiedTakeaways: [
      'Civic welfare, transparent trade, and religious liberty were established before Madinah’s battles.',
      'Qiblah pivot mid-Salah demonstrates immediate obedience to clear scripture.',
    ],
  },
  {
    id: 'curr-ch-17',
    order: 17,
    epochId: 'epoch-6-madinan-era',
    eraLabel: '17 Ramadan 2 AH (March 624 CE)',
    location: 'Wells of Badr (~130 km SW of Madinah)',
    title: 'Battle of Badr (Yawm al-Furqan) — 313 vs 1,000',
    coreFocus: 'Caravan origin, Hubab’s water strategy, all-night du‘a, 1,000 angels & literate ransoms.',
    keyFacts: [
      { lead: 'Force Balance:', detail: '313 Muslims (2 horses, 70 camels) vs ~1,000 armored Makkans (100 cavalry); 14 Muslims martyred vs 70 enemy slain.', ref: 'Sahih al-Bukhari 3957' },
      { lead: 'Military Counsel Accepted:', detail: 'Soldier Al-Hubab ibn al-Mundhir suggested advancing to closest water well—Prophet ﷺ adopted it immediately.', ref: 'Sirah & Bukhari Consultation Ethics' },
      { lead: 'Night Rain & Du‘a:', detail: 'Gentle rain firmed sandy soil; Prophet ﷺ prayed tearfully all night until his cloak fell.', ref: 'Sahih Muslim 1763' },
      { lead: 'Prisoners Taught Literacy:', detail: 'Surah Al-Anfal settled spoils distribution; literate captives freed by teaching 10 Madinan children to read & write.', ref: 'Surah Al-Anfal 8:1–41' },
    ],
    quranVerses: [
      { surahNumber: 8, ayahNumber: 9, label: 'Al-Anfal 8:9–12 & 41', whenAndWhy: 'Records 1,000 angelic reinforcements, hardening rain, and naming Badr "Day of Criterion".' },
      { surahNumber: 3, ayahNumber: 123, label: 'Ali ‘Imran 3:123–125', whenAndWhy: 'Reminds believers Allah granted victory at Badr when weak and outnumbered.' },
    ],
    sahihHadiths: [
      {
        source: 'Sahih Muslim 1763',
        narrator: 'Umar ibn al-Khattab (RA)',
        factSummary: 'Prophet’s agonizing night du‘a & Abu Bakr’s comfort',
        text: '"Seeing huge Quraysh force vs 313, he faced Qiblah crying: O Allah, if this small band perishes today, You will not be worshipped on Earth!—until Abu Bakr embraced him: Enough, Allah will fulfill His promise!"',
      },
      {
        source: 'Sahih al-Bukhari 3992',
        narrator: 'Rifa‘ah ibn Rafi‘ (RA)',
        factSummary: 'Angel Jibril honoring veterans of Badr',
        text: 'Jibril affirmed that even among angels, those who descended to fight at Badr hold highest distinction.',
      },
    ],
    verifiedTakeaways: [
      'Humane treatment of prisoners of war (equal food & education ransom) launched at Badr.',
      'Strategy + humble consulting + night du‘a form the complete Prophetic victory formula.',
    ],
  },
  {
    id: 'curr-ch-18',
    order: 18,
    epochId: 'epoch-6-madinan-era',
    eraLabel: 'Shawwal 3 AH (March 625 CE)',
    location: 'Mount Uhud & Hamra al-Asad',
    title: 'Battle of Uhud — Obedience Lesson & Courage of Companions',
    coreFocus: '3,000 vs 700, 40 archers abandoning Jabal al-Rumah, 70 martyrs & Hamra al-Asad bluff.',
    keyFacts: [
      { lead: 'Desertion Before Battle:', detail: 'Hypocrite chief Abdullah ibn Ubayy pulled 300 men back, leaving 700 Muslims facing 3,000 Quraysh.', ref: 'Surah Ali ‘Imran 3:167' },
      { lead: 'Critical Turning Error:', detail: '40 of 50 archers left Jabal al-Rumah pass for spoils against direct orders—allowing Khalid to flank from behind.', ref: 'Sahih al-Bukhari 3039' },
      { lead: 'Prophet Injured & 70 Martyrs:', detail: 'Helmet rings pierced his cheek & broken tooth; Hamzah, Mus‘ab & 70 fell while Nusaybah & Talhah shielded him.', ref: 'Sahih al-Bukhari 4043' },
      { lead: 'Dawn Pursuit Deterrence:', detail: 'Next day wounded believers marched out to Hamra al-Asad forcing Abu Sufyan away from attacking Madinah.', ref: 'Surah Ali ‘Imran 3:172–173' },
    ],
    quranVerses: [
      { surahNumber: 3, ayahNumber: 139, label: 'Ali ‘Imran 3:139–175', whenAndWhy: 'Comprehensive Quranic critique prohibiting despair and tracing error to disobeying prophetic command.' },
      { surahNumber: 3, ayahNumber: 159, label: 'Ali ‘Imran 3:159', whenAndWhy: 'Commands gentle consultation with Shura despite terrible losses caused by archers’ error.' },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3039 & 4043',
        narrator: 'Al-Bara & Sahl ibn Sa‘d (RA)',
        factSummary: 'Explicit archer orders & tending Prophet’s ﷺ facial wounds',
        text: '"Do not leave even if you see birds snatching us! ... When enemies broke lines, archers shouted Booty! leaving Abdullah ibn Jubayr almost alone until overwhelmed."',
      },
      {
        source: 'Sahih al-Bukhari 4563',
        narrator: 'Abdullah ibn Abbas (RA)',
        factSummary: 'Faithful response to retreat threats at Hamra al-Asad',
        text: 'Told Quraysh returned to wipe them out, believers only increased faith crying "Hasbunallahu wa ni‘mal-Wakil!" (3:173).',
      },
    ],
    verifiedTakeaways: [
      'Military/spiritual obedience outweighs immediate personal spoils.',
      'Islam strictly forbids corpse mutilation witnessed against Hamzah (RA).',
    ],
  },
  {
    id: 'curr-ch-19',
    order: 19,
    epochId: 'epoch-6-madinan-era',
    eraLabel: '2 – 6 AH · Madinah',
    location: 'Madinah al-Munawwarah',
    title: 'Ramadan Laws, Alcohol’s 4-Stage Ban & Banu Nadir',
    coreFocus: 'How social habits were transformed gradually via Surah 2:187, 4:43, 5:90, plus Dhat al-Riqa‘.',
    keyFacts: [
      { lead: 'Ramadan Ease (2:187):', detail: 'After tired farmer Qays fainted, Wahi eased eating/intimacy all night straight until dawn light.', ref: 'Sahih al-Bukhari 1915' },
      { lead: '4-Stage Wine Prohibition:', detail: '1) 16:67 contrast → 2) 2:219 sin > benefit → 3) 4:43 no prayer drunk → 4) 5:90 total permanent ban!', ref: 'Sahih al-Bukhari 2464' },
      { lead: 'Banu Nadir & Fay’ (4 AH):', detail: 'Expelled bloodlessly after plotting rooftop stone assassination; Surah 59 instituted welfare revenue justice.', ref: 'Surah Al-Hashr 59:2–10' },
      { lead: 'Salat al-Khawf (Dhat al-Riqa‘):', detail: 'Guarded Najd march introduced Prayer of Fear (4:102) & Bedouin sword miracle ("Who saves you?" — "Allah!").', ref: 'Sahih al-Bukhari 4136' },
    ],
    quranVerses: [
      { surahNumber: 2, ayahNumber: 187, label: 'Al-Baqarah 2:187', whenAndWhy: 'Grants ease in nighttime eating/Suhoor straight until Fajr dawn thread.' },
      { surahNumber: 5, ayahNumber: 90, label: 'Al-Ma’idah 5:90–91', whenAndWhy: 'Final permanent ban pouring wine streams across Madinah streets immediately.' },
      { surahNumber: 4, ayahNumber: 102, label: 'An-Nisa 4:102', whenAndWhy: 'First scripture legislating split-rank Prayer of Fear during armed alertness.' },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 2464 & 4993',
        narrator: 'Anas ibn Malik & Aishah (RA)',
        factSummary: 'Why gradual prohibition succeeded instantly once decreed',
        text: 'Aishah explained Creed came 13 years first before prohibiting wine; when 5:90 sounded, Anas poured every jar out without hesitating a single sip.',
      },
      {
        source: 'Sahih al-Bukhari 1916',
        narrator: 'Adi ibn Hatim (RA)',
        factSummary: 'Literal black & white thread clarification on Dawn 2:187',
        text: 'Clarified "white thread vs black thread" meant dawn daylight against night’s darkness rather than literal yarn under Adi’s pillow.',
      },
    ],
    verifiedTakeaways: [
      'Gradual Islamic reform addresses root belief before outlawing deeply rooted customs.',
      'Even in Najd’s battle march, Salah remained obligatory via Salat al-Khawf (Never skipped!).',
    ],
  },
  {
    id: 'curr-ch-20',
    order: 20,
    epochId: 'epoch-6-madinan-era',
    eraLabel: '5 AH (626 – 627 CE)',
    location: 'Al-Muraysi‘ & Northern Trench of Madinah',
    title: 'Trial of Al-Ifk, Women’s Rank (33:35) & Trench (5 AH)',
    coreFocus: 'Juwayriyyah’s tribe freed, Aishah cleared (24:11), 5.5 km trench vs 10,000 confederates.',
    keyFacts: [
      { lead: '100 Captive Families Freed:', detail: 'At Al-Muraysi‘ (5 AH), marriage to Juwayriyyah inspired believers to free ~100 families immediately.', ref: 'Sirah / Abu Dawud (Sahih)' },
      { lead: 'Al-Ifk & Slander Law (24:11):', detail: '30 days of painful rumor ended when Surah An-Nur cleared Aishah (RA) requiring 4 witnesses or 80 lashes.', ref: 'Sahih al-Bukhari 4141' },
      { lead: 'Salman’s 5.5 km Trench:', detail: '3,000 defenders stalled 10,000 confederates 27 days; freezing winds ended siege forever.', ref: 'Surah Al-Ahzab 33:9–25' },
      { lead: 'Umm Salamah & Khawlah Answered:', detail: '33:35 honored women equally in ten spiritual ranks; Allah heard Khawlah’s whisper from seven heavens (58:1).', ref: 'Tirmidhi 3211 & Bukhari' },
    ],
    quranVerses: [
      { surahNumber: 24, ayahNumber: 11, label: 'An-Nur 24:11–22', whenAndWhy: 'Permanent exoneration of Aishah (RA) and criminalizing unverified gossip.' },
      { surahNumber: 33, ayahNumber: 9, label: 'Al-Ahzab 33:9–27', whenAndWhy: 'Minute-by-minute narrative of the 10,000-man Trench siege & unseen winds.' },
      { surahNumber: 33, ayahNumber: 35, label: 'Al-Ahzab 33:35', whenAndWhy: 'Explicitly affirms equal spiritual reward for believing men and believing women.' },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 4141 & 4750',
        narrator: 'Aishah (RA)',
        factSummary: 'Full firsthand witness to Al-Ifk revelation',
        text: '"After 30 days weeping, revelation struck him right in our house; smiling through cold-weather sweat he proclaimed: Rejoice Aishah! Allah has sent down your full innocence!"',
      },
      {
        source: 'Sahih al-Bukhari 4101 & 4121',
        narrator: 'Jabir & Aishah (RA)',
        factSummary: 'Hungry trench labor & Banu Qurayzah treason judgment',
        text: 'Companions tied stones over starved bellies; post-siege treason judge Sa‘d ibn Mu‘adh applied Mosaic wartime covenant.',
      },
    ],
    verifiedTakeaways: [
      'After Khandaq’s collapse, Quraysh never launched another attack on Madinah again.',
      'Reputations are sacred: spreading unverified rumors is a major sin.',
    ],
  },
  {
    id: 'curr-ch-21',
    order: 21,
    epochId: 'epoch-6-madinan-era',
    eraLabel: '6 – 8 AH (628 – 629 CE)',
    location: 'Hudaybiyyah · Royal Courts · Khaybar',
    title: 'Treaty of Hudaybiyyah, Royal Letters & Khaybar',
    coreFocus: 'Bay‘at al-Ridwan tree pledge, "Fathan Mubina" 10-year truce, Envoys & Khaybar conquest.',
    keyFacts: [
      { lead: 'Pledge Under the Tree (6 AH):', detail: '1,400 unarmed pilgrims pledged steadfastness; none who pledged at Ridwan shall enter the Fire.', ref: 'Sahih Muslim 2496 & Bukhari 4185' },
      { lead: '"Clear Victory" in Compromise:', detail: '10-year truce ended Makkan quarantine; twice as many became Muslims in 2 peaceful years than in prior 19.', ref: 'Surah Al-Fath 48:1' },
      { lead: 'Letters to Emperors (7 AH):', detail: 'Dispatched envoys with silver seal to Heraclius, Chosroes, Muqawqis & Najashi inviting kingdoms peacefully.', ref: 'Sahih al-Bukhari 7' },
      { lead: 'Khaybar & Peaceful Sharecropping:', detail: 'Prophet ﷺ healed Ali’s eyes handing him banner; 8 forts fell before farmers stayed sharing 50% crops.', ref: 'Sahih al-Bukhari 3009 & 4210' },
    ],
    quranVerses: [
      { surahNumber: 48, ayahNumber: 1, label: 'Al-Fath 48:1–20', whenAndWhy: 'Revealed returning from Hudaybiyyah declaring truce "Manifest Victory" and promising Khaybar.' },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 4185 & 4833',
        narrator: 'Al-Bara & Anas (RA)',
        factSummary: 'Companions valued Hudaybiyyah truce as the real Victory',
        text: '"You count Conquest of Makkah as Fath, while we companions counted Bay‘at al-Ridwan on Hudaybiyyah Day as the true Victory!"',
      },
      {
        source: 'Sahih al-Bukhari 3009',
        narrator: 'Sahl ibn Sa‘d (RA)',
        factSummary: 'Mandate given Ali before fortress Al-Qamus',
        text: '"Advance steadily and invite them to Islam before attacking; if Allah guides one person through you, it is better for you than red camels."',
      },
    ],
    verifiedTakeaways: [
      'Strategic peace spreads truth faster than perpetual confrontation.',
      'Guidance of even one single human soul outweighs worldly wealth.',
    ],
  },
  {
    id: 'curr-ch-22',
    order: 22,
    epochId: 'epoch-6-madinan-era',
    eraLabel: '8 – 9 AH (629 – 631 CE)',
    location: 'Mu’tah (Jordan) · Makkah · Hunayn · Tabuk',
    title: 'Mu’tah, Conquest of Makkah, Hunayn & Tabuk',
    coreFocus: '3k vs 100k retreat, bloodless amnesty in Makkah, Hunayn lesson & Ka‘b’s 50-day truthfulness.',
    keyFacts: [
      { lead: 'Battle of Mu’tah (8 AH):', detail: '3,000 Muslims stood against ~100,000+ after envoy murdered; Zayd, Ja‘far & Ibn Rawahah martyred before Khalid saved army intact.', ref: 'Sahih al-Bukhari 4262' },
      { lead: 'Bloodless Conquest of Makkah:', detail: '10,000 marched after Khuza‘ah broken-pact massacre; toppled 360 idols chanting 17:81 with total forgiveness ("Go, you are free!").', ref: 'Sahih al-Bukhari 4287' },
      { lead: 'Hunayn Canyon Lesson:', detail: '12,000 panicked briefly in dawn ambush until rallied around unyielding Prophet ﷺ—proving numbers fail without reliance on Allah.', ref: 'Surah At-Tawbah 9:25' },
      { lead: 'Tabuk & Ka‘b’s Honesty (9 AH):', detail: '30,000 deterred Byzantium without combat; Ka‘b told plain truth over hypocrite excuses earning pardon after 50 days.', ref: 'Sahih al-Bukhari 4418' },
    ],
    quranVerses: [
      { surahNumber: 17, ayahNumber: 81, label: 'Al-Isra 17:81 & An-Nasr 110', whenAndWhy: 'Recited smashing Makkah’s idols; Surah 110 heralded tribes streaming into Islam.' },
      { surahNumber: 9, ayahNumber: 25, label: 'At-Tawbah 9:25 & 118', whenAndWhy: 'Lesson of humility at Hunayn and Ka‘b ibn Malik’s accepted 50-day dawn repentance.' },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 4262 & 4316',
        narrator: 'Anas & Al-Bara (RA)',
        factSummary: 'Prophetic courage under fire at Mu’tah report & Hunayn ambush',
        text: 'Narrated Mu’tah’s live martyrdoms in tears while praising Sayfullah Khalid; stood unmoved shouting "I am the Prophet, no lie!" reversing Hunayn.',
      },
      {
        source: 'Sahih al-Bukhari 4418',
        narrator: 'Ka‘b ibn Malik (RA)',
        factSummary: 'Saving truthfulness after missing Tabuk expedition',
        text: 'Refused to invent lies like hypocrites; endured 50 silent days and rejected foreign king’s shelter until 9:118 descended declaring pardon.',
      },
    ],
    verifiedTakeaways: [
      'Unmatched amnesty conquered Makkah’s hearts without vengeance.',
      'Honesty after serious failure saves believers while hypocrite excuses destroy.',
    ],
  },
  {
    id: 'curr-ch-23',
    order: 23,
    epochId: 'epoch-7-completion',
    eraLabel: '10 – 11 AH (632 CE · Age 63)',
    location: 'Mount Arafat & Madinah Chamber',
    title: 'Farewell Pilgrimage, Final Verses & Passing',
    coreFocus: 'Arafat equality charter, Surah 5:3 completion, Jibril’s double review & Monday dawn.',
    keyFacts: [
      { lead: '100,000+ at Arafat (10 AH):', detail: 'Abolished racism ("Only Taqwa excels!"), cancelled usury & blood feuds, mandated fair rights for women.', ref: 'Sahih Muslim 1218' },
      { lead: 'Perfection Verse (Al-Ma’idah 5:3):', detail: 'Descended Friday on Arafat sealing Islam permanently; Umar wept sensing impending farewell.', ref: 'Sahih al-Bukhari 45' },
      { lead: 'Double Review & Final Verse:', detail: 'Jibril audited whole Qur’an TWICE with him in final Ramadan; Al-Baqarah 2:281 descended ~9 nights prior to death.', ref: 'Bukhari 4998 & 4544' },
      { lead: 'Final Wishes & Passing (11 AH):', detail: 'Gave away final 7 coins, forbade grave-shrines, smiled at congregational Fajr behind Abu Bakr, passed leaning on Aishah (RA).', ref: 'Sahih al-Bukhari 4449 & 4463' },
    ],
    quranVerses: [
      { surahNumber: 5, ayahNumber: 3, label: 'Al-Ma’idah 5:3', whenAndWhy: 'Revealed Friday evening at Arafat certifying Islam perfected and completed forever.' },
      { surahNumber: 2, ayahNumber: 281, label: 'Al-Baqarah 2:281', whenAndWhy: 'Authenticated by Ibn Abbas (RA) as the very last verse revealed on Earth.' },
      { surahNumber: 3, ayahNumber: 144, label: 'Ali ‘Imran 3:144', whenAndWhy: 'Recited by Abu Bakr (RA) steadying grieving companions after Prophet’s ﷺ passing.' },
    ],
    sahihHadiths: [
      {
        source: 'Sahih Muslim 1218 & Bukhari 4449',
        narrator: 'Jabir & Aishah (RA)',
        factSummary: 'Arafat Charter + serene final departure',
        text: '"Your blood, wealth, and honor are sacred! I left among you the Book of Allah—hold it fast and never go astray." Days later with miswak in hand, he chose "The Highest Companion!"',
      },
      {
        source: 'Sahih al-Bukhari 4998',
        narrator: 'Abu Hurayrah (RA)',
        factSummary: 'Final complete Ramadan Qur’an verification',
        text: '"Jibril used to review the Qur’an with him once every year, and reviewed it TWICE in the year he passed away."',
      },
    ],
    verifiedTakeaways: [
      'Complete Qur’an sequence was verified twice directly with Jibril prior to 11 AH.',
      'Racism, usury, and grave-worship stand explicitly condemned in Islam’s parting words.',
    ],
  },
  {
    id: 'curr-ch-24',
    order: 24,
    epochId: 'epoch-8-preservation',
    eraLabel: '11 – 40 AH (632 – 661 CE)',
    location: 'Yamamah · Madinah · Jerusalem · Yarmouk · Qadisiyyah',
    title: 'Khulafa Rashidin, Yamamah & Preserving Qur’an + Hadith',
    coreFocus: 'How 70 Huffaz falling at Yamamah led Abu Bakr & Uthman to preserve the Mushaf + Isnad.',
    keyFacts: [
      { lead: 'Abu Bakr & Battle of Yamamah (11 AH):', detail: '13,000 overcame false prophet Musaylimah’s 40,000 at Garden of Death—at cost of 70+ Qur’an Huffaz martyrs.', ref: 'Sahih al-Bukhari 4986' },
      { lead: 'Abu Bakr’s Master Suhuf (12 AH):', detail: 'Umar urged Abu Bakr to task scribe Zayd ibn Thabit uniting all skins/bones + two eyewitnesses + memory into one safe volume held by Hafsah (RA).', ref: 'Sahih al-Bukhari 4986' },
      { lead: 'Uthman’s Global Mushafs (25 AH):', detail: 'Zayd’s committee copied Hafsah’s verified sheets sending uniform Mushafs across all provinces with certified reciters.', ref: 'Sahih al-Bukhari 4987' },
      { lead: 'Umar’s Justice & Hadith Isnad:', detail: 'Yarmouk/Qadisiyyah victories followed by peaceful Covenant of Jerusalem; Ali & Companions instituted strict Isnad chains verifying Sahih Hadith.', ref: 'Sahih Muslim Intro (Isnad)' },
    ],
    quranVerses: [
      { surahNumber: 15, ayahNumber: 9, label: 'Al-Hijr 15:9', whenAndWhy: 'Divine promise fulfilling preservation through living memory AND dual-witness parchment verification.' },
      { surahNumber: 54, ayahNumber: 17, label: 'Al-Qamar 54:17', whenAndWhy: '"We made the Qur’an easy for remembrance"—confirmed by millions of Huffaz every era.' },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 4986 & 4987',
        narrator: 'Zayd ibn Thabit & Anas ibn Malik (RA)',
        factSummary: 'Strict double-verification compiling written Mushaf',
        text: 'Zayd gathered every written fragment only when matched by living Huffaz memory and two witnesses who saw it written before the Prophet ﷺ—creating today’s exact identical Qur’an.',
      },
      {
        source: 'Sahih al-Bukhari 7315 & Muslim Intro',
        narrator: 'Ibn Sirin & Abu Bakr',
        factSummary: 'Birth of Isnad verification in Sahih Hadith',
        text: 'Scholars accepted zero narrations without tracing unbroken chains back through upright, sharp-memoried eyewitness Companions.',
      },
    ],
    verifiedTakeaways: [
      'Every Qur’an printed globally today traces cleanly back to Zayd’s double-verified text (12–25 AH).',
      'Hadith science (Isnad) represents history’s strictest eyewitness verification system.',
    ],
  },
];
