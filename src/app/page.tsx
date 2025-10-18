import Image from 'next/image';
import styles from './page.module.sass';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>A place for downtime, creation and connection</p>
        </div>
      </main>
    </div>
  );
}
