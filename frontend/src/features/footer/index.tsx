import React from 'react';
import { css } from 'linaria';
import { Text } from '@geist-ui/react';

const footer = css`
  background-color: var(--accents_2);
  grid-area: footer;
  color: var(--accents_3);

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
          Jeune Pokes - Тату, стикеры и футболки
        </Text>
      </div>
    </footer>
  );
};
