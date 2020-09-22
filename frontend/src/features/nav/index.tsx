import React from 'react';
import { Modal, Link as GeistLink, useTheme } from '@geist-ui/react';
import { css, cx } from 'linaria';
import { useMedia } from 'use-media';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useStore } from 'effector-react';

import { $mobileNavVisible, closeNav } from '../../core/navigation';
import { SideContainer } from '../side-container';
import { desktopBpPx } from '../../theme/breakpoints';
import { isBrowser } from '../../../lib/is-browser';

const navContainer = css`
  grid-area: menu;
  display: none;

  @media (min-width: ${desktopBpPx}) {
    display: flex;
  }
`;

const navList = css`
  display: flex;
  flex-flow: column nowrap;
  max-width: 250px;

  @media (min-width: ${desktopBpPx}) {
    padding-top: 90px;
  }

  & > li {
    &:before {
      display: none;
    }
  }
`;

const navLink = css`
  /* !important is to override default style of GeistUI */
  width: 100% !important;
  text-align: left;
  font-size: 1.2rem;
`;

const navLinkActive = css`
  /* !important is to override default style of GeistUI */
  color: var(--nav-link-active-color) !important;
`;

interface NavItemProps {
  href: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, children }) => {
  const { pathname } = useRouter();
  const isActive = pathname === href;
  const {
    palette: { alert },
  } = useTheme();

  return (
    <Link href={href} passHref>
      <GeistLink
        className={cx(navLink, isActive && navLinkActive)}
        style={{
          ['--nav-link-active-color' as any]: alert,
        }}
        block
      >
        {children}
      </GeistLink>
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

  if (isBrowser() && isMobile) {
    return (
      <Modal open={isNavOpen && isMobile} onClose={closeNav}>
        <Navigation />
      </Modal>
    );
  }

  return (
    <>
      <SideContainer className={navContainer} open={true}>
        <Navigation />
      </SideContainer>
    </>
  );
};
