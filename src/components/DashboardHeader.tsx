import React from 'react';
import {
  Moon,
  Sun,
  Sparkles,
  Bookmark,
  Bell,
  HeartHandshake,
  Download,
  Search,
} from 'lucide-react';
import { UserProfileData } from '../types/quran';

interface DashboardHeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  glowMode: UserProfileData['arabicGlowMode'];
  onChangeGlowMode: (mode: UserProfileData['arabicGlowMode']) => void;
  streak: number;
  onOpenImanTracker: () => void;
  onOpenProfile: () => void;
  onOpenOfflineManager: () => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  bookmarkCount: number;
  offlineCount: number;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  glowMode,
  onChangeGlowMode,
  streak,
  onOpenImanTracker,
  onOpenProfile,
  onOpenOfflineManager,
  onOpenSearch,
  onOpenNotifications,
  bookmarkCount,
  offlineCount,
}) => {
  const cycleGlow = () => {
    const modes: UserProfileData['arabicGlowMode'][] = ['gold', 'emerald', 'lunar', 'off'];
    const nextIdx = (modes.indexOf(glowMode) + 1) % modes.length;
    onChangeGlowMode(modes[nextIdx]);
  };

  const getGlowLabel = () => {
    switch (glowMode) {
      case 'gold':
        return 'Golden Glow';
      case 'emerald':
        return 'Emerald Glow';
      case 'lunar':
        return 'Lunar Glow';
      case 'off':
        return 'Glow Off';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 flex items-center justify-center font-cinzel font-bold text-lg shadow-sm">
            ن
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel font-bold text-lg sm:text-xl tracking-tight text-stone-900 dark:text-stone-100">
                An-Nur Quran
              </span>
              <span className="font-quran text-amber-600 dark:text-amber-400 text-base sm:text-lg select-none">
                القرآن الكريم
              </span>
            </div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
              <span>Recitation</span>
              <span aria-hidden="true">·</span>
              <span>English & Urdu</span>
              <span aria-hidden="true">·</span>
              <span>Tafsir</span>
            </div>
          </div>
        </div>

        {/* Central / Quick Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded-lg transition-colors whitespace-nowrap"
            title="Search Surahs and Verses (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-stone-500" />
            <span className="hidden sm:inline">Search</span>
          </button>

          {/* Arabic Glow Toggle */}
          <button
            onClick={cycleGlow}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap ${
              glowMode !== 'off'
                ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30'
                : 'text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:bg-stone-200 dark:hover:bg-stone-800'
            }`}
            title="Toggle Arabic Word Glow for Night Reading"
          >
            <Sparkles
              className={`w-3.5 h-3.5 ${
                glowMode === 'gold'
                  ? 'text-amber-500 fill-amber-500/20'
                  : glowMode === 'emerald'
                  ? 'text-emerald-500 fill-emerald-500/20'
                  : glowMode === 'lunar'
                  ? 'text-cyan-400'
                  : 'text-stone-400'
              }`}
            />
            <span className="hidden md:inline">{getGlowLabel()}</span>
          </button>

          {/* High-Contrast Light / Night Mode Switch */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded-lg transition-colors"
            title={darkMode ? 'Switch to High-Contrast Light Mode' : 'Switch to High-Contrast Night Mode'}
            aria-label="Toggle Night Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
          </button>

          {/* Iman Tracker Quick Access */}
          <button
            onClick={onOpenImanTracker}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm transition-colors whitespace-nowrap"
            title="Iman Tracker, Prayers & Tasbih"
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Iman Tracker</span>
            <span className="px-1.5 py-0.2 bg-emerald-800/60 rounded text-[10px] font-semibold">
              {streak}d
            </span>
          </button>

          {/* Profile & Bookmarks */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded-lg transition-colors whitespace-nowrap"
            title="Profile, Audio Bookmarks & Spiritual Goals"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="hidden md:inline">Bookmarks</span>
            {bookmarkCount > 0 && (
              <span className="w-4 h-4 text-[10px] font-semibold bg-amber-500 text-white rounded-full flex items-center justify-center">
                {bookmarkCount}
              </span>
            )}
          </button>

          {/* Offline Downloads */}
          <button
            onClick={onOpenOfflineManager}
            className="p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded-lg transition-colors relative"
            title="Offline Downloads Manager"
          >
            <Download className="w-4 h-4" />
            {offlineCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
            )}
          </button>

          {/* Reminders / Notifications */}
          <button
            onClick={onOpenNotifications}
            className="p-2 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded-lg transition-colors"
            title="Push Notification Reminders for Prayers & Reflection"
          >
            <Bell className="w-4 h-4 text-stone-600 dark:text-stone-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
