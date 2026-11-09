import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  Settings,
  ChevronLeft,
  ChevronRight,
  Download,
  Check,
  Play,
  Pause,
  Bookmark,
  BookOpen,
  Loader2,
  Volume2,
  Star,
  Quote,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { ALL_SURAHS } from '../data/surahList';
import { Ayah, LastReadPosition, SurahDetail, UserProfileData, WaqfSignInfo } from '../types/quran';
import { getRelatedHadith } from '../utils/hadithDatabase';
import { getVerseWaqfSigns } from '../data/tajweedSigns';
import { getThematicParagraphs, ThematicParagraph } from '../utils/thematicQuran';
import { TajweedSignHelpDialog } from './TajweedSignHelpDialog';

interface AndroidReadingViewProps {
  currentSurah: SurahDetail | null;
  isLoading: boolean;
  onBackToDashboard: () => void;
  onSelectSurah: (surahNum: number) => void;
  profile: UserProfileData;
  onUpdateProfile: (updates: Partial<UserProfileData>) => void;
  onOpenSettings: () => void;
  onOpenSearch: () => void;
  onOpenTafsir: (ayah: Ayah) => void;
  onAddBookmark: (ayahNumber: number, timestampSeconds: number) => void;
  onDownloadSurah: (surahNum: number) => Promise<void>;
  isDownloaded: boolean;
  onVerseRead: () => void;
  onPlayAyahInReciter: (ayahNumber: number) => void;
  activePlayingAyah: number | null;
  isPlayingAudio: boolean;
  onToggleAudioPlayPause: () => void;
  onToggleFavoriteSurah: (surahNum: number) => void;
  isFavoriteSurah: boolean;
  onUpdateLastRead: (position: LastReadPosition) => void;
  initialTargetAyah?: number;
  initialFullScreen?: boolean;
}

