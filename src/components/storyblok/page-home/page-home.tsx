import styles from './page-home.module.sass';

interface StoryblokBlok {
  _uid: string;
  component: string;
  [key: string]: unknown;
}

interface PageHomeProps {
  blok: {
    body?: StoryblokBlok[];
    [key: string]: unknown;
    background_image?: {
      filename: string;
      alt?: string;
    };
    entry_text?: string;
  };
}

export default function PageHome({ blok }: PageHomeProps) {
  console.log('Rendering PageHome with blok:', blok);
  return (
    <main>
      <div className={styles.background}>
        {blok.background_image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={blok.background_image.filename}
            alt={blok.background_image.alt || 'Background Image'}
            className={styles.backgroundImage}
          />
        )}
        {blok.entry_text && (
          <div className={styles.entryText}>{blok.entry_text}</div>
        )}
      </div>
    </main>
  );
}
