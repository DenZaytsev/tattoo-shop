import React from 'react';
import { Text } from '@geist-ui/react';
import { css } from 'linaria';

import { ProductCard } from '../product-card';
import type { AnyProduct } from '../../domain/products/types';

interface ProductListProps {
  products: AnyProduct[];
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

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div>
      <Text h2>Заголовок</Text>
      <ul className={productsList}>
        {products &&
          products.map((product) => (
            <li key={product.slug}>
              <ProductCard {...product} />
            </li>
          ))}
      </ul>
    </div>
  );
};
