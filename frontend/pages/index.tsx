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
    slug: `1`,
  },
  {
    title: 'Test2',
    description: '',
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
    slug: `1`,
  },
  {
    title: 'Test2',
    description: '',
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
    slug: `1`,
  },
  {
    title: 'Test2',
    description: '',
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
    slug: `1`,
  },
  {
    title: 'Test',
    description:
      'Test description for content ывпывпыв ыпыпып ыпып ывпыпвывпы ывпы ',
    vacant: true,
    image: 'https://placekitten.com/500/500',
    slug: `1`,
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
      <Text p>Тестовый контент для интернет магаза</Text>
      <Text p b>
        Тестовый текст тестовый тестами погоняет бла бла бла
      </Text>
      <ProductList products={testProds} />
    </div>
  );
}
