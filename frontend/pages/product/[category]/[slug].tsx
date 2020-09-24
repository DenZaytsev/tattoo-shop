import React from 'react';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { serialize, fork, allSettled } from 'effector/fork';
import { useStore } from 'effector-react/ssr';
import { useRouter } from 'next/router';

import { ProductDetails } from '../../../src/features/product-details';
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
      <div>
        <ProductDetails {...product} category={category as string} />
      </div>
    </>
  );
};

export default ProductPage;
