'use client';

import styles from './TheSlider.module.sass';
import { useThemeStore } from '@/store/useThemeStore';
import { useEffect, useState } from 'react';

interface TheSliderProps {
  active?: boolean;
  landscape_image?: {
    filename: string;
    alt?: string;
  };
  craft_image?: {
    filename: string;
    alt?: string;
  };
  onEnter?: () => void;
}

export default function TheSlider({
  active = false,
  landscape_image,
  craft_image,
  onEnter,
}: TheSliderProps) {
  const theme = useThemeStore((state) => state.theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  console.log('TheSlider theme:', theme);

  return (
    <div
      className={`${styles.theSlider} theSlider`}
      data-active={active}
      data-theme={mounted ? theme : 'light'}
    >
      {landscape_image && (
        <div className={styles.imageLandscape} data-active={active}>
          <img
            src={landscape_image.filename}
            alt={landscape_image.alt}
            className={styles.image}
          />
        </div>
      )}
      {craft_image && (
        <div className={styles.imageCraft} data-active={active}>
          <img
            src={craft_image.filename}
            alt={craft_image.alt}
            className={styles.image}
          />
        </div>
      )}
      <div className={styles.enterBtn} onClick={onEnter} data-active={active}>
        Enter
      </div>
    </div>
  );
}
