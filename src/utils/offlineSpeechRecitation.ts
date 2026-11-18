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

interface VoiceCandidate {
  voice: SpeechSynthesisVoice;
  tier: OfflineVoiceTier;
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
  private cancelDelayTimeoutId: number | null = null;
  private keepAliveIntervalId: number | null = null;
  private callbacks: OfflineSpeechCallbacks | null = null;
  private usingNativeSpeech = false;
  private activeTier: OfflineVoiceTier = 'timer_only';
  private cachedVoices: SpeechSynthesisVoice[] = [];
  private voicesListenerBound = false;

  constructor() {
    this.bindVoicesListener();
  }

  private bindVoicesListener() {
    if (this.voicesListenerBound || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    this.voicesListenerBound = true;
    try {
      const refresh = () => {
        const list = window.speechSynthesis.getVoices();
        if (list && list.length > 0) {
          this.cachedVoices = list;
        }
      };
      refresh();
      if (typeof window.speechSynthesis.addEventListener === 'function') {
        window.speechSynthesis.addEventListener('voiceschanged', refresh);
      } else {
        window.speechSynthesis.onvoiceschanged = refresh;
      }
    } catch {
      // ignore
    }
  }

  public warmUp() {
    this.bindVoicesListener();
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      const list = window.speechSynthesis.getVoices();
      if (list && list.length > 0) {
        this.cachedVoices = list;
      }
    } catch {
      // ignore
    }
  }

  private getAvailableVoices(): SpeechSynthesisVoice[] {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
    try {
      const live = window.speechSynthesis.getVoices();
      if (live && live.length > 0) {
        this.cachedVoices = live;
        return live;
      }
    } catch {
      // ignore
    }
    return this.cachedVoices;
  }

  private waitForVoices(timeoutMs: number = 350): Promise<SpeechSynthesisVoice[]> {
    const existing = this.getAvailableVoices();
    if (existing.length > 0) return Promise.resolve(existing);
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return Promise.resolve([]);
    }

