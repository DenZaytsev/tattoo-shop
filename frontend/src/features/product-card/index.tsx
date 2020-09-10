import React from 'react';
import Link from 'next/link';
import { Card, Text } from '@geist-ui/react';
import type { AnyProduct } from '../../domain/products/types';

type ProductCardProps = AnyProduct;

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  image,
  vacant,
}) => {
  return (
    <Card>
      <img src={image} alt="" />
      <Text h3>
        <Link href="/" passHref>
          <a>{title}</a>
        </Link>
      </Text>
      <Text>{description}</Text>
      <Text>{vacant ? 'вакантно' : 'занят'}</Text>
    </Card>
  );
};