export const AndroidReadingView: React.FC<AndroidReadingViewProps> = ({
  currentSurah,
  isLoading,
  onBackToDashboard,
  onSelectSurah,
  profile,
  onUpdateProfile,
  onOpenSettings,
  onOpenSearch,
  onOpenTafsir,
  onAddBookmark,
  onDownloadSurah,
  isDownloaded,
  onVerseRead,
  onPlayAyahInReciter,
  activePlayingAyah,
  isPlayingAudio,
  onToggleAudioPlayPause,
  onToggleFavoriteSurah,
  isFavoriteSurah,
  onUpdateLastRead,
  initialTargetAyah,
  initialFullScreen = true,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [expandedHadithAyah, setExpandedHadithAyah] = useState<number | null>(null);
  const [selectedWaqfSign, setSelectedWaqfSign] = useState<WaqfSignInfo | null>(null);
  const [selectedParagraphAyah, setSelectedParagraphAyah] = useState<number | null>(null);

  // 1. Thematic Paragraph Study Mode (Topic Names, Reflective Questions & Small Noticeable Letters)
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState<number>(0);
  const [paragraphAnimation, setParagraphAnimation] = useState<'next' | 'prev' | 'none'>('none');

  // 2. Pure Arabic Mushaf Mode
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [flipAnimation, setFlipAnimation] = useState<'next' | 'prev' | 'none'>('none');

  // 3. Verse-by-Verse Slide Cards Mode
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [cardAnimation, setCardAnimation] = useState<'next' | 'prev' | 'none'>('none');

  // Full Screen Mode is active by default when opening from Surah list
  const [isFullScreenMode, setIsFullScreenMode] = useState<boolean>(initialFullScreen);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const surahNum = currentSurah?.number || 1;
  const prevSurahNum = surahNum > 1 ? surahNum - 1 : 114;
  const nextSurahNum = surahNum < 114 ? surahNum + 1 : 1;

  const currentLayout = profile.readingLayout || 'thematic';
  const isThematicMode = currentLayout === 'thematic';
  const isParagraphMode = currentLayout === 'paragraph';
  const isCardsMode = currentLayout === 'cards';
  const mushafFontSize = Math.max(22, profile.mushafFontSize || 22);

  // Compute Thematic Paragraphs for the current Surah
  const thematicParagraphs: ThematicParagraph[] = useMemo(() => {
    if (!currentSurah) return [];
    return getThematicParagraphs(currentSurah);
  }, [currentSurah]);

  // Chunk Surah Ayahs into discrete pages for Horizontal Page Mushaf mode
  // Target ~320 chars per page ensures no page overflows the screen vertically
  const mushafPages = useMemo(() => {
    if (!currentSurah || currentSurah.ayahs.length === 0) return [];

    if (currentSurah.ayahs.length <= 7) {
      return [currentSurah.ayahs];
    }

    const pages: Ayah[][] = [];
    let currentPage: Ayah[] = [];
    let charCount = 0;
    const TARGET_CHARS = 320;

    for (const ayah of currentSurah.ayahs) {
      const len = ayah.textArabic.length;
      if (currentPage.length > 0 && charCount + len > TARGET_CHARS) {
        pages.push(currentPage);
        currentPage = [ayah];
        charCount = len;
      } else {
        currentPage.push(ayah);
        charCount += len;
      }
    }

    if (currentPage.length > 0) {
      pages.push(currentPage);
    }

    return pages;
  }, [currentSurah]);

  // Synchronize target verse on load or Surah selection
  useEffect(() => {
    if (!currentSurah || currentSurah.ayahs.length === 0) return;
    const target = initialTargetAyah || profile.lastRead?.ayahNumber || 1;

    // Set Thematic Paragraph index
    if (thematicParagraphs.length > 0) {
      const pIdx = thematicParagraphs.findIndex(
        (p) => target >= p.fromAyah && target <= p.toAyah
      );
      setCurrentParagraphIndex(pIdx !== -1 ? pIdx : 0);
    }

    // Set Mushaf page index
    if (mushafPages.length > 0) {
      const pageIdx = mushafPages.findIndex((page) =>
        page.some((a) => a.numberInSurah === target)
      );
      setCurrentPageIndex(pageIdx !== -1 ? pageIdx : 0);
    }

    // Set Card verse index (0-indexed)
    const cardIdx = Math.max(0, Math.min(currentSurah.ayahs.length - 1, target - 1));
    setCurrentCardIndex(cardIdx);
  }, [currentSurah?.number, initialTargetAyah, thematicParagraphs, mushafPages]);

  // Synchronize audio recitation playback with slide position
  useEffect(() => {
    if (!activePlayingAyah || !currentSurah) return;

    if (isThematicMode && thematicParagraphs.length > 0) {
      const pIdx = thematicParagraphs.findIndex(
        (p) => activePlayingAyah >= p.fromAyah && activePlayingAyah <= p.toAyah
      );
      if (pIdx !== -1 && pIdx !== currentParagraphIndex) {
        setParagraphAnimation(pIdx > currentParagraphIndex ? 'next' : 'prev');
        setCurrentParagraphIndex(pIdx);
      }
    } else if (isParagraphMode && mushafPages.length > 0) {
      const pageIdx = mushafPages.findIndex((page) =>
        page.some((a) => a.numberInSurah === activePlayingAyah)
      );
      if (pageIdx !== -1 && pageIdx !== currentPageIndex) {
        setFlipAnimation(pageIdx > currentPageIndex ? 'next' : 'prev');
        setCurrentPageIndex(pageIdx);
      }
    } else if (isCardsMode) {
      const cardIdx = activePlayingAyah - 1;
      if (cardIdx >= 0 && cardIdx < currentSurah.ayahs.length && cardIdx !== currentCardIndex) {
        setCardAnimation(cardIdx > currentCardIndex ? 'next' : 'prev');
        setCurrentCardIndex(cardIdx);
      }
    }
  }, [activePlayingAyah, isThematicMode, isParagraphMode, isCardsMode, thematicParagraphs, mushafPages, currentSurah]);

  const handleAyahVisible = (ayahNum: number) => {
    if (!currentSurah) return;
    onUpdateLastRead({
      surahNumber: currentSurah.number,
      ayahNumber: ayahNum,
      surahName: currentSurah.nameEnglish,
      updatedAt: new Date().toISOString(),
    });
  };

  // Thematic Study Paragraph Navigation
  const goToNextParagraph = () => {
    if (!currentSurah) return;
    if (currentParagraphIndex < thematicParagraphs.length - 1) {
      setParagraphAnimation('next');
      const nextIdx = currentParagraphIndex + 1;
      setCurrentParagraphIndex(nextIdx);
      const firstAyah = thematicParagraphs[nextIdx]?.ayahs[0];
      if (firstAyah) handleAyahVisible(firstAyah.numberInSurah);
    } else {
      onSelectSurah(nextSurahNum);
    }
  };

  const goToPrevParagraph = () => {
    if (!currentSurah) return;
    if (currentParagraphIndex > 0) {
      setParagraphAnimation('prev');
      const prevIdx = currentParagraphIndex - 1;
      setCurrentParagraphIndex(prevIdx);
      const firstAyah = thematicParagraphs[prevIdx]?.ayahs[0];
      if (firstAyah) handleAyahVisible(firstAyah.numberInSurah);
    } else {
      onSelectSurah(prevSurahNum);
    }
  };

  // Mushaf Page Navigation
  const goToNextPage = () => {
    if (currentPageIndex < mushafPages.length - 1) {
      setFlipAnimation('next');
      const nextIdx = currentPageIndex + 1;
      setCurrentPageIndex(nextIdx);
      const firstAyahOnNextPage = mushafPages[nextIdx]?.[0];
      if (firstAyahOnNextPage) {
        handleAyahVisible(firstAyahOnNextPage.numberInSurah);
      }
    } else {
      onSelectSurah(nextSurahNum);
    }
  };

  const goToPrevPage = () => {
    if (currentPageIndex > 0) {
      setFlipAnimation('prev');
      const prevIdx = currentPageIndex - 1;
      setCurrentPageIndex(prevIdx);
      const firstAyahOnPrevPage = mushafPages[prevIdx]?.[0];
      if (firstAyahOnPrevPage) {
        handleAyahVisible(firstAyahOnPrevPage.numberInSurah);
      }
    } else {
      onSelectSurah(prevSurahNum);
    }
  };

  // Cards Navigation
  const goToNextCard = () => {
    if (!currentSurah) return;
    if (currentCardIndex < currentSurah.ayahs.length - 1) {
      setCardAnimation('next');
      const nextIdx = currentCardIndex + 1;
      setCurrentCardIndex(nextIdx);
      handleAyahVisible(currentSurah.ayahs[nextIdx].numberInSurah);
    } else {
      onSelectSurah(nextSurahNum);
    }
  };

  const goToPrevCard = () => {
    if (!currentSurah) return;
    if (currentCardIndex > 0) {
      setCardAnimation('prev');
      const prevIdx = currentCardIndex - 1;
      setCurrentCardIndex(prevIdx);
      handleAyahVisible(currentSurah.ayahs[prevIdx].numberInSurah);
    } else {
      onSelectSurah(prevSurahNum);
    }
  };

  // Touch Swipe Handlers for Horizontal Sliding
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartXRef.current;
    const deltaY = touchEndY - touchStartYRef.current;

    // Only register horizontal swipes, lock out vertical gestures completely
    if (Math.abs(deltaX) > 30 && Math.abs(deltaX) > Math.abs(deltaY) * 1.15) {
      if (isThematicMode) {
        if (deltaX < 0) goToNextParagraph();
        else goToPrevParagraph();
      } else if (isParagraphMode) {
        if (deltaX < 0) goToNextPage();
        else goToPrevPage();
      } else {
        if (deltaX < 0) goToNextCard();
        else goToPrevCard();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const handleDownload = async () => {
    if (!currentSurah) return;
    setIsDownloading(true);
    try {
      await onDownloadSurah(currentSurah.number);
    } finally {
      setIsDownloading(false);
    }
  };

  const getGlowClass = () => {
    if (profile.arabicGlowMode === 'off') return 'arabic-glow-none';
    if (profile.arabicGlowMode === 'emerald') return 'arabic-glow-emerald';
    if (profile.arabicGlowMode === 'lunar') return 'arabic-glow-lunar';
    return profile.glowIntensity === 'intense' ? 'arabic-glow-gold-intense' : 'arabic-glow-gold';
  };

  const currentPageAyahs = mushafPages[currentPageIndex] || [];
  const currentJuz = currentPageAyahs[0]?.juz || currentSurah?.ayahs[0]?.juz || 1;

  // Active item references
  const currentParagraph: ThematicParagraph | undefined = thematicParagraphs[currentParagraphIndex];
  const activeVerseAyah: Ayah | undefined = currentSurah?.ayahs[currentCardIndex];
  const activeHadith = (currentSurah && activeVerseAyah)
    ? (activeVerseAyah.relatedHadith || getRelatedHadith(currentSurah.number, activeVerseAyah.numberInSurah))
    : null;

  return (
    <div
      className="flex-1 flex flex-col max-w-md w-full mx-auto bg-stone-50 dark:bg-stone-950 h-full max-h-screen overflow-hidden select-none pb-1"
      style={{ touchAction: 'pan-x', overscrollBehavior: 'none' }}
    >
      {/* 1. Android App Bar (Clean & Uncluttered: Segmented Control moved to Settings as requested) */}
      {!isFullScreenMode ? (
        <header className="shrink-0 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-3.5 py-2.5 flex items-center justify-between gap-2 shadow-2xs">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={onBackToDashboard}
              className="p-1.5 -ml-1 text-black dark:text-white rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Back"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-black dark:text-white font-cinzel truncate">
                  {currentSurah ? `Surah ${currentSurah.nameEnglish}` : 'Holy Quran'}
                </h2>
                {currentSurah && (
                  <button
                    onClick={() => onToggleFavoriteSurah(currentSurah.number)}
                    className="p-0.5 text-amber-500 hover:scale-110 transition-transform"
                    title={isFavoriteSurah ? 'Remove from favorites' : 'Add to favorite Surahs'}
                  >
                    <Star className={`w-3.5 h-3.5 ${isFavoriteSurah ? 'fill-amber-500' : ''}`} />
                  </button>
                )}
              </div>
              <span className="text-[11px] font-quran text-amber-600 dark:text-amber-400 block -mt-0.5">
                {currentSurah?.nameArabic}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Fullscreen Distraction-Free Toggle */}
            <button
              onClick={() => setIsFullScreenMode(true)}
              className="p-1.5 text-black dark:text-white rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Full Screen Distraction-Free Mode"
              aria-label="Full Screen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Quick Search */}
            <button
              onClick={onOpenSearch}
              className="p-1.5 text-black dark:text-white rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Search Verses & Surahs"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Settings (Where Reading Format Layout & options are placed) */}
            <button
              onClick={onOpenSettings}
              className="p-1.5 text-black dark:text-white rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Settings & Reading Layouts"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </header>
      ) : (
        /* Minimal Floating Header when in Fullscreen Distraction-Free Mode */
        <div className="shrink-0 px-3.5 py-1.5 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToDashboard}
              className="p-1 rounded-lg text-black dark:text-white hover:bg-stone-100 dark:hover:bg-stone-800"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-cinzel font-bold text-black dark:text-white text-xs">
              Surah {currentSurah?.nameEnglish}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-400">
              {isThematicMode
                ? `Topic ${currentParagraphIndex + 1} of ${thematicParagraphs.length}`
                : isParagraphMode
                ? `Page ${currentPageIndex + 1} of ${mushafPages.length}`
                : `Ayah ${currentCardIndex + 1} of ${currentSurah?.numberOfAyahs || 1}`}
            </span>
            <button
              onClick={() => setIsFullScreenMode(false)}
              className="p-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-black dark:text-white transition-colors"
              title="Exit Full Screen"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Compact Surah Switcher Strip (Hidden in Full Screen Mode to maximize space and prevent vertical scrolling) */}
      {!isFullScreenMode && (
        <div className="shrink-0 px-3.5 py-1.5 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onSelectSurah(prevSurahNum)}
              className="p-1 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-black dark:text-white active:scale-95 transition-all"
              title="Previous Surah"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <select
              value={surahNum}
              onChange={(e) => onSelectSurah(Number(e.target.value))}
              className="bg-stone-50 dark:bg-stone-800 text-black dark:text-white font-bold py-1 px-2 rounded-lg border border-stone-200 dark:border-stone-700 text-xs max-w-[155px] truncate cursor-pointer"
            >
              {ALL_SURAHS.map((s) => (
                <option key={s.number} value={s.number}>
                  {s.number}. {s.nameEnglish} ({s.numberOfAyahs}v)
                </option>
              ))}
            </select>

            <button
              onClick={() => onSelectSurah(nextSurahNum)}
              className="p-1 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-black dark:text-white active:scale-95 transition-all"
              title="Next Surah"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Offline Save status */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[10.5px] font-bold transition-colors ${
              isDownloaded
                ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                : 'bg-stone-50 dark:bg-stone-800 text-black dark:text-white border-stone-200 dark:border-stone-700'
            }`}
            title={isDownloaded ? 'Downloaded for offline reading' : 'Download this Surah offline'}
          >
            {isDownloading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : isDownloaded ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>{isDownloaded ? 'Offline' : 'Save'}</span>
          </button>
        </div>
      )}

      {/* 3. Loading State */}
      {isLoading && (
        <div className="flex-1 flex flex-col items-center justify-center space-y-2 py-12">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
          <p className="text-xs text-stone-600 dark:text-stone-400 font-bold">Loading Sacred Verses...</p>
        </div>
      )}

      {/* 4A. THEMATIC PARAGRAPH STUDY MODE (ZERO VERTICAL SCROLLING • ONE PARAGRAPH PER SLIDE • SMALL NOTICEABLE LETTERS) */}
      {!isLoading && currentSurah && isThematicMode && currentParagraph && (
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex-1 min-h-0 flex flex-col justify-between p-2.5 sm:p-3 overflow-hidden select-none"
        >
          {/* Physical Study Page Slide Card (Fits screen height perfectly with zero vertical scrolling) */}
          <div
            onAnimationEnd={() => setParagraphAnimation('none')}
            className={`flex-1 min-h-0 flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-[#fdfbf7] dark:bg-stone-900 border-2 border-stone-300 dark:border-stone-800 shadow-md text-left overflow-hidden ${
              paragraphAnimation === 'next'
                ? 'animate-slide-next'
                : paragraphAnimation === 'prev'
                ? 'animate-slide-prev'
                : ''
            }`}
          >
            {/* Top Bar of Slide */}
            <div className="flex items-center justify-between pb-1.5 mb-1 border-b border-stone-200 dark:border-stone-800 text-xs shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="font-cinzel text-xs font-bold text-stone-900 dark:text-stone-100">
                  {currentSurah.number}. {currentSurah.nameEnglish}
                </span>
                <span className="text-stone-400">·</span>
                <span className="font-cinzel text-[11px] text-amber-700 dark:text-amber-400 font-bold">
                  {currentParagraph.fromAyah === currentParagraph.toAyah
                    ? `Ayah ${currentParagraph.fromAyah}`
                    : `Ayahs ${currentParagraph.fromAyah}–${currentParagraph.toAyah}`}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Audio recitation for this paragraph */}
                <button
                  onClick={() => {
                    onPlayAyahInReciter(currentParagraph.fromAyah);
                    onVerseRead();
                  }}
                  className="p-1 rounded-lg text-black dark:text-white hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
                  title="Play recitation for this paragraph"
                >
                  {isPlayingAudio && activePlayingAyah && activePlayingAyah >= currentParagraph.fromAyah && activePlayingAyah <= currentParagraph.toAyah ? (
                    <Pause className="w-3.5 h-3.5 text-amber-500" />
                  ) : (
                    <Play className="w-3.5 h-3.5" />
                  )}
                </button>

                {/* Tafsir button */}
                <button
                  onClick={() => onOpenTafsir(currentParagraph.ayahs[0])}
                  className="px-2 py-0.5 rounded-lg bg-black text-white dark:bg-white dark:text-black font-bold text-[10px] shadow-2xs hover:opacity-90 transition-opacity"
                  title="Open In-Depth Tafsir for this section"
                >
                  Tafsir
                </button>
              </div>
            </div>

            {/* Slide Body: Centered Topic Name, Reflective Question, and Properly Arranged Text (Scrollable if needed) */}
            <div className="flex-1 min-h-0 flex flex-col justify-start py-1 overflow-y-auto overscroll-contain space-y-3 pr-1">
              {/* Bismillah on First Paragraph */}
              {currentParagraphIndex === 0 && currentSurah.bismillahPre && (
                <div className="text-center shrink-0">
                  <p className={`font-quran text-sm sm:text-base text-amber-900 dark:text-amber-200 ${getGlowClass()}`}>
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                </div>
              )}

              {/* Centered Topic Title (e.g. *Order to Worship God Alone*) */}
              <div className="text-center shrink-0">
                <h3 className="font-serif italic text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 tracking-wide">
                  {currentParagraph.topicTitle}
                </h3>
              </div>

              {/* Specific Question for this Paragraph */}
              <div className="px-2.5 py-1.5 rounded-xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/20 text-center shrink-0">
                <span className="text-[9px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider block mb-0.5">
                  Reflective Question
                </span>
                <p className="font-serif italic text-[11.5px] sm:text-xs text-stone-800 dark:text-stone-200 leading-snug">
                  "{currentParagraph.topicQuestion}"
                </p>
              </div>

              {/* 1. SACRED ARABIC VERSES - PROPERLY ARRANGED & HIGHLY VISIBLE WITH MILD GLOW */}
              <div
                className="pt-1 text-right leading-[2.3] select-text"
                dir="rtl"
              >
                {currentParagraph.ayahs.map((ayah) => {
                  const isPlayingThis = isPlayingAudio && activePlayingAyah === ayah.numberInSurah;
                  const waqfSigns = getVerseWaqfSigns(currentSurah.number, ayah.numberInSurah, ayah.textArabic);

                  return (
                    <span
                      key={ayah.numberInSurah}
                      onClick={() => {
                        handleAyahVisible(ayah.numberInSurah);
                        onOpenTafsir(ayah);
                      }}
                      className={`inline cursor-pointer transition-all rounded px-1 ${
                        isPlayingThis ? 'bg-amber-400/25 ring-2 ring-amber-500 rounded-md' : 'hover:bg-amber-500/10'
                      }`}
                      title={`Ayah ${ayah.numberInSurah} (Tap for Tafsir)`}
                    >
                      <span
                        className={`${
                          profile.calligraphyFont === 'scheherazade' ? 'font-scheherazade' : 'font-quran'
                        } text-stone-950 dark:text-stone-50 font-bold font-arabic-clean ${getGlowClass()}`}
                        style={{
                          fontSize: `${Math.max(24, profile.arabicFontSize)}px`,
                          lineHeight: '2.3',
                        }}
                      >
                        {ayah.textArabic}{' '}
                      </span>

                      {profile.showTajweedSigns && waqfSigns.length > 0 && (
                        <span className="inline-flex items-center gap-0.5 mx-0.5 align-middle select-none">
                          {waqfSigns.map((sign, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedWaqfSign(sign);
                              }}
                              className={`inline-flex items-center justify-center px-1 py-0.2 rounded border text-[9px] font-bold ${sign.badgeColor}`}
                              title={sign.ruleSimple}
                            >
                              <span className="font-quran text-[10px]">{sign.symbol}</span>
                            </button>
                          ))}
                        </span>
                      )}

                      <span className="inline-block text-amber-700 dark:text-amber-400 font-cinzel text-xs font-bold mx-0.5 select-none">
                        ۝ {ayah.numberInSurah}
                      </span>
                      {' '}
                    </span>
                  );
                })}
              </div>

              {/* 2. ENGLISH TRANSLATION - PLACED RESPECTFULLY BELOW ARABIC IN REFINED BOOK SERIF (LORA / CRIMSON PRO) */}
              {profile.showEnglish && (
                <div className="pt-2.5 border-t border-stone-200 dark:border-stone-800/80 text-left font-book-serif text-[14px] sm:text-[15px] leading-[1.75] text-stone-900 dark:text-stone-200 select-text">
                  {currentParagraph.ayahs.map((ayah) => {
                    const isPlayingThis = isPlayingAudio && activePlayingAyah === ayah.numberInSurah;
                    return (
                      <span
                        key={ayah.numberInSurah}
                        onClick={() => {
                          handleAyahVisible(ayah.numberInSurah);
                          onOpenTafsir(ayah);
                        }}
                        className={`inline cursor-pointer transition-all rounded px-0.5 ${
                          isPlayingThis
                            ? 'bg-amber-400/20 font-semibold ring-1 ring-amber-500 rounded'
                            : 'hover:bg-amber-500/10'
                        }`}
                        title={`Ayah ${ayah.numberInSurah} (Tap for Tafsir)`}
                      >
                        <strong className="font-sans font-bold text-stone-950 dark:text-white mr-1 text-[13px]">
                          {ayah.numberInSurah}.
                        </strong>
                        <span>{ayah.textEnglish} </span>
                      </span>
                    );
                  })}
                </div>
              )}

              {/* 3. URDU TRANSLATION - ELEGANT NASTALIQ (IF ENABLED) */}
              {profile.showUrdu && (
                <div
                  className="pt-2 border-t border-stone-200 dark:border-stone-800 text-right leading-[2.1] font-urdu text-[13px] sm:text-[14px] text-stone-900 dark:text-stone-100 font-bold"
                  dir="rtl"
                >
                  {currentParagraph.ayahs.map((ayah) => (
                    <span key={ayah.numberInSurah} className="inline ml-1">
                      <span className="font-sans text-[11px] font-bold text-amber-700 dark:text-amber-400 ml-0.5">
                        ({ayah.numberInSurah})
                      </span>
                      <span>{ayah.textUrdu} </span>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Paragraph Scrubber Slider */}
            <div className="pt-1.5 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-bold text-stone-700 dark:text-stone-300 shrink-0">
                Topic {currentParagraphIndex + 1} / {thematicParagraphs.length}
              </span>
              <input
                type="range"
                min="1"
                max={thematicParagraphs.length}
                value={currentParagraphIndex + 1}
                onChange={(e) => {
                  const idx = Number(e.target.value) - 1;
                  setCurrentParagraphIndex(idx);
                  const firstAyah = thematicParagraphs[idx]?.ayahs[0];
                  if (firstAyah) handleAyahVisible(firstAyah.numberInSurah);
                }}
                className="w-full h-1.5 bg-stone-300 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white"
              />
            </div>
          </div>

          {/* Tactile Next & Prev Paragraph Buttons (High Contrast Black / White) */}
          <div className="mt-1.5 flex items-center justify-between gap-2 shrink-0">
            <button
              onClick={goToPrevParagraph}
              className="flex-1 py-2 px-3 rounded-xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-bold text-xs shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1"
              title="Previous Topic (or swipe right)"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              <span>{currentParagraphIndex === 0 ? 'Prev Surah' : 'Prev Topic'}</span>
            </button>

            <button
              onClick={goToNextParagraph}
              className="flex-1 py-2 px-3 rounded-xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-bold text-xs shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1"
              title="Next Topic (or swipe left)"
            >
              <span>{currentParagraphIndex === thematicParagraphs.length - 1 ? 'Next Surah' : 'Next Topic'}</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}

      {/* 4B. MUSHAF MODE (PURE ARABIC CALLIGRAPHY PAGE-BY-PAGE SLIDING • ZERO VERTICAL SCROLL) */}
      {!isLoading && currentSurah && isParagraphMode && (
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex-1 min-h-0 flex flex-col justify-between p-2.5 sm:p-3 overflow-hidden select-none"
        >
          {/* Authentically framed physical Mushaf Page */}
          <div
            onAnimationEnd={() => setFlipAnimation('none')}
            className={`flex-1 min-h-0 flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-[#fdfbf7] dark:bg-stone-900 border-2 border-amber-600/30 dark:border-amber-500/30 shadow-md text-right overflow-hidden ${
              flipAnimation === 'next'
                ? 'animate-mushaf-flip-next'
                : flipAnimation === 'prev'
                ? 'animate-mushaf-flip-prev'
                : ''
            }`}
          >
            {/* Page Header */}
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-amber-600/20 dark:border-amber-500/20 text-xs shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="font-cinzel text-[11px] font-bold text-amber-800 dark:text-amber-300">
                  Juz {currentJuz}
                </span>
                <span className="text-stone-400">·</span>
                <span className="font-cinzel text-[11px] text-stone-700 dark:text-stone-300 font-semibold">
                  Page {currentPageIndex + 1} of {mushafPages.length}
                </span>
              </div>

              <span className="font-quran text-sm font-bold text-amber-700 dark:text-amber-300">
                سُورَةُ {currentSurah.nameArabic}
              </span>
            </div>

            {/* Bismillah on Page 1 if applicable */}
            {currentPageIndex === 0 && currentSurah.bismillahPre && (
              <div className="text-center py-0.5 shrink-0">
                <p className={`font-quran text-base sm:text-lg text-amber-900 dark:text-amber-200 ${getGlowClass()}`}>
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
              </div>
            )}

            {/* Mushaf Page Verses - Paragraph Flow (Scrollable if needed, zero clipping) */}
            <div
              className="flex-1 min-h-0 flex flex-col justify-start leading-[2.3] select-text text-justify px-1 overflow-y-auto overscroll-contain scrollbar-thin"
              dir="rtl"
            >
              <div>
                {currentPageAyahs.map((ayah) => {
                  const isPlayingThis = isPlayingAudio && activePlayingAyah === ayah.numberInSurah;
                  const isSelected = selectedParagraphAyah === ayah.numberInSurah;
                  const waqfSigns = getVerseWaqfSigns(currentSurah.number, ayah.numberInSurah, ayah.textArabic);

                  return (
                    <span
                      key={ayah.numberInSurah}
                      onClick={() => {
                        setSelectedParagraphAyah(ayah.numberInSurah);
                        handleAyahVisible(ayah.numberInSurah);
                        onOpenTafsir(ayah);
                      }}
                      className={`inline transition-all rounded-md cursor-pointer px-1 py-0.5 ${
                        isPlayingThis
                          ? 'bg-amber-500/20 text-amber-950 dark:text-amber-100 ring-2 ring-amber-500'
                          : isSelected
                          ? 'bg-stone-200/70 dark:bg-stone-800'
                          : 'hover:bg-amber-500/10'
                      }`}
                    >
                      <span
                        className={`${
                          profile.calligraphyFont === 'scheherazade' ? 'font-scheherazade' : 'font-quran'
                        } text-stone-950 dark:text-stone-100 font-arabic-clean ${getGlowClass()}`}
                        style={{
                          fontSize: `${mushafFontSize}px`,
                          lineHeight: '2.3',
                        }}
                      >
                        {ayah.textArabic}{' '}
                      </span>

                      {/* Tajweed Stopping Signs */}
                      {profile.showTajweedSigns && (
                        <span className="inline-flex items-center gap-1 mx-0.5 align-middle select-none">
                          {waqfSigns.map((sign, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedWaqfSign(sign);
                              }}
                              className={`inline-flex items-center justify-center px-1 py-0.2 rounded border text-[10px] font-bold ${sign.badgeColor}`}
                              title={`Click for guide: ${sign.ruleSimple}`}
                            >
                              <span className="font-quran text-[11px]">{sign.symbol}</span>
                            </button>
                          ))}
                        </span>
                      )}

                      {/* Ayah End Emblem */}
                      <span
                        className="inline-block text-amber-700 dark:text-amber-400 font-cinzel text-xs font-bold mx-1 select-none"
                        title={`Ayah ${ayah.numberInSurah}`}
                      >
                        ۝ {ayah.numberInSurah}
                      </span>
                      {'  '}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Page Bottom Details */}
            <div className="pt-1.5 mt-1 border-t border-amber-600/20 dark:border-amber-500/20 flex items-center justify-between text-xs text-stone-600 dark:text-stone-400 shrink-0">
              <span className="text-[11px] font-medium">
                Ayahs {currentPageAyahs[0]?.numberInSurah}–
                {currentPageAyahs[currentPageAyahs.length - 1]?.numberInSurah}
              </span>
              <div className="w-5 h-5 rounded-full border border-amber-600/40 dark:border-amber-500/40 flex items-center justify-center font-cinzel text-[11px] font-bold text-amber-700 dark:text-amber-300">
                {currentPageIndex + 1}
              </div>
            </div>
          </div>

          {/* Quick Page Scrubber Slider */}
          <div className="mt-2 px-3 py-1 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-bold text-stone-700 dark:text-stone-300 shrink-0">
              Page {currentPageIndex + 1} / {mushafPages.length}
            </span>
            <input
              type="range"
              min="1"
              max={mushafPages.length}
              value={currentPageIndex + 1}
              onChange={(e) => {
                const idx = Number(e.target.value) - 1;
                setCurrentPageIndex(idx);
                const firstAyah = mushafPages[idx]?.[0];
                if (firstAyah) handleAyahVisible(firstAyah.numberInSurah);
              }}
              className="w-full h-1.5 bg-stone-300 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white"
            />
          </div>

          {/* Tactile Next & Prev Page Buttons */}
          <div className="mt-1.5 flex items-center justify-between gap-2 shrink-0">
            <button
              onClick={goToPrevPage}
              className="flex-1 py-2 px-3 rounded-xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-bold text-xs shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1"
              title="Previous Page (or swipe right)"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              <span>{currentPageIndex === 0 ? 'Prev Surah' : 'Prev Page'}</span>
            </button>

            <button
              onClick={goToNextPage}
              className="flex-1 py-2 px-3 rounded-xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-bold text-xs shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1"
              title="Next Page (or swipe left)"
            >
              <span>{currentPageIndex === mushafPages.length - 1 ? 'Next Surah' : 'Next Page'}</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}

      {/* 4C. VERSE-BY-VERSE SLIDE PAGES (CARDS MODE • ZERO VERTICAL SCROLL) */}
      {!isLoading && currentSurah && isCardsMode && activeVerseAyah && (
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex-1 min-h-0 flex flex-col justify-between p-2.5 sm:p-3 overflow-hidden select-none"
        >
          {/* Active Verse Card Slide */}
          <div
            onAnimationEnd={() => setCardAnimation('none')}
            className={`flex-1 min-h-0 flex flex-col justify-between p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md overflow-hidden ${
              cardAnimation === 'next'
                ? 'animate-slide-next'
                : cardAnimation === 'prev'
                ? 'animate-slide-prev'
                : ''
            }`}
          >
            {/* Slide Top Bar */}
            <div className="flex items-center justify-between pb-2 mb-1.5 border-b border-stone-200 dark:border-stone-800 shrink-0">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 font-cinzel text-xs font-bold text-black dark:text-white">
                  Ayah {activeVerseAyah.numberInSurah} of {currentSurah.numberOfAyahs}
                </span>
              </div>

              <div className="flex items-center gap-1">
                {/* IN-DEPTH TAFSIR VIEW BUTTON */}
                <button
                  onClick={() => onOpenTafsir(activeVerseAyah)}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg bg-black text-white hover:bg-stone-800 dark:bg-white dark:text-black dark:hover:bg-stone-200 transition-colors shadow-2xs"
                  title="View In-Depth Verse Tafsir"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Tafsir</span>
                </button>

                {/* RELATED HADITH BUTTON - ONLY SHOWN IF A VERIFIED RELATED HADITH EXISTS */}
                {activeHadith && (
                  <button
                    onClick={() =>
                      setExpandedHadithAyah(
                        expandedHadithAyah === activeVerseAyah.numberInSurah ? null : activeVerseAyah.numberInSurah
                      )
                    }
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg transition-colors ${
                      expandedHadithAyah === activeVerseAyah.numberInSurah
                        ? 'bg-amber-500 text-white'
                        : 'bg-stone-100 dark:bg-stone-800 text-black dark:text-white border border-stone-300 dark:border-stone-700'
                    }`}
                    title="View Authenticated Prophetic Hadith"
                  >
                    <Quote className="w-3.5 h-3.5" />
                    <span>Hadith</span>
                  </button>
                )}

                {/* Play Recitation Audio */}
                <button
                  onClick={() => {
                    onPlayAyahInReciter(activeVerseAyah.numberInSurah);
                    onVerseRead();
                  }}
                  className="p-1.5 text-black dark:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
                  title="Play recitation"
                >
                  {isPlayingAudio && activePlayingAyah === activeVerseAyah.numberInSurah ? (
                    <Pause className="w-4 h-4 text-amber-500" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>

                {/* Bookmark */}
                <button
                  onClick={() => onAddBookmark(activeVerseAyah.numberInSurah, 0)}
                  className="p-1.5 text-black dark:text-white hover:text-amber-500 rounded-lg transition-colors"
                  title="Bookmark verse"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Slide Body (Scrollable if verse is long, properly arranged) */}
            <div className="flex-1 min-h-0 flex flex-col justify-start py-1 space-y-3 overflow-y-auto overscroll-contain px-1 scrollbar-thin">
              {currentCardIndex === 0 && currentSurah.bismillahPre && (
                <div className="text-center shrink-0">
                  <p className={`font-quran text-base sm:text-lg text-amber-900 dark:text-amber-200 ${getGlowClass()}`}>
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                </div>
              )}

              {/* Arabic Calligraphy - Prioritized, Noticeably Bigger with Mild Glowing Letters */}
              <div className="text-right" dir="rtl">
                <p
                  className={`${
                    profile.calligraphyFont === 'scheherazade' ? 'font-scheherazade' : 'font-quran'
                  } text-stone-950 dark:text-stone-50 leading-[2.3] select-text font-bold font-arabic-clean ${getGlowClass()}`}
                  style={{ fontSize: `${Math.max(26, profile.arabicFontSize)}px` }}
                >
                  {activeVerseAyah.textArabic}
                  <span className="inline-block mr-2 text-amber-600 dark:text-amber-400 font-cinzel text-base select-none">
                    ۝ {activeVerseAyah.numberInSurah}
                  </span>
                </p>
              </div>

              {/* English Translation - Refined Book Serif Typography */}
              {profile.showEnglish && activeVerseAyah.textEnglish && (
                <div className="pt-2 text-stone-900 dark:text-stone-100 font-book-serif text-[15px] sm:text-[16.5px] leading-[1.8] select-text">
                  <p>
                    {activeVerseAyah.textEnglish}
                  </p>
                </div>
              )}

              {/* Urdu Translation */}
              {profile.showUrdu && activeVerseAyah.textUrdu && (
                <div className="pt-1 border-t border-stone-200 dark:border-stone-800 text-right" dir="rtl">
                  <p
                    className="font-urdu text-black dark:text-stone-100 font-bold"
                    style={{ fontSize: `${Math.max(15, profile.translationFontSize + 1)}px` }}
                  >
                    {activeVerseAyah.textUrdu}
                  </p>
                </div>
              )}

              {/* Expandable Related Hadith */}
              {expandedHadithAyah === activeVerseAyah.numberInSurah && activeHadith && (
                <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 space-y-1 text-xs shrink-0 animate-in fade-in">
                  <div className="flex items-center justify-between text-amber-800 dark:text-amber-300 font-bold">
                    <div className="flex items-center gap-1.5">
                      <Quote className="w-3.5 h-3.5" />
                      <span>Authentic Prophetic Hadith:</span>
                    </div>
                    <span className="text-[10px] font-mono">{activeHadith.source}</span>
                  </div>

                  <p className="text-stone-900 dark:text-stone-100 italic leading-snug font-medium">
                    "{activeHadith.textEnglish}"
                  </p>

                  <div className="p-1 rounded-lg bg-white/80 dark:bg-stone-900/80 text-[10.5px] text-amber-900 dark:text-amber-200">
                    <strong>Connection to Verse:</strong> {activeHadith.relevance}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Ayah Scrubber Slider */}
            <div className="pt-1.5 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-bold text-stone-700 dark:text-stone-300 shrink-0">
                Ayah {currentCardIndex + 1} / {currentSurah.numberOfAyahs}
              </span>
              <input
                type="range"
                min="1"
                max={currentSurah.numberOfAyahs}
                value={currentCardIndex + 1}
                onChange={(e) => {
                  const idx = Number(e.target.value) - 1;
                  setCurrentCardIndex(idx);
                  handleAyahVisible(idx + 1);
                }}
                className="w-full h-1.5 bg-stone-300 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white"
              />
            </div>
          </div>

          {/* Tactile Next & Prev Verse Buttons */}
          <div className="mt-1.5 flex items-center justify-between gap-2 shrink-0">
            <button
              onClick={goToPrevCard}
              className="flex-1 py-2 px-3 rounded-xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-bold text-xs shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1"
              title="Previous Verse (or swipe right)"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              <span>{currentCardIndex === 0 ? 'Prev Surah' : 'Prev Verse'}</span>
            </button>

            <button
              onClick={goToNextCard}
              className="flex-1 py-2 px-3 rounded-xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-bold text-xs shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1"
              title="Next Verse (or swipe left)"
            >
              <span>{currentCardIndex === currentSurah.numberOfAyahs - 1 ? 'Next Surah' : 'Next Verse'}</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Bottom Mini-Player if audio is active */}
      {activePlayingAyah && (
        <div className="shrink-0 max-w-md mx-auto w-full p-2 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Volume2 className="w-4 h-4 text-amber-500 shrink-0" />
            <div className="min-w-0">
              <div className="text-xs font-bold text-black dark:text-white flex items-center gap-1.5 truncate">
                <span>Reciting Ayah {activePlayingAyah}</span>
                {profile.recitationLanguageMode === 'urdu' && (
                  <span className="text-[9px] px-1.5 py-0.2 bg-black text-white dark:bg-white dark:text-black rounded font-bold">
                    اردو
                  </span>
                )}
              </div>
              <span className="text-[10px] text-stone-600 dark:text-stone-400 truncate block font-medium">
                {currentSurah?.nameEnglish} • {profile.recitationLanguageMode === 'urdu' ? 'Urdu Voice' : profile.recitationLanguageMode === 'both' ? 'Arabic + Urdu' : 'Arabic Qari'}
              </span>
            </div>
          </div>

          <button
            onClick={onToggleAudioPlayPause}
            className="w-8 h-8 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shadow-md active:scale-95 transition-all"
            title={isPlayingAudio ? 'Pause' : 'Play'}
          >
            {isPlayingAudio ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
          </button>
        </div>
      )}

      {/* Tajweed Stopping Sign Help Dialog */}
      <TajweedSignHelpDialog
        isOpen={Boolean(selectedWaqfSign)}
        onClose={() => setSelectedWaqfSign(null)}
        sign={selectedWaqfSign}
      />
    </div>
  );
};
