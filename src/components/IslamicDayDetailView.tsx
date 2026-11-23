import React, { useMemo } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  History,
  Moon,
  ScrollText,
} from 'lucide-react';
import { getHijriMonthGrid } from '../utils/hijriCalendar';

interface IslamicDayDetailViewProps {
  hijriYear: number;
  hijriMonth: number;
  hijriDay: number;
  onBackToCalendar: () => void;
  onSelectDay: (year: number, month: number, day: number) => void;
  onOpenAyahInReader: (surahNumber: number, ayahNumber: number) => void;
  onOpenRamadanSanctuary?: () => void;
}

const MonochromeMoonPhase: React.FC<{ illumination: number; size?: number }> = ({
  illumination,
  size = 34,
}) => {
  const clamped = Math.max(0.08, Math.min(1, illumination));
  const offset = (1 - clamped) * 18;
  const maskId = `day-detail-lunar-mask-${Math.round(clamped * 100)}-${size}`;
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

export const IslamicDayDetailView: React.FC<IslamicDayDetailViewProps> = ({
  hijriYear,
  hijriMonth,
  hijriDay,
  onBackToCalendar,
  onSelectDay,
  onOpenAyahInReader,
  onOpenRamadanSanctuary,
}) => {
  const monthData = useMemo(
    () => getHijriMonthGrid(hijriYear, hijriMonth),
    [hijriYear, hijriMonth]
  );

  const cell = useMemo(
    () => monthData.cells.find((c) => c.hijriDay === hijriDay) || monthData.cells[0],
    [monthData.cells, hijriDay]
  );

  const importantDays = useMemo(
    () => monthData.cells.filter((c) => c.events.length > 0).map((c) => c.hijriDay),
    [monthData.cells]
  );

  const currentIdx = importantDays.indexOf(cell?.hijriDay ?? hijriDay);
  const prevImportantDay = currentIdx > 0 ? importantDays[currentIdx - 1] : null;
  const nextImportantDay =
    currentIdx >= 0 && currentIdx < importantDays.length - 1
      ? importantDays[currentIdx + 1]
      : null;

  const { meta } = monthData;

  if (!cell) {
    return null;
  }

  const dayMetaTags: string[] = [];
  if (cell.isToday) dayMetaTags.push('Today');
  if (cell.isRamadan) dayMetaTags.push(`Ramadan Day ${cell.hijriDay}`);
  if (cell.isOddLastTenRamadan) dayMetaTags.push('Odd Night (Laylatul Qadr Search)');
  if (cell.isSacredMonth) dayMetaTags.push('Sacred Month');
  if (cell.isWhiteDay) dayMetaTags.push('White Day (13–15)');
  if (cell.isFriday) dayMetaTags.push('Jumu‘ah');

  return (
    <div className="flex-1 h-full flex flex-col bg-white text-black dark:bg-black dark:text-white overflow-hidden select-none">
      {/* Sticky Monochrome Top Header */}
      <header className="shrink-0 px-4 py-3 border-b-[1.5px] border-black/15 dark:border-white/20 flex items-center justify-between gap-2 bg-white dark:bg-black">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={onBackToCalendar}
            className="btn-monolith w-10 h-10 rounded-full border-[1.5px] border-black dark:border-white bg-white dark:bg-black text-black dark:text-white flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black active:scale-90 shrink-0"
            title="Back to Calendar"
            aria-label="Back to Calendar"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
          </button>
          <div className="min-w-0">
            <h1 className="text-sm font-bold tracking-tight truncate tabular-nums">
              {cell.hijriDay} {meta.nameEnglish} {cell.hijriYear} AH
            </h1>
            <p className="text-[11px] font-medium text-black/65 dark:text-white/70 truncate">
              {cell.gregorianDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Step between marked days inside the same month */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            disabled={prevImportantDay === null}
            onClick={() =>
              prevImportantDay !== null && onSelectDay(hijriYear, hijriMonth, prevImportantDay)
            }
            className="w-10 h-10 rounded-xl border border-black/30 dark:border-white/30 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black disabled:opacity-25 disabled:pointer-events-none active:scale-90 transition-all"
            title="Previous Important Day"
            aria-label="Previous Important Day"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
          </button>
          <button
            disabled={nextImportantDay === null}
            onClick={() =>
              nextImportantDay !== null && onSelectDay(hijriYear, hijriMonth, nextImportantDay)
            }
            className="w-10 h-10 rounded-xl border border-black/30 dark:border-white/30 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black disabled:opacity-25 disabled:pointer-events-none active:scale-90 transition-all"
            title="Next Important Day"
            aria-label="Next Important Day"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>
      </header>

      {/* Scrollable Full-Detail Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
        {/* Date & Lunar Summary Banner */}
        <section className="p-4 rounded-2xl border-[1.5px] border-black dark:border-white bg-black text-white dark:bg-white dark:text-black space-y-2.5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[10.5px] font-semibold opacity-80">
                <CalendarIcon className="w-3.5 h-3.5 shrink-0" />
                <span className="tabular-nums">
                  {cell.events.length} {cell.events.length === 1 ? 'Marked Record' : 'Marked Records'}
                </span>
              </div>
              <div className="flex items-baseline gap-2.5 mt-1 flex-wrap">
                <h2 className="text-lg font-bold tracking-tight tabular-nums">
                  {cell.hijriDay} {meta.nameEnglish}
                </h2>
                <span dir="rtl" className="font-scheherazade text-xl font-bold leading-none opacity-90">
                  {meta.nameArabic}
                </span>
              </div>
              {dayMetaTags.length > 0 && (
                <p className="text-[11px] font-medium opacity-80 mt-1 leading-snug">
                  {dayMetaTags.join(' · ')}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center shrink-0">
              <MonochromeMoonPhase illumination={cell.lunarIllumination} size={36} />
              <span className="text-[10px] font-semibold mt-1 opacity-80 tabular-nums">
                {Math.round(cell.lunarIllumination * 100)}% Moon
              </span>
            </div>
          </div>

          {hijriMonth === 9 && onOpenRamadanSanctuary && (
            <button
              onClick={onOpenRamadanSanctuary}
              className="btn-monolith w-full min-h-[44px] px-3 rounded-xl bg-white text-black dark:bg-black dark:text-white border border-white dark:border-black text-xs font-bold flex items-center justify-center gap-1.5 active:scale-[0.98]"
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Open Ramadan Sanctuary</span>
            </button>
          )}
        </section>

        {/* Every Event / Day Entry With Historical Details, Qur'an Verses & Hadith Actions */}
        {cell.events.map((ev, evIndex) => (
          <article
            key={ev.id}
            className="p-4 rounded-2xl border-[1.5px] border-black dark:border-white bg-white dark:bg-black shadow-[0_3px_0_0_#000000] dark:shadow-[0_3px_0_0_#ffffff] space-y-5"
          >
            {/* Event Title Header (Clean typographic hierarchy, zero pill sandwiches) */}
            <div className="pb-3 border-b border-black/15 dark:border-white/15 space-y-1.5">
              <p className="text-[11px] font-semibold text-black/60 dark:text-white/65 capitalize">
                {cell.events.length > 1 ? `${evIndex + 1}. ` : ''}
                {ev.category} · {cell.hijriDay} {meta.nameEnglish}
              </p>
              <h3 className="text-[16px] font-bold leading-snug text-balance">
                {ev.title}
              </h3>
              <p className="text-[12.5px] font-medium leading-relaxed text-black/80 dark:text-white/80">
                {ev.summary}
              </p>
            </div>

            {/* 1. What Happened — Full Historical & Scriptural Account */}
            {ev.historicalDetails && ev.historicalDetails.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold tracking-tight">
                  <History className="w-4 h-4 shrink-0 stroke-[2.2]" />
                  <h4>What Happened</h4>
                </div>
                <div className="space-y-2.5">
                  {ev.historicalDetails.map((para, pIdx) => (
                    <div
                      key={pIdx}
                      className="flex items-start gap-2.5 text-[12.5px] font-medium leading-relaxed text-black/85 dark:text-white/85"
                    >
                      <span className="text-[11px] font-bold tabular-nums text-black/50 dark:text-white/50 mt-0.5 shrink-0">
                        {String(pIdx + 1).padStart(2, '0')}.
                      </span>
                      <p className="select-text">{para}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Qur'an Verses Related to This Day */}
            {ev.quranVerses && ev.quranVerses.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-black/15 dark:border-white/15">
                <div className="flex items-center gap-2 text-xs font-bold tracking-tight">
                  <BookOpen className="w-4 h-4 shrink-0 stroke-[2.2]" />
                  <h4>Qur’an Verses</h4>
                </div>
                <div className="space-y-3">
                  {ev.quranVerses.map((v, vIdx) => (
                    <div
                      key={`${v.surahNumber}-${v.ayahNumber}-${vIdx}`}
                      className="p-3.5 rounded-xl border-[1.5px] border-black/25 dark:border-white/25 bg-black/[0.025] dark:bg-white/[0.035] space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold tracking-tight">
                          {v.label}
                        </span>
                        <button
                          onClick={() => onOpenAyahInReader(v.surahNumber, v.ayahNumber)}
                          className="btn-monolith min-h-[40px] px-3 py-1.5 rounded-xl bg-black text-white dark:bg-white dark:text-black text-[11px] font-bold inline-flex items-center gap-1.5 active:scale-95 shrink-0 whitespace-nowrap"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Open in Qur’an</span>
                        </button>
                      </div>

                      {v.arabic && (
                        <p
                          dir="rtl"
                          className="font-scheherazade text-right text-xl sm:text-2xl font-bold leading-loose text-black dark:text-white select-text"
                        >
                          {v.arabic}
                        </p>
                      )}

                      <p className="text-[12.5px] font-medium leading-relaxed text-black/90 dark:text-white/90 select-text">
                        “{v.english}”
                      </p>

                      {v.revelationContext && (
                        <p className="text-[11px] font-medium leading-relaxed text-black/65 dark:text-white/70 pt-1 border-t border-black/10 dark:border-white/10">
                          {v.revelationContext}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. What to Do According to Sahih Hadiths (Strictly Prophetic Hadiths Only) */}
            {ev.hadithActions && ev.hadithActions.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-black/15 dark:border-white/15">
                <div className="flex items-center gap-2 text-xs font-bold tracking-tight">
                  <ScrollText className="w-4 h-4 shrink-0 stroke-[2.2]" />
                  <h4>What to Do According to Sahih Hadiths</h4>
                </div>
                <div className="space-y-3">
                  {ev.hadithActions.map((act, aIdx) => (
                    <div
                      key={aIdx}
                      className="p-3.5 rounded-xl border-[1.5px] border-black/30 dark:border-white/30 bg-white dark:bg-black space-y-2"
                    >
                      <div className="space-y-0.5">
                        <h5 className="text-[13px] font-bold leading-snug text-black dark:text-white">
                          {act.practiceTitle}
                        </h5>
                        <p className="text-[11px] font-semibold text-black/65 dark:text-white/70">
                          {act.hadithSource} · {act.narrator}
                        </p>
                      </div>
                      <p className="text-[12.5px] font-medium italic leading-relaxed text-black/90 dark:text-white/90 select-text">
                        {act.hadithText}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}

        {/* Bottom Back to Calendar Button for thumb reach */}
        <div className="pb-4">
          <button
            onClick={onBackToCalendar}
            className="btn-monolith w-full min-h-[46px] px-4 rounded-2xl border-[1.5px] border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-xs font-bold flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {meta.nameEnglish} Calendar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
