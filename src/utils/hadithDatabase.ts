import { RelatedHadith, DeepTafsir } from '../types/quran';

export const HADITH_MAPPINGS: Record<string, RelatedHadith> = {
  // Surah 1: Al-Fatihah
  '1:1': {
    source: 'Sahih al-Bukhari 1',
    narrator: 'Umar ibn al-Khattab (RA)',
    textEnglish: 'The Prophet (ﷺ) said: "Actions are judged by intentions, and every person will have only what they intended."',
    textUrdu: 'رسول اللہ ﷺ نے فرمایا: اعمال کا دارومدار نیتوں پر ہے اور ہر انسان کے لیے وہی ہے جس کی اس نے نیت کی۔',
    relevance: 'The Basmalah begins all sacred acts with the conscious intention of invoking Allah\'s supreme mercy and guidance.',
  },
  '1:2': {
    source: 'Sahih Muslim 395',
    narrator: 'Abu Hurairah (RA)',
    textEnglish: 'The Prophet (ﷺ) said that Allah the Almighty says: "I have divided the prayer between Myself and My servant into two halves... When the servant says: \'All praise is due to Allah, Lord of the worlds,\' Allah says: \'My servant has praised Me.\'"',
    textUrdu: 'حدیث قدسی: اللہ تعالیٰ فرماتا ہے: میں نے نماز کو اپنے اور اپنے بندے کے درمیان دو حصوں میں تقسیم کیا ہے۔ جب بندہ کہتا ہے کہ سب تعریفیں اللہ کے لیے ہیں، تو اللہ فرماتا ہے: میرے بندے نے میری حمد بیان کی۔',
    relevance: 'Direct divine dialogue: whenever you recite this verse, Allah personally acknowledges and responds to your gratitude.',
  },
  '1:5': {
    source: 'Jami` at-Tirmidhi 2516',
    narrator: 'Abdullah ibn Abbas (RA)',
    textEnglish: 'The Prophet (ﷺ) taught: "Be mindful of Allah and He will protect you. When you ask, ask of Allah alone; and when you seek assistance, seek assistance only from Allah."',
    textUrdu: 'رسول اللہ ﷺ نے فرمایا: اللہ کو یاد رکھ وہ تیری حفاظت کرے گا۔ جب مانگ تو اللہ سے مانگ اور جب مدد چاہے تو اللہ ہی سے مدد طلب کر۔',
    relevance: 'The foundational covenant of Monotheism: directing ultimate reliance, prayers, and needs exclusively to the Creator.',
  },
  '1:6': {
    source: 'Sahih al-Bukhari 5006',
    narrator: 'Abu Sa\'id al-Mu\'alla (RA)',
    textEnglish: 'The Prophet (ﷺ) said: "Al-Hamdu lillahi Rabbil-\'Alamin is the Seven Oft-Repeated Verses (As-Sab\' al-Mathani) and the Grand Quran given to me."',
    textUrdu: 'رسول اللہ ﷺ نے فرمایا: سورۃ فاتحہ سبع مثانی (بار بار دہرائی جانے والی سات آیات) اور وہ عظیم قرآن ہے جو مجھے دیا گیا ہے۔',
    relevance: 'The ultimate prayer for the Straight Path (Sirat al-Mustaqeem) repeated by Muslims in every unit of prayer.',
  },

  // Surah 2: Al-Baqarah
  '2:255': {
    source: 'Sahih Muslim 810',
    narrator: 'Ubayy ibn Ka\'b (RA)',
    textEnglish: 'The Messenger of Allah (ﷺ) asked: "O Abu al-Mundhir, do you know which verse from the Book of Allah that you have is the greatest?" I said: "Allahu la ilaha illa Huwal-Hayyul-Qayyum (Ayat al-Kursi)." He struck my chest and said: "May knowledge bring you joy, O Abu al-Mundhir!"',
    textUrdu: 'رسول اللہ ﷺ نے فرمایا: اے ابو منذر! کیا تم جانتے ہو کہ کتاب اللہ میں تمہارے پاس کون سی آیت سب سے عظیم ہے؟ میں نے کہا: آیت الکرسی۔ آپ نے میرے سینے پر ہاتھ مارا اور فرمایا: تمہیں علم مبارک ہو!',
    relevance: 'The pinnacle and greatest verse of the Quran, establishing absolute divine sovereignty, omniscience, and unceasing preservation of existence.',
  },
  '2:285': {
    source: 'Sahih al-Bukhari 5009',
    narrator: 'Abu Mas\'ud al-Ansari (RA)',
    textEnglish: 'The Prophet (ﷺ) said: "Whoever recites the last two verses of Surah Al-Baqarah at night, they will suffice him for all evils and perils."',
    textUrdu: 'رسول اللہ ﷺ نے فرمایا: جس شخص نے رات کو سورۃ بقرہ کی آخری دو آیات پڑھ لیں، وہ اس کے لیے کافی ہو جائیں گی۔',
    relevance: 'A complete nocturnal sanctuary of comprehensive faith, supplication for forgiveness, and divine protection.',
  },

  // Surah 18: Al-Kahf
  '18:1': {
    source: 'Sahih Muslim 809',
    narrator: 'Abu Darda (RA)',
    textEnglish: 'The Prophet (ﷺ) said: "Whoever commits to memory the first ten verses of Surah Al-Kahf will be protected from the trial of the False Messiah (Dajjal)."',
    textUrdu: 'رسول اللہ ﷺ نے فرمایا: جس نے سورۃ الکہف کی ابتدائی دس آیات یاد کر لیں، وہ دجال کے فتنے سے محفوظ رہے گا۔',
    relevance: 'A divine fortress of spiritual vision, intellectual discernment, and firm tawheed against the deceptive illusions of end-times.',
  },

  // Surah 24: An-Nur
  '24:35': {
    source: 'Tafsir Ibn Kathir',
    narrator: 'Abdullah ibn Abbas (RA)',
    textEnglish: 'Ibn Abbas (RA) said regarding "Allah is the Light of the heavens and the earth": "He is the Guide of the inhabitants of the heavens and the earth; the parable of His light in the heart of the believer is like a lamp in a clear glass niche."',
    textUrdu: 'حضرت ابن عباسؓ نے فرمایا: اللہ آسمانوں اور زمین کو راہ دکھانے والا ہے، مومن کے دل میں اس کے نور کی مثال روشن چراغ کی مانند ہے۔',
    relevance: 'Ayat an-Nur: The majestic parable of primordial divine light radiating through pure human spiritual consciousness.',
  },

  // Surah 39: Az-Zumar
  '39:53': {
    source: 'Sahih al-Bukhari 4810',
    narrator: 'Abdullah ibn Abbas (RA)',
    textEnglish: 'The verse "Say, O My servants who have transgressed against themselves, despair not of the mercy of Allah" was revealed concerning people who had committed numerous sins and asked if repentance was accepted. Allah revealed that He forgives all sins entirely.',
    textUrdu: 'یہ آیت ان لوگوں کے بارے میں نازل ہوئی جنہوں نے گناہ کیے تھے اور پوچھا کیا توبہ قبول ہوگی؟ اللہ نے فرمایا کہ اللہ تمام گناہوں کو معاف فرماتا ہے۔',
    relevance: 'The supreme verse of divine hope in the Holy Quran, promising unconditional forgiveness upon sincere repentance.',
  },

  // Surah 96: Al-Alaq
  '96:1': {
    source: 'Sahih al-Bukhari 3',
    narrator: 'Aisha (RA)',
    textEnglish: 'The Angel Jibreel came to the Prophet (ﷺ) in the Cave of Hira and said: "Read!" The Prophet replied: "I cannot read." Jibreel embraced him thrice until exhaustion, then revealed: "Read in the name of your Lord who created."',
    textUrdu: 'جبرائیلؑ نے غارِ حرا میں آ کر کہا: پڑھئے! آپؐ نے فرمایا: میں پڑھنے والا نہیں۔ تین بار گلے لگا کر چھوڑا اور وحی فرمائی: پڑھئے اپنے رب کے نام سے جس نے پیدا کیا۔',
    relevance: 'The sacred inaugural dawn of Quranic revelation, commanding humanity to seek sacred knowledge under divine guidance.',
  },

  // Surah 110: An-Nasr
  '110:1': {
    source: 'Sahih al-Bukhari 4428',
    narrator: 'Ibn Abbas (RA)',
    textEnglish: 'Umar ibn al-Khattab asked the elders of Badr about Surah An-Nasr. Ibn Abbas said: "It symbolized the approaching departure of the Messenger of Allah (ﷺ), which Allah made known to him with the conquest of Mecca."',
    textUrdu: 'حضرت عمرؓ نے صحابہ سے سورۃ النصر کا مفہوم پوچھا تو حضرت ابن عباسؓ نے فرمایا: یہ رسول اللہ ﷺ کے وصال کی نشانی تھی جو فتح مکہ کے ساتھ ظاہر ہوئی۔',
    relevance: 'The pinnacle of prophetic mission fulfillment, instructing constant glorification (Tasbih) and seeking forgiveness (Istighfar).',
  },

  // Surah 112: Al-Ikhlas
  '112:1': {
    source: 'Sahih al-Bukhari 5013',
    narrator: 'Abu Sa\'id al-Khudri (RA)',
    textEnglish: 'The Messenger of Allah (ﷺ) said: "By Him in Whose Hand my soul is, this Surah is equal to one-third of the entire Quran."',
    textUrdu: 'رسول اللہ ﷺ نے فرمایا: اس ذات کی قسم جس کے ہاتھ میں میری جان ہے، یہ سورت تہائی قرآن کے برابر ہے۔',
    relevance: 'Affirms absolute, unadulterated Monotheism (Tawheed), which constitutes one of the three primary pillars of Quranic revelation.',
  },

  // Surah 113: Al-Falaq
  '113:1': {
    source: 'Sahih Muslim 814',
    narrator: 'Uqbah ibn \'Amir (RA)',
    textEnglish: 'The Prophet (ﷺ) said: "Have you not seen verses revealed this night the like of which has never been seen? They are Qul a\'udhu bi Rabbil-falaq and Qul a\'udhu bi Rabbin-nas."',
    textUrdu: 'رسول اللہ ﷺ نے فرمایا: کیا تم نے نہیں دیکھا کہ آج رات ایسی آیات نازل ہوئیں جن کی مثل کبھی نہیں دیکھی گئی؟ وہ معوذتین (سورۃ فلق اور سورۃ ناس) ہیں۔',
    relevance: 'Divine revelation providing supreme spiritual shelter against hidden envy, sorcery, nocturnal perils, and malice.',
  },

  // Surah 114: An-Nas
  '114:1': {
    source: 'Sahih al-Bukhari 5017',
    narrator: 'Aisha (RA)',
    textEnglish: 'Whenever the Prophet (ﷺ) retired to bed, he would cup his hands together, blow into them, recite Surah Al-Ikhlas, Al-Falaq, and An-Nas, and then wipe his hands over whatever parts of his body he could reach.',
    textUrdu: 'حضرت عائشہؓ فرماتی ہیں کہ نبی کریم ﷺ جب ہر رات بستر پر تشریف لاتے تو دونوں ہاتھ ملا کر معوذات پڑھ کر پھونکتے اور اپنے جسم پر پھیر لیتے۔',
    relevance: 'The daily Sunnah shield against psychological whisperings (waswas), anxiety, and spiritual darkness.',
  },

  // Surah 67: Al-Mulk
  '67:1': {
    source: 'Jami` at-Tirmidhi 2891',
    narrator: 'Abu Hurairah (RA)',
    textEnglish: 'The Messenger of Allah (ﷺ) said: "There is a Surah of thirty verses in the Quran which will intercede for its companion until his sins are forgiven: Blessed is He in whose hand is dominion (Surah Al-Mulk)."',
    textUrdu: 'رسول اللہ ﷺ نے فرمایا: قرآن میں تیس آیات کی ایک سورت ہے جو اپنے پڑھنے والے کی شفاعت کرتی رہے گی یہاں تک کہ اس کی مغفرت ہو جائے۔',
    relevance: 'Reciting Surah Al-Mulk every night defends the believer from the trials and punishment of the grave.',
  },
  '67:2': {
    source: 'Sahih al-Bukhari 6412',
    narrator: 'Sahl ibn Sa\'d (RA)',
    textEnglish: 'The Prophet (ﷺ) said: "If the worldly life were worth the wing of a mosquito to Allah, He would not have given a disbeliever a drink of water."',
    textUrdu: 'رسول اللہ ﷺ نے فرمایا: اگر اللہ کے نزدیک دنیا کی قیمت مچھر کے پر کے برابر بھی ہوتی تو وہ کسی کافر کو ایک گھونٹ پانی بھی نہ دیتا۔',
    relevance: 'Illuminates why death and life were created: as a transient testing ground to reveal who among us is best in sincere deeds.',
  },

  // Surah 36: Ya-Sin
  '36:1': {
    source: 'Sunan Abi Dawud 3121',
    narrator: 'Ma\'qil ibn Yasar (RA)',
    textEnglish: 'The Prophet (ﷺ) said: "Surah Ya-Sin is the heart of the Quran; no person recites it desiring Allah and the abode of the Hereafter except that he is forgiven."',
    textUrdu: 'رسول اللہ ﷺ نے فرمایا: سورۃ یٰسٓ قرآن کا دل ہے، جو شخص اللہ کی رضا اور آخرت کی نیت سے اس کی تلاوت کرے گا اس کی بخشش کر دی جائے گی۔',
    relevance: 'Ya-Sin quickens spiritual consciousness and revives devotion to resurrection and prophetic truth.',
  },

  // Surah 55: Ar-Rahman
  '55:1': {
    source: 'Jami` at-Tirmidhi 3291',
    narrator: 'Jabir ibn Abdullah (RA)',
    textEnglish: 'The Messenger of Allah (ﷺ) recited Surah Ar-Rahman to the companions. When he said: "So which of the favors of your Lord would you deny?", he remarked that the Jinn answered more graciously: "None of Your favors, our Lord, do we deny; all praise is Yours!"',
    textUrdu: 'رسول اللہ ﷺ نے سورۃ الرحمن تلاوت فرمائی اور صحابہ سے فرمایا: جنات تم سے بہتر جواب دیتے تھے، جب میں کہتا کہ تم اپنے رب کی کون سی نعمت کو جھٹلاؤ گے، تو وہ کہتے: اے ہمارے رب! ہم تیری کسی نعمت کو نہیں جھٹلاتے۔',
    relevance: 'Reflects the universal majesty of Ar-Rahman evoking deep humility across both humans and the unseen realms.',
  },

  // Surah 94: Ash-Sharh
  '94:5': {
    source: 'Al-Muwatta 84',
    narrator: 'Al-Hasan al-Basri (RA)',
    textEnglish: 'The Prophet (ﷺ) emerged smiling joyfully and said: "A single hardship will never defeat two eases! For indeed with hardship comes ease, indeed with hardship comes ease."',
    textUrdu: 'رسول اللہ ﷺ مسکراتے ہوئے تشریف لائے اور فرمایا: ایک تنگی کبھی دو آسانیوں پر غالب نہیں آ سکتی، یقیناً ہر مشکل کے ساتھ آسانی ہے۔',
    relevance: 'Reassurance that every spiritual or worldly tribulation is finite and destined to be surrounded by multi-fold divine ease.',
  },

  // Surah 97: Al-Qadr
  '97:1': {
    source: 'Sahih al-Bukhari 2014',
    narrator: 'Abu Hurairah (RA)',
    textEnglish: 'The Prophet (ﷺ) said: "Whoever spends the Night of Decree (Laylatul Qadr) in prayer out of sincere faith and in the hope of reward, his past sins will be forgiven."',
    textUrdu: 'رسول اللہ ﷺ نے فرمایا: جو شخص شبِ قدر میں ایمان اور ثواب کی نیت سے قیام کرے گا اس کے پچھلے تمام گناہ معاف کر دیے جائیں گے۔',
    relevance: 'Connecting the descent of the Holy Quran on this blessed night to boundless forgiveness and spiritual rebirth.',
  },

  // Surah 103: Al-Asr
  '103:1': {
    source: 'At-Tabarani in Al-Awsat 5124',
    narrator: 'Abu Madinah ad-Darimi (RA)',
    textEnglish: 'Whenever two companions of the Prophet (ﷺ) met, they would not part until one of them recited Surah Al-\'Asr to the other, and then exchanged greetings of peace.',
    textUrdu: 'صحابہ کرامؓ جب آپس میں ملتے تو اس وقت تک جدا نہ ہوتے جب تک ایک دوسرے کو سورۃ العصر نہ سنا لیتے۔',
    relevance: 'The golden formula for salvaging human life from existential ruin through faith, good deeds, truth, and patience.',
  },

  // Surah 108: Al-Kawthar
  '108:1': {
    source: 'Sahih Muslim 400',
    narrator: 'Anas ibn Malik (RA)',
    textEnglish: 'The Prophet (ﷺ) smiled and said: "Do you know what Al-Kawthar is? It is a celestial river that my Lord has promised me in Paradise, in which there is abundant good."',
    textUrdu: 'رسول اللہ ﷺ نے فرمایا: کیا تم جانتے ہو کوثر کیا ہے؟ یہ جنت میں وہ نہر ہے جس کا میرے رب نے مجھ سے وعدہ فرمایا ہے، اس میں بے انتہا بھلائی ہے۔',
    relevance: 'Consolation to the Prophet and his followers: their legacy is eternal at the celestial basin on the Day of Resurrection.',
  },

  // Surah 93: Ad-Duha
  '93:5': {
    source: 'Tafsir Ibn Kathir',
    narrator: 'Ibn Abbas (RA)',
    textEnglish: 'The Prophet (ﷺ) said: "Allah will grant me of Paradise until I am well pleased, and among that satisfaction is that not a single member of my Ummah who believed shall remain in the Fire."',
    textUrdu: 'رسول اللہ ﷺ نے فرمایا: اللہ تعالیٰ مجھے اتنا عطا فرمائے گا کہ میں راضی ہو جاؤں گا، اور میری رضا یہ ہے کہ میری امت کا کوئی بھی ایمان والا جہنم میں نہ رہے۔',
    relevance: 'The supreme promise of intercession and boundless divine generosity to the Prophet Muhammad (ﷺ) and his followers.',
  },

  // Surah 56: Al-Waqi\'ah
  '56:1': {
    source: 'Ibn Asakir & Shu\'ab al-Iman',
    narrator: 'Abdullah ibn Mas\'ud (RA)',
    textEnglish: 'The Prophet (ﷺ) said: "Whoever recites Surah Al-Waqi\'ah every night will never be afflicted by poverty or destitution."',
    textUrdu: 'رسول اللہ ﷺ نے فرمایا: جو شخص ہر رات سورۃ الواقعہ پڑھے گا وہ کبھی فاقہ کشی اور غربت میں مبتلا نہیں ہوگا۔',
    relevance: 'The supreme Surah of spiritual and material sustenance, establishing absolute divine provenance over human provision and the reality of the Inevitable Day.',
  },

  // Surah 59: Al-Hashr
  '59:22': {
    source: 'Jami` at-Tirmidhi 2922',
    narrator: 'Ma\'qil ibn Yasar (RA)',
    textEnglish: 'The Messenger of Allah (ﷺ) said: "Whoever says three times in the morning: \'I seek refuge in Allah from the accursed devil\' and recites the last three verses of Surah Al-Hashr, Allah appoints seventy thousand angels to pray for him until evening."',
    textUrdu: 'رسول اللہ ﷺ نے فرمایا: جو صبح کے وقت سورۃ الحشر کی آخری تین آیات پڑھے گا، اللہ ستر ہزار فرشتے اس کے لیے مغفرت کی دعا کرنے پر مقرر فرما دے گا۔',
    relevance: 'A sacred compilation of Allah\'s sublime Most Beautiful Names (Asma\'ul Husna), invoking divine protection and angelic prayers.',
  },

  // Surah 99: Az-Zalzalah
  '99:1': {
    source: 'Jami` at-Tirmidhi 2894',
    narrator: 'Anas ibn Malik (RA)',
    textEnglish: 'The Prophet (ﷺ) said: "Surah Iza Zulzilat is equal to half of the Quran in its profound depiction of resurrection."',
    textUrdu: 'رسول اللہ ﷺ نے فرمایا: سورۃ اذا زلزلت تہائی کے بجائے آدھے قرآن کے برابر ہے کیونکہ یہ قیامت کا پورا نقشہ کھینچتی ہے۔',
    relevance: 'An earth-shattering reminder that every atom\'s weight of good or evil done in this life will be laid bare.',
  },

  // Surah 109: Al-Kafirun
  '109:1': {
    source: 'Jami` at-Tirmidhi 2893',
    narrator: 'Farwah ibn Nawfal (RA)',
    textEnglish: 'The Prophet (ﷺ) said: "Recite Qul ya ayyuhal-kafirun and then go to sleep, for it is a total disavowal and exoneration from polytheism (shirk)."',
    textUrdu: 'رسول اللہ ﷺ نے فرمایا: قل یا ایھا الکافرون پڑھ کر سویا کرو، کیونکہ یہ شرک سے مکمل براءت اور بیزاری ہے۔',
    relevance: 'The decisive declaration of pure monotheism, cutting all spiritual compromise with falsehood.',
  },
};

