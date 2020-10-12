import React from 'react';
import { Card, Text } from '@geist-ui/react';
import { css } from 'linaria';

import type { AnyProduct } from '../../domain/products';
import { ProductImage } from '../product-image';
import { Tags } from '../product-tags';
import { AddToCart } from '../add-to-cart-button';
import { openProductPageFx } from '../../core/products';

type ProductCardProps = AnyProduct & { fullWidth: boolean };

const productCard = css`
  display: flex;
  flex-flow: column nowrap;
`;

const productCardContentLayout = css`
  position: relative;
  display: grid;
  flex-grow: 1;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  grid-gap: 1rem;

  width: 100%;
`;

const productCardImage = css`
  --aspect-ratio: 4 / 3;
`;

const productContent = css`
  display: flex;
  flex-flow: column nowrap;

  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const productLink = css`
  font-size: 1.25rem;
  transition: color 0.15s ease-in;

  &:hover {
    color: var(--alert);
  }

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: block;
    content: ' ';
  }
`;

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  price,
  quantity,
  size,
  colour,
  image,
  slug,
  categoryTitle,
}) => {
  const openProductPage = React.useCallback(
    (e) => {
      e.preventDefault();

      openProductPageFx({ category: categoryTitle, slug });
    },
    [categoryTitle, slug],
  );

  return (
    <Card className={productCard} shadow>
      <Card.Content className={productCardContentLayout}>
        <ProductImage
          className={productCardImage}
          src={image}
          alt={description}
        />
        <div className={productContent}>
          <Text h3>
            <a
              onClick={openProductPage}
              className={productLink}
              href={`/product/${categoryTitle}/${slug}`}
            >
              {title}
            </a>
          </Text>
          <Tags size={size} colour={colour} />
          <AddToCart category={categoryTitle} slug={slug} price={price} />
        </div>
      </Card.Content>
    </Card>
  );
};
