import React from 'react';
import { css } from 'linaria';

import { desktopBp } from '../../theme/breakpoints';

const layout = css`
  display: grid;
  min-height: 100vh;
  width: 100vw;

  grid-template:
    'header' minmax(auto, 90px)
    'content' 1fr
    'footer' minmax(120px, auto)
    / minmax(auto, 100vw);

  @media (min-width: ${desktopBp}px) {
    grid-template:
      'menu header  cart' minmax(auto, 90px)
      'menu content cart' 1fr
      'footer footer footer' minmax(120px, auto)
      / 1fr minmax(auto, 600px) 1fr;
  }
`;

export const Layout: React.FC = ({ children }) => {
  return <div className={layout}>{children}</div>;
};

const appContent = css`
  grid-area: content;
  padding: 0 16px;
`;

export const ContentWrapper: React.FC = ({ children }) => {
  return <main className={appContent}>{children}</main>;
};
