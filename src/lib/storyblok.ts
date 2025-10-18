import Page from '@/components/storyblok/Page';
import PageHome from '@/components/storyblok/PageHome';
import Teaser from '@/components/storyblok/Teaser';

import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    pageHome: PageHome,
    teaser: Teaser,
  },
});
