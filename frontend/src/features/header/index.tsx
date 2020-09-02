import React from 'react';
import { css } from 'linaria';
import { Button } from 'reakit/Button';
import Menu from '@geist-ui/react-icons/menu';
import { ShoppingCart } from '@geist-ui/react-icons';
import { Text } from '@geist-ui/react';

const menuButton = css`
  background: none;
  border: none;
  cursor: pointer;
  justify-self: flex-start;
  padding: 0;
`;

const logoText = css`
  justify-self: center;
`;

const appHeader = css`
  grid-area: header;
  background-color: white !important;
  color: black;
  padding: 16px;
  width: 100%;
  display: grid;
  grid-template-columns: 15% 70% 15%;
`;

export const Header = () => {
  return (
    <header className={appHeader}>
      <Button className={menuButton} aria-label="Меню и категории">
        <Menu />
      </Button>
      <div className={logoText}>
        <Text h1 size="2rem">
          Тату шоп
        </Text>
      </div>
      <Button className={menuButton} aria-label="Корзина товаров">
        <ShoppingCart />
      </Button>
    </header>
  );
};
