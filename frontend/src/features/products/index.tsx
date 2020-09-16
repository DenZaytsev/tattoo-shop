import React from 'react';
import { css } from 'linaria';

import { $tattoos, $stickers, $tshirts } from '../../domain/products/list';
import { ProductList } from './list';
import { ProductCard } from './card';
import { TattooSketchCard } from './tattoo-card';

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
      <ProductList
        title="Стикеры"
        productsStore={$stickers}
        ListItem={ProductCard}
      />
      <ProductList
        title="Футболки"
        productsStore={$tshirts}
        ListItem={ProductCard}
      />
      <ProductList
        title="Тату-скетчи"
        productsStore={$tattoos}
        ListItem={TattooSketchCard}
      />
    </div>
  );
};
