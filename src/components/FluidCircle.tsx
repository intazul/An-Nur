import React, { useEffect, useState } from 'react';

interface FluidCircleProps {
  percent: number; // 0 to 100
  size?: number; // diameter in px
  completedPrayers: number;
  totalPrayers?: number;
  versesRead: number;
  onTap?: () => void;
}

export const FluidCircle: React.FC<FluidCircleProps> = ({
  percent,
  size = 230,
  completedPrayers,
  totalPrayers = 5,
  versesRead,
  onTap,
}) => {
  const [waveOffset, setWaveOffset] = useState(0);

  // Smooth continuous fluid movement via requestAnimationFrame
  useEffect(() => {
    let animId: number;
    let start = performance.now();

    const animate = (time: number) => {
      const elapsed = time - start;
      // Oscillate wave horizontally
      setWaveOffset((elapsed / 25) % 360);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Clamp percentage between 5% and 98% for visual aesthetics
  const displayPercent = Math.min(100, Math.max(0, Math.round(percent)));
  const fillLevel = Math.min(95, Math.max(10, percent));
  // Y coordinate where fluid surface rests (0 at top, size at bottom)
  const baseY = size - (size * fillLevel) / 100;

  // Generate smooth sine wave path for fluid
  const generateWavePath = (offsetDeg: number, waveHeight: number = 7) => {
    const points: string[] = [];
    const step = 6;
    for (let x = 0; x <= size + 10; x += step) {
      const radians = ((x + offsetDeg * 2) * Math.PI) / 90;
      const y = baseY + Math.sin(radians) * waveHeight;
      points.push(`${x === 0 ? 'M' : 'L'} ${x} ${y}`);
    }
    points.push(`L ${size + 10} ${size + 10}`);
    points.push(`L 0 ${size + 10}`);
    points.push('Z');
    return points.join(' ');
  };

  const primaryWave = generateWavePath(waveOffset, 7);
  const secondaryWave = generateWavePath(waveOffset + 60, 5);

  return (
    <div
      onClick={onTap}
      role="button"
      tabIndex={0}
      title="Tap to view & log today's prayers"
      className="relative flex flex-col items-center justify-center cursor-pointer select-none group"
      style={{ width: size, height: size }}
    >
      {/* Outer subtle halo ring */}
      <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 dark:border-emerald-400/25 shadow-xl transition-all duration-300 group-hover:scale-105" />

      {/* SVG Liquid Container */}
      <svg
        width={size}
        height={size}
        className="rounded-full shadow-inner overflow-hidden"
        style={{ borderRadius: '50%' }}
      >
        <defs>
          <clipPath id="circle-fluid-clip">
            <circle cx={size / 2} cy={size / 2} r={size / 2 - 3} />
          </clipPath>

          {/* Liquid Emerald-to-Gold Gradient */}
          <linearGradient id="fluid-grad-primary" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#059669" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#047857" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="fluid-grad-secondary" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#065f46" stopOpacity="0.75" />
          </linearGradient>
        </defs>

        {/* Circular Background Tank */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 3}
          className="fill-stone-100 dark:fill-stone-900/90"
        />

        {/* Clipped Fluid Waves */}
        <g clipPath="url(#circle-fluid-clip)">
          {/* Secondary background wave */}
          <path d={secondaryWave} fill="url(#fluid-grad-secondary)" />
          {/* Primary foreground wave */}
          <path d={primaryWave} fill="url(#fluid-grad-primary)" />
        </g>

        {/* Subtle glass edge highlight */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 4}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-white/20"
        />
      </svg>

      {/* Center Label Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
        <span className="font-cinzel text-xs uppercase tracking-widest font-bold text-black dark:text-stone-300 drop-shadow-xs">
          Iman Level
        </span>
        <div className="flex items-baseline justify-center">
          <span className="text-4xl sm:text-5xl font-extrabold font-cinzel text-black dark:text-white drop-shadow-md tabular-nums">
            {displayPercent}
          </span>
          <span className="text-xl sm:text-2xl font-bold text-black dark:text-stone-200 ml-0.5">
            %
          </span>
        </div>
        <div className="mt-1 flex flex-col items-center">
          <span className="text-[11px] font-bold text-black dark:text-stone-100 drop-shadow-xs">
            {completedPrayers}/{totalPrayers} Prayers
          </span>
          <span className="text-[10px] text-stone-900 dark:text-stone-300 font-bold">
            {versesRead} Verses Read
          </span>
        </div>
      </div>
    </div>
  );
};
