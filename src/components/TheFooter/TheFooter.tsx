'use client';

import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IconExit from '../icons/IconExit';
import Newsletter from '../Newsletter/Newsletter';
import styles from './TheFooter.module.sass';

// Register GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

interface TheFooterProps {
  active?: boolean;
  theme?: 'light' | 'dark';
}

export default function TheFooter({ active, theme }: TheFooterProps) {
  const containerRef = React.useRef<HTMLElement>(null);

  // Animate link items when active and footer scrolls into view
  useGSAP(
    () => {
      if (active && containerRef.current) {
        const linkItems =
          containerRef.current.querySelectorAll('.footerSequence');

        // Set initial state (hidden and slightly offset)
        gsap.set(linkItems, {
          opacity: 0,
          y: 0,
        });

        // Animate in sequentially with stagger when scrolled into view
        gsap.to(linkItems, {
          opacity: 1,
          y: 0,
          duration: 1.33,
          stagger: 0.165,
          ease: 'power2.out',
          delay: 0.165,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            toggleActions: 'play none none none',
            once: true,
          },
        });
      }
    },
    { scope: containerRef, dependencies: [active] }
  );

  return (
    <footer
      ref={containerRef}
      className={styles.footer}
      data-active={active}
      data-theme={theme}
    >
      <div className={styles.column}>
        <div className={`${styles.linkItem} footerSequence`}>
          <a
            href="https://www.instagram.com/minkahaus/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <IconExit className={styles.icon} />
        </div>
        <div className={`${styles.linkItem} footerSequence`}>
          <a href="mailto:hello@minkahaus.com?subject=Hello%20Minka%20Haus">
            hello@minkahaus.com
          </a>
          <IconExit className={styles.icon} />
        </div>
        <div className={`footerSequence`}>
          <Newsletter />
        </div>
      </div>
      <div className={styles.column}>
        <div className={`${styles.dataItem} footerSequence`}>
          <div className={`${styles.icon} icon`}></div>
          <span>Livedata: active</span>
        </div>
      </div>
    </footer>
  );
}
