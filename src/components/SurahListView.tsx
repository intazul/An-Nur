import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  Settings,
  Star,
  BookOpen,
  Sparkles,
  BookmarkCheck,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { ALL_SURAHS } from '../data/surahList';
import { LastReadPosition, SurahMeta, UserProfileData } from '../types/quran';
import { transliterateUrduToRoman } from '../utils/urduTransliteration';

interface SurahListViewProps {
  onBackToDashboard: () => void;
  onSelectSurah: (surahNumber: number, startFullScreen?: boolean) => void;
  onOpenSettings: () => void;
  profile: UserProfileData;
  onToggleFavoriteSurah: (surahNumber: number) => void;
  lastRead: LastReadPosition;
}

export const SurahListView: React.FC<SurahListViewProps> = ({
  onBackToDashboard,
  onSelectSurah,
  onOpenSettings,
  profile,
  onToggleFavoriteSurah,
  lastRead,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'meccan' | 'medinan' | 'favorites'>('all');

  const favorites = profile.favoriteSurahs || [];

  const filteredSurahs = useMemo(() => {
    let list = ALL_SURAHS;

    // Filter by type
    if (filterType === 'meccan') {
      list = list.filter((s) => s.revelationType === 'Meccan');
    } else if (filterType === 'medinan') {
      list = list.filter((s) => s.revelationType === 'Medinan');
    } else if (filterType === 'favorites') {
      list = list.filter((s) => favorites.includes(s.number));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((s) => {
        const matchesNum = String(s.number) === q;
        const matchesEng = s.nameEnglish.toLowerCase().includes(q);
        const matchesTranslation = s.englishTranslation.toLowerCase().includes(q);
        const matchesArabic = s.nameArabic.includes(q);
        const matchesUrdu =
          s.nameUrdu.includes(q) || transliterateUrduToRoman(s.nameUrdu).toLowerCase().includes(q);
        return matchesNum || matchesEng || matchesTranslation || matchesArabic || matchesUrdu;
      });
    }

    return list;
  }, [searchQuery, filterType, favorites]);

  return (
    <div className="flex-1 flex flex-col max-w-md w-full mx-auto bg-white dark:bg-black h-full overflow-hidden select-none">
      {/* 1. Header Bar */}
      <header className="shrink-0 bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800 px-4 py-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToDashboard}
            className="min-w-[44px] min-h-[44px] -ml-2 flex items-center justify-center rounded-full text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors active:scale-95"
            title="Back to Dashboard"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2]" />
          </button>
          <div>
            <h1 className="font-semibold text-base tracking-tight text-black dark:text-white leading-tight">
              The Holy Qur’an
            </h1>
            <span className="font-quran text-xs text-neutral-600 dark:text-neutral-400 font-semibold block -mt-0.5">
              فهرس السور · 114 Surahs
            </span>
          </div>
        </div>

        <button
          onClick={onOpenSettings}
          className="min-w-[44px] min-h-[44px] -mr-2 flex items-center justify-center rounded-full text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors active:scale-95"
          title="Settings"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5 stroke-[1.8]" />
        </button>
      </header>

      {/* 2. Quick Resume Last Read Banner */}
      {lastRead && lastRead.surahNumber && (
        <div className="shrink-0 px-4 pt-3 pb-1">
          <button
            onClick={() => onSelectSurah(lastRead.surahNumber, true)}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-black text-white hover:bg-neutral-900 dark:bg-white dark:text-black dark:hover:bg-neutral-100 text-xs transition-all active:scale-[0.99]"
            title="Resume reading on full screen mode"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <BookmarkCheck className="w-4 h-4 text-white dark:text-black shrink-0 stroke-[2.2]" />
              <div className="text-left min-w-0">
                <span className="text-[10px] uppercase font-semibold opacity-75 block tracking-wider">
                  Resume Last Read
                </span>
                <span className="font-semibold text-xs truncate block">
                  {lastRead.surahName || `Surah ${lastRead.surahNumber}`} · Ayah {lastRead.ayahNumber || 1}
                </span>
              </div>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white text-black dark:bg-black dark:text-white shrink-0 flex items-center gap-1">
              <span>Read</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      )}

      {/* 3. Search Bar */}
      <div className="shrink-0 px-4 py-2.5">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-neutral-500 dark:text-neutral-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, number (e.g. 36, Yasin, يس)..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-black dark:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400 text-xs font-medium focus:outline-none focus:border-black dark:focus:border-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 text-xs text-neutral-500 hover:text-black dark:hover:text-white font-semibold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 pt-2.5 text-[11px] overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: `All (${ALL_SURAHS.length})` },
            { id: 'meccan', label: 'Meccan (86)' },
            { id: 'medinan', label: 'Medinan (28)' },
            { id: 'favorites', label: `Favorites (${favorites.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as 'all' | 'meccan' | 'medinan' | 'favorites')}
              className={`px-3 py-1.5 rounded-full border font-semibold transition-all whitespace-nowrap ${
                filterType === tab.id
                  ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                  : 'bg-white dark:bg-black text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Complete Surah List (Scrolls smoothly inside container) */}
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-1.5">
        {filteredSurahs.length === 0 ? (
          <div className="py-16 text-center text-neutral-600 dark:text-neutral-400 space-y-2">
            <BookOpen className="w-8 h-8 mx-auto opacity-40 text-black dark:text-white" />
            <p className="text-xs font-semibold text-black dark:text-white">No Surahs found matching “{searchQuery}”</p>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Try searching by number, English or Arabic name</p>
          </div>
        ) : (
          filteredSurahs.map((surah) => {
            const isFav = favorites.includes(surah.number);
            const isLastReadSurah = lastRead && lastRead.surahNumber === surah.number;

            return (
              <div
                key={surah.number}
                onClick={() => onSelectSurah(surah.number, true)}
                className={`w-full p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 group active:scale-[0.99] ${
                  isLastReadSurah
                    ? 'bg-neutral-100 dark:bg-neutral-900 border-black dark:border-white ring-1 ring-black dark:ring-white'
                    : 'bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white'
                }`}
                title={`Open Surah ${surah.nameEnglish} in Full Screen Mode`}
              >
                {/* Left: Surah Number and Meta */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-semibold text-xs tabular-nums shrink-0">
                    {surah.number}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-semibold text-sm text-black dark:text-white truncate">
                        {surah.nameEnglish}
                      </h3>
                      {isLastReadSurah && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-black text-white dark:bg-white dark:text-black font-semibold shrink-0">
                          Last Read
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400 truncate font-medium tabular-nums">
                      {surah.englishTranslation} · <span className="font-semibold text-black dark:text-neutral-200">{surah.numberOfAyahs} verses</span>
                    </p>
                  </div>
                </div>

                {/* Right: Arabic Calligraphy Title & Favorite Button */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <div className="text-right">
                    <span className="font-quran text-base font-semibold text-black dark:text-white block">
                      سُورَةُ {surah.nameArabic}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400 block">
                      {surah.revelationType}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavoriteSurah(surah.number);
                    }}
                    className={`min-w-[34px] min-h-[34px] flex items-center justify-center rounded-xl border transition-all active:scale-95 ${
                      isFav
                        ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                        : 'bg-neutral-50 dark:bg-neutral-950 text-neutral-500 border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white'
                    }`}
                    title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${
                        isFav ? 'fill-current' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
