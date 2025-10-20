import styles from './the-background.module.sass';

interface TheBackgroundProps {
  active?: boolean;
  image?: {
    filename: string;
    alt?: string;
  };
}

export default function TheBackground({ image, active }: TheBackgroundProps) {
  return (
    <div className={styles.background} data-active={active ? 'true' : 'false'}>
      <div className={styles.overlay} />
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image.filename}
          alt={image.alt || 'Background Image'}
          className={styles.backgroundImage}
        />
      )}
    </div>
  );
}
