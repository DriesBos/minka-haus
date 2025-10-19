import styles from './SoundPlayer.module.sass';

interface SoundPlayerProps {
  audioSrc: string;
}

export default function SoundPlayer({ audioSrc }: SoundPlayerProps) {
  return (
    <div className={styles.player}>
      <span>audio</span>

      <audio src={audioSrc} className={styles.audio} loop />
    </div>
  );
}
