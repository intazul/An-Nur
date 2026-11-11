import { HadithChapterTopic } from '../types/hadith';

export const HADITH_TOPIC_CATEGORIES = [
  'All Topics',
  'Faith & Creed',
  'Purity & Prayer',
  'Charity & Fasting',
  'Hajj & Pilgrimage',
  'Family & Marriage',
  'Ethics & Character',
  'Business & Wealth',
  'Remembrance & Dua',
  'Heart & Hereafter',
  'Trials & Sunnah',
] as const;

export const HADITH_CHAPTER_TOPICS: HadithChapterTopic[] = [
  {
    "id": "intentions-sincerity",
    "number": 1,
    "nameEnglish": "Intentions & Sincerity",
    "nameArabic": "كتاب النية والإخلاص",
    "category": "Faith & Creed",
    "description": "Why the hidden motive determines divine acceptance.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding intentions & sincerity?",
    "defaultHadithCount": 51
  },
  {
    "id": "pillars-of-faith-iman",
    "number": 2,
    "nameEnglish": "Pillars of Faith (Iman)",
    "nameArabic": "كتاب أركان الإيمان",
    "category": "Faith & Creed",
    "description": "The 6 foundational pillars of conviction in Islam.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding pillars of faith (iman)?",
    "defaultHadithCount": 51
  },
  {
    "id": "sweetness-of-faith",
    "number": 3,
    "nameEnglish": "Sweetness of Faith",
    "nameArabic": "حلاوة الإيمان وذوقه",
    "category": "Faith & Creed",
    "description": "Experiencing spiritual joy beyond worldly attachments.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding sweetness of faith?",
    "defaultHadithCount": 51
  },
  {
    "id": "pure-monotheism-tawhid",
    "number": 4,
    "nameEnglish": "Pure Monotheism (Tawhid)",
    "nameArabic": "كتاب التوحيد ونفي الشرك",
    "category": "Faith & Creed",
    "description": "Direct singular devotion to Allah without intermediaries.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding pure monotheism (tawhid)?",
    "defaultHadithCount": 51
  },
  {
    "id": "divine-destiny-will-al-qadar",
    "number": 5,
    "nameEnglish": "Divine Destiny & Will (Al-Qadar)",
    "nameArabic": "كتاب القدر والحكمة الإلهية",
    "category": "Faith & Creed",
    "description": "Trusting divine decree while exerting sincere human effort.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding divine destiny & will (al-qadar)?",
    "defaultHadithCount": 51
  },
  {
    "id": "love-for-the-prophet",
    "number": 6,
    "nameEnglish": "Love for the Prophet ﷺ",
    "nameArabic": "محبة النبي صلى الله عليه وسلم",
    "category": "Faith & Creed",
    "description": "Cherishing the Messenger of Allah above all creation.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding love for the prophet ﷺ?",
    "defaultHadithCount": 51
  },
  {
    "id": "signs-of-hypocrisy-an-nifaq",
    "number": 7,
    "nameEnglish": "Signs of Hypocrisy (An-Nifaq)",
    "nameArabic": "صفات المنافقين والتحذير منها",
    "category": "Faith & Creed",
    "description": "Guarding the soul from deceit and double standards.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding signs of hypocrisy (an-nifaq)?",
    "defaultHadithCount": 51
  },
  {
    "id": "clinging-to-the-sunnah",
    "number": 8,
    "nameEnglish": "Clinging to the Sunnah",
    "nameArabic": "الاعتصام بالكتاب والسنة",
    "category": "Faith & Creed",
    "description": "Steadfast adherence to authentic prophetic traditions.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding clinging to the sunnah?",
    "defaultHadithCount": 51
  },
  {
    "id": "angels-the-unseen-realm",
    "number": 9,
    "nameEnglish": "Angels & The Unseen Realm",
    "nameArabic": "الإيمان بالملائكة وعالم الغيب",
    "category": "Faith & Creed",
    "description": "The unseen host of angels recording deeds and bringing mercy.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding angels & the unseen realm?",
    "defaultHadithCount": 51
  },
  {
    "id": "signs-of-the-final-hour",
    "number": 10,
    "nameEnglish": "Signs of the Final Hour",
    "nameArabic": "أشراط الساعة الكبرى والصغرى",
    "category": "Faith & Creed",
    "description": "Prophetic insights into the moral decay and major events before Qiyamah.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding signs of the final hour?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-intercession-ash-shafa-ah",
    "number": 11,
    "nameEnglish": "The Intercession (Ash-Shafa’ah)",
    "nameArabic": "الشفاعة العظمى يوم القيامة",
    "category": "Faith & Creed",
    "description": "The Prophet’s privilege to intercede for his believers.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the intercession (ash-shafa’ah)?",
    "defaultHadithCount": 51
  },
  {
    "id": "renewing-the-heart-s-faith",
    "number": 12,
    "nameEnglish": "Renewing the Heart’s Faith",
    "nameArabic": "تجديد الإيمان في القلوب",
    "category": "Faith & Creed",
    "description": "Restoring vitality when faith feels diminished or tested.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding renewing the heart’s faith?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-divine-names-attributes",
    "number": 13,
    "nameEnglish": "The Divine Names & Attributes",
    "nameArabic": "أسماء الله الحسنى وصفاته العلى",
    "category": "Faith & Creed",
    "description": "Drawing close to Allah through His 99 sublime names.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the divine names & attributes?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-covenant-of-alast",
    "number": 14,
    "nameEnglish": "The Covenant of Alast",
    "nameArabic": "ميثاق الذرية والتوحيد الفطري",
    "category": "Faith & Creed",
    "description": "The primordial soul’s innate recognition of its Creator.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the covenant of alast?",
    "defaultHadithCount": 51
  },
  {
    "id": "trials-of-intellectual-doubt",
    "number": 15,
    "nameEnglish": "Trials of Intellectual Doubt",
    "nameArabic": "دفع الشبهات وتثبيت اليقين",
    "category": "Faith & Creed",
    "description": "Resolving spiritual doubts through sound knowledge and prayer.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding trials of intellectual doubt?",
    "defaultHadithCount": 51
  },
  {
    "id": "reliance-upon-allah-tawakkul",
    "number": 16,
    "nameEnglish": "Reliance upon Allah (Tawakkul)",
    "nameArabic": "التوكل على الله وحسن الظن به",
    "category": "Faith & Creed",
    "description": "Surrendering outcomes to the Ultimate Caretaker.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding reliance upon allah (tawakkul)?",
    "defaultHadithCount": 51
  },
  {
    "id": "fear-and-hope-khawf-raja",
    "number": 17,
    "nameEnglish": "Fear and Hope (Khawf & Raja)",
    "nameArabic": "الجمع بين الخوف والرجاء",
    "category": "Faith & Creed",
    "description": "The twin wings of faith that preserve the spiritual traveler.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding fear and hope (khawf & raja)?",
    "defaultHadithCount": 51
  },
  {
    "id": "honoring-the-companions-sahabah",
    "number": 18,
    "nameEnglish": "Honoring the Companions (Sahabah)",
    "nameArabic": "فضل الصحابة الكرام ورعايتهم",
    "category": "Faith & Creed",
    "description": "Respecting the pioneers who transmitted divine truth.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding honoring the companions (sahabah)?",
    "defaultHadithCount": 51
  },
  {
    "id": "spiritual-insight-firasah",
    "number": 19,
    "nameEnglish": "Spiritual Insight (Firasah)",
    "nameArabic": "فراسة المؤمن ونور البصيرة",
    "category": "Faith & Creed",
    "description": "The inner discernment granted to pure-hearted believers.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding spiritual insight (firasah)?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-beatific-vision-of-allah",
    "number": 20,
    "nameEnglish": "The Beatific Vision of Allah",
    "nameArabic": "رؤية المؤمنين لربهم في الجنة",
    "category": "Faith & Creed",
    "description": "The ultimate supreme delight of beholding Allah’s countenance.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the beatific vision of allah?",
    "defaultHadithCount": 51
  },
  {
    "id": "excellence-of-wudu-ablution",
    "number": 21,
    "nameEnglish": "Excellence of Wudu (Ablution)",
    "nameArabic": "فضل الوضوء وإسباغه",
    "category": "Purity & Prayer",
    "description": "How water washes away sins from eyes, hands, and feet.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding excellence of wudu (ablution)?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-5-daily-obligatory-prayers",
    "number": 22,
    "nameEnglish": "The 5 Daily Obligatory Prayers",
    "nameArabic": "الصلوات الخمس ومواقيتها",
    "category": "Purity & Prayer",
    "description": "The cornerstone connecting the servant to his Lord 5 times a day.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the 5 daily obligatory prayers?",
    "defaultHadithCount": 51
  },
  {
    "id": "khushu-presence-humility-in-salah",
    "number": 23,
    "nameEnglish": "Khushu (Presence & Humility in Salah)",
    "nameArabic": "الخشوع في الصلاة واستحضار القلب",
    "category": "Purity & Prayer",
    "description": "Overcoming mind wandering during recitation and bowing.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding khushu (presence & humility in salah)?",
    "defaultHadithCount": 51
  },
  {
    "id": "fajr-asr-the-two-cool-prayers",
    "number": 24,
    "nameEnglish": "Fajr & Asr: The Two Cool Prayers",
    "nameArabic": "فضل صلاتي البردين الفجر والعصر",
    "category": "Purity & Prayer",
    "description": "Guaranteed protection and seeing the angels change shifts.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding fajr & asr: the two cool prayers?",
    "defaultHadithCount": 51
  },
  {
    "id": "tahajjud-night-vigil-qiyam",
    "number": 25,
    "nameEnglish": "Tahajjud & Night Vigil (Qiyam)",
    "nameArabic": "قيام الليل وشرف المؤمن",
    "category": "Purity & Prayer",
    "description": "Intimate prayer in the last third of the night when prayers are answered.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding tahajjud & night vigil (qiyam)?",
    "defaultHadithCount": 51
  },
  {
    "id": "congregational-prayer-in-the-masjid",
    "number": 26,
    "nameEnglish": "Congregational Prayer in the Masjid",
    "nameArabic": "صلاة الجماعة وفضل المسجد",
    "category": "Purity & Prayer",
    "description": "27 times greater reward and solidarity of the community.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding congregational prayer in the masjid?",
    "defaultHadithCount": 51
  },
  {
    "id": "jumu-ah-friday-virtues-ethics",
    "number": 27,
    "nameEnglish": "Jumu’ah (Friday) Virtues & Ethics",
    "nameArabic": "يوم الجمعة وآدابها وساعة الإجابة",
    "category": "Purity & Prayer",
    "description": "The best day upon which the sun rises; the golden hour of accepted dua.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding jumu’ah (friday) virtues & ethics?",
    "defaultHadithCount": 51
  },
  {
    "id": "salat-ad-duha-forenoon-prayer",
    "number": 28,
    "nameEnglish": "Salat ad-Duha (Forenoon Prayer)",
    "nameArabic": "صلاة الضحى وصلاة الأوابين",
    "category": "Purity & Prayer",
    "description": "Daily charity for all 360 joints of the human skeleton.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding salat ad-duha (forenoon prayer)?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-virtues-of-sujood-prostration",
    "number": 29,
    "nameEnglish": "The Virtues of Sujood (Prostration)",
    "nameArabic": "فضل السجود وأقرب ما يكون العبد",
    "category": "Purity & Prayer",
    "description": "The closest a human ever gets to the Creator is in prostration.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the virtues of sujood (prostration)?",
    "defaultHadithCount": 51
  },
  {
    "id": "adhan-responding-to-the-call",
    "number": 30,
    "nameEnglish": "Adhan & Responding to the Call",
    "nameArabic": "فضل الأذان وإجابة المؤذن",
    "category": "Purity & Prayer",
    "description": "The prophetic supplication that guarantees intercession at the call.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding adhan & responding to the call?",
    "defaultHadithCount": 51
  },
  {
    "id": "sunnah-rawatib-prayers",
    "number": 31,
    "nameEnglish": "Sunnah Rawatib Prayers",
    "nameArabic": "السنن الرواتب وبناء بيت في الجنة",
    "category": "Purity & Prayer",
    "description": "The 12 daily voluntary rak’ahs that build a palace in Jannah.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding sunnah rawatib prayers?",
    "defaultHadithCount": 51
  },
  {
    "id": "witr-closing-the-day-with-worship",
    "number": 32,
    "nameEnglish": "Witr & Closing the Day with Worship",
    "nameArabic": "صلاة الوتر وختام قيام الليل",
    "category": "Purity & Prayer",
    "description": "Ending the night on an odd number of devotion.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding witr & closing the day with worship?",
    "defaultHadithCount": 51
  },
  {
    "id": "prayer-during-travel-shortening",
    "number": 33,
    "nameEnglish": "Prayer during Travel & Shortening",
    "nameArabic": "صلاة المسافر وقصرها وجمعها",
    "category": "Purity & Prayer",
    "description": "The divine mercy and ease granted when journeying.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding prayer during travel & shortening?",
    "defaultHadithCount": 51
  },
  {
    "id": "prayer-of-guidance-salat-al-istikharah",
    "number": 34,
    "nameEnglish": "Prayer of Guidance (Salat al-Istikharah)",
    "nameArabic": "صلاة الاستخارة ودعاؤها",
    "category": "Purity & Prayer",
    "description": "Consulting Allah before making decisions of consequence.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding prayer of guidance (salat al-istikharah)?",
    "defaultHadithCount": 51
  },
  {
    "id": "prayer-in-times-of-solar-eclipse-kusuf",
    "number": 35,
    "nameEnglish": "Prayer in Times of Solar Eclipse (Kusuf)",
    "nameArabic": "صلاة الكسوف والخسوف والتضرع",
    "category": "Purity & Prayer",
    "description": "Recognizing cosmic signs as calls to prayer and repentance.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding prayer in times of solar eclipse (kusuf)?",
    "defaultHadithCount": 51
  },
  {
    "id": "purification-after-intimacy-major-rituals",
    "number": 36,
    "nameEnglish": "Purification after Intimacy & Major Rituals",
    "nameArabic": "الغسل والطهارة الكبرى",
    "category": "Purity & Prayer",
    "description": "Sacred cleanliness after marital intimacy and monthly cycles.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding purification after intimacy & major rituals?",
    "defaultHadithCount": 51
  },
  {
    "id": "tayammum-earth-as-a-clean-sanctuary",
    "number": 37,
    "nameEnglish": "Tayammum: Earth as a Clean Sanctuary",
    "nameArabic": "التيمم وجعل الأرض مسجدا وطهورا",
    "category": "Purity & Prayer",
    "description": "Using clean earth when water is scarce or harmful.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding tayammum: earth as a clean sanctuary?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-prostrations-of-forgetfulness-sahu",
    "number": 38,
    "nameEnglish": "The Prostrations of Forgetfulness (Sahu)",
    "nameArabic": "سجود السهو وجبر النقص في الصلاة",
    "category": "Purity & Prayer",
    "description": "Correcting minor errors in prayer with two prostrations.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the prostrations of forgetfulness (sahu)?",
    "defaultHadithCount": 51
  },
  {
    "id": "virtues-of-walking-to-the-masjid",
    "number": 39,
    "nameEnglish": "Virtues of Walking to the Masjid",
    "nameArabic": "خطوات المشي إلى المساجد ورفع الدرجات",
    "category": "Purity & Prayer",
    "description": "Every step erases a misdeed and raises a heavenly rank.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding virtues of walking to the masjid?",
    "defaultHadithCount": 51
  },
  {
    "id": "supplications-upon-entering-leaving-masjid",
    "number": 40,
    "nameEnglish": "Supplications upon Entering & Leaving Masjid",
    "nameArabic": "دعاء دخول المسجد والخروج منه",
    "category": "Purity & Prayer",
    "description": "Seeking doors of divine mercy and divine bounty.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding supplications upon entering & leaving masjid?",
    "defaultHadithCount": 51
  },
  {
    "id": "etiquette-of-the-rows-in-prayer",
    "number": 41,
    "nameEnglish": "Etiquette of the Rows in Prayer",
    "nameArabic": "تسوية الصفوف والتراص في الصلاة",
    "category": "Purity & Prayer",
    "description": "Straightening rows so hearts remain unified and free of conflict.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding etiquette of the rows in prayer?",
    "defaultHadithCount": 51
  },
  {
    "id": "salat-al-janazah-the-funeral-prayer",
    "number": 42,
    "nameEnglish": "Salat al-Janazah (The Funeral Prayer)",
    "nameArabic": "صلاة الجنازة وتشييع المؤمن",
    "category": "Purity & Prayer",
    "description": "The massive mountain of reward (Qirat) for honoring the deceased.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding salat al-janazah (the funeral prayer)?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-prostration-of-gratitude-sajdah-ash-shukr",
    "number": 43,
    "nameEnglish": "The Prostration of Gratitude (Sajdah ash-Shukr)",
    "nameArabic": "سجدة الشكر عند تجدد النعم",
    "category": "Purity & Prayer",
    "description": "Falling into prostration when glad tidings or relief arrive.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the prostration of gratitude (sajdah ash-shukr)?",
    "defaultHadithCount": 51
  },
  {
    "id": "dua-al-qunoot-in-difficulties",
    "number": 44,
    "nameEnglish": "Dua al-Qunoot in Difficulties",
    "nameArabic": "قنوت النوازل ودعاء الكرب في الصلاة",
    "category": "Purity & Prayer",
    "description": "Invoking divine aid for suffering communities across the earth.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding dua al-qunoot in difficulties?",
    "defaultHadithCount": 51
  },
  {
    "id": "guarding-the-tongue-inside-the-sanctuary",
    "number": 45,
    "nameEnglish": "Guarding the Tongue inside the Sanctuary",
    "nameArabic": "صيانة المسجد عن اللغو والبيع",
    "category": "Purity & Prayer",
    "description": "Preserving the sacred house of Allah for remembrance and peace.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding guarding the tongue inside the sanctuary?",
    "defaultHadithCount": 51
  },
  {
    "id": "obligatory-zakah-its-distribution",
    "number": 46,
    "nameEnglish": "Obligatory Zakah & Its Distribution",
    "nameArabic": "كتاب الزكاة وحق الفقراء",
    "category": "Charity & Fasting",
    "description": "Purifying wealth by transferring rights to the needy.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding obligatory zakah & its distribution?",
    "defaultHadithCount": 51
  },
  {
    "id": "secret-charity-sadaqah-khafiyyah",
    "number": 47,
    "nameEnglish": "Secret Charity (Sadaqah Khafiyyah)",
    "nameArabic": "صدقة السر وإطفاء غضب الرب",
    "category": "Charity & Fasting",
    "description": "Giving so the left hand knows not what the right hand spent.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding secret charity (sadaqah khafiyyah)?",
    "defaultHadithCount": 51
  },
  {
    "id": "virtues-of-ramadan-gates-of-jannah",
    "number": 48,
    "nameEnglish": "Virtues of Ramadan & Gates of Jannah",
    "nameArabic": "فضل شهر رمضان وفتح أبواب الجنان",
    "category": "Charity & Fasting",
    "description": "The month where devils are chained and gates of mercy open wide.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding virtues of ramadan & gates of jannah?",
    "defaultHadithCount": 51
  },
  {
    "id": "laylat-al-qadr-night-of-decree",
    "number": 49,
    "nameEnglish": "Laylat al-Qadr (Night of Decree)",
    "nameArabic": "ليلة القدر وخير من ألف شهر",
    "category": "Charity & Fasting",
    "description": "A single night of worship superior to 83 years of continuous devotion.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding laylat al-qadr (night of decree)?",
    "defaultHadithCount": 51
  },
  {
    "id": "voluntary-fasting-mondays-thursdays",
    "number": 50,
    "nameEnglish": "Voluntary Fasting: Mondays & Thursdays",
    "nameArabic": "صيام الإثنين والخميس وعرض الأعمال",
    "category": "Charity & Fasting",
    "description": "Fasting on the days when human deeds are presented to Allah.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding voluntary fasting: mondays & thursdays?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-white-days-ayyam-al-beed",
    "number": 51,
    "nameEnglish": "The White Days (Ayyam al-Beed)",
    "nameArabic": "صيام الأيام البيض 13 و 14 و 15",
    "category": "Charity & Fasting",
    "description": "Monthly fast equivalent to fasting an entire lifetime.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the white days (ayyam al-beed)?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-fast-of-ashura-10th-of-muharram",
    "number": 52,
    "nameEnglish": "The Fast of Ashura (10th of Muharram)",
    "nameArabic": "صيام يوم عاشوراء وتكفير سنة",
    "category": "Charity & Fasting",
    "description": "Commemorating the deliverance of Musa (AS) and expiating a past year.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the fast of ashura (10th of muharram)?",
    "defaultHadithCount": 51
  },
  {
    "id": "fasting-6-days-of-shawwal",
    "number": 53,
    "nameEnglish": "Fasting 6 Days of Shawwal",
    "nameArabic": "صيام ست من شوال وصيام الدهر",
    "category": "Charity & Fasting",
    "description": "Pairing Ramadan with 6 days yields the reward of a whole year.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding fasting 6 days of shawwal?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-spiritual-reality-of-fasting",
    "number": 54,
    "nameEnglish": "The Spiritual Reality of Fasting",
    "nameArabic": "الصوم جنة وإمساك الجوارح",
    "category": "Charity & Fasting",
    "description": "Fasting is not just food abstention, but refraining from evil speech.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the spiritual reality of fasting?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-suhoor-blessing-pre-dawn-meal",
    "number": 55,
    "nameEnglish": "The Suhoor Blessing (Pre-Dawn Meal)",
    "nameArabic": "بركة السحور وتأخيره",
    "category": "Charity & Fasting",
    "description": "Taking the blessed meal before dawn to gain strength for devotion.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the suhoor blessing (pre-dawn meal)?",
    "defaultHadithCount": 51
  },
  {
    "id": "hastening-the-iftar-duas-of-the-fasting",
    "number": 56,
    "nameEnglish": "Hastening the Iftar & Duas of the Fasting",
    "nameArabic": "تعجيل الفطر ودعوة الصائم المستجابة",
    "category": "Charity & Fasting",
    "description": "The moment of breaking the fast where supplications are never rejected.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding hastening the iftar & duas of the fasting?",
    "defaultHadithCount": 51
  },
  {
    "id": "itikaf-seclusion-in-the-mosque",
    "number": 57,
    "nameEnglish": "Itikaf: Seclusion in the Mosque",
    "nameArabic": "الاعتكاف ولزوم المسجد في العشر الأواخر",
    "category": "Charity & Fasting",
    "description": "Detaching completely from the world during the final 10 nights.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding itikaf: seclusion in the mosque?",
    "defaultHadithCount": 51
  },
  {
    "id": "sadaqah-jariyah-ongoing-charity",
    "number": 58,
    "nameEnglish": "Sadaqah Jariyah (Ongoing Charity)",
    "nameArabic": "الصدقة الجارية والآبار والمصاحف",
    "category": "Charity & Fasting",
    "description": "Wells, schools, and trees that generate rewards long after death.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding sadaqah jariyah (ongoing charity)?",
    "defaultHadithCount": 51
  },
  {
    "id": "feeding-the-hungry-generosity",
    "number": 59,
    "nameEnglish": "Feeding the Hungry & Generosity",
    "nameArabic": "إطعام الطعام وتفطير الصائمين",
    "category": "Charity & Fasting",
    "description": "Gaining the full reward of the fasting person without diminishing theirs.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding feeding the hungry & generosity?",
    "defaultHadithCount": 51
  },
  {
    "id": "zakat-al-fitr-before-eid-prayer",
    "number": 60,
    "nameEnglish": "Zakat al-Fitr before Eid Prayer",
    "nameArabic": "زكاة الفطر وطهرة للصائم",
    "category": "Charity & Fasting",
    "description": "Ensuring every poor family has food and festive joy on Eid morning.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding zakat al-fitr before eid prayer?",
    "defaultHadithCount": 51
  },
  {
    "id": "smiling-and-pleasant-words-as-charity",
    "number": 61,
    "nameEnglish": "Smiling and Pleasant Words as Charity",
    "nameArabic": "الكلمة الطيبة والتبسم صدقة",
    "category": "Charity & Fasting",
    "description": "Even a constructive remark or cheerful countenance counts as wealth.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding smiling and pleasant words as charity?",
    "defaultHadithCount": 51
  },
  {
    "id": "removing-harm-from-the-pathway",
    "number": 62,
    "nameEnglish": "Removing Harm from the Pathway",
    "nameArabic": "إماطة الأذى عن الطريق صدقة",
    "category": "Charity & Fasting",
    "description": "Removing dangerous thorns or stones from the road as faith.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding removing harm from the pathway?",
    "defaultHadithCount": 51
  },
  {
    "id": "fasting-the-day-of-arafah",
    "number": 63,
    "nameEnglish": "Fasting the Day of Arafah",
    "nameArabic": "صيام يوم عرفة وتكفير سنتين",
    "category": "Charity & Fasting",
    "description": "Expiation of sins for the preceding year and the coming year.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding fasting the day of arafah?",
    "defaultHadithCount": 51
  },
  {
    "id": "generosity-during-ramadan",
    "number": 64,
    "nameEnglish": "Generosity during Ramadan",
    "nameArabic": "جود النبي ﷺ كالريح المرسلة",
    "category": "Charity & Fasting",
    "description": "Following the Prophet’s example of boundless generosity like a rain-bringing breeze.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding generosity during ramadan?",
    "defaultHadithCount": 51
  },
  {
    "id": "warnings-against-reminding-people-of-charity",
    "number": 65,
    "nameEnglish": "Warnings against Reminding People of Charity",
    "nameArabic": "النهي عن المن والأذى في الصدقة",
    "category": "Charity & Fasting",
    "description": "Preserving the dignity of the recipient without seeking recognition.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding warnings against reminding people of charity?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-rites-of-hajj-mabrur",
    "number": 66,
    "nameEnglish": "The Rites of Hajj (Mabrur)",
    "nameArabic": "الحج المبرور والعودة كيوم ولدته أمه",
    "category": "Hajj & Pilgrimage",
    "description": "An accepted pilgrimage returns a soul as pure as the day they were born.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the rites of hajj (mabrur)?",
    "defaultHadithCount": 51
  },
  {
    "id": "virtues-of-the-first-10-days-of-dhul-hijjah",
    "number": 67,
    "nameEnglish": "Virtues of the First 10 Days of Dhul-Hijjah",
    "nameArabic": "أيام عشر ذي الحجة وأحب العمل فيها",
    "category": "Hajj & Pilgrimage",
    "description": "The greatest days in the entire year for righteous deeds.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding virtues of the first 10 days of dhul-hijjah?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-standing-on-mount-arafat",
    "number": 68,
    "nameEnglish": "The Standing on Mount Arafat",
    "nameArabic": "الحج عرفة ومغفرة الذنوب",
    "category": "Hajj & Pilgrimage",
    "description": "The essence of Hajj where Allah boasts of His pilgrims to the angels.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the standing on mount arafat?",
    "defaultHadithCount": 51
  },
  {
    "id": "tawaf-around-the-ka-bah",
    "number": 69,
    "nameEnglish": "Tawaf around the Ka’bah",
    "nameArabic": "الطواف بالبيت العتيق واستلام الحجر",
    "category": "Hajj & Pilgrimage",
    "description": "Circling the central sanctuary in harmony with cosmic adoration.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding tawaf around the ka’bah?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-sacred-water-of-zamzam",
    "number": 70,
    "nameEnglish": "The Sacred Water of Zamzam",
    "nameArabic": "ماء زمزم طعام طعم وشفاء سقم",
    "category": "Hajj & Pilgrimage",
    "description": "Nourishment, cure, and blessed fulfillment of whatever it is drunk for.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the sacred water of zamzam?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-sa-i-between-safa-and-marwah",
    "number": 71,
    "nameEnglish": "The Sa’i between Safa and Marwah",
    "nameArabic": "السعي بين الصفا والمروة وتذكر هاجر",
    "category": "Hajj & Pilgrimage",
    "description": "Honoring the faithful resilience of Lady Hajar in the desert.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the sa’i between safa and marwah?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-day-of-sacrifice-yawm-an-nahr",
    "number": 72,
    "nameEnglish": "The Day of Sacrifice (Yawm an-Nahr)",
    "nameArabic": "يوم النحر والتقرب بالأضاحي",
    "category": "Hajj & Pilgrimage",
    "description": "Sacrificing livestock with sincere piety reaching Allah, not meat or blood.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the day of sacrifice (yawm an-nahr)?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-stoning-of-the-jamarat",
    "number": 73,
    "nameEnglish": "The Stoning of the Jamarat",
    "nameArabic": "رمي الجمار وإغاظة الشيطان",
    "category": "Hajj & Pilgrimage",
    "description": "Reenacting Ibrahim’s (AS) rejection of temptation and demonic whispers.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the stoning of the jamarat?",
    "defaultHadithCount": 51
  },
  {
    "id": "visiting-the-prophet-s-mosque-in-madinah",
    "number": 74,
    "nameEnglish": "Visiting the Prophet’s Mosque in Madinah",
    "nameArabic": "الصلاة في المسجد النبوي والروضة الشريفة",
    "category": "Hajj & Pilgrimage",
    "description": "One prayer equal to 1,000 prayers; the garden between pulpit and home.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding visiting the prophet’s mosque in madinah?",
    "defaultHadithCount": 51
  },
  {
    "id": "virtues-of-the-holy-mosque-in-makkah",
    "number": 75,
    "nameEnglish": "Virtues of the Holy Mosque in Makkah",
    "nameArabic": "المسجد الحرام والصلاة بمائة ألف صلاة",
    "category": "Hajj & Pilgrimage",
    "description": "A single prayer in the Grand Mosque surpasses 100,000 prayers.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding virtues of the holy mosque in makkah?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-farewell-pilgrimage-hujjat-al-wada",
    "number": 76,
    "nameEnglish": "The Farewell Pilgrimage (Hujjat al-Wada’)",
    "nameArabic": "خطبة حجة الوداع وحقوق الإنسان",
    "category": "Hajj & Pilgrimage",
    "description": "The universal charter of human equality, anti-racism, and peace.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the farewell pilgrimage (hujjat al-wada’)?",
    "defaultHadithCount": 51
  },
  {
    "id": "umrah-in-ramadan",
    "number": 77,
    "nameEnglish": "Umrah in Ramadan",
    "nameArabic": "عمرة في رمضان تعدل حجة معي",
    "category": "Hajj & Pilgrimage",
    "description": "Performing Umrah in Ramadan carries the spiritual rank of Hajj with the Prophet ﷺ.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding umrah in ramadan?",
    "defaultHadithCount": 51
  },
  {
    "id": "patience-amidst-the-crowds-of-pilgrimage",
    "number": 78,
    "nameEnglish": "Patience amidst the Crowds of Pilgrimage",
    "nameArabic": "الصبر والرفق بالمعتمرين والحجاج",
    "category": "Hajj & Pilgrimage",
    "description": "Refraining from quarreling, pushing, and arrogance in the sacred sanctuary.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding patience amidst the crowds of pilgrimage?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-talbiyah-answering-the-call",
    "number": 79,
    "nameEnglish": "The Talbiyah: Answering the Call",
    "nameArabic": "التلبية وشعار التوحيد لبيك اللهم لبيك",
    "category": "Hajj & Pilgrimage",
    "description": "The celestial cry echoing across mountains in surrender to the One.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the talbiyah: answering the call?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-udhiyah-qurbani-guidelines",
    "number": 80,
    "nameEnglish": "The Udhiyah (Qurbani) Guidelines",
    "nameArabic": "أحكام الأضحية وسنة إبراهيم الخليل",
    "category": "Hajj & Pilgrimage",
    "description": "Distributing fresh meat to family, friends, and destitute neighbors.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the udhiyah (qurbani) guidelines?",
    "defaultHadithCount": 51
  },
  {
    "id": "honoring-parents-birr-al-walidayn",
    "number": 81,
    "nameEnglish": "Honoring Parents (Birr al-Walidayn)",
    "nameArabic": "بر الوالدين وأعظم القربات",
    "category": "Family & Marriage",
    "description": "Paradise lies under mother’s feet; father is the middle gate of Jannah.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding honoring parents (birr al-walidayn)?",
    "defaultHadithCount": 51
  },
  {
    "id": "choosing-a-righteous-spouse",
    "number": 82,
    "nameEnglish": "Choosing a Righteous Spouse",
    "nameArabic": "اختيار الزوج الصالح والزوجة الصالحة",
    "category": "Family & Marriage",
    "description": "Marrying for character and religious commitment brings permanent bliss.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding choosing a righteous spouse?",
    "defaultHadithCount": 51
  },
  {
    "id": "kindness-and-romance-with-one-s-wife",
    "number": 83,
    "nameEnglish": "Kindness and Romance with One’s Wife",
    "nameArabic": "خيركم خيركم لأهله وملاطفة الزوجة",
    "category": "Family & Marriage",
    "description": "The best of men is the one who treats his wife with the greatest tenderness.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding kindness and romance with one’s wife?",
    "defaultHadithCount": 51
  },
  {
    "id": "rights-and-mutual-duties-of-spouses",
    "number": 84,
    "nameEnglish": "Rights and Mutual Duties of Spouses",
    "nameArabic": "حقوق الزوجين والمودة والرحمة",
    "category": "Family & Marriage",
    "description": "Building a home founded on gentle partnership, patience, and compassion.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding rights and mutual duties of spouses?",
    "defaultHadithCount": 51
  },
  {
    "id": "raising-righteous-children-with-love",
    "number": 85,
    "nameEnglish": "Raising Righteous Children with Love",
    "nameArabic": "تربية الأبناء بالرحمة والقدوة",
    "category": "Family & Marriage",
    "description": "Teaching manners, honesty, prayer, and playing playfully with youngsters.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding raising righteous children with love?",
    "defaultHadithCount": 51
  },
  {
    "id": "ties-of-kinship-silat-ar-rahim",
    "number": 86,
    "nameEnglish": "Ties of Kinship (Silat ar-Rahim)",
    "nameArabic": "صلة الرحم والبركة في العمر والرزق",
    "category": "Family & Marriage",
    "description": "Maintaining contact with relatives expands livelihood and blesses lifespan.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding ties of kinship (silat ar-rahim)?",
    "defaultHadithCount": 51
  },
  {
    "id": "blessing-of-raising-daughters",
    "number": 87,
    "nameEnglish": "Blessing of Raising Daughters",
    "nameArabic": "فضل تربية البنات والإحسان إليهن",
    "category": "Family & Marriage",
    "description": "Raising and educating daughters serves as a guaranteed shield from Hellfire.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding blessing of raising daughters?",
    "defaultHadithCount": 51
  },
  {
    "id": "reconciliation-between-spouses",
    "number": 88,
    "nameEnglish": "Reconciliation between Spouses",
    "nameArabic": "الإصلاح بين الزوجين ودرء الطلاق",
    "category": "Family & Marriage",
    "description": "Healing domestic rifts with wisdom before anger tears families apart.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding reconciliation between spouses?",
    "defaultHadithCount": 51
  },
  {
    "id": "rights-of-neighbors-huquq-al-jar",
    "number": 89,
    "nameEnglish": "Rights of Neighbors (Huquq al-Jar)",
    "nameArabic": "حق الجار ووصية جبريل بالجار",
    "category": "Family & Marriage",
    "description": "Angel Jibril emphasized the neighbor so much the Prophet thought he would inherit.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding rights of neighbors (huquq al-jar)?",
    "defaultHadithCount": 51
  },
  {
    "id": "greeting-the-family-when-entering-home",
    "number": 90,
    "nameEnglish": "Greeting the Family when Entering Home",
    "nameArabic": "إلقاء السلام عند دخول البيت وبركته",
    "category": "Family & Marriage",
    "description": "Entering with Salam brings divine peace and expels wandering negativity.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding greeting the family when entering home?",
    "defaultHadithCount": 51
  },
  {
    "id": "etiquette-of-the-marital-union",
    "number": 91,
    "nameEnglish": "Etiquette of the Marital Union",
    "nameArabic": "آداب المعاشرة الزوجية والستر",
    "category": "Family & Marriage",
    "description": "Preserving intimacy, dignity, and private gratitude between partners.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding etiquette of the marital union?",
    "defaultHadithCount": 51
  },
  {
    "id": "fairness-among-children",
    "number": 92,
    "nameEnglish": "Fairness among Children",
    "nameArabic": "العدل بين الأبناء في العطايا والمعاملة",
    "category": "Family & Marriage",
    "description": "Treating sons and daughters with impartial fairness without favoritism.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding fairness among children?",
    "defaultHadithCount": 51
  },
  {
    "id": "gentleness-in-domestic-life",
    "number": 93,
    "nameEnglish": "Gentleness in Domestic Life",
    "nameArabic": "الرفق في أهل البيت وخير البيوت",
    "category": "Family & Marriage",
    "description": "When Allah loves a household, He introduces gentle mercy into their midst.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding gentleness in domestic life?",
    "defaultHadithCount": 51
  },
  {
    "id": "protecting-children-at-twilight",
    "number": 94,
    "nameEnglish": "Protecting Children at Twilight",
    "nameArabic": "كف الصبيان عند الغروب وحفظهم",
    "category": "Family & Marriage",
    "description": "Keeping children close at dusk and mentioning Allah’s name.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding protecting children at twilight?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-grandparent-s-wisdom-and-honor",
    "number": 95,
    "nameEnglish": "The Grandparent’s Wisdom and Honor",
    "nameArabic": "إجلال الشيبة والبر بالأجداد",
    "category": "Family & Marriage",
    "description": "Honoring the elderly in the household invites divine blessings and barakah.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the grandparent’s wisdom and honor?",
    "defaultHadithCount": 51
  },
  {
    "id": "support-for-widows-and-single-parents",
    "number": 96,
    "nameEnglish": "Support for Widows and Single Parents",
    "nameArabic": "الساعي على الأرملة والمسكين",
    "category": "Family & Marriage",
    "description": "Supporting single mothers and widows carries the rank of a warrior in worship.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding support for widows and single parents?",
    "defaultHadithCount": 51
  },
  {
    "id": "avoiding-gossip-and-discord-in-the-family",
    "number": 97,
    "nameEnglish": "Avoiding Gossip and Discord in the Family",
    "nameArabic": "النهي عن النميمة والتفريق بين الأقارب",
    "category": "Family & Marriage",
    "description": "The one who severs family ties will not enter Paradise with ease.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding avoiding gossip and discord in the family?",
    "defaultHadithCount": 51
  },
  {
    "id": "naming-children-with-dignified-names",
    "number": 98,
    "nameEnglish": "Naming Children with Dignified Names",
    "nameArabic": "تسمية المولود بالأسماء الحسنة",
    "category": "Family & Marriage",
    "description": "Giving children inspiring names that connect them to noble spiritual role models.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding naming children with dignified names?",
    "defaultHadithCount": 51
  },
  {
    "id": "tahneek-and-welcoming-newborns",
    "number": 99,
    "nameEnglish": "Tahneek and Welcoming Newborns",
    "nameArabic": "تحنيك المولود والدعاء له بالبركة",
    "category": "Family & Marriage",
    "description": "Welcoming new life with sweet dates, prayers, and celebratory gratitude.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding tahneek and welcoming newborns?",
    "defaultHadithCount": 51
  },
  {
    "id": "forgiving-family-shortcomings",
    "number": 100,
    "nameEnglish": "Forgiving Family Shortcomings",
    "nameArabic": "العفو عن هفوات الأهل والصفح الجميل",
    "category": "Family & Marriage",
    "description": "Overlooking unintentional faults with gracious forgiveness.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding forgiving family shortcomings?",
    "defaultHadithCount": 51
  },
  {
    "id": "noble-character-husn-al-khuluq",
    "number": 101,
    "nameEnglish": "Noble Character (Husn al-Khuluq)",
    "nameArabic": "حسن الخلق وأثقل ما يوضع في الميزان",
    "category": "Ethics & Character",
    "description": "The heaviest deed on the divine scale on Qiyamah is good character.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding noble character (husn al-khuluq)?",
    "defaultHadithCount": 51
  },
  {
    "id": "truthfulness-honesty-as-sidq",
    "number": 102,
    "nameEnglish": "Truthfulness & Honesty (As-Sidq)",
    "nameArabic": "الصدق يهدي إلى البر وإلى الجنة",
    "category": "Ethics & Character",
    "description": "Truthfulness leads to righteousness, and righteousness leads to Jannah.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding truthfulness & honesty (as-sidq)?",
    "defaultHadithCount": 51
  },
  {
    "id": "controlling-anger-emotional-mastery",
    "number": 103,
    "nameEnglish": "Controlling Anger & Emotional Mastery",
    "nameArabic": "ليس الشديد بالصرعة وإنما بملك النفس",
    "category": "Ethics & Character",
    "description": "True strength is not overpowering others, but governing yourself in rage.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding controlling anger & emotional mastery?",
    "defaultHadithCount": 51
  },
  {
    "id": "modesty-decency-conscience-haya",
    "number": 104,
    "nameEnglish": "Modesty, Decency & Conscience (Haya)",
    "nameArabic": "الحياء شعبة من شعب الإيمان",
    "category": "Ethics & Character",
    "description": "Modesty preserves innocence and prevents corruption of moral conscience.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding modesty, decency & conscience (haya)?",
    "defaultHadithCount": 51
  },
  {
    "id": "humility-and-eradicating-pride-kibr",
    "number": 105,
    "nameEnglish": "Humility and Eradicating Pride (Kibr)",
    "nameArabic": "من تواضع لله رفعه وتحريم الكبر",
    "category": "Ethics & Character",
    "description": "Whoever humbles himself for Allah, Allah elevates him to the heights.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding humility and eradicating pride (kibr)?",
    "defaultHadithCount": 51
  },
  {
    "id": "guarding-the-tongue-from-backbiting-gheebah",
    "number": 106,
    "nameEnglish": "Guarding the Tongue from Backbiting (Gheebah)",
    "nameArabic": "حفظ اللسان والتحذير من الغيبة",
    "category": "Ethics & Character",
    "description": "Talking behind others eats good deeds just as fire devours dry wood.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding guarding the tongue from backbiting (gheebah)?",
    "defaultHadithCount": 51
  },
  {
    "id": "honoring-promises-trusts-amanah",
    "number": 107,
    "nameEnglish": "Honoring Promises & Trusts (Amanah)",
    "nameArabic": "أداء الأمانة والوفاء بالعهود",
    "category": "Ethics & Character",
    "description": "Fulfilling contracts and returning trusts to friends and adversaries alike.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding honoring promises & trusts (amanah)?",
    "defaultHadithCount": 51
  },
  {
    "id": "generosity-without-extravagance",
    "number": 108,
    "nameEnglish": "Generosity without Extravagance",
    "nameArabic": "الكرم والجود والنهي عن الإسراف",
    "category": "Ethics & Character",
    "description": "Giving freely while avoiding wasteful ostentation and show.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding generosity without extravagance?",
    "defaultHadithCount": 51
  },
  {
    "id": "gentleness-in-dealing-with-people-rifq",
    "number": 109,
    "nameEnglish": "Gentleness in Dealing with People (Rifq)",
    "nameArabic": "الرفق ما كان في شيء إلا زانه",
    "category": "Ethics & Character",
    "description": "Gentleness beautifies everything it touches; harshness ruins everything it enters.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding gentleness in dealing with people (rifq)?",
    "defaultHadithCount": 51
  },
  {
    "id": "forgiving-those-who-wronged-you",
    "number": 110,
    "nameEnglish": "Forgiving Those Who Wronged You",
    "nameArabic": "العفو عند المقدرة وكظم الغيظ",
    "category": "Ethics & Character",
    "description": "The greatest hero is the one who possesses the power to retaliate but forgives.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding forgiving those who wronged you?",
    "defaultHadithCount": 51
  },
  {
    "id": "avoiding-suspicion-and-spying",
    "number": 111,
    "nameEnglish": "Avoiding Suspicion and Spying",
    "nameArabic": "النهي عن سوء الظن والتجسس",
    "category": "Ethics & Character",
    "description": "Giving people the benefit of the doubt rather than snooping into private lives.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding avoiding suspicion and spying?",
    "defaultHadithCount": 51
  },
  {
    "id": "patience-during-provocation",
    "number": 112,
    "nameEnglish": "Patience during Provocation",
    "nameArabic": "الحلم والأناة والصبر على الأذى",
    "category": "Ethics & Character",
    "description": "Forbearance in the face of foolishness disarms enemies and wins hearts.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding patience during provocation?",
    "defaultHadithCount": 51
  },
  {
    "id": "cleanliness-and-personal-grooming",
    "number": 113,
    "nameEnglish": "Cleanliness and Personal Grooming",
    "nameArabic": "النظافة والسنن الفطرة والسواك",
    "category": "Ethics & Character",
    "description": "Using the Miswak, clipping nails, perfuming, and honoring the human form.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding cleanliness and personal grooming?",
    "defaultHadithCount": 51
  },
  {
    "id": "visiting-the-sick-and-invalids",
    "number": 114,
    "nameEnglish": "Visiting the Sick and Invalids",
    "nameArabic": "عيادة المريض ومرافقة الرحمة الإلهية",
    "category": "Ethics & Character",
    "description": "70,000 angels pray for the one who walks to comfort a sick person.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding visiting the sick and invalids?",
    "defaultHadithCount": 51
  },
  {
    "id": "hospitality-to-guests-diyafah",
    "number": 115,
    "nameEnglish": "Hospitality to Guests (Diyafah)",
    "nameArabic": "إكرام الضيف وحق الضيافة",
    "category": "Ethics & Character",
    "description": "Welcoming travelers and visitors with open doors and sincere hospitality.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding hospitality to guests (diyafah)?",
    "defaultHadithCount": 51
  },
  {
    "id": "mercy-toward-animals-and-nature",
    "number": 116,
    "nameEnglish": "Mercy toward Animals and Nature",
    "nameArabic": "الرحمة بالحيوان والطير وإطعامه",
    "category": "Ethics & Character",
    "description": "A woman entered Jannah for giving water to a thirsty dog in her shoe.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding mercy toward animals and nature?",
    "defaultHadithCount": 51
  },
  {
    "id": "modesty-in-dress-and-decorum",
    "number": 117,
    "nameEnglish": "Modesty in Dress and Decorum",
    "nameArabic": "الستر والعفاف واللباس الحسن",
    "category": "Ethics & Character",
    "description": "Dressing with dignity and elegance without vanity or arrogance.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding modesty in dress and decorum?",
    "defaultHadithCount": 51
  },
  {
    "id": "spreading-greetings-of-peace-salam",
    "number": 118,
    "nameEnglish": "Spreading Greetings of Peace (Salam)",
    "nameArabic": "إفشاء السلام وزرع المحبة بين الناس",
    "category": "Ethics & Character",
    "description": "The catalyst that implants mutual love in human communities.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding spreading greetings of peace (salam)?",
    "defaultHadithCount": 51
  },
  {
    "id": "helping-the-stranded-and-traveler",
    "number": 119,
    "nameEnglish": "Helping the Stranded and Traveler",
    "nameArabic": "إعانة ابن السبيل وقضاء حوائج الناس",
    "category": "Ethics & Character",
    "description": "Walking to fulfill a brother’s need is better than one month of Itikaf.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding helping the stranded and traveler?",
    "defaultHadithCount": 51
  },
  {
    "id": "avoiding-envy-and-malice-hasad",
    "number": 120,
    "nameEnglish": "Avoiding Envy and Malice (Hasad)",
    "nameArabic": "التحذير من الحسد وسلامة الصدر",
    "category": "Ethics & Character",
    "description": "Purifying the chest so you can rejoice in others’ blessings.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding avoiding envy and malice (hasad)?",
    "defaultHadithCount": 51
  },
  {
    "id": "steadfastness-in-principles-istiqamah",
    "number": 121,
    "nameEnglish": "Steadfastness in Principles (Istiqamah)",
    "nameArabic": "الاستقامة على الحق مهما تغير الزمان",
    "category": "Ethics & Character",
    "description": "“Say: I believe in Allah, and then remain upright and steadfast.”",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding steadfastness in principles (istiqamah)?",
    "defaultHadithCount": 51
  },
  {
    "id": "gratitude-to-benefactors",
    "number": 122,
    "nameEnglish": "Gratitude to Benefactors",
    "nameArabic": "من لا يشكر الناس لا يشكر الله",
    "category": "Ethics & Character",
    "description": "Whoever fails to thank fellow humans will fail to genuinely thank Allah.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding gratitude to benefactors?",
    "defaultHadithCount": 51
  },
  {
    "id": "cheerfulness-and-pleasant-demeanor",
    "number": 123,
    "nameEnglish": "Cheerfulness and Pleasant Demeanor",
    "nameArabic": "طلاقة الوجه والكلمة الطيبة",
    "category": "Ethics & Character",
    "description": "Meeting people with an open face and uplifting words.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding cheerfulness and pleasant demeanor?",
    "defaultHadithCount": 51
  },
  {
    "id": "justice-and-impartiality",
    "number": 124,
    "nameEnglish": "Justice and Impartiality",
    "nameArabic": "العدل والشهادة بالقسط ولو على النفس",
    "category": "Ethics & Character",
    "description": "Standing firmly for justice even if it goes against oneself or parents.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding justice and impartiality?",
    "defaultHadithCount": 51
  },
  {
    "id": "consultation-and-shura",
    "number": 125,
    "nameEnglish": "Consultation and Shura",
    "nameArabic": "الشورى والاستنارة بآراء العقلاء",
    "category": "Ethics & Character",
    "description": "Seeking wise counsel avoids regret and builds consensus.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding consultation and shura?",
    "defaultHadithCount": 51
  },
  {
    "id": "truthful-merchant-at-tajir-as-sadooq",
    "number": 126,
    "nameEnglish": "Truthful Merchant (At-Tajir As-Sadooq)",
    "nameArabic": "التاجر الصدوق الأمين مع النبيين",
    "category": "Business & Wealth",
    "description": "The honest businessman will be resurrected with prophets and martyrs.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding truthful merchant (at-tajir as-sadooq)?",
    "defaultHadithCount": 51
  },
  {
    "id": "prohibition-of-usury-exploitation-riba",
    "number": 127,
    "nameEnglish": "Prohibition of Usury & Exploitation (Riba)",
    "nameArabic": "تحريم الربا وأكل أموال الناس بالباطل",
    "category": "Business & Wealth",
    "description": "Why exploiting human desperation destroys societal economic balance.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding prohibition of usury & exploitation (riba)?",
    "defaultHadithCount": 51
  },
  {
    "id": "halal-livelihood-ethical-consumption",
    "number": 128,
    "nameEnglish": "Halal Livelihood & Ethical Consumption",
    "nameArabic": "طلب الحلال وأكل الطيبات",
    "category": "Business & Wealth",
    "description": "Every morsel of food eaten shapes the acceptance of personal supplications.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding halal livelihood & ethical consumption?",
    "defaultHadithCount": 51
  },
  {
    "id": "prompt-payment-of-worker-wages",
    "number": 129,
    "nameEnglish": "Prompt Payment of Worker Wages",
    "nameArabic": "إعطاء الأجير حقه قبل أن يجف عرقه",
    "category": "Business & Wealth",
    "description": "Paying employees their rightful compensation before their sweat dries.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding prompt payment of worker wages?",
    "defaultHadithCount": 51
  },
  {
    "id": "clear-contracts-mutual-consent",
    "number": 130,
    "nameEnglish": "Clear Contracts & Mutual Consent",
    "nameArabic": "الوضوح في البيع وكتابة الديون",
    "category": "Business & Wealth",
    "description": "Transparency in transactions without hidden defects or deceit.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding clear contracts & mutual consent?",
    "defaultHadithCount": 51
  },
  {
    "id": "generosity-in-bargaining-and-debt-relief",
    "number": 131,
    "nameEnglish": "Generosity in Bargaining and Debt Relief",
    "nameArabic": "السماحة في البيع والشراء والقضاء",
    "category": "Business & Wealth",
    "description": "May Allah have mercy on a person easy when buying, selling, and demanding debts.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding generosity in bargaining and debt relief?",
    "defaultHadithCount": 51
  },
  {
    "id": "giving-respite-to-insolvent-debtors",
    "number": 132,
    "nameEnglish": "Giving Respite to Insolvent Debtors",
    "nameArabic": "إنظار المعسر والتجاوز عنه",
    "category": "Business & Wealth",
    "description": "Whoever gives respite to a debtor in hardship, Allah shades him under His Throne.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding giving respite to insolvent debtors?",
    "defaultHadithCount": 51
  },
  {
    "id": "condemnation-of-hoarding-price-manipulation",
    "number": 133,
    "nameEnglish": "Condemnation of Hoarding & Price Manipulation",
    "nameArabic": "تحريم الاحتكار والتلاعب بالأسعار",
    "category": "Business & Wealth",
    "description": "No one hoards essential goods during hardship except a wrongdoer.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding condemnation of hoarding & price manipulation?",
    "defaultHadithCount": 51
  },
  {
    "id": "fair-weights-and-accurate-measures",
    "number": 134,
    "nameEnglish": "Fair Weights and Accurate Measures",
    "nameArabic": "إيفاء الكيل والميزان بالقسط",
    "category": "Business & Wealth",
    "description": "Integrity in measurements and fulfilling standards without skimming.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding fair weights and accurate measures?",
    "defaultHadithCount": 51
  },
  {
    "id": "prohibition-of-bribery-corruption",
    "number": 135,
    "nameEnglish": "Prohibition of Bribery & Corruption",
    "nameArabic": "لعن الراشي والمرتشي في الحكم والمال",
    "category": "Business & Wealth",
    "description": "Bribes corrupt justice and invite divine wrath upon communities.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding prohibition of bribery & corruption?",
    "defaultHadithCount": 51
  },
  {
    "id": "planting-trees-stewarding-land",
    "number": 136,
    "nameEnglish": "Planting Trees & Stewarding Land",
    "nameArabic": "غرس الشجر وإحياء الأرض الموات",
    "category": "Business & Wealth",
    "description": "Even if the Hour arrives, if you hold a palm sapling, plant it.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding planting trees & stewarding land?",
    "defaultHadithCount": 51
  },
  {
    "id": "avoiding-speculation-excessive-ambiguity-gharar",
    "number": 137,
    "nameEnglish": "Avoiding Speculation & Excessive Ambiguity (Gharar)",
    "nameArabic": "النهي عن بيع الغرر والجهالة",
    "category": "Business & Wealth",
    "description": "Protecting commerce from predatory gambling and deceptive risk.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding avoiding speculation & excessive ambiguity (gharar)?",
    "defaultHadithCount": 51
  },
  {
    "id": "honoring-partnerships-and-joint-ventures",
    "number": 138,
    "nameEnglish": "Honoring Partnerships and Joint Ventures",
    "nameArabic": "الأمانة في الشراكة وبركة المال المشترك",
    "category": "Business & Wealth",
    "description": "Allah remains with two business partners as long as neither betrays the other.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding honoring partnerships and joint ventures?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-danger-of-defaulting-on-debts-voluntarily",
    "number": 139,
    "nameEnglish": "The Danger of Defaulting on Debts Voluntarily",
    "nameArabic": "مطل الغني ظلم والتحذير من الديون",
    "category": "Business & Wealth",
    "description": "Procrastination by a wealthy debtor is pure oppression.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the danger of defaulting on debts voluntarily?",
    "defaultHadithCount": 51
  },
  {
    "id": "endowments-sustainable-awqaf",
    "number": 140,
    "nameEnglish": "Endowments & Sustainable Awqaf",
    "nameArabic": "الوقف الخيري وبناء الصروح المستدامة",
    "category": "Business & Wealth",
    "description": "Locking wealth for perpetual educational, medical, and social relief.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding endowments & sustainable awqaf?",
    "defaultHadithCount": 51
  },
  {
    "id": "contentment-with-moderate-earnings-qana-ah",
    "number": 141,
    "nameEnglish": "Contentment with Moderate Earnings (Qana’ah)",
    "nameArabic": "القناعة والرضا بالكفاف",
    "category": "Business & Wealth",
    "description": "Successful is he who accepted Islam, was given sufficient sustenance, and was content.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding contentment with moderate earnings (qana’ah)?",
    "defaultHadithCount": 51
  },
  {
    "id": "ethical-inheritance-distribution-mirath",
    "number": 142,
    "nameEnglish": "Ethical Inheritance Distribution (Mirath)",
    "nameArabic": "قسمة المواريث بشرع الله والعدل",
    "category": "Business & Wealth",
    "description": "Distributing estates according to divine guidelines without disowning family.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding ethical inheritance distribution (mirath)?",
    "defaultHadithCount": 51
  },
  {
    "id": "returning-borrowed-articles-safely",
    "number": 143,
    "nameEnglish": "Returning Borrowed Articles Safely",
    "nameArabic": "رد العارية والأمانات إلى أهلها",
    "category": "Business & Wealth",
    "description": "Taking utmost care of borrowed tools and properties.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding returning borrowed articles safely?",
    "defaultHadithCount": 51
  },
  {
    "id": "avoiding-wasteful-luxury-in-consumption",
    "number": 144,
    "nameEnglish": "Avoiding Wasteful Luxury in Consumption",
    "nameArabic": "النهي عن التبذير وإضاعة المال",
    "category": "Business & Wealth",
    "description": "Moderation in food, clothing, and housing without extravagance.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding avoiding wasteful luxury in consumption?",
    "defaultHadithCount": 51
  },
  {
    "id": "philanthropy-and-empowering-the-poor",
    "number": 145,
    "nameEnglish": "Philanthropy and Empowering the Poor",
    "nameArabic": "تمكين الفقراء وتحويلهم إلى منتجين",
    "category": "Business & Wealth",
    "description": "Teaching a man to earn with an axe and rope rather than endless begging.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding philanthropy and empowering the poor?",
    "defaultHadithCount": 51
  },
  {
    "id": "power-of-istighfar-seeking-forgiveness",
    "number": 146,
    "nameEnglish": "Power of Istighfar (Seeking Forgiveness)",
    "nameArabic": "فضل الاستغفار وسيد الاستغفار",
    "category": "Remembrance & Dua",
    "description": "Opening closed doors, invoking rain, and erasing past burdens.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding power of istighfar (seeking forgiveness)?",
    "defaultHadithCount": 51
  },
  {
    "id": "morning-evening-adhkar-protection",
    "number": 147,
    "nameEnglish": "Morning & Evening Adhkar (Protection)",
    "nameArabic": "أذكار الصباح والمساء وحفظ العبد",
    "category": "Remembrance & Dua",
    "description": "The daily fortress that repels anxiety, depression, and spiritual harm.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding morning & evening adhkar (protection)?",
    "defaultHadithCount": 51
  },
  {
    "id": "sending-salawat-on-the-prophet",
    "number": 148,
    "nameEnglish": "Sending Salawat on the Prophet ﷺ",
    "nameArabic": "الصلاة على النبي ﷺ وقضاء الحوائج",
    "category": "Remembrance & Dua",
    "description": "Send 1 prayer on the Prophet ﷺ and Allah will send 10 blessings on you.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding sending salawat on the prophet ﷺ?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-treasured-phrase-la-hawla-wa-la-quwwata",
    "number": 149,
    "nameEnglish": "The Treasured Phrase: La Hawla wa la Quwwata",
    "nameArabic": "لا حول ولا قوة إلا بالله كنز من كنوز الجنة",
    "category": "Remembrance & Dua",
    "description": "A treasure from beneath the Throne declaring complete surrender to Divine Power.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the treasured phrase: la hawla wa la quwwata?",
    "defaultHadithCount": 51
  },
  {
    "id": "subhanallah-wa-bihamdihi-100-times-daily",
    "number": 150,
    "nameEnglish": "SubhanAllah wa biHamdihi (100 Times Daily)",
    "nameArabic": "سبحان الله وبحمده وحط الخطايا",
    "category": "Remembrance & Dua",
    "description": "Expiates sins even if they were like the foam of the boundless ocean.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding subhanallah wa bihamdihi (100 times daily)?",
    "defaultHadithCount": 51
  },
  {
    "id": "duas-in-moments-of-severe-distress-karb",
    "number": 151,
    "nameEnglish": "Duas in Moments of Severe Distress (Karb)",
    "nameArabic": "دعاء الكرب والهم والحزن",
    "category": "Remembrance & Dua",
    "description": "Words revealed by the Prophet ﷺ to shatter despair and lift heavy hearts.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding duas in moments of severe distress (karb)?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-etiquette-of-accepted-supplication",
    "number": 152,
    "nameEnglish": "The Etiquette of Accepted Supplication",
    "nameArabic": "آداب الدعاء وأسباب الإجابة",
    "category": "Remembrance & Dua",
    "description": "Praising Allah, sending Salawat, facing Qibla, and having firm certainty.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the etiquette of accepted supplication?",
    "defaultHadithCount": 51
  },
  {
    "id": "dua-at-the-hour-of-pre-dawn-sahar",
    "number": 153,
    "nameEnglish": "Dua at the Hour of Pre-Dawn (Sahar)",
    "nameArabic": "الدعاء في الثلث الأخير من الليل",
    "category": "Remembrance & Dua",
    "description": "When the Lord descends to the lowest heaven offering forgiveness to all who ask.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding dua at the hour of pre-dawn (sahar)?",
    "defaultHadithCount": 51
  },
  {
    "id": "saying-alhamdulillah-in-every-state",
    "number": 154,
    "nameEnglish": "Saying Alhamdulillah in Every State",
    "nameArabic": "الحمد لله على كل حال ودوام الشكر",
    "category": "Remembrance & Dua",
    "description": "Praising Allah in ease and in affliction brings perpetual contentment.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding saying alhamdulillah in every state?",
    "defaultHadithCount": 51
  },
  {
    "id": "ayat-al-kursi-before-sleeping",
    "number": 155,
    "nameEnglish": "Ayat al-Kursi before Sleeping",
    "nameArabic": "آية الكرسي وحراسة الملائكة للنائم",
    "category": "Remembrance & Dua",
    "description": "A protective angel guards your bedside until the light of dawn breaks.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding ayat al-kursi before sleeping?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-three-protectors-al-mu-awwidhat",
    "number": 156,
    "nameEnglish": "The Three Protectors: Al-Mu’awwidhat",
    "nameArabic": "قراءة الإخلاص والمعوذتين والنفث",
    "category": "Remembrance & Dua",
    "description": "Surah Ikhlas, Falaq, and Nas recited into palms to ward off all evil.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the three protectors: al-mu’awwidhat?",
    "defaultHadithCount": 51
  },
  {
    "id": "dua-when-leaving-the-house-bismillah-tawakkaltu",
    "number": 157,
    "nameEnglish": "Dua when Leaving the House (Bismillah Tawakkaltu)",
    "nameArabic": "دعاء الخروج من المنزل وحفظ العبد",
    "category": "Remembrance & Dua",
    "description": "“You are guided, defended, and protected, and devil turns away.”",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding dua when leaving the house (bismillah tawakkaltu)?",
    "defaultHadithCount": 51
  },
  {
    "id": "dua-for-guidance-and-steadfastness-ya-muqallib-al-quloob",
    "number": 158,
    "nameEnglish": "Dua for Guidance and Steadfastness (Ya Muqallib al-Quloob)",
    "nameArabic": "يا مقلب القلوب ثبت قلبي على دينك",
    "category": "Remembrance & Dua",
    "description": "The most frequent supplication of the Messenger of Allah ﷺ.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding dua for guidance and steadfastness (ya muqallib al-quloob)?",
    "defaultHadithCount": 51
  },
  {
    "id": "remembrance-upon-waking-in-the-night-tahajjud",
    "number": 159,
    "nameEnglish": "Remembrance upon Waking in the Night (Tahajjud)",
    "nameArabic": "الذكر عند التعار من الليل",
    "category": "Remembrance & Dua",
    "description": "Words that guarantee immediate acceptance of prayer and forgiveness.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding remembrance upon waking in the night (tahajjud)?",
    "defaultHadithCount": 51
  },
  {
    "id": "dua-for-parents-and-ancestors",
    "number": 160,
    "nameEnglish": "Dua for Parents and Ancestors",
    "nameArabic": "الدعاء للوالدين ورفع درجاتهما",
    "category": "Remembrance & Dua",
    "description": "Raising parents’ status in Jannah because their children asked for forgiveness.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding dua for parents and ancestors?",
    "defaultHadithCount": 51
  },
  {
    "id": "supplication-after-sneezing-and-eating",
    "number": 161,
    "nameEnglish": "Supplication after Sneezing and Eating",
    "nameArabic": "الحمد بعد العطاس والطعام وحمد الله",
    "category": "Remembrance & Dua",
    "description": "Connecting natural bodily reflexes to joyful praise of the Sustainer.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding supplication after sneezing and eating?",
    "defaultHadithCount": 51
  },
  {
    "id": "dua-when-visiting-graves-ziyarat-al-qubur",
    "number": 162,
    "nameEnglish": "Dua when Visiting Graves (Ziyarat al-Qubur)",
    "nameArabic": "السلام على أهل الديار والموتى",
    "category": "Remembrance & Dua",
    "description": "Sending peace to departed souls and contemplating our eventual journey.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding dua when visiting graves (ziyarat al-qubur)?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-greatest-name-of-allah-ismullah-al-a-zam",
    "number": 163,
    "nameEnglish": "The Greatest Name of Allah (Ismullah al-A’zam)",
    "nameArabic": "اسم الله الأعظم الذي إذا دعي به أجاب",
    "category": "Remembrance & Dua",
    "description": "The supreme divine name that compels immediate answer to prayers.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the greatest name of allah (ismullah al-a’zam)?",
    "defaultHadithCount": 51
  },
  {
    "id": "dua-for-sincere-knowledge-and-livelihood",
    "number": 164,
    "nameEnglish": "Dua for Sincere Knowledge and Livelihood",
    "nameArabic": "اللهم إني أسألك علما نافعا ورزقا طيبا",
    "category": "Remembrance & Dua",
    "description": "The daily morning prayer for beneficial knowledge and blessed sustenance.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding dua for sincere knowledge and livelihood?",
    "defaultHadithCount": 51
  },
  {
    "id": "silent-remembrance-in-the-depths-of-solitude",
    "number": 165,
    "nameEnglish": "Silent Remembrance in the Depths of Solitude",
    "nameArabic": "ذكر الله خاليا ففاضت عيناه",
    "category": "Remembrance & Dua",
    "description": "The tear shed in private remembrance guarantees shade on Judgment Day.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding silent remembrance in the depths of solitude?",
    "defaultHadithCount": 51
  },
  {
    "id": "contemplation-of-death-dhikr-al-mawt",
    "number": 166,
    "nameEnglish": "Contemplation of Death (Dhikr al-Mawt)",
    "nameArabic": "ذكر هادم اللذات والاستعداد للرحيل",
    "category": "Heart & Hereafter",
    "description": "Remembering the destroyer of pleasures cleanses worldly obsessions.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding contemplation of death (dhikr al-mawt)?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-life-of-the-grave-al-barzakh",
    "number": 167,
    "nameEnglish": "The Life of the Grave (Al-Barzakh)",
    "nameArabic": "عذاب القبر ونعيمه وفتنة الملكين",
    "category": "Heart & Hereafter",
    "description": "The question of the two angels (Munkar & Nakir) and light in the resting place.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the life of the grave (al-barzakh)?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-horrors-of-the-day-of-resurrection",
    "number": 168,
    "nameEnglish": "The Horrors of the Day of Resurrection",
    "nameArabic": "أهوال يوم القيامة والشمس دانية",
    "category": "Heart & Hereafter",
    "description": "When the sun approaches and individuals seek shade under their charity.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the horrors of the day of resurrection?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-prophet-s-basin-al-hawd-al-kawthar",
    "number": 169,
    "nameEnglish": "The Prophet’s Basin (Al-Hawd Al-Kawthar)",
    "nameArabic": "حوض الكوثر والشرب من يد النبي ﷺ",
    "category": "Heart & Hereafter",
    "description": "Drinking from the Prophet’s noble hands after which you will never thirst again.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the prophet’s basin (al-hawd al-kawthar)?",
    "defaultHadithCount": 51
  },
  {
    "id": "crossing-the-bridge-over-hell-as-sirat",
    "number": 170,
    "nameEnglish": "Crossing the Bridge over Hell (As-Sirat)",
    "nameArabic": "الصراط فوق جهنم وسرعة المؤمنين",
    "category": "Heart & Hereafter",
    "description": "Crossing as swiftly as lightning according to the light of one’s earthly deeds.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding crossing the bridge over hell (as-sirat)?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-splendors-of-paradise-jannah",
    "number": 171,
    "nameEnglish": "The Splendors of Paradise (Jannah)",
    "nameArabic": "نعيم الجنة وما لا عين رأت",
    "category": "Heart & Hereafter",
    "description": "What no eye has ever seen, no ear has ever heard, and no mind has ever conceived.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the splendors of paradise (jannah)?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-ranks-of-jannah-surah-al-mulk",
    "number": 172,
    "nameEnglish": "The Ranks of Jannah & Surah Al-Mulk",
    "nameArabic": "درجات الجنة وسورة الملك المنجية",
    "category": "Heart & Hereafter",
    "description": "The 30 verses that defend their reciter until they are admitted to bliss.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the ranks of jannah & surah al-mulk?",
    "defaultHadithCount": 51
  },
  {
    "id": "purifying-the-spiritual-heart-qalb-saleem",
    "number": 173,
    "nameEnglish": "Purifying the Spiritual Heart (Qalb Saleem)",
    "nameArabic": "القلب السليم وطهارته من الغل والحقد",
    "category": "Heart & Hereafter",
    "description": "Meeting Allah on the Last Day with a pure heart free of rancor.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding purifying the spiritual heart (qalb saleem)?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-sickness-of-showing-off-riya",
    "number": 174,
    "nameEnglish": "The Sickness of Showing Off (Riya’)",
    "nameArabic": "الرياء والشرك الخفي وإحباط العمل",
    "category": "Heart & Hereafter",
    "description": "The hidden trap of worshiping to receive human applause and praise.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the sickness of showing off (riya’)?",
    "defaultHadithCount": 51
  },
  {
    "id": "crying-from-the-fear-of-allah",
    "number": 175,
    "nameEnglish": "Crying from the Fear of Allah",
    "nameArabic": "البكاء من خشية الله وحرمة النار",
    "category": "Heart & Hereafter",
    "description": "Eyes that weep out of awe for Allah will never touch the flames of Hell.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding crying from the fear of allah?",
    "defaultHadithCount": 51
  },
  {
    "id": "weighing-of-deeds-on-the-mizan",
    "number": 176,
    "nameEnglish": "Weighing of Deeds on the Mizan",
    "nameArabic": "الميزان وخفة وثقل الأعمال",
    "category": "Heart & Hereafter",
    "description": "Two words light on the tongue, heavy on the scale: SubhanAllah wa biHamdihi.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding weighing of deeds on the mizan?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-believer-s-book-of-deeds",
    "number": 177,
    "nameEnglish": "The Believer’s Book of Deeds",
    "nameArabic": "تطاير الصحف وأخذ الكتاب باليمين",
    "category": "Heart & Hereafter",
    "description": "Receiving your personal life record in the right hand with radiant joy.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the believer’s book of deeds?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-ultimate-reward-beholding-allah",
    "number": 178,
    "nameEnglish": "The Ultimate Reward: Beholding Allah",
    "nameArabic": "زيادة النعيم برؤية وجه الله الكريم",
    "category": "Heart & Hereafter",
    "description": "When the veil is lifted in Jannah, all other delights pale in comparison.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the ultimate reward: beholding allah?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-eternal-abode-no-sickness-or-aging",
    "number": 179,
    "nameEnglish": "The Eternal Abode & No Sickness or Aging",
    "nameArabic": "الخلود في الجنة وشباب دائم",
    "category": "Heart & Hereafter",
    "description": "Youth that never ages, health that never wanes, joy that never fades.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the eternal abode & no sickness or aging?",
    "defaultHadithCount": 51
  },
  {
    "id": "warnings-against-arrogance-and-tyranny",
    "number": 180,
    "nameEnglish": "Warnings against Arrogance and Tyranny",
    "nameArabic": "عاقبة الظلم والظلمات يوم القيامة",
    "category": "Heart & Hereafter",
    "description": "Oppression will manifest as pitch darkness on the Day of Resurrection.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding warnings against arrogance and tyranny?",
    "defaultHadithCount": 51
  },
  {
    "id": "true-repentance-before-the-death-rattle",
    "number": 181,
    "nameEnglish": "True Repentance before the Death Rattle",
    "nameArabic": "التوبة الصادقة قبل الغرغرة واليقين",
    "category": "Heart & Hereafter",
    "description": "Allah accepts repentance as long as the soul has not reached the throat.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding true repentance before the death rattle?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-garden-between-pulpit-and-resting-place",
    "number": 182,
    "nameEnglish": "The Garden between Pulpit and Resting Place",
    "nameArabic": "الروضة الشريفة ورياض الجنة",
    "category": "Heart & Hereafter",
    "description": "The blessed piece of earth imbued with celestial fragrance.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the garden between pulpit and resting place?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-companions-of-the-right-hand-ashab-al-yameen",
    "number": 183,
    "nameEnglish": "The Companions of the Right Hand (Ashab al-Yameen)",
    "nameArabic": "أصحاب اليمين وفرحة الفوز العظيم",
    "category": "Heart & Hereafter",
    "description": "The jubilant celebration of those who triumphed over worldly temptation.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the companions of the right hand (ashab al-yameen)?",
    "defaultHadithCount": 51
  },
  {
    "id": "dua-for-a-blessed-ending-husn-al-khatimah",
    "number": 184,
    "nameEnglish": "Dua for a Blessed Ending (Husn al-Khatimah)",
    "nameArabic": "دعاء حسن الخاتمة وثبات اللسان بالتوحيد",
    "category": "Heart & Hereafter",
    "description": "Whoever’s final words on earth are La Ilaha Illallah enters Paradise.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding dua for a blessed ending (husn al-khatimah)?",
    "defaultHadithCount": 51
  },
  {
    "id": "welcoming-the-angels-of-mercy-at-departure",
    "number": 185,
    "nameEnglish": "Welcoming the Angels of Mercy at Departure",
    "nameArabic": "نزول ملائكة الرحمة بالبشرى",
    "category": "Heart & Hereafter",
    "description": "Angels descending with white silk and celestial perfumes to welcome the soul.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding welcoming the angels of mercy at departure?",
    "defaultHadithCount": 51
  },
  {
    "id": "tribulations-of-the-end-times-fitan",
    "number": 186,
    "nameEnglish": "Tribulations of the End Times (Fitan)",
    "nameArabic": "الفتن كقطع الليل المظلم",
    "category": "Trials & Sunnah",
    "description": "Navigating moral storms where holding onto faith feels like holding burning embers.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding tribulations of the end times (fitan)?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-dajjal-false-messiah-protection",
    "number": 187,
    "nameEnglish": "The Dajjal (False Messiah) & Protection",
    "nameArabic": "فتنة المسيح الدجال وحفظ سورة الكهف",
    "category": "Trials & Sunnah",
    "description": "Reciting the first 10 verses of Surah Al-Kahf as an impregnable shield.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the dajjal (false messiah) & protection?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-return-of-isa-jesus-ibn-maryam-as",
    "number": 188,
    "nameEnglish": "The Return of Isa (Jesus) ibn Maryam (AS)",
    "nameArabic": "نزول عيسى بن مريم عليه السلام والعدل",
    "category": "Trials & Sunnah",
    "description": "Descending upon the white minaret of Damascus to restore peace and truth.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the return of isa (jesus) ibn maryam (as)?",
    "defaultHadithCount": 51
  },
  {
    "id": "unity-of-the-ummah-avoiding-sectarianism",
    "number": 189,
    "nameEnglish": "Unity of the Ummah & Avoiding Sectarianism",
    "nameArabic": "لزوم الجماعة والنهي عن الفرقة",
    "category": "Trials & Sunnah",
    "description": "Clinging to the main body of believers and rejecting fanatical fractures.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding unity of the ummah & avoiding sectarianism?",
    "defaultHadithCount": 51
  },
  {
    "id": "patience-under-oppression-prayer",
    "number": 190,
    "nameEnglish": "Patience under Oppression & Prayer",
    "nameArabic": "الصبر على أذى الناس والدعاء لهم",
    "category": "Trials & Sunnah",
    "description": "Emulating the prophets who prayed: “O Allah, forgive my people, for they know not.”",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding patience under oppression & prayer?",
    "defaultHadithCount": 51
  },
  {
    "id": "adhering-to-the-prophetic-sunnah-strictly",
    "number": 191,
    "nameEnglish": "Adhering to the Prophetic Sunnah strictly",
    "nameArabic": "عليكم بسنتي وسنة الخلفاء الراشدين",
    "category": "Trials & Sunnah",
    "description": "Bite onto the authentic Sunnah with your molars during confusing times.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding adhering to the prophetic sunnah strictly?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-sanctity-of-human-life-and-blood",
    "number": 192,
    "nameEnglish": "The Sanctity of Human Life and Blood",
    "nameArabic": "حرمة دم المسلم وعظمة الروح عند الله",
    "category": "Trials & Sunnah",
    "description": "The destruction of the entire universe is less grave to Allah than taking an innocent life.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the sanctity of human life and blood?",
    "defaultHadithCount": 51
  },
  {
    "id": "repelling-evil-with-goodness",
    "number": 193,
    "nameEnglish": "Repelling Evil with Goodness",
    "nameArabic": "ادفع بالتي هي أحسن وتحويل العدو لصديق",
    "category": "Trials & Sunnah",
    "description": "Transforming bitter hostility into intimate friendship through magnanimous grace.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding repelling evil with goodness?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-superiority-of-moral-integrity",
    "number": 194,
    "nameEnglish": "The Superiority of Moral Integrity",
    "nameArabic": "الاستقامة في زمن الفتن كالهجرة للنبي ﷺ",
    "category": "Trials & Sunnah",
    "description": "Worship during moral breakdown carries the reward of migrating to the Prophet ﷺ.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the superiority of moral integrity?",
    "defaultHadithCount": 51
  },
  {
    "id": "holding-back-during-civil-strife",
    "number": 195,
    "nameEnglish": "Holding Back during Civil Strife",
    "nameArabic": "كف اليد واللسان وقت الفتنة",
    "category": "Trials & Sunnah",
    "description": "Breaking your bow and sheathing your sword when confusion clouds clarity.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding holding back during civil strife?",
    "defaultHadithCount": 51
  },
  {
    "id": "commanding-good-with-gentle-wisdom",
    "number": 196,
    "nameEnglish": "Commanding Good with Gentle Wisdom",
    "nameArabic": "الأمر بالمعروف والنهي عن المنكر برفق",
    "category": "Trials & Sunnah",
    "description": "Inspiring people toward good with kindness, not condemnation.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding commanding good with gentle wisdom?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-spiritual-reward-for-the-patient-in-strife",
    "number": 197,
    "nameEnglish": "The Spiritual Reward for the Patient in Strife",
    "nameArabic": "أجر الصابرين في آخر الزمان كخمسين صحابيا",
    "category": "Trials & Sunnah",
    "description": "Enduring righteousness in difficult eras carries astronomical rewards.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the spiritual reward for the patient in strife?",
    "defaultHadithCount": 51
  },
  {
    "id": "protecting-the-intellect-from-doubts",
    "number": 198,
    "nameEnglish": "Protecting the Intellect from Doubts",
    "nameArabic": "الاستعاذة من الشكوك والوساوس",
    "category": "Trials & Sunnah",
    "description": "Saying “Amantu billah” (I believe in Allah) and halting obsessive whispers.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding protecting the intellect from doubts?",
    "defaultHadithCount": 51
  },
  {
    "id": "the-triumph-of-truth-over-falsehood",
    "number": 199,
    "nameEnglish": "The Triumph of Truth over Falsehood",
    "nameArabic": "إن الباطل كان زهوقا ونصر الحق",
    "category": "Trials & Sunnah",
    "description": "Falsehood may have temporary noise, but truth has eternal staying power.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding the triumph of truth over falsehood?",
    "defaultHadithCount": 51
  },
  {
    "id": "prophetic-compassion-for-the-entire-world",
    "number": 200,
    "nameEnglish": "Prophetic Compassion for the Entire World",
    "nameArabic": "وما أرسلناك إلا رحمة للعالمين",
    "category": "Trials & Sunnah",
    "description": "Embodying the universal mercy that sent the Messenger of Allah to all humanity.",
    "primaryQuestion": "What spiritual wisdom did the Prophet ﷺ teach regarding prophetic compassion for the entire world?",
    "defaultHadithCount": 51
  }
];
