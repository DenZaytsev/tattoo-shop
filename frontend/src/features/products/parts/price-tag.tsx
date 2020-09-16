import React from 'react';
import { Text } from '@geist-ui/react';
import { css, cx } from 'linaria';

import { formatRuMoney } from '../../../../lib/format-ru-money';

interface PriceTagProps {
  value: number | string;
}

const priceTag = css`
  font-size: 1.45em !important;
  font-weight: 400;
  letter-spacing: 0.35px;
`;

export const PriceTag: React.FC<PriceTagProps> = ({ value }) => {
  return (
    <Text size="1.25em" className={priceTag}>
      {formatRuMoney(value)}
    </Text>
  );
};
