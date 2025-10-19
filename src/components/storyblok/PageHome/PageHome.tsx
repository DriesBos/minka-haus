import TheBackground from '@/components/the-background/the-background';
import styles from './PageHome.module.sass';
import DataBlok from '@/components/DataBlok/DataBlok';

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
  console.log('Rendering PageHome with blok:', blok);
  return (
    <div>
      {blok.background_image && <TheBackground image={blok.background_image} />}
      <div className={styles.entryText}>
        Design and research lab. <span>Enter.</span>
      </div>
      <DataBlok label="Location" value="Kita-ku, Kyoto" />
      <DataBlok label="Temp" value="28°" />
      <DataBlok label="Conditions" value="Light Rainfall" />
      <DataBlok label="Local Time" value="01:00:58" />
      <DataBlok label="Humidity" value="65%" />
    </div>
  );
}
