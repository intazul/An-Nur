import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  RotateCcw,
  Volume2,
  VolumeX,
  Vibrate,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { playGentleChime } from '../utils/notifications';

interface SmartTasbihModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDhikrCountUpdated?: (newTotal: number) => void;
}

interface DhikrPreset {
  id: string;
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
    arabic: 'سُبْحَانَ اللَّهِ • الْحَمْدُ لِلَّهِ • اللَّهُ أَكْبَرُ',
    transliteration: 'Tasbih Fatimah (33x, 33x, 34x)',
    meaning: 'Glory be to Allah, Praise be to Allah, Allah is the Greatest',
    target: 100,
    virtue: 'Taught by Prophet Muhammad ﷺ to Lady Fatimah (RA); better than any worldly possession.',
    source: 'Sahih al-Bukhari 3113',
    multiStage: [
      { name: 'SubhanAllah', arabic: 'سُبْحَانَ اللَّهِ', count: 33 },
      { name: 'Alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ', count: 33 },
      { name: 'Allahu Akbar', arabic: 'اللَّهُ أَكْبَرُ', count: 34 },
    ],
  },
  {
    id: 'istighfar',
    arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
    transliteration: 'Astaghfirullāha wa atūbu ilayh',
    meaning: 'I seek the forgiveness of Allah and repent to Him',
    target: 100,
    virtue: 'The Messenger of Allah ﷺ said: "By Allah, I seek forgiveness of Allah and turn to Him in repentance more than seventy times a day."',
    source: 'Sahih al-Bukhari 6307',
  },
  {
    id: 'kalimatan',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ ، سُبْحَانَ اللَّهِ الْعَظِيمِ',
    transliteration: 'Subḥān Allāhi wa bi-ḥamdih, Subḥān Allāhil-ʿAẓīm',
    meaning: 'Glory be to Allah and His is the praise, Glory be to Allah the Most High',
    target: 100,
    virtue: 'Two words that are light on the tongue, heavy on the Balance, and beloved to the Most Merciful.',
    source: 'Sahih al-Bukhari 6682',
  },
  {
    id: 'tahlil',
    arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: 'Lā ilāha illallāh waḥdahū lā sharīka lah...',
    meaning: 'None is worthy of worship except Allah alone, without partner; to Him belongs all dominion...',
    target: 100,
    virtue: 'Equivalent to freeing ten slaves, 100 good deeds recorded, 100 sins erased, and shielded from Shaytan all day.',
    source: 'Sahih Muslim 2691',
  },
  {
    id: 'hawqala',
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'Lā ḥawla wa lā quwwata illā billāh',
    meaning: 'There is no might nor power except by Allah',
    target: 100,
    virtue: 'A treasure from the treasures of Paradise.',
    source: 'Sahih al-Bukhari 4205',
  },
  {
    id: 'free',
    arabic: 'سُبْحَانَ اللَّهِ الْعَظِيمِ',
    transliteration: 'Custom / Open Remembrance',
    meaning: 'Continuous remembrance of Allah',
    target: 1000,
    virtue: 'Remembrance of Allah is the greatest deed in tranquility and blessing.',
    source: 'Surah Ar-Ra’d 13:28',
  },
];

