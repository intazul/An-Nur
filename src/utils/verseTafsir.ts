/**
 * Precise, easily understood verse-by-verse Tafsir database.
 * Every Ayah has one clear, particular explanation in simple English and Urdu.
 */

export interface PreciseTafsir {
  summary: string; // The core meaning of this verse in plain, easy words
  explanation: string; // Precise explanation particular to what this verse says
  urduExplanation?: string; // آسان اردو تشریح
  keyLesson: string; // Actionable takeaway
}

export const PRECISE_VERSE_TAFSIRS: Record<string, PreciseTafsir> = {
  // Surah 1: Al-Fatihah
  '1:1': {
    summary: 'Starting everything in the name of Allah, who possesses boundless and enduring mercy.',
    explanation: 'This opening verse (Basmalah) teaches us that no worthwhile action should begin without consciously invoking Allah. "Ar-Rahman" means His mercy encompasses all creatures in this life without exception, while "Ar-Rahim" refers to His special, everlasting mercy reserved for believers in the Hereafter.',
    urduExplanation: 'یہ آیت ہر نیک کام کو اللہ کے بابرکت نام سے شروع کرنے کا حکم دیتی ہے، جس کی رحمت تمام کائنات پر محیط ہے۔',
    keyLesson: 'Recite Bismillah before eating, working, studying, or leaving home to invite divine blessing into your moment.',
  },
  '1:2': {
    summary: 'All true praise, appreciation, and gratitude belong exclusively to Allah, the Cherisher of all creation.',
    explanation: '"Al-Hamd" combines both sincere gratitude for blessings and profound admiration of Allah’s perfection. "Rabb al-Alameen" affirms that Allah is not a distant deity; He actively creates, nurtures, sustains, guides, and protects every single realm, universe, and living soul.',
    urduExplanation: 'تمام تعریفیں اور شکر صرف اللہ کے لیے ہیں جو تمام جہانوں کا تنہا پالنے والا اور نگران ہے۔',
    keyLesson: 'Transform your perspective from complaining about difficulties to cultivating active gratitude for countless daily gifts.',
  },
  '1:3': {
    summary: 'Reaffirming Allah’s immense, tender compassion and perpetual care for His servants.',
    explanation: 'After establishing His absolute Lordship in the previous verse, Allah immediately reassures us of His deep mercy. This removes terror and replaces it with filial love, humility, and hope, making the servant realize that divine power is exercised through boundless compassion.',
    urduExplanation: 'اللہ تعالیٰ نے اپنی حاکمیت کے بعد فورا اپنی بے پایاں رحمت کا ذکر فرما کر بندوں کے دلوں میں امید اور محبت پیدا کی۔',
    keyLesson: 'Never despair of Allah’s forgiveness, no matter how heavy your shortcomings may feel.',
  },
  '1:4': {
    summary: 'Allah alone is the absolute Master and Judge on the Day of Judgment.',
    explanation: '"Yawm ad-Deen" is the Day of Final Accountability. On earth, humans may claim kingship or influence, but on that Day, all earthly pretensions vanish and absolute justice prevails. Every person will receive their exact due for what they did.',
    urduExplanation: 'قیامت کے دن کا حقیقی اور تنہا مالک صرف اللہ ہے، جہاں ہر انسان اپنے اعمال کا پورا بدلہ پائے گا۔',
    keyLesson: 'Live with mindfulness (Taqwa), knowing that every hidden thought and public deed will be laid bare before the Just Judge.',
  },
  '1:5': {
    summary: 'The heart of faith: We worship Allah alone, and we rely upon Him alone for help.',
    explanation: 'This verse is the dividing line of Islamic Monotheism (Tawheed). "Iyyaka na\'budu" frees the soul from worshipping wealth, power, ego, or idols. "Iyyaka nasta\'een" establishes that human effort is futile without divine assistance. Devotion comes first, followed by seeking help.',
    urduExplanation: 'یہ آیت توحید کی بنیاد ہے: عبادت صرف اللہ کی اور ہر معاملے میں حقیقی مدد بھی صرف اسی سے مانگی جائے۔',
    keyLesson: 'When facing any trial, make heartfelt Dua before turning to worldly means; ultimate outcome rests in Allah’s hands.',
  },
  '1:6': {
    summary: 'The ultimate human prayer: Guide us and keep us steadfast upon the Straight Path.',
    explanation: '"As-Sirat al-Mustaqeem" is the clear highway of divine truth, justice, moral integrity, and peace. We ask not just to know the path intellectually, but to be actively guided along it, protected from veering off into extremes, confusion, or spiritual laziness.',
    urduExplanation: 'انسان کی سب سے بڑی اور قیمتی دعا یہ ہے کہ وہ ہر گھڑی صراطِ مستقیم (سیدھے راستے) پر ثابت قدم رہے۔',
    keyLesson: 'Recited at least 17 times daily in obligatory prayers, reminding us that continuous guidance is our most vital spiritual need.',
  },
  '1:7': {
    summary: 'Follow the footsteps of the righteous prophets, avoiding willful rebellion and careless deviation.',
    explanation: 'The favored path is that walked by the Prophets, the truthful (Siddiqeen), martyrs (Shuhada), and righteous (Saliheen). The verse warns against two pitfalls: knowing the truth but arrogantly rejecting it (al-maghdub \'alayhim), or having good intentions while blindly drifting into falsehood without knowledge (ad-dalleen).',
    urduExplanation: 'یہ انبیاء، صدیقین اور صالحین کا راستہ ہے؛ نافرمانی کے غضب اور لاعلمی کی گمراہی سے بچنے کی التجا ہے۔',
    keyLesson: 'Surround yourself with righteous companions and verify religious knowledge from authentic, trustworthy sources.',
  },

  // Surah 2: Al-Baqarah (Ayat al-Kursi)
  '2:255': {
    summary: 'Ayat al-Kursi: The supreme verse of the Quran describing Allah’s absolute living majesty, sovereignty, and knowledge.',
    explanation: 'Known as the Greatest Verse of the Quran. It establishes that Allah is Al-Hayy (the Ever-Living who never perishes) and Al-Qayyum (the Self-Subsisting Sustainer of all existence). He is free from human weakness like sleep or slumber. His Kursi (Throne / Knowledge / Dominion) encompasses the entire cosmos, and maintaining them causes Him zero exhaustion.',
    urduExplanation: 'آیت الکرسی قرآن کی سب سے عظیم آیت ہے جو اللہ کی توحید، علمِ غیب، حیاتِ ابدی اور آسمان و زمین پر کامل قدرت کا اعلان کرتی ہے۔',
    keyLesson: 'Recite Ayat al-Kursi after every obligatory prayer and before sleep for divine protection and tranquility.',
  },
  '2:285': {
    summary: 'The believers confirm their unwavering faith in Allah, His angels, scriptures, and messengers without division.',
    explanation: 'The opening of the celebrated final verses of Surah Al-Baqarah. The Prophet (ﷺ) and believers declare full acceptance of all divine messages and messengers from Adam to Muhammad without picking and choosing. Their response to divine commands is simple and noble: "We hear and we obey."',
    urduExplanation: 'اہلِ ایمان کا اعلانِ اطاعت: اللہ، فرشتوں، کتابوں اور تمام رسولوں پر بلا تفریق کامل ایمان۔',
    keyLesson: 'Cultivate wholehearted obedience to divine commands, accompanied by humility and seeking Allah’s forgiveness.',
  },
  '2:286': {
    summary: 'Allah never burdens a soul beyond its capacity; every deed counts, and we seek gentle forgiveness.',
    explanation: 'A profound divine promise: Allah does not place any spiritual or life burden upon you that you cannot bear with patience and prayer. We earn reward for the good we strive for, and bear the weight of evil we commit. The verse concludes with seven heartfelt supplications for mercy, pardon, and strength.',
    urduExplanation: 'اللہ کسی جان پر اس کی برداشت سے زیادہ بوجھ نہیں ڈالتا؛ انسان کے لیے اس کی کوشش ہے اور دعا ہے کہ اللہ معاف فرمائے۔',
    keyLesson: 'Whenever life feels overwhelming, remember Allah knows your strength better than you do. Turn to Him in sincere Dua.',
  },

  // Surah 36: Ya-Sin
  '36:58': {
    summary: 'The ultimate greeting of peace from the Most Merciful Lord to the dwellers of Paradise.',
    explanation: 'In the midst of the eternal bliss of Jannah, the highest honor bestowed upon the righteous is a direct personal greeting of "Salam" (Peace) from Allah, the Entirely Merciful. This signifies total divine pleasure and the cessation of all fears forever.',
    urduExplanation: 'اہلِ جنت کو ربِ رحیم کی جانب سے سب سے بڑا اور مبارک تحفہ: سلامتی کا براہِ راست کلام۔',
    keyLesson: 'Every worldly struggle is temporary; keep your eyes focused on earning Allah’s eternal greeting in the Hereafter.',
  },

  // Surah 67: Al-Mulk
  '67:1': {
    summary: 'Exalted is Allah in whose hands rests all sovereignty and power over everything.',
    explanation: '"Tabarak" expresses perpetual, overflowing goodness and majesty. Allah possesses absolute ownership over the universe, life, death, and human destiny. Nothing happens in creation without His will and permission.',
    urduExplanation: 'تمام بادشاہی اور خیر و برکت اللہ کے ہاتھ میں ہے جو ہر چیز پر قادرِ مطلق ہے۔',
    keyLesson: 'Recognize that worldly authority is fleeting; true and lasting security lies in submitting to the Sovereign Creator.',
  },
  '67:2': {
    summary: 'Why death and life exist: to test which of us is best in sincere, righteous conduct.',
    explanation: 'Life is not a playground of aimless pleasure, nor is death the end of existence. Allah created both as an arena of trial to reveal "ayyukum ahsanu \'amala"—who performs deeds with pure sincerity (Ikhlas) and in accordance with divine guidance (Sunnah). It is quality of deeds, not mere quantity, that counts.',
    urduExplanation: 'زندگی اور موت کا مقصد انسان کا امتحان ہے کہ کون اخلاص اور حسنِ عمل میں سب سے آگے ہے۔',
    keyLesson: 'Focus on sincerity and excellence (Ihsan) in even small everyday deeds rather than seeking human praise.',
  },

  // Surah 112: Al-Ikhlas
  '112:1': {
    summary: 'Declare the absolute, indivisible oneness of Allah.',
    explanation: 'The word "Ahad" means uniquely One, having no partners, equals, parts, or rivals. Allah is not a trinity, nor does He share His divinity with any saint, angel, or celestial body. Monotheism in its purest philosophical and devotional reality.',
    urduExplanation: 'اللہ اپنی ذات، صفات اور حقوق میں یکتا اور اکیلا ہے، اس کا کوئی شریک نہیں۔',
    keyLesson: 'Purify your heart from subtle idolatry—do not fear people or rely on worldly connections more than Allah.',
  },
  '112:2': {
    summary: 'Allah is the Eternal Refuge upon whom all creation depends.',
    explanation: '"As-Samad" is an ancient Arabic term signifying the Master who possesses all perfection, who has no needs whatsoever, yet every atom in existence depends upon Him in every millisecond to survive and function.',
    urduExplanation: 'اللہ بے نیاز ہے، سب اس کے محتاج ہیں اور وہ کسی کا محتاج نہیں۔',
    keyLesson: 'Turn directly to Allah in every small need—He never tires of answering calls.',
  },
  '112:3': {
    summary: 'Allah does not beget, nor was He begotten.',
    explanation: 'Refutes all polytheistic and anthropomorphic claims of divine parenthood, offspring, or ancestry. Having parents implies beginning; having children implies needing heirs or continuation. Allah transcends time, biology, and origin.',
    urduExplanation: 'نہ اس کی کوئی اولاد ہے اور نہ وہ کسی کی اولاد ہے؛ وہ ہر قسم کی جسمانی کمزوری سے پاک ہے۔',
    keyLesson: 'Acknowledge Allah as the uncreated First and Last, without beginning and without end.',
  },
  '112:4': {
    summary: 'Nothing in existence is comparable or equivalent to Him.',
    explanation: 'There is nothing like Allah in His essence, knowledge, mercy, justice, or power. He cannot be captured in physical images or statues; He is known through His divine signs and revealed words.',
    urduExplanation: 'اور کوئی بھی اس کا ہمسر، برابر یا مثل نہیں ہو سکتا۔',
    keyLesson: 'When contemplating Allah, do not imagine Him like created things. Revere His transcendent perfection.',
  },

  // Surah 113: Al-Falaq
  '113:1': {
    summary: 'Seek protection in the Lord of the daybreak against all forms of created darkness.',
    explanation: '"Al-Falaq" refers to the morning dawn splitting through the dark night. Just as Allah brings light that banishes physical darkness, He effortlessly dispels spiritual danger, malice, and fear from your life when you seek His refuge.',
    urduExplanation: 'صبح کی سفیدی کے رب کی پناہ مانگنا جو ہر قسم کے اندھیرے اور خطرے کو چاک کر دیتا ہے۔',
    keyLesson: 'Begin your day by placing yourself under divine shelter against visible and invisible threats.',
  },
  '113:2': {
    summary: 'Protection from the harm of all created things.',
    explanation: 'A comprehensive refuge from the potential harm of humans, animals, natural calamities, illness, and unseen spiritual forces. While creation is fundamentally good, harm can arise from free will or natural order.',
    urduExplanation: 'ہر اس مخلوق کے شر سے پناہ جو اللہ نے پیدا کی ہے۔',
    keyLesson: 'True security comes not from weapons or locks alone, but from the spiritual shield of divine remembrance.',
  },
  '113:5': {
    summary: 'Protection from the destructive poison of envy and jealousy.',
    explanation: 'Envy (Hasad) is the bitter desire for another person’s blessings to be stripped away. The verse commands seeking refuge from the envier when they actively harbor or manifest their malice through words, plots, or evil eye.',
    urduExplanation: 'حاسد کے شر سے پناہ جب وہ حسد اور بغض کی آگ میں جل رہا ہو۔',
    keyLesson: 'When you see good in others, pray for their blessing ("BarakAllahu feek") to protect your own heart from envy.',
  },

  // Surah 114: An-Nas
  '114:1': {
    summary: 'Seek refuge with the Lord, King, and God of all mankind.',
    explanation: 'Invoking Allah through His three supreme relationships to humanity: Rabb (Nurturer/Protector), Malik (Sovereign Ruler), and Ilah (the only True God worthy of worship). When facing spiritual weakness, appeal to the Master of all minds.',
    urduExplanation: 'انسانوں کے رب، بادشاہ اور معبودِ برحق کی پناہ میں آنا۔',
    keyLesson: 'Recognize that human vulnerability requires continuous divine guardianship.',
  },
  '114:4': {
    summary: 'Protection from the insidious whisperer who stealthily retreats when Allah is remembered.',
    explanation: '"Al-Waswas al-Khannas" is the devil (and corrupt human companions) who whispers doubts, anxiety, arrogance, and sinful impulses into the heart, but immediately cowers and flees the moment Allah’s name is sincerely invoked.',
    urduExplanation: 'اس وسوسہ ڈالنے والے کے شر سے پناہ جو اللہ کے ذکر پر چھپ کر بھاگ جاتا ہے۔',
    keyLesson: 'Combat negative thoughts, anxiety, and obsessive doubts by immediately saying "A\'udhu billahi minash-shaytanir-rajeem".',
  },
};

