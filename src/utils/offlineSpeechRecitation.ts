/**
 * 100% Offline English & Urdu Quran Translation Recitation Engine
 *
 * Plays clear, clause-paced recitations directly from bundled offline Quran
 * translations (Saheeh International English & Fateh Muhammad Jalandhri Urdu)
 * across all 114 Surahs / 6,236 Ayahs with zero network dependency.
 *
 * Multi-tier offline voice pipeline:
 *  - English ('en'):
 *      1. Native OS English voice (localService preferred)
 *      2. Default OS voice
 *      3. Resilient timer-sync fallback (never stalls if OS voices unavailable)
 *  - Urdu ('ur'):
 *      1. Native OS Urdu voice (ur-PK / ur-IN, localService preferred)
 *      2. Native Hindi voice (hi-IN) with Quranic Urdu-to-Devanagari phonetic transliteration
 *      3. English / OS voice with Roman Urdu phonetic transliteration
 *      4. Resilient timer-sync fallback
 */

export interface OfflineSpeechCallbacks {
  onProgress: (currentTime: number, duration: number) => void;
  onEnded: () => void;
  onStart?: () => void;
}

export type OfflineRecitationLanguage = 'en' | 'ur';

export type OfflineVoiceTier =
  | 'native_en'
  | 'native_ur'
  | 'phonetic_hi'
  | 'phonetic_roman'
  | 'timer_only';

interface SelectedVoiceResult {
  voice: SpeechSynthesisVoice | null;
  tier: OfflineVoiceTier;
}

/**
 * High-frequency Urdu Quran vocabulary mapped to natural Devanagari phonetics
 * so hi-IN voices pronounce Urdu Quran translations cleanly with unwritten short vowels.
 */
