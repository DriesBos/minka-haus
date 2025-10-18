import { storyblokComponents } from '@/components/storyblok-registry';
import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
  use: [apiPlugin],
  components: storyblokComponents,
  apiOptions: {
    region: '',
  },
});
