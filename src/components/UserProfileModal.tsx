import React, { useState } from 'react';
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
} from 'lucide-react';
import { AudioBookmark, DownloadedSurahInfo, UserProfileData } from '../types/quran';
import {
  isNotificationSupported,
  playGentleChime,
  requestNotificationPermission,
  sendPushReminder,
} from '../utils/notifications';

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
  initialTab = 'profile',
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'bookmarks' | 'offline' | 'reminders'>(initialTab);
  const [testNotificationSent, setTestNotificationSent] = useState(false);
  const [permissionState, setPermissionState] = useState<string>(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'unsupported'
  );

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
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-amber-500 text-stone-900 dark:text-stone-100'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
            }`}
          >
            Spiritual Goals & Streaks
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'bookmarks'
                ? 'border-amber-500 text-stone-900 dark:text-stone-100'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
            }`}
          >
            <span>Audio Bookmarks</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 text-[10px]">
              {bookmarks.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('offline')}
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'offline'
                ? 'border-amber-500 text-stone-900 dark:text-stone-100'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
            }`}
          >
            <span>Offline Downloads</span>
            <span className="px-1.5 py-0.2 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 text-[10px]">
              {downloadedSurahs.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('reminders')}
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'reminders'
                ? 'border-amber-500 text-stone-900 dark:text-stone-100'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
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
                    className="flex-1 px-3 py-2 text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Streaks & Consistency Record */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
                    <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>Current Streak</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-cinzel text-amber-900 dark:text-amber-200 tabular-nums">
                    {streak} Days
                  </div>
                  <p className="text-[11px] text-amber-700/80 dark:text-amber-400/80">
                    Consecutive daily reading & prayer
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400">
                    <Sparkles className="w-4 h-4 text-stone-500" />
                    <span>Best Record</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-cinzel text-stone-900 dark:text-stone-100 tabular-nums">
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
                    <Target className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                      Daily Verse Reading Goal
                    </span>
                  </div>
                  <span className="text-sm font-bold font-cinzel text-emerald-600 dark:text-emerald-400 tabular-nums">
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
                  className="w-full accent-emerald-600 cursor-pointer"
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
                      className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex items-center justify-between gap-3 group hover:border-amber-400 transition-colors"
                    >
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                            Surah {bm.surahName} : Ayah {bm.ayahNumber}
                          </span>
                          <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
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
                          className="flex items-center gap-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-medium transition-colors"
                          title="Resume recitation from this bookmark"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Resume</span>
                        </button>
                        <button
                          onClick={() => onDeleteBookmark(bm.id)}
                          className="p-1.5 text-stone-400 hover:text-red-500 rounded-lg transition-colors"
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
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                    Offline Cache Status
                  </div>
                  <div className="text-xs text-stone-500">
                    {downloadedSurahs.length} chapters cached (~{totalOfflineKb} KB)
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                  <Check className="w-4 h-4" />
                  <span>Available without Internet</span>
                </div>
              </div>

              {downloadedSurahs.length === 0 ? (
                <div className="py-12 text-center space-y-2 border border-dashed border-stone-200 dark:border-stone-800 rounded-xl">
                  <Download className="w-8 h-8 text-stone-300 dark:text-stone-600 mx-auto" />
                  <p className="text-xs text-stone-500">
                    No Surahs downloaded yet. Click "Save Offline" on any Surah in the main reading view to cache it.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {downloadedSurahs.map((s) => (
                    <div
                      key={s.surahNumber}
                      className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                          <span>
                            {s.surahNumber}. {s.nameEnglish}
                          </span>
                          <span className="font-quran text-amber-600 text-sm">{s.nameArabic}</span>
                        </div>
                        <div className="text-[11px] text-stone-500">
                          {s.ayahCount} Verses · {s.sizeKb} KB · Saved {new Date(s.downloadedAt).toLocaleDateString()}
                        </div>
                      </div>

                      <button
                        onClick={() => onDeleteDownloadedSurah(s.surahNumber)}
                        className="p-1.5 text-stone-400 hover:text-red-500 rounded-lg transition-colors"
                        title="Remove from offline cache"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 rounded-md text-xs font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Enabled</span>
                    </span>
                  ) : (
                    <button
                      onClick={handleEnableNotifications}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-colors"
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
                    className="flex items-center gap-1 px-3 py-1 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 rounded-md text-xs font-medium border border-stone-200 dark:border-stone-700 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-amber-500" />
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
