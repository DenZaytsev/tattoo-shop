import React from 'react';
import { AppProps } from 'next/app';
import { css } from 'linaria';
import { CssBaseline } from '@geist-ui/react';

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
  }
`;

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  useLozad();

  return (
    <GeistProviderWithSwitch>
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
    </GeistProviderWithSwitch>
  );
};

export default MyApp;
