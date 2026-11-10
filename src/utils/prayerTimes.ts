/**
 * Advanced Astronomical Prayer Times Engine
 * Supports standard global calculation methods (MWL, ISNA, Karachi, Makkah, Egypt),
 * Asr juristic methods (Shafi/Maliki/Hanbali vs Hanafi),
 * and dynamic GPS latitude/longitude computation.
 */

export type CalculationMethod = 'MWL' | 'ISNA' | 'Egypt' | 'Makkah' | 'Karachi';
export type AsrMethod = 'Standard' | 'Hanafi';

export interface PrayerTimeItem {
  id: 'fajr' | 'sunrise' | 'dhuhr' | 'asr' | 'maghrib' | 'isha' | 'tahajjud';
  name: string;
  arabicName: string;
  timeString: string; // e.g. "05:15 AM"
  timeMinutes: number; // minutes from midnight
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
}

// Method parameters: Fajr angle, Isha angle or fixed minutes
const METHOD_PARAMS: Record<
  CalculationMethod,
  { fajrAngle: number; ishaAngle: number; ishaMinutes?: number }
> = {
  MWL: { fajrAngle: 18.0, ishaAngle: 17.0 },
  ISNA: { fajrAngle: 15.0, ishaAngle: 15.0 },
  Egypt: { fajrAngle: 19.5, ishaAngle: 17.5 },
  Makkah: { fajrAngle: 18.5, ishaAngle: 0, ishaMinutes: 90 }, // 90 min after Maghrib
  Karachi: { fajrAngle: 18.0, ishaAngle: 18.0 },
};

// Trigonometric helpers in degrees
const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;
const sinD = (d: number) => Math.sin(rad(d));
const cosD = (d: number) => Math.cos(rad(d));
const tanD = (d: number) => Math.tan(rad(d));
const asinD = (x: number) => deg(Math.asin(x));
const acosD = (x: number) => deg(Math.acos(Math.max(-1, Math.min(1, x))));
const atanD = (x: number) => deg(Math.atan(x));

/**
 * Calculates day of year from date
 */
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/**
 * Precise astronomical calculation of daily prayer times based on coordinates
 */
