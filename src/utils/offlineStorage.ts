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
  ramadanPreviewMode: false,
  ramadanPreviewDay: 27,
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
  // Always use the dedicated male human Urdu translation reciter (Shamshad Ali Khan)
  normalized.preferredUrduReciter = 'shamshad';
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
const cachedAudioUrlSet = new Set<string>();
let audioCacheWarmed = false;

export async function warmAudioCacheIndex(): Promise<void> {
  if (typeof window === 'undefined' || !('caches' in window)) return;
  try {
    const cache = await caches.open(AUDIO_CACHE_NAME);
    const keys = await cache.keys();
    cachedAudioUrlSet.clear();
    for (const req of keys) {
      cachedAudioUrlSet.add(req.url);
    }
    audioCacheWarmed = true;
  } catch {
    // ignore
  }
}

export function isAudioUrlCachedSync(url: string): boolean {
  return cachedAudioUrlSet.has(url);
}

export function isAudioCacheIndexWarmed(): boolean {
  return audioCacheWarmed;
}

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
 * Frees legacy localStorage Surah blobs once safely persisted in IndexedDB.
 */
function clearLegacySurahFromLocalStorage(surahNumber: number): void {
  try {
    localStorage.removeItem(`${OFFLINE_SURAH_PREFIX}${surahNumber}`);
  } catch {
    // ignore
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
    if (existing) {
      cachedAudioUrlSet.add(url);
      return true;
    }

    const response = await fetch(url, { mode: 'cors', credentials: 'omit' });
    if (!response.ok) return false;
    await cache.put(url, response);
    cachedAudioUrlSet.add(url);
    return true;
  } catch {
    return false;
  }
}