export const SmartTasbihModal: React.FC<SmartTasbihModalProps> = ({
  isOpen,
  onClose,
  onDhikrCountUpdated,
}) => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);
  const [sessionCompletedSets, setSessionCompletedSets] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [isPressing, setIsPressing] = useState(false);

  const activePreset = PRESETS[selectedPresetIndex];

  // Lifetime dhikr counter in localStorage
  const [lifetimeCount, setLifetimeCount] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('annur_lifetime_dhikr') || 0);
    } catch {
      return 0;
    }
  });

  // Calculate stage for multiStage presets like Tasbih Fatimah
  let stageName = '';
  let stageArabic = activePreset.arabic;
  let stageTarget = activePreset.target;
  let stageProgress = currentCount;

  if (activePreset.multiStage) {
    const s1 = activePreset.multiStage[0].count; // 33
    const s2 = s1 + activePreset.multiStage[1].count; // 66
    const total = activePreset.target; // 100

    if (currentCount < s1) {
      stageName = `1/3: ${activePreset.multiStage[0].name}`;
      stageArabic = activePreset.multiStage[0].arabic;
      stageTarget = s1;
      stageProgress = currentCount;
    } else if (currentCount < s2) {
      stageName = `2/3: ${activePreset.multiStage[1].name}`;
      stageArabic = activePreset.multiStage[1].arabic;
      stageTarget = activePreset.multiStage[1].count;
      stageProgress = currentCount - s1;
    } else {
      stageName = `3/3: ${activePreset.multiStage[2].name}`;
      stageArabic = activePreset.multiStage[2].arabic;
      stageTarget = activePreset.multiStage[2].count;
      stageProgress = currentCount - s2;
    }
  }

  // Web Audio API tactile wooden bead click
  const playBeadClick = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      // Low wooden resonant knock
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } catch {
      // ignore
    }
  };

  const handleTap = () => {
    // 1. Audio click
    playBeadClick();

    // 2. Haptic click
    if (hapticEnabled && navigator.vibrate) {
      navigator.vibrate(15);
    }

    // 3. Increment counters
    const nextCount = currentCount + 1;
    const newLifetime = lifetimeCount + 1;
    setCurrentCount(nextCount);
    setLifetimeCount(newLifetime);

    try {
      localStorage.setItem('annur_lifetime_dhikr', String(newLifetime));
    } catch {
      // ignore
    }

    onDhikrCountUpdated?.(newLifetime);

    // 4. Target completion check
    if (nextCount >= activePreset.target) {
      playGentleChime();
      if (hapticEnabled && navigator.vibrate) {
        navigator.vibrate([60, 50, 60]);
      }
      setSessionCompletedSets((s) => s + 1);
      setCurrentCount(0);
    }
  };

  const handleReset = () => {
    setCurrentCount(0);
    if (hapticEnabled && navigator.vibrate) {
      navigator.vibrate(30);
    }
  };

  if (!isOpen) return null;

  const targetProgressPercent = Math.min(
    100,
    Math.round((currentCount / activePreset.target) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in select-none">
      <div
        className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold text-sm">
              📿
            </div>
            <div>
              <h2 className="text-base font-bold text-black dark:text-white font-cinzel">
                Smart Digital Tasbih
              </h2>
              <span className="text-xs text-stone-500">
                Lifetime: <strong className="font-bold text-black dark:text-white">{lifetimeCount}</strong> beads
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Sound toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-xl transition-all ${
                soundEnabled
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'text-stone-400 hover:text-black dark:hover:text-white'
              }`}
              title={soundEnabled ? 'Bead click sound enabled' : 'Sound muted'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Haptic toggle */}
            <button
              onClick={() => setHapticEnabled(!hapticEnabled)}
              className={`p-2 rounded-xl transition-all ${
                hapticEnabled
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'text-stone-400 hover:text-black dark:hover:text-white'
              }`}
              title={hapticEnabled ? 'Haptic feedback on' : 'Haptic feedback off'}
            >
              <Vibrate className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-black dark:hover:text-white rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preset Selector Carousel */}
        <div className="p-3 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40">
          <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
            {PRESETS.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPresetIndex(idx);
                  setCurrentCount(0);
                }}
                className={`px-3 py-2 rounded-xl border whitespace-nowrap font-bold transition-all text-xs active:scale-95 ${
                  selectedPresetIndex === idx
                    ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-2xs'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800'
                }`}
              >
                {p.transliteration.split('(')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable / Interactive Center */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col items-center justify-between space-y-4">
          {/* Active Dhikr Card */}
          <div className="w-full text-center space-y-2">
            {stageName && (
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-700 dark:text-amber-300 font-bold text-[11px] uppercase tracking-wider">
                {stageName}
              </span>
            )}

            <div
              className="font-quran text-2xl sm:text-3xl text-black dark:text-amber-200 leading-relaxed font-bold px-2"
              dir="rtl"
            >
              {stageArabic}
            </div>

            <div className="text-xs font-semibold text-stone-600 dark:text-stone-300 max-w-sm mx-auto">
              {activePreset.meaning}
            </div>
          </div>

          {/* Central Interactive Tactile Bead Button */}
          <div className="py-2">
            <button
              onClick={handleTap}
              onMouseDown={() => setIsPressing(true)}
              onMouseUp={() => setIsPressing(false)}
              onTouchStart={() => setIsPressing(true)}
              onTouchEnd={() => setIsPressing(false)}
              className={`w-44 h-44 sm:w-48 sm:h-48 rounded-full border-4 border-black dark:border-amber-400/60 bg-linear-to-b from-stone-900 to-black text-white shadow-2xl flex flex-col items-center justify-center relative transition-transform ${
                isPressing ? 'scale-95' : 'hover:scale-[1.02] active:scale-95'
              }`}
            >
              {/* Outer circular progress ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1.5">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-stone-700 opacity-30"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="4"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * targetProgressPercent) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-150"
                />
              </svg>

              <span className="text-4xl sm:text-5xl font-bold font-cinzel tabular-nums">
                {currentCount}
              </span>

              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest mt-1">
                Target: {activePreset.target}
              </span>

              <span className="text-[9px] text-stone-400 mt-1">Tap anywhere</span>
            </button>
          </div>

          {/* Completed Sets & Reset Button */}
          <div className="w-full flex items-center justify-between px-2 pt-1 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-black dark:text-white">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>
                Completed: <strong className="text-amber-500">{sessionCompletedSets}</strong> sets today
              </span>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-stone-500 hover:text-black dark:hover:text-white font-bold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Authentic Hadith Virtue Footer */}
          <div className="w-full p-3 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-left space-y-1">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <span>Hadith Virtue</span>
              <span>{activePreset.source}</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 italic leading-relaxed">
              "{activePreset.virtue}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
