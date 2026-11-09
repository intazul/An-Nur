import React, { useState, useRef, useMemo } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Compass,
  ShieldCheck,
  Copy,
  Check,
  Bookmark,
  Share2,
  Sparkles,
  Info,
  Layers,
  Search,
  X,
} from 'lucide-react';
import { SAHIH_BOOKS, ALL_SAHIH_HADITHS } from '../data/sahihHadiths';
import { HadithBook, SahihHadithItem } from '../types/hadith';
import { HadithReferenceModal } from './HadithReferenceModal';

interface HadithLibraryViewProps {
  onBackToDashboard: () => void;
  onStartJourney: () => void;
}

export const HadithLibraryView: React.FC<HadithLibraryViewProps> = ({
  onBackToDashboard,
  onStartJourney,
}) => {
  // Active Book state
  const [activeBookId, setActiveBookId] = useState<string>('bukhari');
  // Slide index within the currently open book (0-indexed)
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [slideAnimation, setSlideAnimation] = useState<'next' | 'prev' | 'none'>('none');
  const [showBookCoverModal, setShowBookCoverModal] = useState<boolean>(false);
  const [activeReferenceHadith, setActiveReferenceHadith] = useState<SahihHadithItem | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const activeBook: HadithBook =
    SAHIH_BOOKS.find((b) => b.id === activeBookId) || SAHIH_BOOKS[0];

  // All Hadiths present inside this particular book
  const bookHadiths: SahihHadithItem[] = useMemo(() => {
    return ALL_SAHIH_HADITHS.filter((h) => h.collectionId === activeBook.id);
  }, [activeBook.id]);

  const currentHadith: SahihHadithItem | undefined =
    bookHadiths[slideIndex] || bookHadiths[0];

  const handleSelectBook = (bookId: string) => {
    setActiveBookId(bookId);
    setSlideIndex(0);
    setSlideAnimation('none');
  };

  // Horizontal Slide Navigation inside the active book
  const goToNextSlide = () => {
    if (slideIndex < bookHadiths.length - 1) {
      setSlideAnimation('next');
      setSlideIndex((prev) => prev + 1);
    } else {
      // Loop or go to next book
      const currentBookIdx = SAHIH_BOOKS.findIndex((b) => b.id === activeBookId);
      const nextBookIdx = (currentBookIdx + 1) % SAHIH_BOOKS.length;
      setActiveBookId(SAHIH_BOOKS[nextBookIdx].id);
      setSlideIndex(0);
      setSlideAnimation('next');
    }
  };

  const goToPrevSlide = () => {
    if (slideIndex > 0) {
      setSlideAnimation('prev');
      setSlideIndex((prev) => prev - 1);
    } else {
      // Loop or go to previous book
      const currentBookIdx = SAHIH_BOOKS.findIndex((b) => b.id === activeBookId);
      const prevBookIdx = (currentBookIdx - 1 + SAHIH_BOOKS.length) % SAHIH_BOOKS.length;
      const prevBook = SAHIH_BOOKS[prevBookIdx];
      const prevBookItems = ALL_SAHIH_HADITHS.filter((h) => h.collectionId === prevBook.id);
      setActiveBookId(prevBook.id);
      setSlideIndex(Math.max(0, prevBookItems.length - 1));
      setSlideAnimation('prev');
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

  const handleCopy = () => {
    if (!currentHadith) return;
    const text = `[${currentHadith.reference}]\n` +
      `Narrator: ${currentHadith.narrator}\n\n` +
      `${currentHadith.textArabic}\n\n` +
      `"${currentHadith.textEnglish}"\n\n` +
      `Key Takeaway: ${currentHadith.keyLesson}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="flex-1 flex flex-col max-w-md w-full mx-auto bg-stone-50 dark:bg-stone-950 h-full max-h-screen overflow-hidden select-none pb-1"
      style={{ touchAction: 'pan-x', overscrollBehavior: 'none' }}
    >
      {/* 1. App Bar Header */}
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
              {activeBook.nameEnglish}
            </h1>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 font-semibold truncate mt-0.5">
              Hadith {slideIndex + 1} of {bookHadiths.length} in this Book
            </p>
          </div>
        </div>

        {/* PRIMARY "START HADITH JOURNEY" BUTTON INSIDE HADITH READING */}
        <button
          onClick={onStartJourney}
          className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-stone-900 via-black to-stone-900 text-white hover:opacity-95 dark:from-stone-100 dark:via-white dark:to-stone-100 dark:text-black font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95 shrink-0 border border-stone-700/60 dark:border-stone-300"
          title="Start Questions-Based Hadith Journey"
        >
          <Compass className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600 stroke-[2.5]" />
          <span className="tracking-tight">Hadith Journey</span>
        </button>
      </header>

      {/* 2. Canonical Book Selector Shelf (Horizontal Book Tabs with Authentic Covers) */}
      <div className="shrink-0 px-3 py-2 bg-stone-100 dark:bg-stone-900/90 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center justify-between pb-1.5 px-0.5 text-[10.5px]">
          <span className="font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
            Choose Hadith Book:
          </span>
          <button
            onClick={() => setShowBookCoverModal(true)}
            className="text-stone-700 dark:text-stone-300 font-bold hover:underline flex items-center gap-1 text-[10.5px]"
          >
            <Info className="w-3 h-3 text-amber-600 dark:text-amber-400" />
            <span>Book Cover & Info</span>
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
          {SAHIH_BOOKS.map((book) => {
            const isSelected = activeBookId === book.id;
            return (
              <button
                key={book.id}
                onClick={() => handleSelectBook(book.id)}
                className={`snap-start shrink-0 px-3 py-1.5 rounded-xl border text-left transition-all active:scale-95 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-xs font-bold'
                    : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-300 border-stone-200 dark:border-stone-700 font-medium hover:border-stone-400'
                }`}
              >
                <div
                  className={`w-2 h-5 rounded-sm bg-gradient-to-b ${book.coverGradient}`}
                />
                <div className="text-left leading-tight">
                  <div className="text-xs truncate font-cinzel">{book.nameEnglish.replace('Sahih ', '')}</div>
                  <div className="text-[9px] opacity-75 font-quran" dir="rtl">
                    {book.nameArabic.split(' ')[0]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Horizontal Scrolling Slide for This Particular Book */}
      {currentHadith && (
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex-1 min-h-0 flex flex-col justify-between p-2.5 sm:p-3 overflow-hidden select-none"
        >
          {/* Physical Book Page Slide Card */}
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
            {/* Slide Top Bar: Book Chapter & Clickable Reference Badge */}
            <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-stone-200 dark:border-stone-800 text-xs shrink-0">
              <div className="flex items-center gap-1.5 min-w-0 pr-2">
                <span className="font-cinzel text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                  {currentHadith.bookName}
                </span>
                <span className="text-stone-400">·</span>
                <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 truncate">
                  {currentHadith.categoryLabel}
                </span>
              </div>

              {/* Clickable Reference Badge (Interactive verification modal) */}
              <button
                onClick={() => setActiveReferenceHadith(currentHadith)}
                className="px-2.5 py-1 rounded-xl bg-black text-white dark:bg-white dark:text-black font-cinzel text-[11px] font-bold flex items-center gap-1 shadow-2xs hover:opacity-90 active:scale-95 transition-all shrink-0"
                title="Click to view verified source & transmission chain"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
                <span>{currentHadith.reference}</span>
              </button>
            </div>

            {/* Slide Body (Scrollable if needed, zero clipping of letters) */}
            <div className="flex-1 min-h-0 flex flex-col justify-start py-1 overflow-y-auto overscroll-contain space-y-3.5 pr-1 scrollbar-thin">
              {/* Primary Narrator Introduction */}
              <div className="text-xs font-semibold text-stone-600 dark:text-stone-400 flex items-center justify-between shrink-0">
                <span>
                  Narrated by: <strong className="text-black dark:text-white font-bold">{currentHadith.narrator}</strong>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold text-[9.5px]">
                  صحيح · Authentic
                </span>
              </div>

              {/* Clean Dark Arabic Calligraphy (Glowing effect removed for pure clarity) */}
              <div className="pt-1 text-right select-text leading-[2.3]" dir="rtl">
                <p className="font-quran text-base sm:text-lg text-stone-950 dark:text-stone-50 leading-[2.4] font-bold font-arabic-clean select-text">
                  {currentHadith.textArabic}
                </p>
              </div>

              {/* Classical Book-Serif English Translation (Lora / Crimson Pro) */}
              <div className="pt-2.5 border-t border-stone-200 dark:border-stone-800 text-left select-text">
                <p className="font-book-serif text-[14px] sm:text-[15.5px] leading-[1.8] text-stone-900 dark:text-stone-100">
                  "{currentHadith.textEnglish}"
                </p>
              </div>


              {/* Practical Lesson Takeaway Card */}
              <div className="p-3 rounded-2xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-stone-800 dark:text-stone-200 font-bold uppercase tracking-wider text-[10px]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Practical Sunnah Takeaway</span>
                </div>
                <p className="text-stone-900 dark:text-stone-200 font-medium leading-relaxed">
                  {currentHadith.keyLesson}
                </p>
              </div>

              {/* Clickable Reference Citation */}
              <div className="pt-1 text-center">
                <button
                  onClick={() => setActiveReferenceHadith(currentHadith)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:underline"
                >
                  <span>Verification: {currentHadith.reference} ({currentHadith.bookName})</span>
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Slider Scrubber for this Book */}
            <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-bold text-stone-700 dark:text-stone-300 shrink-0 font-mono">
                {slideIndex + 1} / {bookHadiths.length}
              </span>
              <input
                type="range"
                min="1"
                max={bookHadiths.length}
                value={slideIndex + 1}
                onChange={(e) => setSlideIndex(Number(e.target.value) - 1)}
                className="w-full h-1.5 bg-stone-300 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white"
              />
            </div>
          </div>

          {/* Horizontal Slide Navigation Buttons (High-contrast Tactile Black/White) */}
          <div className="mt-2 flex items-center justify-between gap-2 shrink-0">
            <button
              onClick={goToPrevSlide}
              className="flex-1 py-2.5 px-3 rounded-2xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
              title="Previous Hadith Slide (or swipe right)"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              <span>{slideIndex === 0 ? 'Prev Book' : 'Previous'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="p-2.5 rounded-2xl border-2 border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-white hover:bg-stone-100 dark:hover:bg-stone-800 font-bold transition-all active:scale-95 shadow-xs"
              title="Copy Hadith"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={goToNextSlide}
              className="flex-1 py-2.5 px-3 rounded-2xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
              title="Next Hadith Slide (or swipe left)"
            >
              <span>{slideIndex === bookHadiths.length - 1 ? 'Next Book' : 'Next Hadith'}</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}

      {/* 4. Book Cover Page Modal */}
      {showBookCoverModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in select-none">
          <div
            className="w-full max-w-sm rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Book Cover Design */}
            <div
              className={`p-6 bg-gradient-to-br ${activeBook.coverGradient} text-white space-y-2 relative border-b border-white/10`}
            >
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-bold text-[10px] uppercase tracking-wider">
                {activeBook.authenticity}
              </span>
              <h2 className="text-xl font-bold font-cinzel">{activeBook.nameEnglish}</h2>
              <p className="font-quran text-lg text-amber-200 font-bold" dir="rtl">
                {activeBook.nameArabic}
              </p>
              <p className="text-xs text-stone-300 font-medium pt-1">
                Compiled by: {activeBook.authorEnglish}
              </p>
            </div>

            <div className="p-4 space-y-3 text-xs">
              <div>
                <strong className="text-black dark:text-white block font-bold mb-0.5">About this Collection:</strong>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                  {activeBook.description}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-between text-xs">
                <span className="text-stone-500">Total Canonical Hadiths:</span>
                <span className="font-mono font-bold text-black dark:text-white">
                  {activeBook.totalHadiths.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-3.5 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 flex items-center justify-end">
              <button
                onClick={() => setShowBookCoverModal(false)}
                className="py-2 px-5 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-xs shadow-xs"
              >
                Close Cover
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Clickable Reference Verification Modal */}
      <HadithReferenceModal
        isOpen={Boolean(activeReferenceHadith)}
        onClose={() => setActiveReferenceHadith(null)}
        hadith={activeReferenceHadith}
      />
    </div>
  );
};
