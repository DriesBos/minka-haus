import styles from './DataBlok.module.sass';

interface DataBlokProps {
  label: string;
  value: string;
}

export default function DataBlok({ label, value }: DataBlokProps) {
  return (
    <div className={`${styles.dataBlok} dataBlok`}>
      <div className={`${styles.icon} icon`}></div>
      <div className={styles.content}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
      </div>
    </div>
  );
}
