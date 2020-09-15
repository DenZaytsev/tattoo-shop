import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const ProductPage: React.FC = () => {
  const {
    query: { slug },
  } = useRouter();

  return (
    <>
      <Head>
        <title>Тату-шоп/product/{slug}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>product slug: {slug}</div>
    </>
  );
};

export default ProductPage;
