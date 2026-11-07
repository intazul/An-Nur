/**
 * Push notifications and gentle spiritual reminder utilities
 */

export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isNotificationSupported()) return 'denied';
  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (err) {
    console.error('Failed to request notification permission:', err);
    return 'denied';
  }
}

/**
 * Plays a gentle, peaceful harmonic tone using Web Audio API
 */
export function playGentleChime(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // Peaceful harmonic chime chord (C5, G5, E6)
    const freqs = [523.25, 659.25, 783.99];
    const now = ctx.currentTime;

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0.001, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.15, now + idx * 0.12 + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 1.9);
    });
  } catch (err) {
    console.warn('Audio chime could not be synthesized:', err);
  }
}

export function sendPushReminder(title: string, body: string): void {
  playGentleChime();

  if (isNotificationSupported() && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        tag: 'annur-reminder',
      });
    } catch {
      // Fallback handled in UI
    }
  }
}
