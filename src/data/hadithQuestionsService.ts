import {
  HADITH_CURRICULUM,
  HADITH_TOPICS,
  HadithLessonItem,
  HadithTopicId,
  getLessonsForTopic,
  searchCurriculumLessons,
} from './hadithCurriculum';

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
  memoryHook?: string;
  corePhraseArabic?: string;
  corePhraseEnglish?: string;
}

export function getAllHadithQuestions(): HadithQuestionRecord[] {
  return HADITH_CURRICULUM.map((l) => ({
    id: l.id,
    globalIndex: l.globalNumber,
    chapterTopicId: l.topicId,
    chapterNumber: l.chapterNumber,
    subTopicTitle: l.lessonTitle,
    category: l.topicTitle,
    question: l.question,
    textArabic: l.textArabic,
    textEnglish: l.textEnglish,
    narrator: l.narrator,
    reference: l.reference,
    book: l.book,
    grade: l.grade,
    keyLesson: l.keyLesson,
    memoryHook: l.memoryHook,
    corePhraseArabic: l.corePhraseArabic,
    corePhraseEnglish: l.corePhraseEnglish,
  }));
}

export function getQuestionsByChapterId(chapterId: string): HadithLessonItem[] {
  const byTopic = getLessonsForTopic(chapterId as HadithTopicId);
  if (byTopic.length > 0) return byTopic;
  return HADITH_CURRICULUM;
}

export function getTotalHadithQuestionsCount(): number {
  return HADITH_CURRICULUM.length;
}

export function searchHadithQuestionsOffline(query: string): HadithLessonItem[] {
  return searchCurriculumLessons(query);
}

export { HADITH_TOPICS, HADITH_CURRICULUM };
