import { StoryblokServerComponent } from '@storyblok/react/rsc';

interface StoryblokBlok {
  _uid: string;
  component: string;
  [key: string]: unknown;
}

interface PageProps {
  blok: {
    body?: StoryblokBlok[];
    [key: string]: unknown;
  };
}

export default function Page({ blok }: PageProps) {
  return (
    <main>
      <h1>PAGE GENERAL</h1>
      {blok.body?.map((nestedBlok: StoryblokBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}
