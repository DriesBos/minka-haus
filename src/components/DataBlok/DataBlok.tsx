import styles from './DataBlok.module.sass';

interface DataBlokProps {
  label: string;
  value: string;
  loading?: boolean;
  active?: boolean;
}

export default function DataBlok({
  label,
  value,
  loading = false,
  active = false,
}: DataBlokProps) {
  return (
    <div
      className={`${styles.dataBlok} dataBlok`}
      data-loading={loading}
      data-active={active}
    >
      <div className={`${styles.icon} icon`}></div>
      <div className={styles.content}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
      </div>
    </div>
  );
}
