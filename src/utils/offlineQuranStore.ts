import { ALL_SURAHS } from '../data/surahList';
import { SurahDetail } from '../types/quran';

const DB_NAME = 'annur_offline_quran_v1';
const DB_VERSION = 1;
const STORE_QURAN = 'quran_surahs';

const memorySurahCache = new Map<number, SurahDetail>();
const inflightLoads = new Map<number, Promise<SurahDetail | null>>();
let bulkHydrationPromise: Promise<number> | null = null;

function openQuranDb(): Promise<IDBDatabase | null> {
  if (typeof window === 'undefined' || !('indexedDB' in window)) {
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    try {
      const req = window.indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE_QURAN)) {
          db.createObjectStore(STORE_QURAN);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

export function getCachedSurahSync(surahNumber: number): SurahDetail | null {
  return memorySurahCache.get(surahNumber) || null;
}

export function getAllCachedSurahsSync(): SurahDetail[] {
  return Array.from(memorySurahCache.values()).sort((a, b) => a.number - b.number);
}

export async function getSurahFromIdb(surahNumber: number): Promise<SurahDetail | null> {
  const inMem = memorySurahCache.get(surahNumber);
  if (inMem) return inMem;

  const existing = inflightLoads.get(surahNumber);
  if (existing) return existing;

  const promise = (async () => {
    const db = await openQuranDb();
    if (!db) return null;
    return new Promise<SurahDetail | null>((resolve) => {
      try {
        const tx = db.transaction(STORE_QURAN, 'readonly');
        const store = tx.objectStore(STORE_QURAN);
        const req = store.get(surahNumber);
        req.onsuccess = () => {
          const val = (req.result as SurahDetail) || null;
          if (val && Array.isArray(val.ayahs) && val.ayahs.length > 0) {
            memorySurahCache.set(surahNumber, val);
            resolve(val);
          } else {
            resolve(null);
          }
        };
        req.onerror = () => resolve(null);
      } catch {
        resolve(null);
      }
    });
  })();

  inflightLoads.set(surahNumber, promise);
  try {
    return await promise;
  } finally {
    inflightLoads.delete(surahNumber);
  }
}

export async function saveSurahToIdb(detail: SurahDetail): Promise<void> {
  if (!detail || !detail.number || !Array.isArray(detail.ayahs) || detail.ayahs.length === 0) {
    return;
  }
  memorySurahCache.set(detail.number, detail);
  const db = await openQuranDb();
  if (!db) return;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_QURAN, 'readwrite');
      const store = tx.objectStore(STORE_QURAN);
      store.put(detail, detail.number);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

export async function deleteSurahFromIdb(surahNumber: number): Promise<void> {
  memorySurahCache.delete(surahNumber);
  const db = await openQuranDb();
  if (!db) return;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_QURAN, 'readwrite');
      const store = tx.objectStore(STORE_QURAN);
      store.delete(surahNumber);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

export async function getAllIdbSurahNumbers(): Promise<number[]> {
  const db = await openQuranDb();
  if (!db) return Array.from(memorySurahCache.keys());

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_QURAN, 'readonly');
      const store = tx.objectStore(STORE_QURAN);
      const req = store.getAllKeys();
      req.onsuccess = () => {
        const keys = Array.isArray(req.result)
          ? req.result.map((k) => Number(k)).filter((n) => Number.isFinite(n) && n >= 1 && n <= 114)
          : [];
        resolve(keys);
      };
      req.onerror = () => resolve(Array.from(memorySurahCache.keys()));
    } catch {
      resolve(Array.from(memorySurahCache.keys()));
    }
  });
}

export async function getIdbSurahCount(): Promise<number> {
  const keys = await getAllIdbSurahNumbers();
  return keys.length;
}

/**
 * Hydrates all 114 Surahs (Arabic + English + Urdu + Assamese) from bundled static JSON
 * into IndexedDB and memory cache so reading and offline translation recitation work 100%
 * offline across the entire Quran without ever hitting localStorage 5MB quota limits.
 */
export async function ensureAllQuranTextsOffline(
  onProgress?: (current: number, total: number) => void
): Promise<number> {
  if (bulkHydrationPromise) {
    return bulkHydrationPromise;
  }

  bulkHydrationPromise = (async () => {
    try {
      const existingNums = new Set<number>(await getAllIdbSurahNumbers());
      const total = ALL_SURAHS.length;
      const missing: number[] = [];

      for (const s of ALL_SURAHS) {
        if (!existingNums.has(s.number)) {
          missing.push(s.number);
        }
      }

      if (missing.length === 0) {
        onProgress?.(total, total);
        return total;
      }

      let savedCount = existingNums.size;
      const BATCH_SIZE = 6;

      for (let i = 0; i < missing.length; i += BATCH_SIZE) {
        const batch = missing.slice(i, i + BATCH_SIZE);
        await Promise.all(
          batch.map(async (surahNum) => {
            try {
              const res = await fetch(`/data/quran/${surahNum}.json`);
              if (!res.ok) return;
              const detail = (await res.json()) as SurahDetail;
              if (detail && Array.isArray(detail.ayahs) && detail.ayahs.length > 0) {
                await saveSurahToIdb(detail);
                savedCount += 1;
              }
            } catch {
              // Offline or transient read failure; skip cleanly without blocking remaining batches
            }
          })
        );
        onProgress?.(Math.min(total, savedCount), total);
      }

      return await getIdbSurahCount();
    } finally {
      bulkHydrationPromise = null;
    }
  })();

  return bulkHydrationPromise;
}