    return new Promise((resolve) => {
      let settled = false;
      const done = () => {
        if (settled) return;
        settled = true;
        resolve(this.getAvailableVoices());
      };

      const timer = window.setTimeout(done, timeoutMs);
      const onVoices = () => {
        const list = this.getAvailableVoices();
        if (list.length > 0) {
          window.clearTimeout(timer);
          if (typeof window.speechSynthesis.removeEventListener === 'function') {
            window.speechSynthesis.removeEventListener('voiceschanged', onVoices);
          }
          done();
        }
      };

      try {
        if (typeof window.speechSynthesis.addEventListener === 'function') {
          window.speechSynthesis.addEventListener('voiceschanged', onVoices);
        }
      } catch {
        // ignore
      }
    });
  }

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
    if (this.cancelDelayTimeoutId !== null) {
      window.clearTimeout(this.cancelDelayTimeoutId);
      this.cancelDelayTimeoutId = null;
    }
    if (this.keepAliveIntervalId !== null) {
      window.clearInterval(this.keepAliveIntervalId);
      this.keepAliveIntervalId = null;
    }
  }

  private sortVoicePreference(list: SpeechSynthesisVoice[], preferFemale: boolean): SpeechSynthesisVoice[] {
    const score = (v: SpeechSynthesisVoice): number => {
      let s = 0;
      if (v.localService) s += 100;
      if (v.default) s += 5;
      const isFem = /female|woman|zira|samantha|victoria|karen|lekha|heera|kalpana|fiona|serena|sara|aria/i.test(
        v.name
      );
      const isMale = /male|man|daniel|david|mark|alex|rishi|prabhat|asad|uzair|george|arthur/i.test(v.name);
      if (preferFemale && isFem) s += 20;
      if (!preferFemale && isMale) s += 20;
      return s;
    };
    return [...list].sort((a, b) => score(b) - score(a));
  }

  /**
   * Builds an ordered cascade of offline-capable voice candidates.
   * When disconnected (!navigator.onLine), strictly filters to localService === true first
   * so cloud voices never silently stall playback offline.
   */
  private getVoiceCandidates(
    language: OfflineRecitationLanguage,
    urduReciterId: string,
    voicesOverride?: SpeechSynthesisVoice[]
  ): VoiceCandidate[] {
    const allVoices = voicesOverride || this.getAvailableVoices();
    if (!allVoices || allVoices.length === 0) return [];

    const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;
    const localOnly = allVoices.filter((v) => v.localService);
    // When offline and local OS voices exist, use strictly local voices so cloud TTS never hangs
    const primaryPool = isOffline && localOnly.length > 0 ? localOnly : allVoices;
    const preferFemale = language === 'ur' && urduReciterId === 'farhat';

    const candidates: VoiceCandidate[] = [];
    const seenUris = new Set<string>();
    const addMatches = (list: SpeechSynthesisVoice[], tier: OfflineVoiceTier) => {
      for (const v of this.sortVoicePreference(list, preferFemale)) {
        const key = `${v.voiceURI}|${v.name}|${tier}`;
        if (!seenUris.has(key)) {
          seenUris.add(key);
          candidates.push({ voice: v, tier });
        }
      }
    };

    if (language === 'en') {
      const enGbUs = primaryPool.filter((v) => {
        const l = v.lang.toLowerCase();
        return l.startsWith('en-gb') || l.startsWith('en-us');
      });
      const enOther = primaryPool.filter((v) => v.lang.toLowerCase().startsWith('en'));
      addMatches(enGbUs, 'native_en');
      addMatches(enOther, 'native_en');
      addMatches(localOnly, 'native_en');
      if (!isOffline) addMatches(allVoices, 'native_en');
      return candidates;
    }

    // Urdu multi-tier offline cascade:
    // 1. Native Urdu (localService preferred, or online if connected)
    const urVoices = primaryPool.filter(
      (v) => v.lang.toLowerCase().startsWith('ur') || v.name.toLowerCase().includes('urdu')
    );
    addMatches(urVoices, 'native_ur');

    // 2. Hindi (hi-IN) with Devanagari phonetic Quranic transliteration
    const hiVoices = primaryPool.filter(
      (v) => v.lang.toLowerCase().startsWith('hi') || v.name.toLowerCase().includes('hindi')
    );
    addMatches(hiVoices, 'phonetic_hi');

    // 3. Indian English / English with Romanized Urdu transliteration
    const enInVoices = primaryPool.filter((v) => v.lang.toLowerCase() === 'en-in');
    const enVoices = primaryPool.filter((v) => v.lang.toLowerCase().startsWith('en'));
    addMatches(enInVoices, 'phonetic_roman');
    addMatches(enVoices, 'phonetic_roman');

    // 4. Any remaining local OS voice as safe offline fallback
    addMatches(localOnly, 'phonetic_roman');
    if (!isOffline) addMatches(allVoices, 'phonetic_roman');

    return candidates;
  }

  private pickBestOfflineVoice(
    language: OfflineRecitationLanguage,
    urduReciterId: string
  ): SelectedVoiceResult {
    const candidates = this.getVoiceCandidates(language, urduReciterId);
    if (candidates.length === 0) {
      return { voice: null, tier: 'timer_only' };
    }
    return candidates[0];
  }

  public hasWorkingSpeech(
    language: OfflineRecitationLanguage = this.currentLanguage,
    urduReciterId: string = this.currentUrduReciterId
  ): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
    const candidates = this.getVoiceCandidates(language, urduReciterId);
    if (candidates.length === 0) return false;
    const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;
    if (isOffline) {
      return candidates.some((c) => c.voice.localService);
    }
    return true;
  }

  public getEngineStatus(
    language: OfflineRecitationLanguage,
    urduReciterId: string = 'shamshad'
  ): { tier: OfflineVoiceTier; label: string; isOfflineCapable: boolean } {
    const { tier, voice } = this.pickBestOfflineVoice(language, urduReciterId);
    if (!voice) {
      return {
        tier: 'timer_only',
        label: 'No device TTS voice found',
        isOfflineCapable: false,
      };
    }
    if (language === 'en') {
      return {
        tier,
        label: `Offline English (${voice.name})`,
        isOfflineCapable: voice.localService,
      };
    }
    switch (tier) {
      case 'native_ur':
        return {
          tier,
          label: `Offline Urdu (${voice.name})`,
          isOfflineCapable: voice.localService,
        };
      case 'phonetic_hi':
        return {
          tier,
          label: 'Offline Urdu Phonetic Voice',
          isOfflineCapable: voice.localService,
        };
      case 'phonetic_roman':
        return {
          tier,
          label: 'Offline Urdu Syllable Voice',
          isOfflineCapable: voice.localService,
        };
      default:
        return {
          tier: 'timer_only',
          label: 'No device TTS voice found',
          isOfflineCapable: false,
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

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.usingNativeSpeech = false;
      this.activeTier = 'timer_only';
      return;
    }

    const beginWithVoices = (voicesList: SpeechSynthesisVoice[]) => {
      if (seq !== this.sessionSeq || this.finished || !this.isPlaying || this.isPaused) return;

      const candidates = this.getVoiceCandidates(
        this.currentLanguage,
        this.currentUrduReciterId,
        voicesList
      );

      if (candidates.length === 0) {
        this.usingNativeSpeech = false;
        this.activeTier = 'timer_only';
        return;
      }

      let candidateIdx = 0;
      let clauseIdx = -1;
      let currentClauses: string[] = [];

      const prepareForCandidate = (idx: number) => {
        const chosen = candidates[idx];
        this.activeTier = chosen.tier;
        const prepared = this.prepareSpokenText(rawText, this.currentLanguage, chosen.tier);
        currentClauses = splitIntoClauses(prepared);
        if (clauseIdx < 0) {
          clauseIdx = Math.min(
            currentClauses.length - 1,
            Math.max(0, Math.floor(startClauseFraction * currentClauses.length))
          );
        } else {
          clauseIdx = Math.min(currentClauses.length - 1, clauseIdx);
        }
      };

      prepareForCandidate(candidateIdx);
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

      const speakNextClause = () => {
        if (seq !== this.sessionSeq || this.finished || !this.isPlaying || this.isPaused) {
          return;
        }
        if (clauseIdx >= currentClauses.length) {
          finishOnce();
          return;
        }

        const chosen = candidates[candidateIdx];
        if (!chosen) {
          this.usingNativeSpeech = false;
          this.activeTier = 'timer_only';
          return;
        }

        const clauseText = currentClauses[clauseIdx];
        const utterance = new SpeechSynthesisUtterance(clauseText);
        utterance.voice = chosen.voice;
        utterance.lang =
          chosen.voice.lang || (this.currentLanguage === 'ur' ? 'ur-PK' : 'en-US');
        utterance.rate = clarityRate;
        utterance.pitch = pitch;
        utterance.volume = 1.0;

        const startTime = performance.now();
        let handledOutcome = false;

        const tryFallbackOrContinue = () => {
          if (handledOutcome || seq !== this.sessionSeq || this.finished || !this.isPlaying) return;
          handledOutcome = true;
          if (candidateIdx + 1 < candidates.length) {
            candidateIdx += 1;
            prepareForCandidate(candidateIdx);
            this.clausePauseTimeoutId = window.setTimeout(speakNextClause, 40);
          } else {
            this.usingNativeSpeech = false;
            this.activeTier = 'timer_only';
          }
        };

        utterance.onend = () => {
          if (handledOutcome || seq !== this.sessionSeq || this.finished || !this.isPlaying) return;
          const ranMs = performance.now() - startTime;
          if (ranMs < 85 && clauseText.length > 6) {
            tryFallbackOrContinue();
            return;
          }
          handledOutcome = true;
          clauseIdx += 1;
          if (clauseIdx < currentClauses.length) {
            this.clausePauseTimeoutId = window.setTimeout(speakNextClause, 120);
          } else {
            finishOnce();
          }
        };

        utterance.onerror = () => {
          if (seq !== this.sessionSeq) return;
          tryFallbackOrContinue();
        };

        try {
          window.speechSynthesis.speak(utterance);
        } catch {
          tryFallbackOrContinue();
        }
      };

      // Chrome >14s utterance stall keepalive
      this.keepAliveIntervalId = window.setInterval(() => {
        if (!this.isPlaying || this.isPaused || seq !== this.sessionSeq) return;
        try {
          if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
            window.speechSynthesis.pause();
            window.speechSynthesis.resume();
          }
        } catch {
          // ignore
        }
      }, 9000);

      // Avoid Chromium's cancel() + immediate speak() silent-drop bug:
      // only cancel if speaking/pending, and wait 50ms before speaking.
      try {
        if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
          window.speechSynthesis.cancel();
          this.cancelDelayTimeoutId = window.setTimeout(speakNextClause, 50);
        } else {
          speakNextClause();
        }
      } catch {
        speakNextClause();
      }

      // Safety timeout so playback never hangs if OS speech engine stalls
      const remainingEst = Math.max(2, this.estimatedDuration - this.elapsedBeforePause);
      this.safetyTimeoutId = window.setTimeout(() => {
        if (seq === this.sessionSeq && !this.finished && this.isPlaying && !this.isPaused) {
          finishOnce();
        }
      }, (remainingEst + 6) * 1000);
    };

    const currentVoices = this.getAvailableVoices();
    if (currentVoices.length > 0) {
      beginWithVoices(currentVoices);
    } else {
      this.waitForVoices(350).then((loadedVoices) => {
        beginWithVoices(loadedVoices);
      });
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
        if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
          window.speechSynthesis.cancel();
        }
      } catch {
        // ignore
      }
    }
  }
}

export const offlineSpeech = new OfflineSpeechRecitationController();
