'use client';

import styles from './TheSlider.module.sass';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import GrainyGradient from '@/components/GrainyGradient/GrainyGradient';
// import Image from 'next/image';
// import { useTheme } from '@/hooks/useTheme';

const VideoPlayer = dynamic(() => import('../VideoPlayer/VideoPlayer'), {
  ssr: false,
});

// Register GSAP plugin
gsap.registerPlugin(useGSAP);

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
  onEnter,
}: TheSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRenderVideo, setShouldRenderVideo] = useState(active);
  const [videoVisible, setVideoVisible] = useState(false);
  const showVideo = true;
  // const theme = useTheme();

  useEffect(() => {
    if (active) {
      setShouldRenderVideo(true);
      let firstFrame = 0;
      let secondFrame = 0;

      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          setVideoVisible(true);
        });
      });

      return () => {
        window.cancelAnimationFrame(firstFrame);
        window.cancelAnimationFrame(secondFrame);
      };
    }

    setVideoVisible(false);
  }, [active]);

  // Animate TheSlider container when active becomes true
  useGSAP(
    () => {
      if (active && sliderRef.current) {
        gsap.to(sliderRef.current, {
          width: 'calc(100vw - var(--spacing-sides) * 2)',
          height: 'calc(100% - 2rem)',
          bottom: '1rem',
          duration: 1.5,
          ease: 'expo.inOut',
          delay: 0.033,
        });
      }
    },
    { scope: containerRef, dependencies: [active] }
  );

  return (
    <div ref={containerRef}>
      <div
        ref={sliderRef}
        className={`${styles.theSlider} theSlider initSequence`}
        data-active={active}
      >
        <GrainyGradient className={styles.sliderGrain} />
        {showVideo && shouldRenderVideo && (
          <div className={styles.videoContainer} data-active={videoVisible}>
            <VideoPlayer active={active} autoplay={active} preload="metadata" />
          </div>
        )}
         {/* {landscape_image && (
          <div
            className={styles.imageLandscape}
            data-active={active}
            data-theme={theme}
          >
            <Image
              src={landscape_image.filename}
              alt={landscape_image.alt || 'Minkahaus landscape image'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              priority
              quality={60}
              className={styles.image}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
        {craft_image && (
          <div
            className={styles.imageCraft}
            data-active={active}
            data-theme={theme}
          >
            <Image
              src={craft_image.filename}
              alt={craft_image.alt || 'Minkahaus craft image'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              priority
              quality={60}
              className={styles.image}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )} */}
      <div
          className={`${styles.enterBtn} initSequence`}
          onClick={onEnter}
          data-active={active}
        >
          Enter
        </div>
      </div>
    </div>
  );
}
