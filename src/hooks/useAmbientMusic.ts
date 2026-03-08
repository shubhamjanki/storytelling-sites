import { useCallback, useRef } from "react";

const useAmbientMusic = () => {
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<OscillatorNode[]>([]);
  const gainRef = useRef<GainNode | null>(null);

  const start = useCallback(() => {
    if (ctxRef.current) return;
    const ctx = new AudioContext();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 3);
    master.connect(ctx.destination);
    gainRef.current = master;

    // Soft pad chords — C major ambient
    const frequencies = [130.81, 164.81, 196.0, 261.63, 329.63];

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;

      // Slow gentle detune drift
      osc.detune.value = 0;
      const driftLFO = ctx.createOscillator();
      driftLFO.frequency.value = 0.05 + i * 0.02;
      const driftGain = ctx.createGain();
      driftGain.gain.value = 8;
      driftLFO.connect(driftGain);
      driftGain.connect(osc.detune);
      driftLFO.start();

      // Individual volume envelope
      const envGain = ctx.createGain();
      envGain.gain.value = i < 2 ? 0.4 : 0.25;

      // Subtle volume LFO for breathing feel
      const volLFO = ctx.createOscillator();
      volLFO.frequency.value = 0.1 + i * 0.03;
      const volLFOGain = ctx.createGain();
      volLFOGain.gain.value = 0.08;
      volLFO.connect(volLFOGain);
      volLFOGain.connect(envGain.gain);
      volLFO.start();

      osc.connect(envGain);
      envGain.connect(master);
      osc.start();
      nodesRef.current.push(osc);
    });
  }, []);

  const stop = useCallback(() => {
    if (!ctxRef.current || !gainRef.current) return;
    const ctx = ctxRef.current;
    gainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);
    setTimeout(() => {
      nodesRef.current.forEach((osc) => {
        try { osc.stop(); } catch {}
      });
      nodesRef.current = [];
      ctx.close();
      ctxRef.current = null;
      gainRef.current = null;
    }, 2500);
  }, []);

  return { start, stop };
};

export default useAmbientMusic;
