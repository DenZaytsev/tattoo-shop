import React from 'react';
import { css } from 'linaria';

const layout = css`
  display: grid;
  min-height: 100vh;
  width: 100vw;

  grid-template:
    'header' minmax(64px, auto)
    'content' 1fr
    'footer' minmax(64px, auto)
    / minmax(auto, 100vw);

  @media (min-width: 1200px) {
    grid-template:
      'left header  right' minmax(64px, auto)
      'left content right' 1fr
      'footer footer footer' minmax(64px, auto)
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
  return <div className={appContent}>{children}</div>;
};
