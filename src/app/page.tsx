'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.sass';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div
          className={`${styles.description} ${isLoaded ? styles.fadeIn : ''}`}
        >
          <p>A place for downtime, creation and connection</p>
        </div>
      </main>
    </div>
  );
}
