import React from 'react';
import { Modal } from '@geist-ui/react';
import { css } from 'linaria';
import { useMedia } from 'use-media';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useStore } from 'effector-react';

import { $menuVisible, closeMenu } from '../../domain/menu';
import { SideContainer } from '../side-container';
import { desktopBpPx } from '../../theme/breakpoints';

const menuBlock = css`
  grid-area: menu;
`;

const menuList = css`
  display: flex;
  flex-flow: column nowrap;
  max-width: 250px;

  @media (min-width: ${desktopBpPx}) {
    padding-top: 90px;
  }
`;

const Menu: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <nav className={menuList}>
      <ul>
        <li>
          <Link href="/" passHref>
            <a>Главная</a>
          </Link>
        </li>
        <li>
          <Link href="/about" passHref>
            <a>О нас, о доставке и обо всём на свете</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export const MenuBlock: React.FC = () => {
  const isMobile = !useMedia({ minWidth: desktopBpPx });

  const isMenuOpen = useStore($menuVisible);

  if (isMobile) {
    return (
      <Modal open={isMenuOpen} onClose={closeMenu}>
        <Menu />
      </Modal>
    );
  }

  return (
    <SideContainer className={menuBlock} open={isMenuOpen}>
      <Menu />
    </SideContainer>
  );
};
