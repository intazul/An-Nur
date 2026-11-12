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
  Hash,
} from 'lucide-react';
import {
  HADITH_CHAPTER_TOPICS,
  HADITH_TOPIC_CATEGORIES,
} from '../data/hadithChapters';
import {
  HadithQuestionRecord,
  getAllHadithQuestions,
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

  // Search query across all 10,000+ questions
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Copy feedback state
  const [copied, setCopied] = useState<boolean>(false);

  // Reference modal state
  const [referenceModalItem, setReferenceModalItem] = useState<SahihHadithItem | null>(null);

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

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
    currentChapterQuestions[slideIndex] || currentChapterQuestions[0] || {
      id: 'default',
      globalIndex: 1,
      chapterTopicId: 'intentions-sincerity',
      chapterNumber: 1,
      subTopicTitle: 'Intentions & Sincerity',
      category: 'Faith & Creed',
      question: 'What determines the true value and acceptance of human deeds?',
      textArabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
      textEnglish: 'Actions are judged by motives and intentions, and every person will have only that which they intended.',
      narrator: 'Umar ibn al-Khattab (RA)',
      reference: 'Sahih al-Bukhari 1, Sahih Muslim 1907',
      book: 'Sahih al-Bukhari',
      grade: 'Sahih (Muttafaq Alayh)',
      keyLesson: 'Purify your heart before every deed; a sincere intention elevates even mundane daily acts into worship.',
    };

  // Global search results across all 10,000+ questions
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return [];
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
    setSearchQuery('');
  };

  const handleOpenChapter = (chapterId: string, targetQuestionIndex: number = 0) => {
    setActiveChapterId(chapterId);
    setSlideIndex(Math.max(0, targetQuestionIndex));
    setSlideAnimation('none');
    setViewMode('slide_reader');
    setSearchQuery('');
  };

  const goToNextSlide = () => {
    if (slideIndex < currentChapterQuestions.length - 1) {
      setSlideAnimation('next');
      setSlideIndex((prev) => prev + 1);
    } else {
      // Loop to next subtopic
      const currentSubTopicIdx = subTopicsList.findIndex((st) => st.id === activeChapterId);
      const nextIdx = (currentSubTopicIdx + 1) % subTopicsList.length;
      setActiveChapterId(subTopicsList[nextIdx].id);
      setSlideIndex(0);
      setSlideAnimation('next');
    }
  };

  const goToPrevSlide = () => {
    if (slideIndex > 0) {
      setSlideAnimation('prev');
      setSlideIndex((prev) => prev - 1);
    } else {
      // Loop to previous subtopic end
      const currentSubTopicIdx = subTopicsList.findIndex((st) => st.id === activeChapterId);
      const prevIdx = (currentSubTopicIdx - 1 + subTopicsList.length) % subTopicsList.length;
      const prevTopic = subTopicsList[prevIdx];
      const prevTopicQuestions = getQuestionsByChapterId(prevTopic.id);
      setActiveChapterId(prevTopic.id);
      setSlideIndex(Math.max(0, prevTopicQuestions.length - 1));
      setSlideAnimation('prev');
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'slide_reader') return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevSlide();
      } else if (e.key === 'Escape') {
        setViewMode('chapters_list');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, slideIndex, currentChapterQuestions.length]);

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
    const shareText = `Inquiry: ${currentQuestion.question}\n\nChapter: ${currentQuestion.subTopicTitle} (${currentQuestion.category})\n\nArabic:\n${currentQuestion.textArabic}\n\nTranslation:\n"${currentQuestion.textEnglish}"\n\nNarrated by: ${currentQuestion.narrator}\nSource: ${currentQuestion.reference} (${currentQuestion.grade})\n\nTakeaway: ${currentQuestion.keyLesson}\n\n— An-Nur Offline Hadith Journey`;

    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenReferenceModal = (q: HadithQuestionRecord) => {
    const item: SahihHadithItem = {
      id: q.id,
      collectionId: 'bukhari',
      collectionName: q.book,
      hadithNumber: q.globalIndex,
      reference: q.reference,
      bookName: q.book,
      chapterName: q.subTopicTitle,
      chapterTopicId: q.chapterTopicId,
      grade: q.grade,
      narrator: q.narrator,
      narratorArabic: 'رضي الله عنه',
      isnadBrief: 'Authentic prophetic chain of transmission',
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
      className="flex-1 flex flex-col max-w-xl sm:max-w-2xl w-full mx-auto bg-stone-50 dark:bg-stone-950 h-full max-h-screen overflow-hidden select-none pb-2"
      style={{ touchAction: 'pan-x', overscrollBehavior: 'none' }}
    >
      {/* =========================================================================
          TIER 1 & 2: BROADER TOPICS EXPLORER & SUB-TOPICS LIST
          ========================================================================= */}
      {viewMode !== 'slide_reader' && (
        <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
          {/* Header */}
          <header className="shrink-0 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 py-3 flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2.5 min-w-0">
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
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-bold text-black dark:text-white font-cinzel leading-none truncate">
                    Hadith’s Journey
                  </h1>
                </div>
                <p className="text-[10.5px] text-stone-500 dark:text-stone-400 font-semibold truncate mt-0.5">
                  {viewMode === 'categories_explorer'
                    ? `10 Broader Spheres · ${HADITH_CHAPTER_TOPICS.length} Chapters · 100% Offline`
                    : `${selectedCategory} · ${subTopicsList.length} Chapters`}
                </p>
              </div>
            </div>

            {viewMode === 'chapters_list' && (
              <button
                onClick={() => setViewMode('categories_explorer')}
                className="px-3 py-1.5 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold hover:opacity-90 transition-all shadow-2xs"
              >
                Spheres ↗
              </button>
            )}
          </header>

          {/* Quick Offline Search Bar */}
          <div className="shrink-0 p-3.5 bg-stone-100 dark:bg-stone-900/90 border-b border-stone-200 dark:border-stone-800 space-y-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search hadiths, topics, or narrators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-2xl text-xs text-black dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
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
                className={`snap-start shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'categories_explorer' && selectedCategory === 'All Topics'
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-2xs'
                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
                }`}
              >
                All 10 Spheres
              </button>

              {broaderCategories.map((cat) => {
                const isSelected = selectedCategory === cat.category && viewMode === 'chapters_list';
                return (
                  <button
                    key={cat.category}
                    onClick={() => handleSelectCategory(cat.category)}
                    className={`snap-start shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-black text-white dark:bg-white dark:text-black shadow-2xs'
                        : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-stone-400'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.category}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Results Dropdown (if searching) */}
          {searchQuery.trim().length >= 2 ? (
            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3">
              {searchResults.map((res) => (
                <div
                  key={res.id}
                  onClick={() => handleOpenChapter(res.chapterTopicId)}
                  className="p-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-black dark:hover:border-white shadow-xs cursor-pointer transition-all active:scale-[0.99] space-y-2"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="px-2.5 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-800 font-bold text-black dark:text-white">
                      #{res.globalIndex} · {res.category}
                    </span>
                    <span className="font-bold text-black dark:text-white">
                      {res.reference.split('·')[0]}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-black dark:text-white font-cinzel leading-snug">
                    "{res.question}"
                  </h3>

                  <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 italic leading-relaxed">
                    "{res.textEnglish}"
                  </p>
                </div>
              ))}

              {searchResults.length === 0 && (
                <div className="py-16 text-center text-xs text-stone-500">
                  No questions match "{searchQuery}". Try exploring by Broader Topics above.
                </div>
              )}
            </div>
          ) : viewMode === 'categories_explorer' ? (
            /* =========================================================================
                TIER 1: BROADER TOPICS TILES (LUXURY CARDS)
                ========================================================================= */
            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {broaderCategories.map((cat) => (
                  <div
                    key={cat.category}
                    onClick={() => handleSelectCategory(cat.category)}
                    className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-black dark:hover:border-white shadow-xs cursor-pointer transition-all active:scale-[0.98] space-y-3 group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-11 h-11 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-2xl shadow-xs group-hover:scale-110 transition-transform">
                        {cat.icon}
                      </div>

                      <span className="font-quran text-sm font-bold text-black dark:text-white" dir="rtl">
                        {cat.arabicName}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-sm font-bold text-black dark:text-white font-cinzel transition-colors">
                        {cat.category}
                      </h2>
                      <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mt-1 leading-relaxed">
                        {CATEGORY_METADATA[cat.category]?.description}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-bold">
                      <span className="text-stone-500">
                        {cat.subTopicCount} Chapters
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-black text-white dark:bg-white dark:text-black text-[10.5px]">
                        Explore Chapters →
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
            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3">
              {filteredSubTopics.map((subTopic) => (
                <div
                  key={subTopic.id}
                  onClick={() => handleOpenChapter(subTopic.id)}
                  className="p-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-black dark:hover:border-white shadow-xs cursor-pointer transition-all active:scale-[0.99] space-y-2 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 flex items-center justify-center font-mono text-xs font-bold">
                        #{subTopic.number}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[10.5px] font-bold">
                        {subTopic.category}
                      </span>
                    </div>

                    <span className="font-quran text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-bold" dir="rtl">
                      {subTopic.nameArabic}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-black dark:text-white font-cinzel transition-colors">
                      {subTopic.nameEnglish}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 mt-1 leading-relaxed">
                      "{subTopic.primaryQuestion}"
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs font-bold">
                    <span className="text-black dark:text-white flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Explore Deck →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TIER 3: SLIDE READER VIEW (HORIZONTAL SWIPEABLE QUESTION DECK)
          ========================================================================= */}
      {viewMode === 'slide_reader' && (
        <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
          {/* Top Bar for Slide Reader */}
          <header className="shrink-0 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 py-3 flex items-center justify-between gap-2 shadow-2xs">
            <div className="flex items-center gap-2 min-w-0">
              <button
                onClick={() => setViewMode('chapters_list')}
                className="p-1.5 -ml-1 text-black dark:text-white rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title="Back to Chapters List"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
              </button>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-bold text-black dark:text-white">
                    Ch #{activeChapter.number}
                  </span>
                  <span className="text-stone-300 dark:text-stone-700">·</span>
                  <h1 className="text-sm font-bold text-black dark:text-white font-cinzel truncate">
                    {activeChapter.nameEnglish}
                  </h1>
                </div>
                <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate mt-0.5">
                  {activeChapter.category} · Question {slideIndex + 1} of {currentChapterQuestions.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setViewMode('chapters_list')}
                className="py-1.5 px-3 rounded-xl bg-black text-white dark:bg-white dark:text-black hover:opacity-90 text-xs font-bold transition-all flex items-center gap-1 shadow-2xs"
                title="Browse Sub-Topics"
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
            className="flex-1 min-h-0 flex flex-col justify-between p-3 sm:p-4 overflow-hidden select-none"
          >
            {/* Slide Card */}
            <div
              onAnimationEnd={() => setSlideAnimation('none')}
              className={`flex-1 min-h-0 flex flex-col justify-between p-5 sm:p-6 rounded-3xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 shadow-md text-left overflow-hidden ${
                slideAnimation === 'next'
                  ? 'animate-slide-next'
                  : slideAnimation === 'prev'
                  ? 'animate-slide-prev'
                  : ''
              }`}
            >
              {/* Slide Top Metadata Bar */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-stone-200 dark:border-stone-800 text-xs shrink-0">
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <span className="font-cinzel text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                    Question {slideIndex + 1} / {currentChapterQuestions.length}
                  </span>
                  <span className="text-stone-300 dark:text-stone-700">·</span>
                  <span className="text-[11px] font-bold text-black dark:text-white truncate">
                    Global #{currentQuestion.globalIndex}
                  </span>
                </div>

                {/* Clickable Reference Badge */}
                <button
                  onClick={() => handleOpenReferenceModal(currentQuestion)}
                  className="px-3 py-1 rounded-xl bg-black text-white dark:bg-white dark:text-black font-cinzel text-[11px] font-bold flex items-center gap-1.5 shadow-2xs hover:opacity-90 active:scale-95 transition-all shrink-0"
                  title="Click to view verified source"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-white dark:text-black" />
                  <span>{currentQuestion.reference.split('·')[0].trim()}</span>
                </button>
              </div>

              {/* Slide Body (Scrollable, Clean Dark Calligraphy) */}
              <div className="flex-1 min-h-0 flex flex-col justify-start py-1 overflow-y-auto overscroll-contain space-y-4 pr-1 scrollbar-thin">
                {/* Specific Contemplative Question */}
                <div className="text-center px-1 shrink-0 space-y-1.5">
                  <span className="inline-block px-3 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold text-[10.5px] uppercase tracking-wider border border-black dark:border-white">
                    Inquiry on {activeChapter.nameEnglish}
                  </span>
                  <h2 className="font-cinzel text-base sm:text-lg font-bold text-stone-950 dark:text-stone-50 leading-snug">
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
                <div className="pt-2 text-right select-text leading-[2.4]" dir="rtl">
                  <p className="font-quran text-base sm:text-lg text-stone-950 dark:text-stone-50 leading-[2.5] font-bold font-arabic-clean select-text">
                    {currentQuestion.textArabic}
                  </p>
                </div>

                {/* Classical English Translation (Zero Urdu) */}
                <div className="pt-3 border-t border-stone-200 dark:border-stone-800 text-left select-text">
                  <p className="font-book-serif text-[14px] sm:text-[15.5px] leading-[1.8] text-stone-900 dark:text-stone-100">
                    "{currentQuestion.textEnglish}"
                  </p>
                </div>

                {/* Practical Takeaway / Key Lesson Card */}
                <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs space-y-1">
                  <span className="font-bold text-[10.5px] uppercase tracking-wider text-black dark:text-white block">
                    Prophetic Life Takeaway (حِكْمَة نَبَوِيَّة)
                  </span>
                  <p className="text-stone-800 dark:text-stone-200 font-medium leading-relaxed">
                    {currentQuestion.keyLesson}
                  </p>
                </div>

                {/* Clickable Verification Citation Link */}
                <div className="pt-1 text-center">
                  <button
                    onClick={() => handleOpenReferenceModal(currentQuestion)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-black dark:text-white hover:underline"
                  >
                    <span>Source: {currentQuestion.reference} ({currentQuestion.grade})</span>
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Slider Scrubber */}
              <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center gap-3 shrink-0">
                <span className="text-[10.5px] font-bold text-stone-700 dark:text-stone-300 shrink-0 font-mono">
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

            {/* Slide Navigation Buttons - No sections or tabs below */}
            <div className="mt-3 flex items-center justify-between gap-2 shrink-0">
              <button
                onClick={goToPrevSlide}
                className="flex-1 py-3 px-4 rounded-2xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                title="Previous Question"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleCopyQuestionHadith}
                className="p-3 rounded-2xl border-2 border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white hover:bg-stone-100 dark:hover:bg-stone-800 font-bold transition-all active:scale-95 shadow-xs"
                title="Copy Question & Hadith"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-black dark:text-white" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={goToNextSlide}
                className="flex-1 py-3 px-4 rounded-2xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
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
