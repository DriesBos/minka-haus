import styles from './GrainyGradient.module.sass';

type GrainyGradientProps = {
  className?: string;
};

export default function GrainyGradient({
  className = '',
}: GrainyGradientProps) {
  return (
    <div
      aria-hidden="true"
      className={`grainyGradient ${styles.layer} ${className}`.trim()}
    />
  );
}
