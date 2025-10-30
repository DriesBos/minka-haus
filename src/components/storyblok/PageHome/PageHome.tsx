'use client';

import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './PageHome.module.sass';
import DataBlok from '@/components/DataBlok/DataBlok';
import LocalTimeBlok from '@/components/DataBlok/LocalTimeBlok';
import WeatherBlok from '@/components/DataBlok/WeatherBlok';
import SoundPlayer from '@/components/SoundPlayer/SoundPlayer';
import TheHeader from '@/components/TheHeader/TheHeader';
import TheSlider from '@/components/TheSlider/TheSlider';
import { useThemeStore } from '@/store/useThemeStore';

// Register GSAP plugin
gsap.registerPlugin(useGSAP);

interface StoryblokBlok {
  _uid: string;
  component: string;
  [key: string]: unknown;
}

interface PageHomeProps {
  blok: {
    body?: StoryblokBlok[];
    [key: string]: unknown;
    landscape_image?: {
      filename: string;
      alt?: string;
    };
    craft_image?: {
      filename: string;
      alt?: string;
    };
    entry_text?: string;
  };
}

export default function PageHome({ blok }: PageHomeProps) {
  const isProduction = process.env.NODE_ENV === 'production';
  // Production env always activates intro page
  const [hasEntered, setHasEntered] = React.useState(
    isProduction ? false : true
  );
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [soundPlaying, setSoundPlaying] = React.useState(true);
  const theme = useThemeStore((state) => state.theme);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Animate DataBlok components sequentially when hasEntered becomes true
  useGSAP(
    () => {
      if (hasEntered && containerRef.current) {
        const dataBloks = containerRef.current.querySelectorAll('.dataBlok');

        // Set initial state (hidden and slightly offset)
        gsap.set(dataBloks, {
          opacity: 0,
          y: 20,
        });

        // Animate in sequentially with stagger
        // 5 * 0.33 = 1.65 + 0.66 = 2.31s total
        gsap.to(dataBloks, {
          opacity: 1,
          y: 0,
          duration: 0.66,
          stagger: 0.33,
          ease: 'power2.out',
        });
      }
    },
    { scope: containerRef, dependencies: [hasEntered] }
  );

  return (
    <div
      className={styles.pageHome}
      data-entered={hasEntered}
      ref={containerRef}
    >
      <div
        className={styles.middleBlokAnimation}
        data-active={hasEntered}
        data-theme={mounted ? theme : 'light'}
      />
      <TheHeader
        active={hasEntered}
        soundPlaying={soundPlaying}
        onToggleSound={() => setSoundPlaying(!soundPlaying)}
      />

      {blok.landscape_image && (
        <div className={styles.theSliderWrapper}>
          <TheSlider
            landscape_image={blok.landscape_image}
            craft_image={blok.craft_image}
            active={hasEntered}
            onEnter={() => setHasEntered(true)}
          />
          <DataBlok
            label="Location"
            value="Kita-ku, Kyoto"
            active={hasEntered}
          />
          <WeatherBlok active={hasEntered} />
          <LocalTimeBlok active={hasEntered} />
        </div>
      )}

      <SoundPlayer
        audioSrc="/audio/vetiverol.mp3"
        active={hasEntered && soundPlaying}
        onActive={setSoundPlaying}
      />
    </div>
  );
}
