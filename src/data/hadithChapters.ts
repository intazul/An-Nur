import { HadithChapterTopic } from '../types/hadith';
import { HADITH_CURRICULUM, HADITH_TOPICS } from './hadithCurriculum';

export const HADITH_TOPIC_CATEGORIES = [
  'All Topics',
  ...HADITH_TOPICS.map((t) => t.titleEnglish),
] as const;

export const HADITH_CHAPTER_TOPICS: HadithChapterTopic[] = HADITH_TOPICS.map((topic) => {
  const topicLessons = HADITH_CURRICULUM.filter((l) => l.topicId === topic.id);
  return {
    id: topic.id,
    number: topic.chapterNumber,
    nameEnglish: topic.titleEnglish,
    nameArabic: topic.titleArabic,
    category: topic.titleEnglish,
    description: topic.description,
    primaryQuestion: topicLessons[0]?.question || topic.subtitle,
    defaultHadithCount: topicLessons.length,
  };
});
