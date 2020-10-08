import React from 'react';
import { Text } from '@geist-ui/react';
import { css } from 'linaria';
import { useList } from 'effector-react/ssr';
import type { Store } from 'effector';

import type { AnyProduct } from '../../domain/products';
import { desktopBpPx } from '../../theme/breakpoints';

interface ProductListProps {
  productsStore: Store<any[]>;
  title?: string;
  ListItem: React.FC<AnyProduct>;
}

const productsList = css`
  --list-grid-gap: 16px;
  --grid-item-min-width: 0;
  --grid-item-max-width: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(
    auto-fit,
    minmax(var(--grid-item-min-width), var(--grid-item-max-width))
  );
  grid-auto-flow: dense;
  grid-gap: var(--list-grid-gap);
  max-width: 100%;
  margin: 0;

  & > li {
    display: contents;
  }

  & > li:before {
    content: '';
  }

  @media (min-width: 475px) {
    --grid-item-max-width: calc(50% - 8px);
  }

  @media (min-width: ${desktopBpPx}) {
    --grid-item-max-width: 276px;
  }
`;

export const ProductList: React.FC<ProductListProps> = ({
  productsStore,
  title,
  ListItem,
}) => {
  const list = useList(productsStore, (product) => (
    <li>
      <ListItem {...product} />
    </li>
  ));

  // @ts-expect-error
  if (!list || list.length === 0) {
    // list does have "length" prop despite TS error, looks like it's mistake in the useList types
    return null;
  }

  return (
    <div>
      {title && <Text h2>{title}</Text>}
      <ul className={productsList}>{list}</ul>
    </div>
  );
};
