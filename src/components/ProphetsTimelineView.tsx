import React, { useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Compass,
  Headphones,
  MapPin,
  Milestone,
  ScrollText,
  Search,
  Settings,
  Shield,
  Swords,
  X,
} from 'lucide-react';
import { UserProfileData } from '../types/quran';
import {
  BattleBreakdown,
  ProphetEntry,
  SirahEra,
  SirahEvent,
  SirahEventCategory,
  TimelineHadith,
  TimelineRevelation,
} from '../types/timeline';
import { PROPHETS_CHRONOLOGY, SIRAH_ERA_META, SIRAH_EVENTS } from '../data/prophetsTimeline';

interface ProphetsTimelineViewProps {
  profile: UserProfileData;
  onBackToDashboard: () => void;
  onOpenSettings: () => void;
  onOpenAyahInReader: (surahNumber: number, ayahNumber: number) => void;
  onPlayAyahInReciter: (surahNumber: number, ayahNumber: number) => void;
}

type TimelineTab = 'sirah' | 'prophets' | 'wars';
type CategoryFilter = 'all' | SirahEventCategory;
type ProphetFilter = 'all' | 'with_hadith' | 'with_wars';

interface UnifiedWarItem {
  id: string;
  order: number;
  eraLabel: string;
  prophetLabel: string;
  title: string;
  where: string;
  summary: string;
  narrative: string;
  battleDetails: BattleBreakdown;
  revelations: TimelineRevelation[];
  hadiths: TimelineHadith[];
}

const ERA_ORDER: SirahEra[] = ['early_life', 'makkan_dawah', 'madinan_state', 'final_years'];

function getCategoryLabel(cat: SirahEventCategory): string {
  switch (cat) {
    case 'battle':
      return 'War & Defense';
    case 'revelation':
      return 'Revelation';
    case 'treaty_journey':
      return 'Treaty & Hijrah';
    case 'milestone':
    default:
      return 'Life Milestone';
  }
}

function renderCategoryIcon(cat: SirahEventCategory) {
  switch (cat) {
    case 'battle':
      return <Swords className="w-3.5 h-3.5" />;
    case 'revelation':
      return <BookOpen className="w-3.5 h-3.5" />;
    case 'treaty_journey':
      return <Compass className="w-3.5 h-3.5" />;
    case 'milestone':
    default:
      return <Milestone className="w-3.5 h-3.5" />;
  }
}

