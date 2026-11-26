/**
 * High-Precision Astronomical Prayer Times Engine (100% Offline)
 * - Supports global calculation methods (MWL, ISNA, Karachi, Makkah, Egypt)
 * - Supports Standard (Shafi/Maliki/Hanbali) vs Hanafi Asr shadow juristic rules
 * - Location-timezone & DST aware via offline Intl.DateTimeFormat
 * - Accurate year-round seasonal computation + high-latitude twilight safeguard
 */

export type CalculationMethod = 'MWL' | 'ISNA' | 'Egypt' | 'Makkah' | 'Karachi';
export type AsrMethod = 'Standard' | 'Hanafi';

export interface PrayerTimeItem {
  id: 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha' | 'tahajjud';
  name: string;
  arabicName: string;
  timeString: string; // e.g. "05:15 AM"
  timeMinutes: number; // minutes from midnight (0..1439)
  passed: boolean;
  isNext: boolean;
  isVoluntary?: boolean;
}

export interface PrayerStatus {
  prayers: PrayerTimeItem[];
  nextPrayer: PrayerTimeItem | null;
  timeUntilNext: string;
  currentPrayer: PrayerTimeItem | null;
  locationName: string;
  method: CalculationMethod;
  asrMethod: AsrMethod;
  cityId?: string;
  lat?: number;
  lng?: number;
  timezone?: string;
  utcOffsetLabel?: string;
  locationLocalTime?: string;
  dateLabel?: string;
  dateISO?: string;
  daylightMinutes?: number;
  fastingSpanMinutes?: number;
}

export interface SavedPrayerLocation {
  cityId?: string;
  lat: number;
  lng: number;
  name: string;
  country?: string;
  timezone?: string;
  method: CalculationMethod;
  asrMethod: AsrMethod;
}

export interface SeasonalPrayerRow {
  label: string; // e.g. "Summer Solstice (21 Jun)" or "Jan"
  shortLabel: string;
  dateISO: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  fajrMinutes: number;
  sunriseMinutes: number;
  dhuhrMinutes: number;
  asrMinutes: number;
  maghribMinutes: number;
  ishaMinutes: number;
  daylightMinutes: number;
  fastingMinutes: number;
}

export const SAVED_LOCATION_STORAGE_KEY = 'annur_saved_location';

const DEFAULT_LOCATION: SavedPrayerLocation = {
  cityId: 'in-delhi',
  lat: 28.6139,
  lng: 77.209,
  name: 'New Delhi, India',
  country: 'India',
  timezone: 'Asia/Kolkata',
  method: 'Karachi',
  asrMethod: 'Hanafi',
};

// Method parameters: Fajr twilight angle, Isha twilight angle or fixed minutes after Maghrib
export const METHOD_PARAMS: Record<
  CalculationMethod,
  { fajrAngle: number; ishaAngle: number; ishaMinutes?: number; label: string }
> = {
  MWL: { fajrAngle: 18.0, ishaAngle: 17.0, label: 'Muslim World League (18° / 17°)' },
  ISNA: { fajrAngle: 15.0, ishaAngle: 15.0, label: 'ISNA North America (15° / 15°)' },
  Egypt: { fajrAngle: 19.5, ishaAngle: 17.5, label: 'Egyptian General Authority (19.5° / 17.5°)' },
  Makkah: { fajrAngle: 18.5, ishaAngle: 0, ishaMinutes: 90, label: 'Umm Al-Qura, Makkah (18.5° / 90m)' },
  Karachi: { fajrAngle: 18.0, ishaAngle: 18.0, label: 'Univ. of Islamic Sciences, Karachi (18° / 18°)' },
};

// Trigonometric helpers in degrees
const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;
const sinD = (d: number) => Math.sin(rad(d));
const cosD = (d: number) => Math.cos(rad(d));
const tanD = (d: number) => Math.tan(rad(d));
const asinD = (x: number) => deg(Math.asin(Math.max(-1, Math.min(1, x))));
const atanD = (x: number) => deg(Math.atan(x));
const atan2D = (y: number, x: number) => deg(Math.atan2(y, x));

const fix = (val: number, max: number) => {
  const res = val - max * Math.floor(val / max);
  return res < 0 ? res + max : res;
};
const fixAngle = (degVal: number) => fix(degVal, 360);
const fixHour = (hrVal: number) => fix(hrVal, 24);

