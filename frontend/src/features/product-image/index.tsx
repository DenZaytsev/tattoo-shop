import React from 'react';
import { Modal } from '@geist-ui/react';
import { Maximize } from '@geist-ui/react-icons';
import { css, cx } from 'linaria';

import { withStatic } from '../../core/api';
import { AspectRatioKeeper } from '../../../lib/aspect-ratio-keeper';
import { LazyImage } from '../../../lib/lozad-react';

const productImage = css`
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const cardPlaceHolder =
  'rgba(0, 0, 0, 0) linear-gradient(to right, rgb(201, 214, 255), rgb(226, 226, 226)) repeat scroll 0% 0%';

interface ProductImageProps {
  src: string;
  aspectRatio?: number;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  aspectRatio,
  className,
}) => {
  return (
    <AspectRatioKeeper className={className} aspectRatio={aspectRatio}>
      <LazyImage
        src={withStatic(src)}
        placeholder={cardPlaceHolder}
        className={productImage}
      />
    </AspectRatioKeeper>
  );
};

const withFullSize = css`
  position: relative;
`;

const overlayContainer = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: grey;
  border-radius: 5px;
  opacity: 0;
  transition: opacity, 0.3s ease;

  &:hover,
  &:focus {
    opacity: 0.6;
  }
`;

const fullSizeButton = css`
  width: 50%;
  height: 50%;
  cursor: pointer;
  background: none;
  border: none;

  & > svg {
    width: 100%;
    height: 100%;
    color: white;
    cursor: pointer;
  }
`;

const fullSizeImg = css`
  width: 100%;
  margin: -16pt 0;
`;

export const ProductImageWithFullSize: React.FC<ProductImageProps> = ({
  src,
  aspectRatio,
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  const openModal = React.useCallback(() => setOpen(true), []);
  const closeModal = React.useCallback(() => setOpen(false), []);

  return (
    <div className={cx(withFullSize, className)}>
      <AspectRatioKeeper aspectRatio={aspectRatio}>
        <LazyImage
          src={withStatic(src)}
          placeholder={cardPlaceHolder}
          className={productImage}
        />
      </AspectRatioKeeper>
      <div className={overlayContainer}>
        <button type="button" className={fullSizeButton} onClick={openModal}>
          <Maximize />
        </button>
        <Modal open={open} onClose={closeModal}>
          <img className={fullSizeImg} src={withStatic(src)} alt="" />
          <Modal.Action passive onClick={closeModal}>
            Закрыть
          </Modal.Action>
        </Modal>
      </div>
    </div>
  );
};
