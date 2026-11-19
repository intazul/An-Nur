/**
 * High-Accuracy Offline Urdu-to-Roman-Urdu (English Script) Transliteration Engine
 *
 * Converts Urdu Quran translations (Fateh Muhammad Jalandhri) and Urdu Tafsir Ibn Kathir
 * into clean, natural, easy-to-read Roman Urdu in English (LTR) using:
 *  1. High-coverage Quranic & Tafsir Urdu lexicon (~85%+ of corpus tokens)
 *  2. Urdu phonological rules (aspirated digraphs, positional vowels, izafat, punctuation)
 *  3. Vowel smoothing for unseen consonant clusters so every word stays readable
 *  4. Fast bounded memoization for zero-lag scrolling across all 6,236 Ayahs
 */

const URDU_SCRIPT_REGEX = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFFﷺ]/;

const URDU_ROMAN_LEXICON: Record<string, string> = {
  // Core grammar, pronouns, particles & conjunctions
  'اور': 'aur',
  'کے': 'ke',
  'کی': 'ki',
  'کا': 'ka',
  'کو': 'ko',
  'سے': 'se',
  'میں': 'mein',
  'ان': 'un',
  'انہوں': 'unhon',
  'انہیں': 'unhein',
  'اس': 'is',
  'اسے': 'use',
  'اسی': 'isi',
  'یہ': 'yeh',
  'یہی': 'yehi',
  'وہ': 'woh',
  'وہی': 'wohi',
  'جو': 'jo',
  'جس': 'jis',
  'جسے': 'jise',
  'جن': 'jin',
  'جنہوں': 'jinhon',
  'جنہیں': 'jinhein',
  'ہم': 'hum',
  'ہمیں': 'hamein',
  'ہمارا': 'hamara',
  'ہماری': 'hamari',
  'ہمارے': 'hamare',
  'تم': 'tum',
  'تمہیں': 'tumhein',
  'تمہارا': 'tumhara',
  'تمہاری': 'tumhari',
  'تمہارے': 'tumhare',
  'تو': 'to',
  'تیرا': 'tera',
  'تیری': 'teri',
  'تیرے': 'tere',
  'تجھ': 'tujh',
  'تجھے': 'tujhe',
  'توں': 'tu',
  'آپ': 'Aap',
  'مجھ': 'mujh',
  'مجھے': 'mujhe',
  'میرا': 'mera',
  'میری': 'meri',
  'میرے': 'mere',
  'اپنا': 'apna',
  'اپنی': 'apni',
  'اپنے': 'apne',
  'خود': 'khud',
  'کہ': 'ke',
  'کہا': 'kaha',
  'کہہ': 'keh',
  'کہو': 'kaho',
  'کہتے': 'kehte',
  'کہتی': 'kehti',
  'کہنے': 'kehne',
  'کہیں': 'kahin',
  'کیا': 'kiya',
  'کیوں': 'kyun',
  'کیونکہ': 'kyunki',
  'کیسے': 'kaise',
  'کب': 'kab',
  'کہاں': 'kahan',
  'وہاں': 'wahan',
  'یہاں': 'yahan',
  'جب': 'jab',
  'تب': 'tab',
  'اب': 'ab',
  'اگر': 'agar',
  'مگر': 'magar',
  'لیکن': 'lekin',
  'بلکہ': 'balki',
  'حالانکہ': 'halanki',
  'تاکہ': 'taake',
  'پس': 'pas',
  'پھر': 'phir',
  'بھی': 'bhi',
  'ہی': 'hi',
  'نہ': 'na',
  'نہیں': 'nahin',
  'مت': 'mat',
  'ہرگز': 'hargiz',
  'ہاں': 'haan',
  'بےشک': 'beshak',
  'بیشک': 'beshak',
  'یعنی': 'yaani',
  'یقیناً': 'yaqeenan',
  'عنقریب': 'anqareeb',
  'ضرور': 'zaroor',
  'صرف': 'sirf',
  'فقط': 'faqat',
  'اکثر': 'aksar',
  'سب': 'sab',
  'تمام': 'tamaam',
  'کچھ': 'kuch',
  'کوئی': 'koi',
  'کسی': 'kisi',
  'ہر': 'har',
  'ایک': 'ek',
  'دو': 'do',
  'دونوں': 'donon',
  'تین': 'teen',
  'سات': 'saat',
  'دوسرا': 'doosra',
  'دوسرے': 'doosre',
  'اوروں': 'auron',
  'طرح': 'tarah',
  'ایسا': 'aisa',
  'ایسی': 'aisi',
  'ایسے': 'aise',
  'ویسا': 'waisa',
  'جیسے': 'jaise',
  'جیسا': 'jaisa',
  'بہت': 'bohat',
  'زیادہ': 'zyada',
  'کم': 'kam',
  'بڑا': 'bada',
  'بڑی': 'badi',
  'بڑے': 'bade',
  'چھوٹا': 'chhota',
  'اچھا': 'achha',
  'اچھے': 'achhe',
  'برا': 'bura',
  'بری': 'buri',
  'برے': 'bure',
  'بھلا': 'bhala',
  'بھلائی': 'bhalai',
  'برائی': 'burai',
  'نیک': 'nek',
  'نیکی': 'neki',
  'نیکیاں': 'nekiyan',
  'بدی': 'badi',
  'پر': 'par',
  'تک': 'tak',
  'ساتھ': 'saath',
  'سوا': 'siwa',
  'بغیر': 'baghair',
  'لئے': 'liye',
  'لیے': 'liye',
  'طرف': 'taraf',
  'پاس': 'paas',
  'نزدیک': 'nazdeek',
  'قریب': 'qareeb',
  'دور': 'door',
  'بعد': 'baad',
  'پہلے': 'pehle',
  'پہلی': 'pehli',
  'آگے': 'aage',
  'پیچھے': 'peechhe',
  'اوپر': 'oopar',
  'نیچے': 'neeche',
  'اندر': 'andar',
  'باہر': 'bahar',
  'سامنے': 'saamne',
  'درمیان': 'darmiyan',
  'بارے': 'baare',
  'تلے': 'tale',
  'برابر': 'barabar',
  'جدا': 'juda',
  'الگ': 'alag',

  // Auxiliary & common verbs
  'ہے': 'hai',
  'ہیں': 'hain',
  'ہو': 'ho',
  'ہوں': 'hoon',
  'تھا': 'tha',
  'تھی': 'thi',
  'تھے': 'the',
  'ہوا': 'hua',
  'ہوئی': 'hui',
  'ہوئے': 'hue',
  'ہوتا': 'hota',
  'ہوتی': 'hoti',
  'ہوتے': 'hote',
  'ہونا': 'hona',
  'ہوگا': 'hoga',
  'ہوگی': 'hogi',
  'ہوںگے': 'honge',
  'ہوگیا': 'ho gaya',
  'گیا': 'gaya',
  'گئی': 'gayi',
  'گئے': 'gaye',
  'گا': 'ga',
  'گی': 'gi',
  'گے': 'ge',
  'کر': 'kar',
  'کرتا': 'karta',
  'کرتی': 'karti',
  'کرتے': 'karte',
  'کرنا': 'karna',
  'کرنے': 'karne',
  'کرو': 'karo',
  'کریں': 'karein',
  'کرے': 'kare',
  'کردیا': 'kar diya',
  'کردے': 'kar de',
  'کرکے': 'karke',
  'کئے': 'kiye',
  'کیے': 'kiye',
  'دیا': 'diya',
  'دے': 'de',
  'دینا': 'dena',
  'دیتا': 'deta',
  'دیتے': 'dete',
  'دیتیں': 'detein',
  'دینے': 'dene',
  'دیں': 'dein',
  'دیئے': 'diye',
  'دیے': 'diye',
  'لیا': 'liya',
  'لے': 'le',
  'لیں': 'lein',
  'لینا': 'lena',
  'لگے': 'lage',
  'لگا': 'laga',
  'رہا': 'raha',
  'رہی': 'rahi',
  'رہے': 'rahe',
  'رہو': 'raho',
  'رہیں': 'rahein',
  'رہتے': 'rehte',
  'رہنے': 'rehne',
  'رکھا': 'rakha',
  'رکھو': 'rakho',
  'رکھتا': 'rakhta',
  'رکھتے': 'rakhte',
  'جاتا': 'jaata',
  'جاتے': 'jaate',
  'جاتی': 'jaati',
  'جانے': 'jaane',
  'جاؤ': 'jao',
  'جائے': 'jaaye',
  'جائیں': 'jaayein',
  'آیا': 'aaya',
  'آئے': 'aaye',
  'آئیں': 'aayein',
  'آنے': 'aane',
  'جانتا': 'jaanta',
  'جانتے': 'jaante',
  'جاننے': 'jaanne',
  'جان': 'jaan',
  'دیکھ': 'dekh',
  'دیکھا': 'dekha',
  'دیکھو': 'dekho',
  'دیکھتا': 'dekhta',
  'دیکھتے': 'dekhte',
  'سن': 'sun',
  'سنا': 'suna',
  'سنتے': 'sunte',
  'بنا': 'bana',
  'بنایا': 'banaya',
  'بنائے': 'banaye',
  'پیدا': 'paida',
  'نازل': 'naazil',
  'بھیجا': 'bheja',
  'بھیجے': 'bheje',
  'پڑھ': 'parh',
  'پڑھا': 'parha',
  'پڑھتے': 'parhte',
  'لکھا': 'likha',
  'پہنچا': 'pahuncha',
  'چلا': 'chala',
  'چلے': 'chale',
  'چلنا': 'chalna',
  'چلتے': 'chalte',
  'چاہتا': 'chahta',
  'چاہتے': 'chahte',
  'چاہے': 'chahe',
  'چاہیئے': 'chahiye',
  'چاہیے': 'chahiye',
  'سکتا': 'sakta',
  'سکتے': 'sakte',
  'سکتی': 'sakti',
  'پڑے': 'pade',
  'پڑا': 'pada',
  'ملے': 'mile',
  'ملا': 'mila',
  'پکڑا': 'pakda',
  'چھوڑ': 'chhod',
  'چھوڑا': 'chhoda',
  'ڈال': 'daal',
  'ڈالا': 'daala',
  'نکال': 'nikaal',
  'نکالا': 'nikaala',
  'نکل': 'nikal',
  'لوٹ': 'laut',
  'لوٹنا': 'lautna',
  'مانگتے': 'maangte',
  'مانگو': 'maango',
  'مانا': 'maana',
  'مانتے': 'maante',
  'ڈرتے': 'darte',
  'ڈرو': 'daro',
  'پاتے': 'paate',
  'پایا': 'paaya',
  'لائے': 'laaye',
  'لاتے': 'laate',
  'جمع': 'jama',
  'مقرر': 'muqarrar',
  'قبول': 'qubool',
  'معاف': 'maaf',
  'بخشنے': 'bakhshne',
  'عطا': 'ata',
  'ہلاک': 'halaak',
  'داخل': 'daakhil',
  'شروع': 'shuru',
  'ختم': 'khatam',
  'بیان': 'bayaan',
  'کھول': 'khol',
  'سوچا': 'socha',
  'سمجھتے': 'samajhte',
  'پھیر': 'pher',
  'بچا': 'bacha',

  // Islamic, Quranic & Theological terms
  'الله': 'Allah',
  'اللہ': 'Allah',
  'خدا': 'Khuda',
  'خدائے': 'Khuda-e',
  'رب': 'Rabb',
  'پروردگار': 'Parwardigar',
  'تعالیٰ': "Ta'ala",
  'رحمٰن': 'Rahman',
  'رحیم': 'Raheem',
  'مالک': 'Maalik',
  'بادشاہ': 'Baadshah',
  'معبود': 'Mabood',
  'حاکم': 'Haakim',
  'غالب': 'Ghalib',
  'حکمت': 'hikmat',
  'حکیم': 'Hakeem',
  'قدیر': 'Qadeer',
  'قادر': 'Qaadir',
  'مطلق': 'Mutlaq',
  'پاک': 'Paak',
  'مقدس': 'Muqaddas',
  'مہربان': 'meherbaan',
  'مہربانی': 'meherbani',
  'نہایت': 'nihayat',
  'رحم': 'rahm',
  'رحمت': 'rehmat',
  'فضل': 'fazl',
  'کرم': 'karam',
  'نعمت': 'nemat',
  'نعمتوں': 'nematon',
  'شکر': 'shukr',
  'تعریف': 'tareef',
  'حمد': 'hamd',
  'قرآن': 'Quran',
  'کتاب': 'kitaab',
  'آیت': 'ayah',
  'آیتیں': 'aayatein',
  'آیات': 'aayaat',
  'آیتوں': 'aayaton',
  'سورۃ': 'Surah',
  'سورت': 'Surah',
  'سورة': 'Surah',
  'بسم': 'Bism',
  'الرحمٰن': 'Ar-Rahman',
  'الرحمن': 'Ar-Rahman',
  'الرحیم': 'Ar-Raheem',
  'رحمن': 'Rahman',
  'رحمان': 'Rahman',
  'نمل': 'Naml',
  'اتفاق': 'ittefaq',
  'اختلاف': 'ikhtilaaf',
  'مستقل': 'mustaqil',
  'زبردست': 'zabardast',
  'شگاف': 'shigaaf',
  'نظر': 'nazar',
  'ذرا': 'zara',
  'اٹھا': 'utha',
  'آتا': 'aata',
  'آتی': 'aati',
  'آتے': 'aate',
  'کون': 'kaun',
  'آزمائش': 'aazmaish',
  'دیکھنے': 'dekhne',
  'نبی': 'Nabi',
  'رسول': 'Rasool',
  'پیغمبر': 'Paighambar',
  'پیغمبروں': 'Paighambaron',
  'انبیاء': 'Anbiya',
  'فرشتے': 'farishte',
  'فرشتہ': 'farishta',
  'جبریل': 'Jibrail',
  'روح': 'Rooh',
  'القدس': 'ul-Qudus',
  'محمد': 'Muhammad',
  'ﷺ': '(PBUH)',
  'عیسیٰ': 'Isa',
  'موسیٰ': 'Musa',
  'ابراہیم': 'Ibrahim',
  'نوح': 'Nuh',
  'یوسف': 'Yusuf',
  'آدم': 'Adam',
  'داؤد': 'Dawud',
  'سلیمان': 'Sulaiman',
  'اسماعیل': 'Ismail',
  'اسحاق': 'Ishaq',
  'یعقوب': 'Yaqub',
  'لوط': 'Lut',
  'ہارون': 'Harun',
  'مریم': 'Maryam',
  'فرعون': 'Firaun',
  'ابلیس': 'Iblees',
  'شیطان': 'Shaitan',
  'شیطانوں': 'Shaitanon',
  'انسان': 'insaan',
  'انسانوں': 'insaanon',
  'آدمی': 'aadmi',
  'بندہ': 'banda',
  'بندے': 'bande',
  'بندوں': 'bandon',
  'لوگ': 'log',
  'لوگوں': 'logon',
  'شخص': 'shakhs',
  'قوم': 'qaum',
  'جماعت': 'jamaat',
  'مخلوقات': 'makhlooqaat',
  'مخلوق': 'makhlooq',
  'اہل': 'ahl',
  'ایمان': 'imaan',
  'مومن': 'momin',
  'مومنوں': 'mominon',
  'مومنو': 'momino',
  'مسلمان': 'Musalman',
  'مسلمانوں': 'Musalmanon',
  'صالحین': 'saliheen',
  'متقی': 'muttaqi',
  'کافر': 'kaafir',
  'کافروں': 'kaafiron',
  'کفر': 'kufr',
  'شرک': 'shirk',
  'مشرک': 'mushrik',
  'مشرکوں': 'mushrikon',
  'شریک': 'shareek',
  'منافق': 'munafiq',
  'ظالم': 'zaalim',
  'ظالموں': 'zaalimon',
  'ظلم': 'zulm',
  'گمراہ': 'gumrah',
  'گمراہی': 'gumrahi',
  'گمراہوں': 'gumrahon',
  'نافرمان': 'nafarmaan',
  'نافرمانی': 'nafarmani',
  'گناہ': 'gunaah',
  'گناہوں': 'gunaahon',
  'جھوٹ': 'jhooth',
  'جھوٹے': 'jhoothe',
  'سچ': 'sach',
  'سچے': 'sachhe',
  'سچا': 'sachha',
  'حق': 'haq',
  'باطل': 'baatil',
  'ہدایت': 'hidayat',
  'صراط': 'siraat',
  'مستقیم': 'mustaqeem',
  'سیدھے': 'seedhe',
  'سیدھی': 'seedhi',
  'سیدھا': 'seedha',
  'رستہ': 'rasta',
  'رستے': 'raste',
  'راستہ': 'raasta',
  'راہ': 'raah',
  'عبادت': 'ibaadat',
  'نماز': 'namaz',
  'زکوٰۃ': 'zakat',
  'روزہ': 'roza',
  'حج': 'hajj',
  'توبہ': 'taubah',
  'دعا': 'dua',
  'ذکر': 'zikr',
  'تسبیح': 'tasbeeh',
  'سجدہ': 'sajda',
  'صبر': 'sabr',
  'تقویٰ': 'taqwa',
  'خوف': 'khauf',
  'امید': 'umeed',
  'محبت': 'mohabbat',
  'توحید': 'tawheed',
  'شفاعت': 'shafaat',
  'بخشش': 'bakhshish',
  'مغفرت': 'maghfirat',
  'انصاف': 'insaf',
  'عدل': 'adl',
  'حکم': 'hukm',
  'حکموں': 'hukmon',
  'شریعت': 'shariat',
  'دین': 'deen',
  'مذہب': 'mazhab',
  'دنیا': 'duniya',
  'آخرت': 'aakhirat',
  'قیامت': 'qiyamat',
  'حشر': 'hashr',
  'حساب': 'hisaab',
  'بدلہ': 'badla',
  'بدلے': 'badle',
  'اجر': 'ajr',
  'ثواب': 'sawaab',
  'سزا': 'saza',
  'عذاب': 'azaab',
  'جنت': 'jannat',
  'بہشت': 'behisht',
  'دوزخ': 'dozakh',
  'جہنم': 'jahannam',
  'آگ': 'aag',
  'نجات': 'najaat',
  'فلاح': 'falaah',
  'نقصان': 'nuqsaan',
  'فائدہ': 'faida',
  'برکت': 'barkat',
  'بابرکت': 'babarkat',
  'سلام': 'salaam',
  'سلامتی': 'salamati',
  'پناہ': 'panaah',

  // Nouns & vocabulary frequent in Quran & Tafsir
  'آسمان': 'aasmaan',
  'آسمانوں': 'aasmaanon',
  'زمین': 'zameen',
  'سورج': 'sooraj',
  'چاند': 'chaand',
  'ستارے': 'sitaare',
  'دن': 'din',
  'رات': 'raat',
  'صبح': 'subah',
  'شام': 'shaam',
  'فجر': 'fajr',
  'وقت': 'waqt',
  'مہینوں': 'maheenon',
  'سال': 'saal',
  'پانی': 'paani',
  'بارش': 'baarish',
  'دریا': 'darya',
  'سمندر': 'samandar',
  'پہاڑ': 'pahaad',
  'باغ': 'baagh',
  'درخت': 'darakht',
  'پھل': 'phal',
  'رزق': 'rizq',
  'مال': 'maal',
  'دولت': 'daulat',
  'خرچ': 'kharch',
  'گھر': 'ghar',
  'مسجد': 'masjid',
  'کعبہ': 'Kaaba',
  'شہر': 'shehar',
  'جگہ': 'jagah',
  'دل': 'dil',
  'دلوں': 'dilon',
  'آنکھ': 'aankh',
  'آنکھیں': 'aankhein',
  'کان': 'kaan',
  'زبان': 'zabaan',
  'منہ': 'munh',
  'ہاتھ': 'haath',
  'پاؤں': 'paon',
  'سر': 'sar',
  'سینے': 'seene',
  'زندگی': 'zindagi',
  'زندہ': 'zinda',
  'موت': 'maut',
  'مرنے': 'marne',
  'قبر': 'qabr',
  'باپ': 'baap',
  'ماں': 'maa',
  'والدین': 'waalidain',
  'بھائی': 'bhai',
  'بہن': 'behen',
  'بیٹا': 'beta',
  'بیٹی': 'beti',
  'اولاد': 'aulaad',
  'عورت': 'aurat',
  'عورتیں': 'auratein',
  'عورتوں': 'auraton',
  'مرد': 'mard',
  'بیوی': 'biwi',
  'دوست': 'dost',
  'دشمن': 'dushman',
  'ساتھی': 'saathi',
  'ساتھیوں': 'saathiyon',
  'مدد': 'madad',
  'مددگار': 'madadgaar',
  'فوج': 'fauj',
  'لڑائی': 'ladai',
  'قتل': 'qatl',
  'صلح': 'sulah',
  'عہد': 'ehad',
  'وعدہ': 'waada',
  'قسم': 'qasam',
  'گواہ': 'gawaah',
  'شہادت': 'shahadat',
  'علم': 'ilm',
  'عقل': 'aql',
  'خیال': 'khayal',
  'بات': 'baat',
  'باتیں': 'baatein',
  'باتوں': 'baaton',
  'نام': 'naam',
  'کام': 'kaam',
  'کاموں': 'kaamon',
  'عمل': 'amal',
  'اعمال': 'aamaal',
  'چیز': 'cheez',
  'چیزیں': 'cheezen',
  'چیزوں': 'cheezon',
  'نشانی': 'nishaani',
  'نشانیاں': 'nishaaniyan',
  'خبر': 'khabar',
  'نصیحت': 'naseehat',
  'فیصلہ': 'faisla',
  'پیروی': 'pairvi',
  'انکار': 'inkaar',
  'اختیار': 'ikhtiyaar',
  'طاقت': 'taqat',
  'قوت': 'quwwat',
  'تکلیف': 'takleef',
  'مصیبت': 'museebat',
  'سخت': 'sakht',
  'سختی': 'sakhti',
  'آسان': 'aasaan',
  'خوش': 'khush',
  'خوشی': 'khushi',
  'غم': 'gham',
  'غصے': 'ghusse',
  'غضب': 'ghazab',
  'حسد': 'hasad',
  'حاسد': 'haasid',
  'بغض': 'bughz',
  'یتیم': 'yateem',
  'مسکین': 'miskeen',
  'فقیر': 'faqeer',
  'غنی': 'ghani',
  'پورا': 'poora',
  'پوری': 'poori',
  'پورے': 'poore',
  'صریح': 'sareeh',
  'ظاہر': 'zaahir',
  'پوشیدہ': 'posheeda',
  'معلوم': 'maloom',
  'واقف': 'waaqif',
  'ابدی': 'abadi',
  'ہمیشہ': 'hamesha',
  'کبھی': 'kabhi',
  'آج': 'aaj',
  'کل': 'kal',
  'روز': 'roz',
  'راتوں': 'raaton',
  'سزاوار': 'sazawar',
  'والا': 'wala',
  'والی': 'wali',
  'والے': 'wale',
  'والوں': 'walon',
  'اے': 'aye',
  'واہ': 'waah',
  'خوب': 'khoob',
  'اندھا': 'andha',
  'بہرا': 'behra',
  'گونگا': 'goonga',
  'سردار': 'sardaar',
  'امیر': 'ameer',
  'غلام': 'ghulaam',
  'آزاد': 'aazaad',
  'چراغوں': 'chiraghon',
  'آراستہ': 'aarasta',
  'بادشاہی': 'baadshahi',
  'آفرینش': 'aafrinish',
  'نقص': 'nuqs',
  'نگاہ': 'nigaah',
  'رخنہ': 'rakhna',
  'ناکام': 'nakaam',
  'تھک': 'thak',
  'ذریعہ': 'zariya',
  'خشک': 'khushk',
  'شیریں': 'sheereen',
  'چشمہ': 'chashma',
  'چلتا': 'chalta',
  'بل': 'bal',
  'گر': 'gir',
  'پڑتا': 'padta',
  'بھروسا': 'bharosa',
  'خواہش': 'khwahish',
  'خواستگار': 'khwastgaar',
  'آزمانے': 'aazmane',
  'آزمائے': 'aazmaye',
  'عالی': 'aali',
  'شان': 'shaan',
  'تشریح': 'tashreeh',
  'تفسیر': 'tafsir',
  'مطلب': 'matlab',
  'مقصد': 'maqsad',
  'مثال': 'misaal',
  'صحابی': 'Sahabi',
  'صحابہ': 'Sahaba',
  'حدیث': 'Hadith',
  'سنت': 'Sunnat',
  'امام': 'Imam',
  'علماء': 'Ulama',
  'بزرگ': 'buzurg',
  'حکمراں': 'hukmran',
  'لازم': 'laazim',
  'واجب': 'waajib',
  'فرض': 'farz',
  'حلال': 'halaal',
  'حرام': 'haraam',
  'جائز': 'jaiz',
  'ناجائز': 'na-jaiz',
  'مکمل': 'mukammal',
  'واضح': 'waazeh',
  'رہنمائی': 'rehnumai',
  'اطاعت': 'itaat',
  'احترام': 'ehteraam',
  'عزت': 'izzat',
  'ذلت': 'zillat',
  'کامیابی': 'kaamyabi',
  'کامیاب': 'kaamyab',
  'ناکامی': 'nakaami',
  'محنت': 'mehnat',
  'کوشش': 'koshish',
  'گواہی': 'gawahi',
  'بلا': 'bila',
  'تفریق': 'tafreeq',
  'کامل': 'kaamil',
  'برداشت': 'bardasht',
  'بوجھ': 'bojh',
  'غیب': 'ghaib',
  'حیات': 'hayaat',
  'قدرت': 'qudrat',
  'اعلان': 'elaan',
  'چنانچہ': 'chunancha',
  'لہذا': 'lehaza',
  'البتہ': 'albatta',
  'مختصر': 'mukhtasar',
  'تفصیل': 'tafseel',
  'خلاصہ': 'khulasa',
  'سوال': 'sawaal',
  'جواب': 'jawaab',
};

