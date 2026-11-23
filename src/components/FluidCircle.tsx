import React, { useEffect, useMemo, useState } from 'react';
import { DailyPrayers } from '../types/quran';
import { PrayerStatus, PrayerTimeItem, resolveLocationClock } from '../utils/prayerTimes';

interface FluidCircleProps {
  percent: number; // 0 to 100
  size?: number; // outer horological clock assembly size in px (defaults to responsive 340)
  completedPrayers: number;
  totalPrayers?: number;
  versesRead: number;
  dhikrCount?: number;
  hadithsStudied?: number;
  prayerStatus?: PrayerStatus;
  completedPrayerMap?: Partial<Record<keyof DailyPrayers, boolean>>;
  isRamadanActive?: boolean;
  ramadanDay?: number;
  isRamadanPreview?: boolean;
  onTap?: () => void;
  onOpenPrayerTimes?: () => void;
  onOpenRamadanSanctuary?: () => void;
}

interface NamazStation {
  id: 'dhuhr' | 'asr' | 'maghrib' | 'isha' | 'fajr';
  clockDeg: number; // 0 = 12 o'clock top, clockwise
  labelX: number;
  labelY: number;
  item?: PrayerTimeItem;
}

const VIEWBOX_SIZE = 360;
const CX = 180;
const CY = 180;
const INNER_FLUID_DIAMETER = 180; // radius 90 inside 360 viewBox
const IMAN_RING_RADIUS = 96;
const NAMAZ_TRACK_RADIUS = 116;

