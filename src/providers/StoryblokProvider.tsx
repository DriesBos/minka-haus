'use client';

import { storyblokInit } from '@storyblok/react';
import { storyblokComponents } from '@/components/storyblok-registry';

// Initialize Storyblok at module load time (before any component renders)
storyblokInit({
  components: storyblokComponents,
});

export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
