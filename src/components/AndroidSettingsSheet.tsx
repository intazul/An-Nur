import React from 'react';
import {
  ArrowLeft,
  Languages,
  Moon,
  Sun,
  Sparkles,
  Sliders,
  Bookmark,
  Download,
  Check,
  BookOpen,
  Volume2,
  Smartphone,
  Wifi,
  WifiOff,
  HardDrive,
} from 'lucide-react';
import { UserProfileData } from '../types/quran';
import { ARABIC_RECITERS, URDU_RECITERS, RECITERS } from '../data/reciters';
import { useOnlineStatus, usePWAInstall } from '../hooks/usePWA';

interface AndroidSettingsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfileData;
  onUpdateProfile: (updates: Partial<UserProfileData>) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenBookmarks: () => void;
  onOpenOfflineManager: () => void;
}

export const AndroidSettingsSheet: React.FC<AndroidSettingsSheetProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  darkMode,
  onToggleDarkMode,
  onOpenBookmarks,
  onOpenOfflineManager,
}) => {
  const isOnline = useOnlineStatus();
  const { isInstallable, isInstalled, install } = usePWAInstall();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 max-w-md w-full mx-auto bg-white dark:bg-black flex flex-col h-full animate-in fade-in duration-200 select-none">
      {/* 1. Android Top App Bar for Settings Tab */}
      <div className="px-4 py-3.5 border-b border-black/10 dark:border-white/15 flex items-center justify-between bg-white dark:bg-black shrink-0">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black transition-transform font-bold text-xs active:scale-95"
          aria-label="Back to App"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-black dark:text-white" />
          <h1 className="text-base font-bold text-black dark:text-white font-cinzel tracking-tight">
            Settings
          </h1>
        </div>

        <button
          onClick={onClose}
          className="py-1.5 px-3 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-xs shadow-xs active:scale-95 transition-all"
        >
          Done
        </button>
      </div>

      {/* 2. Scrollable Settings Tab Body */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6 bg-white dark:bg-black">
        {/* SECTION 1: High-Contrast Light vs Dark Theme Selection */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black dark:text-white">
            <Moon className="w-3.5 h-3.5" />
            <span>Theme & Contrast</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* Light Mode Button: Contrasting Black & White */}
            <button
              onClick={() => {
                if (darkMode) onToggleDarkMode();
              }}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                !darkMode
                  ? 'border-black bg-black text-white shadow-sm font-bold'
                  : 'border-stone-800 bg-stone-950 text-stone-300 hover:border-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm flex items-center gap-1.5">
                  <Sun className="w-4 h-4" />
                  Light Mode
                </span>
                {!darkMode && (
                  <span className="w-2.5 h-2.5 rounded-full bg-white" />
                )}
              </div>
              <div className="text-[11px] opacity-85 font-medium leading-tight">
                Contrasting black buttons with white fonts & crisp white paper
              </div>
            </button>

            {/* Dark Mode Button: Obsidian & White */}
            <button
              onClick={() => {
                if (!darkMode) onToggleDarkMode();
              }}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                darkMode
                  ? 'border-white bg-white text-black shadow-sm font-bold'
                  : 'border-stone-200 bg-white text-stone-800 hover:border-black'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm flex items-center gap-1.5">
                  <Moon className="w-4 h-4" />
                  Night Mode
                </span>
                {darkMode && (
                  <span className="w-2.5 h-2.5 rounded-full bg-black" />
                )}
              </div>
              <div className="text-[11px] opacity-85 font-medium leading-tight">
                Pure black canvas with contrasting white buttons & black fonts
              </div>
            </button>
          </div>
        </div>

        {/* SECTION 2: Reading Format Layout (Mushaf Flow vs Verse Cards) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black dark:text-white">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Reading Format Layout</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            {/* 1. Mushaf Mode */}
            <button
              onClick={() => onUpdateProfile({ readingLayout: 'paragraph' })}
              className={`p-3 rounded-2xl border-2 text-left transition-all ${
                profile.readingLayout === 'paragraph'
                  ? 'border-black dark:border-white bg-black text-white dark:bg-white dark:text-black shadow-md font-bold'
                  : 'border-stone-300 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 text-black dark:text-stone-300 font-medium hover:border-black'
              }`}
            >
              <div className="font-bold text-sm mb-1">📖 Mushaf Pages</div>
              <div className="text-[11px] opacity-90 leading-tight">
                Pure Arabic calligraphy page-by-page sliding with Tajweed signs
              </div>
            </button>

            {/* 2. Thematic Paragraph Study Mode (Reference Image Style) */}
            <button
              onClick={() => onUpdateProfile({ readingLayout: 'thematic' })}
              className={`p-3 rounded-2xl border-2 text-left transition-all ${
                profile.readingLayout === 'thematic'
                  ? 'border-black dark:border-white bg-black text-white dark:bg-white dark:text-black shadow-md font-bold'
                  : 'border-stone-300 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 text-black dark:text-stone-300 font-medium hover:border-black'
              }`}
            >
              <div className="font-bold text-sm mb-1">📚 Thematic Study</div>
              <div className="text-[11px] opacity-90 leading-tight">
                One paragraph per slide with specific topic name, questions & small noticeable text
              </div>
            </button>

            {/* 3. Verse Cards Mode */}
            <button
              onClick={() => onUpdateProfile({ readingLayout: 'cards' })}
              className={`p-3 rounded-2xl border-2 text-left transition-all ${
                profile.readingLayout === 'cards'
                  ? 'border-black dark:border-white bg-black text-white dark:bg-white dark:text-black shadow-md font-bold'
                  : 'border-stone-300 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 text-black dark:text-stone-300 font-medium hover:border-black'
              }`}
            >
              <div className="font-bold text-sm mb-1">📑 Verse Slides</div>
              <div className="text-[11px] opacity-90 leading-tight">
                Verse-by-verse sliding with large translations & related Hadith
              </div>
            </button>
          </div>

          {/* Thematic Study Layout Indicator */}
          {profile.readingLayout === 'thematic' && (
            <div className="space-y-2 p-3.5 rounded-2xl border border-black/15 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60">
              <div className="flex items-center justify-between text-xs font-bold text-black dark:text-white">
                <span>Thematic Study Style</span>
                <span className="px-2 py-0.5 rounded-md bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold">
                  Zero Vertical Scroll Active
                </span>
              </div>
              <div className="text-[11px] text-stone-700 dark:text-stone-300 font-medium">
                One paragraph per slide with specific topic headings, reflective questions, and small noticeable letters.
              </div>
            </div>
          )}

          {/* Cards Layout Indicator */}
          {profile.readingLayout === 'cards' && (
            <div className="space-y-2 p-3.5 rounded-2xl border border-black/15 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60">
              <div className="flex items-center justify-between text-xs font-bold text-black dark:text-white">
                <span>Verse Slides Style</span>
                <span className="px-2 py-0.5 rounded-md bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold">
                  Zero Vertical Scroll Active
                </span>
              </div>
              <div className="text-[11px] text-stone-700 dark:text-stone-300 font-medium">
                Horizontal sliding verse cards with translations, Tafsir and authenticated Hadith.
              </div>
            </div>
          )}

          {/* Mushaf Page Turn Style Indicator */}
          {profile.readingLayout === 'paragraph' && (
            <div className="space-y-3 p-4 rounded-2xl border border-black/15 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60">
              <div className="flex items-center justify-between text-xs font-bold text-black dark:text-white">
                <span>Page Turn Style</span>
                <span className="px-2 py-0.5 rounded-md bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold">
                  Horizontal Page Sliding Active
                </span>
              </div>
              <div className="text-[11px] text-stone-700 dark:text-stone-300 font-medium">
                Vertical scrolling is replaced with smooth horizontal page slides and swipe gestures like a real physical book.
              </div>

              {/* Small & Readable Mushaf Font Size */}
              <div className="pt-2 border-t border-black/10 dark:border-stone-800 space-y-2">
                <div className="flex justify-between text-xs text-stone-900 dark:text-stone-300 font-semibold">
                  <span>Mushaf Arabic Size (Small & Crisp)</span>
                  <span className="font-bold tabular-nums text-black dark:text-white">
                    {profile.mushafFontSize || 21}px
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { size: 19, label: 'Compact' },
                    { size: 21, label: 'Standard' },
                    { size: 24, label: 'Comfort' },
                  ].map((opt) => (
                    <button
                      key={opt.size}
                      onClick={() => onUpdateProfile({ mushafFontSize: opt.size })}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        (profile.mushafFontSize || 21) === opt.size
                          ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-xs'
                          : 'bg-white dark:bg-stone-800 text-black dark:text-stone-300 border-stone-300 dark:border-stone-700'
                      }`}
                    >
                      {opt.label} ({opt.size}px)
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tajweed Stopping Signs Guidance Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl border border-black/15 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60">
            <div className="pr-2">
              <div className="text-sm font-bold text-black dark:text-white">
                Highlight Stopping Rules (مـ, قلى, ج, لا, ۩)
              </div>
              <div className="text-xs text-stone-800 dark:text-stone-400 font-medium">
                Highlights where to stop or pause; tap any mark for simple guidance
              </div>
            </div>
            <button
              onClick={() => onUpdateProfile({ showTajweedSigns: !profile.showTajweedSigns })}
              className={`w-12 h-7 rounded-full transition-colors relative p-0.5 shrink-0 ${
                profile.showTajweedSigns
                  ? 'bg-black dark:bg-white'
                  : 'bg-stone-300 dark:bg-stone-700'
              }`}
              aria-label="Toggle Tajweed Stopping Signs"
            >
              <div
                className={`w-6 h-6 rounded-full shadow-md transform transition-transform ${
                  profile.showTajweedSigns
                    ? 'translate-x-5 bg-white dark:bg-black'
                    : 'translate-x-0 bg-white'
                }`}
              />
            </button>
          </div>
        </div>

        {/* SECTION 3: Translations & Tafsir Configuration (Strict Urdu OR Assamese Exclusivity) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black dark:text-white">
            <Languages className="w-3.5 h-3.5" />
            <span>Translations & Tafsir</span>
          </div>

          <div className="space-y-2.5">
            {/* Regional Language Mutually Exclusive Selector (Urdu OR Assamese, Never Both) */}
            <div className="p-3.5 rounded-2xl border border-black/15 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 space-y-2.5">
              <div>
                <div className="text-sm font-bold text-black dark:text-white">
                  Regional Translation & Tafseer
                </div>
                <div className="text-[11px] text-stone-700 dark:text-stone-400 font-medium">
                  Select either Urdu or Assamese (only one can be active at a time)
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                {/* None / Off */}
                <button
                  onClick={() => onUpdateProfile({ showUrdu: false, showAssamese: false })}
                  className={`p-2.5 rounded-xl border-2 text-center transition-all ${
                    !profile.showUrdu && !profile.showAssamese
                      ? 'border-black dark:border-white bg-black text-white dark:bg-white dark:text-black font-bold shadow-xs'
                      : 'border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-stone-300 font-medium'
                  }`}
                >
                  <div className="font-bold text-xs">Off</div>
                  <div className="text-[10px] opacity-80">None</div>
                </button>

                {/* Urdu */}
                <button
                  onClick={() => onUpdateProfile({ showUrdu: true, showAssamese: false })}
                  className={`p-2.5 rounded-xl border-2 text-center transition-all ${
                    profile.showUrdu && !profile.showAssamese
                      ? 'border-black dark:border-white bg-black text-white dark:bg-white dark:text-black font-bold shadow-xs'
                      : 'border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-stone-300 font-medium'
                  }`}
                >
                  <div className="font-urdu font-bold text-xs leading-normal">اردو</div>
                  <div className="text-[10px] opacity-80">Urdu</div>
                </button>

                {/* Assamese */}
                <button
                  onClick={() => onUpdateProfile({ showAssamese: true, showUrdu: false })}
                  className={`p-2.5 rounded-xl border-2 text-center transition-all ${
                    profile.showAssamese && !profile.showUrdu
                      ? 'border-black dark:border-white bg-black text-white dark:bg-white dark:text-black font-bold shadow-xs'
                      : 'border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-black dark:text-stone-300 font-medium'
                  }`}
                >
                  <div className="font-assamese font-bold text-xs leading-normal">অসমীয়া</div>
                  <div className="text-[10px] opacity-80">Assamese</div>
                </button>
              </div>

              {profile.showAssamese && !profile.showUrdu && (
                <div className="text-[11px] font-medium text-stone-800 dark:text-stone-300 pt-0.5">
                  Active: Shaykh Rafeequl Islam Habibur-Rahman Assamese Translation & Tafseer (Urdu disabled)
                </div>
              )}
              {profile.showUrdu && !profile.showAssamese && (
                <div className="text-[11px] font-medium text-stone-800 dark:text-stone-300 pt-0.5">
                  Active: Fateh Muhammad Jalandhri Urdu Translation & Tafseer (Assamese disabled)
                </div>
              )}
            </div>

            {/* English Translation Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl border border-black/15 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60">
              <div className="pr-2">
                <div className="text-sm font-bold text-black dark:text-white">
                  English Translation
                </div>
                <div className="text-xs text-stone-800 dark:text-stone-400 font-medium">
                  Saheeh International clear contemporary translation
                </div>
              </div>
              <button
                onClick={() => onUpdateProfile({ showEnglish: !profile.showEnglish })}
                className={`w-12 h-7 rounded-full transition-colors relative p-0.5 shrink-0 ${
                  profile.showEnglish ? 'bg-black dark:bg-white' : 'bg-stone-300 dark:bg-stone-700'
                }`}
                aria-label="Toggle English Translation"
              >
                <div
                  className={`w-6 h-6 rounded-full shadow-md transform transition-transform ${
                    profile.showEnglish
                      ? 'translate-x-5 bg-white dark:bg-black'
                      : 'translate-x-0 bg-white'
                  }`}
                />
              </button>
            </div>

            {/* Tafsir Commentary Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl border border-black/15 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60">
              <div className="pr-2">
                <div className="text-sm font-bold text-black dark:text-white">
                  Tafsir Commentary Preview
                </div>
                <div className="text-xs text-stone-800 dark:text-stone-400 font-medium">
                  Show exegesis summary in English & selected regional language
                </div>
              </div>
              <button
                onClick={() => onUpdateProfile({ showTafsir: !profile.showTafsir })}
                className={`w-12 h-7 rounded-full transition-colors relative p-0.5 shrink-0 ${
                  profile.showTafsir ? 'bg-black dark:bg-white' : 'bg-stone-300 dark:bg-stone-700'
                }`}
                aria-label="Toggle Tafsir Preview"
              >
                <div
                  className={`w-6 h-6 rounded-full shadow-md transform transition-transform ${
                    profile.showTafsir
                      ? 'translate-x-5 bg-white dark:bg-black'
                      : 'translate-x-0 bg-white'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 4: Arabic Word Glow (for Low Light & Night Reading) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black dark:text-white">
            <Sparkles className="w-3.5 h-3.5 text-black dark:text-white" />
            <span>Arabic Word Glow (Night Reading)</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'gold', label: 'Gold' },
              { id: 'emerald', label: 'Emerald' },
              { id: 'lunar', label: 'Lunar' },
              { id: 'off', label: 'No Glow' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => onUpdateProfile({ arabicGlowMode: m.id as any })}
                className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all text-center ${
                  profile.arabicGlowMode === m.id
                    ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-black dark:text-stone-300 border-stone-300 dark:border-stone-700'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 5: Font Sizing & Traditional Calligraphy Script */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
            Font Sizing & Traditional Script
          </div>

          <div className="p-4 rounded-2xl border border-black/15 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 space-y-4 text-xs">
            {/* Arabic Size Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-black dark:text-stone-200">
                <span>Arabic Font Size</span>
                <span className="tabular-nums font-bold text-black dark:text-white">
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
                className="w-full accent-black dark:accent-white cursor-pointer"
              />
            </div>

            {/* Translation Size Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-black dark:text-stone-200">
                <span>Translation Font Size</span>
                <span className="tabular-nums font-bold text-black dark:text-white">
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
                className="w-full accent-black dark:accent-white cursor-pointer"
              />
            </div>

            {/* Calligraphy Script Selection */}
            <div className="pt-2 border-t border-black/10 dark:border-stone-800">
              <div className="font-bold text-black dark:text-white mb-2">
                Calligraphy Style
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onUpdateProfile({ calligraphyFont: 'amiri' })}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                    profile.calligraphyFont === 'amiri'
                      ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-xs'
                      : 'bg-white dark:bg-stone-800 text-black dark:text-stone-300 border-stone-300 dark:border-stone-700'
                  }`}
                >
                  Amiri Quran
                </button>
                <button
                  onClick={() => onUpdateProfile({ calligraphyFont: 'scheherazade' })}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                    profile.calligraphyFont === 'scheherazade'
                      ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-xs'
                      : 'bg-white dark:bg-stone-800 text-black dark:text-stone-300 border-stone-300 dark:border-stone-700'
                  }`}
                >
                  Scheherazade New
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 6: Recitation Mode & Audio Voices (Urdu & Arabic) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black dark:text-white">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Recitation Audio Mode</span>
          </div>

          {/* 3-Way Mode Switcher: Arabic, Urdu, Both */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onUpdateProfile({ recitationLanguageMode: 'arabic' })}
              className={`p-3 rounded-2xl border-2 text-left transition-all ${
                (profile.recitationLanguageMode || 'arabic') === 'arabic'
                  ? 'border-black dark:border-white bg-black text-white dark:bg-white dark:text-black font-bold shadow-xs'
                  : 'border-stone-300 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 text-black dark:text-stone-300 font-semibold hover:border-black/50'
              }`}
            >
              <div className="text-xs font-bold mb-0.5">📖 Arabic Only</div>
              <div className="text-[10px] opacity-80 leading-tight">عربی تلاوت</div>
            </button>

            <button
              onClick={() =>
                onUpdateProfile({
                  recitationLanguageMode: 'urdu',
                  showUrdu: true,
                  showAssamese: false,
                })
              }
              className={`p-3 rounded-2xl border-2 text-left transition-all ${
                profile.recitationLanguageMode === 'urdu'
                  ? 'border-black dark:border-white bg-black text-white dark:bg-white dark:text-black font-bold shadow-xs'
                  : 'border-stone-300 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 text-black dark:text-stone-300 font-semibold hover:border-black/50'
              }`}
            >
              <div className="text-xs font-bold mb-0.5">🇵🇰 Urdu Only</div>
              <div className="text-[10px] opacity-80 leading-tight">اردو تلاوت و ترجمہ</div>
            </button>

            <button
              onClick={() =>
                onUpdateProfile({
                  recitationLanguageMode: 'both',
                  showUrdu: true,
                  showAssamese: false,
                })
              }
              className={`p-3 rounded-2xl border-2 text-left transition-all ${
                profile.recitationLanguageMode === 'both'
                  ? 'border-black dark:border-white bg-black text-white dark:bg-white dark:text-black font-bold shadow-xs'
                  : 'border-stone-300 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 text-black dark:text-stone-300 font-semibold hover:border-black/50'
              }`}
            >
              <div className="text-xs font-bold mb-0.5">🔄 Arabic + Urdu</div>
              <div className="text-[10px] opacity-80 leading-tight">پہلے عربی پھر اردو</div>
            </button>
          </div>

          {/* Urdu Voice Selection (Visible when Urdu or Both is active) */}
          {profile.recitationLanguageMode !== 'arabic' && (
            <div className="p-3.5 rounded-2xl border border-black/15 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 space-y-2">
              <div className="text-xs font-bold text-black dark:text-white flex items-center justify-between">
                <span>🇵🇰 Urdu Translation Voice (اردو قاری)</span>
                <span className="text-[10px] font-mono font-semibold text-stone-700 dark:text-stone-300">
                  EveryAyah CDN
                </span>
              </div>

              <div className="space-y-1.5">
                {URDU_RECITERS.map((r) => {
                  const isSelected = (profile.preferredUrduReciter || 'shamshad') === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => onUpdateProfile({ preferredUrduReciter: r.id })}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black font-bold shadow-xs'
                          : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800 text-black dark:text-stone-300'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">{r.name}</div>
                        <div className={`text-[10px] font-medium ${isSelected ? 'opacity-90' : 'text-stone-700 dark:text-stone-400'}`}>
                          {r.style}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-white text-black dark:bg-black dark:text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Arabic Qari Selection (Visible when Arabic or Both is active) */}
          {profile.recitationLanguageMode !== 'urdu' && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-black dark:text-white">
                📖 Arabic Qari Reciter (عربی قاری)
              </div>
              <div className="space-y-1.5">
                {ARABIC_RECITERS.map((r) => {
                  const isSelected = profile.preferredReciter === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => onUpdateProfile({ preferredReciter: r.id })}
                      className={`w-full p-3 rounded-xl border-2 text-left flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'border-black bg-stone-100 dark:border-white dark:bg-stone-900 text-black dark:text-white font-bold'
                          : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 text-stone-900 dark:text-stone-300 font-medium hover:border-black/50'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-black dark:text-white">{r.name}</div>
                        <div className="text-[11px] text-stone-700 dark:text-stone-400 font-medium">
                          {r.style}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* SECTION 7: Offline Capabilities & PWA Installation */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black dark:text-white">
            <HardDrive className="w-3.5 h-3.5" />
            <span>Offline & App Installation</span>
          </div>

          {/* Network Status Badge */}
          <div className="p-3.5 rounded-2xl border border-black/15 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isOnline ? (
                <Wifi className="w-4 h-4 text-black dark:text-white" />
              ) : (
                <WifiOff className="w-4 h-4 text-black dark:text-white" />
              )}
              <div>
                <div className="text-xs font-bold text-black dark:text-white">
                  {isOnline ? 'Online (Ready to sync & cache)' : 'Offline Mode Active'}
                </div>
                <div className="text-[10px] text-stone-600 dark:text-stone-400 font-medium">
                  {isOnline
                    ? 'All downloaded chapters & recitations play without network'
                    : 'Running 100% from local device cache'}
                </div>
              </div>
            </div>
          </div>

          {/* PWA App Install Button (if browser supports install prompt or standalone) */}
          {isInstallable && (
            <div className="p-3.5 rounded-2xl border border-black/15 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-black dark:text-white flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-black dark:text-white" />
                  <span>Install as Native Android App</span>
                </div>
                <div className="text-[10px] text-stone-600 dark:text-stone-400 font-medium">
                  Add to home screen for fullscreen offline experience.
                </div>
              </div>
              <button
                onClick={install}
                className="py-2 px-3 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-xs shadow-xs active:scale-95 transition-all shrink-0"
              >
                Install App
              </button>
            </div>
          )}

          {isInstalled && (
            <div className="p-3 rounded-2xl border border-black/20 dark:border-white/20 bg-stone-100 dark:bg-stone-900 flex items-center gap-2 text-xs font-bold text-black dark:text-white">
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Installed as Standalone Native PWA</span>
            </div>
          )}

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-2 gap-2 pt-1 pb-2">
            <button
              onClick={() => {
                onClose();
                onOpenBookmarks();
              }}
              className="p-3 rounded-2xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold flex items-center gap-2 justify-center transition-transform active:scale-95 shadow-xs"
            >
              <Bookmark className="w-4 h-4" />
              <span>Audio Bookmarks</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenOfflineManager();
              }}
              className="p-3 rounded-2xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold flex items-center gap-2 justify-center transition-transform active:scale-95 shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Offline Manager</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Bottom Action Bar */}
      <div className="p-4 border-t border-black/10 dark:border-white/15 bg-white dark:bg-black shrink-0">
        <button
          onClick={onClose}
          className="w-full h-14 rounded-2xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-bold text-sm shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Apply & Save Preferences</span>
        </button>
      </div>
    </div>
  );
};
