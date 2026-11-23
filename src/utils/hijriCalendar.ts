import {
  HIJRI_MONTHS_META,
  HijriMonthMeta,
  IslamicCalendarEvent,
  getEventsForHijriDate,
} from '../data/islamicCalendarEvents';
import { UserProfileData } from '../types/quran';

export interface HijriDateSnapshot {
  year: number;
  month: number; // 1..12
  day: number; // 1..30
  monthName: string;
  arabicMonthName: string;
  weekdayIdx: number; // 0 = Sun .. 6 = Sat
  gregorianDate: Date;
  hijriFormatted: string;
  shortLabel: string;
}

export interface HijriCalendarDayCell {
  hijriYear: number;
  hijriMonth: number;
  hijriDay: number;
  gregorianDate: Date;
  gregorianLabel: string;
  weekdayIdx: number;
  isToday: boolean;
  isRamadan: boolean;
  isOddLastTenRamadan: boolean;
  isSacredMonth: boolean;
  isFriday: boolean;
  isWhiteDay: boolean;
  isEidDay: boolean;
  isArafahOrAshura: boolean;
  lunarIllumination: number; // 0..1 (new=0, full=1 on 14-15th)
  events: IslamicCalendarEvent[];
}

export interface RamadanStatusSnapshot {
  isActualRamadan: boolean;
  isPreviewMode: boolean;
  isRamadanActive: boolean;
  ramadanDay: number; // 1..30
  ramadanYear: number;
  ashra: 1 | 2 | 3;
  isLastTenNights: boolean;
  isOddNightLastTen: boolean;
  todayHijri: HijriDateSnapshot;
}

const MONTH_NAME_FALLBACK = [
  'Muharram',
  'Safar',
  "Rabi' al-Awwal",
  "Rabi' al-Thani",
  'Jumada al-Ula',
  'Jumada al-Akhirah',
  'Rajab',
  "Sha'ban",
  'Ramadan',
  'Shawwal',
  "Dhu al-Qi'dah",
  'Dhu al-Hijjah',
];

function matchHijriMonthNumber(rawMonthName: string, rawMonthNumeric?: string): number {
  if (rawMonthNumeric) {
    const n = parseInt(rawMonthNumeric.replace(/\D/g, ''), 10);
    if (n >= 1 && n <= 12) return n;
  }
  const clean = rawMonthName.toLowerCase().replace(/[^a-z]/g, '');
  if (clean.includes('muharram')) return 1;
  if (clean.includes('safar')) return 2;
  if (clean.includes('rabi') && (clean.includes('awwal') || clean.includes('i') || clean.endsWith('1')))
    return 3;
  if (clean.includes('rabi')) return 4;
  if (clean.includes('jumada') && (clean.includes('ula') || clean.includes('awwal') || clean.includes('1')))
    return 5;
  if (clean.includes('jumada')) return 6;
  if (clean.includes('rajab')) return 7;
  if (clean.includes('shaban')) return 8;
  if (clean.includes('ramadan') || clean.includes('ramazan')) return 9;
  if (clean.includes('shawwal')) return 10;
  if (clean.includes('qidah') || clean.includes('qadah')) return 11;
  if (clean.includes('hijjah') || clean.includes('hijah')) return 12;
  return 1;
}

/**
 * Pure algorithmic Kuwaiti/Tabular Hijri fallback for environments lacking ICU islamic-umalqura.
 */
function fallbackTabularHijri(date: Date): { year: number; month: number; day: number } {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();

  let jd =
    Math.floor((1461 * (y + 4800 + Math.floor((m - 14) / 12))) / 4) +
    Math.floor((367 * (m - 2 - 12 * Math.floor((m - 14) / 12))) / 12) -
    Math.floor((3 * Math.floor((y + 4900 + Math.floor((m - 14) / 12)) / 100)) / 4) +
    d -
    32075;

  let l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  l = l - 10631 * n + 354;
  const j =
    Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) +
    Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
  l =
    l -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;
  const month = Math.floor((24 * l) / 709);
  const day = l - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;
  return {
    year,
    month: Math.max(1, Math.min(12, month)),
    day: Math.max(1, Math.min(30, day)),
  };
}

