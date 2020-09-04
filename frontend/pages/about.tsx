import Head from 'next/head';
import { css } from 'linaria';
import { Text } from '@geist-ui/react';
import Link from 'next/link';

const test = css`
  color: red !important;
`;

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
      <Text p>О тату-шопе</Text>
      <Text p b>
        бла бла бла{' '}
        <Link href="/" passHref>
          <a>Назад</a>
        </Link>
      </Text>
    </div>
  );
}
