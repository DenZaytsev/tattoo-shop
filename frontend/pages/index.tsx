import React from 'react';
import Head from 'next/head';

import { Products } from '../src/features/products';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Тату-Шоп</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Products />
    </div>
  );
}
