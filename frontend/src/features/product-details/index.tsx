import React from 'react';
import { css } from 'linaria';
import { useStore } from 'effector-react/ssr';

import { $currentProductPage } from '../../core/products';

export const ProductDetails: React.FC = () => {
  const product = useStore($currentProductPage);

  return <div>{`${JSON.stringify(product)}`}</div>;
};
