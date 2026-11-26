import React, { useMemo } from 'react';
import {
  Compass,
  Settings,
  Calendar,
  Check,
  BookOpen,
  Headphones,
  Sparkles,
  Star,
  Clock,
  ChevronRight,
  ScrollText,
  CircleDot,
  BookMarked,
  Layers,
  Moon,
  Lock,
} from 'lucide-react';
import { FluidCircle } from './FluidCircle';
import { DailyPrayers, ImanDayRecord, LastReadPosition, UserProfileData } from '../types/quran';
import { isPrayerTickLocked, PrayerStatus } from '../utils/prayerTimes';
import { calculateImanBreakdown } from '../utils/imanScore';
import { getRamadanStatus } from '../utils/hijriCalendar';
import { loadRamadanLedger, summarizeRamadanLedger } from '../utils/ramadanLedger';

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
  onOpenIslamChronicle?: () => void;
  onOpenIslamicCalendar: () => void;
  onOpenRamadanSanctuary?: () => void;
  onOpenSunnahDay?: () => void;
}

export const AndroidDashboard: React.FC<AndroidDashboardProps> = ({
  imanRecord,
  profile,
  prayerStatus,
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
  onOpenIslamChronicle,
  onOpenIslamicCalendar,
  onOpenRamadanSanctuary,
  onOpenSunnahDay,
}) => {
  const imanBreakdown = calculateImanBreakdown(imanRecord, profile);
  const completedCount = imanBreakdown.completedFard;
  const totalImanPercent = imanBreakdown.totalPercent;
  const favCount = (profile.favoriteSurahs || []).length;

  const ramadanStatus = useMemo(
    () => getRamadanStatus(profile, new Date()),
    [profile]
  );
  const ramadanSummary = useMemo(() => {
    if (!ramadanStatus.isRamadanActive) return null;
    const ledger = loadRamadanLedger(ramadanStatus.ramadanYear, ramadanStatus.isPreviewMode);
    return summarizeRamadanLedger(ledger);
  }, [ramadanStatus]);

  return (
    <div className="flex-1 flex flex-col max-w-md sm:max-w-lg w-full mx-auto px-5 pt-1 pb-10 select-none bg-white dark:bg-black text-black dark:text-white overflow-y-auto space-y-6">
      {/* 1. Gallery Minimalist Header */}
      <header className="flex items-center justify-between gap-5 py-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-scheherazade font-bold text-base shrink-0">
            ن
          </div>
          <h1 className="whitespace-nowrap flex items-baseline gap-2 min-w-0">
            <span className="font-brand-calligraphy text-[25px] leading-none text-black dark:text-white">
              An-Nur
            </span>
            <span className="text-neutral-300 dark:text-neutral-700 text-xs font-normal select-none">
              ·
            </span>
            <span
              dir="rtl"
              className="font-scheherazade text-[16px] font-bold text-neutral-600 dark:text-neutral-300 leading-none"
            >
              النُّور
            </span>
          </h1>
        </div>

        {/* High-Contrast Monochrome Icon Bar */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onOpenIslamicCalendar}
            className="btn-monolith min-h-[40px] px-2.5 rounded-full border-[1.5px] border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black shadow-[0_2px_0_0_#000000] dark:shadow-[0_2px_0_0_#ffffff] hover:-translate-y-0.5 active:translate-y-[2px] active:shadow-none flex items-center gap-1 text-[10.5px] font-semibold tabular-nums"
            title="Open Islamic Hijri Calendar & Events"
          >
            {ramadanStatus.isRamadanActive ? (
              <Moon className="w-3.5 h-3.5 stroke-[2]" />
            ) : (
              <Calendar className="w-3.5 h-3.5 stroke-[2]" />
            )}
            <span className="whitespace-nowrap">
              {ramadanStatus.isRamadanActive
                ? `Ram ${ramadanStatus.ramadanDay}`
                : ramadanStatus.todayHijri.shortLabel}
            </span>
          </button>

          <button
            onClick={onOpenQibla}
            className="btn-monolith min-h-[40px] min-w-[38px] rounded-full border-[1.5px] border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black shadow-[0_2px_0_0_#000000] dark:shadow-[0_2px_0_0_#ffffff] hover:-translate-y-0.5 active:translate-y-[2px] active:shadow-none flex items-center justify-center"
            title="Qibla Compass"
            aria-label="Qibla Compass"
          >
            <Compass className="w-[16px] h-[16px] stroke-[2]" />
          </button>

          <button
            onClick={onOpenSettings}
            className="btn-monolith min-h-[40px] min-w-[38px] rounded-full border-[1.5px] border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black shadow-[0_2px_0_0_#000000] dark:shadow-[0_2px_0_0_#ffffff] hover:-translate-y-0.5 active:translate-y-[2px] active:shadow-none flex items-center justify-center"
            title="Settings & Preferences"
            aria-label="Settings"
          >
            <Settings className="w-[16px] h-[16px] stroke-[2]" />
          </button>
        </div>
      </header>

      {/* 2. Compulsory Iman Level & Namaz Clock Centerpiece */}
      <section className="flex flex-col items-center justify-center pt-1 pb-1">
        <FluidCircle
          percent={totalImanPercent}
          size={344}
          completedPrayers={completedCount}
          totalPrayers={5}
          versesRead={imanBreakdown.versesRead}
          dhikrCount={imanBreakdown.dhikrCount}
          hadithsStudied={imanBreakdown.hadithsStudied}
          prayerStatus={prayerStatus}
          completedPrayerMap={imanRecord.prayers}
          isRamadanActive={ramadanStatus.isRamadanActive}
          ramadanDay={ramadanStatus.ramadanDay}
          isRamadanPreview={ramadanStatus.isPreviewMode && !ramadanStatus.isActualRamadan}
          onTap={onOpenImanTracker}
          onOpenPrayerTimes={onOpenPrayerTimes}
          onOpenRamadanSanctuary={onOpenRamadanSanctuary}
        />
      </section>

      {/* 2B. Ramadan Exclusive Banner (Visible ONLY in Ramadan or Preview Mode) */}
      {ramadanStatus.isRamadanActive && onOpenRamadanSanctuary && (
        <section>
          <button
            onClick={onOpenRamadanSanctuary}
            className="btn-monolith group w-full p-3.5 rounded-2xl border-[1.5px] border-black dark:border-white bg-black text-white dark:bg-white dark:text-black shadow-[0_4px_14px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_14px_rgba(255,255,255,0.16)] hover:-translate-y-0.5 active:translate-y-[2px] active:scale-[0.985] flex items-center justify-between gap-3 text-left"
            title="Open Ramadan-only Fast, Juz, Ashra & Odd-Night Sanctuary"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white text-black dark:bg-black dark:text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Moon className="w-5 h-5 stroke-[2.1]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] opacity-80">
                  <span>
                    Ramadan Day {ramadanStatus.ramadanDay} · Ashra {ramadanStatus.ashra}
                  </span>
                  {ramadanStatus.isOddNightLastTen && <span>· ✦ Odd Night</span>}
                  {ramadanStatus.isPreviewMode && !ramadanStatus.isActualRamadan && (
                    <span>· Preview</span>
                  )}
                </div>
                <h2 className="text-[14px] font-bold leading-snug truncate">
                  Ramadan Sanctuary & Fasts
                </h2>
                {ramadanSummary && (
                  <p className="text-[11px] font-medium opacity-85 truncate tabular-nums">
                    {ramadanSummary.fastsKept}/30 Fasts · {ramadanSummary.juzCompleted}/30 Ajza ·{' '}
                    {ramadanSummary.taraweehNights} Taraweeh
                  </p>
                )}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>
        </section>
      )}

      {/* 3. Open Architectural Salah Schedule Track */}
      <section className="py-4 border-y-[1.5px] border-black/20 dark:border-white/20 space-y-3">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-black dark:text-white tabular-nums tracking-tight">
            Daily Salah · {completedCount}/5
          </span>
          {onOpenPrayerTimes && (
            <button
              onClick={onOpenPrayerTimes}
              className="btn-monolith flex items-center gap-1 px-2.5 py-1 rounded-full border-[1.5px] border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-[11px] font-semibold truncate max-w-[68%] active:scale-95"
              title="Change city or view seasonal prayer times"
            >
              <Clock className="w-3 h-3 shrink-0" />
              <span className="truncate tabular-nums">
                {prayerStatus.locationName.split(',')[0]} · {prayerStatus.nextPrayer?.name} in{' '}
                {prayerStatus.timeUntilNext}
              </span>
              <ChevronRight className="w-3 h-3 shrink-0" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-5 gap-1.5">
          {prayerStatus.prayers
            .filter((p) => !p.isVoluntary)
            .map((prayer) => {
              const prayerKey = prayer.id as keyof DailyPrayers;
              const done = Boolean(imanRecord.prayers[prayerKey]);
              const locked = isPrayerTickLocked(prayer.id, prayerStatus, done);
              return (
                <button
                  key={prayer.id}
                  disabled={locked}
                  onClick={() => {
                    if (!locked) onTogglePrayer(prayerKey);
                  }}
                  className={`flex flex-col items-center justify-between min-h-[70px] py-2.5 px-1 rounded-2xl border-[1.5px] text-center ${
                    done
                      ? 'btn-monolith bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-[0_2px_0_0_rgba(0,0,0,0.4)] dark:shadow-[0_2px_0_0_rgba(255,255,255,0.4)] hover:-translate-y-0.5 active:translate-y-[2px] active:shadow-none'
                      : locked
                      ? prayer.isNext
                        ? 'bg-white dark:bg-black border-2 border-black/35 dark:border-white/35 text-black/55 dark:text-white/55 cursor-default'
                        : 'bg-white dark:bg-black border-black/25 dark:border-white/25 text-black/45 dark:text-white/45 cursor-default'
                      : prayer.isNext
                      ? 'btn-monolith bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white shadow-[0_3px_0_0_#000000] dark:shadow-[0_3px_0_0_#ffffff] hover:-translate-y-0.5 active:translate-y-[2px] active:shadow-none'
                      : 'btn-monolith bg-white dark:bg-black border-black/50 dark:border-white/50 text-black dark:text-white hover:border-black dark:hover:border-white shadow-[0_2px_0_0_rgba(0,0,0,0.22)] dark:shadow-[0_2px_0_0_rgba(255,255,255,0.22)] hover:-translate-y-0.5 active:translate-y-[2px] active:shadow-none'
                  }`}
                  title={locked ? prayer.name : `Toggle ${prayer.name} prayer`}
                >
                  <span className="text-[11px] font-semibold tracking-tight leading-none">
                    {prayer.name}
                  </span>

                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center border-[1.5px] transition-transform duration-200 ${
                      done
                        ? 'border-white/60 dark:border-black/50 bg-white/15 dark:bg-black/15 scale-105'
                        : locked
                        ? 'border-black/25 dark:border-white/25'
                        : prayer.isNext
                        ? 'border-black dark:border-white'
                        : 'border-black/45 dark:border-white/45'
                    }`}
                  >
                    {done ? (
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    ) : locked ? (
                      <Lock className="w-2.5 h-2.5 stroke-[2.2] opacity-65" />
                    ) : (
                      prayer.isNext && (
                        <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white animate-pulse" />
                      )
                    )}
                  </div>

                  <span
                    className={`text-[10px] tabular-nums font-semibold leading-none ${
                      done ? 'opacity-90' : locked ? 'opacity-75' : 'text-black/80 dark:text-white/80'
                    }`}
                  >
                    {prayer.timeString.split(' ')[0]}
                  </span>
                </button>
              );
            })}
        </div>
      </section>

      {/* 4. Three Primary Pillar Buttons: Qur'an Reading -> Islam Learning -> Hadith's Learning */}
      <section className="space-y-3">
        {/* 4A. Qur'an Reading (Primary Inverted Monolith) */}
        <button
          onClick={onStartReading}
          className="btn-monolith group w-full min-h-[74px] p-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black border-[1.5px] border-black dark:border-white shadow-[0_6px_18px_rgba(0,0,0,0.18)] dark:shadow-[0_6px_18px_rgba(255,255,255,0.14)] hover:-translate-y-0.5 active:translate-y-[2px] active:scale-[0.985] flex items-center justify-between text-left"
          title="Resume Qur'an reading from your last ayah"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-white text-black dark:bg-black dark:text-white flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-200">
              <BookOpen className="w-5 h-5 stroke-[2.1]" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] opacity-75 block">
                Qur’an Reading
              </span>
              <h2 className="text-[15.5px] font-bold tracking-tight leading-snug">
                The Holy Qur’an
              </h2>
              <p className="text-xs font-medium opacity-85 truncate tabular-nums">
                {lastRead.surahName || 'Al-Fatihah'} · Ayah {lastRead.ayahNumber || 1}
              </p>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full border-[1.5px] border-white/45 dark:border-black/40 flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform duration-200">
            <ChevronRight className="w-4 h-4 stroke-[2.2]" />
          </div>
        </button>

        {/* 4B. Islam Learning (Main Button 2) */}
        {onOpenIslamChronicle && (
          <button
            onClick={onOpenIslamChronicle}
            className="btn-monolith group w-full min-h-[70px] p-4 rounded-2xl bg-white text-black dark:bg-black dark:text-white border-[1.5px] border-black dark:border-white shadow-[0_3px_0_0_#000000] dark:shadow-[0_3px_0_0_#ffffff] hover:-translate-y-0.5 active:translate-y-[2px] active:shadow-none flex items-center justify-between gap-3 text-left"
            title="24 Chronological Chapters with Qur'an & Sahih Hadith References (100% Offline)"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold text-sm tabular-nums shrink-0 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-200">
                24
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/65 dark:text-white/70 block">
                  Islam Learning
                </span>
                <h2 className="text-[15px] font-bold text-black dark:text-white tracking-tight leading-snug">
                  Let’s Learn Islam
                </h2>
                <p className="text-xs font-medium text-black/75 dark:text-white/75 truncate">
                  Analytics · Qur’an & Sahih Hadith Facts
                </p>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full border-[1.5px] border-black dark:border-white flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black group-hover:translate-x-1 transition-all duration-200">
              <ChevronRight className="w-4 h-4 stroke-[2.2]" />
            </div>
          </button>
        )}

        {/* 4C. Hadith's Learning (Main Button 3) */}
        <button
          onClick={onStartHadithJourney}
          className="btn-monolith group w-full min-h-[70px] p-4 rounded-2xl bg-white text-black dark:bg-black dark:text-white border-[1.5px] border-black dark:border-white shadow-[0_3px_0_0_#000000] dark:shadow-[0_3px_0_0_#ffffff] hover:-translate-y-0.5 active:translate-y-[2px] active:shadow-none flex items-center justify-between gap-3 text-left"
          title="Learn Sahih Hadiths by Topic & Lessons"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-200">
              <BookMarked className="w-5 h-5 stroke-[2.1]" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/65 dark:text-white/70 block">
                Hadith’s Learning
              </span>
              <h2 className="text-[15px] font-bold text-black dark:text-white tracking-tight leading-snug">
                Sahih Hadith Journey
              </h2>
              <p className="text-xs font-medium text-black/75 dark:text-white/75 truncate">
                8 Authentic Topics · Step-by-Step Lessons
              </p>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full border-[1.5px] border-black dark:border-white flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black group-hover:translate-x-1 transition-all duration-200">
            <ChevronRight className="w-4 h-4 stroke-[2.2]" />
          </div>
        </button>

        {/* Secondary Monochrome Tiles: Recitation, Favorites, 28 Prophets */}
        <div className="grid grid-cols-3 gap-2 pt-0.5">
          <button
            onClick={onStartRecitation}
            className="btn-monolith group min-h-[76px] p-3 rounded-2xl bg-white dark:bg-black border-[1.5px] border-black dark:border-white shadow-[0_2px_0_0_#000000] dark:shadow-[0_2px_0_0_#ffffff] hover:-translate-y-0.5 active:translate-y-[2px] active:shadow-none text-left flex flex-col justify-between"
            title="Immersive Quran audio recitation"
          >
            <div className="w-7 h-7 rounded-full border-[1.5px] border-black dark:border-white flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-200">
              <Headphones className="w-3.5 h-3.5 stroke-[2]" />
            </div>
            <div className="mt-2">
              <span className="text-xs font-bold text-black dark:text-white block leading-tight">
                Recitation
              </span>
              <span className="text-[10px] font-semibold text-black/70 dark:text-white/70 block mt-0.5 truncate">
                Arabic & Urdu
              </span>
            </div>
          </button>

          <button
            onClick={() => {
              if (onOpenFavoritesTab) onOpenFavoritesTab();
              else if (onOpenFavoritesModal) onOpenFavoritesModal();
            }}
            className="btn-monolith group min-h-[76px] p-3 rounded-2xl bg-white dark:bg-black border-[1.5px] border-black dark:border-white shadow-[0_2px_0_0_#000000] dark:shadow-[0_2px_0_0_#ffffff] hover:-translate-y-0.5 active:translate-y-[2px] active:shadow-none text-left flex flex-col justify-between"
            title="Saved & Prophetic Recommended Surahs"
          >
            <div className="w-7 h-7 rounded-full border-[1.5px] border-black dark:border-white flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-200">
              <Star className="w-3.5 h-3.5 stroke-[2]" />
            </div>
            <div className="mt-2">
              <span className="text-xs font-bold text-black dark:text-white block leading-tight">
                Favorites
              </span>
              <span className="text-[10px] font-semibold text-black/70 dark:text-white/70 block mt-0.5 truncate tabular-nums">
                {favCount} Saved
              </span>
            </div>
          </button>

          {onOpenProphetsTimeline && (
            <button
              onClick={onOpenProphetsTimeline}
              className="btn-monolith group min-h-[76px] p-3 rounded-2xl bg-white dark:bg-black border-[1.5px] border-black dark:border-white shadow-[0_2px_0_0_#000000] dark:shadow-[0_2px_0_0_#ffffff] hover:-translate-y-0.5 active:translate-y-[2px] active:shadow-none text-left flex flex-col justify-between"
              title="28 Prophets & Sirah Chronicles"
            >
              <div className="w-7 h-7 rounded-full border-[1.5px] border-black dark:border-white flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-200">
                <ScrollText className="w-3.5 h-3.5 stroke-[2]" />
              </div>
              <div className="mt-2">
                <span className="text-xs font-bold text-black dark:text-white block leading-tight">
                  28 Prophets
                </span>
                <span className="text-[10px] font-semibold text-black/70 dark:text-white/70 block mt-0.5 truncate">
                  Sirah Stories
                </span>
              </div>
            </button>
          )}
        </div>
      </section>

      {/* 5. Daily Practice & Reference Hub */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-0.5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/75 dark:text-white/75">
            Daily Practice
          </span>
          {onOpenSacredHub && (
            <button
              onClick={onOpenSacredHub}
              className="btn-monolith px-2.5 py-1 rounded-full border-[1.5px] border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-xs font-semibold flex items-center gap-0.5 active:scale-95"
              title="Open Adhkar, 99 Names, 40 Rabbana, Tajweed, Hifz & Hijri Calendar"
            >
              <span>All Guides</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {onOpenSmartTasbih && (
            <button
              onClick={onOpenSmartTasbih}
              className="btn-monolith group min-h-[76px] p-3 rounded-2xl bg-white dark:bg-black border-[1.5px] border-black dark:border-white shadow-[0_2px_0_0_#000000] dark:shadow-[0_2px_0_0_#ffffff] hover:-translate-y-0.5 active:translate-y-[2px] active:shadow-none text-left flex flex-col justify-between"
              title="Digital Tasbih & Dhikr Counter"
            >
              <div className="w-7 h-7 rounded-full border-[1.5px] border-black dark:border-white flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-200">
                <CircleDot className="w-3.5 h-3.5 stroke-[2]" />
              </div>
              <div className="mt-2">
                <span className="text-xs font-bold text-black dark:text-white block leading-tight">
                  Tasbih
                </span>
                <span className="text-[10px] font-semibold text-black/70 dark:text-white/70 block mt-0.5">
                  Dhikr
                </span>
              </div>
            </button>
          )}

          {onOpenKhatmahPlanner && (
            <button
              onClick={onOpenKhatmahPlanner}
              className="btn-monolith group min-h-[76px] p-3 rounded-2xl bg-white dark:bg-black border-[1.5px] border-black dark:border-white shadow-[0_2px_0_0_#000000] dark:shadow-[0_2px_0_0_#ffffff] hover:-translate-y-0.5 active:translate-y-[2px] active:shadow-none text-left flex flex-col justify-between"
              title="Personalized Quran Completion Plan"
            >
              <div className="w-7 h-7 rounded-full border-[1.5px] border-black dark:border-white flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-200">
                <BookOpen className="w-3.5 h-3.5 stroke-[2]" />
              </div>
              <div className="mt-2">
                <span className="text-xs font-bold text-black dark:text-white block leading-tight">
                  Khatmah
                </span>
                <span className="text-[10px] font-semibold text-black/70 dark:text-white/70 block mt-0.5">
                  Habit Plan
                </span>
              </div>
            </button>
          )}

          {onOpenDailyInspiration && (
            <button
              onClick={onOpenDailyInspiration}
              className="btn-monolith group min-h-[76px] p-3 rounded-2xl bg-white dark:bg-black border-[1.5px] border-black dark:border-white shadow-[0_2px_0_0_#000000] dark:shadow-[0_2px_0_0_#ffffff] hover:-translate-y-0.5 active:translate-y-[2px] active:shadow-none text-left flex flex-col justify-between"
              title="Daily Ayah & Hadith Reflection"
            >
              <div className="w-7 h-7 rounded-full border-[1.5px] border-black dark:border-white flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-200">
                <Sparkles className="w-3.5 h-3.5 stroke-[2]" />
              </div>
              <div className="mt-2">
                <span className="text-xs font-bold text-black dark:text-white block leading-tight">
                  Inspire
                </span>
                <span className="text-[10px] font-semibold text-black/70 dark:text-white/70 block mt-0.5">
                  Verses
                </span>
              </div>
            </button>
          )}
        </div>

        {onOpenSunnahDay && (
          <button
            onClick={onOpenSunnahDay}
            className="btn-monolith group w-full min-h-[62px] px-4 py-3.5 rounded-2xl border-[1.5px] border-black dark:border-white bg-white dark:bg-black text-black dark:text-white shadow-[0_3px_0_0_#000000] dark:shadow-[0_3px_0_0_#ffffff] hover:-translate-y-0.5 active:translate-y-[2px] active:shadow-none flex items-center justify-between gap-3 text-left"
            title="Follow the 24-Hour Prophetic Sunnah Day with Duas, Favorite Surahs & Sahih Hadiths"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shrink-0 relative group-hover:scale-105 transition-transform duration-200">
                <span
                  aria-hidden="true"
                  className="w-[2px] h-5 rounded-full bg-gradient-to-b from-[#B8860B] via-[#F3D578] to-[#B8860B]"
                />
                <span
                  aria-hidden="true"
                  className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] border border-[#FFF3C4] shadow-[0_0_6px_#D4AF37] absolute"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-black dark:text-white truncate">
                    The Prophetic Day
                  </span>
                  <span className="text-[10px] font-bold text-[#9A7214] dark:text-[#E5C158] shrink-0">
                    Golden Sunnah
                  </span>
                </div>
                <span className="text-[10.5px] font-semibold text-black/70 dark:text-white/70 block truncate mt-0.5">
                  Live Daily Routine · Duas · Favorite Surahs · Hadiths
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-black dark:text-white shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        )}

        {onOpenSacredHub && (
          <button
            onClick={onOpenSacredHub}
            className="btn-monolith group w-full min-h-[56px] px-4 py-3 rounded-2xl border-[1.5px] border-black dark:border-white bg-white dark:bg-black text-black dark:text-white shadow-[0_2px_0_0_#000000] dark:shadow-[0_2px_0_0_#ffffff] hover:-translate-y-0.5 active:translate-y-[2px] active:shadow-none flex items-center justify-between gap-3 text-left"
            title="Open Companions & Study Hub"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                <Layers className="w-4 h-4 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-black dark:text-white block truncate">
                  Companions & Guides Hub
                </span>
                <span className="text-[10.5px] font-semibold text-black/70 dark:text-white/70 block truncate">
                  Adhkar · 99 Names · 40 Rabbana · Tajweed · Hijri
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-black dark:text-white shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        )}
      </section>
    </div>
  );
};
