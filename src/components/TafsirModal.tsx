import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Play,
  Bookmark,
  Copy,
  Check,
  Quote,
  Sparkles,
  Volume2,
  CheckCircle2,
  Heart,
} from 'lucide-react';
import { Ayah, SurahDetail } from '../types/quran';
import { getPreciseVerseTafsir, PreciseTafsir } from '../utils/verseTafsir';
import { getRelatedHadith } from '../utils/hadithDatabase';

interface TafsirModalProps {
  isOpen: boolean;
  onClose: () => void;
  ayah: Ayah | null;
  surah: SurahDetail | null;
  onPlayAyah?: (ayahNumber: number) => void;
  onBookmarkAyah?: (ayahNumber: number) => void;
}

export const TafsirModal: React.FC<TafsirModalProps> = ({
  isOpen,
  onClose,
  ayah,
  surah,
  onPlayAyah,
  onBookmarkAyah,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !ayah || !surah) return null;

  // Single, precise, particular Tafsir for this exact verse
  const tafsir: PreciseTafsir = getPreciseVerseTafsir(
    surah.number,
    ayah.numberInSurah,
    surah.nameEnglish,
    ayah.textArabic,
    ayah.textEnglish,
    ayah.textUrdu
  );

  const hadith = ayah.relatedHadith || getRelatedHadith(surah.number, ayah.numberInSurah);

  const handleCopyAll = () => {
    let text = `${ayah.textArabic}\n\n`;
    text += `English: ${ayah.textEnglish}\n\n`;
    if (ayah.textUrdu) {
      text += `Urdu: ${ayah.textUrdu}\n\n`;
    }
    text += `Tafsir (Easy Explanation): ${tafsir.explanation}\n\n`;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in select-none">
      <div
        className="w-full max-w-md h-full sm:h-[92vh] bg-white dark:bg-stone-900 rounded-none sm:rounded-3xl border-0 sm:border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Drag Handle on Android */}
        <div className="w-10 h-1.5 bg-stone-300 dark:bg-stone-700 rounded-full mx-auto mt-2.5 mb-1 sm:hidden" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between shrink-0 bg-white dark:bg-stone-900">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-2xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shrink-0 font-bold shadow-xs">
              <BookOpen className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-black dark:text-white font-cinzel truncate">
                Ayah {ayah.numberInSurah} Tafsir
              </h3>
              <p className="text-xs text-stone-700 dark:text-stone-400 font-semibold truncate">
                Surah {surah.nameEnglish} ({surah.nameArabic}) · Juz {ayah.juz || 1}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Quick Copy */}
            <button
              onClick={handleCopyAll}
              className="p-2 text-black dark:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-colors active:scale-95"
              title="Copy Verse & Tafsir"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> : <Copy className="w-4 h-4 stroke-[2.5]" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 text-black dark:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-colors active:scale-95"
              title="Close Tafsir"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Scrollable Single Tafsir View Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-stone-50/50 dark:bg-stone-950">
          {/* 1. Sacred Arabic Verse Card */}
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-stone-600 dark:text-stone-400">
              <span className="font-cinzel">Verse {ayah.numberInSurah}</span>
              <div className="flex items-center gap-1.5">
                {onPlayAyah && (
                  <button
                    onClick={() => onPlayAyah(ayah.numberInSurah)}
                    className="p-1.5 rounded-lg bg-black text-white dark:bg-white dark:text-black hover:bg-stone-800 transition-colors shadow-2xs"
                    title="Play Verse Recitation"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                )}
                {onBookmarkAyah && (
                  <button
                    onClick={() => onBookmarkAyah(ayah.numberInSurah)}
                    className="p-1.5 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-black dark:text-white transition-colors"
                    title="Bookmark Verse"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="py-2 text-right" dir="rtl">
              <p className="font-quran text-2xl sm:text-3xl text-black dark:text-stone-100 leading-[2.5] font-bold">
                {ayah.textArabic}
                <span className="inline-block mr-2 text-amber-600 dark:text-amber-400 font-cinzel text-base select-none">
                  ۝ {ayah.numberInSurah}
                </span>
              </p>
            </div>

            {/* Translations */}
            <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 space-y-2">
              <div className="text-xs sm:text-sm text-black dark:text-stone-200 font-medium leading-relaxed font-sans-ui">
                <span className="font-bold text-stone-800 dark:text-stone-400 block text-[10px] uppercase tracking-wider mb-0.5">
                  English Translation:
                </span>
                {ayah.textEnglish}
              </div>

              {ayah.textUrdu && (
                <div className="pt-2 border-t border-stone-100 dark:border-stone-800/60 text-right" dir="rtl">
                  <span className="font-bold text-stone-800 dark:text-stone-400 block text-[10px] font-sans-ui mb-0.5">
                    اردو ترجمہ (فاتح محمد جالندھری):
                  </span>
                  <p className="font-urdu text-base text-black dark:text-stone-100 font-bold leading-loose">
                    {ayah.textUrdu}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 2. ONE PRECISE TAFSIR & PLAIN EXPLANATION (Particular to this verse) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border-2 border-black/10 dark:border-stone-700 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-black dark:text-amber-400 stroke-[2.5]" />
                <h4 className="text-sm font-bold text-black dark:text-white font-cinzel tracking-tight">
                  Precise Tafsir & Meaning
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold">
                Particular to Ayah {ayah.numberInSurah}
              </span>
            </div>

            {/* Core Summary */}
            <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 block mb-0.5">
                Core Meaning:
              </span>
              <p className="text-xs sm:text-sm font-bold text-black dark:text-white leading-relaxed">
                {tafsir.summary}
              </p>
            </div>

            {/* Plain Detailed Explanation */}
            <div className="space-y-1.5 text-xs sm:text-sm text-black dark:text-stone-200 leading-relaxed font-normal">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 block">
                Explanation:
              </span>
              <p className="text-stone-900 dark:text-stone-200 font-medium">
                {tafsir.explanation}
              </p>
            </div>

            {/* Urdu Easy Explanation */}
            {tafsir.urduExplanation && (
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 text-right" dir="rtl">
                <span className="text-[10px] font-bold font-sans-ui text-stone-700 dark:text-stone-400 block mb-1">
                  آسان اردو تشریح:
                </span>
                <p className="font-urdu text-sm sm:text-base text-black dark:text-stone-100 font-bold leading-relaxed">
                  {tafsir.urduExplanation}
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

          {/* 3. Related Prophetic Hadith (if directly relevant to this verse) */}
          {hadith && (
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-black dark:text-white">
                  <Quote className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Related Prophetic Hadith</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-stone-600 dark:text-stone-400">
                  {hadith.source}
                </span>
              </div>

              <p className="text-xs text-black dark:text-stone-200 italic font-medium leading-relaxed">
                "{hadith.textEnglish}"
              </p>

              {hadith.textUrdu && (
                <p className="font-urdu text-xs sm:text-sm text-black dark:text-stone-200 text-right leading-loose font-bold" dir="rtl">
                  {hadith.textUrdu}
                </p>
              )}

              <div className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800/80 text-[11px] text-stone-900 dark:text-stone-200 font-medium">
                <strong>Connection:</strong> {hadith.relevance}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Close Button */}
        <div className="p-3.5 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shrink-0">
          <button
            onClick={onClose}
            className="w-full h-12 rounded-2xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-bold text-xs shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            <span>Close Tafsir</span>
          </button>
        </div>
      </div>
    </div>
  );
};
