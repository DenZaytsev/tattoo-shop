import Head from 'next/head';
import { css } from 'linaria';
import { Text } from '@geist-ui/react';

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
      <Text p>Тестовый контент для интернет магаза</Text>
      <Text p b>
        Тестовый текст тестовый тестами погоняет бла бла бла
      </Text>
    </div>
  );
}
