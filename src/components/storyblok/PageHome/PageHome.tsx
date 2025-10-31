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
import TheFooter from '@/components/TheFooter/TheFooter';

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
    isProduction ? false : false
  );
  const containerRef = React.useRef<HTMLDivElement>(null);
  const middleBlokRef = React.useRef<HTMLDivElement>(null);
  const [soundPlaying, setSoundPlaying] = React.useState(true);
  const theme = useThemeStore((state) => state.theme);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Initial fade-in animation for elements with 'initSequence' class
  useGSAP(
    () => {
      if (containerRef.current) {
        const initElements =
          containerRef.current.querySelectorAll('.initSequence');

        // Set initial state (hidden)
        gsap.set(initElements, {
          opacity: 0,
          scale: 0.9,
        });

        // Fade in sequentially with stagger
        gsap.to(initElements, {
          opacity: 1,
          scale: 1,
          duration: 0.66,
          stagger: 0.165,
          ease: 'power2.out',
          delay: 0.165,
        });
      }
    },
    { scope: containerRef }
  );

  // Prevent scrolling until hasEntered is true, then enable after 1 second
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    if (!hasEntered) {
      // Ensure scroll to top happens first
      window.scrollTo(0, 0);

      // Disable scroll in next frame to ensure scrollTo completes
      requestAnimationFrame(() => {
        document.body.style.overflow = 'hidden';
      });
    } else {
      const timer = setTimeout(() => {
        document.body.style.overflow = 'auto';
      }, 1000);

      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [hasEntered]);

  // OLD
  // React.useEffect(() => {
  //   if (!hasEntered) {
  //     // Disable scrolling
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     // Enable scrolling after 1 second delay
  //     const timer = setTimeout(() => {
  //       document.body.style.overflow = 'auto';
  //     }, 1000);

  //     return () => clearTimeout(timer);
  //   }

  //   // Cleanup on unmount
  //   return () => {
  //     document.body.style.overflow = 'auto';
  //   };
  // }, [hasEntered]);

  // Animate middleBlokAnimation container when hasEntered becomes true
  useGSAP(
    () => {
      if (hasEntered && middleBlokRef.current) {
        gsap.to(middleBlokRef.current, {
          width: '100%',
          height: '100%',
          bottom: 0,
          duration: 1.5,
          ease: 'expo.inOut',
        });
      }
    },
    { scope: containerRef, dependencies: [hasEntered] }
  );

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
          delay: 1,
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
      <div className={styles.topScrollWrapper}>
        <div
          ref={middleBlokRef}
          className={`${styles.middleBlokAnimation} initSequence`}
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
      <TheFooter theme={mounted ? theme : 'light'} active={hasEntered} />
    </div>
  );
}