const URDU_TO_DEVANAGARI_LEXICON: Record<string, string> = {
  'شروع': 'शुरू',
  'الله': 'अल्लाह',
  'اللہ': 'अल्लाह',
  'خدا': 'ख़ुदा',
  'کا': 'का',
  'کی': 'की',
  'کے': 'के',
  'کو': 'को',
  'سے': 'से',
  'میں': 'में',
  'پر': 'पर',
  'نے': 'ने',
  'اور': 'और',
  'یا': 'या',
  'جو': 'जो',
  'وہ': 'वो',
  'یہ': 'ये',
  'اس': 'इस',
  'ان': 'उन',
  'ہم': 'हम',
  'تم': 'तुम',
  'تو': 'तो',
  'کہ': 'कि',
  'بڑا': 'बड़ा',
  'مہربان': 'मेहरबान',
  'نہایت': 'निहायत',
  'رحم': 'रहम',
  'والا': 'वाला',
  'والے': 'वाले',
  'والوں': 'वालों',
  'نام': 'नाम',
  'لے': 'ले',
  'کر': 'कर',
  'سب': 'सब',
  'طرح': 'तरह',
  'تعریف': 'तारीफ़',
  'ہی': 'ही',
  'سزاوار': 'सज़ावार',
  'ہے': 'है',
  'ہیں': 'हैं',
  'ہو': 'हो',
  'تھا': 'था',
  'تھے': 'थे',
  'تھی': 'थी',
  'تمام': 'तमाम',
  'مخلوقات': 'मख़लूक़ात',
  'پروردگار': 'परवरदिगार',
  'انصاف': 'इंसाफ़',
  'دن': 'दिन',
  'حاکم': 'हाकिम',
  'اے': 'ऐ',
  'تیری': 'तेरी',
  'تیرا': 'तेरा',
  'تیرے': 'तेरे',
  'عبادت': 'इबादत',
  'کرتے': 'करते',
  'کرتا': 'करता',
  'تجھ': 'तुझ',
  'مدد': 'मदद',
  'مانگتے': 'मांगते',
  'ہمیں': 'हमें',
  'سیدھے': 'सीधे',
  'سیدھا': 'सीधा',
  'رستے': 'रास्ते',
  'راستہ': 'रास्ता',
  'چلا': 'चला',
  'لوگوں': 'लोगों',
  'لوگ': 'लोग',
  'جن': 'जिन',
  'اپنا': 'अपना',
  'اپنے': 'अपने',
  'فضل': 'फ़ज़्ल',
  'کرم': 'करम',
  'رہا': 'रहा',
  'نہ': 'न',
  'نہیں': 'नहीं',
  'غصے': 'ग़ुस्से',
  'ہوتا': 'होता',
  'گمراہوں': 'गुमराहों',
  'بیشک': 'बेशक',
  'بےشک': 'बेशक',
  'ایمان': 'ईमान',
  'لائے': 'लाए',
  'کتاب': 'किताब',
  'قرآن': 'क़ुरआन',
  'رسول': 'रसूल',
  'نبی': 'नबी',
  'آسمان': 'आसमान',
  'آسمانوں': 'आसमानों',
  'زمین': 'ज़मीन',
  'دنیا': 'दुनिया',
  'آخرت': 'आख़िरत',
  'جنت': 'जन्नत',
  'دوزخ': 'दोज़ख़',
  'عذاب': 'अज़ाब',
  'بخشش': 'बख़्शिश',
  'مغفرت': 'मग़फ़िरत',
  'حکمت': 'हिकमत',
  'علم': 'इल्म',
  'حق': 'हक़',
  'باطل': 'बातिल',
  'نیکی': 'नेकी',
  'بدی': 'बदी',
  'صبر': 'सब्र',
  'شکر': 'शुक्र',
  'نماز': 'नमाज़',
  'زکوٰۃ': 'ज़कात',
  'کافر': 'काफ़िर',
  'مومن': 'मोमिन',
  'مسلمان': 'मुसलमान',
  'فرمایا': 'फ़रमाया',
  'کہا': 'कहा',
  'کہو': 'कहो',
  'بھی': 'भी',
  'پھر': 'फिर',
  'جب': 'जब',
  'تب': 'तब',
  'اگر': 'अगर',
  'مگر': 'मगर',
  'لیکن': 'लेकिन',
  'کچھ': 'कुछ',
  'ہر': 'हर',
  'ایک': 'एक',
  'دو': 'दो',
  'دل': 'दिल',
  'دلوں': 'दिलों',
  'آنکھیں': 'आंखें',
  'کان': 'कान',
  'ہاتھ': 'हाथ',
  'بات': 'बात',
  'کام': 'काम',
  'نیک': 'नेक',
  'بھلائی': 'भलाई',
  'برائی': 'बुराई',
  'ڈر': 'डर',
  'خوف': 'ख़ौफ़',
  'امید': 'उम्मीद',
  'رحمت': 'रहमत',
  'برکت': 'बरकत',
  'سلامتی': 'सलामती',
  'پناہ': 'पनाह',
  'مالک': 'मालिक',
  'بادشاہ': 'बादशाह',
  'پیدا': 'पैदा',
  'کیا': 'किया',
  'کیے': 'किए',
  'دیا': 'दिया',
  'دیے': 'दिए',
  'لیے': 'लिए',
  'ساتھ': 'साथ',
  'بغیر': 'बग़ैर',
  'اندر': 'अंदर',
  'اوپر': 'ऊपर',
  'نیچے': 'नीचे',
  'آگے': 'आगे',
  'پیچھے': 'पीछे',
};

