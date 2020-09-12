import React from 'react';
import Head from 'next/head';
import { Text } from '@geist-ui/react';

import { ProductList } from '../src/features/product-list';

const testProds = [
  {
    title: 'Test',
    description: 'Test description for content',
    vacant: true,
    image: 'https://placekitten.com/500/500',
    slug: `1`,
  },
  {
    title: 'Test2 ывпыып',
    description:
      'Test description for content another sdgsgsdппыпыпыапап вавпвапв',
    vacant: false,
    image: 'https://placekitten.com/500/500',
    slug: `2`,
  },
  {
    title: 'Test3',
    description: 'Test description for content third',
    vacant: true,
    image: 'https://placekitten.com/500/500',
    slug: `3`,
  },
  {
    title: 'Test',
    description:
      'Test description for content ывпывпыв ыпыпып ыпып ывпыпвывпы ывпы ',
    vacant: true,
    image: 'https://placekitten.com/500/500',
    slug: `12`,
  },
  {
    title: 'Test2',
    description: '',
    vacant: false,
    image: 'https://placekitten.com/500/500',
    slug: `24`,
  },
  {
    title: 'Test3',
    description: 'Test description for content third',
    vacant: true,
    image: 'https://placekitten.com/500/500',
    slug: `35`,
  },
  {
    title: 'Test',
    description: 'Test description for content',
    vacant: true,
    image: 'https://placekitten.com/500/500',
    slug: `112`,
  },
  {
    title: 'Test2 ывпыып',
    description:
      'Test description for content another sdgsgsdппыпыпыапап вавпвапв',
    vacant: false,
    image: 'https://placekitten.com/500/500',
    slug: `3332`,
  },
  {
    title: 'Test3',
    description: 'Test description for content third',
    vacant: true,
    image: 'https://placekitten.com/500/500',
    slug: `3333`,
  },
  {
    title: 'Test',
    description:
      'Test description for content ывпывпыв ыпыпып ыпып ывпыпвывпы ывпы ',
    vacant: true,
    image: 'https://placekitten.com/500/500',
    slug: `13333`,
  },
  {
    title: 'Test2',
    description: '',
    vacant: false,
    image: 'https://placekitten.com/500/500',
    slug: `23333`,
  },
  {
    title: 'Test3',
    description: 'Test description for content third',
    vacant: true,
    image: 'https://placekitten.com/500/500',
    slug: `33333`,
  },
  {
    title: 'Test',
    description: 'Test description for content',
    vacant: true,
    image: 'https://placekitten.com/500/500',
    slug: `13333`,
  },
  {
    title: 'Test2 ывпыып',
    description:
      'Test description for content another sdgsgsdппыпыпыапап вавпвапв',
    vacant: false,
    image: 'https://placekitten.com/500/500',
    slug: `233333`,
  },
  {
    title: 'Test3',
    description: 'Test description for content third',
    vacant: true,
    image: 'https://placekitten.com/500/500',
    slug: `333343`,
  },
  {
    title: 'Test',
    description:
      'Test description for content ывпывпыв ыпыпып ыпып ывпыпвывпы ывпы ',
    vacant: true,
    image: 'https://placekitten.com/500/500',
    slug: `16`,
  },
  {
    title: 'Test2',
    description: '',
    vacant: false,
    image: 'https://placekitten.com/500/500',
    slug: `25`,
  },
  {
    title: 'Test3',
    description: 'Test description for content third',
    vacant: true,
    image: 'https://placekitten.com/500/500',
    slug: `325`,
  },
  {
    title: 'Test',
    description:
      'Test description for content ывпывпыв ыпыпып ыпып ывпыпвывпы ывпы ',
    vacant: true,
    image: 'https://placekitten.com/500/500',
    slug: `1134567`,
  },
  {
    title: 'Test',
    description:
      'Test description for content ывпывпыв ыпыпып ыпып ывпыпвывпы ывпы ',
    vacant: true,
    image: 'https://placekitten.com/500/500',
    slug: `133556`,
  },
];

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
      <ProductList products={testProds} />
    </div>
  );
}
