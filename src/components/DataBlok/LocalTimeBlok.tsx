'use client';

import { useEffect, useState } from 'react';
import DataBlok from './DataBlok';

export default function LocalTimeBlok() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const japanTime = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Tokyo',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTime(japanTime);
    };

    // Set initial time
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return <DataBlok label="Local Time" value={time || '00:00:00'} />;
}