const URDU_TO_ROMAN_LEXICON: Record<string, string> = {
  'شروع': 'shuru',
  'الله': 'Allah',
  'اللہ': 'Allah',
  'خدا': 'Khuda',
  'کا': 'ka',
  'کی': 'ki',
  'کے': 'ke',
  'کو': 'ko',
  'سے': 'se',
  'میں': 'mein',
  'پر': 'par',
  'نے': 'ne',
  'اور': 'aur',
  'یا': 'ya',
  'جو': 'jo',
  'وہ': 'woh',
  'یہ': 'yeh',
  'اس': 'is',
  'ان': 'un',
  'ہم': 'hum',
  'تم': 'tum',
  'تو': 'tu',
  'کہ': 'ke',
  'بڑا': 'bada',
  'مہربان': 'meherbaan',
  'نہایت': 'nihayat',
  'رحم': 'rahm',
  'والا': 'wala',
  'والے': 'wale',
  'والوں': 'walon',
  'نام': 'naam',
  'لے': 'le',
  'کر': 'kar',
  'سب': 'sab',
  'طرح': 'tarah',
  'تعریف': 'tareef',
  'ہی': 'hi',
  'سزاوار': 'sazawar',
  'ہے': 'hai',
  'ہیں': 'hain',
  'ہو': 'ho',
  'تمام': 'tamaam',
  'مخلوقات': 'makhlooqaat',
  'پروردگار': 'parwardigar',
  'انصاف': 'insaf',
  'دن': 'din',
  'حاکم': 'hakim',
  'تیری': 'teri',
  'عبادت': 'ibaadat',
  'کرتے': 'karte',
  'تجھ': 'tujh',
  'مدد': 'madad',
  'مانگتے': 'maangte',
  'ہمیں': 'hamein',
  'سیدھے': 'seedhe',
  'رستے': 'raste',
  'چلا': 'chala',
  'لوگوں': 'logon',
  'جن': 'jin',
  'اپنا': 'apna',
  'فضل': 'fazl',
  'کرم': 'karam',
  'رہا': 'raha',
  'نہ': 'na',
  'نہیں': 'nahin',
  'غصے': 'ghusse',
  'ہوتا': 'hota',
  'گمراہوں': 'gumrahon',
  'بیشک': 'beshak',
  'ایمان': 'imaan',
  'لائے': 'laaye',
  'کتاب': 'kitaab',
  'قرآن': 'Quran',
  'رسول': 'Rasool',
  'نبی': 'Nabi',
  'آسمانوں': 'aasmaanon',
  'زمین': 'zameen',
  'دنیا': 'duniya',
  'آخرت': 'aakhirat',
  'جنت': 'jannat',
  'دوزخ': 'dozakh',
  'عذاب': 'azaab',
  'رحمت': 'rehmat',
  'مالک': 'malik',
  'پیدا': 'paida',
  'کیا': 'kiya',
  'کہو': 'kaho',
  'بھی': 'bhi',
  'جب': 'jab',
  'اگر': 'agar',
  'لیکن': 'lekin',
  'ہر': 'har',
  'ایک': 'ek',
};

const URDU_CHAR_TO_DEVANAGARI: Record<string, string> = {
  'آ': 'आ',
  'ا': 'अ',
  'أ': 'अ',
  'إ': 'इ',
  'ب': 'ब',
  'پ': 'प',
  'ت': 'त',
  'ٹ': 'ट',
  'ث': 'स',
  'ج': 'ज',
  'چ': 'च',
  'ح': 'ह',
  'خ': 'ख़',
  'د': 'द',
  'ڈ': 'ड',
  'ذ': 'ज़',
  'ر': 'र',
  'ڑ': 'ड़',
  'ز': 'ज़',
  'ژ': 'ज़',
  'س': 'स',
  'ش': 'श',
  'ص': 'स',
  'ض': 'ज़',
  'ط': 'त',
  'ظ': 'ज़',
  'ع': 'अ',
  'غ': 'ग़',
  'ف': 'फ़',
  'ق': 'क़',
  'ک': 'क',
  'ك': 'क',
  'گ': 'ग',
  'ل': 'ल',
  'م': 'म',
  'ن': 'न',
  'ں': 'ं',
  'و': 'व',
  'ہ': 'ह',
  'ھ': 'ह',
  'ی': 'य',
  'ي': 'य',
  'ے': 'ए',
  'ئ': 'ई',
  'ء': '',
  '۔': '।',
  '،': ',',
  '؟': '?',
};

const URDU_CHAR_TO_ROMAN: Record<string, string> = {
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
  'ی': 'i',
  'ي': 'i',
  'ے': 'e',
  'ئ': 'i',
  'ء': '',
  '۔': '.',
  '،': ',',
  '؟': '?',
};

