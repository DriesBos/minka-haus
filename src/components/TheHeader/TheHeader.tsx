'use client';

import styles from './TheHeader.module.sass';
import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import IconCircle from '../icons/IconCircle';
import IconStop from '../icons/IconStop';
import IconPlay from '../icons/IconPlay';
import { useThemeStore } from '@/store/useThemeStore';

// Register GSAP plugin
gsap.registerPlugin(useGSAP);

interface TheHeaderProps {
  active?: boolean;
}

export default function TheHeader({ active }: TheHeaderProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [showWhere, setShowWhere] = React.useState(false);
  const [showWhat, setShowWhat] = React.useState(false);
  const [soundPlaying, setSoundPlaying] = React.useState(false);
  const [isJapanese, setIsJapanese] = React.useState(false);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  // Detect user language on mount
  React.useEffect(() => {
    const userLanguage = navigator.language || navigator.languages?.[0];
    setIsJapanese(userLanguage?.toLowerCase().startsWith('ja'));
  }, []);

  // Animate DataBlok components sequentially when active becomes true
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
          delay: 4,
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
        {/* <div
          className={`${styles.nav} ${styles.headerSequence}  headerSequence`}
        >
          <div>
            <div>Where</div>
            {showWhere && (
              <div>
                Deep in the mountains of Kyoto.
                <br />
                Is calmness to rethink ourselves.
                <br />
                Under influence of mingei — Japanese traditional crafts.
              </div>
            )}
          </div>
          <div>
            <div>What</div>
            {showWhat && (
              <div>
                Deep in the mountains of Kyoto.
                <br />
                Is calmness to rethink ourselves.
                <br />
                Under influence of mingei — Japanese traditional crafts.
              </div>
            )}
          </div>
        </div> */}
      </div>

      <div className={styles.nav}>
        <div className={styles.top}>
          <div className={styles.left}>
            <span>Menu</span>
          </div>
          <div className={styles.icons}>
            {soundPlaying ? <IconStop /> : <IconPlay />}
            <IconCircle onClick={toggleTheme} />
          </div>
        </div>
        <div className={styles.bottom}>
          <p>
            An ever-growing collection of references and tools for designers.
            Curated by Julien Van Havere, founder of DesignPractice™ and
            TypeFoundry™.
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
