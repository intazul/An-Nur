import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Target,
  Flame,
  Bookmark,
  Play,
  Trash2,
  Bell,
  Download,
  Check,
  Volume2,
  Sparkles,
  RefreshCw,
  Loader2,
  Database,
  WifiOff,
} from 'lucide-react';
import { AudioBookmark, DownloadedSurahInfo, UserProfileData } from '../types/quran';
import {
  isNotificationSupported,
  playGentleChime,
  requestNotificationPermission,
  sendPushReminder,
} from '../utils/notifications';
import {
  downloadAllSurahsTextAndTafsir,
  downloadCoreAudioOffline,
  getOfflineCacheStats,
  getDownloadedSurahsList,
} from '../utils/offlineStorage';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfileData;
  onUpdateProfile: (updates: Partial<UserProfileData>) => void;
  streak: number;
  bestStreak: number;
  bookmarks: AudioBookmark[];
  onPlayBookmark: (bookmark: AudioBookmark) => void;
  onDeleteBookmark: (id: string) => void;
  downloadedSurahs: DownloadedSurahInfo[];
  onDeleteDownloadedSurah: (surahNumber: number) => void;
  onRefreshDownloadedSurahs?: () => void;
  initialTab?: 'profile' | 'bookmarks' | 'offline' | 'reminders';
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  streak,
  bestStreak,
  bookmarks,
  onPlayBookmark,
  onDeleteBookmark,
  downloadedSurahs,
  onDeleteDownloadedSurah,
  onRefreshDownloadedSurahs,
  initialTab = 'profile',
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'bookmarks' | 'offline' | 'reminders'>(initialTab);
  const [testNotificationSent, setTestNotificationSent] = useState(false);
  const [permissionState, setPermissionState] = useState<string>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'unsupported'
  );

  // Batch offline downloading state
  const [isDownloadingAllText, setIsDownloadingAllText] = useState(false);
  const [isDownloadingCoreAudio, setIsDownloadingCoreAudio] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<{
    current: number;
    total: number;
    label: string;
    percent: number;
  } | null>(null);
  const [cacheStats, setCacheStats] = useState<{
    surahsCount: number;
    audioFilesCount: number;
    totalKb: number;
  } | null>(null);

  // Refresh cache stats
  const refreshStats = () => {
    getOfflineCacheStats().then(setCacheStats).catch(() => {});
  };

  useEffect(() => {
    if (activeTab === 'offline') {
      refreshStats();
    }
  }, [activeTab, downloadedSurahs.length]);

  const handleDownloadAllText = async () => {
    setIsDownloadingAllText(true);
    setDownloadProgress({ current: 0, total: 114, label: 'Initializing offline storage...', percent: 0 });

    try {
      await downloadAllSurahsTextAndTafsir((info) => {
        const pct = Math.round((info.current / info.total) * 100);
        setDownloadProgress({
          current: info.current,
          total: info.total,
          label: `Saving Surah ${info.currentSurahName} (${info.current}/${info.total})`,
          percent: pct,
        });
      });
      playGentleChime();
      onRefreshDownloadedSurahs?.();
      refreshStats();
    } catch (err) {
      console.error('Batch download failed:', err);
    } finally {
      setIsDownloadingAllText(false);
      setDownloadProgress(null);
    }
  };

  const handleDownloadCoreAudio = async () => {
    setIsDownloadingCoreAudio(true);
    setDownloadProgress({ current: 0, total: 10, label: 'Connecting to audio cache...', percent: 0 });

    try {
      await downloadCoreAudioOffline(
        profile.favoriteSurahs || [],
        profile.preferredReciter,
        profile.preferredUrduReciter || 'shamshad',
        (info) => {
          const pct = Math.round((info.current / info.total) * 100);
          setDownloadProgress({
            current: info.current,
            total: info.total,
            label: `${info.step} (${info.current}/${info.total})`,
            percent: pct,
          });
        }
      );
      playGentleChime();
      onRefreshDownloadedSurahs?.();
      refreshStats();
    } catch (err) {
      console.error('Audio download failed:', err);
    } finally {
      setIsDownloadingCoreAudio(false);
      setDownloadProgress(null);
    }
  };

  if (!isOpen) return null;

  const handleEnableNotifications = async () => {
    const res = await requestNotificationPermission();
    setPermissionState(res);
    if (res === 'granted') {
      onUpdateProfile({ notificationsEnabled: true });
      sendPushReminder(
        'An-Nur Quran Notifications Enabled',
        'You will receive gentle reminders for daily prayers and evening reflection.'
      );
    }
  };

  const handleTestReminder = () => {
    sendPushReminder(
      'Fajr & Reflection Gentle Reminder',
      'Time to pause and reflect on Surah Al-Fatihah. "Guide us to the straight path."'
    );
    playGentleChime();
    setTestNotificationSent(true);
    setTimeout(() => setTestNotificationSent(false), 3000);
  };

  const totalOfflineKb = downloadedSurahs.reduce((acc, s) => acc + s.sizeKb, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 flex items-center justify-center font-bold font-cinzel">
              ن
            </div>
            <div>
              <h2 className="text-base font-semibold text-stone-900 dark:text-stone-100 font-cinzel">
                Profile, Goals & Audio Bookmarks
              </h2>
              <p className="text-xs text-stone-500">
                Personalized spiritual goals, offline cache, and notification alerts.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-navigation Controls */}
        <div className="flex items-center gap-1 px-4 sm:px-6 pt-3 border-b border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/40">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-black dark:border-white text-black dark:text-white'
                : 'border-transparent text-stone-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Spiritual Goals & Streaks
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'bookmarks'
                ? 'border-black dark:border-white text-black dark:text-white'
                : 'border-transparent text-stone-500 hover:text-black dark:hover:text-white'
            }`}
          >
            <span>Audio Bookmarks</span>
            <span className="px-1.5 py-0.2 rounded-full bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold">
              {bookmarks.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('offline')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'offline'
                ? 'border-black dark:border-white text-black dark:text-white'
                : 'border-transparent text-stone-500 hover:text-black dark:hover:text-white'
            }`}
          >
            <span>Offline Downloads</span>
            <span className="px-1.5 py-0.2 rounded-full bg-stone-200 dark:bg-stone-800 text-black dark:text-white text-[10px] font-bold">
              {downloadedSurahs.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('reminders')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'reminders'
                ? 'border-black dark:border-white text-black dark:text-white'
                : 'border-transparent text-stone-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Push Reminders
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: Goals & Streaks */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* User Identity & Motto */}
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Your Name or Spiritual Moniker
                </label>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-300">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => onUpdateProfile({ name: e.target.value })}
                    className="flex-1 px-3 py-2 text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>
              </div>

              {/* Streaks & Consistency Record */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    <Flame className="w-4 h-4 fill-current" />
                    <span>Current Streak</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-cinzel tabular-nums">
                    {streak} Days
                  </div>
                  <p className="text-[11px] opacity-80">
                    Consecutive daily reading & prayer
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400">
                    <Sparkles className="w-4 h-4 text-black dark:text-white" />
                    <span>Best Record</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-cinzel text-black dark:text-white tabular-nums">
                    {bestStreak} Days
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Personal spiritual record
                  </p>
                </div>
              </div>

              {/* Daily Quran Goal Setting */}
              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-black dark:text-white" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-black dark:text-white">
                      Daily Verse Reading Goal
                    </span>
                  </div>
                  <span className="text-sm font-bold font-cinzel text-black dark:text-white tabular-nums">
                    {profile.dailyVerseGoal} Verses / Day
                  </span>
                </div>

                <input
                  type="range"
                  min="3"
                  max="50"
                  step="1"
                  value={profile.dailyVerseGoal}
                  onChange={(e) => onUpdateProfile({ dailyVerseGoal: Number(e.target.value) })}
                  className="w-full accent-black dark:accent-white cursor-pointer"
                />

                <div className="flex justify-between text-[11px] text-stone-400">
                  <span>3 verses (Gentle)</span>
                  <span>10 verses (Balanced)</span>
                  <span>50 verses (Dedicated)</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Audio Bookmarks */}
          {activeTab === 'bookmarks' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  {bookmarks.length === 0
                    ? 'No audio bookmarks saved yet. Use the bookmark icon on any verse while listening.'
                    : `Showing ${bookmarks.length} saved recitation moments:`}
                </span>
              </div>

              {bookmarks.length === 0 ? (
                <div className="py-12 text-center space-y-2 border border-dashed border-stone-200 dark:border-stone-800 rounded-xl">
                  <Bookmark className="w-8 h-8 text-stone-300 dark:text-stone-600 mx-auto" />
                  <p className="text-xs text-stone-500">
                    Bookmarks store the exact timestamp and verse so you can resume listening instantly.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {bookmarks.map((bm) => (
                    <div
                      key={bm.id}
                      className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex items-center justify-between gap-3 group hover:border-black dark:hover:border-white transition-colors"
                    >
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-black dark:text-white text-sm">
                            Surah {bm.surahName} : Ayah {bm.ayahNumber}
                          </span>
                          <span className="text-[11px] text-stone-700 dark:text-stone-300 font-bold">
                            at {Math.floor(bm.timestampSeconds)}s
                          </span>
                        </div>
                        {bm.note && (
                          <p className="text-xs text-stone-600 dark:text-stone-300 italic">
                            "{bm.note}"
                          </p>
                        )}
                        <div className="text-[11px] text-stone-400 flex items-center gap-2">
                          <span>Reciter: {bm.reciterName}</span>
                          <span>·</span>
                          <span>{new Date(bm.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            onPlayBookmark(bm);
                            onClose();
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black rounded-lg text-xs font-bold transition-transform active:scale-95"
                          title="Resume recitation from this bookmark"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Resume</span>
                        </button>
                        <button
                          onClick={() => onDeleteBookmark(bm.id)}
                          className="p-1.5 text-stone-500 hover:text-black dark:hover:text-white rounded-lg transition-colors"
                          title="Delete bookmark"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Offline Downloads Manager */}
          {activeTab === 'offline' && (
            <div className="space-y-4">
              {/* Storage Overview Banner */}
              <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-black/10 dark:border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-black dark:text-white" />
                    <span className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                      Offline Storage & Cache
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-black dark:text-white">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>100% Offline Capable</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-stone-950 border border-black/10 dark:border-stone-800">
                    <div className="text-lg font-bold font-cinzel text-black dark:text-white tabular-nums">
                      {cacheStats ? cacheStats.surahsCount : downloadedSurahs.length} / 114
                    </div>
                    <div className="text-[10px] text-stone-600 dark:text-stone-400 font-medium">
                      Surahs Saved
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-stone-950 border border-black/10 dark:border-stone-800">
                    <div className="text-lg font-bold font-cinzel text-black dark:text-white tabular-nums">
                      {cacheStats ? cacheStats.audioFilesCount : 0}
                    </div>
                    <div className="text-[10px] text-stone-600 dark:text-stone-400 font-medium">
                      Audio Files Cached
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-stone-950 border border-black/10 dark:border-stone-800">
                    <div className="text-lg font-bold font-cinzel text-black dark:text-white tabular-nums">
                      ~{Math.round(((cacheStats ? cacheStats.totalKb : totalOfflineKb) / 1024) * 10) / 10} MB
                    </div>
                    <div className="text-[10px] text-stone-600 dark:text-stone-400 font-medium">
                      Local Footprint
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Batch Download Progress Bar */}
              {downloadProgress && (
                <div className="p-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white shadow-lg space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-2 truncate pr-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                      <span className="truncate">{downloadProgress.label}</span>
                    </span>
                    <span className="tabular-nums font-mono">{downloadProgress.percent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-800 dark:bg-stone-200 overflow-hidden">
                    <div
                      className="h-full bg-white dark:bg-black transition-all duration-300 rounded-full"
                      style={{ width: `${downloadProgress.percent}%` }}
                    />
                  </div>
                  <div className="text-[10px] opacity-80 text-right">
                    Do not close the application while downloading.
                  </div>
                </div>
              )}

              {/* One-Tap Complete Offline Action Cards */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                  One-Tap Offline Packages
                </div>

                {/* 1. Download All 114 Surahs (Text, Translations & Tafsirs) */}
                <div className="p-3.5 rounded-2xl border border-black/15 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-black dark:text-white">
                      Download All 114 Surahs (Text + Tafsir)
                    </div>
                    <p className="text-[11px] text-stone-700 dark:text-stone-400 font-medium leading-tight">
                      Arabic text, English translation, Urdu translation, and single clear Tafsir for all 6,236 verses (~2 MB).
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadAllText}
                    disabled={isDownloadingAllText || isDownloadingCoreAudio}
                    className="px-3.5 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-xs shadow-xs hover:bg-stone-900 dark:hover:bg-stone-100 disabled:opacity-50 shrink-0 flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    {isDownloadingAllText ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Download className="w-3.5 h-3.5" />
                    )}
                    <span>{isDownloadingAllText ? 'Saving...' : 'Download Text'}</span>
                  </button>
                </div>

                {/* 2. Download Core Recitations Audio (Arabic & Urdu MP3s) */}
                <div className="p-3.5 rounded-2xl border border-black/15 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-black dark:text-white">
                      Download Recitations Audio (Arabic + Urdu)
                    </div>
                    <p className="text-[11px] text-stone-700 dark:text-stone-400 font-medium leading-tight">
                      Caches every ayah audio for Al-Fatihah, Yasin, Ar-Rahman, Al-Waqi'ah, Al-Mulk, Last 10 Surahs & Favorites.
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadCoreAudio}
                    disabled={isDownloadingAllText || isDownloadingCoreAudio}
                    className="px-3.5 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-xs shadow-xs hover:bg-stone-900 dark:hover:bg-stone-100 disabled:opacity-50 shrink-0 flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    {isDownloadingCoreAudio ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                    <span>{isDownloadingCoreAudio ? 'Caching...' : 'Download Audio'}</span>
                  </button>
                </div>
              </div>

              {/* Cached Surahs List */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-black dark:text-white">
                  <span>Saved Chapters ({downloadedSurahs.length})</span>
                  <button
                    onClick={refreshStats}
                    className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Refresh</span>
                  </button>
                </div>

                {downloadedSurahs.length === 0 ? (
                  <div className="py-10 text-center space-y-2 border border-dashed border-stone-300 dark:border-stone-800 rounded-2xl bg-stone-50/50 dark:bg-stone-900/30">
                    <Download className="w-8 h-8 text-stone-400 dark:text-stone-600 mx-auto" />
                    <p className="text-xs text-stone-600 dark:text-stone-400 font-medium">
                      No Surahs downloaded yet. Tap "Download Text" above or save individual Surahs while reading.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                    {downloadedSurahs.map((s) => (
                      <div
                        key={s.surahNumber}
                        className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-black dark:text-white flex items-center gap-2">
                            <span>
                              {s.surahNumber}. {s.nameEnglish}
                            </span>
                            <span className="font-quran text-black dark:text-white text-xs">{s.nameArabic}</span>
                            {s.hasAudio && (
                              <span className="px-1.5 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-[9px] font-bold">
                                Audio Cached
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-stone-500 font-medium">
                            {s.ayahCount} Verses · ~{s.sizeKb} KB · Saved {new Date(s.downloadedAt).toLocaleDateString()}
                          </div>
                        </div>

                        <button
                          onClick={() => onDeleteDownloadedSurah(s.surahNumber)}
                          className="p-1.5 text-stone-400 hover:text-black dark:hover:text-white rounded-lg transition-colors"
                          title="Remove from offline cache"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: Push Notifications & Gentle Reminders */}
          {activeTab === 'reminders' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                      Gentle Push Notifications
                    </span>
                    <p className="text-xs text-stone-500">
                      Receive calming alerts for prayer times and your evening Quran reflection.
                    </p>
                  </div>

                  {permissionState === 'granted' ? (
                    <span className="px-2.5 py-1 bg-black text-white dark:bg-white dark:text-black rounded-md text-xs font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Enabled</span>
                    </span>
                  ) : (
                    <button
                      onClick={handleEnableNotifications}
                      className="px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black rounded-lg text-xs font-bold transition-transform active:scale-95"
                    >
                      Allow Alerts
                    </button>
                  )}
                </div>

                <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-xs text-stone-600 dark:text-stone-400">
                    Test how gentle reminders feel:
                  </span>
                  <button
                    onClick={handleTestReminder}
                    className="flex items-center gap-1 px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black rounded-lg text-xs font-bold transition-transform active:scale-95"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{testNotificationSent ? 'Chime Sent!' : 'Play Sample Chime'}</span>
                  </button>
                </div>
              </div>

              {/* Notification Schedule */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Notification Schedule Times
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  {[
                    { key: 'fajr', label: 'Fajr Prayer', time: profile.notificationTimes.fajr },
                    { key: 'dhuhr', label: 'Dhuhr Prayer', time: profile.notificationTimes.dhuhr },
                    { key: 'asr', label: 'Asr Prayer', time: profile.notificationTimes.asr },
                    { key: 'maghrib', label: 'Maghrib Prayer', time: profile.notificationTimes.maghrib },
                    { key: 'isha', label: 'Isha Prayer', time: profile.notificationTimes.isha },
                    { key: 'reflection', label: 'Evening Reflection', time: profile.notificationTimes.eveningReflection },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="p-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex justify-between items-center"
                    >
                      <span className="text-stone-700 dark:text-stone-300 font-medium">
                        {item.label}
                      </span>
                      <span className="font-mono text-stone-500 tabular-nums">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
