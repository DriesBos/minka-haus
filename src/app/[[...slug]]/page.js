import { fetchStory } from '@/utils/fetchStory';
import ClientStoryRenderer from '@/components/ClientStoryRenderer';
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
  const { slug } = await params;

  // List of known system/browser paths that should be ignored
  const systemPaths = [
    '.well-known',
    'favicon.ico',
    'robots.txt',
    'sitemap.xml',
  ];
  const firstSegment = slug?.[0] || '';

  // If it's a known system path, return 404 immediately without logging
  if (systemPaths.some((path) => firstSegment.startsWith(path))) {
    notFound();
  }

  try {
    // Use 'published' version since that's what works with your current setup
    const data = await fetchStory('published', slug);

    // If story doesn't exist (404), show Next.js 404 page
    if (!data) {
      notFound();
    }

    return <ClientStoryRenderer story={data.story} />;
  } catch (error) {
    // Only log non-404 errors
    if (error.digest !== 'NEXT_HTTP_ERROR_FALLBACK;404') {
      console.error('Error loading page:', error);
    }

    // Re-throw 404 errors to let Next.js handle them
    if (error.digest === 'NEXT_HTTP_ERROR_FALLBACK;404') {
      throw error;
    }

    return (
      <div>
        <h1>Error loading content</h1>
        <p>Failed to load content from Storyblok</p>
        <p>Slug: {slug ? slug.join('/') : 'home'}</p>
        <p>Error: {error.message}</p>
      </div>
    );
  }
}
