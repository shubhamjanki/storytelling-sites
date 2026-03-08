import { useCallback, useRef } from "react";

const useAmbientMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playingRef = useRef(false);

  const start = useCallback(() => {
    if (audioRef.current) return;
    const audio = new Audio("/audio/Leanin.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audio.play().catch(() => {});
    audioRef.current = audio;
    playingRef.current = true;
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    if (playingRef.current) {
      audioRef.current.pause();
      playingRef.current = false;
    } else {
      audioRef.current.play().catch(() => {});
      playingRef.current = true;
    }
    return playingRef.current;
  }, []);

  const stop = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.src = "";
    audioRef.current = null;
    playingRef.current = false;
  }, []);

  const isPlaying = useCallback(() => playingRef.current, []);

  return { start, stop, pause, isPlaying };
};

export default useAmbientMusic;
