import { SahihHadithItem } from '../types/hadith';
import { ALL_SAHIH_HADITHS } from '../data/sahihHadiths';

const CACHE_STORAGE_KEY = 'annur_hadiths_offline_store_v3';

// In-memory cache for speed
const memoryCache = new Map<string, SahihHadithItem>();

// Initialize memory cache from localStorage if available
try {
  const stored = localStorage.getItem(CACHE_STORAGE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored) as SahihHadithItem[];
    if (Array.isArray(parsed)) {
      parsed.forEach((h) => memoryCache.set(`${h.collectionId}_${h.hadithNumber}`, h));
    }
  }
} catch {
  // Ignore local storage error
}

// Also populate memory cache with pre-bundled hadiths
ALL_SAHIH_HADITHS.forEach((h) => {
  memoryCache.set(`${h.collectionId}_${h.hadithNumber}`, h);
});

function persistCache() {
  try {
    const list = Array.from(memoryCache.values());
    // Keep max 1500 items in localStorage to stay well below quotas
    const toStore = list.slice(0, 1500);
    localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(toStore));
  } catch {
    // Storage quota or disabled, ignore safely
  }
}

export type SupportedCanonicalBook = 'bukhari' | 'muslim' | 'tirmidhi' | 'abudawud';

export const BOOK_METADATA: Record<SupportedCanonicalBook, { name: string; total: number; defaultPrefix: string }> = {
  bukhari: { name: 'Sahih al-Bukhari', total: 7563, defaultPrefix: 'Bukhari' },
  muslim: { name: 'Sahih Muslim', total: 7563, defaultPrefix: 'Muslim' },
  tirmidhi: { name: 'Jami` at-Tirmidhi', total: 3956, defaultPrefix: 'Tirmidhi' },
  abudawud: { name: 'Sunan Abi Dawud', total: 5274, defaultPrefix: 'Abu Dawud' },
};

/**
 * Generate a reflective Journey question for any Hadith text if not already defined
 */
export function generateQuestionForHadith(englishText: string, sectionName: string): string {
  const lower = englishText.toLowerCase();

  if (lower.includes('intention') || lower.includes('deeds depend upon')) {
    return 'How can an unseen inner intention dictate the eternal worth of every deed?';
  }
  if (lower.includes('fast') || lower.includes('ramadan') || lower.includes('sawm')) {
    return 'How does conscious restraint awaken deep spiritual resilience and divine closeness?';
  }
  if (lower.includes('charity') || lower.includes('sadaqah') || lower.includes('zakat') || lower.includes('wealth')) {
    return 'Why is giving away surplus wealth the only true way to purify one’s earnings?';
  }
  if (lower.includes('prayer') || lower.includes('salat') || lower.includes('prostrat') || lower.includes('sujud')) {
    return 'How does placing your forehead on the earth release the burdens of the mortal world?';
  }
  if (lower.includes('tongue') || lower.includes('speech') || lower.includes('silent') || lower.includes('speak good')) {
    return 'Why does guarding the tongue preserve the entire spiritual fortress of a believer?';
  }
  if (lower.includes('anger') || lower.includes('wrestler') || lower.includes('patience') || lower.includes('sabr')) {
    return 'What separates true spiritual courage from mere worldly displays of temper?';
  }
  if (lower.includes('mother') || lower.includes('father') || lower.includes('parent') || lower.includes('kinship')) {
    return 'Why did divine wisdom place the gates of Paradise directly beneath compassionate filial duty?';
  }
  if (lower.includes('knowledge') || lower.includes('scholar') || lower.includes('learn')) {
    return 'Why do the angels lower their wings in genuine delight for seekers of beneficial wisdom?';
  }
  if (lower.includes('forgive') || lower.includes('repent') || lower.includes('istighfar') || lower.includes('mercy')) {
    return 'How does sincere repentance transform past errors into illuminated divine grace?';
  }
  if (lower.includes('jannah') || lower.includes('paradise') || lower.includes('gardens')) {
    return 'What everlasting peace awaits those who lived with integrity and devotion?';
  }
  if (lower.includes('hell') || lower.includes('fire') || lower.includes('punish')) {
    return 'How does reverent awareness of divine accountability guide our everyday conduct?';
  }
  if (lower.includes('neighbor') || lower.includes('brother') || lower.includes('guest') || lower.includes('salam')) {
    return 'How does authentic faith express itself through unconditional kindness to society?';
  }
  if (lower.includes('modesty') || lower.includes('character') || lower.includes('truth')) {
    return 'Why will noble character be the heaviest single weight on the Divine Scale?';
  }

  // Fallback to chapter/section reflective question
  if (sectionName && sectionName.trim().length > 3) {
    return `What essential life wisdom does the prophetic tradition regarding "${sectionName}" reveal?`;
  }

  return 'What timeless moral compass does this authentic prophetic tradition illuminate for our lives?';
}

/**
 * Extract companion narrator from English hadith text
 */
function extractNarrator(text: string): { narrator: string; cleanEnglish: string } {
  const match = text.match(/Narrated\s+([^:]+):/i);
  if (match) {
    const narrator = match[1].trim();
    const cleanEnglish = text.replace(/Narrated\s+[^:]+:\s*/i, '').trim();
    return { narrator, cleanEnglish };
  }

  const match2 = text.match(/^([^:]+) narrated that:?/i);
  if (match2) {
    const narrator = match2[1].trim();
    const cleanEnglish = text.replace(/^[^:]+ narrated that:?\s*/i, '').trim();
    return { narrator, cleanEnglish };
  }

  return { narrator: 'A Noble Companion (RA)', cleanEnglish: text };
}

/**
 * Fetch a single Hadith from the CDN by book and Hadith number
 */
