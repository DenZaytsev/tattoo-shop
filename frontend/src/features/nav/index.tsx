import React from 'react';
import { Modal } from '@geist-ui/react';
import { css } from 'linaria';
import { useMedia } from 'use-media';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useStore } from 'effector-react';

import { $navVisible, closeNav } from '../../domain/navigation';
import { SideContainer } from '../side-container';
import { desktopBpPx } from '../../theme/breakpoints';

const navContainer = css`
  grid-area: menu;
`;

const navList = css`
  display: flex;
  flex-flow: column nowrap;
  max-width: 250px;

  @media (min-width: ${desktopBpPx}) {
    padding-top: 90px;
  }
`;

const Navigation: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <nav className={navList}>
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

export const NavBlock: React.FC = () => {
  const isMobile = !useMedia({ minWidth: desktopBpPx });

  const isNavOpen = useStore($navVisible);

  if (isMobile) {
    return (
      <Modal open={isNavOpen} onClose={closeNav}>
        <Navigation />
      </Modal>
    );
  }

  return (
    <SideContainer className={navContainer} open={true}>
      <Navigation />
    </SideContainer>
  );
};
