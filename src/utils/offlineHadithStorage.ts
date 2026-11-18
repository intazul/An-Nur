import { SahihHadithItem } from '../types/hadith';
import { ALL_SAHIH_HADITHS } from '../data/sahihHadiths';
import { getTodayKey } from './offlineStorage';

const HADITHS_STORAGE_KEY = 'annur_offline_hadiths_v2';
const HADITH_BOOKMARKS_KEY = 'annur_offline_hadith_bookmarks';
const HADITH_LEARNED_KEY = 'annur_hadith_learned_v1';
const HADITH_LAST_LESSON_KEY = 'annur_hadith_last_lesson_v1';

/**
 * Initialize and verify offline storage for all Hadiths.
 * Ensures all included Hadith collections are cached and available 100% offline.
 */
export function initializeOfflineHadiths(): SahihHadithItem[] {
  try {
    const existing = localStorage.getItem(HADITHS_STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(HADITHS_STORAGE_KEY, JSON.stringify(ALL_SAHIH_HADITHS));
      return ALL_SAHIH_HADITHS;
    }
    const parsed = JSON.parse(existing);
    // If dataset was expanded, update local cache seamlessly
    if (Array.isArray(parsed) && parsed.length < ALL_SAHIH_HADITHS.length) {
      localStorage.setItem(HADITHS_STORAGE_KEY, JSON.stringify(ALL_SAHIH_HADITHS));
      return ALL_SAHIH_HADITHS;
    }
    return parsed;
  } catch (err) {
    console.warn('Offline Hadith storage error, using memory fallback:', err);
    return ALL_SAHIH_HADITHS;
  }
}

/**
 * Get all Hadiths belonging to a particular book from offline storage.
 */
export function getOfflineHadithsByBook(bookId: string): SahihHadithItem[] {
  const all = initializeOfflineHadiths();
  return all.filter((h) => h.collectionId === bookId);
}

/**
 * Search all offline Hadiths across all books by keywords, narrator, reference, or text.
 */
export function searchOfflineHadiths(query: string, bookId?: string): SahihHadithItem[] {
  const all = initializeOfflineHadiths();
  const q = query.toLowerCase().trim();
  if (!q) {
    return bookId ? all.filter((h) => h.collectionId === bookId) : all;
  }

  return all.filter((h) => {
    const matchBook = !bookId || h.collectionId === bookId;
    const matchQuery =
      h.textEnglish.toLowerCase().includes(q) ||
      h.textArabic.includes(q) ||
      h.narrator.toLowerCase().includes(q) ||
      h.reference.toLowerCase().includes(q) ||
      h.question.toLowerCase().includes(q);
    return matchBook && matchQuery;
  });
}

/**
 * Bookmark a Hadith offline
 */
export function toggleHadithBookmark(hadithId: string): boolean {
  try {
    const existing = localStorage.getItem(HADITH_BOOKMARKS_KEY);
    const bookmarks: string[] = existing ? JSON.parse(existing) : [];
    const index = bookmarks.indexOf(hadithId);
    let isBookmarked = false;
    if (index > -1) {
      bookmarks.splice(index, 1);
      isBookmarked = false;
    } else {
      bookmarks.push(hadithId);
      isBookmarked = true;
    }
    localStorage.setItem(HADITH_BOOKMARKS_KEY, JSON.stringify(bookmarks));
    return isBookmarked;
  } catch {
    return false;
  }
}

/**
 * Check if a Hadith is bookmarked offline
 */
export function isHadithBookmarked(hadithId: string): boolean {
  try {
    const existing = localStorage.getItem(HADITH_BOOKMARKS_KEY);
    if (!existing) return false;
    const bookmarks: string[] = JSON.parse(existing);
    return bookmarks.includes(hadithId);
  } catch {
    return false;
  }
}

/**
 * Get all Hadith IDs marked as learned/remembered permanently
 */
export function getLearnedHadithIds(): string[] {
  try {
    const raw = localStorage.getItem(HADITH_LEARNED_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Mark a Hadith as learned permanently, AND record whether it is newly studied today
 * so today's Iman Level gets credited accurately without inflating from repeated taps.
 */
export function markHadithLearned(hadithId: string): {
  learnedIds: string[];
  isNewToday: boolean;
} {
  let learnedIds = getLearnedHadithIds();
  if (!learnedIds.includes(hadithId)) {
    learnedIds = [...learnedIds, hadithId];
    try {
      localStorage.setItem(HADITH_LEARNED_KEY, JSON.stringify(learnedIds));
    } catch {
      // ignore storage quota errors
    }
  }

  let isNewToday = false;
  try {
    const todayKey = `annur_hadith_studied_today_${getTodayKey()}`;
    const rawToday = localStorage.getItem(todayKey);
    const studiedToday: string[] = rawToday ? JSON.parse(rawToday) : [];
    if (!studiedToday.includes(hadithId)) {
      studiedToday.push(hadithId);
      localStorage.setItem(todayKey, JSON.stringify(studiedToday));
      isNewToday = true;
    }
  } catch {
    isNewToday = true;
  }

  return { learnedIds, isNewToday };
}

/**
 * Unmark a Hadith from permanent learned state (if learner wants to review again)
 */
export function unmarkHadithLearned(hadithId: string): string[] {
  const learnedIds = getLearnedHadithIds().filter((id) => id !== hadithId);
  try {
    localStorage.setItem(HADITH_LEARNED_KEY, JSON.stringify(learnedIds));
  } catch {
    // ignore
  }
  return learnedIds;
}

export interface LastHadithLessonPosition {
  topicId: string;
  lessonIndex: number;
}

export function loadLastHadithLesson(): LastHadithLessonPosition | null {
  try {
    const raw = localStorage.getItem(HADITH_LAST_LESSON_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveLastHadithLesson(pos: LastHadithLessonPosition): void {
  try {
    localStorage.setItem(HADITH_LAST_LESSON_KEY, JSON.stringify(pos));
  } catch {
    // ignore
  }
}

/**
 * Get total count of offline stored Hadiths
 */
export function getTotalOfflineHadithsCount(): number {
  return ALL_SAHIH_HADITHS.length;
}
