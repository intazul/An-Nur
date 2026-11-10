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
    <div className="flex-1 flex flex-col justify-between max-w-md w-full mx-auto min-h-screen bg-stone-50 dark:bg-stone-950 px-5 py-3 overflow-y-auto select-none">
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between py-2 border-b border-stone-200 dark:border-stone-800">
        <button
          onClick={onBackToDashboard}
          className="p-2 -ml-2 text-black dark:text-white hover:bg-stone-200 dark:hover:bg-stone-900 rounded-full transition-colors active:scale-95"
          title="Back to Dashboard"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="text-center">
          <span className="text-[10px] uppercase tracking-widest text-stone-500 font-cinzel font-bold block">
            Sacred Companion
          </span>
          <h1 className="text-base font-bold text-black dark:text-white font-cinzel">
            Smart Digital Tasbih
          </h1>
        </div>

        <div className="flex items-center gap-1.5 -mr-1">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl transition-all ${
              soundEnabled
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                : 'text-stone-400 hover:text-black dark:hover:text-white'
            }`}
            title={soundEnabled ? 'Acoustic bead sound enabled' : 'Sound muted'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setHapticEnabled(!hapticEnabled)}
            className={`p-2 rounded-xl transition-all ${
              hapticEnabled
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                : 'text-stone-400 hover:text-black dark:hover:text-white'
            }`}
            title={hapticEnabled ? 'Haptics enabled' : 'Haptics off'}
          >
            <Vibrate className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Mode Selector: Counter View vs Deep Analytics */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-stone-200/80 dark:bg-stone-900 rounded-2xl text-xs font-bold my-2">
        <button
          onClick={() => setActiveTab('counter')}
          className={`py-2 rounded-xl transition-all text-center ${
            activeTab === 'counter'
              ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white'
          }`}
        >
          📿 Interactive Tasbih
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`py-2 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 ${
            activeTab === 'analytics'
              ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Analytics & Progress</span>
        </button>
      </div>

      {activeTab === 'counter' ? (
        <>
          {/* Preset Selector Pill Strip */}
          <div className="flex gap-1.5 overflow-x-auto py-1 text-xs">
            {PRESETS.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPresetIndex(idx);
                  setCurrentCount(0);
                }}
                className={`px-3 py-2 rounded-xl border whitespace-nowrap font-bold transition-all text-xs active:scale-95 shrink-0 ${
                  selectedPresetIndex === idx
                    ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-2xs'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Active Dhikr Display Card */}
          <div className="w-full text-center space-y-1.5 py-2">
            {stageName && (
              <span className="inline-block px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-800 dark:text-amber-300 font-bold text-[11px] uppercase tracking-wider animate-pulse">
                {stageName}
              </span>
            )}
            <div
              className="font-quran text-2xl sm:text-3xl text-black dark:text-amber-200 leading-relaxed font-bold px-2"
              dir="rtl"
            >
              {stageArabic}
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-300 max-w-sm mx-auto font-medium">
              {activePreset.meaning}
            </div>
          </div>

          {/* Centerpiece: Well-Animated Circular Progress Ring with Touch Bead */}
          <div className="flex-1 flex flex-col items-center justify-center py-2 relative">
            <div
              onClick={handleTap}
              onMouseDown={() => setIsPressing(true)}
              onMouseUp={() => setIsPressing(false)}
              onTouchStart={() => setIsPressing(true)}
              onTouchEnd={() => setIsPressing(false)}
              className="relative w-64 h-64 sm:w-72 sm:h-72 cursor-pointer flex items-center justify-center select-none"
            >
              {/* Animated SVG Percent Ring */}
              <svg className="w-full h-full -rotate-90">
                {/* Background Track */}
                <circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-stone-200 dark:text-stone-800"
                />
                {/* Outer Glow filter */}
                <circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                  className="transition-all duration-300 ease-out"
                  style={{
                    filter: 'drop-shadow(0px 0px 8px rgba(251, 191, 36, 0.4))',
                  }}
                />
              </svg>

              {/* Central Tactile Bead Core */}
              <div
                className={`absolute w-44 h-44 sm:w-48 sm:h-48 rounded-full border-4 border-stone-900 dark:border-amber-400/50 bg-linear-to-b from-stone-900 to-black text-white shadow-2xl flex flex-col items-center justify-center transition-transform duration-100 ${
                  isPressing ? 'scale-95' : 'hover:scale-[1.02] active:scale-95'
                }`}
              >
                <span className="text-4xl sm:text-5xl font-bold font-cinzel tabular-nums leading-none">
                  {currentCount}
                </span>

                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest mt-1.5">
                  Target: {activePreset.target}
                </span>

                <span className="text-[10px] text-stone-400 font-mono mt-1 font-bold">
                  {presetProgressPercent}% Done
                </span>
              </div>
            </div>

            <p className="text-[11px] text-stone-400 font-medium pt-1">
              Tap the bead to count • Haptic click active
            </p>
          </div>

          {/* Completed Sets Bar & Reset Action */}
          <div className="w-full flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs my-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="font-bold text-black dark:text-white">
                Completed Sets: <strong className="text-amber-500 font-bold">{sessionCompletedSets}</strong>
              </span>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white font-bold transition-colors active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Authentic Hadith Virtue Footer */}
          <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-left space-y-1">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <span>Hadith Merit</span>
              <span>{activePreset.source}</span>
            </div>
            <p className="text-xs text-stone-700 dark:text-stone-300 italic leading-relaxed">
              "{activePreset.virtue}"
            </p>
          </div>
        </>
      ) : (
        /* 3. Deep Analysis & Progress Dashboard */
        <div className="flex-1 space-y-4 py-3">
          {/* Daily Goal Animated Percent Ring Card */}
          <div className="p-5 rounded-3xl bg-linear-to-b from-stone-900 to-black text-white border-2 border-amber-500/30 shadow-xl flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                Today's Spiritual Progress
              </span>
              <h3 className="text-2xl font-bold font-cinzel">
                {todayTotal} <span className="text-sm font-normal text-stone-400">/ {dailyGoal} beads</span>
              </h3>
              <p className="text-xs text-stone-300">
                {todayTotal >= dailyGoal
                  ? 'Daily Remembrance Goal Achieved! 🎉'
                  : `${dailyGoal - todayTotal} beads remaining to hit daily benchmark.`}
              </p>
            </div>

            {/* Circular Ring for Daily Goal */}
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="38"
                  fill="none"
                  stroke="#333"
                  strokeWidth="6"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="38"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="6"
                  strokeDasharray={238}
                  strokeDashoffset={238 - (238 * dailyGoalPercent) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <span className="absolute font-bold text-sm font-cinzel">
                {dailyGoalPercent}%
              </span>
            </div>
          </div>

          {/* Key Metric Statistics Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-stone-500 font-bold">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Lifetime Total</span>
              </div>
              <div className="text-2xl font-bold font-cinzel text-black dark:text-white tabular-nums">
                {lifetimeCount.toLocaleString()}
              </div>
              <div className="text-[10px] text-stone-400">Persistently stored offline</div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-stone-500 font-bold">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Active Streak</span>
              </div>
              <div className="text-2xl font-bold font-cinzel text-black dark:text-white tabular-nums">
                {sessionCompletedSets > 0 ? 'Active' : 'Today'}
              </div>
              <div className="text-[10px] text-stone-400">{sessionCompletedSets} sets finished today</div>
            </div>
          </div>

          {/* Preset Categories Breakdown */}
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-black dark:text-white block">
              Remembrance Presets Library
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
                  className="p-3 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800/80 flex items-center justify-between cursor-pointer hover:border-amber-500 transition-all"
                >
                  <div>
                    <div className="text-xs font-bold text-black dark:text-white">{p.name}</div>
                    <div className="text-[11px] font-quran text-amber-600 dark:text-amber-400 line-clamp-1" dir="rtl">
                      {p.arabic}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
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
