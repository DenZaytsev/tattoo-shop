import React from 'react';
import { css, cx } from 'linaria';
import { Text } from '@geist-ui/react';

const bannerBase = css`
  display: flex;
  min-height: 10rem;
  padding: 1rem;
  color: var(--banner-color, var(--accents_1));
  --banner-bg-base: #b92b27;
  --banner-bg-main: #1565c0;
  background-image: linear-gradient(
    90deg,
    var(--banner-bg-base) 0%,
    var(--banner-bg-main) 100%
  );
  border-radius: 5px;
`;

const promoText = css`
  font-weight: bold;
`;

export const Banner: React.FC = () => {
  return (
    <section className={bannerBase}>
      <Text className={promoText}>
        Привет! Это промо блок, в котором можно рассказать о том, кто тут делает
        татушки и почему это круто
      </Text>
    </section>
  );
};

const bannerLoader = css`
  position: relative;
  padding: 0;
  overflow: hidden;
  --banner-bg-base: #e2e2e2;
  --banner-bg-main: #f2f2f2;
  background-color: var(--banner-bg-base);
  background-image: none;

  &:before {
    position: absolute;
    left: -100%;
    width: 100%;
    height: 100%;
    content: ' ';
    background-image: linear-gradient(
      90deg,
      var(--banner-bg-base) 0%,
      var(--banner-bg-main) 50%,
      var(--banner-bg-base) 100%
    );
    animation: load 2s infinite cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes load {
    from {
      transform: translateX(-100%);
    }

    to {
      transform: translateX(200%);
    }
  }
`;

export const BannerLoading: React.FC = () => {
  return <section className={cx(bannerBase, bannerLoader)} />;
};
