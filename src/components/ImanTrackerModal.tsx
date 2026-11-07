import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Circle,
  Flame,
  RotateCcw,
  Sparkles,
  Save,
  Heart,
} from 'lucide-react';
import { DailyPrayers, ImanDayRecord } from '../types/quran';
import { playGentleChime } from '../utils/notifications';

interface ImanTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  imanRecord: ImanDayRecord;
  onUpdateImanRecord: (record: ImanDayRecord) => void;
  streak: number;
}

const DHIKR_PRESETS = [
  { id: 'subhanallah', arabic: 'سُبْحَانَ اللَّهِ', translit: 'Subḥān Allāh', meaning: 'Glory be to Allah', target: 33 },
  { id: 'alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ', translit: 'Al-ḥamdu lillāh', meaning: 'Praise be to Allah', target: 33 },
  { id: 'allahuakbar', arabic: 'اللَّهُ أَكْبَرُ', translit: 'Allāhu Akbar', meaning: 'Allah is the Greatest', target: 34 },
  { id: 'astaghfirullah', arabic: 'أَسْتَغْفِرُ اللَّهَ', translit: 'Astaghfirullāh', meaning: 'I seek forgiveness from Allah', target: 100 },
  { id: 'lailahaillallah', arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ', translit: 'Lā ilāha illallāh', meaning: 'None is worthy of worship except Allah', target: 100 },
];

export const ImanTrackerModal: React.FC<ImanTrackerModalProps> = ({
  isOpen,
  onClose,
  imanRecord,
  onUpdateImanRecord,
  streak,
}) => {
  const [selectedDhikrIndex, setSelectedDhikrIndex] = useState(0);
  const [reflectionInput, setReflectionInput] = useState(imanRecord.reflection || '');
  const [reflectionSaved, setReflectionSaved] = useState(false);

  if (!isOpen) return null;

  const currentDhikr = DHIKR_PRESETS[selectedDhikrIndex];

  const handleTogglePrayer = (key: keyof DailyPrayers) => {
    const updatedPrayers: DailyPrayers = {
      ...imanRecord.prayers,
      [key]: !imanRecord.prayers[key],
    };
    onUpdateImanRecord({
      ...imanRecord,
      prayers: updatedPrayers,
    });
  };

  const handleDhikrTap = () => {
    const newCount = imanRecord.dhikrCount + 1;
    onUpdateImanRecord({
      ...imanRecord,
      dhikrCount: newCount,
    });

    // Gentle feedback chime if target reached
    if (newCount % currentDhikr.target === 0) {
      playGentleChime();
    }
  };

  const handleResetDhikr = () => {
    onUpdateImanRecord({
      ...imanRecord,
      dhikrCount: 0,
    });
  };

  const handleSaveReflection = () => {
    onUpdateImanRecord({
      ...imanRecord,
      reflection: reflectionInput,
    });
    setReflectionSaved(true);
    setTimeout(() => setReflectionSaved(false), 2000);
  };

  const obligatoryPrayers: { id: keyof DailyPrayers; label: string; arabic: string }[] = [
    { id: 'fajr', label: 'Fajr', arabic: 'الفَجْر' },
    { id: 'dhuhr', label: 'Dhuhr', arabic: 'الظُّهْر' },
    { id: 'asr', label: 'Asr', arabic: 'العَصْر' },
    { id: 'maghrib', label: 'Maghrib', arabic: 'المَغْرِب' },
    { id: 'isha', label: 'Isha', arabic: 'العِشَاء' },
  ];

  const voluntaryPrayers: { id: keyof DailyPrayers; label: string; arabic: string }[] = [
    { id: 'tahajjud', label: 'Tahajjud (Night Vigil)', arabic: 'التَّهَجُّد' },
    { id: 'duha', label: 'Salat ad-Duha (Forenoon)', arabic: 'الضُّحَى' },
  ];

  const completedObligatory = obligatoryPrayers.filter((p) => imanRecord.prayers[p.id]).length;
  const progressPercent = Math.round((completedObligatory / obligatoryPrayers.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-emerald-500/20" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100 font-cinzel">
                Daily Iman Tracker & Spiritual Progress
              </h2>
              <p className="text-xs text-stone-500">
                Monitor your daily prayers, sacred dhikr, and intimate reflections.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Top Status & Consistency Card */}
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                Today's Prayer Fulfillment
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                  {completedObligatory} / 5
                </span>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  ({progressPercent}% Completed)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-800 dark:text-amber-300 text-xs font-semibold">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{streak} Days Active Streak</span>
            </div>
          </div>

          {/* Section 1: Obligatory Prayers Checklist */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              5 Daily Prescribed Prayers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {obligatoryPrayers.map((prayer) => {
                const done = imanRecord.prayers[prayer.id];
                return (
                  <button
                    key={prayer.id}
                    onClick={() => handleTogglePrayer(prayer.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      done
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-900 dark:text-emerald-100'
                        : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold">{prayer.label}</div>
                      <div className="text-[11px] font-quran text-stone-500">{prayer.arabic}</div>
                    </div>
                    {done ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 fill-emerald-500/20" />
                    ) : (
                      <Circle className="w-5 h-5 text-stone-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Voluntary / Sunnah Prayers */}
          <div className="space-y-2 pt-1">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Sunnah & Voluntary Devotions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {voluntaryPrayers.map((prayer) => {
                const done = imanRecord.prayers[prayer.id];
                return (
                  <button
                    key={prayer.id}
                    onClick={() => handleTogglePrayer(prayer.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      done
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-900 dark:text-emerald-100'
                        : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-stone-300 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold">{prayer.label}</div>
                      <div className="text-[11px] font-quran text-stone-500">{prayer.arabic}</div>
                    </div>
                    {done ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 fill-emerald-500/20" />
                    ) : (
                      <Circle className="w-5 h-5 text-stone-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Interactive Digital Tasbih Counter */}
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-cinzel">
                  Digital Tasbih & Dhikr
                </h3>
              </div>
              <button
                onClick={handleResetDhikr}
                className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
                title="Reset Count"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Dhikr Selector Tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
              {DHIKR_PRESETS.map((d, idx) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDhikrIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg border whitespace-nowrap transition-colors ${
                    selectedDhikrIndex === idx
                      ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                      : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                  }`}
                >
                  {d.translit} ({d.target})
                </button>
              ))}
            </div>

            {/* Large Interactive Tap Counter */}
            <div className="text-center py-4 space-y-2">
              <div className="font-quran text-2xl sm:text-3xl text-amber-700 dark:text-amber-300 select-none">
                {currentDhikr.arabic}
              </div>
              <div className="text-xs text-stone-500">{currentDhikr.meaning}</div>

              <div className="pt-2">
                <button
                  onClick={handleDhikrTap}
                  className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full bg-linear-to-b from-stone-900 to-stone-950 dark:from-stone-800 dark:to-stone-900 text-white shadow-xl hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center border-4 border-amber-500/40 select-none"
                >
                  <span className="text-3xl font-bold font-cinzel tabular-nums">
                    {imanRecord.dhikrCount}
                  </span>
                  <span className="text-[10px] text-amber-300 uppercase tracking-widest mt-0.5">
                    Target: {currentDhikr.target}
                  </span>
                </button>
              </div>
              <p className="text-[11px] text-stone-400">Tap circle to increment remembrance count</p>
            </div>
          </div>

          {/* Section 4: Daily Spiritual Reflection Journal */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Daily Spiritual Reflection Journal
            </h3>
            <textarea
              value={reflectionInput}
              onChange={(e) => setReflectionInput(e.target.value)}
              placeholder="What verse resonated with your heart today? Record moments of gratitude, dua, or spiritual breakthroughs..."
              className="w-full h-24 p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <div className="flex justify-end">
              <button
                onClick={handleSaveReflection}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{reflectionSaved ? 'Saved to Journal!' : 'Save Reflection'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
