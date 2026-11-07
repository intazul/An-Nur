import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Compass,
  MapPin,
  Navigation,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  LocateFixed,
} from 'lucide-react';
import { playGentleChime } from '../utils/notifications';

interface QiblaFinderViewProps {
  onBackToDashboard: () => void;
}

// Coordinates for the Holy Kaaba in Makkah al-Mukarramah
const KAABA_LAT = 21.422487;
const KAABA_LNG = 39.826206;

interface CityPreset {
  name: string;
  country: string;
  lat: number;
  lng: number;
}

const CITY_PRESETS: CityPreset[] = [
  { name: 'Makkah', country: 'Saudi Arabia', lat: 21.4225, lng: 39.8262 },
  { name: 'Madinah', country: 'Saudi Arabia', lat: 24.4672, lng: 39.6111 },
  { name: 'Jerusalem', country: 'Palestine', lat: 31.7683, lng: 35.2137 },
  { name: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357 },
  { name: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784 },
  { name: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708 },
  { name: 'Karachi', country: 'Pakistan', lat: 24.8607, lng: 67.0011 },
  { name: 'Lahore', country: 'Pakistan', lat: 31.5497, lng: 74.3436 },
  { name: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125 },
  { name: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456 },
  { name: 'Kuala Lumpur', country: 'Malaysia', lat: 3.139, lng: 101.6869 },
  { name: 'London', country: 'UK', lat: 51.5074, lng: -0.1278 },
  { name: 'New York', country: 'USA', lat: 40.7128, lng: -74.006 },
  { name: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832 },
  { name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093 },
];

/**
 * Calculates Great Circle bearing from user to Kaaba in degrees (0-360)
 */
function calculateQiblaBearing(userLat: number, userLng: number): number {
  const phi1 = (userLat * Math.PI) / 180;
  const phi2 = (KAABA_LAT * Math.PI) / 180;
  const deltaLambda = ((KAABA_LNG - userLng) * Math.PI) / 180;

  const y = Math.sin(deltaLambda) * Math.cos(phi2);
  const x =
    Math.cos(phi1) * Math.sin(phi2) -
    Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);

  const theta = Math.atan2(y, x);
  const bearing = ((theta * 180) / Math.PI + 360) % 360;
  return Math.round(bearing);
}

/**
 * Calculates distance to Kaaba in km using Haversine formula
 */
