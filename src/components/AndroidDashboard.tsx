import React from 'react';
import {
  Compass,
  Settings,
  Flame,
  CheckCircle2,
  Circle,
  BookOpen,
  Headphones,
  Sparkles,
  Star,
  Clock,
  ChevronRight,
  ScrollText,
  CircleDot,
} from 'lucide-react';
import { FluidCircle } from './FluidCircle';
import { DailyPrayers, ImanDayRecord, LastReadPosition, UserProfileData } from '../types/quran';
import { PrayerStatus } from '../utils/prayerTimes';
import { calculateImanBreakdown } from '../utils/imanScore';

interface AndroidDashboardProps {
  imanRecord: ImanDayRecord;
  profile: UserProfileData;
  prayerStatus: PrayerStatus;
  streak: number;
  lastRead: LastReadPosition;
  onStartReading: () => void;
  onStartRecitation: () => void;
  onStartHadithReading: () => void;
  onStartHadithJourney: () => void;
  onOpenSettings: () => void;
  onTogglePrayer: (prayerKey: keyof DailyPrayers) => void;
  onOpenImanTracker: () => void;
  onSelectFavoriteSurah?: (surahNumber: number) => void;
  onOpenFavoritesModal?: () => void;
  onOpenFavoritesTab?: () => void;
  onOpenQibla: () => void;
  onOpenPrayerTimes?: () => void;
  onOpenSmartTasbih?: () => void;
  onOpenDailyInspiration?: () => void;
  onOpenKhatmahPlanner?: () => void;
  onOpenProphetsTimeline?: () => void;
  onOpenSacredHub?: () => void;
}

