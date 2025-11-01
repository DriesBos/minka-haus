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
import ThemeColorSwitcher from '@/components/ThemeColorSwitcher';
import ScrollToTop from '@/components/ScrollToTop';
import type { Viewport } from 'next';

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
  description:
    'Minkahaus is a renovation project on mountain and forest land north of Kyoto. Building a space for research, cultural exchange and stays that explore mingei, Japanese craft.',
  appleWebApp: {
    title: 'Minka Haus',
    statusBarStyle: 'black-translucent',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* prevent AI indexing - together with robots txt */}
        <meta name="robots" content="noai, noimageai" />
        {/* Viewport fit for notch displays */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        {/* SVG favicon for modern browsers */}
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favicon-light.svg"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favicon-dark.svg"
          media="(prefers-color-scheme: dark)"
        />
        {/* PNG favicon for better compatibility */}
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-light-96x96.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-dark-96x96.png"
          media="(prefers-color-scheme: dark)"
        />
        {/* ICO fallback for older browsers */}
        <link
          rel="icon"
          type="image/x-icon"
          href="/favicon-light.ico"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="/favicon-dark.ico"
          media="(prefers-color-scheme: dark)"
        />
        {/* Apple touch icon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon-light-96x96.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon-dark-96x96.png"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body
        className={`${maru.variable} ${searchsystem.variable} ${soehne.variable}`}
      >
        <ThemeProvider>
          <ScrollToTop />
          <FaviconSwitcher />
          <ThemeColorSwitcher />
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
