import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  ListChecks,
  Moon,
  ScrollText,
  Shield,
  Sparkles,
  Sun,
  Sunrise,
  Sunset,
  Utensils,
  X,
} from 'lucide-react';
import {
  PropheticDayStage,
  ResolvedPropheticStage,
  resolvePropheticTimelineWindows,
} from '../data/propheticDayTimeline';
import { PrayerStatus } from '../utils/prayerTimes';

interface SunnahDayTimelineViewProps {
  prayerStatus: PrayerStatus;
  onBackToDashboard: () => void;
  onOpenAyahInReader: (surahNumber: number, ayahNumber: number) => void;
}

const StageGlyph: React.FC<{ iconKey: PropheticDayStage['iconKey']; className?: string }> = ({
  iconKey,
  className = 'w-3.5 h-3.5',
}) => {
  switch (iconKey) {
    case 'moon_stars':
      return <Sparkles className={className} />;
    case 'sunrise_prayer':
      return <Sunrise className={className} />;
    case 'sun_horizon':
      return <Sun className={className} />;
    case 'sun_beam':
      return <Sun className={className} />;
    case 'briefcase_heart':
      return <Briefcase className={className} />;
    case 'sun_zenith':
      return <Sun className={className} />;
    case 'afternoon_clock':
      return <Clock className={className} />;
    case 'sunset_shield':
      return <Sunset className={className} />;
    case 'utensils_family':
      return <Utensils className={className} />;
    case 'night_prayer':
      return <Moon className={className} />;
    case 'quran_fortress':
      return <Shield className={className} />;
    case 'sleep_peace':
      return <Moon className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

export const SunnahDayTimelineView: React.FC<SunnahDayTimelineViewProps> = ({
  prayerStatus,
  onBackToDashboard,
  onOpenAyahInReader,
}) => {
  const [nowTick, setNowTick] = useState<Date>(() => new Date());
  const [selectedStageId, setSelectedStageId] = useState<string | null>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Refresh live clock highlight every 30 seconds
  useEffect(() => {
    const id = window.setInterval(() => setNowTick(new Date()), 30000);
    return () => window.clearInterval(id);
  }, []);

  const { stages, activeStageId } = useMemo(
    () => resolvePropheticTimelineWindows(prayerStatus, nowTick),
    [prayerStatus, nowTick]
  );

  const activeStage = useMemo(
    () => stages.find((s) => s.id === activeStageId) || stages[0],
    [stages, activeStageId]
  );

  const selectedStage: ResolvedPropheticStage | null = useMemo(() => {
    if (!selectedStageId) return null;
    return stages.find((s) => s.id === selectedStageId) || null;
  }, [stages, selectedStageId]);

  // Gently scroll active time block into view on mount
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const el = nodeRefs.current[activeStageId];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 180);
    return () => window.clearTimeout(timer);
  }, []);

  const handleScrollToNow = () => {
    const el = nodeRefs.current[activeStageId];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleStepModalStage = (dir: -1 | 1) => {
    if (!selectedStage) return;
    const idx = stages.findIndex((s) => s.id === selectedStage.id);
    if (idx === -1) return;
    const nextIdx = (idx + dir + stages.length) % stages.length;
    setSelectedStageId(stages[nextIdx].id);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-black text-black dark:text-white overflow-hidden select-none relative">
      {/* Sticky Minimalist Header */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-black/15 dark:border-white/15 px-4 py-3 shrink-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={onBackToDashboard}
              className="min-w-[40px] min-h-[40px] -ml-1 flex items-center justify-center rounded-full border-[1.5px] border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all active:scale-95 shrink-0"
              aria-label="Back to Dashboard"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4.5 h-4.5 stroke-[2.2]" />
            </button>
            <div className="min-w-0">
              <div className="flex items-baseline gap-2">
                <h1 className="text-[16px] font-bold tracking-tight truncate leading-none">
                  The Prophetic Day
                </h1>
                <span
                  dir="rtl"
                  className="font-scheherazade text-[14px] font-bold text-[#9A7214] dark:text-[#E5C158] leading-none shrink-0"
                >
                  السُّنَّةُ الْيَوْمِيَّةُ
                </span>
              </div>
              <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 truncate mt-1 tabular-nums">
                {prayerStatus.locationName.split(',')[0]}
                {prayerStatus.locationLocalTime ? ` · ${prayerStatus.locationLocalTime}` : ''}
              </p>
            </div>
          </div>

          <button
            onClick={handleScrollToNow}
            className="btn-monolith px-3 py-1.5 rounded-full border-[1.5px] border-[#C59B27] bg-[#D4AF37]/10 text-[#8F680C] dark:text-[#F3D578] hover:bg-[#D4AF37] hover:text-black text-[11px] font-bold flex items-center gap-1.5 shrink-0 active:scale-95 transition-all"
            title="Jump to current time on the golden timeline"
          >
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span>Now</span>
          </button>
        </div>
      </header>

      {/* Scrollable Timeline Canvas */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-12 space-y-6">
        {/* Clean Active Moment Spotlight Card */}
        <button
          onClick={() => setSelectedStageId(activeStage.id)}
          className="btn-monolith group w-full p-4 rounded-2xl border-[1.5px] border-black dark:border-white bg-black text-white dark:bg-white dark:text-black shadow-[0_6px_18px_rgba(0,0,0,0.16)] dark:shadow-[0_6px_18px_rgba(255,255,255,0.12)] text-left flex items-center justify-between gap-3 transition-transform active:scale-[0.985]"
        >
          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#E5C158] shadow-[0_0_8px_#E5C158]" />
              <span className="text-[#F3D578] dark:text-[#9A7214]">
                Current Sunnah Window · {activeStage.phaseTag}
              </span>
            </div>
            <h2 className="text-[15.5px] font-bold leading-snug truncate">
              {activeStage.title}
            </h2>
            <p className="text-[11.5px] opacity-85 line-clamp-1 font-medium">
              {activeStage.briefAction}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full border border-[#D4AF37]/70 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
            <ChevronRight className="w-4 h-4 text-[#F3D578] dark:text-[#9A7214]" />
          </div>
        </button>

        {/* Golden Vertical Thread Timeline */}
        <div className="relative pl-10 pr-0.5 pt-1 pb-4">
          {/* Continuous Luminous Vertical Golden Spine */}
          <div
            aria-hidden="true"
            className="absolute left-[15px] top-4 bottom-4 w-[3px] rounded-full"
            style={{
              background:
                'linear-gradient(180deg, rgba(212,175,55,0.18) 0%, #C59B27 10%, #F3D578 48%, #D4AF37 88%, rgba(212,175,55,0.18) 100%)',
              boxShadow: '0 0 12px rgba(212, 175, 55, 0.35)',
            }}
          />

          <div className="space-y-5">
            {stages.map((stage) => {
              const isNow = stage.isActiveNow;
              const isPast = stage.hasPassedToday;

              return (
                <div
                  key={stage.id}
                  ref={(el) => {
                    nodeRefs.current[stage.id] = el;
                  }}
                  className="relative"
                >
                  {/* Golden Thread Milestone Node */}
                  <div
                    className={`absolute -left-10 top-5 w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                      isNow
                        ? 'bg-[#D4AF37] text-black border-2 border-[#FFF3C4] shadow-[0_0_0_5px_rgba(212,175,55,0.22),0_0_16px_rgba(212,175,55,0.6)] scale-105'
                        : isPast
                        ? 'bg-white dark:bg-black text-[#9A7214] dark:text-[#E5C158] border-2 border-[#C59B27]'
                        : 'bg-white dark:bg-black text-[#B8860B] dark:text-[#D4AF37] border-[1.5px] border-[#D4AF37]/65'
                    }`}
                  >
                    {isNow && (
                      <span className="absolute inset-0 rounded-full border border-[#E5C158] animate-ping opacity-40 pointer-events-none" />
                    )}
                    <StageGlyph iconKey={stage.iconKey} className="w-3.5 h-3.5 stroke-[2.2]" />
                  </div>

                  {/* Brief, Uncluttered, Well-Spaced Milestone Card */}
                  <button
                    onClick={() => setSelectedStageId(stage.id)}
                    className={`btn-monolith group w-full rounded-2xl p-4 text-left transition-all active:scale-[0.985] border-[1.5px] ${
                      isNow
                        ? 'bg-white dark:bg-neutral-950 border-[#D4AF37] shadow-[0_4px_20px_rgba(212,175,55,0.16)]'
                        : 'bg-white dark:bg-black border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white shadow-[0_2px_0_0_rgba(0,0,0,0.08)] dark:shadow-[0_2px_0_0_rgba(255,255,255,0.08)]'
                    }`}
                  >
                    {/* Top Row: Time Window + Active Gold Tag */}
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-400 tabular-nums">
                        {stage.phaseTag} · {stage.windowTimeLabel}
                      </span>
                      {isNow && (
                        <span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-black text-[9.5px] font-bold uppercase tracking-wider shrink-0">
                          Now
                        </span>
                      )}
                    </div>

                    {/* Title + Arabic Subtitle */}
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-[14.5px] font-bold text-black dark:text-white leading-snug">
                        {stage.title}
                      </h3>
                      <span
                        dir="rtl"
                        className="font-scheherazade text-[13.5px] font-bold text-neutral-600 dark:text-neutral-300 shrink-0"
                      >
                        {stage.arabicTitle}
                      </span>
                    </div>

                    {/* Concise Single Summary */}
                    <p className="mt-1.5 text-[12px] font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed line-clamp-2">
                      {stage.briefAction}
                    </p>

                    {/* Minimal Golden Highlight Footer + Chevron */}
                    <div className="mt-3 pt-2.5 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-2">
                      <span className="text-[10.5px] font-semibold text-[#8F680C] dark:text-[#E5C158] truncate">
                        {stage.briefHighlight}
                      </span>
                      <div className="flex items-center gap-1 text-[10.5px] font-bold text-black dark:text-white shrink-0 group-hover:translate-x-0.5 transition-transform">
                        <span>Hadiths</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Deep Authentic Hadith, Dua & Favorite Surah Detail Modal (Shown ONLY on Card Tap) */}
      {selectedStage && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-xs animate-in fade-in"
          onClick={() => setSelectedStageId(null)}
        >
          <div
            className="w-full max-w-md max-h-[92vh] bg-white dark:bg-black text-black dark:text-white rounded-t-3xl sm:rounded-3xl border-t-[1.5px] sm:border-[1.5px] border-[#D4AF37]/70 shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-black/15 dark:border-white/15 flex items-start justify-between gap-3 shrink-0">
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#9A7214] dark:text-[#E5C158] tabular-nums">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  <span>
                    {selectedStage.phaseTag} · {selectedStage.windowTimeLabel}
                  </span>
                </div>
                <h2 className="text-[17px] font-bold leading-snug text-black dark:text-white">
                  {selectedStage.title}
                </h2>
                <p
                  dir="rtl"
                  className="font-scheherazade text-[16px] font-bold text-neutral-600 dark:text-neutral-300 leading-none"
                >
                  {selectedStage.arabicTitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedStageId(null)}
                className="p-2 rounded-xl bg-black text-white dark:bg-white dark:text-black shrink-0 active:scale-95 transition-transform"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Reference Content */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 select-text">
              {/* 1. What to Do According to Sunnah */}
              <section className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#B8860B] dark:text-[#E5C158]" />
                  <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-black dark:text-white">
                    Prophetic Practice at This Hour
                  </h3>
                </div>
                <div className="space-y-2">
                  {selectedStage.stepsToDo.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-black/10 dark:border-white/10"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#D4AF37]/20 text-[#8F680C] dark:text-[#F3D578] text-[10.5px] font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                        {idx + 1}
                      </span>
                      <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 1B. Minute Physical, Household & Spoken Sunnah Details */}
              {selectedStage.minuteDetails && selectedStage.minuteDetails.length > 0 && (
                <section className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <ListChecks className="w-4 h-4 text-[#B8860B] dark:text-[#E5C158]" />
                    <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-black dark:text-white">
                      Minute Sunnah Details (Exact Etiquettes)
                    </h3>
                  </div>
                  <div className="space-y-2.5">
                    {selectedStage.minuteDetails.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-white dark:bg-neutral-950 border border-[#D4AF37]/45 space-y-1.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-black dark:text-white leading-snug">
                            {item.aspect}
                          </h4>
                        </div>
                        <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed">
                          {item.detail}
                        </p>
                        <span className="inline-block text-[10.5px] font-bold text-[#8F680C] dark:text-[#E5C158]">
                          {item.reference}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 2. Authentic Duas & Adhkar */}
              {selectedStage.duas.length > 0 && (
                <section className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B8860B] dark:text-[#E5C158]" />
                    <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-black dark:text-white">
                      Prophetic Duas &amp; Dhikr
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {selectedStage.duas.map((dua, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-[#D4AF37]/45 space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-black dark:text-white">
                            {dua.title}
                          </span>
                        </div>
                        <p
                          dir="rtl"
                          className="font-scheherazade text-[21px] leading-[1.95] text-black dark:text-white font-semibold text-right pt-1"
                        >
                          {dua.arabic}
                        </p>
                        <p className="text-[11.5px] italic font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed">
                          {dua.transliteration}
                        </p>
                        <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                          “{dua.translation}”
                        </p>
                        <span className="inline-block text-[10.5px] font-bold text-[#8F680C] dark:text-[#E5C158]">
                          {dua.reference}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 3. Favorite Deeds & Beloved Habits */}
              {selectedStage.favoriteActs.length > 0 && (
                <section className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#B8860B] dark:text-[#E5C158]" />
                    <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-black dark:text-white">
                      Most Beloved to the Prophet (ﷺ)
                    </h3>
                  </div>
                  <div className="space-y-2.5">
                    {selectedStage.favoriteActs.map((act, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-white dark:bg-neutral-950 border border-black/15 dark:border-white/15 space-y-1.5"
                      >
                        <h4 className="text-xs font-bold text-black dark:text-white">
                          {act.title}
                        </h4>
                        <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed">
                          {act.detail}
                        </p>
                        <span className="inline-block text-[10.5px] font-bold text-[#8F680C] dark:text-[#E5C158]">
                          {act.reference}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 4. Favorite Surahs & Verses at This Hour */}
              {selectedStage.favoriteSurahs.length > 0 && (
                <section className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#B8860B] dark:text-[#E5C158]" />
                    <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-black dark:text-white">
                      Favorite Surahs &amp; Verses
                    </h3>
                  </div>
                  <div className="space-y-2.5">
                    {selectedStage.favoriteSurahs.map((surah, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-black/15 dark:border-white/15 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-black dark:text-white">
                              {surah.label}
                            </h4>
                            <p className="text-[11.5px] font-medium text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                              {surah.whenRecited}
                            </p>
                            <span className="inline-block text-[10px] font-bold text-[#8F680C] dark:text-[#E5C158] mt-1">
                              {surah.reference}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            onOpenAyahInReader(surah.surahNumber, surah.ayahNumber)
                          }
                          className="btn-monolith w-full py-2 px-3 rounded-xl bg-black text-white dark:bg-white dark:text-black text-[11.5px] font-bold flex items-center justify-center gap-1.5 active:scale-[0.98]"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>
                            Open Surah {surah.surahNumber}:{surah.ayahNumber} in Qur’an
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 5. Deep Sahih Hadith References */}
              {selectedStage.hadiths.length > 0 && (
                <section className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <ScrollText className="w-4 h-4 text-[#B8860B] dark:text-[#E5C158]" />
                    <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-black dark:text-white">
                      Authentic Hadith References
                    </h3>
                  </div>
                  <div className="space-y-2.5">
                    {selectedStage.hadiths.map((h, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-white dark:bg-neutral-950 border border-[#D4AF37]/40 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="text-[11px] font-bold text-[#8F680C] dark:text-[#E5C158]">
                            {h.source}
                          </span>
                          <span className="text-[10.5px] font-semibold text-neutral-500 dark:text-neutral-400">
                            {h.narrator}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                          {h.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Modal Prev / Next Hour Stepper */}
            <div className="px-4 py-3 border-t border-black/15 dark:border-white/15 bg-white dark:bg-black flex items-center justify-between gap-2 shrink-0">
              <button
                onClick={() => handleStepModalStage(-1)}
                className="flex items-center gap-1 px-3 py-2 rounded-xl border border-black/25 dark:border-white/25 text-xs font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Hour</span>
              </button>
              <span className="text-[11px] font-bold text-neutral-500 tabular-nums">
                {selectedStage.order} / {stages.length}
              </span>
              <button
                onClick={() => handleStepModalStage(1)}
                className="flex items-center gap-1 px-3 py-2 rounded-xl border border-black/25 dark:border-white/25 text-xs font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                <span>Next Hour</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