export const AndroidDashboard: React.FC<AndroidDashboardProps> = ({
  imanRecord,
  profile,
  prayerStatus,
  streak,
  lastRead,
  onStartReading,
  onStartRecitation,
  onStartHadithJourney,
  onOpenSettings,
  onTogglePrayer,
  onOpenImanTracker,
  onOpenFavoritesModal,
  onOpenFavoritesTab,
  onOpenQibla,
  onOpenPrayerTimes,
  onOpenSmartTasbih,
  onOpenDailyInspiration,
  onOpenKhatmahPlanner,
  onOpenProphetsTimeline,
  onOpenSacredHub,
}) => {
  // Unified Iman Breakdown (Prayers + Quran Ayahs + Dhikr + Hadiths Studied)
  const imanBreakdown = calculateImanBreakdown(imanRecord, profile);
  const completedCount = imanBreakdown.completedFard;
  const totalImanPercent = imanBreakdown.totalPercent;

  return (
    <div className="flex-1 flex flex-col max-w-md sm:max-w-lg w-full mx-auto px-4 sm:px-5 py-4 select-none bg-white dark:bg-black overflow-y-auto space-y-4 pb-8">
      {/* 1. Clean App Header */}
      <header className="flex items-center justify-between pt-1 pb-1">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-scheherazade font-bold text-lg shadow-xs shrink-0">
            ن
          </div>
          <div>
            <h1 className="font-cinzel font-bold text-base text-black dark:text-white tracking-tight leading-none">
              An-Nur
            </h1>
            <span dir="rtl" className="font-quran text-xs text-stone-600 dark:text-stone-400 font-bold block mt-0.5">
              القرآن الكريم
            </span>
          </div>
        </div>

        {/* Top Header Utilities */}
        <div className="flex items-center gap-1.5">
          {/* Prophets & Sirah Timeline Icon beside Qibla */}
          {onOpenProphetsTimeline && (
            <button
              onClick={onOpenProphetsTimeline}
              className="p-2 rounded-xl bg-black text-white dark:bg-white dark:text-black transition-all active:scale-95 shadow-2xs"
              title="Prophets & Sirah Timeline (English Study)"
              aria-label="Prophets & Sirah Timeline"
            >
              <ScrollText className="w-4 h-4" />
            </button>
          )}

          {/* Qibla Direction */}
          <button
            onClick={onOpenQibla}
            className="p-2 rounded-xl bg-black text-white dark:bg-white dark:text-black transition-all active:scale-95 shadow-2xs"
            title="Qibla Compass Direction Finder"
            aria-label="Qibla Compass Direction Finder"
          >
            <Compass className="w-4 h-4" />
          </button>

          {/* Spiritual Streak Badge */}
          <button
            onClick={onOpenImanTracker}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold transition-all active:scale-95 shadow-2xs"
            title="View spiritual streak & trends"
          >
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span className="tabular-nums">{streak}d</span>
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl bg-black text-white dark:bg-white dark:text-black transition-all active:scale-95 shadow-2xs"
            title="Settings & Preferences"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. Centerpiece Fluid-Filled Iman Circle */}
      <section className="flex flex-col items-center justify-center pt-1 pb-1 space-y-3">
        <FluidCircle
          percent={totalImanPercent}
          size={220}
          completedPrayers={completedCount}
          totalPrayers={5}
          versesRead={imanBreakdown.versesRead}
          dhikrCount={imanBreakdown.dhikrCount}
          hadithsStudied={imanBreakdown.hadithsStudied}
          onTap={onOpenImanTracker}
        />

        <button
          onClick={onOpenImanTracker}
          className="px-4 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-bold transition-transform active:scale-95 flex items-center justify-center gap-1 shadow-2xs"
          title="Open comprehensive Iman Analysis & Trends"
        >
          <span>Spiritual Analysis & Trends ↗</span>
        </button>
      </section>

      {/* 3. Daily Prayers Strip */}
      <section className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-2.5 shadow-2xs">
        <div className="flex items-center justify-between text-xs px-0.5">
          <span className="font-bold text-black dark:text-white">
            Daily Prayers ({completedCount}/5)
          </span>
          {onOpenPrayerTimes && (
            <button
              onClick={onOpenPrayerTimes}
              className="flex items-center gap-1 text-[11px] font-bold text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white hover:underline truncate max-w-[60%]"
              title="Change city or view seasonal prayer times"
            >
              <Clock className="w-3 h-3 shrink-0" />
              <span className="truncate">
                {prayerStatus.locationName.split(',')[0]} · {prayerStatus.nextPrayer?.name} in {prayerStatus.timeUntilNext}
              </span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-5 gap-1.5">
          {prayerStatus.prayers
            .filter((p) => !p.isVoluntary)
            .map((prayer) => {
              const prayerKey = prayer.id as keyof DailyPrayers;
              const done = imanRecord.prayers[prayerKey];
              return (
                <button
                  key={prayer.id}
                  onClick={() => onTogglePrayer(prayerKey)}
                  className={`flex flex-col items-center py-2 px-1 rounded-xl border transition-all text-center ${
                    done
                      ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-2xs font-bold'
                      : prayer.isNext
                      ? 'bg-stone-100 dark:bg-stone-900 border-2 border-black dark:border-white text-black dark:text-white font-bold'
                      : 'bg-white dark:bg-stone-900/80 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-300 hover:border-black dark:hover:border-white'
                  }`}
                  title={`Toggle ${prayer.name} prayer`}
                >
                  <span className="text-[11px] font-bold tracking-tight">{prayer.name}</span>
                  <div className="my-1">
                    {done ? (
                      <CheckCircle2 className="w-4 h-4 text-white dark:text-black fill-transparent stroke-[2.5]" />
                    ) : (
                      <Circle className="w-4 h-4 text-stone-400 dark:text-stone-600" />
                    )}
                  </div>
                  <span
                    className={`text-[9px] font-mono tabular-nums font-bold ${
                      done ? 'text-white/90 dark:text-black/90' : 'text-stone-500 dark:text-stone-400'
                    }`}
                  >
                    {prayer.timeString.split(' ')[0]}
                  </span>
                </button>
              );
            })}
        </div>
      </section>

      {/* 4. Primary Reading, Recitation & Hadith Cards */}
      <section className="space-y-2.5">
        {/* Primary CTA: Continue Reading Al-Qur'an */}
        <button
          onClick={onStartReading}
          className="w-full p-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-between shadow-sm hover:opacity-95 active:scale-[0.99] transition-all text-left"
          title="Resume Qur'an reading from your last ayah"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white/15 dark:bg-black/10 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold font-cinzel tracking-tight leading-tight">
                Continue Reading Qur’an
              </h2>
              <p className="text-xs opacity-80 truncate mt-0.5">
                {lastRead.surahName || 'Al-Fatihah'} · Ayah {lastRead.ayahNumber || 1}
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 shrink-0 opacity-80" />
        </button>

        {/* Secondary Row: Recitation & Hadith Journey */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={onStartRecitation}
            className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 hover:border-black dark:hover:border-white transition-all text-left flex items-center gap-2.5 active:scale-[0.98] shadow-2xs"
            title="Immersive Quran audio recitation"
          >
            <div className="w-9 h-9 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shrink-0">
              <Headphones className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xs font-bold text-black dark:text-white leading-tight">
                Recitation
              </h2>
              <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate mt-0.5">
                World Qaris
              </p>
            </div>
          </button>

          <button
            onClick={onStartHadithJourney}
            className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 hover:border-black dark:hover:border-white transition-all text-left flex items-center gap-2.5 active:scale-[0.98] shadow-2xs"
            title="Learn Sahih Hadiths by Topic, Chapter & Easy Memory Lessons"
          >
            <div className="w-9 h-9 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xs font-bold text-black dark:text-white leading-tight">
                Hadith Journey
              </h2>
              <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate mt-0.5">
                8 Topics · Lessons
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* 5. Spiritual Quick Tools */}
      <section className="space-y-2">
        <div className="flex items-center justify-between text-xs px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Spiritual Tools
          </span>
          {onOpenSacredHub && (
            <button
              onClick={onOpenSacredHub}
              className="text-[11px] font-bold text-black dark:text-white hover:underline flex items-center gap-0.5 active:scale-95 transition-transform"
              title="Open Adhkar, 99 Names, 40 Rabbana, Tajweed, Hifz Coach, Topics & Hijri Calendar"
            >
              <span>All Guides & Tools</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Smart Tasbih */}
          {onOpenSmartTasbih && (
            <button
              onClick={onOpenSmartTasbih}
              className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 hover:border-black dark:hover:border-white transition-all text-left flex items-center gap-2.5 active:scale-[0.98] shadow-2xs"
              title="Digital Tasbih & Dhikr Counter"
            >
              <CircleDot className="w-4 h-4 text-black dark:text-white shrink-0" />
              <div className="min-w-0">
                <span className="text-xs font-bold text-black dark:text-white block leading-tight">
                  Smart Tasbih
                </span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400 block">
                  Dhikr Counter
                </span>
              </div>
            </button>
          )}

          {/* Daily Inspiration */}
          {onOpenDailyInspiration && (
            <button
              onClick={onOpenDailyInspiration}
              className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 hover:border-black dark:hover:border-white transition-all text-left flex items-center gap-2.5 active:scale-[0.98] shadow-2xs"
              title="Daily Ayah & Hadith Shareable Cards"
            >
              <Sparkles className="w-4 h-4 text-black dark:text-white shrink-0" />
              <div className="min-w-0">
                <span className="text-xs font-bold text-black dark:text-white block leading-tight">
                  Inspiration
                </span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400 block">
                  Daily Verses
                </span>
              </div>
            </button>
          )}

          {/* Khatmah Planner */}
          {onOpenKhatmahPlanner && (
            <button
              onClick={onOpenKhatmahPlanner}
              className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 hover:border-black dark:hover:border-white transition-all text-left flex items-center gap-2.5 active:scale-[0.98] shadow-2xs"
              title="Personalized Quran Completion Habit"
            >
              <BookOpen className="w-4 h-4 text-black dark:text-white shrink-0" />
              <div className="min-w-0">
                <span className="text-xs font-bold text-black dark:text-white block leading-tight">
                  Khatmah
                </span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400 block">
                  Habit Plan
                </span>
              </div>
            </button>
          )}

          {/* Favorite Surahs */}
          <button
            onClick={() => {
              if (onOpenFavoritesTab) onOpenFavoritesTab();
              else if (onOpenFavoritesModal) onOpenFavoritesModal();
            }}
            className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 hover:border-black dark:hover:border-white transition-all text-left flex items-center gap-2.5 active:scale-[0.98] shadow-2xs"
            title="Open Favourites Tab with Prophetic recommendations & saved Surahs"
          >
            <Star className="w-4 h-4 text-black dark:text-white fill-black dark:fill-white shrink-0" />
            <div className="min-w-0">
              <span className="text-xs font-bold text-black dark:text-white block leading-tight">
                Favorites
              </span>
              <span className="text-[10px] text-stone-500 dark:text-stone-400 block">
                {(profile.favoriteSurahs || []).length} Saved
              </span>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};