export async function fetchHadithByNumber(
  book: SupportedCanonicalBook,
  hadithNumber: number
): Promise<SahihHadithItem | null> {
  const cacheKey = `${book}_${hadithNumber}`;
  if (memoryCache.has(cacheKey)) {
    return memoryCache.get(cacheKey)!;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const [engRes, araRes] = await Promise.all([
      fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-${book}/${hadithNumber}.json`, {
        signal: controller.signal,
      }),
      fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${book}/${hadithNumber}.json`, {
        signal: controller.signal,
      }),
    ]);

    clearTimeout(timeoutId);

    if (!engRes.ok || !araRes.ok) {
      return null;
    }

    const engData = await engRes.json();
    const araData = await araRes.json();

    const engItem = engData.hadiths?.[0];
    const araItem = araData.hadiths?.[0];

    if (!engItem || !araItem) {
      return null;
    }

    const sectionId = engItem.reference?.book || 1;
    const sectionName =
      engData.metadata?.section?.[sectionId] ||
      araData.metadata?.section?.[sectionId] ||
      `Chapter ${sectionId}`;

    const { narrator, cleanEnglish } = extractNarrator(engItem.text);
    const question = generateQuestionForHadith(engItem.text, sectionName);
    const bookInfo = BOOK_METADATA[book];

    const gradeText = engItem.grades?.[0]?.grade
      ? `Sahih (${engItem.grades[0].grade})`
      : 'Sahih (Authentic)';

    const item: SahihHadithItem = {
      id: `${book}_${hadithNumber}`,
      collectionId: book,
      collectionName: bookInfo.name,
      hadithNumber,
      reference: `${bookInfo.defaultPrefix} ${hadithNumber}`,
      bookName: `${bookInfo.name} — ${sectionName}`,
      chapterName: sectionName,
      grade: gradeText,
      narrator,
      narratorArabic: 'رضي الله عنه',
      isnadBrief: `Authenticated chain preserved in ${bookInfo.name}`,
      question,
      textArabic: araItem.text.trim(),
      textEnglish: cleanEnglish,
      category: 'general',
      categoryLabel: sectionName,
      keyLesson: `Act with sincerity, uphold the prophetic sunnah, and implement this authentic guidance in your daily life.`,
    };

    memoryCache.set(cacheKey, item);
    persistCache();
    return item;
  } catch {
    return null;
  }
}

/**
 * Fetch a whole section of Hadiths from the CDN
 */
export async function fetchSectionHadiths(
  book: SupportedCanonicalBook,
  sectionId: number,
  maxItems = 15
): Promise<SahihHadithItem[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const [engRes, araRes] = await Promise.all([
      fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-${book}/sections/${sectionId}.json`, {
        signal: controller.signal,
      }),
      fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${book}/sections/${sectionId}.json`, {
        signal: controller.signal,
      }),
    ]);

    clearTimeout(timeoutId);

    if (!engRes.ok || !araRes.ok) {
      return [];
    }

    const engData = await engRes.json();
    const araData = await araRes.json();

    const engList = (engData.hadiths || []).slice(0, maxItems);
    const araMap = new Map<number, string>();
    (araData.hadiths || []).forEach((h: { hadithnumber: number; text: string }) => {
      araMap.set(h.hadithnumber, h.text);
    });

    const sectionName = engData.metadata?.section?.[sectionId] || `Chapter ${sectionId}`;
    const bookInfo = BOOK_METADATA[book];
    const results: SahihHadithItem[] = [];

    for (const engItem of engList) {
      const hNum = engItem.hadithnumber;
      const araText = araMap.get(hNum) || '';
      if (!araText || !engItem.text) continue;

      const cacheKey = `${book}_${hNum}`;
      if (memoryCache.has(cacheKey)) {
        results.push(memoryCache.get(cacheKey)!);
        continue;
      }

      const { narrator, cleanEnglish } = extractNarrator(engItem.text);
      const question = generateQuestionForHadith(engItem.text, sectionName);
      const gradeText = engItem.grades?.[0]?.grade
        ? `Sahih (${engItem.grades[0].grade})`
        : 'Sahih (Authentic)';

      const item: SahihHadithItem = {
        id: `${book}_${hNum}`,
        collectionId: book,
        collectionName: bookInfo.name,
        hadithNumber: hNum,
        reference: `${bookInfo.defaultPrefix} ${hNum}`,
        bookName: `${bookInfo.name} — ${sectionName}`,
        chapterName: sectionName,
        grade: gradeText,
        narrator,
        narratorArabic: 'رضي الله عنه',
        isnadBrief: `Authenticated chain in ${bookInfo.name}`,
        question,
        textArabic: araText.trim(),
        textEnglish: cleanEnglish,
        category: 'chapter',
        categoryLabel: sectionName,
        keyLesson: `Reflect on the guidance of "${question}" and embody its practice with devotion.`,
      };

      memoryCache.set(cacheKey, item);
      results.push(item);
    }

    persistCache();
    return results;
  } catch {
    return [];
  }
}

/**
 * Retrieve cached or bundled Hadiths matching a topic
 */
export function getLocalHadithsForTopic(topicId: string): SahihHadithItem[] {
  // First check bundled hadiths matching this topicId or category
  const matching = ALL_SAHIH_HADITHS.filter(
    (h) => h.chapterTopicId === topicId || h.category === topicId
  );

  if (matching.length > 0) {
    return matching;
  }

  // Otherwise return relevant hadiths from memory cache
  const cached = Array.from(memoryCache.values()).filter((h) => h.chapterTopicId === topicId);
  if (cached.length > 0) {
    return cached;
  }

  // Fallback to top hadiths
  return ALL_SAHIH_HADITHS.slice(0, 5);
}
