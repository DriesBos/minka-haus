import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/reset.css';
import '@/styles/vars.sass';
import '@/styles/typography.sass';
import '@/styles/globals.sass';
import StoryblokProvider from '@/providers/StoryblokProvider';
import BackgroundStoreProvider from '@/providers/BackgroundStoreProvider';
import TheFooter from '@/components/TheFooter/TheFooter';

const av = localFont({
  src: [
    {
      path: './../fonts/av.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--av-font',
});

const ss = localFont({
  src: [
    {
      path: './../fonts/ss.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--ss-font',
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
    <html lang="en">
      <body className={`${av.variable} ${ss.variable}`}>
        <BackgroundStoreProvider>
          <StoryblokProvider>
            <main>
              {children} <TheFooter />
            </main>
          </StoryblokProvider>
        </BackgroundStoreProvider>
      </body>
    </html>
  );
}
