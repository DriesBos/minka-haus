'use client';

import { useEffect, useState } from 'react';
import DataBlok from './DataBlok';

// Set to true to test loading state with 1 second delay
const TEST_LOADING_DELAY = false;

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

    // Add delay for testing loading state
    if (TEST_LOADING_DELAY) {
      setTimeout(updateTime, 1000);
    } else {
      updateTime();
    }

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DataBlok label="Local Time" value={time || '00:00:00'} loading={!time} />
  );
}
