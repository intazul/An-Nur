import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Bookmark,
  BookOpen,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Download,
  Check,
  Sparkles,
  Sliders,
  Type,
  Copy,
  RotateCcw,
  Repeat,
  Loader2,
} from 'lucide-react';
import { ALL_SURAHS } from '../data/surahList';
import { RECITERS, getAyahAudioUrl } from '../data/reciters';
import { Ayah, SurahDetail, UserProfileData } from '../types/quran';

interface QuranCenterpieceProps {
  currentSurah: SurahDetail | null;
  isLoadingSurah: boolean;
  onSelectSurah: (surahNumber: number) => void;
  profile: UserProfileData;
  onUpdateProfile: (updates: Partial<UserProfileData>) => void;
  onAddBookmark: (ayahNumber: number, timestampSeconds: number) => void;
  onOpenTafsir: (ayah: Ayah) => void;
  onDownloadSurah: (surahNumber: number) => Promise<void>;
  isDownloaded: boolean;
  onVerseRead: () => void;
  activeBookmarkTrigger?: { surahNumber: number; ayahNumber: number; timestamp: number } | null;
}

export const QuranCenterpiece: React.FC<QuranCenterpieceProps> = ({
  currentSurah,
  isLoadingSurah,
  onSelectSurah,
  profile,
  onUpdateProfile,
  onAddBookmark,
  onOpenTafsir,
  onDownloadSurah,
  isDownloaded,
  onVerseRead,
  activeBookmarkTrigger,
}) => {
  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAyahNumber, setActiveAyahNumber] = useState<number>(1);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [autoAdvance, setAutoAdvance] = useState<boolean>(true);
  const [repeatVerse, setRepeatVerse] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showDisplaySettings, setShowDisplaySettings] = useState(false);
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ayahRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Surah navigation
  const surahNum = currentSurah?.number || 1;
  const prevSurahNum = surahNum > 1 ? surahNum - 1 : 114;
  const nextSurahNum = surahNum < 114 ? surahNum + 1 : 1;

  // Handle external bookmark trigger
  useEffect(() => {
    if (activeBookmarkTrigger && currentSurah && activeBookmarkTrigger.surahNumber === currentSurah.number) {
      setActiveAyahNumber(activeBookmarkTrigger.ayahNumber);
      scrollToAyah(activeBookmarkTrigger.ayahNumber);
      if (audioRef.current) {
        audioRef.current.currentTime = activeBookmarkTrigger.timestamp;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  }, [activeBookmarkTrigger, currentSurah]);

  // Audio setup when active ayah or reciter changes
  useEffect(() => {
    if (!currentSurah) return;
    const url = getAyahAudioUrl(currentSurah.number, activeAyahNumber, profile.preferredReciter);
    
    if (audioRef.current) {
      const wasPlaying = isPlaying;
      audioRef.current.src = url;
      audioRef.current.playbackRate = playbackSpeed;
      audioRef.current.load();
      if (wasPlaying) {
        audioRef.current.play().catch((err) => {
          console.warn('Auto-play prevented:', err);
          setIsPlaying(false);
        });
      }
    }
  }, [currentSurah?.number, activeAyahNumber, profile.preferredReciter]);

  // Scroll to active ayah
  const scrollToAyah = (ayahNum: number) => {
    const el = ayahRefs.current[ayahNum];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handlePlayAyah = (ayahNum: number) => {
    if (activeAyahNumber === ayahNum && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      setActiveAyahNumber(ayahNum);
      scrollToAyah(ayahNum);
      const url = getAyahAudioUrl(surahNum, ayahNum, profile.preferredReciter);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.playbackRate = playbackSpeed;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setAudioError(null);
          onVerseRead();
        }).catch((err) => {
          console.error('Audio playback failed:', err);
          setAudioError('Audio streaming unavailable offline. Download surah for offline audio.');
          setIsPlaying(false);
        });
      }
    }
  };

  const handleTogglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setAudioError(null);
        onVerseRead();
      }).catch((err) => {
        console.error('Play error:', err);
        setAudioError('Audio failed to play. Check connection or download Surah.');
        setIsPlaying(false);
      });
    }
  };

  const handleAudioEnded = () => {
    if (repeatVerse) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      return;
    }

    if (autoAdvance && currentSurah && activeAyahNumber < currentSurah.ayahs.length) {
      const nextAyah = activeAyahNumber + 1;
      setActiveAyahNumber(nextAyah);
      scrollToAyah(nextAyah);
      onVerseRead();
    } else {
      setIsPlaying(false);
    }
  };

  const handleNextAyah = () => {
    if (!currentSurah) return;
    if (activeAyahNumber < currentSurah.ayahs.length) {
      setActiveAyahNumber(activeAyahNumber + 1);
      scrollToAyah(activeAyahNumber + 1);
    }
  };

  const handlePrevAyah = () => {
    if (activeAyahNumber > 1) {
      setActiveAyahNumber(activeAyahNumber - 1);
      scrollToAyah(activeAyahNumber - 1);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const handleCopyAyah = (ayah: Ayah) => {
    const text = `${ayah.textArabic}\n\nEnglish: ${ayah.textEnglish}\n\nUrdu: ${ayah.textUrdu}\n\n[Quran ${surahNum}:${ayah.numberInSurah}]`;
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

  // Glow class selector
  const getArabicGlowClass = () => {
    if (profile.arabicGlowMode === 'off') return 'arabic-glow-none';
    if (profile.arabicGlowMode === 'emerald') return 'arabic-glow-emerald';
    if (profile.arabicGlowMode === 'lunar') return 'arabic-glow-lunar';
    return profile.glowIntensity === 'intense' ? 'arabic-glow-gold-intense' : 'arabic-glow-gold';
  };

  const currentReciter = RECITERS.find((r) => r.id === profile.preferredReciter) || RECITERS[0];

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 pb-36 space-y-6">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 0);
          }
        }}
        onEnded={handleAudioEnded}
        onError={() => {
          setAudioError('Recitation source unreachable. You can still read text offline.');
          setIsPlaying(false);
        }}
      />

      {/* Centerpiece Top Controls Bar: Surah Picker & Jumper */}
      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-4 shadow-sm transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Previous / Next Surah Arrows & Selector */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectSurah(prevSurahNum)}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-stone-100 dark:bg-stone-800 rounded-lg transition-colors border border-stone-200 dark:border-stone-700"
              title="Previous Surah"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Surah Dropdown Picker */}
            <select
              value={surahNum}
              onChange={(e) => onSelectSurah(Number(e.target.value))}
              className="bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm font-semibold py-2 px-3 rounded-lg border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 max-w-[220px] sm:max-w-[280px]"
            >
              {ALL_SURAHS.map((s) => (
                <option key={s.number} value={s.number}>
                  {s.number}. {s.nameEnglish} · {s.nameArabic}
                </option>
              ))}
            </select>

            <button
              onClick={() => onSelectSurah(nextSurahNum)}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-stone-100 dark:bg-stone-800 rounded-lg transition-colors border border-stone-200 dark:border-stone-700"
              title="Next Surah"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Jump to Verse Selector */}
          {currentSurah && currentSurah.ayahs.length > 0 && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500 dark:text-stone-400 hidden sm:inline">Jump to:</span>
              <select
                value={activeAyahNumber}
                onChange={(e) => {
                  const num = Number(e.target.value);
                  setActiveAyahNumber(num);
                  scrollToAyah(num);
                }}
                className="bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-medium py-1.5 px-2.5 rounded-lg border border-stone-200 dark:border-stone-700"
              >
                {currentSurah.ayahs.map((a) => (
                  <option key={a.numberInSurah} value={a.numberInSurah}>
                    Ayah {a.numberInSurah}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Reciter Selector & Offline Download Action */}
          <div className="flex items-center gap-2">
            {/* Reciter dropdown */}
            <select
              value={profile.preferredReciter}
              onChange={(e) => onUpdateProfile({ preferredReciter: e.target.value })}
              className="bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-medium py-1.5 px-2.5 rounded-lg border border-stone-200 dark:border-stone-700"
              title="Select Reciter"
            >
              {RECITERS.map((r) => (
                <option key={r.id} value={r.id}>
                  🎙️ {r.name}
                </option>
              ))}
            </select>

            {/* Download for Offline Button */}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap ${
                isDownloaded
                  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 border-stone-200 dark:border-stone-700'
              }`}
              title={isDownloaded ? 'Downloaded for offline reading & recitation' : 'Download Surah for 100% offline access'}
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Caching...</span>
                </>
              ) : isDownloaded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Offline Ready</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Save Offline</span>
                </>
              )}
            </button>

            {/* Display Settings Toggle */}
            <button
              onClick={() => setShowDisplaySettings(!showDisplaySettings)}
              className={`p-2 rounded-lg border transition-colors ${
                showDisplaySettings
                  ? 'bg-amber-500 text-white border-amber-600'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700'
              }`}
              title="Adjust Font Size, Glow & Translations"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Collapsible Display & Typography Settings Drawer */}
        {showDisplaySettings && (
          <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              {/* Arabic Font Size Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span className="font-medium">Arabic Font Size</span>
                  <span className="tabular-nums font-semibold text-stone-900 dark:text-stone-100">
                    {profile.arabicFontSize}px
                  </span>
                </div>
                <input
                  type="range"
                  min="26"
                  max="52"
                  step="2"
                  value={profile.arabicFontSize}
                  onChange={(e) => onUpdateProfile({ arabicFontSize: Number(e.target.value) })}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Translation Font Size Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span className="font-medium">Translation Size</span>
                  <span className="tabular-nums font-semibold text-stone-900 dark:text-stone-100">
                    {profile.translationFontSize}px
                  </span>
                </div>
                <input
                  type="range"
                  min="13"
                  max="22"
                  step="1"
                  value={profile.translationFontSize}
                  onChange={(e) => onUpdateProfile({ translationFontSize: Number(e.target.value) })}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Arabic Calligraphy Style */}
              <div className="space-y-1.5">
                <span className="font-medium text-stone-600 dark:text-stone-400 block">
                  Calligraphy Script
                </span>
                <div className="flex rounded-lg overflow-hidden border border-stone-200 dark:border-stone-700 p-0.5 bg-stone-100 dark:bg-stone-800">
                  <button
                    onClick={() => onUpdateProfile({ calligraphyFont: 'amiri' })}
                    className={`flex-1 py-1 rounded text-xs font-medium transition-colors ${
                      profile.calligraphyFont === 'amiri'
                        ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-2xs'
                        : 'text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    Amiri Quran
                  </button>
                  <button
                    onClick={() => onUpdateProfile({ calligraphyFont: 'scheherazade' })}
                    className={`flex-1 py-1 rounded text-xs font-medium transition-colors ${
                      profile.calligraphyFont === 'scheherazade'
                        ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-2xs'
                        : 'text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    Scheherazade
                  </button>
                </div>
              </div>

              {/* Glow Intensity */}
              <div className="space-y-1.5">
                <span className="font-medium text-stone-600 dark:text-stone-400 block">
                  Night Glow Aura
                </span>
                <div className="flex rounded-lg overflow-hidden border border-stone-200 dark:border-stone-700 p-0.5 bg-stone-100 dark:bg-stone-800">
                  <button
                    onClick={() => onUpdateProfile({ glowIntensity: 'subtle' })}
                    className={`flex-1 py-1 rounded text-xs font-medium transition-colors ${
                      profile.glowIntensity === 'subtle'
                        ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-2xs'
                        : 'text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    Subtle
                  </button>
                  <button
                    onClick={() => onUpdateProfile({ glowIntensity: 'intense' })}
                    className={`flex-1 py-1 rounded text-xs font-medium transition-colors ${
                      profile.glowIntensity === 'intense'
                        ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-2xs'
                        : 'text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    Radiant
                  </button>
                </div>
              </div>
            </div>

            {/* Translation Display Toggles */}
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-stone-100 dark:border-stone-800/60">
              <span className="text-xs font-medium text-stone-500">Show Text:</span>
              <button
                onClick={() => onUpdateProfile({ showEnglish: !profile.showEnglish })}
                className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
                  profile.showEnglish
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-transparent'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700'
                }`}
              >
                English Translation
              </button>
              <button
                onClick={() => onUpdateProfile({ showUrdu: !profile.showUrdu })}
                className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
                  profile.showUrdu
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-transparent'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700'
                }`}
              >
                اردو ترجمہ (Urdu)
              </button>
              <button
                onClick={() => onUpdateProfile({ showTafsir: !profile.showTafsir })}
                className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
                  profile.showTafsir
                    ? 'bg-amber-600 text-white border-amber-700'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700'
                }`}
              >
                Tafsir Commentary Panels
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Surah Marquee Header Card */}
      {currentSurah && (
        <div className="relative rounded-2xl p-6 sm:p-8 bg-linear-to-b from-stone-900 to-stone-950 text-white shadow-xl overflow-hidden text-center border border-stone-800">
          {/* Subtle Islamic geometric ornamental ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.12),transparent_70%)] pointer-events-none" />

          <div className="relative space-y-3">
            <span className="text-xs uppercase tracking-widest text-amber-400/90 font-cinzel font-semibold">
              Surah {currentSurah.number} · {currentSurah.revelationType} · {currentSurah.numberOfAyahs} Verses
            </span>

            <h1 className="text-3xl sm:text-5xl font-quran font-bold text-amber-100 select-none tracking-wide pt-1">
              سُورَةُ {currentSurah.nameArabic}
            </h1>

            <div className="flex items-center justify-center gap-2 text-stone-300 text-base sm:text-lg">
              <span className="font-semibold text-white">{currentSurah.nameEnglish}</span>
              <span>—</span>
              <span className="text-amber-300 font-cinzel">{currentSurah.englishTranslation}</span>
              <span>—</span>
              <span className="font-urdu text-amber-200/90 text-sm">سورۃ {currentSurah.nameUrdu}</span>
            </div>

            {/* Bismillah Calligraphy for all Surahs except 1 and 9 */}
            {currentSurah.bismillahPre && (
              <div className="pt-4 pb-1">
                <p
                  className={`text-2xl sm:text-3xl font-quran text-amber-200 select-none ${getArabicGlowClass()}`}
                >
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p className="text-xs text-stone-400 italic pt-1">
                  In the name of Allah, the Entirely Merciful, the Especially Merciful
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Audio Error Banner */}
      {audioError && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-700 dark:text-amber-300 flex items-center justify-between">
          <span>{audioError}</span>
          <button
            onClick={() => setAudioError(null)}
            className="text-amber-800 dark:text-amber-200 font-semibold ml-2 underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoadingSurah && (
        <div className="py-20 text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-500" />
          <p className="text-sm text-stone-500 font-medium">Loading Sacred Verses...</p>
        </div>
      )}

      {/* Central Verses Stream */}
      {!isLoadingSurah && currentSurah && (
        <div className="space-y-4">
          {currentSurah.ayahs.map((ayah) => {
            const isPlayingThis = isPlaying && activeAyahNumber === ayah.numberInSurah;
            const isSelected = activeAyahNumber === ayah.numberInSurah;

            return (
              <div
                key={ayah.numberInSurah}
                ref={(el) => {
                  ayahRefs.current[ayah.numberInSurah] = el;
                }}
                className={`group rounded-xl p-5 sm:p-7 border transition-all duration-300 ${
                  isPlayingThis
                    ? 'bg-amber-50/50 dark:bg-stone-900 border-amber-500/70 dark:border-amber-500/80 shadow-md ring-1 ring-amber-500/40'
                    : isSelected
                    ? 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 shadow-xs'
                    : 'bg-white dark:bg-stone-900/80 border-stone-200 dark:border-stone-800/80 hover:border-stone-300 dark:hover:border-stone-700'
                }`}
              >
                {/* Verse Top Bar: Verse Emblem & Interactive Actions */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100 dark:border-stone-800/60">
                  {/* Verse Number Emblem */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-cinzel font-bold text-xs flex items-center justify-center">
                      {ayah.numberInSurah}
                    </div>
                    <span className="text-[11px] text-stone-400 uppercase tracking-wider font-cinzel">
                      {currentSurah.nameEnglish} : {ayah.numberInSurah}
                    </span>
                  </div>

                  {/* Verse Action Buttons */}
                  <div className="flex items-center gap-1">
                    {/* Play / Pause this Ayah */}
                    <button
                      onClick={() => handlePlayAyah(ayah.numberInSurah)}
                      className={`p-2 rounded-lg transition-colors ${
                        isPlayingThis
                          ? 'bg-amber-500 text-white'
                          : 'text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
                      }`}
                      title={isPlayingThis ? 'Pause Recitation' : 'Listen to this Verse'}
                    >
                      {isPlayingThis ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    {/* Bookmark Audio at this Ayah */}
                    <button
                      onClick={() => onAddBookmark(ayah.numberInSurah, currentTime)}
                      className="p-2 text-stone-600 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
                      title="Bookmark audio at this verse"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>

                    {/* Tafsir Commentary button */}
                    <button
                      onClick={() => onOpenTafsir(ayah)}
                      className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
                      title="View Detailed Tafsir Commentary"
                    >
                      <BookOpen className="w-4 h-4" />
                    </button>

                    {/* Copy text */}
                    <button
                      onClick={() => handleCopyAyah(ayah)}
                      className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
                      title="Copy Arabic & Translations"
                    >
                      {copiedAyah === ayah.numberInSurah ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Arabic Text with Calligraphy & Glow Effect */}
                <div className="py-3 text-right" dir="rtl">
                  <p
                    className={`${
                      profile.calligraphyFont === 'scheherazade' ? 'font-scheherazade' : 'font-quran'
                    } text-stone-950 dark:text-stone-100 font-normal leading-[2.3] select-text transition-all ${getArabicGlowClass()}`}
                    style={{ fontSize: `${profile.arabicFontSize}px` }}
                  >
                    {ayah.textArabic}
                    <span className="inline-block mr-3 text-amber-600 dark:text-amber-400 font-cinzel text-lg select-none">
                      ۝ {ayah.numberInSurah}
                    </span>
                  </p>
                </div>

                {/* English Translation */}
                {profile.showEnglish && ayah.textEnglish && (
                  <div className="pt-3 pb-2 text-stone-700 dark:text-stone-300 leading-relaxed font-sans-ui">
                    <p style={{ fontSize: `${profile.translationFontSize}px` }}>
                      {ayah.textEnglish}
                    </p>
                  </div>
                )}

                {/* Urdu Translation in Nastaliq */}
                {profile.showUrdu && ayah.textUrdu && (
                  <div className="pt-2 pb-2 text-right border-t border-stone-100 dark:border-stone-800/40" dir="rtl">
                    <p
                      className="font-urdu text-stone-800 dark:text-stone-200"
                      style={{ fontSize: `${Math.max(16, profile.translationFontSize + 2)}px` }}
                    >
                      {ayah.textUrdu}
                    </p>
                  </div>
                )}

                {/* Inline Tafsir Summary Commentary */}
                {(profile.showTafsir || ayah.tafsirSummary) && profile.showTafsir && (
                  <div className="mt-3 p-3.5 rounded-lg bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800/80 text-xs text-stone-600 dark:text-stone-400 space-y-1">
                    <div className="flex items-center justify-between text-amber-700 dark:text-amber-400 font-semibold">
                      <span>Tafsir & Contemplation:</span>
                      <button
                        onClick={() => onOpenTafsir(ayah)}
                        className="underline hover:text-amber-800 dark:hover:text-amber-300"
                      >
                        Read Deep Commentary →
                      </button>
                    </div>
                    <p className="leading-relaxed">{ayah.tafsirSummary}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* FIXED AUDIO RECITER PLAYER (Docked at the bottom of the dashboard) */}
      {currentSurah && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 shadow-xl transition-colors">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Left: Current Track Info */}
              <div className="flex items-center gap-3 w-full sm:w-auto min-w-0">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Volume2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-900 dark:text-stone-100 text-sm truncate">
                      Surah {currentSurah.nameEnglish} · Ayah {activeAyahNumber}
                    </span>
                    <span className="text-[11px] text-amber-600 dark:text-amber-400 font-cinzel">
                      {currentSurah.nameArabic}
                    </span>
                  </div>
                  <div className="text-xs text-stone-500 dark:text-stone-400 truncate">
                    Reciter: {currentReciter.name}
                  </div>
                </div>
              </div>

              {/* Center: Playback Controls */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Previous Ayah */}
                <button
                  onClick={handlePrevAyah}
                  disabled={activeAyahNumber <= 1}
                  className="p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white disabled:opacity-40 transition-colors"
                  title="Previous Verse"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                {/* Play / Pause Primary Button */}
                <button
                  onClick={handleTogglePlayPause}
                  className="w-11 h-11 rounded-full bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 hover:bg-stone-800 dark:hover:bg-white flex items-center justify-center shadow-md transition-all active:scale-95"
                  title={isPlaying ? 'Pause' : 'Play Recitation'}
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>

                {/* Next Ayah */}
                <button
                  onClick={handleNextAyah}
                  disabled={activeAyahNumber >= (currentSurah.ayahs.length || 1)}
                  className="p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white disabled:opacity-40 transition-colors"
                  title="Next Verse"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                {/* Repeat Verse (Memorization Mode) */}
                <button
                  onClick={() => setRepeatVerse(!repeatVerse)}
                  className={`p-2 rounded-lg transition-colors ${
                    repeatVerse
                      ? 'bg-amber-500 text-white'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                  }`}
                  title={repeatVerse ? 'Repeat Ayah Active (Click to disable)' : 'Repeat this Ayah for memorization'}
                >
                  <Repeat className="w-4 h-4" />
                </button>

                {/* Quick Add Bookmark at this instant */}
                <button
                  onClick={() => onAddBookmark(activeAyahNumber, currentTime)}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-colors"
                  title="Bookmark this moment"
                >
                  <Bookmark className="w-3.5 h-3.5 fill-amber-500/30" />
                  <span className="hidden md:inline">Bookmark</span>
                </button>
              </div>

              {/* Right: Audio Speed & Auto-Advance */}
              <div className="flex items-center gap-2 text-xs">
                {/* Speed selector */}
                <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-md border border-stone-200 dark:border-stone-700 p-0.5">
                  {[0.75, 1, 1.25].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => handleSpeedChange(spd)}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                        playbackSpeed === spd
                          ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-2xs'
                          : 'text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>

                {/* Auto advance checkbox */}
                <label className="flex items-center gap-1.5 text-stone-600 dark:text-stone-400 select-none cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoAdvance}
                    onChange={(e) => setAutoAdvance(e.target.checked)}
                    className="accent-amber-500 rounded"
                  />
                  <span className="hidden lg:inline text-[11px]">Auto Next</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
