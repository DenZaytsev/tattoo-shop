import React from 'react';
import { css } from 'linaria';

import { withStatic } from '../../core/api';
import { AspectRatioKeeper } from '../../../lib/aspect-ratio-keeper';
import { LazyImage } from '../../../lib/lozad-react';

const productImage = css`
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const cardPlaceHolder =
  'rgba(0, 0, 0, 0) linear-gradient(to right, rgb(201, 214, 255), rgb(226, 226, 226)) repeat scroll 0% 0%';

interface ProductImageProps {
  src: string;
  aspectRatio?: number;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  aspectRatio = 4 / 3,
}) => {
  return (
    <AspectRatioKeeper aspectRatio={aspectRatio}>
      <LazyImage
        src={withStatic(src)}
        placeholder={cardPlaceHolder}
        className={productImage}
      />
    </AspectRatioKeeper>
  );
};
