/**
 * Crystal-Clear Assamese Quran Translation Recitation Engine (100% Offline)
 *
 * Uses on-device offline speech synthesis with a 4-tier phonetic pronunciation pipeline:
 *  1. Native Assamese (as-IN): Clean orthography + natural Quranic pause phrasing
 *  2. Bengali Fallback (bn-IN): Deep Assamese phonetic transliteration
 *     - 'ৰ' -> 'র'
 *     - 'ৱ' -> true 'w' glide ('ওয়'/'ওআ') instead of hard Bengali 'ব'
 *     - Assamese soft 'স' sound for 'ছ'/'চ' (e.g., ছালাত->সালাত, ছূৰা->সূরা, আছে->আসে, হৈছে->হৈসে)
 *     - Authentic glottal/velar 'হ'/'খ' cues for core Assamese words (সকলো->হকলো, সেই->হেই, অসম->অখম)
 *     - Apostrophe '’' word-join normalization (হ’ব->হব, তেওঁ->তেঁও)
 *  3. Hindi Fallback (hi-IN): Assamese-to-Devanagari phonetic transliteration
 *  4. English / Default OS Fallback: Assamese-to-Roman phonetic syllable reader
 *
 * Splits verses into balanced clauses with subtle breathing pauses and clear pacing (0.88x clarity baseline).
 */

export interface AssameseSpeechCallbacks {
  onProgress: (currentTime: number, duration: number) => void;
  onEnded: () => void;
  onStart?: () => void;
}

export type AssameseVoiceTier = 'native_as' | 'phonetic_bn' | 'phonetic_hi' | 'phonetic_roman' | 'timer_only';

interface SelectedVoiceResult {
  voice: SpeechSynthesisVoice | null;
  tier: AssameseVoiceTier;
}

