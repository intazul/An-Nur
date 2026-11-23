import React, { useState, useRef, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Copy,
  Check,
  Search,
  BookOpen,
  X,
  Brain,
  Eye,
  EyeOff,
  CheckCircle2,
  Circle,
  Sparkles,
  Layers,
  ListOrdered,
  Play,
} from 'lucide-react';
import {
  HADITH_CURRICULUM,
  HADITH_TOPICS,
  HadithLessonItem,
  HadithTopicId,
  getLessonsForTopic,
  getTopicDistributionStats,
  searchCurriculumLessons,
} from '../data/hadithCurriculum';
import {
  getLearnedHadithIds,
  loadLastHadithLesson,
  markHadithLearned,
  saveLastHadithLesson,
  unmarkHadithLearned,
} from '../utils/offlineHadithStorage';
import { HadithReferenceModal } from './HadithReferenceModal';
import { SahihHadithItem } from '../types/hadith';
import { playGentleChime } from '../utils/notifications';

interface HadithJourneyViewProps {
  onBackToDashboard: () => void;
  onOpenLibrary?: () => void;
  onHadithStudied?: (hadithId: string) => void;
  initialTopicId?: string;
}

export const HadithJourneyView: React.FC<HadithJourneyViewProps> = ({
  onBackToDashboard,
  onOpenLibrary,
  onHadithStudied,
  initialTopicId,
}) => {
  const [viewMode, setViewMode] = useState<'topics_overview' | 'chapter_lessons' | 'lesson_reader'>(
    initialTopicId ? 'chapter_lessons' : 'topics_overview'
  );
  const [activeTopicId, setActiveTopicId] = useState<HadithTopicId>(() => {
    if (initialTopicId && HADITH_TOPICS.some((t) => t.id === initialTopicId)) {
      return initialTopicId as HadithTopicId;
    }
    return loadLastHadithLesson()?.topicId as HadithTopicId || 'faith';
  });
  const [lessonIndex, setLessonIndex] = useState<number>(() => {
    const saved = loadLastHadithLesson();
    return saved?.lessonIndex ?? 0;
  });
  const [slideAnimation, setSlideAnimation] = useState<'next' | 'prev' | 'none'>('none');

  // Learning & Memory Practice States
  const [learnedIds, setLearnedIds] = useState<string[]>(() => getLearnedHadithIds());
  const [practiceRecallMode, setPracticeRecallMode] = useState<boolean>(false);
  const [recallRevealed, setRecallRevealed] = useState<boolean>(false);

  // Search & UI Feedback
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [imanCreditToast, setImanCreditToast] = useState<string | null>(null);
  const [referenceModalItem, setReferenceModalItem] = useState<SahihHadithItem | null>(null);

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const learnedSet = useMemo(() => new Set(learnedIds), [learnedIds]);

  const topicStats = useMemo(() => getTopicDistributionStats(learnedIds), [learnedIds]);

  const totalLearnedCount = useMemo(
    () => HADITH_CURRICULUM.filter((l) => learnedSet.has(l.id)).length,
    [learnedSet]
  );
  const overallProgressPercent = Math.round(
    (totalLearnedCount / Math.max(1, HADITH_CURRICULUM.length)) * 100
  );

  const activeTopic = useMemo(
    () => HADITH_TOPICS.find((t) => t.id === activeTopicId) || HADITH_TOPICS[0],
    [activeTopicId]
  );

  const currentTopicLessons = useMemo(() => getLessonsForTopic(activeTopic.id), [activeTopic.id]);
  const safeLessonIdx = Math.max(0, Math.min(lessonIndex, currentTopicLessons.length - 1));
  const currentLesson: HadithLessonItem =
    currentTopicLessons[safeLessonIdx] || HADITH_CURRICULUM[0];

  const isCurrentLearned = learnedSet.has(currentLesson.id);

  // Find next unlearned lesson across the whole curriculum for the "Continue Next Lesson" button
  const recommendedNext = useMemo(() => {
    const saved = loadLastHadithLesson();
    if (saved) {
      const tLessons = getLessonsForTopic(saved.topicId as HadithTopicId);
      const item = tLessons[saved.lessonIndex];
      if (item && !learnedSet.has(item.id)) {
        return { topicId: item.topicId, lessonIndex: saved.lessonIndex, lesson: item };
      }
    }
    const firstUnlearned = HADITH_CURRICULUM.find((l) => !learnedSet.has(l.id));
    if (firstUnlearned) {
      const tLessons = getLessonsForTopic(firstUnlearned.topicId);
      const idx = tLessons.findIndex((x) => x.id === firstUnlearned.id);
      return { topicId: firstUnlearned.topicId, lessonIndex: Math.max(0, idx), lesson: firstUnlearned };
    }
    return { topicId: 'faith' as HadithTopicId, lessonIndex: 0, lesson: HADITH_CURRICULUM[0] };
  }, [learnedSet]);

  const searchResults = useMemo(() => searchCurriculumLessons(searchQuery), [searchQuery]);

  // Persist current lesson position cleanly
  useEffect(() => {
    if (viewMode === 'lesson_reader') {
      saveLastHadithLesson({ topicId: activeTopic.id, lessonIndex: safeLessonIdx });
    }
  }, [viewMode, activeTopic.id, safeLessonIdx]);

  // Reset recall veil when switching lessons
  useEffect(() => {
    setRecallRevealed(false);
  }, [currentLesson.id]);

  const handleOpenTopic = (topicId: HadithTopicId) => {
    setActiveTopicId(topicId);
    setViewMode('chapter_lessons');
    setSearchQuery('');
  };

  const handleStartLesson = (topicId: HadithTopicId, index: number) => {
    setActiveTopicId(topicId);
    setLessonIndex(Math.max(0, index));
    setSlideAnimation('none');
    setRecallRevealed(false);
    setViewMode('lesson_reader');
    setSearchQuery('');
  };

  const handleMarkLessonLearned = (hadithId: string, advanceAfter: boolean = false) => {
    const { learnedIds: updatedIds, isNewToday } = markHadithLearned(hadithId);
    setLearnedIds(updatedIds);

    if (isNewToday) {
      onHadithStudied?.(hadithId);
      setImanCreditToast('+Iman Level updated! Hadith lesson learned');
      setTimeout(() => setImanCreditToast(null), 2400);
    } else {
      setImanCreditToast('Lesson marked as remembered ✓');
      setTimeout(() => setImanCreditToast(null), 1800);
    }
    playGentleChime();

    if (advanceAfter) {
      goToNextLesson();
    }
  };

  const handleToggleLearnedState = (hadithId: string) => {
    if (learnedSet.has(hadithId)) {
      const next = unmarkHadithLearned(hadithId);
      setLearnedIds(next);
    } else {
      handleMarkLessonLearned(hadithId, false);
    }
  };

  const goToNextLesson = () => {
    if (safeLessonIdx < currentTopicLessons.length - 1) {
      setSlideAnimation('next');
      setLessonIndex(safeLessonIdx + 1);
    } else {
      // Advance sequentially to the next Chapter / Topic
      const currentTopicIdx = HADITH_TOPICS.findIndex((t) => t.id === activeTopic.id);
      const nextTopic = HADITH_TOPICS[(currentTopicIdx + 1) % HADITH_TOPICS.length];
      setActiveTopicId(nextTopic.id);
      setLessonIndex(0);
      setSlideAnimation('next');
    }
  };

  const goToPrevLesson = () => {
    if (safeLessonIdx > 0) {
      setSlideAnimation('prev');
      setLessonIndex(safeLessonIdx - 1);
    } else {
      const currentTopicIdx = HADITH_TOPICS.findIndex((t) => t.id === activeTopic.id);
      const prevTopic =
        HADITH_TOPICS[(currentTopicIdx - 1 + HADITH_TOPICS.length) % HADITH_TOPICS.length];
      const prevLessons = getLessonsForTopic(prevTopic.id);
      setActiveTopicId(prevTopic.id);
      setLessonIndex(Math.max(0, prevLessons.length - 1));
      setSlideAnimation('prev');
    }
  };

  // Keyboard navigation in Lesson Reader
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'lesson_reader') return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNextLesson();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevLesson();
      } else if (e.key === 'Escape') {
        setViewMode('chapter_lessons');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [viewMode, safeLessonIdx, activeTopic.id]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
    const diffY = touchStartYRef.current - e.changedTouches[0].clientY;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
      if (diffX > 0) goToNextLesson();
      else goToPrevLesson();
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const handleCopyLesson = () => {
    const text =
      `Chapter ${currentLesson.chapterNumber}: ${currentLesson.topicTitle}\n` +
      `Lesson ${currentLesson.lessonNumber}: ${currentLesson.lessonTitle}\n\n` +
      `Remember: ${currentLesson.corePhraseEnglish}\n\n` +
      `${currentLesson.textArabic}\n\n` +
      `"${currentLesson.textEnglish}"\n` +
      `Narrated by: ${currentLesson.narrator} (${currentLesson.reference})\n\n` +
      `Takeaway: ${currentLesson.keyLesson}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenReferenceModal = (l: HadithLessonItem) => {
    const item: SahihHadithItem = {
      id: l.id,
      collectionId: 'curriculum',
      collectionName: l.book,
      hadithNumber: l.globalNumber,
      reference: l.reference,
      bookName: l.book,
      chapterName: `Ch ${l.chapterNumber}: ${l.topicTitle}`,
      chapterTopicId: l.topicId,
      grade: l.grade,
      narrator: l.narrator,
      narratorArabic: 'رضي الله عنه',
      isnadBrief: 'Authentic Prophetic Chain of Transmission',
      question: l.question,
      textArabic: l.textArabic,
      textEnglish: l.textEnglish,
      category: l.topicTitle,
      categoryLabel: l.lessonTitle,
      keyLesson: l.keyLesson,
    };
    setReferenceModalItem(item);
  };

  const isLastLessonOfChapter = safeLessonIdx === currentTopicLessons.length - 1;
  const nextTopicObj =
    HADITH_TOPICS[(HADITH_TOPICS.findIndex((t) => t.id === activeTopic.id) + 1) % HADITH_TOPICS.length];

  return (
    <div
      className="flex-1 flex flex-col max-w-xl sm:max-w-2xl w-full mx-auto bg-white dark:bg-black h-full max-h-screen overflow-hidden select-none pb-2"
      style={{ touchAction: 'pan-x', overscrollBehavior: 'none' }}
    >
      {/* =====================================================================
          TIER 1 & 2: TOPIC DISTRIBUTION OVERVIEW & CHAPTER LESSON SEQUENCE
         ===================================================================== */}
      {viewMode !== 'lesson_reader' && (
        <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
          {/* App Header */}
          <header className="shrink-0 bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800 px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                onClick={() => {
                  if (viewMode === 'chapter_lessons') {
                    setViewMode('topics_overview');
                  } else {
                    onBackToDashboard();
                  }
                }}
                className="p-2 bg-black text-white dark:bg-white dark:text-black rounded-xl transition-transform active:scale-95 shrink-0"
                title="Back"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="min-w-0">
                <h1 className="text-base font-bold text-black dark:text-white font-cinzel leading-none truncate">
                  {viewMode === 'topics_overview'
                    ? 'Hadith Topics & Lessons'
                    : `Ch ${activeTopic.chapterNumber} · ${activeTopic.titleEnglish}`}
                </h1>
                <p className="text-[10.5px] text-neutral-500 dark:text-neutral-400 font-semibold truncate mt-0.5">
                  {viewMode === 'topics_overview'
                    ? `${HADITH_TOPICS.length} Topics · ${HADITH_CURRICULUM.length} Lessons · ${totalLearnedCount} Learned`
                    : `${currentTopicLessons.filter((l) => learnedSet.has(l.id)).length}/${currentTopicLessons.length} Lessons Remembered`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {viewMode === 'chapter_lessons' ? (
                <button
                  onClick={() => setViewMode('topics_overview')}
                  className="px-3 py-1.5 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold shadow-2xs"
                >
                  All Topics
                </button>
              ) : (
                onOpenLibrary && (
                  <button
                    onClick={onOpenLibrary}
                    className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-black dark:text-white text-xs font-bold flex items-center gap-1"
                    title="Browse Hadiths by Canonical Book"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Books</span>
                  </button>
                )
              )}
            </div>
          </header>

          {/* Search & Topic Quick Tabs */}
          <div className="shrink-0 p-3 bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 space-y-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Hadith lessons, keywords, or narrators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-xs text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Horizontal Topic Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none snap-x">
              <button
                onClick={() => {
                  setViewMode('topics_overview');
                  setSearchQuery('');
                }}
                className={`snap-start shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                  viewMode === 'topics_overview'
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800'
                }`}
              >
                All {HADITH_TOPICS.length} Topics
              </button>

              {HADITH_TOPICS.map((t) => {
                const isSelected = viewMode === 'chapter_lessons' && activeTopicId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleOpenTopic(t.id)}
                    className={`snap-start shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                      isSelected
                        ? 'bg-black text-white dark:bg-white dark:text-black'
                        : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800'
                    }`}
                  >
                    Ch {t.chapterNumber} · {t.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Results */}
          {searchQuery.trim().length >= 2 ? (
            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-2.5">
              {searchResults.map((lesson) => {
                const topicLessons = getLessonsForTopic(lesson.topicId);
                const idxInTopic = Math.max(
                  0,
                  topicLessons.findIndex((x) => x.id === lesson.id)
                );
                const isDone = learnedSet.has(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => handleStartLesson(lesson.topicId, idxInTopic)}
                    className="w-full p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white text-left space-y-1.5 transition-all"
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-neutral-500">
                        Ch {lesson.chapterNumber} · Lesson {lesson.lessonNumber} · {lesson.topicTitle}
                      </span>
                      {isDone && (
                        <span className="px-2 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-[10px]">
                          ✓ Learned
                        </span>
                      )}
                    </div>
                    <h3 className="text-xs font-bold text-black dark:text-white font-cinzel">
                      {lesson.lessonTitle}
                    </h3>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-300 line-clamp-2">
                      "{lesson.corePhraseEnglish}"
                    </p>
                  </button>
                );
              })}

              {searchResults.length === 0 && (
                <div className="py-12 text-center text-xs text-neutral-500">
                  No Hadith lessons matched "{searchQuery}".
                </div>
              )}
            </div>
          ) : viewMode === 'topics_overview' ? (
            /* =====================================================================
               TIER 1: TOPIC DISTRIBUTION + SEQUENTIAL CHAPTERS LIST
               ===================================================================== */
            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
              {/* Continue Lesson Hero Card */}
              <div className="p-4 rounded-3xl bg-black text-white dark:bg-white dark:text-black space-y-3 shadow-md">
                <div className="flex items-center justify-between text-[11px] font-bold opacity-80">
                  <span className="uppercase tracking-wider">Guided Curriculum Progress</span>
                  <span className="font-mono">
                    {totalLearnedCount}/{HADITH_CURRICULUM.length} Lessons ({overallProgressPercent}%)
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-white/20 dark:bg-black/15 overflow-hidden">
                  <div
                    className="h-full bg-white dark:bg-black rounded-full transition-all duration-500"
                    style={{ width: `${overallProgressPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between gap-3 pt-0.5">
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase tracking-wider opacity-75 block font-bold">
                      Up Next · Chapter {recommendedNext.lesson.chapterNumber} Lesson{' '}
                      {recommendedNext.lesson.lessonNumber}
                    </span>
                    <h2 className="text-sm font-bold font-cinzel truncate">
                      {recommendedNext.lesson.lessonTitle}
                    </h2>
                  </div>

                  <button
                    onClick={() =>
                      handleStartLesson(recommendedNext.topicId, recommendedNext.lessonIndex)
                    }
                    className="shrink-0 px-3.5 py-2 rounded-xl bg-white text-black dark:bg-black dark:text-white text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-transform"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Continue</span>
                  </button>
                </div>
              </div>

              {/* Distribution by Topic Breakdown */}
              <div className="p-4 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                      Hadith Distribution by Topic Type
                    </h2>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Every Hadith grouped by subject & taught as progressive lessons
                    </p>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-neutral-500">
                    {HADITH_CURRICULUM.length} Total
                  </span>
                </div>

                {/* Stacked Proportional Topic Distribution Bar */}
                <div className="flex w-full h-2.5 rounded-full overflow-hidden gap-0.5 bg-neutral-200 dark:bg-neutral-800">
                  {topicStats.map((stat, idx) => (
                    <div
                      key={stat.topic.id}
                      onClick={() => handleOpenTopic(stat.topic.id)}
                      title={`${stat.topic.titleEnglish}: ${stat.totalCount} lessons (${stat.sharePercent}%)`}
                      style={{ width: `${stat.sharePercent}%` }}
                      className={`h-full cursor-pointer transition-opacity hover:opacity-80 ${
                        idx % 2 === 0
                          ? 'bg-black dark:bg-white'
                          : 'bg-neutral-500 dark:bg-neutral-400'
                      }`}
                    />
                  ))}
                </div>

                {/* Compact Topic Count Badges */}
                <div className="grid grid-cols-2 gap-1.5 text-[10.5px]">
                  {topicStats.map((stat) => (
                    <button
                      key={stat.topic.id}
                      onClick={() => handleOpenTopic(stat.topic.id)}
                      className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white text-left transition-colors"
                    >
                      <span className="font-bold text-black dark:text-white truncate pr-1">
                        {stat.topic.chapterNumber}. {stat.topic.shortLabel}
                      </span>
                      <span className="font-mono font-bold text-neutral-500 shrink-0">
                        {stat.totalCount} ({stat.sharePercent}%)
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ordered Chapter Cards (1 to 8) */}
              <div className="space-y-2.5 pb-4">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    Chapters One After Another
                  </span>
                  <span className="text-[10.5px] font-semibold text-neutral-400">
                    Tap a chapter to see its lessons
                  </span>
                </div>

                {topicStats.map(({ topic, totalCount, learnedCount, progressPercent }) => (
                  <button
                    key={topic.id}
                    onClick={() => handleOpenTopic(topic.id)}
                    className="w-full p-4 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white text-left space-y-2.5 transition-all active:scale-[0.99] shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-8 h-8 rounded-xl bg-black text-white dark:bg-white dark:text-black font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          {topic.chapterNumber}
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-black dark:text-white font-cinzel truncate">
                            {topic.titleEnglish}
                          </h3>
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                            {topic.subtitle}
                          </p>
                        </div>
                      </div>

                      <span className="font-quran text-xs font-bold text-neutral-600 dark:text-neutral-300 shrink-0" dir="rtl">
                        {topic.titleArabic}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="w-full h-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                        <div
                          className="h-full bg-black dark:bg-white rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="text-neutral-500">
                          {learnedCount} / {totalCount} Lessons Learned
                        </span>
                        <span className="text-black dark:text-white flex items-center gap-1">
                          <span>{learnedCount === totalCount ? 'Review Chapter' : 'Open Lessons'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* =====================================================================
               TIER 2: SEQUENTIAL LESSON PATH INSIDE SELECTED TOPIC CHAPTER
               ===================================================================== */
            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 pb-6">
              {/* Chapter Intro Banner */}
              <div className="p-4 rounded-3xl bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-500">
                    Chapter {activeTopic.chapterNumber} of {HADITH_TOPICS.length}
                  </span>
                  <span className="font-quran text-sm font-bold text-black dark:text-white" dir="rtl">
                    {activeTopic.titleArabic}
                  </span>
                </div>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {activeTopic.description}
                </p>
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-neutral-500">
                    {currentTopicLessons.length} Sequential Lessons
                  </span>
                  <button
                    onClick={() => {
                      const firstUnlearnedIdx = currentTopicLessons.findIndex(
                        (l) => !learnedSet.has(l.id)
                      );
                      handleStartLesson(
                        activeTopic.id,
                        firstUnlearnedIdx >= 0 ? firstUnlearnedIdx : 0
                      );
                    }}
                    className="px-3 py-1.5 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold flex items-center gap-1"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>
                      {currentTopicLessons.some((l) => !learnedSet.has(l.id))
                        ? 'Start Next Lesson'
                        : 'Review Chapter'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Ordered Lessons 1, 2, 3... */}
              <div className="space-y-2">
                {currentTopicLessons.map((lesson, idx) => {
                  const isDone = learnedSet.has(lesson.id);
                  const firstUnlearned = currentTopicLessons.findIndex(
                    (l) => !learnedSet.has(l.id)
                  );
                  const isCurrentStep = idx === firstUnlearned;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => handleStartLesson(activeTopic.id, idx)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 active:scale-[0.99] ${
                        isCurrentStep
                          ? 'bg-neutral-100 dark:bg-neutral-900 border-2 border-black dark:border-white shadow-xs'
                          : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                          isDone
                            ? 'bg-black text-white dark:bg-white dark:text-black'
                            : isCurrentStep
                            ? 'bg-black text-white dark:bg-white dark:text-black'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        {isDone ? <Check className="w-4 h-4 stroke-[2.8]" /> : lesson.lessonNumber}
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                            Lesson {lesson.lessonNumber} · {lesson.reference.split('·')[0].trim()}
                          </span>
                          {isDone ? (
                            <span className="text-[10px] font-bold text-black dark:text-white">
                              ✓ Learned
                            </span>
                          ) : isCurrentStep ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black">
                              Up Next
                            </span>
                          ) : null}
                        </div>

                        <h3 className="text-sm font-bold text-black dark:text-white font-cinzel leading-snug">
                          {lesson.lessonTitle}
                        </h3>

                        <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-1">
                          {lesson.corePhraseEnglish}
                        </p>
                      </div>

                      <ChevronRight className="w-4 h-4 text-neutral-400 shrink-0 self-center" />
                    </button>
                  );
                })}
              </div>

              {/* Next Chapter Quick Footer */}
              <button
                onClick={() => handleOpenTopic(nextTopicObj.id)}
                className="w-full p-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-bold text-black dark:text-white hover:border-black dark:hover:border-white transition-all"
              >
                <span>
                  Next Chapter ({nextTopicObj.chapterNumber}): {nextTopicObj.titleEnglish}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          TIER 3: FOCUSED LESSON & MEMORY PRACTICE READER
         ===================================================================== */}
      {viewMode === 'lesson_reader' && (
        <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden relative">
          {/* Top Lesson Bar */}
          <header className="shrink-0 bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800 px-3.5 py-2.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <button
                onClick={() => setViewMode('chapter_lessons')}
                className="p-1.5 -ml-1 text-black dark:text-white rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors shrink-0"
                title="Back to Chapter Lessons"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
              </button>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-xs font-bold text-black dark:text-white">
                  <span className="font-mono shrink-0">Ch {activeTopic.chapterNumber}</span>
                  <span className="opacity-40">·</span>
                  <span className="font-cinzel truncate">{activeTopic.shortLabel}</span>
                </div>
                <p className="text-[10.5px] text-neutral-500 dark:text-neutral-400 font-semibold">
                  Lesson {safeLessonIdx + 1} of {currentTopicLessons.length}
                </p>
              </div>
            </div>

            {/* Study vs Recall Memory Mode Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shrink-0">
              <button
                onClick={() => {
                  setPracticeRecallMode(false);
                  setRecallRevealed(false);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all ${
                  !practiceRecallMode
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
              >
                <BookOpen className="w-3 h-3" />
                <span>Study</span>
              </button>
              <button
                onClick={() => {
                  setPracticeRecallMode(true);
                  setRecallRevealed(false);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all ${
                  practiceRecallMode
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
                title="Hide English & practice remembering this Hadith"
              >
                <Brain className="w-3 h-3" />
                <span>Recall</span>
              </button>
            </div>
          </header>

          {/* Subtle Toast when Iman Level is credited */}
          {imanCreditToast && (
            <div className="mx-3 mt-2 px-3 py-1.5 rounded-xl bg-black text-white dark:bg-white dark:text-black text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-sm shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{imanCreditToast}</span>
            </div>
          )}

          {/* Swipeable Lesson Card */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex-1 min-h-0 flex flex-col justify-between p-3 sm:p-4 overflow-hidden select-none"
          >
            <div
              onAnimationEnd={() => setSlideAnimation('none')}
              className={`flex-1 min-h-0 flex flex-col justify-between p-4 sm:p-5 rounded-3xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 shadow-md overflow-hidden ${
                slideAnimation === 'next'
                  ? 'animate-slide-next'
                  : slideAnimation === 'prev'
                  ? 'animate-slide-prev'
                  : ''
              }`}
            >
              {/* Top Source & Remembered Toggle */}
              <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-neutral-200 dark:border-neutral-800 shrink-0 gap-2">
                <button
                  onClick={() => handleToggleLearnedState(currentLesson.id)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all ${
                    isCurrentLearned
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700'
                  }`}
                  title={isCurrentLearned ? 'Marked as learned & remembered' : 'Tap to mark learned'}
                >
                  {isCurrentLearned ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Circle className="w-3.5 h-3.5" />
                  )}
                  <span>{isCurrentLearned ? 'Learned' : 'Mark Learned'}</span>
                </button>

                <button
                  onClick={() => handleOpenReferenceModal(currentLesson)}
                  className="px-2.5 py-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white font-cinzel text-[10.5px] font-bold flex items-center gap-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors truncate"
                >
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{currentLesson.reference.split('·')[0].trim()}</span>
                </button>
              </div>

              {/* Scrollable Lesson Content */}
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain space-y-3.5 pr-1 scrollbar-thin">
                {/* Lesson Title & Guiding Question */}
                <div className="space-y-1 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    Lesson {currentLesson.lessonNumber} · {currentLesson.lessonTitle}
                  </span>
                  <h2 className="font-cinzel text-base sm:text-lg font-bold text-black dark:text-white leading-snug">
                    {currentLesson.question}
                  </h2>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-semibold">
                    Narrated by <strong className="text-black dark:text-white">{currentLesson.narrator}</strong>
                  </p>
                </div>

                {/* Easy-to-Memorize Core Anchor Phrase */}
                <div className="p-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    <span>Core Line to Remember</span>
                    <span className="font-quran">خلاصة الحديث</span>
                  </div>
                  <p className="font-quran text-base sm:text-lg font-bold text-black dark:text-white text-right leading-loose select-text" dir="rtl">
                    {currentLesson.corePhraseArabic}
                  </p>
                  {(!practiceRecallMode || recallRevealed) && (
                    <p className="text-xs font-bold text-black dark:text-white leading-snug pt-0.5">
                      “{currentLesson.corePhraseEnglish}”
                    </p>
                  )}
                </div>

                {/* Practice Recall Veil when Recall Mode is active & unrevealed */}
                {practiceRecallMode && !recallRevealed ? (
                  <div className="p-5 rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 text-center space-y-3 bg-neutral-50 dark:bg-neutral-950/60">
                    <Brain className="w-7 h-7 mx-auto text-black dark:text-white" />
                    <div className="space-y-1">
                      <h3 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider">
                        Memory Check
                      </h3>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        Look at the Arabic phrase and question above. Can you recall the Prophet’s ﷺ teaching and key lesson before revealing?
                      </p>
                    </div>
                    <button
                      onClick={() => setRecallRevealed(true)}
                      className="px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold inline-flex items-center gap-1.5 shadow-xs active:scale-95 transition-transform"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Reveal Hadith & Answer</span>
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Full Authentic Arabic Text */}
                    <div className="text-right select-text" dir="rtl">
                      <p className="font-quran text-base sm:text-lg text-neutral-950 dark:text-neutral-50 leading-[2.3] font-bold">
                        {currentLesson.textArabic}
                      </p>
                    </div>

                    {/* Clear English Text */}
                    <div className="pt-2.5 border-t border-neutral-200 dark:border-neutral-800 select-text">
                      <p className="font-book-serif text-[14px] sm:text-[15px] leading-[1.75] text-neutral-900 dark:text-neutral-100">
                        “{currentLesson.textEnglish}”
                      </p>
                    </div>

                    {/* Memory Hook & Practical Action */}
                    <div className="grid grid-cols-1 gap-2">
                      <div className="p-3 rounded-2xl bg-black text-white dark:bg-white dark:text-black text-xs space-y-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-75 block">
                          Easy Memory Hook
                        </span>
                        <p className="font-semibold leading-relaxed">
                          {currentLesson.memoryHook}
                        </p>
                      </div>

                      <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-xs space-y-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                          Apply Today
                        </span>
                        <p className="text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed">
                          {currentLesson.keyLesson}
                        </p>
                      </div>
                    </div>

                    {practiceRecallMode && (
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <button
                          onClick={() => setRecallRevealed(false)}
                          className="px-3 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-bold text-neutral-600 dark:text-neutral-300 flex items-center gap-1"
                        >
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Hide Again</span>
                        </button>
                        <button
                          onClick={() => handleMarkLessonLearned(currentLesson.id, true)}
                          className="flex-1 py-2 px-3 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold flex items-center justify-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>I Remembered It → Next</span>
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Chapter Lesson Step Progress Strip */}
              <div className="pt-2.5 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-1.5 shrink-0">
                {currentTopicLessons.map((l, i) => {
                  const done = learnedSet.has(l.id);
                  const active = i === safeLessonIdx;
                  return (
                    <button
                      key={l.id}
                      onClick={() => setLessonIndex(i)}
                      title={`Lesson ${i + 1}: ${l.lessonTitle}`}
                      className={`h-2 flex-1 rounded-full transition-all ${
                        active
                          ? 'bg-black dark:bg-white scale-y-125'
                          : done
                          ? 'bg-neutral-600 dark:bg-neutral-400'
                          : 'bg-neutral-200 dark:bg-neutral-800'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Bottom Sequential Controls */}
            <div className="mt-2.5 flex items-center justify-between gap-2 shrink-0">
              <button
                onClick={goToPrevLesson}
                className="py-3 px-3.5 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white font-bold text-xs shadow-2xs transition-all active:scale-95 flex items-center justify-center gap-1"
                title="Previous Lesson"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                <span>Prev</span>
              </button>

              <button
                onClick={handleCopyLesson}
                className="p-3 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white font-bold transition-all active:scale-95 shadow-2xs"
                title="Copy Lesson & Hadith"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>

              {!isCurrentLearned ? (
                <button
                  onClick={() => handleMarkLessonLearned(currentLesson.id, true)}
                  className="flex-1 py-3 px-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {isLastLessonOfChapter
                      ? `Complete & Ch ${nextTopicObj.chapterNumber} →`
                      : 'Mark Learned & Next'}
                  </span>
                </button>
              ) : (
                <button
                  onClick={goToNextLesson}
                  className="flex-1 py-3 px-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <span>
                    {isLastLessonOfChapter
                      ? `Next: Ch ${nextTopicObj.chapterNumber} (${nextTopicObj.shortLabel})`
                      : 'Next Lesson'}
                  </span>
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reference Modal */}
      {referenceModalItem && (
        <HadithReferenceModal
          hadith={referenceModalItem}
          isOpen={true}
          onClose={() => setReferenceModalItem(null)}
        />
      )}
    </div>
  );
};
