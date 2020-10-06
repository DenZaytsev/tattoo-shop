import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Card, Text } from '@geist-ui/react';
import { css, cx } from 'linaria';

import type { AnyProduct } from '../../domain/products';
import { ProductImage } from '../product-image';
import { Tags } from '../product-tags';
import { AddToCart } from '../add-to-cart-button';
import { beautify } from '../../../lib/beautify-ru-text';
import { getProductFx } from '../../core/products';

type ProductCardProps = AnyProduct & { fullWidth: boolean };

const productCard = css`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${250 - 8}px, auto));
  grid-auto-rows: auto;
  grid-gap: 16px;

  width: 100%;
`;

const productCardFullWidth = css`
  grid-template-columns: 1fr;
`;

const productContent = css`
  display: flex;
  flex-flow: column nowrap;

  & > *:not(:last-child) {
    margin-bottom: 8px;
  }
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
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: block;
    content: ' ';
  }
`;

const productCardFooter = css`
  display: flex;
  flex-flow: row wrap;
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
  fullWidth,
}) => {
  const router = useRouter();

  const test = (e) => {
    e.preventDefault();

    const unwatch = getProductFx.done.watch(() => {
      router.push(
        {
          pathname: '/product/client-route',
        },
        `/product/${categoryTitle}/${slug}`,
      );
      unwatch();
    });

    getProductFx({ category: categoryTitle, slug });
  };

  return (
    <Card shadow>
      <Card.Content
        className={cx(productCard, fullWidth && productCardFullWidth)}
      >
        <ProductImage src={image} />
        <div className={productContent}>
          <Text h3>
            {/* <Link  passHref> */}
            <a
              onClick={test}
              className={productLink}
              href={`/product/${categoryTitle}/${slug}`}
            >
              {title}
            </a>
            {/* </Link> */}
          </Text>
          <Text type="secondary" p small className={productDescription}>
            {beautify(description)}
          </Text>
          <Tags size={size} colour={colour} />
        </div>
      </Card.Content>
      <Card.Footer className={productCardFooter}>
        <AddToCart onClick={() => {}} price={price} />
      </Card.Footer>
    </Card>
  );
};
