import React from 'react';
import { Text } from '@geist-ui/react';

import { AnyProduct } from '../../domain/products';
import { withStatic } from '../../core/api';
import { LazyImage } from '../../../lib/lozad-react';
import { AspectRatioKeeper } from '../../../lib/aspect-ratio-keeper';
import { productImage, cardPlaceHolder } from '../products-list/card';

type ProductDetailsProps = AnyProduct & { category: string };

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <div>
      <Text h2>{title}</Text>
      <AspectRatioKeeper aspectRatio={9 / 16}>
        <LazyImage
          src={withStatic(image)}
          placeholder={cardPlaceHolder}
          className={productImage}
        />
      </AspectRatioKeeper>
      <Text p>{description}</Text>
    </div>
  );
};
