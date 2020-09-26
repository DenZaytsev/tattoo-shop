import React from 'react';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { serialize, fork, allSettled } from 'effector/fork';
import { useStore } from 'effector-react/ssr';
import { useRouter } from 'next/router';

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
  const {
    query: { category },
  } = useRouter();

  const { title, description } = product || {};

  return (
    <>
      <NextSeo title={title} description={description} />
      <ProductCard {...product} category={category as string} fullWidth />
    </>
  );
};

export default ProductPage;
