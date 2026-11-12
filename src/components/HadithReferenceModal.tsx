import React, { useState } from 'react';
import { X, Check, Copy, BookOpen, ShieldCheck, ExternalLink, Bookmark } from 'lucide-react';
import { SahihHadithItem } from '../types/hadith';

interface HadithReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  hadith: SahihHadithItem | null;
  onOpenInLibrary?: (hadith: SahihHadithItem) => void;
}

export const HadithReferenceModal: React.FC<HadithReferenceModalProps> = ({
  isOpen,
  onClose,
  hadith,
  onOpenInLibrary,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !hadith) return null;

  const handleCopyCitation = () => {
    const citation = `[Prophetic Hadith Reference Verification]\n` +
      `Source: ${hadith.reference}\n` +
      `Collection: ${hadith.collectionName}\n` +
      `Book: ${hadith.bookName}\n` +
      `Chapter: ${hadith.chapterName}\n` +
      `Grading: ${hadith.grade}\n` +
      `Primary Narrator: ${hadith.narrator} (${hadith.narratorArabic})\n` +
      `Chain (Sanad): ${hadith.isnadBrief}\n\n` +
      `Arabic Text:\n${hadith.textArabic}\n\n` +
      `English Translation:\n"${hadith.textEnglish}"\n\n` +
      `Key Takeaway: ${hadith.keyLesson}`;

    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in select-none">
      <div
        className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between shrink-0 bg-stone-50 dark:bg-stone-900/80">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold shadow-xs">
              <ShieldCheck className="w-4 h-4 text-white dark:text-black" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-black dark:text-white font-cinzel truncate">
                Authentic Reference Verification
              </h3>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 font-mono truncate">
                {hadith.reference}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-black dark:hover:text-white rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
            title="Close"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto space-y-3.5 text-xs">
          {/* Authenticity Grade Badge */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-black dark:text-white" />
              <div>
                <span className="font-bold text-black dark:text-white block text-[11px]">
                  Canonical Authenticity Grade:
                </span>
                <span className="font-mono text-xs font-bold text-black dark:text-white">
                  {hadith.grade}
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-bold text-[10px]">
              صحيح
            </span>
          </div>

          {/* Book & Chapter Details */}
          <div className="p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 space-y-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-0.5">
                Collection & Book
              </span>
              <p className="font-bold text-black dark:text-white text-xs">
                {hadith.collectionName} — #{hadith.hadithNumber}
              </p>
              <p className="text-[11px] text-stone-600 dark:text-stone-300">
                {hadith.bookName}
              </p>
            </div>

            <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-0.5">
                Chapter
              </span>
              <p className="font-medium text-stone-800 dark:text-stone-200 text-xs">
                {hadith.chapterName}
              </p>
            </div>
          </div>

          {/* Primary Narrator & Isnad */}
          <div className="p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                  Companion Narrator (الصحابي)
                </span>
                <p className="font-bold text-black dark:text-white text-xs">
                  {hadith.narrator}
                </p>
              </div>
              <span className="font-quran text-xs text-stone-700 dark:text-stone-300 font-bold" dir="rtl">
                {hadith.narratorArabic}
              </span>
            </div>

            <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-0.5">
                Chain of Transmission (الإسناد)
              </span>
              <p className="font-mono text-[10.5px] text-stone-600 dark:text-stone-400 leading-relaxed">
                {hadith.isnadBrief}
              </p>
            </div>
          </div>

          {/* Clean, Dark Arabic Text Preview */}
          <div className="p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 text-right space-y-1.5" dir="rtl">
            <span className="text-[10px] font-sans font-bold text-stone-500 block text-left" dir="ltr">
              Arabic Text (Clean Dark Font):
            </span>
            <p className="font-quran text-sm sm:text-base text-stone-950 dark:text-stone-50 leading-[2.2] font-bold font-arabic-clean">
              {hadith.textArabic}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3.5 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex items-center justify-between gap-2 shrink-0">
          <button
            onClick={handleCopyCitation}
            className="flex-1 py-2 px-3 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-black dark:text-white"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-black dark:text-white" />
                <span>Copied Reference</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Full Reference</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-bold text-xs transition-all shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