function preprocessEnglishText(raw: string): string {
  return raw
    .replace(/\[([^\]]+)\]/g, ' $1 ')
    .replace(/\(([^)]+)\)/g, ', $1, ')
    .replace(/[—–]/g, ', ')
    .replace(/\s+/g, ' ')
    .replace(/,\s*,+/g, ',')
    .trim();
}

function preprocessUrduText(raw: string): string {
  return raw
    .replace(/[\u064B-\u065F\u0670]/g, '') // strip optional Arabic diacritics that can confuse TTS
    .replace(/\(([^)]+)\)/g, '، $1، ')
    .replace(/\[([^\]]+)\]/g, '، $1، ')
    .replace(/۔/g, '۔ ')
    .replace(/\s+/g, ' ')
    .trim();
}

function transliterateUrduWordToDevanagari(word: string): string {
  const clean = word.replace(/[،۔؟,.!?;:()[\]"'«»]/g, '');
  if (!clean) return word;
  if (URDU_TO_DEVANAGARI_LEXICON[clean]) {
    return word.replace(clean, URDU_TO_DEVANAGARI_LEXICON[clean]);
  }
  let out = '';
  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i];
    if (ch === 'و' && i > 0 && i < clean.length - 1) {
      out += 'ो';
    } else if (ch === 'ی' && i > 0) {
      out += i === clean.length - 1 ? 'ी' : 'य';
    } else if (ch === 'ے' && i > 0) {
      out += 'े';
    } else if (ch === 'ا' && i > 0) {
      out += 'ा';
    } else {
      out += URDU_CHAR_TO_DEVANAGARI[ch] ?? ch;
    }
  }
  return word.replace(clean, out);
}

function transliterateUrduToDevanagari(input: string): string {
  return preprocessUrduText(input)
    .split(/\s+/)
    .map(transliterateUrduWordToDevanagari)
    .join(' ');
}

function transliterateUrduWordToRoman(word: string): string {
  const clean = word.replace(/[،۔؟,.!?;:()[\]"'«»]/g, '');
  if (!clean) return word;
  if (URDU_TO_ROMAN_LEXICON[clean]) {
    return word.replace(clean, URDU_TO_ROMAN_LEXICON[clean]);
  }
  let out = '';
  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i];
    out += URDU_CHAR_TO_ROMAN[ch] ?? ch;
  }
  return word.replace(clean, out);
}

function transliterateUrduToRoman(input: string): string {
  return preprocessUrduText(input)
    .split(/\s+/)
    .map(transliterateUrduWordToRoman)
    .join(' ');
}

function splitIntoClauses(text: string): string[] {
  const rawClauses = text
    .split(/(?<=[।.?!,;،۔])\s+/)
    .map((c) => c.trim())
    .filter(Boolean);

  if (rawClauses.length === 0) return [text];

  const merged: string[] = [];
  for (const clause of rawClauses) {
    if (merged.length > 0 && clause.length < 16 && merged[merged.length - 1].length < 85) {
      merged[merged.length - 1] = `${merged[merged.length - 1]} ${clause}`;
    } else {
      merged.push(clause);
    }
  }
  return merged;
}

class OfflineSpeechRecitationController {
  private sessionSeq = 0;
  private isPlaying = false;
  private isPaused = false;
  private finished = false;
  private currentText = '';
  private currentLanguage: OfflineRecitationLanguage = 'en';
  private currentUrduReciterId = 'shamshad';
  private playbackSpeed = 1;
  private estimatedDuration = 4;
  private elapsedBeforePause = 0;
  private startTimestamp = 0;
  private timerId: number | null = null;
  private safetyTimeoutId: number | null = null;
  private clausePauseTimeoutId: number | null = null;
  private callbacks: OfflineSpeechCallbacks | null = null;
  private usingNativeSpeech = false;
  private activeTier: OfflineVoiceTier = 'timer_only';