// Helpers to convert clock degrees (0 = top 12 o'clock, clockwise) into SVG coordinates
function polarToXY(cx: number, cy: number, r: number, clockDeg: number) {
  const rad = ((clockDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function describeClockwiseArc(
  cx: number,
  cy: number,
  r: number,
  startClockDeg: number,
  endClockDeg: number
): string {
  const span = ((endClockDeg - startClockDeg) % 360 + 360) % 360;
  if (span <= 0.2) return '';
  const start = polarToXY(cx, cy, r, startClockDeg);
  const end = polarToXY(cx, cy, r, endClockDeg);
  const largeArc = span > 180 ? 1 : 0;
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

function formatCountdownShort(mins: number): string {
  const m = Math.max(0, Math.round(mins));
  const h = Math.floor(m / 60);
  const rem = m % 60;
  if (h > 0) return `${h}h ${rem}m`;
  return `${rem}m`;
}

// Rising ambient light motes inside the fluid chamber
const FLUID_MOTES = [
  { xFrac: 0.18, speed: 0.022, offset: 12, r: 1.4, opacity: 0.32 },
  { xFrac: 0.31, speed: 0.031, offset: 48, r: 1.9, opacity: 0.25 },
  { xFrac: 0.44, speed: 0.019, offset: 76, r: 1.3, opacity: 0.38 },
  { xFrac: 0.56, speed: 0.027, offset: 25, r: 1.7, opacity: 0.28 },
  { xFrac: 0.69, speed: 0.034, offset: 61, r: 1.2, opacity: 0.35 },
  { xFrac: 0.82, speed: 0.024, offset: 88, r: 1.6, opacity: 0.26 },
  { xFrac: 0.25, speed: 0.029, offset: 3, r: 1.1, opacity: 0.4 },
  { xFrac: 0.74, speed: 0.021, offset: 37, r: 1.5, opacity: 0.3 },
];

export const FluidCircle: React.FC<FluidCircleProps> = ({
  percent,
  size = 340,
  completedPrayers,
  totalPrayers = 5,
  versesRead,
  dhikrCount = 0,
  hadithsStudied = 0,
  prayerStatus,
  completedPrayerMap,
  isRamadanActive = false,
  ramadanDay = 1,
  isRamadanPreview = false,
  onTap,
  onOpenPrayerTimes,
  onOpenRamadanSanctuary,
}) => {
  const [animTimeMs, setAnimTimeMs] = useState(() => performance.now());
  const [wallNowMs, setWallNowMs] = useState(() => Date.now());

  useEffect(() => {
    let animId: number;
    let lastWallUpdate = 0;

    const tick = (now: number) => {
      setAnimTimeMs(now);
      if (now - lastWallUpdate >= 100) {
        lastWallUpdate = now;
        setWallNowMs(Date.now());
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Wave phase & sweep angles
  const waveOffset = (animTimeMs / 25) % 360;
  const secondAngle = (((wallNowMs % 60000) / 60000) * 360) % 360;

  const displayPercent = Math.min(100, Math.max(0, Math.round(percent)));
  const fillLevel = Math.min(94, Math.max(11, percent));
  const baseY = INNER_FLUID_DIAMETER - (INNER_FLUID_DIAMETER * fillLevel) / 100;

  // Dual + ambient wave path generators
  const generateWaveSurface = (offsetDeg: number, amp: number, wavelength: number) => {
    const pts: Array<{ x: number; y: number }> = [];
    const step = 4;
    for (let x = 0; x <= INNER_FLUID_DIAMETER + 8; x += step) {
      const radians = ((x + offsetDeg * 1.9) * Math.PI) / wavelength;
      const harmonic = Math.sin(radians * 1.7 + offsetDeg * 0.04) * (amp * 0.28);
      const y = baseY + Math.sin(radians) * amp + harmonic;
      pts.push({ x, y });
    }
    const lineD = pts
      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(' ');
    const areaD = `${lineD} L ${INNER_FLUID_DIAMETER + 8} ${INNER_FLUID_DIAMETER + 10} L 0 ${
      INNER_FLUID_DIAMETER + 10
    } Z`;
    return { lineD, areaD };
  };

  const backWave = generateWaveSurface(waveOffset + 135, 3.8, 72);
  const midWave = generateWaveSurface(waveOffset + 58, 4.8, 86);
  const frontWave = generateWaveSurface(waveOffset, 5.5, 92);

  // Iman progress arc calculations
  const imanCircumference = 2 * Math.PI * IMAN_RING_RADIUS;
  const imanDashOffset = imanCircumference - (imanCircumference * displayPercent) / 100;
  const imanTip = polarToXY(CX, CY, IMAN_RING_RADIUS, (displayPercent / 100) * 360);

  // Build 5 Namaz Stations symmetrically around the clock
  const clockCalculation = useMemo(() => {
    const nowDate = new Date(wallNowMs);
    const liveClock = resolveLocationClock(nowDate, prayerStatus?.timezone, prayerStatus?.lng);
    const secFraction = nowDate.getSeconds() / 60;
    const nowMinutesFloat = liveClock.currentMinutes + secFraction;

    const getItem = (id: NamazStation['id']) =>
      prayerStatus?.prayers.find((p) => p.id === id);

    const stations: NamazStation[] = [
      { id: 'dhuhr', clockDeg: 0, labelX: 180, labelY: 26, item: getItem('dhuhr') },
      { id: 'asr', clockDeg: 72, labelX: 321, labelY: 130, item: getItem('asr') },
      { id: 'maghrib', clockDeg: 144, labelX: 268, labelY: 299, item: getItem('maghrib') },
      { id: 'isha', clockDeg: 216, labelX: 92, labelY: 299, item: getItem('isha') },
      { id: 'fajr', clockDeg: 288, labelX: 39, labelY: 130, item: getItem('fajr') },
    ];

    // Chronological daily order: Fajr (288°) -> Dhuhr (0°) -> Asr (72°) -> Maghrib (144°) -> Isha (216°)
    const chronoOrder: NamazStation[] = [
      stations[4], // Fajr
      stations[0], // Dhuhr
      stations[1], // Asr
      stations[2], // Maghrib
      stations[3], // Isha
    ];

    let activeStation = chronoOrder[4]; // default Isha
    let nextStation = chronoOrder[0]; // default Fajr
    let elapsedMins = 0;
    let spanMins = 480;

    if (chronoOrder.every((s) => s.item)) {
      const m = chronoOrder.map((s) => s.item!.timeMinutes);
      if (nowMinutesFloat >= m[4] || nowMinutesFloat < m[0]) {
        activeStation = chronoOrder[4]; // Isha
        nextStation = chronoOrder[0]; // Fajr
        spanMins = m[0] + 1440 - m[4];
        elapsedMins =
          nowMinutesFloat >= m[4] ? nowMinutesFloat - m[4] : nowMinutesFloat + 1440 - m[4];
      } else {
        for (let i = 0; i < 4; i++) {
          if (nowMinutesFloat >= m[i] && nowMinutesFloat < m[i + 1]) {
            activeStation = chronoOrder[i];
            nextStation = chronoOrder[i + 1];
            spanMins = m[i + 1] - m[i];
            elapsedMins = nowMinutesFloat - m[i];
            break;
          }
        }
      }
    }

    const progress = Math.max(0, Math.min(1, elapsedMins / Math.max(1, spanMins)));
    const remainingMins = Math.max(0, spanMins - elapsedMins);
    const pointerAngle = (activeStation.clockDeg + progress * 72) % 360;

    // Sahoor (Fajr) & Iftar (Maghrib) Fasting Clock calculation when Ramadan is active
    const fajrMins = stations[4].item?.timeMinutes ?? 315;
    const maghribMins = stations[2].item?.timeMinutes ?? 1095;
    const isDaytimeFasting = nowMinutesFloat >= fajrMins && nowMinutesFloat < maghribMins;
    const fastSpan = Math.max(1, maghribMins - fajrMins);
    const nightSpan = Math.max(1, 1440 - maghribMins + fajrMins);
    const fastProgress = isDaytimeFasting
      ? Math.max(0, Math.min(1, (nowMinutesFloat - fajrMins) / fastSpan))
      : Math.max(
          0,
          Math.min(
            1,
            (nowMinutesFloat >= maghribMins
              ? nowMinutesFloat - maghribMins
              : 1440 - maghribMins + nowMinutesFloat) / nightSpan
          )
        );
    const fastRemainingMins = isDaytimeFasting
      ? Math.max(0, maghribMins - nowMinutesFloat)
      : Math.max(
          0,
          nowMinutesFloat < fajrMins
            ? fajrMins - nowMinutesFloat
            : 1440 - nowMinutesFloat + fajrMins
        );

    return {
      stations,
      activeStation,
      nextStation,
      progress,
      progressPercent: Math.round(progress * 100),
      remainingMins,
      pointerAngle,
      isDaytimeFasting,
      fastProgressPercent: Math.round(fastProgress * 100),
      fastRemainingMins,
    };
  }, [prayerStatus, wallNowMs]);

  const {
    stations,
    activeStation,
    nextStation,
    progressPercent,
    remainingMins,
    pointerAngle,
    isDaytimeFasting,
    fastProgressPercent,
    fastRemainingMins,
  } = clockCalculation;

  // Lunar crescent illumination ratio for Ramadan night (1..30)
  const ramadanLunarIllum = Math.max(
    0.1,
    Math.min(1, 0.5 * (1 - Math.cos((2 * Math.PI * (Math.max(1, ramadanDay) - 1)) / 29)))
  );

  // Geometry points for Pointer & Active Window Arc
  const pointerInner = polarToXY(CX, CY, IMAN_RING_RADIUS + 4, pointerAngle);
  const pointerTip = polarToXY(CX, CY, NAMAZ_TRACK_RADIUS + 7, pointerAngle);
  const pointerTrackPos = polarToXY(CX, CY, NAMAZ_TRACK_RADIUS, pointerAngle);
  const pointerBaseLeft = polarToXY(CX, CY, NAMAZ_TRACK_RADIUS - 6, pointerAngle - 2.3);
  const pointerBaseRight = polarToXY(CX, CY, NAMAZ_TRACK_RADIUS - 6, pointerAngle + 2.3);

  const windowElapsedArc = describeClockwiseArc(
    CX,
    CY,
    NAMAZ_TRACK_RADIUS,
    activeStation.clockDeg,
    pointerAngle
  );
  const windowRemainingArc = describeClockwiseArc(
    CX,
    CY,
    NAMAZ_TRACK_RADIUS,
    pointerAngle,
    nextStation.clockDeg
  );

  // Live 60-second clock sweep tip
  const secHandStart = polarToXY(CX, CY, 99, secondAngle);
  const secHandEnd = polarToXY(CX, CY, 111, secondAngle);

  // 60 dial ticks + 8-point sacred octagonal geometry
  const dialTicks = Array.from({ length: 60 }, (_, i) => i * 6);
  const octagonPoints1 = Array.from({ length: 4 }, (_, i) => {
    const p = polarToXY(CX, CY, 107, i * 90);
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(' ');
  const octagonPoints2 = Array.from({ length: 4 }, (_, i) => {
    const p = polarToXY(CX, CY, 107, i * 90 + 45);
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(' ');

  return (
    <div className="flex flex-col items-center w-full select-none">
      {/* Main Horological Clock & Namaz Orbit Container */}
      <div
        className="relative w-full aspect-square flex items-center justify-center"
        style={{ maxWidth: size }}
      >
        {/* Outer SVG Horological Assembly */}
        <svg
          viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
          className="w-full h-full overflow-visible"
        >
          {/* 1. Slowly Counter-Rotating Sacred Geometric Rub-el-Hizb Filigree */}
          <g
            className="animate-clock-ccw text-black/10 dark:text-white/15 pointer-events-none"
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          >
            <polygon points={octagonPoints1} fill="none" stroke="currentColor" strokeWidth="0.9" />
            <polygon points={octagonPoints2} fill="none" stroke="currentColor" strokeWidth="0.9" />
            <circle
              cx={CX}
              cy={CY}
              r="107"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
              strokeDasharray="3 5"
            />
          </g>

          {/* 2. Clockwise Rotating 60-Tick Watchmaker Calibration Ring */}
          <g
            className="animate-clock-cw pointer-events-none"
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          >
            {dialTicks.map((deg, idx) => {
              const isQuarter = idx % 15 === 0;
              const isMajor = idx % 5 === 0;
              const p1 = polarToXY(CX, CY, isQuarter ? 101 : isMajor ? 103 : 105, deg);
              const p2 = polarToXY(CX, CY, 109, deg);
              return (
                <line
                  key={deg}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="currentColor"
                  strokeWidth={isQuarter ? 1.4 : isMajor ? 1 : 0.6}
                  className={
                    isQuarter
                      ? 'text-black/45 dark:text-white/50'
                      : isMajor
                      ? 'text-black/22 dark:text-white/25'
                      : 'text-black/10 dark:text-white/12'
                  }
                />
              );
            })}
          </g>

          {/* 3. Live Sweeping Second Chronograph Hand (1 RPM real-time rotation) */}
          <g className="pointer-events-none text-black/55 dark:text-white/60">
            <line
              x1={secHandStart.x}
              y1={secHandStart.y}
              x2={secHandEnd.x}
              y2={secHandEnd.y}
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <circle cx={secHandEnd.x} cy={secHandEnd.y} r="1.9" fill="currentColor" />
          </g>

          {/* 4. Inner Iman Level Progress Ring */}
          <circle
            cx={CX}
            cy={CY}
            r={IMAN_RING_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            className="text-neutral-200 dark:text-neutral-800 pointer-events-none"
          />
          {displayPercent > 0 && (
            <g className="pointer-events-none text-black dark:text-white">
              <circle
                cx={CX}
                cy={CY}
                r={IMAN_RING_RADIUS}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeDasharray={imanCircumference}
                strokeDashoffset={imanDashOffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${CX} ${CY})`}
                className="transition-all duration-700 ease-out"
              />
              <circle cx={imanTip.x} cy={imanTip.y} r="3" fill="currentColor" />
            </g>
          )}

          {/* 5. Outer 5-Namaz Time Cycle Track & Active Window Arc */}
          <circle
            cx={CX}
            cy={CY}
            r={NAMAZ_TRACK_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-neutral-200 dark:text-neutral-800 pointer-events-none"
          />

          {/* Remaining path toward next Namaz (subtle dashed guide) */}
          {windowRemainingArc && (
            <path
              d={windowRemainingArc}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="2.5 3.5"
              className="text-neutral-400 dark:text-neutral-600 pointer-events-none"
            />
          )}

          {/* Elapsed progress arc from Current Namaz toward Clock Pointer */}
          {windowElapsedArc && (
            <path
              d={windowElapsedArc}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="text-black dark:text-white pointer-events-none"
            />
          )}

          {/* 6. Rotating Clock Pointer Needle showing exact current Namaz progress */}
          <g className="pointer-events-none text-black dark:text-white">
            <line
              x1={pointerInner.x}
              y1={pointerInner.y}
              x2={pointerTip.x}
              y2={pointerTip.y}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <polygon
              points={`${pointerTip.x.toFixed(1)},${pointerTip.y.toFixed(1)} ${pointerBaseLeft.x.toFixed(1)},${pointerBaseLeft.y.toFixed(1)} ${pointerBaseRight.x.toFixed(1)},${pointerBaseRight.y.toFixed(1)}`}
              fill="currentColor"
            />
            <circle
              cx={pointerTrackPos.x}
              cy={pointerTrackPos.y}
              r="4.2"
              className="fill-white dark:fill-black stroke-black dark:stroke-white"
              strokeWidth="1.8"
            />
          </g>

          {/* 7. Five Namaz Stations & Crisp Labels Beside the Circle */}
          {stations.map((st) => {
            const dot = polarToXY(CX, CY, NAMAZ_TRACK_RADIUS, st.clockDeg);
            const tickOut = polarToXY(CX, CY, NAMAZ_TRACK_RADIUS + 8, st.clockDeg);
            const isCurrent = activeStation.id === st.id;
            const isNext = nextStation.id === st.id;
            const isDone = Boolean(completedPrayerMap?.[st.id]);

            const timeShort = st.item?.timeString || '--:--';

            return (
              <g
                key={st.id}
                onClick={() => onOpenPrayerTimes?.()}
                className={onOpenPrayerTimes ? 'cursor-pointer' : ''}
              >
                {/* Radial connector tick from track toward label */}
                <line
                  x1={dot.x}
                  y1={dot.y}
                  x2={tickOut.x}
                  y2={tickOut.y}
                  stroke="currentColor"
                  strokeWidth={isCurrent || isNext ? 1.4 : 0.9}
                  className={
                    isCurrent || isNext
                      ? 'text-black dark:text-white'
                      : 'text-neutral-300 dark:text-neutral-700'
                  }
                />

                {/* Rotating target reticle halo on the upcoming Next Namaz */}
                {isNext && (
                  <g
                    className="animate-clock-cw text-black dark:text-white"
                    style={{ transformOrigin: `${dot.x}px ${dot.y}px` }}
                  >
                    <circle
                      cx={dot.x}
                      cy={dot.y}
                      r="8.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.1"
                      strokeDasharray="2.5 2.5"
                    />
                  </g>
                )}

                {/* Station Perimeter Node */}
                <circle
                  cx={dot.x}
                  cy={dot.y}
                  r={isCurrent || isNext ? 4.4 : 3.1}
                  className={
                    isDone
                      ? 'fill-black dark:fill-white stroke-black dark:stroke-white'
                      : isCurrent
                      ? 'fill-black dark:fill-white stroke-black dark:stroke-white'
                      : isNext
                      ? 'fill-white dark:fill-black stroke-black dark:stroke-white'
                      : 'fill-white dark:fill-black stroke-neutral-400 dark:stroke-neutral-600'
                  }
                  strokeWidth={isCurrent || isNext ? 1.8 : 1.3}
                />

                {/* Prayer Name & Exact Time Label Beside Circle */}
                <g transform={`translate(${st.labelX}, ${st.labelY})`}>
                  <text
                    x="0"
                    y="-3"
                    textAnchor="middle"
                    className={`text-[9.5px] tracking-[0.08em] uppercase font-sans-ui ${
                      isCurrent || isNext
                        ? 'fill-black dark:fill-white font-bold'
                        : 'fill-neutral-500 dark:fill-neutral-400 font-semibold'
                    }`}
                  >
                    {st.item?.name || st.id}
                    {isDone ? ' ✓' : ''}
                  </text>
                  <text
                    x="0"
                    y="9"
                    textAnchor="middle"
                    className={`text-[8.8px] font-mono tabular-nums ${
                      isCurrent || isNext
                        ? 'fill-black dark:fill-white font-bold'
                        : 'fill-neutral-500 dark:fill-neutral-500 font-medium'
                    }`}
                  >
                    {timeShort}
                  </text>
                  {(isCurrent || isNext) && (
                    <line
                      x1="-14"
                      y1="13"
                      x2="14"
                      y2="13"
                      stroke="currentColor"
                      strokeWidth={isNext ? '1.3' : '0.8'}
                      strokeDasharray={isNext ? undefined : '2 2'}
                      className="text-black dark:text-white opacity-75"
                    />
                  )}
                </g>
              </g>
            );
          })}
        </svg>

        {/* Central Interactive Iman Level Liquid Chamber (centered inside viewBox ratio 180/360 = 50%) */}
        <button
          type="button"
          onClick={onTap}
          title="Open Iman Level & Spiritual Analysis"
          aria-label={`Iman Level ${displayPercent} percent. Currently in ${
            activeStation.item?.name || 'prayer'
          } window, next prayer ${nextStation.item?.name || ''} in ${formatCountdownShort(
            remainingMins
          )}.`}
          className="absolute rounded-full overflow-hidden border-[1.5px] border-black dark:border-white bg-white dark:bg-black cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white transition-transform duration-300 hover:scale-[1.015] active:scale-[0.985]"
          style={{ width: '50%', height: '50%' }}
        >
          <svg
            viewBox={`0 0 ${INNER_FLUID_DIAMETER} ${INNER_FLUID_DIAMETER}`}
            className="w-full h-full block"
          >
            <defs>
              <clipPath id="circle-fluid-clip-horology">
                <circle
                  cx={INNER_FLUID_DIAMETER / 2}
                  cy={INNER_FLUID_DIAMETER / 2}
                  r={INNER_FLUID_DIAMETER / 2}
                />
              </clipPath>
            </defs>

            <rect
              x="0"
              y="0"
              width={INNER_FLUID_DIAMETER}
              height={INNER_FLUID_DIAMETER}
              className="fill-white dark:fill-black"
            />

            {/* Pure Pitch-Black Animated Multi-Wave Liquid (Light Mode) */}
            <g clipPath="url(#circle-fluid-clip-horology)" className="dark:hidden">
              <path d={backWave.areaD} fill="#000000" fillOpacity="0.12" />
              <path d={midWave.areaD} fill="#000000" fillOpacity="0.25" />
              <path d={frontWave.areaD} fill="#000000" fillOpacity="0.97" />
              <path
                d={frontWave.lineD}
                fill="none"
                stroke="#000000"
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />
              {FLUID_MOTES.map((mote, i) => {
                const travel = (animTimeMs * mote.speed + mote.offset) % 100;
                const y = INNER_FLUID_DIAMETER - (travel / 100) * INNER_FLUID_DIAMETER;
                const x =
                  mote.xFrac * INNER_FLUID_DIAMETER +
                  Math.sin((animTimeMs * 0.002) + i) * 3.5;
                if (y < baseY + 6) return null;
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={mote.r}
                    fill="#ffffff"
                    fillOpacity={mote.opacity}
                  />
                );
              })}
            </g>

            {/* Pure Chalk-White Animated Multi-Wave Liquid (Dark Mode) */}
            <g clipPath="url(#circle-fluid-clip-horology)" className="hidden dark:block">
              <path d={backWave.areaD} fill="#ffffff" fillOpacity="0.14" />
              <path d={midWave.areaD} fill="#ffffff" fillOpacity="0.28" />
              <path d={frontWave.areaD} fill="#ffffff" fillOpacity="0.97" />
              <path
                d={frontWave.lineD}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeOpacity="0.45"
              />
              {FLUID_MOTES.map((mote, i) => {
                const travel = (animTimeMs * mote.speed + mote.offset) % 100;
                const y = INNER_FLUID_DIAMETER - (travel / 100) * INNER_FLUID_DIAMETER;
                const x =
                  mote.xFrac * INNER_FLUID_DIAMETER +
                  Math.sin((animTimeMs * 0.002) + i) * 3.5;
                if (y < baseY + 6) return null;
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={mote.r}
                    fill="#000000"
                    fillOpacity={mote.opacity}
                  />
                );
              })}
            </g>
          </svg>

          {/* Sculptural Inverted Gallery Typography Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-3 mix-blend-difference text-white">
            <span className="text-[8.5px] uppercase tracking-[0.24em] font-semibold opacity-80">
              Iman Level
            </span>

            <div className="flex items-baseline justify-center mt-1">
              <span className="text-[40px] sm:text-[44px] font-bold leading-none tracking-tighter tabular-nums">
                {displayPercent}
              </span>
              <span className="text-sm font-semibold ml-0.5 opacity-90">%</span>
            </div>

            <div className="w-6 h-[1px] bg-current opacity-30 my-1.5" />

            <div className="flex flex-col items-center leading-tight space-y-0.5 text-[9.5px] font-semibold tracking-tight tabular-nums">
              <span className="opacity-95">
                {completedPrayers}/{totalPrayers} Salah · {versesRead}v
              </span>
              <span className="opacity-75">
                {dhikrCount}d · {hadithsStudied}h
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* Live Namaz / Ramadan Sahoor & Iftar Clock Strip */}
      <button
        type="button"
        onClick={
          isRamadanActive && onOpenRamadanSanctuary
            ? onOpenRamadanSanctuary
            : onOpenPrayerTimes || onTap
        }
        className="btn-monolith mt-1.5 px-4 py-1.5 rounded-full border-[1.5px] border-black dark:border-white bg-white dark:bg-black text-black dark:text-white shadow-[0_2px_0_0_#000000] dark:shadow-[0_2px_0_0_#ffffff] hover:-translate-y-0.5 active:translate-y-[2px] active:shadow-none flex items-center gap-2 text-[11px] font-semibold tabular-nums"
        title={
          isRamadanActive
            ? 'Open Ramadan Sanctuary (Sahoor & Iftar Fasting Clock)'
            : 'Current Namaz window and proximity to next prayer'
        }
      >
        {isRamadanActive ? (
          <>
            <svg width="15" height="15" viewBox="0 0 28 28" className="shrink-0" aria-hidden="true">
              <defs>
                <mask id="clock-ramadan-moon">
                  <rect x="0" y="0" width="28" height="28" fill="black" />
                  <circle cx="14" cy="14" r="10" fill="white" />
                  {ramadanLunarIllum < 0.96 && (
                    <circle
                      cx={14 - (1 - ramadanLunarIllum) * 18 * 0.72}
                      cy="13.2"
                      r="9.4"
                      fill="black"
                    />
                  )}
                </mask>
              </defs>
              <circle cx="14" cy="14" r="10" fill="currentColor" mask="url(#clock-ramadan-moon)" />
            </svg>
            <span>
              <strong>Ramadan {ramadanDay}</strong>
              {isRamadanPreview ? ' (Preview)' : ''}
            </span>
            <span className="opacity-45">·</span>
            <span>
              {isDaytimeFasting ? (
                <>
                  Fasting <strong>{fastProgressPercent}%</strong> · Iftar in{' '}
                  <strong>{formatCountdownShort(fastRemainingMins)}</strong>
                </>
              ) : (
                <>
                  Sahoor in <strong>{formatCountdownShort(fastRemainingMins)}</strong>
                </>
              )}
            </span>
          </>
        ) : (
          <>
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black dark:bg-white opacity-45" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-black dark:bg-white" />
            </span>
            <span>
              Now: <strong>{activeStation.item?.name || 'Salah'}</strong>
            </span>
            <span className="opacity-45">·</span>
            <span>
              {nextStation.item?.name || 'Next'} in <strong>{formatCountdownShort(remainingMins)}</strong> ({progressPercent}%)
            </span>
          </>
        )}
      </button>
    </div>
  );
};
