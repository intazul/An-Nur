export type TafsirEdition = 'en' | 'as' | 'ur';

interface CompactTafsirFile {
  s: number; // Surah number 1..114
  p: string[]; // Deduplicated tafsir passages
  a: Record<string, number>; // Ayah number -> index into p
}

const DB_NAME = 'annur_offline_tafsir_v1';
const DB_VERSION = 1;
const STORE_TAFSIR = 'tafsir_surahs';

// Memory cache key: `${edition}:${surahNumber}`
const memoryCache = new Map<string, CompactTafsirFile>();
const inflightRequests = new Map<string, Promise<CompactTafsirFile | null>>();

function getEndpointForEdition(edition: TafsirEdition, surahNumber: number): string {
  if (edition === 'as') return `/data/tafsir-as/${surahNumber}.json`;
  if (edition === 'ur') return `/data/tafsir-ur/${surahNumber}.json`;
  return `/data/tafsir/${surahNumber}.json`;
}

function openTafsirDb(): Promise<IDBDatabase | null> {
  if (typeof window === 'undefined' || !('indexedDB' in window)) {
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    try {
      const req = window.indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE_TAFSIR)) {
          db.createObjectStore(STORE_TAFSIR);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function readFromIdb(key: string): Promise<CompactTafsirFile | null> {
  const db = await openTafsirDb();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_TAFSIR, 'readonly');
      const store = tx.objectStore(STORE_TAFSIR);
      const req = store.get(key);
      req.onsuccess = () => resolve((req.result as CompactTafsirFile) || null);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function writeToIdb(key: string, payload: CompactTafsirFile): Promise<void> {
  const db = await openTafsirDb();
  if (!db) return;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_TAFSIR, 'readwrite');
      const store = tx.objectStore(STORE_TAFSIR);
      store.put(payload, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

async function loadSurahTafsirCompact(
  surahNumber: number,
  edition: TafsirEdition
): Promise<CompactTafsirFile | null> {
  const key = `${edition}:${surahNumber}`;
  const inMem = memoryCache.get(key);
  if (inMem) return inMem;

  const existingPromise = inflightRequests.get(key);
  if (existingPromise) return existingPromise;

  const promise = (async () => {
    try {
      const fromIdb = await readFromIdb(key);
      if (fromIdb && Array.isArray(fromIdb.p) && fromIdb.a) {
        memoryCache.set(key, fromIdb);
        return fromIdb;
      }

      const url = getEndpointForEdition(edition, surahNumber);
      const res = await fetch(url);
      if (!res.ok) return null;
      const data = (await res.json()) as CompactTafsirFile;
      if (!data || !Array.isArray(data.p) || !data.a) return null;

      memoryCache.set(key, data);
      writeToIdb(key, data).catch(() => {});
      return data;
    } catch {
      return null;
    } finally {
      inflightRequests.delete(key);
    }
  })();

  inflightRequests.set(key, promise);
  return promise;
}

/**
 * Synchronous memory lookup (instant when a Surah has already been preloaded).
 */
export function getCachedVerseTafsirSync(
  surahNumber: number,
  ayahNumber: number,
  edition: TafsirEdition
): string | null {
  const entry = memoryCache.get(`${edition}:${surahNumber}`);
  if (!entry) return null;
  const idx = entry.a[String(ayahNumber)];
  if (idx === undefined) return null;
  return entry.p[idx] || null;
}

/**
 * Asynchronous offline-first lookup for a single Ayah's complete Tafsir text
 * (EN = Tafsir Ibn Kathir, AS = Assamese Al-Mukhtasar, UR = Urdu Tafsir Ibn Kathir).
 */
export async function getVerseTafsirOffline(
  surahNumber: number,
  ayahNumber: number,
  edition: TafsirEdition
): Promise<string | null> {
  const compact = await loadSurahTafsirCompact(surahNumber, edition);
  if (!compact) return null;
  const idx = compact.a[String(ayahNumber)];
  if (idx === undefined) return null;
  return compact.p[idx] || null;
}

/**
 * Preloads English Ibn Kathir plus active regional edition for a Surah into memory and IndexedDB.
 */
export async function preloadSurahTafsirs(
  surahNumber: number,
  options?: { includeUrdu?: boolean; includeAssamese?: boolean }
): Promise<void> {
  const tasks: Promise<unknown>[] = [loadSurahTafsirCompact(surahNumber, 'en')];
  if (options?.includeAssamese) {
    tasks.push(loadSurahTafsirCompact(surahNumber, 'as'));
  }
  if (options?.includeUrdu) {
    tasks.push(loadSurahTafsirCompact(surahNumber, 'ur'));
  }
  await Promise.all(tasks);
}

/**
 * Pre-hydrates all 114 Surahs of Tafsir (English Ibn Kathir + Assamese Al-Mukhtasar + Urdu Ibn Kathir)
 * from local static files into IndexedDB for 100% offline availability across the entire Quran.
 */
export async function cacheAllTafsirsOffline(
  onProgress?: (info: { current: number; total: number; surahNumber: number }) => void
): Promise<void> {
  const total = 114;
  for (let s = 1; s <= total; s++) {
    await Promise.all([
      loadSurahTafsirCompact(s, 'en'),
      loadSurahTafsirCompact(s, 'as'),
      loadSurahTafsirCompact(s, 'ur'),
    ]);
    onProgress?.({ current: s, total, surahNumber: s });
  }
}

let bulkTafsirSyncPromise: Promise<void> | null = null;

/**
 * Silently batch-hydrates missing Tafsirs (Urdu Ibn Kathir, English Ibn Kathir, Assamese Al-Mukhtasar)
 * across all 114 Surahs into IndexedDB without re-fetching already stored entries.
 */
export async function ensureAllTafsirsOffline(
  editions: TafsirEdition[] = ['ur', 'en', 'as']
): Promise<void> {
  if (bulkTafsirSyncPromise) return bulkTafsirSyncPromise;

  bulkTafsirSyncPromise = (async () => {
    try {
      const existingKeys = new Set<string>();
      const db = await openTafsirDb();
      if (db) {
        await new Promise<void>((resolve) => {
          try {
            const tx = db.transaction(STORE_TAFSIR, 'readonly');
            const req = tx.objectStore(STORE_TAFSIR).getAllKeys();
            req.onsuccess = () => {
              if (Array.isArray(req.result)) {
                req.result.forEach((k) => existingKeys.add(String(k)));
              }
              resolve();
            };
            req.onerror = () => resolve();
          } catch {
            resolve();
          }
        });
      }

      const missingSurahs: number[] = [];
      for (let s = 1; s <= 114; s++) {
        const needsAny = editions.some((ed) => !existingKeys.has(`${ed}:${s}`));
        if (needsAny) missingSurahs.push(s);
      }

      if (missingSurahs.length === 0) return;

      const BATCH_SIZE = 6;
      for (let i = 0; i < missingSurahs.length; i += BATCH_SIZE) {
        const batch = missingSurahs.slice(i, i + BATCH_SIZE);
        await Promise.all(
          batch.map((s) =>
            Promise.all(
              editions
                .filter((ed) => !existingKeys.has(`${ed}:${s}`))
                .map((ed) => loadSurahTafsirCompact(s, ed).catch(() => null))
            )
          )
        );
      }
    } finally {
      bulkTafsirSyncPromise = null;
    }
  })();

  return bulkTafsirSyncPromise;
}

export async function getOfflineTafsirCount(): Promise<number> {
  const db = await openTafsirDb();
  if (!db) return memoryCache.size;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_TAFSIR, 'readonly');
      const store = tx.objectStore(STORE_TAFSIR);
      const req = store.getAllKeys();
      req.onsuccess = () => {
        const keys = Array.isArray(req.result) ? req.result : [];
        const enSurahs = keys.filter((k) => typeof k === 'string' && k.startsWith('en:')).length;
        resolve(enSurahs);
      };
      req.onerror = () => resolve(0);
    } catch {
      resolve(0);
    }
  });
}
