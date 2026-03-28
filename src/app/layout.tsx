import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/reset.css';
import '@/styles/vars.sass';
import '@/styles/typography.sass';
import '@/styles/globals.sass';
import BackgroundStoreProvider from '@/providers/BackgroundStoreProvider';
import ThemeProvider from '@/providers/ThemeProvider';
import FaviconSwitcher from '@/components/FaviconSwitcher';
import ThemeColorSwitcher from '@/components/ThemeColorSwitcher';
import ScrollToTop from '@/components/ScrollToTop';

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
  title: 'MinkaHaus',
  description:
    'MinkaHaus is a renovation project on mountain and forest land north of Kyoto. Building a space for research, cultural exchange and stays that explore mingei, Japanese craft.',
};

const faviconVersion =
  process.env.NODE_ENV === 'development'
    ? Date.now().toString()
    : process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 8) ??
      process.env.npm_package_version ??
      '1';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-favicon-version={faviconVersion}
    >
      <head>
        {/* Blocking script to set theme before paint - prevents flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
        {/* Core crawl and install metadata */}
        {/* Explicit web app metadata for mobile browsers */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="MinkaHaus" />
        <meta name="HandheldFriendly" content="true" />
        {/* Light fallback for browsers that still probe /favicon.ico */}
        <link rel="shortcut icon" href={`/favicon.ico?v=${faviconVersion}`} />
        {/* Theme-aware favicons for browsers that support prefers-color-scheme */}
        <link
          rel="icon"
          type="image/svg+xml"
          media="(prefers-color-scheme: light)"
          href={`/favicon-light.svg?v=${faviconVersion}`}
        />
        <link
          rel="icon"
          type="image/svg+xml"
          media="(prefers-color-scheme: dark)"
          href={`/favicon-dark.svg?v=${faviconVersion}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          media="(prefers-color-scheme: light)"
          href={`/favicon-light-32x32.png?v=${faviconVersion}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          media="(prefers-color-scheme: dark)"
          href={`/favicon-dark-32x32.png?v=${faviconVersion}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          media="(prefers-color-scheme: light)"
          href={`/favicon-light-16x16.png?v=${faviconVersion}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          media="(prefers-color-scheme: dark)"
          href={`/favicon-dark-16x16.png?v=${faviconVersion}`}
        />
        {/* Apple touch icon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
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
            <main>{children}</main>
          </BackgroundStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
