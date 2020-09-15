import React from 'react';
import { css, cx } from 'linaria';
import Menu from '@geist-ui/react-icons/menu';
import { ShoppingBag } from '@geist-ui/react-icons';
import { Text, Toggle } from '@geist-ui/react';
import Link from 'next/link';

import { toggleThemeMode } from '../../theme';
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
    color: var(--violet);
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

const logoLink = css`
  color: inherit;
  margin-right: 8px;
`;

const appHeader = css`
  grid-area: header;
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
          <Link href="/" passHref>
            <a className={logoLink}>Тату шоп</a>
          </Link>
          <Toggle size="large" onChange={toggleThemeMode} />
        </Text>
      </div>
      <button
        type="button"
        className={cx(iconButton, cartButton)}
        aria-label="Корзина товаров"
        onClick={toggleCart}
      >
        <ShoppingBag />
      </button>
    </header>
  );
};
