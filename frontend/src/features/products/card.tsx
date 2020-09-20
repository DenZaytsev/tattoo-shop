import React from 'react';
import Link from 'next/link';
import { Card, Text } from '@geist-ui/react';
import { css } from 'linaria';

import { withStatic } from '../../core/api';
import { AspectRatioKeeper } from '../../../lib/aspect-ratio-keeper';
import { LazyImage } from '../../../lib/lozad-react';
import type { AnyProduct } from '../../domain/products';
import { SizeTag } from './parts/size-tag';
import { ColourTag } from './parts/colour-tag';
import { AddToCart } from './parts/add-to-cart';

type ProductCardProps = AnyProduct;

const productCard = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${250 - 8}px, auto));
  grid-auto-rows: auto;
  grid-gap: 16px;

  width: 100%;
  position: relative;
`;

const productImage = css`
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const productContent = css`
  display: flex;
  flex-flow: column nowrap;
`;

const productDescription = css`
  max-width: 250px;
  margin: 0;
  line-height: 1.25;
`;

const productLink = css`
  transition: color 0.15s ease-in;

  &:hover {
    color: var(--alert);
  }

  &::before {
    content: ' ';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
`;

const productProps = css`
  display: flex;
  gap: 8px;
  padding-top: 8px;
`;

const productCardFooter = css`
  display: flex;
  flex-flow: row wrap;
`;

const cardPlaceHolder =
  'rgba(0, 0, 0, 0) linear-gradient(to right, rgb(201, 214, 255), rgb(226, 226, 226)) repeat scroll 0% 0%';

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  price,
  quantity,
  size,
  colour,
  image,
  slug,
}) => {
  return (
    <Card shadow>
      <Card.Content className={productCard}>
        <AspectRatioKeeper aspectRatio={3 / 4}>
          <LazyImage
            src={withStatic(image)}
            placeholder={cardPlaceHolder}
            className={productImage}
          />
        </AspectRatioKeeper>
        <div className={productContent}>
          <Text h3>
            <Link href={`/product/${slug}`} passHref shallow>
              <a className={productLink}>{title}</a>
            </Link>
          </Text>
          <Text type="secondary" p small className={productDescription}>
            {description}
          </Text>
          <div className={productProps}>
            <SizeTag size={size} />
            <ColourTag colour={colour} />
          </div>
        </div>
      </Card.Content>
      <Card.Footer className={productCardFooter}>
        <AddToCart onClick={() => {}} price={price} />
      </Card.Footer>
    </Card>
  );
};
