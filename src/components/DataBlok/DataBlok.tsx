'use client';

import styles from './DataBlok.module.sass';

interface DataBlokProps {
  label: string;
  value: string;
  loading?: boolean;
  active?: boolean;
}

export default function DataBlok(props: DataBlokProps) {
  const { label, value, loading = false, active = false } = props;

  // Check if loading prop is explicitly passed (for dynamic data sources)
  const isDynamic = 'loading' in props;

  return (
    <div
      className={`${styles.dataBlok} dataBlok`}
      data-loading={loading}
      data-active={active}
      data-dynamic={isDynamic}
    >
      <div className={`${styles.icon} icon`}></div>
      <div className={styles.content}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
      </div>
    </div>
  );
}
