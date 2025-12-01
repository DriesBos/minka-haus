'use client';

import styles from './TheSlider.module.sass';
import { useRef } from 'react';
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
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
        {landscape_image && (
          <div className={styles.imageLandscape} data-active={active}>
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
