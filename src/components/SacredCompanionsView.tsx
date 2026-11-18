import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  EyeOff,
  Headphones,
  RotateCcw,
  Search,
  Sparkles,
  Volume2,
} from 'lucide-react';
import {
  ASMA_AL_HUSNA,
  AdhkarCategory,
  HISN_ADHKAR,
  LIFE_TOPICS,
  RABBANA_DUAS,
  TAJWEED_RULES,
} from '../data/sacredCompanionsData';
import { ALL_SURAHS } from '../data/surahList';
import {
  HifzProgressMap,
  HifzStatus,
  getOfflineHijriInfo,
  loadFridaySalawatCount,
  loadHifzProgress,
  saveFridaySalawatCount,
  updateSurahHifzRecord,
} from '../utils/backupAndHifz';

export type SacredHubTab =
  | 'adhkar'
  | 'rabbana'
  | 'names'
  | 'tajweed'
  | 'topics'
  | 'hifz'
  | 'jumuah';

interface SacredCompanionsViewProps {
  onBackToDashboard: () => void;
  onOpenAyahInReader: (surahNumber: number, ayahNumber: number, options?: { enableHifzMask?: boolean }) => void;
  onPlayAyahInReciter: (surahNumber: number, ayahNumber: number) => void;
  onDhikrIncrement?: (delta?: number) => void;
}

const HUB_TABS: { id: SacredHubTab; label: string }[] = [
  { id: 'adhkar', label: 'Adhkar' },
  { id: 'rabbana', label: '40 Rabbana' },
  { id: 'names', label: '99 Names' },
  { id: 'tajweed', label: 'Tajweed' },
  { id: 'topics', label: 'Topics' },
  { id: 'hifz', label: 'Hifz Coach' },
  { id: 'jumuah', label: 'Jumu‘ah & Hijri' },
];

const ADHKAR_CATEGORIES: { id: AdhkarCategory; label: string }[] = [
  { id: 'morning', label: 'Morning' },
  { id: 'evening', label: 'Evening' },
  { id: 'sleeping', label: 'Sleep' },
  { id: 'after_salah', label: 'After Salah' },
];

const HIFZ_STATUS_CYCLE: HifzStatus[] = ['new', 'learning', 'review_due', 'mastered'];

const HIFZ_STATUS_LABEL: Record<HifzStatus, string> = {
  new: 'New',
  learning: 'Learning',
  review_due: 'Review Due',
  mastered: 'Mastered',
};

