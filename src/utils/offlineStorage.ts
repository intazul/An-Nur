import { AudioBookmark, DownloadedSurahInfo, ImanDayRecord, SurahDetail, UserProfileData } from '../types/quran';

const PROFILE_KEY = 'annur_user_profile_v1';
const BOOKMARKS_KEY = 'annur_audio_bookmarks_v1';
const IMAN_KEY_PREFIX = 'annur_iman_record_';
const DOWNLOADS_KEY = 'annur_downloaded_surahs_meta_v1';
const OFFLINE_SURAH_PREFIX = 'annur_offline_surah_';
export const AUDIO_CACHE_NAME = 'annur-quran-audio-v1';

export const DEFAULT_PROFILE: UserProfileData = {
  name: 'Believer',
  dailyVerseGoal: 10,
  dailyDhikrGoal: 33,
  dailyHadithGoal: 5,
  preferredReciter: 'alafasy',
  arabicFontSize: 34,
  translationFontSize: 16,
  arabicGlowMode: 'gold',
  glowIntensity: 'subtle',
  calligraphyFont: 'amiri',
  showEnglish: true,
  showUrdu: true,
  showAssamese: false,
  showTafsir: false,
  readingLayout: 'thematic', // 'thematic' = Thematic paragraph study slides with topic headings & questions | 'paragraph' = Mushaf page sliding | 'cards' = verse cards
  mushafPageMode: 'flip', // 'flip' = horizontal page sliding like physical book
  mushafFontSize: 21, // Compact, refined small font size for Mushaf mode (readable, high contrast)
  showTajweedSigns: true, // Highlights where to stop/pause with simple help
  favoriteSurahs: [1, 36, 55, 67, 112], // Beloved chapters pre-favorited
  lastRead: {
    surahNumber: 1,
    ayahNumber: 1,
    surahName: 'Al-Fatihah',
    updatedAt: new Date().toISOString(),
  },
  notificationsEnabled: false,
  notificationTimes: {
    fajr: '05:30',
    dhuhr: '12:45',
    asr: '16:00',
    maghrib: '18:15',
    isha: '19:45',
    eveningReflection: '20:30',
  },
  recitationLanguageMode: 'arabic',
  recitationLyricsLanguage: 'arabic',
  preferredUrduReciter: 'shamshad',
  vocalClarityEnhancer: true,
};

function enforceSingleRegionalLanguage(profile: UserProfileData): UserProfileData {
  const normalized = { ...profile };
  // Migrate removed Assamese audio modes gracefully back to Arabic while keeping Assamese translation/Tafsir intact
  if (
    (normalized.recitationLanguageMode as string) === 'assamese' ||
    (normalized.recitationLanguageMode as string) === 'arabic_assamese'
  ) {
    normalized.recitationLanguageMode = 'arabic';
  }
  // Strict mutual exclusivity: Urdu and Assamese text/Tafsir can NEVER both be active simultaneously
  if (normalized.showAssamese && normalized.showUrdu) {
    normalized.showUrdu = false;
  }
  if (
    normalized.showAssamese &&
    (normalized.recitationLanguageMode === 'urdu' ||
      normalized.recitationLanguageMode === 'both' ||
      normalized.recitationLanguageMode === 'arabic_urdu')
  ) {
    normalized.recitationLanguageMode = 'arabic';
  }
  if (normalized.showAssamese && normalized.recitationLyricsLanguage === 'urdu') {
    normalized.recitationLyricsLanguage = 'assamese';
  }
  if (normalized.showUrdu && normalized.recitationLyricsLanguage === 'assamese') {
    normalized.recitationLyricsLanguage = 'urdu';
  }
  return normalized;
}

export function loadUserProfile(): UserProfileData {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    return enforceSingleRegionalLanguage({ ...DEFAULT_PROFILE, ...JSON.parse(raw) });
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveUserProfile(profile: UserProfileData): void {
  try {
    const sanitized = enforceSingleRegionalLanguage(profile);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(sanitized));
  } catch (err) {
    console.error('Failed to save user profile:', err);
  }
}