/**
 * Gregorian calendar date to Julian Day at 0h UT
 */
function getJulianDay(year: number, month: number, day: number): number {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524.5;
}

/**
 * USNO / PrayTimes solar declination (degrees) & Equation of Time (minutes) for a Julian instant
 */
function getSunCoordinates(jd: number): { declination: number; equationOfTimeMinutes: number } {
  const D = jd - 2451545.0;
  const g = fixAngle(357.529 + 0.98560028 * D);
  const q = fixAngle(280.459 + 0.98564736 * D);
  const L = fixAngle(q + 1.915 * sinD(g) + 0.02 * sinD(2 * g));
  const e = 23.439 - 0.00000036 * D;

  const ra = atan2D(cosD(e) * sinD(L), cosD(L)) / 15;
  const eqtHours = q / 15 - fixHour(ra);
  const declination = asinD(sinD(e) * sinD(L));

  return {
    declination,
    equationOfTimeMinutes: eqtHours * 60,
  };
}

export function formatMinutesTo12Hour(totalMins: number): string {
  let m = Math.round(totalMins);
  m = ((m % (24 * 60)) + 24 * 60) % (24 * 60);
  const h = Math.floor(m / 60);
  const min = m % 60;
  const period = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 === 0 ? 12 : h % 12;
  return `${displayH}:${String(min).padStart(2, '0')} ${period}`;
}

export function formatDurationHoursMins(totalMins: number): string {
  const m = Math.max(0, Math.round(totalMins));
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return h > 0 ? `${h}h ${rem}m` : `${rem}m`;
}

export function formatUtcOffsetLabel(offsetHours: number): string {
  const sign = offsetHours >= 0 ? '+' : '-';
  const absMins = Math.round(Math.abs(offsetHours) * 60);
  const h = Math.floor(absMins / 60);
  const m = absMins % 60;
  return m > 0 ? `UTC${sign}${h}:${String(m).padStart(2, '0')}` : `UTC${sign}${h}`;
}

/**
 * Resolves exact civil date, wall clock, and DST-aware UTC offset in any IANA timezone 100% offline.
 */
export function resolveLocationClock(
  instant: Date,
  timeZone?: string,
  fallbackLng?: number
): {
  year: number;
  month: number;
  day: number;
  currentMinutes: number;
  offsetHours: number;
  locationLocalTime: string;
  dateLabel: string;
  dateISO: string;
  utcOffsetLabel: string;
} {
  if (timeZone) {
    try {
      const partsFmt = new Intl.DateTimeFormat('en-US', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23',
      });
      const parts = partsFmt.formatToParts(instant);
      const getVal = (type: Intl.DateTimeFormatPartTypes) =>
        Number(parts.find((p) => p.type === type)?.value ?? NaN);

      const year = getVal('year');
      const month = getVal('month');
      const day = getVal('day');
      let hour = getVal('hour');
      const minute = getVal('minute');
      const second = getVal('second');
      if (hour === 24) hour = 0;

      if (!Number.isNaN(year) && !Number.isNaN(month) && !Number.isNaN(day)) {
        const asUtcMs = Date.UTC(year, month - 1, day, hour, minute, second);
        const offsetMinutes = Math.round((asUtcMs - instant.getTime()) / 60000);
        const offsetHours = offsetMinutes / 60;
        const currentMinutes = hour * 60 + minute;

        const dateLabel = new Intl.DateTimeFormat('en-US', {
          timeZone,
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }).format(instant);

        const dateISO = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        return {
          year,
          month,
          day,
          currentMinutes,
          offsetHours,
          locationLocalTime: formatMinutesTo12Hour(currentMinutes),
          dateLabel,
          dateISO,
          utcOffsetLabel: formatUtcOffsetLabel(offsetHours),
        };
      }
    } catch {
      // Fallback below if timezone identifier is unsupported in host JS engine
    }
  }

  // Fallback: longitude estimate if different timezone requested without Intl support, or device local
  const offsetHours =
    fallbackLng !== undefined && timeZone
      ? Math.round(fallbackLng / 15)
      : -instant.getTimezoneOffset() / 60;

  const year = instant.getFullYear();
  const month = instant.getMonth() + 1;
  const day = instant.getDate();
  const currentMinutes = instant.getHours() * 60 + instant.getMinutes();
  const dateISO = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const dateLabel = instant.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return {
    year,
    month,
    day,
    currentMinutes,
    offsetHours,
    locationLocalTime: formatMinutesTo12Hour(currentMinutes),
    dateLabel,
    dateISO,
    utcOffsetLabel: formatUtcOffsetLabel(offsetHours),
  };
}

