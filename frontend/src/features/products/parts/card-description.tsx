import React from 'react';
import { Text } from '@geist-ui/react';
import { css } from 'linaria';

import { beautify } from '../../../../lib/beautify-ru-text';
import { desktopBpPx } from '../../../theme/breakpoints';

interface CardDescriptionProps {
  description: string;
}

const productDescription = css`
  display: none;
  max-width: 250px;
  margin: 0;
  line-height: 1.25;

  @media (min-width: ${desktopBpPx}) {
    display: block;
  }
`;

export const CardDescription: React.FC<CardDescriptionProps> = ({
  description,
}) => {
  return (
    <Text type="secondary" p small className={productDescription}>
      {beautify(description)}
    </Text>
  );
};
