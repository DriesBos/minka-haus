import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/reset.css';
import '@/styles/vars.sass';
import '@/styles/typography.sass';
import '@/styles/globals.sass';
import StoryblokProvider from '@/providers/StoryblokProvider';
import BackgroundStoreProvider from '@/providers/BackgroundStoreProvider';
import ThemeProvider from '@/providers/ThemeProvider';
import FaviconSwitcher from '@/components/FaviconSwitcher';

const maru = localFont({
  src: [
    {
      path: './../fonts/m-reg.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './../fonts/m-med.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './../fonts/m-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--maru-font',
});

const searchsystem = localFont({
  src: [
    {
      path: './../fonts/ss.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--searchsystem-font',
});

const soehne = localFont({
  src: [
    {
      path: './../fonts/soehne-web-buch.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--soehne-font',
});

export const metadata: Metadata = {
  title: 'Minka Haus',
  description: 'A place for downtime, creation and connection',
  appleWebApp: {
    title: 'Minka Haus',
    statusBarStyle: 'black-translucent',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/favicon-light.ico"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/favicon-dark.ico"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body
        className={`${maru.variable} ${searchsystem.variable} ${soehne.variable}`}
      >
        <ThemeProvider>
          <FaviconSwitcher />
          <BackgroundStoreProvider>
            <StoryblokProvider>
              <main>{children}</main>
            </StoryblokProvider>
          </BackgroundStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
