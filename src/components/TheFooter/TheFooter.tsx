import styles from './TheFooter.module.sass';

interface TheFooterProps {
  loading?: boolean;
}

export default function TheFooter({ loading = false }: TheFooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.column}>
        <div className={styles.linkItem}>
          <a href="https://www.instagram.com/minka_haus/">Instagram</a>
        </div>
        <div className={`${styles.linkItem} ${styles.inactive}`}>
          <a href="https://www.instagram.com/minka_haus/">Newsletter</a>
        </div>
      </div>
      <div className={styles.column}>
        <div className={`${styles.linkItem} ${styles.inactive}`}>
          <a href="mailto:info@minka-haus.org">info@minka-haus.org</a>
        </div>
      </div>
    </footer>
  );
}
