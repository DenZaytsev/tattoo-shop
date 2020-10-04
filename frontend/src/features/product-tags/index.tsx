import React from 'react';
import { css } from 'linaria';

import { SizeTag } from './size-tag';
import { ColourTag } from './colour-tag';

const productTags = css`
  display: flex;
  flex-flow: row wrap;
  gap: 8px;
`;

export const Tags = ({ size, colour }) => {
  return (
    <div className={productTags}>
      <SizeTag size={size} />
      <ColourTag colour={colour} />
    </div>
  );
};
