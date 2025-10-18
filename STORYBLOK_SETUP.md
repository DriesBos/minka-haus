# Storyblok Integration Guide

This project is now integrated with Storyblok CMS. Here's how to get started:

## Setup

### 1. Environment Variables

Your `.env` file should contain:

```
NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN=your_public_token
NEXT_PREVIEW_STORYBLOK_CONTENT_API_ACCESS_TOKEN=your_preview_token
```

### 2. Storyblok Space Configuration

In your Storyblok space, create the following:

#### Content Types (Bloks):

1. **Page** - Main page content type

   - Fields: `body` (Blocks field)

2. **Teaser** - Example component
   - Fields:
     - `headline` (Text field)
     - `description` (Textarea field)

#### Stories:

1. Create a story with slug `home` for your homepage

## How It Works

### Components

- `src/components/Page.tsx` - Main page component
- `src/components/Teaser.tsx` - Example teaser component
- `src/components/FadeInWrapper.tsx` - Handles the fade-in animation

### Routes

- `/` - Homepage (fetches `home` story from Storyblok)
- `/[...slug]` - Dynamic routes for all other Storyblok stories

### API Routes

- `/api/preview` - Enables preview mode for live editing
- `/api/exit-preview` - Exits preview mode

## Adding New Components

1. Create a new component in `src/components/`
2. Add it to the components object in `src/lib/storyblok.ts`
3. Create the corresponding blok in Storyblok

## Preview Setup

To enable live preview in Storyblok:

1. Go to Settings → Visual Editor in your Storyblok space
2. Set the preview URL to: `https://yourdomain.com/api/preview?secret=YOUR_PREVIEW_TOKEN&slug=`

## Development

Run the development server:

```bash
npm run dev
```

Your Storyblok content will be available at `http://localhost:3000`
