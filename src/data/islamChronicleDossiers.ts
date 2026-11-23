import { TimelineHadith } from '../types/timeline';

export interface ChronicleEssentialFact {
  label: string;
  value: string;
}

export interface ChronicleNarrativeSection {
  sectionNumber: number;
  title: string;
  sceneLabel: string;
  content: string;
  keyDetail: string;
}

export interface ChroniclePersonProfile {
  name: string;
  role: string;
  contribution: string;
}

export interface ChronicleRevelationAnatomy {
  triggeringSituation: string;
  howWahiArrived: string;
  companionResponse: string;
  lastingRuling: string;
}

export interface ChronicleEnrichedHadith extends TimelineHadith {
  lessonPoint: string;
}

export interface ChronicleStudyCheckpoint {
  question: string;
  answer: string;
  reference: string;
}

export interface ChronicleDeepDossier {
  chapterId: string;
  essentialFacts: ChronicleEssentialFact[];
  deepHistoricalContext: string;
  chapterSections: ChronicleNarrativeSection[];
  revelationAnatomy: ChronicleRevelationAnatomy;
  personProfiles: ChroniclePersonProfile[];
  extraSahihHadiths: ChronicleEnrichedHadith[];
  studyCheckpoints: ChronicleStudyCheckpoint[];
}

