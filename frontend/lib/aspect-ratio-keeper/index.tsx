import React, { useMemo } from 'react';
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
    padding-top: calc(100% / calc(var(--aspect-ratio, 4 / 3)));
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
  aspectRatio,
  className,
  style,
  children,
}) => {
  const computedStyle = useMemo(() => {
    const styleObj = {
      ...style,
    };

    if (aspectRatio) styleObj['--aspect-ratio'] = aspectRatio;

    return styleObj;
  }, [aspectRatio, style]);

  return (
    <div className={cx(wrapperAspectRatio, className)} style={computedStyle}>
      <div className={innerAspectRatio}>{children}</div>
    </div>
  );
};
