import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AndroidDashboard } from './components/AndroidDashboard';
import { AndroidReadingView } from './components/AndroidReadingView';
import { AndroidRecitationView } from './components/AndroidRecitationView';
import { AndroidSettingsSheet } from './components/AndroidSettingsSheet';
import { FavoriteSurahsModal } from './components/FavoriteSurahsModal';
import { SearchModal } from './components/SearchModal';
import { ImanTrackerModal } from './components/ImanTrackerModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AudioBookmarkDialog } from './components/AudioBookmarkDialog';
import { TafsirModal } from './components/TafsirModal';
import { QiblaFinderView } from './components/QiblaFinderView';
import { SurahListView } from './components/SurahListView';
import { HadithLibraryView } from './components/HadithLibraryView';
import { HadithJourneyView } from './components/HadithJourneyView';
import { SmartTasbihView } from './components/SmartTasbihView';
import { DailyInspirationView } from './components/DailyInspirationView';
import { KhatmahPlannerView } from './components/KhatmahPlannerView';
import { PrayerTimesModal } from './components/PrayerTimesModal';
import { ALL_SURAHS } from './data/surahList';
import {
  AudioBookmark,
  Ayah,
  DailyPrayers,
  DownloadedSurahInfo,
  ImanDayRecord,
  LastReadPosition,
  SurahDetail,
  UserProfileData,
} from './types/quran';
import {
  calculateStreak,
  deleteAudioBookmark,
  deleteOfflineSurah,
  getCachedAudioUrl,
  getDownloadedSurahsList,
  isSurahOffline,
  loadAudioBookmarks,
  loadImanRecord,
  loadUserProfile,
  saveAudioBookmark,
  saveImanRecord,
  saveSurahOffline,
  saveUserProfile,
} from './utils/offlineStorage';
import { fetchSurahDetail } from './utils/quranApi';
import { getDailyPrayerTimes, PrayerStatus } from './utils/prayerTimes';
import { getAyahAudioUrl } from './data/reciters';
import { playGentleChime } from './utils/notifications';
import { useOnlineStatus } from './hooks/usePWA';

type ActiveView =
  | 'dashboard'
  | 'surah_list'
  | 'reading'
  | 'recitation'
  | 'qibla'
  | 'settings'
  | 'hadith_library'
  | 'hadith_journey'
  | 'tasbih'
  | 'inspiration'
  | 'khatmah';

