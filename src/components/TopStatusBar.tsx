import React from 'react';
import {
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  BookOpen,
  Wifi,
  WifiOff,
  Flame,
} from 'lucide-react';
import { DailyPrayers, ImanDayRecord, UserProfileData } from '../types/quran';
import { PrayerStatus } from '../utils/prayerTimes';

interface TopStatusBarProps {
  prayerStatus: PrayerStatus;
  imanRecord: ImanDayRecord;
  profile: UserProfileData;
  onTogglePrayer: (prayerKey: keyof DailyPrayers) => void;
  onOpenImanTracker: () => void;
  isOnline: boolean;
  streak: number;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({
  prayerStatus,
  imanRecord,
  profile,
  onTogglePrayer,
  onOpenImanTracker,
  isOnline,
  streak,
}) => {
  // Calculate prayers completed
  const obligatoryList: (keyof DailyPrayers)[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
  const completedCount = obligatoryList.filter((k) => imanRecord.prayers[k]).length;
  const prayerPercentage = Math.round((completedCount / obligatoryList.length) * 100);

  // Verse reading percentage
  const verseGoal = profile.dailyVerseGoal || 10;
  const versePercentage = Math.min(100, Math.round((imanRecord.versesRead / verseGoal) * 100));

  // Date formatting
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  };
  const dateFormatted = today.toLocaleDateString('en-US', dateOptions);

  return (
    <div className="w-full bg-stone-100/70 dark:bg-stone-900/50 border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 space-y-3">
        {/* Row 1: Today's Status Visuals & Metrics */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Date & Spiritual State */}
          <div className="flex items-center gap-3">
            <span className="font-semibold text-stone-900 dark:text-stone-100 font-cinzel text-sm">
              Today's Sanctuary
            </span>
            <span className="text-stone-500 dark:text-stone-400">·</span>
            <span className="text-stone-600 dark:text-stone-400">{dateFormatted}</span>
            <span className="text-stone-500 dark:text-stone-400">·</span>
            <span className="flex items-center gap-1 font-medium text-amber-700 dark:text-amber-400">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{streak} Day Streak</span>
            </span>
          </div>

          {/* Right: Quick Progress Visuals */}
          <div className="flex items-center gap-4">
            {/* Daily Prayers Completed Pill */}
            <button
              onClick={onOpenImanTracker}
              className="flex items-center gap-2 px-2.5 py-1 bg-white dark:bg-stone-800 rounded-md border border-stone-200 dark:border-stone-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors shadow-2xs"
              title="Click to open full Iman Tracker"
            >
              <span className="text-stone-500 dark:text-stone-400">Prayers:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {completedCount}/5
              </span>
              <div className="w-12 h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                  style={{ width: `${prayerPercentage}%` }}
                />
              </div>
            </button>

            {/* Daily Verses Read Pill */}
            <div className="flex items-center gap-2 px-2.5 py-1 bg-white dark:bg-stone-800 rounded-md border border-stone-200 dark:border-stone-700 shadow-2xs">
              <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="text-stone-500 dark:text-stone-400">Verses:</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
                {imanRecord.versesRead}/{verseGoal}
              </span>
              <div className="w-12 h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-300 rounded-full"
                  style={{ width: `${versePercentage}%` }}
                />
              </div>
            </div>

            {/* Online / Offline status */}
            <div
              className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-medium ${
                isOnline
                  ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-500/10'
                  : 'text-amber-700 dark:text-amber-300 bg-amber-500/10'
              }`}
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3 h-3 text-emerald-500" />
                  <span className="hidden sm:inline">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3 h-3 text-amber-500" />
                  <span>Offline Cache</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Row 2: Quick-Access Buttons for Prayer Times Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 pt-0.5">
          {prayerStatus.prayers
            .filter((p) => !p.isVoluntary)
            .map((prayer) => {
              const prayerKey = prayer.id as keyof DailyPrayers;
              const isCompleted = imanRecord.prayers[prayerKey];
              const isNext = prayer.isNext;

              return (
              <div
                key={prayer.id}
                className={`relative group flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                  isCompleted
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60'
                    : isNext
                    ? 'bg-white dark:bg-stone-800 border-amber-500 dark:border-amber-400 shadow-xs'
                    : 'bg-white dark:bg-stone-900/90 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                }`}
              >
                {/* Left Prayer Info */}
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                      {prayer.name}
                    </span>
                    <span className="font-quran text-[13px] text-stone-400 dark:text-stone-500 select-none">
                      {prayer.arabicName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-stone-500 dark:text-stone-400 tabular-nums">
                    <Clock className="w-3 h-3 opacity-70" />
                    <span>{prayer.timeString}</span>
                  </div>

                  {isNext && (
                    <span className="inline-block mt-0.5 text-[10px] font-medium text-amber-600 dark:text-amber-400">
                      In {prayerStatus.timeUntilNext}
                    </span>
                  )}
                </div>

                {/* Quick-Access 1-Click Prayer Check Button */}
                <button
                  type="button"
                  onClick={() => onTogglePrayer(prayerKey)}
                  className={`p-1 rounded-md transition-colors shrink-0 ${
                    isCompleted
                      ? 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
                      : 'text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                  title={isCompleted ? `Mark ${prayer.name} uncompleted` : `Quick-log ${prayer.name} prayer`}
                  aria-label={`Mark ${prayer.name} as ${isCompleted ? 'uncompleted' : 'completed'}`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-white dark:text-stone-900" />
                  ) : (
                    <Circle className="w-5 h-5 hover:stroke-emerald-500" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
