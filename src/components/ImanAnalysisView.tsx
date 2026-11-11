import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Heart,
  Flame,
  CheckCircle2,
  Circle,
  Sparkles,
  TrendingUp,
  BookOpen,
  Calendar,
  Save,
  RotateCcw,
  Award,
  Compass,
  ChevronRight,
  Sun,
  Moon,
  ShieldCheck,
  Feather,
  BarChart3,
  Lightbulb,
} from 'lucide-react';
import { DailyPrayers, ImanDayRecord, UserProfileData } from '../types/quran';
import { playGentleChime } from '../utils/notifications';
import { getPastDaysImanRecords, loadImanRecord, saveImanRecord } from '../utils/offlineStorage';

interface ImanAnalysisViewProps {
  imanRecord: ImanDayRecord;
  profile: UserProfileData;
  streak: number;
  onUpdateImanRecord: (record: ImanDayRecord) => void;
  onTogglePrayer: (prayerKey: keyof DailyPrayers) => void;
  onBackToDashboard: () => void;
  onStartReading?: () => void;
  onOpenSmartTasbih?: () => void;
}

type TabMode = 'overview' | 'analytics' | 'muhasabah' | 'guidance';

const OBLIGATORY_PRAYERS: { id: keyof DailyPrayers; label: string; arabic: string; timeHint: string }[] = [
  { id: 'fajr', label: 'Fajr', arabic: 'الفَجْر', timeHint: 'Dawn · Light of the morning' },
  { id: 'dhuhr', label: 'Dhuhr', arabic: 'الظُّهْر', timeHint: 'Midday · Sun declines' },
  { id: 'asr', label: 'Asr', arabic: 'العَصْر', timeHint: 'Afternoon · Mid-day stillness' },
  { id: 'maghrib', label: 'Maghrib', arabic: 'المَغْرِب', timeHint: 'Sunset · Twilight remembrance' },
  { id: 'isha', label: 'Isha', arabic: 'العِشَاء', timeHint: 'Night · Peace before rest' },
];

const NAWAFIL_PRAYERS: { id: keyof DailyPrayers; label: string; arabic: string; virtue: string }[] = [
  { id: 'tahajjud', label: 'Tahajjud (Night Vigil)', arabic: 'قِيَامُ اللَّيْل', virtue: 'The honor of the believer; prayer in the last third of the night.' },
  { id: 'duha', label: 'Salat ad-Duha (Forenoon)', arabic: 'صَلَاةُ الضُّحَى', virtue: 'Sadaqah for all 360 joints of the body; prayer of the returning penitents.' },
];

const HEART_STATES: { id: NonNullable<ImanDayRecord['heartState']>; label: string; arabic: string; desc: string }[] = [
  { id: 'peaceful', label: 'Sakina (Peaceful)', arabic: 'سَكِينَة', desc: 'Heart tranquil with remembrance' },
  { id: 'grateful', label: 'Shukr (Grateful)', arabic: 'شُكْر', desc: 'Deep appreciation for Allah’s favors' },
  { id: 'reflective', label: 'Fikr (Reflective)', arabic: 'تَفَكُّر', desc: 'Contemplating Quran & creation' },
  { id: 'seeking_forgiveness', label: 'Tawbah (Seeking Istighfar)', arabic: 'تَوْبَة', desc: 'Turning to Allah with humility' },
  { id: 'struggling', label: 'Mujahadah (Striving)', arabic: 'مُجَاهَدَة', desc: 'Patience and persevering through trials' },
];

const PROPHETIC_REMEDIES = [
  {
    title: 'The Great Renewal: La Ilaha Illallah',
    arabic: 'جَدِّدُوا إِيمَانَكُمْ قِيلَ: كَيْفَ نُجَدِّدُ إِيمَانَنَا؟ قَالَ: أَكْثِرُوا مِنْ قَوْلِ لا إِلَهَ إِلا اللَّهُ',
    translation: '“Renew your faith!” It was asked: “How do we renew our faith?” The Prophet (ﷺ) replied: “Frequently recite: Lā ilāha illallāh.”',
    source: 'Musnad Ahmad & Al-Hakim (Sahih)',
    action: 'Recite with sincere contemplation of Allah’s sole sovereignty.',
  },
  {
    title: 'Wear and Tear of Faith',
    arabic: 'إِنَّ الإِيمَانَ لَيَخْلَقُ فِي جَوْفِ أَحَدِكُمْ كَمَا يَخْلَقُ الثَّوْبُ، فَاسْأَلُوا اللَّهَ أَنْ يُجَدِّدَ الإِيمَانَ فِي قُلُوبِكُمْ',
    translation: '“Verily, faith wears out inside one of you just as clothes wear out; so ask Allah to renew faith in your hearts.”',
    source: 'Al-Mustadrak (Sahih al-Jami #1590)',
    action: 'Dua: Allāhumma jaddidil-īmāna fī qalbī (O Allah, renew faith in my heart).',
  },
  {
    title: 'Consistency Above Quantity',
    arabic: 'أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ تَعَالَى أَدْوَمُهَا وَإِنْ قَلَّ',
    translation: '“The deeds most beloved to Allah are those that are consistent, even if they are few.”',
    source: 'Sahih al-Bukhari & Sahih Muslim',
    action: 'Anchor a small habit: 2 pages of Quran and 33 SubhanAllah every day.',
  },
];