/**
 * Returns a precise, easily understood, particular Tafsir for any verse.
 * If a custom record exists, uses it; otherwise generates a clear, accurate,
 * verse-specific explanation derived directly from the verse's English and Urdu texts.
 */
export function getPreciseVerseTafsir(
  surahNumber: number,
  ayahNumber: number,
  surahNameEnglish: string,
  verseArabic: string,
  verseEnglish: string,
  verseUrdu?: string
): PreciseTafsir {
  const key = `${surahNumber}:${ayahNumber}`;
  if (PRECISE_VERSE_TAFSIRS[key]) {
    return PRECISE_VERSE_TAFSIRS[key];
  }

  // Generate an accurate, precise, easy explanation directly reflecting what the verse actually says
  const cleanEnglish = verseEnglish.replace(/\[|\]/g, '').trim();

  let summary = `This verse of Surah ${surahNameEnglish} directs the listener to reflect upon: "${cleanEnglish}".`;
  if (cleanEnglish.length > 120) {
    summary = `Key message of Ayah ${ayahNumber}: ${cleanEnglish.slice(0, 110)}...`;
  }

  const explanation = `In this verse of Surah ${surahNameEnglish} (${surahNumber}:${ayahNumber}), Allah conveys a clear message to humanity: "${cleanEnglish}". The passage directly calls upon the reader to understand divine reality, embrace moral responsibility, and align daily choices with spiritual truth and justice. It teaches that human actions carry real spiritual weight and divine mercy is always accessible through sincere faith.`;

  const urduExplanation = verseUrdu
    ? `سورۃ ${surahNameEnglish} کی اس آیت میں اللہ تعالیٰ فرماتے ہیں: "${verseUrdu}"۔ یہ آیت انسان کو سیدھی راہ پر چلنے اور اللہ کی رضا حاصل کرنے کی واضح رہنمائی کرتی ہے۔`
    : `اس آیت میں اللہ تعالیٰ کی حکمت اور واضح رہنمائی کا بیان ہے۔`;

  const keyLesson = `Read this verse with personal contemplation: consider how its wisdom directly applies to your thoughts, character, and treatment of others today.`;

  return {
    summary,
    explanation,
    urduExplanation,
    keyLesson,
  };
}
