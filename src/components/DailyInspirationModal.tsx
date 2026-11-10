import React, { useState, useRef } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Download,
  Sparkles,
  BookOpen,
  Quote,
} from 'lucide-react';
import { DailyInspirationItem, getTodaysInspirations } from '../data/dailyInspirations';

interface DailyInspirationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyInspirationModal: React.FC<DailyInspirationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'ayah' | 'hadith'>('ayah');
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const inspirations = getTodaysInspirations();
  const activeItem: DailyInspirationItem = activeTab === 'ayah' ? inspirations.ayah : inspirations.hadith;

  if (!isOpen) return null;

  const handleCopy = () => {
    const textToCopy = `"${activeItem.arabicText}"\n\n${activeItem.englishText}\n\n— ${activeItem.reference}\n(An-Nur Quran & Hadith)`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // High-DPI Canvas Card Generator for WhatsApp & Instagram sharing
  const handleExportCard = async () => {
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

    // 1. Background (Deep obsidian / dark slate with subtle vignette)
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#0c0a09');
    bgGrad.addColorStop(0.5, '#1c1917');
    bgGrad.addColorStop(1, '#09090b');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Decorative Double Border with Gold Accents
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(55, 55, width - 110, height - 110);

    // 3. Header: App Watermark & Badge
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 36px serif';
    ctx.textAlign = 'center';
    ctx.fillText('AN-NUR • القرآن الكريم', width / 2, 140);

    ctx.fillStyle = '#a8a29e';
    ctx.font = '600 24px sans-serif';
    ctx.fillText(
      activeTab === 'ayah' ? 'AYAH OF THE DAY' : 'HADITH OF THE DAY',
      width / 2,
      180
    );

    // 4. Category / Theme Pill
    ctx.fillStyle = '#d97706';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText(`“${activeItem.theme.toUpperCase()}”`, width / 2, 240);

    // 5. Arabic Calligraphy
    ctx.fillStyle = '#fef3c7';
    ctx.font = 'bold 50px "Amiri", "Scheherazade New", serif';
    ctx.textAlign = 'center';
    ctx.direction = 'rtl';

    // Wrap Arabic text
    const wrapArabic = (text: string, maxWidth: number) => {
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

    const arabicLines = wrapArabic(activeItem.arabicText, width - 200);
    let startY = 400;
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

    const wrapEnglish = (text: string, maxWidth: number) => {
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

    const englishLines = wrapEnglish(`"${activeItem.englishText}"`, width - 220);
    englishLines.forEach((line) => {
      ctx.fillText(line, width / 2, startY);
      startY += 48;
    });

    // 8. Reference Badge & Reflection
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(`— ${activeItem.reference}`, width / 2, height - 190);

    ctx.fillStyle = '#78716c';
    ctx.font = 'italic 22px sans-serif';
    ctx.fillText(activeItem.reflection, width / 2, height - 130);

    // Export image blob
    canvas.toBlob(async (blob) => {
      setIsExporting(false);
      if (!blob) return;

      const file = new File([blob], `annur_${activeTab}_of_the_day.png`, {
        type: 'image/png',
      });

      // Try Native Mobile Web Share if supported
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: `${activeTab === 'ayah' ? 'Ayah' : 'Hadith'} of the Day`,
            text: `${activeItem.englishText} — ${activeItem.reference}`,
          });
          return;
        } catch {
          // fallback to download
        }
      }

      // Fallback: direct download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `annur_${activeTab}_of_the_day.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in select-none">
      <div
        className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold text-sm">
              ✨
            </div>
            <div>
              <h2 className="text-base font-bold text-black dark:text-white font-cinzel">
                Daily Inspiration
              </h2>
              <span className="text-xs text-stone-500">
                Rotates fresh every dawn • Ready to share
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-black dark:hover:text-white rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Ayah vs Hadith */}
        <div className="p-3 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => setActiveTab('ayah')}
              className={`flex items-center justify-center gap-2 py-2 rounded-xl font-bold transition-all ${
                activeTab === 'ayah'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Ayah of the Day</span>
            </button>
            <button
              onClick={() => setActiveTab('hadith')}
              className={`flex items-center justify-center gap-2 py-2 rounded-xl font-bold transition-all ${
                activeTab === 'hadith'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
              }`}
            >
              <Quote className="w-4 h-4" />
              <span>Hadith of the Day</span>
            </button>
          </div>
        </div>

        {/* Center Display Card */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="p-5 rounded-3xl bg-linear-to-b from-stone-900 to-black text-white border-2 border-amber-500/30 shadow-xl space-y-4 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[11px] uppercase tracking-wider">
              {activeItem.theme}
            </span>

            {/* Arabic */}
            <p
              className="font-quran text-2xl sm:text-3xl text-amber-100 font-bold leading-relaxed pt-1"
              dir="rtl"
            >
              {activeItem.arabicText}
            </p>

            {/* English */}
            <p className="text-sm text-stone-200 leading-relaxed font-medium">
              "{activeItem.englishText}"
            </p>

            {/* Reference */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="font-bold text-amber-400">{activeItem.reference}</span>
              <span className="text-[10px] text-stone-400">An-Nur Companion</span>
            </div>
          </div>

          {/* Spiritual Reflection Takeaway */}
          <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300 space-y-1">
            <span className="font-bold text-black dark:text-white uppercase tracking-wider text-[10px] block">
              Spiritual Reflection
            </span>
            <p className="leading-relaxed italic">{activeItem.reflection}</p>
          </div>
        </div>

        {/* Action Buttons: Export Card / Copy */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2.5">
          <button
            onClick={handleCopy}
            className="flex-1 h-12 rounded-2xl bg-stone-100 dark:bg-stone-800 text-black dark:text-white hover:bg-stone-200 dark:hover:bg-stone-700 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleExportCard}
            disabled={isExporting}
            className="flex-1 h-12 rounded-2xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
          >
            {isExporting ? (
              <span className="animate-spin">⏳</span>
            ) : (
              <Share2 className="w-4 h-4" />
            )}
            <span>{isExporting ? 'Generating...' : 'Export Card (Story)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
