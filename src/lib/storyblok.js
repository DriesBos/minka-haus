import Page from '@/components/storyblok/page';
import PageHome from '@/components/storyblok/page-home';
import Teaser from '@/components/storyblok/teaser';

import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    'page-home': PageHome,
    teaser: Teaser,
  },
  apiOptions: {
    region: '',
  },
});
