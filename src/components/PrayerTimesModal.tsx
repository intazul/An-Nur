import React, { useEffect, useMemo, useState } from 'react';
import {
  X,
  Compass,
  MapPin,
  Clock,
  Volume2,
  CheckCircle2,
  Circle,
  Sliders,
  RefreshCw,
  Search,
  Calendar,
  Globe2,
  Sun,
  ChevronRight,
} from 'lucide-react';
import {
  CalculationMethod,
  AsrMethod,
  PrayerStatus,
  calculatePrecisePrayerTimes,
  calculatePrayerTimesForCivilDate,
  getSavedPrayerLocation,
  savePrayerLocation,
  getRecommendedMethodForLocation,
  getYearlySeasonalDistribution,
  formatDurationHoursMins,
  playSyntheticAdhanPreview,
} from '../utils/prayerTimes';
import { ALL_QIBLA_CITIES, CityRegion, QiblaCity, findNearestQiblaCity } from '../data/qiblaCities';
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

const REGION_FILTERS: ('All' | CityRegion)[] = [
  'All',
  'India',
  'Middle East',
  'South Asia',
  'Southeast Asia',
  'East Asia',
  'Central Asia',
  'Europe',
  'Africa',
  'North America',
  'South America',
  'Oceania',
];

export const PrayerTimesModal: React.FC<PrayerTimesModalProps> = ({
  isOpen,
  onClose,
  prayerStatus,
  onUpdatePrayerStatus,
  onTogglePrayer,
  prayersRecord,
  onOpenQibla,
}) => {
  const [savedLoc, setSavedLoc] = useState(() => getSavedPrayerLocation());
  const [method, setMethod] = useState<CalculationMethod>(prayerStatus.method || savedLoc.method || 'Karachi');
  const [asrMethod, setAsrMethod] = useState<AsrMethod>(prayerStatus.asrMethod || savedLoc.asrMethod || 'Hanafi');
  const [isLocating, setIsLocating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [activeTab, setActiveTab] = useState<'daily' | 'yearly'>('daily');
  const [yearlySubTab, setYearlySubTab] = useState<'seasons' | 'months'>('months');
  const [selectedDateISO, setSelectedDateISO] = useState<string>(() => prayerStatus.dateISO || '');
  const [isPlayingAdhan, setIsPlayingAdhan] = useState(false);

  // Location picker filters
  const [citySearch, setCitySearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<'All' | CityRegion>('All');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>('All');

  // Sync state when modal opens
  useEffect(() => {
    if (isOpen) {
      const currentSaved = getSavedPrayerLocation();
      setSavedLoc(currentSaved);
      setMethod(prayerStatus.method || currentSaved.method);
      setAsrMethod(prayerStatus.asrMethod || currentSaved.asrMethod);
      setSelectedDateISO(prayerStatus.dateISO || '');
      setStatusMessage(null);
    }
  }, [isOpen, prayerStatus.method, prayerStatus.asrMethod, prayerStatus.dateISO]);

  // Available countries within chosen region
  const availableCountries = useMemo(() => {
    const base =
      selectedRegion === 'All'
        ? ALL_QIBLA_CITIES
        : ALL_QIBLA_CITIES.filter((c) => c.region === selectedRegion);
    const unique = Array.from(new Set(base.map((c) => c.country))).sort((a, b) =>
      a.localeCompare(b)
    );
    return ['All', ...unique];
  }, [selectedRegion]);

  // Filtered city list
  const filteredCities = useMemo(() => {
    const q = citySearch.trim().toLowerCase();
    return ALL_QIBLA_CITIES.filter((c) => {
      if (selectedRegion !== 'All' && c.region !== selectedRegion) return false;
      if (selectedCountryFilter !== 'All' && c.country !== selectedCountryFilter) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        (c.state && c.state.toLowerCase().includes(q)) ||
        c.region.toLowerCase().includes(q)
      );
    });
  }, [citySearch, selectedRegion, selectedCountryFilter]);

  const todayISO = prayerStatus.dateISO || '';
  const isCustomDate = Boolean(selectedDateISO && todayISO && selectedDateISO !== todayISO);

  // Displayed PrayerStatus (either live Today or user-selected date in the year)
  const displayedStatus = useMemo<PrayerStatus>(() => {
    if (!isCustomDate || !selectedDateISO) {
      return prayerStatus;
    }
    return calculatePrayerTimesForCivilDate(
      selectedDateISO,
      savedLoc.lat,
      savedLoc.lng,
      method,
      asrMethod,
      savedLoc.name,
      savedLoc.timezone,
      savedLoc.cityId
    );
  }, [isCustomDate, selectedDateISO, prayerStatus, savedLoc, method, asrMethod]);

  // Year-round seasonal & monthly distribution for current chosen location
  const yearlyDistribution = useMemo(() => {
    const yr = selectedDateISO ? Number(selectedDateISO.split('-')[0]) || new Date().getFullYear() : new Date().getFullYear();
    return getYearlySeasonalDistribution(
      savedLoc.lat,
      savedLoc.lng,
      method,
      asrMethod,
      savedLoc.timezone,
      yr
    );
  }, [savedLoc.lat, savedLoc.lng, savedLoc.timezone, method, asrMethod, selectedDateISO]);

  // Highlight active month number (1..12)
  const currentMonthIdx = useMemo(() => {
    const iso = displayedStatus.dateISO || '';
    const m = Number(iso.split('-')[1]);
    return m >= 1 && m <= 12 ? m - 1 : new Date().getMonth();
  }, [displayedStatus.dateISO]);

  if (!isOpen) return null;

  const applyAndSaveLocation = (
    nextLoc: {
      cityId?: string;
      lat: number;
      lng: number;
      name: string;
      country?: string;
      timezone?: string;
    },
    nextMethod: CalculationMethod,
    nextAsr: AsrMethod
  ) => {
    const fullSaved = {
      ...nextLoc,
      method: nextMethod,
      asrMethod: nextAsr,
    };
    savePrayerLocation(fullSaved);
    setSavedLoc(fullSaved);
    setMethod(nextMethod);
    setAsrMethod(nextAsr);

    const updated = calculatePrecisePrayerTimes(
      fullSaved.lat,
      fullSaved.lng,
      new Date(),
      nextMethod,
      nextAsr,
      fullSaved.name,
      fullSaved.timezone,
      fullSaved.cityId
    );
    setSelectedDateISO(updated.dateISO || '');
    onUpdatePrayerStatus(updated);
  };

  // Manual city selection from global/India list
  const handleSelectCity = (city: QiblaCity) => {
    const recommended = getRecommendedMethodForLocation(city.country, city.region);
    const label = city.state
      ? `${city.name}, ${city.state}, ${city.country}`
      : `${city.name}, ${city.country}`;
    applyAndSaveLocation(
      {
        cityId: city.id,
        lat: city.lat,
        lng: city.lng,
        name: label,
        country: city.country,
        timezone: city.timezone,
      },
      recommended.method,
      recommended.asrMethod
    );
    setShowLocationPicker(false);
    setStatusMessage(`Updated to ${city.name} (${recommended.method} · ${recommended.asrMethod})`);
  };

  // Handle GPS location request without window.alert
  const handleGetGPS = () => {
    if (!navigator.geolocation) {
      setStatusMessage('Geolocation is unavailable on this browser. Please select a city below.');
      setShowLocationPicker(true);
      return;
    }
    setIsLocating(true);
    setStatusMessage('Detecting live GPS coordinates...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const { latitude, longitude } = pos.coords;
        const nearest = findNearestQiblaCity(latitude, longitude);
        const recommended = getRecommendedMethodForLocation(nearest?.country, nearest?.region);
        const locName = nearest ? `${nearest.name}, ${nearest.country} (GPS)` : 'Current GPS';
        const deviceTz =
          nearest?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;

        applyAndSaveLocation(
          {
            cityId: nearest?.id,
            lat: latitude,
            lng: longitude,
            name: locName,
            country: nearest?.country,
            timezone: deviceTz,
          },
          recommended.method,
          recommended.asrMethod
        );
        setShowLocationPicker(false);
        setStatusMessage(`GPS synced near ${nearest?.name || 'your location'}`);
      },
      (err) => {
        setIsLocating(false);
        setStatusMessage(
          err.code === err.PERMISSION_DENIED
            ? 'GPS permission denied. Choose any city manually below.'
            : 'Unable to acquire GPS signal. Select your city manually below.'
        );
        setShowLocationPicker(true);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleMethodChange = (newMethod: CalculationMethod) => {
    applyAndSaveLocation(
      {
        cityId: savedLoc.cityId,
        lat: savedLoc.lat,
        lng: savedLoc.lng,
        name: savedLoc.name,
        country: savedLoc.country,
        timezone: savedLoc.timezone,
      },
      newMethod,
      asrMethod
    );
  };

  const handleAsrMethodChange = (newAsr: AsrMethod) => {
    applyAndSaveLocation(
      {
        cityId: savedLoc.cityId,
        lat: savedLoc.lat,
        lng: savedLoc.lng,
        name: savedLoc.name,
        country: savedLoc.country,
        timezone: savedLoc.timezone,
      },
      method,
      newAsr
    );
  };

  const handleTestAdhan = () => {
    setIsPlayingAdhan(true);
    playSyntheticAdhanPreview();
    setTimeout(() => setIsPlayingAdhan(false), 3000);
  };

  // Compute 24-hour distribution timeline percentages for the displayed date
  const fajrItem = displayedStatus.prayers.find((p) => p.id === 'fajr');
  const sunriseItem = displayedStatus.prayers.find((p) => p.id === 'sunrise');
  const dhuhrItem = displayedStatus.prayers.find((p) => p.id === 'dhuhr');
  const asrItem = displayedStatus.prayers.find((p) => p.id === 'asr');
  const maghribItem = displayedStatus.prayers.find((p) => p.id === 'maghrib');
  const ishaItem = displayedStatus.prayers.find((p) => p.id === 'isha');

  const toPct = (mins?: number) => Math.max(0, Math.min(100, ((mins ?? 0) / 1440) * 100));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in select-none"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-black dark:text-white font-cinzel leading-tight">
                Namaz Times &amp; Seasons
              </h2>
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                <MapPin className="w-3 h-3 text-black dark:text-white shrink-0" />
                <span className="truncate">{displayedStatus.locationName}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                setShowSettings((prev) => !prev);
                if (!showSettings) setShowLocationPicker(false);
              }}
              className={`p-2 rounded-xl transition-all ${
                showSettings
                  ? 'bg-black text-white dark:bg-white dark:text-black ring-2 ring-neutral-400'
                  : 'bg-neutral-100 text-black dark:bg-neutral-800 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
              title="Calculation Settings"
              aria-label="Calculation Settings"
            >
              <Sliders className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-black text-white dark:bg-white dark:text-black rounded-xl active:scale-95 transition-transform"
              aria-label="Close Prayer Times"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {/* Next Prayer Highlight Banner */}
          <div className="p-4 rounded-2xl bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white flex items-center justify-between gap-2">
            <div className="space-y-0.5 min-w-0">
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-80 block">
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
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] opacity-85 font-mono">
                <span>{prayerStatus.nextPrayer?.timeString}</span>
                {prayerStatus.locationLocalTime && (
                  <span>
                    • Local {prayerStatus.locationLocalTime} ({prayerStatus.utcOffsetLabel})
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
              <button
                onClick={handleTestAdhan}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-black dark:bg-black dark:text-white text-xs font-bold transition-all active:scale-95"
                title="Preview gentle Adhan chime"
              >
                <Volume2 className="w-3.5 h-3.5" />
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

          {/* Location Bar: Choose Any Country/City or Sync GPS */}
          <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setShowLocationPicker((prev) => !prev);
                  setShowSettings(false);
                }}
                className="flex items-center gap-2 min-w-0 text-left flex-1 group"
              >
                <div className="w-8 h-8 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center shrink-0">
                  <Globe2 className="w-4 h-4 text-black dark:text-white" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-black dark:text-white truncate block group-hover:underline">
                    {savedLoc.name}
                  </span>
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block">
                    {showLocationPicker
                      ? 'Hide country & city selector'
                      : `Change city (${ALL_QIBLA_CITIES.length}+ India & global cities)`}
                  </span>
                </div>
              </button>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => {
                    setShowLocationPicker((prev) => !prev);
                    setShowSettings(false);
                  }}
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition-all ${
                    showLocationPicker
                      ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                      : 'bg-white text-black border-neutral-300 dark:bg-neutral-900 dark:text-white dark:border-neutral-700'
                  }`}
                >
                  Cities
                </button>
                <button
                  onClick={handleGetGPS}
                  disabled={isLocating}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-100 font-bold text-[11px] shrink-0 active:scale-95 transition-all"
                  title="Use Live Device GPS"
                >
                  <RefreshCw className={`w-3 h-3 ${isLocating ? 'animate-spin' : ''}`} />
                  <span>{isLocating ? '...' : 'GPS'}</span>
                </button>
              </div>
            </div>

            {statusMessage && (
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400 px-0.5 leading-snug">
                {statusMessage}
              </p>
            )}
          </div>

          {/* Interactive Global & India City Selector Drawer */}
          {showLocationPicker && (
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 space-y-2.5 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-black dark:text-white">
                  Choose Country, State or City
                </span>
                <span className="text-[10px] font-mono text-neutral-500">
                  {filteredCities.length} cities
                </span>
              </div>

              {/* Search Input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  placeholder="Search city, Indian state, or country..."
                  className="w-full pl-8 pr-8 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-xs text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-black dark:focus:border-white"
                  autoFocus
                />
                {citySearch && (
                  <button
                    onClick={() => setCitySearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black dark:hover:text-white"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Region Filter Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {REGION_FILTERS.map((reg) => (
                  <button
                    key={reg}
                    onClick={() => {
                      setSelectedRegion(reg);
                      setSelectedCountryFilter('All');
                    }}
                    className={`shrink-0 px-2.5 py-1 rounded-lg text-[10.5px] font-bold border transition-all ${
                      selectedRegion === reg
                        ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                        : 'bg-white text-neutral-700 border-neutral-300 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700'
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>

              {/* Country Sub-filter Dropdown when helpful */}
              {availableCountries.length > 2 && (
                <select
                  value={selectedCountryFilter}
                  onChange={(e) => setSelectedCountryFilter(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-black dark:text-white focus:outline-none"
                >
                  {availableCountries.map((country) => (
                    <option key={country} value={country}>
                      {country === 'All'
                        ? `All Countries in ${selectedRegion} (${availableCountries.length - 1})`
                        : country}
                    </option>
                  ))}
                </select>
              )}

              {/* Scrollable Results List */}
              <div className="max-h-56 overflow-y-auto space-y-1 pr-0.5">
                {filteredCities.map((city) => {
                  const isActive = savedLoc.cityId === city.id;
                  return (
                    <button
                      key={city.id}
                      onClick={() => handleSelectCity(city)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between gap-2 transition-all active:scale-[0.99] ${
                        isActive
                          ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                          : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-black dark:text-white hover:border-black dark:hover:border-white'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs truncate">{city.name}</span>
                          {city.state && (
                            <span className="text-[10px] opacity-70 truncate">
                              ({city.state})
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] opacity-75 block truncate">
                          {city.country} · {city.timezone}
                        </span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                    </button>
                  );
                })}
                {filteredCities.length === 0 && (
                  <p className="py-6 text-center text-xs text-neutral-500">
                    No matching city found. Try another city, state, or country name.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Calculation Settings Drawer */}
          {showSettings && (
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-3 animate-in fade-in">
              <h3 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                Calculation &amp; Asr Settings
              </h3>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-neutral-600 dark:text-neutral-400">
                  Calculation Method:
                </label>
                <select
                  value={method}
                  onChange={(e) => handleMethodChange(e.target.value as CalculationMethod)}
                  className="w-full p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-xs font-bold text-black dark:text-white focus:outline-none"
                >
                  <option value="Karachi">Univ. of Islamic Sciences, Karachi (India/S. Asia 18°/18°)</option>
                  <option value="MWL">Muslim World League (MWL - 18°/17°)</option>
                  <option value="Makkah">Umm Al-Qura University, Makkah (18.5°/90m)</option>
                  <option value="ISNA">ISNA (North America - 15°/15°)</option>
                  <option value="Egypt">Egyptian General Authority of Survey (19.5°/17.5°)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-neutral-600 dark:text-neutral-400">
                  Asr Juristic Method:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => handleAsrMethodChange('Standard')}
                    className={`p-2 rounded-xl border text-center font-bold transition-all ${
                      asrMethod === 'Standard'
                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-2xs'
                        : 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    Standard (Shafi/Maliki/Hanbali)
                  </button>
                  <button
                    onClick={() => handleAsrMethodChange('Hanafi')}
                    className={`p-2 rounded-xl border text-center font-bold transition-all ${
                      asrMethod === 'Hanafi'
                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-2xs'
                        : 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    Hanafi (Later Asr)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Mode Tabs: Daily Schedule vs Year-Round Distribution */}
          <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => setActiveTab('daily')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'daily'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-2xs'
                  : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              Daily Distribution
            </button>
            <button
              onClick={() => setActiveTab('yearly')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'yearly'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-2xs'
                  : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              Year-Round Shift
            </button>
          </div>

          {activeTab === 'daily' ? (
            <>
              {/* Date Inspector Row + Daylight / Fasting Span */}
              <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-black dark:text-white">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{displayedStatus.dateLabel || 'Today'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {isCustomDate && (
                      <button
                        onClick={() => setSelectedDateISO(todayISO)}
                        className="px-2 py-1 rounded-lg bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold"
                      >
                        Today
                      </button>
                    )}
                    <input
                      type="date"
                      value={selectedDateISO || todayISO}
                      onChange={(e) => setSelectedDateISO(e.target.value)}
                      className="px-2 py-1 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-[11px] font-mono font-bold text-black dark:text-white"
                      aria-label="Inspect prayer distribution for any date of the year"
                    />
                  </div>
                </div>

                {/* 24-Hour Solar Prayer Distribution Bar */}
                {fajrItem && sunriseItem && maghribItem && ishaItem && (
                  <div className="space-y-1.5">
                    <div className="relative h-2.5 w-full rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden flex">
                      {/* Night -> Fajr */}
                      <div
                        className="h-full bg-neutral-800 dark:bg-neutral-700"
                        style={{ width: `${toPct(fajrItem.timeMinutes)}%` }}
                      />
                      {/* Fajr -> Sunrise */}
                      <div
                        className="h-full bg-neutral-400 dark:bg-neutral-500"
                        style={{
                          width: `${Math.max(0, toPct(sunriseItem.timeMinutes) - toPct(fajrItem.timeMinutes))}%`,
                        }}
                      />
                      {/* Sunrise -> Maghrib (Daylight) */}
                      <div
                        className="h-full bg-white dark:bg-neutral-200 border-x border-neutral-300"
                        style={{
                          width: `${Math.max(0, toPct(maghribItem.timeMinutes) - toPct(sunriseItem.timeMinutes))}%`,
                        }}
                      />
                      {/* Maghrib -> Isha */}
                      <div
                        className="h-full bg-neutral-400 dark:bg-neutral-500"
                        style={{
                          width: `${Math.max(0, toPct(ishaItem.timeMinutes) - toPct(maghribItem.timeMinutes))}%`,
                        }}
                      />
                      {/* Isha -> Midnight */}
                      <div className="flex-1 h-full bg-neutral-800 dark:bg-neutral-700" />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">
                      <span>Fajr {fajrItem.timeString}</span>
                      <span>
                        Daylight{' '}
                        {formatDurationHoursMins(displayedStatus.daylightMinutes || 0)}
                      </span>
                      <span>Maghrib {maghribItem.timeString}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-neutral-500 dark:text-neutral-400">
                      <span>
                        Fajr → Maghrib:{' '}
                        <strong className="text-black dark:text-white font-mono">
                          {formatDurationHoursMins(displayedStatus.fastingSpanMinutes || 0)}
                        </strong>
                      </span>
                      <span className="font-mono">
                        Dhuhr {dhuhrItem?.timeString} · Asr {asrItem?.timeString}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Complete Prayers List */}
              <div className="space-y-1.5">
                {displayedStatus.prayers.map((prayer) => {
                  const isObligatory = !prayer.isVoluntary;
                  const isDone =
                    !isCustomDate && prayersRecord && isObligatory
                      ? prayersRecord[prayer.id as keyof DailyPrayers]
                      : false;
                  const isHighlighted = !isCustomDate && prayer.isNext;

                  return (
                    <div
                      key={prayer.id}
                      className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                        isHighlighted
                          ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-md font-bold'
                          : prayer.isVoluntary
                          ? 'bg-neutral-50 dark:bg-neutral-950/40 border-neutral-200 dark:border-neutral-800/60 opacity-85'
                          : isDone
                          ? 'bg-neutral-100 dark:bg-neutral-900/50 border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300'
                          : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-black dark:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isObligatory && onTogglePrayer && !isCustomDate && (
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
                            {isHighlighted && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white text-black dark:bg-black dark:text-white uppercase tracking-wider">
                                Next
                              </span>
                            )}
                            {prayer.isVoluntary && (
                              <span className="text-[9px] text-neutral-400 font-medium">
                                (Sunnah / Solar)
                              </span>
                            )}
                          </div>
                          <span className="font-quran text-xs text-neutral-500 dark:text-neutral-400">
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
            </>
          ) : (
            /* Year-Round Seasonal & Monthly Distribution View */
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-black dark:text-white">
                    <Sun className="w-3.5 h-3.5" />
                    <span>Seasonal Distribution ({savedLoc.name.split(',')[0]})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setYearlySubTab('months')}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold border ${
                        yearlySubTab === 'months'
                          ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                          : 'bg-white text-neutral-600 border-neutral-300 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700'
                      }`}
                    >
                      12 Months
                    </button>
                    <button
                      onClick={() => setYearlySubTab('seasons')}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold border ${
                        yearlySubTab === 'seasons'
                          ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                          : 'bg-white text-neutral-600 border-neutral-300 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700'
                      }`}
                    >
                      4 Seasons
                    </button>
                  </div>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                  Prayer times shift continuously as solar declination and DST change through the year. Tap any row to open that date’s full schedule.
                </p>
              </div>

              <div className="space-y-1.5">
                {(yearlySubTab === 'seasons'
                  ? yearlyDistribution.seasons
                  : yearlyDistribution.months
                ).map((row, idx) => {
                  const isCurrentMonth =
                    yearlySubTab === 'months' && idx === currentMonthIdx;

                  return (
                    <button
                      key={row.dateISO}
                      onClick={() => {
                        setSelectedDateISO(row.dateISO);
                        setActiveTab('daily');
                      }}
                      className={`w-full text-left p-2.5 rounded-2xl border transition-all active:scale-[0.99] space-y-1.5 ${
                        isCurrentMonth
                          ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white'
                          : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-black dark:text-white hover:border-black dark:hover:border-white'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold">
                          {row.label}
                          {isCurrentMonth && ' (Active Month)'}
                        </span>
                        <span className="text-[10px] font-mono opacity-80">
                          Fast Span {formatDurationHoursMins(row.fastingMinutes)}
                        </span>
                      </div>

                      <div className="grid grid-cols-5 gap-1 text-[10px] font-mono tabular-nums">
                        <div>
                          <span className="opacity-65 block text-[9px]">Fajr</span>
                          <strong>{row.fajr.replace(' AM', 'a')}</strong>
                        </div>
                        <div>
                          <span className="opacity-65 block text-[9px]">Dhuhr</span>
                          <strong>{row.dhuhr.replace(' PM', 'p').replace(' AM', 'a')}</strong>
                        </div>
                        <div>
                          <span className="opacity-65 block text-[9px]">Asr</span>
                          <strong>{row.asr.replace(' PM', 'p')}</strong>
                        </div>
                        <div>
                          <span className="opacity-65 block text-[9px]">Maghrib</span>
                          <strong>{row.maghrib.replace(' PM', 'p')}</strong>
                        </div>
                        <div>
                          <span className="opacity-65 block text-[9px]">Isha</span>
                          <strong>{row.isha.replace(' PM', 'p').replace(' AM', 'a')}</strong>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
