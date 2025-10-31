import IconExit from '../icons/IconExit';
import styles from './TheFooter.module.sass';

interface TheFooterProps {
  active?: boolean;
}

export default function TheFooter({ active }: TheFooterProps) {
  return (
    <footer className={styles.footer} data-active={active}>
      <div className={styles.column}>
        <div className={styles.linkItem}>
          <a
            href="https://www.instagram.com/minka_haus/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <IconExit />
        </div>
        <div className={`${styles.linkItem} ${styles.inactive}`}>
          <a href="https://www.instagram.com/minkahaus/">Newsletter</a>
        </div>
      </div>
      <div className={styles.column}>
        <div className={`${styles.linkItem} ${styles.inactive}`}>
          <a href="mailto:info@minkahaus.com">info@minkahaus.com</a>
        </div>
      </div>
    </footer>
  );
}
