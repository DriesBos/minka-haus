'use client';

import * as React from 'react';

export function useIsJapaneseLanguage() {
  const [isJapanese, setIsJapanese] = React.useState(
    process.env.NODE_ENV === 'development'
  );

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setIsJapanese(true);
      return;
    }

    const userLanguage = navigator.language || navigator.languages?.[0];
    const nextIsJapanese = userLanguage?.toLowerCase().startsWith('ja') ?? false;

    setIsJapanese(nextIsJapanese);
  }, []);

  return isJapanese;
}
