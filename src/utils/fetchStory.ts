export const fetchStory = async (
  version: 'draft' | 'published',
  slug?: string[]
) => {
  const token = process.env.STORYBLOK_DELIVERY_API_TOKEN;
  const correctSlug = slug ? slug.join('/') : 'home';

  try {
    const url = `https://api.storyblok.com/v2/cdn/stories/${correctSlug}?version=${version}&token=${token}`;

    const response = await fetch(url, {
      next: { tags: ['cms'] },
      cache: version === 'published' ? 'default' : 'no-store',
    });

    if (response.ok) {
      const data = await response.json();
      return { story: data.story };
    }

    // If draft fails with 401, try published as fallback
    if (version === 'draft' && response.status === 401) {
      const publishedUrl = `https://api.storyblok.com/v2/cdn/stories/${correctSlug}?version=published&token=${token}`;
      const publishedResponse = await fetch(publishedUrl, {
        next: { tags: ['cms'] },
        cache: 'default',
      });

      if (publishedResponse.ok) {
        const publishedData = await publishedResponse.json();
        return { story: publishedData.story };
      }
    }

    throw new Error(
      `Failed to fetch story: ${response.status} ${response.statusText}`
    );
  } catch (error) {
    console.error('Error fetching story:', error);
    throw error;
  }
};
