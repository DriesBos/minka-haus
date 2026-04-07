'use client';

import * as React from 'react';

export function useIsJapaneseLanguage() {
  const [isJapanese, setIsJapanese] = React.useState(
    process.env.NODE_ENV === 'development'
  );

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setIsJapanese(true);
      console.log('[useIsJapaneseLanguage] language set:', {
        source: 'development',
        language: 'ja',
        isJapanese: true,
      });
      return;
    }

    const userLanguage = navigator.language || navigator.languages?.[0];
    const nextIsJapanese = userLanguage?.toLowerCase().startsWith('ja') ?? false;

    setIsJapanese(nextIsJapanese);
    console.log('[useIsJapaneseLanguage] language set:', {
      source: 'navigator',
      language: userLanguage ?? 'unknown',
      isJapanese: nextIsJapanese,
    });
  }, []);

  return isJapanese;
}
