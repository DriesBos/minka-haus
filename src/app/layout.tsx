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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        <meta name="apple-mobile-web-app-title" content="Minka Haus" />
        <meta name="HandheldFriendly" content="true" />
        {/* SVG favicon for modern browsers */}
        <link
          id="favicon-svg"
          rel="icon"
          type="image/svg+xml"
          href="/favicon-light.svg"
        />
        {/* PNG favicon fallback for browsers without SVG favicon support */}
        <link
          id="favicon-32"
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-light-32x32.png"
        />
        <link
          id="favicon-16"
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-light-16x16.png"
        />
        {/* ICO fallback for older browsers */}
        <link
          id="favicon-ico"
          rel="icon"
          type="image/x-icon"
          href="/favicon-light.ico"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
                const prefix = theme === 'dark' ? 'favicon-dark' : 'favicon-light';
                const svgIcon = document.getElementById('favicon-svg');
                const icon32 = document.getElementById('favicon-32');
                const icon16 = document.getElementById('favicon-16');
                const icoIcon = document.getElementById('favicon-ico');

                if (svgIcon) svgIcon.setAttribute('href', '/' + prefix + '.svg');
                if (icon32) icon32.setAttribute('href', '/' + prefix + '-32x32.png');
                if (icon16) icon16.setAttribute('href', '/' + prefix + '-16x16.png');
                if (icoIcon) icoIcon.setAttribute('href', '/' + prefix + '.ico');
              })();
            `,
          }}
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
            <StoryblokProvider>
              <main>{children}</main>
            </StoryblokProvider>
          </BackgroundStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
