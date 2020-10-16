import React from 'react';
import { NextSeo } from 'next-seo';
import { css } from 'linaria';
import { Text, Collapse } from '@geist-ui/react';
import Link from 'next/link';

const aboutLayout = css`
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 32px;

  & > *:last-child {
    border-bottom: none;
  }
`;

export default function About() {
  return (
    <>
      <NextSeo
        title="О Jeune Pokes"
        description="Jeune Pokes - поке тату, стикеы и футболки"
      />
      <div className={aboutLayout}>
        <Text h2>О Jeune Pokes</Text>
        <Link href="/" passHref>
          <a>К товарам и тату-эскизам</a>
        </Link>
        <Collapse
          title="Jeune Pokes?"
          subtitle="О том, почему мы такие классные"
        >
          <Text>Бла бла</Text>
        </Collapse>
        <Collapse title="О татухах" subtitle="Что нибудь о татухах">
          <Text>Бла бла</Text>
        </Collapse>
        <Collapse
          title="Доставка и оплата заказов"
          subtitle="О том, как вам всё привезти"
        >
          <Text>Бла бла</Text>
        </Collapse>
        <Collapse
          title="Сделать тату"
          subtitle="О том, как нам с вами встретиться и запилить тату"
        >
          <Text>Бла бла</Text>
        </Collapse>
        <Collapse
          title="А где всё это можно посмотреть?"
          subtitle="Укажем, где же посмотреть доступные тату-эскизы и другие товары"
        >
          <Text>
            {'Выбрать товары и забронировать тату эскизы можно вот '}
            <Link href="/" passHref>
              <a>тут</a>
            </Link>
          </Text>
        </Collapse>
      </div>
    </>
  );
}