const ASPIRATED_DIGRAPHS: Record<string, string> = {
  'بھ': 'bh',
  'پھ': 'ph',
  'تھ': 'th',
  'ٹھ': 'th',
  'جھ': 'jh',
  'چھ': 'chh',
  'دھ': 'dh',
  'ڈھ': 'dh',
  'ڑھ': 'rh',
  'کھ': 'kh',
  'گھ': 'gh',
};

const CHAR_ROMAN: Record<string, string> = {
  'آ': 'aa',
  'ا': 'a',
  'أ': 'a',
  'إ': 'i',
  'ب': 'b',
  'پ': 'p',
  'ت': 't',
  'ٹ': 't',
  'ث': 's',
  'ج': 'j',
  'چ': 'ch',
  'ح': 'h',
  'خ': 'kh',
  'د': 'd',
  'ڈ': 'd',
  'ذ': 'z',
  'ر': 'r',
  'ڑ': 'r',
  'ز': 'z',
  'ژ': 'zh',
  'س': 's',
  'ش': 'sh',
  'ص': 's',
  'ض': 'z',
  'ط': 't',
  'ظ': 'z',
  'ع': 'a',
  'غ': 'gh',
  'ف': 'f',
  'ق': 'q',
  'ک': 'k',
  'ك': 'k',
  'گ': 'g',
  'ل': 'l',
  'م': 'm',
  'ن': 'n',
  'ں': 'n',
  'و': 'o',
  'ہ': 'h',
  'ھ': 'h',
  'ۃ': 't',
  'ة': 't',
  'ی': 'i',
  'ي': 'i',
  'ى': 'a',
  'ے': 'e',
  'ئ': 'i',
  'ؤ': 'u',
  'ء': '',
  '۔': '.',
  '،': ',',
  '؟': '?',
  '؛': ';',
  '۰': '0',
  '۱': '1',
  '۲': '2',
  '۳': '3',
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9',
  '٠': '0',
  '١': '1',
  '٢': '2',
  '٣': '3',
  '٤': '4',
  '٥': '5',
  '٦': '6',
  '٧': '7',
  '٨': '8',
  '٩': '9',
};

