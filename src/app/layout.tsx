import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/reset.css';
import '@/styles/vars.sass';
import '@/styles/typography.sass';
import '@/styles/globals.sass';
import StoryblokProvider from '@/providers/StoryblokProvider';

const av = localFont({
  src: [
    {
      path: './../fonts/av.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-helvetica',
});

export const metadata: Metadata = {
  title: 'Minka Haus',
  description: 'A place for downtime, creation and connection',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoryblokProvider>
      <html lang="en">
        <body className={`${av.variable}`}>{children}</body>
      </html>
    </StoryblokProvider>
  );
}
