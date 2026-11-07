import { BUNDLED_SURAHS } from '../data/defaultSurahs';
import { ALL_SURAHS } from '../data/surahList';
import { Ayah, SurahDetail } from '../types/quran';
import { getOfflineSurahDetail } from './offlineStorage';

/**
 * Loads a Surah either from offline storage, bundled data, or the AlQuran Cloud API.
 */
export async function fetchSurahDetail(surahNumber: number): Promise<SurahDetail> {
  // 1. Check offline downloaded storage
  const offline = getOfflineSurahDetail(surahNumber);
  if (offline && offline.ayahs && offline.ayahs.length > 0) {
    return offline;
  }

  // 2. Check pre-bundled rich data
  if (BUNDLED_SURAHS[surahNumber]) {
    return BUNDLED_SURAHS[surahNumber];
  }

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

  // 3. Attempt API fetch for dynamic full 114 Surahs with Arabic, English, and Urdu
  try {
    const res = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.sahih,ur.jalandhry`
    );

    if (res.ok) {
      const data = await res.json();
      if (data.data && Array.isArray(data.data) && data.data.length >= 3) {
        const arabicData = data.data[0];
        const englishData = data.data[1];
        const urduData = data.data[2];

        const ayahs: Ayah[] = arabicData.ayahs.map((arAyah: any, idx: number) => {
          const enAyah = englishData.ayahs[idx] || {};
          const urAyah = urduData.ayahs[idx] || {};
          return {
            numberInSurah: arAyah.numberInSurah,
            globalNumber: arAyah.number,
            textArabic: arAyah.text,
            textEnglish: enAyah.text || '',
            textUrdu: urAyah.text || '',
            tafsirSummary: `Spiritual contemplation for Ayah ${arAyah.numberInSurah}: Reflect upon the divine wisdom, justice, and mercy embedded within these revealed words.`,
          };
        });

        const detail: SurahDetail = {
          number: meta.number,
          nameArabic: arabicData.name || meta.nameArabic,
          nameEnglish: arabicData.englishName || meta.nameEnglish,
          nameUrdu: meta.nameUrdu,
          englishTranslation: arabicData.englishNameTranslation || meta.englishTranslation,
          revelationType: (arabicData.revelationType === 'Meccan' ? 'Meccan' : 'Medinan'),
          numberOfAyahs: ayahs.length,
          bismillahPre: surahNumber !== 1 && surahNumber !== 9,
          ayahs,
        };

        return detail;
      }
    }
  } catch (netErr) {
    console.warn('Network fetch failed or offline mode active for Surah:', surahNumber, netErr);
  }

  // If network unavailable and not bundled, generate an informative offline placeholder using meta
  return {
    ...meta,
    bismillahPre: surahNumber !== 1 && surahNumber !== 9,
    ayahs: Array.from({ length: meta.numberOfAyahs }).map((_, i) => ({
      numberInSurah: i + 1,
      globalNumber: i + 1,
      textArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      textEnglish: `Ayah ${i + 1} of Surah ${meta.nameEnglish} (${meta.englishTranslation}). Connect to the internet or download this Surah for complete offline reading and audio recitation.`,
      textUrdu: `سورۃ ${meta.nameUrdu} کی آیت نمبر ${i + 1}۔ مکمل متن، ترجمہ اور آڈیو کے لیے انٹرنیٹ کنیکٹ کریں یا سورۃ ڈاؤنلوڈ کریں۔`,
      tafsirSummary: `Spiritual reflection on verse ${i + 1} of ${meta.nameEnglish}.`,
    })),
  };
}
