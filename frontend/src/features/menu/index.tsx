import React from 'react';
import { Modal } from '@geist-ui/react';
import { css } from 'linaria';
import { useMedia } from 'use-media';
import Link from 'next/link';

import { useStore } from 'effector-react';
import { $menuVisible, closeMenu } from '../../domain/menu';

import { SideContainer } from '../side-container';

import { desktopBpPx } from '../../theme/breakpoints';

const menuBlock = css`
  grid-area: menu;
`;

const Menu: React.FC = () => {
  return (
    <div>
      <ul>
        <li>
          Тату
          <Link href="/about" passHref>
            <a>bla</a>
          </Link>
        </li>
        <li>Шоп</li>
      </ul>
    </div>
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