export const ProphetsTimelineView: React.FC<ProphetsTimelineViewProps> = ({
  onBackToDashboard,
  onOpenSettings,
  onOpenAyahInReader,
  onPlayAyahInReciter,
}) => {
  const [activeTab, setActiveTab] = useState<TimelineTab>('sirah');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [prophetFilter, setProphetFilter] = useState<ProphetFilter>('all');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedSirahId, setSelectedSirahId] = useState<string | null>(null);
  const [selectedProphetId, setSelectedProphetId] = useState<string | null>(null);
  const [selectedWarId, setSelectedWarId] = useState<string | null>(null);

  const eraRefs = useRef<Record<SirahEra, HTMLDivElement | null>>({
    early_life: null,
    makkan_dawah: null,
    madinan_state: null,
    final_years: null,
  });

  const normalizedQuery = searchQuery.trim().toLowerCase();

  // Build unified chronological list of ALL Important Wars (Previous Prophets + Sirah)
  const allImportantWars = useMemo<UnifiedWarItem[]>(() => {
    const prophetWars: UnifiedWarItem[] = [];
    let counter = 1;

    for (const p of PROPHETS_CHRONOLOGY) {
      if (p.order === 25) continue; // Muhammad ﷺ covered completely below
      for (const stage of p.lifeStages) {
        if (stage.warOrConfrontation) {
          prophetWars.push({
            id: `war-${p.id}-s${stage.stageNumber}`,
            order: counter++,
            eraLabel: p.eraAndLocation,
            prophetLabel: p.nameEnglish,
            title: stage.phaseTitle.replace(/^\d+\.\s*/, ''),
            where: stage.where,
            summary: stage.whatHappened,
            narrative: stage.howItUnfolded,
            battleDetails: stage.warOrConfrontation,
            revelations: stage.revelation ? [stage.revelation] : [],
            hadiths: stage.sahihHadith ? [stage.sahihHadith] : [],
          });
        }
      }
    }

    const sirahWars: UnifiedWarItem[] = SIRAH_EVENTS.filter((e) => e.battleDetails).map((ev) => ({
      id: `war-${ev.id}`,
      order: counter++,
      eraLabel: ev.yearLabel,
      prophetLabel: 'Muhammad ﷺ',
      title: ev.title,
      where: ev.where,
      summary: ev.whatSummary,
      narrative: ev.howNarrative,
      battleDetails: ev.battleDetails!,
      revelations: ev.revelations,
      hadiths: ev.hadiths || [],
    }));

    return [...prophetWars, ...sirahWars];
  }, []);

  const filteredSirahEvents = useMemo(() => {
    return SIRAH_EVENTS.filter((ev) => {
      if (categoryFilter !== 'all' && ev.category !== categoryFilter) return false;
      if (!normalizedQuery) return true;
      const haystack = [
        ev.title,
        ev.where,
        ev.yearLabel,
        ev.whatSummary,
        ev.howNarrative,
        ev.battleDetails?.cause || '',
        ev.battleDetails?.commanders || '',
        ev.battleDetails?.howItUnfolded || '',
        ...(ev.hadiths || []).map((h) => `${h.source} ${h.textEnglish}`),
        ...ev.revelations.map((r) => `${r.ayahRangeLabel} ${r.contextEnglish}`),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [categoryFilter, normalizedQuery]);

  const filteredProphets = useMemo(() => {
    return PROPHETS_CHRONOLOGY.filter((p) => {
      if (
        prophetFilter === 'with_hadith' &&
        p.sahihHadiths.length === 0 &&
        !p.lifeStages.some((s) => Boolean(s.sahihHadith))
      ) {
        return false;
      }
      if (prophetFilter === 'with_wars' && !p.lifeStages.some((s) => Boolean(s.warOrConfrontation))) {
        return false;
      }
      if (!normalizedQuery) return true;
      const haystack = [
        p.nameEnglish,
        p.title,
        p.lineageAndBirth,
        p.eraAndLocation,
        p.peopleAndRegion,
        p.scriptureOrMiracle,
        p.keyTrials,
        ...p.lifeStages.map(
          (s) =>
            `${s.phaseTitle} ${s.where} ${s.whatHappened} ${s.howItUnfolded} ${s.sahihHadith?.textEnglish || ''}`
        ),
        ...p.sahihHadiths.map((h) => `${h.source} ${h.textEnglish}`),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [prophetFilter, normalizedQuery]);

  const filteredWars = useMemo(() => {
    return allImportantWars.filter((w) => {
      if (!normalizedQuery) return true;
      const haystack = [
        w.title,
        w.prophetLabel,
        w.eraLabel,
        w.where,
        w.summary,
        w.narrative,
        w.battleDetails.cause,
        w.battleDetails.commanders || '',
        w.battleDetails.forces,
        w.battleDetails.howItUnfolded,
        w.battleDetails.outcomeAndLesson,
        ...w.hadiths.map((h) => `${h.source} ${h.textEnglish}`),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [allImportantWars, normalizedQuery]);

  const groupedSirahByEra = useMemo(() => {
    return ERA_ORDER.map((era) => ({
      era,
      meta: SIRAH_ERA_META[era],
      events: filteredSirahEvents.filter((ev) => ev.era === era),
    })).filter((g) => g.events.length > 0);
  }, [filteredSirahEvents]);

  const selectedSirahIndex = useMemo(
    () => (selectedSirahId ? filteredSirahEvents.findIndex((e) => e.id === selectedSirahId) : -1),
    [filteredSirahEvents, selectedSirahId]
  );
  const selectedSirahEvent: SirahEvent | null =
    selectedSirahIndex >= 0 ? filteredSirahEvents[selectedSirahIndex] : null;

  const selectedProphetIndex = useMemo(
    () => (selectedProphetId ? filteredProphets.findIndex((p) => p.id === selectedProphetId) : -1),
    [filteredProphets, selectedProphetId]
  );
  const selectedProphet: ProphetEntry | null =
    selectedProphetIndex >= 0 ? filteredProphets[selectedProphetIndex] : null;

  const selectedWarIndex = useMemo(
    () => (selectedWarId ? filteredWars.findIndex((w) => w.id === selectedWarId) : -1),
    [filteredWars, selectedWarId]
  );
  const selectedWar: UnifiedWarItem | null =
    selectedWarIndex >= 0 ? filteredWars[selectedWarIndex] : null;

  const scrollToEra = (era: SirahEra) => {
    const el = eraRefs.current[era];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderRevelationsBlock = (revelations: TimelineRevelation[]) => {
    if (revelations.length === 0) return null;
    return (
      <section className="space-y-2.5">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Linked Quran Revelations ({revelations.length})</span>
        </div>

        <div className="space-y-2.5">
          {revelations.map((rev, idx) => (
            <div
              key={`${rev.surahNumber}-${rev.ayahNumber}-${idx}`}
              className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 space-y-2.5"
            >
              <div>
                <p className="text-xs font-bold text-black dark:text-white">{rev.ayahRangeLabel}</p>
                <p className="text-xs text-stone-700 dark:text-stone-300 mt-1 leading-relaxed">
                  {rev.contextEnglish}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <button
                  onClick={() => onOpenAyahInReader(rev.surahNumber, rev.ayahNumber)}
                  className="min-h-[44px] px-3 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Ayah</span>
                </button>
                <button
                  onClick={() => onPlayAyahInReciter(rev.surahNumber, rev.ayahNumber)}
                  className="min-h-[44px] px-3 py-2 rounded-xl bg-white text-black dark:bg-black dark:text-white border border-black dark:border-white text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderHadithsList = (hadiths?: TimelineHadith[], heading = 'Sahih Hadith Evidence') => {
    if (!hadiths || hadiths.length === 0) return null;
    return (
      <section className="space-y-2.5">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
          <ScrollText className="w-3.5 h-3.5" />
          <span>
            {heading} ({hadiths.length})
          </span>
        </div>

        <div className="space-y-2.5">
          {hadiths.map((hadith, idx) => (
            <div
              key={`${hadith.source}-${idx}`}
              className="p-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black space-y-2"
            >
              <div className="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wider opacity-85">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Sahih Chain</span>
                </span>
                <span className="font-mono text-right">{hadith.source}</span>
              </div>

              <p className="text-xs leading-relaxed font-medium">“{hadith.textEnglish}”</p>
              <p className="text-[11px] opacity-80">— Narrated by {hadith.narrator}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderBattleCard = (battleDetails: BattleBreakdown) => (
    <section className="p-4 rounded-2xl border-2 border-black dark:border-white space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black dark:text-white">
        <Swords className="w-4 h-4" />
        <span>War &amp; Strategy Breakdown</span>
      </div>

      <div className="space-y-2.5 text-xs">
        <div>
          <span className="font-bold block text-stone-600 dark:text-stone-400">
            Cause &amp; Context
          </span>
          <p className="leading-relaxed mt-0.5">{battleDetails.cause}</p>
        </div>
        {battleDetails.commanders && (
          <div>
            <span className="font-bold block text-stone-600 dark:text-stone-400">
              Commanders
            </span>
            <p className="leading-relaxed mt-0.5">{battleDetails.commanders}</p>
          </div>
        )}
        <div>
          <span className="font-bold block text-stone-600 dark:text-stone-400">
            Forces Engaged
          </span>
          <p className="leading-relaxed mt-0.5">{battleDetails.forces}</p>
        </div>
        <div>
          <span className="font-bold block text-stone-600 dark:text-stone-400">
            Course &amp; Strategy of Fighting
          </span>
          <p className="leading-relaxed mt-0.5">{battleDetails.howItUnfolded}</p>
        </div>
        <div>
          <span className="font-bold block text-stone-600 dark:text-stone-400">
            Outcome &amp; Prophetic Lesson
          </span>
          <p className="leading-relaxed mt-0.5">{battleDetails.outcomeAndLesson}</p>
        </div>
      </div>
    </section>
  );

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-black text-black dark:text-white overflow-hidden select-none relative">
      {/* Top Sticky Monochrome Header */}
      <header className="px-4 pt-3.5 pb-2.5 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-black shrink-0 space-y-3 z-20">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={onBackToDashboard}
              className="min-w-[44px] min-h-[44px] rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center active:scale-95 transition-transform shrink-0"
              aria-label="Back to Dashboard"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
            <div className="min-w-0">
              <h1 className="font-cinzel font-bold text-sm text-black dark:text-white truncate leading-tight">
                Prophets &amp; Sirah Study
              </h1>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 truncate">
                English Only • 100% Offline • Sahih Hadiths
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                setShowSearch((prev) => !prev);
                if (showSearch) setSearchQuery('');
              }}
              className={`min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center transition-all active:scale-95 ${
                showSearch
                  ? 'bg-white text-black border border-black dark:bg-black dark:text-white dark:border-white'
                  : 'bg-black text-white dark:bg-white dark:text-black'
              }`}
              aria-label="Search timeline"
              title="Search prophets, wars, cities, Sahih Hadiths"
            >
              {showSearch ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            </button>
            <button
              onClick={onOpenSettings}
              className="min-w-[44px] min-h-[44px] rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center active:scale-95 transition-transform"
              aria-label="Settings"
              title="App Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Optional Compact Search Input */}
        {showSearch && (
          <div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prophet, war, stage, Bukhari, Muslim..."
              className="w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-black dark:text-white placeholder:text-stone-500 focus:outline-none focus:border-black dark:focus:border-white"
              autoFocus
            />
          </div>
        )}

        {/* Primary 3-Tab Mode Switcher */}
        <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <button
            onClick={() => setActiveTab('sirah')}
            className={`min-h-[44px] px-2 py-2 rounded-xl text-[11px] font-bold transition-all leading-tight ${
              activeTab === 'sirah'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                : 'text-stone-700 dark:text-stone-300'
            }`}
          >
            Sirah (570→632)
          </button>
          <button
            onClick={() => setActiveTab('prophets')}
            className={`min-h-[44px] px-2 py-2 rounded-xl text-[11px] font-bold transition-all leading-tight ${
              activeTab === 'prophets'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                : 'text-stone-700 dark:text-stone-300'
            }`}
          >
            25 Prophets
          </button>
          <button
            onClick={() => setActiveTab('wars')}
            className={`min-h-[44px] px-2 py-2 rounded-xl text-[11px] font-bold transition-all leading-tight ${
              activeTab === 'wars'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                : 'text-stone-700 dark:text-stone-300'
            }`}
          >
            Important Wars ({allImportantWars.length})
          </button>
        </div>

        {/* Sub-filters */}
        {activeTab === 'sirah' && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              {(
                [
                  { id: 'all', label: 'All Events' },
                  { id: 'milestone', label: 'Milestones' },
                  { id: 'revelation', label: 'Revelations' },
                  { id: 'battle', label: 'Wars & Expeditions' },
                  { id: 'treaty_journey', label: 'Treaties & Hijrah' },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCategoryFilter(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap border transition-all ${
                    categoryFilter === item.id
                      ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                      : 'bg-white text-black border-stone-300 dark:bg-black dark:text-white dark:border-stone-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {categoryFilter === 'all' && !normalizedQuery && (
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {ERA_ORDER.map((era, idx) => (
                  <button
                    key={era}
                    onClick={() => scrollToEra(era)}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-[10px] font-bold text-stone-700 dark:text-stone-300 whitespace-nowrap hover:border-black dark:hover:border-white transition-colors"
                  >
                    {idx + 1}. {SIRAH_ERA_META[era].span}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'prophets' && (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {(
              [
                { id: 'all', label: 'All 25 Prophets' },
                { id: 'with_hadith', label: 'With Sahih Hadiths' },
                { id: 'with_wars', label: 'With Major Wars' },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                onClick={() => setProphetFilter(item.id)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap border transition-all ${
                  prophetFilter === item.id
                    ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                    : 'bg-white text-black border-stone-300 dark:bg-black dark:text-white dark:border-stone-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Scrollable Vertical Timeline Feed */}
      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-6 pb-10">
        {activeTab === 'sirah' && (
          groupedSirahByEra.length === 0 ? (
            <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 text-center space-y-2">
              <p className="text-sm font-bold">No matching Sirah events found</p>
              <button
                onClick={() => {
                  setCategoryFilter('all');
                  setSearchQuery('');
                }}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            groupedSirahByEra.map((group) => (
              <section
                key={group.era}
                ref={(el) => {
                  eraRefs.current[group.era] = el as HTMLDivElement | null;
                }}
                className="space-y-3 scroll-mt-4"
              >
                {/* Era Header Card */}
                <div className="p-3.5 rounded-2xl bg-black text-white dark:bg-white dark:text-black space-y-1">
                  <div className="flex items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-wider opacity-80">
                    <span>{group.meta.span}</span>
                    <span>{group.events.length} Events</span>
                  </div>
                  <h2 className="font-cinzel font-bold text-sm leading-snug">{group.meta.label}</h2>
                  <p className="text-[11px] opacity-85 leading-relaxed">{group.meta.summary}</p>
                </div>

                {/* Vertical Timeline Rail */}
                <div className="relative ml-3.5 pl-6 border-l-2 border-stone-300 dark:border-stone-700 space-y-4">
                  {group.events.map((ev) => (
                    <div key={ev.id} className="relative">
                      <div className="absolute -left-[35px] top-4 w-7 h-7 rounded-full bg-black text-white dark:bg-white dark:text-black border-2 border-white dark:border-black flex items-center justify-center shadow-xs">
                        {renderCategoryIcon(ev.category)}
                      </div>

                      <button
                        onClick={() => setSelectedSirahId(ev.id)}
                        className="w-full text-left p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 hover:border-black dark:hover:border-white transition-all active:scale-[0.99] space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2 text-[11px]">
                          <span className="font-mono font-bold text-stone-700 dark:text-stone-300">
                            {ev.order}. {ev.yearLabel}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold">
                            {getCategoryLabel(ev.category)}
                          </span>
                        </div>

                        <h3 className="font-bold text-sm text-black dark:text-white leading-snug">
                          {ev.title}
                        </h3>

                        <p className="flex items-start gap-1.5 text-[11px] text-stone-600 dark:text-stone-400">
                          <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-black dark:text-white" />
                          <span>{ev.where}</span>
                        </p>

                        <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                          {ev.whatSummary}
                        </p>

                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {ev.battleDetails && (
                            <span className="px-2 py-0.5 rounded-md border border-stone-300 dark:border-stone-700 text-[10px] font-bold text-black dark:text-white">
                              War Strategy
                            </span>
                          )}
                          {ev.revelations.length > 0 && (
                            <span className="px-2 py-0.5 rounded-md border border-stone-300 dark:border-stone-700 text-[10px] font-bold text-black dark:text-white">
                              {ev.revelations[0].ayahRangeLabel}
                            </span>
                          )}
                          {ev.hadiths && ev.hadiths.length > 0 && (
                            <span className="px-2 py-0.5 rounded-md bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold">
                              {ev.hadiths.length} Sahih Hadith{ev.hadiths.length > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>

                        <div className="pt-1 flex items-center justify-between text-[11px] font-bold text-black dark:text-white">
                          <span>Study What, Where, How &amp; Sahih Hadiths</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            ))
          )
        )}

        {activeTab === 'prophets' && (
          filteredProphets.length === 0 ? (
            <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 text-center space-y-2">
              <p className="text-sm font-bold">No matching Prophets found</p>
              <button
                onClick={() => {
                  setProphetFilter('all');
                  setSearchQuery('');
                }}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold"
              >
                Show All 25 Prophets
              </button>
            </div>
          ) : (
            <section className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-black text-white dark:bg-white dark:text-black space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider opacity-80">
                  <span>Chronological Lineage</span>
                  <span>{filteredProphets.length} Prophets</span>
                </div>
                <h2 className="font-cinzel font-bold text-sm">
                  Every Prophet · Birth to Passing (Sahih Hadith Verified)
                </h2>
                <p className="text-[11px] opacity-85 leading-relaxed">
                  Tap any Prophet to study every chronological stage of their life, lineage, miracles, wars, Quranic revelations, and verified Sahih Hadiths.
                </p>
              </div>

              <div className="relative ml-3.5 pl-6 border-l-2 border-stone-300 dark:border-stone-700 space-y-4">
                {filteredProphets.map((p) => {
                  const stageHadithCount = p.lifeStages.filter((s) => Boolean(s.sahihHadith)).length;
                  const totalHadiths = Math.max(stageHadithCount, p.sahihHadiths.length);
                  return (
                    <div key={p.id} className="relative">
                      <div className="absolute -left-[35px] top-4 w-7 h-7 rounded-full bg-black text-white dark:bg-white dark:text-black border-2 border-white dark:border-black flex items-center justify-center text-[11px] font-bold shadow-xs">
                        {p.order}
                      </div>

                      <button
                        onClick={() => setSelectedProphetId(p.id)}
                        className="w-full text-left p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 hover:border-black dark:hover:border-white transition-all active:scale-[0.99] space-y-2"
                      >
                        <div>
                          <h3 className="font-bold text-sm text-black dark:text-white leading-tight">
                            {p.nameEnglish}
                          </h3>
                          <p className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 mt-0.5">
                            {p.title}
                          </p>
                        </div>

                        <p className="flex items-start gap-1.5 text-[11px] text-stone-600 dark:text-stone-400">
                          <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-black dark:text-white" />
                          <span>{p.eraAndLocation}</span>
                        </p>

                        <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed line-clamp-3">
                          {p.lifeStages[0]?.whatHappened || p.keyTrials}
                        </p>

                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="px-2 py-0.5 rounded-md border border-stone-300 dark:border-stone-700 text-[10px] font-bold text-black dark:text-white">
                            {p.lifeStages.length} Life Stage{p.lifeStages.length > 1 ? 's' : ''}
                          </span>
                          {p.lifeStages.some((s) => Boolean(s.warOrConfrontation)) && (
                            <span className="px-2 py-0.5 rounded-md border border-stone-300 dark:border-stone-700 text-[10px] font-bold text-black dark:text-white">
                              War History
                            </span>
                          )}
                          {totalHadiths > 0 && (
                            <span className="px-2 py-0.5 rounded-md bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold">
                              Sahih Hadith Verified
                            </span>
                          )}
                        </div>

                        <div className="pt-1 flex items-center justify-between text-[11px] font-bold text-black dark:text-white">
                          <span>Open Complete Life-Stage Timeline</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          )
        )}

        {activeTab === 'wars' && (
          filteredWars.length === 0 ? (
            <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 text-center space-y-2">
              <p className="text-sm font-bold">No matching Wars found</p>
              <button
                onClick={() => setSearchQuery('')}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold"
              >
                Show All Important Wars
              </button>
            </div>
          ) : (
            <section className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-black text-white dark:bg-white dark:text-black space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider opacity-80">
                  <span>Chronological Warfare Study</span>
                  <span>{filteredWars.length} Campaigns</span>
                </div>
                <h2 className="font-cinzel font-bold text-sm">
                  Every Important War &amp; Defense Campaign
                </h2>
                <p className="text-[11px] opacity-85 leading-relaxed">
                  From Musa’s Exodus deliverance and Dawud vs. Jalut through every defensive battle and bloodless victory of Prophet Muhammad ﷺ (Badr, Uhud, Khandaq, Khaybar, Mu’tah, Makkah, Hunayn &amp; Tabuk).
                </p>
              </div>

              <div className="relative ml-3.5 pl-6 border-l-2 border-stone-300 dark:border-stone-700 space-y-4">
                {filteredWars.map((w) => (
                  <div key={w.id} className="relative">
                    <div className="absolute -left-[35px] top-4 w-7 h-7 rounded-full bg-black text-white dark:bg-white dark:text-black border-2 border-white dark:border-black flex items-center justify-center shadow-xs">
                      <Swords className="w-3.5 h-3.5" />
                    </div>

                    <button
                      onClick={() => setSelectedWarId(w.id)}
                      className="w-full text-left p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 hover:border-black dark:hover:border-white transition-all active:scale-[0.99] space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2 text-[11px]">
                        <span className="font-mono font-bold text-stone-700 dark:text-stone-300">
                          {w.order}. {w.eraLabel}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold">
                          {w.prophetLabel}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-black dark:text-white leading-snug">
                        {w.title}
                      </h3>

                      <p className="flex items-start gap-1.5 text-[11px] text-stone-600 dark:text-stone-400">
                        <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-black dark:text-white" />
                        <span>{w.where}</span>
                      </p>

                      <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed line-clamp-3">
                        {w.summary}
                      </p>

                      <div className="pt-1 flex items-center justify-between text-[11px] font-bold text-black dark:text-white">
                        <span>Inspect Commanders, Forces, Tactics &amp; Outcome</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )
        )}
      </main>

      {/* 1. Deep Study Sheet for Selected Sirah Event */}
      {selectedSirahEvent && (
        <div className="absolute inset-0 z-40 bg-white dark:bg-black flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-2 shrink-0">
            <button
              onClick={() => setSelectedSirahId(null)}
              className="min-h-[44px] px-3 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Timeline</span>
            </button>

            <span className="text-[11px] font-mono font-bold text-stone-600 dark:text-stone-400">
              Event {selectedSirahIndex + 1} / {filteredSirahEvents.length}
            </span>

            <button
              onClick={() => setSelectedSirahId(null)}
              className="min-w-[44px] min-h-[44px] rounded-xl border border-stone-300 dark:border-stone-700 flex items-center justify-center active:scale-95 transition-transform"
              aria-label="Close detail"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="px-2.5 py-1 rounded-lg bg-black text-white dark:bg-white dark:text-black font-bold">
                  {getCategoryLabel(selectedSirahEvent.category)}
                </span>
                <span className="font-mono font-bold text-stone-700 dark:text-stone-300">
                  {selectedSirahEvent.yearLabel}
                </span>
              </div>

              <h2 className="font-cinzel font-bold text-lg text-black dark:text-white leading-snug">
                {selectedSirahEvent.title}
              </h2>
            </div>

            <section className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-black dark:text-white" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                  Where It Took Place
                </span>
                <p className="text-xs font-semibold text-black dark:text-white mt-0.5">
                  {selectedSirahEvent.where}
                </p>
              </div>
            </section>

            <section className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                What Happened
              </span>
              <p className="text-xs leading-relaxed text-black dark:text-white">
                {selectedSirahEvent.whatSummary}
              </p>
            </section>

            <section className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                How It Unfolded
              </span>
              <p className="text-xs leading-relaxed text-black dark:text-white">
                {selectedSirahEvent.howNarrative}
              </p>
            </section>

            {selectedSirahEvent.battleDetails && renderBattleCard(selectedSirahEvent.battleDetails)}
            {renderRevelationsBlock(selectedSirahEvent.revelations)}
            {renderHadithsList(selectedSirahEvent.hadiths, 'Authentic Sahih Hadiths')}
          </div>

          <div className="px-4 py-3 border-t border-stone-200 dark:border-stone-800 grid grid-cols-2 gap-2 shrink-0 bg-white dark:bg-black">
            <button
              disabled={selectedSirahIndex <= 0}
              onClick={() => {
                if (selectedSirahIndex > 0) {
                  setSelectedSirahId(filteredSirahEvents[selectedSirahIndex - 1].id);
                }
              }}
              className="min-h-[44px] px-3 py-2 rounded-xl border border-black dark:border-white text-xs font-bold flex items-center justify-center gap-1 disabled:opacity-35"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Event</span>
            </button>
            <button
              disabled={selectedSirahIndex >= filteredSirahEvents.length - 1}
              onClick={() => {
                if (selectedSirahIndex < filteredSirahEvents.length - 1) {
                  setSelectedSirahId(filteredSirahEvents[selectedSirahIndex + 1].id);
                }
              }}
              className="min-h-[44px] px-3 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold flex items-center justify-center gap-1 disabled:opacity-35"
            >
              <span>Next Event</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Deep Full-Biography & Life-Stage Study Sheet for Selected Prophet */}
      {selectedProphet && (
        <div className="absolute inset-0 z-40 bg-white dark:bg-black flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-2 shrink-0">
            <button
              onClick={() => setSelectedProphetId(null)}
              className="min-h-[44px] px-3 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All 25</span>
            </button>

            <span className="text-[11px] font-mono font-bold text-stone-600 dark:text-stone-400">
              Prophet {selectedProphet.order} / 25
            </span>

            <button
              onClick={() => setSelectedProphetId(null)}
              className="min-w-[44px] min-h-[44px] rounded-xl border border-stone-300 dark:border-stone-700 flex items-center justify-center active:scale-95 transition-transform"
              aria-label="Close detail"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
            <div>
              <h2 className="font-cinzel font-bold text-xl text-black dark:text-white">
                {selectedProphet.nameEnglish}
              </h2>
              <p className="text-xs font-semibold text-stone-600 dark:text-stone-400 mt-0.5">
                {selectedProphet.title}
              </p>
            </div>

            {/* Complete Overview Matrix */}
            <div className="grid grid-cols-1 gap-2">
              <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                  Lineage &amp; Birth
                </span>
                <p className="text-xs font-medium mt-0.5 leading-relaxed">
                  {selectedProphet.lineageAndBirth}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                  Era, Location &amp; Nation
                </span>
                <p className="text-xs font-medium mt-0.5 leading-relaxed">
                  {selectedProphet.eraAndLocation} — {selectedProphet.peopleAndRegion}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                  Scripture &amp; Miracles
                </span>
                <p className="text-xs font-medium mt-0.5 leading-relaxed">
                  {selectedProphet.scriptureOrMiracle}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                  Mission Span, Passing &amp; Heritage
                </span>
                <p className="text-xs font-medium mt-0.5 leading-relaxed">
                  {selectedProphet.missionSpanOrAge} · {selectedProphet.passingAndBurialTradition}
                </p>
              </div>
            </div>

            {/* Stage-by-Stage Vertical Life Timeline */}
            <section className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                <span>Chronological Life Stages</span>
                <span>{selectedProphet.lifeStages.length} Parts</span>
              </div>

              <div className="relative ml-3 pl-5 border-l-2 border-stone-300 dark:border-stone-700 space-y-4">
                {selectedProphet.lifeStages.map((stage) => (
                  <div key={stage.stageNumber} className="relative">
                    <div className="absolute -left-[30px] top-3 w-5 h-5 rounded-full bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold flex items-center justify-center border border-white dark:border-black">
                      {stage.stageNumber}
                    </div>

                    <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 space-y-3">
                      <div>
                        <h3 className="font-bold text-sm text-black dark:text-white leading-snug">
                          {stage.phaseTitle}
                        </h3>
                        <p className="flex items-center gap-1 text-[11px] text-stone-600 dark:text-stone-400 mt-1">
                          <MapPin className="w-3 h-3 shrink-0 text-black dark:text-white" />
                          <span>{stage.where}</span>
                        </p>
                      </div>

                      <div className="space-y-1.5 text-xs leading-relaxed">
                        <p className="text-black dark:text-white">{stage.whatHappened}</p>
                        <p className="text-stone-700 dark:text-stone-300 pt-1 border-t border-stone-200 dark:border-stone-800">
                          {stage.howItUnfolded}
                        </p>
                      </div>

                      {stage.warOrConfrontation && renderBattleCard(stage.warOrConfrontation)}

                      {stage.revelation && (
                        <div className="p-3 rounded-xl bg-white dark:bg-black border border-stone-300 dark:border-stone-700 space-y-2">
                          <div>
                            <p className="text-[11px] font-bold text-black dark:text-white">
                              {stage.revelation.ayahRangeLabel}
                            </p>
                            <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">
                              {stage.revelation.contextEnglish}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() =>
                                onOpenAyahInReader(
                                  stage.revelation!.surahNumber,
                                  stage.revelation!.ayahNumber
                                )
                              }
                              className="min-h-[44px] px-2.5 py-1.5 rounded-xl bg-black text-white dark:bg-white dark:text-black text-[11px] font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Read Ayah</span>
                            </button>
                            <button
                              onClick={() =>
                                onPlayAyahInReciter(
                                  stage.revelation!.surahNumber,
                                  stage.revelation!.ayahNumber
                                )
                              }
                              className="min-h-[44px] px-2.5 py-1.5 rounded-xl border border-black dark:border-white text-[11px] font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform"
                            >
                              <Headphones className="w-3.5 h-3.5" />
                              <span>Listen</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {stage.sahihHadith && (
                        <div className="p-3.5 rounded-xl bg-black text-white dark:bg-white dark:text-black space-y-1.5">
                          <div className="flex items-center justify-between gap-2 text-[10px] font-mono font-bold uppercase opacity-80">
                            <span>Sahih Hadith Proof</span>
                            <span>{stage.sahihHadith.source}</span>
                          </div>
                          <p className="text-xs leading-relaxed">
                            “{stage.sahihHadith.textEnglish}”
                          </p>
                          <p className="text-[10px] opacity-80">
                            — Narrated by {stage.sahihHadith.narrator}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Trials Summary */}
            <section className="p-3.5 rounded-2xl border border-stone-300 dark:border-stone-700 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                Key Trials &amp; Steadfastness
              </span>
              <p className="text-xs leading-relaxed">{selectedProphet.keyTrials}</p>
            </section>

            {renderRevelationsBlock(selectedProphet.revelations)}
            {renderHadithsList(selectedProphet.sahihHadiths, 'Key Sahih Hadiths Summary')}
          </div>

          <div className="px-4 py-3 border-t border-stone-200 dark:border-stone-800 grid grid-cols-2 gap-2 shrink-0 bg-white dark:bg-black">
            <button
              disabled={selectedProphetIndex <= 0}
              onClick={() => {
                if (selectedProphetIndex > 0) {
                  setSelectedProphetId(filteredProphets[selectedProphetIndex - 1].id);
                }
              }}
              className="min-h-[44px] px-3 py-2 rounded-xl border border-black dark:border-white text-xs font-bold flex items-center justify-center gap-1 disabled:opacity-35"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Prophet</span>
            </button>
            <button
              disabled={selectedProphetIndex >= filteredProphets.length - 1}
              onClick={() => {
                if (selectedProphetIndex < filteredProphets.length - 1) {
                  setSelectedProphetId(filteredProphets[selectedProphetIndex + 1].id);
                }
              }}
              className="min-h-[44px] px-3 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold flex items-center justify-center gap-1 disabled:opacity-35"
            >
              <span>Next Prophet</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Deep War Study Sheet */}
      {selectedWar && (
        <div className="absolute inset-0 z-40 bg-white dark:bg-black flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-2 shrink-0">
            <button
              onClick={() => setSelectedWarId(null)}
              className="min-h-[44px] px-3 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Wars</span>
            </button>

            <span className="text-[11px] font-mono font-bold text-stone-600 dark:text-stone-400">
              War {selectedWarIndex + 1} / {filteredWars.length}
            </span>

            <button
              onClick={() => setSelectedWarId(null)}
              className="min-w-[44px] min-h-[44px] rounded-xl border border-stone-300 dark:border-stone-700 flex items-center justify-center active:scale-95 transition-transform"
              aria-label="Close war detail"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="px-2.5 py-1 rounded-lg bg-black text-white dark:bg-white dark:text-black font-bold">
                  {selectedWar.prophetLabel}
                </span>
                <span className="font-mono font-bold text-stone-700 dark:text-stone-300">
                  {selectedWar.eraLabel}
                </span>
              </div>

              <h2 className="font-cinzel font-bold text-lg text-black dark:text-white leading-snug">
                {selectedWar.title}
              </h2>
            </div>

            <section className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-black dark:text-white" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                  Location
                </span>
                <p className="text-xs font-semibold text-black dark:text-white mt-0.5">
                  {selectedWar.where}
                </p>
              </div>
            </section>

            <section className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                Strategic Summary &amp; Course
              </span>
              <p className="text-xs leading-relaxed text-black dark:text-white">
                {selectedWar.summary}
              </p>
              <p className="text-xs leading-relaxed text-stone-700 dark:text-stone-300 pt-2 border-t border-stone-200 dark:border-stone-800">
                {selectedWar.narrative}
              </p>
            </section>

            {renderBattleCard(selectedWar.battleDetails)}
            {renderRevelationsBlock(selectedWar.revelations)}
            {renderHadithsList(selectedWar.hadiths, 'Sahih Hadith Records of This War')}
          </div>

          <div className="px-4 py-3 border-t border-stone-200 dark:border-stone-800 grid grid-cols-2 gap-2 shrink-0 bg-white dark:bg-black">
            <button
              disabled={selectedWarIndex <= 0}
              onClick={() => {
                if (selectedWarIndex > 0) {
                  setSelectedWarId(filteredWars[selectedWarIndex - 1].id);
                }
              }}
              className="min-h-[44px] px-3 py-2 rounded-xl border border-black dark:border-white text-xs font-bold flex items-center justify-center gap-1 disabled:opacity-35"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous War</span>
            </button>
            <button
              disabled={selectedWarIndex >= filteredWars.length - 1}
              onClick={() => {
                if (selectedWarIndex < filteredWars.length - 1) {
                  setSelectedWarId(filteredWars[selectedWarIndex + 1].id);
                }
              }}
              className="min-h-[44px] px-3 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold flex items-center justify-center gap-1 disabled:opacity-35"
            >
              <span>Next War</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
