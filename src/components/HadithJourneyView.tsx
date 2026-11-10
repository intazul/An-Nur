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
  X,
  Filter,
  Flame,
  Award,
} from 'lucide-react';
import {
  HADITH_CHAPTER_TOPICS,
  HADITH_TOPIC_CATEGORIES,
} from '../data/hadithChapters';
import {
  HadithQuestionRecord,
  getAllHadithQuestions,
  getTotalHadithQuestionsCount,
  getQuestionsByChapterId,
  getBroaderCategoriesWithStats,
  getSubTopicsWithStats,
  searchHadithQuestionsOffline,
  CATEGORY_METADATA,
} from '../data/hadithQuestionsService';
import { HadithReferenceModal } from './HadithReferenceModal';
import { SahihHadithItem } from '../types/hadith';

interface HadithJourneyViewProps {
  onBackToDashboard: () => void;
  onOpenLibrary?: () => void;
}

export const HadithJourneyView: React.FC<HadithJourneyViewProps> = ({
  onBackToDashboard,
}) => {
  // Navigation mode: 'categories_explorer' | 'chapters_list' | 'slide_reader'
  const [viewMode, setViewMode] = useState<'categories_explorer' | 'chapters_list' | 'slide_reader'>('categories_explorer');

  // Selected Broader Category (Tier 1)
  const [selectedCategory, setSelectedCategory] = useState<string>('All Topics');

  // Selected Chapter / Sub-Topic ID (Tier 2)
  const [activeChapterId, setActiveChapterId] = useState<string>('intentions-sincerity');

  // Slide index within the active chapter (0-indexed) (Tier 3)
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [slideAnimation, setSlideAnimation] = useState<'next' | 'prev' | 'none'>('none');

  // Search query across all 1,100+ questions
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Copy feedback state
  const [copied, setCopied] = useState<boolean>(false);

  // Reference modal state
  const [referenceModalItem, setReferenceModalItem] = useState<SahihHadithItem | null>(null);

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Total questions count (1,102)
  const totalQuestionsCount = getTotalHadithQuestionsCount();

  // Tier 1: Broader categories with statistics
  const broaderCategories = useMemo(() => getBroaderCategoriesWithStats(), []);

  // Tier 2: Sub-topics with statistics
  const subTopicsList = useMemo(() => {
    return getSubTopicsWithStats(selectedCategory);
  }, [selectedCategory]);

  // Active chapter metadata
  const activeChapter = useMemo(() => {
    return (
      HADITH_CHAPTER_TOPICS.find((c) => c.id === activeChapterId) ||
      HADITH_CHAPTER_TOPICS[0]
    );
  }, [activeChapterId]);

  // Tier 3: 100% offline questions deck for the active chapter
  const currentChapterQuestions: HadithQuestionRecord[] = useMemo(() => {
    const list = getQuestionsByChapterId(activeChapterId);
    return list.length > 0 ? list : getQuestionsByChapterId('intentions-sincerity');
  }, [activeChapterId]);

  const currentQuestion: HadithQuestionRecord =
    currentChapterQuestions[slideIndex] || currentChapterQuestions[0];

  // Global search results across all 1,102 questions
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchHadithQuestionsOffline(searchQuery);
  }, [searchQuery]);

  // Filtered sub-topics for search
  const filteredSubTopics = useMemo(() => {
    if (!searchQuery.trim()) return subTopicsList;
    const q = searchQuery.toLowerCase().trim();
    return subTopicsList.filter(
      (st) =>
        st.nameEnglish.toLowerCase().includes(q) ||
        st.nameArabic.includes(q) ||
        st.description.toLowerCase().includes(q) ||
        st.primaryQuestion.toLowerCase().includes(q) ||
        st.category.toLowerCase().includes(q)
    );
  }, [subTopicsList, searchQuery]);

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setViewMode('chapters_list');
  };

  const handleOpenChapter = (chapterId: string, initialIndex: number = 0) => {
    setActiveChapterId(chapterId);
    setSlideIndex(initialIndex);
    setSlideAnimation('none');
    setViewMode('slide_reader');
  };

  // Horizontal Slide Navigation
  const goToNextSlide = () => {
    if (slideIndex < currentChapterQuestions.length - 1) {
      setSlideAnimation('next');
      setSlideIndex((prev) => prev + 1);
    } else {
      setSlideAnimation('next');
      setSlideIndex(0); // loop
    }
  };

  const goToPrevSlide = () => {
    if (slideIndex > 0) {
      setSlideAnimation('prev');
      setSlideIndex((prev) => prev - 1);
    } else {
      setSlideAnimation('prev');
      setSlideIndex(currentChapterQuestions.length - 1);
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
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const handleCopyQuestionHadith = () => {
    if (!currentQuestion) return;
    const text =
      `[Question #${currentQuestion.globalIndex} — ${currentQuestion.reference}]\n` +
      `Chapter: ${currentQuestion.subTopicTitle} (${currentQuestion.category})\n` +
      `Question: "${currentQuestion.question}"\n\n` +
      `Narrator: ${currentQuestion.narrator}\n\n` +
      `${currentQuestion.textArabic}\n\n` +
      `Translation: "${currentQuestion.textEnglish}"\n\n` +
      `Key Lesson: ${currentQuestion.keyLesson}\n(An-Nur Hadith's Journey)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenReferenceModal = (q: HadithQuestionRecord) => {
    const item: SahihHadithItem = {
      id: q.id,
      collectionId: q.book.toLowerCase().includes('bukhari') ? 'bukhari' : 'muslim',
      collectionName: q.book,
      hadithNumber: q.globalIndex,
      reference: q.reference,
      bookName: q.subTopicTitle,
      chapterName: q.subTopicTitle,
      grade: q.grade,
      narrator: q.narrator,
      narratorArabic: '',
      isnadBrief: `Transmitted by ${q.narrator} with authentic sound chain of transmission.`,
      question: q.question,
      textArabic: q.textArabic,
      textEnglish: q.textEnglish,
      category: q.category,
      categoryLabel: q.subTopicTitle,
      keyLesson: q.keyLesson,
    };
    setReferenceModalItem(item);
  };

  return (
    <div
      className="flex-1 flex flex-col max-w-md w-full mx-auto bg-stone-50 dark:bg-stone-950 h-full max-h-screen overflow-hidden select-none pb-1"
      style={{ touchAction: 'pan-x', overscrollBehavior: 'none' }}
    >
      {/* =========================================================================
          TIER 1 & 2: BROADER TOPICS EXPLORER & SUB-TOPICS LIST
          ========================================================================= */}
      {viewMode !== 'slide_reader' && (
        <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
          {/* Header */}
          <header className="shrink-0 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-3.5 py-2.5 flex items-center justify-between gap-2 shadow-2xs">
            <div className="flex items-center gap-2 min-w-0">
              <button
                onClick={() => {
                  if (viewMode === 'chapters_list') {
                    setViewMode('categories_explorer');
                  } else {
                    onBackToDashboard();
                  }
                }}
                className="p-1.5 -ml-1 text-black dark:text-white rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title="Back"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
              </button>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-base font-bold text-black dark:text-white font-cinzel leading-none truncate">
                    Hadith’s Journey
                  </h1>
                  <span className="px-2 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-mono text-[9px] font-bold">
                    {totalQuestionsCount}+ Questions
                  </span>
                </div>
                <p className="text-[10.5px] text-stone-500 dark:text-stone-400 font-semibold truncate mt-0.5">
                  {viewMode === 'categories_explorer'
                    ? '10 Broader Spheres · 116 Sub-Topics · 100% Offline'
                    : `${selectedCategory} · ${subTopicsList.length} Sub-Topics`}
                </p>
              </div>
            </div>

            {viewMode === 'chapters_list' && (
              <button
                onClick={() => setViewMode('categories_explorer')}
                className="px-2.5 py-1 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-200"
              >
                Topics ↗
              </button>
            )}
          </header>

          {/* Quick Offline Search Bar */}
          <div className="shrink-0 p-3 bg-stone-100 dark:bg-stone-900/90 border-b border-stone-200 dark:border-stone-800 space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search across all 1,100+ questions, hadiths, or topics..."
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

            {/* Broader Category Tabs Strip */}
            <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none snap-x">
              <button
                onClick={() => {
                  setSelectedCategory('All Topics');
                  setViewMode('categories_explorer');
                }}
                className={`snap-start shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  viewMode === 'categories_explorer' && selectedCategory === 'All Topics'
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-2xs'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
                }`}
              >
                All 10 Spheres ({totalQuestionsCount})
              </button>

              {broaderCategories.map((cat) => {
                const isSelected = selectedCategory === cat.category && viewMode === 'chapters_list';
                return (
                  <button
                    key={cat.category}
                    onClick={() => handleSelectCategory(cat.category)}
                    className={`snap-start shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-black text-white dark:bg-white dark:text-black shadow-2xs'
                        : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.category}</span>
                    <span className="opacity-75 font-mono text-[9px]">({cat.questionCount})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Results Dropdown (if searching) */}
          {searchQuery.trim() ? (
            <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] text-stone-500 font-bold px-1">
                <span>{searchResults.length} Questions Found for "{searchQuery}"</span>
                <span>Tap to launch slide</span>
              </div>

              {searchResults.map((res) => (
                <div
                  key={res.id}
                  onClick={() => handleOpenChapter(res.chapterTopicId)}
                  className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-black dark:hover:border-white shadow-2xs cursor-pointer transition-all active:scale-[0.99] space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[10.5px]">
                    <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 font-bold text-black dark:text-white">
                      #{res.globalIndex} · {res.category}
                    </span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      {res.reference.split(',')[0]}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-black dark:text-white font-cinzel">
                    "{res.question}"
                  </h3>

                  <p className="text-[11.5px] text-stone-600 dark:text-stone-300 line-clamp-2 italic">
                    "{res.textEnglish}"
                  </p>
                </div>
              ))}

              {searchResults.length === 0 && (
                <div className="py-12 text-center text-xs text-stone-500">
                  No questions match "{searchQuery}". Try exploring by Broader Topics above.
                </div>
              )}
            </div>
          ) : viewMode === 'categories_explorer' ? (
            /* =========================================================================
                TIER 1: 10 BROADER TOPICS TILES (BEAUTIFUL VISUAL TILES)
                ========================================================================= */
            <div className="flex-1 min-h-0 overflow-y-auto p-3.5 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-bold text-stone-500 px-1">
                <span>10 Broader Thematic Spheres</span>
                <span>Select to View Sub-Topics</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {broaderCategories.map((cat, idx) => (
                  <div
                    key={cat.category}
                    onClick={() => handleSelectCategory(cat.category)}
                    className="p-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-black dark:hover:border-white shadow-2xs cursor-pointer transition-all active:scale-[0.98] space-y-2.5 group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-xl shadow-xs">
                        {cat.icon}
                      </div>

                      <span className="font-quran text-sm font-bold text-amber-600 dark:text-amber-400" dir="rtl">
                        {cat.arabicName}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-sm font-bold text-black dark:text-white font-cinzel group-hover:text-amber-600 transition-colors">
                        {cat.category}
                      </h2>
                      <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mt-0.5">
                        {CATEGORY_METADATA[cat.category]?.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[11px] font-bold">
                      <span className="text-stone-500">
                        {cat.subTopicCount} Chapters
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-[10px]">
                        {cat.questionCount} Questions →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* =========================================================================
                TIER 2: SUB-TOPICS LIST UNDER SELECTED BROADER TOPIC
                ========================================================================= */
            <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] text-stone-500 font-bold px-1">
                <span>{filteredSubTopics.length} Sub-Topics under {selectedCategory}</span>
                <span>Swipeable Question Decks</span>
              </div>

              {filteredSubTopics.map((subTopic) => (
                <div
                  key={subTopic.id}
                  onClick={() => handleOpenChapter(subTopic.id)}
                  className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-black dark:hover:border-white shadow-2xs cursor-pointer transition-all active:scale-[0.99] space-y-2 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 flex items-center justify-center font-mono text-[11px] font-bold">
                        {subTopic.number}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[10px] font-bold">
                        {subTopic.category}
                      </span>
                    </div>

                    <span className="font-quran text-xs text-stone-700 dark:text-stone-300 font-bold" dir="rtl">
                      {subTopic.nameArabic}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-black dark:text-white font-cinzel group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                      {subTopic.nameEnglish}
                    </h3>
                    <p className="text-[11.5px] text-stone-600 dark:text-stone-300 line-clamp-2 mt-0.5 leading-relaxed">
                      "{subTopic.primaryQuestion}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-[10.5px]">
                    <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-800 dark:text-amber-300 font-bold text-[10px]">
                      {subTopic.questionCount} Reflective Questions
                    </span>
                    <span className="font-bold text-black dark:text-white flex items-center gap-1">
                      <span>Start Slides</span>
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TIER 3: HORIZONTAL SLIDING QUESTIONS DECK (OVER 1,100+ QUESTIONS OFFLINE)
          ========================================================================= */}
      {viewMode === 'slide_reader' && (
        <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
          {/* Reader App Bar Header */}
          <header className="shrink-0 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-3.5 py-2.5 flex items-center justify-between gap-2 shadow-2xs">
            <div className="flex items-center gap-2 min-w-0">
              <button
                onClick={() => setViewMode('chapters_list')}
                className="p-1.5 -ml-1 text-black dark:text-white rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title="Back to Sub-Topics"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
              </button>

              <div className="min-w-0">
                <h1 className="text-sm font-bold text-black dark:text-white font-cinzel leading-none truncate">
                  {activeChapter.number}. {activeChapter.nameEnglish}
                </h1>
                <p className="text-[10.5px] text-stone-500 dark:text-stone-400 font-semibold truncate mt-0.5">
                  Question {slideIndex + 1} of {currentChapterQuestions.length} · Global #{currentQuestion?.globalIndex || 1}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setViewMode('chapters_list')}
                className="py-1.5 px-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black hover:opacity-90 text-xs font-bold transition-all flex items-center gap-1"
                title="Browse Sub-Topics"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Sub-Topics</span>
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
                    Question {slideIndex + 1} / {currentChapterQuestions.length}
                  </span>
                  <span className="text-stone-400">·</span>
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 truncate">
                    {activeChapter.category}
                  </span>
                </div>

                {/* Clickable Reference Badge */}
                <button
                  onClick={() => handleOpenReferenceModal(currentQuestion)}
                  className="px-2.5 py-1 rounded-xl bg-black text-white dark:bg-white dark:text-black font-cinzel text-[11px] font-bold flex items-center gap-1 shadow-2xs hover:opacity-90 active:scale-95 transition-all shrink-0"
                  title="Click to view verified source"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
                  <span>{currentQuestion.reference.split(',')[0]}</span>
                </button>
              </div>

              {/* Slide Body (Scrollable, Clean Dark Calligraphy, Zero Urdu) */}
              <div className="flex-1 min-h-0 flex flex-col justify-start py-1 overflow-y-auto overscroll-contain space-y-3 pr-1 scrollbar-thin">
                {/* Specific Contemplative Question */}
                <div className="text-center px-1 shrink-0 space-y-1">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-900 dark:text-amber-300 font-bold text-[10px] uppercase tracking-wider">
                    Inquiry on {activeChapter.nameEnglish}
                  </span>
                  <h2 className="font-serif italic text-base sm:text-lg font-bold text-stone-950 dark:text-stone-50 leading-snug">
                    "{currentQuestion.question}"
                  </h2>
                </div>

                {/* Primary Narrator Introduction */}
                <div className="text-center text-xs font-semibold text-stone-600 dark:text-stone-400 shrink-0">
                  <span>Prophetic Tradition narrated by: </span>
                  <strong className="text-black dark:text-white font-bold">
                    {currentQuestion.narrator}
                  </strong>
                </div>

                {/* Clean, Dark Arabic Font */}
                <div className="pt-1 text-right select-text leading-[2.3]" dir="rtl">
                  <p className="font-quran text-base sm:text-lg text-stone-950 dark:text-stone-50 leading-[2.4] font-bold font-arabic-clean select-text">
                    {currentQuestion.textArabic}
                  </p>
                </div>

                {/* Classical English Translation (Zero Urdu) */}
                <div className="pt-2 border-t border-stone-200 dark:border-stone-800 text-left select-text">
                  <p className="font-book-serif text-[14px] sm:text-[15.5px] leading-[1.8] text-stone-900 dark:text-stone-100">
                    "{currentQuestion.textEnglish}"
                  </p>
                </div>

                {/* Practical Takeaway / Key Lesson Card */}
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-0.5">
                  <span className="font-bold text-[10px] uppercase tracking-wider text-amber-800 dark:text-amber-300">
                    Prophetic Life Takeaway
                  </span>
                  <p className="text-stone-800 dark:text-stone-200 font-medium">
                    {currentQuestion.keyLesson}
                  </p>
                </div>

                {/* Clickable Verification Citation Link */}
                <div className="pt-1 text-center">
                  <button
                    onClick={() => handleOpenReferenceModal(currentQuestion)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:underline"
                  >
                    <span>Source: {currentQuestion.reference} ({currentQuestion.grade})</span>
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Slider Scrubber */}
              <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-bold text-stone-700 dark:text-stone-300 shrink-0 font-mono">
                  {slideIndex + 1} / {currentChapterQuestions.length}
                </span>
                <input
                  type="range"
                  min="1"
                  max={currentChapterQuestions.length}
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
                onClick={handleCopyQuestionHadith}
                className="p-2.5 rounded-2xl border-2 border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white hover:bg-stone-100 dark:hover:bg-stone-800 font-bold transition-all active:scale-95 shadow-xs"
                title="Copy Question & Hadith"
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

      {/* Reference Verification Modal */}
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
