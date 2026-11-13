import React, { useState } from 'react';
import {
  X,
  Compass,
  MapPin,
  Clock,
  Volume2,
  CheckCircle2,
  Circle,
  Sliders,
  ChevronDown,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import {
  CalculationMethod,
  AsrMethod,
  PrayerStatus,
  calculatePrecisePrayerTimes,
  playSyntheticAdhanPreview,
} from '../utils/prayerTimes';
import { ALL_QIBLA_CITIES, findNearestQiblaCity } from '../data/qiblaCities';
import { DailyPrayers } from '../types/quran';

interface PrayerTimesModalProps {
  isOpen: boolean;
  onClose: () => void;
  prayerStatus: PrayerStatus;
  onUpdatePrayerStatus: (status: PrayerStatus) => void;
  onTogglePrayer?: (key: keyof DailyPrayers) => void;
  prayersRecord?: DailyPrayers;
  onOpenQibla?: () => void;
}

export const PrayerTimesModal: React.FC<PrayerTimesModalProps> = ({
  isOpen,
  onClose,
  prayerStatus,
  onUpdatePrayerStatus,
  onTogglePrayer,
  prayersRecord,
  onOpenQibla,
}) => {
  const [method, setMethod] = useState<CalculationMethod>(prayerStatus.method || 'MWL');
  const [asrMethod, setAsrMethod] = useState<AsrMethod>(prayerStatus.asrMethod || 'Standard');
  const [isLocating, setIsLocating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isPlayingAdhan, setIsPlayingAdhan] = useState(false);

  if (!isOpen) return null;

  // Handle GPS location request
  const handleGetGPS = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const { latitude, longitude } = pos.coords;
        const nearest = findNearestQiblaCity(latitude, longitude);
        const locName = nearest ? `${nearest.name}, ${nearest.country}` : 'Current GPS';

        // Save location preferences
        const updated = calculatePrecisePrayerTimes(
          latitude,
          longitude,
          new Date(),
          method,
          asrMethod,
          locName
        );
        onUpdatePrayerStatus(updated);

        try {
          localStorage.setItem(
            'annur_saved_location',
            JSON.stringify({
              lat: latitude,
              lng: longitude,
              name: locName,
              method,
              asrMethod,
            })
          );
        } catch (e) {
          // ignore
        }
      },
      (err) => {
        setIsLocating(false);
        console.warn('Geolocation error:', err);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleMethodChange = (newMethod: CalculationMethod) => {
    setMethod(newMethod);
    // Recalculate with current saved coordinates
    try {
      const savedLoc = localStorage.getItem('annur_saved_location');
      const lat = savedLoc ? JSON.parse(savedLoc).lat : 28.6139;
      const lng = savedLoc ? JSON.parse(savedLoc).lng : 77.209;
      const locName = savedLoc ? JSON.parse(savedLoc).name : prayerStatus.locationName;
      const updated = calculatePrecisePrayerTimes(lat, lng, new Date(), newMethod, asrMethod, locName);
      onUpdatePrayerStatus(updated);
    } catch (e) {
      // ignore
    }
  };

  const handleAsrMethodChange = (newAsr: AsrMethod) => {
    setAsrMethod(newAsr);
    try {
      const savedLoc = localStorage.getItem('annur_saved_location');
      const lat = savedLoc ? JSON.parse(savedLoc).lat : 28.6139;
      const lng = savedLoc ? JSON.parse(savedLoc).lng : 77.209;
      const locName = savedLoc ? JSON.parse(savedLoc).name : prayerStatus.locationName;
      const updated = calculatePrecisePrayerTimes(lat, lng, new Date(), method, newAsr, locName);
      onUpdatePrayerStatus(updated);
    } catch (e) {
      // ignore
    }
  };

  const handleTestAdhan = () => {
    setIsPlayingAdhan(true);
    playSyntheticAdhanPreview();
    setTimeout(() => setIsPlayingAdhan(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-black dark:text-white font-cinzel">
                Prayer Times & Adhan
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <MapPin className="w-3 h-3 text-black dark:text-white" />
                <span className="truncate max-w-[180px]">{prayerStatus.locationName}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-xl transition-all ${
                showSettings
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-black text-white dark:bg-white dark:text-black opacity-80 hover:opacity-100'
              }`}
              title="Calculation Settings"
            >
              <Sliders className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-black text-white dark:bg-white dark:text-black rounded-xl"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Next Prayer Highlight Banner */}
          <div className="p-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">
                Next Prayer In {prayerStatus.timeUntilNext}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-cinzel">
                  {prayerStatus.nextPrayer?.name}
                </span>
                <span className="font-quran text-lg opacity-85">
                  {prayerStatus.nextPrayer?.arabicName}
                </span>
              </div>
              <span className="text-xs opacity-80 font-mono">
                {prayerStatus.nextPrayer?.timeString}
              </span>
            </div>

            <div className="flex flex-col items-end gap-2">
              <button
                onClick={handleTestAdhan}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-black dark:bg-black dark:text-white text-xs font-bold transition-all active:scale-95"
                title="Preview gentle Adhan chime"
              >
                <Volume2 className={`w-3.5 h-3.5 ${isPlayingAdhan ? 'animate-pulse' : ''}`} />
                <span>{isPlayingAdhan ? 'Playing…' : 'Adhan Tone'}</span>
              </button>

              {onOpenQibla && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenQibla();
                  }}
                  className="flex items-center gap-1 text-[11px] font-bold hover:underline"
                >
                  <Compass className="w-3 h-3" />
                  <span>Qibla Compass →</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Location & GPS Action */}
          <div className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs">
            <div className="flex items-center gap-2 truncate">
              <MapPin className="w-4 h-4 text-black dark:text-white shrink-0" />
              <span className="font-medium text-stone-900 dark:text-stone-200 truncate">
                {prayerStatus.locationName}
              </span>
            </div>

            <button
              onClick={handleGetGPS}
              disabled={isLocating}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black text-white hover:bg-stone-800 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-bold text-xs shrink-0 active:scale-95 transition-all"
            >
              <RefreshCw className={`w-3 h-3 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? 'Locating...' : 'GPS Sync'}</span>
            </button>
          </div>

          {/* Calculation Settings Drawer (Toggleable) */}
          {showSettings && (
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-3 animate-in fade-in">
              <h3 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                Calculation Settings
              </h3>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400">
                  Calculation Method:
                </label>
                <select
                  value={method}
                  onChange={(e) => handleMethodChange(e.target.value as CalculationMethod)}
                  className="w-full p-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-xs font-bold text-black dark:text-white focus:outline-none"
                >
                  <option value="MWL">Muslim World League (MWL - 18°/17°)</option>
                  <option value="ISNA">ISNA (North America - 15°/15°)</option>
                  <option value="Karachi">University of Islamic Sciences, Karachi (18°/18°)</option>
                  <option value="Makkah">Umm Al-Qura University, Makkah</option>
                  <option value="Egypt">Egyptian General Authority of Survey (19.5°/17.5°)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400">
                  Asr Juristic Method:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => handleAsrMethodChange('Standard')}
                    className={`p-2 rounded-xl border text-center font-bold transition-all ${
                      asrMethod === 'Standard'
                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-2xs'
                        : 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    Standard (Shafi/Maliki/Hanbali)
                  </button>
                  <button
                    onClick={() => handleAsrMethodChange('Hanafi')}
                    className={`p-2 rounded-xl border text-center font-bold transition-all ${
                      asrMethod === 'Hanafi'
                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-2xs'
                        : 'bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    Hanafi (Later Asr)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Complete Prayers List */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white px-1">
              Today's Schedule
            </h3>

            <div className="space-y-1.5">
              {prayerStatus.prayers.map((prayer) => {
                const isObligatory = !prayer.isVoluntary;
                const isDone = prayersRecord && isObligatory ? prayersRecord[prayer.id as keyof DailyPrayers] : false;

                return (
                  <div
                    key={prayer.id}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                      prayer.isNext
                        ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-md font-bold'
                        : prayer.isVoluntary
                        ? 'bg-stone-50 dark:bg-stone-950/40 border-stone-200 dark:border-stone-800/60 opacity-80'
                        : isDone
                        ? 'bg-stone-100 dark:bg-stone-900/50 border-stone-300 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                        : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-black dark:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isObligatory && onTogglePrayer && (
                        <button
                          onClick={() => onTogglePrayer(prayer.id as keyof DailyPrayers)}
                          className="p-1 -ml-1 text-inherit active:scale-90 transition-transform"
                          title="Mark prayer complete"
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <Circle className="w-5 h-5 opacity-40" />
                          )}
                        </button>
                      )}

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">{prayer.name}</span>
                          {prayer.isNext && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white text-black dark:bg-black dark:text-white uppercase tracking-wider">
                              Next
                            </span>
                          )}
                          {prayer.isVoluntary && (
                            <span className="text-[9px] text-stone-400 font-medium">
                              (Sunnah / Voluntary)
                            </span>
                          )}
                        </div>
                        <span className="font-quran text-xs text-stone-500 dark:text-stone-400">
                          {prayer.arabicName}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-bold text-sm tabular-nums">
                        {prayer.timeString}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
