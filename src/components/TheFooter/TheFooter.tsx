import styles from './TheFooter.module.sass';

interface TheFooterProps {
  loading?: boolean;
}

export default function TheFooter({ loading = false }: TheFooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.column}>
        <p>
          The image above will slowly zoom-out, and reveal Minka Haus
          <br />a creative residency and research centre.
          <br />
        </p>
      </div>
      <div className={styles.column}>
        <a href="mailto:info@minka-haus.org">info@minka-haus.org</a>
        <a href="https://www.instagram.com/minka_haus/">instagram</a>
        <a href="https://www.storyblok.com/">newsletter</a>
      </div>
    </footer>
  );
}
