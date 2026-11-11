import hadithData from './hadithQuestionsDatabase.json';
import { HADITH_CHAPTER_TOPICS, HADITH_TOPIC_CATEGORIES } from './hadithChapters';

export interface HadithQuestionRecord {
  id: string;
  globalIndex: number;
  chapterTopicId: string;
  chapterNumber: number;
  subTopicTitle: string;
  category: string;
  question: string;
  textArabic: string;
  textEnglish: string;
  narrator: string;
  reference: string;
  book: string;
  grade: string;
  keyLesson: string;
}

export interface BroaderTopicStat {
  category: string;
  arabicName: string;
  icon: string;
  subTopicCount: number;
  questionCount: number;
}

export interface SubTopicStat {
  id: string;
  number: number;
  nameEnglish: string;
  nameArabic: string;
  category: string;
  description: string;
  primaryQuestion: string;
  questionCount: number;
}

// Typed questions list loaded statically offline
export const ALL_HADITH_QUESTIONS: HadithQuestionRecord[] = hadithData as HadithQuestionRecord[];

// Category Arabic names and visual iconography for beautiful categorisation
export const CATEGORY_METADATA: Record<string, { arabic: string; icon: string; description: string }> = {
  'Faith & Creed': {
    arabic: 'الإيمان والعقيدة',
    icon: '✨',
    description: 'Foundations of belief, Tawheed, sincere intentions, and divine decree.',
  },
  'Purity & Prayer': {
    arabic: 'الطهارة والصلاة',
    icon: '💧',
    description: 'Ablution, taharah, the 5 daily prayers, night vigil, and congregational devotion.',
  },
  'Charity & Fasting': {
    arabic: 'الزكاة والصيام',
    icon: '🌙',
    description: 'Purification of wealth, voluntary charity, Ramadan fasting, and spiritual self-restraint.',
  },
  'Hajj & Pilgrimage': {
    arabic: 'الحج والزيارة',
    icon: '🕋',
    description: 'Rites of Makkah, holy sanctuary, sacrifice, and the journey of a lifetime.',
  },
  'Family & Marriage': {
    arabic: 'الأسرة والتربية',
    icon: '🏡',
    description: 'Sacred marital bonds, honoring parents, rights of children, and domestic peace.',
  },
  'Ethics & Character': {
    arabic: 'الأخلاق والآداب',
    icon: '🌸',
    description: 'Truthfulness, humility, guarding the tongue, anger management, and noble character.',
  },
  'Business & Wealth': {
    arabic: 'المعاملات والتجارة',
    icon: '⚖️',
    description: 'Honest trade, fair contracts, prohibition of usury, and clean ethical earnings.',
  },
  'Remembrance & Dua': {
    arabic: 'الذكر والدعاء',
    icon: '📿',
    description: 'Morning and evening adhkar, intimate supplications, and peaceful remembrance of Allah.',
  },
  'Heart & Hereafter': {
    arabic: 'الرقائق والآخرة',
    icon: '🕊️',
    description: 'Purifying spiritual sickness, contemplation of death, Day of Judgment, and Paradise.',
  },
  'Trials & Sunnah': {
    arabic: 'الفتن والاعتصام بالسنة',
    icon: '🛡️',
    description: 'Preserving prophetic traditions, overcoming tribulation, and communal unity.',
  },
};

// Fast index map by chapterTopicId and category counts in a single pass
const CHAPTER_INDEX: Record<string, HadithQuestionRecord[]> = {};
const CATEGORY_COUNTS: Record<string, number> = {};

ALL_HADITH_QUESTIONS.forEach((q) => {
  if (!CHAPTER_INDEX[q.chapterTopicId]) {
    CHAPTER_INDEX[q.chapterTopicId] = [];
  }
  CHAPTER_INDEX[q.chapterTopicId].push(q);
  CATEGORY_COUNTS[q.category] = (CATEGORY_COUNTS[q.category] || 0) + 1;
});

/**
 * Returns all 10,000+ questions
 */
export function getAllHadithQuestions(): HadithQuestionRecord[] {
  return ALL_HADITH_QUESTIONS;
}

/**
 * Total count of offline questions (10,200+)
 */
export function getTotalHadithQuestionsCount(): number {
  return ALL_HADITH_QUESTIONS.length;
}

/**
 * Returns questions for a specific chapter/sub-topic
 */
export function getQuestionsByChapterId(chapterId: string): HadithQuestionRecord[] {
  return CHAPTER_INDEX[chapterId] || [];
}

/**
 * Returns all broader categories with counts (pre-computed O(1))
 */
export function getBroaderCategoriesWithStats(): BroaderTopicStat[] {
  const activeCategories = HADITH_TOPIC_CATEGORIES.filter((c) => c !== 'All Topics');
  return activeCategories.map((cat) => {
    const subTopics = HADITH_CHAPTER_TOPICS.filter((c) => c.category === cat);
    const questionsCount = CATEGORY_COUNTS[cat] || 0;
    const meta = CATEGORY_METADATA[cat] || { arabic: 'أحاديث نبوية', icon: '📖', description: '' };
    return {
      category: cat,
      arabicName: meta.arabic,
      icon: meta.icon,
      subTopicCount: subTopics.length,
      questionCount: questionsCount,
    };
  });
}

/**
 * Returns sub-topics filtered by category with question counts
 */
export function getSubTopicsWithStats(category: string = 'All Topics'): SubTopicStat[] {
  const filtered =
    category === 'All Topics'
      ? HADITH_CHAPTER_TOPICS
      : HADITH_CHAPTER_TOPICS.filter((c) => c.category === category);

  return filtered.map((ch) => {
    const qCount = CHAPTER_INDEX[ch.id]?.length || 0;
    return {
      id: ch.id,
      number: ch.number,
      nameEnglish: ch.nameEnglish,
      nameArabic: ch.nameArabic,
      category: ch.category,
      description: ch.description,
      primaryQuestion: ch.primaryQuestion,
      questionCount: qCount,
    };
  });
}

/**
 * Instant search across all 10,000+ questions and sub-topics offline with early break
 */
export function searchHadithQuestionsOffline(query: string): HadithQuestionRecord[] {
  if (!query.trim() || query.trim().length < 2) return [];
  const q = query.toLowerCase().trim();
  const results: HadithQuestionRecord[] = [];

  for (let i = 0; i < ALL_HADITH_QUESTIONS.length; i++) {
    const item = ALL_HADITH_QUESTIONS[i];
    if (
      item.question.toLowerCase().includes(q) ||
      item.subTopicTitle.toLowerCase().includes(q) ||
      item.textEnglish.toLowerCase().includes(q) ||
      item.narrator.toLowerCase().includes(q) ||
      item.reference.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.textArabic.includes(q)
    ) {
      results.push(item);
      if (results.length >= 50) break;
    }
  }

  return results;
}
