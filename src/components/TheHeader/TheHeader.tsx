'use client';

import styles from './TheHeader.module.sass';
import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from 'gsap/TextPlugin';
import IconCircle from '../icons/IconCircle';
import IconStop from '../icons/IconStop';
import IconPlay from '../icons/IconPlay';
import { useThemeStore } from '@/store/useThemeStore';

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

  const fullText =
    'An ever-growing collection of references and tools for designers. Curated by Julien Van Havere, founder of DesignPractice™ and TypeFoundry™.';

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
      <div className={styles.brand}>
        <div
          className={`${styles.logo} ${styles.headerSequence} headerSequence`}
        >
          {isJapanese ? (
            <>
              <span>Minka</span>haus
            </>
          ) : (
            <>
              Minka<span>haus</span>
            </>
          )}
        </div>
      </div>

      <div className={styles.nav}>
        <div className={styles.top}>
          <div
            className={`${styles.menu} ${styles.headerSequence} headerSequence`}
          >
            <div className={styles.menuItem} ref={locationRef}></div>
            <div className={styles.menuItem} ref={purposeRef}></div>
          </div>
          <div
            className={`${styles.icons} ${styles.headerSequence} headerSequence`}
          >
            {soundPlaying ? (
              <div
                className={styles.button}
                title="sound stop"
                onClick={onToggleSound}
              >
                <IconStop />{' '}
              </div>
            ) : (
              <div
                className={styles.button}
                title="sound play"
                onClick={onToggleSound}
              >
                <IconPlay />
              </div>
            )}
            <div onClick={toggleTheme} title="theme" className={styles.button}>
              <IconCircle />
            </div>
          </div>
        </div>
        <div
          className={`${styles.bottom} ${styles.headerSequence} headerSequence`}
        >
          <p className={styles.textVisible} ref={typingTextRef}></p>
          <p aria-hidden="true" className={styles.textHidden}>
            {fullText}
          </p>
        </div>
        {/* <a
          href="https://www.instagram.com/minkahaus/"
          rel="noreferrer"
          target="_blank"
          className={`${styles.headerSequence} headerSequence`}
        >
          Instagram
        </a> */}
        {/* <a
          href="https://www.storyblok.com/"
          className={`${styles.headerSequence} headerSequence`}
        >
          Newsletter
        </a>

        <a
          href="mailto:hello@minkahaus.com"
          rel="noreferrer"
          target="_blank"
          className={`${styles.headerSequence} headerSequence`}
        >
          Hello@minkahaus.com
        </a>
        <div className={`${styles.headerSequence} headerSequence`}>Sound</div>
        <div className={`${styles.headerSequence} headerSequence`}>Theme</div> */}
      </div>
    </header>
  );
}
