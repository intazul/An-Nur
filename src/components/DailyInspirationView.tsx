import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Share2,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  Quote,
  Heart,
  PenLine,
  BookmarkCheck,
  Calendar,
  Layers,
} from 'lucide-react';
import { DailyInspirationItem, getTodaysInspirations } from '../data/dailyInspirations';
import { playGentleChime } from '../utils/notifications';

interface DailyInspirationViewProps {
  onBackToDashboard: () => void;
}

interface SavedJournalEntry {
  id: string;
  date: string;
  theme: string;
  text: string;
  mood: string;
}

export const DailyInspirationView: React.FC<DailyInspirationViewProps> = ({
  onBackToDashboard,
}) => {
  const [activeTab, setActiveTab] = useState<'wisdom' | 'journal' | 'exegesis'>('wisdom');
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportTheme, setExportTheme] = useState<'obsidian' | 'emerald' | 'gold'>('obsidian');

  // Checkpoints for animated completion ring
  const [readAyah, setReadAyah] = useState<boolean>(() => {
    try {
      return localStorage.getItem('annur_insp_ayah_read') === 'true';
    } catch {
      return false;
    }
  });
  const [readHadith, setReadHadith] = useState<boolean>(() => {
    try {
      return localStorage.getItem('annur_insp_hadith_read') === 'true';
    } catch {
      return false;
    }
  });

  // Journal note state
  const [journalNote, setJournalNote] = useState('');
  const [selectedMood, setSelectedMood] = useState('Grateful');
  const [savedEntries, setSavedEntries] = useState<SavedJournalEntry[]>(() => {
    try {
      const saved = localStorage.getItem('annur_inspiration_journal');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const inspirations = getTodaysInspirations();
  const todayDateString = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Calculate animated reflection score (0%, 33%, 66%, 100%)
  const hasJournalToday = savedEntries.some(
    (e) => e.date === new Date().toISOString().split('T')[0]
  );
  let score = 0;
  if (readAyah) score += 33;
  if (readHadith) score += 33;
  if (hasJournalToday || journalNote.trim().length > 5) score += 34;
  const reflectionPercent = Math.min(100, score);

  // Circumference for animated percent ring
  const ringRadius = 45;
  const ringCircumference = 2 * Math.PI * ringRadius; // ~282.7
  const ringOffset = ringCircumference - (ringCircumference * reflectionPercent) / 100;

  const handleCopyWisdom = (item: DailyInspirationItem) => {
    const textToCopy = `"${item.arabicText}"\n\n${item.englishText}\n\n— ${item.reference}\n(An-Nur Sacred Companion)`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveJournalNote = () => {
    if (!journalNote.trim()) return;
    const today = new Date().toISOString().split('T')[0];
    const newEntry: SavedJournalEntry = {
      id: `entry_${Date.now()}`,
      date: today,
      theme: inspirations.ayah.theme,
      text: journalNote.trim(),
      mood: selectedMood,
    };
    const updated = [newEntry, ...savedEntries];
    setSavedEntries(updated);
    try {
      localStorage.setItem('annur_inspiration_journal', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setJournalNote('');
    playGentleChime();
  };

  // High-DPI Story Card Exporter with theme selection
  const handleExportCard = async (item: DailyInspirationItem, type: 'Ayah' | 'Hadith') => {
    setIsExporting(true);
    const canvas = document.createElement('canvas');
    const width = 1080;
    const height = 1350;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsExporting(false);
      return;
    }

    // 1. Theme-based gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    if (exportTheme === 'emerald') {
      bgGrad.addColorStop(0, '#022c22');
      bgGrad.addColorStop(0.5, '#064e3b');
      bgGrad.addColorStop(1, '#022c22');
    } else if (exportTheme === 'gold') {
      bgGrad.addColorStop(0, '#451a03');
      bgGrad.addColorStop(0.5, '#78350f');
      bgGrad.addColorStop(1, '#291003');
    } else {
      bgGrad.addColorStop(0, '#0c0a09');
      bgGrad.addColorStop(0.5, '#1c1917');
      bgGrad.addColorStop(1, '#09090b');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Double border
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(55, 55, width - 110, height - 110);

    // 3. Header Branding
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 36px serif';
    ctx.textAlign = 'center';
    ctx.fillText('AN-NUR • القرآن الكريم', width / 2, 140);

    ctx.fillStyle = '#a8a29e';
    ctx.font = '600 24px sans-serif';
    ctx.fillText(`${type.toUpperCase()} OF THE DAY`, width / 2, 180);

    // 4. Category / Theme Pill
    ctx.fillStyle = '#d97706';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText(`“${item.theme.toUpperCase()}”`, width / 2, 240);

    // 5. Arabic Calligraphy
    ctx.fillStyle = '#fef3c7';
    ctx.font = 'bold 50px "Amiri", "Scheherazade New", serif';
    ctx.textAlign = 'center';
    ctx.direction = 'rtl';

    const wrapText = (text: string, maxWidth: number) => {
      const words = text.split(' ');
      const lines: string[] = [];
      let currentLine = words[0];
      for (let i = 1; i < words.length; i++) {
        const testLine = currentLine + ' ' + words[i];
        if (ctx.measureText(testLine).width < maxWidth) {
          currentLine = testLine;
        } else {
          lines.push(currentLine);
          currentLine = words[i];
        }
      }
      lines.push(currentLine);
      return lines;
    };

    const arabicLines = wrapText(item.arabicText, width - 200);
    let startY = 410;
    arabicLines.forEach((line) => {
      ctx.fillText(line, width / 2, startY);
      startY += 75;
    });

    // 6. Ornamental Divider
    ctx.direction = 'ltr';
    ctx.fillStyle = '#f59e0b';
    ctx.font = '28px serif';
    ctx.fillText('❖  ❖  ❖', width / 2, startY + 40);
    startY += 100;

    // 7. English Translation
    ctx.fillStyle = '#f5f5f4';
    ctx.font = '400 32px sans-serif';
    ctx.textAlign = 'center';

    const englishLines = wrapText(`"${item.englishText}"`, width - 220);
    englishLines.forEach((line) => {
      ctx.fillText(line, width / 2, startY);
      startY += 48;
    });

    // 8. Reference
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(`— ${item.reference}`, width / 2, height - 190);

    ctx.fillStyle = '#78716c';
    ctx.font = 'italic 22px sans-serif';
    ctx.fillText(item.reflection, width / 2, height - 130);

    // Export image blob
    canvas.toBlob(async (blob) => {
      setIsExporting(false);
      if (!blob) return;

      const file = new File([blob], `annur_${type.toLowerCase()}_of_the_day.png`, {
        type: 'image/png',
      });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: `${type} of the Day`,
            text: `${item.englishText} — ${item.reference}`,
          });
          return;
        } catch {
          // fallback
        }
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `annur_${type.toLowerCase()}_of_the_day.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  return (
    <div className="flex-1 flex flex-col justify-between max-w-md w-full mx-auto min-h-screen bg-stone-50 dark:bg-stone-950 px-5 py-3 overflow-y-auto select-none">
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between py-2 border-b border-stone-200 dark:border-stone-800">
        <button
          onClick={onBackToDashboard}
          className="p-2 -ml-2 text-black dark:text-white hover:bg-stone-200 dark:hover:bg-stone-900 rounded-full transition-colors active:scale-95"
          title="Back to Dashboard"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="text-center">
          <span className="text-[10px] uppercase tracking-widest text-stone-500 font-cinzel font-bold block">
            {todayDateString}
          </span>
          <h1 className="text-base font-bold text-black dark:text-white font-cinzel">
            Daily Divine Inspiration
          </h1>
        </div>

        <button
          onClick={() => handleCopyWisdom(inspirations.ayah)}
          className="p-2 -mr-1 rounded-xl bg-black text-white dark:bg-white dark:text-black transition-all active:scale-95 shadow-2xs"
          title="Copy Today's Wisdom"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* 2. Well-Animated Spiritual Reflection Progress Ring Banner */}
      <div className="my-3 p-4 rounded-3xl bg-linear-to-b from-stone-900 to-black text-white border-2 border-amber-500/30 shadow-xl flex items-center justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
            Contemplation Radiance
          </span>
          <h3 className="text-lg font-bold font-cinzel">
            {reflectionPercent === 100
              ? 'Heart Fully Illuminated ✨'
              : 'Daily Spiritual Reflection'}
          </h3>
          <p className="text-xs text-stone-300">
            {reflectionPercent === 100
              ? 'All daily reflections and journal thoughts recorded.'
              : 'Complete reading the Ayah, Hadith & write your insight.'}
          </p>
        </div>

        {/* Animated SVG Ring */}
        <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r={ringRadius}
              fill="none"
              stroke="#292524"
              strokeWidth="7"
            />
            <circle
              cx="50%"
              cy="50%"
              r={ringRadius}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="8"
              strokeDasharray={ringCircumference}
              strokeDashoffset={ringOffset}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
              style={{
                filter: 'drop-shadow(0px 0px 6px rgba(251, 191, 36, 0.5))',
              }}
            />
          </svg>
          <span className="absolute font-bold text-sm font-cinzel tabular-nums">
            {reflectionPercent}%
          </span>
        </div>
      </div>

      {/* 3. View Switcher Tabs */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-200/80 dark:bg-stone-900 rounded-2xl text-xs font-bold mb-3">
        <button
          onClick={() => setActiveTab('wisdom')}
          className={`py-2 rounded-xl transition-all text-center ${
            activeTab === 'wisdom'
              ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white'
          }`}
        >
          ✨ Today's Wisdom
        </button>
        <button
          onClick={() => setActiveTab('exegesis')}
          className={`py-2 rounded-xl transition-all text-center ${
            activeTab === 'exegesis'
              ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white'
          }`}
        >
          📖 Linguistic Exegesis
        </button>
        <button
          onClick={() => setActiveTab('journal')}
          className={`py-2 rounded-xl transition-all text-center ${
            activeTab === 'journal'
              ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white'
          }`}
        >
          ✍️ My Journal
        </button>
      </div>

      {activeTab === 'wisdom' && (
        <div className="space-y-4 flex-1">
          {/* Card 1: Ayah of the Day */}
          <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 shadow-md space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 text-[10px]">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Ayah of the Day • {inspirations.ayah.theme}</span>
              </span>
              <button
                onClick={() => {
                  setReadAyah(true);
                  try {
                    localStorage.setItem('annur_insp_ayah_read', 'true');
                  } catch {}
                  playGentleChime();
                }}
                className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full transition-all ${
                  readAyah
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-black dark:hover:text-white'
                }`}
              >
                <BookmarkCheck className="w-3 h-3" />
                <span>{readAyah ? 'Contemplated' : 'Mark Read'}</span>
              </button>
            </div>

            <p
              className="font-quran text-2xl sm:text-3xl text-black dark:text-amber-200 leading-relaxed font-bold text-right pt-1"
              dir="rtl"
            >
              {inspirations.ayah.arabicText}
            </p>

            <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
              "{inspirations.ayah.englishText}"
            </p>

            <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {inspirations.ayah.reference}
              </span>
              <button
                onClick={() => handleExportCard(inspirations.ayah, 'Ayah')}
                className="flex items-center gap-1 text-xs font-bold text-black dark:text-white hover:underline"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Export Story Card</span>
              </button>
            </div>
          </div>

          {/* Card 2: Hadith of the Day */}
          <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 shadow-md space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 text-[10px]">
                <Quote className="w-3.5 h-3.5" />
                <span>Sahih Hadith • {inspirations.hadith.theme}</span>
              </span>
              <button
                onClick={() => {
                  setReadHadith(true);
                  try {
                    localStorage.setItem('annur_insp_hadith_read', 'true');
                  } catch {}
                  playGentleChime();
                }}
                className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full transition-all ${
                  readHadith
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-black dark:hover:text-white'
                }`}
              >
                <BookmarkCheck className="w-3 h-3" />
                <span>{readHadith ? 'Contemplated' : 'Mark Read'}</span>
              </button>
            </div>

            <p
              className="font-quran text-2xl text-black dark:text-stone-100 leading-relaxed font-bold text-right pt-1"
              dir="rtl"
            >
              {inspirations.hadith.arabicText}
            </p>

            <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
              "{inspirations.hadith.englishText}"
            </p>

            <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {inspirations.hadith.reference}
              </span>
              <button
                onClick={() => handleExportCard(inspirations.hadith, 'Hadith')}
                className="flex items-center gap-1 text-xs font-bold text-black dark:text-white hover:underline"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Export Story Card</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'exegesis' && (
        <div className="space-y-4 flex-1">
          {/* Detailed Exegesis Breakdown */}
          <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
            <h3 className="text-sm font-bold text-black dark:text-white font-cinzel flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Deep Linguistic Exegesis</span>
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              {inspirations.ayah.reflection}
            </p>

            <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2 text-xs">
              <span className="font-bold uppercase tracking-wider text-[10px] text-amber-600 dark:text-amber-400 block">
                Quranic Linguistic Nuance
              </span>
              <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                In classical Arabic grammar, notice how hardship (*الْعُسْرِ*) is preceded by the definite article *Al-*, denoting a specific and finite difficulty, whereas ease (*يُسْرًا*) is indefinite, denoting boundless, multiplied divine relief.
              </p>
            </div>
          </div>

          {/* Social Story Card Theme Picker */}
          <div className="p-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
            <span className="text-xs font-bold text-black dark:text-white block">
              Story Card Theme Style
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { id: 'obsidian' as const, label: 'Obsidian Night' },
                { id: 'emerald' as const, label: 'Deep Emerald' },
                { id: 'gold' as const, label: 'Royal Gold' },
              ].map((th) => (
                <button
                  key={th.id}
                  onClick={() => setExportTheme(th.id)}
                  className={`py-2 px-1 rounded-xl border text-center font-bold transition-all ${
                    exportTheme === th.id
                      ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-2xs'
                      : 'bg-stone-50 dark:bg-stone-950 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800'
                  }`}
                >
                  {th.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'journal' && (
        <div className="space-y-4 flex-1">
          {/* Note Input */}
          <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
            <h3 className="text-sm font-bold text-black dark:text-white font-cinzel flex items-center gap-2">
              <PenLine className="w-4 h-4 text-emerald-500" />
              <span>Record Personal Spiritual Insight</span>
            </h3>

            {/* Mood selector */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
              {['Grateful', 'Seeking Strength', 'Repentant', 'At Peace', 'Reflective'].map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMood(m)}
                  className={`px-3 py-1.5 rounded-xl border whitespace-nowrap font-bold transition-all ${
                    selectedMood === m
                      ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                      : 'bg-stone-50 dark:bg-stone-950 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <textarea
              value={journalNote}
              onChange={(e) => setJournalNote(e.target.value)}
              placeholder="What did today's verse awaken in your soul? Note a moment of gratitude or a private prayer..."
              className="w-full h-28 p-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-black dark:text-white placeholder:text-stone-400 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <button
              onClick={handleSaveJournalNote}
              disabled={!journalNote.trim()}
              className="w-full py-3 rounded-2xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 disabled:opacity-40 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Save to Reflection Journal</span>
            </button>
          </div>

          {/* Past Notes Log */}
          {savedEntries.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-black dark:text-white block px-1">
                Your Saved Reflections ({savedEntries.length})
              </span>
              <div className="space-y-2">
                {savedEntries.map((e) => (
                  <div
                    key={e.id}
                    className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between text-[10px] text-stone-400 font-bold">
                      <span>{e.date}</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-700 dark:text-amber-300">
                        {e.mood}
                      </span>
                    </div>
                    <p className="text-stone-800 dark:text-stone-200 font-medium leading-relaxed">
                      "{e.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
