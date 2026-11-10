import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ArrowLeft,
  Compass,
  MapPin,
  Navigation,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  LocateFixed,
  Search,
  Check,
  ShieldCheck,
  Radio,
  Sliders,
  X,
  Globe2,
} from 'lucide-react';
import {
  ALL_QIBLA_CITIES,
  QiblaCity,
  calculateQiblaBearing,
  calculateDistanceToKaaba,
  findNearestQiblaCity,
  KAABA_LAT,
  KAABA_LNG,
} from '../data/qiblaCities';
import { playGentleChime } from '../utils/notifications';

interface QiblaFinderViewProps {
  onBackToDashboard: () => void;
}

const REGION_FILTERS = [
  'All',
  'India',
  'Middle East',
  'South Asia',
  'Southeast Asia',
  'Europe',
  'North America',
  'Africa',
  'Central Asia',
  'Oceania',
] as const;

export const QiblaFinderView: React.FC<QiblaFinderViewProps> = ({ onBackToDashboard }) => {
  // Default to New Delhi, India or previously saved GPS
  const [selectedCity, setSelectedCity] = useState<QiblaCity>(() => {
    try {
      const saved = localStorage.getItem('annur_qibla_last_city');
      if (saved) {
        const found = ALL_QIBLA_CITIES.find((c) => c.id === saved);
        if (found) return found;
      }
    } catch {
      // ignore
    }
    return ALL_QIBLA_CITIES.find((c) => c.id === 'in-delhi') || ALL_QIBLA_CITIES[0];
  });

  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>(() => ({
    lat: selectedCity.lat,
    lng: selectedCity.lng,
  }));

  const [locationTitle, setLocationTitle] = useState<string>(
    `${selectedCity.name}, ${selectedCity.country}`
  );
  const [isUsingLiveGps, setIsUsingLiveGps] = useState<boolean>(false);
  const [gpsAccuracy, setGpsAccuracy] = useState<number | null>(null);
  const [gpsLoading, setGpsLoading] = useState<boolean>(false);
  const [gpsStatusMessage, setGpsStatusMessage] = useState<string | null>(null);

  // Compass state
  const [rawHeading, setRawHeading] = useState<number>(0);
  const [smoothHeading, setSmoothHeading] = useState<number>(0);
  const [hasSensorSupport, setHasSensorSupport] = useState<boolean>(false);
  const [requiresPermission, setRequiresPermission] = useState<boolean>(false);
  const [chimePlayed, setChimePlayed] = useState<boolean>(false);

  // City Picker Modal & Search
  const [showCityPicker, setShowCityPicker] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('India');

  // Animation frame ref for silky smooth circular interpolation
  const animationFrameRef = useRef<number | null>(null);
  const rawHeadingRef = useRef<number>(0);
  const smoothHeadingRef = useRef<number>(0);
  const watchIdRef = useRef<number | null>(null);

  // Qibla bearing from current coordinates (exact to Kaaba)
  const qiblaBearing = useMemo(() => {
    return calculateQiblaBearing(coordinates.lat, coordinates.lng);
  }, [coordinates.lat, coordinates.lng]);

  const distanceKm = useMemo(() => {
    return calculateDistanceToKaaba(coordinates.lat, coordinates.lng);
  }, [coordinates.lat, coordinates.lng]);

  // Angular difference between smoothed device heading and Kaaba
  const needleAngle = (qiblaBearing - smoothHeading + 360) % 360;

  // Aligned when pointing within ±3.5 degrees of true Qibla
  const isAligned = needleAngle <= 3.5 || needleAngle >= 356.5;

  // Haptic feedback & gentle chime on alignment
  useEffect(() => {
    if (isAligned && !chimePlayed) {
      playGentleChime();
      try {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate([50, 40, 50]);
        }
      } catch {
        // ignore
      }
      setChimePlayed(true);
    } else if (!isAligned && chimePlayed) {
      setChimePlayed(false);
    }
  }, [isAligned, chimePlayed]);

  // SILKY SMOOTH COMPASS INTERPOLATION LOOP
  // Uses circular shortest-path dampening to eliminate sensor flutter and sudden 360 flips
  useEffect(() => {
    const updateLoop = () => {
      const target = rawHeadingRef.current;
      const current = smoothHeadingRef.current;

      // Calculate shortest angular difference (-180 to +180)
      const diff = ((target - current + 540) % 360) - 180;

      // Exponential smoothing factor: 0.14 provides responsive yet rock-solid stability
      const smoothingFactor = 0.14;
      if (Math.abs(diff) > 0.05) {
        let next = (current + diff * smoothingFactor + 360) % 360;
        smoothHeadingRef.current = next;
        setSmoothHeading(Math.round(next * 10) / 10);
      }

      animationFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animationFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // COMPASS SENSOR INTEGRATION (Android Absolute Orientation + iOS WebkitCompassHeading)
  useEffect(() => {
    // Check if iOS 13+ permission is required
    if (
      typeof window !== 'undefined' &&
      typeof (DeviceOrientationEvent as any)?.requestPermission === 'function'
    ) {
      setRequiresPermission(true);
    }

    const handleAbsoluteOrientation = (e: DeviceOrientationEvent) => {
      let heading = 0;
      // 1. iOS WebKit Compass Heading (Magnetic/True North)
      if ((e as any).webkitCompassHeading !== undefined) {
        heading = (e as any).webkitCompassHeading;
        setHasSensorSupport(true);
      }
      // 2. Android Chrome Absolute Orientation
      else if (e.alpha !== null) {
        // e.alpha with absolute: true or deviceorientationabsolute
        heading = 360 - e.alpha;
        setHasSensorSupport(true);
      }

      rawHeadingRef.current = (heading + 360) % 360;
      setRawHeading(Math.round(heading));
    };

    if (typeof window !== 'undefined') {
      // Prefer deviceorientationabsolute on Android for true magnetic orientation
      window.addEventListener('deviceorientationabsolute', handleAbsoluteOrientation, true);
      window.addEventListener('deviceorientation', handleAbsoluteOrientation, true);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientationabsolute', handleAbsoluteOrientation, true);
        window.removeEventListener('deviceorientation', handleAbsoluteOrientation, true);
      }
    };
  }, []);

  // Request iOS Sensor Permission
  const handleRequestSensorPermission = async () => {
    try {
      if (typeof (DeviceOrientationEvent as any)?.requestPermission === 'function') {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        if (response === 'granted') {
          setRequiresPermission(false);
          setHasSensorSupport(true);
        } else {
          setGpsStatusMessage('Sensor permission was denied. You can calibrate manually.');
        }
      }
    } catch {
      setRequiresPermission(false);
    }
  };

  // NATIVE DEVICE GPS INTEGRATION
  const handleRequestGps = () => {
    if (!navigator.geolocation) {
      setGpsStatusMessage('GPS is not supported by your browser or device.');
      return;
    }

    setGpsLoading(true);
    setGpsStatusMessage('Acquiring high-accuracy GPS coordinates...');

    // Clear existing watch if active
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    };

    // 1. Get initial position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setCoordinates({ lat: latitude, lng: longitude });
        setGpsAccuracy(Math.round(accuracy));
        setIsUsingLiveGps(true);
        setGpsLoading(false);

        // Reverse identify closest known city in India or world
        const nearest = findNearestQiblaCity(latitude, longitude);
        setLocationTitle(`Live GPS: Near ${nearest.name}, ${nearest.country}`);
        setGpsStatusMessage(
          `GPS locked successfully (Accuracy ±${Math.round(accuracy)}m). Heading to Kaaba is ${calculateQiblaBearing(latitude, longitude)}°.`
        );

        try {
          localStorage.setItem(
            'annur_qibla_saved_gps',
            JSON.stringify({ lat: latitude, lng: longitude, title: nearest.name })
          );
        } catch {
          // ignore
        }
      },
      (err) => {
        setGpsLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setGpsStatusMessage(
            'GPS permission was denied by your device. Please grant permission in browser settings or pick your city below.'
          );
        } else if (err.code === err.TIMEOUT) {
          setGpsStatusMessage('GPS request timed out. Please check your device location settings.');
        } else {
          setGpsStatusMessage('Unable to retrieve GPS coordinates. You can select your city from the list.');
        }
      },
      options
    );

    // 2. Continuous watch for real-time tracking as user moves
    try {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude, accuracy } = pos.coords;
          setCoordinates({ lat: latitude, lng: longitude });
          setGpsAccuracy(Math.round(accuracy));
        },
        () => {},
        options
      );
    } catch {
      // ignore
    }
  };

  // Clean up GPS watch on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  // Filtered cities list
  const filteredCities = useMemo(() => {
    return ALL_QIBLA_CITIES.filter((city) => {
      const matchRegion =
        selectedRegion === 'All' || city.region === selectedRegion;
      if (!matchRegion) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        city.name.toLowerCase().includes(q) ||
        city.country.toLowerCase().includes(q) ||
        (city.state && city.state.toLowerCase().includes(q))
      );
    });
  }, [selectedRegion, searchQuery]);

  const handleSelectCityPreset = (city: QiblaCity) => {
    setSelectedCity(city);
    setCoordinates({ lat: city.lat, lng: city.lng });
    setLocationTitle(`${city.name}, ${city.country}`);
    setIsUsingLiveGps(false);
    setGpsAccuracy(null);
    setGpsStatusMessage(null);
    setShowCityPicker(false);
    try {
      localStorage.setItem('annur_qibla_last_city', city.id);
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between max-w-md w-full mx-auto min-h-screen bg-stone-50 dark:bg-stone-950 px-4 sm:px-5 py-4 overflow-x-hidden select-none">
      {/* 1. Header Bar */}
      <div className="flex items-center justify-between pt-1 pb-2">
        <button
          onClick={onBackToDashboard}
          className="p-2 -ml-2 text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white rounded-full hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
          title="Back to Dashboard"
          aria-label="Back to Dashboard"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        <div className="text-center min-w-0">
          <span className="text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-cinzel font-bold block">
            Sacred Direction
          </span>
          <h1 className="text-base font-bold text-stone-900 dark:text-stone-100 font-cinzel leading-none">
            Qibla Compass · القبلة
          </h1>
        </div>

        {/* GPS Quick Action */}
        <button
          onClick={handleRequestGps}
          disabled={gpsLoading}
          className={`p-2 -mr-2 rounded-xl transition-all ${
            isUsingLiveGps
              ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
              : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900'
          }`}
          title="Detect Live Device GPS Location"
          aria-label="Detect GPS"
        >
          <LocateFixed
            className={`w-5 h-5 ${
              gpsLoading ? 'animate-spin text-emerald-500' : isUsingLiveGps ? 'stroke-[2.5]' : ''
            }`}
          />
        </button>
      </div>

      {/* 2. Location Info Banner & Device GPS Status */}
      <div className="space-y-2">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs">
            <button
              onClick={() => setShowCityPicker(true)}
              className="flex items-center gap-1.5 min-w-0 text-left hover:opacity-80 transition-opacity"
            >
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 stroke-[2.2]" />
              <div className="min-w-0">
                <span className="font-bold text-stone-950 dark:text-stone-50 truncate block text-xs">
                  {locationTitle}
                </span>
                <span className="text-[10px] text-stone-500 underline flex items-center gap-1">
                  Tap to change country / city (India & Worldwide)
                </span>
              </div>
            </button>

            <span className="text-stone-600 dark:text-stone-300 font-mono text-[11px] font-bold shrink-0 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-lg">
              {distanceKm.toLocaleString()} km
            </span>
          </div>

          <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-[11.5px]">
            <div className="flex items-center gap-1">
              <span className="text-stone-500">Qibla:</span>
              <strong className="text-emerald-700 dark:text-emerald-400 font-bold font-mono text-xs">
                {qiblaBearing}° from North
              </strong>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-stone-500">Heading:</span>
              <strong className="text-stone-900 dark:text-stone-100 font-bold font-mono text-xs">
                {Math.round(smoothHeading)}°
              </strong>
            </div>
          </div>
        </div>

        {/* Live GPS Feedback message */}
        {gpsStatusMessage && (
          <div
            className={`p-2.5 rounded-xl text-xs flex items-start gap-2 ${
              isUsingLiveGps
                ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-900 dark:text-amber-300 border border-amber-500/20'
            }`}
          >
            <Radio className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
            <div className="flex-1 text-[11px] leading-relaxed">
              <span>{gpsStatusMessage}</span>
            </div>
          </div>
        )}

        {/* iOS Orientation Permission Trigger if required */}
        {requiresPermission && (
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-2">
            <span className="text-xs text-amber-900 dark:text-amber-300 font-medium">
              Enable iPhone/iPad compass sensor
            </span>
            <button
              onClick={handleRequestSensorPermission}
              className="py-1 px-3 rounded-lg bg-black text-white dark:bg-white dark:text-black font-bold text-xs shrink-0"
            >
              Grant Sensor
            </button>
          </div>
        )}
      </div>

      {/* 3. The Silky Smooth Circular Compass Dial */}
      <div className="flex-1 flex flex-col items-center justify-center py-4">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          {/* Luminous Emerald Aura when accurately aligned with the Kaaba */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-700 ease-out ${
              isAligned
                ? 'bg-emerald-500/25 shadow-[0_0_60px_rgba(16,185,129,0.45)] scale-105'
                : 'bg-transparent shadow-none scale-100'
            }`}
          />

          {/* Compass Outer Rotating Ring (Damped, Smooth Rotation) */}
          <div
            className="absolute inset-0 rounded-full border-2 border-stone-300 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md shadow-xl flex items-center justify-center will-change-transform"
            style={{
              transform: `rotate(${-smoothHeading}deg)`,
              transition: hasSensorSupport ? 'none' : 'transform 0.15s ease-out',
            }}
          >
            {/* Cardinal Directions */}
            <span className="absolute top-2.5 font-bold font-cinzel text-xs text-red-600 tracking-wider">
              N
            </span>
            <span className="absolute right-3.5 font-bold font-cinzel text-xs text-stone-400">
              E
            </span>
            <span className="absolute bottom-2.5 font-bold font-cinzel text-xs text-stone-400">
              S
            </span>
            <span className="absolute left-3.5 font-bold font-cinzel text-xs text-stone-400">
              W
            </span>

            {/* 360 Degree Radial Ticks */}
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className={`absolute ${
                  i % 6 === 0
                    ? 'w-0.5 h-3 bg-stone-500 dark:bg-stone-400'
                    : 'w-0.5 h-1.5 bg-stone-300 dark:bg-stone-700'
                }`}
                style={{
                  top: '6px',
                  transformOrigin: '50% 120px',
                  transform: `rotate(${i * 15}deg)`,
                }}
              />
            ))}
          </div>

          {/* Precise Golden Kaaba Needle pointing toward Qibla */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
            style={{
              transform: `rotate(${needleAngle}deg)`,
              transition: hasSensorSupport ? 'none' : 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          >
            {/* Pointer toward Kaaba with distance and emblem */}
            <div className="relative flex flex-col items-center -top-12 sm:-top-14">
              {/* Kaaba Golden Icon Emblem */}
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-lg border-2 transition-all ${
                  isAligned
                    ? 'bg-black text-amber-300 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.6)] scale-110'
                    : 'bg-stone-900 text-amber-400 border-amber-400/80'
                }`}
              >
                🕋
              </div>
              {/* Arrow Triangle pointing up */}
              <div
                className={`w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-b-[16px] -mt-1 ${
                  isAligned ? 'border-b-emerald-500' : 'border-b-amber-500'
                }`}
              />
            </div>

            {/* Central Dial Pivot */}
            <div className="w-8 h-8 rounded-full bg-stone-950 dark:bg-white text-white dark:text-stone-950 border-2 border-amber-400 shadow-md flex items-center justify-center font-bold text-xs select-none">
              ن
            </div>
          </div>

          {/* Center Status Feedback */}
          <div className="absolute -bottom-8 flex flex-col items-center">
            {isAligned ? (
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 text-white rounded-full text-xs font-bold shadow-lg animate-bounce">
                <CheckCircle2 className="w-4 h-4 fill-white text-emerald-700" />
                <span>Facing the Kaaba! ✨</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 px-3 py-1 bg-stone-100 dark:bg-stone-800 rounded-full border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 text-[11px] font-semibold">
                <Compass className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Turn until the Kaaba needle points up</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Action Controls: Live GPS Button, Country Selector, and Compass Controls */}
      <div className="w-full space-y-2.5 pt-4">
        {/* Primary Action 1: Detect Live GPS Location */}
        <button
          onClick={handleRequestGps}
          disabled={gpsLoading}
          className="w-full h-12 rounded-2xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all"
        >
          <LocateFixed className={`w-4 h-4 ${gpsLoading ? 'animate-spin' : ''}`} />
          <span>
            {gpsLoading
              ? 'Detecting GPS Coordinates...'
              : isUsingLiveGps
              ? 'GPS Active (Tap to Refresh Position)'
              : 'Use Device Own GPS Location'}
          </span>
        </button>

        {/* Primary Action 2: Choose Country / City (India & Worldwide) */}
        <button
          onClick={() => setShowCityPicker(true)}
          className="w-full h-11 rounded-2xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-semibold text-xs flex items-center justify-center gap-2 shadow-2xs hover:bg-stone-100 dark:hover:bg-stone-800 active:scale-[0.98] transition-all"
        >
          <Globe2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Select City Preset (All Countries & India)</span>
        </button>

        {/* Manual Orientation calibration slider if device sensors unavailable */}
        {!hasSensorSupport && (
          <div className="p-3 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs space-y-1.5">
            <div className="flex justify-between items-center text-stone-600 dark:text-stone-400">
              <span className="font-semibold text-[11px]">Manual Dial Rotation (Sensor Simulation):</span>
              <span className="font-mono font-bold text-stone-900 dark:text-stone-100 text-xs">
                {Math.round(smoothHeading)}°
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="359"
              value={rawHeading}
              onChange={(e) => {
                const val = Number(e.target.value);
                rawHeadingRef.current = val;
                setRawHeading(val);
              }}
              className="w-full accent-black dark:accent-white cursor-pointer h-1.5"
            />
            <p className="text-[10px] text-stone-400">
              On mobile phones with a magnetic sensor, the needle aligns automatically in real time as you rotate.
            </p>
          </div>
        )}

        {/* Return Button */}
        <button
          onClick={onBackToDashboard}
          className="w-full h-11 rounded-2xl border border-stone-300 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white font-bold text-xs transition-colors"
        >
          Return to Dashboard
        </button>
      </div>

      {/* =========================================================================
          GLOBAL COUNTRIES & INDIA CITIES SELECTION MODAL
          ========================================================================= */}
      {showCityPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in select-none">
          <div
            className="w-full max-w-md h-[85vh] bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-sm font-bold text-black dark:text-white font-cinzel">
                  Select Location for Qibla
                </h3>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  Includes all Indian states/regions and major global countries
                </p>
              </div>
              <button
                onClick={() => setShowCityPicker(false)}
                className="p-1.5 text-stone-400 hover:text-black dark:hover:text-white rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Fast Search Input */}
            <div className="p-3 bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 shrink-0 space-y-2">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search city, state or country (e.g. Mumbai, Delhi, London)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-xs text-black dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>

              {/* Region Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none snap-x">
                {REGION_FILTERS.map((reg) => {
                  const isSelected = selectedRegion === reg;
                  return (
                    <button
                      key={reg}
                      onClick={() => setSelectedRegion(reg)}
                      className={`snap-start shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                        isSelected
                          ? 'bg-black text-white dark:bg-white dark:text-black'
                          : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
                      }`}
                    >
                      {reg}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cities List */}
            <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-1.5">
              <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-1 pb-1">
                Found {filteredCities.length} Locations:
              </div>

              {filteredCities.map((city) => {
                const bearing = calculateQiblaBearing(city.lat, city.lng);
                const isCurrent = !isUsingLiveGps && selectedCity.id === city.id;

                return (
                  <button
                    key={city.id}
                    onClick={() => handleSelectCityPreset(city)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all active:scale-[0.99] ${
                      isCurrent
                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                        : 'bg-white dark:bg-stone-800/80 text-stone-900 dark:text-stone-100 border-stone-200 dark:border-stone-800 hover:border-stone-400'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs truncate">{city.name}</span>
                        {city.state && (
                          <span className={`text-[10px] opacity-75 truncate`}>
                            ({city.state})
                          </span>
                        )}
                      </div>
                      <span className="text-[10.5px] opacity-70 block">{city.country}</span>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-xs block">{bearing}°</span>
                      <span className="text-[9.5px] opacity-70">Qibla</span>
                    </div>
                  </button>
                );
              })}

              {filteredCities.length === 0 && (
                <div className="py-12 text-center text-stone-400 text-xs">
                  No matching cities found. Try searching by country name or state.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 flex justify-end">
              <button
                onClick={() => setShowCityPicker(false)}
                className="py-1.5 px-4 rounded-xl bg-stone-200 dark:bg-stone-800 text-black dark:text-white text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
