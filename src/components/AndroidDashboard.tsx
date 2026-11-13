import React from 'react';
import {
  Compass,
  Settings,
  Flame,
  CheckCircle2,
  Circle,
  BookmarkCheck,
  BookOpen,
  Headphones,
  Sparkles,
  Star,
  Clock,
  ChevronRight,
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
  onSelectFavoriteSurah,
  onOpenFavoritesModal,
  onOpenFavoritesTab,
  onOpenQibla,
  onOpenPrayerTimes,
  onOpenSmartTasbih,
  onOpenDailyInspiration,
  onOpenKhatmahPlanner,
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
    <div className="flex-1 flex flex-col max-w-md sm:max-w-lg w-full mx-auto px-4 sm:px-5 py-4 select-none bg-white dark:bg-black overflow-y-auto space-y-4 pb-8">
      {/* 1. Modern Minimalist Header */}
      <header className="flex items-center justify-between pt-1 pb-1">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-cinzel font-bold text-sm shadow-xs">
            ن
          </div>
          <div>
            <h1 className="font-cinzel font-bold text-base text-black dark:text-white tracking-tight leading-none">
              An-Nur
            </h1>
            <span className="font-quran text-xs text-stone-700 dark:text-stone-300 font-bold block mt-0.5">
              القرآن الكريم
            </span>
          </div>
        </div>

        {/* Top Header Utilities */}
        <div className="flex items-center gap-1.5">
          {/* Qibla Direction */}
          <button
            onClick={onOpenQibla}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold transition-all active:scale-95 shadow-2xs"
            title="Qibla Compass Direction Finder"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Qibla</span>
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

      {/* 2. Unified Spiritual Pulse Card (Iman Circle & Daily Prayers) */}
      <section className="p-4 sm:p-5 rounded-3xl bg-stone-50/90 dark:bg-stone-900/60 border border-stone-200/90 dark:border-stone-800/80 shadow-xs space-y-4">
        {/* Top status indicator inside card */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Daily Faith & Salah
          </span>
          {onOpenPrayerTimes && (
            <button
              onClick={onOpenPrayerTimes}
              className="flex items-center gap-1 text-[11px] font-bold text-black dark:text-white hover:underline"
              title="View full prayer times table"
            >
              <Clock className="w-3 h-3 text-black dark:text-white" />
              <span>{prayerStatus.nextPrayer?.name} in {prayerStatus.timeUntilNext}</span>
            </button>
          )}
        </div>

        {/* Centerpiece Fluid-Filled Circle with Animated Waves */}
        <div className="flex flex-col items-center justify-center py-1">
          <FluidCircle
            percent={totalImanPercent}
            size={200}
            completedPrayers={completedCount}
            totalPrayers={5}
            versesRead={imanRecord.versesRead}
            onTap={onOpenImanTracker}
          />
          <button
            onClick={onOpenImanTracker}
            className="mt-2.5 px-3 py-1 rounded-full bg-black text-white dark:bg-white dark:text-black text-[11px] font-bold transition-transform active:scale-95 flex items-center justify-center gap-1 shadow-2xs"
            title="Open comprehensive Iman Analysis & Trends"
          >
            <span>Spiritual Analysis & Trends ↗</span>
          </button>
        </div>

        {/* Integrated 5 Daily Prayers Strip */}
        <div className="pt-1 border-t border-stone-200/80 dark:border-stone-800/80">
          <div className="grid grid-cols-5 gap-1 sm:gap-1.5 pt-1">
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
                        : 'bg-white dark:bg-stone-900/70 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-300 hover:border-black dark:hover:border-white'
                    }`}
                    title={`Toggle ${prayer.name} prayer`}
                  >
                    <span className="text-[10px] font-bold">{prayer.name}</span>
                    <div className="my-0.5">
                      {done ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-white dark:text-black fill-transparent stroke-[2.5]" />
                      ) : (
                        <Circle className="w-3.5 h-3.5 text-stone-400 dark:text-stone-600" />
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
        </div>
      </section>

      {/* 3. Primary Sacred Pathway Card: Resume Quran Reading */}
      <section>
        <button
          onClick={onStartReading}
          className="w-full flex items-center justify-between p-4 rounded-3xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-200 transition-all shadow-md group text-left active:scale-[0.99] border border-black dark:border-white"
          title="Resume from where you last left off"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-white/20 dark:bg-black/10 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-white dark:text-black stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-300 dark:text-stone-700 block">
                Continue Reading
              </span>
              <p className="text-[13px] font-bold truncate">
                Surah {lastRead.surahName || 'Al-Fatihah'} : Ayah {lastRead.ayahNumber || 1}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 font-bold text-xs shrink-0 text-white dark:text-black group-hover:translate-x-0.5 transition-transform">
            <span>Resume</span>
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </div>
        </button>
      </section>

      {/* 4. Dual Core Pillars (Side-by-Side Clean Grid) */}
      <section className="grid grid-cols-2 gap-2.5">
        {/* Pillar 1: Quran Recitation */}
        <button
          onClick={onStartRecitation}
          className="p-4 rounded-3xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 hover:border-black dark:hover:border-white transition-all text-left space-y-2 group active:scale-[0.98] shadow-2xs"
          title="Immersive Quran audio recitation"
        >
          <div className="w-9 h-9 rounded-2xl bg-stone-200/80 dark:bg-stone-800 flex items-center justify-center text-black dark:text-white group-hover:scale-105 transition-transform">
            <Headphones className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-black dark:text-white font-cinzel">
              Recitation
            </h2>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
              Immersive audio by world Qaris
            </p>
          </div>
        </button>

        {/* Pillar 2: Hadith’s Journey */}
        <button
          onClick={onStartHadithJourney}
          className="p-4 rounded-3xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 hover:border-black dark:hover:border-white transition-all text-left space-y-2 group active:scale-[0.98] shadow-2xs"
          title="Explore 10,000+ authentic Hadiths and questions"
        >
          <div className="w-9 h-9 rounded-2xl bg-stone-200/80 dark:bg-stone-800 flex items-center justify-center text-black dark:text-white group-hover:scale-105 transition-transform">
            <Compass className="w-4 h-4 stroke-[2.2] text-black dark:text-white" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-black dark:text-white font-cinzel">
              Hadith’s Journey
            </h2>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
              10 thematic spheres & 200 chapters
            </p>
          </div>
        </button>
      </section>

      {/* 5. Essential Companion Tools (Minimalist 4-Tile Grid) */}
      <section className="space-y-2">
        <div className="flex items-center justify-between text-xs px-1 font-bold text-stone-500">
          <span>Spiritual Companion Tools</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Tool 1: Smart Tasbih */}
          {onOpenSmartTasbih && (
            <button
              onClick={onOpenSmartTasbih}
              className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 hover:border-black dark:hover:border-white transition-all text-left flex flex-col justify-between active:scale-95"
              title="Digital Tasbih & Dhikr Counter"
            >
              <span className="text-lg mb-1">📿</span>
              <div>
                <span className="text-xs font-bold text-black dark:text-white block font-cinzel">Tasbih</span>
                <span className="text-[10px] text-stone-500">Sacred Dhikr</span>
              </div>
            </button>
          )}

          {/* Tool 2: Daily Inspiration */}
          {onOpenDailyInspiration && (
            <button
              onClick={onOpenDailyInspiration}
              className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 hover:border-black dark:hover:border-white transition-all text-left flex flex-col justify-between active:scale-95"
              title="Daily Ayah & Hadith Shareable Cards"
            >
              <Sparkles className="w-4 h-4 text-black dark:text-white mb-1" />
              <div>
                <span className="text-xs font-bold text-black dark:text-white block font-cinzel">Inspiration</span>
                <span className="text-[10px] text-stone-500">Daily Verses</span>
              </div>
            </button>
          )}

          {/* Tool 3: Khatmah Planner */}
          {onOpenKhatmahPlanner && (
            <button
              onClick={onOpenKhatmahPlanner}
              className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 hover:border-black dark:hover:border-white transition-all text-left flex flex-col justify-between active:scale-95"
              title="Personalized Quran Completion Habit"
            >
              <BookOpen className="w-4 h-4 text-black dark:text-white mb-1" />
              <div>
                <span className="text-xs font-bold text-black dark:text-white block font-cinzel">Khatmah</span>
                <span className="text-[10px] text-stone-500">Habit Plan</span>
              </div>
            </button>
          )}

          {/* Tool 4: Favorite Surahs */}
          <button
            onClick={() => {
              if (onOpenFavoritesTab) onOpenFavoritesTab();
              else if (onOpenFavoritesModal) onOpenFavoritesModal();
            }}
            className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 hover:border-black dark:hover:border-white transition-all text-left flex flex-col justify-between active:scale-95 shadow-2xs"
            title="Open Favourites Tab with Prophetic recommendations & saved Surahs"
          >
            <Star className="w-4 h-4 text-black dark:text-white fill-black dark:fill-white mb-1" />
            <div>
              <span className="text-xs font-bold text-black dark:text-white block font-cinzel">Favorites</span>
              <span className="text-[10px] text-stone-500">
                {(profile.favoriteSurahs || []).length} Saved
              </span>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};
