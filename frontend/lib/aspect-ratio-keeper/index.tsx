import React from 'react';
import { css, cx } from 'linaria';

interface AspectRatioKeeperProps {
  aspectRatio?: number;
  className?: string;
}

const wrapperAspectRatio = css`
  display: block;
  position: relative;
  width: 100%;
  height: 0;
  padding-top: var(--aspect-ratio);
`;

const innerAspectRatio = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const toPaddingTopHack = (ar: number): string => `${ar * 100}%`;

export const AspectRatioKeeper: React.FC<AspectRatioKeeperProps> = ({
  aspectRatio = 1,
  className,
  children,
}) => {
  return (
    <div
      className={cx(wrapperAspectRatio, className)}
      style={{
        ['--aspect-ratio' as any]: toPaddingTopHack(aspectRatio),
      }}
    >
      <div className={innerAspectRatio}>{children}</div>
    </div>
  );
};
