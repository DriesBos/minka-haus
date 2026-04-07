'use client';

import styles from './TheHeader.module.sass';
import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from 'gsap/TextPlugin';
import IconCircle from '../icons/IconCircle';
import IconHouseLogo from '../icons/IconHouseLogo';
import IconPlay from '../icons/IconPlay';
import { useThemeActions } from '@/hooks/useTheme';
import { useIsJapaneseLanguage } from '@/hooks/useIsJapaneseLanguage';
import IconPause from '../icons/IconPause';

// Register GSAP plugins
gsap.registerPlugin(useGSAP, TextPlugin);

interface TheHeaderProps {
  active?: boolean;
  soundPlaying?: boolean;
  onToggleSound?: () => void;
}

interface ScrambleController {
  setHovered: (hovered: boolean) => void;
  start: () => void;
  stop: () => void;
}

export default function TheHeader({
  active,
  soundPlaying = false,
  onToggleSound,
}: TheHeaderProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const typingTextRef = React.useRef<HTMLParagraphElement>(null);
  const minkaTextRef = React.useRef<HTMLSpanElement>(null);
  const hausTextRef = React.useRef<HTMLSpanElement>(null);
  const minkaControllerRef = React.useRef<ScrambleController | null>(null);
  const hausControllerRef = React.useRef<ScrambleController | null>(null);
  const isJapanese = useIsJapaneseLanguage();
  const { toggleTheme } = useThemeActions();

  const fullText =
    'MinkaHaus is a renovation project on mountain and forest land north of Kyoto. Building a space for research, cultural exchange and stays that explore mingei, Japanese craft.';

  React.useEffect(() => {
    const latinChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const japaneseChars =
      'アイウエオカキクケコミサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン';
    const scrambleStepDuration = 30;
    const scrambleIterations = 8;
    const englishVisibleDuration = 10000;
    const japaneseVisibleDuration = 5000;

    const createScrambleLoop = (
      element: HTMLSpanElement | null,
      englishText: string,
      japaneseText: string,
      initialDelay: number,
    ): ScrambleController | null => {
      if (!element) {
        return null;
      }

      let timeoutId: number | null = null;
      let intervalId: number | null = null;
      let currentLanguage: 'english' | 'japanese' = 'english';
      let hovered = false;

      const clearTimers = () => {
        if (timeoutId !== null) {
          window.clearTimeout(timeoutId);
          timeoutId = null;
        }

        if (intervalId !== null) {
          window.clearInterval(intervalId);
          intervalId = null;
        }
      };

      const schedule = (callback: () => void, delay: number) => {
        timeoutId = window.setTimeout(() => {
          timeoutId = null;
          callback();
        }, delay);
      };

      const scheduleNext = (language: 'english' | 'japanese') => {
        if (hovered) {
          return;
        }

        const delay =
          language === 'english'
            ? englishVisibleDuration
            : japaneseVisibleDuration;
        const nextLanguage = language === 'english' ? 'japanese' : 'english';

        schedule(() => {
          scrambleTo(nextLanguage);
        }, delay);
      };

      const scrambleTo = (targetLanguage: 'english' | 'japanese') => {
        const targetText =
          targetLanguage === 'japanese' ? japaneseText : englishText;
        const chars =
          targetLanguage === 'japanese' ? japaneseChars : latinChars;

        clearTimers();

        if (currentLanguage === targetLanguage) {
          element.textContent = targetText;
          scheduleNext(targetLanguage);
          return;
        }

        let iteration = 0;

        intervalId = window.setInterval(() => {
          element.textContent = targetText
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (
                index <
                (iteration / scrambleIterations) * targetText.length
              ) {
                return targetText[index];
              }

              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

          iteration += 1;

          if (iteration > targetText.length * scrambleIterations) {
            if (intervalId !== null) {
              window.clearInterval(intervalId);
              intervalId = null;
            }

            element.textContent = targetText;
            currentLanguage = targetLanguage;
            scheduleNext(targetLanguage);
          }
        }, scrambleStepDuration);
      };

      return {
        start: () => {
          hovered = false;
          clearTimers();
          currentLanguage = 'english';
          element.textContent = englishText;
          schedule(() => {
            scrambleTo('japanese');
          }, initialDelay);
        },
        setHovered: (nextHovered: boolean) => {
          hovered = nextHovered;
          clearTimers();

          if (hovered) {
            scrambleTo('japanese');
            return;
          }

          if (currentLanguage === 'english') {
            element.textContent = englishText;
            scheduleNext('english');
            return;
          }

          scrambleTo('english');
        },
        stop: () => {
          hovered = false;
          clearTimers();
          currentLanguage = 'english';
          element.textContent = englishText;
        },
      };
    };

    if (!active) {
      minkaControllerRef.current?.stop();
      hausControllerRef.current?.stop();
      minkaControllerRef.current = null;
      hausControllerRef.current = null;
      return;
    }

    minkaControllerRef.current = createScrambleLoop(
      minkaTextRef.current,
      'Minka',
      'ミンカ',
      5000,
    );
    hausControllerRef.current = createScrambleLoop(
      hausTextRef.current,
      'Haus',
      'ハウス',
      15000,
    );

    minkaControllerRef.current?.start();
    hausControllerRef.current?.start();

    return () => {
      minkaControllerRef.current?.stop();
      hausControllerRef.current?.stop();
      minkaControllerRef.current = null;
      hausControllerRef.current = null;
    };
  }, [active]);

  const handleLogoMouseEnter = () => {
    minkaControllerRef.current?.setHovered(true);
    hausControllerRef.current?.setHovered(true);
  };

  const handleLogoMouseLeave = () => {
    minkaControllerRef.current?.setHovered(false);
    hausControllerRef.current?.setHovered(false);
  };

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
    { scope: containerRef, dependencies: [active] },
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
          duration: 1.66,
          text: fullText,
          ease: 'none',
          delay: 2, // Start after header elements appear (4s + 1.5s animation)
        });
      }
    },
    { scope: containerRef, dependencies: [active] },
  );

  return (
    <header
      className={styles.theHeader}
      data-active={active}
      ref={containerRef}
    >
      {/* <div className={`${styles.mark} ${styles.headerSequence} headerSequence`}>
        <IconHouseLogo className={styles.markIcon} />
      </div> */}
      <div
        className={`${styles.column}  ${styles.logo}`}
        data-japanese={isJapanese}
        onMouseEnter={handleLogoMouseEnter}
        onMouseLeave={handleLogoMouseLeave}
      >
        <span
          ref={minkaTextRef}
          className={`${styles.headerSequence} headerSequence`}
        >
          Minka
        </span>
        <span
          ref={hausTextRef}
          className={`${styles.headerSequence} headerSequence`}
        >
          Haus
        </span>
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
      {/* <GrainyGradient /> */}
    </header>
  );
}
