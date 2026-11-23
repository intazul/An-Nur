import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Circle,
  TrendingUp,
  RotateCcw,
  Compass,
  ChevronRight,
  Flame,
  Award,
} from 'lucide-react';
import { playGentleChime } from '../utils/notifications';

interface KhatmahPlannerViewProps {
  onBackToDashboard: () => void;
  onStartReadingAtPage?: (pageNumber: number) => void;
  onReadingMarked?: (pagesRead: number) => void;
}

interface KhatmahPlan {
  totalDays: number;
  startDate: string;
  completedDays: number;
  currentPage: number;
  lastUpdatedDate: string;
}

const TOTAL_PAGES = 604; // Standard Madani Mushaf

const PLANS = [
  { days: 30, title: '30 Days (Ramadan Pace)', pagesPerDay: 20.1, perPrayer: 4 },
  { days: 60, title: '60 Days (Steady Pace)', pagesPerDay: 10.1, perPrayer: 2 },
  { days: 90, title: '90 Days (Reflective Pace)', pagesPerDay: 6.7, perPrayer: 1.5 },
  { days: 180, title: '6 Months (Moderate Pace)', pagesPerDay: 3.4, perPrayer: 1 },
  { days: 365, title: '1 Year (Daily Habit)', pagesPerDay: 1.7, perPrayer: 0.5 },
];