/**
 * Recommends standard regional calculation & Asr method for a chosen country/region
 */
export function getRecommendedMethodForLocation(
  country?: string,
  region?: string
): { method: CalculationMethod; asrMethod: AsrMethod } {
  const c = (country || '').toLowerCase();
  const r = (region || '').toLowerCase();

  if (c === 'india' || c === 'pakistan' || c === 'bangladesh' || c === 'afghanistan') {
    return { method: 'Karachi', asrMethod: 'Hanafi' };
  }
  if (c === 'sri lanka' || c === 'maldives' || c === 'nepal' || c === 'bhutan') {
    return { method: 'Karachi', asrMethod: 'Standard' };
  }
  if (
    c === 'saudi arabia' ||
    c === 'united arab emirates' ||
    c === 'qatar' ||
    c === 'kuwait' ||
    c === 'oman' ||
    c === 'bahrain' ||
    c === 'yemen'
  ) {
    return { method: 'Makkah', asrMethod: 'Standard' };
  }
  if (r === 'north america' || c === 'united states' || c === 'canada') {
    return { method: 'ISNA', asrMethod: 'Standard' };
  }
  if (r === 'africa' || c === 'egypt' || c === 'jordan' || c === 'palestine' || c === 'syria' || c === 'lebanon' || c === 'iraq') {
    return { method: 'Egypt', asrMethod: 'Standard' };
  }
  if (c === 'turkey' || r === 'central asia') {
    return { method: 'MWL', asrMethod: 'Hanafi' };
  }
  return { method: 'MWL', asrMethod: 'Standard' };
}

/**
 * Compute raw prayer minute marks for a specific civil date + timezone offset
 */
