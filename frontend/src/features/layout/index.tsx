import React from 'react';
import { css } from 'linaria';

const layout = css`
  display: grid;
  grid-template:
    'header' minmax(64px, auto)
    'content' 1fr
    'nav' minmax(64px, auto)
    / 1fr;
  min-height: 100vh;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
`;

export const Layout: React.FC = ({ children }) => {
  return <div className={layout}>{children}</div>;
};

const appContent = css`
  grid-area: content;
`;

export const ContentWrapper: React.FC = ({ children }) => {
  return <div className={appContent}>{children}</div>;
};
