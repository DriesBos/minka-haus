'use client';

import styles from './DataBlok.module.sass';
import { useThemeStore } from '@/store/useThemeStore';
import { useEffect, useState } from 'react';

interface DataBlokProps {
  label: string;
  value: string;
  loading?: boolean;
  active?: boolean;
}

export default function DataBlok(props: DataBlokProps) {
  const { label, value, loading = false, active = false } = props;
  const theme = useThemeStore((state) => state.theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if loading prop is explicitly passed (for dynamic data sources)
  const isDynamic = 'loading' in props;

  return (
    <div
      className={`${styles.dataBlok} dataBlok`}
      data-loading={loading}
      data-active={active}
      data-dynamic={isDynamic}
      data-theme={mounted ? theme : 'light'}
    >
      <div className={`${styles.icon} icon`}></div>
      <div className={styles.content}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
      </div>
    </div>
  );
}