const VOWEL_CHARS = new Set(['a', 'e', 'i', 'o', 'u']);

/**
 * Inserts light short vowels ('a') if phonetic mapping produces 3+ consonant characters
 * in a row without vowels, preventing unreadable vowelless consonant clusters.
 */
function smoothConsonantClusters(raw: string): string {
  if (!raw || raw.length < 3) return raw;
  // Treat digraphs as single phonetic units while scanning
  const out: string[] = [];
  let consonantsInRow = 0;

  let i = 0;
  while (i < raw.length) {
    const two = raw.slice(i, i + 2).toLowerCase();
    const isDigraph =
      two === 'bh' ||
      two === 'ph' ||
      two === 'th' ||
      two === 'jh' ||
      two === 'ch' ||
      two === 'dh' ||
      two === 'kh' ||
      two === 'gh' ||
      two === 'sh' ||
      two === 'zh' ||
      two === 'rh';

    const unit = two === 'ch' && raw[i + 2]?.toLowerCase() === 'h'
      ? raw.slice(i, i + 3)
      : isDigraph
      ? raw.slice(i, i + 2)
      : raw[i];

    const firstChar = unit[0].toLowerCase();
    const isVowel = VOWEL_CHARS.has(firstChar);

    if (isVowel) {
      consonantsInRow = 0;
      out.push(unit);
    } else if (/[a-z]/i.test(firstChar)) {
      if (consonantsInRow >= 2) {
        out.push('a');
        consonantsInRow = 1;
      } else {
        consonantsInRow += 1;
      }
      out.push(unit);
    } else {
      consonantsInRow = 0;
      out.push(unit);
    }

    i += unit.length;
  }

  return out.join('');
}

