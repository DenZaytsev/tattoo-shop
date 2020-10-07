import React from 'react';
import { css } from 'linaria';
import { Text } from '@geist-ui/react';

import { desktopBpPx } from '../../theme/breakpoints';

const footer = css`
  display: grid;
  grid-area: footer;
  grid-template-columns: [content] 1fr;
  color: var(--accents_3);
  background-color: var(--accents_2);

  @media (min-width: ${desktopBpPx}) {
    grid-template-columns: 1fr [content] 600px 1fr;
  }

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
