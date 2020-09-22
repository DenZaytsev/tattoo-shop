import React from 'react';
import { css, cx } from 'linaria';
import Menu from '@geist-ui/react-icons/menu';
import { ShoppingBag } from '@geist-ui/react-icons';
import Link from 'next/link';

import { toggleNav } from '../../core/navigation';
import { toggleCart } from '../../core/cart';
import { desktopBpPx } from '../../theme/breakpoints';

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

  @media (min-width: ${desktopBpPx}) {
    pointer-events: none;
  }
`;

const cartButton = css`
  justify-self: flex-end;
`;

const logoWrapper = css`
  justify-self: center;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const logoLink = css`
  color: inherit;
`;

const logo = css`
  max-width: 100%;
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
      <div className={logoWrapper}>
        <Link href="/" passHref>
          <a className={logoLink}>
            <picture>
              <source srcSet="logo.avif" type="image/avif" />
              <source srcSet="logo.webp" type="image/webp" />
              <img
                className={logo}
                src="logo.png"
                alt="Jeune Pokes - Поке-тату, футболки и стикеры"
              />
            </picture>
          </a>
        </Link>
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