function transliterateWordFallback(word: string): string {
  let out = '';
  for (let i = 0; i < word.length; i++) {
    // Check aspirated 2-char digraphs first
    if (i + 1 < word.length) {
      const pair = word.slice(i, i + 2);
      if (ASPIRATED_DIGRAPHS[pair]) {
        out += ASPIRATED_DIGRAPHS[pair];
        i += 1;
        continue;
      }
    }

    const ch = word[i];
    const isFirst = i === 0;
    const isLast = i === word.length - 1;

    if (ch === 'و') {
      out += isFirst ? 'w' : isLast ? 'o' : 'o';
    } else if (ch === 'ی' || ch === 'ي') {
      out += isFirst ? 'y' : isLast ? 'i' : 'ee';
    } else if (ch === 'ہ' || ch === 'ھ') {
      out += isLast ? 'a' : 'h';
    } else if (ch === 'ع') {
      out += isLast ? '' : 'a';
    } else if (ch === 'ا') {
      out += isFirst || isLast ? 'a' : 'aa';
    } else {
      out += CHAR_ROMAN[ch] ?? ch;
    }
  }

  return smoothConsonantClusters(out);
}

function transliterateToken(token: string): string {
  if (!token || !URDU_SCRIPT_REGEX.test(token)) {
    return token;
  }

  // Strip Quranic diacritics and normalize Arabic letters to standard Urdu forms
  const normalized = token
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
    .replace(/ك/g, 'ک')
    .replace(/ي/g, 'ی')
    .replace(/ہ/g, 'ہ')
    .replace(/ۃ/g, 'ہ');

  // Split leading/trailing punctuation while keeping core Urdu word intact
  const match = normalized.match(/^([("'«\[،۔؟,.!?;:]*)(.+?)([)"'»\]،۔؟,.!?;:]*)$/);
  if (!match) return normalized;

  const [, leadPunct, core, trailPunct] = match;
  const mapPunct = (p: string) =>
    p
      .replace(/،/g, ',')
      .replace(/۔/g, '.')
      .replace(/؟/g, '?')
      .replace(/؛/g, ';')
      .replace(/«/g, '"')
      .replace(/»/g, '"');

  const lead = mapPunct(leadPunct);
  const trail = mapPunct(trailPunct);

  if (URDU_ROMAN_LEXICON[core]) {
    return `${lead}${URDU_ROMAN_LEXICON[core]}${trail}`;
  }

  // Handle attached 'و' conjunction (e.g. وکرم -> o karam) when remainder is a known word
  if (core.startsWith('و') && core.length > 3 && URDU_ROMAN_LEXICON[core.slice(1)]) {
    return `${lead}o ${URDU_ROMAN_LEXICON[core.slice(1)]}${trail}`;
  }

  // Handle izafat suffix (e.g. سورۂ -> Surah-e)
  if (core.endsWith('ۂ') && core.length > 2) {
    const base = `${core.slice(0, -1)}ہ`;
    const baseRoman = URDU_ROMAN_LEXICON[base] || transliterateWordFallback(base);
    return `${lead}${baseRoman}-e${trail}`;
  }

  // Handle common attached prefix/suffix splits (e.g. بے + شک)
  if (core.startsWith('بے') && core.length > 3) {
    const rest = core.slice(2);
    const restRoman = URDU_ROMAN_LEXICON[rest] || transliterateWordFallback(rest);
    return `${lead}be-${restRoman}${trail}`;
  }

  return `${lead}${transliterateWordFallback(core)}${trail}`;
}

const TRANSLIT_CACHE = new Map<string, string>();
const MAX_CACHE_ENTRIES = 2500;

/**
 * Converts any Urdu string into clean, readable Roman Urdu in English script.
 * Safe & idempotent on strings that are already in English/ASCII.
 */
export function transliterateUrduToRoman(input?: string | null): string {
  if (!input) return '';
  const trimmed = String(input).trim();
  if (!trimmed) return '';
  if (!URDU_SCRIPT_REGEX.test(trimmed)) return trimmed;

  const cached = TRANSLIT_CACHE.get(trimmed);
  if (cached !== undefined) return cached;

  const convertedTokens = trimmed
    .replace(/۔/g, '. ')
    .replace(/،/g, ', ')
    .replace(/؟/g, '? ')
    .replace(/ﷺ/g, ' (PBUH) ')
    .split(/\s+/)
    .filter(Boolean)
    .map(transliterateToken);

  let result = convertedTokens
    .join(' ')
    .replace(/\s+([.,?;:!])/g, '$1')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .replace(/\s{2,}/g, ' ')
    .trim();

  // Capitalize first letter and sentence starts cleanly
  result = result.replace(/(^|[.!?]\s+)([a-z])/g, (_, prefix, ch) => `${prefix}${ch.toUpperCase()}`);

  if (TRANSLIT_CACHE.size >= MAX_CACHE_ENTRIES) {
    const oldestKey = TRANSLIT_CACHE.keys().next().value;
    if (oldestKey !== undefined) TRANSLIT_CACHE.delete(oldestKey);
  }
  TRANSLIT_CACHE.set(trimmed, result);

  return result;
}
