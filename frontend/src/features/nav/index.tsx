import React from 'react';
import { Modal, Link as GeistLink } from '@geist-ui/react';
import { css, cx } from 'linaria';
import { useMedia } from 'use-media';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useStore } from 'effector-react';

import { $mobileNavVisible, closeNav } from '../../domain/navigation';
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

interface NavItemProps {
  href: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, children }) => {
  const { pathname } = useRouter();

  return (
    <Link href={href} passHref>
      <GeistLink block>{children}</GeistLink>
    </Link>
  );
};

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul className={navList}>
        <li>
          <NavItem href="/">Главная</NavItem>
        </li>
        <li>
          <NavItem href="/about">
            О нас, доставке, оплате и обо всём на свете
          </NavItem>
        </li>
      </ul>
    </nav>
  );
};

export const NavBlock: React.FC = () => {
  const isMobile = !useMedia({ minWidth: desktopBpPx });

  const isNavOpen = useStore($mobileNavVisible);

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
