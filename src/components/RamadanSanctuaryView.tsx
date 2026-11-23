import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Check,
  Clock,
  Eye,
  Moon,
  RotateCcw,
  Sparkles,
  Star,
} from 'lucide-react';
import {
  RAMADAN_ASHRAS,
  RAMADAN_DAILY_MILESTONES,
} from '../data/islamicCalendarEvents';
import { UserProfileData } from '../types/quran';
import { PrayerStatus, resolveLocationClock } from '../utils/prayerTimes';
import { getRamadanStatus } from '../utils/hijriCalendar';
import {
  RamadanDayEntry,
  RamadanYearLedger,
  cycleRamadanFastStatus,
  cycleRamadanTaraweeh,
  getRamadanDayEntry,
  incrementRamadanAshraDhikr,
  incrementRamadanQadrDua,
  loadRamadanLedger,
  summarizeRamadanLedger,
  toggleOddNightChecklistItem,
  toggleRamadanJuz,
  toggleRamadanSadaqah,
} from '../utils/ramadanLedger';

type RamadanTab = 'ledger' | 'juz' | 'ashras' | 'qadr';

interface RamadanSanctuaryViewProps {
  profile: UserProfileData;
  prayerStatus: PrayerStatus;
  onUpdateProfile: (updates: Partial<UserProfileData>) => void;
  onBackToDashboard: () => void;
  onOpenAyahInReader: (surahNumber: number, ayahNumber: number) => void;
}

const ODD_NIGHTS = [21, 23, 25, 27, 29];

function formatMinsToHm(mins: number): string {
  const m = Math.max(0, Math.round(mins));
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return h > 0 ? `${h}h ${rem}m` : `${rem}m`;
}

