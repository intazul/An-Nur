import React, { useEffect, useState } from 'react';
import {
  X,
  BookOpen,
  Play,
  Bookmark,
  Copy,
  Check,
  Quote,
  Sparkles,
  CheckCircle2,
  Heart,
  History,
  Loader2,
  ScrollText,
} from 'lucide-react';
import { Ayah, SurahDetail, UserProfileData } from '../types/quran';
import { getPreciseVerseTafsir, PreciseTafsir } from '../utils/verseTafsir';
import { getRelatedHadith } from '../utils/hadithDatabase';
import { getCachedVerseTafsirSync, getVerseTafsirOffline } from '../utils/offlineTafsirStore';
import { transliterateUrduToRoman } from '../utils/urduTransliteration';
import { getVerseRevelationContext } from '../data/quranRevelationHistory';

interface TafsirModalProps {
  isOpen: boolean;
  onClose: () => void;
  ayah: Ayah | null;
  surah: SurahDetail | null;
  profile?: UserProfileData;
  onPlayAyah?: (ayahNumber: number) => void;
  onBookmarkAyah?: (ayahNumber: number) => void;
}

export const TafsirModal: React.FC<TafsirModalProps> = ({
  isOpen,
  onClose,
  ayah,
  surah,
  profile,
  onPlayAyah,
  onBookmarkAyah,
}) => {
  const [copied, setCopied] = useState(false);
  const [ibnKathirEn, setIbnKathirEn] = useState<string | null>(null);
  const [regionalDeepTafsir, setRegionalDeepTafsir] = useState<string | null>(null);
  const [isLoadingDeepTafsir, setIsLoadingDeepTafsir] = useState(false);

  // Strict mutual exclusivity: show ONLY Assamese OR Urdu, never both
  const useAssamese = Boolean(profile?.showAssamese && !profile?.showUrdu);
  const useUrdu = Boolean(!useAssamese && (profile ? profile.showUrdu : true));

  useEffect(() => {
    if (!isOpen || !ayah || !surah) return;

    const surahNum = surah.number;
    const ayahNum = ayah.numberInSurah;
    const cachedEn = getCachedVerseTafsirSync(surahNum, ayahNum, 'en');
    const cachedReg = useAssamese
      ? getCachedVerseTafsirSync(surahNum, ayahNum, 'as')
      : useUrdu
      ? getCachedVerseTafsirSync(surahNum, ayahNum, 'ur')
      : null;

    setIbnKathirEn(cachedEn);
    setRegionalDeepTafsir(cachedReg);

    let cancelled = false;
    if (!cachedEn || ((useAssamese || useUrdu) && !cachedReg)) {
      setIsLoadingDeepTafsir(true);
      Promise.all([
        cachedEn ? Promise.resolve(cachedEn) : getVerseTafsirOffline(surahNum, ayahNum, 'en'),
        useAssamese
          ? cachedReg
            ? Promise.resolve(cachedReg)
            : getVerseTafsirOffline(surahNum, ayahNum, 'as')
          : useUrdu
          ? cachedReg
            ? Promise.resolve(cachedReg)
            : getVerseTafsirOffline(surahNum, ayahNum, 'ur')
          : Promise.resolve(null),
      ])
        .then(([enText, regText]) => {
          if (cancelled) return;
          setIbnKathirEn(enText);
          setRegionalDeepTafsir(regText);
          setIsLoadingDeepTafsir(false);
        })
        .catch(() => {
          if (!cancelled) setIsLoadingDeepTafsir(false);
        });
    } else {
      setIsLoadingDeepTafsir(false);
    }

    return () => {
      cancelled = true;
    };
  }, [isOpen, surah?.number, ayah?.numberInSurah, useAssamese, useUrdu]);

  if (!isOpen || !ayah || !surah) return null;

  // Curated concise overview + offline fallback
  const tafsir: PreciseTafsir = getPreciseVerseTafsir(
    surah.number,
    ayah.numberInSurah,
    surah.nameEnglish,
    ayah.textArabic,
    ayah.textEnglish,
    ayah.textUrdu,
    ayah.textAssamese
  );

  const hadith = ayah.relatedHadith || getRelatedHadith(surah.number, ayah.numberInSurah);
  const revelationContext = getVerseRevelationContext(surah.number, ayah.numberInSurah);

  const handleCopyAll = () => {
    let text = `${ayah.textArabic}\n\n`;
    text += `English: ${ayah.textEnglish}\n\n`;
    if (useAssamese && ayah.textAssamese) {
      text += `Assamese: ${ayah.textAssamese}\n\n`;
    } else if (useUrdu && ayah.textUrdu) {
      text += `Urdu (Transliteration): ${transliterateUrduToRoman(ayah.textUrdu)}\n\n`;
    }
    text += `Historical Context: Revealed #${revelationContext.surahHistory.revelationOrder} · ${revelationContext.surahHistory.phase} (${revelationContext.surahHistory.approximateEra})\n`;
    if (revelationContext.verseOccasion) {
      text += `Sabab al-Nuzul (${revelationContext.verseOccasion.title}): ${revelationContext.verseOccasion.situation}\nStudy Insight: ${revelationContext.verseOccasion.studyInsight}\n\n`;
    } else {
      text += `Surah Background: ${revelationContext.surahHistory.historicalSummary}\n\n`;
    }
    if (ibnKathirEn) {
      text += `Tafsir Ibn Kathir (English):\n${ibnKathirEn}\n\n`;
    } else {
      text += `Tafsir: ${tafsir.explanation}\n\n`;
    }
    if (useAssamese && (regionalDeepTafsir || tafsir.assameseExplanation)) {
      text += `Assamese Tafsir:\n${regionalDeepTafsir || tafsir.assameseExplanation}\n\n`;
    } else if (useUrdu && (regionalDeepTafsir || tafsir.urduExplanation)) {
      text += `Urdu Tafsir Ibn Kathir (Transliteration):\n${transliterateUrduToRoman(regionalDeepTafsir || tafsir.urduExplanation)}\n\n`;
    }
    text += `Key Takeaway: ${tafsir.keyLesson}\n\n`;
    if (hadith) {
      text += `Related Hadith (${hadith.source}): "${hadith.textEnglish}"\n\n`;
    }
    text += `[Holy Quran ${surah.nameEnglish} ${surah.number}:${ayah.numberInSurah}]`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in select-none">
      <div
        className="w-full max-w-md h-full sm:h-[92vh] bg-white dark:bg-black rounded-none sm:rounded-3xl border-0 sm:border border-black/15 dark:border-white/20 shadow-2xl overflow-hidden flex flex-col safe-top-zone sm:pt-0 safe-bottom-zone sm:pb-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Drag Handle on Android */}
        <div className="w-10 h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-full mx-auto mt-2.5 mb-1 sm:hidden" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-black/10 dark:border-white/15 flex items-center justify-between shrink-0 bg-white dark:bg-black">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-2xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shrink-0 font-bold shadow-xs">
              <BookOpen className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-black dark:text-white font-cinzel truncate">
                Ayah {ayah.numberInSurah} · Tafsir Ibn Kathir
              </h3>
              <p className="text-xs text-neutral-700 dark:text-neutral-400 font-semibold truncate">
                Surah {surah.nameEnglish} ({surah.nameArabic}) · 100% Offline
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleCopyAll}
              className="p-2 bg-black text-white dark:bg-white dark:text-black rounded-xl transition-transform active:scale-95"
              title="Copy Verse & Tafsir"
            >
              {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4 stroke-[2.5]" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 bg-black text-white dark:bg-white dark:text-black rounded-xl transition-transform active:scale-95"
              title="Close Tafsir"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Scrollable Tafsir Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-neutral-50 dark:bg-black">
          {/* 1. Sacred Arabic Verse Card */}
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-950 border border-black/15 dark:border-white/15 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-600 dark:text-neutral-400">
              <span className="font-cinzel text-black dark:text-white">Verse {ayah.numberInSurah}</span>
              <div className="flex items-center gap-1.5">
                {onPlayAyah && (
                  <button
                    onClick={() => onPlayAyah(ayah.numberInSurah)}
                    className="p-1.5 rounded-lg bg-black text-white dark:bg-white dark:text-black transition-transform active:scale-95 shadow-2xs"
                    title="Play Verse Recitation"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                )}
                {onBookmarkAyah && (
                  <button
                    onClick={() => onBookmarkAyah(ayah.numberInSurah)}
                    className="p-1.5 rounded-lg bg-black text-white dark:bg-white dark:text-black transition-transform active:scale-95"
                    title="Bookmark Verse"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="py-2 text-right" dir="rtl">
              <p className="font-quran text-2xl sm:text-3xl text-black dark:text-white leading-[2.5] font-bold font-arabic-clean select-text">
                {ayah.textArabic}
                <span className="inline-block mr-2 text-black dark:text-white font-cinzel text-base select-none">
                  ۝ {ayah.numberInSurah}
                </span>
              </p>
            </div>

            {/* Translations */}
            <div className="pt-2 border-t border-black/10 dark:border-white/15 space-y-2.5">
              <div className="text-sm sm:text-base text-black dark:text-neutral-100 font-book-serif leading-relaxed">
                <span className="font-bold text-neutral-700 dark:text-neutral-400 block text-[10px] font-sans-ui uppercase tracking-wider mb-1">
                  English Translation:
                </span>
                {ayah.textEnglish}
              </div>

              {/* Assamese Translation (mutually exclusive with Urdu) */}
              {useAssamese && ayah.textAssamese && (
                <div className="pt-2 border-t border-black/10 dark:border-white/10 text-left" dir="ltr">
                  <span className="font-bold text-neutral-800 dark:text-neutral-400 block text-[10px] font-sans-ui mb-1">
                    অসমীয়া অনুবাদ (শইখ ৰফিকুল ইছলাম হাবিবুৰ ৰহমান):
                  </span>
                  <p className="font-assamese text-[15px] text-black dark:text-white font-semibold leading-relaxed select-text">
                    {ayah.textAssamese}
                  </p>
                </div>
              )}

              {/* Urdu Translation in Roman English Transliteration (mutually exclusive with Assamese) */}
              {useUrdu && ayah.textUrdu && (
                <div className="pt-2 border-t border-black/10 dark:border-white/10 text-left" dir="ltr">
                  <span className="font-bold text-neutral-800 dark:text-neutral-400 block text-[10px] font-sans-ui uppercase tracking-wider mb-1">
                    Urdu Translation (Roman Transliteration · Jalandhri):
                  </span>
                  <p className="font-book-serif text-[15px] text-black dark:text-white font-medium leading-relaxed select-text">
                    {transliterateUrduToRoman(ayah.textUrdu)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 1B. HISTORICAL CONTEXT & REVELATION OCCASION (ASBAB AL-NUZUL) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-neutral-950 border border-black/20 dark:border-white/20 shadow-xs space-y-3">
            <div className="flex items-start justify-between gap-2 pb-2 border-b border-black/10 dark:border-white/15">
              <div className="flex items-center gap-2 min-w-0">
                <History className="w-4 h-4 text-black dark:text-white stroke-[2.4] shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-black dark:text-white font-cinzel tracking-tight leading-tight">
                    Historical Context &amp; Revelation
                  </h4>
                  <p className="text-[10.5px] font-semibold text-neutral-600 dark:text-neutral-400 truncate mt-0.5">
                    {revelationContext.surahHistory.approximateEra}
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-black/15 dark:border-white/20 text-black dark:text-white text-[10px] font-bold shrink-0">
                Revealed #{revelationContext.surahHistory.revelationOrder} · {revelationContext.surahHistory.phase}
              </span>
            </div>

            {revelationContext.verseOccasion ? (
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-black/15 dark:border-white/15 space-y-1.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-black dark:text-white flex items-center gap-1">
                      <ScrollText className="w-3 h-3" />
                      <span>
                        Sabab al-Nuzul (Ayah {revelationContext.verseOccasion.fromAyah}
                        {revelationContext.verseOccasion.toAyah > revelationContext.verseOccasion.fromAyah
                          ? `–${revelationContext.verseOccasion.toAyah}`
                          : ''}
                        )
                      </span>
                    </span>
                    <span className="text-[10px] font-semibold text-neutral-600 dark:text-neutral-400">
                      {revelationContext.verseOccasion.whenRevealed}
                    </span>
                  </div>
                  <h5 className="text-xs sm:text-[13px] font-bold text-black dark:text-white leading-snug">
                    {revelationContext.verseOccasion.title}
                  </h5>
                  <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-normal select-text">
                    {revelationContext.verseOccasion.situation}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-black border border-black/15 dark:border-white/15 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 block">
                    Why This Helps Study This Verse:
                  </span>
                  <p className="text-xs font-medium text-neutral-900 dark:text-neutral-100 leading-relaxed">
                    {revelationContext.verseOccasion.studyInsight}
                  </p>
                  <span className="inline-block text-[10px] font-mono font-bold text-neutral-600 dark:text-neutral-400 pt-0.5">
                    Source: {revelationContext.verseOccasion.hadithSource}
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-black/10 dark:border-white/15 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 block">
                    Situation of the Prophet (ﷺ) &amp; Community:
                  </span>
                  <p className="text-neutral-900 dark:text-neutral-100 font-medium leading-relaxed">
                    {revelationContext.surahHistory.prophetSituation}
                  </p>
                </div>
                <p className="text-neutral-800 dark:text-neutral-200 leading-relaxed select-text">
                  {revelationContext.surahHistory.historicalSummary}
                </p>
                <div className="flex items-center justify-between gap-2 flex-wrap pt-1 text-[10.5px] text-neutral-600 dark:text-neutral-400 font-semibold">
                  <span>Themes: {revelationContext.surahHistory.keyThemes}</span>
                </div>
              </div>
            )}
          </div>

          {/* 2. COMPLETE OFFLINE TAFSIR IBN KATHIR & REGIONAL TAFSIR */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-neutral-950 border-2 border-black/15 dark:border-white/20 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/15">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-black dark:text-white stroke-[2.5]" />
                <h4 className="text-sm font-bold text-black dark:text-white font-cinzel tracking-tight">
                  Tafsir Ibn Kathir (Deep Offline)
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold">
                {surah.number}:{ayah.numberInSurah}
              </span>
            </div>

            {/* Quick Summary */}
            <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-black/10 dark:border-white/15">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 block mb-0.5">
                Core Summary:
              </span>
              <p className="text-xs sm:text-sm font-bold text-black dark:text-white leading-relaxed">
                {tafsir.summary}
              </p>
            </div>

            {/* Deep Classical Tafsir Ibn Kathir (English) */}
            <div className="space-y-1.5 text-sm sm:text-[15px] text-neutral-900 dark:text-neutral-200 leading-relaxed font-book-serif">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-sans-ui font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  Classical Commentary (Imam Ibn Kathir):
                </span>
                {isLoadingDeepTafsir && <Loader2 className="w-3.5 h-3.5 animate-spin text-neutral-500" />}
              </div>
              <div className="font-normal whitespace-pre-line select-text space-y-2.5">
                {ibnKathirEn || tafsir.explanation}
              </div>
            </div>

            {/* Assamese Al-Mukhtasar Deep Tafsir (mutually exclusive with Urdu) */}
            {useAssamese && (regionalDeepTafsir || tafsir.assameseExplanation) && (
              <div className="p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-black/10 dark:border-white/15 text-left space-y-1.5" dir="ltr">
                <span className="text-[10px] font-bold font-sans-ui uppercase tracking-wider text-neutral-700 dark:text-neutral-300 block">
                  অসমীয়া তাফছীৰ (আল-মুখতাছাৰ ফী তাফছীৰিল কোৰআন):
                </span>
                <p className="font-assamese text-sm text-black dark:text-white font-semibold leading-relaxed whitespace-pre-line select-text">
                  {regionalDeepTafsir || tafsir.assameseExplanation}
                </p>
              </div>
            )}

            {/* Urdu Tafsir Ibn Kathir in Roman English Transliteration (mutually exclusive with Assamese) */}
            {useUrdu && (regionalDeepTafsir || tafsir.urduExplanation) && (
              <div className="p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-black/10 dark:border-white/15 text-left space-y-1.5" dir="ltr">
                <span className="text-[10px] font-bold font-sans-ui uppercase tracking-wider text-neutral-700 dark:text-neutral-300 block">
                  Tafsir Ibn Kathir (Urdu Roman Transliteration):
                </span>
                <p className="font-book-serif text-sm text-black dark:text-white font-medium leading-relaxed whitespace-pre-line select-text">
                  {transliterateUrduToRoman(regionalDeepTafsir || tafsir.urduExplanation)}
                </p>
              </div>
            )}

            {/* Actionable Key Lesson */}
            <div className="p-3 rounded-xl bg-black text-white dark:bg-white dark:text-black space-y-1 shadow-2xs">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider opacity-90">
                <Heart className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Life Lesson & Contemplation</span>
              </div>
              <p className="text-xs font-semibold leading-relaxed">
                {tafsir.keyLesson}
              </p>
            </div>
          </div>

          {/* 3. Related Prophetic Hadith (shown ONLY if a specific Hadith is present for this ayah) */}
          {hadith && (
            <div className="p-4 rounded-2xl bg-white dark:bg-neutral-950 border border-black/15 dark:border-white/15 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-black dark:text-white">
                  <Quote className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Related Prophetic Hadith</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-neutral-600 dark:text-neutral-400">
                  {hadith.source}
                </span>
              </div>

              <p className="text-sm text-neutral-900 dark:text-neutral-200 italic font-book-serif leading-relaxed">
                "{hadith.textEnglish}"
              </p>

              {useUrdu && hadith.textUrdu && (
                <p className="font-book-serif text-xs sm:text-sm text-black dark:text-neutral-200 text-left leading-relaxed font-medium" dir="ltr">
                  {transliterateUrduToRoman(hadith.textUrdu)}
                </p>
              )}

              <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-[11px] text-neutral-900 dark:text-neutral-200 font-medium">
                <strong>Connection:</strong> {hadith.relevance}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Close Button */}
        <div className="p-3.5 border-t border-black/10 dark:border-white/15 bg-white dark:bg-black shrink-0">
          <button
            onClick={onClose}
            className="w-full h-12 rounded-2xl bg-black text-white hover:bg-neutral-900 dark:bg-white dark:text-black dark:hover:bg-neutral-100 font-bold text-xs shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            <span>Close Tafsir</span>
          </button>
        </div>
      </div>
    </div>
  );
};
