import React from 'react';
import { css } from 'linaria';
import { useStore } from 'effector-react/ssr';

import {
  $stickersList,
  $tshirtsList,
  $isEmpty,
} from '../../core/products/list';
import { ProductList } from './list';
import { ProductCard } from './card';

const productsBlock = css`
  display: flex;
  flex-flow: column nowrap;

  & > * {
    margin-bottom: 32px;
  }
`;

export const Products: React.FC = () => {
  const isNoProducts = useStore($isEmpty);

  if (isNoProducts) {
    return null;
  }

  return (
    <div className={productsBlock}>
      <ProductList
        title="Стикеры"
        productsStore={$stickersList}
        ListItem={ProductCard}
      />
      <ProductList
        title="Футболки"
        productsStore={$tshirtsList}
        ListItem={ProductCard}
      />
    </div>
  );
};