export function loadAudioBookmarks(): AudioBookmark[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveAudioBookmark(bookmark: AudioBookmark): AudioBookmark[] {
  try {
    const existing = loadAudioBookmarks();
    const updated = [bookmark, ...existing.filter((b) => b.id !== bookmark.id)];
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save bookmark:', err);
    return [];
  }
}

export function deleteAudioBookmark(id: string): AudioBookmark[] {
  try {
    const existing = loadAudioBookmarks();
    const updated = existing.filter((b) => b.id !== id);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

// Today's date string YYYY-MM-DD
export function getTodayKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export function loadImanRecord(dateKey: string = getTodayKey()): ImanDayRecord {
  try {
    const raw = localStorage.getItem(`${IMAN_KEY_PREFIX}${dateKey}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        date: parsed.date || dateKey,
        prayers: {
          fajr: Boolean(parsed.prayers?.fajr),
          dhuhr: Boolean(parsed.prayers?.dhuhr),
          asr: Boolean(parsed.prayers?.asr),
          maghrib: Boolean(parsed.prayers?.maghrib),
          isha: Boolean(parsed.prayers?.isha),
          tahajjud: Boolean(parsed.prayers?.tahajjud),
          duha: Boolean(parsed.prayers?.duha),
        },
        versesRead: Number(parsed.versesRead || 0),
        dhikrCount: Number(parsed.dhikrCount || 0),
        hadithsStudied: Number(parsed.hadithsStudied || 0),
        reflection: parsed.reflection || '',
        heartState: parsed.heartState,
        fasting: parsed.fasting,
        charityDone: parsed.charityDone,
        salawatCount: parsed.salawatCount,
      };
    }
  } catch (err) {
    console.error('Failed to read Iman record:', err);
  }
  return {
    date: dateKey,
    prayers: {
      fajr: false,
      dhuhr: false,
      asr: false,
      maghrib: false,
      isha: false,
      tahajjud: false,
      duha: false,
    },
    versesRead: 0,
    dhikrCount: 0,
    hadithsStudied: 0,
    reflection: '',
  };
}

export function saveImanRecord(record: ImanDayRecord): void {
  try {
    localStorage.setItem(`${IMAN_KEY_PREFIX}${record.date}`, JSON.stringify(record));
  } catch (err) {
    console.error('Failed to save Iman record:', err);
  }
}

/**
 * Calculates current streak (consecutive days with at least 1 prayer or verse read)
 */
export function calculateStreak(): { currentStreak: number; bestStreak: number } {
  let streak = 0;
  let best = 0;
  const today = new Date();

  // Check past 60 days
  for (let i = 0; i < 60; i++) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const rec = loadImanRecord(key);
    const active =
      rec.prayers.fajr ||
      rec.prayers.dhuhr ||
      rec.prayers.asr ||
      rec.prayers.maghrib ||
      rec.prayers.isha ||
      rec.versesRead > 0 ||
      rec.dhikrCount > 0 ||
      (rec.hadithsStudied || 0) > 0;

    if (active) {
      if (i === 0 || streak === i) {
        streak++;
      }
    } else if (i > 0) {
      break;
    }
  }

  try {
    const storedBest = parseInt(localStorage.getItem('annur_best_streak') || '0', 10);
    best = Math.max(streak, storedBest);
    localStorage.setItem('annur_best_streak', String(best));
  } catch {
    best = streak;
  }

  return { currentStreak: streak || 1, bestStreak: Math.max(best, streak || 1) };
}

/**
 * Returns past N days of Iman records (chronological from past to today)
 */
export function getPastDaysImanRecords(daysCount = 14): ImanDayRecord[] {
  const records: ImanDayRecord[] = [];
  const today = new Date();
  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    records.push(loadImanRecord(key));
  }
  return records;
}

/**
 * Records unique Ayahs read today (e.g. "2:255") and returns how many NEW unique Ayahs were added.
 */
export function markAyahsReadToday(surahNumber: number, ayahNumbers: number[]): number {
  if (!ayahNumbers.length) return 0;
  try {
    const key = `annur_read_ayahs_${getTodayKey()}`;
    const raw = localStorage.getItem(key);
    const seen = new Set<string>(raw ? JSON.parse(raw) : []);
    let added = 0;
    for (const num of ayahNumbers) {
      const token = `${surahNumber}:${num}`;
      if (!seen.has(token)) {
        seen.add(token);
        added += 1;
      }
    }
    if (added > 0) {
      localStorage.setItem(key, JSON.stringify(Array.from(seen)));
    }
    return added;
  } catch {
    return ayahNumbers.length;
  }
}

// OFFLINE SURAH & AUDIO CACHING
export function getDownloadedSurahsList(): DownloadedSurahInfo[] {
  try {
    const raw = localStorage.getItem(DOWNLOADS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isSurahOffline(surahNumber: number): boolean {
  const list = getDownloadedSurahsList();
  return list.some((s) => s.surahNumber === surahNumber);
}

export function getOfflineSurahDetail(surahNumber: number): SurahDetail | null {
  try {
    const raw = localStorage.getItem(`${OFFLINE_SURAH_PREFIX}${surahNumber}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Fetches and caches a single audio URL using CORS so cached Blob playback works offline
 * and through Web Audio API clarity filters. Skips if already cached.
 */
export async function cacheAudioUrl(url: string): Promise<boolean> {
  if (typeof window === 'undefined' || !('caches' in window)) return false;
  try {
    const cache = await caches.open(AUDIO_CACHE_NAME);
    const existing = await cache.match(url);
    if (existing) return true;

    const response = await fetch(url, { mode: 'cors', credentials: 'omit' });
    if (!response.ok) return false;
    await cache.put(url, response);
    return true;
  } catch {
    return false;
  }
}

export async function isAudioUrlCached(url: string): Promise<boolean> {
  if (typeof window === 'undefined' || !('caches' in window)) return false;
  try {
    const cache = await caches.open(AUDIO_CACHE_NAME);
    const match = await cache.match(url);
    return Boolean(match);
  } catch {
    return false;
  }
}

/**
 * Background-caches upcoming ayah URLs so seamless offline playback builds automatically.
 */
export async function prefetchAyahAudioBatch(urls: string[]): Promise<void> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) return;
  for (const url of urls) {
    await cacheAudioUrl(url);
  }
}

/**
 * Checks ONLY local CacheStorage for an already-cached MP3 without triggering any network fetch.
 */
export async function getLocalOnlyCachedAudioUrl(url: string): Promise<string | null> {
  if (typeof window === 'undefined' || !('caches' in window)) return null;
  try {
    const cache = await caches.open(AUDIO_CACHE_NAME);
    const match = await cache.match(url);
    if (match) {
      const blob = await match.blob();
      return URL.createObjectURL(blob);
    }
  } catch {
    // ignore
  }
  return null;
}

/**
 * Resolves an audio URL to a local cached Blob Object URL if stored in Cache API,
 * ensuring 100% offline playback even when disconnected.
 * Automatically caches uncached remote URLs in the background when online.
 */
export async function getCachedAudioUrl(url: string): Promise<string> {
  if (!('caches' in window)) return url;
  try {
    const cache = await caches.open(AUDIO_CACHE_NAME);
    const match = await cache.match(url);
    if (match) {
      const blob = await match.blob();
      return URL.createObjectURL(blob);
    }
    // Write-through cache in background so any played ayah becomes permanently available offline
    if (typeof navigator === 'undefined' || navigator.onLine) {
      cacheAudioUrl(url).catch(() => {});
    }
  } catch (err) {
    console.warn('Error fetching audio from cache:', err);
  }
  return url;
}

/**
 * Saves a Surah's text, translations (English, Urdu & Assamese), and precise Tafsir offline,
 * and caches Arabic Qari recitation audio into Cache Storage.
 * (All English & Urdu recitations work 100% built-in offline for all 114 Surahs.)
 */
export async function saveSurahOffline(
  detail: SurahDetail,
  downloadAudio: boolean = false,
  reciterId: string = 'alafasy',
  urduReciterId: string = 'shamshad',
  onProgress?: (current: number, total: number) => void,
  signal?: AbortSignal
): Promise<void> {
  try {
    localStorage.setItem(`${OFFLINE_SURAH_PREFIX}${detail.number}`, JSON.stringify(detail));

    const jsonSize = new Blob([JSON.stringify(detail)]).size;
    let totalSizeKb = Math.round(jsonSize / 1024);

    if (downloadAudio && 'caches' in window) {
      try {
        const { getAyahAudioUrlForLanguage } = await import('../data/reciters');
        const total = detail.ayahs.length; // Arabic Qari MP3s (English & Urdu recitations are 100% built-in offline)
        let done = 0;

        for (const ayah of detail.ayahs) {
          if (signal?.aborted) break;

          // Arabic Qari Audio
          const arUrl = getAyahAudioUrlForLanguage(detail.number, ayah.numberInSurah, 'ar', reciterId, urduReciterId);
          if (await cacheAudioUrl(arUrl)) totalSizeKb += 45;
          done++;
          onProgress?.(done, total);
        }
      } catch (cacheErr) {
        console.warn('Cache API unavailable for audio:', cacheErr);
      }
    }

    const existingList = getDownloadedSurahsList();
    const prevEntry = existingList.find((s) => s.surahNumber === detail.number);
    const list = existingList.filter((s) => s.surahNumber !== detail.number);
    const newEntry: DownloadedSurahInfo = {
      surahNumber: detail.number,
      nameEnglish: detail.nameEnglish,
      nameArabic: detail.nameArabic,
      ayahCount: detail.ayahs.length,
      downloadedAt: new Date().toISOString(),
      sizeKb: Math.max(totalSizeKb, prevEntry?.sizeKb || 0),
      hasAudio: downloadAudio || Boolean(prevEntry?.hasAudio),
    };

    list.unshift(newEntry);
    localStorage.setItem(DOWNLOADS_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save surah offline:', err);
    throw err;
  }
}

/**
 * Removes a Surah and its cached audio files.
 */
export async function deleteOfflineSurah(surahNumber: number): Promise<DownloadedSurahInfo[]> {
  try {
    localStorage.removeItem(`${OFFLINE_SURAH_PREFIX}${surahNumber}`);

    if ('caches' in window) {
      try {
        const cache = await caches.open(AUDIO_CACHE_NAME);
        const sStr = String(surahNumber).padStart(3, '0');
        const keys = await cache.keys();
        for (const req of keys) {
          if (req.url.includes(`/${sStr}`)) {
            await cache.delete(req);
          }
        }
      } catch (cacheErr) {
        console.warn('Error clearing audio cache:', cacheErr);
      }
    }

    const list = getDownloadedSurahsList().filter((s) => s.surahNumber !== surahNumber);
    localStorage.setItem(DOWNLOADS_KEY, JSON.stringify(list));
    return list;
  } catch {
    return getDownloadedSurahsList();
  }
}

/**
 * Returns summary stats of offline storage (text + audio files cached).
 */
export async function getOfflineCacheStats(): Promise<{
  surahsCount: number;
  audioFilesCount: number;
  totalKb: number;
}> {
  const downloaded = getDownloadedSurahsList();
  const surahsCount = downloaded.length;
  let totalKb = downloaded.reduce((acc, s) => acc + s.sizeKb, 0);
  let audioFilesCount = 0;

  if (typeof window !== 'undefined' && 'caches' in window) {
    try {
      const cache = await caches.open(AUDIO_CACHE_NAME);
      const keys = await cache.keys();
      audioFilesCount = keys.length;
      totalKb += audioFilesCount * 45; // ~45KB per ayah audio clip estimate
    } catch (e) {
      console.warn('Error reading audio cache stats:', e);
    }
  }

  return { surahsCount, audioFilesCount, totalKb };
}

/**
 * Downloads/caches all 114 Surahs (Arabic, English, Urdu, Assamese text + complete English Tafsir Ibn Kathir,
 * Assamese Al-Mukhtasar Tafsir & Urdu Tafsir Ibn Kathir) into local device storage for 100% offline access.
 */
export async function downloadAllSurahsTextAndTafsir(
  onProgress?: (info: { current: number; total: number; currentSurahName: string }) => void
): Promise<void> {
  const { fetchSurahDetail } = await import('./quranApi');
  const { preloadSurahTafsirs } = await import('./offlineTafsirStore');
  const { ALL_SURAHS } = await import('../data/surahList');
  const total = ALL_SURAHS.length;

  for (let i = 0; i < total; i++) {
    const meta = ALL_SURAHS[i];
    onProgress?.({ current: i + 1, total, currentSurahName: `${meta.nameEnglish} + Tafsir` });
    try {
      const [detail] = await Promise.all([
        fetchSurahDetail(meta.number),
        preloadSurahTafsirs(meta.number, { includeAssamese: true, includeUrdu: true }),
      ]);
      const currentList = getDownloadedSurahsList();
      const prev = currentList.find((s) => s.surahNumber === meta.number);
      const list = currentList.filter((s) => s.surahNumber !== meta.number);
      list.push({
        surahNumber: meta.number,
        nameEnglish: detail.nameEnglish,
        nameArabic: detail.nameArabic,
        ayahCount: detail.ayahs.length,
        downloadedAt: new Date().toISOString(),
        sizeKb: Math.round(new Blob([JSON.stringify(detail)]).size / 1024),
        hasAudio: Boolean(prev?.hasAudio),
      });
      localStorage.setItem(DOWNLOADS_KEY, JSON.stringify(list));
    } catch (err) {
      console.warn(`Failed caching Surah ${meta.number} & Tafsir for offline:`, err);
    }
  }
}

/**
 * Downloads Arabic Qari recitation audio for core & beloved Surahs:
 * Al-Fatihah (1), Yasin (36), Ar-Rahman (55), Al-Waqi'ah (56), Al-Mulk (67),
 * Al-Ikhlas (112), Al-Falaq (113), An-Nas (114), and any additional favorited Surahs.
 * (English & Urdu recitations are already 100% built-in offline for all 114 Surahs.)
 */
export async function downloadCoreAudioOffline(
  favoriteSurahs: number[] = [],
  reciterId: string = 'alafasy',
  urduReciterId: string = 'shamshad',
  onProgress?: (info: { current: number; total: number; surahName: string; step: string }) => void,
  signal?: AbortSignal
): Promise<void> {
  const { fetchSurahDetail } = await import('./quranApi');
  const coreNumbers = Array.from(new Set([1, 36, 55, 56, 67, 108, 112, 113, 114, ...favoriteSurahs]));
  const totalSurahs = coreNumbers.length;

  for (let idx = 0; idx < totalSurahs; idx++) {
    if (signal?.aborted) break;
    const surahNum = coreNumbers[idx];
    try {
      const detail = await fetchSurahDetail(surahNum);
      onProgress?.({
        current: idx + 1,
        total: totalSurahs,
        surahName: detail.nameEnglish,
        step: `Caching Arabic Qari MP3s for ${detail.nameEnglish}`,
      });
      await saveSurahOffline(detail, true, reciterId, urduReciterId, undefined, signal);
    } catch (err) {
      console.warn(`Failed caching audio for Surah ${surahNum}:`, err);
    }
  }
}

/**
 * Downloads complete Arabic Qari audio (all 114 Surahs) locally.
 * English & Urdu recitations are already 100% built-in offline across all 114 Surahs.
 */
export async function downloadAllQuranAudioOffline(
  reciterId: string = 'alafasy',
  urduReciterId: string = 'shamshad',
  onProgress?: (info: { current: number; total: number; surahName: string; step: string }) => void,
  signal?: AbortSignal
): Promise<void> {
  const { fetchSurahDetail } = await import('./quranApi');
  const { ALL_SURAHS } = await import('../data/surahList');
  const total = ALL_SURAHS.length;

  for (let i = 0; i < total; i++) {
    if (signal?.aborted) break;
    const meta = ALL_SURAHS[i];
    try {
      const detail = await fetchSurahDetail(meta.number);
      onProgress?.({
        current: i + 1,
        total,
        surahName: detail.nameEnglish,
        step: `Caching Surah ${detail.nameEnglish} (${i + 1}/114)`,
      });
      await saveSurahOffline(detail, true, reciterId, urduReciterId, undefined, signal);
    } catch (err) {
      console.warn(`Failed caching complete audio for Surah ${meta.number}:`, err);
    }
  }
}
