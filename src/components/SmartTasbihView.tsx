import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  RotateCcw,
  Volume2,
  VolumeX,
  Vibrate,
  Sparkles,
  Flame,
  CheckCircle2,
  Trophy,
  History,
  TrendingUp,
  Settings,
} from 'lucide-react';
import { playGentleChime } from '../utils/notifications';

interface SmartTasbihViewProps {
  onBackToDashboard: () => void;
  onDhikrCountUpdated?: (newTotal: number) => void;
}

interface DhikrPreset {
  id: string;
  name: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  target: number;
  virtue: string;
  source: string;
  multiStage?: { name: string; arabic: string; count: number }[];
}

const PRESETS: DhikrPreset[] = [
  {
    id: 'fatimah',
    name: 'Tasbih Fatimah',
    arabic: 'سُبْحَانَ اللَّهِ • الْحَمْدُ لِلَّهِ • اللَّهُ أَكْبَرُ',
    transliteration: 'Subḥān Allāh (33x) • Al-ḥamdu lillāh (33x) • Allāhu Akbar (34x)',
    meaning: 'Glory be to Allah, Praise be to Allah, Allah is the Greatest',
    target: 100,
    virtue: 'Taught by the Prophet ﷺ to Fatimah (RA); carries greater virtue than any worldly possession.',
    source: 'Sahih al-Bukhari 3113',
    multiStage: [
      { name: 'SubhanAllah', arabic: 'سُبْحَانَ اللَّهِ', count: 33 },
      { name: 'Alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ', count: 33 },
      { name: 'Allahu Akbar', arabic: 'اللَّهُ أَكْبَرُ', count: 34 },
    ],
  },
  {
    id: 'istighfar',
    name: 'Istighfar (Seeking Forgiveness)',
    arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    transliteration: 'Astaghfirullāha wa atūbu ilayh',
    meaning: 'I seek the forgiveness of Allah and turn to Him in sincere repentance',
    target: 100,
    virtue: 'The Messenger of Allah ﷺ sought forgiveness from Allah more than 70 times a day.',
    source: 'Sahih al-Bukhari 6307',
  },
  {
    id: 'kalimatan',
    name: 'Two Heavy Words',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ ، سُبْحَانَ اللَّهِ الْعَظِيمِ',
    transliteration: 'Subḥān Allāhi wa bi-ḥamdih, Subḥān Allāhil-ʿAẓīm',
    meaning: 'Glory be to Allah and His is the praise, Glory be to Allah the Most High',
    target: 100,
    virtue: 'Light on the tongue, heavy on the divine scale of deeds, beloved to the Most Merciful.',
    source: 'Sahih al-Bukhari 6682',
  },
  {
    id: 'tahlil',
    name: 'Declaration of Tawheed',
    arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: 'Lā ilāha illallāh waḥdahū lā sharīka lah...',
    meaning: 'None is worthy of worship except Allah alone, with no partner. His is the sovereignty and praise.',
    target: 100,
    virtue: 'Equivalent to freeing 10 slaves; 100 good deeds credited, 100 sins expiated, shielded from Shaytan.',
    source: 'Sahih Muslim 2691',
  },
  {
    id: 'hawqala',
    name: 'Al-Hawqala (Divine Power)',
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'Lā ḥawla wa lā quwwata illā billāh',
    meaning: 'There is no power and no strength except through Allah',
    target: 100,
    virtue: 'A treasure from under the Divine Throne and a tree planted in Jannah.',
    source: 'Sahih al-Bukhari 4205',
  },
  {
    id: 'free',
    name: 'Open / Free Counter',
    arabic: 'سُبْحَانَ اللَّهِ الْعَظِيمِ',
    transliteration: 'Subḥān Allāhil-ʿAẓīm',
    meaning: 'Continuous, limitless remembrance of Allah',
    target: 1000,
    virtue: 'Remember Me and I will remember you (Surah Al-Baqarah 2:152).',
    source: 'The Holy Quran',
  },
];