export default function App() {
  // Active Screen
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [startInFullScreen, setStartInFullScreen] = useState<boolean>(true);
  const previousViewRef = useRef<ActiveView>('dashboard');

  const handleOpenSettings = () => {
    previousViewRef.current = activeView === 'settings' ? 'dashboard' : activeView;
    setActiveView('settings');
  };

  const handleCloseSettings = () => {
    setActiveView(previousViewRef.current || 'dashboard');
    setIsSettingsOpen(false);
  };

  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('annur_theme');
    if (saved) return saved === 'dark';
    return true; // default to sleek dark mode
  });

  // User Profile & Settings (includes showUrdu, showEnglish, favoriteSurahs, lastRead)
  const [profile, setProfile] = useState<UserProfileData>(() => loadUserProfile());

  // Iman Tracker for today
  const [imanRecord, setImanRecord] = useState<ImanDayRecord>(() => loadImanRecord());
  const [streakInfo, setStreakInfo] = useState(() => calculateStreak());

  // Bookmarks & Downloads
  const [bookmarks, setBookmarks] = useState<AudioBookmark[]>(() => loadAudioBookmarks());
  const [downloadedSurahs, setDownloadedSurahs] = useState<DownloadedSurahInfo[]>(() =>
    getDownloadedSurahsList()
  );

  // Prayer Times dynamic status
  const [prayerStatus, setPrayerStatus] = useState<PrayerStatus>(() => getDailyPrayerTimes());

  // Active Surah & Loading State - ALWAYS START FROM LAST READ
  const [currentSurahNumber, setCurrentSurahNumber] = useState<number>(() => {
    const saved = loadUserProfile();
    return saved.lastRead?.surahNumber || 1;
  });
  const [currentSurah, setCurrentSurah] = useState<SurahDetail | null>(null);
  const [isLoadingSurah, setIsLoadingSurah] = useState<boolean>(true);

  // Audio Playback State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeAyahNumber, setActiveAyahNumber] = useState<number>(() => {
    const saved = loadUserProfile();
    return saved.lastRead?.ayahNumber || 1;
  });
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [repeatVerse, setRepeatVerse] = useState<boolean>(false);
  const [currentAudioPhase, setCurrentAudioPhase] = useState<'arabic' | 'urdu'>('arabic');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Modals & Sheets
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isImanTrackerOpen, setIsImanTrackerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileInitialTab, setProfileInitialTab] = useState<'profile' | 'bookmarks' | 'offline' | 'reminders'>('profile');
  const [isTafsirOpen, setIsTafsirOpen] = useState(false);
  const [selectedTafsirAyah, setSelectedTafsirAyah] = useState<Ayah | null>(null);

  // New Feature Modals
  const [isPrayerTimesOpen, setIsPrayerTimesOpen] = useState(false);

  // Audio Bookmark Dialog State
  const [isBookmarkDialogOpen, setIsBookmarkDialogOpen] = useState(false);
  const [pendingBookmark, setPendingBookmark] = useState<{
    ayahNumber: number;
    timestampSeconds: number;
  } | null>(null);

  // Sync dark class to <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('annur_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('annur_theme', 'light');
    }
  }, [darkMode]);

  // Update prayer times every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setPrayerStatus(getDailyPrayerTimes());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Load active Surah detail
  useEffect(() => {
    let isCancelled = false;
    setIsLoadingSurah(true);

    fetchSurahDetail(currentSurahNumber)
      .then((detail) => {
        if (!isCancelled) {
          setCurrentSurah(detail);
          setIsLoadingSurah(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load Surah:', err);
        if (!isCancelled) {
          setIsLoadingSurah(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [currentSurahNumber]);

  // Online / Offline tracking
  const isOnline = useOnlineStatus();

  // Sync Audio Element source with Cache-first offline resolution
  useEffect(() => {
    if (!currentSurah) return;
    let isCancelled = false;
    const recMode = profile.recitationLanguageMode || 'arabic';
    const isUrduPhase = recMode === 'urdu' || (recMode === 'both' && currentAudioPhase === 'urdu');
    const rawUrl = getAyahAudioUrl(
      currentSurah.number,
      activeAyahNumber,
      profile.preferredReciter,
      isUrduPhase,
      profile.preferredUrduReciter || 'shamshad'
    );

    // Resolve via Cache API for guaranteed 100% offline audio playback
    getCachedAudioUrl(rawUrl).then((resolvedUrl) => {
      if (isCancelled || !audioRef.current) return;
      const wasPlaying = isPlayingAudio;
      audioRef.current.src = resolvedUrl;
      audioRef.current.playbackRate = playbackSpeed;
      audioRef.current.load();
      if (wasPlaying) {
        audioRef.current.play().catch(() => setIsPlayingAudio(false));
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [
    currentSurah?.number,
    activeAyahNumber,
    profile.preferredReciter,
    profile.preferredUrduReciter,
    profile.recitationLanguageMode,
    currentAudioPhase,
  ]);

  // Update Profile helper
  const handleUpdateProfile = useCallback((updates: Partial<UserProfileData>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...updates };
      saveUserProfile(updated);
      return updated;
    });
  }, []);

  // Update Last Read Position persistently
  const handleUpdateLastRead = useCallback(
    (position: LastReadPosition) => {
      handleUpdateProfile({ lastRead: position });
    },
    [handleUpdateProfile]
  );

  // Toggle Favorite Surah
  const handleToggleFavoriteSurah = (surahNum: number) => {
    const currentFavs = profile.favoriteSurahs || [];
    let updated: number[];
    if (currentFavs.includes(surahNum)) {
      updated = currentFavs.filter((n) => n !== surahNum);
    } else {
      updated = [...currentFavs, surahNum];
    }
    handleUpdateProfile({ favoriteSurahs: updated });
    playGentleChime();
  };

  // Audio Events
  const handleAudioEnded = () => {
    const recMode = profile.recitationLanguageMode || 'arabic';

    if (repeatVerse) {
      if (recMode === 'both') {
        if (currentAudioPhase === 'arabic') {
          setCurrentAudioPhase('urdu');
        } else {
          setCurrentAudioPhase('arabic');
        }
      } else {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        }
      }
      return;
    }

    // In 'both' mode: if we just finished Arabic, immediately recite Urdu for this SAME ayah
    if (recMode === 'both' && currentAudioPhase === 'arabic') {
      setCurrentAudioPhase('urdu');
      return;
    }

    // If we just finished Urdu in 'both' mode, reset phase to Arabic for the next ayah
    if (recMode === 'both' && currentAudioPhase === 'urdu') {
      setCurrentAudioPhase('arabic');
    }

    if (currentSurah && activeAyahNumber < currentSurah.ayahs.length) {
      const nextAyah = activeAyahNumber + 1;
      setActiveAyahNumber(nextAyah);
      handleVerseRead();
      handleUpdateLastRead({
        surahNumber: currentSurah.number,
        ayahNumber: nextAyah,
        surahName: currentSurah.nameEnglish,
        updatedAt: new Date().toISOString(),
      });
    } else {
      setIsPlayingAudio(false);
    }
  };

  const handleTogglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
        handleVerseRead();
      }).catch((err) => {
        console.warn('Playback error:', err);
        setIsPlayingAudio(false);
      });
    }
  };

  const handlePlayAyahInReciter = (ayahNum: number) => {
    const recMode = profile.recitationLanguageMode || 'arabic';
    const targetPhase = recMode === 'urdu' ? 'urdu' : 'arabic';
    const isUrduPhase = targetPhase === 'urdu';

    if (activeAyahNumber === ayahNum && isPlayingAudio) {
      audioRef.current?.pause();
      setIsPlayingAudio(false);
    } else {
      setActiveAyahNumber(ayahNum);
      setCurrentAudioPhase(targetPhase);
      const url = getAyahAudioUrl(
        currentSurahNumber,
        ayahNum,
        profile.preferredReciter,
        isUrduPhase,
        profile.preferredUrduReciter || 'shamshad'
      );
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.playbackRate = playbackSpeed;
        audioRef.current.play().then(() => {
          setIsPlayingAudio(true);
          handleVerseRead();
        }).catch(() => setIsPlayingAudio(false));
      }
    }
  };

  const handleNextAyah = () => {
    if (!currentSurah) return;
    if (activeAyahNumber < currentSurah.ayahs.length) {
      const next = activeAyahNumber + 1;
      setActiveAyahNumber(next);
      setCurrentAudioPhase(profile.recitationLanguageMode === 'urdu' ? 'urdu' : 'arabic');
      handleUpdateLastRead({
        surahNumber: currentSurah.number,
        ayahNumber: next,
        surahName: currentSurah.nameEnglish,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const handlePrevAyah = () => {
    if (activeAyahNumber > 1) {
      const prev = activeAyahNumber - 1;
      setActiveAyahNumber(prev);
      setCurrentAudioPhase(profile.recitationLanguageMode === 'urdu' ? 'urdu' : 'arabic');
      if (currentSurah) {
        handleUpdateLastRead({
          surahNumber: currentSurah.number,
          ayahNumber: prev,
          surahName: currentSurah.nameEnglish,
          updatedAt: new Date().toISOString(),
        });
      }
    }
  };

  // Toggle Dark Mode
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Toggle Prayer check in Iman Record
  const handleTogglePrayer = (prayerKey: keyof DailyPrayers) => {
    const updatedPrayers: DailyPrayers = {
      ...imanRecord.prayers,
      [prayerKey]: !imanRecord.prayers[prayerKey],
    };

    const updatedRecord: ImanDayRecord = {
      ...imanRecord,
      prayers: updatedPrayers,
    };

    setImanRecord(updatedRecord);
    saveImanRecord(updatedRecord);
    setStreakInfo(calculateStreak());

    if (updatedPrayers[prayerKey]) {
      playGentleChime();
    }
  };

  // Update Iman Record
  const handleUpdateImanRecord = (record: ImanDayRecord) => {
    setImanRecord(record);
    saveImanRecord(record);
    setStreakInfo(calculateStreak());
  };

  // Track verse reading progress
  const handleVerseRead = () => {
    setImanRecord((prev) => {
      const updated: ImanDayRecord = {
        ...prev,
        versesRead: prev.versesRead + 1,
      };
      saveImanRecord(updated);
      setStreakInfo(calculateStreak());
      return updated;
    });
  };

  // Trigger Bookmark Dialog
  const handleInitiateBookmark = (ayahNumber: number, timestampSeconds: number) => {
    setPendingBookmark({ ayahNumber, timestampSeconds });
    setIsBookmarkDialogOpen(true);
  };

  // Save Bookmark
  const handleConfirmSaveBookmark = (note: string) => {
    if (!currentSurah || !pendingBookmark) return;
    const newBm: AudioBookmark = {
      id: `bm_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      surahNumber: currentSurah.number,
      surahName: currentSurah.nameEnglish,
      ayahNumber: pendingBookmark.ayahNumber,
      timestampSeconds: pendingBookmark.timestampSeconds,
      reciterId: profile.preferredReciter,
      reciterName: profile.preferredReciter === 'alafasy' ? 'Mishary Alafasy' : 'Abdul Basit',
      note: note.trim(),
      createdAt: new Date().toISOString(),
    };

    const updated = saveAudioBookmark(newBm);
    setBookmarks(updated);
    playGentleChime();
  };

  // Delete Bookmark
  const handleDeleteBookmark = (id: string) => {
    const updated = deleteAudioBookmark(id);
    setBookmarks(updated);
  };

  // Play bookmark
  const handlePlayBookmark = (bm: AudioBookmark) => {
    setCurrentSurahNumber(bm.surahNumber);
    setActiveAyahNumber(bm.ayahNumber);
    setActiveView('recitation');
    if (audioRef.current) {
      audioRef.current.currentTime = bm.timestampSeconds;
      audioRef.current.play().then(() => setIsPlayingAudio(true)).catch(() => {});
    }
  };

  // Download Surah Offline (both Arabic and Urdu audio caching)
  const handleDownloadSurah = async (surahNum: number) => {
    if (!currentSurah) return;
    await saveSurahOffline(
      currentSurah,
      true,
      profile.preferredReciter,
      profile.preferredUrduReciter || 'shamshad'
    );
    setDownloadedSurahs(getDownloadedSurahsList());
    playGentleChime();
  };

  // Delete Downloaded Surah
  const handleDeleteDownloadedSurah = async (surahNum: number) => {
    const updated = await deleteOfflineSurah(surahNum);
    setDownloadedSurahs(updated);
  };

  // Open Tafsir Modal
  const handleOpenTafsir = (ayah: Ayah) => {
    setSelectedTafsirAyah(ayah);
    setIsTafsirOpen(true);
  };

  const isCurrentSurahOffline = isSurahOffline(currentSurahNumber);
  const isFavorite = (profile.favoriteSurahs || []).includes(currentSurahNumber);

  return (
    <div className="h-screen sm:min-h-screen bg-stone-100 dark:bg-stone-950 flex flex-col items-center justify-start sm:p-4 transition-colors overflow-hidden">
      {/* Android Device Portrait Frame (Notification Bar removed as requested) */}
      <div className="w-full max-w-md h-full sm:min-h-[92vh] sm:max-h-[96vh] sm:rounded-3xl bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 flex flex-col overflow-hidden shadow-2xl relative sm:border border-stone-200 dark:border-stone-800">
        {/* Offline Mode Status Banner (visible when disconnected from network) */}
        {!isOnline && (
          <div className="w-full bg-black text-white dark:bg-white dark:text-black px-4 py-1.5 text-[11px] font-bold flex items-center justify-between border-b border-black/20 dark:border-white/20 shrink-0 select-none z-50">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Offline Mode Active • Saved Quran & Recitations Ready</span>
            </span>
            <span className="text-[10px] opacity-80 font-mono">100% Offline</span>
          </div>
        )}

        {/* Hidden Audio Reciter Element */}
        <audio
          ref={audioRef}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime);
              setDuration(audioRef.current.duration || 0);
            }
          }}
          onEnded={handleAudioEnded}
          onError={() => setIsPlayingAudio(false)}
        />

        {/* 1. Android Dashboard (No notification bar, fluid Iman circle, favorite Surahs, always start from last read) */}
        {activeView === 'dashboard' && (
          <AndroidDashboard
            imanRecord={imanRecord}
            profile={profile}
            prayerStatus={prayerStatus}
            streak={streakInfo.currentStreak}
            lastRead={profile.lastRead}
            onStartReading={() => {
              // Open the complete list of 114 Surahs as requested
              setActiveView('surah_list');
            }}
            onStartRecitation={() => {
              // Always start recitation from last read
              setCurrentSurahNumber(profile.lastRead?.surahNumber || 1);
              setActiveAyahNumber(profile.lastRead?.ayahNumber || 1);
              setActiveView('recitation');
            }}
            onStartHadithReading={() => setActiveView('hadith_library')}
            onStartHadithJourney={() => setActiveView('hadith_journey')}
            onOpenSettings={handleOpenSettings}
            onTogglePrayer={handleTogglePrayer}
            onOpenImanTracker={() => setIsImanTrackerOpen(true)}
            onSelectFavoriteSurah={(sNum) => {
              setCurrentSurahNumber(sNum);
              setActiveAyahNumber(1);
              setStartInFullScreen(true);
              setActiveView('reading');
            }}
            onOpenFavoritesModal={() => setIsFavoritesModalOpen(true)}
            onOpenQibla={() => setActiveView('qibla')}
            onOpenPrayerTimes={() => setIsPrayerTimesOpen(true)}
            onOpenSmartTasbih={() => setActiveView('tasbih')}
            onOpenDailyInspiration={() => setActiveView('inspiration')}
            onOpenKhatmahPlanner={() => setActiveView('khatmah')}
          />
        )}

        {/* 2. Complete List of 114 Surahs (Opens before reading, tapping a Surah launches full screen) */}
        {activeView === 'surah_list' && (
          <SurahListView
            onBackToDashboard={() => setActiveView('dashboard')}
            onSelectSurah={(num, fullScreen = true) => {
              setCurrentSurahNumber(num);
              setActiveAyahNumber(1);
              setStartInFullScreen(fullScreen);
              setActiveView('reading');
              handleUpdateLastRead({
                surahNumber: num,
                ayahNumber: 1,
                surahName: ALL_SURAHS.find((s) => s.number === num)?.nameEnglish || `Surah ${num}`,
                updatedAt: new Date().toISOString(),
              });
            }}
            onOpenSettings={handleOpenSettings}
            profile={profile}
            onToggleFavoriteSurah={handleToggleFavoriteSurah}
            lastRead={profile.lastRead}
          />
        )}

        {/* 3. Android Quran Reading View (Zero vertical scrolling, horizontal page/slide reading) */}
        {activeView === 'reading' && (
          <AndroidReadingView
            currentSurah={currentSurah}
            isLoading={isLoadingSurah}
            onBackToDashboard={() => setActiveView('surah_list')}
            onSelectSurah={(num) => {
              setCurrentSurahNumber(num);
              setActiveAyahNumber(1);
              handleUpdateLastRead({
                surahNumber: num,
                ayahNumber: 1,
                surahName: currentSurah?.nameEnglish || `Surah ${num}`,
                updatedAt: new Date().toISOString(),
              });
            }}
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onOpenSettings={handleOpenSettings}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenTafsir={handleOpenTafsir}
            onAddBookmark={handleInitiateBookmark}
            onDownloadSurah={handleDownloadSurah}
            isDownloaded={isCurrentSurahOffline}
            onVerseRead={handleVerseRead}
            onPlayAyahInReciter={handlePlayAyahInReciter}
            activePlayingAyah={isPlayingAudio ? activeAyahNumber : null}
            isPlayingAudio={isPlayingAudio}
            onToggleAudioPlayPause={handleTogglePlayPause}
            onToggleFavoriteSurah={handleToggleFavoriteSurah}
            isFavoriteSurah={isFavorite}
            onUpdateLastRead={handleUpdateLastRead}
            initialTargetAyah={profile.lastRead?.ayahNumber}
            initialFullScreen={startInFullScreen}
          />
        )}

        {/* 3. Android Quran Recitation Player View */}
        {activeView === 'recitation' && (
          <AndroidRecitationView
            currentSurah={currentSurah}
            activeAyahNumber={activeAyahNumber}
            isPlaying={isPlayingAudio}
            currentTime={currentTime}
            duration={duration}
            playbackSpeed={playbackSpeed}
            repeatVerse={repeatVerse}
            onBackToDashboard={() => setActiveView('dashboard')}
            onTogglePlayPause={handleTogglePlayPause}
            onNextAyah={handleNextAyah}
            onPrevAyah={handlePrevAyah}
            onToggleRepeatVerse={() => setRepeatVerse(!repeatVerse)}
            onChangeSpeed={(spd) => {
              setPlaybackSpeed(spd);
              if (audioRef.current) audioRef.current.playbackRate = spd;
            }}
            onSelectSurah={(num) => {
              setCurrentSurahNumber(num);
              setActiveAyahNumber(1);
            }}
            onSelectAyah={(num) => setActiveAyahNumber(num)}
            onAddBookmark={handleInitiateBookmark}
            profile={profile}
            onOpenSettings={handleOpenSettings}
            onOpenTafsir={handleOpenTafsir}
            onToggleFavoriteSurah={handleToggleFavoriteSurah}
            isFavoriteSurah={isFavorite}
            onUpdateProfile={handleUpdateProfile}
            currentAudioPhase={currentAudioPhase}
          />
        )}

        {/* 4. Qibla Direction Finder View */}
        {activeView === 'qibla' && (
          <QiblaFinderView onBackToDashboard={() => setActiveView('dashboard')} />
        )}

        {/* 5. Settings Tab View (Opens in new dedicated tab with Back button) */}
        {activeView === 'settings' && (
          <AndroidSettingsSheet
            isOpen={true}
            onClose={handleCloseSettings}
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            darkMode={darkMode}
            onToggleDarkMode={handleToggleDarkMode}
            onOpenBookmarks={() => {
              setProfileInitialTab('bookmarks');
              setIsProfileOpen(true);
            }}
            onOpenOfflineManager={() => {
              setProfileInitialTab('offline');
              setIsProfileOpen(true);
            }}
          />
        )}

        {/* 6. Sahih Hadith Library View (Start Hadith Reading) */}
        {activeView === 'hadith_library' && (
          <HadithLibraryView
            onBackToDashboard={() => setActiveView('dashboard')}
            onStartJourney={() => setActiveView('hadith_journey')}
          />
        )}

        {/* 7. Sahih Hadith Journey View (Start Hadith Journey - Full screen questions slides) */}
        {activeView === 'hadith_journey' && (
          <HadithJourneyView
            onBackToDashboard={() => setActiveView('dashboard')}
            onOpenLibrary={() => setActiveView('hadith_library')}
          />
        )}

        {/* 8. Smart Digital Tasbih Full Tab View */}
        {activeView === 'tasbih' && (
          <SmartTasbihView
            onBackToDashboard={() => setActiveView('dashboard')}
            onDhikrCountUpdated={() => {
              handleUpdateImanRecord({
                ...imanRecord,
                dhikrCount: imanRecord.dhikrCount + 1,
              });
            }}
          />
        )}

        {/* 9. Daily Inspiration Full Tab View */}
        {activeView === 'inspiration' && (
          <DailyInspirationView
            onBackToDashboard={() => setActiveView('dashboard')}
          />
        )}

        {/* 10. Personalized Khatmah & Quran Analysis Full Tab View */}
        {activeView === 'khatmah' && (
          <KhatmahPlannerView
            onBackToDashboard={() => setActiveView('dashboard')}
            onStartReadingAtPage={(pageNum) => {
              const approxSurah = Math.min(114, Math.max(1, Math.floor(pageNum / 5.5) + 1));
              setCurrentSurahNumber(approxSurah);
              setActiveAyahNumber(1);
              setStartInFullScreen(true);
              setActiveView('reading');
            }}
            onReadingMarked={(pagesRead) => {
              handleUpdateImanRecord({
                ...imanRecord,
                versesRead: imanRecord.versesRead + pagesRead * 15,
              });
            }}
          />
        )}
      </div>

      {/* Fallback Settings Sheet if triggered via legacy modal state */}
      {isSettingsOpen && activeView !== 'settings' && (
        <AndroidSettingsSheet
          isOpen={true}
          onClose={handleCloseSettings}
          profile={profile}
          onUpdateProfile={handleUpdateProfile}
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
          onOpenBookmarks={() => {
            setProfileInitialTab('bookmarks');
            setIsProfileOpen(true);
          }}
          onOpenOfflineManager={() => {
            setProfileInitialTab('offline');
            setIsProfileOpen(true);
          }}
        />
      )}

      {/* Favorite Surahs Modal */}
      <FavoriteSurahsModal
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
        favoriteSurahs={profile.favoriteSurahs || []}
        onToggleFavorite={handleToggleFavoriteSurah}
        onSelectSurah={(sNum) => {
          setCurrentSurahNumber(sNum);
          setActiveAyahNumber(1);
          setActiveView('reading');
        }}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={(surahNum, ayahNum) => {
          setCurrentSurahNumber(surahNum);
          if (ayahNum) setActiveAyahNumber(ayahNum);
          setActiveView('reading');
        }}
        onSelectHadithChapter={() => {
          setActiveView('hadith_journey');
        }}
      />

      {/* Iman Tracker & Tasbih Modal */}
      <ImanTrackerModal
        isOpen={isImanTrackerOpen}
        onClose={() => setIsImanTrackerOpen(false)}
        imanRecord={imanRecord}
        onUpdateImanRecord={handleUpdateImanRecord}
        streak={streakInfo.currentStreak}
      />

      {/* User Profile, Goals & Audio Bookmarks Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        streak={streakInfo.currentStreak}
        bestStreak={streakInfo.bestStreak}
        bookmarks={bookmarks}
        onPlayBookmark={handlePlayBookmark}
        onDeleteBookmark={handleDeleteBookmark}
        downloadedSurahs={downloadedSurahs}
        onDeleteDownloadedSurah={handleDeleteDownloadedSurah}
        onRefreshDownloadedSurahs={() => setDownloadedSurahs(getDownloadedSurahsList())}
        initialTab={profileInitialTab}
      />

      {/* Audio Bookmark Dialog */}
      {pendingBookmark && currentSurah && (
        <AudioBookmarkDialog
          isOpen={isBookmarkDialogOpen}
          onClose={() => {
            setIsBookmarkDialogOpen(false);
            setPendingBookmark(null);
          }}
          surahNumber={currentSurah.number}
          surahName={currentSurah.nameEnglish}
          ayahNumber={pendingBookmark.ayahNumber}
          timestampSeconds={pendingBookmark.timestampSeconds}
          reciterId={profile.preferredReciter}
          onSave={handleConfirmSaveBookmark}
        />
      )}

      {/* Tafsir & Hadith Deep Modal */}
      <TafsirModal
        isOpen={isTafsirOpen}
        onClose={() => {
          setIsTafsirOpen(false);
          setSelectedTafsirAyah(null);
        }}
        ayah={selectedTafsirAyah}
        surah={currentSurah}
        onPlayAyah={(num) => handlePlayAyahInReciter(num)}
        onBookmarkAyah={(num) => handleInitiateBookmark(num, 0)}
      />

      {/* 1. Smart Prayer Times & Live Adhan Schedule Modal */}
      <PrayerTimesModal
        isOpen={isPrayerTimesOpen}
        onClose={() => setIsPrayerTimesOpen(false)}
        prayerStatus={prayerStatus}
        onUpdatePrayerStatus={(st) => setPrayerStatus(st)}
        onTogglePrayer={handleTogglePrayer}
        prayersRecord={imanRecord.prayers}
      />
    </div>
  );
}
