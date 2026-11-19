import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronDown,
  SlidersHorizontal,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Heart,
  Bookmark,
  BookOpen,
  Volume2,
  X,
  Check,
  Settings,
  ChevronLeft,
  ChevronRight,
  Download,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { ALL_SURAHS } from '../data/surahList';
import { ARABIC_RECITERS, ENGLISH_RECITERS, URDU_RECITERS } from '../data/reciters';
import { transliterateUrduToRoman } from '../utils/urduTransliteration';
import { UrduAudioSyncProgress } from '../utils/offlineStorage';
import {
  Ayah,
  RecitationLanguageMode,
  RecitationLyricsLanguage,
  SurahDetail,
  UserProfileData,
} from '../types/quran';

interface AndroidRecitationViewProps {
  currentSurah: SurahDetail | null;
  activeAyahNumber: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackSpeed: number;
  repeatVerse: boolean;
  onBackToDashboard: () => void;
  onTogglePlayPause: () => void;
  onNextAyah: () => void;
  onPrevAyah: () => void;
  onToggleRepeatVerse: () => void;
  onChangeSpeed: (speed: number) => void;
  onSeekTime?: (seconds: number) => void;
  onSelectSurah: (surahNum: number) => void;
  onSelectAyah: (ayahNum: number) => void;
  onPlayAyah?: (ayahNum: number) => void;
  onAddBookmark: (ayahNumber: number, timestampSeconds: number) => void;
  profile: UserProfileData;
  onOpenSettings: () => void;
  onOpenTafsir: (ayah: Ayah) => void;
  onToggleFavoriteSurah: (surahNum: number) => void;
  isFavoriteSurah: boolean;
  onUpdateProfile?: (updates: Partial<UserProfileData>) => void;
  currentAudioPhase?: 'arabic' | 'urdu' | 'english';
  isCurrentSurahAudioOffline?: boolean;
  isCurrentSurahUrduAudioOffline?: boolean;
  urduAudioSyncProgress?: UrduAudioSyncProgress | null;
  offlineSpeechReady?: boolean;
  isOnline?: boolean;
  surahAudioDownloadProgress?: { current: number; total: number } | null;
  onDownloadCurrentSurahOffline?: () => void;
  ayahLoopRange?: { enabled: boolean; fromAyah: number; toAyah: number };
  onUpdateAyahLoopRange?: (next: { enabled: boolean; fromAyah: number; toAyah: number }) => void;
}

