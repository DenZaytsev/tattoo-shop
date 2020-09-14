import React from 'react';
import Link from 'next/link';
import { Card, Text } from '@geist-ui/react';
import { css } from 'linaria';

import { AspectRatioKeeper } from '../../../lib/aspect-ratio-keeper';
import type { AnyProduct } from '../../domain/products/types';

type ProductCardProps = AnyProduct;

const productCard = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, auto));
  grid-auto-rows: auto;
  grid-gap: 16px;

  width: 100%;
  position: relative;
`;

const productImage = css`
  & img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
`;

const productContent = css`
  display: flex;
  flex-flow: column nowrap;
`;

const productDescription = css`
  max-width: 250px;
`;

const productLink = css`
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

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  image,
  vacant,
}) => {
  return (
    <Card shadow>
      <Card.Content className={productCard}>
        <AspectRatioKeeper className={productImage} aspectRatio={3 / 4}>
          <img src={image} alt="" />
        </AspectRatioKeeper>
        <div className={productContent}>
          <Text h3>
            <Link href="/" passHref>
              <a className={productLink}>{title}</a>
            </Link>
          </Text>
          <Text className={productDescription}>{description}</Text>
          <Text>{vacant ? 'вакантно' : 'занят'}</Text>
        </div>
      </Card.Content>
    </Card>
  );
};
