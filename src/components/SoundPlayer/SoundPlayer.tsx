import styles from './SoundPlayer.module.sass';

interface SoundPlayerProps {
  audioSrc: string;
}

export default function SoundPlayer({ audioSrc }: SoundPlayerProps) {
  return (
    <div className={styles.player}>
      <span>play</span>

      <audio controls src={audioSrc} className={styles.audio} />
    </div>
  );
}
