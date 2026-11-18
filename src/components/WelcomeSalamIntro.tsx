import React from 'react';

interface WelcomeSalamIntroProps {
  onContinue: () => void;
}

const CornerOrnament: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    className={`w-10 h-10 text-black/20 dark:text-white/25 pointer-events-none ${className}`}
    aria-hidden="true"
  >
    <path
      d="M4 44V16C4 9.373 9.373 4 16 4H44"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    <path
      d="M10 38V18C10 13.582 13.582 10 18 10H38"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeDasharray="2 2"
    />
    <path
      d="M16 4L20 12L28 16L20 20L16 28L12 20L4 16L12 12L16 4Z"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

const CalligraphicDivider: React.FC = () => (
  <div className="flex items-center justify-center gap-2.5 w-full max-w-[230px] mx-auto animate-intro-line">
    <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-black/60 dark:to-white/60" />
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-4 h-4 text-black dark:text-white shrink-0"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="5"
        width="14"
        height="14"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <rect
        x="5"
        y="5"
        width="14"
        height="14"
        transform="rotate(45 12 12)"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
    <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-black/60 dark:to-white/60" />
  </div>
);

export const WelcomeSalamIntro: React.FC<WelcomeSalamIntroProps> = ({ onContinue }) => {
  return (
    <div
      className="absolute inset-0 z-50 h-full w-full bg-white text-black dark:bg-black dark:text-white flex flex-col justify-between p-4 sm:p-5 safe-top-zone safe-bottom-zone overflow-hidden select-none"
      role="dialog"
      aria-label="An-Nur Calligraphic Salam Introduction"
    >
      {/* Illuminated Monochrome Frame Border & Corner Arabesque */}
      <div className="relative flex-1 flex flex-col justify-center gap-5 sm:gap-6 rounded-3xl border border-black/15 dark:border-white/20 px-4 py-6 sm:px-6 sm:py-8 overflow-hidden">
        <CornerOrnament className="absolute top-2 left-2" />
        <CornerOrnament className="absolute top-2 right-2 rotate-90" />
        <CornerOrnament className="absolute bottom-2 left-2 -rotate-90" />
        <CornerOrnament className="absolute bottom-2 right-2 rotate-180" />

        {/* 1. Centered Sacred Calligraphic Emblem */}
        <div className="flex flex-col items-center text-center shrink-0 animate-intro-emblem">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-black/40 dark:border-white/40 animate-intro-halo pointer-events-none" />
            <svg
              viewBox="0 0 48 48"
              fill="none"
              className="absolute inset-0 w-12 h-12 text-black dark:text-white"
              aria-hidden="true"
            >
              <rect
                x="10"
                y="10"
                width="28"
                height="28"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <rect
                x="10"
                y="10"
                width="28"
                height="28"
                rx="2"
                transform="rotate(45 24 24)"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
            <span className="font-scheherazade text-2xl font-bold text-black dark:text-white leading-none relative z-10">
              ن
            </span>
          </div>
          <span className="font-cinzel font-bold text-[11px] tracking-[0.26em] uppercase text-stone-700 dark:text-stone-300 mt-1.5">
            An-Nur · النور
          </span>
        </div>

        {/* 2. Ornate Animated Full Salam Calligraphy */}
        <div className="text-center space-y-2.5 shrink-0 animate-intro-salam">
          <p
            dir="rtl"
            className="font-scheherazade text-[28px] sm:text-[31px] font-bold text-black dark:text-white leading-[1.65]"
          >
            السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ
          </p>

          <CalligraphicDivider />

          <div className="space-y-0.5 pt-0.5">
            <p className="font-cinzel font-bold text-xs tracking-wider text-black dark:text-white">
              Assalamu ‘Alaykum wa Rahmatullahi wa Barakatuh
            </p>
            <p className="font-book-serif italic text-[11px] text-stone-600 dark:text-stone-400">
              May Allah’s peace, mercy, and endless blessings encompass you
            </p>
          </div>
        </div>

        {/* 3. Illuminated Quran Ayah Block (No Scroll) */}
        <section className="w-full px-4 py-3.5 sm:py-4 rounded-2xl bg-stone-50/90 dark:bg-stone-950/90 border border-black/15 dark:border-white/20 text-center space-y-2 shrink-0 animate-intro-quran">
          <div className="flex items-center justify-center gap-2 text-[10px] font-cinzel font-bold uppercase tracking-[0.18em] text-stone-600 dark:text-stone-400">
            <span>۞</span>
            <span>Surah Ash-Sharh · 94:5–6</span>
            <span>۞</span>
          </div>

          <p
            dir="rtl"
            className="font-quran text-xl sm:text-[22px] font-bold text-black dark:text-white leading-[1.8]"
          >
            فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا
          </p>

          <p className="font-book-serif text-xs text-stone-800 dark:text-stone-200 leading-snug">
            “For indeed, with hardship comes ease. Indeed, with every hardship comes ease.”
          </p>
        </section>

        {/* 4. Single Calligraphic Bismillah Button */}
        <div className="w-full pt-1 shrink-0 animate-intro-cta">
          <button
            onClick={onContinue}
            className="min-h-[50px] w-full px-5 py-2.5 rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold flex items-center justify-center gap-3 active:scale-[0.985] transition-transform shadow-sm border border-black dark:border-white"
          >
            <span dir="rtl" className="font-scheherazade text-xl font-bold leading-none">
              بِسْمِ اللَّهِ
            </span>
            <span className="h-4 w-[1px] bg-white/30 dark:bg-black/30" />
            <span className="font-cinzel text-xs tracking-[0.18em] uppercase font-bold">
              Bismillah
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
