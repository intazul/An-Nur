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
        const matchesUrdu = s.nameUrdu.includes(q);
        return matchesNum || matchesEng || matchesTranslation || matchesArabic || matchesUrdu;
      });
    }

    return list;
  }, [searchQuery, filterType, favorites]);

  return (
    <div className="flex-1 flex flex-col max-w-md w-full mx-auto bg-stone-50 dark:bg-stone-950 h-full overflow-hidden select-none">
      {/* 1. Header Bar */}
      <header className="shrink-0 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 py-3 flex items-center justify-between gap-2 shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToDashboard}
            className="p-1.5 -ml-1 text-black dark:text-white rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Back to Dashboard"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
          <div>
            <h1 className="font-cinzel font-bold text-base text-black dark:text-white leading-tight">
              The Holy Quran
            </h1>
            <span className="font-quran text-xs text-stone-900 dark:text-amber-400 font-bold block -mt-0.5">
              فهرس السور · 114 Surahs
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenSettings}
            className="p-2 text-black dark:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-colors"
            title="Settings"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. Quick Resume Last Read Banner */}
      {lastRead && lastRead.surahNumber && (
        <div className="shrink-0 px-4 pt-3 pb-1">
          <button
            onClick={() => onSelectSurah(lastRead.surahNumber, true)}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 text-xs transition-all shadow-md active:scale-[0.99]"
            title="Resume reading on full screen mode"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <BookmarkCheck className="w-4 h-4 text-amber-400 dark:text-amber-600 shrink-0 stroke-[2.5]" />
              <div className="text-left min-w-0">
                <span className="text-[10px] uppercase font-bold opacity-80 block tracking-wider">
                  Resume Last Read
                </span>
                <span className="font-bold text-xs truncate block">
                  Surah {lastRead.surahName || `Surah ${lastRead.surahNumber}`} : Ayah {lastRead.ayahNumber || 1}
                </span>
              </div>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white/20 dark:bg-black/10 shrink-0 flex items-center gap-1">
              <span>Read Full Screen</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      )}

      {/* 3. Search Bar */}
      <div className="shrink-0 px-4 py-2.5">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-stone-600 dark:text-stone-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, number (e.g. 36, Yasin, يس)..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-black dark:text-white placeholder:text-stone-600 dark:placeholder:text-stone-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 text-xs text-stone-600 hover:text-black dark:hover:text-white font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 pt-2 text-[11px] overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: `All (${ALL_SURAHS.length})` },
            { id: 'meccan', label: 'Meccan (86)' },
            { id: 'medinan', label: 'Medinan (28)' },
            { id: 'favorites', label: `Favorites (${favorites.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as any)}
              className={`px-3 py-1 rounded-lg font-bold transition-all whitespace-nowrap ${
                filterType === tab.id
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                  : 'bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700'
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
          <div className="py-16 text-center text-stone-700 dark:text-stone-400 space-y-2">
            <BookOpen className="w-8 h-8 mx-auto opacity-40 text-black dark:text-white" />
            <p className="text-xs font-bold text-black dark:text-white">No Surahs found matching "{searchQuery}"</p>
            <p className="text-[11px] text-stone-600 dark:text-stone-400">Try searching by number, English or Arabic name</p>
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
                    ? 'bg-amber-500/10 border-amber-500/40 shadow-xs ring-1 ring-amber-500/30'
                    : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-black dark:hover:border-white shadow-2xs'
                }`}
                title={`Open Surah ${surah.nameEnglish} in Full Screen Mode`}
              >
                {/* Left: Surah Number and Meta */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-stone-100 dark:bg-stone-800 text-black dark:text-white flex items-center justify-center font-cinzel font-bold text-xs shrink-0 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                    {surah.number}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-sm text-black dark:text-white truncate">
                        {surah.nameEnglish}
                      </h3>
                      {isLastReadSurah && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-amber-500 text-white font-bold shrink-0">
                          Last Read
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-stone-700 dark:text-stone-400 truncate font-medium">
                      {surah.englishTranslation} · <span className="font-semibold text-black dark:text-stone-300">{surah.numberOfAyahs} verses</span>
                    </p>
                  </div>
                </div>

                {/* Right: Arabic Calligraphy Title & Favorite Button */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <div className="text-right">
                    <span className="font-quran text-base font-bold text-amber-700 dark:text-amber-400 block">
                      سُورَةُ {surah.nameArabic}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-stone-600 dark:text-stone-400 block">
                      {surah.revelationType}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavoriteSurah(surah.number);
                    }}
                    className="p-1 text-stone-400 hover:text-amber-500 transition-colors"
                    title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        isFav ? 'fill-amber-500 text-amber-500' : 'text-stone-400 dark:text-stone-600'
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
