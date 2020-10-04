import React from 'react';
import { css, cx } from 'linaria';
import { Tag } from '@geist-ui/react';

import { Colours } from '../../domain/products';

const colourTag = css`
  width: max-content;
`;

const colourValue = css`
  font-weight: bold;
`;

interface ColourTagProps {
  colour?: string;
  className?: string;
}

export const ColourTag: React.FC<ColourTagProps> = ({ colour, className }) => {
  if (!colour || !Colours[colour]) return null;

  return (
    <Tag className={cx(colourTag, className)} type="lite">
      Цвет: <span className={colourValue}>{Colours[colour]}</span>
    </Tag>
  );
};
