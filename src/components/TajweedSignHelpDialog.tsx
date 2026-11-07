import React from 'react';
import { X, Info, CheckCircle2 } from 'lucide-react';
import { WaqfSignInfo } from '../types/quran';

interface TajweedSignHelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
  sign: WaqfSignInfo | null;
}

export const TajweedSignHelpDialog: React.FC<TajweedSignHelpDialogProps> = ({
  isOpen,
  onClose,
  sign,
}) => {
  if (!isOpen || !sign) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="w-full max-w-sm bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Drag Handle */}
        <div className="w-10 h-1.5 bg-stone-300 dark:bg-stone-700 rounded-full mx-auto mt-3 mb-1 sm:hidden" />

        <div className="p-4 sm:p-5 text-center space-y-4">
          {/* Symbol Emblem */}
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 mx-auto flex items-center justify-center">
            <span className="font-quran text-3xl font-bold text-amber-700 dark:text-amber-300 select-none">
              {sign.symbol}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              {sign.name} · {sign.arabicName}
            </span>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-cinzel">
              {sign.ruleSimple}
            </h3>
          </div>

          {/* Simple Explanation Card */}
          <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-950/70 border border-stone-200 dark:border-stone-800 text-left space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>What To Do When Reading:</span>
            </div>
            <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans-ui">
              {sign.instruction}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full h-11 rounded-xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-semibold text-xs shadow-md transition-all active:scale-[0.98]"
          >
            Understood, Continue Reading
          </button>
        </div>
      </div>
    </div>
  );
};
