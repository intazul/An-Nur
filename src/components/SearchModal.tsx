import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  BookOpen,
  ChevronRight,
  Sparkles,
  Compass,
  FileText,
  Tag,
} from 'lucide-react';
import { ALL_SURAHS } from '../data/surahList';
import { BUNDLED_SURAHS } from '../data/defaultSurahs';
import { HADITH_CHAPTER_TOPICS } from '../data/hadithChapters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (surahNumber: number, ayahNumber?: number) => void;
  onSelectHadithChapter?: (chapterId: string) => void;
}

type SearchTab = 'all' | 'quran' | 'hadith' | 'roots';

const EMOTION_CHIPS = [
  { label: 'Patience (Sabr)', query: 'patience' },
  { label: 'Anxiety & Relief', query: 'ease' },
  { label: 'Parents & Family', query: 'parents' },
  { label: 'Rizq & Wealth', query: 'sustenance' },
  { label: 'Forgiveness (Tawbah)', query: 'forgiveness' },
  { label: 'Gratitude (Shukr)', query: 'gratitude' },
  { label: 'Paradise (Jannah)', query: 'paradise' },
  { label: 'Prayer (Salah)', query: 'prayer' },
];

const ARABIC_ROOTS = [
  { root: 'ر-ح-م', translit: 'R-H-M', meaning: 'Mercy, Compassion, Womb', occurrences: 339, sample: 'الرَّحْمَٰنِ الرَّحِيمِ' },
  { root: 'ص-ب-ر', translit: 'S-B-R', meaning: 'Patience, Steadfastness, Endurance', occurrences: 103, sample: 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ' },
  { root: 'س-ل-م', translit: 'S-L-M', meaning: 'Peace, Safety, Islam, Submission', occurrences: 140, sample: 'سَلَامٌ قَوْلًا مِّن رَّبٍّ رَّحِيمٍ' },
  { root: 'ش-ك-ر', translit: 'Sh-K-R', meaning: 'Gratitude, Thankfulness, Appreciation', occurrences: 75, sample: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ' },
  { root: 'ع-ل-م', translit: '‘-L-M', meaning: 'Knowledge, Awareness, Wisdom', occurrences: 854, sample: 'عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ' },
  { root: 'ت-و-ب', translit: 'T-W-B', meaning: 'Repentance, Turning Back to Allah', occurrences: 87, sample: 'إِنَّهُ هُوَ التَّوَّابُ الرَّحِيمُ' },
  { root: 'ن-و-ر', translit: 'N-W-R', meaning: 'Light, Illumination, Divine Radiance', occurrences: 49, sample: 'اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ' },
  { root: 'ق-ل-ب', translit: 'Q-L-B', meaning: 'Heart, Turning, Spiritual Core', occurrences: 168, sample: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ' },
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
  onSelectHadithChapter,
}) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<SearchTab>('all');

  // Search surahs, bundled verses, and hadiths
  const results = useMemo(() => {
    if (!query.trim()) {
      return { surahs: [], verses: [], hadiths: [], roots: [] };
    }
    const q = query.toLowerCase().trim();

    // 1. Surah matches
    const matchedSurahs = ALL_SURAHS.filter((s) => {
      const matchNum = String(s.number) === q;
      const matchEng = s.nameEnglish.toLowerCase().includes(q);
      const matchMean = s.englishTranslation.toLowerCase().includes(q);
      const matchAr = s.nameArabic.includes(q);
      return matchNum || matchEng || matchMean || matchAr;
    }).slice(0, 6);

    // 2. Verse matches
    const matchedVerses: {
      surahNumber: number;
      surahName: string;
      ayahNumber: number;
      textArabic: string;
      textEnglish: string;
    }[] = [];

    Object.values(BUNDLED_SURAHS).forEach((surah) => {
      surah.ayahs.forEach((ayah) => {
        const inEng = ayah.textEnglish.toLowerCase().includes(q);
        const inAr = ayah.textArabic.includes(q);
        if (inEng || inAr) {
          matchedVerses.push({
            surahNumber: surah.number,
            surahName: surah.nameEnglish,
            ayahNumber: ayah.numberInSurah,
            textArabic: ayah.textArabic,
            textEnglish: ayah.textEnglish,
          });
        }
      });
    });

    // 3. Hadith Topic matches
    const matchedHadiths = HADITH_CHAPTER_TOPICS.filter((h) => {
      const inTitle = h.nameEnglish.toLowerCase().includes(q);
      const inDesc = h.description.toLowerCase().includes(q);
      const inQuestion = h.primaryQuestion.toLowerCase().includes(q);
      const inCat = h.category.toLowerCase().includes(q);
      const inAr = h.nameArabic.includes(q);
      return inTitle || inDesc || inQuestion || inCat || inAr;
    }).slice(0, 8);

    // 4. Arabic Root matches
    const matchedRoots = ARABIC_ROOTS.filter((r) => {
      return (
        r.root.includes(q) ||
        r.translit.toLowerCase().includes(q) ||
        r.meaning.toLowerCase().includes(q) ||
        r.sample.includes(q)
      );
    });

    return {
      surahs: matchedSurahs,
      verses: matchedVerses.slice(0, 8),
      hadiths: matchedHadiths,
      roots: matchedRoots,
    };
  }, [query]);

  if (!isOpen) return null;

  const totalResultsCount =
    results.surahs.length + results.verses.length + results.hadiths.length + results.roots.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in select-none">
      <div
        className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden mt-8 sm:mt-16 max-h-[85vh] flex flex-col"
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
            placeholder="Search Quran, Hadith, topics, emotions, or Arabic roots..."
            className="flex-1 bg-transparent text-black dark:text-white placeholder:text-stone-400 text-sm sm:text-base font-medium focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-black dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-bold text-stone-500 hover:text-black dark:hover:text-white rounded-xl border border-stone-300 dark:border-stone-700"
          >
            Esc
          </button>
        </div>

        {/* Filter Tabs & Quick Emotion Chips */}
        <div className="p-3 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 space-y-2">
          {/* Tabs */}
          <div className="flex gap-1.5 text-xs">
            {[
              { id: 'all' as const, label: 'All Results' },
              { id: 'quran' as const, label: `Quran (${results.surahs.length + results.verses.length})` },
              { id: 'hadith' as const, label: `Hadiths (${results.hadiths.length})` },
              { id: 'roots' as const, label: 'Arabic Roots' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-2xs'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Emotion / Topic Chips */}
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 text-xs">
            {EMOTION_CHIPS.map((c) => (
              <button
                key={c.label}
                onClick={() => setQuery(c.query)}
                className={`px-2.5 py-1 rounded-lg border whitespace-nowrap text-[11px] font-bold transition-all active:scale-95 ${
                  query === c.query
                    ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-2xs'
                    : 'bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 border-stone-300 dark:border-stone-700'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {!query.trim() && (
            <div className="py-6 space-y-5">
              <div className="text-center space-y-1.5">
                <Sparkles className="w-8 h-8 text-black dark:text-white mx-auto" />
                <h3 className="text-sm font-bold text-black dark:text-white font-cinzel">
                  Unified Sacred Knowledge Search
                </h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  Type any spiritual topic, feeling, verse number, or choose a common Arabic root below to explore Quranic wisdom and Sahih Hadiths.
                </p>
              </div>

              {/* Common Roots Grid */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                  Frequently Explored Arabic Roots
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ARABIC_ROOTS.map((r) => (
                    <button
                      key={r.root}
                      onClick={() => setQuery(r.meaning.split(',')[0].trim())}
                      className="flex items-center justify-between p-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all text-left"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-quran font-bold text-base text-black dark:text-white">
                            {r.root}
                          </span>
                          <span className="text-xs font-bold text-black dark:text-white">
                            ({r.translit})
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-500">{r.meaning}</div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black">
                        {r.occurrences}x
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {query.trim() && totalResultsCount === 0 && (
            <div className="py-12 text-center text-xs text-stone-500">
              No direct matches found for "{query}". Try checking another keyword or choose a topic pill above.
            </div>
          )}

          {/* 1. Surah Matches */}
          {(activeTab === 'all' || activeTab === 'quran') && results.surahs.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                Quranic Chapters ({results.surahs.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {results.surahs.map((s) => (
                  <button
                    key={s.number}
                    onClick={() => {
                      onSelectResult(s.number);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all text-left"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-7 h-7 rounded-xl bg-black text-white dark:bg-stone-800 font-cinzel text-xs font-bold flex items-center justify-center shrink-0">
                        {s.number}
                      </span>
                      <div className="truncate">
                        <div className="text-xs font-bold text-black dark:text-white truncate">
                          {s.nameEnglish}
                        </div>
                        <div className="text-[10px] text-stone-500 truncate">
                          {s.englishTranslation} · {s.numberOfAyahs} ayahs
                        </div>
                      </div>
                    </div>
                    <span className="font-quran text-base text-black dark:text-white shrink-0 font-bold">
                      {s.nameArabic}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. Verse Matches */}
          {(activeTab === 'all' || activeTab === 'quran') && results.verses.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
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
                    className="w-full p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all text-left space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-black dark:text-white">
                      <span>Surah {v.surahName} : Ayah {v.ayahNumber}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                    <p className="font-quran text-sm text-black dark:text-white text-right leading-loose" dir="rtl">
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

          {/* 3. Hadith Topic Matches */}
          {(activeTab === 'all' || activeTab === 'hadith') && results.hadiths.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                Sahih Hadith Chapters & Questions ({results.hadiths.length})
              </span>
              <div className="space-y-2">
                {results.hadiths.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => {
                      if (onSelectHadithChapter) {
                        onSelectHadithChapter(h.id);
                      }
                      onClose();
                    }}
                    className="w-full p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all text-left space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-black dark:text-white uppercase tracking-wider">
                        {h.category} • Chapter {h.number}
                      </span>
                      <span className="font-quran text-stone-400">{h.nameArabic}</span>
                    </div>
                    <h4 className="text-xs font-bold text-black dark:text-white">
                      {h.nameEnglish}
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-300 italic">
                      "{h.primaryQuestion}"
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 4. Arabic Roots Matches */}
          {(activeTab === 'all' || activeTab === 'roots') && results.roots.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                Matching Arabic Roots ({results.roots.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {results.roots.map((r) => (
                  <div
                    key={r.root}
                    className="p-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-quran text-lg font-bold text-black dark:text-white">
                        {r.root}
                      </span>
                      <span className="text-xs font-bold font-mono">({r.translit})</span>
                    </div>
                    <div className="text-xs font-semibold text-black dark:text-white">
                      {r.meaning}
                    </div>
                    <div className="font-quran text-xs text-stone-500 pt-1 text-right" dir="rtl">
                      {r.sample}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
