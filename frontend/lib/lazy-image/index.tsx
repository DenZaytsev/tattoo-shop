import React from 'react';
import lozad from 'lozad';

export const LozadProvider: React.FC = () => {
  React.useLayoutEffect(() => {
    if (window) {
      const observer = lozad();

      observer.observe();
    }
  }, []);

  return null;
};

interface LazyImageProps {
  src: string;
  alt?: string;
  placeholder?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src = '',
  alt = '',
  placeholder = 'white',
}) => (
  <img
    className="lozad"
    src="empty" // added to hide ugly border for img
    data-src={src}
    data-placeholder-background={placeholder}
    alt={alt}
  />
);
