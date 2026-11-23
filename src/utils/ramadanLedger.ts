const RAMADAN_LEDGER_KEY = 'annur_ramadan_ledger_v1';

export type RamadanFastStatus = 'none' | 'kept' | 'qada_exempt';

export interface RamadanDayEntry {
  fastStatus: RamadanFastStatus;
  taraweehRakats: 0 | 8 | 20;
  sadaqah: boolean;
  qadrChecklist: {
    qiyam: boolean;
    surahQadr: boolean;
    charity: boolean;
    tawbahDua: boolean;
  };
}

export interface RamadanYearLedger {
  hijriYear: number;
  days: Record<number, RamadanDayEntry>; // 1..30
  completedJuz: number[]; // 1..30
  ashraDhikrCounts: {
    1: number;
    2: number;
    3: number;
  };
  qadrDuaCount: number;
}

export interface RamadanLedgerSummary {
  fastsKept: number;
  qadaPending: number;
  taraweehNights: number;
  totalTaraweehRakats: number;
  sadaqahDays: number;
  juzCompleted: number;
  oddNightsCompleted: number;
}

function emptyDayEntry(): RamadanDayEntry {
  return {
    fastStatus: 'none',
    taraweehRakats: 0,
    sadaqah: false,
    qadrChecklist: {
      qiyam: false,
      surahQadr: false,
      charity: false,
      tawbahDua: false,
    },
  };
}

export function createEmptyRamadanLedger(hijriYear: number): RamadanYearLedger {
  return {
    hijriYear,
    days: {},
    completedJuz: [],
    ashraDhikrCounts: { 1: 0, 2: 0, 3: 0 },
    qadrDuaCount: 0,
  };
}

function ledgerKey(hijriYear: number, isPreview: boolean): string {
  return isPreview ? `${RAMADAN_LEDGER_KEY}_preview` : `${RAMADAN_LEDGER_KEY}_${hijriYear}`;
}

export function loadRamadanLedger(hijriYear: number, isPreview: boolean): RamadanYearLedger {
  try {
    const raw = localStorage.getItem(ledgerKey(hijriYear, isPreview));
    if (!raw) return createEmptyRamadanLedger(hijriYear);
    const parsed = JSON.parse(raw) as Partial<RamadanYearLedger>;
    return {
      hijriYear: parsed.hijriYear || hijriYear,
      days: parsed.days && typeof parsed.days === 'object' ? parsed.days : {},
      completedJuz: Array.isArray(parsed.completedJuz) ? parsed.completedJuz : [],
      ashraDhikrCounts: {
        1: Number(parsed.ashraDhikrCounts?.[1] || 0),
        2: Number(parsed.ashraDhikrCounts?.[2] || 0),
        3: Number(parsed.ashraDhikrCounts?.[3] || 0),
      },
      qadrDuaCount: Number(parsed.qadrDuaCount || 0),
    };
  } catch {
    return createEmptyRamadanLedger(hijriYear);
  }
}

export function saveRamadanLedger(
  ledger: RamadanYearLedger,
  isPreview: boolean
): RamadanYearLedger {
  try {
    localStorage.setItem(ledgerKey(ledger.hijriYear, isPreview), JSON.stringify(ledger));
  } catch {
    // ignore storage errors
  }
  return ledger;
}

export function getRamadanDayEntry(ledger: RamadanYearLedger, day: number): RamadanDayEntry {
  return ledger.days[day] || emptyDayEntry();
}

export function cycleRamadanFastStatus(
  ledger: RamadanYearLedger,
  day: number,
  isPreview: boolean
): RamadanYearLedger {
  const current = getRamadanDayEntry(ledger, day);
  const nextStatus: RamadanFastStatus =
    current.fastStatus === 'none'
      ? 'kept'
      : current.fastStatus === 'kept'
      ? 'qada_exempt'
      : 'none';
  const updated: RamadanYearLedger = {
    ...ledger,
    days: {
      ...ledger.days,
      [day]: { ...current, fastStatus: nextStatus },
    },
  };
  return saveRamadanLedger(updated, isPreview);
}

