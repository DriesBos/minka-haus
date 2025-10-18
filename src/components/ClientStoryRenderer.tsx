'use client';

import { StoryblokComponent } from '@storyblok/react';

interface Story {
  name?: string;
  content?: {
    component?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

interface ClientStoryRendererProps {
  story: Story;
}

export default function ClientStoryRenderer({
  story,
}: ClientStoryRendererProps) {
  if (!story?.content) {
    return <div>No story content found</div>;
  }

  return <StoryblokComponent blok={story.content} />;
}
