import React from 'react';
import { css } from 'linaria';
import { useStore } from 'effector-react/ssr';

import { $stickersList, $tshirtsList, $isEmpty } from '../../core/products';
import { ProductList } from './list';
import { ProductCard } from './card';

const productsBlock = css`
  display: flex;
  flex-flow: column nowrap;

  & > * {
    margin-bottom: 32px;
  }
`;

const Stickers: React.FC = () => {
  return (
    <ProductList
      title="Стикеры"
      productsStore={$stickersList}
      ListItem={ProductCard}
    />
  );
};

const Tshirts: React.FC = () => {
  return (
    <ProductList
      title="Футболки"
      productsStore={$tshirtsList}
      ListItem={ProductCard}
    />
  );
};

export const Products: React.FC = () => {
  const isNoProducts = useStore($isEmpty);

  if (isNoProducts) {
    return null;
  }

  return (
    <div className={productsBlock}>
      <Stickers />
      <Tshirts />
    </div>
  );
};
