import React from 'react';
import lozad from 'lozad';
import { useRouter } from 'next/router';
import { css } from 'linaria';
import { styled } from 'linaria/react';

import { useIsomorphicLayoutEffect } from '../use-isomorphic-layout-effect';

// eslint-disable-next-line no-empty-function
let lz = { observe: () => {} };

if (typeof window !== 'undefined') {
  lz = lozad('.lozad', {
    rootMargin: '10px 10px',
    threshold: 0.1,
    enableAutoReload: true,
  });
}

export const useLozad = () => {
  const { pathname } = useRouter();

  useIsomorphicLayoutEffect(() => {
    if (window) {
      lz.observe();
    }
  }, [pathname]);
};

interface LazyImageProps {
  src: string;
  alt?: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

interface PlaceholderProps {
  placeholder: string;
  className?: string;
}

const noJsFallback = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  object-fit: cover;
`;

export const Placeholder: React.FC<PlaceholderProps> = styled.div`
  background: ${({ placeholder }) => placeholder};
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

export const LazyImage: React.FC<LazyImageProps> = ({
  src = '',
  alt = '',
  placeholder = 'white',
  className,
  style,
}) => {
  React.useEffect(() => {
    setTimeout(lz.observe, 0);
  }, [src]);

  if (typeof window === 'undefined' || !src) {
    return (
      <Placeholder placeholder={placeholder} className={className}>
        <noscript>
          <img src={src} className={noJsFallback} alt={alt} />
        </noscript>
      </Placeholder>
    );
  }

  return (
    <img
      className={`lozad ${className}`}
      style={style}
      data-src={src}
      data-placeholder-background={placeholder}
      alt={alt}
    />
  );
};
