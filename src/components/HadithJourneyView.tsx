import React, { useState, useRef, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Copy,
  Check,
  Sparkles,
  Info,
  Search,
  BookOpen,
  Compass,
  Layers,
  Hash,
  DownloadCloud,
  CheckCircle2,
  X,
  Filter,
} from 'lucide-react';
import {
  HADITH_CHAPTER_TOPICS,
  HADITH_TOPIC_CATEGORIES,
} from '../data/hadithChapters';
import { HadithChapterTopic, SahihHadithItem } from '../types/hadith';
import { ALL_SAHIH_HADITHS } from '../data/sahihHadiths';
import { HadithReferenceModal } from './HadithReferenceModal';
import {
  fetchHadithByNumber,
  fetchSectionHadiths,
  SupportedCanonicalBook,
  BOOK_METADATA,
} from '../services/hadithApiService';

interface HadithJourneyViewProps {
  onBackToDashboard: () => void;
  onOpenLibrary?: () => void;
}

export const HadithJourneyView: React.FC<HadithJourneyViewProps> = ({
  onBackToDashboard,
}) => {
  // Navigation mode: 'chapters_list' or 'slide_reader'
  const [viewMode, setViewMode] = useState<'chapters_list' | 'slide_reader'>('chapters_list');

  // Selected chapter/topic
  const [activeChapterId, setActiveChapterId] = useState<string>('intentions-sincerity');

  // Slide index within the active chapter (0-indexed)
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [slideAnimation, setSlideAnimation] = useState<'next' | 'prev' | 'none'>('none');

  // Search & category filter in chapters list
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Topics');

  // Reference modal & copy feedback
  const [activeReferenceHadith, setActiveReferenceHadith] = useState<SahihHadithItem | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Jump to Hadith # modal state
  const [showJumpModal, setShowJumpModal] = useState<boolean>(false);
  const [jumpBook, setJumpBook] = useState<SupportedCanonicalBook>('bukhari');
  const [jumpNumber, setJumpNumber] = useState<string>('1');
  const [jumpLoading, setJumpLoading] = useState<boolean>(false);
  const [jumpError, setJumpError] = useState<string | null>(null);

  // Dynamic hadiths map for chapters: chapterId -> list of Hadiths
  const [chapterHadithsMap, setChapterHadithsMap] = useState<Record<string, SahihHadithItem[]>>(() => {
    // Initialize with pre-bundled hadiths mapped by category or keywords
    const initialMap: Record<string, SahihHadithItem[]> = {};

    HADITH_CHAPTER_TOPICS.forEach((chapter) => {
      const matched = ALL_SAHIH_HADITHS.filter((h) => {
        if (h.chapterTopicId === chapter.id) return true;
        const text = `${h.bookName} ${h.chapterName} ${h.question} ${h.categoryLabel}`.toLowerCase();
        const chName = chapter.nameEnglish.toLowerCase();
        return text.includes(chName.split(' ')[0]);
      });

      initialMap[chapter.id] = matched.length > 0 ? matched : [ALL_SAHIH_HADITHS[0]];
    });

    return initialMap;
  });

  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Active chapter metadata
  const activeChapter: HadithChapterTopic = useMemo(() => {
    return (
      HADITH_CHAPTER_TOPICS.find((c) => c.id === activeChapterId) ||
      HADITH_CHAPTER_TOPICS[0]
    );
  }, [activeChapterId]);

  // Current chapter Hadiths
  const currentChapterHadiths: SahihHadithItem[] = useMemo(() => {
    return chapterHadithsMap[activeChapterId] || [ALL_SAHIH_HADITHS[0]];
  }, [chapterHadithsMap, activeChapterId]);

  const currentHadith: SahihHadithItem =
    currentChapterHadiths[slideIndex] || currentChapterHadiths[0] || ALL_SAHIH_HADITHS[0];

  // Filtered chapters list for explorer
  const filteredChapters = useMemo(() => {
    return HADITH_CHAPTER_TOPICS.filter((ch) => {
      const matchesCategory =
        selectedCategory === 'All Topics' || ch.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        ch.nameEnglish.toLowerCase().includes(q) ||
        ch.nameArabic.toLowerCase().includes(q) ||
        ch.description.toLowerCase().includes(q) ||
        ch.primaryQuestion.toLowerCase().includes(q) ||
        String(ch.number).includes(q)
      );
    });
  }, [selectedCategory, searchQuery]);

  // Auto-fetch additional Hadiths from canonical books if chapter has few items
  useEffect(() => {
    if (viewMode === 'slide_reader' && activeChapter) {
      const existing = chapterHadithsMap[activeChapter.id] || [];
      if (existing.length <= 1 && activeChapter.sources.length > 0) {
        const source = activeChapter.sources[0];
        if (source.sectionId) {
          fetchSectionHadiths(source.book as SupportedCanonicalBook, source.sectionId, 8).then(
            (fetched) => {
              if (fetched.length > 0) {
                setChapterHadithsMap((prev) => ({
                  ...prev,
                  [activeChapter.id]: [...(prev[activeChapter.id] || []), ...fetched],
                }));
              }
            }
          );
        }
      }
    }
  }, [activeChapterId, viewMode]);

  const handleOpenChapter = (chapterId: string) => {
    setActiveChapterId(chapterId);
    setSlideIndex(0);
    setSlideAnimation('none');
    setViewMode('slide_reader');
  };

  // Horizontal Slide Navigation
  const goToNextSlide = () => {
    if (slideIndex < currentChapterHadiths.length - 1) {
      setSlideAnimation('next');
      setSlideIndex((prev) => prev + 1);
    } else {
      // Loop to beginning of chapter
      setSlideAnimation('next');
      setSlideIndex(0);
    }
  };

  const goToPrevSlide = () => {
    if (slideIndex > 0) {
      setSlideAnimation('prev');
      setSlideIndex((prev) => prev - 1);
    } else {
      // Loop to end of chapter
      setSlideAnimation('prev');
      setSlideIndex(currentChapterHadiths.length - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
    const diffY = touchStartYRef.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        goToNextSlide(); // swipe left -> next slide
      } else {
        goToPrevSlide(); // swipe right -> prev slide
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Copy Hadith without any Urdu
  const handleCopy = () => {
    if (!currentHadith) return;
    const text =
      `[${currentHadith.reference}]\n` +
      `Question: "${currentHadith.question}"\n\n` +
      `Narrator: ${currentHadith.narrator}\n\n` +
      `${currentHadith.textArabic}\n\n` +
      `English: "${currentHadith.textEnglish}"\n\n` +
      `Key Lesson: ${currentHadith.keyLesson}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Jump to any Hadith in Bukhari (1-7563), Muslim (1-7563), Tirmidhi (1-3956)
  const handleExecuteJump = async () => {
    const num = parseInt(jumpNumber.trim(), 10);
    const max = BOOK_METADATA[jumpBook].total;
    if (isNaN(num) || num < 1 || num > max) {
      setJumpError(`Please enter a valid number between 1 and ${max.toLocaleString()}.`);
      return;
    }

    setJumpLoading(true);
    setJumpError(null);

    try {
      const fetched = await fetchHadithByNumber(jumpBook, num);
      if (fetched) {
        // Add to active chapter deck
        setChapterHadithsMap((prev) => ({
          ...prev,
          [activeChapterId]: [fetched, ...(prev[activeChapterId] || [])],
        }));
        setSlideIndex(0);
        setShowJumpModal(false);
        setViewMode('slide_reader');
      } else {
        setJumpError('Could not fetch this Hadith right now. Please check the number.');
      }
    } catch {
      setJumpError('Failed to fetch Hadith. Please try again.');
    } finally {
      setJumpLoading(false);
    }
  };

  // Load more Hadiths for this chapter from Bukhari/Muslim/Tirmidhi
  const handleLoadMoreForChapter = async () => {
    if (isLoadingMore || !activeChapter.sources.length) return;
    setIsLoadingMore(true);

    try {
      const source = activeChapter.sources[0];
      const sectionId = source.sectionId || 1;
      const additional = await fetchSectionHadiths(
        source.book as SupportedCanonicalBook,
        sectionId,
        10
      );

      if (additional.length > 0) {
        setChapterHadithsMap((prev) => {
          const currentList = prev[activeChapterId] || [];
          const existingIds = new Set(currentList.map((h) => h.id));
          const newItems = additional.filter((h) => !existingIds.has(h.id));
          return {
            ...prev,
            [activeChapterId]: [...currentList, ...newItems],
          };
        });
      }
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div
      className="flex-1 flex flex-col max-w-md w-full mx-auto bg-stone-50 dark:bg-stone-950 h-full max-h-screen overflow-hidden select-none pb-1"
      style={{ touchAction: 'pan-x', overscrollBehavior: 'none' }}
    >
      {/* =========================================================================
          VIEW MODE 1: CHAPTERS & TOPICS EXPLORER (116+ TOPIC CHAPTERS)
          ========================================================================= */}
      {viewMode === 'chapters_list' && (
        <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
          {/* Header */}
          <header className="shrink-0 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-3.5 py-2.5 flex items-center justify-between gap-2 shadow-2xs">
            <div className="flex items-center gap-2 min-w-0">
              <button
                onClick={onBackToDashboard}
                className="p-1.5 -ml-1 text-black dark:text-white rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title="Back to Dashboard"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
              </button>

              <div className="min-w-0">
                <h1 className="text-base font-bold text-black dark:text-white font-cinzel leading-none truncate">
                  Hadith’s Journey
                </h1>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 font-semibold truncate mt-0.5">
                  116+ Topic Chapters · All Sahih Hadiths
                </p>
              </div>
            </div>

            {/* Jump to Any Hadith # Button */}
            <button
              onClick={() => setShowJumpModal(true)}
              className="py-1.5 px-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-xs flex items-center gap-1.5 shadow-2xs hover:opacity-90 active:scale-95 transition-all shrink-0"
              title="Jump directly to any Hadith # (1-7563 in Bukhari, 1-7563 in Muslim, 1-3956 in Tirmidhi)"
            >
              <Hash className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
              <span>Hadith #</span>
            </button>
          </header>

          {/* Quick Search & Category Filters */}
          <div className="shrink-0 p-3 bg-stone-100 dark:bg-stone-900/90 border-b border-stone-200 dark:border-stone-800 space-y-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search 116+ chapters by topic, name or question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-xs text-black dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none snap-x">
              {HADITH_TOPIC_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`snap-start shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      isSelected
                        ? 'bg-black text-white dark:bg-white dark:text-black shadow-2xs'
                        : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-stone-400'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 116+ Chapters List */}
          <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] text-stone-500 font-bold px-1">
              <span>Showing {filteredChapters.length} Chapters</span>
              <span>Questions Sliding Format</span>
            </div>

            {filteredChapters.map((chapter) => (
              <div
                key={chapter.id}
                onClick={() => handleOpenChapter(chapter.id)}
                className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-black dark:hover:border-white shadow-2xs cursor-pointer transition-all active:scale-[0.99] space-y-2 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 flex items-center justify-center font-mono text-[11px] font-bold">
                      {chapter.number}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[10px] font-bold">
                      {chapter.category}
                    </span>
                  </div>

                  <span className="font-quran text-xs text-stone-700 dark:text-stone-300 font-bold" dir="rtl">
                    {chapter.nameArabic}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-black dark:text-white font-cinzel group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                    {chapter.nameEnglish}
                  </h3>
                  <p className="text-[11.5px] text-stone-600 dark:text-stone-300 line-clamp-2 mt-0.5 leading-relaxed">
                    "{chapter.primaryQuestion}"
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-[10.5px]">
                  <span className="text-stone-500 font-medium">
                    Sources: Bukhari, Muslim & Tirmidhi
                  </span>
                  <span className="font-bold text-black dark:text-white flex items-center gap-1">
                    <span>Open Slides</span>
                    <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                </div>
              </div>
            ))}

            {filteredChapters.length === 0 && (
              <div className="py-12 text-center text-stone-500 space-y-2">
                <p className="text-sm font-semibold">No chapters match your search query.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Topics');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW MODE 2: HORIZONTAL SLIDING QUESTION DECK FOR ACTIVE CHAPTER
          ========================================================================= */}
      {viewMode === 'slide_reader' && (
        <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
          {/* Reader App Bar Header */}
          <header className="shrink-0 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-3.5 py-2.5 flex items-center justify-between gap-2 shadow-2xs">
            <div className="flex items-center gap-2 min-w-0">
              <button
                onClick={() => setViewMode('chapters_list')}
                className="p-1.5 -ml-1 text-black dark:text-white rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title="Back to All Chapters"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
              </button>

              <div className="min-w-0">
                <h1 className="text-sm font-bold text-black dark:text-white font-cinzel leading-none truncate">
                  {activeChapter.number}. {activeChapter.nameEnglish}
                </h1>
                <p className="text-[10.5px] text-stone-500 dark:text-stone-400 font-semibold truncate mt-0.5">
                  Question Slide {slideIndex + 1} of {currentChapterHadiths.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setShowJumpModal(true)}
                className="py-1.5 px-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-black dark:text-white hover:bg-stone-200 dark:hover:bg-stone-700 text-xs font-bold transition-all flex items-center gap-1"
                title="Jump to Hadith #"
              >
                <Hash className="w-3.5 h-3.5" />
                <span>Jump #</span>
              </button>

              <button
                onClick={() => setViewMode('chapters_list')}
                className="py-1.5 px-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black hover:opacity-90 text-xs font-bold transition-all flex items-center gap-1"
                title="Browse All 116+ Chapters"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Chapters</span>
              </button>
            </div>
          </header>

          {/* Horizontal Slide Deck */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex-1 min-h-0 flex flex-col justify-between p-2.5 sm:p-3 overflow-hidden select-none"
          >
            {/* Slide Card */}
            <div
              onAnimationEnd={() => setSlideAnimation('none')}
              className={`flex-1 min-h-0 flex flex-col justify-between p-4 sm:p-5 rounded-3xl bg-[#fdfbf7] dark:bg-stone-900 border-2 border-stone-300 dark:border-stone-800 shadow-md text-left overflow-hidden ${
                slideAnimation === 'next'
                  ? 'animate-slide-next'
                  : slideAnimation === 'prev'
                  ? 'animate-slide-prev'
                  : ''
              }`}
            >
              {/* Slide Top Metadata Bar */}
              <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-stone-200 dark:border-stone-800 text-xs shrink-0">
                <div className="flex items-center gap-1.5 min-w-0 pr-2">
                  <span className="font-cinzel text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                    Question {slideIndex + 1} / {currentChapterHadiths.length}
                  </span>
                  <span className="text-stone-400">·</span>
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 truncate">
                    {currentHadith.categoryLabel || activeChapter.nameEnglish}
                  </span>
                </div>

                {/* Clickable Reference Badge */}
                <button
                  onClick={() => setActiveReferenceHadith(currentHadith)}
                  className="px-2.5 py-1 rounded-xl bg-black text-white dark:bg-white dark:text-black font-cinzel text-[11px] font-bold flex items-center gap-1 shadow-2xs hover:opacity-90 active:scale-95 transition-all shrink-0"
                  title="Click to view verified source"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
                  <span>{currentHadith.reference}</span>
                </button>
              </div>

              {/* Slide Body (Scrollable with zero clipping, clean dark fonts, NO Urdu) */}
              <div className="flex-1 min-h-0 flex flex-col justify-start py-1 overflow-y-auto overscroll-contain space-y-3.5 pr-1 scrollbar-thin">
                {/* Specific Contemplative Question for this Hadith */}
                <div className="text-center px-1 shrink-0 space-y-1">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-900 dark:text-amber-300 font-bold text-[10px] uppercase tracking-wider">
                    Inquiry on {activeChapter.nameEnglish}
                  </span>
                  <h2 className="font-serif italic text-base sm:text-lg font-bold text-stone-950 dark:text-stone-50 leading-snug">
                    "{currentHadith.question}"
                  </h2>
                </div>

                {/* Primary Narrator Introduction */}
                <div className="text-center text-xs font-semibold text-stone-600 dark:text-stone-400 shrink-0">
                  <span>Prophetic Tradition narrated by: </span>
                  <strong className="text-black dark:text-white font-bold">
                    {currentHadith.narrator}
                  </strong>
                </div>

                {/* Clean, Dark Arabic Font (High contrast, zero glowing effect) */}
                <div className="pt-1 text-right select-text leading-[2.3]" dir="rtl">
                  <p className="font-quran text-base sm:text-lg text-stone-950 dark:text-stone-50 leading-[2.4] font-bold font-arabic-clean select-text">
                    {currentHadith.textArabic}
                  </p>
                </div>

                {/* Classical English Translation (No Urdu) */}
                <div className="pt-2.5 border-t border-stone-200 dark:border-stone-800 text-left select-text">
                  <p className="font-book-serif text-[14px] sm:text-[15.5px] leading-[1.8] text-stone-900 dark:text-stone-100">
                    "{currentHadith.textEnglish}"
                  </p>
                </div>

                {/* Actionable Life Lesson Card */}
                <div className="p-3 rounded-2xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-stone-800 dark:text-stone-200 font-bold uppercase tracking-wider text-[10px]">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Living Practice & Reflection</span>
                  </div>
                  <p className="text-stone-900 dark:text-stone-200 font-medium leading-relaxed">
                    {currentHadith.keyLesson}
                  </p>
                </div>

                {/* Clickable Verification Citation Link */}
                <div className="pt-1 text-center">
                  <button
                    onClick={() => setActiveReferenceHadith(currentHadith)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:underline"
                  >
                    <span>Source: {currentHadith.reference} ({currentHadith.collectionName})</span>
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Optional "Load More Hadiths for this Chapter" */}
                <div className="pt-2 text-center">
                  <button
                    onClick={handleLoadMoreForChapter}
                    disabled={isLoadingMore}
                    className="px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-[11px] font-bold inline-flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <DownloadCloud className="w-3.5 h-3.5" />
                    <span>
                      {isLoadingMore
                        ? 'Fetching more hadiths...'
                        : 'Load more Hadiths for this chapter'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Slider Scrubber */}
              <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-bold text-stone-700 dark:text-stone-300 shrink-0 font-mono">
                  {slideIndex + 1} / {currentChapterHadiths.length}
                </span>
                <input
                  type="range"
                  min="1"
                  max={currentChapterHadiths.length}
                  value={slideIndex + 1}
                  onChange={(e) => setSlideIndex(Number(e.target.value) - 1)}
                  className="w-full h-1.5 bg-stone-300 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white"
                />
              </div>
            </div>

            {/* Slide Navigation Buttons */}
            <div className="mt-2 flex items-center justify-between gap-2 shrink-0">
              <button
                onClick={goToPrevSlide}
                className="flex-1 py-2.5 px-3 rounded-2xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                title="Previous Question"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleCopy}
                className="p-2.5 rounded-2xl border-2 border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white hover:bg-stone-100 dark:hover:bg-stone-800 font-bold transition-all active:scale-95 shadow-xs"
                title="Copy Hadith"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={goToNextSlide}
                className="flex-1 py-2.5 px-3 rounded-2xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                title="Next Question"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          JUMP TO ANY HADITH NUMBER MODAL (BUKHARI 1-7563, MUSLIM 1-7563, TIRMITHI 1-3956)
          ========================================================================= */}
      {showJumpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in select-none">
          <div
            className="w-full max-w-sm rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl p-4 sm:p-5 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-black dark:text-white font-cinzel">
                  Jump to Any Hadith #
                </h3>
              </div>
              <button
                onClick={() => setShowJumpModal(false)}
                className="p-1 text-stone-400 hover:text-stone-600 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Access any complete Hadith from Sahih al-Bukhari, Sahih Muslim, or Jami` at-Tirmidhi.
              It will be saved on your device for offline reading.
            </p>

            {/* Select Collection */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-stone-500 uppercase">
                Choose Canonical Book:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['bukhari', 'muslim', 'tirmidhi'] as SupportedCanonicalBook[]).map((bookKey) => (
                  <button
                    key={bookKey}
                    type="button"
                    onClick={() => {
                      setJumpBook(bookKey);
                      setJumpError(null);
                    }}
                    className={`py-2 px-2 rounded-xl border text-xs font-bold transition-all ${
                      jumpBook === bookKey
                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    {bookKey === 'bukhari'
                      ? 'Bukhari'
                      : bookKey === 'muslim'
                      ? 'Muslim'
                      : 'Tirmidhi'}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-stone-400 pt-0.5">
                Max Hadiths: {BOOK_METADATA[jumpBook].total.toLocaleString()}
              </p>
            </div>

            {/* Enter Hadith Number */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-stone-500 uppercase">
                Hadith Number (1 - {BOOK_METADATA[jumpBook].total.toLocaleString()}):
              </label>
              <input
                type="number"
                min="1"
                max={BOOK_METADATA[jumpBook].total}
                value={jumpNumber}
                onChange={(e) => setJumpNumber(e.target.value)}
                placeholder="e.g. 1"
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-sm font-mono font-bold text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>

            {jumpError && (
              <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                {jumpError}
              </p>
            )}

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowJumpModal(false)}
                className="py-2 px-3 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteJump}
                disabled={jumpLoading}
                className="py-2 px-4 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-xs shadow-xs disabled:opacity-50 flex items-center gap-1.5"
              >
                {jumpLoading ? 'Fetching...' : 'Open Question Slide'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reference Modal */}
      <HadithReferenceModal
        isOpen={Boolean(activeReferenceHadith)}
        onClose={() => setActiveReferenceHadith(null)}
        hadith={activeReferenceHadith}
      />
    </div>
  );
};
