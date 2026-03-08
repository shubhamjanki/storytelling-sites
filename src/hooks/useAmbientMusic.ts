import { useCallback, useRef } from "react";

const useAmbientMusic = () => {
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<AudioScheduledSourceNode[]>([]);
  const gainRef = useRef<GainNode | null>(null);
  const playingRef = useRef(false);

  const start = useCallback(() => {
    if (ctxRef.current) return;
    const ctx = new AudioContext();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.gain.linearRampToValueAtTime(0.09, ctx.currentTime + 4);
    master.connect(ctx.destination);
    gainRef.current = master;

    // Ethereal ambient — pentatonic drone in D
    const pads: [number, number, OscillatorType][] = [
      [73.42, 0.35, "sine"],      // D2
      [110.0, 0.3, "sine"],       // A2
      [146.83, 0.25, "triangle"], // D3
      [220.0, 0.2, "sine"],       // A3
      [293.66, 0.15, "triangle"], // D4
      [440.0, 0.1, "sine"],       // A4
    ];

    pads.forEach(([freq, vol, type], i) => {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = freq;

      // Very slow pitch drift for organic feel
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.03 + i * 0.01;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 3;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.detune);
      lfo.start();
      nodesRef.current.push(lfo);

      // Breathing volume
      const volLfo = ctx.createOscillator();
      volLfo.frequency.value = 0.06 + i * 0.015;
      const volLfoGain = ctx.createGain();
      volLfoGain.gain.value = vol * 0.3;
      volLfo.connect(volLfoGain);

      const envGain = ctx.createGain();
      envGain.gain.value = vol;
      volLfoGain.connect(envGain.gain);
      volLfo.start();
      nodesRef.current.push(volLfo);

      // Filter for warmth
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 600 + i * 100;
      filter.Q.value = 0.5;

      osc.connect(filter);
      filter.connect(envGain);
      envGain.connect(master);
      osc.start();
      nodesRef.current.push(osc);
    });

    // Soft shimmer layer
    const shimmer = ctx.createOscillator();
    shimmer.type = "sine";
    shimmer.frequency.value = 587.33; // D5
    const shimmerGain = ctx.createGain();
    shimmerGain.gain.value = 0;

    // Slow fade in/out shimmer
    const shimmerLfo = ctx.createOscillator();
    shimmerLfo.frequency.value = 0.04;
    const shimmerLfoGain = ctx.createGain();
    shimmerLfoGain.gain.value = 0.04;
    shimmerLfo.connect(shimmerLfoGain);
    shimmerLfoGain.connect(shimmerGain.gain);
    shimmerLfo.start();
    nodesRef.current.push(shimmerLfo);

    const shimmerFilter = ctx.createBiquadFilter();
    shimmerFilter.type = "lowpass";
    shimmerFilter.frequency.value = 800;

    shimmer.connect(shimmerFilter);
    shimmerFilter.connect(shimmerGain);
    shimmerGain.connect(master);
    shimmer.start();
    nodesRef.current.push(shimmer);

    playingRef.current = true;
  }, []);

  const pause = useCallback(() => {
    if (!ctxRef.current) return;
    if (playingRef.current) {
      ctxRef.current.suspend();
      playingRef.current = false;
    } else {
      ctxRef.current.resume();
      playingRef.current = true;
    }
    return playingRef.current;
  }, []);

  const stop = useCallback(() => {
    if (!ctxRef.current || !gainRef.current) return;
    const ctx = ctxRef.current;
    gainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);
    setTimeout(() => {
      nodesRef.current.forEach((node) => {
        try { node.stop(); } catch {}
      });
      nodesRef.current = [];
      ctx.close();
      ctxRef.current = null;
      gainRef.current = null;
      playingRef.current = false;
    }, 2500);
  }, []);

  const isPlaying = useCallback(() => playingRef.current, []);

  return { start, stop, pause, isPlaying };
};

export default useAmbientMusic;
