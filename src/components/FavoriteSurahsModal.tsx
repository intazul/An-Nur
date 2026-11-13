import React, { useState } from 'react';
import { X, Star, BookOpen, Search, Sparkles } from 'lucide-react';
import { ALL_SURAHS } from '../data/surahList';

interface FavoriteSurahsModalProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteSurahs: number[];
  onToggleFavorite: (surahNumber: number) => void;
  onSelectSurah: (surahNumber: number) => void;
}

const RECOMMENDED_SURAHS = [
  { number: 67, reason: 'Recite every night for protection in the grave' },
  { number: 18, reason: 'Sunnah to recite every Friday for light between two Fridays' },
  { number: 36, reason: 'Heart of the Quran for morning peace and forgiveness' },
  { number: 56, reason: 'Surah of wealth and protection from poverty' },
  { number: 55, reason: 'Surah of divine beauty and uncounted blessings' },
];

export const FavoriteSurahsModal: React.FC<FavoriteSurahsModalProps> = ({
  isOpen,
  onClose,
  favoriteSurahs,
  onToggleFavorite,
  onSelectSurah,
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredSurahs = ALL_SURAHS.filter(
    (s) =>
      s.nameEnglish.toLowerCase().includes(search.toLowerCase()) ||
      s.englishTranslation.toLowerCase().includes(search.toLowerCase()) ||
      String(s.number) === search.trim()
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-black dark:text-white fill-current" />
            <h3 className="text-base font-semibold text-black dark:text-white font-cinzel">
              Favorite Surahs
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-black text-white dark:bg-white dark:text-black rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Recommended Daily Devotions */}
        <div className="p-4 bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-black dark:text-white uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recommended Prophetic Traditions</span>
          </div>
          <div className="space-y-1.5">
            {RECOMMENDED_SURAHS.map((rec) => {
              const surah = ALL_SURAHS.find((s) => s.number === rec.number);
              if (!surah) return null;
              const isFav = favoriteSurahs.includes(rec.number);

              return (
                <div
                  key={rec.number}
                  className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-semibold text-black dark:text-white">
                      {surah.number}. {surah.nameEnglish}
                    </div>
                    <div className="text-[10px] text-stone-500 truncate">{rec.reason}</div>
                  </div>
                  <button
                    onClick={() => onToggleFavorite(rec.number)}
                    className={`p-1.5 rounded-lg border transition-colors shrink-0 ${
                      isFav
                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                        : 'bg-stone-100 dark:bg-stone-800 text-black dark:text-white border-stone-300 dark:border-stone-700'
                    }`}
                    title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-stone-200 dark:border-stone-800 flex items-center gap-2">
          <Search className="w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search all 114 Surahs..."
            className="flex-1 bg-transparent text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none"
          />
        </div>

        {/* Surahs List with Star Toggles */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {filteredSurahs.map((surah) => {
            const isFav = favoriteSurahs.includes(surah.number);
            return (
              <div
                key={surah.number}
                className="flex items-center justify-between p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-black dark:hover:border-white transition-colors"
              >
                <button
                  onClick={() => {
                    onSelectSurah(surah.number);
                    onClose();
                  }}
                  className="flex items-center gap-2.5 text-left min-w-0 flex-1"
                >
                  <span className="w-6 h-6 rounded bg-black text-white dark:bg-white dark:text-black font-cinzel text-xs font-bold flex items-center justify-center shrink-0">
                    {surah.number}
                  </span>
                  <div className="truncate">
                    <div className="text-xs font-semibold text-black dark:text-white truncate">
                      {surah.nameEnglish}
                    </div>
                    <div className="text-[10px] text-stone-500 truncate">
                      {surah.englishTranslation} · {surah.numberOfAyahs} ayahs
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => onToggleFavorite(surah.number)}
                  className={`p-2 rounded-lg transition-colors ml-2 ${
                    isFav
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'text-stone-400 dark:text-stone-600 hover:text-black dark:hover:text-white'
                  }`}
                  title={isFav ? 'Remove from favorites' : 'Mark as favorite'}
                >
                  <Star className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
