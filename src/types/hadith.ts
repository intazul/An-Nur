export interface HadithBook {
  id: string;
  nameEnglish: string;
  nameArabic: string;
  authorEnglish: string;
  authorArabic: string;
  description: string;
  totalHadiths: number;
  authenticity: 'Sahih (Highest Authenticity)' | 'Agreed Upon (Muttafaq Alayh)' | 'Canonical Sahih';
  coverGradient: string;
  accentColor: string;
  themeTitle: string;
}

export interface HadithChapterTopic {
  id: string;
  number: number;
  nameEnglish: string;
  nameArabic: string;
  category: string;
  description: string;
  primaryQuestion: string;
  defaultHadithCount: number;
  sources: {
    book: 'bukhari' | 'muslim' | 'tirmidhi' | 'nawawi' | 'abudawud';
    bookName: string;
    sectionId?: number;
    hadithRange?: [number, number];
  }[];
}

export interface SahihHadithItem {
  id: string;
  collectionId: string;
  collectionName: string;
  hadithNumber: number;
  reference: string; // e.g. "Sahih al-Bukhari 1"
  bookName: string; // e.g. "Book of Revelation"
  chapterName: string; // e.g. "How the Divine Revelation started"
  chapterTopicId?: string; // Links to HadithChapterTopic.id
  grade: string; // e.g. "Sahih (Muttafaq 'Alayh)"
  narrator: string; // e.g. "Umar ibn al-Khattab (RA)"
  narratorArabic: string; // e.g. "عمر بن الخطاب رضي الله عنه"
  isnadBrief: string; // Chain summary
  question: string; // Journey question: "How can an unseen thought determine the ultimate worth of every action?"
  textArabic: string; // Dark, clean Arabic calligraphy without glow
  textEnglish: string; // Classical literary English
  category: string;
  categoryLabel: string;
  keyLesson: string; // Practical everyday takeaway
}

export type HadithViewLayout = 'cards' | 'grid' | 'list';
