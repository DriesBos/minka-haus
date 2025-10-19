export async function fetchStory(version = 'draft', slugArray?: string[]) {
  const slug = slugArray ? slugArray.join('/') : 'home';

  // List of known system/browser paths to suppress logging
  const systemPaths = [
    '.well-known',
    'favicon.ico',
    'robots.txt',
    'sitemap.xml',
  ];
  const isSystemPath = systemPaths.some((path) => slug.startsWith(path));

  if (!isSystemPath) {
    console.log(
      `[fetchStory] Attempting to fetch story: "${slug}" (version: ${version})`
    );
  }

  const token = process.env.STORYBLOK_DELIVERY_API_TOKEN;

  try {
    const url = `https://api.storyblok.com/v2/cdn/stories/${slug}?version=${version}&token=${token}`;

    const response = await fetch(url, {
      next: { tags: ['cms'] },
      cache: version === 'published' ? 'default' : 'no-store',
    });

    if (!isSystemPath) {
      console.log(
        `[fetchStory] Response status for "${slug}": ${response.status}`
      );
    }

    if (response.ok) {
      const data = await response.json();
      if (!isSystemPath) {
        console.log(`[fetchStory] Successfully fetched story: "${slug}"`);
      }
      return { story: data.story };
    }

    // If draft fails with 401, try published as fallback
    if (version === 'draft' && response.status === 401) {
      console.log(
        `[fetchStory] Draft version returned 401, trying published fallback...`
      );
      const publishedUrl = `https://api.storyblok.com/v2/cdn/stories/${slug}?version=published&token=${token}`;
      const publishedResponse = await fetch(publishedUrl, {
        next: { tags: ['cms'] },
        cache: 'default',
      });

      if (publishedResponse.ok) {
        const publishedData = await publishedResponse.json();
        console.log(
          `[fetchStory] Successfully fetched published story: "${slug}"`
        );
        return { story: publishedData.story };
      }
    }

    // Return null for 404s instead of throwing
    if (response.status === 404) {
      if (!isSystemPath) {
        console.warn(`[fetchStory] Story not found: "${slug}"`);
      }
      return null;
    }

    throw new Error(
      `Failed to fetch story: ${response.status} ${response.statusText}`
    );
  } catch (error) {
    if (!isSystemPath) {
      console.error(`[fetchStory] Error fetching story "${slug}":`, error);
    }
    throw error;
  }
}
