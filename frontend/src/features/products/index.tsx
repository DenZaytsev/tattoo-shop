import React from 'react';
import { css } from 'linaria';

import { $tattoos, $stickers, $tshirts } from '../../domain/products/list';
import { ProductList } from './list';

const productsBlock = css`
  display: flex;
  flex-flow: column nowrap;

  & > * {
    margin-bottom: 32px;
  }
`;

export const Products: React.FC = () => {
  return (
    <div className={productsBlock}>
      <ProductList title="Тату-скетчи" productsStore={$tattoos} />
      <ProductList title="Стикеры" productsStore={$stickers} />
      <ProductList title="Футболки" productsStore={$tshirts} />
    </div>
  );
};
