import React from 'react';
import { NextSeo } from 'next-seo';
import { serialize, fork, allSettled } from 'effector/fork';
import { useStore } from 'effector-react/ssr';

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

const ProductPage: React.FC = () => {
  const { title, description } = useStore($currentProductPage);

  return (
    <>
      <NextSeo title={title} description={description} />
      <div>
        <ProductDetails />
      </div>
    </>
  );
};

export default ProductPage;
