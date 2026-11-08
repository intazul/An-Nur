import React from 'react';
import {
  BookOpen,
  Headphones,
  Settings,
  Flame,
  CheckCircle2,
  Circle,
  Star,
  BookmarkCheck,
  Sparkles,
  Compass,
} from 'lucide-react';
import { FluidCircle } from './FluidCircle';
import { DailyPrayers, ImanDayRecord, LastReadPosition, UserProfileData } from '../types/quran';
import { PrayerStatus } from '../utils/prayerTimes';
import { ALL_SURAHS } from '../data/surahList';

interface AndroidDashboardProps {
  imanRecord: ImanDayRecord;
  profile: UserProfileData;
  prayerStatus: PrayerStatus;
  streak: number;
  lastRead: LastReadPosition;
  onStartReading: () => void;
  onStartRecitation: () => void;
  onOpenSettings: () => void;
  onTogglePrayer: (prayerKey: keyof DailyPrayers) => void;
  onOpenImanTracker: () => void;
  onSelectFavoriteSurah: (surahNumber: number) => void;
  onOpenFavoritesModal: () => void;
  onOpenQibla: () => void;
}

export const AndroidDashboard: React.FC<AndroidDashboardProps> = ({
  imanRecord,
  profile,
  prayerStatus,
  streak,
  lastRead,
  onStartReading,
  onStartRecitation,
  onOpenSettings,
  onTogglePrayer,
  onOpenImanTracker,
  onSelectFavoriteSurah,
  onOpenFavoritesModal,
  onOpenQibla,
}) => {
  // Calculate completed prayers
  const prayersList: (keyof DailyPrayers)[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
  const completedCount = prayersList.filter((k) => imanRecord.prayers[k]).length;

  // Calculate Iman % (prayers 70% + verses read 30%)
  const prayerScore = (completedCount / 5) * 70;
  const verseScore = Math.min(30, (imanRecord.versesRead / (profile.dailyVerseGoal || 10)) * 30);
  const totalImanPercent = Math.min(100, Math.round(prayerScore + verseScore));

  const favorites = (profile.favoriteSurahs || [1, 36, 55, 67, 112]).slice(0, 4);

  return (
    <div className="flex-1 flex flex-col justify-between max-w-md w-full mx-auto px-5 py-4 select-none bg-white dark:bg-stone-950 overflow-y-auto">
      {/* 1. Sleek Android Header (Notification bar removed as requested) */}
      <div className="flex items-center justify-between pt-1 pb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-cinzel font-bold text-sm shadow-xs">
            ن
          </div>
          <div>
            <h1 className="font-cinzel font-bold text-base text-black dark:text-white tracking-tight leading-tight">
              An-Nur
            </h1>
            <span className="font-quran text-xs text-stone-900 dark:text-amber-400 font-bold">
              القرآن الكريم
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Qibla Direction Finder */}
          <button
            onClick={onOpenQibla}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-black text-white dark:bg-emerald-500/10 dark:text-emerald-300 dark:border dark:border-emerald-500/30 text-xs font-bold transition-all active:scale-95 shadow-2xs"
            title="Qibla Compass Direction Finder"
          >
            <Compass className="w-3.5 h-3.5 text-white dark:text-emerald-400" />
            <span>Qibla</span>
          </button>

          {/* Spiritual streak badge */}
          <button
            onClick={onOpenImanTracker}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-xs font-bold text-black dark:text-amber-400 transition-colors"
            title="View spiritual streak & history"
          >
            <Flame className="w-3.5 h-3.5 fill-black text-black dark:fill-amber-500 dark:text-amber-500" />
            <span className="tabular-nums">{streak}d</span>
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl bg-black text-white hover:bg-stone-900 dark:bg-stone-900 dark:text-stone-300 dark:hover:text-white border border-black dark:border-stone-800 transition-all active:scale-95 shadow-2xs"
            title="Settings & Preferences (Tab)"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Last Read Position Resume Banner */}
      <div className="pt-1">
        <button
          onClick={onStartReading}
          className="w-full flex items-center justify-between p-3 rounded-2xl border-2 border-black dark:border-amber-500/30 bg-stone-100 hover:bg-stone-200 dark:bg-amber-500/10 dark:hover:bg-amber-500/15 text-black dark:text-amber-200 text-xs transition-colors shadow-2xs"
          title="Resume from where you last left off"
        >
          <div className="flex items-center gap-2 min-w-0">
            <BookmarkCheck className="w-4 h-4 text-black dark:text-amber-400 shrink-0 stroke-[2.5]" />
            <span className="truncate text-black dark:text-amber-200">
              Resume: <strong className="font-bold text-black dark:text-white">Surah {lastRead.surahName || 'Al-Fatihah'} : Ayah {lastRead.ayahNumber || 1}</strong>
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold text-black dark:text-amber-400 shrink-0">
            Continue →
          </span>
        </button>
      </div>

      {/* 3. Centerpiece: Fluid-Filled Iman Circle with Animated Waves */}
      <div className="flex-1 flex flex-col items-center justify-center py-4 space-y-4">
        <div className="relative">
          <FluidCircle
            percent={totalImanPercent}
            size={230}
            completedPrayers={completedCount}
            totalPrayers={5}
            versesRead={imanRecord.versesRead}
            onTap={onOpenImanTracker}
          />
        </div>

        {/* Quick Prayer Times Strip */}
        <div className="w-full pt-1">
          <div className="flex items-center justify-between pb-1 px-1 text-[11px]">
            <span className="font-bold uppercase tracking-wider text-black dark:text-white">Today's Prayers</span>
            <span className="font-bold text-black dark:text-amber-400">
              {prayerStatus.nextPrayer?.name} in {prayerStatus.timeUntilNext}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 pt-0.5">
            {prayerStatus.prayers.map((prayer) => {
              const done = imanRecord.prayers[prayer.id];
              return (
                <button
                  key={prayer.id}
                  onClick={() => onTogglePrayer(prayer.id)}
                  className={`flex flex-col items-center py-2.5 px-1 rounded-xl border transition-all text-center ${
                    done
                      ? 'bg-black text-white border-black dark:bg-emerald-500/20 dark:text-emerald-200 dark:border-emerald-500/40 shadow-xs'
                      : prayer.isNext
                      ? 'bg-stone-100 dark:bg-stone-900 border-2 border-black dark:border-amber-500/60 text-black dark:text-white font-bold'
                      : 'bg-white dark:bg-stone-900/60 border-stone-300 dark:border-stone-800 text-stone-900 dark:text-stone-300'
                  }`}
                  title={`Toggle ${prayer.name} prayer`}
                >
                  <span className="text-[10px] font-bold">{prayer.name}</span>
                  <div className="my-0.5">
                    {done ? (
                      <CheckCircle2 className="w-4 h-4 text-white dark:text-emerald-400 fill-white/20 dark:fill-emerald-500/20" />
                    ) : (
                      <Circle className="w-4 h-4 text-stone-500 dark:text-stone-400" />
                    )}
                  </div>
                  <span className={`text-[9px] font-mono tabular-nums font-bold ${done ? 'text-white/90 dark:text-emerald-200' : 'text-stone-800 dark:text-stone-400'}`}>
                    {prayer.timeString.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Favorite Surahs Quick-Access Strip */}
      <div className="w-full pt-1 pb-2">
        <div className="flex items-center justify-between pb-1.5 px-1 text-[11px]">
          <div className="flex items-center gap-1 font-bold uppercase tracking-wider text-black dark:text-white">
            <Star className="w-3.5 h-3.5 fill-black text-black dark:fill-amber-400 dark:text-amber-400" />
            <span>Favorite Surahs</span>
          </div>
          <button
            onClick={onOpenFavoritesModal}
            className="text-black dark:text-amber-400 font-bold hover:underline text-[11px]"
          >
            Manage All
          </button>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
          {favorites.map((sNum) => {
            const surah = ALL_SURAHS.find((s) => s.number === sNum);
            if (!surah) return null;
            return (
              <button
                key={sNum}
                onClick={() => onSelectFavoriteSurah(sNum)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-black dark:border-stone-800 bg-black text-white dark:bg-stone-900 dark:text-stone-200 hover:bg-stone-900 whitespace-nowrap text-xs shadow-xs font-bold transition-all active:scale-95"
              >
                <span>{surah.nameEnglish}</span>
                <span className="font-quran text-white/90 dark:text-amber-400 text-xs">
                  {surah.nameArabic}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Primary Action Buttons (Pure Black with White Text in Light Mode, Pure White with Black Text in Dark Mode) */}
      <div className="w-full space-y-2.5 pb-4 pt-1">
        {/* Button 1: Start Quran Reading (Resumes from last read) */}
        <button
          onClick={onStartReading}
          className="w-full h-14 rounded-2xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-bold text-base flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] transition-all"
        >
          <BookOpen className="w-5 h-5 stroke-[2.5]" />
          <span>Start Quran Reading</span>
        </button>

        {/* Button 2: Quran Recitation */}
        <button
          onClick={onStartRecitation}
          className="w-full h-14 rounded-2xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-bold text-base flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] transition-all"
        >
          <Headphones className="w-5 h-5 stroke-[2.5]" />
          <span>Quran Recitation</span>
        </button>
      </div>
    </div>
  );
};