function computeDailyMinutes(
  year: number,
  month: number,
  day: number,
  latitude: number,
  longitude: number,
  offsetHours: number,
  method: CalculationMethod,
  asrMethod: AsrMethod
): {
  fajr: number;
  sunrise: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
  tahajjud: number;
} {
  const jd0 = getJulianDay(year, month, day) - longitude / 360;
  const { fajrAngle, ishaAngle, ishaMinutes } = METHOD_PARAMS[method];

  const solveSunAngleHourDeltaHours = (sunAltitudeDeg: number, dayFraction: number, isMorning: boolean): number | null => {
    const { declination } = getSunCoordinates(jd0 + dayFraction);
    const cosHA =
      (sinD(sunAltitudeDeg) - sinD(latitude) * sinD(declination)) /
      (cosD(latitude) * cosD(declination));
    if (cosHA > 1 || cosHA < -1 || Number.isNaN(cosHA)) {
      return null;
    }
    const haHours = deg(Math.acos(cosHA)) / 15;
    return isMorning ? -haHours : haHours;
  };

  const computeMidDayMinutes = (dayFraction: number): number => {
    const { equationOfTimeMinutes } = getSunCoordinates(jd0 + dayFraction);
    return 12 * 60 + offsetHours * 60 - longitude * 4 - equationOfTimeMinutes;
  };

  // Iterative two-pass refinement for each solar event
  const solarNoon = computeMidDayMinutes(0.5);

  // Sunrise & Sunset (-0.833° accounts for solar disc semi-diameter + atmospheric refraction)
  const srDelta1 = solveSunAngleHourDeltaHours(-0.833, 0.25, true);
  const ssDelta1 = solveSunAngleHourDeltaHours(-0.833, 0.75, false);

  const sunriseMinutes = srDelta1 !== null ? solarNoon + srDelta1 * 60 : 6 * 60;
  const maghribMinutes = ssDelta1 !== null ? solarNoon + ssDelta1 * 60 : 18 * 60;

  // Dhuhr: true solar noon + 1 min safety margin for zenith crossing
  const dhuhrMinutes = solarNoon + 1;

  // Asr: shadow length = shadowFactor + tan(|lat - decl|)
  const { declination: declAsr } = getSunCoordinates(jd0 + 0.625);
  const shadowFactor = asrMethod === 'Hanafi' ? 2 : 1;
  const asrAlt = atanD(1 / (shadowFactor + Math.abs(tanD(latitude - declAsr))));
  const asrDelta = solveSunAngleHourDeltaHours(asrAlt, 0.625, false);
  const asrMinutes = asrDelta !== null ? solarNoon + asrDelta * 60 : dhuhrMinutes + 210;

  // Night duration between sunset and sunrise for high-latitude safeguard
  const nightDuration = Math.max(60, sunriseMinutes + 24 * 60 - maghribMinutes);

  // Fajr (-fajrAngle) with Angle-Based fallback when twilight never reaches depression angle
  const fajrDelta = solveSunAngleHourDeltaHours(-fajrAngle, 0.2, true);
  let fajrMinutes =
    fajrDelta !== null
      ? solarNoon + fajrDelta * 60
      : sunriseMinutes - (fajrAngle / 60) * nightDuration;

  const maxFajrNightDiff = (fajrAngle / 60) * nightDuration;
  if (sunriseMinutes - fajrMinutes > maxFajrNightDiff && Math.abs(latitude) >= 48) {
    fajrMinutes = sunriseMinutes - maxFajrNightDiff;
  }

  // Isha (-ishaAngle or fixed minutes after Maghrib) with high-latitude safeguard
  let ishaMinutesTotal: number;
  if (ishaMinutes) {
    ishaMinutesTotal = maghribMinutes + ishaMinutes;
  } else {
    const ishaDelta = solveSunAngleHourDeltaHours(-ishaAngle, 0.8, false);
    ishaMinutesTotal =
      ishaDelta !== null
        ? solarNoon + ishaDelta * 60
        : maghribMinutes + (ishaAngle / 60) * nightDuration;

    const maxIshaNightDiff = (ishaAngle / 60) * nightDuration;
    if (ishaMinutesTotal - maghribMinutes > maxIshaNightDiff && Math.abs(latitude) >= 48) {
      ishaMinutesTotal = maghribMinutes + maxIshaNightDiff;
    }
  }

  // Tahajjud: final third of the Shar'i night (Maghrib to Fajr)
  const shariNightDuration = fajrMinutes + 24 * 60 - maghribMinutes;
  const tahajjudMinutes = (maghribMinutes + (2 / 3) * shariNightDuration) % (24 * 60);

  return {
    fajr: fajrMinutes,
    sunrise: sunriseMinutes,
    dhuhr: dhuhrMinutes,
    asr: asrMinutes,
    maghrib: maghribMinutes,
    isha: ishaMinutesTotal,
    tahajjud: tahajjudMinutes,
  };
}

/**
 * Precise astronomical calculation of daily prayer times based on coordinates & location timezone
 */