export const SacredCompanionsView: React.FC<SacredCompanionsViewProps> = ({
  onBackToDashboard,
  onOpenAyahInReader,
  onPlayAyahInReciter,
  onDhikrIncrement,
}) => {
  const [activeTab, setActiveTab] = useState<SacredHubTab>('adhkar');

  // 1. Adhkar State
  const [adhkarCat, setAdhkarCat] = useState<AdhkarCategory>('morning');
  const [adhkarSlideIdx, setAdhkarSlideIdx] = useState<number>(0);
  const [adhkarCounts, setAdhkarCounts] = useState<Record<string, number>>({});

  // 2. 40 Rabbana & 99 Names & Topics Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tajweedFilter, setTajweedFilter] = useState<string>('All');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(LIFE_TOPICS[0].id);

  // 3. Hifz Coach State
  const [hifzMap, setHifzMap] = useState<HifzProgressMap>(() => loadHifzProgress());
  const [hifzFilter, setHifzFilter] = useState<'all' | HifzStatus>('all');
  const [hifzSearch, setHifzSearch] = useState<string>('');

  // 4. Jumuah & Salawat Counter State
  const [salawatCount, setSalawatCount] = useState<number>(() => loadFridaySalawatCount());
  const [jumuahChecklist, setJumuahChecklist] = useState<Record<string, boolean>>({});

  const hijriInfo = useMemo(() => getOfflineHijriInfo(new Date()), []);

  // Filtered collections
  const filteredAdhkar = useMemo(
    () => HISN_ADHKAR.filter((item) => item.category === adhkarCat),
    [adhkarCat]
  );
  const currentDhikr = filteredAdhkar[Math.min(adhkarSlideIdx, Math.max(0, filteredAdhkar.length - 1))];
  const currentDhikrDoneCount = currentDhikr ? adhkarCounts[currentDhikr.id] || 0 : 0;

  const filteredRabbana = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return RABBANA_DUAS;
    return RABBANA_DUAS.filter(
      (d) =>
        d.english.toLowerCase().includes(q) ||
        d.theme.toLowerCase().includes(q) ||
        d.refLabel.toLowerCase().includes(q) ||
        d.transliteration.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const filteredNames = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return ASMA_AL_HUSNA;
    return ASMA_AL_HUSNA.filter(
      (n) =>
        n.transliteration.toLowerCase().includes(q) ||
        n.meaning.toLowerCase().includes(q) ||
        n.arabic.includes(q) ||
        String(n.number) === q
    );
  }, [searchQuery]);

  const filteredTajweed = useMemo(() => {
    if (tajweedFilter === 'All') return TAJWEED_RULES;
    return TAJWEED_RULES.filter((r) => r.category === tajweedFilter);
  }, [tajweedFilter]);

  const selectedTopic = useMemo(
    () => LIFE_TOPICS.find((t) => t.id === selectedTopicId) || LIFE_TOPICS[0],
    [selectedTopicId]
  );

  // Hifz stats & filtered surahs
  const hifzStats = useMemo(() => {
    let mastered = 0;
    let learning = 0;
    let review_due = 0;
    for (const s of ALL_SURAHS) {
      const st = hifzMap[s.number]?.status || 'new';
      if (st === 'mastered') mastered += 1;
      else if (st === 'learning') learning += 1;
      else if (st === 'review_due') review_due += 1;
    }
    return {
      mastered,
      learning,
      review_due,
      newCount: ALL_SURAHS.length - mastered - learning - review_due,
    };
  }, [hifzMap]);

  const filteredHifzSurahs = useMemo(() => {
    const q = hifzSearch.trim().toLowerCase();
    return ALL_SURAHS.filter((s) => {
      const st = hifzMap[s.number]?.status || 'new';
      if (hifzFilter !== 'all' && st !== hifzFilter) return false;
      if (!q) return true;
      return (
        s.nameEnglish.toLowerCase().includes(q) ||
        s.englishTranslation.toLowerCase().includes(q) ||
        String(s.number) === q
      );
    });
  }, [hifzMap, hifzFilter, hifzSearch]);

  const handleTapDhikr = () => {
    if (!currentDhikr) return;
    setAdhkarCounts((prev) => {
      const cur = prev[currentDhikr.id] || 0;
      const next = cur >= currentDhikr.targetCount ? currentDhikr.targetCount : cur + 1;
      return { ...prev, [currentDhikr.id]: next };
    });
    onDhikrIncrement?.(1);
  };

  const handleResetDhikr = (id: string) => {
    setAdhkarCounts((prev) => ({ ...prev, [id]: 0 }));
  };

  const handleCycleHifzStatus = (surahNumber: number, totalAyahs: number) => {
    const currentStatus: HifzStatus = hifzMap[surahNumber]?.status || 'new';
    const nextIdx = (HIFZ_STATUS_CYCLE.indexOf(currentStatus) + 1) % HIFZ_STATUS_CYCLE.length;
    const nextStatus = HIFZ_STATUS_CYCLE[nextIdx];
    const nextMemorized =
      nextStatus === 'mastered'
        ? totalAyahs
        : nextStatus === 'new'
        ? 0
        : hifzMap[surahNumber]?.memorizedAyahs || Math.min(totalAyahs, 5);
    const updated = updateSurahHifzRecord(surahNumber, nextStatus, nextMemorized);
    setHifzMap(updated);
  };

  const handleIncrementSalawat = () => {
    const next = salawatCount + 1;
    setSalawatCount(next);
    saveFridaySalawatCount(next);
    onDhikrIncrement?.(1);
  };

  const handleResetSalawat = () => {
    setSalawatCount(0);
    saveFridaySalawatCount(0);
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-white text-black dark:bg-black dark:text-white overflow-hidden">
      {/* 1. Monochrome Top Header */}
      <header className="shrink-0 px-3.5 py-2.5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-2 bg-white dark:bg-black">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={onBackToDashboard}
            className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-900 active:scale-95 transition-all"
            title="Back to Dashboard"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
          <div className="min-w-0">
            <h1 className="text-sm font-bold font-cinzel truncate">
              Companions & Guides
            </h1>
            <p className="text-[10.5px] text-stone-500 dark:text-stone-400 truncate font-medium">
              Adhkar · Duas · 99 Names · Tajweed · Hifz · Hijri
            </p>
          </div>
        </div>
        <span className="px-2 py-1 rounded-lg border border-stone-300 dark:border-stone-700 text-[9.5px] font-mono font-bold uppercase tracking-wider shrink-0">
          Offline
        </span>
      </header>

      {/* 2. Compact Monochrome 7-Tab Selector */}
      <div className="shrink-0 px-3 py-2 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          {HUB_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchQuery('');
                }}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-2xs'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-black dark:hover:border-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Tab Bodies */}

      {/* TAB 1: HISN AL-MUSLIM ADHKAR (ZERO-SCROLL HORIZONTAL SLIDE CARDS) */}
      {activeTab === 'adhkar' && currentDhikr && (
        <div className="flex-1 min-h-0 flex flex-col justify-between p-3 overflow-hidden">
          {/* Category Filter Strip */}
          <div className="grid grid-cols-4 gap-1.5 shrink-0 mb-2.5">
            {ADHKAR_CATEGORIES.map((cat) => {
              const active = adhkarCat === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setAdhkarCat(cat.id);
                    setAdhkarSlideIdx(0);
                  }}
                  className={`py-2 px-1 rounded-xl text-[11px] font-bold border transition-all ${
                    active
                      ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                      : 'bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Main Dhikr Slide Card */}
          <div className="flex-1 min-h-0 flex flex-col justify-between p-4 rounded-3xl bg-[#fdfbf7] dark:bg-stone-900 border-2 border-stone-300 dark:border-stone-800 shadow-sm overflow-hidden">
            {/* Card Header */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-stone-200 dark:border-stone-800 shrink-0">
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                  Card {adhkarSlideIdx + 1} of {filteredAdhkar.length} · {currentDhikr.source}
                </span>
                <h2 className="text-xs font-bold font-cinzel truncate mt-0.5">{currentDhikr.title}</h2>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {currentDhikr.surahNumber && currentDhikr.ayahNumber && (
                  <button
                    onClick={() => onOpenAyahInReader(currentDhikr.surahNumber!, currentDhikr.ayahNumber!)}
                    className="p-2 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800"
                    title="Read in Quran"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => handleResetDhikr(currentDhikr.id)}
                  className="p-2 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800"
                  title="Reset counter"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Scroll-safe Interior Body */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain py-3 space-y-3 scrollbar-thin pr-1">
              <p
                className="font-scheherazade text-right text-2xl sm:text-[26px] leading-[2.2] font-bold text-black dark:text-white"
                dir="rtl"
              >
                {currentDhikr.arabic}
              </p>

              <p className="text-[11px] font-mono text-stone-600 dark:text-stone-400 italic leading-relaxed">
                {currentDhikr.transliteration}
              </p>

              <p className="text-[13px] font-book-serif text-stone-900 dark:text-stone-200 leading-relaxed">
                {currentDhikr.english}
              </p>

              <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-[11px] text-stone-800 dark:text-stone-200">
                <strong className="font-bold">Authentic Virtue:</strong> {currentDhikr.virtue}
              </div>
            </div>

            {/* Tap-to-Count Action Bar */}
            <div className="pt-2 border-t border-stone-200 dark:border-stone-800 shrink-0">
              <button
                onClick={handleTapDhikr}
                className={`w-full min-h-[48px] rounded-2xl font-bold text-xs flex items-center justify-between px-4 transition-all active:scale-[0.98] ${
                  currentDhikrDoneCount >= currentDhikr.targetCount
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-stone-900 text-white dark:bg-stone-100 dark:text-black'
                }`}
              >
                <span className="flex items-center gap-2">
                  {currentDhikrDoneCount >= currentDhikr.targetCount ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  <span>
                    {currentDhikrDoneCount >= currentDhikr.targetCount
                      ? 'Completed Sunnah Count'
                      : 'Tap to Count Dhikr'}
                  </span>
                </span>
                <span className="font-mono text-sm font-extrabold">
                  {currentDhikrDoneCount} / {currentDhikr.targetCount}
                </span>
              </button>
            </div>
          </div>

          {/* Slide Navigation Buttons */}
          <div className="mt-2.5 flex items-center gap-2 shrink-0">
            <button
              onClick={() => setAdhkarSlideIdx((prev) => Math.max(0, prev - 1))}
              disabled={adhkarSlideIdx === 0}
              className="flex-1 min-h-[44px] rounded-xl border border-stone-300 dark:border-stone-700 font-bold text-xs flex items-center justify-center gap-1 disabled:opacity-35 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <button
              onClick={() => setAdhkarSlideIdx((prev) => Math.min(filteredAdhkar.length - 1, prev + 1))}
              disabled={adhkarSlideIdx >= filteredAdhkar.length - 1}
              className="flex-1 min-h-[44px] rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-xs flex items-center justify-center gap-1 disabled:opacity-35 active:scale-95 transition-all"
            >
              <span>Next Dhikr</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: 40 RABBANA QURANIC DUAS */}
      {activeTab === 'rabbana' && (
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-stone-200 dark:border-stone-800 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 40 Rabbana Duas by theme, verse, or text..."
                className="w-full h-11 pl-9 pr-3 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-medium focus:outline-none focus:border-black dark:focus:border-white"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin">
            {filteredRabbana.map((dua) => (
              <div
                key={dua.number}
                className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">
                      #{dua.number} · {dua.refLabel}
                    </span>
                    <h3 className="text-xs font-bold font-cinzel text-black dark:text-white truncate">
                      {dua.theme}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onOpenAyahInReader(dua.surahNumber, dua.ayahNumber)}
                      className="px-2.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-[10.5px] font-bold flex items-center gap-1 hover:bg-stone-200 dark:hover:bg-stone-800"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Read</span>
                    </button>
                    <button
                      onClick={() => onPlayAyahInReciter(dua.surahNumber, dua.ayahNumber)}
                      className="px-2.5 py-1.5 rounded-lg bg-black text-white dark:bg-white dark:text-black text-[10.5px] font-bold flex items-center gap-1"
                    >
                      <Headphones className="w-3 h-3" />
                      <span>Listen</span>
                    </button>
                  </div>
                </div>

                <p className="font-quran text-right text-xl leading-[2.2] font-bold" dir="rtl">
                  {dua.arabic}
                </p>
                <p className="text-[11px] font-mono text-stone-600 dark:text-stone-400 italic">
                  {dua.transliteration}
                </p>
                <p className="text-xs font-book-serif text-stone-900 dark:text-stone-200 leading-relaxed">
                  {dua.english}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: 99 NAMES OF ALLAH (ASMA AL-HUSNA) */}
      {activeTab === 'names' && (
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-stone-200 dark:border-stone-800 shrink-0 space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 99 Names by Arabic, transliteration, or meaning..."
                className="w-full h-11 pl-9 pr-3 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-medium focus:outline-none focus:border-black dark:focus:border-white"
              />
            </div>
            <p className="text-[10.5px] text-stone-500 font-medium px-1">
              “Allah has ninety-nine Names; whoever preserves and lives by them will enter Paradise.” — Sahih al-Bukhari 2736
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-3 grid grid-cols-1 gap-2 scrollbar-thin">
            {filteredNames.map((name) => (
              <div
                key={name.number}
                className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-mono text-xs font-bold shrink-0">
                    {name.number}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs font-bold font-cinzel truncate">{name.transliteration}</h3>
                      <span className="text-[10px] font-mono text-stone-500">({name.quranRef})</span>
                    </div>
                    <p className="text-xs text-stone-700 dark:text-stone-300 leading-snug">
                      {name.meaning}
                    </p>
                  </div>
                </div>
                <span className="font-scheherazade text-2xl font-bold shrink-0 text-right" dir="rtl">
                  {name.arabic}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MONOCHROME TAJWEED & WAQF TEACHER */}
      {activeTab === 'tajweed' && (
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <div className="px-3 py-2 border-b border-stone-200 dark:border-stone-800 overflow-x-auto scrollbar-none shrink-0">
            <div className="flex items-center gap-1.5 min-w-max">
              {['All', 'Noon & Tanween', 'Qalqalah & Ghunnah', 'Madd (Elongation)', 'Waqf (Stopping Signs)'].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setTajweedFilter(cat)}
                    className={`px-2.5 py-1.5 rounded-xl text-[10.5px] font-bold border ${
                      tajweedFilter === cat
                        ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                        : 'bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800'
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin">
            {filteredTajweed.map((rule) => (
              <div
                key={rule.id}
                className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
                      {rule.category}
                    </span>
                    <h3 className="text-xs font-bold font-cinzel mt-0.5">{rule.title}</h3>
                  </div>
                </div>

                <div className="px-3 py-2 rounded-xl bg-white dark:bg-black border border-stone-300 dark:border-stone-700 font-quran text-sm font-bold text-center">
                  {rule.symbolOrLetters}
                </div>

                <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                  {rule.howToRecite}
                </p>

                <div className="p-3 rounded-xl bg-[#fdfbf7] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-500">
                    <span>Live Example: {rule.exampleRef}</span>
                  </div>
                  <p className="font-quran text-right text-xl leading-[2.1] font-bold" dir="rtl">
                    {rule.exampleArabic}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onOpenAyahInReader(rule.surahNumber, rule.ayahNumber)}
                      className="flex-1 min-h-[38px] rounded-xl border border-stone-300 dark:border-stone-700 text-[11px] font-bold flex items-center justify-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Open Ayah</span>
                    </button>
                    <button
                      onClick={() => onPlayAyahInReciter(rule.surahNumber, rule.ayahNumber)}
                      className="flex-1 min-h-[38px] rounded-xl bg-black text-white dark:bg-white dark:text-black text-[11px] font-bold flex items-center justify-center gap-1.5"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Hear Qari Example</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: LIFE-SITUATIONS TOPIC FINDER (100% OFFLINE) */}
      {activeTab === 'topics' && (
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-stone-200 dark:border-stone-800 shrink-0 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1.5 min-w-max">
              {LIFE_TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`px-3 py-2 rounded-xl text-[11px] font-bold border transition-all ${
                    selectedTopic.id === topic.id
                      ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                      : 'bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800'
                  }`}
                >
                  {topic.title.split('&')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin">
            <div className="p-3.5 rounded-2xl bg-black text-white dark:bg-white dark:text-black">
              <h2 className="text-sm font-bold font-cinzel">{selectedTopic.title}</h2>
              <p className="text-[11px] opacity-80 mt-0.5">{selectedTopic.subtitle}</p>
            </div>

            {selectedTopic.verses.map((v, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-mono font-bold text-stone-600 dark:text-stone-400">
                    Quran {v.ref}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onOpenAyahInReader(v.surahNumber, v.ayahNumber)}
                      className="px-2.5 py-1 rounded-lg border border-stone-300 dark:border-stone-700 text-[10.5px] font-bold flex items-center gap-1"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Read</span>
                    </button>
                    <button
                      onClick={() => onPlayAyahInReciter(v.surahNumber, v.ayahNumber)}
                      className="px-2.5 py-1 rounded-lg bg-black text-white dark:bg-white dark:text-black text-[10.5px] font-bold flex items-center gap-1"
                    >
                      <Headphones className="w-3 h-3" />
                      <span>Listen</span>
                    </button>
                  </div>
                </div>
                <p className="font-quran text-right text-xl leading-[2.2] font-bold" dir="rtl">
                  {v.arabic}
                </p>
                <p className="text-xs font-book-serif text-stone-900 dark:text-stone-200 leading-relaxed">
                  {v.english}
                </p>
              </div>
            ))}

            <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-stone-900 border-2 border-stone-300 dark:border-stone-700 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400">
                <span>Prophetic Guidance · {selectedTopic.hadith.narrator}</span>
                <span>{selectedTopic.hadith.source}</span>
              </div>
              <p className="text-xs font-serif italic text-black dark:text-white leading-relaxed">
                “{selectedTopic.hadith.text}”
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: HIFZ MEMORIZATION & REVISION COACH */}
      {activeTab === 'hifz' && (
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-stone-200 dark:border-stone-800 space-y-2.5 shrink-0">
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black text-center">
                <div className="text-base font-extrabold font-mono">{hifzStats.mastered}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">Mastered</div>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-center">
                <div className="text-base font-extrabold font-mono">{hifzStats.review_due}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                  Review Due
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-center">
                <div className="text-base font-extrabold font-mono">{hifzStats.learning}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                  Learning
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={hifzSearch}
                  onChange={(e) => setHifzSearch(e.target.value)}
                  placeholder="Find Surah to track or test memory..."
                  className="w-full h-10 pl-8 pr-2.5 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {(['all', 'review_due', 'learning', 'mastered', 'new'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setHifzFilter(st)}
                  className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold border whitespace-nowrap ${
                    hifzFilter === st
                      ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                      : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800'
                  }`}
                >
                  {st === 'all' ? 'All 114' : HIFZ_STATUS_LABEL[st]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin">
            {filteredHifzSurahs.map((s) => {
              const rec = hifzMap[s.number];
              const status: HifzStatus = rec?.status || 'new';
              return (
                <div
                  key={s.number}
                  className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold font-cinzel truncate">
                        {s.number}. {s.nameEnglish}
                      </span>
                      <span className="text-[10px] text-stone-500 font-mono">({s.numberOfAyahs}v)</span>
                    </div>
                    <p className="text-[10.5px] text-stone-500 truncate">{s.englishTranslation}</p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleCycleHifzStatus(s.number, s.numberOfAyahs)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                        status === 'mastered'
                          ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                          : status === 'review_due'
                          ? 'bg-stone-200 dark:bg-stone-800 text-black dark:text-white border-black dark:border-white'
                          : 'bg-white dark:bg-stone-950 text-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-700'
                      }`}
                      title="Tap to cycle status: New → Learning → Review Due → Mastered"
                    >
                      {HIFZ_STATUS_LABEL[status]}
                    </button>

                    <button
                      onClick={() => onOpenAyahInReader(s.number, 1, { enableHifzMask: true })}
                      className="px-2.5 py-1.5 rounded-lg bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold flex items-center gap-1"
                      title="Open Surah with Hifz Memory Masking enabled"
                    >
                      <EyeOff className="w-3 h-3" />
                      <span>Test</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 7: JUMU'AH & HIJRI SACRED CALENDAR */}
      {activeTab === 'jumuah' && (
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3 scrollbar-thin">
          {/* Hijri & Gregorian Header Card */}
          <div className="p-4 rounded-3xl bg-black text-white dark:bg-white dark:text-black space-y-1.5 shadow-sm">
            <div className="flex items-center justify-between text-[10.5px] font-mono uppercase tracking-wider opacity-75">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Umm al-Qura Hijri Date</span>
              </span>
              <span>{hijriInfo.gregorianFormatted}</span>
            </div>
            <h2 className="text-xl font-bold font-cinzel">{hijriInfo.hijriFormatted}</h2>
            <p className="text-xs opacity-85">{hijriInfo.upcomingWhiteDaysNote}</p>

            {/* Sacred Day Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1.5">
              {hijriInfo.isFriday && (
                <span className="px-2.5 py-1 rounded-lg bg-white text-black dark:bg-black dark:text-white text-[10.5px] font-bold">
                  Jumu‘ah Mubarak
                </span>
              )}
              {hijriInfo.isWhiteDay && (
                <span className="px-2.5 py-1 rounded-lg bg-white text-black dark:bg-black dark:text-white text-[10.5px] font-bold">
                  White Day Sunnah Fast
                </span>
              )}
              {hijriInfo.isMondayOrThursday && (
                <span className="px-2.5 py-1 rounded-lg bg-white text-black dark:bg-black dark:text-white text-[10.5px] font-bold">
                  {hijriInfo.weekdayName} Sunnah Fast Day
                </span>
              )}
            </div>
          </div>

          {/* 1-Tap Surah Al-Kahf Launcher */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500">
                  Jumu‘ah Illumination · Surah 18
                </span>
                <h3 className="text-sm font-bold font-cinzel">Surah Al-Kahf</h3>
                <p className="text-[11px] text-stone-600 dark:text-stone-400">
                  “Whoever reads Surah Al-Kahf on Friday will have a light shining between the two Fridays.” — Sahih al-Jami‘
                </p>
              </div>
              <span className="font-quran text-2xl font-bold shrink-0">سُورَةُ الْكَهْفِ</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onOpenAyahInReader(18, 1)}
                className="min-h-[44px] rounded-xl border border-stone-300 dark:border-stone-700 font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Al-Kahf</span>
              </button>
              <button
                onClick={() => onPlayAyahInReciter(18, 1)}
                className="min-h-[44px] rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Headphones className="w-4 h-4" />
                <span>Listen Al-Kahf</span>
              </button>
            </div>
          </div>

          {/* Salawat Counter */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold font-cinzel">Daily & Jumu‘ah Salawat</h3>
                <p className="text-[11px] text-stone-500" dir="rtl">
                  اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ
                </p>
              </div>
              <button
                onClick={handleResetSalawat}
                className="p-2 rounded-lg border border-stone-300 dark:border-stone-700"
                title="Reset today's Salawat count"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleIncrementSalawat}
              className="w-full min-h-[48px] rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold text-xs px-4 flex items-center justify-between active:scale-[0.98] transition-all"
            >
              <span>Tap to Send Salawat Upon the Prophet ﷺ</span>
              <span className="font-mono text-base font-extrabold">{salawatCount}</span>
            </button>
          </div>

          {/* Jumuah Sunnah Checklist */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
            <h3 className="text-xs font-bold font-cinzel">Jumu‘ah Sunnah Etiquettes</h3>
            {[
              { id: 'ghusl', label: 'Perform Ghusl (Ritual Purification Bath)' },
              { id: 'kahf', label: 'Recite Surah Al-Kahf (Surah 18)' },
              { id: 'miswak', label: 'Miswak, Clean Garment & Fragrance' },
              { id: 'early', label: 'Arrive Early for Khutbah & Listen Attentively' },
              { id: 'asr_dua', label: 'Make Earnest Dua During the Last Hour Before Maghrib' },
            ].map((item) => {
              const checked = Boolean(jumuahChecklist[item.id]);
              return (
                <button
                  key={item.id}
                  onClick={() =>
                    setJumuahChecklist((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                  }
                  className="w-full min-h-[42px] px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-black flex items-center justify-between text-left text-xs font-medium"
                >
                  <span className={checked ? 'line-through opacity-60' : ''}>{item.label}</span>
                  <span
                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                      checked
                        ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                        : 'border-stone-400 dark:border-stone-600'
                    }`}
                  >
                    {checked && <Check className="w-3 h-3 stroke-[3]" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
