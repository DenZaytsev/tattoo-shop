import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { serialize, fork, allSettled } from 'effector/fork';
import { useStore } from 'effector-react/ssr';
import { Breadcrumbs } from '@geist-ui/react';

import { ProductCard } from '../../../src/features/products-list/card';
import { root } from '../../../src/core/root';
import { getProductFx, $currentProductPage } from '../../../src/core/products';

export const getServerSideProps = async ({ query: { category, slug } }) => {
  const scope = fork(root);

  await allSettled(getProductFx, { scope, params: { category, slug } });

  return {
    props: {
      values: serialize(scope),
    },
  };
};

const ProductPage: NextPage = () => {
  const product = useStore($currentProductPage);
  const { title, description } = product;

  return (
    <>
      <NextSeo title={title} description={description} />
      <Breadcrumbs size="large">
        <Link href="/" passHref>
          <Breadcrumbs.Item>Все товары</Breadcrumbs.Item>
        </Link>
        <Breadcrumbs.Item>{title}</Breadcrumbs.Item>
      </Breadcrumbs>
      <ProductCard {...product} fullWidth />
    </>
  );
};

export default ProductPage;
