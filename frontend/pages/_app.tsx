import React from 'react';
import { AppProps } from 'next/app';
import { css } from 'linaria';
import { GeistProvider, CssBaseline } from '@geist-ui/react';

import { Layout, ContentWrapper } from '../src/features/layout';
import { Header } from '../src/features/header';
import { Footer } from '../src/features/footer';

export const globals = css`
  @import-normalize :global() {
    *:focus,
    *:focus-within {
      outline: 1px solid rgb(121, 40, 202);
    }
  }
`;

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <GeistProvider>
      <CssBaseline />
      <Layout>
        <Header />
        <ContentWrapper>
          <Component {...pageProps} />
        </ContentWrapper>
        <Footer />
      </Layout>
    </GeistProvider>
  );
};

export default MyApp;