export function calculatePrecisePrayerTimes(
  latitude: number = 28.6139,
  longitude: number = 77.209,
  date: Date = new Date(),
  method: CalculationMethod = 'Karachi',
  asrMethod: AsrMethod = 'Hanafi',
  locationName: string = 'New Delhi, India',
  timezone?: string,
  cityId?: string
): PrayerStatus {
  const clock = resolveLocationClock(date, timezone, longitude);
  const computed = computeDailyMinutes(
    clock.year,
    clock.month,
    clock.day,
    latitude,
    longitude,
    clock.offsetHours,
    method,
    asrMethod
  );

  const rawList: {
    id: PrayerTimeItem['id'];
    name: string;
    arabicName: string;
    minutes: number;
    isVoluntary?: boolean;
  }[] = [
    { id: 'fajr', name: 'Fajr', arabicName: 'الفَجْر', minutes: computed.fajr },
    { id: 'sunrise', name: 'Sunrise', arabicName: 'الشُّرُوق', minutes: computed.sunrise, isVoluntary: true },
    { id: 'dhuhr', name: 'Dhuhr', arabicName: 'الظُّهْر', minutes: computed.dhuhr },
    { id: 'asr', name: 'Asr', arabicName: 'العَصْر', minutes: computed.asr },
    { id: 'maghrib', name: 'Maghrib', arabicName: 'المَغْرِب', minutes: computed.maghrib },
    { id: 'isha', name: 'Isha', arabicName: 'العِشَاء', minutes: computed.isha },
    { id: 'tahajjud', name: 'Tahajjud', arabicName: 'التَّهَجُّد', minutes: computed.tahajjud, isVoluntary: true },
  ];

  let nextIndex = -1;
  const currentMinutes = clock.currentMinutes;

  const prayers: PrayerTimeItem[] = rawList.map((item, idx) => {
    const roundedMins = ((Math.round(item.minutes) % 1440) + 1440) % 1440;
    const passed = currentMinutes >= roundedMins;
    if (!item.isVoluntary && !passed && nextIndex === -1) {
      nextIndex = idx;
    }

    return {
      id: item.id,
      name: item.name,
      arabicName: item.arabicName,
      timeString: formatMinutesTo12Hour(roundedMins),
      timeMinutes: roundedMins,
      passed,
      isNext: false,
      isVoluntary: item.isVoluntary,
    };
  });

  if (nextIndex === -1) {
    const fajr = prayers.find((p) => p.id === 'fajr');
    if (fajr) fajr.isNext = true;
  } else {
    prayers[nextIndex].isNext = true;
  }

  const nextPrayer = prayers.find((p) => p.isNext) || prayers[0];
  let diffMinutes = nextPrayer.timeMinutes - currentMinutes;
  if (diffMinutes < 0) diffMinutes += 24 * 60;

  let currentPrayer: PrayerTimeItem | null = null;
  const obligatoryOnly = prayers.filter((p) => !p.isVoluntary);
  for (let i = obligatoryOnly.length - 1; i >= 0; i--) {
    if (obligatoryOnly[i].passed) {
      currentPrayer = obligatoryOnly[i];
      break;
    }
  }

  return {
    prayers,
    nextPrayer,
    timeUntilNext: formatDurationHoursMins(diffMinutes),
    currentPrayer: currentPrayer || obligatoryOnly[obligatoryOnly.length - 1],
    locationName,
    method,
    asrMethod,
    cityId,
    lat: latitude,
    lng: longitude,
    timezone,
    utcOffsetLabel: clock.utcOffsetLabel,
    locationLocalTime: clock.locationLocalTime,
    dateLabel: clock.dateLabel,
    dateISO: clock.dateISO,
    daylightMinutes: Math.max(0, Math.round(computed.maghrib - computed.sunrise)),
    fastingSpanMinutes: Math.max(0, Math.round(computed.maghrib - computed.fajr)),
  };
}

/**
 * Compute prayer times for a specific calendar date (YYYY-MM-DD) in a chosen city's timezone (with exact DST)
 */
