import React from 'react';
import { Text } from '@geist-ui/react';
import { css } from 'linaria';
import { useList } from 'effector-react/ssr';
import type { Store } from 'effector';

import type { AnyProduct } from '../../domain/products';

interface ProductListProps {
  productsStore: Store<any[]>;
  title?: string;
  category: string;
  ListItem: React.FC<AnyProduct>;
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
  ListItem,
  category,
}) => {
  const list = useList(productsStore, (product) => (
    <li>
      <ListItem {...product} category={category} />
    </li>
  ));

  return (
    <div>
      {title && <Text h2>{title}</Text>}
      <ul className={productsList}>{list}</ul>
    </div>
  );
};
