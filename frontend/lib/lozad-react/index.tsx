import React from 'react';
import lozad from 'lozad';
import { useRouter } from 'next/router';
import { styled } from 'linaria/react';

import { useIsomorphicLayoutEffect } from '../use-isomorphic-layout-effect';

const getLozad = () =>
  lozad('.lozad', {
    rootMargin: '10px 10px',
    threshold: 0.1,
    enableAutoReload: true,
  });

export const useLozad = () => {
  const { pathname } = useRouter();
  const lozadRef = React.useRef(null);

  useIsomorphicLayoutEffect(() => {
    if (window) {
      if (!lozadRef.current) {
        lozadRef.current = getLozad();
      }

      lozadRef.current.observe();
    }
  }, [lozadRef.current, pathname]);
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

export const Placeholder: React.FC<PlaceholderProps> = styled.div`
  background: ${({ placeholder }) => placeholder};
  width: 100%;
  height: 100%;
`;

export const LazyImage: React.FC<LazyImageProps> = ({
  src = '',
  alt = '',
  placeholder = 'white',
  className,
  style,
}) => {
  if (!src) {
    return (
      <Placeholder
        placeholder={placeholder}
        className={className}
        style={style}
      />
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