export function calculatePrecisePrayerTimes(
  latitude: number = 28.6139, // default New Delhi
  longitude: number = 77.209,
  date: Date = new Date(),
  method: CalculationMethod = 'MWL',
  asrMethod: AsrMethod = 'Standard',
  locationName: string = 'Current Location'
): PrayerStatus {
  const N = getDayOfYear(date);
  const timezoneOffsetHours = -date.getTimezoneOffset() / 60;

  // Approximate Solar Declination (delta) in degrees
  const delta = 23.45 * sinD((360 / 365) * (N - 81));

  // Equation of Time (EoT) in minutes
  const B = (360 / 365) * (N - 81);
  const eot = 9.87 * sinD(2 * B) - 7.53 * cosD(B) - 1.5 * sinD(B);

  // Solar Noon (Dhuhr) in minutes from midnight local time
  // Solar Noon = 12:00 - EoT + (Standard Meridian - Longitude) * 4
  const standardMeridian = timezoneOffsetHours * 15;
  const solarNoonMinutes = 12 * 60 - eot + (standardMeridian - longitude) * 4;

  // Function to calculate hour angle for a given zenith or altitude
  const hourAngle = (altitudeAngle: number): number => {
    const cosHA =
      (sinD(altitudeAngle) - sinD(latitude) * sinD(delta)) /
      (cosD(latitude) * cosD(delta));
    if (cosHA > 1) return 0; // Sun never reaches altitude
    if (cosHA < -1) return 180;
    return acosD(cosHA);
  };

  const { fajrAngle, ishaAngle, ishaMinutes } = METHOD_PARAMS[method];

  // Fajr: Sun altitude = -fajrAngle
  const fajrHA = hourAngle(-fajrAngle);
  const fajrMinutes = solarNoonMinutes - (fajrHA / 15) * 60;

  // Sunrise: Sun center altitude = -0.833° (atmospheric refraction + semi-diameter)
  const sunriseHA = hourAngle(-0.833);
  const sunriseMinutes = solarNoonMinutes - (sunriseHA / 15) * 60;

  // Dhuhr: Solar noon + 2 minute buffer
  const dhuhrMinutes = solarNoonMinutes + 2;

  // Asr: Shadow ratio (Standard = 1 + noon shadow, Hanafi = 2 + noon shadow)
  const noonShadowRatio = Math.abs(tanD(latitude - delta));
  const asrShadowRatio = (asrMethod === 'Hanafi' ? 2 : 1) + noonShadowRatio;
  const asrAltitude = atanD(1 / asrShadowRatio);
  const asrHA = hourAngle(asrAltitude);
  const asrMinutes = solarNoonMinutes + (asrHA / 15) * 60;

  // Maghrib (Sunset): Sun center altitude = -0.833°
  const sunsetHA = hourAngle(-0.833);
  const maghribMinutes = solarNoonMinutes + (sunsetHA / 15) * 60;

  // Isha: Sun altitude = -ishaAngle OR fixed minutes after Maghrib
  let ishaMinutesTotal: number;
  if (ishaMinutes) {
    ishaMinutesTotal = maghribMinutes + ishaMinutes;
  } else {
    const ishaHA = hourAngle(-ishaAngle);
    ishaMinutesTotal = solarNoonMinutes + (ishaHA / 15) * 60;
  }

  // Tahajjud: Best time is the last third of the night (between Maghrib and Fajr next morning)
  // Total night duration = (fajrMinutes + 24 * 60) - maghribMinutes
  const nightDuration = fajrMinutes + 24 * 60 - maghribMinutes;
  const tahajjudStartMinutes = (maghribMinutes + (2 / 3) * nightDuration) % (24 * 60);

  const formatMinutes = (totalMins: number): string => {
    let m = Math.round(totalMins);
    m = ((m % (24 * 60)) + 24 * 60) % (24 * 60);
    const h = Math.floor(m / 60);
    const min = m % 60;
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    return `${displayH}:${String(min).padStart(2, '0')} ${period}`;
  };

  const currentMinutes = date.getHours() * 60 + date.getMinutes();

  const rawList: {
    id: PrayerTimeItem['id'];
    name: string;
    arabicName: string;
    minutes: number;
    isVoluntary?: boolean;
  }[] = [
    { id: 'fajr', name: 'Fajr', arabicName: 'الفَجْر', minutes: fajrMinutes },
    { id: 'sunrise', name: 'Sunrise', arabicName: 'الشُّرُوق', minutes: sunriseMinutes, isVoluntary: true },
    { id: 'dhuhr', name: 'Dhuhr', arabicName: 'الظُّهْر', minutes: dhuhrMinutes },
    { id: 'asr', name: 'Asr', arabicName: 'العَصْر', minutes: asrMinutes },
    { id: 'maghrib', name: 'Maghrib', arabicName: 'المَغْرِب', minutes: maghribMinutes },
    { id: 'isha', name: 'Isha', arabicName: 'العِشَاء', minutes: ishaMinutesTotal },
    { id: 'tahajjud', name: 'Tahajjud', arabicName: 'التَّهَجُّد', minutes: tahajjudStartMinutes, isVoluntary: true },
  ];

  let nextIndex = -1;

  const prayers: PrayerTimeItem[] = rawList.map((item, idx) => {
    const passed = currentMinutes >= item.minutes;
    // Obligatory prayers check for next
    if (!item.isVoluntary && !passed && nextIndex === -1) {
      nextIndex = idx;
    }

    return {
      id: item.id,
      name: item.name,
      arabicName: item.arabicName,
      timeString: formatMinutes(item.minutes),
      timeMinutes: Math.round(item.minutes),
      passed,
      isNext: false,
      isVoluntary: item.isVoluntary,
    };
  });

  // If all obligatory prayers passed today, tomorrow's Fajr is next
  if (nextIndex === -1) {
    const fajr = prayers.find((p) => p.id === 'fajr');
    if (fajr) fajr.isNext = true;
  } else {
    prayers[nextIndex].isNext = true;
  }

  const nextPrayer = prayers.find((p) => p.isNext) || prayers[0];

  let diffMinutes = nextPrayer.timeMinutes - currentMinutes;
  if (diffMinutes < 0) {
    diffMinutes += 24 * 60;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  const remMinutes = diffMinutes % 60;
  const timeUntilNext = diffHours > 0 ? `${diffHours}h ${remMinutes}m` : `${remMinutes}m`;

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
    timeUntilNext,
    currentPrayer: currentPrayer || obligatoryOnly[obligatoryOnly.length - 1],
    locationName,
    method,
    asrMethod,
  };
}

/**
 * Backward compatibility wrapper
 */
export function getDailyPrayerTimes(
  date: Date = new Date(),
  lat?: number,
  lng?: number,
  locationName?: string
): PrayerStatus {
  // If coordinates provided, use precise calculation
  if (lat !== undefined && lng !== undefined) {
    return calculatePrecisePrayerTimes(lat, lng, date, 'MWL', 'Standard', locationName || 'Local');
  }

  // Check saved location in localStorage
  try {
    const savedLoc = localStorage.getItem('annur_saved_location');
    if (savedLoc) {
      const parsed = JSON.parse(savedLoc);
      if (parsed.lat && parsed.lng) {
        return calculatePrecisePrayerTimes(
          parsed.lat,
          parsed.lng,
          date,
          parsed.method || 'MWL',
          parsed.asrMethod || 'Standard',
          parsed.name || 'Saved Location'
        );
      }
    }
  } catch (e) {
    // ignore
  }

  return calculatePrecisePrayerTimes(28.6139, 77.209, date, 'MWL', 'Standard', 'India (Default)');
}

/**
 * Web Audio API synthesized Adhan Chime preview
 * Generates an ethereal, peaceful resonant chime chord without network dependency
 */
export function playSyntheticAdhanPreview(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
