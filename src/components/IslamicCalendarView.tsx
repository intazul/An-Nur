import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sparkles,
} from 'lucide-react';
import {
  IslamicCalendarEvent,
} from '../data/islamicCalendarEvents';
import {
  HijriCalendarDayCell,
  getHijriDateSnapshot,
  getHijriMonthGrid,
} from '../utils/hijriCalendar';

interface IslamicCalendarViewProps {
  onBackToDashboard: () => void;
  onOpenDayDetail: (hijriYear: number, hijriMonth: number, hijriDay: number) => void;
  onOpenRamadanSanctuary?: () => void;
  isRamadanPreviewMode?: boolean;
  onToggleRamadanPreview?: (enabled: boolean) => void;
  initialYear?: number;
  initialMonth?: number;
  onViewMonthChange?: (year: number, month: number) => void;
}

const WEEKDAY_HEADERS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

/**
 * Pure SVG monochrome lunar phase emblem (0 = thin crescent, 0.5 = half, 1 = full moon)
 */
const MonochromeMoonPhase: React.FC<{ illumination: number; size?: number }> = ({
  illumination,
  size = 24,
}) => {
  const clamped = Math.max(0.08, Math.min(1, illumination));
  // Render crisp gallery moon using circle + masking shadow arc
  const offset = (1 - clamped) * 18;
  const maskId = `lunar-mask-${Math.round(clamped * 100)}-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" className="shrink-0" aria-hidden="true">
      <defs>
        <mask id={maskId}>
          <rect x="0" y="0" width="28" height="28" fill="black" />
          <circle cx="14" cy="14" r="10" fill="white" />
          {clamped < 0.96 && (
            <circle cx={14 - offset * 0.72} cy="13.2" r="9.4" fill="black" />
          )}
        </mask>
      </defs>
      <circle
        cx="14"
        cy="14"
        r="10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.28"
      />
      <circle cx="14" cy="14" r="10" fill="currentColor" mask={`url(#${maskId})`} />
    </svg>
  );
};

