import React from 'react';
import { css, cx } from 'linaria';

interface AspectRatioKeeperProps {
  aspectRatio?: number;
  className?: string;
  style?: React.CSSProperties;
}

const wrapperAspectRatio = css`
  position: relative;
  display: block;
  width: 100%;

  &::before {
    display: block;
    width: 100%;
    padding-top: calc(100% / var(--aspect-ratio, 1));
    content: ' ';
  }
`;

const innerAspectRatio = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const AspectRatioKeeper: React.FC<AspectRatioKeeperProps> = ({
  aspectRatio = 1,
  className,
  style,
  children,
}) => {
  return (
    <div
      className={cx(wrapperAspectRatio, className)}
      style={{
        ['--aspect-ratio' as any]: aspectRatio,
        ...style,
      }}
    >
      <div className={innerAspectRatio}>{children}</div>
    </div>
  );
};