export const CHRONICLE_DEEP_DOSSIERS: Record<string, ChronicleDeepDossier> = {
  'ch-01-pen-and-throne': {
    chapterId: 'ch-01-pen-and-throne',
    essentialFacts: [
      { label: 'Era & Sequence', value: '50,000+ years prior to skies & Earth' },
      { label: 'Domain', value: 'Al-‘Arsh (Throne) over Water & Al-Lawh al-Mahfuz' },
      { label: 'Foundational Creed', value: 'Tawhid & Al-Qadar (Divine Knowledge)' },
      { label: 'Opening Decree', value: '"My Mercy prevails over My Wrath"' },
    ],
    deepHistoricalContext:
      'Unlike mythologies that begin with competing gods or blind chaos, Islam roots history inside deliberate Divine Knowledge. Before physical matter, angels, stars, or humans existed, Allah alone was sovereign and self-sufficient. Understanding this opening chapter cures existential anxiety: every historical rise, hardship, and scriptural revelation unfolds inside an exact, merciful cosmic architecture.',
    chapterSections: [
      {
        sectionNumber: 1,
        title: 'Al-‘Arsh Above Water & Creation of Al-Qalam',
        sceneLabel: 'First Created Order',
        content:
          'Prophetic narration in Sahih Muslim (2653b) reveals that Allah created the Pen (Al-Qalam) fifty millennia before shaping the celestial vault and terrestrial spheres. Commanded to write, the Pen inscribed the complete unfolding of deeds, lifespans, and provision upon the Guarded Tablet (Al-Lawh al-Mahfuz).',
        keyDetail: 'Knowledge precedes action: nothing surprises the Creator of time.',
      },
      {
        sectionNumber: 2,
        title: 'Six Cosmic Periods & Architecture of the Seven Heavens',
        sceneLabel: 'Formation of Creation',
        content:
          'Allah fashioned the earth, mountains, nourishment, and seven heavens systematically across six cosmic periods (Surah Fussilat 41:9–12), adorning the lowest heaven with burning lamps and placing Al-Bayt al-Ma‘mur in the seventh heaven directly mirroring the future earthly Ka‘bah below.',
        keyDetail: 'Earth’s sustenance and gravity were calibrated before humans ever stepped upon soil.',
      },
      {
        sectionNumber: 3,
        title: 'Three Distinct Rational Realms: Angels, Jinn & Humanity',
        sceneLabel: 'Created Substances & Roles',
        content:
          'Sahih Muslim (2996) distinguishes creation’s moral species cleanly: Angels were shaped from pure Nur (light) with zero inclination toward rebellion; Jinn were formed from smokeless flame earlier and inhabited Earth with free choice; Humanity would later be fashioned from diverse earth clay combined with divine spirit.',
        keyDetail: 'Al-Jinn’s earlier bloodshed on Earth explained why angels later asked carefully about human stewardship.',
      },
    ],
    revelationAnatomy: {
      triggeringSituation:
        'Makkan polytheists mocked resurrection and asked how one unlettered man could speak with authority about cosmic beginnings.',
      howWahiArrived:
        'Al-Lawh al-Mahfuz itself already safeguarded the complete Arabic Qur’an (Surah Al-Buruj 85:21–22) prior to its descent on Laylat al-Qadr.',
      companionResponse:
        'Believers learned never to boast over personal piety—understanding guidance itself is pure gift inscribed by Allah’s mercy.',
      lastingRuling:
        'Belief in Al-Qadar (Destiny) means trusting Allah’s pre-written wisdom while striving diligently through lawful means.',
    },
    personProfiles: [
      {
        name: 'Angel Jibril (Al-Ruh al-Amin)',
        role: 'Chief Messenger of Revelation',
        contribution: 'Possesses 600 magnificent wings covering the horizon; entrusted with delivering every scripture from the Throne Realm to prophets.',
      },
      {
        name: 'Angel Mika’il & Angel Israfil',
        role: 'Provision & Resurrection',
        contribution: 'Mika’il administers rain and plant growth by Allah’s command; Israfil awaits holding the Trumpet for the Day of Accounting.',
      },
    ],
    extraSahihHadiths: [
      {
        source: 'Sahih al-Bukhari 7418',
        narrator: 'Imran ibn Husayn (RA)',
        textEnglish:
          'The Prophet ﷺ told visitors from Yemen: "There was Allah and nothing else before Him, and His Throne was over the water, and He wrote all things in the Book (of Decrees), then He created the heavens and the earth."',
        lessonPoint: 'Establishes absolute pre-eternity of Allah alone prior to space and time.',
      },
      {
        source: 'Sahih Muslim 2753',
        narrator: 'Abu Hurayrah (RA)',
        textEnglish:
          'Allah divided mercy into one hundred parts, keeping ninety-nine with Himself and sending just one part down to Earth—by which creatures show compassion to one another, even a mare lifting her hoof from her foal.',
        lessonPoint: '99% of divine mercy awaits believers in the Hereafter.',
      },
    ],
    studyCheckpoints: [
      {
        question: 'How long before heavens and earth did Allah write destiny upon Al-Lawh al-Mahfuz?',
        answer: 'Fifty thousand years before creating the heavens and earth.',
        reference: 'Sahih Muslim 2653b',
      },
      {
        question: 'What inscription rests directly with Allah above His Throne?',
        answer: '"Verily, My Mercy prevails over My Wrath."',
        reference: 'Sahih al-Bukhari 3194',
      },
      {
        question: 'From what substances were Angels, Jinn, and Adam formed respectively?',
        answer: 'Angels from light, Jinn from smokeless flame, and Adam from clay.',
        reference: 'Sahih Muslim 2996',
      },
    ],
  },
  'ch-02-adam-and-covenant': {
    chapterId: 'ch-02-adam-and-covenant',
    essentialFacts: [
      { label: 'Era & Height', value: 'First Human · Sixty Cubits Tall' },
      { label: 'Core Covenant', value: 'Alastu bi-Rabbikum (Surah 7:172)' },
      { label: 'Adversary Vow', value: 'Iblis’s War on Human Weakness' },
      { label: 'Human Salve', value: 'Sincere Tawbah (Repentance)' },
    ],
    deepHistoricalContext:
      'Adam (AS) was never an accidental evolutionary byproduct nor fallen under hereditary original sin. Allah created him deliberately in dignity—summoning soil across red, black, white, and soft earths so humanity would span diverse temperaments and complexions while sharing one spiritual soul and one moral accountability.',
    chapterSections: [
      {
        sectionNumber: 1,
        title: 'Clay Across All Earths & The 60-Cubit Assembly',
        sceneLabel: 'Honored Creation',
        content:
          'Angels observed Adam’s silent sculpted frame before life breathed into him on a blessed Friday. Sahih Muslim confirms Friday is the best day the sun rises upon: Adam was created on Friday, entered Jannah on Friday, descended to Earth on Friday, and the Hour establishes on Friday.',
        keyDetail: 'All human races trace to one single ancestral family without racial hierarchy.',
      },
      {
        sectionNumber: 2,
        title: 'The Greed Test of Iblis & The Primordial Oath',
        sceneLabel: 'Alastu Valley & Paradise',
        content:
          'When Iblis refused prostration declaring fire superior to clay, he introduced racism and envy into the cosmos. Meanwhile at Wadi Na‘man, every future descendant’s soul affirmed Tawhid ("Yes, we testify You are our Lord!") so disbelief is never natural but learned distortion.',
        keyDetail: 'Adam was neither tricked out of hatred nor cursed perpetually—his slip became humanity’s first lesson in returning to Allah.',
      },
      {
        sectionNumber: 3,
        title: 'First Prayer of Tawbah & Earthly Guardianship',
        sceneLabel: 'Descent & Worship',
        content:
          'Teaching Adam exact words of remorse (Surah Al-A‘raf 7:23: "Our Lord, we have wronged ourselves..."), Allah accepted his repentance completely before sending him downward—proving human dignity rests not on sinlessness, but returning quickly to Allah.',
        keyDetail: 'Qabil’s murder of Habil stemmed from jealousy over rejected sincerity—teaching worship requires pure heart (Taqwa).',
      },
    ],
    revelationAnatomy: {
      triggeringSituation:
        'Madinan scholars of prior scriptures debated humanity’s origins, and Makkan idolaters excused polytheism as merely copying forefathers.',
      howWahiArrived:
        'Through Surah Al-Baqarah (2:30–39) and Al-A‘raf (7:172), Wahi dismantled ancestral blind following by appealing to every human soul’s pre-earthly memory of Tawhid.',
      companionResponse:
        'Companions revered Friday worship and practiced Salam constantly after hearing it was Adam’s very first spoken greeting.',
      lastingRuling:
        'Zero inherited "Original Sin": every newborn enters life clean upon Fitrah; repentance erases any sin cleanly.',
    },
    personProfiles: [
      {
        name: 'Prophet Adam (Abu al-Bashar, AS)',
        role: 'First Human & First Prophet',
        contribution: 'Taught names/sciences of creation, greeted angels with Salam, lived nearly 1,000 years, and bequeathed repentance over despair.',
      },
      {
        name: 'Hawwa (Eve, AS)',
        role: 'First Mother of Humanity',
        contribution: 'Shared evenly in Paradise accountability and sincerely joined Adam in Al-A‘raf 7:23 repentance—not cast as a lone tempter.',
      },
      {
        name: 'Habil (Abel)',
        role: 'First Innocent Victim & Righteous Example',
        contribution: 'Refused to raise his hand to murder even to save himself, fearing Allah (Surah 5:28).',
      },
    ],
    extraSahihHadiths: [
      {
        source: 'Sahih Muslim 2556 & Sahih al-Bukhari 3336',
        narrator: 'Abu Hurayrah (RA)',
        textEnglish:
          'In the Hereafter, Moses will debate Adam over why Adam’s slip left Jannah; Adam will remind Musa that Allah Himself accepted his repentance and wrote events long beforehand—and "Adam won the argument over Musa!"',
        lessonPoint: 'Believers never hold grudges over sins already sincerely repented of and forgiven by Allah.',
      },
    ],
    studyCheckpoints: [
      {
        question: 'Did Qur’an blame Hawwa alone for tasting the forbidden tree?',
        answer: 'No. Surah 7:20–23 shows Satan whispered to both equally, and both repented together ("Rabbana zalamna anfusana").',
        reference: 'Surah Al-A‘raf 7:20–23',
      },
      {
        question: 'What did every human child’s soul testify before earthly birth?',
        answer: '"Alastu bi-Rabbikum?" — "Yes, You are our Lord, we bear witness!"',
        reference: 'Surah Al-A‘raf 7:172',
      },
    ],
  },
  'ch-03-nuh-flood-ibrahim-kabah': {
    chapterId: 'ch-03-nuh-flood-ibrahim-kabah',
    essentialFacts: [
      { label: 'Monotheist Span', value: '10 straight generations between Adam & Nuh' },
      { label: 'Nuh’s Mission', value: '950 Years Calling Day & Night' },
      { label: 'Makkah Builders', value: 'Ibrahim, Hajar & Infant Isma‘il (AS)' },
      { label: 'Eternal Answered Dua', value: 'Sending Final Prophet Muhammad ﷺ' },
    ],
    deepHistoricalContext:
      'Idol worship was not primitive ignorance—it originated from excessive reverence of saintly humans after Nuh’s generation mourned pious elders. Nine and a half centuries of patience under Nuh and Ibrahim’s radical iconoclasm link Mesopotamia directly to Arabia: Makkah was built explicitly as earth’s pure sanctuary of Abraham’s monotheism.',
    chapterSections: [
      {
        sectionNumber: 1,
        title: 'How Idolatry Began & Nuh’s 950-Year Patience',
        sceneLabel: 'Mesopotamia & The Ark',
        content:
          'Ibn Abbas (Bukhari 4920) traces the exact root of Arabian idols: five devout saints from Nuh’s era passed away, and their admirers carved commemorative statues to boost worship—until later unlearned generations knelt to the stone itself. Nuh endured mocking and beatings for 950 years until no new believer arose, then built the three-level Ark grounded finally on Mount Judi.',
        keyDetail: 'Bloodline never guarantees faith: even Nuh’s stubborn son perished for rejecting submission.',
      },
      {
        sectionNumber: 2,
        title: 'Shattering Ur’s Idols & Coolness in Nimrod’s Furnace',
        sceneLabel: 'Babylon → Palestine',
        content:
          'Reasoning patiently with father Azar, stars, moon, and sun-worshipers, young Ibrahim shattered temple idols leaving the axe on the largest idol to expose helplessness. Condemned to catapult-fire by King Nimrod, he whispered "Hasbunallahu wa ni‘mal-Wakil!"—identical words later uttered by Muhammad ﷺ after Uhud (Bukhari 4563).',
        keyDetail: 'True courage rests upon Allah alone when outnumbered by empires.',
      },
      {
        sectionNumber: 3,
        title: 'Hajar’s Trust, Zamzam & Raising the Sacred House',
        sceneLabel: 'Valley of Bakkah (Makkah)',
        content:
          'Leaving Hajar and infant Isma‘il in uninhabited desert with water skins, Ibrahim silently turned away until Hajar asked one question: "Did Allah command this?" Hearing "Yes," she replied: "Then He will never waste us!" Her desperate sprint between Safa and Marwah seven times was honored forever in Hajj Sa‘i before Jibril uncovered Zamzam.',
        keyDetail: 'Returning later, Isma‘il carried stones while Ibrahim stood upon Maqam Ibrahim raising the Ka‘bah.',
      },
    ],
    revelationAnatomy: {
      triggeringSituation:
        'Quraysh boasted custodian pride over the Ka‘bah while filling its courtyard with 360 idols—yet mocking a Messenger who claimed Ibrahim’s mantle.',
      howWahiArrived:
        'Surah Al-Baqarah (2:124–135) & Al-Anbiya exposed the contradiction: Ibrahim never prayed to stones—he built the Ka‘bah solely for One God and prayed specifically for a Qurayshi Messenger (2:129).',
      companionResponse:
        'Companions performed Hajj and sacrificed on Eid al-Adha knowing every step honored Hajar, Isma‘il, and Ibrahim (AS).',
      lastingRuling:
        'Grave monuments or statues of pious elders must never become objects of supplication or excessive veneration.',
    },
    personProfiles: [
      {
        name: 'Prophet Nuh (Shaykh al-Mursalin, AS)',
        role: 'First Messenger Sent to Polytheists',
        contribution: 'Preached secretly, openly, collectively, and individually for 950 years with unmatched patience.',
      },
      {
        name: 'Lady Hajar (AS)',
        role: 'Mother of Arab Lineage & Hajj Sa‘i',
        contribution: 'Pioneered unshakable reliance on Allah in total solitude—honored five millionfold yearly between Safa and Marwah.',
      },
      {
        name: 'Prophet Isma‘il (AS)',
        role: 'Co-Builder of the Ka‘bah & Patient Youth',
        contribution: 'When Ibrahim told him of the dream of sacrifice, calmly replied: "Father, do as commanded—you will find me steadfast!"',
      },
    ],
    extraSahihHadiths: [
      {
        source: 'Sahih al-Bukhari 4563',
        narrator: 'Abdullah ibn Abbas (RA)',
        textEnglish:
          'The words "Allah is sufficient for us, and He is the best Disposer of affairs" were spoken by Ibrahim when cast into the fire AND by Muhammad ﷺ when told armies had gathered against them after Uhud.',
        lessonPoint: 'One single du‘a unites prophetic resistance across thousands of years.',
      },
    ],
    studyCheckpoints: [
      {
        question: 'How did idol worship originally enter human history according to Sahih al-Bukhari 4920?',
        answer: 'Later generations began worshipping commemorative statues originally carved of five righteous men.',
        reference: 'Sahih al-Bukhari 4920',
      },
      {
        question: 'What exact words did Hajar speak when left in uninhabited Makkah?',
        answer: '"Did Allah command you to do this? ... Then He will never abandon or destroy us!"',
        reference: 'Sahih al-Bukhari 3364',
      },
    ],
  },
  'ch-04-musa-dawud-isa': {
    chapterId: 'ch-04-musa-dawud-isa',
    essentialFacts: [
      { label: 'Scriptures', value: 'Tawrah (Musa), Zabur (Dawud), Injil (Isa)' },
      { label: 'Core Theme', value: 'Faithful Liberation & Foretelling Ahmad' },
      { label: 'Blueprint Battle', value: '313 under Talut & Dawud vs Jalut' },
      { label: 'Isa’s Prophecy', value: 'As-Saff 61:6 Naming Ahmad ﷺ' },
    ],
    deepHistoricalContext:
      'Bani Isra’il received more prophets, liberation miracles, and heavenly scriptures than any ancient nation—showing both soaring triumph (Musa at the Red Sea, Dawud defeating Jalut, Sulayman ruling justly) and cautionary failure whenever pride or neglect of scripture crept in. Prophet Muhammad ﷺ treated Musa and Isa as dearest brothers in one identical family.',
    chapterSections: [
      {
        sectionNumber: 1,
        title: 'Musa (AS), Pharaoh’s Court & Ashura Liberation',
        sceneLabel: 'Nile to Mount Tur',
        content:
          'Raised inside Pharaoh’s very household under Queen Asiyah’s love, Musa received direct Divine speech at burning Sinai. After nine plagues failed to break Pharaoh’s tyranny, Israel marched until trapped between chariot armies and the Red Sea—where Musa struck the water yielding twelve dry paths before waves closed over Pharaoh.',
        keyDetail: 'Allah even preserved Pharaoh’s body as an unmistakable physical sign (Surah Yunus 10:92).',
      },
      {
        sectionNumber: 2,
        title: 'King Talut, River Discipline & Young Dawud vs Jalut',
        sceneLabel: 'First Faith Battle Detailed in Qur’an',
        content:
          'Centuries later, 313 disciplined believers passed King Talut’s river-drinking self-control test. Stepping forward against heavily armored giant Jalut, slender shepherd Dawud used a simple sling chanting Surah 2:250—"Our Lord, pour upon us patience and make our feet firm!"—felling Jalut and pioneering iron armor craftsmanship & Zabur psalms.',
        keyDetail: 'Centuries later, Badr’s exact count of 313 Muslims directly echoed Talut’s tested minority.',
      },
      {
        sectionNumber: 3,
        title: 'Sulayman’s Kingdom & Isa Foretelling Ahmad ﷺ',
        sceneLabel: 'Jerusalem & Bethlehem',
        content:
          'King Sulayman commanded winds, understood tiny ants’ warnings (27:18), and guided Queen Bilqis to submit cleanly to Allah alone. Finally, Maryam’s miraculous virgin-born son Isa revived the dead by Allah’s leave, defended pure worship without Trinity distortion, and declared explicitly in Surah As-Saff 61:6 that an awaited Messenger named Ahmad would seal guidance.',
        keyDetail: 'Allah raised Isa alive unto Himself (Surah An-Nisa 4:157–158), promising his just return before the Hour.',
      },
    ],
    revelationAnatomy: {
      triggeringSituation:
        'Madinan Jewish tribes questioned Muhammad’s Prophetic credentials and wondered why he claimed kinship with Musa and Isa.',
      howWahiArrived:
        'Through Surah Al-Baqarah, Al-Kahf (Musa & Khidr), Maryam, and As-Saff, Qur’an narrated insider scriptural details unknown to an unlettered Makkan merchant.',
      companionResponse:
        'On 10 Muharram (Ashura), Companions enthusiastically joined the Prophet ﷺ fasting in solidarity with Musa’s rescue.',
      lastingRuling:
        'True faith requires honoring and believing in ALL prior Prophets (Adam through Isa) without mocking or separating them (2:285).',
    },
    personProfiles: [
      {
        name: 'Lady Asiyah (Wife of Pharaoh, RA)',
        role: 'One of Four Perfected Women of Humanity',
        contribution: 'Chose Allah over royal palaces, sheltered baby Musa, and prayed for a home beside Allah in Paradise (66:11).',
      },
      {
        name: 'Sayyidah Maryam (RA)',
        role: 'Purest Woman Chosen Above All Nations',
        contribution: 'Dedication inside Jerusalem’s sanctuary; miraculously conceived Prophet Isa by Allah’s creative command "Be!"',
      },
    ],
    extraSahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3957',
        narrator: 'Al-Bara ibn Azib (RA)',
        textEnglish:
          'The Companions of Muhammad ﷺ who fought at Badr used to tell us their exact number matched the exact number of Talut’s companions who crossed the river with him—three hundred and thirteen men.',
        lessonPoint: 'Historical courage scales through discipline rather than numerical ego.',
      },
    ],
    studyCheckpoints: [
      {
        question: 'Why did Prophet Muhammad ﷺ fast on Ashura (10 Muharram) in Madinah?',
        answer: 'To thank Allah for saving Musa and Bani Isra’il from Pharaoh—affirming "We have a closer right to Musa!"',
        reference: 'Sahih al-Bukhari 2004',
      },
      {
        question: 'How did Talut filter his troops before facing Jalut?',
        answer: 'By forbidding troops from drinking deeply from a river crossing—measuring self-restraint.',
        reference: 'Surah Al-Baqarah 2:249',
      },
    ],
  },
  'ch-05-jahiliyyah-birth-youth': {
    chapterId: 'ch-05-jahiliyyah-birth-youth',
    essentialFacts: [
      { label: 'Birth Date', value: 'Monday, Rabi al-Awwal · Year of Elephant (570 CE)' },
      { label: 'Tribal Honor Title', value: 'As-Sadiq Al-Amin (Truthful & Trustworthy)' },
      { label: 'Pre-Prophetic Alliance', value: 'Hilf al-Fudul (Chivalry Pact, Age 20)' },
      { label: 'Marriage', value: 'Khadijah bint Khuwaylid (Age 25)' },
    ],
    deepHistoricalContext:
      'By 570 CE, humanity stood fractured: Sasanian Persia and Byzantine Rome exhausted themselves in brutal wars while pre-Islamic Arabia buried newborn daughters out of shame, waged 40-year feuds over camel insults, and surrounded Abraham’s Ka‘bah with 360 idols. Yet inside that very darkness, Allah raised one orphan untouched by drinking, idol feasts, or falsehood.',
    chapterSections: [
      {
        sectionNumber: 1,
        title: 'Abraha’s Elephant Army & Defense of the Ka‘bah (570 CE)',
        sceneLabel: 'Mughammas Outside Makkah',
        content:
          'Envious of Arab pilgrimage loyalty, Yemeni governor Abraha marched an armored host headed by war elephant Mahmud. Meeting Abd al-Muttalib only to reclaim 200 camels, the grandfather spoke immortal words: "I own the camels; this House has a Lord Who will protect it!" Every step toward Makkah froze Mahmud onto his knees before waves of Ababil birds rained clay-stones wiping out the invaders.',
        keyDetail: 'Dated 570 CE—exact birth year of Prophet Muhammad ﷺ.',
      },
      {
        sectionNumber: 2,
        title: 'Orphanhood, Halimah’s Desert & Chest-Cleansing Miracle',
        sceneLabel: 'Makkah & Ta’if Highlands',
        content:
          'Having lost father Abdullah before birth, blessed baby Muhammad blessed Halimah’s struggling Banu Sa‘d home with overflowing milk and lush pastures. Aged ~4, Jibril gently split his chest, extracted a tiny dark clot ("Satan’s share"), washed his heart with snow in a golden basin, and restored him whole—losing his mother Aminah at age 6 and grandfather at 8 under loyal uncle Abu Talib’s roof.',
        keyDetail: 'Years later, elders who opposed Islam still admitted Al-Amin never lied once in forty years.',
      },
      {
        sectionNumber: 3,
        title: 'Hilf al-Fudul, Khadijah’s Proposal & The Black Stone Arbitration',
        sceneLabel: 'Ages 20–35 in Makkah',
        content:
          'Defending a cheated foreign merchant birthed Hilf al-Fudul—a justice covenant Muhammad ﷺ declared even after Islam he would still honor. Managing wealthy merchant Khadijah’s Syrian trade honestly led Khadijah (RA) to propose a 25-year deeply faithful marriage. At age 35, spreading his cloak so all competing clans carried the Black Stone jointly stopped civil war effortlessly.',
        keyDetail: 'Forty years of public character established irrefutable credibility before a single verse descended.',
      },
    ],
    revelationAnatomy: {
      triggeringSituation:
        'Years after prophethood began, critics tried questioning his motives—yet Allah pointed straight back to his forty spotless pre-prophetic years inside Makkah itself (Yunus 10:16).',
      howWahiArrived:
        'Surah Al-Fil (105) & Quraysh (106) invoked Makkah’s own living eyewitness memories of 570 CE.',
      companionResponse:
        'Even hostile chief Abu Sufyan later stood before Byzantine Emperor Heraclius forced to confess: "We never caught Muhammad telling even a single lie!" (Bukhari 7).',
      lastingRuling:
        'Personal integrity, standing up for oppressed strangers, and arbitrating peace sit at Islam’s foundation.',
    },
    personProfiles: [
      {
        name: 'Abd al-Muttalib',
        role: 'Custodian of Zamzam & Grandfather',
        contribution: 'Rediscovered long-buried Zamzam well and showed total reliance on Allah facing Abraha’s elephants.',
      },
      {
        name: 'Abu Talib ibn Abd al-Muttalib',
        role: 'Loving Uncle & Guardian',
        contribution: 'Protected orphaned Muhammad tirelessly across childhood and ten bitter Makkan persecution years despite clan pressure.',
      },
      {
        name: 'Umm al-Mu’minin Khadijah (RA)',
        role: 'Noble Merchant & First Wife',
        contribution: 'Witnessed his spotless ethics in Syrian trade; raised his family and shielded every step of early Islam.',
      },
    ],
    extraSahihHadiths: [
      {
        source: 'Sahih al-Bukhari 7',
        narrator: 'Abdullah ibn Abbas (RA)',
        textEnglish:
          'When Byzantine Emperor Heraclius interrogated Abu Sufyan—still an opponent of Islam—asking "Have you ever accused him of lying before he claimed this?", Abu Sufyan admitted reluctantly: "No! Never!"',
        lessonPoint: 'Even sworn enemies testified to Muhammad’s pre-prophetic truthfulness.',
      },
    ],
    studyCheckpoints: [
      {
        question: 'What was Hilf al-Fudul that Muhammad ﷺ praised even after Islam?',
        answer: 'A chivalry pact inside Ibn Jud‘an’s home pledging to defend any oppressed stranger inside Makkah regardless of tribe.',
        reference: 'Sirah & Musnad Ahmad (Sahih)',
      },
      {
        question: 'How did Muhammad ﷺ prevent bloodshed over placing the Black Stone at age 35?',
        answer: 'Spread his cloak so each tribe held an edge together, then lifted it cleanly into place with his own hands.',
        reference: 'Sahih Sirah Reports',
      },
    ],
  },
  'ch-06-cave-hira-first-revelation': {
    chapterId: 'ch-06-cave-hira-first-revelation',
    essentialFacts: [
      { label: 'Moment', value: 'Laylat al-Qadr · Ramadan 610 CE (Age 40)' },
      { label: 'Location', value: 'Cave of Hira, Jabal al-Nur (Makkah)' },
      { label: 'First Verses', value: 'Surah Al-‘Alaq 96:1–5 ("Iqra!")' },
      { label: 'Early Four Believers', value: 'Khadijah, Zayd, Ali, Abu Bakr (RA)' },
    ],
    deepHistoricalContext:
      'Why did Cave Hira begin not with prayers or battle laws, but "Read! In the name of your Lord who taught by the Pen"? Because humanity was trapped in blind superstition. Allah prepared Muhammad’s heart over six months of crystal-clear dreams so he would recognize angelic truth rather than hallucination, and gifted him Khadijah & Waraqah as immediate anchors.',
    chapterSections: [
      {
        sectionNumber: 1,
        title: 'Six Months of Dawn-Like Dreams & Jabal al-Nur Solitude',
        sceneLabel: 'Pre-Ramadan 610 CE',
        content:
          'Feeling deep aversion to idols, Muhammad ﷺ climbed rough 2-mile steep stone ridges to small Cave Hira overlooking the Ka‘bah for nights of tahannuth (devotional reflection). For six months prior, every night dream arrived visibly sharp like early morning sunlight (Bukhari 3).',
        keyDetail: 'Spiritual preparation and clean solitude precede extraordinary clarity.',
      },
      {
        sectionNumber: 2,
        title: 'The Triple Embrace & Five Verses of Al-‘Alaq',
        sceneLabel: 'Night of Power inside Cave Hira',
        content:
          'Suddenly an overwhelming angelic presence stood before him commanding "Iqra!" Answering honestly "Ma ana bi-qari’ (I cannot read)," Jibril squeezed him forcefully thrice—teaching human limits yield only to Divine power—before releasing him with Al-‘Alaq 96:1–5 echoing permanently in his heart.',
        keyDetail: 'From Al-Lawh al-Mahfuz to Bayt al-‘Izzah on Laylat al-Qadr, then delivered bit by bit over 23 years.',
      },
      {
        sectionNumber: 3,
        title: 'Khadijah’s Five Moral Proofs & Waraqah’s Prophecy',
        sceneLabel: 'Household Confirmation',
        content:
          'Trembling down the mountain into Khadijah’s arms ("Cover me! I feared for my life!"), she instantly comforted him with five living ethical criteria: "Never! Allah will NEVER disgrace you—you honor kinship ties, bear the weak’s burdens, assist the destitute, honor guests, and aid truth during calamity!" Eldest cousin Waraqah ibn Nawfal then certified it was Musa’s exact Angel Jibril.',
        keyDetail: 'Waraqah predicted Makkah would soon exile the very man they adored as Al-Amin.',
      },
    ],
    revelationAnatomy: {
      triggeringSituation:
        'A seeker yearning sincerely for truth away from idol corruption during the sacred stillness of Ramadan.',
      howWahiArrived:
        'Direct angelic physical pressure + oral dictation of Surah Al-‘Alaq 96:1–5 imprinted cleanly onto an unlettered Prophet’s memory.',
      companionResponse:
        'Khadijah embraced Islam immediately without hesitation; Abu Bakr, Zayd, and young Ali followed without demanding a single miracle.',
      lastingRuling:
        'Sacred knowledge, pen literacy, modesty, and family loyalty remain inseparable from authentic Islam.',
    },
    personProfiles: [
      {
        name: 'Waraqah ibn Nawfal',
        role: 'Blind Pre-Islamic Hanif & Gospel Scholar',
        contribution: 'Authenticated Jibril’s appearance from ancient scriptures and foretold imminent Quraysh persecution.',
      },
      {
        name: 'Abu Bakr al-Siddiq (RA)',
        role: 'First Free Adult Male Believer',
        contribution: 'Immediately accepted Prophethood upon hearing—then guided Uthman, Talhah, Zubayr, Abd al-Rahman, Sa‘d, and Abu Ubaydah into Islam.',
      },
    ],
    extraSahihHadiths: [
      {
        source: 'Sahih Muslim 160 & Sahih al-Bukhari 4953',
        narrator: 'Aishah (RA)',
        textEnglish:
          'Khadijah reasoned immediately upon his terror: "By Allah, Allah will never humiliate you! For you maintain family bonds, speak pure truth, shoulder the helpless, earn for the needy, welcome guests, and stand with truth through calamity."',
        lessonPoint: 'Compassion toward people earns Divine protection during spiritual trials.',
      },
    ],
    studyCheckpoints: [
      {
        question: 'How did the Quran first reach the earthly realm on Laylat al-Qadr?',
        answer: 'Entirety descended from Al-Lawh al-Mahfuz to Bayt al-‘Izzah (lowest heaven), then Jibril delivered portions over 23 years.',
        reference: 'Sahih Narration from Ibn Abbas (RA) & Surah 97:1',
      },
      {
        question: 'What startled Muhammad ﷺ most about Waraqah’s prediction?',
        answer: 'Hearing "Would that I were alive when your own people expel you!"—he asked amazed: "Will they really drive me out?!"',
        reference: 'Sahih al-Bukhari 3',
      },
    ],
  },
  'ch-07-secret-open-boycott-taif': {
    chapterId: 'ch-07-secret-open-boycott-taif',
    essentialFacts: [
      { label: 'Duration', value: '10 Years (610 – 620 CE) in & around Makkah' },
      { label: 'Secret Base', value: 'House of Al-Arqam at Foot of Mount Safa' },
      { label: 'Two Sanctuaries', value: 'King Najashi’s Abyssinia (2 Migrations)' },
      { label: 'Year of Sorrow', value: 'Death of Khadijah & Abu Talib → Ta’if Mercy' },
    ],
    deepHistoricalContext:
      'Islam grew slowly for three years in quiet house gatherings before Surah 26:214 ordered open public proclamation. Quraysh chiefs feared neither prayers nor charity—they panicked because Tawhid erased priest/idol profits and leveled master beside slave. Thirteen Makkan years forged steel-like character in absolute restraint.',
    chapterSections: [
      {
        sectionNumber: 1,
        title: 'Dar al-Arqam & Proclamation on Mount Safa',
        sceneLabel: '610 – 613 CE',
        content:
          'After Fatrat al-Wahi broke when Jibril appeared seated upon a throne skyward triggering Surah Al-Muddaththir (74:1–5), forty-plus silent converts studied verses inside Dar al-Arqam. When Surah 26:214 commanded open family warning, Mount Safa witnessed Abu Lahab cursing his nephew—yielding Surah Al-Masad’s unbreakable prophecy.',
        keyDetail: 'Abu Lahab never faked converting for 10 years just to "disprove" Surah 111—proving Divine authorship.',
      },
      {
        sectionNumber: 2,
        title: 'Crucible of Torture & Sanctuary Under King Najashi',
        sceneLabel: '614 – 616 CE · Makkah & Aksum',
        content:
          'As poor and enslaved Muslims endured hot desert boulders (Bilal chanting "Ahad! Ahad!") and Yasir & Sumayyah fell first martyrs, two waves migrated safely to righteous Christian ruler Najashi of Abyssinia. Refusing Quraysh’s bribes, Najashi wept hearing Ja‘far recite Surah Maryam and protected refugees for 13 years.',
        keyDetail: 'Khabbab’s back bore deep molten scars yet the Prophet ﷺ taught patience: earlier believers were sawn in half without abandoning Tawhid.',
      },
      {
        sectionNumber: 3,
        title: 'Shi‘b Abi Talib Boycott, Year of Sorrow & Nakhlah Jinn',
        sceneLabel: '616 – 620 CE · Boycott → Ta’if',
        content:
          'Starved three years inside Abu Talib’s rocky ravine eating dried leather until termites devoured the boycott parchment except Allah’s Name, both Khadijah and Abu Talib died within weeks in 619 CE. Seeking allies at Ta’if, street mobs pelted the Prophet ﷺ bloody; yet declining vengeance from the Angel of Mountains, he prayed for their children—and that same dawn night, Jinn at Nakhlah believed upon hearing him recite Qur’an!',
        keyDetail: 'Islam’s darkest hour at Ta’if sparked the dawn breakthrough to Jinn and future Yathrib.',
      },
    ],
    revelationAnatomy: {
      triggeringSituation:
        'Unbelievers tried bargaining ("Worship our idols one year, we worship yours one year!") and mocked the Prophet’s ﷺ humanity and struggles.',
      howWahiArrived:
        'Surahs Al-Kafirun (109), Al-Ikhlas (112), Ad-Duha (93), and Ash-Sharh (94) arrived directly answering polytheist traps and healing exhaustion.',
      companionResponse:
        'Young Muslims memorized every Makkan Surah fervently—using pure Qur’an recitation to win hearts in Makkah and Yathrib.',
      lastingRuling:
        'Freedom of conscience ("To you your religion, to me mine") and total perseverance under persecution.',
    },
    personProfiles: [
      {
        name: 'Bilal ibn Rabah & Sumayyah bint Khayyat (RA)',
        role: 'Pillars of Courage & First Martyr',
        contribution: 'Sumayyah became Islam’s first martyr standing firm against Abu Jahl; Bilal endured boulders echoing "One, One!"',
      },
      {
        name: 'Ashamah ibn Abjar (King Najashi of Abyssinia)',
        role: 'Righteous Monarch & Later Secret Muslim',
        contribution: 'Sheltered hunted Muslims honestly; Prophet Muhammad ﷺ later led his funeral prayer in absentia upon his death (Bukhari 1320).',
      },
    ],
    extraSahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3612 & 3852',
        narrator: 'Khabbab ibn al-Aratt (RA)',
        textEnglish:
          'When tortured converts begged "Won’t you ask Allah’s help for us?", the Prophet ﷺ sat up flushed stating: "Before you, believers had iron combs rake flesh from bone yet never deserted faith. By Allah, He will complete this religion until a rider travels safely from Sana’a to Hadramawt fearing none except Allah—but you are hasty!"',
        lessonPoint: 'Triumph comes through steady patience rather than impulsive retaliation.',
      },
    ],
    studyCheckpoints: [
      {
        question: 'What destroyed Quraysh’s three-year starvation boycott parchment hung inside the Ka‘bah?',
        answer: 'White ants (termites) ate every single clause of injustice except "Bismika Allahumma" ("In Your Name, O Allah").',
        reference: 'Sirah & Sahih Hadith Corroboration',
      },
      {
        question: 'Who became believers during the Prophet’s ﷺ lonely return night after being stoned out of Ta’if?',
        answer: 'A delegation of Jinn listening at Nakhlah, recorded in Surah Al-Ahqaf 46:29 & Surah Al-Jinn 72.',
        reference: 'Surah Al-Jinn 72:1–2 & Sahih Muslim 450',
      },
    ],
  },
  'ch-08-isra-miraj-hijrah': {
    chapterId: 'ch-08-isra-miraj-hijrah',
    essentialFacts: [
      { label: 'Isra & Mi‘raj', value: 'Single Night Journey · Makkah → Al-Aqsa → Seven Heavens' },
      { label: 'Direct Heavenly Gift', value: '5 Daily Prayers (Reward of 50) & Baqarah 2:285–286' },
      { label: 'Aqabah Pledges', value: '12 → 75 Yathrib (Madinah) Citizens Pledging Haven' },
      { label: 'Hijrah Year 1 AH', value: '622 CE · Cave Thawr → Quba → Madinah' },
    ],
    deepHistoricalContext:
      'Just when terrestrial doors slammed shut after Ta’if, Allah opened the doors of seven heavens to comfort His Messenger ﷺ. Leading all past prophets in Al-Aqsa confirmed continuity of one religion; receiving the 5 daily prayers directly above the seventh heaven placed Salah as every believer’s daily personal Mi‘raj. Immediately afterward, two peaceful pilgrimages forged Aqabah—turning persecuted Makkan believers into founders of Madinah.',
    chapterSections: [
      {
        sectionNumber: 1,
        title: 'Jerusalem Prayer & Ascending Past Seven Heavens',
        sceneLabel: 'Night of Al-Isra wal-Mi‘raj',
        content:
          'Mounted upon swift luminous Al-Buraq to Al-Aqsa, Muhammad ﷺ led every prophet in prayer before ascending vertically with Jibril through seven celestial gates—greeting Adam, Isa & Yahya, Yusuf, Idris, Harun, Musa, and Ibrahim resting beside Al-Bayt al-Ma‘mur. Beyond Sidrat al-Muntaha, Allah spoke directly—reducing fifty prescribed daily prayers down to five carrying full fiftyfold reward (Bukhari 3207).',
        keyDetail: 'Returning before dawn, Abu Bakr instantly affirmed truth earning title Al-Siddiq (Confirming Witness).',
      },
      {
        sectionNumber: 2,
        title: 'Mus‘ab ibn Umayr Preparing Yathrib & Second Aqabah',
        sceneLabel: '621 – 622 CE · Mina',
        content:
          'Sending soft-spoken diplomat Mus‘ab ibn Umayr after 12 initial converts at First Aqabah won nearly every tribe in Yathrib peacefully via Qur’an alone! Next Hajj, 73 men and 2 heroic women swore solemn allegiance (Bay‘at al-‘Aqabah II) to defend the Prophet ﷺ just as their own families.',
        keyDetail: 'Hijrah was never defeat—it was an organized, welcomed invitation to build an open sanctuary.',
      },
      {
        sectionNumber: 3,
        title: 'Escaping Assassins, Three Nights in Cave Thawr & Suraqah',
        sceneLabel: 'Rabi al-Awwal 1 AH (622 CE)',
        content:
          'As armed youth surrounded his home to strike unanimously, Muhammad ﷺ slipped unseen reciting Ya-Sin 36:9, leaving young cousin Ali safely returning Makkan deposits! Hiding three tense days south in Cave Thawr fed by Asma bint Abi Bakr while pursuers stood at the cave rim, Suraqah’s horse later sank repeatedly until promised Persia’s golden crown bracelets—prophecy fulfilled years later under Caliph Umar!',
        keyDetail: 'Touching southern Yathrib at Quba, he immediately built Islam’s first public mosque—Masjid Quba.',
      },
    ],
    revelationAnatomy: {
      triggeringSituation:
        'Post-Hijrah refugees had lost home, property, and safety simply for saying "Our Lord is Allah," facing armed pursuit.',
      howWahiArrived:
        'Surah Al-Baqarah 2:285–286 was granted veil-less at Sidrat al-Muntaha; Surah Al-Isra 17:1 documented the Night Journey; At-Tawbah 9:40 captured Cave Thawr; and Al-Hajj 22:39 finally permitted self-defense.',
      companionResponse:
        'Abu Bakr wept joyfully upon hearing he would accompany the Prophet ﷺ; Ansar women sang welcoming hymns on Madinan rooftops.',
      lastingRuling:
        'Five daily prayers remain obligatory forever; self-defense exists strictly for oppressed victims seeking peace.',
    },
    personProfiles: [
      {
        name: 'Asma bint Abi Bakr (Dhat al-Nitaqayn, RA)',
        role: 'Brave Logistics Courier of Cave Thawr',
        contribution: 'Tore her waist sash in two to tie food supplies and trekked secretly up rocky Mount Thawr while pregnant.',
      },
      {
        name: 'Mus‘ab ibn Umayr (RA)',
        role: 'First Ambassador of Islam to Madinah',
        contribution: 'Transformed feuding Aws and Khazraj clans into devout unified Ansar strictly through serene Quran recitation.',
      },
    ],
    extraSahihHadiths: [
      {
        source: 'Sahih Muslim 173 & Sahih al-Bukhari 5009',
        narrator: 'Abdullah ibn Mas‘ud & Abu Mas‘ud (RA)',
        textEnglish:
          'Prophet Muhammad ﷺ received three treasures directly during Al-Mi‘raj: the five daily prayers, the last two ayahs of Surah Al-Baqarah, and forgiveness of major sins for whoever dies associating nothing with Allah.',
        lessonPoint: 'Reciting Al-Baqarah 2:285–286 before sleep brings total divine sufficiency.',
      },
    ],
    studyCheckpoints: [
      {
        question: 'Why did Umar (RA) officially begin the Islamic Hijri Calendar from the Hijrah rather than birth or victory?',
        answer: 'Because the Hijrah cleanly separated truth from persecution and founded an independent Muslim community.',
        reference: 'Sahih al-Bukhari 3934',
      },
      {
        question: 'Why did Ali ibn Abi Talib stay behind three nights inside the Prophet’s ﷺ Makkan bed?',
        answer: 'Even during an assassination attempt, he stayed behind to return all Makkan citizens’ entrusted valuables intact!',
        reference: 'Sirah & Historical Reports',
      },
    ],
  },
  'ch-09-madinah-badr': {
    chapterId: 'ch-09-madinah-badr',
    essentialFacts: [
      { label: 'Timeline', value: '1 – 2 AH (622 – 624 CE) · Badr: 17 Ramadan 2 AH' },
      { label: 'Civic Founding', value: 'Brotherhood Pact & Constitution of Madinah' },
      { label: 'Badr Force Ratio', value: '313 Believers (2 Horses) vs 1,000 Quraysh (100 Cavalry)' },
      { label: 'Surah Revealed', value: 'Al-Baqarah 2:144 (Qiblah) & Al-Anfal 8 (Badr)' },
    ],
    deepHistoricalContext:
      'Entering Madinah, the Prophet ﷺ engineered four masterstrokes before any war occurred: building Masjid al-Nabawi as community/charity heart, uniting impoverished Muhajirin with generous Ansar (even inheriting originally like blood brothers), drafting the written Constitution of Madinah guaranteeing religious pluralism, and setting fair debt-free markets. Badr occurred only when 1,000 armored Makkans marched explicitly to crush Madinah’s sanctuary.',
    chapterSections: [
      {
        sectionNumber: 1,
        title: 'Masjid, Mu’akhat Brotherhood & Multi-Faith Constitution',
        sceneLabel: 'Year 1 AH · Madinah',
        content:
          'Ansari Sa‘d ibn al-Rabi‘ offered half his orchard to refugee Abd al-Rahman ibn Awf, who humbly asked: "Bless you! Just point me to the market!" Soon the Sahifah established Madinah’s first multi-tribe, Jewish-Muslim mutual protection state guaranteeing religious liberty.',
        keyDetail: 'Economic dignity & shared citizenship cemented internal unity before external threats arrived.',
      },
      {
        sectionNumber: 2,
        title: 'Turning Mid-Salah Toward Ka‘bah & Ramadan Fasting',
        sceneLabel: 'Sha‘ban – Ramadan 2 AH',
        content:
          'After 16–17 months facing Jerusalem, Jibril brought Al-Baqarah 2:144 mid-prayer inside Masjid Bani Salamah—congregants pivoted 180 degrees instantly without breaking rows. Weeks later fasting Ramadan, Zakat al-Fitr, and Eid prayers were established.',
        keyDetail: 'Masjid al-Qiblatayn still preserves memory of instant collective obedience.',
      },
      {
        sectionNumber: 3,
        title: 'Battle of Badr — Yawm al-Furqan (17 Ramadan 2 AH)',
        sceneLabel: 'Wells of Badr',
        content:
          'Seeking confiscated refugee wealth in Abu Sufyan’s caravan, 313 lightly armed believers learned Quraysh’s 1,000-man army marched to wipe them out anyway. After Al-Hubab’s water strategy secured springs, gentle rain firmed footing and the Prophet ﷺ wept in night du‘a until his cloak fell. One thousand angels reinforced believers—turning three-to-one odds into crushing triumph with 70 captives treated gently and taught literacy as ransom.',
        keyDetail: '70 literate prisoners gained complete freedom simply by teaching 10 Madinan children to read and write!',
      },
    ],
    revelationAnatomy: {
      triggeringSituation:
        'Debates arose over prayer direction, nighttime eating in Ramadan, and distributing Badr spoils fairly between front fighters and camp guards.',
      howWahiArrived:
        'Surah Al-Baqarah answered Qiblah/fasting laws clearly, while Surah Al-Anfal came immediately after Badr attributing true victory to Allah and ordering four-fifths/one-fifth justice.',
      companionResponse:
        'Old disputes dissolved instantly once Al-Anfal ordered believers to mend hearts before sharing wealth.',
      lastingRuling:
        'Rule of law in warfare: humane prisoner meals, literacy ransoms, and banning looting chaos.',
    },
    personProfiles: [
      {
        name: 'Sa‘d ibn Mu‘adh (RA)',
        role: 'Chief of Aws & Banner Leader of Ansar',
        contribution: 'Spoke immortal loyalty before Badr: "Even if you lead us straight into the sea, we will plunge in behind you!"',
      },
      {
        name: 'Bilal ibn Rabah (RA)',
        role: 'First Mu’adhdhin & Challenger of Tyranny',
        contribution: 'Proclaimed first Adhan from Makkah to Madinah; faced former torturer Umayyah ibn Khalaf in battle.',
      },
    ],
    extraSahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3992 & Sahih Muslim 1763',
        narrator: 'Umar ibn al-Khattab & Rifa‘ah ibn Rafi‘ (RA)',
        textEnglish:
          'Jibril came to the Prophet ﷺ asking: "How do you count the People of Badr among you?" He answered: "Among the best of Muslims." Jibril replied: "So too among us are the angels who witnessed Badr!"',
        lessonPoint: 'Those 313 stand honored forever across both earthly & angelic history.',
      },
    ],
    studyCheckpoints: [
      {
        question: 'How did the Prophet ﷺ treat poor vs literate Quraysh captives taken at Badr?',
        answer: 'Treated them gently sharing equal meals; literate ones earned freedom by teaching 10 Madinan children to read & write.',
        reference: 'Musnad Ahmad / Authentic Historical Consensus',
      },
      {
        question: 'Why was Badr named "Yawm al-Furqan" (Day of Criterion) in Surah Al-Anfal 8:41?',
        answer: 'It unmistakably separated rising truth from collapsing Makkan falsehood.',
        reference: 'Surah Al-Anfal 8:41',
      },
    ],
  },
  'ch-10-uhud-nadir-khandaq': {
    chapterId: 'ch-10-uhud-nadir-khandaq',
    essentialFacts: [
      { label: 'Major Trials', value: 'Uhud (3 AH) · Banu Nadir (4 AH) · Ifk & Khandaq (5 AH)' },
      { label: 'Turning Cause at Uhud', value: '40 of 50 Archers Abandoning Pass for Spoils' },
      { label: 'Trench Dimensions', value: '~5.5 km Dug Hungry in ~6 Days (Salman al-Farsi)' },
      { label: 'Quranic Surahs', value: 'Ali ‘Imran 3, An-Nur 24, Al-Ahzab 33, Al-Hashr 59' },
    ],
    deepHistoricalContext:
      'Success at Badr created overconfidence; adversity at Uhud and Khandaq purified the young community completely. Notice Quran’s striking honesty: Surah Ali ‘Imran never hid Muslim errors at Uhud—it analyzed why disobedience occurred so believers would rely on disciplined obedience forever, before the 27-day Trench blockade unified Muslims against 10,000 confederates.',
    chapterSections: [
      {
        sectionNumber: 1,
        title: 'Battle of Uhud & Heroism of Companions (Shawwal 3 AH)',
        sceneLabel: 'Jabal Uhud Slopes',
        content:
          'Marching out with 700 fighters after hypocrite chief Ibn Ubayy deserted with 300, Muslims shattered 3,000 Makkans at first—until 40 archers left Abdullah ibn Jubayr’s ridge pass chasing spoils! Khalid ibn al-Walid wheeled cavalry behind them, injuring the Prophet’s ﷺ cheek and breaking his tooth while Nusaybah bint Ka‘b, Abu Dujanah, and Talhah formed human shields and Hamzah fell martyred.',
        keyDetail: 'Next morning, wounded Muslims marched to Hamra al-Asad to bluff Abu Sufyan away from invading Madinah.',
      },
      {
        sectionNumber: 2,
        title: 'Assassination Plots, Al-Raji‘ Grief & Slander of Aishah (Al-Ifk)',
        sceneLabel: '4 – 5 AH · Domestic & External Crucible',
        content:
          'Following tragic ambushes killing 70 Quran teachers at Bi’r Ma‘unah and Banu Nadir plotting a rooftop stone ambush (triggering bloodless expulsion recorded in Surah Al-Hashr 59), hypocrites exploited Aishah’s accidentally left-behind litter after Al-Muraysi‘ to spread venomous rumor for 30 painful days until Surah An-Nur 24:11 cleared her forever.',
        keyDetail: 'Surah An-Nur created eternal Islamic standards banning unverified gossip and requiring 4 witnesses.',
      },
      {
        sectionNumber: 3,
        title: 'War of the Trench (Khandaq) & Wartime Treason',
        sceneLabel: 'Shawwal 5 AH · Northern Madinah',
        content:
          'Ten thousand Confederates converged to annihilate Madinah. Accepting Persian convert Salman al-Farsi’s brilliant innovation, starving companions dug a 5.5 km trench—with the Prophet ﷺ smashing a boulder to strike sparks foretelling liberation of Syria, Persia, and Yemen! When Banu Qurayzah secretly conspired inside Madinah to strike unguarded families from behind, Nu‘aym’s diplomacy fractured alliance unity and icy Allah-sent hurricane winds scattered all 10,000.',
        keyDetail: 'Never again could Quraysh assemble another offensive war against Madinah.',
      },
    ],
    revelationAnatomy: {
      triggeringSituation:
        'Stunned companions asked at Uhud: "How did defeat happen when we followed Your Prophet?" and wept during Aishah’s month-long slander trial.',
      howWahiArrived:
        'Ali ‘Imran 3:165 answered plainly ("Say: It is from your own selves!"), while An-Nur 24 descended abruptly inside Abu Bakr’s home clearing Aishah (RA) in 16 immortal verses.',
      companionResponse:
        'Abu Bakr immediately forgave impoverished slander-repeater Mistah upon Surah 24:22 ("Would you not love that Allah forgive you?").',
      lastingRuling:
        'Leadership discipline in battle; 4-eyewitness rule against defamation; mercy even after offense.',
    },
    personProfiles: [
      {
        name: 'Nusaybah bint Ka‘b (Umm Umarah, RA)',
        role: 'Heroic Shield of Uhud',
        contribution: 'Fought beside her husband and sons taking twelve deep wounds defending the Prophet ﷺ directly.',
      },
      {
        name: 'Salman al-Farsi (RA)',
        role: 'Truth Seeker & Strategist',
        contribution: 'Engineered the defensive Khandaq trench, earning the Prophet’s immortal honor: "Salman is one of our own Household!"',
      },
    ],
    extraSahihHadiths: [
      {
        source: 'Sahih al-Bukhari 4110 & 4102',
        narrator: 'Anas & Jabir ibn Abdullah (RA)',
        textEnglish:
          'Starving diggers tied stones to bellies reciting: "O Allah, there is no real life except the Hereafter—so forgive Ansar & Muhajirin!" Jabir butchered one small goat that miraculously fed all 1,000 hungry diggers completely full!',
        lessonPoint: 'Shared hardship transforms small generosity into abundant barakah.',
      },
    ],
    studyCheckpoints: [
      {
        question: 'What exact violation reversed initial Muslim victory at Uhud?',
        answer: '40 archers descended Mount Rumah pass chasing booty against the Prophet’s explicit order to hold post regardless.',
        reference: 'Sahih al-Bukhari 3039',
      },
      {
        question: 'Who judged Banu Qurayzah’s wartime treason after the Trench siege ended?',
        answer: 'Their own chosen former ally Sa‘d ibn Mu‘adh (RA), applying Mosaic law for hostile military betrayal.',
        reference: 'Sahih al-Bukhari 4121',
      },
    ],
  },
  'ch-11-hudaybiyyah-khaybar-mutah': {
    chapterId: 'ch-11-hudaybiyyah-khaybar-mutah',
    essentialFacts: [
      { label: 'Years', value: '6 – 8 AH (Hudaybiyyah → Envoys → Khaybar → Mu’tah)' },
      { label: 'Pledge Count', value: '1,400 Pilgrims at Bay‘at al-Ridwan Tree' },
      { label: 'Emperors Addressed', value: 'Heraclius, Chosroes, Muqawqis & Najashi' },
      { label: 'Mu’tah Odds', value: '3,000 Muslims vs 100,000+ Byzantine Coalition' },
    ],
    deepHistoricalContext:
      'Hudaybiyyah illustrates prophetic genius prioritizing long-term spiritual openness over short-term pride. Though terms stung companions outwardly, peace stripped Quraysh’s narrative shield—doubling Muslim converts in two peaceful years! Immediately freed on the south, Islam addressed superpower emperors peacefully, pacified northern Khaybar alliances, and proved unbroken courage against Byzantine legions at Mu’tah.',
    chapterSections: [
      {
        sectionNumber: 1,
        title: 'Bay‘at al-Ridwan & "Fathan Mubina" at Hudaybiyyah (6 AH)',
        sceneLabel: 'Border of Makkah Sanctuary',
        content:
          'Marching purely for Umrah in white Ihram with 1,400 companions, rumors of envoy Uthman’s murder sparked Bay‘at al-Ridwan beneath an acacia tree. Agreeing to return without Umrah plus tough asylum clauses dismayed Umar—until Surah Al-Fath (48:1) descended proclaiming the 10-year truce a "Manifest Victory" opening Arabia’s ears cleanly.',
        keyDetail: 'In 2 peaceful years post-Hudaybiyyah, far more people entered Islam than across the previous 19 years.',
      },
      {
        sectionNumber: 2,
        title: 'Royal Envoys & Storming Khaybar’s Eight Citadels (7 AH)',
        sceneLabel: 'Global Capitals & Northern Hijaz',
        content:
          'Bearing a silver ring engraved "Muhammad Messenger of Allah," envoys carried peaceful invitations worldwide—Heraclius privately affirmed him truthful; Muqawqis sent gifts respectfully. Northward, Khaybar’s eight citadels had rallied confederate armies; curing Ali’s inflamed eyes, the Prophet ﷺ sent him with orders to invite before striking—converting hostile strongholds into peaceful 50% orchard sharecroppers.',
        keyDetail: 'Peaceful coexistence at Khaybar left farms intact rather than scorching land.',
      },
      {
        sectionNumber: 3,
        title: 'Heroic Stand of 3,000 Against 100,000 at Mu’tah (8 AH)',
        sceneLabel: 'Southern Jordan',
        content:
          'When envoy Harith ibn Umayr was murdered, 3,000 Muslims confronted an enormous ~100,000 Byzantine–Ghassanid army. Pre-appointed commanders Zayd, Ja‘far (holding the flag even after losing both arms!), and Ibn Rawahah fell martyrs while back in Madinah the Prophet ﷺ narrated live through tears before Khalid ibn al-Walid reshuffled formations overnight and executed an unbroken withdrawal.',
        keyDetail: 'Only 12 recorded Muslim martyrs fell against an imperial force thirty times larger.',
      },
    ],
    revelationAnatomy: {
      triggeringSituation:
        'Heartbroken pilgrims wondered why Allah’s Messenger signed humiliating-looking truce terms turning away from the Ka‘bah.',
      howWahiArrived:
        'Surah Al-Fath descended between Makkah & Madinah explaining divine tranquility (Sakinah), tree-pledge pleasure, and guaranteeing Khaybar’s gains solely to Hudaybiyyah veterans.',
      companionResponse:
        'Companions cried joyfully—later testifying Hudaybiyyah, not Makkah’s conquest, was the true turning victory.',
      lastingRuling:
        'Treaties must be honored strictly even when painful; diplomacy always precedes hostility.',
    },
    personProfiles: [
      {
        name: 'Ja‘far ibn Abi Talib (Dhu al-Janahayn, RA)',
        role: 'Orator in Abyssinia & Hero of Mu’tah',
        contribution: 'Fought holding Madinah’s flag in teeth after losing both hands—rewarded in Paradise with two radiant wings (Bukhari 3709).',
      },
      {
        name: 'Khalid ibn al-Walid (Sayfullah, RA)',
        role: 'Master Tactician',
        contribution: 'Accepted Islam right after Hudaybiyyah and saved the encircled army at Mu’tah earning title "Sword of Allah."',
      },
    ],
    extraSahihHadiths: [
      {
        source: 'Sahih Muslim 1786 & Sahih al-Bukhari 4185',
        narrator: 'Jabir & Al-Bara (RA)',
        textEnglish:
          'Allah declared Himself permanently pleased with every single companion among the 1,400 who swore allegiance beneath the Tree at Hudaybiyyah—none of whom shall enter the Fire.',
        lessonPoint: 'Unity behind prophetic wisdom in hard moments earns eternal divine pleasure.',
      },
    ],
    studyCheckpoints: [
      {
        question: 'Why did the Prophet ﷺ command Ali at Khaybar before attacking?',
        answer: '"Invite them peacefully to Islam first—if Allah guides even one man through you, it is better than red camels."',
        reference: 'Sahih al-Bukhari 2942 & 3009',
      },
      {
        question: 'How did Khalid extract 3,000 soldiers intact from 100,000+ imperial troops at Mu’tah?',
        answer: 'Swapped front, rear, and flank banners overnight raising dust behind, tricking foes into fearing huge Madinan reinforcements.',
        reference: 'Sahih al-Bukhari 4262 & Tactical Record',
      },
    ],
  },
  'ch-12-makkah-hunayn-tabuk': {
    chapterId: 'ch-12-makkah-hunayn-tabuk',
    essentialFacts: [
      { label: 'Milestone Dates', value: 'Ramadan 8 AH (Makkah) · Shawwal (Hunayn) · Rajab 9 AH (Tabuk)' },
      { label: 'Makkah Verdict', value: '"Go, You Are Free" — Zero Revenge, 360 Idols Cleared' },
      { label: 'Tabuk Army', value: '30,000 Companions · Largest Led by Prophet ﷺ' },
      { label: 'Final Peninsula Status', value: '9 AH "Year of Delegations" (All Tribes United)' },
    ],
    deepHistoricalContext:
      'Makkah’s conquest remains unmatched in military history: after 21 years of assassination plots, boycotts, and murdered loved ones, the victim entered at the head of 10,000 disciplined troops yet bowed his chin against his saddle refusing humiliation or plunder. Immediately tested by pride at Hunayn and scorching heat at Tabuk, believers emerged humble and Peninsula-wide peace took hold.',
    chapterSections: [
      {
        sectionNumber: 1,
        title: 'Ten Thousand Watchfires & Bloodless Conquest of Makkah (8 AH)',
        sceneLabel: '20 Ramadan 8 AH',
        content:
          'After Quraysh secretly armed a night massacre against peaceful Muslim-allied Khuza‘ah inside Haram boundaries, secret mobilization brought 10,000 troops lighting Marr al-Zahran hills. Abu Sufyan embraced Islam overnight; four columns entered Makkah with strict non-aggression orders; toppling 360 idols chanting 17:81, the Prophet ﷺ freed every past enemy declaring Yusuf’s words: "No blame upon you today!" while Bilal’s Adhan echoed off the Ka‘bah roof.',
        keyDetail: 'Forgiving former persecutors turned lifelong enemies into loyal defenders of Makkah.',
      },
      {
        sectionNumber: 2,
        title: 'Lesson of Numbers in Hunayn’s Gorge & Siege of Ta’if',
        sceneLabel: 'Shawwal 8 AH',
        content:
          'Confidence whispering "Today we won’t be defeated by small numbers!" vanished seconds into Hawazin’s dawn canyon arrow ambush. Only when the Prophet ﷺ rode forward unyielding while Al-Abbas roared out summoning the Ansar did believers turn and smash the ambush—then releasing all 6,000 Hawazin prisoners out of sheer compassion, melting enemy tribes cleanly into Islam.',
        keyDetail: 'Surah At-Tawbah 9:25 reminded humanity forever: great numbers fail when arrogance replaces reliance on Allah.',
      },
      {
        sectionNumber: 3,
        title: 'Tabuk — Army of Hardship & Ka‘b’s 50-Day Truthfulness (9 AH)',
        sceneLabel: '700 km North Across Desert Drought',
        content:
          'Facing famine heat to deter Byzantine invasion rumors, Abu Bakr gave 100% household savings and Uthman donated 300 fully equipped camels plus 1,000 gold dinars. Thirty thousand marched 700 km to Tabuk—forcing imperial border forces to retreat peacefully and triggering delegations across Arabia. Back home, honest poet Ka‘b ibn Malik admitted delaying without lies—enduring 50 painful days until At-Tawbah 9:118 cleared him forever.',
        keyDetail: 'Truthfulness even after a serious mistake preserves integrity and draws Allah’s pardon.',
      },
    ],
    revelationAnatomy: {
      triggeringSituation:
        'Pride over 12,000 strength at Hunayn, hypocrites whispering at Tabuk’s heat, and three sincere companions confessing failure honestly.',
      howWahiArrived:
        'Surah An-Nasr (110) marked national entry into Islam; At-Tawbah 9:25–26 diagnosed Hunayn; and 9:117–118 erupted down at dawn relieving Ka‘b ibn Malik’s 50-day anguish.',
      companionResponse:
        'Ka‘b donated joyful charity upon pardon and vowed never to utter falsehood for life.',
      lastingRuling:
        'Amnesty heals deeper than revenge; arrogance invites setback; honesty saves after sin.',
    },
    personProfiles: [
      {
        name: 'Uthman ibn Affan (Dhu al-Nurayn, RA)',
        role: 'Benefactor of Tabuk’s Hardship Army',
        contribution: 'Outfitted nearly a third of the army single-handedly—earning the Prophet’s testimonial: "Nothing harms Uthman after today!"',
      },
      {
        name: 'Ka‘b ibn Malik (RA)',
        role: 'Ansari Poet & Model of Honest Repentance',
        contribution: 'Rejected a Christian king’s royal shelter while shunned 50 days—honored eternally inside Surah At-Tawbah.',
      },
    ],
    extraSahihHadiths: [
      {
        source: 'Sahih al-Bukhari 4970',
        narrator: 'Abdullah ibn Abbas (RA)',
        textEnglish:
          'Ibn Abbas famously explained before elder companions that short Surah An-Nasr (110) was actually the subtle Divine announcement signaling the Prophet’s ﷺ mission completion and imminent passing—earning Caliph Umar’s admiration.',
        lessonPoint: 'Seeing millions embrace Islam signified the mission was nearly finished.',
      },
    ],
    studyCheckpoints: [
      {
        question: 'What historic declaration freed Makkah’s former persecutors upon its bloodless conquest?',
        answer: '"No blame upon you today! Go, for you are the freed ones (Antum at-Tulaqa)."',
        reference: 'Sahih Sirah & Ibn Abbas Reports',
      },
      {
        question: 'What key lesson did Surah 9:25 highlight after the surprise ambush at Hunayn?',
        answer: 'Great army size cannot help when hearts depend on numbers instead of Allah.',
        reference: 'Surah At-Tawbah 9:25–26',
      },
    ],
  },
  'ch-13-farewell-and-passing': {
    chapterId: 'ch-13-farewell-and-passing',
    essentialFacts: [
      { label: 'Farewell Hajj', value: '9 Dhul-Hijjah 10 AH · 100,000+ Pilgrims at Arafat' },
      { label: 'Perfection Verse', value: 'Surah Al-Ma’idah 5:3 Revealed at Arafat' },
      { label: 'Final Legal Verse', value: 'Al-Baqarah 2:281 (~9 Days Before Passing)' },
      { label: 'Passing Date', value: 'Monday 12 Rabi al-Awwal 11 AH · Age 63' },
    ],
    deepHistoricalContext:
      'In his final year, Muhammad ﷺ ensured zero ambiguity remained. At Arafat before over 100,000 souls representing every Arab tribe, he delivered humanity’s most egalitarian ethical charter, twice reviewed the full Qur’an word-for-word with Angel Jibril in Ramadan, gave away his very last coins, forbade turning graves into shrines, and passed quietly holding a simple wooden tooth-stick.',
    chapterSections: [
      {
        sectionNumber: 1,
        title: 'Universal Human Charter on the Plain of Arafat (10 AH)',
        sceneLabel: 'Friday · 9 Dhul-Hijjah',
        content:
          'Standing atop camel Qaswa before 100,000 witnesses, he outlawed ancestral blood feuds, abolished usury (riba), upheld inviolability of every human’s blood, honor, and property, mandated kind stewardship of wives, eliminated every claim of racial supremacy ("Only Taqwa excels!"), and asked three times: "Have I conveyed?" before pointing upward: "O Allah, bear witness!"',
        keyDetail: 'Surah Al-Ma’idah 5:3 came that very afternoon certifying Islam complete and timeless.',
      },
      {
        sectionNumber: 2,
        title: 'Double Ramadan Review & The Last Verse Ever Sent Down',
        sceneLabel: 'Late 10 AH → Early 11 AH',
        content:
          'Every previous Ramadan Jibril revised all revealed Qur’an once; in his final Ramadan (10 AH), Jibril reviewed the complete Book twice (Bukhari 4998)—even Fatimah (RA) wept realizing her father’s departure drew near before smiling when told she’d rejoin him first. Days before passing, Al-Baqarah 2:281 closed revelation forever.',
        keyDetail: 'Exact chapter sequence & verse boundaries were sealed before the Prophet’s ﷺ passing.',
      },
      {
        sectionNumber: 3,
        title: 'Final Dawn Smile & Return to the Highest Companion (11 AH)',
        sceneLabel: '12 Rabi al-Awwal · Madinah',
        content:
          'Burning with fever yet insisting on distributing his last seven silver dirhams to the poor ("How could Muhammad meet Allah keeping coins overnight?!"), he lifted Aishah’s doorway curtain at Fajr smiling radiantly upon seeing rows praying cleanly behind Abu Bakr. Choosing the Hereafter ("Rafiq al-A‘la — the Highest Companion"), he dipped his hand in cool water, brushed with his miswak, and departed peacefully at age 63.',
        keyDetail: 'As grief overwhelmed Umar, Abu Bakr anchored Islam cleanly reciting Ali ‘Imran 3:144.',
      },
    ],
    revelationAnatomy: {
      triggeringSituation:
        'A religion spreading across a continent needed finalized divine assurance of completeness plus one timeless moral reminder before entering the Hereafter.',
      howWahiArrived:
        'Al-Ma’idah 5:3 descended cleanly atop Arafat; Jibril audited the entire text twice in 10 AH; Al-Baqarah 2:281 closed the Qur’an nine nights prior to passing.',
      companionResponse:
        'Companions wept remembering "Today I have perfected your religion," understanding nothing new could ever be added or deleted afterward.',
      lastingRuling:
        'Islam is finished and universal; no racial hierarchy exists; graves must never become objects of worship.',
    },
    personProfiles: [
      {
        name: 'Sayyidah Fatimah al-Zahra (RA)',
        role: 'Beloved Daughter & Leader of Women of Jannah',
        contribution: 'Trusted with the Prophet’s final private whisper announcing both his approaching passing and her joyful quick reunion six months later.',
      },
      {
        name: 'Umm al-Mu’minin Aishah al-Siddiqah (RA)',
        role: 'Scholar Mother of Islam & Final Caretaker',
        contribution: 'Cared for him inside her chamber through his final breath and preserved over 2,200 Hadiths guiding the Ummah.',
      },
    ],
    extraSahihHadiths: [
      {
        source: 'Sahih al-Bukhari 4454 & 4467',
        narrator: 'Umar, Aishah & Ibn Abbas (RA)',
        textEnglish:
          'Right after his passing when Umar declared incredulously that Muhammad ﷺ would soon return, Abu Bakr stepped out declaring: "Whoever worshipped Muhammad—know Muhammad has died; whoever worships Allah—verily Allah lives eternally and never dies!"—reciting Ali ‘Imran 3:144.',
        lessonPoint: 'Faith anchors directly in the Living Creator rather than mortal dependency.',
      },
    ],
    studyCheckpoints: [
      {
        question: 'Why did Jibril review the entire Qur’an TWICE with Prophet Muhammad ﷺ in his final Ramadan?',
        answer: 'To signal his approaching completion of mission and verify exact wording and Surah order cleanly before his passing.',
        reference: 'Sahih al-Bukhari 4998',
      },
      {
        question: 'What final reminder verse is widely authenticated as the last Qur’anic ayah revealed?',
        answer: 'Surah Al-Baqarah 2:281 ("And fear a Day when you will be returned to Allah...").',
        reference: 'Sahih al-Bukhari 4544 (Ibn Abbas)',
      },
    ],
  },
  'ch-14-rashidun-yamamah-quran-preservation': {
    chapterId: 'ch-14-rashidun-yamamah-quran-preservation',
    essentialFacts: [
      { label: 'Era Span', value: '11 – 40 AH (Abu Bakr, Umar, Uthman, Ali RA)' },
      { label: 'Trigger Battle', value: 'Yamamah (11 AH · 13k vs 40k · 70+ Huffaz Martyred)' },
      { label: 'Quran Compiled', value: '12 AH Master Volume → 25 AH Global Mushafs' },
      { label: 'Hadith Shield', value: 'Strict Eyewitness Chain verification (Isnad)' },
    ],
    deepHistoricalContext:
      'Had Islam vanished upon Muhammad’s ﷺ passing like fragile movements, human history might have rewritten everything. Instead, the four Rightly Guided Caliphs steered the hardest forty years in Islamic history: defeating apostate false prophets at Yamamah, liberating Jerusalem & Persia with civic justice, compiling every Qur’an word with double-verified documentary proof, and forging the science of Hadith authentication.',
    chapterSections: [
      {
        sectionNumber: 1,
        title: 'Abu Bakr’s Steadfast Stand & Battle of Yamamah (11–12 AH)',
        sceneLabel: 'Madinah & Central Arabia',
        content:
          'When tribes rebelled against Zakah and false prophet Musaylimah rallied 40,000 armed rebels at Yamamah, Abu Bakr stood iron-firm: "By Allah, if they withhold even a rope they gave the Messenger of Allah, I will defend its right!" At Yamamah’s brutal "Garden of Death," Bara ibn Malik leaped over wall battlements to throw gates open—ending rebellion at the steep cost of 70+ heroic Qur’an memorizers (including Salim Mawla Abi Hudhayfah).',
        keyDetail: 'Their sacrifice directly triggered compiling the complete written Qur’an.',
      },
      {
        sectionNumber: 2,
        title: 'How the Complete Written Mushaf Was Guarded Forever (12 & 25 AH)',
        sceneLabel: 'Compilation Under Abu Bakr & Uthman',
        content:
          'Alarmed by losing Huffaz at Yamamah, Umar persuaded hesitant Abu Bakr to task young lead scribe Zayd ibn Thabit (present at both final Ramadan reviews) to collect every skin, bone, palm leaf alongside TWO eyewitnesses confirming it had been written before the Prophet ﷺ AND memorized! Kept safely by Hafsah (RA), Uthman later appointed four scribes in 25 AH to issue unified official copies from Cordoba-bound coasts to Central Asia.',
        keyDetail: 'Every single Mushaf on Earth today matches Zayd’s verified text down to the letter.',
      },
      {
        sectionNumber: 3,
        title: 'Yarmouk, Qadisiyyah, Peace of Jerusalem & Science of Isnad',
        sceneLabel: '13 – 40 AH · Syria, Iraq & Madinah',
        content:
          'Under Umar (RA), outnumbered Muslims overcame Sasanian empires at Qadisiyyah and Byzantine legions at Yarmouk, before Umar walked into Jerusalem humbly guaranteeing Christians total security of churches and crosses! Meanwhile, Ali (RA), Aishah, Ibn Umar, Abu Hurayrah, and Anas scrutinized narrators ruthlessly—founding Ilm al-Rijal & Isnad chains that culminated in Al-Bukhari & Muslim.',
        keyDetail: 'Umar’s Jerusalem covenant remains one of history’s most honorable peace pledges.',
      },
    ],
    revelationAnatomy: {
      triggeringSituation:
        'Death of 70+ Qur’an memorizers at Yamamah and later regional dialect arguments among distant frontier soldiers.',
      howWahiArrived:
        'Revelation had already concluded completely—Allah’s promise in Surah Al-Hijr 15:9 ("Indeed, it is We who sent down the Reminder, and indeed We will be its Guardian") manifested practically through Zayd, Abu Bakr, Umar, Hafsah & Uthman (RA).',
      companionResponse:
        'Thousands of eyewitness companions audited and accepted the Uthmani Mushafs unanimously without a single omitted verse.',
      lastingRuling:
        'No claim about Prophet Muhammad ﷺ is accepted without an unbroken verified chain of trustworthy witnesses (Isnad).',
    },
    personProfiles: [
      {
        name: 'Zayd ibn Thabit (RA)',
        role: 'Chief Prophetic Scribe & Master Compiler',
        contribution: 'Fluent in languages and present at the final Ramadan double review—led both Abu Bakr’s and Uthman’s Qur’an committees.',
      },
      {
        name: 'Umm al-Mu’minin Hafsah bint Umar (RA)',
        role: 'Custodian of the Original Master Suhuf',
        contribution: 'Safeguarded Abu Bakr’s compiled parchment leaves intact for Uthman’s definitive copies.',
      },
    ],
    extraSahihHadiths: [
      {
        source: 'Sahih al-Bukhari 4986 & 4987',
        narrator: 'Zayd ibn Thabit & Anas ibn Malik (RA)',
        textEnglish:
          'Zayd confessed: "By Allah, had Abu Bakr & Umar ordered me to move an entire mountain, it wouldn’t have felt heavier than compiling the Qur’an!"—yet tracing down even the final two verses of Surah At-Tawbah with Khuzaymah while matching full community memory completed every leaf faithfully.',
        lessonPoint: 'Zero shortcuts were allowed: memory AND written witnesses both verified every line.',
      },
    ],
    studyCheckpoints: [
      {
        question: 'Which battle’s high toll of fallen Qur’an memorizers sparked compiling the master written Suhuf?',
        answer: 'The Battle of Yamamah (11 AH) against false prophet Musaylimah.',
        reference: 'Sahih al-Bukhari 4986',
      },
      {
        question: 'Who guarded Abu Bakr’s original compiled Qur’an sheets until Uthman’s 25 AH global copies were made?',
        answer: 'Mother of the Believers Hafsah bint Umar (RA).',
        reference: 'Sahih al-Bukhari 4987',
      },
    ],
  },
};
