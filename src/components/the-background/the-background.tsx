import styles from './the-background.module.sass';

interface TheBackgroundProps {
  image?: {
    filename: string;
    alt?: string;
  };
}

export default function TheBackground({ image }: TheBackgroundProps) {
  return (
    <div className={styles.background}>
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