export function getHijriDateSnapshot(date: Date = new Date()): HijriDateSnapshot {
  let day = 1;
  let month = 1;
  let year = 1448;

  try {
    const numFmt = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    const parts = numFmt.formatToParts(date);
    let rawMonth = '';
    for (const p of parts) {
      if (p.type === 'day') {
        const parsed = parseInt(p.value.replace(/\D/g, ''), 10);
        if (!Number.isNaN(parsed)) day = parsed;
      } else if (p.type === 'month') {
        rawMonth = p.value;
      } else if (p.type === 'year') {
        const parsedY = parseInt(p.value.replace(/\D/g, ''), 10);
        if (!Number.isNaN(parsedY)) year = parsedY;
      }
    }
    const parsedM = parseInt(rawMonth.replace(/\D/g, ''), 10);
    if (parsedM >= 1 && parsedM <= 12) {
      month = parsedM;
    } else {
      const longFmt = new Intl.DateTimeFormat('en-TN-u-ca-islamic-umalqura', {
        month: 'long',
      });
      month = matchHijriMonthNumber(longFmt.format(date), rawMonth);
    }
  } catch {
    const fb = fallbackTabularHijri(date);
    year = fb.year;
    month = fb.month;
    day = fb.day;
  }

  const meta = HIJRI_MONTHS_META[month - 1] || HIJRI_MONTHS_META[0];
  const monthName = meta.nameEnglish || MONTH_NAME_FALLBACK[month - 1] || 'Muharram';

  const SHORT_MONTHS = [
    'Muh',
    'Saf',
    'Rab I',
    'Rab II',
    'Jum I',
    'Jum II',
    'Raj',
    'Shab',
    'Ram',
    'Shaw',
    'DhQ',
    'DhH',
  ];
  const shortMonth = SHORT_MONTHS[month - 1] || monthName.slice(0, 3);

  return {
    year,
    month,
    day,
    monthName,
    arabicMonthName: meta.nameArabic,
    weekdayIdx: date.getDay(),
    gregorianDate: date,
    hijriFormatted: `${day} ${monthName} ${year} AH`,
    shortLabel: `${day} ${shortMonth}`,
  };
}

export function getHijriMonthMeta(month: number): HijriMonthMeta {
  return HIJRI_MONTHS_META[Math.max(0, Math.min(11, month - 1))];
}

/**
 * Estimates the Gregorian anchor Date for a target (hijriYear, hijriMonth) and builds
 * all 29 or 30 cells of that exact Hijri month using iterative Umm al-Qura alignment.
 */