export const RamadanSanctuaryView: React.FC<RamadanSanctuaryViewProps> = ({
  profile,
  prayerStatus,
  onUpdateProfile,
  onBackToDashboard,
  onOpenAyahInReader,
}) => {
  const ramadanStatus = useMemo(
    () => getRamadanStatus(profile, new Date()),
    [profile]
  );

  const [activeTab, setActiveTab] = useState<RamadanTab>('ledger');
  const [ledger, setLedger] = useState<RamadanYearLedger>(() =>
    loadRamadanLedger(ramadanStatus.ramadanYear, ramadanStatus.isPreviewMode)
  );
  const [selectedOddNight, setSelectedOddNight] = useState<number>(
    ramadanStatus.isOddNightLastTen ? ramadanStatus.ramadanDay : 27
  );
  const [nowTick, setNowTick] = useState(() => Date.now());

  // Reload ledger if switching between Actual Ramadan and Preview Mode
  useEffect(() => {
    setLedger(loadRamadanLedger(ramadanStatus.ramadanYear, ramadanStatus.isPreviewMode));
  }, [ramadanStatus.ramadanYear, ramadanStatus.isPreviewMode]);

  useEffect(() => {
    const id = window.setInterval(() => setNowTick(Date.now()), 30000);
    return () => window.clearInterval(id);
  }, []);

  const activeDay = ramadanStatus.ramadanDay;
  const activeEntry: RamadanDayEntry = useMemo(
    () => getRamadanDayEntry(ledger, activeDay),
    [ledger, activeDay]
  );
  const summary = useMemo(() => summarizeRamadanLedger(ledger), [ledger]);

  // Live Sahoor / Iftar Fasting Window computation
  const fastingWindow = useMemo(() => {
    const nowDate = new Date(nowTick);
    const clock = resolveLocationClock(nowDate, prayerStatus.timezone, prayerStatus.lng);
    const fajr = prayerStatus.prayers.find((p) => p.id === 'fajr');
    const maghrib = prayerStatus.prayers.find((p) => p.id === 'maghrib');

    const fajrMins = fajr?.timeMinutes ?? 315;
    const maghribMins = maghrib?.timeMinutes ?? 1095;
    const cur = clock.currentMinutes;

    const isDaytimeFasting = cur >= fajrMins && cur < maghribMins;
    let percent = 0;
    let remainingMins = 0;

    if (isDaytimeFasting) {
      const span = Math.max(1, maghribMins - fajrMins);
      percent = Math.round(((cur - fajrMins) / span) * 100);
      remainingMins = maghribMins - cur;
    } else {
      const nightSpan = Math.max(1, 1440 - maghribMins + fajrMins);
      const elapsedNight = cur >= maghribMins ? cur - maghribMins : 1440 - maghribMins + cur;
      percent = Math.round((elapsedNight / nightSpan) * 100);
      remainingMins = cur < fajrMins ? fajrMins - cur : 1440 - cur + fajrMins;
    }

    return {
      isDaytimeFasting,
      percent: Math.max(0, Math.min(100, percent)),
      remainingLabel: formatMinsToHm(remainingMins),
      sahoorTime: fajr?.timeString || '05:15 AM',
      iftarTime: maghrib?.timeString || '06:15 PM',
    };
  }, [nowTick, prayerStatus]);

  const dayMilestone = useMemo(
    () =>
      RAMADAN_DAILY_MILESTONES.find((m) => m.day === activeDay) ||
      RAMADAN_DAILY_MILESTONES[0],
    [activeDay]
  );

  const oddNightEntry = useMemo(
    () => getRamadanDayEntry(ledger, selectedOddNight),
    [ledger, selectedOddNight]
  );

  const oddNightMilestone = useMemo(
    () => RAMADAN_DAILY_MILESTONES.find((m) => m.day === selectedOddNight),
    [selectedOddNight]
  );

  const handlePreviewDayChange = (day: number) => {
    const clamped = Math.max(1, Math.min(30, day));
    onUpdateProfile({ ramadanPreviewDay: clamped });
    if (clamped >= 21 && clamped % 2 === 1) {
      setSelectedOddNight(clamped);
    }
  };

  const isCountingLocked = !ramadanStatus.isRamadanActive;

  return (
    <div className="flex-1 h-full flex flex-col bg-white text-black dark:bg-black dark:text-white overflow-hidden select-none">
      {/* 1. Monochrome Header */}
      <header className="shrink-0 px-4 py-3 border-b-[1.5px] border-black/15 dark:border-white/20 flex items-center justify-between gap-2 bg-white dark:bg-black">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={onBackToDashboard}
            className="btn-monolith w-10 h-10 rounded-full border-[1.5px] border-black dark:border-white bg-white dark:bg-black text-black dark:text-white flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black active:scale-90 shrink-0"
            title="Back to Dashboard"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-bold tracking-tight truncate">
                Ramadan Sanctuary
              </h1>
              <span dir="rtl" className="font-scheherazade text-sm font-bold">
                رَمَضَان
              </span>
            </div>
            <p className="text-[11px] font-semibold text-black/70 dark:text-white/75 truncate tabular-nums">
              {ramadanStatus.isActualRamadan
                ? `Ramadan ${activeDay} · ${ramadanStatus.ramadanYear} AH`
                : ramadanStatus.isPreviewMode
                ? `Preview Mode · Ramadan Day ${activeDay}`
                : 'Ramadan-Exclusive Tracker'}
            </p>
          </div>
        </div>

        {/* Quick Preview Mode Toggle */}
        {!ramadanStatus.isActualRamadan && (
          <button
            onClick={() =>
              onUpdateProfile({ ramadanPreviewMode: !ramadanStatus.isPreviewMode })
            }
            className={`btn-monolith px-3 py-1.5 rounded-full border-[1.5px] text-[10.5px] font-bold flex items-center gap-1 shrink-0 active:scale-95 ${
              ramadanStatus.isPreviewMode
                ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                : 'bg-white text-black border-black dark:bg-black dark:text-white dark:border-white'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>{ramadanStatus.isPreviewMode ? 'Preview ON' : 'Enable Preview'}</span>
          </button>
        )}
      </header>

      {/* Preview Mode Day Stepper (Only visible during Preview outside actual Ramadan) */}
      {ramadanStatus.isPreviewMode && !ramadanStatus.isActualRamadan && (
        <div className="shrink-0 px-4 py-2 border-b border-black/15 dark:border-white/15 bg-black text-white dark:bg-white dark:text-black flex items-center justify-between gap-2 text-[11px] font-semibold">
          <span className="truncate">
            Simulating <strong>Ramadan Day {activeDay}</strong> (Ashra {ramadanStatus.ashra})
          </span>
          <div className="flex items-center gap-1 shrink-0">
            {[
              { d: 1, label: 'D1' },
              { d: 17, label: 'Badr' },
              { d: 21, label: 'N21' },
              { d: 27, label: 'N27' },
              { d: 30, label: 'D30' },
            ].map((preset) => (
              <button
                key={preset.d}
                onClick={() => handlePreviewDayChange(preset.d)}
                className={`px-2 py-0.5 rounded-md border text-[10px] font-bold transition-all ${
                  activeDay === preset.d
                    ? 'bg-white text-black border-white dark:bg-black dark:text-white dark:border-black'
                    : 'border-white/40 dark:border-black/40 opacity-80 hover:opacity-100'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lock Banner if outside Ramadan and Preview Mode is OFF */}
      {isCountingLocked && (
        <div className="mx-4 mt-3 p-3.5 rounded-2xl border-[1.5px] border-black dark:border-white bg-white dark:bg-black flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-xs font-bold">Ramadan Counting Unlocks in Ramadan</h2>
            <p className="text-[11px] font-medium text-black/70 dark:text-white/75 leading-snug mt-0.5">
              Fasts, Taraweeh, 30-Juz & Odd Nights only count during Ramadan. Turn on Preview Mode to test it now.
            </p>
          </div>
          <button
            onClick={() => onUpdateProfile({ ramadanPreviewMode: true })}
            className="btn-monolith px-3 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-[11px] font-bold shrink-0"
          >
            Preview Now
          </button>
        </div>
      )}

      {/* 2. Summary Scoreboard Strip */}
      <div className="shrink-0 px-4 pt-3 pb-2 grid grid-cols-4 gap-1.5">
        <div className="p-2 rounded-xl border-[1.5px] border-black dark:border-white bg-black text-white dark:bg-white dark:text-black text-center">
          <div className="text-sm font-bold tabular-nums leading-none">
            {summary.fastsKept}/30
          </div>
          <div className="text-[9.5px] font-semibold opacity-80 mt-1">Fasts</div>
        </div>
        <div className="p-2 rounded-xl border-[1.5px] border-black dark:border-white bg-white dark:bg-black text-center">
          <div className="text-sm font-bold tabular-nums leading-none">
            {summary.juzCompleted}/30
          </div>
          <div className="text-[9.5px] font-semibold text-black/70 dark:text-white/75 mt-1">
            Ajza
          </div>
        </div>
        <div className="p-2 rounded-xl border-[1.5px] border-black dark:border-white bg-white dark:bg-black text-center">
          <div className="text-sm font-bold tabular-nums leading-none">
            {summary.taraweehNights}
          </div>
          <div className="text-[9.5px] font-semibold text-black/70 dark:text-white/75 mt-1">
            Taraweeh
          </div>
        </div>
        <div className="p-2 rounded-xl border-[1.5px] border-black dark:border-white bg-white dark:bg-black text-center">
          <div className="text-sm font-bold tabular-nums leading-none">
            {summary.qadaPending}
          </div>
          <div className="text-[9.5px] font-semibold text-black/70 dark:text-white/75 mt-1">
            Qada Due
          </div>
        </div>
      </div>

      {/* 3. Sub-Tab Bar */}
      <div className="shrink-0 px-4 py-2 border-b border-black/15 dark:border-white/15 grid grid-cols-4 gap-1.5">
        {(
          [
            { id: 'ledger', label: 'Daily Fast' },
            { id: 'juz', label: '30 Juz' },
            { id: 'ashras', label: '3 Ashras' },
            { id: 'qadr', label: 'Odd Nights' },
          ] as const
        ).map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 rounded-xl text-[11px] font-bold border-[1.5px] transition-all active:scale-95 ${
                active
                  ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                  : 'bg-white text-black border-black/35 dark:bg-black dark:text-white dark:border-white/35 hover:border-black dark:hover:border-white'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 4. Tab Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* TAB 1: DAILY FAST, SAHUR/IFTAR CLOCK, 30-DAY LEDGER & REVELATION MILESTONE */}
        {activeTab === 'ledger' && (
          <>
            {/* Sahoor & Iftar Fasting Progress Card */}
            <div className="p-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black border-[1.5px] border-black dark:border-white shadow-[0_6px_18px_rgba(0,0,0,0.18)] dark:shadow-[0_6px_18px_rgba(255,255,255,0.14)] space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] opacity-80">
                  {fastingWindow.isDaytimeFasting ? (
                    <Clock className="w-3.5 h-3.5" />
                  ) : (
                    <Moon className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {fastingWindow.isDaytimeFasting
                      ? 'Fasting Window Active'
                      : 'Night Worship Window'}
                  </span>
                </span>
                <span className="text-xs font-bold tabular-nums">
                  {fastingWindow.percent}%
                </span>
              </div>

              <div className="flex items-baseline justify-between gap-2">
                <h2 className="text-lg font-bold tracking-tight tabular-nums">
                  {fastingWindow.isDaytimeFasting
                    ? `Iftar in ${fastingWindow.remainingLabel}`
                    : `Sahoor ends in ${fastingWindow.remainingLabel}`}
                </h2>
              </div>

              <div className="w-full h-2 rounded-full bg-white/20 dark:bg-black/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-white dark:bg-black transition-all duration-500"
                  style={{ width: `${fastingWindow.percent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-semibold opacity-85 tabular-nums">
                <span>Sahoor Ends (Fajr): {fastingWindow.sahoorTime}</span>
                <span>Iftar (Maghrib): {fastingWindow.iftarTime}</span>
              </div>
            </div>

            {/* Active Day Ramadan Controls */}
            <div className="p-4 rounded-2xl border-[1.5px] border-black dark:border-white bg-white dark:bg-black space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  Ramadan Day {activeDay} Worship Log
                </h3>
                {ramadanStatus.isPreviewMode && !ramadanStatus.isActualRamadan && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handlePreviewDayChange(Math.max(1, activeDay - 1))}
                      className="px-2 py-0.5 rounded-md border border-black/40 dark:border-white/40 text-[10px] font-bold"
                    >
                      −
                    </button>
                    <button
                      onClick={() => handlePreviewDayChange(Math.min(30, activeDay + 1))}
                      className="px-2 py-0.5 rounded-md border border-black/40 dark:border-white/40 text-[10px] font-bold"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  disabled={isCountingLocked}
                  onClick={() =>
                    setLedger(
                      cycleRamadanFastStatus(ledger, activeDay, ramadanStatus.isPreviewMode)
                    )
                  }
                  className={`btn-monolith min-h-[58px] p-2.5 rounded-xl border-[1.5px] text-center flex flex-col items-center justify-center gap-1 disabled:opacity-40 active:translate-y-[1px] ${
                    activeEntry.fastStatus === 'kept'
                      ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                      : 'bg-white text-black border-black dark:bg-black dark:text-white dark:border-white'
                  }`}
                >
                  <span className="text-[11px] font-bold">
                    {activeEntry.fastStatus === 'kept'
                      ? 'Fast Kept ✓'
                      : activeEntry.fastStatus === 'qada_exempt'
                      ? 'Exempt (Qada)'
                      : 'Mark Fast'}
                  </span>
                  <span className="text-[9.5px] opacity-75">Tap to cycle</span>
                </button>

                <button
                  disabled={isCountingLocked}
                  onClick={() =>
                    setLedger(
                      cycleRamadanTaraweeh(ledger, activeDay, ramadanStatus.isPreviewMode)
                    )
                  }
                  className={`btn-monolith min-h-[58px] p-2.5 rounded-xl border-[1.5px] text-center flex flex-col items-center justify-center gap-1 disabled:opacity-40 active:translate-y-[1px] ${
                    activeEntry.taraweehRakats > 0
                      ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                      : 'bg-white text-black border-black dark:bg-black dark:text-white dark:border-white'
                  }`}
                >
                  <span className="text-[11px] font-bold tabular-nums">
                    {activeEntry.taraweehRakats > 0
                      ? `${activeEntry.taraweehRakats} Rak‘ahs ✓`
                      : 'Taraweeh'}
                  </span>
                  <span className="text-[9.5px] opacity-75">0 → 8 → 20</span>
                </button>

                <button
                  disabled={isCountingLocked}
                  onClick={() =>
                    setLedger(
                      toggleRamadanSadaqah(ledger, activeDay, ramadanStatus.isPreviewMode)
                    )
                  }
                  className={`btn-monolith min-h-[58px] p-2.5 rounded-xl border-[1.5px] text-center flex flex-col items-center justify-center gap-1 disabled:opacity-40 active:translate-y-[1px] ${
                    activeEntry.sadaqah
                      ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                      : 'bg-white text-black border-black dark:bg-black dark:text-white dark:border-white'
                  }`}
                >
                  <span className="text-[11px] font-bold">
                    {activeEntry.sadaqah ? 'Sadaqah ✓' : 'Sadaqah'}
                  </span>
                  <span className="text-[9.5px] opacity-75">Daily Charity</span>
                </button>
              </div>
            </div>

            {/* Date-Synced Ramadan Revelation & Historical Milestone */}
            <div className="p-4 rounded-2xl border-[1.5px] border-black dark:border-white bg-white dark:bg-black shadow-[0_2px_0_0_#000000] dark:shadow-[0_2px_0_0_#ffffff] space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-black/65 dark:text-white/70">
                  Day {dayMilestone.day} Ramadan Milestone
                </span>
                <span className="text-[10px] font-semibold text-black/75 dark:text-white/75 truncate">
                  {dayMilestone.reference}
                </span>
              </div>
              <h3 className="text-sm font-bold leading-snug">{dayMilestone.title}</h3>
              <p className="text-xs font-medium text-black/80 dark:text-white/80 leading-relaxed">
                {dayMilestone.fact}
              </p>
              {dayMilestone.surahNumber && dayMilestone.ayahNumber && (
                <button
                  onClick={() =>
                    onOpenAyahInReader(dayMilestone.surahNumber!, dayMilestone.ayahNumber!)
                  }
                  className="btn-monolith px-3 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-[11px] font-bold inline-flex items-center gap-1.5 active:scale-95"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Open Referenced Verse</span>
                </button>
              )}
            </div>

            {/* 30-Day Ramadan Fasting Grid */}
            <div className="p-4 rounded-2xl border-[1.5px] border-black dark:border-white bg-white dark:bg-black space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  30-Day Ramadan Fast & Qada Grid
                </h3>
                <span className="text-[10.5px] font-semibold tabular-nums">
                  {summary.fastsKept} Kept · {summary.qadaPending} Qada
                </span>
              </div>

              <div className="grid grid-cols-6 gap-1.5">
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                  const rec = getRamadanDayEntry(ledger, day);
                  const isKept = rec.fastStatus === 'kept';
                  const isQada = rec.fastStatus === 'qada_exempt';
                  const isCurrent = day === activeDay;
                  return (
                    <button
                      key={day}
                      disabled={isCountingLocked}
                      onClick={() =>
                        setLedger(
                          cycleRamadanFastStatus(ledger, day, ramadanStatus.isPreviewMode)
                        )
                      }
                      className={`min-h-[44px] rounded-xl border-[1.5px] flex flex-col items-center justify-center text-xs font-bold tabular-nums transition-all active:scale-90 disabled:opacity-40 ${
                        isKept
                          ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                          : isQada
                          ? 'bg-white text-black border-dashed border-2 border-black dark:bg-black dark:text-white dark:border-white'
                          : isCurrent
                          ? 'bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white'
                          : 'bg-white text-black border-black/35 dark:bg-black dark:text-white dark:border-white/35 hover:border-black dark:hover:border-white'
                      }`}
                      title={`Ramadan Day ${day}: ${rec.fastStatus}`}
                    >
                      <span>{day}</span>
                      <span className="text-[8px] leading-none mt-0.5">
                        {isKept ? '✓' : isQada ? 'Q' : rec.taraweehRakats > 0 ? '·' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] font-medium text-black/65 dark:text-white/70">
                Tap any day to cycle: Unmarked → Fast Kept (✓) → Exempt / Qada Due (Q).
              </p>
            </div>
          </>
        )}

        {/* TAB 2: 30-NIGHT JUZ-BY-JUZ KHATMAH GRID */}
        {activeTab === 'juz' && (
          <div className="space-y-3">
            <div className="p-4 rounded-2xl border-[1.5px] border-black dark:border-white bg-black text-white dark:bg-white dark:text-black space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] opacity-80">
                  Ramadan Khatmah Ledger
                </span>
                <span className="text-sm font-bold tabular-nums">
                  {summary.juzCompleted} / 30 Ajza
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/20 dark:bg-black/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-white dark:bg-black transition-all duration-300"
                  style={{ width: `${Math.round((summary.juzCompleted / 30) * 100)}%` }}
                />
              </div>
              <p className="text-[11px] font-medium opacity-85 tabular-nums">
                {summary.juzCompleted >= 30
                  ? 'Alhamdulillah! Complete 30-Juz Ramadan Khatmah achieved.'
                  : `${30 - summary.juzCompleted} Ajza remaining · ${Math.max(
                      1,
                      Math.ceil((30 - summary.juzCompleted) / Math.max(1, 30 - activeDay + 1))
                    )} Juz/day pace for Eid completion.`}
              </p>
            </div>

            <div className="p-4 rounded-2xl border-[1.5px] border-black dark:border-white bg-white dark:bg-black">
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 30 }, (_, idx) => idx + 1).map((juz) => {
                  const done = ledger.completedJuz.includes(juz);
                  return (
                    <button
                      key={juz}
                      disabled={isCountingLocked}
                      onClick={() =>
                        setLedger(
                          toggleRamadanJuz(ledger, juz, ramadanStatus.isPreviewMode)
                        )
                      }
                      className={`btn-monolith min-h-[54px] rounded-xl border-[1.5px] flex flex-col items-center justify-center tabular-nums transition-all active:scale-90 disabled:opacity-40 ${
                        done
                          ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-[0_2px_0_0_rgba(0,0,0,0.4)]'
                          : 'bg-white text-black border-black/55 dark:bg-black dark:text-white dark:border-white/55 hover:border-black dark:hover:border-white'
                      }`}
                    >
                      <span className="text-[9px] font-semibold opacity-75">Juz</span>
                      <span className="text-sm font-bold leading-none mt-0.5">
                        {juz}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: THREE ASHRAS (MERCY · FORGIVENESS · REFUGE) */}
        {activeTab === 'ashras' && (
          <div className="space-y-3">
            {RAMADAN_ASHRAS.map((ashra) => {
              const isCurrent = ramadanStatus.ashra === ashra.ashraNumber;
              const count = ledger.ashraDhikrCounts[ashra.ashraNumber] || 0;
              return (
                <div
                  key={ashra.ashraNumber}
                  className={`p-4 rounded-2xl border-[1.5px] space-y-3 transition-all ${
                    isCurrent
                      ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-[0_6px_18px_rgba(0,0,0,0.18)]'
                      : 'bg-white text-black border-black/55 dark:bg-black dark:text-white dark:border-white/55'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] opacity-75">
                        {ashra.dayRange} {isCurrent ? '· ACTIVE ASHRA' : ''}
                      </span>
                      <h3 className="text-sm font-bold mt-0.5">{ashra.title}</h3>
                      <p className="text-[11px] opacity-80">{ashra.subtitle}</p>
                    </div>
                    <Sparkles className="w-4 h-4 shrink-0" />
                  </div>

                  <p
                    dir="rtl"
                    className="font-scheherazade text-right text-2xl font-bold leading-loose"
                  >
                    {ashra.arabicDua}
                  </p>
                  <p className="text-[11px] font-mono opacity-85 italic">
                    {ashra.transliteration}
                  </p>
                  <p className="text-xs font-medium opacity-90">
                    “{ashra.englishMeaning}” — <span className="opacity-75">{ashra.reference}</span>
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      disabled={isCountingLocked}
                      onClick={() =>
                        setLedger(
                          incrementRamadanAshraDhikr(
                            ledger,
                            ashra.ashraNumber,
                            ramadanStatus.isPreviewMode,
                            1
                          )
                        )
                      }
                      className={`btn-monolith flex-1 min-h-[44px] px-4 rounded-xl border-[1.5px] text-xs font-bold flex items-center justify-between disabled:opacity-40 active:scale-[0.98] ${
                        isCurrent
                          ? 'bg-white text-black border-white dark:bg-black dark:text-white dark:border-black'
                          : 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                      }`}
                    >
                      <span>Count Ramadan Ashra Dua</span>
                      <span className="font-mono text-sm font-bold tabular-nums">
                        {count}
                      </span>
                    </button>
                    {count > 0 && !isCountingLocked && (
                      <button
                        onClick={() =>
                          setLedger(
                            incrementRamadanAshraDhikr(
                              ledger,
                              ashra.ashraNumber,
                              ramadanStatus.isPreviewMode,
                              -count
                            )
                          )
                        }
                        className="w-11 h-11 rounded-xl border border-current opacity-75 hover:opacity-100 flex items-center justify-center"
                        title="Reset counter"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 4: LAST 10 ODD-NIGHTS (LAYLATUL QADR SANCTUARY) */}
        {activeTab === 'qadr' && (
          <div className="space-y-3">
            {/* 5 Odd Nights Switcher */}
            <div className="grid grid-cols-5 gap-1.5">
              {ODD_NIGHTS.map((night) => {
                const isSelected = selectedOddNight === night;
                const isLiveNight = ramadanStatus.ramadanDay === night;
                return (
                  <button
                    key={night}
                    onClick={() => setSelectedOddNight(night)}
                    className={`min-h-[54px] rounded-xl border-[1.5px] flex flex-col items-center justify-center text-xs font-bold tabular-nums transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-[0_2px_0_0_#000000] dark:shadow-[0_2px_0_0_#ffffff]'
                        : 'bg-white text-black border-black/45 dark:bg-black dark:text-white dark:border-white/45'
                    }`}
                  >
                    <span className="text-[9px] font-semibold opacity-75">
                      {isLiveNight ? '✦ Now' : 'Night'}
                    </span>
                    <span className="text-sm font-bold">{night}</span>
                  </button>
                );
              })}
            </div>

            {/* Sunnah Dua of Laylatul Qadr (Jami at-Tirmidhi 3513) */}
            <div className="p-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black border-[1.5px] border-black dark:border-white space-y-2.5">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.14em] opacity-80">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />
                  <span>Laylatul Qadr Prophetic Dua</span>
                </span>
                <span>Tirmidhi 3513 (Sahih)</span>
              </div>
              <p
                dir="rtl"
                className="font-scheherazade text-right text-2xl font-bold leading-loose"
              >
                اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي
              </p>
              <p className="text-[11px] font-mono opacity-85 italic">
                Allahumma innaka ‘Afuwwun tuhibbul-‘afwa fa‘fu ‘anni
              </p>
              <p className="text-xs opacity-90">
                “O Allah, You are Pardoning and love to pardon, so pardon me.”
              </p>

              <div className="flex items-center gap-2 pt-1">
                <button
                  disabled={isCountingLocked}
                  onClick={() =>
                    setLedger(incrementRamadanQadrDua(ledger, ramadanStatus.isPreviewMode, 1))
                  }
                  className="btn-monolith flex-1 min-h-[46px] px-4 rounded-xl bg-white text-black dark:bg-black dark:text-white font-bold text-xs flex items-center justify-between disabled:opacity-40 active:scale-[0.98]"
                >
                  <span>Tap to Recite ‘Afuwwun Dua</span>
                  <span className="font-mono text-base font-bold tabular-nums">
                    {ledger.qadrDuaCount}
                  </span>
                </button>
                <button
                  onClick={() => onOpenAyahInReader(97, 1)}
                  className="px-3 min-h-[46px] rounded-xl border border-white/50 dark:border-black/50 text-[11px] font-bold flex items-center gap-1"
                  title="Read Surah Al-Qadr"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Al-Qadr</span>
                </button>
              </div>
            </div>

            {/* Odd Night Checklist */}
            <div className="p-4 rounded-2xl border-[1.5px] border-black dark:border-white bg-white dark:bg-black space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  Night {selectedOddNight} Worship Checklist
                </h3>
                <span className="text-[10.5px] font-semibold opacity-75">
                  Counted in Ramadan
                </span>
              </div>

              {(
                [
                  { id: 'qiyam', label: 'Pray Tahajjud / Qiyam al-Layl (At least 2+2 Rak‘ahs)' },
                  { id: 'surahQadr', label: 'Recite Surah Al-Qadr (97) & Reflect on Qur’an' },
                  { id: 'charity', label: 'Give Charity / Sadaqah on This Odd Night' },
                  { id: 'tawbahDua', label: 'Make Sincere Istighfar & Tawbah for Ummah' },
                ] as const
              ).map((item) => {
                const checked = Boolean(oddNightEntry.qadrChecklist?.[item.id]);
                return (
                  <button
                    key={item.id}
                    disabled={isCountingLocked}
                    onClick={() =>
                      setLedger(
                        toggleOddNightChecklistItem(
                          ledger,
                          selectedOddNight,
                          item.id,
                          ramadanStatus.isPreviewMode
                        )
                      )
                    }
                    className={`w-full min-h-[46px] px-3 py-2 rounded-xl border-[1.5px] flex items-center justify-between gap-2 text-left text-xs font-semibold transition-all disabled:opacity-40 ${
                      checked
                        ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                        : 'bg-white text-black border-black/35 dark:bg-black dark:text-white dark:border-white/35'
                    }`}
                  >
                    <span className={checked ? 'line-through opacity-80' : ''}>{item.label}</span>
                    <span
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                        checked
                          ? 'bg-white text-black border-white dark:bg-black dark:text-white dark:border-black'
                          : 'border-black/45 dark:border-white/45'
                      }`}
                    >
                      {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </span>
                  </button>
                );
              })}

              {oddNightMilestone && (
                <p className="text-[11px] font-medium text-black/75 dark:text-white/75 pt-1 leading-relaxed">
                  <strong>Night {selectedOddNight} Note:</strong> {oddNightMilestone.fact} ({oddNightMilestone.reference})
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
