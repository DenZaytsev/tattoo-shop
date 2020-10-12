import React from 'react';
import { css, cx } from 'linaria';

const progLoader = css`
  width: 100%;
  height: var(--line-size, 4px);
  position: relative;
  overflow: hidden;
  z-index: 0;

  &::before {
    display: block;
    content: ' ';
    background-color: var(--color, white);
    opacity: 0.35;
    width: 100%;
    height: 100%;
  }

  & > * {
    position: absolute;
    z-index: 5;
  }
`;

const progLoaderLoaderOne = css`
  top: 0;
  left: 0;
  bottom: 0;

  background-color: var(--color, blue);
  height: 100%;

  width: auto;
  animation: indeterminate1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395)
    infinite;

  @keyframes indeterminate1 {
    0% {
      left: -35%;
      right: 100%;
    }

    60% {
      left: 100%;
      right: -90%;
    }

    100% {
      left: 100%;
      right: -90%;
    }
  }
`;

const progLoaderLoaderTwo = css`
  top: 0;
  left: 0;
  bottom: 0;

  background-color: var(--color, blue);
  height: 100%;
  width: auto;
  animation: indeterminate2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s
    infinite;

  @keyframes indeterminate2 {
    0% {
      left: -200%;
      right: 100%;
    }

    60% {
      left: 107%;
      right: -8%;
    }

    100% {
      left: 107%;
      right: -8%;
    }
  }
`;

interface ProgressLoaderProps {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
}

export const ProgressLoader: React.FC<ProgressLoaderProps> = ({
  className,
  style,
  color,
}) => {
  return (
    <div
      className={cx(progLoader, className)}
      style={{
        ['--color' as any]: color,
        ...style,
      }}
    >
      <div className={progLoaderLoaderOne}></div>
      <div className={progLoaderLoaderTwo}></div>
    </div>
  );
};
