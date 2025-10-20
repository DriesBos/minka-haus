import styles from './TheHeader.module.sass';
import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Register GSAP plugin
gsap.registerPlugin(useGSAP);

interface TheHeaderProps {
  active?: boolean;
}

export default function TheHeader({ active }: TheHeaderProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

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
          stagger: 0.33,
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
          className={`${styles.top} ${styles.logo} ${styles.headerSequence} headerSequence`}
        >
          Minka Haus
        </div>
        <div
          className={`${styles.bottom} ${styles.description} ${styles.headerSequence}  headerSequence`}
        >
          <span>Connect</span>
          <br />
          Deep in the mountains of Kyoto.
          <br />
          Is calmness to rethink ourselves.
          <br />
          Under influence of mingei — Japanese traditional crafts.
          {/* Minka Haus is a design residency in Kyoto. */}
          {/* Fusing Kyoto crafts with modern living. */}
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.connect}>
          <div
            className={`${styles.top} ${styles.headerSequence} headerSequence`}
          >
            Connect
          </div>
          <div
            className={`${styles.bottom} ${styles.headerSequence} headerSequence`}
          >
            <a
              href="https://www.instagram.com/minkahaus/"
              rel="noreferrer"
              target="_blank"
            >
              instagram
            </a>
            <a href="https://www.storyblok.com/">newsletter</a>
          </div>
        </div>
        <div className={styles.enquiries}>
          <div
            className={`${styles.top} ${styles.headerSequence} headerSequence`}
          >
            Enquiries
          </div>
          <div
            className={`${styles.bottom} ${styles.headerSequence} headerSequence`}
          >
            <a
              href="mailto:hello@minkahaus.com"
              rel="noreferrer"
              target="_blank"
            >
              hello@minkahaus.com
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