  private clearTimers() {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.safetyTimeoutId !== null) {
      window.clearTimeout(this.safetyTimeoutId);
      this.safetyTimeoutId = null;
    }
    if (this.clausePauseTimeoutId !== null) {
      window.clearTimeout(this.clausePauseTimeoutId);
      this.clausePauseTimeoutId = null;
    }
  }

  private pickBestOfflineVoice(
    language: OfflineRecitationLanguage,
    urduReciterId: string
  ): SelectedVoiceResult {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return { voice: null, tier: 'timer_only' };
    }
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) {
      return { voice: null, tier: 'timer_only' };
    }

    const preferLocal = (list: SpeechSynthesisVoice[], preferFemale = false) => {
      const localList = list.filter((v) => v.localService);
      const pool = localList.length > 0 ? localList : list;
      if (preferFemale) {
        const fem = pool.find((v) =>
          /female|woman|zira|samantha|victoria|karen|lekha|heera|kalpana|fiona|serena|sara|aria/i.test(
            v.name
          )
        );
        if (fem) return fem;
      } else {
        const male = pool.find((v) =>
          /male|man|daniel|david|mark|alex|rishi|prabhat|asad|uzair|george|arthur/i.test(v.name)
        );
        if (male) return male;
      }
      return pool[0] || null;
    };

    if (language === 'en') {
      const enVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('en'));
      if (enVoices.length > 0) {
        const gbOrUs = enVoices.filter(
          (v) =>
            v.lang.toLowerCase().startsWith('en-gb') ||
            v.lang.toLowerCase().startsWith('en-us')
        );
        return {
          voice: preferLocal(gbOrUs.length > 0 ? gbOrUs : enVoices, false),
          tier: 'native_en',
        };
      }
      return { voice: voices[0], tier: 'native_en' };
    }

    // Urdu voice selection
    const preferFemale = urduReciterId === 'farhat';
    const urVoices = voices.filter(
      (v) =>
        v.lang.toLowerCase().startsWith('ur') ||
        v.name.toLowerCase().includes('urdu')
    );
    if (urVoices.length > 0) {
      return { voice: preferLocal(urVoices, preferFemale), tier: 'native_ur' };
    }

    // Tier 2 for Urdu: Hindi (hi-IN) with Quranic Urdu-to-Devanagari phonetic transliteration
    const hiVoices = voices.filter(
      (v) =>
        v.lang.toLowerCase().startsWith('hi') ||
        v.name.toLowerCase().includes('hindi')
    );
    if (hiVoices.length > 0) {
      return { voice: preferLocal(hiVoices, preferFemale), tier: 'phonetic_hi' };
    }

    // Tier 3 for Urdu: Indian English or English OS voice with Romanized Urdu
    const enInVoices = voices.filter((v) => v.lang.toLowerCase() === 'en-in');
    if (enInVoices.length > 0) {
      return { voice: preferLocal(enInVoices, preferFemale), tier: 'phonetic_roman' };
    }

    const enVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('en'));
    if (enVoices.length > 0) {
      return { voice: preferLocal(enVoices, preferFemale), tier: 'phonetic_roman' };
    }

    return { voice: voices[0], tier: 'phonetic_roman' };
  }

  public getEngineStatus(
    language: OfflineRecitationLanguage,
    urduReciterId: string = 'shamshad'
  ): { tier: OfflineVoiceTier; label: string; isOfflineCapable: boolean } {
    const { tier, voice } = this.pickBestOfflineVoice(language, urduReciterId);
    if (language === 'en') {
      return {
        tier,
        label: voice ? `Offline English (${voice.name})` : 'Offline English Sync Mode',
        isOfflineCapable: true,
      };
    }
    switch (tier) {
      case 'native_ur':
        return {
          tier,
          label: `Offline Urdu (${voice?.name || 'ur-PK'})`,
          isOfflineCapable: true,
        };
      case 'phonetic_hi':
        return {
          tier,
          label: 'Offline Urdu Phonetic Voice',
          isOfflineCapable: true,
        };
      case 'phonetic_roman':
        return {
          tier,
          label: 'Offline Urdu Syllable Voice',
          isOfflineCapable: true,
        };
      default:
        return {
          tier: 'timer_only',
          label: 'Offline Urdu Sync Mode',
          isOfflineCapable: true,
        };
    }
  }

  private prepareSpokenText(
    rawText: string,
    language: OfflineRecitationLanguage,
    tier: OfflineVoiceTier
  ): string {
    if (language === 'en') {
      return preprocessEnglishText(rawText);
    }
    if (tier === 'native_ur') {
      return preprocessUrduText(rawText);
    }
    if (tier === 'phonetic_hi') {
      return transliterateUrduToDevanagari(rawText);
    }
    return transliterateUrduToRoman(rawText);
  }

  public start(
    text: string,
    speed: number,
    options: {
      language: OfflineRecitationLanguage;
      urduReciterId?: string;
    } & OfflineSpeechCallbacks
  ) {
    this.stop();

    const cleanText =
      text.trim() ||
      (options.language === 'ur'
        ? 'شروع اللہ کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے'
        : 'In the name of Allah, the Entirely Merciful, the Especially Merciful.');

    this.currentText = cleanText;
    this.currentLanguage = options.language;
    this.currentUrduReciterId = options.urduReciterId || 'shamshad';
    this.playbackSpeed = speed || 1;
    this.callbacks = options;
    this.finished = false;
    this.isPlaying = true;
    this.isPaused = false;
    this.elapsedBeforePause = 0;
    this.sessionSeq += 1;

    const charsPerSec = options.language === 'en' ? 13.5 : 10.5;
    const baseSeconds = Math.max(2.6, cleanText.length / charsPerSec);
    this.estimatedDuration = baseSeconds / this.playbackSpeed;

    this.callbacks.onStart?.();
    this.callbacks.onProgress(0, this.estimatedDuration);

    this.launchSpeechAndTimer(cleanText, this.sessionSeq, 0);
  }

  private launchSpeechAndTimer(rawText: string, seq: number, startClauseFraction: number) {
    this.clearTimers();
    this.startTimestamp = performance.now();

    const finishOnce = () => {
      if (seq !== this.sessionSeq || this.finished || !this.isPlaying) return;
      this.finished = true;
      this.isPlaying = false;
      this.clearTimers();
      this.callbacks?.onProgress(this.estimatedDuration, this.estimatedDuration);
      this.callbacks?.onEnded();
    };

    // Smooth progress bar update
    this.timerId = window.setInterval(() => {
      if (!this.isPlaying || this.isPaused || seq !== this.sessionSeq) return;
      const elapsed = this.elapsedBeforePause + (performance.now() - this.startTimestamp) / 1000;
      const clamped = Math.min(this.estimatedDuration, elapsed);
      this.callbacks?.onProgress(clamped, this.estimatedDuration);

      if (!this.usingNativeSpeech && elapsed >= this.estimatedDuration) {
        finishOnce();
      }
    }, 100);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const { voice, tier } = this.pickBestOfflineVoice(
          this.currentLanguage,
          this.currentUrduReciterId
        );
        this.activeTier = tier;

        if (!voice) {
          this.usingNativeSpeech = false;
          return;
        }

        const prepared = this.prepareSpokenText(rawText, this.currentLanguage, tier);
        const clauses = splitIntoClauses(prepared);
        this.usingNativeSpeech = true;

        const baseMultiplier =
          this.currentLanguage === 'en'
            ? 0.94
            : this.currentUrduReciterId === 'farhat'
            ? 0.88
            : 0.91;
        const clarityRate = Math.max(0.65, Math.min(1.4, this.playbackSpeed * baseMultiplier));
        const pitch =
          this.currentLanguage === 'ur' && this.currentUrduReciterId === 'farhat'
            ? 1.07
            : this.currentLanguage === 'ur'
            ? 0.95
            : 1.0;

        let clauseIdx = Math.min(
          clauses.length - 1,
          Math.max(0, Math.floor(startClauseFraction * clauses.length))
        );

        const speakNextClause = () => {
          if (seq !== this.sessionSeq || this.finished || !this.isPlaying || this.isPaused) {
            return;
          }
          if (clauseIdx >= clauses.length) {
            finishOnce();
            return;
          }

          const clauseText = clauses[clauseIdx];
          const utterance = new SpeechSynthesisUtterance(clauseText);
          utterance.voice = voice;
          utterance.lang =
            voice.lang || (this.currentLanguage === 'ur' ? 'ur-PK' : 'en-US');
          utterance.rate = clarityRate;
          utterance.pitch = pitch;
          utterance.volume = 1.0;

          const startTime = performance.now();

          utterance.onend = () => {
            if (seq !== this.sessionSeq || this.finished || !this.isPlaying) return;
            const ranMs = performance.now() - startTime;
            if (ranMs < 110 && clauseText.length > 6) {
              this.usingNativeSpeech = false;
              return;
            }
            clauseIdx += 1;
            if (clauseIdx < clauses.length) {
              this.clausePauseTimeoutId = window.setTimeout(speakNextClause, 130);
            } else {
              finishOnce();
            }
          };

          utterance.onerror = () => {
            if (seq !== this.sessionSeq) return;
            this.usingNativeSpeech = false;
          };

          window.speechSynthesis.speak(utterance);
        };

        speakNextClause();

        // Safety timeout so playback never hangs if OS speech engine stalls
        const remainingEst = Math.max(2, this.estimatedDuration - this.elapsedBeforePause);
        this.safetyTimeoutId = window.setTimeout(() => {
          if (seq === this.sessionSeq && !this.finished && this.isPlaying && !this.isPaused) {
            finishOnce();
          }
        }, (remainingEst + 6) * 1000);
      } catch {
        this.usingNativeSpeech = false;
      }
    } else {
      this.usingNativeSpeech = false;
    }
  }

  public seekTo(seconds: number) {
    if (!this.currentText || !this.callbacks) return;
    const target = Math.max(0, Math.min(this.estimatedDuration, seconds));
    this.elapsedBeforePause = target;
    this.callbacks.onProgress(target, this.estimatedDuration);

    if (this.isPlaying && !this.isPaused) {
      this.sessionSeq += 1;
      const frac = this.estimatedDuration > 0 ? target / this.estimatedDuration : 0;
      this.launchSpeechAndTimer(this.currentText, this.sessionSeq, frac);
    }
  }

  public pause() {
    if (!this.isPlaying || this.isPaused) return;
    this.isPaused = true;
    this.elapsedBeforePause += (performance.now() - this.startTimestamp) / 1000;
    this.clearTimers();

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.pause();
      } catch {
        // ignore
      }
    }
  }

  public resume() {
    if (!this.isPlaying || !this.isPaused) return;
    this.isPaused = false;
    this.startTimestamp = performance.now();
    const seq = this.sessionSeq;

    if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.paused) {
      try {
        window.speechSynthesis.resume();
      } catch {
        // ignore
      }
    }

    const finishOnce = () => {
      if (seq !== this.sessionSeq || this.finished || !this.isPlaying) return;
      this.finished = true;
      this.isPlaying = false;
      this.clearTimers();
      this.callbacks?.onProgress(this.estimatedDuration, this.estimatedDuration);
      this.callbacks?.onEnded();
    };

    this.timerId = window.setInterval(() => {
      if (!this.isPlaying || this.isPaused || seq !== this.sessionSeq) return;
      const elapsed = this.elapsedBeforePause + (performance.now() - this.startTimestamp) / 1000;
      const clamped = Math.min(this.estimatedDuration, elapsed);
      this.callbacks?.onProgress(clamped, this.estimatedDuration);
      if (!this.usingNativeSpeech && elapsed >= this.estimatedDuration) {
        finishOnce();
      }
    }, 100);
  }

  public setSpeed(speed: number) {
    this.playbackSpeed = speed || 1;
    if (this.isPlaying && !this.isPaused && this.currentText && this.callbacks) {
      const cb = this.callbacks;
      this.start(this.currentText, this.playbackSpeed, {
        language: this.currentLanguage,
        urduReciterId: this.currentUrduReciterId,
        ...cb,
      });
    }
  }

  public getActiveTier(): OfflineVoiceTier {
    return this.activeTier;
  }

  public stop() {
    this.sessionSeq += 1;
    this.isPlaying = false;
    this.isPaused = false;
    this.finished = true;
    this.clearTimers();

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
  }
}

export const offlineSpeech = new OfflineSpeechRecitationController();
