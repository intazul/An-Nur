import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Headphones,
  Play,
  ScrollText,
  Users,
} from 'lucide-react';
import { Ayah, UserProfileData } from '../types/quran';
import {
  CURRICULUM_EPOCHS,
  CurriculumChapter,
  CurriculumQuranRef,
  ISLAM_CURRICULUM_CHAPTERS,
} from '../data/islamCurriculumData';
import { fetchSurahDetail } from '../utils/quranApi';
import { transliterateUrduToRoman } from '../utils/urduTransliteration';

interface IslamChronicleViewProps {
  profile: UserProfileData;
  onBackToDashboard: () => void;
  onOpenProphetsTimeline?: () => void;
  onOpenAyahInReader: (surahNumber: number, ayahNumber: number) => void;
  onPlayAyahInReciter: (surahNumber: number, ayahNumber: number) => void;
  onChapterStudied?: (itemId: string) => void;
}

const CURRICULUM_COMPLETED_KEY = 'annur_curriculum_completed_v2';
const CURRICULUM_SLIDES_KEY = 'annur_curriculum_slides_v2';

function loadCompletedChapterIds(): string[] {
  try {
    const raw = localStorage.getItem(CURRICULUM_COMPLETED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function saveCompletedChapterIds(ids: string[]) {
  try {
    localStorage.setItem(CURRICULUM_COMPLETED_KEY, JSON.stringify(ids));
  } catch {
    // ignore storage errors
  }
}

function loadSlideProgressMap(): Record<string, number> {
  try {
    const raw = localStorage.getItem(CURRICULUM_SLIDES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function saveSlideProgressMap(map: Record<string, number>) {
  try {
    localStorage.setItem(CURRICULUM_SLIDES_KEY, JSON.stringify(map));
  } catch {
    // ignore storage errors
  }
}

const OfflineQuranEvidenceCard: React.FC<{
  item: CurriculumQuranRef;
  showUrdu: boolean;
  onOpenReader: (surahNumber: number, ayahNumber: number) => void;
  onPlayReciter: (surahNumber: number, ayahNumber: number) => void;
}> = ({ item, showUrdu, onOpenReader, onPlayReciter }) => {
  const [ayah, setAyah] = useState<Ayah | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchSurahDetail(item.surahNumber)
      .then((detail) => {
        if (cancelled) return;
        const found = detail.ayahs.find((a) => a.numberInSurah === item.ayahNumber);
        setAyah(found || null);
      })
      .catch(() => {
        if (!cancelled) setAyah(null);
      });
    return () => {
      cancelled = true;
    };
  }, [item.surahNumber, item.ayahNumber]);

  const romanUrdu = useMemo(() => {
    if (!showUrdu || !ayah?.textUrdu) return '';
    return transliterateUrduToRoman(ayah.textUrdu);
  }, [showUrdu, ayah?.textUrdu]);

  return (
    <div className="rounded-2xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 p-4 space-y-2.5">
      <div>
        <div className="text-xs font-bold text-black dark:text-white tracking-tight">
          Qur’an · {item.label}
        </div>
        <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 leading-relaxed mt-0.5">
          {item.whenAndWhy}
        </p>
      </div>

      {ayah && (
        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-900 space-y-2">
          <p
            dir="rtl"
            className="font-quran text-xl leading-[2.15] text-right text-black dark:text-white select-text"
          >
            {ayah.textArabic}
          </p>
          {ayah.textEnglish && (
            <p className="text-xs font-medium leading-relaxed text-neutral-800 dark:text-neutral-200">
              “{ayah.textEnglish}”
            </p>
          )}
          {romanUrdu && (
            <p className="text-[11px] font-medium leading-relaxed text-neutral-600 dark:text-neutral-400 italic">
              Roman Urdu: {romanUrdu}
            </p>
          )}
        </div>
      )}

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={() => onOpenReader(item.surahNumber, item.ayahNumber)}
          className="flex-1 min-h-[42px] px-3 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Read Ayah</span>
        </button>
        <button
          onClick={() => onPlayReciter(item.surahNumber, item.ayahNumber)}
          className="flex-1 min-h-[42px] px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-black dark:text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:border-black dark:hover:border-white active:scale-[0.98] transition-all"
        >
          <Headphones className="w-3.5 h-3.5" />
          <span>Listen</span>
        </button>
      </div>
    </div>
  );
};

export const IslamChronicleView: React.FC<IslamChronicleViewProps> = ({
  profile,
  onBackToDashboard,
  onOpenProphetsTimeline,
  onOpenAyahInReader,
  onPlayAyahInReciter,
  onChapterStudied,
}) => {
  const [completedIds, setCompletedIds] = useState<string[]>(() => loadCompletedChapterIds());
  const [slideProgressMap, setSlideProgressMap] = useState<Record<string, number>>(() =>
    loadSlideProgressMap()
  );

  // Active Full-Screen Horizontal Chapter Study State
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [slideIdx, setSlideIdx] = useState<number>(0);
  const [animDir, setAnimDir] = useState<'next' | 'prev'>('next');

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const slideScrollRef = useRef<HTMLDivElement | null>(null);

  const markChapterCompleted = (chapterId: string) => {
    if (completedIds.includes(chapterId)) return;
    const next = [...completedIds, chapterId];
    setCompletedIds(next);
    saveCompletedChapterIds(next);
    onChapterStudied?.(chapterId);
  };

  const recordSlideReached = (chapterId: string, oneBasedSlide: number) => {
    setSlideProgressMap((prev) => {
      if ((prev[chapterId] || 0) >= oneBasedSlide) return prev;
      const next = { ...prev, [chapterId]: oneBasedSlide };
      saveSlideProgressMap(next);
      return next;
    });
  };

  const launchChapter = (chapterId: string, startSlide: number = 0) => {
    setAnimDir('next');
    setActiveChapterId(chapterId);
    setSlideIdx(startSlide);
    recordSlideReached(chapterId, startSlide + 1);
  };

  // Global Analytics Summary
  const analytics = useMemo(() => {
    const totalChapters = ISLAM_CURRICULUM_CHAPTERS.length;
    const completedChapters = ISLAM_CURRICULUM_CHAPTERS.filter((c) =>
      completedIds.includes(c.id)
    ).length;
    const percentComplete =
      totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;

    let totalQuranRefs = 0;
    let completedQuranRefs = 0;
    let totalHadiths = 0;
    let completedHadiths = 0;

    ISLAM_CURRICULUM_CHAPTERS.forEach((ch) => {
      totalQuranRefs += ch.quranVerses.length;
      totalHadiths += ch.sahihHadiths.length;
      if (completedIds.includes(ch.id)) {
        completedQuranRefs += ch.quranVerses.length;
        completedHadiths += ch.sahihHadiths.length;
      }
    });

    const epochBreakdown = CURRICULUM_EPOCHS.map((ep) => {
      const chs = ISLAM_CURRICULUM_CHAPTERS.filter((c) => c.epochId === ep.id);
      const done = chs.filter((c) => completedIds.includes(c.id)).length;
      const pct = chs.length > 0 ? Math.round((done / chs.length) * 100) : 0;
      return { epoch: ep, total: chs.length, done, pct };
    });

    const nextChapter: CurriculumChapter =
      ISLAM_CURRICULUM_CHAPTERS.find((c) => !completedIds.includes(c.id)) ||
      ISLAM_CURRICULUM_CHAPTERS[0];

    return {
      totalChapters,
      completedChapters,
      percentComplete,
      totalQuranRefs,
      completedQuranRefs,
      totalHadiths,
      completedHadiths,
      epochBreakdown,
      nextChapter,
    };
  }, [completedIds]);

  const activeChapter = useMemo(
    () => ISLAM_CURRICULUM_CHAPTERS.find((c) => c.id === activeChapterId) || null,
    [activeChapterId]
  );

  const activeChapterIndex = useMemo(
    () => ISLAM_CURRICULUM_CHAPTERS.findIndex((c) => c.id === activeChapterId),
    [activeChapterId]
  );

  useEffect(() => {
    if (slideScrollRef.current) {
      slideScrollRef.current.scrollTop = 0;
    }
  }, [activeChapterId, slideIdx]);

  // =========================================================================
  // FULL-SCREEN HORIZONTAL SLIDING CHAPTER VIEW (ONE-BY-ONE STUDY)
  // =========================================================================
  if (activeChapter) {
    const epoch = CURRICULUM_EPOCHS.find((e) => e.id === activeChapter.epochId);
    const isCompleted = completedIds.includes(activeChapter.id);
    const prevChapter =
      activeChapterIndex > 0 ? ISLAM_CURRICULUM_CHAPTERS[activeChapterIndex - 1] : null;
    const nextChapter =
      activeChapterIndex >= 0 && activeChapterIndex < ISLAM_CURRICULUM_CHAPTERS.length - 1
        ? ISLAM_CURRICULUM_CHAPTERS[activeChapterIndex + 1]
        : null;

    const slides = [
      '1 · Core Facts',
      '2 · Qur’an Refs',
      '3 · Sahih Hadiths',
      '4 · Summary',
    ] as const;

    const totalSlides = slides.length;
    const safeSlide = Math.max(0, Math.min(slideIdx, totalSlides - 1));
    const chapterPct = Math.round(((safeSlide + 1) / totalSlides) * 100);

    const navigateSlide = (targetIdx: number) => {
      if (targetIdx < 0) {
        if (prevChapter) {
          setAnimDir('prev');
          setActiveChapterId(prevChapter.id);
          setSlideIdx(totalSlides - 1);
          recordSlideReached(prevChapter.id, totalSlides);
        }
        return;
      }
      if (targetIdx >= totalSlides) {
        markChapterCompleted(activeChapter.id);
        if (nextChapter) {
          setAnimDir('next');
          setActiveChapterId(nextChapter.id);
          setSlideIdx(0);
          recordSlideReached(nextChapter.id, 1);
        } else {
          setActiveChapterId(null);
        }
        return;
      }
      setAnimDir(targetIdx >= safeSlide ? 'next' : 'prev');
      setSlideIdx(targetIdx);
      recordSlideReached(activeChapter.id, targetIdx + 1);
      if (targetIdx === totalSlides - 1) {
        markChapterCompleted(activeChapter.id);
      }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      touchStartRef.current = { x: t.clientX, y: t.clientY };
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;
      const t = e.changedTouches[0];
      if (!t) return;
      const dx = t.clientX - touchStartRef.current.x;
      const dy = t.clientY - touchStartRef.current.y;
      touchStartRef.current = null;
      if (Math.abs(dx) > 52 && Math.abs(dx) > Math.abs(dy) * 1.25) {
        if (dx < 0) navigateSlide(safeSlide + 1);
        else navigateSlide(safeSlide - 1);
      }
    };

    return (
      <div
        className="flex-1 flex flex-col bg-white dark:bg-black text-black dark:text-white overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Sticky Top Full-Screen Reader Chrome */}
        <header className="px-3.5 pt-2.5 pb-2 border-b border-neutral-200 dark:border-neutral-800 shrink-0 bg-white dark:bg-black space-y-2">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setActiveChapterId(null)}
              className="min-h-[44px] min-w-[44px] -ml-1 flex items-center justify-center rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 active:scale-95 transition-transform"
              aria-label="Back to Analytics"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex-1 min-w-0 text-center">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 truncate tabular-nums">
                Chapter {activeChapter.order} of {ISLAM_CURRICULUM_CHAPTERS.length} · Epoch{' '}
                {epoch?.roman} · {chapterPct}%
              </div>
              <h2 className="font-semibold text-sm truncate text-black dark:text-white">
                {activeChapter.title}
              </h2>
            </div>

            <button
              onClick={() => markChapterCompleted(activeChapter.id)}
              className={`min-h-[38px] px-3 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                isCompleted
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'border border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white'
              }`}
            >
              {isCompleted ? 'Done' : 'Complete'}
            </button>
          </div>

          {/* 4-Slide Segmented Navigation Rail */}
          <div className="grid grid-cols-4 gap-1">
            {slides.map((label, idx) => (
              <button
                key={label}
                onClick={() => navigateSlide(idx)}
                className={`min-h-[34px] px-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
                  idx === safeSlide
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </header>

        {/* Horizontal Animated Content Area */}
        <div
          ref={slideScrollRef}
          key={`${activeChapter.id}-${safeSlide}`}
          className={`flex-1 overflow-y-auto px-4 py-4 space-y-3.5 ${
            animDir === 'next' ? 'animate-slide-next' : 'animate-slide-prev'
          }`}
        >
          {/* SLIDE 1: HIGH-YIELD KEY FACTS (Crisp Bullets + Citations) */}
          {safeSlide === 0 && (
            <div className="space-y-3.5 pb-4">
              <div className="rounded-2xl bg-black text-white dark:bg-white dark:text-black p-4 space-y-1.5">
                <div className="text-[11px] font-semibold opacity-80">
                  {activeChapter.eraLabel} · {activeChapter.location}
                </div>
                <h1 className="text-lg font-bold leading-snug">{activeChapter.title}</h1>
                <p className="text-xs font-medium opacity-85">{activeChapter.coreFocus}</p>
              </div>

              <div className="space-y-2.5">
                {activeChapter.keyFacts.map((fact, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-neutral-50 dark:bg-neutral-900/75 border border-neutral-200 dark:border-neutral-800 p-3.5 space-y-1"
                  >
                    <div className="text-[13px] leading-relaxed text-black dark:text-white">
                      <span className="font-bold">{fact.lead} </span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200">
                        {fact.detail}
                      </span>
                    </div>
                    {fact.ref && (
                      <div className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                        Ref: {fact.ref}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE 2: QUR'AN VERSES & REVELATION EVIDENCE */}
          {safeSlide === 1 && (
            <div className="space-y-3 pb-4">
              <div className="px-0.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                Qur’an Evidence ({activeChapter.quranVerses.length} Verses Referenced)
              </div>
              {activeChapter.quranVerses.map((qItem, idx) => (
                <OfflineQuranEvidenceCard
                  key={`${qItem.surahNumber}-${qItem.ayahNumber}-${idx}`}
                  item={qItem}
                  showUrdu={Boolean(profile.showUrdu)}
                  onOpenReader={onOpenAyahInReader}
                  onPlayReciter={onPlayAyahInReciter}
                />
              ))}
            </div>
          )}

          {/* SLIDE 3: AUTHENTICATED SAHIH HADITH REFERENCES */}
          {safeSlide === 2 && (
            <div className="space-y-3 pb-4">
              <div className="flex items-center gap-1.5 px-0.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                <ScrollText className="w-3.5 h-3.5" />
                <span>Sahih Hadith References ({activeChapter.sahihHadiths.length})</span>
              </div>

              {activeChapter.sahihHadiths.map((h, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-neutral-50 dark:bg-neutral-900/75 border border-neutral-200 dark:border-neutral-800 p-4 space-y-2"
                >
                  <div className="text-xs font-bold text-black dark:text-white">
                    {h.source} · {h.narrator}
                  </div>
                  <div className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                    {h.factSummary}
                  </div>
                  <p className="text-[13px] font-medium leading-relaxed text-neutral-800 dark:text-neutral-200">
                    {h.text}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* SLIDE 4: VERIFIED TAKEAWAYS & ADVANCE ONE-BY-ONE */}
          {safeSlide === 3 && (
            <div className="space-y-4 pb-4">
              <div className="rounded-2xl bg-neutral-50 dark:bg-neutral-900/75 border border-neutral-200 dark:border-neutral-800 p-4 space-y-2.5">
                <div className="text-xs font-bold text-black dark:text-white">
                  Key Facts Established in Chapter {activeChapter.order}
                </div>
                {activeChapter.verifiedTakeaways.map((tk, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[13px] font-medium leading-relaxed text-neutral-800 dark:text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-black dark:text-white shrink-0 mt-0.5" />
                    <span>{tk}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigateSlide(totalSlides)}
                className="w-full min-h-[48px] px-4 py-3 rounded-2xl bg-black text-white dark:bg-white dark:text-black text-xs font-semibold flex items-center justify-center gap-2 shadow-xs active:scale-[0.99]"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {nextChapter
                    ? `Complete Ch ${activeChapter.order} & Start Ch ${nextChapter.order} →`
                    : 'Complete Final Chapter & View Analytics'}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Sticky Bottom Full-Screen Horizontal Slide Navigation */}
        <footer className="px-4 py-2.5 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shrink-0 space-y-2">
          <div className="w-full h-1 rounded-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
            <div
              className="h-full bg-black dark:bg-white transition-all duration-300"
              style={{ width: `${chapterPct}%` }}
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              disabled={safeSlide === 0 && !prevChapter}
              onClick={() => navigateSlide(safeSlide - 1)}
              className="min-h-[42px] px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-semibold flex items-center gap-1.5 disabled:opacity-35 hover:border-black dark:hover:border-white active:scale-95 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{safeSlide === 0 && prevChapter ? `Ch ${prevChapter.order}` : 'Prev Slide'}</span>
            </button>

            <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 tabular-nums">
              Slide {safeSlide + 1} / {totalSlides}
            </span>

            <button
              onClick={() => navigateSlide(safeSlide + 1)}
              className="min-h-[42px] px-3.5 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-semibold flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <span>
                {safeSlide === totalSlides - 1
                  ? nextChapter
                    ? `Next: Ch ${nextChapter.order}`
                    : 'Finish'
                  : 'Next Slide'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </footer>
      </div>
    );
  }

  // =========================================================================
  // MAIN SCREEN: ANALYTICS + "LET'S LEARN ISLAM" CTA + 24 SEQUENTIAL CHAPTERS
  // =========================================================================
  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-black text-black dark:text-white overflow-hidden">
      {/* Compact Sticky Top Header (No extra sub-tabs) */}
      <header className="px-4 py-2.5 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shrink-0 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={onBackToDashboard}
            className="min-h-[44px] min-w-[44px] -ml-1.5 flex items-center justify-center rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 active:scale-95 transition-transform shrink-0"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h1 className="text-base font-bold tracking-tight text-black dark:text-white truncate leading-tight">
              Learn Islam · 24 Chapters
            </h1>
            <p className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 truncate tabular-nums">
              Qur’an & Sahih Hadith Facts · 100% Offline
            </p>
          </div>
        </div>

        {onOpenProphetsTimeline && (
          <button
            onClick={onOpenProphetsTimeline}
            className="min-h-[38px] px-2.5 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-[11px] font-semibold text-black dark:text-white hover:border-black dark:hover:border-white flex items-center gap-1 shrink-0"
            title="Individual Biographies of 28 Prophets"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Prophets</span>
          </button>
        )}
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* 1. Primary Mastery Analytics Card */}
        <section className="rounded-2xl bg-black text-white dark:bg-white dark:text-black p-4 space-y-3">
          <div className="flex items-end justify-between gap-2">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider opacity-80">
                Overall Study Completion
              </div>
              <div className="text-3xl font-bold tabular-nums mt-0.5 leading-none">
                {analytics.percentComplete}%
              </div>
            </div>
            <div className="text-right text-xs font-semibold tabular-nums opacity-90">
              {analytics.completedChapters} / {analytics.totalChapters} Chapters Completed
            </div>
          </div>

          <div className="w-full h-2.5 rounded-full bg-white/20 dark:bg-black/15 overflow-hidden">
            <div
              className="h-full bg-white dark:bg-black transition-all duration-300"
              style={{ width: `${Math.max(3, analytics.percentComplete)}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/15 dark:border-black/15 text-center">
            <div>
              <div className="text-sm font-bold tabular-nums">
                {analytics.completedChapters}/{analytics.totalChapters}
              </div>
              <div className="text-[10px] font-medium opacity-75">Chapters</div>
            </div>
            <div>
              <div className="text-sm font-bold tabular-nums">
                {analytics.completedQuranRefs}/{analytics.totalQuranRefs}
              </div>
              <div className="text-[10px] font-medium opacity-75">Qur’an Refs</div>
            </div>
            <div>
              <div className="text-sm font-bold tabular-nums">
                {analytics.completedHadiths}/{analytics.totalHadiths}
              </div>
              <div className="text-[10px] font-medium opacity-75">Sahih Hadiths</div>
            </div>
          </div>
        </section>

        {/* 2. Prominent Sequential Start Button */}
        <button
          onClick={() => launchChapter(analytics.nextChapter.id, 0)}
          className="w-full min-h-[54px] px-4 py-3.5 rounded-2xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black flex items-center justify-between gap-3 active:scale-[0.99] transition-transform shadow-sm"
        >
          <div className="flex items-center gap-3 min-w-0 text-left">
            <div className="w-9 h-9 rounded-xl bg-white/15 dark:bg-black/15 flex items-center justify-center shrink-0">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold leading-tight">
                {analytics.completedChapters === 0 ? "Let’s Learn Islam" : "Continue: Let’s Learn Islam"}
              </div>
              <div className="text-[11px] font-medium opacity-80 truncate mt-0.5 tabular-nums">
                Ch {analytics.nextChapter.order} of 24 · {analytics.nextChapter.title}
              </div>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 shrink-0" />
        </button>

        {/* 3. Epoch Progress Breakdown */}
        <section className="rounded-2xl bg-neutral-50 dark:bg-neutral-900/75 border border-neutral-200 dark:border-neutral-800 p-3.5 space-y-2.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Progress by Era (Epochs I – VIII)
          </div>
          <div className="space-y-2">
            {analytics.epochBreakdown.map(({ epoch, total, done, pct }) => (
              <div key={epoch.id} className="space-y-1">
                <div className="flex items-center justify-between gap-2 text-xs font-semibold text-black dark:text-white">
                  <span className="truncate">
                    {epoch.roman}. {epoch.title}
                  </span>
                  <span className="text-[11px] tabular-nums text-neutral-600 dark:text-neutral-400 shrink-0">
                    {done}/{total} ({pct}%)
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                  <div
                    className="h-full bg-black dark:bg-white transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Sequential Chapters List (Ch 1 to Ch 24) */}
        <section className="space-y-2.5 pb-6">
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 px-0.5">
            All 24 Chapters · Step-by-Step Sequence
          </div>

          {ISLAM_CURRICULUM_CHAPTERS.map((ch) => {
            const done = completedIds.includes(ch.id);
            const reachedSlide = slideProgressMap[ch.id] || 0;
            return (
              <button
                key={ch.id}
                onClick={() => launchChapter(ch.id, 0)}
                className="w-full text-left rounded-2xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white p-3.5 flex items-center justify-between gap-3 active:scale-[0.99] transition-all"
              >
                <div className="min-w-0 space-y-0.5">
                  <div className="text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 tabular-nums">
                    Ch {ch.order} · {ch.eraLabel} · {ch.quranVerses.length} Qur’an ·{' '}
                    {ch.sahihHadiths.length} Hadiths
                  </div>
                  <h3 className="text-[13px] font-bold text-black dark:text-white leading-snug">
                    {ch.title}
                  </h3>
                  <p className="text-[11px] font-medium text-neutral-600 dark:text-neutral-400 truncate">
                    {ch.coreFocus}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-1.5">
                  {done ? (
                    <CheckCircle2 className="w-4 h-4 text-black dark:text-white" />
                  ) : reachedSlide > 0 ? (
                    <span className="text-[10px] font-semibold tabular-nums text-neutral-500">
                      {reachedSlide}/4
                    </span>
                  ) : null}
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </div>
              </button>
            );
          })}
        </section>
      </main>
    </div>
  );
};
