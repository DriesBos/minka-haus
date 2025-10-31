'use client';

import styles from './TheSlider.module.sass';
import { useThemeStore } from '@/store/useThemeStore';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

// Register GSAP plugin
gsap.registerPlugin(useGSAP);

interface TheSliderProps {
  active?: boolean;
  landscape_image?: {
    filename: string;
    alt?: string;
  };
  onEnter?: () => void;
}

export default function TheSlider({
  active = false,
  landscape_image,
  onEnter,
}: TheSliderProps) {
  const theme = useThemeStore((state) => state.theme);
  const [mounted, setMounted] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        data-theme={mounted ? theme : 'light'}
      >
        {landscape_image && (
          <div className={styles.imageLandscape} data-active={active}>
            <Image
              src={landscape_image.filename}
              alt={landscape_image.alt || 'Minkahaus landscape image'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              priority
              quality={90}
              className={styles.image}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
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
