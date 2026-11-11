import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Star,
  Search,
  BookOpen,
  Headphones,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  X,
  BookmarkCheck,
} from 'lucide-react';
import { ALL_SURAHS } from '../data/surahList';
import { LastReadPosition, UserProfileData } from '../types/quran';

interface FavoriteSurahsViewProps {
  onBackToDashboard: () => void;
  onReadSurah: (surahNumber: number) => void;
  onReciteSurah: (surahNumber: number) => void;
  favoriteSurahs: number[];
  onToggleFavorite: (surahNumber: number) => void;
  lastRead: LastReadPosition;
  profile: UserProfileData;
}

interface RecommendedSurahItem {
  number: number;
  virtue: string;
  hadithSource: string;
  bestTime: string;
}

const RECOMMENDED_PROPHETIC_SURAHS: RecommendedSurahItem[] = [
  {
    number: 67,
    virtue: 'Intercedes for its companion until forgiven and protects from the punishment of the grave.',
    hadithSource: 'Sunan al-Tirmidhi 2891',
    bestTime: 'Every night before sleep',
  },
  {
    number: 18,
    virtue: 'Illuminates a divine light extending between two Fridays and safeguards against the trials of Dajjal.',
    hadithSource: 'Sahih Muslim 809',
    bestTime: 'Every Friday (Jummah)',
  },
  {
    number: 36,
    virtue: 'The Heart of the Quran (قلب القرآن); recited for forgiveness, peace of mind, and divine mercy.',
    hadithSource: 'Sunan al-Tirmidhi 2887',
    bestTime: 'Morning & evening reflections',
  },
  {
    number: 56,
    virtue: 'Shield against spiritual and worldly poverty; brings abundant blessings and gratitude.',
    hadithSource: 'Shu’ab al-Iman 2269',
    bestTime: 'Nightly devotion',
  },
  {
    number: 55,
    virtue: 'The Bride of the Quran (عروس القرآن); celebrates Allah’s infinite compassion and favors.',
    hadithSource: 'Sunan al-Bayhaqi 2270',
    bestTime: 'Contemplation & gratitude',
  },
  {
    number: 112,
    virtue: 'Pure affirmation of Tawhid; equivalent to one-third of the entire Quran in reward.',
    hadithSource: 'Sahih al-Bukhari 5015',
    bestTime: 'Daily prayers & sleep dhikr',
  },
  {
    number: 113,
    virtue: 'The first Mu’awwidha; divine protection against envy, witchcraft, and the evils of the dark.',
    hadithSource: 'Sunan Abu Dawud 1463',
    bestTime: 'Morning and evening fortress',
  },
  {
    number: 114,
    virtue: 'The second Mu’awwidha; refuge with the Lord of mankind against whispering devils and doubts.',
    hadithSource: 'Sunan al-Nasa’i 5433',
    bestTime: 'Morning and evening fortress',
  },
];

