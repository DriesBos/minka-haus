'use client';

import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TheBackground from '@/components/the-background/the-background';
import styles from './PageHome.module.sass';
import DataBlok from '@/components/DataBlok/DataBlok';
import LocalTimeBlok from '@/components/DataBlok/LocalTimeBlok';
import WeatherBlok from '@/components/DataBlok/WeatherBlok';
import SoundPlayer from '@/components/SoundPlayer/SoundPlayer';

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
    background_image?: {
      filename: string;
      alt?: string;
    };
    entry_text?: string;
  };
}

export default function PageHome({ blok }: PageHomeProps) {
  const [hasEntered, setHasEntered] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

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
        gsap.to(dataBloks, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15, // 150ms delay between each element
          ease: 'power2.out',
        });
      }
    },
    { scope: containerRef, dependencies: [hasEntered] }
  );

  console.log('hasEntered', hasEntered);

  return (
    <div
      className={styles.pageHome}
      data-entered={hasEntered}
      ref={containerRef}
    >
      {blok.background_image && (
        <TheBackground image={blok.background_image} active={hasEntered} />
      )}
      <div
        className={styles.entryText}
        onClick={() => setHasEntered(true)}
        data-active={!hasEntered}
      >
        Enter
      </div>
      <DataBlok label="Location" value="Kita-ku, Kyoto" active={hasEntered} />
      <WeatherBlok active={hasEntered} />
      <LocalTimeBlok active={hasEntered} />
      <SoundPlayer audioSrc="/audio/vetiverol.mp3" active={hasEntered} />
    </div>
  );
}
