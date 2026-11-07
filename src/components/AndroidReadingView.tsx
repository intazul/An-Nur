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
  Copy,
  Loader2,
  Volume2,
  Star,
  Quote,
  AlignJustify,
  Layers,
  HelpCircle,
  Book,
  ScrollText,
  X,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { ALL_SURAHS } from '../data/surahList';
import { Ayah, LastReadPosition, SurahDetail, UserProfileData, WaqfSignInfo } from '../types/quran';
import { getRelatedHadith } from '../utils/hadithDatabase';
import { getVerseWaqfSigns } from '../data/tajweedSigns';
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
}) => {
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [expandedHadithAyah, setExpandedHadithAyah] = useState<number | null>(null);
  const [selectedWaqfSign, setSelectedWaqfSign] = useState<WaqfSignInfo | null>(null);
  const [selectedParagraphAyah, setSelectedParagraphAyah] = useState<number | null>(null);
  
  // Page flip state for horizontal Mushaf mode
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [flipAnimation, setFlipAnimation] = useState<'next' | 'prev' | 'none'>('none');
  const [isFullScreenMode, setIsFullScreenMode] = useState<boolean>(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const ayahRefs = useRef<Record<number, HTMLElement | null>>({});

  const surahNum = currentSurah?.number || 1;
  const prevSurahNum = surahNum > 1 ? surahNum - 1 : 114;
  const nextSurahNum = surahNum < 114 ? surahNum + 1 : 1;

  const isParagraphMode = profile.readingLayout === 'paragraph';
  const isFlipMode = (profile.mushafPageMode || 'flip') === 'flip';
  const mushafFontSize = profile.mushafFontSize || 21; // Small & readable in Mushaf mode

  // Chunk Surah Ayahs into discrete pages for Horizontal Page Flip Mushaf mode
  const mushafPages = useMemo(() => {
    if (!currentSurah || currentSurah.ayahs.length === 0) return [];

    // Very short surahs (e.g. Al-Fatiha, Al-Ikhlas, Al-Falaq, An-Nas, Al-Kawthar) fit nicely on 1 page
    if (currentSurah.ayahs.length <= 7) {
      return [currentSurah.ayahs];
    }

    const pages: Ayah[][] = [];
    let currentPage: Ayah[] = [];
    let charCount = 0;
    // Target ~480-520 characters per page for portrait mobile layout without overflow
    const TARGET_CHARS = 480;

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

  // Navigate to initial target ayah page or last read page
  useEffect(() => {
    if (mushafPages.length === 0) return;
    const target = initialTargetAyah || profile.lastRead?.ayahNumber || 1;
    const pageIdx = mushafPages.findIndex((page) =>
      page.some((a) => a.numberInSurah === target)
    );
    if (pageIdx !== -1) {
      setCurrentPageIndex(pageIdx);
    } else {
      setCurrentPageIndex(0);
    }
  }, [currentSurah?.number, initialTargetAyah, mushafPages]);

  // In card or scroll mode, scroll to target verse
  useEffect(() => {
    if (!isParagraphMode || !isFlipMode) {
      const target = initialTargetAyah || profile.lastRead?.ayahNumber;
      if (target && ayahRefs.current[target]) {
        setTimeout(() => {
          ayahRefs.current[target]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }, 200);
      }
    }
  }, [initialTargetAyah, currentSurah?.number, isParagraphMode, isFlipMode]);

  // When audio recitation is playing, automatically flip page or scroll to active ayah
  useEffect(() => {
    if (!activePlayingAyah) return;

    if (isParagraphMode && isFlipMode && mushafPages.length > 0) {
      const pageIdx = mushafPages.findIndex((page) =>
        page.some((a) => a.numberInSurah === activePlayingAyah)
      );
      if (pageIdx !== -1 && pageIdx !== currentPageIndex) {
        setFlipAnimation(pageIdx > currentPageIndex ? 'next' : 'prev');
        setCurrentPageIndex(pageIdx);
      }
    } else if (ayahRefs.current[activePlayingAyah]) {
      ayahRefs.current[activePlayingAyah]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activePlayingAyah, mushafPages, isParagraphMode, isFlipMode]);

  const handleAyahVisible = (ayahNum: number) => {
    if (!currentSurah) return;
    onUpdateLastRead({
      surahNumber: currentSurah.number,
      ayahNumber: ayahNum,
      surahName: currentSurah.nameEnglish,
      updatedAt: new Date().toISOString(),
    });
  };

  // Horizontal Page Flip Navigation
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
      // Last page of Surah -> Advance to next Surah
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
      // First page -> Go to previous Surah
      onSelectSurah(prevSurahNum);
    }
  };

  // Touch Swipe Handlers for Horizontal Page Flip
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

    // Only register horizontal swipes (ignore vertical scrolls)
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
      if (deltaX < 0) {
        // Swiped Left -> Advance to next page
        goToNextPage();
      } else {
        // Swiped Right -> Go to previous page
        goToPrevPage();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const handleCopyAyah = (ayah: Ayah) => {
    let text = `${ayah.textArabic}\n\n`;
    if (profile.showEnglish && ayah.textEnglish) {
      text += `English: ${ayah.textEnglish}\n\n`;
    }
    if (profile.showUrdu && ayah.textUrdu) {
      text += `Urdu: ${ayah.textUrdu}\n\n`;
    }
    text += `[Quran ${surahNum}:${ayah.numberInSurah}]`;

    navigator.clipboard.writeText(text);
    setCopiedAyah(ayah.numberInSurah);
    setTimeout(() => setCopiedAyah(null), 2000);
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

  const toggleLayoutMode = () => {
    const nextLayout = isParagraphMode ? 'cards' : 'paragraph';
    onUpdateProfile({ readingLayout: nextLayout });
  };

  const toggleMushafPageMode = () => {
    const nextMode = isFlipMode ? 'scroll' : 'flip';
    onUpdateProfile({ mushafPageMode: nextMode });
  };

  const currentPageAyahs = mushafPages[currentPageIndex] || [];
  const currentJuz = currentPageAyahs[0]?.juz || currentSurah?.ayahs[0]?.juz || 1;

  return (
    <div className={`flex-1 flex flex-col max-w-md w-full mx-auto bg-stone-50 dark:bg-stone-950 overflow-x-hidden ${
      isParagraphMode && isFlipMode ? 'min-h-screen sm:min-h-0 sm:h-full overflow-y-hidden pb-3' : 'min-h-screen pb-28'
    }`}>
      {/* 1. Android App Bar (Hidden in Full Screen Distraction-Free Mushaf Mode) */}
      {!isFullScreenMode ? (
        <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 px-4 py-3 flex items-center justify-between gap-2 shadow-2xs">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={onBackToDashboard}
              className="p-2 -ml-1 text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Back to Dashboard"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-cinzel truncate">
                  {currentSurah ? `Surah ${currentSurah.nameEnglish}` : 'Holy Quran'}
                </h2>
                {/* Favorite Star Button */}
                {currentSurah && (
                  <button
                    onClick={() => onToggleFavoriteSurah(currentSurah.number)}
                    className="p-1 text-amber-500 hover:scale-110 transition-transform"
                    title={isFavoriteSurah ? 'Remove from favorites' : 'Add to favorite Surahs'}
                  >
                    <Star className={`w-4 h-4 ${isFavoriteSurah ? 'fill-amber-500' : ''}`} />
                  </button>
                )}
              </div>
              <span className="text-[11px] font-quran text-amber-600 dark:text-amber-400 block -mt-0.5">
                {currentSurah?.nameArabic}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Fullscreen Distraction-Free Toggle in Mushaf Mode */}
            {isParagraphMode && (
              <button
                onClick={() => setIsFullScreenMode(true)}
                className="p-2 text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title="Full Screen Distraction-Free Mushaf"
                aria-label="Full Screen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            )}

            {/* Quick Layout Mode Switcher (Mushaf vs Verse Cards) */}
            <button
              onClick={toggleLayoutMode}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                isParagraphMode
                  ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-black dark:text-stone-300 border-stone-300 dark:border-stone-700'
              }`}
              title={isParagraphMode ? 'Switch to Verse by Verse Cards' : 'Switch to Mushaf Paragraph Flow'}
            >
              {isParagraphMode ? <AlignJustify className="w-3.5 h-3.5" /> : <Layers className="w-3.5 h-3.5" />}
              <span className="text-[11px]">{isParagraphMode ? 'Mushaf' : 'Cards'}</span>
            </button>

            {/* Quick Search */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Search Verses & Surahs"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Settings */}
            <button
              onClick={onOpenSettings}
              className="p-2 text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Settings (Layout, Page Flip, Tajweed, Urdu, English, Glow)"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </header>
      ) : (
        /* Minimal Floating Header when in Fullscreen Distraction-Free Mode */
        <div className="sticky top-0 z-40 px-4 py-2 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToDashboard}
              className="p-1.5 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-cinzel font-bold text-stone-900 dark:text-stone-100 text-xs">
              Surah {currentSurah?.nameEnglish}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-stone-500">
              Page {currentPageIndex + 1} of {mushafPages.length}
            </span>
            <button
              onClick={() => setIsFullScreenMode(false)}
              className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white transition-colors"
              title="Exit Full Screen"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Surah Switcher & Jump Strip (Hidden in Full Screen Mode) */}
      {!isFullScreenMode && (
        <div className="px-4 py-2.5 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onSelectSurah(prevSurahNum)}
              className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
              title="Previous Surah"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <select
              value={surahNum}
              onChange={(e) => onSelectSurah(Number(e.target.value))}
              className="bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold py-1.5 px-2 rounded-lg border border-stone-200 dark:border-stone-700 text-xs max-w-[150px] truncate"
            >
              {ALL_SURAHS.map((s) => (
                <option key={s.number} value={s.number}>
                  {s.number}. {s.nameEnglish}
                </option>
              ))}
            </select>

            <button
              onClick={() => onSelectSurah(nextSurahNum)}
              className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
              title="Next Surah"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Offline Download button */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-colors ${
              isDownloaded
                ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
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

      {/* 3. Surah Banner (Shown in Cards mode or Vertical Scroll Mushaf) */}
      {currentSurah && (!isParagraphMode || !isFlipMode) && (
        <div className="p-5 mx-4 mt-4 rounded-2xl bg-black text-white dark:bg-stone-900 border border-stone-800 text-center space-y-2 shadow-md">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-amber-400 font-cinzel font-semibold">
              Surah {currentSurah.number} · {currentSurah.revelationType} · {currentSurah.numberOfAyahs} Verses
            </span>
          </div>

          <h1 className="text-3xl font-quran font-bold text-amber-100 pt-0.5">
            سُورَةُ {currentSurah.nameArabic}
          </h1>
          <p className="text-xs text-stone-300">
            {currentSurah.nameEnglish} — <span className="text-amber-300">{currentSurah.englishTranslation}</span>
          </p>

          {currentSurah.bismillahPre && (
            <div className="pt-2">
              <p className={`font-quran text-xl text-amber-200 ${getGlowClass()}`}>
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>
          )}
        </div>
      )}

      {/* 4. Loading State */}
      {isLoading && (
        <div className="py-24 text-center space-y-2">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-500" />
          <p className="text-xs text-stone-500 font-medium">Loading Sacred Verses...</p>
        </div>
      )}

      {/* 5A. MUSHAF MODE (PARAGRAPH FORMAT) - HORIZONTAL PAGE FLIP & SCROLL MODES */}
      {!isLoading && currentSurah && isParagraphMode && (
        <div className={`space-y-3 ${isFullScreenMode ? 'p-2 sm:p-3' : 'p-4'}`}>
          {/* Mushaf Quick Controls Bar: Page Flip vs Scroll + Small Font Sizes + Full Screen Toggle */}
          <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs">
            {/* Page Mode Switcher (Flip vs Scroll) */}
            <div className="flex items-center rounded-xl bg-white dark:bg-stone-800 p-0.5 border border-stone-200 dark:border-stone-700">
              <button
                onClick={() => onUpdateProfile({ mushafPageMode: 'flip' })}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  isFlipMode
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-2xs'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
                title="Turn pages like a physical Mushaf"
              >
                <Book className="w-3.5 h-3.5" />
                <span>Page Flip</span>
              </button>
              <button
                onClick={() => onUpdateProfile({ mushafPageMode: 'scroll' })}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  !isFlipMode
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-2xs'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
                title="Continuous vertical scroll"
              >
                <ScrollText className="w-3.5 h-3.5" />
                <span>Scroll</span>
              </button>
            </div>

            {/* Right actions: Font Sizes + Full Screen toggle */}
            <div className="flex items-center gap-1.5">
              {/* Small & Readable Font Size Quick Buttons (19px, 21px, 24px) */}
              <div className="flex items-center gap-0.5 bg-white dark:bg-stone-800 p-0.5 rounded-xl border border-stone-200 dark:border-stone-700">
                {[
                  { size: 19, label: 'A-' },
                  { size: 21, label: 'A' },
                  { size: 24, label: 'A+' },
                ].map((opt) => (
                  <button
                    key={opt.size}
                    onClick={() => onUpdateProfile({ mushafFontSize: opt.size })}
                    className={`w-6 h-6 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center ${
                      mushafFontSize === opt.size
                        ? 'bg-amber-500 text-white shadow-2xs'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
                    }`}
                    title={`Mushaf text size: ${opt.size}px`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Fullscreen Button */}
              <button
                onClick={() => setIsFullScreenMode(!isFullScreenMode)}
                className={`p-1.5 rounded-xl border transition-colors ${
                  isFullScreenMode
                    ? 'bg-amber-500 text-white border-amber-600'
                    : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                }`}
                title={isFullScreenMode ? 'Exit Full Screen' : 'Enter Full Screen Distraction-Free'}
              >
                {isFullScreenMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* 5A.1 HORIZONTAL PAGE FLIP MODE */}
          {isFlipMode ? (
            <div className="mushaf-page-container select-none">
              {/* Authentically framed physical Mushaf Page */}
              <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onAnimationEnd={() => setFlipAnimation('none')}
                className={`relative p-5 sm:p-6 rounded-3xl bg-[#fdfbf7] dark:bg-stone-900 border-2 border-amber-600/30 dark:border-amber-500/30 shadow-lg text-right transition-all min-h-[440px] flex flex-col justify-between ${
                  flipAnimation === 'next'
                    ? 'animate-mushaf-flip-next'
                    : flipAnimation === 'prev'
                    ? 'animate-mushaf-flip-prev'
                    : ''
                }`}
              >
                {/* Physical Mushaf Page Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-600/20 dark:border-amber-500/20 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel text-[11px] font-bold text-amber-800 dark:text-amber-300">
                      Juz {currentJuz}
                    </span>
                    <span className="text-stone-400 dark:text-stone-600">·</span>
                    <span className="font-cinzel text-[11px] text-stone-600 dark:text-stone-400 font-semibold">
                      Page {currentPageIndex + 1} of {mushafPages.length}
                    </span>
                  </div>

                  <span className="font-quran text-sm font-bold text-amber-700 dark:text-amber-300">
                    سُورَةُ {currentSurah.nameArabic}
                  </span>
                </div>

                {/* Bismillah on Page 1 if applicable and not already shown in banner */}
                {currentPageIndex === 0 && currentSurah.bismillahPre && (
                  <div className="text-center py-1 mb-2">
                    <p className={`font-quran text-lg text-amber-900 dark:text-amber-200 ${getGlowClass()}`}>
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </p>
                  </div>
                )}

                {/* Page Verses - Pure Arabic Paragraph Flow with Small & Readable Font */}
                <div
                  className="flex-1 leading-[2.6] select-text text-justify"
                  dir="rtl"
                >
                  {currentPageAyahs.map((ayah) => {
                    const isPlayingThis = isPlayingAudio && activePlayingAyah === ayah.numberInSurah;
                    const isSelected = selectedParagraphAyah === ayah.numberInSurah;
                    const waqfSigns = getVerseWaqfSigns(currentSurah.number, ayah.numberInSurah, ayah.textArabic);

                    return (
                      <span
                        key={ayah.numberInSurah}
                        ref={(el) => {
                          ayahRefs.current[ayah.numberInSurah] = el;
                        }}
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
                          } text-stone-950 dark:text-stone-100 ${getGlowClass()}`}
                          style={{
                            fontSize: `${mushafFontSize}px`,
                            lineHeight: '2.6',
                          }}
                        >
                          {ayah.textArabic}{' '}
                        </span>

                        {/* Highlighted Tajweed Stopping Signs (Small, Neat & Tap-able) */}
                        {profile.showTajweedSigns && (
                          <span className="inline-flex items-center gap-1 mx-1 align-middle select-none">
                            {waqfSigns.map((sign, sIdx) => (
                              <button
                                key={sIdx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedWaqfSign(sign);
                                }}
                                className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded border text-[11px] font-bold transition-transform hover:scale-115 active:scale-95 shadow-2xs ${sign.badgeColor}`}
                                title={`Click for guide: ${sign.ruleSimple}`}
                              >
                                <span className="font-quran text-[12px]">{sign.symbol}</span>
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

                {/* Page Bottom Accent & Page Number */}
                <div className="pt-3 mt-3 border-t border-amber-600/20 dark:border-amber-500/20 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                  <span className="text-[11px] font-medium">
                    Ayahs {currentPageAyahs[0]?.numberInSurah}–
                    {currentPageAyahs[currentPageAyahs.length - 1]?.numberInSurah}
                  </span>
                  <div className="w-6 h-6 rounded-full border border-amber-600/40 dark:border-amber-500/40 flex items-center justify-center font-cinzel text-xs font-bold text-amber-700 dark:text-amber-300">
                    {currentPageIndex + 1}
                  </div>
                </div>
              </div>

              {/* Contrasting Tactile Page Turn Controls (White in Dark Mode, Black in Light Mode) */}
              <div className="mt-3 flex items-center justify-between gap-3">
                <button
                  onClick={goToPrevPage}
                  className="flex-1 py-3 px-4 rounded-2xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-semibold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  title="Previous Page (or swipe right)"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{currentPageIndex === 0 ? 'Prev Surah' : 'Prev Page'}</span>
                </button>

                {/* Page Dots Indicator */}
                <div className="flex items-center gap-1 px-2">
                  {mushafPages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setFlipAnimation(idx > currentPageIndex ? 'next' : 'prev');
                        setCurrentPageIndex(idx);
                      }}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentPageIndex
                          ? 'w-6 bg-amber-500'
                          : 'w-2 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400'
                      }`}
                      title={`Jump to Page ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={goToNextPage}
                  className="flex-1 py-3 px-4 rounded-2xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-semibold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  title="Next Page (or swipe left)"
                >
                  <span>{currentPageIndex === mushafPages.length - 1 ? 'Next Surah' : 'Next Page'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* 5A.2 CONTINUOUS VERTICAL SCROLL MUSHAF MODE */
            <div
              className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md text-right leading-[2.6] select-text"
              dir="rtl"
            >
              {currentSurah.ayahs.map((ayah) => {
                const isPlayingThis = isPlayingAudio && activePlayingAyah === ayah.numberInSurah;
                const isSelected = selectedParagraphAyah === ayah.numberInSurah;
                const waqfSigns = getVerseWaqfSigns(currentSurah.number, ayah.numberInSurah, ayah.textArabic);

                return (
                  <span
                    key={ayah.numberInSurah}
                    ref={(el) => {
                      ayahRefs.current[ayah.numberInSurah] = el;
                    }}
                    onClick={() => {
                      setSelectedParagraphAyah(ayah.numberInSurah);
                      handleAyahVisible(ayah.numberInSurah);
                      onOpenTafsir(ayah);
                    }}
                    className={`inline transition-all rounded-lg cursor-pointer px-1 py-0.5 ${
                      isPlayingThis
                        ? 'bg-amber-500/20 text-amber-950 dark:text-amber-100 ring-2 ring-amber-500 rounded-md'
                        : isSelected
                        ? 'bg-stone-100 dark:bg-stone-800'
                        : 'hover:bg-stone-100/60 dark:hover:bg-stone-800/60'
                    }`}
                  >
                    <span
                      className={`${
                        profile.calligraphyFont === 'scheherazade' ? 'font-scheherazade' : 'font-quran'
                      } text-stone-950 dark:text-stone-100 ${getGlowClass()}`}
                      style={{
                        fontSize: `${mushafFontSize}px`,
                        lineHeight: '2.6',
                      }}
                    >
                      {ayah.textArabic}{' '}
                    </span>

                    {/* Highlighted Tajweed Stopping Signs */}
                    {profile.showTajweedSigns && (
                      <span className="inline-flex items-center gap-1 mx-1 align-middle select-none">
                        {waqfSigns.map((sign, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedWaqfSign(sign);
                            }}
                            className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded border text-[11px] font-bold transition-transform hover:scale-115 active:scale-95 shadow-2xs ${sign.badgeColor}`}
                            title={`Click for guide: ${sign.ruleSimple}`}
                          >
                            <span className="font-quran text-[12px]">{sign.symbol}</span>
                          </button>
                        ))}
                      </span>
                    )}

                    {/* Ayah End Emblem */}
                    <span
                      className="inline-block text-amber-600 dark:text-amber-400 font-cinzel text-xs sm:text-sm font-bold mx-1 select-none"
                      title={`Ayah ${ayah.numberInSurah}`}
                    >
                      ۝ {ayah.numberInSurah}
                    </span>
                    {'  '}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 5B. VERSE-BY-VERSE CARDS FORMAT (WITH TRANSLATIONS & HADITHS) */}
      {!isLoading && currentSurah && !isParagraphMode && (
        <div className="p-4 space-y-3.5">
          {currentSurah.ayahs.map((ayah) => {
            const isPlayingThis = isPlayingAudio && activePlayingAyah === ayah.numberInSurah;
            const hadith = ayah.relatedHadith || getRelatedHadith(currentSurah.number, ayah.numberInSurah);
            const isHadithExpanded = expandedHadithAyah === ayah.numberInSurah;
            const waqfSigns = getVerseWaqfSigns(currentSurah.number, ayah.numberInSurah, ayah.textArabic);

            return (
              <div
                key={ayah.numberInSurah}
                ref={(el) => {
                  ayahRefs.current[ayah.numberInSurah] = el;
                }}
                onClick={() => handleAyahVisible(ayah.numberInSurah)}
                className={`p-4 rounded-2xl border transition-all ${
                  isPlayingThis
                    ? 'bg-amber-50/70 dark:bg-stone-900 border-amber-500 shadow-md ring-1 ring-amber-500/50'
                    : 'bg-white dark:bg-stone-900/90 border-stone-200 dark:border-stone-800'
                }`}
              >
                {/* Verse Card Top Actions */}
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-stone-100 dark:border-stone-800/60">
                  <div className="flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-lg bg-stone-100 dark:bg-stone-800 font-cinzel text-xs font-bold flex items-center justify-center text-stone-800 dark:text-stone-200">
                      {ayah.numberInSurah}
                    </span>

                    {/* Highlighted Stopping Sign pill in card mode */}
                    {profile.showTajweedSigns && waqfSigns.length > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedWaqfSign(waqfSigns[0]);
                        }}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${waqfSigns[0].badgeColor}`}
                        title="Click to see stopping rule"
                      >
                        {waqfSigns[0].symbol} Stop
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    {/* IN-DEPTH TAFSIR VIEW ICON */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenTafsir(ayah);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-lg bg-black text-white hover:bg-neutral-800 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-amber-500 transition-colors shadow-2xs"
                      title="View In-Depth Classical Tafsir"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Tafsir</span>
                    </button>

                    {/* RELATED HADITH ICON / TOGGLE */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedHadithAyah(isHadithExpanded ? null : ayah.numberInSurah);
                      }}
                      className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                        isHadithExpanded
                          ? 'bg-black text-white border border-black dark:bg-amber-500 dark:text-white'
                          : 'bg-stone-100 dark:bg-stone-800 text-black dark:text-stone-300 border border-stone-300 dark:border-stone-700'
                      }`}
                      title="View Related Prophetic Hadith"
                    >
                      <Quote className="w-3.5 h-3.5" />
                      <span>Hadith</span>
                    </button>

                    {/* Play Audio Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayAyahInReciter(ayah.numberInSurah);
                        onVerseRead();
                      }}
                      className="p-1.5 text-black dark:text-stone-300 hover:text-stone-700 dark:hover:text-white rounded-lg transition-colors"
                      title="Play recitation"
                    >
                      {isPlayingThis ? <Pause className="w-4 h-4 text-amber-500" /> : <Play className="w-4 h-4" />}
                    </button>

                    {/* Bookmark */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddBookmark(ayah.numberInSurah, 0);
                      }}
                      className="p-1.5 text-black dark:text-stone-300 hover:text-amber-500 rounded-lg transition-colors"
                      title="Bookmark verse"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>

                    {/* Copy */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyAyah(ayah);
                      }}
                      className="p-1.5 text-black dark:text-stone-300 hover:text-stone-700 dark:hover:text-white rounded-lg transition-colors"
                      title="Copy verse"
                    >
                      {copiedAyah === ayah.numberInSurah ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Arabic Calligraphy with Glow */}
                <div className="py-2 text-right" dir="rtl">
                  <p
                    className={`${
                      profile.calligraphyFont === 'scheherazade' ? 'font-scheherazade' : 'font-quran'
                    } text-black dark:text-stone-100 leading-[2.3] select-text font-bold ${getGlowClass()}`}
                    style={{ fontSize: `${profile.arabicFontSize}px` }}
                  >
                    {ayah.textArabic}
                    <span className="inline-block mr-2 text-amber-600 dark:text-amber-400 font-cinzel text-base select-none">
                      ۝ {ayah.numberInSurah}
                    </span>
                  </p>
                </div>

                {/* English Translation (Configurable in Settings) */}
                {profile.showEnglish && ayah.textEnglish && (
                  <div className="pt-2 text-black dark:text-stone-200 font-sans-ui font-medium leading-relaxed">
                    <p style={{ fontSize: `${profile.translationFontSize}px` }}>
                      {ayah.textEnglish}
                    </p>
                  </div>
                )}

                {/* Urdu Translation (Configurable in Settings) */}
                {profile.showUrdu && ayah.textUrdu && (
                  <div className="pt-2 border-t border-stone-200 dark:border-stone-800/40 text-right" dir="rtl">
                    <p
                      className="font-urdu text-black dark:text-stone-100 font-bold"
                      style={{ fontSize: `${Math.max(16, profile.translationFontSize + 2)}px` }}
                    >
                      {ayah.textUrdu}
                    </p>
                  </div>
                )}

                {/* EXPANDABLE RELATED HADITH */}
                {isHadithExpanded && hadith && (
                  <div className="mt-3 p-3.5 rounded-xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-amber-800 dark:text-amber-300 font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Quote className="w-3.5 h-3.5" />
                        <span>Related Prophetic Hadith:</span>
                      </div>
                      <span className="text-[10px] opacity-80">{hadith.source}</span>
                    </div>

                    <p className="text-stone-800 dark:text-stone-200 italic leading-relaxed">
                      "{hadith.textEnglish}"
                    </p>

                    {hadith.textUrdu && profile.showUrdu && (
                      <p className="font-urdu text-stone-700 dark:text-stone-300 text-right leading-relaxed" dir="rtl">
                        {hadith.textUrdu}
                      </p>
                    )}

                    <div className="p-2 rounded-lg bg-white/70 dark:bg-stone-900/70 text-[11px] text-amber-900 dark:text-amber-200">
                      <strong>Connection to Verse:</strong> {hadith.relevance}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Bottom Mini-Player if audio is active */}
      {activePlayingAyah && (
        <div className="fixed bottom-0 left-0 right-0 z-30 max-w-md mx-auto p-3 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <Volume2 className="w-5 h-5 text-amber-500 shrink-0" />
            <div className="min-w-0">
              <div className="text-xs font-bold text-black dark:text-white flex items-center gap-1.5 truncate">
                <span>Reciting Ayah {activePlayingAyah}</span>
                {profile.recitationLanguageMode === 'urdu' && (
                  <span className="text-[9px] px-1.5 py-0.5 bg-black text-white dark:bg-white dark:text-black rounded-md font-bold">
                    اردو
                  </span>
                )}
              </div>
              <span className="text-[10px] text-stone-700 dark:text-stone-300 truncate block font-medium">
                {currentSurah?.nameEnglish} • {profile.recitationLanguageMode === 'urdu' ? 'Urdu Voice' : profile.recitationLanguageMode === 'both' ? 'Arabic + Urdu' : 'Arabic Qari'}
              </span>
            </div>
          </div>

          <button
            onClick={onToggleAudioPlayPause}
            className="w-10 h-10 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shadow-md active:scale-95 transition-all"
            title={isPlayingAudio ? 'Pause' : 'Play'}
          >
            {isPlayingAudio ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
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
