import React from 'react';
import { ProductCard } from '../product-card';
import { css } from 'linaria';
import type { AnyProduct } from '../../domain/products/types';

import { useMasonry } from '../../../lib/use-masonry';

interface ProductListProps {
  products: AnyProduct[];
}

const productsList = css`
  margin: 0;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;

  & > li:before {
    content: '';
  }
`;

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const gridRef = React.useRef(null);

  useMasonry(gridRef);

  return (
    <ul ref={gridRef} className={productsList}>
      {products &&
        products.map((product) => (
          <li>
            <ProductCard {...product} />
          </li>
        ))}
    </ul>
  );
};
