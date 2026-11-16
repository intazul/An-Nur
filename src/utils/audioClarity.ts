/**
 * Studio Vocal Clarity & Pronunciation Enhancer
 * Applies gentle high-pass filtering, de-muddying mid cut, 3.2kHz articulation lift,
 * air presence shelf, and soft dynamic compression via Web Audio API.
 * Keeps pitch preservation active during speed changes (0.75x / 1x / 1.25x).
 */

class AudioClarityProcessor {
  private ctx: AudioContext | null = null;
  private sourceMap = new WeakMap<HTMLMediaElement, MediaElementAudioSourceNode>();
  private highPass: BiquadFilterNode | null = null;
  private deMud: BiquadFilterNode | null = null;
  private presence: BiquadFilterNode | null = null;
  private airShelf: BiquadFilterNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private enabled = true;

  public applyPitchPreservation(audioEl: HTMLAudioElement | null) {
    if (!audioEl) return;
    try {
      const el = audioEl as HTMLAudioElement & {
        mozPreservesPitch?: boolean;
        webkitPreservesPitch?: boolean;
      };
      el.preservesPitch = true;
      el.mozPreservesPitch = true;
      el.webkitPreservesPitch = true;
    } catch {
      // ignore unsupported browser flags
    }
  }

  public attach(audioEl: HTMLAudioElement | null) {
    if (!audioEl || typeof window === 'undefined') return;
    this.applyPitchPreservation(audioEl);

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    try {
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }

      if (this.sourceMap.has(audioEl)) {
        return;
      }

      const source = this.ctx.createMediaElementSource(audioEl);
      this.sourceMap.set(audioEl, source);

      this.highPass = this.ctx.createBiquadFilter();
      this.highPass.type = 'highpass';
      this.highPass.frequency.value = 85;
      this.highPass.Q.value = 0.7;

      this.deMud = this.ctx.createBiquadFilter();
      this.deMud.type = 'peaking';
      this.deMud.frequency.value = 280;
      this.deMud.Q.value = 1.1;

      this.presence = this.ctx.createBiquadFilter();
      this.presence.type = 'peaking';
      this.presence.frequency.value = 3200;
      this.presence.Q.value = 0.85;

      this.airShelf = this.ctx.createBiquadFilter();
      this.airShelf.type = 'highshelf';
      this.airShelf.frequency.value = 7800;

      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.value = -18;
      this.compressor.knee.value = 12;
      this.compressor.ratio.value = 2.6;
      this.compressor.attack.value = 0.004;
      this.compressor.release.value = 0.14;

      source
        .connect(this.highPass)
        .connect(this.deMud)
        .connect(this.presence)
        .connect(this.airShelf)
        .connect(this.compressor)
        .connect(this.ctx.destination);

      this.updateFilterGains();
    } catch {
      // Fall back gracefully to direct HTMLAudioElement output if MediaElementSource fails
    }
  }

  public setEnabled(isEnabled: boolean) {
    this.enabled = isEnabled;
    this.updateFilterGains();
  }

  private updateFilterGains() {
    if (!this.ctx || !this.highPass || !this.deMud || !this.presence || !this.airShelf || !this.compressor) {
      return;
    }
    const now = this.ctx.currentTime;
    try {
      this.highPass.frequency.setTargetAtTime(this.enabled ? 85 : 20, now, 0.02);
      this.deMud.gain.setTargetAtTime(this.enabled ? -2.2 : 0, now, 0.02);
      this.presence.gain.setTargetAtTime(this.enabled ? 3.8 : 0, now, 0.02);
      this.airShelf.gain.setTargetAtTime(this.enabled ? 2.2 : 0, now, 0.02);
      this.compressor.ratio.setTargetAtTime(this.enabled ? 2.6 : 1, now, 0.02);
    } catch {
      // ignore
    }
  }
}

export const audioClarity = new AudioClarityProcessor();