export const KhatmahPlannerView: React.FC<KhatmahPlannerViewProps> = ({
  onBackToDashboard,
  onStartReadingAtPage,
  onReadingMarked,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'juz_matrix' | 'schedule'>('overview');

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

  // Prayer checkpoints for today's reading
  const [prayerPortions, setPrayerPortions] = useState<{
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  }>(() => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const saved = localStorage.getItem(`annur_khatmah_portions_${today}`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false };
  });

  useEffect(() => {
    try {
      localStorage.setItem('annur_khatmah_plan', JSON.stringify(plan));
    } catch {}
  }, [plan]);

  const currentPlanConfig = PLANS.find((p) => p.days === plan.totalDays) || PLANS[0];
  const pagesPerDay = currentPlanConfig.pagesPerDay;

  // Analytics calculations
  const totalCompletedPercent = Math.min(
    100,
    parseFloat((((plan.currentPage - 1) / TOTAL_PAGES) * 100).toFixed(1))
  );

  const completedJuzCount = Math.min(30, Math.floor((plan.currentPage - 1) / 20));
  const currentJuz = Math.min(30, completedJuzCount + 1);
  const juzPercent = Math.min(100, Math.round((completedJuzCount / 30) * 100));

  const completedPortionsCount = Object.values(prayerPortions).filter(Boolean).length;
  const todayProgressPercent = Math.min(100, Math.round((completedPortionsCount / 5) * 100));

  // Estimated Finish Date Forecast
  const remainingPages = Math.max(0, TOTAL_PAGES - plan.currentPage);
  const daysNeeded = Math.ceil(remainingPages / Math.max(1, pagesPerDay));
  const forecastDate = new Date();
  forecastDate.setDate(forecastDate.getDate() + daysNeeded);
  const forecastDateString = forecastDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // SVG Ring Radii
  const mainRadius = 88;
  const mainCircumference = 2 * Math.PI * mainRadius; // ~552.9
  const mainStrokeOffset =
    mainCircumference - (mainCircumference * totalCompletedPercent) / 100;

  const smallRadius = 19;
  const smallCircumference = 2 * Math.PI * smallRadius; // ~119.4
  const todayStrokeOffset =
    smallCircumference - (smallCircumference * todayProgressPercent) / 100;
  const juzStrokeOffset =
    smallCircumference - (smallCircumference * juzPercent) / 100;

  const handleSelectPlan = (days: number) => {
    setPlan((prev) => ({
      ...prev,
      totalDays: days,
      startDate: new Date().toISOString(),
      completedDays: 0,
      currentPage: 1,
      lastUpdatedDate: '',
    }));
  };

  const handleTogglePrayerPortion = (key: keyof typeof prayerPortions) => {
    const updated = { ...prayerPortions, [key]: !prayerPortions[key] };
    setPrayerPortions(updated);
    try {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem(`annur_khatmah_portions_${today}`, JSON.stringify(updated));
    } catch {}

    if (updated[key]) {
      const portionPages = Math.round(currentPlanConfig.perPrayer);
      const nextPage = Math.min(TOTAL_PAGES, plan.currentPage + portionPages);
      setPlan((prev) => ({
        ...prev,
        currentPage: nextPage,
        completedDays: Math.min(plan.totalDays, prev.completedDays + 0.2),
      }));
      playGentleChime();
      onReadingMarked?.(portionPages);
    }
  };

  const handleAdvancePages = (pages: number) => {
    const nextPage = Math.min(TOTAL_PAGES, plan.currentPage + pages);
    setPlan((prev) => ({
      ...prev,
      currentPage: nextPage,
    }));
    playGentleChime();
    onReadingMarked?.(pages);
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
      setPrayerPortions({
        fajr: false,
        dhuhr: false,
        asr: false,
        maghrib: false,
        isha: false,
      });
    }
  };

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
            Sacred Goal
          </span>
          <h1 className="text-sm font-semibold tracking-tight text-black dark:text-white">
            Qur’an Khatmah Planner
          </h1>
        </div>

        <button
          onClick={handleResetKhatmah}
          className="min-w-[44px] min-h-[44px] -mr-2 flex items-center justify-center rounded-full text-neutral-500 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          title="Restart Khatmah Plan"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </header>

      {/* 2. Mode Selector Tabs */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-xs font-semibold my-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`min-h-[38px] rounded-xl transition-all text-center ${
            activeTab === 'overview'
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`min-h-[38px] rounded-xl transition-all text-center ${
            activeTab === 'schedule'
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
          }`}
        >
          Portions
        </button>
        <button
          onClick={() => setActiveTab('juz_matrix')}
          className={`min-h-[38px] rounded-xl transition-all text-center ${
            activeTab === 'juz_matrix'
              ? 'bg-black text-white dark:bg-white dark:text-black'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
          }`}
        >
          30 Juz
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-4 flex-1">
          {/* Target Duration Selector Strip */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block px-0.5">
              Completion Pace
            </span>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
              {PLANS.map((p) => (
                <button
                  key={p.days}
                  onClick={() => handleSelectPlan(p.days)}
                  className={`px-3.5 py-2 rounded-2xl border text-left whitespace-nowrap transition-all font-semibold ${
                    plan.totalDays === p.days
                      ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                      : 'bg-neutral-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                  }`}
                >
                  <div>{p.days} Days</div>
                  <div className="text-[10px] opacity-70 font-medium tabular-nums">~{Math.round(p.pagesPerDay)} pgs/day</div>
                </button>
              ))}
            </div>
          </div>

          {/* Central Precision Percent Gauge */}
          <div className="p-5 rounded-3xl bg-neutral-50 dark:bg-neutral-950 text-black dark:text-white border border-neutral-200 dark:border-neutral-800 space-y-4 text-center">
            <div className="flex items-center justify-between text-xs font-semibold px-1 tabular-nums">
              <span className="uppercase tracking-wider">
                Juz {currentJuz} / 30
              </span>
              <span className="text-neutral-500 dark:text-neutral-400">
                Page {plan.currentPage} of {TOTAL_PAGES}
              </span>
            </div>

            {/* Precision Gallery SVG Gauge */}
            <div className="relative w-52 h-52 mx-auto flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 220 220">
                <circle
                  cx="110"
                  cy="110"
                  r={mainRadius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-neutral-200 dark:text-neutral-800"
                />
                <circle
                  cx="110"
                  cy="110"
                  r={mainRadius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="9"
                  strokeDasharray={mainCircumference}
                  strokeDashoffset={mainStrokeOffset}
                  strokeLinecap="round"
                  className="text-black dark:text-white transition-all duration-700 ease-out"
                />
              </svg>

              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-semibold tracking-tight tabular-nums">
                  {totalCompletedPercent}%
                </span>
                <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-[0.16em] mt-1 font-semibold">
                  Holy Qur’an
                </span>
                <span className="text-[11px] text-neutral-600 dark:text-neutral-400 font-mono mt-0.5 tabular-nums">
                  {remainingPages} pages left
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <button
                onClick={() => handleAdvancePages(Math.round(pagesPerDay))}
                className="min-h-[44px] py-2.5 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>+ {Math.round(pagesPerDay)} pgs Done</span>
              </button>

              <button
                onClick={() => {
                  if (onStartReadingAtPage) {
                    onStartReadingAtPage(plan.currentPage);
                  } else {
                    onBackToDashboard();
                  }
                }}
                className="min-h-[44px] py-2.5 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black text-black dark:text-white hover:border-black dark:hover:border-white font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Mushaf →</span>
              </button>
            </div>
          </div>

          {/* Secondary Micro-Rings Strip */}
          <div className="grid grid-cols-2 gap-3">
            {/* Ring 1: Today's Portions Progress */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
              <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
                  <circle
                    cx="24"
                    cy="24"
                    r={smallRadius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    className="text-neutral-200 dark:text-neutral-800"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r={smallRadius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray={smallCircumference}
                    strokeDashoffset={todayStrokeOffset}
                    strokeLinecap="round"
                    className="text-black dark:text-white transition-all duration-500 ease-out"
                  />
                </svg>
                <span className="absolute font-semibold text-[10px] tabular-nums">
                  {todayProgressPercent}%
                </span>
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase font-semibold tracking-wider block">
                  Today’s Goal
                </span>
                <span className="text-sm font-semibold text-black dark:text-white tabular-nums">
                  {completedPortionsCount} / 5 Salah
                </span>
              </div>
            </div>

            {/* Ring 2: Juz Milestones */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
              <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
                  <circle
                    cx="24"
                    cy="24"
                    r={smallRadius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    className="text-neutral-200 dark:text-neutral-800"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r={smallRadius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray={smallCircumference}
                    strokeDashoffset={juzStrokeOffset}
                    strokeLinecap="round"
                    className="text-black dark:text-white transition-all duration-500 ease-out"
                  />
                </svg>
                <span className="absolute font-semibold text-[10px] tabular-nums">
                  {juzPercent}%
                </span>
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase font-semibold tracking-wider block">
                  Milestones
                </span>
                <span className="text-sm font-semibold text-black dark:text-white tabular-nums">
                  {completedJuzCount} / 30 Juz
                </span>
              </div>
            </div>
          </div>

          {/* Forecasting & Velocity Analytics Card */}
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-black dark:text-white" />
              <span>Khatmah Forecast</span>
            </span>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800">
                <span className="text-neutral-500 dark:text-neutral-400 text-[10px] block">Estimated Finish</span>
                <span className="text-sm font-semibold text-black dark:text-white">
                  {forecastDateString}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800">
                <span className="text-neutral-500 dark:text-neutral-400 text-[10px] block">Days Remaining</span>
                <span className="text-sm font-semibold text-black dark:text-white tabular-nums">
                  {daysNeeded} Days
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="space-y-4 flex-1">
          {/* Daily 5-Prayer Breakdown Guide */}
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-black dark:text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-black dark:text-white" />
              <span>Daily Prayer Routine</span>
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Read <strong className="text-black dark:text-white font-semibold">{Math.round(currentPlanConfig.perPrayer)} pages</strong> after each prayer to complete today’s portion effortlessly.
            </p>
          </div>

          {/* 5 Prayers Checkpoint Cards */}
          <div className="space-y-2">
            {[
              { id: 'fajr' as const, name: 'Fajr Portion', arabic: 'الفجر' },
              { id: 'dhuhr' as const, name: 'Dhuhr Portion', arabic: 'الظهر' },
              { id: 'asr' as const, name: 'Asr Portion', arabic: 'العصر' },
              { id: 'maghrib' as const, name: 'Maghrib Portion', arabic: 'المغرب' },
              { id: 'isha' as const, name: 'Isha Portion', arabic: 'العشاء' },
            ].map((p, idx) => {
              const isDone = prayerPortions[p.id];
              const pStart = plan.currentPage + idx * Math.round(currentPlanConfig.perPrayer);
              const pEnd = pStart + Math.round(currentPlanConfig.perPrayer) - 1;

              return (
                <button
                  key={p.id}
                  onClick={() => handleTogglePrayerPortion(p.id)}
                  className={`w-full p-3.5 rounded-2xl border flex items-center justify-between text-left transition-all ${
                    isDone
                      ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white font-semibold'
                      : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white text-black dark:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5 opacity-35" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-semibold">{p.name}</div>
                      <div className={`text-[11px] tabular-nums ${isDone ? 'opacity-80' : 'text-neutral-500 dark:text-neutral-400'}`}>
                        Pages {pStart} – {pEnd} ({Math.round(currentPlanConfig.perPrayer)} pages)
                      </div>
                    </div>
                  </div>

                  <span className={`font-quran text-sm ${isDone ? 'opacity-90' : 'text-neutral-500 dark:text-neutral-400'}`}>
                    {p.arabic}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'juz_matrix' && (
        <div className="space-y-3 flex-1">
          <div className="flex items-center justify-between text-xs font-semibold px-0.5">
            <span className="text-black dark:text-white uppercase tracking-wider">
              30 Juz Matrix
            </span>
            <span className="text-neutral-500 dark:text-neutral-400 font-mono tabular-nums">
              {completedJuzCount} / 30 Finished
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((jNum) => {
              const isCompleted = jNum <= completedJuzCount;
              const isCurrent = jNum === currentJuz;
              return (
                <button
                  key={jNum}
                  onClick={() => {
                    const targetPage = (jNum - 1) * 20 + 1;
                    if (onStartReadingAtPage) {
                      onStartReadingAtPage(targetPage);
                    }
                  }}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    isCompleted
                      ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white font-semibold'
                      : isCurrent
                      ? 'bg-neutral-100 text-black dark:bg-neutral-900 dark:text-white border-black dark:border-white font-semibold ring-1 ring-black dark:ring-white'
                      : 'bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400'
                  }`}
                >
                  <div className="text-[11px] uppercase font-semibold tabular-nums">Juz {jNum}</div>
                  <div className="text-[10px] opacity-75 tabular-nums">
                    {isCompleted ? 'Done' : isCurrent ? 'Active' : `p.${(jNum - 1) * 20 + 1}`}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