function calculateDistanceToKaaba(userLat: number, userLng: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((KAABA_LAT - userLat) * Math.PI) / 180;
  const dLon = ((KAABA_LNG - userLng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((userLat * Math.PI) / 180) *
      Math.cos((KAABA_LAT * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export const QiblaFinderView: React.FC<QiblaFinderViewProps> = ({ onBackToDashboard }) => {
  const [selectedCity, setSelectedCity] = useState<CityPreset>(CITY_PRESETS[5]); // Default Dubai / middle east
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({
    lat: CITY_PRESETS[5].lat,
    lng: CITY_PRESETS[5].lng,
  });
  const [locationName, setLocationName] = useState<string>(CITY_PRESETS[5].name);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Compass heading state (device compass or manual simulation)
  const [deviceHeading, setDeviceHeading] = useState<number>(0);
  const [hasCompassSupport, setHasCompassSupport] = useState<boolean>(false);
  const [chimePlayed, setChimePlayed] = useState<boolean>(false);

  // Qibla bearing from current location
  const qiblaAngle = calculateQiblaBearing(userLocation.lat, userLocation.lng);
  const distanceKm = calculateDistanceToKaaba(userLocation.lat, userLocation.lng);

  // Angle difference between current heading and Qibla
  // When needle points to top (0), we want (qiblaAngle - deviceHeading)
  const needleRotation = (qiblaAngle - deviceHeading + 360) % 360;
  // User is facing Qibla if difference is within ±4 degrees
  const isAligned = needleRotation <= 4 || needleRotation >= 356;

  // Gentle chime on first alignment
  useEffect(() => {
    if (isAligned && !chimePlayed) {
      playGentleChime();
      setChimePlayed(true);
    } else if (!isAligned && chimePlayed) {
      setChimePlayed(false);
    }
  }, [isAligned, chimePlayed]);

  // Listen to DeviceOrientation on mobile devices
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      let heading = 0;
      if ((e as any).webkitCompassHeading) {
        // iOS Safari / WebKit
        heading = (e as any).webkitCompassHeading;
        setHasCompassSupport(true);
      } else if (e.alpha !== null) {
        // Android Chrome
        heading = 360 - e.alpha;
        setHasCompassSupport(true);
      }
      setDeviceHeading(Math.round(heading));
    };

    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientation', handleOrientation, true);
      }
    };
  }, []);

  // Geolocation request
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setLocationName('Your Current GPS Location');
        setIsLocating(false);
      },
      (err) => {
        console.warn('GPS error:', err);
        setGpsError('GPS permission was denied. You can select your city from the list below.');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSelectCity = (cityName: string) => {
    const city = CITY_PRESETS.find((c) => c.name === cityName);
    if (city) {
      setSelectedCity(city);
      setUserLocation({ lat: city.lat, lng: city.lng });
      setLocationName(`${city.name}, ${city.country}`);
      setGpsError(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between max-w-md w-full mx-auto min-h-screen bg-stone-50 dark:bg-stone-950 px-5 py-4 overflow-x-hidden select-none">
      {/* 1. Android Header */}
      <div className="flex items-center justify-between pt-1 pb-2">
        <button
          onClick={onBackToDashboard}
          className="p-2 -ml-2 text-stone-700 dark:text-stone-300 hover:text-black dark:hover:text-white rounded-full hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
          title="Back to Dashboard"
          aria-label="Back to Dashboard"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center min-w-0">
          <span className="text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-cinzel font-semibold block">
            Sacred Direction
          </span>
          <h1 className="text-base font-bold text-stone-900 dark:text-stone-100 font-cinzel">
            Qibla Finder · القبلة
          </h1>
        </div>

        <button
          onClick={handleGetLocation}
          disabled={isLocating}
          className="p-2 -mr-2 text-stone-700 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
          title="Update with GPS Location"
          aria-label="GPS"
        >
          <LocateFixed className={`w-5 h-5 ${isLocating ? 'animate-spin text-emerald-500' : ''}`} />
        </button>
      </div>

      {/* 2. Current Location & Distance Card */}
      <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xs space-y-1">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="font-semibold text-stone-900 dark:text-stone-100 truncate">
              {locationName}
            </span>
          </div>
          <span className="text-stone-500 tabular-nums text-[11px] shrink-0">
            {distanceKm.toLocaleString()} km to Makkah
          </span>
        </div>

        <div className="flex items-center justify-between text-[11px] text-stone-500 pt-0.5 border-t border-stone-100 dark:border-stone-800/60">
          <span>Qibla Bearing: <strong className="text-stone-900 dark:text-stone-100 font-bold">{qiblaAngle}°</strong> from North</span>
          <span>Heading: <strong className="text-stone-900 dark:text-stone-100 font-bold">{deviceHeading}°</strong></span>
        </div>
      </div>

      {gpsError && (
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs">
          {gpsError}
        </div>
      )}

      {/* 3. The Interactive Circular Compass Dial */}
      <div className="flex-1 flex flex-col items-center justify-center py-6">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          {/* Luminous Glow when Aligned */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-500 ${
              isAligned
                ? 'bg-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.35)] scale-105'
                : 'bg-transparent shadow-none'
            }`}
          />

          {/* Compass Outer Ring with Cardinal Points */}
          <div
            className="absolute inset-0 rounded-full border-2 border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md shadow-xl flex items-center justify-center transition-transform duration-300 ease-out"
            style={{ transform: `rotate(${-deviceHeading}deg)` }}
          >
            {/* Cardinal Markers */}
            <span className="absolute top-2.5 font-bold font-cinzel text-xs text-red-500">N</span>
            <span className="absolute right-3 font-bold font-cinzel text-xs text-stone-400">E</span>
            <span className="absolute bottom-2.5 font-bold font-cinzel text-xs text-stone-400">S</span>
            <span className="absolute left-3 font-bold font-cinzel text-xs text-stone-400">W</span>

            {/* Degree Ticks */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-2 bg-stone-300 dark:bg-stone-700"
                style={{
                  top: '6px',
                  transformOrigin: '50% 120px',
                  transform: `rotate(${i * 30}deg)`,
                }}
              />
            ))}
          </div>

          {/* Golden Kaaba Needle pointing toward Qibla */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out pointer-events-none"
            style={{ transform: `rotate(${needleRotation}deg)` }}
          >
            {/* Pointer toward Kaaba */}
            <div className="relative flex flex-col items-center -top-12 sm:-top-14">
              {/* Kaaba Golden Icon Emblem */}
              <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-400 border-2 border-amber-400 shadow-lg flex items-center justify-center text-lg select-none">
                🕋
              </div>
              {/* Arrow Triangle pointing up */}
              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-amber-500 -mt-1" />
            </div>

            {/* Central Dial Pivot */}
            <div className="w-7 h-7 rounded-full bg-stone-900 dark:bg-white text-white dark:text-black border-2 border-amber-500 shadow-md flex items-center justify-center font-bold text-xs">
              ن
            </div>
          </div>

          {/* Heading Center readout */}
          <div className="absolute -bottom-8 flex flex-col items-center">
            {isAligned ? (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-bold shadow-md animate-bounce">
                <CheckCircle2 className="w-4 h-4 fill-white text-emerald-600" />
                <span>Facing the Kaaba! ✨</span>
              </div>
            ) : (
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                Turn device until needle points up
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 4. City Preset Quick Selector & Manual Compass Heading Adjustment */}
      <div className="w-full space-y-3 pt-4">
        {/* City Selector */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 flex items-center justify-between">
            <span>Select City Preset</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
              {hasCompassSupport ? '📱 Live Sensor Active' : 'Calibrated'}
            </span>
          </label>
          <select
            value={selectedCity.name}
            onChange={(e) => handleSelectCity(e.target.value)}
            className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 text-xs font-medium focus:outline-none"
          >
            {CITY_PRESETS.map((city) => (
              <option key={city.name} value={city.name} className="bg-white dark:bg-stone-900 text-stone-900 dark:text-white">
                {city.name}, {city.country} ({calculateQiblaBearing(city.lat, city.lng)}°)
              </option>
            ))}
          </select>
        </div>

        {/* Manual heading adjustment slider (for manual alignment test) */}
        {!hasCompassSupport && (
          <div className="space-y-1 p-3 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs">
            <div className="flex justify-between text-stone-600 dark:text-stone-400 font-medium">
              <span>Manual Device Orientation</span>
              <span className="tabular-nums font-bold text-stone-900 dark:text-stone-100">
                {deviceHeading}°
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="359"
              value={deviceHeading}
              onChange={(e) => setDeviceHeading(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <p className="text-[10px] text-stone-400">
              On phones with a hardware compass, the dial rotates automatically as you turn.
            </p>
          </div>
        )}

        {/* Bottom Back Button (White in Dark Theme with Black Text, and Black in Light Theme with White Text) */}
        <button
          onClick={onBackToDashboard}
          className="w-full h-12 rounded-2xl bg-black text-white hover:bg-stone-900 dark:bg-white dark:text-black dark:hover:bg-stone-100 font-semibold text-sm shadow-md transition-all active:scale-[0.98]"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};