const REFLECTION_PROMPTS = [
  'Which Quranic Ayah brought tears or tranquility to my heart today?',
  'What blessing from Allah did I notice and thank Him for?',
  'What mistake or impatience do I sincerely ask Allah to forgive tonight?',
  'Whom can I forgive or make heartfelt Dua for right now?',
];

export const ImanAnalysisView: React.FC<ImanAnalysisViewProps> = ({
  imanRecord,
  profile,
  streak,
  onUpdateImanRecord,
  onTogglePrayer,
  onBackToDashboard,
  onStartReading,
  onOpenSmartTasbih,
}) => {
  const [activeTab, setActiveTab] = useState<TabMode>('overview');
  const [reflectionText, setReflectionText] = useState(imanRecord.reflection || '');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [selectedHistoryDays, setSelectedHistoryDays] = useState<number>(7);
  const [activeDayInspect, setActiveDayInspect] = useState<ImanDayRecord | null>(null);

  // Past records for trends
  const pastRecords = useMemo(() => {
    return getPastDaysImanRecords(selectedHistoryDays);
  }, [selectedHistoryDays, imanRecord]);

  // Synchronize reflection if external changes occur
  useEffect(() => {
    setReflectionText(imanRecord.reflection || '');
  }, [imanRecord.reflection]);

  // Calculations for Today's Score
  const completedFard = useMemo(() => {
    return OBLIGATORY_PRAYERS.filter((p) => imanRecord.prayers[p.id]).length;
  }, [imanRecord.prayers]);

  const completedNawafil = useMemo(() => {
    return NAWAFIL_PRAYERS.filter((p) => imanRecord.prayers[p.id]).length;
  }, [imanRecord.prayers]);

  const prayerPercent = (completedFard / 5) * 100;
  const verseGoal = profile.dailyVerseGoal || 10;
  const versePercent = Math.min(100, Math.round((imanRecord.versesRead / verseGoal) * 100));
  const dhikrPercent = Math.min(100, Math.round((imanRecord.dhikrCount / 100) * 100));

  // Balanced Comprehensive Iman Index:
  // Prayers: 60%
  // Quran Verses: 25%
  // Dhikr: 10%
  // Heart State / Extra Sunnah: 5%
  const extraScore = (completedNawafil > 0 ? 3 : 0) + (imanRecord.heartState ? 2 : 0);
  const totalImanScore = useMemo(() => {
    const pWeight = (completedFard / 5) * 60;
    const vWeight = (Math.min(verseGoal, imanRecord.versesRead) / verseGoal) * 25;
    const dWeight = (Math.min(100, imanRecord.dhikrCount) / 100) * 10;
    return Math.min(100, Math.round(pWeight + vWeight + dWeight + extraScore));
  }, [completedFard, imanRecord.versesRead, verseGoal, imanRecord.dhikrCount, extraScore]);

  // Animated ring stroke calculations (SVG circle r=88, circumference ~ 552.92)
  const circleRadius = 84;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circleCircumference - (totalImanScore / 100) * circleCircumference;

  // Level classification
  const levelInfo = useMemo(() => {
    if (totalImanScore >= 90) {
      return {
        title: 'Al-Muqarrabun',
        arabic: 'المُقَرَّبُونَ',
        desc: 'The Foremost in Faith & Closeness to the Divine',
        colorClass: 'text-emerald-500 dark:text-emerald-400',
        bgClass: 'bg-emerald-500/10 border-emerald-500/30',
        ringGradient: ['#10b981', '#059669'],
      };
    }
    if (totalImanScore >= 75) {
      return {
        title: 'Al-Muhsinun',
        arabic: 'المُحْسِنُونَ',
        desc: 'Those Living in Conscious Spiritual Excellence',
        colorClass: 'text-amber-500 dark:text-amber-400',
        bgClass: 'bg-amber-500/10 border-amber-500/30',
        ringGradient: ['#f59e0b', '#d97706'],
      };
    }
    if (totalImanScore >= 50) {
      return {
        title: 'Al-Muqtisidun',
        arabic: 'المُقْتَصِدُونَ',
        desc: 'The Steadfast on the Middle Upright Path',
        colorClass: 'text-stone-800 dark:text-stone-200',
        bgClass: 'bg-stone-500/10 border-stone-500/30',
        ringGradient: ['#78716c', '#57534e'],
      };
    }
    return {
      title: 'Talib ar-Rahmah',
      arabic: 'طَالِبُ الرَّحْمَة',
      desc: 'The Sincere Seeker of Divine Mercy & Elevation',
      colorClass: 'text-stone-600 dark:text-stone-400',
      bgClass: 'bg-stone-200 dark:bg-stone-800 border-stone-300 dark:border-stone-700',
      ringGradient: ['#a8a29e', '#78716c'],
    };
  }, [totalImanScore]);

  // Weekly analytics aggregates
  const weeklyAnalytics = useMemo(() => {
    let totalScoreSum = 0;
    let totalPrayersDone = 0;
    let totalVerses = 0;
    let totalDhikr = 0;

    pastRecords.forEach((rec) => {
      const pCount = OBLIGATORY_PRAYERS.filter((p) => rec.prayers[p.id]).length;
      totalPrayersDone += pCount;
      totalVerses += rec.versesRead || 0;
      totalDhikr += rec.dhikrCount || 0;

      const pW = (pCount / 5) * 60;
      const vW = (Math.min(verseGoal, rec.versesRead || 0) / verseGoal) * 25;
      const dW = (Math.min(100, rec.dhikrCount || 0) / 100) * 10;
      totalScoreSum += Math.min(100, Math.round(pW + vW + dW));
    });

    const avgScore = pastRecords.length > 0 ? Math.round(totalScoreSum / pastRecords.length) : totalImanScore;
    const prayerRate = pastRecords.length > 0 ? Math.round((totalPrayersDone / (pastRecords.length * 5)) * 100) : 0;

    return {
      avgScore,
      totalPrayersDone,
      totalVerses,
      totalDhikr,
      prayerRate,
    };
  }, [pastRecords, totalImanScore, verseGoal]);

  const handleSaveReflection = () => {
    const updated: ImanDayRecord = {
      ...imanRecord,
      reflection: reflectionText,
    };
    onUpdateImanRecord(updated);
    saveImanRecord(updated);
    playGentleChime();
    setSaveStatus('Reflection saved peacefully');
    setTimeout(() => setSaveStatus(null), 2500);
  };

  const handleSetHeartState = (state: NonNullable<ImanDayRecord['heartState']>) => {
    const updated: ImanDayRecord = {
      ...imanRecord,
      heartState: imanRecord.heartState === state ? undefined : state,
    };
    onUpdateImanRecord(updated);
    saveImanRecord(updated);
    playGentleChime();
  };

  const handleQuickDhikr = () => {
    const newCount = (imanRecord.dhikrCount || 0) + 1;
    const updated: ImanDayRecord = {
      ...imanRecord,
      dhikrCount: newCount,
    };
    onUpdateImanRecord(updated);
    saveImanRecord(updated);
    if (newCount % 33 === 0) {
      playGentleChime();
    }
  };

  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 overflow-y-auto select-none">
      {/* Top App Bar with Back to Dashboard */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between pb-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBackToDashboard}
              className="w-9 h-9 flex items-center justify-center text-black dark:text-white rounded-2xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-900 dark:hover:bg-stone-800 transition-all active:scale-95 shrink-0 shadow-2xs"
              title="Return to Dashboard"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.4]" />
            </button>
            <div className="min-w-0">
              <h1 className="text-base font-bold text-black dark:text-white font-cinzel tracking-tight truncate leading-none">
                Iman & Spiritual Index
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mt-1 truncate">
                <span className="font-semibold">{todayFormatted}</span>
                <span className="opacity-40" aria-hidden="true">·</span>
                <span className="font-quran text-[11px] text-stone-700 dark:text-stone-300">ميزان العمل الصالح</span>
              </div>
            </div>
          </div>

          {/* Spiritual Streak Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shrink-0 shadow-2xs">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="text-xs font-bold text-black dark:text-white tabular-nums">{streak}d Streak</span>
          </div>
        </div>

        {/* Refined Segmented Control Tab Navigation */}
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-4 gap-1 p-1 bg-stone-100/90 dark:bg-stone-900/90 rounded-2xl border border-stone-200/70 dark:border-stone-800/70 shadow-2xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center justify-center gap-1.5 py-2 px-1 text-xs font-bold rounded-xl transition-all duration-200 ${
                activeTab === 'overview'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white hover:bg-stone-200/50 dark:hover:bg-stone-800/50'
              }`}
              title="Today's Score & Ring"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-500" />
              <span className="hidden sm:inline truncate">Today's Score</span>
              <span className="sm:hidden truncate">Score</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center justify-center gap-1.5 py-2 px-1 text-xs font-bold rounded-xl transition-all duration-200 ${
                activeTab === 'analytics'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white hover:bg-stone-200/50 dark:hover:bg-stone-800/50'
              }`}
              title="Multi-Day Trends & Analytics"
            >
              <BarChart3 className="w-3.5 h-3.5 shrink-0 text-blue-500" />
              <span className="truncate">Trends</span>
            </button>

            <button
              onClick={() => setActiveTab('muhasabah')}
              className={`flex items-center justify-center gap-1.5 py-2 px-1 text-xs font-bold rounded-xl transition-all duration-200 ${
                activeTab === 'muhasabah'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white hover:bg-stone-200/50 dark:hover:bg-stone-800/50'
              }`}
              title="Muhasabah Reflection Journal"
            >
              <Feather className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
              <span className="hidden sm:inline truncate">Muhasabah</span>
              <span className="sm:hidden truncate">Journal</span>
            </button>

            <button
              onClick={() => setActiveTab('guidance')}
              className={`flex items-center justify-center gap-1.5 py-2 px-1 text-xs font-bold rounded-xl transition-all duration-200 ${
                activeTab === 'guidance'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white hover:bg-stone-200/50 dark:hover:bg-stone-800/50'
              }`}
              title="Prophetic Remedies & Guidance"
            >
              <Lightbulb className="w-3.5 h-3.5 shrink-0 text-amber-400" />
              <span className="truncate">Remedies</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Tab Content */}
      <main className="max-w-3xl w-full mx-auto px-4 py-5 space-y-6">
        {/* ======================= TAB 1: OVERVIEW & ANIMATED PERCENT RING ======================= */}
        {activeTab === 'overview' && (
          <>
            {/* Centerpiece Animated Multi-layered Percent Ring */}
            <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800/80 shadow-xs relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-radial from-amber-500/5 via-transparent to-transparent pointer-events-none" />

              <div className="relative flex items-center justify-center w-56 h-56">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 200 200">
                  <defs>
                    <linearGradient id="imanRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#d97706" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                    <linearGradient id="innerPrayerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>

                  {/* Outer Track */}
                  <circle
                    cx="100"
                    cy="100"
                    r={circleRadius}
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="10"
                    className="text-stone-200 dark:text-stone-800"
                  />

                  {/* Animated Outer Progress Ring */}
                  <circle
                    cx="100"
                    cy="100"
                    r={circleRadius}
                    fill="transparent"
                    stroke="url(#imanRingGrad)"
                    strokeWidth="10"
                    strokeDasharray={circleCircumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />

                  {/* Inner Concentric Track for Prayers */}
                  <circle
                    cx="100"
                    cy="100"
                    r={circleRadius - 15}
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-stone-200/60 dark:text-stone-800/60"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r={circleRadius - 15}
                    fill="transparent"
                    stroke="#10b981"
                    strokeWidth="4"
                    strokeDasharray={2 * Math.PI * (circleRadius - 15)}
                    strokeDashoffset={
                      2 * Math.PI * (circleRadius - 15) - (prayerPercent / 100) * 2 * Math.PI * (circleRadius - 15)
                    }
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                {/* Center Content Inside the Ring */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-stone-500 dark:text-stone-400">
                    Faith Index
                  </span>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl sm:text-5xl font-extrabold font-cinzel text-black dark:text-white tabular-nums">
                      {totalImanScore}
                    </span>
                    <span className="text-xl font-bold text-amber-500 dark:text-amber-400 ml-0.5">%</span>
                  </div>
                  <span className="font-quran text-sm text-stone-800 dark:text-stone-200 font-bold mt-0.5">
                    {levelInfo.arabic}
                  </span>
                  <span className="text-[10.5px] font-bold text-stone-700 dark:text-stone-300 truncate max-w-[150px]">
                    {levelInfo.title}
                  </span>
                </div>
              </div>

              {/* Status explanation below ring */}
              <div className="mt-4 text-center max-w-sm">
                <p className="text-xs text-stone-600 dark:text-stone-400 font-medium">
                  {levelInfo.desc}
                </p>
                <div className="mt-2.5 flex items-center justify-center gap-3 text-[11px] font-bold">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Salah {completedFard}/5
                  </span>
                  <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Quran {imanRecord.versesRead}v
                  </span>
                  <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Dhikr {imanRecord.dhikrCount}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Interactive Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* 1. Daily Prayers Card */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                      Obligatory Salah
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {completedFard}/5
                    </span>
                  </div>
                  <div className="w-full bg-stone-200 dark:bg-stone-800 h-2 rounded-full overflow-hidden mb-3">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${prayerPercent}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400">
                    {completedFard === 5
                      ? 'All 5 Fard prayers observed. May Allah accept!'
                      : `${5 - completedFard} prayers remaining today.`}
                  </p>
                </div>
                <div className="pt-3">
                  <span className="text-[10px] text-stone-400 uppercase font-bold">Quick Toggle:</span>
                  <div className="flex items-center gap-1 mt-1">
                    {OBLIGATORY_PRAYERS.map((p) => {
                      const isDone = !!imanRecord.prayers[p.id];
                      return (
                        <button
                          key={p.id}
                          onClick={() => onTogglePrayer(p.id)}
                          className={`flex-1 py-1 text-[10px] font-bold rounded-lg transition-all ${
                            isDone
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-300'
                          }`}
                          title={`Toggle ${p.label}`}
                        >
                          {p.label.substring(0, 3)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 2. Quranic Verses Card */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                      Quran Recitation
                    </span>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                      {imanRecord.versesRead}/{verseGoal} v
                    </span>
                  </div>
                  <div className="w-full bg-stone-200 dark:bg-stone-800 h-2 rounded-full overflow-hidden mb-3">
                    <div
                      className="bg-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${versePercent}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400">
                    {imanRecord.versesRead >= verseGoal
                      ? 'Daily recitation quota fulfilled!'
                      : `${Math.max(0, verseGoal - imanRecord.versesRead)} verses until daily goal.`}
                  </p>
                </div>
                {onStartReading && (
                  <button
                    onClick={onStartReading}
                    className="mt-3 w-full py-1.5 px-3 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Recite Quran Now</span>
                  </button>
                )}
              </div>

              {/* 3. Sacred Dhikr & Tasbih Card */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                      Sacred Dhikr
                    </span>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {imanRecord.dhikrCount} Tally
                    </span>
                  </div>
                  <div className="w-full bg-stone-200 dark:bg-stone-800 h-2 rounded-full overflow-hidden mb-3">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${dhikrPercent}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400">
                    Remembering Allah brings ease and removes spiritual rust.
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1.5">
                  <button
                    onClick={handleQuickDhikr}
                    className="flex-1 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs transition-all flex items-center justify-center gap-1 shadow-2xs"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>+1 Tap</span>
                  </button>
                  {onOpenSmartTasbih && (
                    <button
                      onClick={onOpenSmartTasbih}
                      className="px-2.5 py-1.5 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold text-xs hover:bg-stone-300 dark:hover:bg-stone-700 transition-all"
                      title="Open Smart Digital Tasbih Full Tab"
                    >
                      Tasbih ↗
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Comprehensive Salah Breakdown Checklist */}
            <div className="p-5 rounded-3xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-black dark:text-white font-cinzel">
                    The 5 Fard Prayers Breakdown
                  </h3>
                  <p className="text-xs text-stone-500">
                    The pillar of Islam; the first deed questioned on the Day of Judgment.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {completedFard} / 5 Done
                </span>
              </div>

              <div className="space-y-2">
                {OBLIGATORY_PRAYERS.map((prayer) => {
                  const isDone = !!imanRecord.prayers[prayer.id];
                  return (
                    <button
                      key={prayer.id}
                      onClick={() => onTogglePrayer(prayer.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all text-left ${
                        isDone
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
                          : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 fill-emerald-500/20 shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-stone-300 dark:text-stone-700 shrink-0" />
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-black dark:text-white">
                              {prayer.label}
                            </span>
                            <span className="font-quran text-xs text-stone-600 dark:text-stone-400">
                              {prayer.arabic}
                            </span>
                          </div>
                          <span className="text-[11px] text-stone-500 dark:text-stone-400">
                            {prayer.timeHint}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-xl transition-colors ${
                          isDone
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                        }`}
                      >
                        {isDone ? 'Completed ✓' : 'Mark Done'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Nawafil Section */}
              <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
                <div className="mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Sunnah & Voluntary Worship (Nawafil)
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    Extra intimacy with Allah, compensating for any involuntary deficiencies.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {NAWAFIL_PRAYERS.map((nawafil) => {
                    const isDone = !!imanRecord.prayers[nawafil.id];
                    return (
                      <button
                        key={nawafil.id}
                        onClick={() => onTogglePrayer(nawafil.id)}
                        className={`flex items-start gap-2.5 p-3 rounded-2xl border transition-all text-left ${
                          isDone
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
                            : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-4 h-4 text-stone-300 dark:text-stone-700 shrink-0 mt-0.5" />
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-black dark:text-white">
                              {nawafil.label}
                            </span>
                            <span className="font-quran text-[11px] text-stone-500">
                              {nawafil.arabic}
                            </span>
                          </div>
                          <p className="text-[10px] text-stone-500 leading-tight mt-0.5">
                            {nawafil.virtue}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Spiritual Temperature & State of the Heart (Ahwal al-Qalb) */}
            <div className="p-5 rounded-3xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-black dark:text-white font-cinzel">
                    State of the Heart (أَحْوَالُ القَلْب)
                  </h3>
                  <p className="text-xs text-stone-500">
                    How is your spiritual presence and contentment today?
                  </p>
                </div>
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {HEART_STATES.map((state) => {
                  const isSelected = imanRecord.heartState === state.id;
                  return (
                    <button
                      key={state.id}
                      onClick={() => handleSetHeartState(state.id)}
                      className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                        isSelected
                          ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-xs'
                          : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                      }`}
                    >
                      <span className="font-quran text-sm font-bold">{state.arabic}</span>
                      <span className="text-[11px] font-bold mt-0.5">{state.label.split(' ')[0]}</span>
                      <span className="text-[9px] opacity-75 truncate max-w-[100px] mt-0.5">
                        {state.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ======================= TAB 2: MULTI-DAY TRENDS & ANALYTICS ======================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Range Toggle & Summary Banner */}
            <div className="p-5 rounded-3xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-black dark:text-white font-cinzel">
                    Spiritual Trajectory & Consistency
                  </h3>
                  <p className="text-xs text-stone-500">
                    Track your daily worship ebb and flow over time.
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-stone-200 dark:bg-stone-800 p-1 rounded-xl">
                  <button
                    onClick={() => setSelectedHistoryDays(7)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                      selectedHistoryDays === 7
                        ? 'bg-white dark:bg-stone-950 text-black dark:text-white shadow-2xs'
                        : 'text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    7 Days
                  </button>
                  <button
                    onClick={() => setSelectedHistoryDays(14)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                      selectedHistoryDays === 14
                        ? 'bg-white dark:bg-stone-950 text-black dark:text-white shadow-2xs'
                        : 'text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    14 Days
                  </button>
                </div>
              </div>

              {/* 4 Summary Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <div className="p-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center">
                  <span className="text-[10px] text-stone-500 uppercase font-bold">Avg. Faith Level</span>
                  <p className="text-xl font-bold font-cinzel text-black dark:text-white mt-0.5">
                    {weeklyAnalytics.avgScore}%
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center">
                  <span className="text-[10px] text-stone-500 uppercase font-bold">Prayer Adherence</span>
                  <p className="text-xl font-bold font-cinzel text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {weeklyAnalytics.prayerRate}%
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center">
                  <span className="text-[10px] text-stone-500 uppercase font-bold">Verses Recited</span>
                  <p className="text-xl font-bold font-cinzel text-blue-600 dark:text-blue-400 mt-0.5">
                    {weeklyAnalytics.totalVerses}
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center">
                  <span className="text-[10px] text-stone-500 uppercase font-bold">Active Streak</span>
                  <p className="text-xl font-bold font-cinzel text-amber-500 mt-0.5">
                    {streak} Days
                  </p>
                </div>
              </div>

              {/* Interactive Trend Bar Chart */}
              <div className="pt-3">
                <div className="flex items-end justify-between gap-2 h-44 px-2 pt-4 border-b border-stone-200 dark:border-stone-800">
                  {pastRecords.map((record, idx) => {
                    const pDone = OBLIGATORY_PRAYERS.filter((p) => record.prayers[p.id]).length;
                    const vW = (Math.min(verseGoal, record.versesRead || 0) / verseGoal) * 25;
                    const pW = (pDone / 5) * 60;
                    const dW = (Math.min(100, record.dhikrCount || 0) / 100) * 10;
                    const dayPercent = Math.min(100, Math.round(pW + vW + dW));

                    const dateObj = new Date(record.date);
                    const dayLabel = dateObj.toLocaleDateString('en-US', { weekday: 'narrow' });
                    const isToday = idx === pastRecords.length - 1;
                    const isSelected = activeDayInspect?.date === record.date;

                    return (
                      <div
                        key={record.date}
                        onClick={() => setActiveDayInspect(record)}
                        className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                      >
                        {/* Bar tooltip / number on hover */}
                        <span className="text-[9px] font-mono font-bold text-stone-500 group-hover:text-black dark:group-hover:text-white transition-colors mb-1">
                          {dayPercent}%
                        </span>

                        {/* Bar */}
                        <div className="w-full max-w-[28px] bg-stone-200 dark:bg-stone-800 rounded-t-lg h-32 flex items-end overflow-hidden p-0.5">
                          <div
                            className={`w-full rounded-t-md transition-all duration-700 ${
                              isSelected
                                ? 'bg-amber-500'
                                : isToday
                                ? 'bg-black dark:bg-white'
                                : dayPercent >= 75
                                ? 'bg-emerald-500'
                                : 'bg-stone-400 dark:bg-stone-600'
                            }`}
                            style={{ height: `${Math.max(8, dayPercent)}%` }}
                          />
                        </div>

                        {/* Day label */}
                        <span
                          className={`text-[10px] font-bold mt-1.5 ${
                            isToday
                              ? 'text-amber-500 font-extrabold'
                              : isSelected
                              ? 'text-black dark:text-white'
                              : 'text-stone-400'
                          }`}
                        >
                          {dayLabel}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between text-[10px] text-stone-400 mt-2 px-1">
                  <span>← Older</span>
                  <span>Tap any day to inspect details</span>
                  <span>Today →</span>
                </div>
              </div>

              {/* Inspected Day Details if clicked */}
              {activeDayInspect && (
                <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 mt-2 animate-in fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-black dark:text-white">
                      Day Log: {activeDayInspect.date}
                    </span>
                    <button
                      onClick={() => setActiveDayInspect(null)}
                      className="text-[10px] text-stone-400 hover:text-black dark:hover:text-white"
                    >
                      Dismiss
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800/60">
                      <span className="text-stone-500 block text-[10px]">Prayers</span>
                      <strong className="text-black dark:text-white">
                        {OBLIGATORY_PRAYERS.filter((p) => activeDayInspect.prayers[p.id]).length}/5 Done
                      </strong>
                    </div>
                    <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800/60">
                      <span className="text-stone-500 block text-[10px]">Verses</span>
                      <strong className="text-blue-600 dark:text-blue-400">
                        {activeDayInspect.versesRead || 0} Verses
                      </strong>
                    </div>
                    <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800/60">
                      <span className="text-stone-500 block text-[10px]">Dhikr</span>
                      <strong className="text-amber-600 dark:text-amber-400">
                        {activeDayInspect.dhikrCount || 0} Recited
                      </strong>
                    </div>
                  </div>
                  {activeDayInspect.reflection && (
                    <div className="mt-2.5 p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 text-xs italic text-stone-600 dark:text-stone-300">
                      “{activeDayInspect.reflection}”
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Spiritual Istiqamah Milestones & Badges */}
            <div className="p-5 rounded-3xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-black dark:text-white font-cinzel">
                  Spiritual Milestones & Istiqamah
                </h3>
                <Award className="w-4 h-4 text-amber-500" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className={`p-3 rounded-2xl border ${streak >= 3 ? 'bg-amber-500/10 border-amber-500/30' : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 opacity-60'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🌱</span>
                    <div>
                      <h4 className="text-xs font-bold text-black dark:text-white">Seed of Istiqamah</h4>
                      <p className="text-[10px] text-stone-500">3 Consecutive Days</p>
                    </div>
                  </div>
                </div>

                <div className={`p-3 rounded-2xl border ${streak >= 7 ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 opacity-60'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">✨</span>
                    <div>
                      <h4 className="text-xs font-bold text-black dark:text-white">Illuminated Week</h4>
                      <p className="text-[10px] text-stone-500">7 Consecutive Days</p>
                    </div>
                  </div>
                </div>

                <div className={`p-3 rounded-2xl border ${weeklyAnalytics.totalVerses >= 50 ? 'bg-blue-500/10 border-blue-500/30' : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 opacity-60'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📖</span>
                    <div>
                      <h4 className="text-xs font-bold text-black dark:text-white">Companion of Quran</h4>
                      <p className="text-[10px] text-stone-500">50+ Verses This Cycle</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 3: MUHASABAH & REFLECTION JOURNAL ======================= */}
        {activeTab === 'muhasabah' && (
          <div className="space-y-5">
            {/* Spiritual Quote banner */}
            <div className="p-4 rounded-3xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center">
              <span className="font-quran text-base text-stone-800 dark:text-stone-200 block mb-1">
                حَاسِبُوا أَنْفُسَكُمْ قَبْلَ أَنْ تُحَاسَبُوا، وَزِنُوهَا قَبْلَ أَنْ تُوزَنُوا
              </span>
              <p className="text-xs text-stone-600 dark:text-stone-400 italic">
                “Bring yourselves to account before you are brought to account, and weigh your deeds before they are weighed for you.”
              </p>
              <span className="text-[10px] text-stone-500 uppercase tracking-wider block mt-1">
                — Sayyiduna Umar ibn al-Khattab (رضي الله عنه)
              </span>
            </div>

            {/* Reflection Journal Area */}
            <div className="p-5 rounded-3xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-black dark:text-white font-cinzel">
                    Today's Spiritual Introspection (مُحَاسَبَة)
                  </h3>
                  <p className="text-xs text-stone-500">
                    Write down an honest reflection, confession, or gratitude for your Creator.
                  </p>
                </div>
                <Feather className="w-4 h-4 text-stone-400" />
              </div>

              {/* Quick reflection prompt buttons */}
              <div>
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block mb-1.5">
                  Inspire your thought:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {REFLECTION_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => {
                        const newText = reflectionText ? `${reflectionText}\n\n• ${prompt}\n` : `• ${prompt}\n`;
                        setReflectionText(newText);
                      }}
                      className="px-2.5 py-1 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-[11px] text-stone-700 dark:text-stone-300 hover:border-amber-500 transition-colors text-left"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <div className="space-y-2">
                <textarea
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  placeholder="In the silence of the night, speak to Allah about your heart, your hopes, and your shortcomings..."
                  rows={6}
                  className="w-full p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all resize-none font-sans leading-relaxed"
                />

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    {saveStatus || ''}
                  </span>
                  <button
                    onClick={handleSaveReflection}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-xs hover:opacity-90 transition-all shadow-xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Reflection</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Past Reflections Archive */}
            <div className="p-5 rounded-3xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-3">
              <h3 className="text-sm font-bold text-black dark:text-white font-cinzel">
                Past Reflections Archive
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {pastRecords
                  .filter((r) => !!r.reflection && r.date !== imanRecord.date)
                  .reverse()
                  .map((rec) => (
                    <div
                      key={rec.date}
                      className="p-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-[10px] text-stone-400 font-bold">
                        <span>{rec.date}</span>
                        <span>{OBLIGATORY_PRAYERS.filter((p) => rec.prayers[p.id]).length}/5 Salah</span>
                      </div>
                      <p className="text-stone-700 dark:text-stone-300 whitespace-pre-wrap leading-relaxed">
                        {rec.reflection}
                      </p>
                    </div>
                  ))}
                {pastRecords.filter((r) => !!r.reflection && r.date !== imanRecord.date).length === 0 && (
                  <p className="text-xs text-stone-400 text-center py-4">
                    No past reflections stored in the previous days yet. Start today!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================= TAB 4: PROPHETIC REMEDIES & GUIDANCE ======================= */}
        {activeTab === 'guidance' && (
          <div className="space-y-5">
            {/* Header info */}
            <div className="p-5 rounded-3xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-2">
              <h3 className="text-sm font-bold text-black dark:text-white font-cinzel">
                Prophetic Prescriptions for the Heart
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Faith is not a static number—it naturally ebbs and flows with trials, neglect, and remembrance.
                Here are authentic spiritual remedies taught by Rasulullah (ﷺ) to re-ignite your spiritual vitality.
              </p>
            </div>

            {/* Remedies Cards */}
            <div className="space-y-3">
              {PROPHETIC_REMEDIES.map((remedy, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-black dark:text-white font-cinzel">
                      {remedy.title}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-stone-400">
                      #{idx + 1}
                    </span>
                  </div>

                  <p className="font-quran text-sm text-stone-800 dark:text-stone-200 leading-relaxed text-right dir-rtl">
                    {remedy.arabic}
                  </p>

                  <p className="text-xs text-stone-700 dark:text-stone-300 italic leading-relaxed">
                    {remedy.translation}
                  </p>

                  <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px]">
                    <span className="text-stone-400">{remedy.source}</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      Action: {remedy.action}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tailored Advice for Current Score */}
            <div className="p-5 rounded-3xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                Prescription for your Current Level ({totalImanScore}%)
              </h4>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                {totalImanScore < 50
                  ? 'Your focus right now should be simplicity: protect the next obligatory prayer on time, read 5 verses of Quran with translation, and utter 100 Istighfar. Do not burden yourself with excessive voluntary acts until the obligatory foundation is secure.'
                  : totalImanScore < 80
                  ? 'You are on a steady and commendable track! Add a small extra deed of devotion: pray 2 Rak’ahs of Salat ad-Duha before noon, or make it a point to recite Surah Al-Mulk before sleeping.'
                  : 'Masha’Allah! You are in an elevated state of devotion. Guard this blessing against spiritual pride (ujb) with secret good deeds, sincere Istighfar, and by sharing kindness or charity with those around you.'}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
