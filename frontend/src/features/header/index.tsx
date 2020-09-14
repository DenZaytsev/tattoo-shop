import React from 'react';
import { css, cx } from 'linaria';
import Menu from '@geist-ui/react-icons/menu';
import { ShoppingCart } from '@geist-ui/react-icons';
import { Text } from '@geist-ui/react';

import { toggleNav } from '../../domain/navigation';
import { toggleCart } from '../../domain/cart';

const iconButton = css`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: 0.5s ease;
  transition-property: color, transform;

  &:hover {
    color: rgb(121, 40, 202);
    transform: scale(1.5);
  }
`;

const menuButton = css`
  justify-self: flex-start;
`;

const cartButton = css`
  justify-self: flex-end;
`;

const logoText = css`
  justify-self: center;
`;

const appHeader = css`
  grid-area: header;
  background-color: white !important;
  color: black;
  padding: 16px;

  display: grid;
  grid-template-columns: 15% 70% 15%;
`;

export const Header = () => {
  return (
    <header className={appHeader}>
      <button
        type="button"
        className={cx(iconButton, menuButton)}
        aria-label="Меню и категории"
        onClick={toggleNav}
      >
        <Menu />
      </button>
      <div className={logoText}>
        <Text h1 size="2rem">
          Тату шоп
        </Text>
      </div>
      <button
        type="button"
        className={cx(iconButton, cartButton)}
        aria-label="Корзина товаров"
        onClick={toggleCart}
      >
        <ShoppingCart />
      </button>
    </header>
  );
};
