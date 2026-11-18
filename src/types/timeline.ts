export type SirahEra = 'early_life' | 'makkan_dawah' | 'madinan_state' | 'final_years';

export type SirahEventCategory = 'milestone' | 'revelation' | 'battle' | 'treaty_journey';

export interface TimelineRevelation {
  surahNumber: number;
  ayahNumber: number;
  ayahRangeLabel: string; // e.g., "Surah Al-'Alaq 96:1–5"
  contextEnglish: string;
}

export interface BattleBreakdown {
  cause: string;
  forces: string;
  commanders?: string;
  howItUnfolded: string;
  outcomeAndLesson: string;
}

export interface TimelineHadith {
  source: string; // Strictly Sahih collections e.g. "Sahih al-Bukhari 3326", "Sahih Muslim 1763"
  narrator: string;
  textEnglish: string;
}

export interface SahihExclusiveDetail {
  title: string;
  topicTag: string; // e.g., "Beyond Quran · Miracle", "Physical Appearance", "Al-Isra wal-Mi'raj", "Hereafter"
  detail: string;
  source: string;
  narrator: string;
}

export interface ProphetLifeStage {
  stageNumber: number;
  phaseTitle: string; // e.g., "Creation in Paradise", "Test & Descent to Earth", "Final Days & Passing"
  where: string;
  whatHappened: string;
  howItUnfolded: string;
  warOrConfrontation?: BattleBreakdown;
  revelation?: TimelineRevelation;
  sahihHadith?: TimelineHadith;
}

export interface SirahEvent {
  id: string;
  order: number;
  era: SirahEra;
  category: SirahEventCategory;
  yearLabel: string; // e.g., "570 CE" or "2 AH · 624 CE"
  title: string;
  where: string;
  whatSummary: string;
  howNarrative: string;
  battleDetails?: BattleBreakdown;
  revelations: TimelineRevelation[];
  hadiths?: TimelineHadith[];
}

export interface ProphetEntry {
  id: string;
  order: number;
  nameEnglish: string;
  title: string;
  isHadithOnlyProphet?: boolean; // True for Prophets/narrations not explicitly named among the 25 in the Quran
  lineageAndBirth: string;
  eraAndLocation: string;
  peopleAndRegion: string;
  missionSpanOrAge: string;
  scriptureOrMiracle: string;
  passingAndBurialTradition: string;
  physicalAppearance?: string;
  keyTrials: string;
  hadithExclusiveFacts?: SahihExclusiveDetail[];
  lifeStages: ProphetLifeStage[];
  revelations: TimelineRevelation[];
  sahihHadiths: TimelineHadith[];
}
