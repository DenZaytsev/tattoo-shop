import React from 'react';
import Link from 'next/link';
import { Card, Text } from '@geist-ui/react';
import { css } from 'linaria';

import { AspectRatioKeeper } from '../../../lib/aspect-ratio-keeper';
import { LazyImage } from '../../../lib/lozad-react';
import type { TattooSketch } from '../../core/sketchs/types';

type SketchCardProps = TattooSketch;

const sketchCard = css`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, auto));
  grid-auto-rows: auto;
  grid-gap: 16px;

  width: 100%;
`;

const sketchImage = css`
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const sketchContent = css`
  display: flex;
  flex-flow: column nowrap;
`;

const sketchDescription = css`
  max-width: 250px;
`;

const sketchLink = css`
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

const cardPlaceHolder =
  'rgba(0, 0, 0, 0) linear-gradient(to right, rgb(201, 214, 255), rgb(226, 226, 226)) repeat scroll 0% 0%';

export const TattooSketchCard: React.FC<SketchCardProps> = ({
  title,
  description,
  image,
  vacant,
  slug,
}) => {
  return (
    <Card shadow>
      <Card.Content className={sketchCard}>
        <AspectRatioKeeper aspectRatio={3 / 4}>
          <LazyImage
            src={image}
            placeholder={cardPlaceHolder}
            className={sketchImage}
          />
        </AspectRatioKeeper>
        <div className={sketchContent}>
          <Text h3>
            <Link href={`/sketch/${slug}`} passHref shallow>
              <a className={sketchLink}>{title}</a>
            </Link>
          </Text>
          <Text className={sketchDescription}>{description}</Text>
          <Text>{vacant ? 'вакантно' : 'занят'}</Text>
        </div>
      </Card.Content>
    </Card>
  );
};
