'use client';

import { useRef, useState, useEffect } from 'react';
import styles from './SoundPlayer.module.sass';

const fadeDuration = 3000;
const fadeSteps = 120;

interface SoundPlayerProps {
  audioSrc: string;
  active?: boolean;
  onActive?: (playing: boolean) => void;
}

export default function SoundPlayer({
  audioSrc,
  active,
  onActive,
}: SoundPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeIntervalRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [windowIsActive, setWindowIsActive] = useState(true);

  const clearFadeInterval = () => {
    if (fadeIntervalRef.current !== null) {
      window.clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  };

  const fadeVolume = (
    audio: HTMLAudioElement,
    targetVolume: number,
    onComplete?: () => void
  ) => {
    clearFadeInterval();

    const startVolume = audio.volume;
    const volumeDelta = targetVolume - startVolume;

    if (Math.abs(volumeDelta) < 0.001) {
      audio.volume = targetVolume;
      onComplete?.();
      return;
    }

    const stepDuration = fadeDuration / fadeSteps;
    let currentStep = 0;

    fadeIntervalRef.current = window.setInterval(() => {
      currentStep += 1;

      const progress = Math.min(currentStep / fadeSteps, 1);
      audio.volume = startVolume + volumeDelta * progress;

      if (progress >= 1) {
        audio.volume = targetVolume;
        clearFadeInterval();
        onComplete?.();
      }
    }, stepDuration);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      onActive?.(false);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      clearFadeInterval();
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onActive]);

  useEffect(() => {
    const updateWindowActivity = () => {
      setWindowIsActive(!document.hidden && document.hasFocus());
    };

    updateWindowActivity();

    window.addEventListener('focus', updateWindowActivity);
    window.addEventListener('blur', updateWindowActivity);
    document.addEventListener('visibilitychange', updateWindowActivity);

    return () => {
      window.removeEventListener('focus', updateWindowActivity);
      window.removeEventListener('blur', updateWindowActivity);
      document.removeEventListener('visibilitychange', updateWindowActivity);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (active) {
      const targetVolume = windowIsActive ? volume : 0;
      const startPlayback = () => {
        setIsPlaying(true);
        fadeVolume(audio, targetVolume);
      };

      if (audio.paused) {
        audio.volume = 0;

        const playPromise = audio.play();

        if (playPromise !== undefined) {
          playPromise
            .then(startPlayback)
            .catch((error) => {
              console.log('Autoplay prevented:', error.message);
              setIsPlaying(false);
              onActive?.(false);
            });
        } else {
          startPlayback();
        }
      } else {
        startPlayback();
      }
    } else {
      clearFadeInterval();
      audio.pause();
      audio.volume = 0;
      setIsPlaying(false);
    }
  }, [active, volume, windowIsActive]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      clearFadeInterval();
      audio.pause();
      audio.volume = 0;
      onActive?.(false);
    } else {
      audio.volume = 0;
      audio
        .play()
        .then(() => {
          fadeVolume(audio, windowIsActive ? volume : 0);
        })
        .catch((error) => {
          console.log('Autoplay prevented:', error.message);
          setIsPlaying(false);
          onActive?.(false);
        });
      onActive?.(true);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const vol = parseFloat(e.target.value);
    setVolume(vol);

    if (active && windowIsActive) {
      fadeVolume(audio, vol);
    }
  };

  return (
    <div className={styles.player} data-playing={isPlaying}>
      <audio ref={audioRef} src={audioSrc} loop />

      <div className={styles.controls}>
        <div className={styles.playButton} onClick={togglePlay}>
          {isPlaying ? 'Pause' : 'Play'}
        </div>

        <div className={styles.progressContainer}>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className={styles.progressBar}
            aria-label="Seek"
          />
        </div>
      </div>
    </div>
  );
}
