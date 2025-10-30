'use client';

import styles from './TheHeader.module.sass';
import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from 'gsap/TextPlugin';
import IconCircle from '../icons/IconCircle';
import IconPlay from '../icons/IconPlay';
import { useThemeStore } from '@/store/useThemeStore';
import IconPause from '../icons/IconPause';

// Register GSAP plugins
gsap.registerPlugin(useGSAP, TextPlugin);

interface TheHeaderProps {
  active?: boolean;
  soundPlaying?: boolean;
  onToggleSound?: () => void;
}

export default function TheHeader({
  active,
  soundPlaying = false,
  onToggleSound,
}: TheHeaderProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const typingTextRef = React.useRef<HTMLParagraphElement>(null);
  const locationRef = React.useRef<HTMLDivElement>(null);
  const purposeRef = React.useRef<HTMLDivElement>(null);
  const [showWhere, setShowWhere] = React.useState(false);
  const [showWhat, setShowWhat] = React.useState(false);
  const [isJapanese, setIsJapanese] = React.useState(false);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const iconSize = 12;

  const fullText =
    'Minkahaus is a renovation project on mountain and forest land north of Kyoto. Building a space for research, cultural exchange and stays that explore mingei, Japanese craft.';

  // Detect user language on mount
  React.useEffect(() => {
    const userLanguage = navigator.language || navigator.languages?.[0];
    setIsJapanese(userLanguage?.toLowerCase().startsWith('ja'));
  }, []);

  // Animate Header Items sequentially when active becomes true
  useGSAP(
    () => {
      if (active && containerRef.current) {
        const headerSequences =
          containerRef.current.querySelectorAll('.headerSequence');

        // Set initial state (hidden and slightly offset)
        gsap.set(headerSequences, {
          opacity: 0,
          y: 0,
        });

        // Animate in sequentially with stagger after 2 second delay
        gsap.to(headerSequences, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.25,
          ease: 'power2.out',
          delay: 2,
        });
      }
    },
    { scope: containerRef, dependencies: [active] }
  );

  // Typing animation for menu items
  useGSAP(
    () => {
      if (active && locationRef.current && purposeRef.current) {
        // Set initial empty text
        gsap.set([locationRef.current, purposeRef.current], {
          text: '',
        });

        // Animate typing for Location first
        gsap.to(locationRef.current, {
          duration: 0.5,
          text: 'Location',
          ease: 'none',
          delay: 2, // Start slightly after menu container fades in
        });

        // Animate typing for Purpose after Location finishes
        gsap.to(purposeRef.current, {
          duration: 0.5,
          text: 'Purpose',
          ease: 'none',
          delay: 2.5, // Start after Location finishes (4.25 + 0.33)
        });
      }
    },
    { scope: containerRef, dependencies: [active] }
  );

  // Typing animation for the bottom text
  useGSAP(
    () => {
      if (active && typingTextRef.current) {
        // Set initial empty text
        gsap.set(typingTextRef.current, {
          text: '',
        });

        // Animate typing effect
        gsap.to(typingTextRef.current, {
          duration: 2,
          text: fullText,
          ease: 'none',
          delay: 2.5, // Start after header elements appear (4s + 1.5s animation)
        });
      }
    },
    { scope: containerRef, dependencies: [active] }
  );

  return (
    <header
      className={styles.theHeader}
      data-active={active}
      ref={containerRef}
    >
      <div
        className={`${styles.column}  ${styles.logo}`}
        data-japanese={isJapanese}
      >
        <span className={`${styles.headerSequence} headerSequence`}>Minka</span>
        <span className={`${styles.headerSequence} headerSequence`}>haus</span>
      </div>

      <div className={`${styles.column} ${styles.description} headerSequence`}>
        <div className={styles.descriptionInner}>
          <p className={styles.textVisible} ref={typingTextRef}></p>
          <p aria-hidden="true" className={styles.textHidden}>
            {fullText}
          </p>
        </div>
      </div>

      <div
        className={`${styles.controls} ${styles.headerSequence} headerSequence`}
      >
        {soundPlaying ? (
          <div
            className={`${styles.button} ${styles.playButton}`}
            title="sound"
            onClick={onToggleSound}
          >
            <IconPause className={styles.icon} />{' '}
          </div>
        ) : (
          <div
            className={`${styles.button}`}
            title="sound"
            onClick={onToggleSound}
          >
            <IconPlay className={styles.icon} />
          </div>
        )}
        <div onClick={toggleTheme} title="theme" className={styles.button}>
          <IconCircle className={styles.icon} />
        </div>
      </div>
    </header>
  );
}
