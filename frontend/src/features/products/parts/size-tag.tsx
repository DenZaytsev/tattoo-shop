import React from 'react';
import { css, cx } from 'linaria';
import { Tag } from '@geist-ui/react';

const sizeTag = css`
  width: max-content;
`;

const sizeValue = css`
  font-weight: bold;
`;

interface SizeTagProps {
  size?: string;
  className?: string;
}

export const SizeTag: React.FC<SizeTagProps> = ({ size, className }) => {
  if (!size) return null;

  return (
    <Tag className={cx(sizeTag, className)} type="lite">
      Размер: <span className={sizeValue}>{size}</span>
    </Tag>
  );
};
