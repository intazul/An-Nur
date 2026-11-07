import { AudioBookmark, DownloadedSurahInfo, ImanDayRecord, SurahDetail, UserProfileData } from '../types/quran';

const PROFILE_KEY = 'annur_user_profile_v1';
const BOOKMARKS_KEY = 'annur_audio_bookmarks_v1';
const IMAN_KEY_PREFIX = 'annur_iman_record_';
const DOWNLOADS_KEY = 'annur_downloaded_surahs_meta_v1';
const OFFLINE_SURAH_PREFIX = 'annur_offline_surah_';
const AUDIO_CACHE_NAME = 'annur-quran-audio-v1';

export const DEFAULT_PROFILE: UserProfileData = {
  name: 'Believer',
  dailyVerseGoal: 10,
  preferredReciter: 'alafasy',
  arabicFontSize: 34,
  translationFontSize: 16,
  arabicGlowMode: 'gold',
  glowIntensity: 'subtle',
  calligraphyFont: 'amiri',
  showEnglish: true,
  showUrdu: true,
  showTafsir: false,
  readingLayout: 'cards', // 'cards' | 'paragraph'
  mushafPageMode: 'flip', // 'flip' = horizontal page flip mode like real book
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
  preferredUrduReciter: 'shamshad',
};

export function loadUserProfile(): UserProfileData {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveUserProfile(profile: UserProfileData): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
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
    if (raw) return JSON.parse(raw);
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
      rec.dhikrCount > 0;

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

export async function saveSurahOffline(detail: SurahDetail, downloadAudio: boolean = false): Promise<void> {
  try {
    localStorage.setItem(`${OFFLINE_SURAH_PREFIX}${detail.number}`, JSON.stringify(detail));

    // Calculate approximate size
    const jsonSize = new Blob([JSON.stringify(detail)]).size;
    let totalSizeKb = Math.round(jsonSize / 1024);

    if (downloadAudio && 'caches' in window) {
      try {
        const cache = await caches.open(AUDIO_CACHE_NAME);
        const { getAyahAudioUrl } = await import('../data/reciters');
        for (const ayah of detail.ayahs) {
          const url = getAyahAudioUrl(detail.number, ayah.numberInSurah, 'alafasy');
          try {
            await cache.add(url);
            totalSizeKb += 45; // ~45kb per ayah audio
          } catch (audioErr) {
            console.warn(`Could not cache audio for ${url}`, audioErr);
          }
        }
      } catch (cacheErr) {
        console.warn('Cache API unavailable for audio:', cacheErr);
      }
    }

    const list = getDownloadedSurahsList().filter((s) => s.surahNumber !== detail.number);
    const newEntry: DownloadedSurahInfo = {
      surahNumber: detail.number,
      nameEnglish: detail.nameEnglish,
      nameArabic: detail.nameArabic,
      ayahCount: detail.ayahs.length,
      downloadedAt: new Date().toISOString(),
      sizeKb: totalSizeKb,
      hasAudio: downloadAudio,
    };

    list.unshift(newEntry);
    localStorage.setItem(DOWNLOADS_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save surah offline:', err);
    throw err;
  }
}

export async function deleteOfflineSurah(surahNumber: number): Promise<DownloadedSurahInfo[]> {
  try {
    localStorage.removeItem(`${OFFLINE_SURAH_PREFIX}${surahNumber}`);

    if ('caches' in window) {
      try {
        const cache = await caches.open(AUDIO_CACHE_NAME);
        const { getAyahAudioUrl } = await import('../data/reciters');
        const sStr = String(surahNumber).padStart(3, '0');
        // purge cached audio for this surah
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
