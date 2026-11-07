import React, { useState } from 'react';
import {
  ArrowLeft,
  Settings,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Bookmark,
  Repeat,
  Star,
  BookOpen,
  Quote,
  Volume2,
  Languages,
  Sparkles,
} from 'lucide-react';
import { ALL_SURAHS } from '../data/surahList';
import { ARABIC_RECITERS, URDU_RECITERS, RECITERS } from '../data/reciters';
import { Ayah, RecitationLanguageMode, SurahDetail, UserProfileData } from '../types/quran';
import { getRelatedHadith } from '../utils/hadithDatabase';

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
  onSelectSurah: (surahNum: number) => void;
  onSelectAyah: (ayahNum: number) => void;
  onAddBookmark: (ayahNumber: number, timestampSeconds: number) => void;
  profile: UserProfileData;
  onOpenSettings: () => void;
  onOpenTafsir: (ayah: Ayah) => void;
  onToggleFavoriteSurah: (surahNum: number) => void;
  isFavoriteSurah: boolean;
  onUpdateProfile?: (updates: Partial<UserProfileData>) => void;
  currentAudioPhase?: 'arabic' | 'urdu';
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
  onSelectSurah,
  onSelectAyah,
  onAddBookmark,
  profile,
  onOpenSettings,
  onOpenTafsir,
  onToggleFavoriteSurah,
  isFavoriteSurah,
  onUpdateProfile,
  currentAudioPhase = 'arabic',
}) => {
  const [showHadith, setShowHadith] = useState(false);

  const currentAyah: Ayah | undefined = currentSurah?.ayahs.find(
    (a) => a.numberInSurah === activeAyahNumber
  ) || currentSurah?.ayahs[0];

  const recitationMode: RecitationLanguageMode = profile.recitationLanguageMode || 'arabic';
  const currentArabicReciter = ARABIC_RECITERS.find((r) => r.id === profile.preferredReciter) || ARABIC_RECITERS[0];
  const currentUrduReciter = URDU_RECITERS.find((r) => r.id === (profile.preferredUrduReciter || 'shamshad')) || URDU_RECITERS[0];

  const isRecitingUrdu = recitationMode === 'urdu' || (recitationMode === 'both' && currentAudioPhase === 'urdu');

  const surahNum = currentSurah?.number || 1;
  const hadith = currentAyah ? currentAyah.relatedHadith || getRelatedHadith(surahNum, activeAyahNumber) : null;

  const getGlowClass = () => {
    if (profile.arabicGlowMode === 'off') return 'arabic-glow-none';
    if (profile.arabicGlowMode === 'emerald') return 'arabic-glow-emerald';
    if (profile.arabicGlowMode === 'lunar') return 'arabic-glow-lunar';
    return profile.glowIntensity === 'intense' ? 'arabic-glow-gold-intense' : 'arabic-glow-gold';
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div className="flex-1 flex flex-col justify-between max-w-md w-full mx-auto min-h-screen bg-white dark:bg-stone-950 px-5 py-3 overflow-x-hidden select-none">
      {/* 1. Android Top Header */}
      <div className="flex items-center justify-between py-2">
        <button
          onClick={onBackToDashboard}
          className="p-2 -ml-2 text-black dark:text-white hover:bg-stone-100 dark:hover:bg-stone-900 rounded-full transition-colors active:scale-95"
          title="Back to Dashboard"
          aria-label="Back to Dashboard"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="text-center min-w-0 flex items-center gap-1.5 justify-center">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-black dark:text-white font-cinzel font-bold block">
              Quran Recitation
            </span>
            <div className="flex items-center justify-center gap-1.5">
              <h2 className="text-sm font-bold text-black dark:text-white font-cinzel truncate">
                {currentSurah ? `Surah ${currentSurah.nameEnglish}` : 'Holy Quran'}
              </h2>
              {currentSurah && (
                <button
                  onClick={() => onToggleFavoriteSurah(currentSurah.number)}
                  className="p-0.5 text-black dark:text-amber-400"
                  title="Favorite Surah"
                >
                  <Star className={`w-3.5 h-3.5 ${isFavoriteSurah ? 'fill-black dark:fill-amber-400' : ''}`} />
                </button>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={onOpenSettings}
          className="p-2 -mr-2 bg-black text-white hover:bg-stone-900 dark:bg-stone-900 dark:text-stone-300 dark:hover:text-white rounded-xl transition-all active:scale-95 shadow-2xs"
          title="Settings"
          aria-label="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* 2. RECITATION AUDIO MODE SELECTOR (Urdu Recitation Mode) */}
      <div className="space-y-2 pt-1 pb-2">
        <div className="flex items-center justify-between px-1 text-[11px] font-bold text-black dark:text-white">
          <span className="flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Recitation Audio Mode</span>
          </span>
          {isRecitingUrdu && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold animate-pulse">
              🇵🇰 اردو تلاوت
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-100 dark:bg-stone-900 rounded-2xl border border-stone-300 dark:border-stone-800 text-xs">
          {/* Option 1: Arabic Only */}
          <button
            onClick={() => onUpdateProfile?.({ recitationLanguageMode: 'arabic' })}
            className={`py-2 px-1 rounded-xl text-center transition-all ${
              recitationMode === 'arabic'
                ? 'bg-black text-white dark:bg-white dark:text-black font-bold shadow-xs'
                : 'text-black dark:text-stone-300 font-semibold hover:bg-stone-200 dark:hover:bg-stone-800'
            }`}
          >
            <div className="text-[11px] font-bold">📖 Arabic</div>
            <div className="text-[9px] opacity-80">عربی تلاوت</div>
          </button>

          {/* Option 2: Urdu Recitation Only */}
          <button
            onClick={() => {
              onUpdateProfile?.({
                recitationLanguageMode: 'urdu',
                showUrdu: true, // auto ensure Urdu text is visible
              });
            }}
            className={`py-2 px-1 rounded-xl text-center transition-all ${
              recitationMode === 'urdu'
                ? 'bg-black text-white dark:bg-white dark:text-black font-bold shadow-xs'
                : 'text-black dark:text-stone-300 font-semibold hover:bg-stone-200 dark:hover:bg-stone-800'
            }`}
          >
            <div className="text-[11px] font-bold">🇵🇰 Urdu</div>
            <div className="text-[9px] opacity-80">اردو تلاوت</div>
          </button>

          {/* Option 3: Arabic + Urdu Sequence */}
          <button
            onClick={() => {
              onUpdateProfile?.({
                recitationLanguageMode: 'both',
                showUrdu: true,
              });
            }}
            className={`py-2 px-1 rounded-xl text-center transition-all ${
              recitationMode === 'both'
                ? 'bg-black text-white dark:bg-white dark:text-black font-bold shadow-xs'
                : 'text-black dark:text-stone-300 font-semibold hover:bg-stone-200 dark:hover:bg-stone-800'
            }`}
          >
            <div className="text-[11px] font-bold">🔄 Both</div>
            <div className="text-[9px] opacity-80">عربی + اردو</div>
          </button>
        </div>

        {/* Reciter Selector dropdown based on active mode */}
        <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-[11px]">
          <span className="font-bold text-black dark:text-stone-300 shrink-0">
            {recitationMode === 'urdu' ? 'Urdu Voice:' : recitationMode === 'both' ? 'Voices (Ar + Ur):' : 'Arabic Qari:'}
          </span>

          <div className="flex items-center gap-1.5 truncate">
            {recitationMode !== 'urdu' && (
              <select
                value={profile.preferredReciter}
                onChange={(e) => onUpdateProfile?.({ preferredReciter: e.target.value })}
                className="bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 px-2 py-1 rounded-lg font-bold text-black dark:text-white focus:outline-none max-w-[130px] truncate"
              >
                {ARABIC_RECITERS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            )}

            {recitationMode !== 'arabic' && (
              <select
                value={profile.preferredUrduReciter || 'shamshad'}
                onChange={(e) => onUpdateProfile?.({ preferredUrduReciter: e.target.value })}
                className="bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 px-2 py-1 rounded-lg font-bold text-black dark:text-white focus:outline-none max-w-[140px] truncate font-urdu text-xs"
              >
                {URDU_RECITERS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>

      {/* 3. Surah & Ayah Selector Bar */}
      <div className="flex items-center justify-between gap-2 py-1.5 px-3 bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-300 dark:border-stone-800 text-xs">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-stone-700 dark:text-stone-400 font-bold">Chapter:</span>
          <select
            value={surahNum}
            onChange={(e) => onSelectSurah(Number(e.target.value))}
            className="bg-transparent font-bold text-black dark:text-white focus:outline-none max-w-[130px] truncate"
          >
            {ALL_SURAHS.map((s) => (
              <option key={s.number} value={s.number} className="bg-white dark:bg-stone-900 text-black dark:text-white">
                {s.number}. {s.nameEnglish}
              </option>
            ))}
          </select>
        </div>

        {currentSurah && (
          <div className="flex items-center gap-1.5">
            <span className="text-stone-700 dark:text-stone-400 font-bold">Ayah:</span>
            <select
              value={activeAyahNumber}
              onChange={(e) => onSelectAyah(Number(e.target.value))}
              className="bg-transparent font-bold text-black dark:text-white focus:outline-none"
            >
              {currentSurah.ayahs.map((a) => (
                <option key={a.numberInSurah} value={a.numberInSurah} className="bg-white dark:bg-stone-900 text-black dark:text-white">
                  {a.numberInSurah}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* 4. Centerpiece: Current Verse Card with Urdu Recitation Emphasis */}
      <div className="flex-1 flex flex-col items-center justify-center py-3">
        <div className="w-full p-5 rounded-3xl bg-white dark:bg-stone-900 border-2 border-black/10 dark:border-stone-800 shadow-xl space-y-3.5 text-center">
          {/* Header pill with Status & Tafsir triggers */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-cinzel font-bold text-black dark:text-white">
              Ayah {activeAyahNumber} of {currentSurah?.ayahs.length || 7}
            </span>

            {/* Live Reciting Indicator */}
            <div className="flex items-center gap-1.5">
              <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                isRecitingUrdu
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-stone-100 text-black dark:bg-stone-800 dark:text-white'
              }`}>
                {isRecitingUrdu ? '🇵🇰 Urdu Voice' : '📖 Arabic Voice'}
              </span>

              {currentAyah && (
                <button
                  onClick={() => onOpenTafsir(currentAyah)}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black text-white hover:bg-stone-800 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-amber-500 text-[10px] font-bold"
                  title="Open In-Depth Tafsir"
                >
                  <BookOpen className="w-3 h-3 stroke-[2.5]" />
                  <span>Tafsir</span>
                </button>
              )}

              {hadith && (
                <button
                  onClick={() => setShowHadith(!showHadith)}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold transition-colors ${
                    showHadith
                      ? 'bg-black text-white dark:bg-amber-500'
                      : 'bg-stone-100 dark:bg-stone-800 text-black dark:text-stone-300'
                  }`}
                  title="Toggle Related Hadith"
                >
                  <Quote className="w-3 h-3" />
                  <span>Hadith</span>
                </button>
              )}
            </div>
          </div>

          {/* Soundwave Animation while playing */}
          <div className="flex items-center justify-center gap-1 h-5 py-1">
            {[40, 75, 50, 90, 60, 30, 80, 55, 95, 45, 70].map((h, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-200 ${
                  isPlaying
                    ? 'bg-black dark:bg-white animate-pulse'
                    : 'bg-stone-300 dark:bg-stone-700 opacity-40'
                }`}
                style={{
                  height: isPlaying ? `${Math.max(6, (h * (i % 2 === 0 ? 1 : 0.7)) / 3.5)}px` : '4px',
                }}
              />
            ))}
          </div>

          {/* Arabic Calligraphy */}
          {currentAyah && (
            <div
              className={`py-2 px-3 rounded-2xl transition-all text-right ${
                !isRecitingUrdu && isPlaying
                  ? 'bg-stone-100 dark:bg-stone-800/80 ring-2 ring-black dark:ring-white'
                  : ''
              }`}
              dir="rtl"
            >
              <p
                className={`${
                  profile.calligraphyFont === 'scheherazade' ? 'font-scheherazade' : 'font-quran'
                } text-black dark:text-stone-100 leading-[2.4] font-bold ${getGlowClass()}`}
                style={{ fontSize: `${Math.max(26, profile.arabicFontSize)}px` }}
              >
                {currentAyah.textArabic}
                <span className="inline-block mr-2 text-black dark:text-amber-400 font-cinzel text-lg select-none">
                  ۝ {currentAyah.numberInSurah}
                </span>
              </p>
            </div>
          )}

          {/* URDU TRANSLATION DISPLAY (Prominently highlighted during Urdu recitation) */}
          {currentAyah?.textUrdu && (
            <div
              className={`p-3 rounded-2xl text-right transition-all border ${
                isRecitingUrdu && isPlaying
                  ? 'bg-stone-100 dark:bg-stone-800/90 border-2 border-black dark:border-white shadow-sm ring-1 ring-black dark:ring-white'
                  : 'bg-stone-50/50 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800'
              }`}
              dir="rtl"
            >
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-black/10 dark:border-white/10 text-[10px] font-bold">
                <span className="text-black dark:text-white font-sans-ui">
                  {isRecitingUrdu && isPlaying ? '🔊 تلاوت و ترجمہ جاری ہے:' : 'اردو ترجمہ (Urdu):'}
                </span>
                <span className="text-stone-800 dark:text-stone-300">
                  {currentUrduReciter.name}
                </span>
              </div>
              <p className="font-urdu text-base sm:text-lg text-black dark:text-stone-100 leading-loose font-bold">
                {currentAyah.textUrdu}
              </p>
            </div>
          )}

          {/* English Translation (if enabled in settings) */}
          {profile.showEnglish && currentAyah?.textEnglish && recitationMode !== 'urdu' && (
            <div className="pt-2 text-black dark:text-stone-300 font-sans-ui text-xs sm:text-sm leading-relaxed border-t border-stone-200 dark:border-stone-800/60 font-medium text-left">
              <p>{currentAyah.textEnglish}</p>
            </div>
          )}

          {/* Related Hadith Card Popup in Recitation View */}
          {showHadith && hadith && (
            <div className="mt-2 p-3 rounded-xl bg-stone-100 dark:bg-stone-900 border-2 border-black dark:border-stone-700 text-left text-xs space-y-1">
              <span className="text-[10px] uppercase font-bold text-black dark:text-white">
                {hadith.source}
              </span>
              <p className="text-black dark:text-stone-200 italic font-medium">
                "{hadith.textEnglish}"
              </p>
              {hadith.textUrdu && (
                <p className="font-urdu text-black dark:text-stone-200 text-right font-bold" dir="rtl">
                  {hadith.textUrdu}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 5. Playback Controls & Progress Bar (Pure Black Buttons, White Font in Light Mode) */}
      <div className="w-full space-y-4 pb-4">
        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-black dark:bg-white rounded-full transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-stone-900 dark:text-stone-300 font-mono font-bold tabular-nums">
            <span>{formatTime(currentTime)}</span>
            <span className="text-[11px] font-bold text-black dark:text-white uppercase tracking-wider">
              {isRecitingUrdu ? 'Urdu Voice' : 'Arabic Voice'}
            </span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Primary Audio Control Buttons */}
        <div className="flex items-center justify-between gap-3 px-2">
          {/* Repeat Ayah */}
          <button
            onClick={onToggleRepeatVerse}
            className={`p-3 rounded-full transition-all active:scale-95 ${
              repeatVerse
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                : 'text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white'
            }`}
            title={repeatVerse ? 'Repeat Verse Active' : 'Repeat Verse for Memorization'}
          >
            <Repeat className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Previous Ayah */}
          <button
            onClick={onPrevAyah}
            disabled={activeAyahNumber <= 1}
            className="p-3 text-black dark:text-stone-200 hover:text-stone-700 dark:hover:text-white disabled:opacity-30 transition-colors active:scale-95"
            title="Previous Verse"
          >
            <SkipBack className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Primary Play/Pause Button: Pure Black in Light Mode with White Icon */}
          <button
            onClick={onTogglePlayPause}
            className="w-16 h-16 rounded-full bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 flex items-center justify-center shadow-xl active:scale-95 transition-all"
            title={isPlaying ? 'Pause Recitation' : 'Play Recitation'}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-current" />
            ) : (
              <Play className="w-7 h-7 fill-current ml-1" />
            )}
          </button>

          {/* Next Ayah */}
          <button
            onClick={onNextAyah}
            disabled={activeAyahNumber >= (currentSurah?.ayahs.length || 1)}
            className="p-3 text-black dark:text-stone-200 hover:text-stone-700 dark:hover:text-white disabled:opacity-30 transition-colors active:scale-95"
            title="Next Verse"
          >
            <SkipForward className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => onAddBookmark(activeAyahNumber, currentTime)}
            className="p-3 text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white transition-colors active:scale-95"
            title="Bookmark this moment"
          >
            <Bookmark className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Speed Controls Selector */}
        <div className="flex items-center justify-center gap-2 pt-1 text-xs">
          <span className="text-stone-800 dark:text-stone-400 font-bold text-[11px]">Speed:</span>
          {[0.75, 1, 1.25].map((spd) => (
            <button
              key={spd}
              onClick={() => onChangeSpeed(spd)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all active:scale-95 ${
                playbackSpeed === spd
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-2xs'
                  : 'text-black dark:text-stone-300 bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