export async function isAudioUrlCached(url: string): Promise<boolean> {
  if (cachedAudioUrlSet.has(url)) return true;
  if (typeof window === 'undefined' || !('caches' in window)) return false;
  try {
    const cache = await caches.open(AUDIO_CACHE_NAME);
    const match = await cache.match(url);
    if (match) {
      cachedAudioUrlSet.add(url);
      return true;
    }
    return false;
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
      cachedAudioUrlSet.add(url);
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
      cachedAudioUrlSet.add(url);
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
 * Saves a Surah's text, translations (English, Urdu & Assamese), and precise Tafsir in IndexedDB
 * (no 5MB localStorage limit), and optionally caches Arabic Qari + English + Urdu MP3s into CacheStorage.
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
    const { saveSurahToIdb } = await import('./offlineQuranStore');
    await saveSurahToIdb(detail);
    clearLegacySurahFromLocalStorage(detail.number);

    const jsonSize = new Blob([JSON.stringify(detail)]).size;
    let totalSizeKb = Math.round(jsonSize / 1024);

    if (downloadAudio && 'caches' in window) {
      try {
        const { getAyahAudioUrlForLanguage } = await import('../data/reciters');
        const urlsToCache: string[] = [];
        for (const ayah of detail.ayahs) {
          urlsToCache.push(
            getAyahAudioUrlForLanguage(detail.number, ayah.numberInSurah, 'ar', reciterId, urduReciterId),
            getAyahAudioUrlForLanguage(detail.number, ayah.numberInSurah, 'en', reciterId, urduReciterId),
            getAyahAudioUrlForLanguage(detail.number, ayah.numberInSurah, 'ur', reciterId, urduReciterId)
          );
        }

        const total = detail.ayahs.length;
        let completedAyahs = 0;
        const CONCURRENCY = 6;

        for (let i = 0; i < urlsToCache.length; i += CONCURRENCY) {
          if (signal?.aborted) break;
          const chunk = urlsToCache.slice(i, i + CONCURRENCY);
          const results = await Promise.all(chunk.map((u) => cacheAudioUrl(u)));
          const cachedCount = results.filter(Boolean).length;
          totalSizeKb += cachedCount * 45;
          completedAyahs = Math.min(total, Math.floor((i + chunk.length) / 3));
          onProgress?.(completedAyahs, total);
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
 * Syncs lightweight offline metadata list with Surahs already stored in IndexedDB.
 */
export async function syncAllSurahsMetadataWithIdb(): Promise<DownloadedSurahInfo[]> {
  try {
    const { getAllIdbSurahNumbers, getSurahFromIdb } = await import('./offlineQuranStore');
    const { ALL_SURAHS } = await import('../data/surahList');
    const storedNums = await getAllIdbSurahNumbers();
    const storedSet = new Set(storedNums);
    const existingList = getDownloadedSurahsList();
    const existingMap = new Map(existingList.map((s) => [s.surahNumber, s]));
    const nowIso = new Date().toISOString();

    const updated: DownloadedSurahInfo[] = [];
    for (const meta of ALL_SURAHS) {
      const prev = existingMap.get(meta.number);
      if (storedSet.has(meta.number) || prev) {
        let sizeKb = prev?.sizeKb || 55;
        if (!prev) {
          const detail = await getSurahFromIdb(meta.number);
          if (detail) {
            sizeKb = Math.max(2, Math.round(new Blob([JSON.stringify(detail)]).size / 1024));
          }
        }
        updated.push({
          surahNumber: meta.number,
          nameEnglish: prev?.nameEnglish || meta.nameEnglish,
          nameArabic: prev?.nameArabic || meta.nameArabic,
          ayahCount: prev?.ayahCount || meta.numberOfAyahs,
          downloadedAt: prev?.downloadedAt || nowIso,
          sizeKb,
          hasAudio: Boolean(prev?.hasAudio),
        });
      }
    }

    localStorage.setItem(DOWNLOADS_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return getDownloadedSurahsList();
  }
}

/**
 * Removes a Surah and its cached audio files.
 */
export async function deleteOfflineSurah(surahNumber: number): Promise<DownloadedSurahInfo[]> {
  try {
    clearLegacySurahFromLocalStorage(surahNumber);
    const { deleteSurahFromIdb } = await import('./offlineQuranStore');
    await deleteSurahFromIdb(surahNumber);

    if ('caches' in window) {
      try {
        const cache = await caches.open(AUDIO_CACHE_NAME);
        const sStr = String(surahNumber).padStart(3, '0');
        const keys = await cache.keys();
        for (const req of keys) {
          if (req.url.includes(`/${sStr}`)) {
            await cache.delete(req);
            cachedAudioUrlSet.delete(req.url);
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
 * Returns summary stats of offline storage (IndexedDB Surahs + cached audio clips).
 */
export async function getOfflineCacheStats(): Promise<{
  surahsCount: number;
  audioFilesCount: number;
  totalKb: number;
}> {
  const downloaded = getDownloadedSurahsList();
  let idbCount = downloaded.length;
  try {
    const { getIdbSurahCount } = await import('./offlineQuranStore');
    idbCount = Math.max(idbCount, await getIdbSurahCount());
  } catch {
    // ignore
  }
  const surahsCount = idbCount;
  let totalKb = downloaded.reduce((acc, s) => acc + s.sizeKb, 0);
  if (totalKb === 0 && idbCount > 0) {
    totalKb = idbCount * 58;
  }
  let audioFilesCount = 0;

  if (typeof window !== 'undefined' && 'caches' in window) {
    try {
      const cache = await caches.open(AUDIO_CACHE_NAME);
      const keys = await cache.keys();
      audioFilesCount = keys.length;
      totalKb += audioFilesCount * 45;
    } catch (e) {
      console.warn('Error reading audio cache stats:', e);
    }
  }

  return { surahsCount, audioFilesCount, totalKb };
}

/**
 * Downloads/caches all 114 Surahs (Arabic, English, Urdu, Assamese text + complete English Tafsir Ibn Kathir,
 * Assamese Al-Mukhtasar Tafsir & Urdu Tafsir Ibn Kathir) into IndexedDB for 100% offline reading.
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
      await saveSurahOffline(detail, false);
    } catch (err) {
      console.warn(`Failed caching Surah ${meta.number} & Tafsir for offline:`, err);
    }
  }
}

/**
 * Downloads Arabic Qari + English + Urdu MP3 recitations for core & beloved Surahs:
 * Al-Fatihah (1), Yasin (36), Ar-Rahman (55), Al-Waqi'ah (56), Al-Mulk (67),
 * Al-Ikhlas (112), Al-Falaq (113), An-Nas (114), and any additional favorited Surahs.
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
        step: `Caching Arabic + En + Ur audio for ${detail.nameEnglish}`,
      });
      await saveSurahOffline(detail, true, reciterId, urduReciterId, undefined, signal);
    } catch (err) {
      console.warn(`Failed caching audio for Surah ${surahNum}:`, err);
    }
  }
}

/**
 * Downloads complete Arabic Qari + English + Urdu MP3 audio (all 114 Surahs) into CacheStorage.
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
        step: `Caching ${detail.nameEnglish} (Ar + En + Ur) (${i + 1}/114)`,
      });
      await saveSurahOffline(detail, true, reciterId, urduReciterId, undefined, signal);
    } catch (err) {
      console.warn(`Failed caching complete audio for Surah ${meta.number}:`, err);
    }
  }
}

export const TOTAL_QURAN_AYAHS = 6236;
const SHAMSHAD_SUBFOLDER = 'translations/urdu_shamshad_ali_khan_46kbps';

export interface UrduAudioSyncProgress {
  cachedCount: number;
  totalCount: number;
  completedSurahsCount: number;
  percent: number;
  isComplete: boolean;
  currentSurahName?: string;
}

/**
 * Synchronously checks if every Ayah MP3 for a Surah's male Urdu translation recitation
 * (Shamshad Ali Khan) is already stored in CacheStorage.
 */
export function isSurahUrduAudioOfflineSync(
  surahNumber: number,
  ayahCount: number
): boolean {
  if (!audioCacheWarmed || ayahCount <= 0) return false;
  const sStr = String(surahNumber).padStart(3, '0');
  for (let a = 1; a <= ayahCount; a++) {
    const aStr = String(a).padStart(3, '0');
    const url = `https://everyayah.com/data/${SHAMSHAD_SUBFOLDER}/${sStr}${aStr}.mp3`;
    if (!cachedAudioUrlSet.has(url)) {
      return false;
    }
  }
  return true;
}

/**
 * Computes live offline cache progress for Shamshad Ali Khan (male Urdu translation MP3s) across all 114 Surahs.
 */
export async function getUrduAudioCacheProgress(): Promise<UrduAudioSyncProgress> {
  if (!audioCacheWarmed) {
    await warmAudioCacheIndex();
  }
  const { ALL_SURAHS } = await import('../data/surahList');
  let cachedCount = 0;
  let completedSurahsCount = 0;

  for (const meta of ALL_SURAHS) {
    const sStr = String(meta.number).padStart(3, '0');
    let surahCached = 0;
    for (let a = 1; a <= meta.numberOfAyahs; a++) {
      const aStr = String(a).padStart(3, '0');
      const url = `https://everyayah.com/data/${SHAMSHAD_SUBFOLDER}/${sStr}${aStr}.mp3`;
      if (cachedAudioUrlSet.has(url)) {
        surahCached++;
      }
    }
    cachedCount += surahCached;
    if (surahCached === meta.numberOfAyahs) {
      completedSurahsCount++;
    }
  }

  const percent = Math.min(100, Math.round((cachedCount / TOTAL_QURAN_AYAHS) * 100));
  return {
    cachedCount,
    totalCount: TOTAL_QURAN_AYAHS,
    completedSurahsCount,
    percent,
    isComplete: cachedCount >= TOTAL_QURAN_AYAHS,
  };
}

/**
 * Caches every Ayah MP3 for a specific Surah using Shamshad Ali Khan (male human Urdu reciter).
 * Skips any verses already present in CacheStorage.
 */
export async function cacheSurahUrduAudio(
  surahNumber: number,
  ayahCount: number,
  signal?: AbortSignal,
  concurrency: number = 4
): Promise<boolean> {
  if (typeof window === 'undefined' || !('caches' in window)) return false;
  if (typeof navigator !== 'undefined' && !navigator.onLine) return false;

  if (!audioCacheWarmed) {
    await warmAudioCacheIndex();
  }

  const sStr = String(surahNumber).padStart(3, '0');
  const uncachedUrls: string[] = [];
  for (let a = 1; a <= ayahCount; a++) {
    const aStr = String(a).padStart(3, '0');
    const url = `https://everyayah.com/data/${SHAMSHAD_SUBFOLDER}/${sStr}${aStr}.mp3`;
    if (!cachedAudioUrlSet.has(url)) {
      uncachedUrls.push(url);
    }
  }

  if (uncachedUrls.length === 0) return true;

  for (let i = 0; i < uncachedUrls.length; i += concurrency) {
    if (signal?.aborted) return false;
    if (typeof navigator !== 'undefined' && !navigator.onLine) return false;
    const chunk = uncachedUrls.slice(i, i + concurrency);
    await Promise.all(chunk.map((u) => cacheAudioUrl(u)));
  }

  return uncachedUrls.every((u) => cachedAudioUrlSet.has(u));
}

/**
 * Downloads/caches ALL 114 Surahs (6,236 verses) of Shamshad Ali Khan male Urdu translation MP3s
 * into persistent CacheStorage, prioritizing active/favorite/core Surahs first.
 */
export async function downloadAllUrduAudioOffline(
  prioritySurahs: number[] = [],
  onProgress?: (info: UrduAudioSyncProgress) => void,
  signal?: AbortSignal,
  concurrency: number = 6
): Promise<UrduAudioSyncProgress> {
  if (!audioCacheWarmed) {
    await warmAudioCacheIndex();
  }

  const { ALL_SURAHS } = await import('../data/surahList');
  const orderedNumbers = Array.from(
    new Set([
      ...prioritySurahs.filter((n) => n >= 1 && n <= 114),
      1, 36, 55, 56, 67, 108, 112, 113, 114,
      ...ALL_SURAHS.map((s) => s.number),
    ])
  );

  let initial = await getUrduAudioCacheProgress();
  onProgress?.(initial);
  if (initial.isComplete) return initial;

  for (const surahNum of orderedNumbers) {
    if (signal?.aborted) break;
    if (typeof navigator !== 'undefined' && !navigator.onLine) break;
    const meta = ALL_SURAHS.find((s) => s.number === surahNum);
    if (!meta) continue;

    if (isSurahUrduAudioOfflineSync(meta.number, meta.numberOfAyahs)) {
      continue;
    }

    await cacheSurahUrduAudio(meta.number, meta.numberOfAyahs, signal, concurrency);
    const snap = await getUrduAudioCacheProgress();
    onProgress?.({ ...snap, currentSurahName: meta.nameEnglish });
  }

  const finalSnap = await getUrduAudioCacheProgress();
  onProgress?.(finalSnap);
  return finalSnap;
}

let backgroundUrduSyncPromise: Promise<void> | null = null;
const urduProgressListeners = new Set<(info: UrduAudioSyncProgress) => void>();

export function subscribeUrduAudioProgress(
  listener: (info: UrduAudioSyncProgress) => void
): () => void {
  urduProgressListeners.add(listener);
  return () => {
    urduProgressListeners.delete(listener);
  };
}

function emitUrduAudioProgress(info: UrduAudioSyncProgress): void {
  urduProgressListeners.forEach((fn) => {
    try {
      fn(info);
    } catch {
      // ignore
    }
  });
}

/**
 * Starts a non-blocking, resumable background sync of all 6,236 Shamshad Ali Khan Urdu MP3s.
 * Already cached MP3s are skipped instantaneously; pauses gracefully if offline.
 */
export function ensureBackgroundUrduAudioSync(
  prioritySurahs: number[] = []
): Promise<void> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return Promise.resolve();
  }
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return Promise.resolve();
  }
  if (backgroundUrduSyncPromise) {
    return backgroundUrduSyncPromise;
  }

  backgroundUrduSyncPromise = (async () => {
    try {
      await downloadAllUrduAudioOffline(
        prioritySurahs,
        (info) => emitUrduAudioProgress(info),
        undefined,
        3
      );
    } finally {
      backgroundUrduSyncPromise = null;
    }
  })();

  return backgroundUrduSyncPromise;
}