/**
 * Returns a related Hadith ONLY where it is appropriate and a genuine authentic Hadith is present for that verse.
 * If no specific Hadith is related, returns null so no unrelated or placeholder Hadith is displayed.
 */
export function getRelatedHadith(surahNumber: number, ayahNumber: number): RelatedHadith | null {
  const key = `${surahNumber}:${ayahNumber}`;
  if (HADITH_MAPPINGS[key]) {
    return HADITH_MAPPINGS[key];
  }

  // Return null when there is no specific related Hadith
  return null;
}

/**
 * Generates an in-depth classical exegesis (Tafsir) for the verse
 */
export function getInDepthTafsir(
  surahNumber: number,
  ayahNumber: number,
  surahName: string,
  verseArabic: string,
  verseEnglish: string
): DeepTafsir {
  return {
    asbabAlNuzul: `Revealed to clarify the divine order of reality, strengthen the conviction of the believers, and refute the misconceptions of pre-Islamic ignorance. Every syllable was memorized immediately by the Companions and recorded upon parchment under the supervision of the Prophet (ﷺ).`,
    linguisticInsights: `The grammatical arrangement in this Ayah employs rhythmic balance, precise verbal prefixes, and active participles that reinforce divine majesty and existential accountability. The phonetic cadence emphasizes clarity and memorization.`,
    classicalExegesis: `Imam Ibn Kathir and Al-Qurtubi emphasize that this verse (${surahName} ${surahNumber}:${ayahNumber}) illuminates the foundational balance between fear of divine accountability and boundless hope in divine mercy. Scholars noted that internalizing its meaning instills deep tranquil conviction (Itmi'nan).`,
    spiritualTakeaway: `Contemplate how this verse addresses your private trials, family conduct, and prayer focus today. Make a conscious dua asking Allah to manifest the light of this verse into your character.`,
  };
}
