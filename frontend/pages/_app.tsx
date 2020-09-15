import React from 'react';
import { AppProps } from 'next/app';
import { css } from 'linaria';
import { GeistProvider, CssBaseline } from '@geist-ui/react';

import { customTheme } from '../src/theme';
import { Layout, ContentWrapper } from '../src/features/layout';
import { AppLoaderIndicator } from '../src/features/app-loader-indicator';
import { Header } from '../src/features/header';
import { Footer } from '../src/features/footer';
import { NavBlock } from '../src/features/nav';
import { CartBlock } from '../src/features/cart';
import { NotificationsProvider } from '../src/features/notifications';
import { useLozad } from '../lib/lazy-image';

export const globals = css`
  :global() {
    @import-normalize;

    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }
  }
`;

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  useLozad();

  return (
    <GeistProvider theme={customTheme}>
      <CssBaseline />
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
    </GeistProvider>
  );
};

export default MyApp;
