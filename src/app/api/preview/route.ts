import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  // Check if the secret matches
  if (secret !== process.env.STORYBLOK_DELIVERY_API_TOKEN) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  // Enable Preview Mode
  const response = NextResponse.redirect(
    new URL(`/${slug || ''}`, request.url)
  );
  response.cookies.set('__prerender_bypass', '1');
  response.cookies.set('__next_preview_data', '1');

  return response;
}
