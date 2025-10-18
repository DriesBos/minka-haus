import { StoryblokComponent } from '@storyblok/react';

interface StoryblokBlok {
  _uid: string;
  component: string;
  [key: string]: unknown;
}

interface PageHomeProps {
  blok: {
    body?: StoryblokBlok[];
    [key: string]: unknown;
  };
}

export default function PageHome({ blok }: PageHomeProps) {
  console.log('Rendering PageHome with blok:', blok);
  return (
    <main>
      <h1>PAGE HOME</h1>
      {/* {blok.body?.map((nestedBlok: StoryblokBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))} */}
    </main>
  );
}
