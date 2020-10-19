import React from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useStore } from 'effector-react/ssr';
import { Breadcrumbs } from '@geist-ui/react';

import { ProductData } from './product-data';
import { $currentProductPage } from '../../core/products/page';

export const ProductPageContent = () => {
  const product = useStore($currentProductPage);
  const { title, description } = product || {};

  return (
    <>
      <NextSeo title={`${title} // Jeune Pokes`} description={description} />
      <Breadcrumbs size="large">
        <Link href="/" passHref>
          <Breadcrumbs.Item>Все товары</Breadcrumbs.Item>
        </Link>
        <Breadcrumbs.Item>{title}</Breadcrumbs.Item>
      </Breadcrumbs>
      <ProductData {...product} />
    </>
  );
};
