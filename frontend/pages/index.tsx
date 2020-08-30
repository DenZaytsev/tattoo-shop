import Head from 'next/head';
import { css } from 'linaria';
import Button from '@material-ui/core/Button';

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
      <Button className={test}>Тестовая кнопка</Button>
    </div>
  );
}
