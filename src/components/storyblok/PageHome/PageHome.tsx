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
  const [hasEntered, setHasEntered] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  console.log('blok', blok);

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

  console.log('hasEntered', hasEntered);

  return (
    <div
      className={styles.pageHome}
      data-entered={hasEntered}
      ref={containerRef}
    >
      {blok.landscape_image && (
        <TheSlider
          landscape_image={blok.landscape_image}
          craft_image={blok.craft_image}
          active={hasEntered}
          onEnter={() => setHasEntered(true)}
        />
      )}

      <DataBlok label="Location" value="Kita-ku, Kyoto" active={hasEntered} />
      <WeatherBlok active={hasEntered} />
      <LocalTimeBlok active={hasEntered} />
      <SoundPlayer audioSrc="/audio/vetiverol.mp3" active={hasEntered} />
      <TheHeader active={hasEntered} />
    </div>
  );
}