export const FavoriteSurahsView: React.FC<FavoriteSurahsViewProps> = ({
  onBackToDashboard,
  onReadSurah,
  onReciteSurah,
  favoriteSurahs,
  onToggleFavorite,
  lastRead,
}) => {
  const [activeTab, setActiveTab] = useState<'favorites' | 'recommended' | 'all'>('favorites');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered lists based on search
  const filteredFavorites = useMemo(() => {
    return ALL_SURAHS.filter((s) => {
      const isFav = favoriteSurahs.includes(s.number);
      if (!isFav) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        s.nameEnglish.toLowerCase().includes(q) ||
        s.englishTranslation.toLowerCase().includes(q) ||
        s.nameArabic.includes(q) ||
        String(s.number) === q
      );
    });
  }, [favoriteSurahs, searchQuery]);

  const filteredRecommended = useMemo(() => {
    return RECOMMENDED_PROPHETIC_SURAHS.filter((rec) => {
      const surah = ALL_SURAHS.find((s) => s.number === rec.number);
      if (!surah) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        surah.nameEnglish.toLowerCase().includes(q) ||
        surah.englishTranslation.toLowerCase().includes(q) ||
        rec.virtue.toLowerCase().includes(q) ||
        String(surah.number) === q
      );
    });
  }, [searchQuery]);

  const filteredAllSurahs = useMemo(() => {
    if (!searchQuery.trim()) return ALL_SURAHS;
    const q = searchQuery.toLowerCase().trim();
    return ALL_SURAHS.filter(
      (s) =>
        s.nameEnglish.toLowerCase().includes(q) ||
        s.englishTranslation.toLowerCase().includes(q) ||
        s.nameArabic.includes(q) ||
        String(s.number) === q
    );
  }, [searchQuery]);

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 overflow-hidden select-none">
      {/* 1. Header Bar */}
      <header className="shrink-0 bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBackToDashboard}
              className="w-9 h-9 flex items-center justify-center text-black dark:text-white rounded-2xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-900 dark:hover:bg-stone-800 transition-all active:scale-95 shrink-0 shadow-2xs"
              title="Return to Dashboard"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.4]" />
            </button>
            <div className="min-w-0">
              <h1 className="text-base font-bold text-black dark:text-white font-cinzel tracking-tight leading-none truncate">
                Favorite Surahs
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mt-1 truncate">
                <span className="font-semibold">{favoriteSurahs.length} Saved</span>
                <span className="opacity-40" aria-hidden="true">·</span>
                <span className="font-quran text-[11px] text-stone-700 dark:text-stone-300">مفضلة السور</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="tabular-nums">{favoriteSurahs.length} Surahs</span>
          </div>
        </div>
      </header>

      {/* 2. Protection Notice Banner (Reassures the user that Continue Reading is isolated) */}
      <div className="shrink-0 bg-stone-100/90 dark:bg-stone-900/90 border-b border-stone-200 dark:border-stone-800 px-4 py-2.5">
        <div className="max-w-2xl mx-auto flex items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-stone-700 dark:text-stone-300 leading-snug">
              <span className="font-bold text-black dark:text-white">Bookmark Protected: </span>
              Reading any favorite Surah does not alter your main Continue Reading bookmark.
            </p>
          </div>
          {lastRead?.surahName && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-[11px] font-semibold text-stone-600 dark:text-stone-300 shrink-0">
              <BookmarkCheck className="w-3 h-3 text-amber-500" />
              <span>Continue at {lastRead.surahName}:{lastRead.ayahNumber || 1}</span>
            </div>
          )}
        </div>
      </div>

      {/* 3. Search & Filter Segmented Controls */}
      <div className="shrink-0 px-4 pt-3 pb-2 space-y-2.5 max-w-2xl w-full mx-auto">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search favorite Surahs by name, number, or virtue..."
            className="w-full pl-9 pr-8 py-2 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-black dark:text-white placeholder:text-stone-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 3-Pill Balanced Segmented Control */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-stone-100/90 dark:bg-stone-900/90 rounded-2xl border border-stone-200/70 dark:border-stone-800/70 shadow-2xs">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`py-2 px-1 text-xs font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 ${
              activeTab === 'favorites'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${activeTab === 'favorites' ? 'fill-current' : 'text-amber-500'}`} />
            <span className="truncate">Saved ({favoriteSurahs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('recommended')}
            className={`py-2 px-1 text-xs font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 ${
              activeTab === 'recommended'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate">Sunnah ({RECOMMENDED_PROPHETIC_SURAHS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('all')}
            className={`py-2 px-1 text-xs font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 ${
              activeTab === 'all'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="truncate">All 114</span>
          </button>
        </div>
      </div>

      {/* 4. Tab Content Body */}
      <main className="flex-1 overflow-y-auto px-4 py-2 max-w-2xl w-full mx-auto space-y-3">
        {/* ===================== TAB 1: SAVED FAVORITES ===================== */}
        {activeTab === 'favorites' && (
          <div className="space-y-3 pb-8">
            {filteredFavorites.length === 0 ? (
              <div className="py-14 text-center px-4 rounded-3xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto text-xl">
                  <Star className="w-6 h-6 fill-amber-500/20" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-black dark:text-white font-cinzel">
                    {searchQuery ? 'No matching favorites found' : 'No Favorite Surahs Saved Yet'}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto mt-1 leading-relaxed">
                    {searchQuery
                      ? 'Try another search term or browse the Prophetic Sunnah Surahs tab.'
                      : 'Star any Surah from the Prophetic Sunnah tab or All 114 Surahs list to keep your daily recitations easily accessible.'}
                  </p>
                </div>
                {!searchQuery && (
                  <button
                    onClick={() => setActiveTab('recommended')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold hover:opacity-90 transition-all shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Browse Prophetic Sunnah Surahs</span>
                  </button>
                )}
              </div>
            ) : (
              filteredFavorites.map((surah) => {
                const recData = RECOMMENDED_PROPHETIC_SURAHS.find((r) => r.number === surah.number);
                return (
                  <div
                    key={surah.number}
                    className="p-4 rounded-3xl bg-stone-50/90 dark:bg-stone-900/60 border border-stone-200/90 dark:border-stone-800/80 shadow-xs hover:border-black dark:hover:border-stone-600 transition-all space-y-3 group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-2xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-2xs">
                          #{surah.number}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h2 className="text-sm font-bold text-black dark:text-white font-cinzel truncate">
                              {surah.nameEnglish}
                            </h2>
                            <span className="text-[11px] text-stone-400">·</span>
                            <span className="text-[11px] font-bold text-stone-600 dark:text-stone-400 truncate">
                              {surah.englishTranslation}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 truncate">
                            {surah.revelationType} · {surah.numberOfAyahs} Verses
                            {recData && ` · ${recData.bestTime}`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-quran text-base font-bold text-amber-600 dark:text-amber-400" dir="rtl">
                          {surah.nameArabic}
                        </span>
                        <button
                          onClick={() => onToggleFavorite(surah.number)}
                          className="p-1.5 rounded-xl text-amber-500 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
                          title="Remove from favorites"
                        >
                          <Star className="w-4 h-4 fill-amber-500" />
                        </button>
                      </div>
                    </div>

                    {recData && (
                      <p className="text-xs text-stone-600 dark:text-stone-300 italic bg-white dark:bg-stone-900 p-2.5 rounded-2xl border border-stone-200/70 dark:border-stone-800/70 leading-relaxed">
                        "{recData.virtue}"
                      </p>
                    )}

                    {/* Action buttons: Read (Preserves bookmark) & Listen Audio */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => onReadSurah(surah.number)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-2xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold hover:opacity-90 active:scale-98 transition-all shadow-2xs"
                        title="Read this favorite Surah without changing your Continue Reading bookmark"
                      >
                        <BookOpen className="w-3.5 h-3.5 stroke-[2.3]" />
                        <span>Read Surah</span>
                      </button>

                      <button
                        onClick={() => onReciteSurah(surah.number)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-black dark:text-white text-xs font-bold hover:border-black dark:hover:border-stone-500 active:scale-98 transition-all shadow-2xs"
                        title="Listen to beautiful audio recitation"
                      >
                        <Headphones className="w-3.5 h-3.5 stroke-[2.3]" />
                        <span>Recite Audio</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ===================== TAB 2: PROPHETIC SUNNAH SURAHS ===================== */}
        {activeTab === 'recommended' && (
          <div className="space-y-3 pb-8">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <span className="font-bold flex items-center gap-1.5 font-cinzel text-amber-800 dark:text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                Prophetic Virtues & Daily Sunnahs
              </span>
              <p className="text-[11px] leading-relaxed opacity-90">
                These sacred Surahs hold specific Hadith virtues for protection, forgiveness, and light. Star them to add them to your personal favorites list.
              </p>
            </div>

            {filteredRecommended.map((rec) => {
              const surah = ALL_SURAHS.find((s) => s.number === rec.number);
              if (!surah) return null;
              const isFav = favoriteSurahs.includes(surah.number);

              return (
                <div
                  key={rec.number}
                  className="p-4 rounded-3xl bg-stone-50/90 dark:bg-stone-900/60 border border-stone-200/90 dark:border-stone-800/80 shadow-xs hover:border-black dark:hover:border-stone-600 transition-all space-y-3 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-2xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-2xs">
                        #{surah.number}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h2 className="text-sm font-bold text-black dark:text-white font-cinzel truncate">
                            {surah.nameEnglish}
                          </h2>
                          <span className="text-[11px] text-stone-400">·</span>
                          <span className="text-[11px] font-bold text-stone-600 dark:text-stone-400 truncate">
                            {surah.englishTranslation}
                          </span>
                        </div>
                        <p className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 mt-0.5 truncate">
                          {rec.bestTime} · {surah.numberOfAyahs} Verses
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-quran text-base font-bold text-amber-600 dark:text-amber-400" dir="rtl">
                        {surah.nameArabic}
                      </span>
                      <button
                        onClick={() => onToggleFavorite(surah.number)}
                        className={`p-2 rounded-xl border transition-all ${
                          isFav
                            ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                            : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-400 hover:text-amber-500'
                        }`}
                        title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Star className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800/70 space-y-1.5">
                    <p className="text-xs text-stone-700 dark:text-stone-200 leading-relaxed font-medium">
                      "{rec.virtue}"
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-stone-500 dark:text-stone-400 font-mono">
                      <span>Source: {rec.hadithSource}</span>
                      {isFav && (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 font-sans">
                          <CheckCircle2 className="w-3 h-3" />
                          In Favorites
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onReadSurah(surah.number)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-2xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold hover:opacity-90 active:scale-98 transition-all shadow-2xs"
                      title="Read this Surah with bookmark isolation"
                    >
                      <BookOpen className="w-3.5 h-3.5 stroke-[2.3]" />
                      <span>Read Sunnah Surah</span>
                    </button>

                    <button
                      onClick={() => onReciteSurah(surah.number)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-black dark:text-white text-xs font-bold hover:border-black dark:hover:border-stone-500 active:scale-98 transition-all shadow-2xs"
                      title="Listen audio recitation"
                    >
                      <Headphones className="w-3.5 h-3.5 stroke-[2.3]" />
                      <span>Recite Audio</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ===================== TAB 3: ALL 114 SURAHS LIST ===================== */}
        {activeTab === 'all' && (
          <div className="space-y-2 pb-8">
            {filteredAllSurahs.map((surah) => {
              const isFav = favoriteSurahs.includes(surah.number);
              return (
                <div
                  key={surah.number}
                  className="flex items-center justify-between p-3 rounded-2xl bg-stone-50/90 dark:bg-stone-900/60 border border-stone-200/90 dark:border-stone-800/80 hover:border-black dark:hover:border-stone-600 transition-all text-xs"
                >
                  <div
                    onClick={() => onReadSurah(surah.number)}
                    className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer"
                  >
                    <span className="w-7 h-7 rounded-xl bg-stone-200/80 dark:bg-stone-800 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {surah.number}
                    </span>
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-black dark:text-white truncate font-cinzel">
                          {surah.nameEnglish}
                        </span>
                        <span className="text-stone-400">·</span>
                        <span className="font-quran text-amber-600 dark:text-amber-400 font-bold" dir="rtl">
                          {surah.nameArabic}
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-500 truncate block">
                        {surah.englishTranslation} · {surah.numberOfAyahs} Ayahs
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onReadSurah(surah.number)}
                      className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
                      title="Read Surah"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onReciteSurah(surah.number)}
                      className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
                      title="Listen Recitation"
                    >
                      <Headphones className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onToggleFavorite(surah.number)}
                      className={`p-1.5 rounded-xl border transition-all ${
                        isFav
                          ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                          : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-400 hover:text-amber-500'
                      }`}
                      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};
