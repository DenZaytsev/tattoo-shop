import React from 'react';
import { css } from 'linaria';
import { Text } from '@geist-ui/react';
import { ZeroConfig } from '@geist-ui/react-icons';

const noData = css`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  & > svg {
    --size: 5rem;
    min-width: var(--size);
    min-height: var(--size);
  }
`;

const noDataMessage = css`
  white-space: pre-wrap;
`;

interface NoDataBlockProps {
  message: string;
}

export const NoDataBlock: React.FC<NoDataBlockProps> = ({ message }) => {
  return (
    <div className={noData}>
      <ZeroConfig />
      <Text type="secondary" className={noDataMessage}>
        {message}
      </Text>
    </div>
  );
};
