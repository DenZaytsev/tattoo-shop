import React from 'react';
import { css } from 'linaria';

import { desktopBp } from '../../theme/breakpoints';

const layout = css`
  position: relative;
  display: grid;
  grid-template:
    'header' minmax(auto, 90px)
    'content' 1fr
    'footer' minmax(120px, auto)
    / minmax(auto, 100vw);

  width: 100vw;
  min-height: 100vh;

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
  padding: 0 16px 32px;
`;

export const ContentWrapper: React.FC = ({ children }) => {
  return <main className={appContent}>{children}</main>;
};
