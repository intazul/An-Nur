import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, ChevronRight, Hash } from 'lucide-react';
import { ALL_SURAHS } from '../data/surahList';
import { BUNDLED_SURAHS } from '../data/defaultSurahs';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (surahNumber: number, ayahNumber?: number) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const [query, setQuery] = useState('');

  // Search surahs and bundled verses
  const results = useMemo<{
    surahs: typeof ALL_SURAHS;
    verses: {
      surahNumber: number;
      surahName: string;
      ayahNumber: number;
      textArabic: string;
      textEnglish: string;
      textUrdu: string;
    }[];
  }>(() => {
    if (!query.trim()) {
      return { surahs: [], verses: [] };
    }
    const q = query.toLowerCase().trim();

    // 1. Match Surahs by number, English name, Urdu name, Arabic name, or meaning
    const matchedSurahs = ALL_SURAHS.filter((s) => {
      const matchNum = String(s.number) === q;
      const matchEng = s.nameEnglish.toLowerCase().includes(q);
      const matchMean = s.englishTranslation.toLowerCase().includes(q);
      const matchAr = s.nameArabic.includes(q);
      const matchUr = s.nameUrdu.includes(q);
      return matchNum || matchEng || matchMean || matchAr || matchUr;
    }).slice(0, 8);

    // 2. Match verses in bundled surahs
    const matchedVerses: {
      surahNumber: number;
      surahName: string;
      ayahNumber: number;
      textArabic: string;
      textEnglish: string;
      textUrdu: string;
    }[] = [];

    Object.values(BUNDLED_SURAHS).forEach((surah) => {
      surah.ayahs.forEach((ayah) => {
        const inEng = ayah.textEnglish.toLowerCase().includes(q);
        const inUr = ayah.textUrdu.includes(q);
        const inAr = ayah.textArabic.includes(q);

        if (inEng || inUr || inAr) {
          matchedVerses.push({
            surahNumber: surah.number,
            surahName: surah.nameEnglish,
            ayahNumber: ayah.numberInSurah,
            textArabic: ayah.textArabic,
            textEnglish: ayah.textEnglish,
            textUrdu: ayah.textUrdu,
          });
        }
      });
    });

    return {
      surahs: matchedSurahs,
      verses: matchedVerses.slice(0, 10),
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden mt-12 sm:mt-20 max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Surahs, verse keywords (e.g., 'light', 'patience', '36', 'الرحمن')..."
            className="flex-1 bg-transparent text-stone-900 dark:text-stone-100 placeholder:text-stone-400 text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 rounded border border-stone-200 dark:border-stone-700"
          >
            Esc
          </button>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!query.trim() && (
            <div className="py-8 text-center space-y-2">
              <BookOpen className="w-8 h-8 text-stone-300 dark:text-stone-600 mx-auto" />
              <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
                Explore the Holy Quran
              </p>
              <p className="text-xs text-stone-400 max-w-md mx-auto">
                Search by chapter number (e.g. "112"), English transliteration ("Ya-Sin"), theme ("mercy", "light"), or Arabic text.
              </p>
            </div>
          )}

          {query.trim() && results.surahs.length === 0 && results.verses.length === 0 && (
            <div className="py-12 text-center text-xs text-stone-500">
              No direct matches found for "{query}". Try another term or chapter number.
            </div>
          )}

          {/* Surah Matches */}
          {results.surahs && results.surahs.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                Chapters / Surahs ({results.surahs.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {results.surahs.map((s) => (
                  <button
                    key={s.number}
                    onClick={() => {
                      onSelectResult(s.number);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/80 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-6 h-6 rounded bg-stone-100 dark:bg-stone-800 font-cinzel text-xs font-bold flex items-center justify-center shrink-0">
                        {s.number}
                      </span>
                      <div className="truncate">
                        <div className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">
                          {s.nameEnglish}
                        </div>
                        <div className="text-[11px] text-stone-500 truncate">
                          {s.englishTranslation} · {s.numberOfAyahs} ayahs
                        </div>
                      </div>
                    </div>
                    <span className="font-quran text-base text-amber-600 dark:text-amber-400 shrink-0">
                      {s.nameArabic}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Verse Text Matches */}
          {results.verses && results.verses.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                Matching Verses ({results.verses.length})
              </span>
              <div className="space-y-2">
                {results.verses.map((v, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectResult(v.surahNumber, v.ayahNumber);
                      onClose();
                    }}
                    className="w-full p-3 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/80 transition-colors text-left space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs font-medium text-amber-600 dark:text-amber-400">
                      <span>
                        Surah {v.surahName} : Ayah {v.ayahNumber}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                    <p className="font-quran text-sm text-stone-900 dark:text-stone-100 text-right" dir="rtl">
                      {v.textArabic}
                    </p>
                    <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2">
                      {v.textEnglish}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