export const SmartTasbihView: React.FC<SmartTasbihViewProps> = ({
  onBackToDashboard,
  onDhikrCountUpdated,
}) => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);
  const [sessionCompletedSets, setSessionCompletedSets] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [isPressing, setIsPressing] = useState(false);
  const [activeTab, setActiveTab] = useState<'counter' | 'analytics'>('counter');

  const activePreset = PRESETS[selectedPresetIndex];

  // Daily & Lifetime records in localStorage
  const [todayTotal, setTodayTotal] = useState<number>(() => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const saved = localStorage.getItem(`annur_dhikr_${today}`);
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [lifetimeCount, setLifetimeCount] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('annur_lifetime_dhikr') || 0);
    } catch {
      return 0;
    }
  });

  // Calculate stage for multiStage presets (e.g. Fatima's Tasbih)
  let stageName = '';
  let stageArabic = activePreset.arabic;
  let stageTarget = activePreset.target;
  let stageCurrent = currentCount;

  if (activePreset.multiStage) {
    const s1 = activePreset.multiStage[0].count; // 33
    const s2 = s1 + activePreset.multiStage[1].count; // 66

    if (currentCount < s1) {
      stageName = `Stage 1/3: ${activePreset.multiStage[0].name}`;
      stageArabic = activePreset.multiStage[0].arabic;
      stageTarget = s1;
      stageCurrent = currentCount;
    } else if (currentCount < s2) {
      stageName = `Stage 2/3: ${activePreset.multiStage[1].name}`;
      stageArabic = activePreset.multiStage[1].arabic;
      stageTarget = activePreset.multiStage[1].count;
      stageCurrent = currentCount - s1;
    } else {
      stageName = `Stage 3/3: ${activePreset.multiStage[2].name}`;
      stageArabic = activePreset.multiStage[2].arabic;
      stageTarget = activePreset.multiStage[2].count;
      stageCurrent = currentCount - s2;
    }
  }

  // Web Audio API acoustic wooden bead click
  const playBeadClick = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.045);

      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // ignore
    }
  };

  const handleTap = () => {
    playBeadClick();

    if (hapticEnabled && navigator.vibrate) {
      navigator.vibrate(18);
    }

    const nextCount = currentCount + 1;
    const nextToday = todayTotal + 1;
    const nextLifetime = lifetimeCount + 1;

    setCurrentCount(nextCount);
    setTodayTotal(nextToday);
    setLifetimeCount(nextLifetime);

    try {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem(`annur_dhikr_${today}`, String(nextToday));
      localStorage.setItem('annur_lifetime_dhikr', String(nextLifetime));
    } catch {
      // ignore
    }

    onDhikrCountUpdated?.(nextLifetime);

    // Goal reached
    if (nextCount >= activePreset.target) {
      playGentleChime();
      if (hapticEnabled && navigator.vibrate) {
        navigator.vibrate([60, 40, 80]);
      }
      setSessionCompletedSets((s) => s + 1);
      setCurrentCount(0);
    }
  };

  const handleReset = () => {
    setCurrentCount(0);
    if (hapticEnabled && navigator.vibrate) {
      navigator.vibrate(35);
    }
  };

  // Percentage calculations for animated rings
  const presetProgressPercent = Math.min(
    100,
    Math.round((currentCount / activePreset.target) * 100)
  );
  const dailyGoal = 300;
  const dailyGoalPercent = Math.min(100, Math.round((todayTotal / dailyGoal) * 100));

  // Circumference for animated rings
  const radius = 95;
  const circumference = 2 * Math.PI * radius; // ~596.9
  const strokeOffset = circumference - (circumference * presetProgressPercent) / 100;

  return (
    <div className="flex-1 flex flex-col justify-between max-w-md w-full mx-auto min-h-screen bg-white dark:bg-black text-black dark:text-white px-5 pt-2 pb-5 overflow-y-auto select-none">
      {/* 1. Minimalist Header */}
      <header className="flex items-center justify-between py-2 border-b border-neutral-200 dark:border-neutral-800">
        <button
          onClick={onBackToDashboard}
          className="min-w-[44px] min-h-[44px] -ml-2 flex items-center justify-center rounded-full text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors active:scale-95"
          title="Back to Dashboard"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2]" />
        </button>

        <div className="text-center">
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 font-semibold block">
            Sacred Companion
          </span>
          <h1 className="text-sm font-semibold tracking-tight text-black dark:text-white">
            Smart Digital Tasbih
          </h1>
        </div>

        <div className="flex items-center gap-1 -mr-1">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full border transition-all ${
              soundEnabled
                ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                : 'bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
            title={soundEnabled ? 'Acoustic bead sound enabled' : 'Sound muted'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setHapticEnabled(!hapticEnabled)}
            className={`min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full border transition-all ${
              hapticEnabled
                ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                : 'bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
            title={hapticEnabled ? 'Haptics enabled' : 'Haptics off'}
          >
            <Vibrate className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. Pure B&W Segmented Switcher */}
      <div className="grid grid-cols-2 gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-xs font-semibold my-3">
        <button
          onClick={() => setActiveTab('counter')}
          className={`min-h-[38px] rounded-xl transition-all text-center ${
            activeTab === 'counter'
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
          }`}
        >
          Interactive Tasbih
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`min-h-[38px] rounded-xl transition-all text-center flex items-center justify-center gap-1.5 ${
            activeTab === 'analytics'
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Analytics</span>
        </button>
      </div>

      {activeTab === 'counter' ? (
        <>
          {/* Preset Selector Strip */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
            {PRESETS.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPresetIndex(idx);
                  setCurrentCount(0);
                }}
                className={`px-3.5 py-2 rounded-full border whitespace-nowrap font-semibold transition-all text-xs active:scale-95 shrink-0 ${
                  selectedPresetIndex === idx
                    ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                    : 'bg-white dark:bg-black text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Active Dhikr Calligraphy Display */}
          <div className="w-full text-center space-y-1.5 py-3">
            {stageName && (
              <span className="inline-block px-3 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-black dark:text-white font-semibold text-[11px] tracking-wide">
                {stageName}
              </span>
            )}
            <div
              className="font-quran text-2xl sm:text-3xl text-black dark:text-white leading-relaxed font-semibold px-2"
              dir="rtl"
            >
              {stageArabic}
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto font-medium">
              {activePreset.meaning}
            </div>
          </div>

          {/* Centerpiece: Precision Gallery Horological Tasbih Dial */}
          <div className="flex-1 flex flex-col items-center justify-center py-2 relative">
            <div
              onClick={handleTap}
              onMouseDown={() => setIsPressing(true)}
              onMouseUp={() => setIsPressing(false)}
              onTouchStart={() => setIsPressing(true)}
              onTouchEnd={() => setIsPressing(false)}
              className="relative w-64 h-64 sm:w-72 sm:h-72 cursor-pointer flex items-center justify-center select-none"
            >
              {/* Outer 60-tick calibration bezel + progress arc */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 240 240">
                {Array.from({ length: 60 }).map((_, i) => {
                  const angle = (i * 6 * Math.PI) / 180;
                  const isMajor = i % 5 === 0;
                  const innerR = isMajor ? 110 : 113;
                  const outerR = 117;
                  return (
                    <line
                      key={i}
                      x1={120 + Math.cos(angle) * innerR}
                      y1={120 + Math.sin(angle) * innerR}
                      x2={120 + Math.cos(angle) * outerR}
                      y2={120 + Math.sin(angle) * outerR}
                      stroke="currentColor"
                      strokeWidth={isMajor ? 1.4 : 0.8}
                      className={
                        isMajor
                          ? 'text-neutral-400 dark:text-neutral-600'
                          : 'text-neutral-200 dark:text-neutral-800'
                      }
                    />
                  );
                })}
                <circle
                  cx="120"
                  cy="120"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-neutral-200 dark:text-neutral-800"
                />
                <circle
                  cx="120"
                  cy="120"
                  r={radius}
                  fill="none"
                  strokeWidth="5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                  className="stroke-black dark:stroke-white transition-all duration-300 ease-out"
                />
              </svg>

              {/* Central Tactile Bead Core */}
              <div
                className={`absolute w-44 h-44 sm:w-48 sm:h-48 rounded-full border border-neutral-800 dark:border-neutral-200 bg-black text-white dark:bg-white dark:text-black flex flex-col items-center justify-center transition-transform duration-100 ${
                  isPressing ? 'scale-[0.94]' : 'hover:scale-[1.01] active:scale-[0.94]'
                }`}
              >
                <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full border border-white/15 dark:border-black/15 flex flex-col items-center justify-center">
                  <span className="text-5xl font-semibold tracking-tight tabular-nums leading-none">
                    {currentCount}
                  </span>
                  <div className="w-7 h-px bg-white/25 dark:bg-black/25 my-2" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] opacity-80">
                    Goal {activePreset.target}
                  </span>
                  <span className="text-[10px] font-mono mt-0.5 font-semibold opacity-65 tabular-nums">
                    {presetProgressPercent}%
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium pt-1">
              Tap the dial to count · Acoustic &amp; haptic pulse
            </p>
          </div>

          {/* Completed Sets Bar & Reset Action */}
          <div className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs my-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-black dark:text-white" />
              <span className="font-semibold text-black dark:text-white tabular-nums">
                Completed Sets: {sessionCompletedSets}
              </span>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black text-black dark:text-white hover:border-black dark:hover:border-white font-semibold transition-all active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Authentic Hadith Virtue Footer */}
          <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-left space-y-1">
            <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              <span>Hadith Merit</span>
              <span>{activePreset.source}</span>
            </div>
            <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed">
              “{activePreset.virtue}”
            </p>
          </div>
        </>
      ) : (
        /* 3. Deep Analysis & Progress Dashboard */
        <div className="flex-1 space-y-4 py-2">
          {/* Daily Goal Monochrome Hero Card */}
          <div className="p-5 rounded-3xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-semibold tracking-[0.16em] opacity-75">
                Today’s Remembrance
              </span>
              <h3 className="text-3xl font-semibold tracking-tight tabular-nums">
                {todayTotal} <span className="text-sm font-medium opacity-70">/ {dailyGoal}</span>
              </h3>
              <p className="text-xs opacity-85 leading-snug">
                {todayTotal >= dailyGoal
                  ? 'Daily Remembrance Goal Achieved'
                  : `${dailyGoal - todayTotal} beads remaining today`}
              </p>
            </div>

            {/* Circular Ring for Daily Goal */}
            <div className="relative w-22 h-22 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="opacity-20"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeDasharray={238.76}
                  strokeDashoffset={238.76 - (238.76 * dailyGoalPercent) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <span className="absolute font-semibold text-sm tabular-nums">
                {dailyGoalPercent}%
              </span>
            </div>
          </div>

          {/* Key Metric Statistics Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-semibold">
                <Trophy className="w-4 h-4 text-black dark:text-white" />
                <span>Lifetime Total</span>
              </div>
              <div className="text-2xl font-semibold text-black dark:text-white tabular-nums">
                {lifetimeCount.toLocaleString()}
              </div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400">Stored offline</div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-semibold">
                <Flame className="w-4 h-4 text-black dark:text-white" />
                <span>Session Sets</span>
              </div>
              <div className="text-2xl font-semibold text-black dark:text-white tabular-nums">
                {sessionCompletedSets}
              </div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400">Finished today</div>
            </div>
          </div>

          {/* Preset Categories Breakdown */}
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
              Remembrance Library
            </span>
            <div className="space-y-2">
              {PRESETS.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    const idx = PRESETS.findIndex((x) => x.id === p.id);
                    setSelectedPresetIndex(idx);
                    setActiveTab('counter');
                  }}
                  className="p-3 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-2 cursor-pointer hover:border-black dark:hover:border-white transition-all"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-black dark:text-white">{p.name}</div>
                    <div className="text-xs font-quran text-neutral-700 dark:text-neutral-300 line-clamp-1" dir="rtl">
                      {p.arabic}
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-black text-white dark:bg-white dark:text-black shrink-0 tabular-nums">
                    {p.target}x
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
