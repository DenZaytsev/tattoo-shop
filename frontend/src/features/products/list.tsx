import React from 'react';
import { Text } from '@geist-ui/react';
import { css } from 'linaria';
import { useList } from 'effector-react';
import type { Store } from 'effector';

import { ProductCard } from './card';
import type { AnyProduct } from '../../domain/products/types';

interface ProductListProps {
  productsStore: Store<any[]>;
  title?: string;
}

const productsList = css`
  margin: 0;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr;
  grid-gap: 16px;

  & > li:before {
    content: '';
  }
`;

export const ProductList: React.FC<ProductListProps> = ({
  productsStore,
  title,
}) => {
  const list = useList(productsStore, (product) => (
    <li key={product.slug}>
      <ProductCard {...product} />
    </li>
  ));

  return (
    <div>
      {title && <Text h2>{title}</Text>}
      <ul className={productsList}>{list}</ul>
    </div>
  );
};
