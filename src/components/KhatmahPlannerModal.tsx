import React, { useState, useEffect } from 'react';
import {
  X,
  Target,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  RotateCcw,
  Flame,
} from 'lucide-react';
import { playGentleChime } from '../utils/notifications';

interface KhatmahPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReadingMarked?: (pagesRead: number) => void;
}

interface KhatmahPlan {
  totalDays: number;
  startDate: string;
  completedDays: number;
  currentPage: number;
  lastUpdatedDate: string;
}

const PLANS = [
  { days: 30, title: '30 Days (Ramadan Pace)', pagesPerDay: 20, perPrayer: '4 pages' },
  { days: 60, title: '60 Days (Steady Pace)', pagesPerDay: 10, perPrayer: '2 pages' },
  { days: 90, title: '90 Days (Reflective Pace)', pagesPerDay: 6.7, perPrayer: '1-2 pages' },
  { days: 365, title: '1 Year (Consistent Daily Habit)', pagesPerDay: 1.7, perPrayer: '1 page' },
];

const TOTAL_PAGES = 604; // Standard Madani Mushaf

export const KhatmahPlannerModal: React.FC<KhatmahPlannerModalProps> = ({
  isOpen,
  onClose,
  onReadingMarked,
}) => {
  const [plan, setPlan] = useState<KhatmahPlan>(() => {
    try {
      const saved = localStorage.getItem('annur_khatmah_plan');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      totalDays: 30,
      startDate: new Date().toISOString(),
      completedDays: 0,
      currentPage: 1,
      lastUpdatedDate: '',
    };
  });

  const [todayCompleted, setTodayCompleted] = useState<boolean>(() => {
    const today = new Date().toISOString().split('T')[0];
    return plan.lastUpdatedDate === today;
  });

  useEffect(() => {
    try {
      localStorage.setItem('annur_khatmah_plan', JSON.stringify(plan));
    } catch {
      // ignore
    }
  }, [plan]);

  if (!isOpen) return null;

  const currentPlanConfig = PLANS.find((p) => p.days === plan.totalDays) || PLANS[0];
  const pagesPerDay = currentPlanConfig.pagesPerDay;

  const currentJuz = Math.min(30, Math.floor((plan.currentPage - 1) / 20) + 1);
  const progressPercent = Math.min(
    100,
    Math.round(((plan.currentPage - 1) / TOTAL_PAGES) * 100)
  );

  const handleSelectPlan = (days: number) => {
    setPlan((prev) => ({
      ...prev,
      totalDays: days,
      startDate: new Date().toISOString(),
      completedDays: 0,
      currentPage: 1,
      lastUpdatedDate: '',
    }));
    setTodayCompleted(false);
  };

  const handleMarkTodayDone = () => {
    const today = new Date().toISOString().split('T')[0];
    const pagesToAdd = Math.round(pagesPerDay);
    const nextPage = Math.min(TOTAL_PAGES, plan.currentPage + pagesToAdd);
    const nextDays = plan.completedDays + 1;

    setPlan((prev) => ({
      ...prev,
      completedDays: nextDays,
      currentPage: nextPage,
      lastUpdatedDate: today,
    }));
    setTodayCompleted(true);
    playGentleChime();
    onReadingMarked?.(pagesToAdd);
  };

  const handleResetKhatmah = () => {
    if (confirm('Do you wish to restart your Khatmah plan from Page 1?')) {
      setPlan({
        totalDays: plan.totalDays,
        startDate: new Date().toISOString(),
        completedDays: 0,
        currentPage: 1,
        lastUpdatedDate: '',
      });
      setTodayCompleted(false);
    }
  };

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
              📖
            </div>
            <div>
              <h2 className="text-base font-bold text-black dark:text-white font-cinzel">
                Khatmah Planner
              </h2>
              <span className="text-xs text-stone-500">
                Quran completion tracker & habit builder
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-black dark:hover:text-white rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Target Pace Selector */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
              Choose Target Duration
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {PLANS.map((p) => (
                <button
                  key={p.days}
                  onClick={() => handleSelectPlan(p.days)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    plan.totalDays === p.days
                      ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-2xs font-bold'
                      : 'bg-stone-50 dark:bg-stone-950 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:bg-stone-100'
                  }`}
                >
                  <div className="font-bold">{p.days} Days</div>
                  <div className="text-[10px] opacity-80">{p.pagesPerDay} pages/day</div>
                </button>
              ))}
            </div>
          </div>

          {/* Central Progress Ring & Stats Card */}
          <div className="p-5 rounded-3xl bg-linear-to-b from-stone-900 to-black text-white border-2 border-amber-500/30 shadow-xl space-y-4 text-center">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-amber-400 uppercase tracking-wider">
                Current Juz: {currentJuz} / 30
              </span>
              <span className="text-stone-400">
                Day {plan.completedDays} of {plan.totalDays}
              </span>
            </div>

            {/* Circular Progress Display */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="42%"
                  fill="none"
                  stroke="#333"
                  strokeWidth="8"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="42%"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="8"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * progressPercent) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold font-cinzel tabular-nums">
                  {progressPercent}%
                </span>
                <span className="text-[10px] text-amber-300 uppercase tracking-widest">
                  Completed
                </span>
              </div>
            </div>

            <div className="text-xs text-stone-300">
              On Page <strong className="text-white font-bold">{plan.currentPage}</strong> of{' '}
              {TOTAL_PAGES}
            </div>

            {/* Checkmark Button */}
            <button
              onClick={handleMarkTodayDone}
              disabled={todayCompleted}
              className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md ${
                todayCompleted
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-amber-400 text-black hover:bg-amber-300'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>
                {todayCompleted
                  ? "Today's Portion Completed! ✨"
                  : `Mark Today's Portion Read (+${Math.round(pagesPerDay)} pages)`}
              </span>
            </button>
          </div>

          {/* Daily Prayer Breakdown Tip */}
          <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-black dark:text-white">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Recommended Daily Distribution</span>
            </div>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
              To effortlessly read {Math.round(pagesPerDay)} pages today, recite{' '}
              <strong className="text-black dark:text-white font-bold">{currentPlanConfig.perPrayer}</strong> after
              each of the 5 daily prayers (Fajr, Dhuhr, Asr, Maghrib, Isha).
            </p>
          </div>

          {/* Restart / Reset Option */}
          <div className="flex justify-end pt-1">
            <button
              onClick={handleResetKhatmah}
              className="flex items-center gap-1 text-xs text-stone-500 hover:text-black dark:hover:text-white font-bold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart Plan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
