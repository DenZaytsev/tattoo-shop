import React from 'react';
import { Text, Description } from '@geist-ui/react';
import { css } from 'linaria';

import { ProductImage } from '../product-image';
import { Tags } from '../product-tags';
import { AddToCart } from '../add-to-cart-button';
import { beautify } from '../../../lib/beautify-ru-text';
import type { AnyProduct } from '../../domain/products';

const productPageLayout = css`
  display: flex;
  flex-flow: column nowrap;

  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
`;

type ProductPageProps = AnyProduct;

export const ProductData: React.FC<ProductPageProps> = ({
  title,
  image,
  description,
  size,
  colour,
  price,
}) => {
  return (
    <div className={productPageLayout}>
      <Text h2>{title}</Text>
      {image && <ProductImage aspectRatio={16 / 9} src={image} />}
      <Description title="О товаре" content={beautify(description)} />
      <Tags size={size} colour={colour} />
      <AddToCart price={price} />
    </div>
  );
};
