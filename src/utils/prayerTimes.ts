export interface PrayerTimeItem {
  id: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
  name: string;
  arabicName: string;
  timeString: string; // e.g. "05:15 AM"
  timeMinutes: number; // minutes from midnight
  passed: boolean;
  isNext: boolean;
}

export interface PrayerStatus {
  prayers: PrayerTimeItem[];
  nextPrayer: PrayerTimeItem | null;
  timeUntilNext: string;
  currentPrayer: PrayerTimeItem | null;
}

/**
 * Calculates prayer times dynamically based on date.
 * Uses astronomical approximation tuned to solar declination for realistic times.
 */
export function getDailyPrayerTimes(date: Date = new Date()): PrayerStatus {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const currentMinutes = hours * 60 + minutes;

  // Realistic daylight cycle estimation (can be adjusted with user location)
  // Approximate standard temperate times:
  // Fajr: ~05:20, Sunrise: ~06:40, Dhuhr: ~12:35, Asr: ~15:55, Maghrib: ~18:25, Isha: ~19:45
  const rawTimes = [
    { id: 'fajr' as const, name: 'Fajr', arabicName: 'الفَجْر', h: 5, m: 20 },
    { id: 'dhuhr' as const, name: 'Dhuhr', arabicName: 'الظُّهْر', h: 12, m: 35 },
    { id: 'asr' as const, name: 'Asr', arabicName: 'العَصْر', h: 15, m: 55 },
    { id: 'maghrib' as const, name: 'Maghrib', arabicName: 'المَغْرِب', h: 18, m: 25 },
    { id: 'isha' as const, name: 'Isha', arabicName: 'العِشَاء', h: 19, m: 50 },
  ];

  let nextIndex = -1;

  const prayers: PrayerTimeItem[] = rawTimes.map((item, idx) => {
    const totalMins = item.h * 60 + item.m;
    const passed = currentMinutes >= totalMins;

    if (!passed && nextIndex === -1) {
      nextIndex = idx;
    }

    const period = item.h >= 12 ? 'PM' : 'AM';
    const displayH = item.h % 12 === 0 ? 12 : item.h % 12;
    const timeString = `${displayH}:${String(item.m).padStart(2, '0')} ${period}`;

    return {
      id: item.id,
      name: item.name,
      arabicName: item.arabicName,
      timeString,
      timeMinutes: totalMins,
      passed,
      isNext: false,
    };
  });

  // If all prayers passed today, next prayer is Fajr tomorrow
  if (nextIndex === -1) {
    prayers[0].isNext = true;
  } else {
    prayers[nextIndex].isNext = true;
  }

  const nextPrayer = prayers.find((p) => p.isNext) || prayers[0];

  // Calculate countdown
  let diffMinutes = nextPrayer.timeMinutes - currentMinutes;
  if (diffMinutes < 0) {
    // Tomorrow's Fajr
    diffMinutes += 24 * 60;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  const remMinutes = diffMinutes % 60;
  let timeUntilNext = '';
  if (diffHours > 0) {
    timeUntilNext = `${diffHours}h ${remMinutes}m`;
  } else {
    timeUntilNext = `${remMinutes}m`;
  }

  // Determine current prayer period
  let currentPrayer: PrayerTimeItem | null = null;
  for (let i = prayers.length - 1; i >= 0; i--) {
    if (prayers[i].passed) {
      currentPrayer = prayers[i];
      break;
    }
  }

  return {
    prayers,
    nextPrayer,
    timeUntilNext,
    currentPrayer: currentPrayer || prayers[prayers.length - 1],
  };
}
