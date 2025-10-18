import { StoryblokStory } from '@storyblok/react/rsc';
import { fetchStory } from '@/utils/fetchStory';

export default async function Page({ params }) {
  const { slug } = await params;

  try {
    // Use 'published' version since that's what works with your current setup
    const data = await fetchStory('published', slug);
    return <StoryblokStory story={data.story} />;
  } catch (error) {
    console.error('Error loading page:', error);
    return (
      <div>
        <h1>Error loading content</h1>
        <p>Failed to load content from Storyblok</p>
        <p>Slug: {slug ? slug.join('/') : 'home'}</p>
      </div>
    );
  }
}
