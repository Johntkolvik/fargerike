/**
 * celebrationSound.ts — Plays a short pleasant chime using Web Audio API.
 * No external audio files needed.
 *
 * Ported from mg-color-prototype.
 */

export function playCompletionChime(): void {
  try {
    const ctx = new AudioContext();

    const notes = [
      { freq: 587.33, start: 0, duration: 0.15 },    // D5
      { freq: 880, start: 0.12, duration: 0.25 },     // A5
    ];

    for (const note of notes) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = note.freq;

      gain.gain.setValueAtTime(0, ctx.currentTime + note.start);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + note.start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.start + note.duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + note.start);
      osc.stop(ctx.currentTime + note.start + note.duration);
    }

    setTimeout(() => ctx.close(), 500);
  } catch {
    // Silently fail if audio is not available
  }
}
