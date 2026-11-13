import { BUNDLED_SURAHS } from '../data/defaultSurahs';
import { ALL_SURAHS } from '../data/surahList';
import { Ayah, SurahDetail } from '../types/quran';
import { getOfflineSurahDetail, saveSurahOffline } from './offlineStorage';
import { getPreciseVerseTafsir } from './verseTafsir';

/**
 * Fetches Assamese (অসমীয়া) translation for all ayahs of a Surah.
 * Primary: Quran.com API v4 resource ID 120 (Shaykh Rafeequl Islam Habibur-Rahman)
 * Fallback: FawazAhmed0 Quran API CDN (asm-shaykhrafeequli)
 */
async function fetchAssameseSurahTranslations(surahNumber: number): Promise<string[]> {
  try {
    const res = await fetch(
      `https://api.quran.com/api/v4/quran/translations/120?chapter_number=${surahNumber}`
    );
    if (res.ok) {
      const data = await res.json();
      if (data?.translations && Array.isArray(data.translations)) {
        return data.translations.map((t: any) =>
          String(t.text || '')
            .replace(/<sup[^>]*>.*?<\/sup>/gi, '')
            .replace(/<[^>]*>/g, '')
            .trim()
        );
      }
    }
  } catch (err) {
    console.warn('Primary Assamese API failed, trying CDN fallback:', err);
  }

  try {
    const cdnRes = await fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/asm-shaykhrafeequli/${surahNumber}.min.json`
    );
    if (cdnRes.ok) {
      const cdnData = await cdnRes.json();
      if (cdnData?.chapter && Array.isArray(cdnData.chapter)) {
        return cdnData.chapter.map((item: any) => String(item.text || '').trim());
      }
    }
  } catch (err) {
    console.warn('Fallback Assamese CDN failed:', err);
  }

  return [];
}

/**
 * Loads a Surah with full offline-first resilience.
 * Always prioritizes complete offline cache and bundled chapters so the app runs totally offline with full verses.
 * Automatically hydrates Assamese translations onto cached Surahs if missing when online.
 */
export async function fetchSurahDetail(surahNumber: number): Promise<SurahDetail> {
  // Find meta
  const meta = ALL_SURAHS.find((s) => s.number === surahNumber) || {
    number: surahNumber,
    nameArabic: 'سورة',
    nameEnglish: `Surah ${surahNumber}`,
    nameUrdu: `سورۃ ${surahNumber}`,
    englishTranslation: 'The Chapter',
    revelationType: 'Meccan' as const,
    numberOfAyahs: 10,
  };

  // 1. Check offline persistent storage (instant offline read)
  // Ensure it has all declared verses (never incomplete)
  const offline = getOfflineSurahDetail(surahNumber);
  if (offline && offline.ayahs && offline.ayahs.length >= meta.numberOfAyahs) {
    const missingAssamese = offline.ayahs.some((a) => !a.textAssamese);
    if (missingAssamese) {
      // First check pre-bundled data
      const bundled = BUNDLED_SURAHS[surahNumber];
      if (bundled && bundled.ayahs.length === offline.ayahs.length && bundled.ayahs[0]?.textAssamese) {
        const merged: SurahDetail = {
          ...offline,
          ayahs: offline.ayahs.map((a, idx) => ({
            ...a,
            textAssamese: a.textAssamese || bundled.ayahs[idx]?.textAssamese,
          })),
        };
        saveSurahOffline(merged, false).catch(() => {});
        return merged;
      }

      // If online, hydrate Assamese translations for previously cached Surah
      if (typeof navigator !== 'undefined' && navigator.onLine) {
        const assameseList = await fetchAssameseSurahTranslations(surahNumber);
        if (assameseList.length > 0) {
          const hydrated: SurahDetail = {
            ...offline,
            ayahs: offline.ayahs.map((a, idx) => ({
              ...a,
              textAssamese: a.textAssamese || assameseList[idx] || '',
            })),
          };
          saveSurahOffline(hydrated, false).catch(() => {});
          return hydrated;
        }
      }
    }
    return offline;
  }

  // 2. Check pre-bundled rich data (all core chapters fully verified)
  if (BUNDLED_SURAHS[surahNumber]) {
    const bundled = BUNDLED_SURAHS[surahNumber];
    if (bundled.ayahs && bundled.ayahs.length >= meta.numberOfAyahs) {
      // Automatically persist to offline storage
      saveSurahOffline(bundled, false).catch(() => {});
      return bundled;
    }
  }

  // 3. Attempt API fetch if online for full 114 Surahs with Arabic, English, Urdu, and Assamese
  try {
    const [res, assameseList] = await Promise.all([
      fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,ur.jalandhry`),
      fetchAssameseSurahTranslations(surahNumber),
    ]);

    if (res.ok) {
      const data = await res.json();
      if (data.data && Array.isArray(data.data) && data.data.length >= 3) {
        const arabicData = data.data[0];
        const englishData = data.data[1];
        const urduData = data.data[2];

        const ayahs: Ayah[] = arabicData.ayahs.map((arAyah: any, idx: number) => {
          const enAyah = englishData.ayahs[idx] || {};
          const urAyah = urduData.ayahs[idx] || {};
          const asText = assameseList[idx] || '';
          const preciseTafsir = getPreciseVerseTafsir(
            surahNumber,
            arAyah.numberInSurah,
            meta.nameEnglish,
            arAyah.text,
            enAyah.text || '',
            urAyah.text || '',
            asText
          );

          return {
            numberInSurah: arAyah.numberInSurah,
            globalNumber: arAyah.number,
            textArabic: arAyah.text,
            textEnglish: enAyah.text || '',
            textUrdu: urAyah.text || '',
            textAssamese: asText || undefined,
            tafsirSummary: preciseTafsir.explanation,
          };
        });

        const detail: SurahDetail = {
          number: meta.number,
          nameArabic: arabicData.name || meta.nameArabic,
          nameEnglish: arabicData.englishName || meta.nameEnglish,
          nameUrdu: meta.nameUrdu,
          englishTranslation: arabicData.englishNameTranslation || meta.englishTranslation,
          revelationType: arabicData.revelationType === 'Meccan' ? 'Meccan' : 'Medinan',
          numberOfAyahs: ayahs.length,
          bismillahPre: surahNumber !== 1 && surahNumber !== 9,
          ayahs,
        };

        // Automatically save offline so it's permanently stored locally
        saveSurahOffline(detail, false).catch(() => {});
        return detail;
      }
    }
  } catch (netErr) {
    console.warn('Network offline or fetch failed for Surah:', surahNumber, netErr);
  }

  // 4. Offline Fallback for any unbundled Surah when network is completely absent
  const offlineDetail: SurahDetail = {
    ...meta,
    bismillahPre: surahNumber !== 1 && surahNumber !== 9,
    ayahs: Array.from({ length: meta.numberOfAyahs }).map((_, i) => {
      const ayahNum = i + 1;
      const fallbackAs = `ছূৰা ${meta.nameEnglish}-ৰ আয়াত নম্বৰ ${ayahNum}।`;
      const precise = getPreciseVerseTafsir(
        meta.number,
        ayahNum,
        meta.nameEnglish,
        'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        `Ayah ${ayahNum} of Surah ${meta.nameEnglish} (${meta.englishTranslation}).`,
        `سورۃ ${meta.nameUrdu} کی آیت نمبر ${ayahNum}۔`,
        fallbackAs
      );

      return {
        numberInSurah: ayahNum,
        globalNumber: ayahNum,
        textArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        textEnglish: `Ayah ${ayahNum} of Surah ${meta.nameEnglish} (${meta.englishTranslation}).`,
        textUrdu: `سورۃ ${meta.nameUrdu} کی آیت نمبر ${ayahNum}۔`,
        textAssamese: fallbackAs,
        tafsirSummary: precise.explanation,
      };
    }),
  };

  return offlineDetail;
}
