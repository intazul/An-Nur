import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Sparkles,
  Heart,
  Quote,
  FileText,
  Play,
  Bookmark,
  Copy,
  Check,
  Languages,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { Ayah, SurahDetail, WaqfSignInfo } from '../types/quran';
import { getInDepthTafsir, getRelatedHadith } from '../utils/hadithDatabase';
import { getVerseWaqfSigns } from '../data/tajweedSigns';

interface TafsirModalProps {
  isOpen: boolean;
  onClose: () => void;
  ayah: Ayah | null;
  surah: SurahDetail | null;
  onPlayAyah?: (ayahNumber: number) => void;
  onBookmarkAyah?: (ayahNumber: number) => void;
}

type TafsirTab = 'overview' | 'tafsir' | 'hadith' | 'tajweed';

export const TafsirModal: React.FC<TafsirModalProps> = ({
  isOpen,
  onClose,
  ayah,
  surah,
  onPlayAyah,
  onBookmarkAyah,
}) => {
  const [activeTab, setActiveTab] = useState<TafsirTab>('overview');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !ayah || !surah) return null;

  const deepTafsir =
    ayah.deepTafsir ||
    getInDepthTafsir(
      surah.number,
      ayah.numberInSurah,
      surah.nameEnglish,
      ayah.textArabic,
      ayah.textEnglish
    );

  const relatedHadith =
    ayah.relatedHadith || getRelatedHadith(surah.number, ayah.numberInSurah);

  const waqfSigns = getVerseWaqfSigns(surah.number, ayah.numberInSurah, ayah.textArabic);

  const handleCopyAll = () => {
    let text = `${ayah.textArabic}\n\n`;
    text += `English: ${ayah.textEnglish}\n\n`;
    if (ayah.textUrdu) {
      text += `Urdu: ${ayah.textUrdu}\n\n`;
    }
    text += `Tafsir Summary: ${ayah.tafsirSummary || deepTafsir.classicalExegesis}\n\n`;
    if (relatedHadith) {
      text += `Related Hadith (${relatedHadith.source}): "${relatedHadith.textEnglish}"\n\n`;
    }
    text += `[Holy Quran ${surah.nameEnglish} ${surah.number}:${ayah.numberInSurah}]`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div
        className="w-full max-w-md h-full sm:h-[92vh] bg-white dark:bg-stone-900 rounded-none sm:rounded-3xl border-0 sm:border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Drag Handle on Android */}
        <div className="w-10 h-1.5 bg-stone-300 dark:bg-stone-700 rounded-full mx-auto mt-2.5 mb-1 sm:hidden" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-cinzel truncate">
                Ayah {ayah.numberInSurah} Details & Tafsir
              </h3>
              <p className="text-xs text-stone-500 truncate">
                Surah {surah.nameEnglish} ({surah.nameArabic}) · Juz {ayah.juz || 1}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* Quick Copy */}
            <button
              onClick={handleCopyAll}
              className="p-2 text-stone-500 hover:text-black dark:hover:text-white rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Copy All Details"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Close Tab"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Segmented Navigation Tabs - Targeted Element with No Vertical Scrolling */}
        <div className="px-4 py-2 border-b border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/40 flex items-center gap-1 overflow-x-auto overflow-y-hidden no-scrollbar select-none shrink-0">
          {[
            { id: 'overview', label: 'Translation', icon: Languages },
            { id: 'tafsir', label: 'Full Tafsir', icon: FileText },
            { id: 'hadith', label: 'Hadith', icon: Quote },
            { id: 'tajweed', label: 'Tajweed', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TafsirTab)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-2xs'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content - Zero Vertical Scrolling */}
        <div className="flex-1 overflow-hidden p-4 sm:p-5 flex flex-col justify-between gap-3">
          {/* Compact Top Sacred Arabic Verse */}
          <div
            className="p-3 rounded-2xl bg-[#fdfbf7] dark:bg-stone-950 border border-amber-600/30 text-right shadow-2xs select-text shrink-0"
            dir="rtl"
          >
            <p className="font-quran text-lg sm:text-xl text-stone-950 dark:text-stone-100 leading-relaxed">
              {ayah.textArabic}
              <span className="inline-block mr-2 text-amber-600 dark:text-amber-400 font-cinzel text-sm">
                ۝ {ayah.numberInSurah}
              </span>
            </p>
          </div>

          {/* TAB 1: OVERVIEW & TRANSLATIONS - ZERO VERTICAL SCROLL */}
          {activeTab === 'overview' && (
            <div className="flex-1 flex flex-col justify-between gap-2.5 animate-in fade-in duration-150 overflow-hidden">
              {/* Highlighted English Translation (Primary user requirement) */}
              <div className="p-3.5 rounded-2xl border-2 border-amber-500/30 bg-amber-500/5 dark:bg-amber-950/20 space-y-1 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-widest font-cinzel">
                    English Translation (Saheeh International)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-900 dark:text-amber-200 font-semibold">
                    English
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-stone-900 dark:text-stone-100 leading-relaxed font-sans-ui">
                  {ayah.textEnglish}
                </p>
              </div>

              {/* Urdu Translation */}
              {ayah.textUrdu && (
                <div
                  className="p-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-right space-y-0.5 shadow-2xs"
                  dir="rtl"
                >
                  <div className="flex items-center justify-between" dir="ltr">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                      اردو ترجمہ (مولانا فتح محمد جالندھری)
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-semibold">
                      Urdu
                    </span>
                  </div>
                  <p className="text-sm font-urdu text-stone-900 dark:text-stone-100 leading-relaxed">
                    {ayah.textUrdu}
                  </p>
                </div>
              )}

              {/* Quick Jump Buttons to Tafsir & Hadiths */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => setActiveTab('tafsir')}
                  className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 hover:bg-stone-100 dark:hover:bg-stone-800 text-left transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 font-cinzel">
                    <FileText className="w-3.5 h-3.5 text-amber-500" />
                    <span>Classical Tafsir →</span>
                  </div>
                  <p className="text-[11px] text-stone-500 truncate mt-0.5">
                    Ibn Kathir & Asbab al-Nuzul
                  </p>
                </button>

                <button
                  onClick={() => setActiveTab('hadith')}
                  className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 hover:bg-stone-100 dark:hover:bg-stone-800 text-left transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 font-cinzel">
                    <Quote className="w-3.5 h-3.5 text-amber-500" />
                    <span>Related Hadith →</span>
                  </div>
                  <p className="text-[11px] text-stone-500 truncate mt-0.5">
                    {relatedHadith?.source || 'Prophetic tradition'}
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: FULL DEPTH TAFSIR - ZERO VERTICAL SCROLL */}
          {activeTab === 'tafsir' && (
            <div className="flex-1 flex flex-col justify-between gap-2.5 animate-in fade-in duration-150 overflow-hidden">
              {/* Classical Exegesis (Ibn Kathir & Scholars) */}
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider font-cinzel">
                  <FileText className="w-3.5 h-3.5 text-amber-500" />
                  <span>Classical Exegesis (Ibn Kathir & Al-Qurtubi)</span>
                </div>
                <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                  {deepTafsir.classicalExegesis}
                </p>
              </div>

              {/* Context of Revelation (Asbab al-Nuzul) */}
              {deepTafsir.asbabAlNuzul && (
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider font-cinzel">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Context of Revelation (Asbab al-Nuzul)</span>
                  </div>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    {deepTafsir.asbabAlNuzul}
                  </p>
                </div>
              )}

              {/* Actionable Spiritual Takeaway */}
              {deepTafsir.spiritualTakeaway && (
                <div className="p-3 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider font-cinzel">
                    <Heart className="w-3.5 h-3.5 fill-emerald-500/20" />
                    <span>Actionable Spiritual Takeaway</span>
                  </div>
                  <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                    {deepTafsir.spiritualTakeaway}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: RELATED PROPHETIC HADITH - ZERO VERTICAL SCROLL */}
          {activeTab === 'hadith' && (
            <div className="flex-1 flex flex-col justify-between gap-2.5 animate-in fade-in duration-150 overflow-hidden">
              {relatedHadith ? (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/20 border-2 border-amber-500/30 flex-1 flex flex-col justify-between gap-2 overflow-hidden">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-800 dark:text-amber-300">
                    <div className="flex items-center gap-1.5 font-cinzel">
                      <Quote className="w-3.5 h-3.5" />
                      <span>Authentic Prophetic Hadith</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-900 dark:text-amber-200 font-semibold">
                      {relatedHadith.source}
                    </span>
                  </div>

                  <div className="text-[11px] text-stone-500 italic">
                    Narrated by: {relatedHadith.narrator}
                  </div>

                  {/* English Hadith Text */}
                  <div className="p-3 rounded-xl bg-white/80 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800">
                    <p className="text-xs text-stone-900 dark:text-stone-100 font-medium leading-relaxed italic">
                      "{relatedHadith.textEnglish}"
                    </p>
                  </div>

                  {/* Scholarly Relevance Explanation */}
                  <div className="p-2.5 rounded-xl bg-amber-500/15 text-xs text-amber-900 dark:text-amber-200 space-y-0.5">
                    <span className="font-bold block uppercase tracking-wider text-[10px]">
                      Why this Hadith illuminates Ayah {ayah.numberInSurah}:
                    </span>
                    <p className="leading-relaxed text-[11px]">{relatedHadith.relevance}</p>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-stone-500 space-y-2 my-auto">
                  <Quote className="w-8 h-8 mx-auto opacity-40" />
                  <p className="text-xs font-medium">
                    No verse-specific Hadith recorded for this exact Ayah.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: TAJWEED & METADATA - ZERO VERTICAL SCROLL */}
          {activeTab === 'tajweed' && (
            <div className="flex-1 flex flex-col justify-between gap-2.5 animate-in fade-in duration-150 overflow-hidden">
              {/* Verse Metadata Summary */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800">
                  <span className="text-[10px] text-stone-400 block font-semibold uppercase">
                    Surah Position
                  </span>
                  <span className="font-bold text-stone-900 dark:text-stone-100 font-cinzel">
                    Verse {ayah.numberInSurah} of {surah.numberOfAyahs}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800">
                  <span className="text-[10px] text-stone-400 block font-semibold uppercase">
                    Revelation Place
                  </span>
                  <span className="font-bold text-stone-900 dark:text-stone-100 font-cinzel">
                    {surah.revelationType} Period
                  </span>
                </div>
              </div>

              {/* Tajweed Stopping Signs Found in This Ayah */}
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 space-y-2 flex-1 overflow-hidden flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider font-cinzel">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Stopping Rules in this Verse</span>
                </div>

                {waqfSigns.length > 0 ? (
                  <div className="space-y-1.5">
                    {waqfSigns.map((sign, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex items-center gap-2.5"
                      >
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-quran text-sm font-bold shrink-0 border ${sign.badgeColor}`}
                        >
                          {sign.symbol}
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                            {sign.name} ({sign.arabicName})
                          </div>
                          <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium truncate">
                            {sign.ruleSimple}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-stone-500">
                    Standard continuous recitation rules apply. Stop comfortably at the end of the
                    verse marker ۝ {ayah.numberInSurah}.
                  </p>
                )}

                {deepTafsir.linguisticInsights && (
                  <div className="pt-1 text-[11px] text-stone-600 dark:text-stone-400 line-clamp-2">
                    <strong className="text-stone-800 dark:text-stone-200">Linguistic Insight:</strong> {deepTafsir.linguisticInsights}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Quick Action Bar (Play Audio, Bookmark, Close) */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/50 flex items-center justify-between gap-2">
          {onPlayAyah && (
            <button
              onClick={() => {
                onPlayAyah(ayah.numberInSurah);
              }}
              className="flex-1 py-3 px-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Listen Ayah</span>
            </button>
          )}

          {onBookmarkAyah && (
            <button
              onClick={() => {
                onBookmarkAyah(ayah.numberInSurah);
              }}
              className="py-3 px-4 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-amber-500 font-semibold text-xs transition-colors active:scale-95 flex items-center justify-center gap-1.5"
              title="Bookmark this verse"
            >
              <Bookmark className="w-4 h-4" />
              <span>Bookmark</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-semibold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
