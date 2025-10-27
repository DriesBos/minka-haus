'use client';

import { useRef, useState, useEffect } from 'react';
import styles from './SoundPlayer.module.sass';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  // Handle active prop to control playback with fade-in
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (active) {
      // Start at volume 0 and play immediately
      audio.volume = 0;
      audio.play();
      setIsPlaying(true);

      // Fade in over 12 seconds
      const fadeDuration = 12000;
      const steps = 240; // 240 steps for smooth fade
      const volumeIncrement = 1 / steps;
      const stepDuration = fadeDuration / steps;
      let currentStep = 0;

      const fadeInterval = setInterval(() => {
        currentStep++;
        const newVolume = Math.min(currentStep * volumeIncrement, 1);
        audio.volume = newVolume;
        setVolume(newVolume);

        if (currentStep >= steps) {
          clearInterval(fadeInterval);
        }
      }, stepDuration);

      return () => clearInterval(fadeInterval);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [active]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
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
    audio.volume = vol;
    setVolume(vol);
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
