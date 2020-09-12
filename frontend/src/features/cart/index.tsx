import React from 'react';
import { Modal } from '@geist-ui/react';
import { css } from 'linaria';
import { useMedia } from 'use-media';
import { useStore } from 'effector-react';

import { $cartVisible, closeCart } from '../../domain/cart';
import { SideContainer } from '../side-container';
import { desktopBpPx } from '../../theme/breakpoints';

const cartBlock = css`
  grid-area: cart;
`;

const Cart: React.FC = () => {
  return (
    <div>
      <ul>
        <li>Товар 1</li>
        <li>Товар 2</li>
      </ul>
    </div>
  );
};

export const CartBlock: React.FC = () => {
  const isMobile = !useMedia({ minWidth: desktopBpPx });

  const isMenuOpen = useStore($cartVisible);

  if (isMobile) {
    return (
      <Modal open={isMenuOpen} onClose={closeCart}>
        <Cart />
      </Modal>
    );
  }

  return (
    <SideContainer side="left" className={cartBlock} open={isMenuOpen}>
      <Cart />
    </SideContainer>
  );
};