export function getHijriMonthGrid(
  targetYear: number,
  targetMonth: number,
  todayRef: Date = new Date()
): {
  meta: HijriMonthMeta;
  cells: HijriCalendarDayCell[];
  leadingBlanks: number;
  monthLength: number;
} {
  const todaySnap = getHijriDateSnapshot(todayRef);
  const targetTotalMonths = targetYear * 12 + (targetMonth - 1);
  const todayTotalMonths = todaySnap.year * 12 + (todaySnap.month - 1);
  const monthDiff = targetTotalMonths - todayTotalMonths;

  // Approximate anchor near day 15 of target Hijri month
  const approxDaysOffset = Math.round(monthDiff * 29.530588) + (15 - todaySnap.day);
  let cursor = new Date(
    todayRef.getFullYear(),
    todayRef.getMonth(),
    todayRef.getDate() + approxDaysOffset,
    12,
    0,
    0
  );

  // Converge cursor squarely inside targetYear / targetMonth
  for (let iter = 0; iter < 14; iter++) {
    const snap = getHijriDateSnapshot(cursor);
    const snapTotal = snap.year * 12 + (snap.month - 1);
    if (snapTotal === targetTotalMonths) break;
    const delta = (targetTotalMonths - snapTotal) * 29 + (15 - snap.day);
    cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + delta, 12, 0, 0);
  }

  // Rewind to Hijri day 1 of targetMonth
  let dayOne = new Date(cursor);
  for (let step = 0; step < 35; step++) {
    const snap = getHijriDateSnapshot(dayOne);
    if (snap.year === targetYear && snap.month === targetMonth && snap.day === 1) {
      break;
    }
    const prev = new Date(dayOne.getFullYear(), dayOne.getMonth(), dayOne.getDate() - 1, 12, 0, 0);
    const prevSnap = getHijriDateSnapshot(prev);
    if (snap.year * 12 + snap.month < targetYear * 12 + targetMonth) {
      // stepped before month
      dayOne = new Date(dayOne.getFullYear(), dayOne.getMonth(), dayOne.getDate() + 1, 12, 0, 0);
      break;
    }
    if (prevSnap.month !== targetMonth || prevSnap.year !== targetYear) {
      break;
    }
    dayOne = prev;
  }

  const cells: HijriCalendarDayCell[] = [];
  const meta = getHijriMonthMeta(targetMonth);
  const isSacredMonth = meta.significance === 'sacred';
  const isRamadan = targetMonth === 9;

  for (let i = 0; i < 30; i++) {
    const d = new Date(dayOne.getFullYear(), dayOne.getMonth(), dayOne.getDate() + i, 12, 0, 0);
    const snap = getHijriDateSnapshot(d);
    if (snap.year !== targetYear || snap.month !== targetMonth) {
      break;
    }

    const isToday =
      d.getFullYear() === todayRef.getFullYear() &&
      d.getMonth() === todayRef.getMonth() &&
      d.getDate() === todayRef.getDate();

    const hijriDay = snap.day;
    const isFriday = d.getDay() === 5;
    const isWhiteDay = hijriDay >= 13 && hijriDay <= 15 && !(targetMonth === 12 && hijriDay === 13);
    const isOddLastTenRamadan = isRamadan && hijriDay >= 21 && hijriDay % 2 === 1;
    const isEidDay = (targetMonth === 10 && hijriDay === 1) || (targetMonth === 12 && hijriDay === 10);
    const isArafahOrAshura =
      (targetMonth === 12 && hijriDay === 9) || (targetMonth === 1 && (hijriDay === 9 || hijriDay === 10));

    // Lunar cycle illumination approximation: 0 on day 1/30, 1 on day 14/15
    const lunarIllumination = Math.max(
      0.06,
      Math.min(1, 0.5 * (1 - Math.cos((2 * Math.PI * (hijriDay - 1)) / 29)))
    );

    const events = getEventsForHijriDate(targetMonth, hijriDay, d.getDay());

    cells.push({
      hijriYear: targetYear,
      hijriMonth: targetMonth,
      hijriDay,
      gregorianDate: d,
      gregorianLabel: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      weekdayIdx: d.getDay(),
      isToday,
      isRamadan,
      isOddLastTenRamadan,
      isSacredMonth,
      isFriday,
      isWhiteDay,
      isEidDay,
      isArafahOrAshura,
      lunarIllumination,
      events,
    });
  }

  const leadingBlanks = cells.length > 0 ? cells[0].weekdayIdx : 0;

  return {
    meta,
    cells,
    leadingBlanks,
    monthLength: cells.length,
  };
}

export function getRamadanStatus(
  profile?: Partial<UserProfileData>,
  now: Date = new Date()
): RamadanStatusSnapshot {
  const todayHijri = getHijriDateSnapshot(now);
  const isActualRamadan = todayHijri.month === 9;
  const isPreviewMode = Boolean(profile?.ramadanPreviewMode);
  const isRamadanActive = isActualRamadan || isPreviewMode;

  const ramadanDay = isActualRamadan
    ? Math.max(1, Math.min(30, todayHijri.day))
    : Math.max(1, Math.min(30, profile?.ramadanPreviewDay || 27));

  const ashra: 1 | 2 | 3 = ramadanDay <= 10 ? 1 : ramadanDay <= 20 ? 2 : 3;
  const isLastTenNights = ramadanDay >= 21;
  const isOddNightLastTen = isLastTenNights && ramadanDay % 2 === 1;

  return {
    isActualRamadan,
    isPreviewMode,
    isRamadanActive,
    ramadanDay,
    ramadanYear: todayHijri.year,
    ashra,
    isLastTenNights,
    isOddNightLastTen,
    todayHijri,
  };
}
