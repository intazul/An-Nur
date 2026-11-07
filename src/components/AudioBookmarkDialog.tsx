import React, { useState } from 'react';
import { Bookmark, X, Save } from 'lucide-react';
import { RECITERS } from '../data/reciters';

interface AudioBookmarkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  timestampSeconds: number;
  reciterId: string;
  onSave: (note: string) => void;
}

export const AudioBookmarkDialog: React.FC<AudioBookmarkDialogProps> = ({
  isOpen,
  onClose,
  surahNumber,
  surahName,
  ayahNumber,
  timestampSeconds,
  reciterId,
  onSave,
}) => {
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const reciter = RECITERS.find((r) => r.id === reciterId) || RECITERS[0];
  const minutes = Math.floor(timestampSeconds / 60);
  const seconds = Math.floor(timestampSeconds % 60);
  const formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(note);
    setNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500/20" />
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 font-cinzel">
              Create Audio Bookmark
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4">
          <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-950/70 border border-stone-200 dark:border-stone-800 space-y-1">
            <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Surah {surahName} : Ayah {ayahNumber}
            </div>
            <div className="text-xs text-stone-500">
              Reciter: {reciter.name} · Position: {formattedTime} ({Math.round(timestampSeconds)}s)
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
              Personal Note or Reflection (Optional)
            </label>
            <input
              type="text"
              autoFocus
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Heart-stirring recitation, To memorize next..."
              className="w-full px-3 py-2 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium rounded-lg shadow-sm transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Bookmark</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