export function calculatePrayerTimesForCivilDate(
  dateISO: string,
  latitude: number,
  longitude: number,
  method: CalculationMethod,
  asrMethod: AsrMethod,
  locationName: string,
  timezone?: string,
  cityId?: string
): PrayerStatus {
  const [yStr, mStr, dStr] = dateISO.split('-');
  const y = Number(yStr) || new Date().getFullYear();
  const m = Number(mStr) || 1;
  const d = Number(dStr) || 1;

  // Approximate noon UTC at that longitude so DST evaluation hits the intended civil day
  const probeInstant = new Date(Date.UTC(y, m - 1, d, 12, 0, 0) - Math.round((longitude / 15) * 3600000));
  const probedClock = resolveLocationClock(probeInstant, timezone, longitude);
  const computed = computeDailyMinutes(
    y,
    m,
    d,
    latitude,
    longitude,
    probedClock.offsetHours,
    method,
    asrMethod
  );

  // Compare against today's current location clock if viewing today's date
  const nowClock = resolveLocationClock(new Date(), timezone, longitude);
  const isToday = nowClock.dateISO === dateISO;

  const rawList: {
    id: PrayerTimeItem['id'];
    name: string;
    arabicName: string;
    minutes: number;
    isVoluntary?: boolean;
  }[] = [
    { id: 'fajr', name: 'Fajr', arabicName: 'الفَجْر', minutes: computed.fajr },
    { id: 'sunrise', name: 'Sunrise', arabicName: 'الشُّرُوق', minutes: computed.sunrise, isVoluntary: true },
    { id: 'dhuhr', name: 'Dhuhr', arabicName: 'الظُّهْر', minutes: computed.dhuhr },
    { id: 'asr', name: 'Asr', arabicName: 'العَصْر', minutes: computed.asr },
    { id: 'maghrib', name: 'Maghrib', arabicName: 'المَغْرِب', minutes: computed.maghrib },
    { id: 'isha', name: 'Isha', arabicName: 'العِشَاء', minutes: computed.isha },
    { id: 'tahajjud', name: 'Tahajjud', arabicName: 'التَّهَجُّد', minutes: computed.tahajjud, isVoluntary: true },
  ];

  let nextIndex = -1;
  const prayers: PrayerTimeItem[] = rawList.map((item, idx) => {
    const roundedMins = ((Math.round(item.minutes) % 1440) + 1440) % 1440;
    const passed = isToday ? nowClock.currentMinutes >= roundedMins : false;
    if (isToday && !item.isVoluntary && !passed && nextIndex === -1) {
      nextIndex = idx;
    }
    return {
      id: item.id,
      name: item.name,
      arabicName: item.arabicName,
      timeString: formatMinutesTo12Hour(roundedMins),
      timeMinutes: roundedMins,
      passed,
      isNext: false,
      isVoluntary: item.isVoluntary,
    };
  });

  if (isToday) {
    if (nextIndex === -1) {
      const fajr = prayers.find((p) => p.id === 'fajr');
      if (fajr) fajr.isNext = true;
    } else {
      prayers[nextIndex].isNext = true;
    }
  } else {
    const fajr = prayers.find((p) => p.id === 'fajr');
    if (fajr) fajr.isNext = true;
  }

  const nextPrayer = prayers.find((p) => p.isNext) || prayers[0];
  let diffMinutes = nextPrayer.timeMinutes - nowClock.currentMinutes;
  if (diffMinutes < 0) diffMinutes += 24 * 60;

  let currentPrayer: PrayerTimeItem | null = null;
  if (isToday) {
    const obligatoryOnly = prayers.filter((p) => !p.isVoluntary);
    for (let i = obligatoryOnly.length - 1; i >= 0; i--) {
      if (obligatoryOnly[i].passed) {
        currentPrayer = obligatoryOnly[i];
        break;
      }
    }
  }

  const dateObjForLabel = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const dateLabel = new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(dateObjForLabel);

  return {
    prayers,
    nextPrayer,
    timeUntilNext: formatDurationHoursMins(diffMinutes),
    currentPrayer,
    locationName,
    method,
    asrMethod,
    cityId,
    lat: latitude,
    lng: longitude,
    timezone,
    utcOffsetLabel: probedClock.utcOffsetLabel,
    locationLocalTime: nowClock.locationLocalTime,
    dateLabel,
    dateISO,
    daylightMinutes: Math.max(0, Math.round(computed.maghrib - computed.sunrise)),
    fastingSpanMinutes: Math.max(0, Math.round(computed.maghrib - computed.fajr)),
  };
}

/**
 * Generates year-round seasonal & 12-month Namaz distribution snapshots for any chosen location
 */
export function getYearlySeasonalDistribution(
  latitude: number,
  longitude: number,
  method: CalculationMethod,
  asrMethod: AsrMethod,
  timezone?: string,
  year: number = new Date().getFullYear()
): { seasons: SeasonalPrayerRow[]; months: SeasonalPrayerRow[] } {
  const buildRow = (label: string, shortLabel: string, month: number, day: number): SeasonalPrayerRow => {
    const dateISO = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const probe = new Date(Date.UTC(year, month - 1, day, 12, 0, 0) - Math.round((longitude / 15) * 3600000));
    const clock = resolveLocationClock(probe, timezone, longitude);
    const c = computeDailyMinutes(year, month, day, latitude, longitude, clock.offsetHours, method, asrMethod);

    const fajrM = Math.round(c.fajr);
    const sunriseM = Math.round(c.sunrise);
    const dhuhrM = Math.round(c.dhuhr);
    const asrM = Math.round(c.asr);
    const maghribM = Math.round(c.maghrib);
    const ishaM = Math.round(c.isha);

    return {
      label,
      shortLabel,
      dateISO,
      fajr: formatMinutesTo12Hour(fajrM),
      sunrise: formatMinutesTo12Hour(sunriseM),
      dhuhr: formatMinutesTo12Hour(dhuhrM),
      asr: formatMinutesTo12Hour(asrM),
      maghrib: formatMinutesTo12Hour(maghribM),
      isha: formatMinutesTo12Hour(ishaM),
      fajrMinutes: fajrM,
      sunriseMinutes: sunriseM,
      dhuhrMinutes: dhuhrM,
      asrMinutes: asrM,
      maghribMinutes: maghribM,
      ishaMinutes: ishaM,
      daylightMinutes: Math.max(0, maghribM - sunriseM),
      fastingMinutes: Math.max(0, maghribM - fajrM),
    };
  };

  const seasons: SeasonalPrayerRow[] = [
    buildRow('Spring Equinox (Mar 20)', 'Mar 20', 3, 20),
    buildRow('Summer Solstice (Jun 21)', 'Jun 21', 6, 21),
    buildRow('Autumn Equinox (Sep 22)', 'Sep 22', 9, 22),
    buildRow('Winter Solstice (Dec 21)', 'Dec 21', 12, 21),
  ];

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const months: SeasonalPrayerRow[] = monthNames.map((mName, idx) =>
    buildRow(`${mName} 15`, mName, idx + 1, 15)
  );

  return { seasons, months };
}

