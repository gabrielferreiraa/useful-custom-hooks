import { useEffect, useState, useCallback } from 'react';

const useSound = (audioUrl: string) => {
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    if (!audio) return;

    audio.play();
    setPlaying(true);
  }, [audio]);

  const pause = useCallback(() => {
    if (!audio) return;

    audio.pause();
    setPlaying(false);
  }, [audio]);

  useEffect(() => {
    const media = new Audio(audioUrl);
    setAudio(media);

    media.addEventListener('ended', () => setPlaying(false));

    return () => {
      setAudio(null);
      setPlaying(false);
      media.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audioUrl]);

  return { play, pause, playing };
};

export default useSound;
