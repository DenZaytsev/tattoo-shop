import React from 'react';
import { css } from 'linaria';
import { Text } from '@geist-ui/react';

const footer = css`
  background-color: rgb(17, 17, 17);
  grid-area: footer;
  color: white;

  display: grid;
  grid-template-columns: 1fr [content] 600px 1fr;

  & > * {
    color: inherit;
  }
`;

const footerContent = css`
  grid-area: content;
  padding: 16px;
`;

export const Footer = () => {
  return (
    <footer className={footer}>
      <div className={footerContent}>
        <Text h2 size="2rem">
          Тату-шоп
        </Text>
      </div>
    </footer>
  );
};