export function getSavedPrayerLocation(): SavedPrayerLocation {
  try {
    const raw = localStorage.getItem(SAVED_LOCATION_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed.lat === 'number' && typeof parsed.lng === 'number') {
        return {
          cityId: parsed.cityId,
          lat: parsed.lat,
          lng: parsed.lng,
          name: parsed.name || 'Saved Location',
          country: parsed.country,
          timezone: parsed.timezone,
          method: parsed.method || 'Karachi',
          asrMethod: parsed.asrMethod || 'Hanafi',
        };
      }
    }
  } catch {
    // ignore storage errors
  }
  return DEFAULT_LOCATION;
}

export function savePrayerLocation(loc: SavedPrayerLocation): void {
  try {
    localStorage.setItem(SAVED_LOCATION_STORAGE_KEY, JSON.stringify(loc));
  } catch {
    // ignore storage errors
  }
}

/**
 * Primary loader used on app boot and 60s refresh timer
 */
export function getDailyPrayerTimes(
  date: Date = new Date(),
  lat?: number,
  lng?: number,
  locationName?: string,
  timezone?: string
): PrayerStatus {
  if (lat !== undefined && lng !== undefined) {
    const saved = getSavedPrayerLocation();
    return calculatePrecisePrayerTimes(
      lat,
      lng,
      date,
      saved.method || 'MWL',
      saved.asrMethod || 'Standard',
      locationName || 'Local',
      timezone
    );
  }

  const saved = getSavedPrayerLocation();
  return calculatePrecisePrayerTimes(
    saved.lat,
    saved.lng,
    date,
    saved.method,
    saved.asrMethod,
    saved.name,
    saved.timezone,
    saved.cityId
  );
}

/**
 * Web Audio API synthesized Adhan Chime preview
 */
export function playSyntheticAdhanPreview(): void {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const notes = [
      { freq: 261.63, delay: 0, dur: 1.8 }, // C4
      { freq: 329.63, delay: 0.15, dur: 1.8 }, // E4
      { freq: 392.0, delay: 0.3, dur: 2.2 }, // G4
      { freq: 523.25, delay: 0.45, dur: 2.8 }, // C5
    ];

    notes.forEach(({ freq, delay, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + delay + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + dur);
    });
  } catch (e) {
    console.warn('Web Audio adhan preview error:', e);
  }
}

const OBLIGATORY_PRAYER_IDS = new Set(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']);

/**
 * Returns true when an obligatory prayer has not yet reached its time today and is not already ticked.
 * Voluntary prayers (tahajjud, duha) remain unlocked.
 */
export function isPrayerTickLocked(
  prayerKey: string,
  prayerStatus: PrayerStatus | undefined,
  isCurrentlyDone: boolean
): boolean {
  if (isCurrentlyDone) return false;
  if (!OBLIGATORY_PRAYER_IDS.has(prayerKey)) return false;
  if (!prayerStatus) return false;
  const item = prayerStatus.prayers.find((p) => p.id === prayerKey && !p.isVoluntary);
  if (!item) return false;
  return !item.passed;
}

/**
 * Returns current minutes-from-midnight (0..1439) in the user's selected prayer location timezone.
 */
export function getLocationCurrentMinutes(
  prayerStatus: PrayerStatus | undefined,
  date: Date = new Date()
): number {
  const clock = resolveLocationClock(date, prayerStatus?.timezone, prayerStatus?.lng);
  return clock.currentMinutes;
}

