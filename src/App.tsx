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
import { ImanAnalysisView } from './components/ImanAnalysisView';
import { FavoriteSurahsView } from './components/FavoriteSurahsView';
import { PrayerTimesModal } from './components/PrayerTimesModal';
import { ProphetsTimelineView } from './components/ProphetsTimelineView';
import { WelcomeSalamIntro } from './components/WelcomeSalamIntro';
import { SacredCompanionsView } from './components/SacredCompanionsView';
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
  getLocalOnlyCachedAudioUrl,
  isAudioCacheIndexWarmed,
  isAudioUrlCachedSync,
  isSurahOffline,
  loadAudioBookmarks,
  loadImanRecord,
  loadUserProfile,
  markAyahsReadToday,
  prefetchAyahAudioBatch,
  saveAudioBookmark,
  saveImanRecord,
  saveSurahOffline,
  saveUserProfile,
  syncAllSurahsMetadataWithIdb,
  warmAudioCacheIndex,
} from './utils/offlineStorage';
import { ensureAllQuranTextsOffline } from './utils/offlineQuranStore';
import { fetchSurahDetail } from './utils/quranApi';
import { getDailyPrayerTimes, PrayerStatus } from './utils/prayerTimes';
import { getAyahAudioUrlForLanguage } from './data/reciters';
import { offlineSpeech } from './utils/offlineSpeechRecitation';
import { audioClarity } from './utils/audioClarity';
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
  | 'khatmah'
  | 'iman'
  | 'favorites'
  | 'timeline'
  | 'sacred_hub';

