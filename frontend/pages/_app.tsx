import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { css } from 'linaria';
import { CssBaseline } from '@geist-ui/react';

import { EffectorSSR } from '../src/ssr-provider';
import { GeistProviderWithSwitch } from '../src/theme';
import { Layout, ContentWrapper } from '../src/features/layout';
import { AppLoaderIndicator } from '../src/features/app-loader-indicator';
import { Header } from '../src/features/header';
import { Footer } from '../src/features/footer';
import { NavBlock } from '../src/features/nav';
import { CartBlock } from '../src/features/cart';
import { NotificationsProvider } from '../src/features/notifications';
import { useLozad } from '../lib/lozad-react';

export const globals = css`
  :global() {
    @import-normalize;

    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }

    a:hover {
      color: var(--alert);
    }
  }
`;

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  useLozad();

  return (
    <EffectorSSR serverValues={pageProps.values}>
      <GeistProviderWithSwitch>
        <CssBaseline />
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <Layout>
          <AppLoaderIndicator />
          <Header />
          <ContentWrapper>
            <Component {...pageProps} />
          </ContentWrapper>
          <Footer />
          <NavBlock />
          <CartBlock />
        </Layout>
        <NotificationsProvider />
      </GeistProviderWithSwitch>
    </EffectorSSR>
  );
};

export default MyApp;