export function cycleRamadanTaraweeh(
  ledger: RamadanYearLedger,
  day: number,
  isPreview: boolean
): RamadanYearLedger {
  const current = getRamadanDayEntry(ledger, day);
  const nextRakats: 0 | 8 | 20 =
    current.taraweehRakats === 0 ? 8 : current.taraweehRakats === 8 ? 20 : 0;
  const updated: RamadanYearLedger = {
    ...ledger,
    days: {
      ...ledger.days,
      [day]: { ...current, taraweehRakats: nextRakats },
    },
  };
  return saveRamadanLedger(updated, isPreview);
}

export function toggleRamadanSadaqah(
  ledger: RamadanYearLedger,
  day: number,
  isPreview: boolean
): RamadanYearLedger {
  const current = getRamadanDayEntry(ledger, day);
  const updated: RamadanYearLedger = {
    ...ledger,
    days: {
      ...ledger.days,
      [day]: { ...current, sadaqah: !current.sadaqah },
    },
  };
  return saveRamadanLedger(updated, isPreview);
}

export function toggleRamadanJuz(
  ledger: RamadanYearLedger,
  juzNum: number,
  isPreview: boolean
): RamadanYearLedger {
  const exists = ledger.completedJuz.includes(juzNum);
  const completedJuz = exists
    ? ledger.completedJuz.filter((j) => j !== juzNum)
    : [...ledger.completedJuz, juzNum].sort((a, b) => a - b);
  return saveRamadanLedger({ ...ledger, completedJuz }, isPreview);
}

export function incrementRamadanAshraDhikr(
  ledger: RamadanYearLedger,
  ashra: 1 | 2 | 3,
  isPreview: boolean,
  delta: number = 1
): RamadanYearLedger {
  const updated: RamadanYearLedger = {
    ...ledger,
    ashraDhikrCounts: {
      ...ledger.ashraDhikrCounts,
      [ashra]: Math.max(0, (ledger.ashraDhikrCounts[ashra] || 0) + delta),
    },
  };
  return saveRamadanLedger(updated, isPreview);
}

export function incrementRamadanQadrDua(
  ledger: RamadanYearLedger,
  isPreview: boolean,
  delta: number = 1
): RamadanYearLedger {
  const updated: RamadanYearLedger = {
    ...ledger,
    qadrDuaCount: Math.max(0, (ledger.qadrDuaCount || 0) + delta),
  };
  return saveRamadanLedger(updated, isPreview);
}

export function toggleOddNightChecklistItem(
  ledger: RamadanYearLedger,
  day: number,
  field: keyof RamadanDayEntry['qadrChecklist'],
  isPreview: boolean
): RamadanYearLedger {
  const current = getRamadanDayEntry(ledger, day);
  const updated: RamadanYearLedger = {
    ...ledger,
    days: {
      ...ledger.days,
      [day]: {
        ...current,
        qadrChecklist: {
          ...current.qadrChecklist,
          [field]: !current.qadrChecklist[field],
        },
      },
    },
  };
  return saveRamadanLedger(updated, isPreview);
}

export function summarizeRamadanLedger(ledger: RamadanYearLedger): RamadanLedgerSummary {
  let fastsKept = 0;
  let qadaPending = 0;
  let taraweehNights = 0;
  let totalTaraweehRakats = 0;
  let sadaqahDays = 0;
  let oddNightsCompleted = 0;

  for (let d = 1; d <= 30; d++) {
    const entry = ledger.days[d];
    if (!entry) continue;
    if (entry.fastStatus === 'kept') fastsKept += 1;
    if (entry.fastStatus === 'qada_exempt') qadaPending += 1;
    if (entry.taraweehRakats > 0) {
      taraweehNights += 1;
      totalTaraweehRakats += entry.taraweehRakats;
    }
    if (entry.sadaqah) sadaqahDays += 1;
    if (d >= 21 && d % 2 === 1) {
      const checks = Object.values(entry.qadrChecklist || {}).filter(Boolean).length;
      if (checks >= 2) oddNightsCompleted += 1;
    }
  }

  return {
    fastsKept,
    qadaPending,
    taraweehNights,
    totalTaraweehRakats,
    sadaqahDays,
    juzCompleted: ledger.completedJuz.length,
    oddNightsCompleted,
  };
}
