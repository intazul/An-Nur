export interface OfflineBackupPayload {
  app: string;
  version: number;
  exportedAt: string;
  data: Record<string, string>;
}

export type HifzStatus = 'new' | 'learning' | 'review_due' | 'mastered';

export interface HifzSurahRecord {
  surahNumber: number;
  status: HifzStatus;
  memorizedAyahs: number;
  lastReviewedAt: string;
}

export type HifzProgressMap = Record<number, HifzSurahRecord>;

const HIFZ_STORAGE_KEY = 'annur_hifz_progress';
const FRIDAY_SALAWAT_KEY = 'annur_friday_salawat';

export function buildOfflineBackupPayload(): OfflineBackupPayload {
  const data: Record<string, string> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('annur_')) {
      const val = localStorage.getItem(key);
      if (val !== null) {
        data[key] = val;
      }
    }
  }
  return {
    app: 'An-Nur Quran & Sunnah Companion',
    version: 1,
    exportedAt: new Date().toISOString(),
    data,
  };
}

export function exportOfflineBackupJson(): { keyCount: number; fileName: string } {
  const payload = buildOfflineBackupPayload();
  const keyCount = Object.keys(payload.data).length;
  const datePart = new Date().toISOString().slice(0, 10);
  const fileName = `annur-offline-backup-${datePart}.json`;
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
  return { keyCount, fileName };
}

export function importOfflineBackupJson(rawText: string): {
  restoredKeys: number;
  exportedAt?: string;
} {
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new Error('Invalid JSON file. Please choose a valid An-Nur backup (.json).');
  }

  if (
    !parsed ||
    typeof parsed !== 'object' ||
    !('data' in parsed) ||
    typeof (parsed as OfflineBackupPayload).data !== 'object' ||
    (parsed as OfflineBackupPayload).data === null
  ) {
    throw new Error('Backup format not recognized. Expected An-Nur backup file.');
  }

  const payload = parsed as OfflineBackupPayload;
  let restoredKeys = 0;

  for (const [key, value] of Object.entries(payload.data)) {
    if (key.startsWith('annur_') && typeof value === 'string') {
      localStorage.setItem(key, value);
      restoredKeys += 1;
    }
  }

  if (restoredKeys === 0) {
    throw new Error('No An-Nur records found inside this backup file.');
  }

  return {
    restoredKeys,
    exportedAt: typeof payload.exportedAt === 'string' ? payload.exportedAt : undefined,
  };
}

export function loadHifzProgress(): HifzProgressMap {
  try {
    const raw = localStorage.getItem(HIFZ_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as HifzProgressMap) : {};
  } catch {
    return {};
  }
}

export function saveHifzProgress(map: HifzProgressMap): void {
  try {
    localStorage.setItem(HIFZ_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore storage quota failures
  }
}

export function updateSurahHifzRecord(
  surahNumber: number,
  status: HifzStatus,
  memorizedAyahs?: number
): HifzProgressMap {
  const current = loadHifzProgress();
  const prev = current[surahNumber];
  const updated: HifzProgressMap = {
    ...current,
    [surahNumber]: {
      surahNumber,
      status,
      memorizedAyahs: memorizedAyahs !== undefined ? memorizedAyahs : prev?.memorizedAyahs ?? 0,
      lastReviewedAt: new Date().toISOString(),
    },
  };
  saveHifzProgress(updated);
  return updated;
}

export interface OfflineHijriInfo {
  gregorianFormatted: string;
  hijriFormatted: string;
  hijriDay: number;
  hijriMonthName: string;
  hijriYear: string;
  weekdayName: string;
  isFriday: boolean;
  isMondayOrThursday: boolean;
  isWhiteDay: boolean;
  upcomingWhiteDaysNote: string;
}

export function getOfflineHijriInfo(date: Date = new Date()): OfflineHijriInfo {
  const weekdayIdx = date.getDay(); // 0 = Sun, 1 = Mon, 4 = Thu, 5 = Fri
  const weekdayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  const gregorianFormatted = date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  let hijriDay = 1;
  let hijriMonthName = 'Muharram';
  let hijriYear = '1446';
  let hijriFormatted = '';

  try {
    const fmt = new Intl.DateTimeFormat('en-TN-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const parts = fmt.formatToParts(date);
    for (const p of parts) {
      if (p.type === 'day') {
        const parsedDay = parseInt(p.value, 10);
        if (!Number.isNaN(parsedDay)) hijriDay = parsedDay;
      } else if (p.type === 'month') {
        hijriMonthName = p.value;
      } else if (p.type === 'year') {
        hijriYear = p.value.replace(/\D/g, '') || p.value;
      }
    }
    hijriFormatted = `${hijriDay} ${hijriMonthName} ${hijriYear} AH`;
  } catch {
    hijriFormatted = 'Umm al-Qura Hijri Calendar';
  }

  const isFriday = weekdayIdx === 5;
  const isMondayOrThursday = weekdayIdx === 1 || weekdayIdx === 4;
  const isWhiteDay = hijriDay >= 13 && hijriDay <= 15;

  let upcomingWhiteDaysNote = '';
  if (isWhiteDay) {
    upcomingWhiteDaysNote = `Today is the ${hijriDay}th of ${hijriMonthName} — Sunnah White Day (Ayyam al-Bid) fast.`;
  } else if (hijriDay < 13) {
    const diff = 13 - hijriDay;
    upcomingWhiteDaysNote = `${diff} day${diff === 1 ? '' : 's'} until White Days (13–15 ${hijriMonthName}).`;
  } else {
    const approxNext = 30 - hijriDay + 13;
    upcomingWhiteDaysNote = `Approx. ${approxNext} days until next month's White Days (13–15).`;
  }

  return {
    gregorianFormatted,
    hijriFormatted,
    hijriDay,
    hijriMonthName,
    hijriYear,
    weekdayName,
    isFriday,
    isMondayOrThursday,
    isWhiteDay,
    upcomingWhiteDaysNote,
  };
}

export function loadFridaySalawatCount(): number {
  try {
    const todayKey = new Date().toISOString().slice(0, 10);
    const raw = localStorage.getItem(FRIDAY_SALAWAT_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.date === todayKey && typeof parsed.count === 'number') {
      return parsed.count;
    }
    return 0;
  } catch {
    return 0;
  }
}

export function saveFridaySalawatCount(count: number): void {
  try {
    const todayKey = new Date().toISOString().slice(0, 10);
    localStorage.setItem(FRIDAY_SALAWAT_KEY, JSON.stringify({ date: todayKey, count }));
  } catch {
    // ignore
  }
}