export const IslamicCalendarView: React.FC<IslamicCalendarViewProps> = ({
  onBackToDashboard,
  onOpenDayDetail,
  onOpenRamadanSanctuary,
  isRamadanPreviewMode = false,
  onToggleRamadanPreview,
  initialYear,
  initialMonth,
  onViewMonthChange,
}) => {
  const todayHijri = useMemo(() => getHijriDateSnapshot(new Date()), []);
  const [viewYear, setViewYear] = useState<number>(initialYear ?? todayHijri.year);
  const [viewMonth, setViewMonth] = useState<number>(
    initialMonth ?? (isRamadanPreviewMode ? 9 : todayHijri.month)
  );
  const [selectedDay, setSelectedDay] = useState<number>(
    (initialMonth ?? (isRamadanPreviewMode ? 9 : todayHijri.month)) === 9 && isRamadanPreviewMode
      ? 27
      : todayHijri.day
  );

  const monthData = useMemo(
    () => getHijriMonthGrid(viewYear, viewMonth),
    [viewYear, viewMonth]
  );

  const selectedCell: HijriCalendarDayCell | undefined = useMemo(() => {
    return (
      monthData.cells.find((c) => c.hijriDay === selectedDay) || monthData.cells[0]
    );
  }, [monthData.cells, selectedDay]);

  const monthEventsList = useMemo(() => {
    const items: Array<{ day: number; gregorianLabel: string; event: IslamicCalendarEvent }> = [];
    const seenIds = new Set<string>();
    for (const cell of monthData.cells) {
      for (const ev of cell.events) {
        // Keep clean unique month index list (skip weekly repetitive Mon/Thu & Fri unless major fixed event)
        if (ev.id.startsWith('mon-thu-') || ev.id.startsWith('jumuah-') || ev.id.startsWith('ram-daily-')) {
          continue;
        }
        if (!seenIds.has(ev.id)) {
          seenIds.add(ev.id);
          items.push({
            day: cell.hijriDay,
            gregorianLabel: cell.gregorianLabel,
            event: ev,
          });
        }
      }
    }
    return items;
  }, [monthData.cells]);

  const handlePrevMonth = () => {
    const nextYear = viewMonth === 1 ? viewYear - 1 : viewYear;
    const nextMonth = viewMonth === 1 ? 12 : viewMonth - 1;
    setViewYear(nextYear);
    setViewMonth(nextMonth);
    setSelectedDay(1);
    onViewMonthChange?.(nextYear, nextMonth);
  };

  const handleNextMonth = () => {
    const nextYear = viewMonth === 12 ? viewYear + 1 : viewYear;
    const nextMonth = viewMonth === 12 ? 1 : viewMonth + 1;
    setViewYear(nextYear);
    setViewMonth(nextMonth);
    setSelectedDay(1);
    onViewMonthChange?.(nextYear, nextMonth);
  };

  const handleJumpToMonth = (targetMonth: number, targetDay: number = 1) => {
    setViewYear(todayHijri.year);
    setViewMonth(targetMonth);
    setSelectedDay(targetDay);
    onViewMonthChange?.(todayHijri.year, targetMonth);
  };

  const { meta } = monthData;
  const isSpecialMonth = meta.significance !== 'standard';
  const isViewingRamadan = viewMonth === 9;

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
            <h1 className="text-sm font-bold tracking-tight truncate">
              Islamic Calendar
            </h1>
            <p className="text-[11px] font-medium text-black/65 dark:text-white/70 truncate tabular-nums">
              {todayHijri.hijriFormatted}
            </p>
          </div>
        </div>

        <button
          onClick={() => handleJumpToMonth(todayHijri.month, todayHijri.day)}
          className="btn-monolith px-3 py-1.5 rounded-full border-[1.5px] border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black shadow-[0_2px_0_0_#000000] dark:shadow-[0_2px_0_0_#ffffff] active:translate-y-[2px] active:shadow-none text-[11px] font-semibold shrink-0"
        >
          Today
        </button>
      </header>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* 2. Quick Jump Strip to Special Months */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {[
            { m: 9, d: 27, label: 'Ramadan (09)' },
            { m: 12, d: 9, label: 'Dhu al-Hijjah (12)' },
            { m: 1, d: 10, label: 'Muharram (01)' },
            { m: 7, d: 27, label: 'Rajab (07)' },
            { m: 8, d: 15, label: "Sha'ban (08)" },
            { m: 10, d: 1, label: 'Shawwal (10)' },
            { m: 11, d: 1, label: "Dhu al-Qi'dah (11)" },
          ].map((item) => {
            const active = viewMonth === item.m;
            return (
              <button
                key={item.m}
                onClick={() => handleJumpToMonth(item.m, item.d)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border-[1.5px] whitespace-nowrap transition-all active:scale-95 ${
                  active
                    ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                    : 'bg-white text-black border-black/35 dark:bg-black dark:text-white dark:border-white/35 hover:border-black dark:hover:border-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* 3. Month Navigator */}
        <div className="flex items-center justify-between gap-2 p-2 rounded-2xl border-[1.5px] border-black dark:border-white bg-white dark:bg-black shadow-[0_2px_0_0_#000000] dark:shadow-[0_2px_0_0_#ffffff]">
          <button
            onClick={handlePrevMonth}
            className="w-10 h-10 rounded-xl border border-black/25 dark:border-white/25 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black active:scale-90 transition-all"
            aria-label="Previous Hijri Month"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
          </button>

          <div className="text-center min-w-0 px-2">
            <div className="flex items-center justify-center gap-2">
              <span className="text-base font-bold tracking-tight">
                {meta.nameEnglish}
              </span>
              <span dir="rtl" className="font-scheherazade text-lg font-bold leading-none">
                {meta.nameArabic}
              </span>
            </div>
            <p className="text-[11px] font-semibold text-black/65 dark:text-white/70 tabular-nums">
              {viewYear} AH · Month {meta.number}/12 · {monthData.monthLength} Days
            </p>
          </div>

          <button
            onClick={handleNextMonth}
            className="w-10 h-10 rounded-xl border border-black/25 dark:border-white/25 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black active:scale-90 transition-all"
            aria-label="Next Hijri Month"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>

        {/* 4. Special Month Banner (Ramadan / 4 Sacred Months / Blessed Months) */}
        <div
          className={`p-4 rounded-2xl border-[1.5px] space-y-2.5 transition-all ${
            isViewingRamadan
              ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-[0_6px_18px_rgba(0,0,0,0.18)] dark:shadow-[0_6px_18px_rgba(255,255,255,0.15)]'
              : isSpecialMonth
              ? 'bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white shadow-[0_3px_0_0_#000000] dark:shadow-[0_3px_0_0_#ffffff]'
              : 'bg-white text-black border-[1.5px] border-black/40 dark:bg-black dark:text-white dark:border-white/40'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] opacity-80">
                {isViewingRamadan ? (
                  <Moon className="w-3.5 h-3.5 stroke-[2.2]" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 stroke-[2.1]" />
                )}
                <span className="truncate">{meta.badgeLabel}</span>
              </div>
              <h2 className="text-[14px] font-bold mt-1 leading-snug">
                {meta.virtueSummary}
              </h2>
            </div>

            {selectedCell && (
              <div className="flex flex-col items-center shrink-0">
                <MonochromeMoonPhase illumination={selectedCell.lunarIllumination} size={30} />
                <span className="text-[9px] font-semibold mt-1 opacity-75 tabular-nums">
                  Night {selectedCell.hijriDay}
                </span>
              </div>
            )}
          </div>

          <div
            className={`p-2.5 rounded-xl border text-[11px] leading-relaxed ${
              isViewingRamadan
                ? 'border-white/25 dark:border-black/20 bg-white/10 dark:bg-black/10'
                : 'border-black/15 dark:border-white/20 bg-black/[0.03] dark:bg-white/[0.04]'
            }`}
          >
            <span className="font-bold block text-[10px] uppercase tracking-wider opacity-75 mb-0.5">
              {meta.referenceSource}
            </span>
            <p className="font-medium italic">{meta.referenceText}</p>
          </div>

          {/* Ramadan Sanctuary / Preview CTA when browsing Ramadan */}
          {isViewingRamadan && (
            <div className="flex items-center gap-2 pt-0.5">
              {onOpenRamadanSanctuary && (
                <button
                  onClick={onOpenRamadanSanctuary}
                  className="btn-monolith flex-1 min-h-[40px] px-3 rounded-xl bg-white text-black dark:bg-black dark:text-white border border-white dark:border-black text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Open Ramadan Sanctuary</span>
                </button>
              )}
              {onToggleRamadanPreview && todayHijri.month !== 9 && (
                <button
                  onClick={() => onToggleRamadanPreview(!isRamadanPreviewMode)}
                  className="px-3 min-h-[40px] rounded-xl border border-white/50 dark:border-black/50 text-[11px] font-semibold active:scale-95"
                >
                  {isRamadanPreviewMode ? 'Preview: ON' : 'Preview Mode'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* 5. Calendar Month Grid */}
        <div className="p-3 rounded-2xl border-[1.5px] border-black dark:border-white bg-white dark:bg-black space-y-2">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 text-center pb-1 border-b border-black/15 dark:border-white/15">
            {WEEKDAY_HEADERS.map((wd, idx) => (
              <span
                key={wd}
                className={`text-[10.5px] font-bold uppercase tracking-wider ${
                  idx === 5
                    ? 'text-black dark:text-white underline underline-offset-4'
                    : 'text-black/60 dark:text-white/60'
                }`}
              >
                {wd}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: monthData.leadingBlanks }).map((_, idx) => (
              <div key={`blank-${idx}`} className="min-h-[54px]" />
            ))}

            {monthData.cells.map((cell) => {
              const isSelected = cell.hijriDay === selectedCell?.hijriDay;
              const hasFixedEvent = cell.events.some(
                (e) => !e.id.startsWith('mon-thu-') && !e.id.startsWith('jumuah-')
              );
              const isSpecialHighlighted =
                cell.isRamadan ||
                cell.isEidDay ||
                cell.isArafahOrAshura ||
                cell.isWhiteDay ||
                hasFixedEvent;

              return (
                <button
                  key={cell.hijriDay}
                  onClick={() => {
                    setSelectedDay(cell.hijriDay);
                    if (cell.events.length > 0) {
                      onViewMonthChange?.(cell.hijriYear, cell.hijriMonth);
                      onOpenDayDetail(cell.hijriYear, cell.hijriMonth, cell.hijriDay);
                    }
                  }}
                  className={`relative min-h-[56px] p-1 rounded-xl border transition-all flex flex-col items-center justify-between text-center active:scale-95 ${
                    isSelected
                      ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-[0_2px_0_0_rgba(0,0,0,0.4)] dark:shadow-[0_2px_0_0_rgba(255,255,255,0.4)]'
                      : cell.isOddLastTenRamadan || cell.isEidDay || cell.isArafahOrAshura
                      ? 'bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white'
                      : cell.isToday
                      ? 'bg-white text-black border-2 border-black ring-2 ring-black/25 dark:bg-black dark:text-white dark:border-white dark:ring-white/30'
                      : cell.isRamadan || cell.isSacredMonth
                      ? 'bg-black/[0.03] dark:bg-white/[0.04] text-black dark:text-white border-black/45 dark:border-white/45 hover:border-black dark:hover:border-white'
                      : 'bg-white dark:bg-black text-black dark:text-white border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white'
                  }`}
                  title={
                    cell.events.length > 0
                      ? `${cell.hijriDay} ${meta.nameEnglish} · Open Details (${cell.events.length} marked)`
                      : `${cell.hijriDay} ${meta.nameEnglish} (${cell.gregorianLabel})`
                  }
                >
                  {/* Top Ornament Row: Crescent / Odd-Night / Star / Event dot */}
                  <div className="w-full flex items-center justify-between px-0.5 h-3">
                    <span className="text-[7.5px] font-bold leading-none opacity-75">
                      {cell.isToday ? '●' : cell.isWhiteDay ? '○' : ''}
                    </span>
                    <span className="text-[8px] font-bold leading-none">
                      {cell.isOddLastTenRamadan
                        ? '✦'
                        : cell.isEidDay || cell.isArafahOrAshura
                        ? '★'
                        : cell.isRamadan
                        ? '☽'
                        : hasFixedEvent
                        ? '◆'
                        : cell.isFriday
                        ? '◈'
                        : ''}
                    </span>
                  </div>

                  {/* Hijri Numeral */}
                  <span
                    className={`text-[13.5px] font-bold leading-none tabular-nums ${
                      isSpecialHighlighted && !isSelected ? 'underline decoration-1 underline-offset-2' : ''
                    }`}
                  >
                    {cell.hijriDay}
                  </span>

                  {/* Gregorian Sub-date */}
                  <span
                    className={`text-[8px] font-semibold leading-none tabular-nums ${
                      isSelected ? 'opacity-80' : 'text-black/55 dark:text-white/55'
                    }`}
                  >
                    {cell.gregorianLabel.split(' ')[1]} {cell.gregorianLabel.split(' ')[0].slice(0, 3)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Monochrome Symbol Legend */}
          <div className="pt-2 border-t border-black/15 dark:border-white/15 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[9.5px] font-semibold text-black/70 dark:text-white/75">
            <span>☽ Ramadan</span>
            <span>✦ Odd Night</span>
            <span>★ Eid / ‘Arafah</span>
            <span>◆ Islamic Event</span>
            <span>○ White Day (13–15)</span>
            <span>◈ Jumu‘ah</span>
          </div>
        </div>

        {/* 6. Highlighted Events Index for Selected Month (Tapping any opens Day Detail Tab) */}
        {monthEventsList.length > 0 && (
          <div className="space-y-2 pb-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-black/70 dark:text-white/75 px-0.5">
              Marked Islamic Events in {meta.nameEnglish}
            </h3>
            <div className="space-y-2">
              {monthEventsList.map(({ day, gregorianLabel, event }) => {
                const isActive = day === selectedCell?.hijriDay;
                return (
                  <button
                    key={event.id}
                    onClick={() => {
                      setSelectedDay(day);
                      onViewMonthChange?.(viewYear, viewMonth);
                      onOpenDayDetail(viewYear, viewMonth, day);
                    }}
                    className={`btn-monolith w-full p-3 rounded-2xl border-[1.5px] text-left flex items-center justify-between gap-3 active:translate-y-[1px] ${
                      isActive
                        ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                        : 'bg-white text-black border-black/55 dark:bg-black dark:text-white dark:border-white/55 hover:border-black dark:hover:border-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-xl border flex flex-col items-center justify-center shrink-0 tabular-nums ${
                          isActive
                            ? 'bg-white text-black border-white dark:bg-black dark:text-white dark:border-black'
                            : 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                        }`}
                      >
                        <span className="text-xs font-bold leading-none">{day}</span>
                        <span className="text-[8px] font-semibold opacity-80 leading-none mt-0.5">
                          {gregorianLabel.split(' ')[0]}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold truncate">{event.title}</h4>
                        <p className="text-[10.5px] font-medium opacity-80 truncate">
                          {event.quranRef ? `${event.quranRef.label} · ` : ''}
                          {event.hadithRef.source}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