export const AndroidRecitationView: React.FC<AndroidRecitationViewProps> = ({
  currentSurah,
  activeAyahNumber,
  isPlaying,
  currentTime,
  duration,
  playbackSpeed,
  repeatVerse,
  onBackToDashboard,
  onTogglePlayPause,
  onNextAyah,
  onPrevAyah,
  onToggleRepeatVerse,
  onChangeSpeed,
  onSeekTime,
  onSelectSurah,
  onSelectAyah,
  onPlayAyah,
  onAddBookmark,
  profile,
  onOpenSettings,
  onOpenTafsir,
  onToggleFavoriteSurah,
  isFavoriteSurah,
  onUpdateProfile,
  currentAudioPhase = 'arabic',
  isCurrentSurahAudioOffline = false,
  isCurrentSurahUrduAudioOffline = false,
  urduAudioSyncProgress = null,
  offlineSpeechReady = true,
  isOnline = true,
  surahAudioDownloadProgress = null,
  onDownloadCurrentSurahOffline,
  ayahLoopRange,
  onUpdateAyahLoopRange,
}) => {
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false);
  const activeLyricRef = useRef<HTMLButtonElement | null>(null);

  const ayahs = currentSurah?.ayahs || [];
  const currentAyah: Ayah | undefined =
    ayahs.find((a) => a.numberInSurah === activeAyahNumber) || ayahs[0];

  const recitationMode: RecitationLanguageMode = profile.recitationLanguageMode || 'arabic';

  // Determine Lyrics language cleanly, honoring strict Urdu vs Assamese exclusivity
  const lyricsLang: RecitationLyricsLanguage = useMemo(() => {
    const saved = profile.recitationLyricsLanguage;
    if (saved === 'urdu' && profile.showAssamese) return 'assamese';
    if (saved === 'assamese' && profile.showUrdu) return 'urdu';
    if (saved) return saved;
    if (profile.showAssamese && !profile.showUrdu) return 'assamese';
    return 'arabic';
  }, [profile.recitationLyricsLanguage, profile.showAssamese, profile.showUrdu]);

  const currentArabicReciter =
    ARABIC_RECITERS.find((r) => r.id === profile.preferredReciter) || ARABIC_RECITERS[0];
  const currentUrduReciter =
    URDU_RECITERS.find((r) => r.id === (profile.preferredUrduReciter || 'shamshad')) ||
    URDU_RECITERS[0];

  const activeVoiceLabel = useMemo(() => {
    if (currentAudioPhase === 'english') return ENGLISH_RECITERS[0].name;
    if (currentAudioPhase === 'urdu') return currentUrduReciter.name;
    return currentArabicReciter.name;
  }, [currentAudioPhase, currentArabicReciter.name, currentUrduReciter.name]);

  const modeBadgeLabel = useMemo(() => {
    switch (recitationMode) {
      case 'english':
        return 'English';
      case 'urdu':
        return 'Urdu';
      case 'arabic_english':
        return 'Arabic + English';
      case 'arabic_urdu':
      case 'both':
        return 'Arabic + Urdu';
      default:
        return 'Arabic';
    }
  }, [recitationMode]);

  // Smoothly keep the active Ayah centered inside the Spotify Lyrics container
  useEffect(() => {
    if (activeLyricRef.current) {
      activeLyricRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeAyahNumber, currentSurah?.number, lyricsLang]);

  const formatTime = (secs: number) => {
    const safe = Math.max(0, Math.floor(secs || 0));
    const m = Math.floor(safe / 60);
    const s = safe % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const surahNum = currentSurah?.number || 1;
  const totalAyahs = ayahs.length || 1;

  const getLyricText = (ayah: Ayah): string => {
    if (lyricsLang === 'english') return ayah.textEnglish || ayah.textArabic;
    if (lyricsLang === 'urdu' && !profile.showAssamese) {
      return ayah.textUrdu ? transliterateUrduToRoman(ayah.textUrdu) : ayah.textEnglish;
    }
    if (lyricsLang === 'assamese' && !profile.showUrdu) {
      return ayah.textAssamese || ayah.textEnglish;
    }
    return ayah.textArabic;
  };

  const getLyricTextClass = (isActive: boolean): string => {
    if (lyricsLang === 'arabic') {
      return `${
        profile.calligraphyFont === 'scheherazade' ? 'font-scheherazade' : 'font-quran'
      } text-right leading-[2.15] ${isActive ? 'text-2xl sm:text-[26px]' : 'text-lg sm:text-xl'}`;
    }
    if (lyricsLang === 'urdu') {
      return `font-book-serif text-left leading-[1.65] ${isActive ? 'text-[17px] sm:text-lg' : 'text-sm sm:text-base'}`;
    }
    if (lyricsLang === 'assamese') {
      return `font-assamese text-left leading-[1.7] ${isActive ? 'text-[17px] sm:text-lg' : 'text-sm'}`;
    }
    return `font-book-serif text-left leading-[1.6] ${isActive ? 'text-[17px] sm:text-lg' : 'text-sm'}`;
  };

  const cycleSpeed = () => {
    const speeds = [0.75, 1, 1.25];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    onChangeSpeed(speeds[nextIdx]);
  };

  const handleLyricsSwitch = (lang: RecitationLyricsLanguage) => {
    if (lang === 'urdu') {
      onUpdateProfile?.({ recitationLyricsLanguage: 'urdu', showUrdu: true, showAssamese: false });
    } else if (lang === 'assamese') {
      onUpdateProfile?.({ recitationLyricsLanguage: 'assamese', showAssamese: true, showUrdu: false });
    } else {
      onUpdateProfile?.({ recitationLyricsLanguage: lang });
    }
  };

  const handleAudioModeSwitch = (mode: RecitationLanguageMode) => {
    if (mode === 'urdu' || mode === 'arabic_urdu' || mode === 'both') {
      onUpdateProfile?.({
        recitationLanguageMode: mode,
        showUrdu: true,
        showAssamese: false,
      });
    } else {
      onUpdateProfile?.({ recitationLanguageMode: mode });
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between h-full max-h-screen w-full mx-auto bg-white dark:bg-black text-black dark:text-white px-5 pt-2 pb-4 overflow-hidden select-none relative">
      {/* 1. SPOTIFY-STYLE TOP HEADER */}
      <header className="shrink-0 flex items-center justify-between h-12">
        <button
          onClick={onBackToDashboard}
          className="min-w-[44px] min-h-[44px] -ml-2 flex items-center justify-center rounded-full text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-transform"
          title="Minimize Player"
          aria-label="Back to Dashboard"
        >
          <ChevronDown className="w-6 h-6 stroke-[2.2]" />
        </button>

        <button
          onClick={() => setIsQuickSettingsOpen(true)}
          className="text-center min-w-0 px-2 py-1 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          title="Change Surah or Ayah"
        >
          <span className="text-[10px] uppercase tracking-[0.16em] text-black/60 dark:text-white/60 font-bold block leading-tight">
            Playing from Surah {surahNum}
          </span>
          <span className="text-xs font-bold font-cinzel text-black dark:text-white truncate block">
            {currentSurah?.nameEnglish || 'Holy Quran'} · Ayah {activeAyahNumber}/{totalAyahs}
          </span>
        </button>

        {/* EXTRA SETTINGS BUTTON (Change Surah, Ayah, English/Urdu/Assamese Mode) */}
        <button
          onClick={() => setIsQuickSettingsOpen(true)}
          className="min-w-[44px] min-h-[44px] -mr-2 flex items-center justify-center rounded-full text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-transform"
          title="Player Settings (Surah, Ayah & Language)"
          aria-label="Open Recitation Settings"
        >
          <SlidersHorizontal className="w-5 h-5 stroke-[2.2]" />
        </button>
      </header>

      {/* 2. SPOTIFY LYRICS STAGE (ZERO OUTER VERTICAL SCROLL) */}
      <section className="flex-1 min-h-0 my-2 rounded-3xl bg-stone-100 dark:bg-stone-950 border border-black/10 dark:border-white/15 flex flex-col overflow-hidden">
        {/* Lyrics Top Bar: Script Quick Switch (Arabic / English / Regional) */}
        <div className="shrink-0 px-4 py-2.5 border-b border-black/10 dark:border-white/10 flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold tracking-wider uppercase text-black/60 dark:text-white/60">
            Lyrics
          </span>

          <div className="flex items-center gap-1 bg-black/5 dark:bg-white/10 p-0.5 rounded-lg">
            <button
              onClick={() => handleLyricsSwitch('arabic')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors whitespace-nowrap ${
                lyricsLang === 'arabic'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white'
              }`}
            >
              Arabic
            </button>
            <button
              onClick={() => handleLyricsSwitch('english')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors whitespace-nowrap ${
                lyricsLang === 'english'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white'
              }`}
            >
              English
            </button>
            {profile.showAssamese && !profile.showUrdu ? (
              <button
                onClick={() => handleLyricsSwitch('assamese')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors whitespace-nowrap ${
                  lyricsLang === 'assamese'
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white'
                }`}
              >
                অসমীয়া
              </button>
            ) : (
              <button
                onClick={() => handleLyricsSwitch('urdu')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors whitespace-nowrap ${
                  lyricsLang === 'urdu'
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white'
                }`}
              >
                Urdu (Roman)
              </button>
            )}
          </div>
        </div>

        {/* Synced Lyrics Lines Viewport */}
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 py-10 space-y-4">
          {ayahs.map((ayah) => {
            const isActive = ayah.numberInSurah === activeAyahNumber;
            const isRtl = lyricsLang === 'arabic';
            return (
              <button
                key={ayah.numberInSurah}
                ref={isActive ? activeLyricRef : null}
                onClick={() => {
                  if (onPlayAyah) {
                    onPlayAyah(ayah.numberInSurah);
                  } else {
                    onSelectAyah(ayah.numberInSurah);
                  }
                }}
                dir={isRtl ? 'rtl' : 'ltr'}
                className={`w-full block transition-all duration-300 rounded-2xl px-2 py-1.5 ${
                  isActive
                    ? 'text-black dark:text-white opacity-100 font-bold'
                    : 'text-black/35 dark:text-white/35 hover:text-black/70 dark:hover:text-white/70 font-medium'
                }`}
              >
                <div className={getLyricTextClass(isActive)}>
                  <span>{getLyricText(ayah)}</span>
                  <span
                    className={`inline-block font-mono text-[11px] font-bold opacity-55 ${
                      isRtl ? 'mr-2' : 'ml-2'
                    }`}
                  >
                    ({ayah.numberInSurah})
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. SPOTIFY BOTTOM DECK (TRACK INFO + SCRUBBER + 5 TRANSPORT BUTTONS + UTILITY STRIP) */}
      <footer className="shrink-0 pt-1 space-y-3">
        {/* Track Identity & Like/Tafsir Row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shrink-0 font-quran text-base font-bold">
              {currentSurah?.nameArabic || 'سورة'}
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-black dark:text-white truncate leading-tight">
                {currentSurah ? `Surah ${currentSurah.nameEnglish}` : 'Holy Quran'} · Ayah{' '}
                {activeAyahNumber}
              </h2>
              <p className="text-xs text-black/65 dark:text-white/65 font-medium truncate">
                {activeVoiceLabel}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-0.5 shrink-0">
            {currentAyah && (
              <button
                onClick={() => onOpenTafsir(currentAyah)}
                className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-transform"
                title="View Ayah Tafsir"
                aria-label="View Ayah Tafsir"
              >
                <BookOpen className="w-5 h-5 stroke-[2]" />
              </button>
            )}
            {currentSurah && (
              <button
                onClick={() => onToggleFavoriteSurah(currentSurah.number)}
                className="min-w-[40px] min-h-[40px] -mr-1.5 flex items-center justify-center rounded-full text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-transform"
                title={isFavoriteSurah ? 'Remove from Favorites' : 'Save Surah to Favorites'}
                aria-label="Favorite Surah"
              >
                <Heart
                  className={`w-5 h-5 stroke-[2.2] ${
                    isFavoriteSurah ? 'fill-black dark:fill-white' : ''
                  }`}
                />
              </button>
            )}
          </div>
        </div>

        {/* Spotify Progress Bar */}
        <div className="space-y-1">
          <div className="relative flex items-center h-4">
            <div className="w-full h-1 bg-black/15 dark:bg-white/20 rounded-full overflow-hidden pointer-events-none">
              <div
                className="h-full bg-black dark:bg-white rounded-full transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <input
              type="range"
              min={0}
              max={duration > 0 ? duration : 1}
              step={0.1}
              value={Math.min(currentTime, duration || 1)}
              onChange={(e) => onSeekTime?.(Number(e.target.value))}
              aria-label="Recitation Seek Slider"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-[11px] text-black/60 dark:text-white/60 font-mono tabular-nums font-medium">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Exact 5-Button Spotify Transport Controls */}
        <div className="flex items-center justify-between px-1">
          {/* 1. Speed Toggle (Far Left) */}
          <button
            onClick={cycleSpeed}
            className="min-w-[44px] min-h-[44px] flex flex-col items-center justify-center rounded-full text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-transform"
            title="Playback Speed"
            aria-label="Change playback speed"
          >
            <span className="text-xs font-mono font-bold tabular-nums">{playbackSpeed}x</span>
          </button>

          {/* 2. Previous Ayah */}
          <button
            onClick={onPrevAyah}
            disabled={activeAyahNumber <= 1}
            className="min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full text-black dark:text-white disabled:opacity-25 active:scale-90 transition-transform"
            title="Previous Ayah"
            aria-label="Previous Ayah"
          >
            <SkipBack className="w-7 h-7 fill-current" />
          </button>

          {/* 3. Primary Spotify Play / Pause Circle */}
          <button
            onClick={onTogglePlayPause}
            className="w-16 h-16 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            title={isPlaying ? 'Pause' : 'Play'}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-current" />
            ) : (
              <Play className="w-7 h-7 fill-current ml-0.5" />
            )}
          </button>

          {/* 4. Next Ayah */}
          <button
            onClick={onNextAyah}
            disabled={activeAyahNumber >= totalAyahs}
            className="min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full text-black dark:text-white disabled:opacity-25 active:scale-90 transition-transform"
            title="Next Ayah"
            aria-label="Next Ayah"
          >
            <SkipForward className="w-7 h-7 fill-current" />
          </button>

          {/* 5. Repeat Ayah (Far Right with Spotify active dot) */}
          <button
            onClick={onToggleRepeatVerse}
            className={`min-w-[44px] min-h-[44px] flex flex-col items-center justify-center rounded-full active:scale-95 transition-transform ${
              repeatVerse
                ? 'text-black dark:text-white'
                : 'text-black/45 dark:text-white/45 hover:text-black dark:hover:text-white'
            }`}
            title={repeatVerse ? 'Repeat Ayah On' : 'Repeat Ayah Off'}
            aria-label="Toggle repeat ayah"
          >
            <Repeat className="w-5 h-5 stroke-[2.3]" />
            {repeatVerse && (
              <span className="w-1 h-1 rounded-full bg-black dark:bg-white mt-0.5" />
            )}
          </button>
        </div>

        {/* Bottom Utility Strip (Mode Trigger + Bookmark + Extra Settings) */}
        <div className="flex items-center justify-between pt-0.5 text-xs">
          <button
            onClick={() => setIsQuickSettingsOpen(true)}
            className="flex items-center gap-1.5 py-1.5 px-2 -ml-2 rounded-lg text-black/75 dark:text-white/75 hover:text-black dark:hover:text-white font-semibold truncate max-w-[70%]"
            title="Change Language, Clarity & Offline Audio"
          >
            <Volume2 className="w-4 h-4 shrink-0" />
            <span className="truncate">
              {modeBadgeLabel}
              {currentAudioPhase === 'urdu'
                ? isCurrentSurahAudioOffline || isCurrentSurahUrduAudioOffline || urduAudioSyncProgress?.isComplete
                  ? ' · Offline Male MP3'
                  : urduAudioSyncProgress && isOnline
                  ? ` · Saving Offline (${urduAudioSyncProgress.percent}%)`
                  : isOnline
                  ? ' · Shamshad Ali Khan MP3'
                  : offlineSpeechReady
                  ? ' · Offline Voice'
                  : ' · Save Audio Offline'
                : isCurrentSurahAudioOffline
                ? ' · Offline MP3'
                : currentAudioPhase === 'english'
                ? isOnline
                  ? ' · Studio MP3'
                  : offlineSpeechReady
                  ? ' · Offline Voice'
                  : ' · Save Audio Offline'
                : ''}
            </span>
          </button>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onAddBookmark(activeAyahNumber, currentTime)}
              className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full text-black/75 dark:text-white/75 hover:text-black dark:hover:text-white active:scale-95 transition-transform"
              title="Bookmark Ayah"
              aria-label="Bookmark Ayah"
            >
              <Bookmark className="w-4 h-4 stroke-[2.2]" />
            </button>
            <button
              onClick={() => setIsQuickSettingsOpen(true)}
              className="min-w-[40px] min-h-[40px] -mr-2 flex items-center justify-center rounded-full text-black/75 dark:text-white/75 hover:text-black dark:hover:text-white active:scale-95 transition-transform"
              title="Surah, Ayah & Language Controls"
              aria-label="Player Quick Settings"
            >
              <SlidersHorizontal className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </footer>

      {/* 4. EXTRA SETTINGS BOTTOM SHEET (Surah, Ayah, English/Urdu/Assamese & Lyrics Controls) */}
      {isQuickSettingsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 backdrop-blur-xs animate-in fade-in"
          onClick={() => setIsQuickSettingsOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-stone-950 rounded-t-3xl border-t border-black/15 dark:border-white/20 shadow-2xl max-h-[85vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag Handle */}
            <div className="w-10 h-1 bg-black/20 dark:bg-white/25 rounded-full mx-auto mt-3 mb-1 shrink-0" />

            {/* Sheet Header */}
            <div className="px-5 py-3 border-b border-black/10 dark:border-white/15 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-black dark:text-white" />
                <h3 className="text-sm font-bold font-cinzel text-black dark:text-white">
                  Player Settings
                </h3>
              </div>
              <button
                onClick={() => setIsQuickSettingsOpen(false)}
                className="w-9 h-9 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center active:scale-95 transition-transform"
                aria-label="Close Settings"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Scrollable Quick Settings Content */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
              {/* A. Surah & Ayah Selector */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-black/60 dark:text-white/60 block">
                  Surah & Ayah
                </span>
                <div className="grid grid-cols-1 gap-2.5">
                  <div>
                    <label className="text-xs font-bold text-black dark:text-white block mb-1">
                      Select Surah
                    </label>
                    <select
                      value={surahNum}
                      onChange={(e) => onSelectSurah(Number(e.target.value))}
                      className="w-full h-11 px-3 rounded-xl bg-stone-100 dark:bg-stone-900 border border-black/15 dark:border-white/15 text-xs font-bold text-black dark:text-white focus:outline-none"
                    >
                      {ALL_SURAHS.map((s) => (
                        <option key={s.number} value={s.number}>
                          {s.number}. {s.nameEnglish} ({s.nameArabic}) — {s.numberOfAyahs} Ayahs
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-black dark:text-white block mb-1">
                      Select Ayah (1 – {totalAyahs})
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={onPrevAyah}
                        disabled={activeAyahNumber <= 1}
                        className="w-11 h-11 rounded-xl bg-black text-white dark:bg-white dark:text-black disabled:opacity-30 flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                        aria-label="Previous Ayah"
                      >
                        <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                      </button>

                      <select
                        value={activeAyahNumber}
                        onChange={(e) => onSelectAyah(Number(e.target.value))}
                        className="flex-1 h-11 px-3 rounded-xl bg-stone-100 dark:bg-stone-900 border border-black/15 dark:border-white/15 text-xs font-bold text-black dark:text-white focus:outline-none text-center"
                      >
                        {ayahs.map((a) => (
                          <option key={a.numberInSurah} value={a.numberInSurah}>
                            Ayah {a.numberInSurah}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={onNextAyah}
                        disabled={activeAyahNumber >= totalAyahs}
                        className="w-11 h-11 rounded-xl bg-black text-white dark:bg-white dark:text-black disabled:opacity-30 flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                        aria-label="Next Ayah"
                      >
                        <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* B. Lyrics Display Script (Arabic | English | Urdu | Assamese) */}
              <div className="space-y-2">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-black/60 dark:text-white/60 block">
                    Lyrics Language
                  </span>
                  <span className="text-[11px] text-black/55 dark:text-white/55">
                    Only Urdu or Assamese can be active at a time
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {(
                    [
                      { id: 'arabic', label: 'Arabic', sub: 'عربي' },
                      { id: 'english', label: 'English', sub: 'En' },
                      { id: 'urdu', label: 'Urdu', sub: 'Roman English' },
                      { id: 'assamese', label: 'Assamese', sub: 'অসমীয়া' },
                    ] as const
                  ).map((item) => {
                    const active = lyricsLang === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleLyricsSwitch(item.id)}
                        className={`py-2 px-1.5 rounded-xl border text-center transition-all ${
                          active
                            ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white font-bold shadow-xs'
                            : 'bg-stone-100 dark:bg-stone-900 border-black/10 dark:border-white/15 text-black dark:text-white/80 font-medium'
                        }`}
                      >
                        <div className="text-xs font-bold leading-tight">{item.label}</div>
                        <div className="text-[10px] opacity-75">{item.sub}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* C. Recitation Audio Mode (Arabic, 100% Offline English & Urdu) */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-black/60 dark:text-white/60 block">
                  Recitation Audio Mode
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      { id: 'arabic', title: 'Arabic Qari', desc: 'Original recitation' },
                      { id: 'english', title: 'English Audio', desc: 'Human Studio MP3' },
                      { id: 'urdu', title: 'Urdu Audio', desc: 'Male Human MP3 · Offline' },
                      { id: 'arabic_english', title: 'Arabic + English', desc: 'Sequential · Studio MP3' },
                      { id: 'arabic_urdu', title: 'Arabic + Urdu', desc: 'Sequential · Male Urdu MP3' },
                    ] as const
                  ).map((modeItem) => {
                    const isSelected =
                      recitationMode === modeItem.id ||
                      (modeItem.id === 'arabic_urdu' && recitationMode === 'both');
                    return (
                      <button
                        key={modeItem.id}
                        onClick={() => handleAudioModeSwitch(modeItem.id)}
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between gap-2 transition-all ${
                          isSelected
                            ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white font-bold shadow-xs'
                            : 'bg-stone-100 dark:bg-stone-900 border-black/10 dark:border-white/15 text-black dark:text-white/85 font-medium'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="text-xs font-bold truncate">{modeItem.title}</div>
                          <div className="text-[10px] opacity-75 truncate">{modeItem.desc}</div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* D. Voice / Reciter Selection */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-black/60 dark:text-white/60 block">
                  Voice & Qari
                </span>

                {(recitationMode === 'arabic' ||
                  recitationMode === 'both' ||
                  recitationMode === 'arabic_english' ||
                  recitationMode === 'arabic_urdu') && (
                  <div>
                    <label className="text-xs font-bold text-black dark:text-white block mb-1">
                      Arabic Qari
                    </label>
                    <select
                      value={profile.preferredReciter}
                      onChange={(e) => onUpdateProfile?.({ preferredReciter: e.target.value })}
                      className="w-full h-11 px-3 rounded-xl bg-stone-100 dark:bg-stone-900 border border-black/15 dark:border-white/15 text-xs font-bold text-black dark:text-white focus:outline-none"
                    >
                      {ARABIC_RECITERS.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {(recitationMode === 'urdu' ||
                  recitationMode === 'both' ||
                  recitationMode === 'arabic_urdu') && (
                  <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-900 border border-black/15 dark:border-white/15 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-black dark:text-white">
                        Urdu Reciter (Male Human Voice)
                      </span>
                      <span className="text-[10px] font-mono font-bold text-black/70 dark:text-white/70">
                        {urduAudioSyncProgress?.isComplete
                          ? '114/114 Offline'
                          : urduAudioSyncProgress
                          ? `${urduAudioSyncProgress.percent}% Offline`
                          : 'Offline Ready'}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-black/85 dark:text-white/85">
                      {URDU_RECITERS[0].name}
                    </div>
                    <div className="text-[10px] text-black/60 dark:text-white/60">
                      {URDU_RECITERS[0].style}
                    </div>
                  </div>
                )}
              </div>

              {/* E. Pronunciation Clarity & Offline Audio */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-black/60 dark:text-white/60 block">
                  Pronunciation Clarity & Offline Audio
                </span>

                <button
                  onClick={() =>
                    onUpdateProfile?.({
                      vocalClarityEnhancer: profile.vocalClarityEnhancer === false ? true : false,
                    })
                  }
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between gap-2 transition-all ${
                    profile.vocalClarityEnhancer !== false
                      ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white font-bold'
                      : 'bg-stone-100 dark:bg-stone-900 border-black/10 dark:border-white/15 text-black dark:text-white/85 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">Clear Pronunciation & Vocal EQ</div>
                      <div className="text-[10px] opacity-75 truncate">
                        Sharpens Arabic, English & Urdu Vocal Clarity
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-white/15 dark:bg-black/15 shrink-0">
                    {profile.vocalClarityEnhancer !== false ? 'ON' : 'OFF'}
                  </span>
                </button>

                {onDownloadCurrentSurahOffline && currentSurah && (
                  <button
                    onClick={onDownloadCurrentSurahOffline}
                    disabled={Boolean(surahAudioDownloadProgress)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between gap-2 transition-all ${
                      isCurrentSurahAudioOffline
                        ? 'bg-stone-100 dark:bg-stone-900 border-black/25 dark:border-white/30 text-black dark:text-white'
                        : 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white font-bold'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {surahAudioDownloadProgress ? (
                        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                      ) : isCurrentSurahAudioOffline ? (
                        <Check className="w-4 h-4 stroke-[3] shrink-0" />
                      ) : (
                        <Download className="w-4 h-4 shrink-0" />
                      )}
                      <div className="min-w-0">
                        <div className="text-xs font-bold truncate">
                          {surahAudioDownloadProgress
                            ? `Saving ${currentSurah.nameEnglish} (${surahAudioDownloadProgress.current}/${surahAudioDownloadProgress.total})`
                            : isCurrentSurahAudioOffline
                            ? `${currentSurah.nameEnglish} Audio Saved Offline`
                            : `Save ${currentSurah.nameEnglish} Audio Offline`}
                        </div>
                        <div className="text-[10px] opacity-75 truncate">
                          Caches Arabic Qari + English + Urdu MP3s locally for 100% offline playback
                        </div>
                      </div>
                    </div>
                  </button>
                )}
              </div>

              {/* E2. Hifz Ayah Loop Range */}
              {currentSurah && ayahLoopRange && onUpdateAyahLoopRange && (
                <div className="space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-black/60 dark:text-white/60 block">
                    Hifz Memorization Loop
                  </span>

                  <div className="p-3 rounded-xl border border-black/15 dark:border-white/15 bg-stone-50 dark:bg-stone-900 space-y-2.5">
                    <button
                      onClick={() =>
                        onUpdateAyahLoopRange({
                          enabled: !ayahLoopRange.enabled,
                          fromAyah: Math.max(1, Math.min(ayahLoopRange.fromAyah, currentSurah.numberOfAyahs)),
                          toAyah: Math.max(
                            ayahLoopRange.fromAyah,
                            Math.min(ayahLoopRange.toAyah, currentSurah.numberOfAyahs)
                          ),
                        })
                      }
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        ayahLoopRange.enabled
                          ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white font-bold'
                          : 'bg-white dark:bg-black border-black/15 dark:border-white/20 text-black dark:text-white font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Repeat className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-xs">Loop Custom Ayah Range</span>
                      </div>
                      <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-white/15 dark:bg-black/15">
                        {ayahLoopRange.enabled ? 'ON' : 'OFF'}
                      </span>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-black/70 dark:text-white/70 block mb-1">
                          From Ayah
                        </label>
                        <select
                          value={ayahLoopRange.fromAyah}
                          onChange={(e) => {
                            const nextFrom = Number(e.target.value);
                            onUpdateAyahLoopRange({
                              ...ayahLoopRange,
                              fromAyah: nextFrom,
                              toAyah: Math.max(nextFrom, ayahLoopRange.toAyah),
                            });
                          }}
                          className="w-full h-10 px-2.5 rounded-xl bg-white dark:bg-black border border-black/15 dark:border-white/20 text-xs font-bold text-black dark:text-white"
                        >
                          {ayahs.map((a) => (
                            <option key={a.numberInSurah} value={a.numberInSurah}>
                              Ayah {a.numberInSurah}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-black/70 dark:text-white/70 block mb-1">
                          To Ayah
                        </label>
                        <select
                          value={ayahLoopRange.toAyah}
                          onChange={(e) => {
                            const nextTo = Number(e.target.value);
                            onUpdateAyahLoopRange({
                              ...ayahLoopRange,
                              fromAyah: Math.min(ayahLoopRange.fromAyah, nextTo),
                              toAyah: nextTo,
                            });
                          }}
                          className="w-full h-10 px-2.5 rounded-xl bg-white dark:bg-black border border-black/15 dark:border-white/20 text-xs font-bold text-black dark:text-white"
                        >
                          {ayahs.map((a) => (
                            <option key={a.numberInSurah} value={a.numberInSurah}>
                              Ayah {a.numberInSurah}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* F. Open Full App Settings */}
              <div className="pt-1 pb-2">
                <button
                  onClick={() => {
                    setIsQuickSettingsOpen(false);
                    onOpenSettings();
                  }}
                  className="w-full h-11 rounded-xl border border-black/20 dark:border-white/25 text-xs font-bold text-black dark:text-white flex items-center justify-center gap-2 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>All App Preferences & Offline Audio</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