const ASSAMESE_LEXICON_REPLACEMENTS: Array<[RegExp, string]> = [
  // Clean Assamese glottal/apostrophe contractions so TTS never pauses mid-word
  [/হ[’']ব/g, 'হব'],
  [/নহ[’']ব/g, 'নহব'],
  [/ক[’']ত/g, 'কত'],
  [/ক[’']লে/g, 'কলে'],
  [/ল[’']ব/g, 'লব'],
  [/দ[’']ব/g, 'দব'],
  [/থ[’']লে/g, 'থলে'],
  [/তেওঁলোক/g, 'তেঁওলোক'],
  [/তেওঁ/g, 'তেঁও'],
  [/তেৱোঁ/g, 'তেওওঁ'],
  [/[’']/g, ''],
];

const BN_PHONETIC_WORD_RULES: Array<[RegExp, string]> = [
  // Core Assamese function words where initial স/শ sounds like 'h'/'kh', not Bengali 'sh'
  [/\bসকলোকে\b/g, 'হকলোকে'],
  [/\bসকলোৱে\b/g, 'হকলোওয়ে'],
  [/\bসকলোৰে\b/g, 'হকলোরে'],
  [/\bসকলো\b/g, 'হকলো'],
  [/\bসেইবোৰ\b/g, 'হেইবোর'],
  [/\bসেইটো\b/g, 'হেইটো'],
  [/\bসেই\b/g, 'হেই'],
  [/\bসেয়েহে\b/g, 'হেয়েহে'],
  [/\bসেয়েহে\b/g, 'হেয়েহে'],
  [/\bসিহঁতক\b/g, 'হিহঁতক'],
  [/\bসিহঁতৰ\b/g, 'হিহঁতর'],
  [/\bসিহঁত\b/g, 'হিহঁত'],
  [/\bসিদিনা\b/g, 'হিদিনা'],
  [/\bসি\b/g, 'হি'],
  [/\bসঁচা\b/g, 'হঁচা'],
  [/\bসদায়\b/g, 'হদাই'],
  [/\bসদায়\b/g, 'হদাই'],
  [/\bসৈতে\b/g, 'হৈতে'],
  [/\bঅসমীয়া\b/g, 'অখমীয়া'],
  [/\bঅসমীয়া\b/g, 'অখমীয়া'],
  [/\bঅসম\b/g, 'অখম'],

  // Islamic / Arabic loanwords in Assamese Quran text (preserve crisp s/r/a pronunciation)
  [/আল্লাহৰ/g, 'আল্লাাহর'],
  [/আল্লাহে/g, 'আল্লাাহে'],
  [/আল্লাহক/g, 'আল্লাাহক'],
  [/আল্লাহ/g, 'আল্লাাহ'],
  [/ৰাব্বুল/g, 'রব্বুল'],
  [/ৰব্বুল/g, 'রব্বুল'],
  [/ৰহমান/g, 'রহমান'],
  [/ৰহীম/g, 'রহীম'],
  [/কোৰআন/g, 'কোরআন'],
  [/ক্বুৰআন/g, 'কোরআন'],
  [/ক্বদৰ/g, 'কদর'],
  [/ক্বিয়ামত/g, 'কিয়ামত'],
  [/ৰাছূল/g, 'রাসূল'],
  [/ৰাছুল/g, 'রাসুল'],
  [/ছালাত/g, 'সালাত'],
  [/ছূৰা/g, 'সূরা'],
  [/মূছা/g, 'মূসা'],
  [/ঈছা/g, 'ঈসা'],
  [/ইছলাম/g, 'ইসলাম'],
  [/মুছলিম/g, 'মুসলিম'],
  [/মছজিদ/g, 'মসজিদ'],
  [/ছিৰাত/g, 'সিরাত'],
  [/ছিজদা/g, 'সিজদা'],
  [/ছামাদ/g, 'সামাদ'],
  [/হিদায়ত/g, 'হিদায়ত'],
  [/হিদায়ত/g, 'হিদায়ত'],
  [/নিয়ামত/g, 'নিয়ামত'],
  [/নিয়ামত/g, 'নিয়ামত'],
];

/**
 * Normalizes punctuation and smart parentheses into clean speech clauses
 */
function preprocessAssameseText(raw: string): string {
  let text = raw
    .replace(/\u200B|\u200C|\u200D/g, '')
    .replace(/\(([^)]+)\)/g, ', $1, ')
    .replace(/\[([^\]]+)\]/g, ', $1, ')
    .replace(/[‘’'“”"«»]/g, (m) => (m === '’' || m === "'" ? '’' : ''))
    .replace(/[—–]/g, ', ')
    .replace(/[-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  for (const [pattern, replacement] of ASSAMESE_LEXICON_REPLACEMENTS) {
    text = text.replace(pattern, replacement);
  }
  return text.replace(/,\s*,+/g, ',').trim();
}

/**
 * Converts Assamese text into Bengali script phonetically tuned so bn-IN voices
 * sound genuinely Assamese instead of Bengali.
 */
function transliterateAssameseToPhoneticBengali(input: string): string {
  let text = preprocessAssameseText(input);

  // Apply Assamese word-level phonetic replacements first
  for (const [pattern, replacement] of BN_PHONETIC_WORD_RULES) {
    text = text.replace(pattern, replacement);
  }

  // Convert Assamese 'ৰ' to Bengali 'র'
  text = text.replace(/ৰ/g, 'র');

  // Convert Assamese 'ৱ' (W sound) into smooth Bengali 'ওয়' / 'ও' glides instead of hard 'ব'
  text = text
    .replace(/([োৌািীুূেৈ])ৱ([ািীুূেৈোৌ]?)/g, '$1ওয়$2')
    .replace(/([ক-হড়ঢ়য়ৰ])্ৱ/g, '$1োয়')
    .replace(/(^|\s)ৱ/g, '$1ওআ')
    .replace(/ৱ([ািীুূেৈোৌ])/g, 'ওয়$1')
    .replace(/ৱ/g, 'ওআ');

  // Convert Assamese soft 'ছ' and 'চ' to 'স' (eliminates un-Assamese "chh" sound)
  text = text
    .replace(/চ্ছ/g, 'স্স')
    .replace(/[চছ]্/g, 'স্')
    .replace(/[চছ]/g, 'স');

  return text.replace(/\s+/g, ' ').trim();
}

/**
 * Converts Assamese text into Devanagari phonetics for hi-IN fallback voices.
 */
function transliterateAssameseToDevanagari(input: string): string {
  // First normalize Assamese phonetics in Bengali/Assamese range
  const normalized = transliterateAssameseToPhoneticBengali(input)
    .replace(/ওয়/g, 'व')
    .replace(/ওআ/g, 'वा')
    .replace(/য়/g, 'य')
    .replace(/ক্ষ/g, 'ख्य')
    .replace(/জ্ঞ/g, 'ग्य');

  let out = '';
  for (let i = 0; i < normalized.length; i++) {
    const code = normalized.charCodeAt(i);
    if (code === 0x0964) {
      out += '।';
    } else if (code === 0x0981) {
      out += 'ँ';
    } else if (code === 0x0982) {
      out += 'ं';
    } else if (code === 0x0983) {
      out += 'ः';
    } else if (code >= 0x0985 && code <= 0x09cc) {
      // Shift Bengali/Assamese Unicode block to Devanagari block cleanly where mapped
      const mapped = String.fromCharCode(code - 0x0080);
      out += mapped;
    } else if (code === 0x09cd) {
      out += '्';
    } else if (code === 0x09ce) {
      out += 'त्';
    } else if (code === 0x09dc) {
      out += 'ड़';
    } else if (code === 0x09dd) {
      out += 'ढ़';
    } else if (code === 0x09df) {
      out += 'य';
    } else if (code >= 0x09e6 && code <= 0x09ef) {
      out += String.fromCharCode(code - 0x0080);
    } else {
      out += normalized[i];
    }
  }
  return out;
}

const ROMAN_CONSONANTS: Record<string, string> = {
  ক: 'k', খ: 'kh', গ: 'g', ঘ: 'gh', ঙ: 'ng',
  চ: 's', ছ: 's', জ: 'j', ঝ: 'jh', ঞ: 'ny',
  ট: 't', ঠ: 'th', ড: 'd', ঢ: 'dh', ণ: 'n',
  ত: 't', থ: 'th', দ: 'd', ধ: 'dh', ন: 'n',
  প: 'p', ফ: 'f', ব: 'b', ভ: 'bh', ম: 'm',
  য: 'j', ৰ: 'r', র: 'r', ল: 'l', ৱ: 'w',
  শ: 'sh', ষ: 'sh', স: 's', হ: 'h',
  ড়: 'r', ঢ়: 'rh', য়: 'y', য়: 'y', ৎ: 't',
};

const ROMAN_INDEP_VOWELS: Record<string, string> = {
  অ: 'o', আ: 'a', ই: 'i', ঈ: 'i', উ: 'u', ঊ: 'u',
  ঋ: 'ri', এ: 'e', ঐ: 'oi', ও: 'o', ঔ: 'ou',
};

const ROMAN_MATRAS: Record<string, string> = {
  'া': 'a', 'ি': 'i', 'ী': 'i', 'ু': 'u', 'ূ': 'u',
  'ৃ': 'ri', 'ে': 'e', 'ৈ': 'oi', 'ো': 'o', 'ৌ': 'ou',
};

/**
 * Converts Assamese script to readable Roman phonetic syllables for en-IN / en-US fallback.
 */
function transliterateAssameseToRoman(input: string): string {
  const pre = transliterateAssameseToPhoneticBengali(input)
    .replace(/ওয়/g, 'w')
    .replace(/ওআ/g, 'wa')
    .replace(/ক্ষ/g, 'khy');

  const chars = Array.from(pre);
  let out = '';

  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    const next = chars[i + 1] || '';

    if (ROMAN_INDEP_VOWELS[ch]) {
      out += ROMAN_INDEP_VOWELS[ch];
      continue;
    }

    if (ch === 'ং') {
      out += 'ng';
      continue;
    }
    if (ch === 'ঁ') {
      continue;
    }
    if (ch === 'ঃ') {
      out += 'h';
      continue;
    }
    if (ch === '।') {
      out += '. ';
      continue;
    }

    const cons = ROMAN_CONSONANTS[ch];
    if (cons) {
      out += cons;
      if (next === '্') {
        i++; // skip virama; no inherent vowel
      } else if (ROMAN_MATRAS[next]) {
        out += ROMAN_MATRAS[next];
        i++;
      } else if (next && next !== ' ' && next !== ',' && next !== '।' && next !== '.' && next !== '?') {
        out += 'o';
      } else if (!next || next === ' ' || next === ',' || next === '।') {
        // Soft final inherent vowel in Assamese words like 'পৰম', 'কৰোঁ'
        if (ch !== 'ৎ' && ch !== 'ং') {
          out += 'o';
        }
      }
      continue;
    }

    out += ch;
  }

  return out.replace(/\s+/g, ' ').trim();
}

/**
 * Splits a verse into balanced clauses so long Assamese Quran verses are spoken clearly
 * with natural rhythmic pauses rather than rushed monotone runs.
 */
function splitIntoClauses(text: string): string[] {
  const rawParts = text
    .split(/(?<=[।,;:.?!])\s+/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (rawParts.length === 0) return [text];

  // Merge overly short fragments (< 8 chars) with neighboring clause for fluid pacing
  const merged: string[] = [];
  for (const part of rawParts) {
    if (merged.length > 0 && part.length < 8) {
      merged[merged.length - 1] = `${merged[merged.length - 1]} ${part}`;
    } else {
      merged.push(part);
    }
  }
  return merged;
}

class AssameseRecitationController {
  private timerId: number | null = null;
  private safetyTimeoutId: number | null = null;
  private clausePauseTimeoutId: number | null = null;
  private isPlaying = false;
  private isPaused = false;
  private startTimestamp = 0;
  private elapsedBeforePause = 0;
  private estimatedDuration = 4;
  private playbackSpeed = 1;
  private currentText = '';
  private callbacks: AssameseSpeechCallbacks | null = null;
  private usingNativeSpeech = false;
  private activeTier: AssameseVoiceTier = 'timer_only';
  private finished = false;
  private sessionSeq = 0;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Pre-warm OS offline voice list
      try {
        window.speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.getVoices();
        };
      } catch {
        // ignore
      }
    }
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
  }

  private pickBestOfflineVoice(): SelectedVoiceResult {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return { voice: null, tier: 'timer_only' };
    }
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) {
      return { voice: null, tier: 'timer_only' };
    }

    const preferLocal = (list: SpeechSynthesisVoice[]) =>
      list.find((v) => v.localService) || list[0] || null;

    // 1. Native Assamese
    const asVoices = voices.filter(
      (v) =>
        v.lang.toLowerCase().startsWith('as') ||
        v.name.toLowerCase().includes('assamese') ||
        v.name.includes('অসমীয়া')
    );
    if (asVoices.length > 0) {
      return { voice: preferLocal(asVoices), tier: 'native_as' };
    }

    // 2. Bengali (closest Indic phonology; enhanced with Assamese phonetic engine)
    const bnVoices = voices.filter(
      (v) =>
        v.lang.toLowerCase().startsWith('bn') ||
        v.name.toLowerCase().includes('bengali') ||
        v.name.toLowerCase().includes('bangla')
    );
    if (bnVoices.length > 0) {
      // Prefer bn-IN over bn-BD for closer eastern Assamese cadence if available
      const bnIn = bnVoices.filter((v) => v.lang.toLowerCase().includes('in'));
      return {
        voice: preferLocal(bnIn.length > 0 ? bnIn : bnVoices),
        tier: 'phonetic_bn',
      };
    }

    // 3. Hindi (clean Indic Devanagari phonetic mapping)
    const hiVoices = voices.filter(
      (v) =>
        v.lang.toLowerCase().startsWith('hi') ||
        v.name.toLowerCase().includes('hindi')
    );
    if (hiVoices.length > 0) {
      return { voice: preferLocal(hiVoices), tier: 'phonetic_hi' };
    }

    // 4. Indian English or default system voice with Romanized Assamese syllables
    const enInVoices = voices.filter((v) => v.lang.toLowerCase() === 'en-in');
    if (enInVoices.length > 0) {
      return { voice: preferLocal(enInVoices), tier: 'phonetic_roman' };
    }

    const enVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('en'));
    if (enVoices.length > 0) {
      return { voice: preferLocal(enVoices), tier: 'phonetic_roman' };
    }

    return { voice: voices[0], tier: 'phonetic_roman' };
  }

  public getEngineStatus(): { tier: AssameseVoiceTier; label: string; isOfflineCapable: boolean } {
    const { tier, voice } = this.pickBestOfflineVoice();
    switch (tier) {
      case 'native_as':
        return {
          tier,
          label: `Native Assamese (${voice?.name || 'as-IN'})`,
          isOfflineCapable: true,
        };
      case 'phonetic_bn':
        return {
          tier,
          label: 'Assamese Phonetic Engine (Clear)',
          isOfflineCapable: true,
        };
      case 'phonetic_hi':
        return {
          tier,
          label: 'Assamese Indic Phonetic Engine',
          isOfflineCapable: true,
        };
      case 'phonetic_roman':
        return {
          tier,
          label: 'Offline Phonetic Syllable Voice',
          isOfflineCapable: true,
        };
      default:
        return {
          tier: 'timer_only',
          label: 'Assamese Offline Sync Mode',
          isOfflineCapable: true,
        };
    }
  }

  private prepareSpokenText(rawText: string, tier: AssameseVoiceTier): string {
    if (tier === 'native_as') {
      return preprocessAssameseText(rawText);
    }
    if (tier === 'phonetic_bn') {
      return transliterateAssameseToPhoneticBengali(rawText);
    }
    if (tier === 'phonetic_hi') {
      return transliterateAssameseToDevanagari(rawText);
    }
    return transliterateAssameseToRoman(rawText);
  }

  public start(text: string, speed: number, callbacks: AssameseSpeechCallbacks) {
    this.stop();

    const cleanText = text.trim() || 'পৰম কৰুণাময় পৰম দয়ালু আল্লাহৰ নামত।';
    this.currentText = cleanText;
    this.playbackSpeed = speed || 1;
    this.callbacks = callbacks;
    this.finished = false;
    this.isPlaying = true;
    this.isPaused = false;
    this.elapsedBeforePause = 0;
    this.sessionSeq += 1;

    // Gentle clarity pacing (~9.5 characters/sec at 1x)
    const baseSeconds = Math.max(2.8, cleanText.length / 9.5);
    this.estimatedDuration = baseSeconds / this.playbackSpeed;

    this.callbacks.onStart?.();
    this.callbacks.onProgress(0, this.estimatedDuration);

    this.launchSpeechAndTimer(cleanText, this.sessionSeq);
  }

  private launchSpeechAndTimer(rawText: string, seq: number) {
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

    // Start smooth progress ticker for Spotify scrubber bar
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
        const { voice, tier } = this.pickBestOfflineVoice();
        this.activeTier = tier;

        if (!voice) {
          this.usingNativeSpeech = false;
          return;
        }

        const prepared = this.prepareSpokenText(rawText, tier);
        const clauses = splitIntoClauses(prepared);
        this.usingNativeSpeech = true;

        // Tuned clarity speaking rate (0.88x baseline for clear consonant articulation)
        const clarityRate = Math.max(0.62, Math.min(1.35, this.playbackSpeed * 0.88));
        let clauseIdx = 0;

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
          utterance.lang = voice.lang || 'as-IN';
          utterance.rate = clarityRate;
          utterance.pitch = 1.0;
          utterance.volume = 1.0;

          const startTime = performance.now();

          utterance.onend = () => {
            if (seq !== this.sessionSeq || this.finished || !this.isPlaying) return;
            const ranMs = performance.now() - startTime;
            if (ranMs < 120 && clauseText.length > 6) {
              // OS voice didn't actually render audio; let progress timer finish cleanly
              this.usingNativeSpeech = false;
              return;
            }
            clauseIdx += 1;
            if (clauseIdx < clauses.length) {
              this.clausePauseTimeoutId = window.setTimeout(speakNextClause, 140);
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

        // Safety fallback timeout in case browser speechSynthesis stalls silently
        this.safetyTimeoutId = window.setTimeout(() => {
          if (seq === this.sessionSeq && !this.finished && this.isPlaying && !this.isPaused) {
            finishOnce();
          }
        }, (this.estimatedDuration + 6) * 1000);
      } catch {
        this.usingNativeSpeech = false;
      }
    } else {
      this.usingNativeSpeech = false;
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
      this.start(this.currentText, this.playbackSpeed, cb);
    }
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

export const assameseSpeech = new AssameseRecitationController();
