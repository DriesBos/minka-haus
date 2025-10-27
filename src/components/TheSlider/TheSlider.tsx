import styles from './TheSlider.module.sass';

interface TheSliderProps {
  active?: boolean;
  landscape_image?: {
    filename: string;
    alt?: string;
  };
  craft_image?: {
    filename: string;
    alt?: string;
  };
  onEnter?: () => void;
}

export default function TheSlider({
  active = false,
  landscape_image,
  craft_image,
  onEnter,
}: TheSliderProps) {
  return (
    <div className={`${styles.theSlider} theSlider`} data-active={active}>
      {landscape_image && (
        <div className={styles.imageLandscape} data-active={active}>
          <img
            src={landscape_image.filename}
            alt={landscape_image.alt}
            className={styles.image}
          />
        </div>
      )}
      {craft_image && (
        <div className={styles.imageCraft} data-active={active}>
          <img
            src={craft_image.filename}
            alt={craft_image.alt}
            className={styles.image}
          />
        </div>
      )}
      <div className={styles.enterBtn} onClick={onEnter} data-active={active}>
        Enter
      </div>
    </div>
  );
}
