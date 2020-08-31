import React from 'react';
import { AppProps } from 'next/app';
import { GeistProvider, CssBaseline } from '@geist-ui/react';

import { Layout, ContentWrapper } from '../src/features/layout';
import { Header } from '../src/features/header';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <GeistProvider>
      <CssBaseline />
      <Layout>
        <Header />
        <ContentWrapper>
          <Component {...pageProps} />
        </ContentWrapper>
      </Layout>
    </GeistProvider>
  );
};

export default MyApp;
