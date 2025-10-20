import React from 'react';
import TheBackground from '@/components/the-background/the-background';
import styles from './PageHome.module.sass';
import DataBlok from '@/components/DataBlok/DataBlok';
import LocalTimeBlok from '@/components/DataBlok/LocalTimeBlok';
import WeatherBlok from '@/components/DataBlok/WeatherBlok';
import SoundPlayer from '@/components/SoundPlayer/SoundPlayer';

interface StoryblokBlok {
  _uid: string;
  component: string;
  [key: string]: unknown;
}

interface PageHomeProps {
  blok: {
    body?: StoryblokBlok[];
    [key: string]: unknown;
    background_image?: {
      filename: string;
      alt?: string;
    };
    entry_text?: string;
  };
}

export default function PageHome({ blok }: PageHomeProps) {
  const [hasEntered, setHasEntered] = React.useState(false);

  console.log('hasEntered', hasEntered);

  return (
    <div className={styles.pageHome} data-entered={hasEntered}>
      {blok.background_image && (
        <TheBackground image={blok.background_image} active={hasEntered} />
      )}
      <div
        className={styles.entryText}
        onClick={() => setHasEntered(true)}
        data-active={!hasEntered}
      >
        Enter
      </div>
      <DataBlok label="Location" value="Kita-ku, Kyoto" active={hasEntered} />
      <WeatherBlok active={hasEntered} />
      <LocalTimeBlok active={hasEntered} />
      <SoundPlayer audioSrc="/audio/vetiverol.mp3" active={hasEntered} />
    </div>
  );
}