export default function App() {
  // Active Screen
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [startInFullScreen, setStartInFullScreen] = useState<boolean>(true);
  const [isFavoriteReading, setIsFavoriteReading] = useState<boolean>(false);
  const [targetAyahOverride, setTargetAyahOverride] = useState<number | null>(null);
  const [initialHifzMaskOverride, setInitialHifzMaskOverride] = useState<boolean>(false);
  const [timelineJumpActive, setTimelineJumpActive] = useState<boolean>(false);
  const [hubJumpActive, setHubJumpActive] = useState<boolean>(false);
  const [selectedHadithTopicId, setSelectedHadithTopicId] = useState<string | undefined>(undefined);
  const [showIntro, setShowIntro] = useState<boolean>(true);
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
    return false; // default to clean light mode
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
  const [ayahLoopRange, setAyahLoopRange] = useState<{ enabled: boolean; fromAyah: number; toAyah: number }>({
    enabled: false,
    fromAyah: 1,
    toAyah: 5,
  });
  const [currentAudioPhase, setCurrentAudioPhase] = useState<'arabic' | 'urdu' | 'english'>('arabic');
  const [surahAudioDownloadProgress, setSurahAudioDownloadProgress] = useState<{ current: number; total: number } | null>(null);
  const [offlineSpeechReady, setOfflineSpeechReady] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isSpeechPausedRef = useRef<boolean>(false);
  const usingSpeechForPhaseRef = useRef<boolean>(false);
  const isPlayingAudioRef = useRef<boolean>(false);
  const activeObjectUrlRef = useRef<string | null>(null);
  const handleAudioEndedRef = useRef<() => void>(() => {});
  isPlayingAudioRef.current = isPlayingAudio;

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
    setAyahLoopRange((prev) => ({ ...prev, enabled: false, fromAyah: 1, toAyah: 5 }));

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

  // Determine effective active audio phase for current recitation mode
  const getActiveAudioPhase = useCallback((): 'arabic' | 'urdu' | 'english' => {
    const recMode = profile.recitationLanguageMode || 'arabic';
    if (recMode === 'english') return 'english';
    if (recMode === 'urdu') return 'urdu';
    if (recMode === 'arabic') return 'arabic';
    if (recMode === 'arabic_english') return currentAudioPhase === 'english' ? 'english' : 'arabic';
    return currentAudioPhase === 'urdu' ? 'urdu' : 'arabic';
  }, [profile.recitationLanguageMode, currentAudioPhase]);

  const getSecondaryPhaseForDualMode = (recMode: string): 'urdu' | 'english' | null => {
    if (recMode === 'both' || recMode === 'arabic_urdu') return 'urdu';
    if (recMode === 'arabic_english') return 'english';
    return null;
  };

  // Reset phase when switching recitation audio mode and ensure clean speech shutdown on unmount
  useEffect(() => {
    setCurrentAudioPhase('arabic');
  }, [profile.recitationLanguageMode]);

  useEffect(() => {
    offlineSpeech.warmUp();
    warmAudioCacheIndex().catch(() => {});

    // Silently hydrate all 114 Surahs (Arabic + English + Urdu + Assamese) into IndexedDB
    // so both translation reading and offline voice recitation work across the entire Quran offline.
    const syncTimer = window.setTimeout(() => {
      ensureAllQuranTextsOffline()
        .then(() => syncAllSurahsMetadataWithIdb())
        .then((list) => {
          if (list && list.length > 0) {
            setDownloadedSurahs(list);
          }
        })
        .catch(() => {});
    }, 600);

    return () => {
      window.clearTimeout(syncTimer);
      offlineSpeech.stop();
    };
  }, []);

  // Sync clarity EQ preference
  useEffect(() => {
    audioClarity.setEnabled(profile.vocalClarityEnhancer !== false);
  }, [profile.vocalClarityEnhancer]);

  // Helper to resolve current Ayah spoken text for English or Urdu recitation
  const getSpokenTranslationForActiveAyah = useCallback(
    (phase: 'english' | 'urdu', surahObj: SurahDetail | null, ayahNum: number) => {
      if (!surahObj) return '';
      const ayahObj =
        surahObj.ayahs.find((a) => a.numberInSurah === ayahNum) || surahObj.ayahs[0];
      return phase === 'urdu'
        ? ayahObj?.textUrdu || ayahObj?.textEnglish || ''
        : ayahObj?.textEnglish || '';
    },
    []
  );

  // Sync Audio Element / 100% Offline English & Urdu Playback
  useEffect(() => {
    if (!currentSurah) return;
    let isCancelled = false;
    const activePhase = getActiveAudioPhase();
    offlineSpeech.stop();
    isSpeechPausedRef.current = false;

    const langCode: 'ar' | 'ur' | 'en' =
      activePhase === 'urdu' ? 'ur' : activePhase === 'english' ? 'en' : 'ar';

    const rawUrl = getAyahAudioUrlForLanguage(
      currentSurah.number,
      activeAyahNumber,
      langCode,
      profile.preferredReciter,
      profile.preferredUrduReciter || 'shamshad'
    );

    const playBlobOrRemoteAudio = (resolvedUrl: string) => {
      if (isCancelled || !audioRef.current) {
        if (resolvedUrl.startsWith('blob:')) URL.revokeObjectURL(resolvedUrl);
        return;
      }
      usingSpeechForPhaseRef.current = false;
      if (activeObjectUrlRef.current && activeObjectUrlRef.current !== resolvedUrl) {
        URL.revokeObjectURL(activeObjectUrlRef.current);
      }
      activeObjectUrlRef.current = resolvedUrl.startsWith('blob:') ? resolvedUrl : null;
      audioClarity.applyPitchPreservation(audioRef.current);
      audioClarity.setEnabled(profile.vocalClarityEnhancer !== false);
      audioRef.current.src = resolvedUrl;
      audioRef.current.playbackRate = playbackSpeed;
      audioRef.current.load();
      if (isPlayingAudioRef.current) {
        audioClarity.attach(audioRef.current);
        audioRef.current.play().catch(() => setIsPlayingAudio(false));
      }
    };

    const startBuiltInOfflineVoice = (spokenLang: 'en' | 'ur') => {
      usingSpeechForPhaseRef.current = true;
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const spokenText = getSpokenTranslationForActiveAyah(
        spokenLang === 'ur' ? 'urdu' : 'english',
        currentSurah,
        activeAyahNumber
      );
      const charsPerSec = spokenLang === 'en' ? 13.5 : 10.5;
      const estDur = Math.max(2.6, spokenText.length / charsPerSec) / (playbackSpeed || 1);
      setCurrentTime(0);
      setDuration(estDur);
      setOfflineSpeechReady(
        offlineSpeech.hasWorkingSpeech(spokenLang, profile.preferredUrduReciter || 'shamshad')
      );

      if (isPlayingAudioRef.current) {
        offlineSpeech.start(spokenText, playbackSpeed, {
          language: spokenLang,
          urduReciterId: profile.preferredUrduReciter || 'shamshad',
          onProgress: (cur, dur) => {
            setCurrentTime(cur);
            setDuration(dur);
          },
          onEnded: () => {
            handleAudioEndedRef.current();
          },
        });
      }
    };

    if (activePhase === 'english' || activePhase === 'urdu') {
      const speechLang = langCode as 'en' | 'ur';
      const urduId = profile.preferredUrduReciter || 'shamshad';
      const hasCachedMp3Sync = isAudioUrlCachedSync(rawUrl);

      if (hasCachedMp3Sync || !isAudioCacheIndexWarmed()) {
        getLocalOnlyCachedAudioUrl(rawUrl).then((localBlobUrl) => {
          if (isCancelled) {
            if (localBlobUrl) URL.revokeObjectURL(localBlobUrl);
            return;
          }
          if (localBlobUrl) {
            setOfflineSpeechReady(true);
            playBlobOrRemoteAudio(localBlobUrl);
            return;
          }
          // Not cached in CacheStorage:
          // Use Built-in 100% Offline Voice if OS has local/working voices OR if currently offline.
          // If OS has zero voices AND online, stream + cache the studio MP3 so it's saved offline too.
          if (offlineSpeech.hasWorkingSpeech(speechLang, urduId) || !isOnline) {
            startBuiltInOfflineVoice(speechLang);
          } else {
            getCachedAudioUrl(rawUrl).then(playBlobOrRemoteAudio);
          }
        });
      } else {
        // Synchronous path: MP3 not cached -> start built-in offline voice without async delay
        if (offlineSpeech.hasWorkingSpeech(speechLang, urduId) || !isOnline) {
          startBuiltInOfflineVoice(speechLang);
        } else {
          getCachedAudioUrl(rawUrl).then(playBlobOrRemoteAudio);
        }
      }

      return () => {
        isCancelled = true;
      };
    }

    // Arabic Qari recitation: offline-first CacheStorage resolution + gentle background prefetch
    setOfflineSpeechReady(true);
    usingSpeechForPhaseRef.current = false;
    getCachedAudioUrl(rawUrl).then(playBlobOrRemoteAudio);

    const prefetchUrls: string[] = [];
    for (let offset = 1; offset <= 2; offset++) {
      const nextAyah = activeAyahNumber + offset;
      if (nextAyah <= currentSurah.ayahs.length) {
        prefetchUrls.push(
          getAyahAudioUrlForLanguage(
            currentSurah.number,
            nextAyah,
            'ar',
            profile.preferredReciter,
            profile.preferredUrduReciter || 'shamshad'
          )
        );
      }
    }
    if (prefetchUrls.length > 0) {
      prefetchAyahAudioBatch(prefetchUrls).catch(() => {});
    }

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
    isOnline,
    getSpokenTranslationForActiveAyah,
  ]);

  // Update Profile helper with strict Urdu/Assamese mutual exclusivity invariant
  const handleUpdateProfile = useCallback((updates: Partial<UserProfileData>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...updates };
      if ('showAssamese' in updates && updates.showAssamese) {
        updated.showUrdu = false;
        if (
          updated.recitationLanguageMode === 'urdu' ||
          updated.recitationLanguageMode === 'both' ||
          updated.recitationLanguageMode === 'arabic_urdu'
        ) {
          updated.recitationLanguageMode = 'arabic';
        }
        if (updated.recitationLyricsLanguage === 'urdu') {
          updated.recitationLyricsLanguage = 'assamese';
        }
      } else if ('showUrdu' in updates && updates.showUrdu) {
        updated.showAssamese = false;
        if (updated.recitationLyricsLanguage === 'assamese') {
          updated.recitationLyricsLanguage = 'urdu';
        }
      }

      if ('recitationLanguageMode' in updates && updates.recitationLanguageMode) {
        const m = updates.recitationLanguageMode;
        if (m === 'urdu' || m === 'both' || m === 'arabic_urdu') {
          updated.showUrdu = true;
          updated.showAssamese = false;
          if (updated.recitationLyricsLanguage === 'assamese') {
            updated.recitationLyricsLanguage = 'urdu';
          }
        }
      }

      if ('recitationLyricsLanguage' in updates && updates.recitationLyricsLanguage) {
        if (updates.recitationLyricsLanguage === 'urdu') {
          updated.showUrdu = true;
          updated.showAssamese = false;
        } else if (updates.recitationLyricsLanguage === 'assamese') {
          updated.showAssamese = true;
          updated.showUrdu = false;
        }
      }

      // Guarantee both are never active at the same time
      if (updated.showUrdu && updated.showAssamese) {
        updated.showUrdu = false;
      }
      saveUserProfile(updated);
      return updated;
    });
  }, []);

  // Update Last Read Position persistently (isolated when reading favorites)
  const handleUpdateLastRead = useCallback(
    (position: LastReadPosition) => {
      if (isFavoriteReading) {
        // Reading any favorite surah does NOT interfere with continue reading
        return;
      }
      handleUpdateProfile({ lastRead: position });
    },
    [handleUpdateProfile, isFavoriteReading]
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
    const secondary = getSecondaryPhaseForDualMode(recMode);
    const activePhase = getActiveAudioPhase();

    if (repeatVerse) {
      if (secondary) {
        if (activePhase === 'arabic') {
          setCurrentAudioPhase(secondary);
        } else {
          setCurrentAudioPhase('arabic');
        }
      } else if (usingSpeechForPhaseRef.current && (activePhase === 'english' || activePhase === 'urdu') && currentSurah) {
        const ayahObj =
          currentSurah.ayahs.find((a) => a.numberInSurah === activeAyahNumber) || currentSurah.ayahs[0];
        const spokenText =
          activePhase === 'urdu'
            ? ayahObj?.textUrdu || ayahObj?.textEnglish || ''
            : ayahObj?.textEnglish || '';
        offlineSpeech.start(spokenText, playbackSpeed, {
          language: activePhase === 'urdu' ? 'ur' : 'en',
          urduReciterId: profile.preferredUrduReciter || 'shamshad',
          onProgress: (cur, dur) => {
            setCurrentTime(cur);
            setDuration(dur);
          },
          onEnded: () => handleAudioEndedRef.current(),
        });
      } else if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
      return;
    }

    // In dual mode (Arabic + Urdu / Arabic + English): play secondary translation for SAME ayah
    if (secondary && activePhase === 'arabic') {
      setCurrentAudioPhase(secondary);
      return;
    }

    // If we just finished secondary phase in dual mode, reset to Arabic for next ayah
    if (secondary && activePhase === secondary) {
      setCurrentAudioPhase('arabic');
    }

    if (currentSurah && ayahLoopRange.enabled) {
      const loopStart = Math.max(1, Math.min(ayahLoopRange.fromAyah, ayahLoopRange.toAyah, currentSurah.ayahs.length));
      const loopEnd = Math.max(loopStart, Math.min(ayahLoopRange.toAyah, currentSurah.ayahs.length));
      if (activeAyahNumber >= loopEnd || activeAyahNumber < loopStart) {
        setActiveAyahNumber(loopStart);
        const newlyRead = markAyahsReadToday(currentSurah.number, [loopStart]);
        if (newlyRead > 0) handleVerseRead(newlyRead);
        return;
      }
    }

    if (currentSurah && activeAyahNumber < currentSurah.ayahs.length) {
      const nextAyah = activeAyahNumber + 1;
      setActiveAyahNumber(nextAyah);
      const newlyRead = markAyahsReadToday(currentSurah.number, [nextAyah]);
      if (newlyRead > 0) handleVerseRead(newlyRead);
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

  handleAudioEndedRef.current = handleAudioEnded;

  const handleBackupRestored = useCallback(() => {
    setProfile(loadUserProfile());
    setImanRecord(loadImanRecord());
    setStreakInfo(calculateStreak());
    setBookmarks(loadAudioBookmarks());
    setDownloadedSurahs(getDownloadedSurahsList());
  }, []);

  const handleTogglePlayPause = () => {
    offlineSpeech.warmUp();
    const activePhase = getActiveAudioPhase();
    const speechLang: 'en' | 'ur' = activePhase === 'urdu' ? 'ur' : 'en';
    const rawUrl = currentSurah
      ? getAyahAudioUrlForLanguage(
          currentSurah.number,
          activeAyahNumber,
          activePhase === 'urdu' ? 'ur' : activePhase === 'english' ? 'en' : 'ar',
          profile.preferredReciter,
          profile.preferredUrduReciter || 'shamshad'
        )
      : '';

    const shouldUseSpeech =
      (activePhase === 'english' || activePhase === 'urdu') &&
      (usingSpeechForPhaseRef.current ||
        (!isAudioUrlCachedSync(rawUrl) &&
          (offlineSpeech.hasWorkingSpeech(speechLang, profile.preferredUrduReciter || 'shamshad') ||
            !isOnline)));

    if (shouldUseSpeech && (activePhase === 'english' || activePhase === 'urdu')) {
      usingSpeechForPhaseRef.current = true;
      if (isPlayingAudio) {
        offlineSpeech.pause();
        isSpeechPausedRef.current = true;
        setIsPlayingAudio(false);
      } else {
        if (isSpeechPausedRef.current) {
          offlineSpeech.resume();
          isSpeechPausedRef.current = false;
          setIsPlayingAudio(true);
        } else if (currentSurah) {
          const spokenText = getSpokenTranslationForActiveAyah(
            activePhase,
            currentSurah,
            activeAyahNumber
          );
          setIsPlayingAudio(true);
          {
            const newlyRead = markAyahsReadToday(currentSurah.number, [activeAyahNumber]);
            if (newlyRead > 0) handleVerseRead(newlyRead);
          }
          offlineSpeech.start(spokenText, playbackSpeed, {
            language: speechLang,
            urduReciterId: profile.preferredUrduReciter || 'shamshad',
            onProgress: (cur, dur) => {
              setCurrentTime(cur);
              setDuration(dur);
            },
            onEnded: () => handleAudioEndedRef.current(),
          });
        }
      }
      return;
    }

    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioClarity.attach(audioRef.current);
      audioClarity.setEnabled(profile.vocalClarityEnhancer !== false);
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
        if (currentSurah) {
          const newlyRead = markAyahsReadToday(currentSurah.number, [activeAyahNumber]);
          if (newlyRead > 0) handleVerseRead(newlyRead);
        }
      }).catch((err) => {
        console.warn('Playback error:', err);
        setIsPlayingAudio(false);
      });
    }
  };

  const handlePlayAyahInReciter = (ayahNum: number) => {
    offlineSpeech.warmUp();
    const recMode = profile.recitationLanguageMode || 'arabic';
    const targetPhase: 'arabic' | 'urdu' | 'english' =
      recMode === 'urdu'
        ? 'urdu'
        : recMode === 'english'
        ? 'english'
        : 'arabic';

    if (activeAyahNumber === ayahNum && getActiveAudioPhase() === targetPhase) {
      handleTogglePlayPause();
      return;
    }

    offlineSpeech.stop();
    isSpeechPausedRef.current = false;
    isPlayingAudioRef.current = true;
    setIsPlayingAudio(true);
    setActiveAyahNumber(ayahNum);
    setCurrentAudioPhase(targetPhase);
    if (currentSurah) {
      const newlyRead = markAyahsReadToday(currentSurah.number, [ayahNum]);
      if (newlyRead > 0) handleVerseRead(newlyRead);
    }
  };

  const handleNextAyah = () => {
    if (!currentSurah) return;
    if (activeAyahNumber < currentSurah.ayahs.length) {
      const next = activeAyahNumber + 1;
      const recMode = profile.recitationLanguageMode || 'arabic';
      setActiveAyahNumber(next);
      setCurrentAudioPhase(
        recMode === 'urdu' ? 'urdu' : recMode === 'english' ? 'english' : 'arabic'
      );
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
      const recMode = profile.recitationLanguageMode || 'arabic';
      setActiveAyahNumber(prev);
      setCurrentAudioPhase(
        recMode === 'urdu' ? 'urdu' : recMode === 'english' ? 'english' : 'arabic'
      );
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

  const handleSeekAudio = (seconds: number) => {
    if (usingSpeechForPhaseRef.current) {
      offlineSpeech.seekTo(seconds);
      return;
    }
    if (audioRef.current && isFinite(seconds)) {
      audioRef.current.currentTime = seconds;
      setCurrentTime(seconds);
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

  // Track verse reading progress (functional update prevents lost increments)
  const handleVerseRead = (count: number = 1) => {
    if (count <= 0) return;
    setImanRecord((prev) => {
      const updated: ImanDayRecord = {
        ...prev,
        versesRead: (prev.versesRead || 0) + count,
      };
      saveImanRecord(updated);
      setStreakInfo(calculateStreak());
      return updated;
    });
  };

  // Track Dhikr / Tasbih / Adhkar / Salawat increments cleanly
  const handleIncrementDhikr = (delta: number = 1) => {
    if (delta <= 0) return;
    setImanRecord((prev) => {
      const updated: ImanDayRecord = {
        ...prev,
        dhikrCount: (prev.dhikrCount || 0) + delta,
      };
      saveImanRecord(updated);
      setStreakInfo(calculateStreak());
      return updated;
    });
  };

  // Track Hadith lesson studied today cleanly
  const handleHadithStudied = (_hadithId: string) => {
    setImanRecord((prev) => {
      const updated: ImanDayRecord = {
        ...prev,
        hadithsStudied: (prev.hadithsStudied || 0) + 1,
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

  // Download Surah Offline (Arabic Qari MP3s + full Assamese/Urdu/English text; English & Urdu recitations are already 100% built-in offline)
  const handleDownloadSurah = async (_surahNum: number) => {
    if (!currentSurah || surahAudioDownloadProgress) return;
    const total = currentSurah.ayahs.length;
    setSurahAudioDownloadProgress({ current: 0, total });
    try {
      await saveSurahOffline(
        currentSurah,
        true,
        profile.preferredReciter,
        profile.preferredUrduReciter || 'shamshad',
        (current, tot) => setSurahAudioDownloadProgress({ current, total: tot })
      );
      setDownloadedSurahs(getDownloadedSurahsList());
      playGentleChime();
    } finally {
      setSurahAudioDownloadProgress(null);
    }
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
  const isCurrentSurahAudioOffline = downloadedSurahs.some(
    (s) => s.surahNumber === currentSurahNumber && s.hasAudio
  );
  const isFavorite = (profile.favoriteSurahs || []).includes(currentSurahNumber);

  return (
    <div className="h-screen sm:min-h-screen bg-stone-100 dark:bg-black flex flex-col items-center justify-start sm:p-4 transition-colors overflow-hidden">
      {/* Android Device Portrait Frame */}
      <div className="w-full max-w-md h-full sm:min-h-[92vh] sm:max-h-[96vh] sm:rounded-3xl bg-white text-black dark:bg-black dark:text-white flex flex-col overflow-hidden shadow-2xl relative sm:border border-stone-200 dark:border-stone-800">
        {/* Offline Mode Status Banner (visible when disconnected from network) */}
        {!isOnline && (
          <div className="w-full bg-black text-white dark:bg-white dark:text-black px-4 py-1.5 text-[11px] font-bold flex items-center justify-between border-b border-black/20 dark:border-white/20 shrink-0 select-none z-50">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white dark:bg-black animate-pulse" />
              <span>Offline Mode Active • Saved Quran & Recitations Ready</span>
            </span>
            <span className="text-[10px] opacity-80 font-mono">100% Offline</span>
          </div>
        )}

        {/* Hidden Audio Reciter Element */}
        <audio
          ref={audioRef}
          crossOrigin="anonymous"
          onTimeUpdate={() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime);
              setDuration(audioRef.current.duration || 0);
            }
          }}
          onEnded={handleAudioEnded}
          onError={() => {
            const recMode = profile.recitationLanguageMode || 'arabic';
            const secondary = getSecondaryPhaseForDualMode(recMode);
            if (secondary && getActiveAudioPhase() === 'arabic' && isPlayingAudioRef.current) {
              // If Arabic MP3 isn't cached offline, seamlessly advance to offline English/Urdu translation
              setCurrentAudioPhase(secondary);
              return;
            }
            setIsPlayingAudio(false);
          }}
        />

        {/* 0. Animated Full Salam App Introduction (Zero vertical scroll) */}
        {showIntro && <WelcomeSalamIntro onContinue={() => setShowIntro(false)} />}

        {/* 1. Android Dashboard (No notification bar, fluid Iman circle, favorites in dedicated tab, always start from last read) */}
        {activeView === 'dashboard' && (
          <AndroidDashboard
            imanRecord={imanRecord}
            profile={profile}
            prayerStatus={prayerStatus}
            streak={streakInfo.currentStreak}
            lastRead={profile.lastRead}
            onStartReading={() => {
              // Directly resume sequential Quran journey without favorite mode
              setIsFavoriteReading(false);
              setTimelineJumpActive(false);
              setHubJumpActive(false);
              setInitialHifzMaskOverride(false);
              setTargetAyahOverride(null);
              if (profile.lastRead?.surahNumber) {
                setCurrentSurahNumber(profile.lastRead.surahNumber);
                setActiveAyahNumber(profile.lastRead.ayahNumber || 1);
                setStartInFullScreen(true);
                setActiveView('reading');
              } else {
                setActiveView('surah_list');
              }
            }}
            onStartRecitation={() => {
              // Always start recitation from last read
              setIsFavoriteReading(false);
              setTimelineJumpActive(false);
              setHubJumpActive(false);
              setInitialHifzMaskOverride(false);
              setTargetAyahOverride(null);
              setCurrentSurahNumber(profile.lastRead?.surahNumber || 1);
              setActiveAyahNumber(profile.lastRead?.ayahNumber || 1);
              setActiveView('recitation');
            }}
            onStartHadithReading={() => setActiveView('hadith_library')}
            onStartHadithJourney={() => {
              setSelectedHadithTopicId(undefined);
              setActiveView('hadith_journey');
            }}
            onOpenSettings={handleOpenSettings}
            onTogglePrayer={handleTogglePrayer}
            onOpenImanTracker={() => setActiveView('iman')}
            onOpenFavoritesTab={() => setActiveView('favorites')}
            onSelectFavoriteSurah={(sNum) => {
              setIsFavoriteReading(true);
              setTimelineJumpActive(false);
              setHubJumpActive(false);
              setInitialHifzMaskOverride(false);
              setTargetAyahOverride(null);
              setCurrentSurahNumber(sNum);
              setActiveAyahNumber(1);
              setStartInFullScreen(true);
              setActiveView('reading');
            }}
            onOpenFavoritesModal={() => setActiveView('favorites')}
            onOpenQibla={() => setActiveView('qibla')}
            onOpenPrayerTimes={() => setIsPrayerTimesOpen(true)}
            onOpenSmartTasbih={() => setActiveView('tasbih')}
            onOpenDailyInspiration={() => setActiveView('inspiration')}
            onOpenKhatmahPlanner={() => setActiveView('khatmah')}
            onOpenProphetsTimeline={() => setActiveView('timeline')}
            onOpenSacredHub={() => setActiveView('sacred_hub')}
          />
        )}

        {/* 2. Complete List of 114 Surahs (Opens before reading, tapping a Surah launches full screen) */}
        {activeView === 'surah_list' && (
          <SurahListView
            onBackToDashboard={() => setActiveView('dashboard')}
            onSelectSurah={(num, fullScreen = true) => {
              setIsFavoriteReading(false);
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
            onBackToDashboard={() => {
              setTargetAyahOverride(null);
              setInitialHifzMaskOverride(false);
              if (hubJumpActive) {
                setHubJumpActive(false);
                setIsFavoriteReading(false);
                setActiveView('sacred_hub');
              } else if (timelineJumpActive) {
                setTimelineJumpActive(false);
                setIsFavoriteReading(false);
                setActiveView('timeline');
              } else if (isFavoriteReading) {
                setActiveView('favorites');
              } else {
                setActiveView('surah_list');
              }
            }}
            onSelectSurah={(num) => {
              setCurrentSurahNumber(num);
              setActiveAyahNumber(1);
              if (!isFavoriteReading) {
                handleUpdateLastRead({
                  surahNumber: num,
                  ayahNumber: 1,
                  surahName: currentSurah?.nameEnglish || `Surah ${num}`,
                  updatedAt: new Date().toISOString(),
                });
              }
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
            isFavoriteReading={isFavoriteReading}
            onUpdateLastRead={handleUpdateLastRead}
            initialTargetAyah={targetAyahOverride ?? (isFavoriteReading ? 1 : profile.lastRead?.ayahNumber)}
            initialFullScreen={startInFullScreen}
            initialHifzMask={initialHifzMaskOverride}
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
            onBackToDashboard={() => {
              if (hubJumpActive) {
                setHubJumpActive(false);
                setIsFavoriteReading(false);
                setActiveView('sacred_hub');
              } else if (timelineJumpActive) {
                setTimelineJumpActive(false);
                setIsFavoriteReading(false);
                setActiveView('timeline');
              } else {
                setActiveView(isFavoriteReading ? 'favorites' : 'dashboard');
              }
            }}
            onTogglePlayPause={handleTogglePlayPause}
            onNextAyah={handleNextAyah}
            onPrevAyah={handlePrevAyah}
            onToggleRepeatVerse={() => setRepeatVerse(!repeatVerse)}
            onChangeSpeed={(spd) => {
              setPlaybackSpeed(spd);
              if (audioRef.current) audioRef.current.playbackRate = spd;
              if (usingSpeechForPhaseRef.current && isPlayingAudio) {
                offlineSpeech.setSpeed(spd);
              }
            }}
            onSeekTime={handleSeekAudio}
            onSelectSurah={(num) => {
              offlineSpeech.stop();
              setCurrentSurahNumber(num);
              setActiveAyahNumber(1);
            }}
            onSelectAyah={(num) => {
              offlineSpeech.stop();
              setActiveAyahNumber(num);
            }}
            onPlayAyah={(num) => handlePlayAyahInReciter(num)}
            onAddBookmark={handleInitiateBookmark}
            profile={profile}
            onOpenSettings={handleOpenSettings}
            onOpenTafsir={handleOpenTafsir}
            onToggleFavoriteSurah={handleToggleFavoriteSurah}
            isFavoriteSurah={isFavorite}
            onUpdateProfile={handleUpdateProfile}
            currentAudioPhase={getActiveAudioPhase()}
            isCurrentSurahAudioOffline={isCurrentSurahAudioOffline}
            offlineSpeechReady={offlineSpeechReady}
            isOnline={isOnline}
            surahAudioDownloadProgress={surahAudioDownloadProgress}
            onDownloadCurrentSurahOffline={() => handleDownloadSurah(currentSurahNumber)}
            ayahLoopRange={ayahLoopRange}
            onUpdateAyahLoopRange={setAyahLoopRange}
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
            onBackupRestored={handleBackupRestored}
          />
        )}

        {/* 6. Sahih Hadith Library View (Start Hadith Reading) */}
        {activeView === 'hadith_library' && (
          <HadithLibraryView
            onBackToDashboard={() => setActiveView('dashboard')}
            onStartJourney={() => {
              setSelectedHadithTopicId(undefined);
              setActiveView('hadith_journey');
            }}
            onHadithStudied={handleHadithStudied}
          />
        )}

        {/* 7. Sahih Hadith Journey View (Start Hadith Journey - Topic Chapters & Lessons) */}
        {activeView === 'hadith_journey' && (
          <HadithJourneyView
            onBackToDashboard={() => setActiveView('dashboard')}
            onOpenLibrary={() => setActiveView('hadith_library')}
            onHadithStudied={handleHadithStudied}
            initialTopicId={selectedHadithTopicId}
          />
        )}

        {/* 8. Smart Digital Tasbih Full Tab View */}
        {activeView === 'tasbih' && (
          <SmartTasbihView
            onBackToDashboard={() => setActiveView('dashboard')}
            onDhikrCountUpdated={() => handleIncrementDhikr(1)}
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
            onReadingMarked={(pagesRead) => handleVerseRead(pagesRead * 15)}
          />
        )}

        {/* 11. Iman Level & Deep Spiritual Analysis Full Tab View */}
        {activeView === 'iman' && (
          <ImanAnalysisView
            imanRecord={imanRecord}
            profile={profile}
            streak={streakInfo.currentStreak}
            onUpdateImanRecord={handleUpdateImanRecord}
            onTogglePrayer={handleTogglePrayer}
            onBackToDashboard={() => setActiveView('dashboard')}
            onStartReading={() => setActiveView('surah_list')}
            onOpenSmartTasbih={() => setActiveView('tasbih')}
            onOpenHadithJourney={() => {
              setSelectedHadithTopicId(undefined);
              setActiveView('hadith_journey');
            }}
          />
        )}

        {/* 12. Favorite Surahs Dedicated Tab View */}
        {activeView === 'favorites' && (
          <FavoriteSurahsView
            onBackToDashboard={() => setActiveView('dashboard')}
            onReadSurah={(surahNum) => {
              setIsFavoriteReading(true);
              setCurrentSurahNumber(surahNum);
              setActiveAyahNumber(1);
              setStartInFullScreen(true);
              setActiveView('reading');
            }}
            onReciteSurah={(surahNum) => {
              setIsFavoriteReading(true);
              setCurrentSurahNumber(surahNum);
              setActiveAyahNumber(1);
              setActiveView('recitation');
            }}
            favoriteSurahs={profile.favoriteSurahs || []}
            onToggleFavorite={handleToggleFavoriteSurah}
            lastRead={profile.lastRead}
            profile={profile}
          />
        )}

        {/* 13. Offline Prophets & Sirah Vertical Timeline Study View */}
        {activeView === 'timeline' && (
          <ProphetsTimelineView
            profile={profile}
            onBackToDashboard={() => setActiveView('dashboard')}
            onOpenSettings={handleOpenSettings}
            onOpenAyahInReader={(surahNum, ayahNum) => {
              setTimelineJumpActive(true);
              setHubJumpActive(false);
              setInitialHifzMaskOverride(false);
              setIsFavoriteReading(true);
              setCurrentSurahNumber(surahNum);
              setTargetAyahOverride(ayahNum);
              setActiveAyahNumber(ayahNum);
              setStartInFullScreen(true);
              setActiveView('reading');
            }}
            onPlayAyahInReciter={(surahNum, ayahNum) => {
              setTimelineJumpActive(true);
              setHubJumpActive(false);
              setIsFavoriteReading(true);
              setCurrentSurahNumber(surahNum);
              setTargetAyahOverride(ayahNum);
              setActiveView('recitation');
              handlePlayAyahInReciter(ayahNum);
            }}
          />
        )}

        {/* 14. Dedicated Companions & Study Hub (Adhkar, 40 Rabbana, 99 Names, Tajweed, Topics, Hifz, Jumuah & Hijri) */}
        {activeView === 'sacred_hub' && (
          <SacredCompanionsView
            onBackToDashboard={() => setActiveView('dashboard')}
            onDhikrIncrement={handleIncrementDhikr}
            onOpenAyahInReader={(surahNum, ayahNum, opts) => {
              setHubJumpActive(true);
              setTimelineJumpActive(false);
              setInitialHifzMaskOverride(Boolean(opts?.enableHifzMask));
              setIsFavoriteReading(true);
              setCurrentSurahNumber(surahNum);
              setTargetAyahOverride(ayahNum);
              setActiveAyahNumber(ayahNum);
              setStartInFullScreen(true);
              setActiveView('reading');
            }}
            onPlayAyahInReciter={(surahNum, ayahNum) => {
              setHubJumpActive(true);
              setTimelineJumpActive(false);
              setIsFavoriteReading(true);
              setCurrentSurahNumber(surahNum);
              setTargetAyahOverride(ayahNum);
              setActiveView('recitation');
              handlePlayAyahInReciter(ayahNum);
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
          onBackupRestored={handleBackupRestored}
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
        onSelectHadithChapter={(chapterId) => {
          setSelectedHadithTopicId(chapterId);
          setActiveView('hadith_journey');
        }}
      />

      {/* Iman Tracker & Tasbih Modal */}
      <ImanTrackerModal
        isOpen={isImanTrackerOpen}
        onClose={() => setIsImanTrackerOpen(false)}
        imanRecord={imanRecord}
        profile={profile}
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
        profile={profile}
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
