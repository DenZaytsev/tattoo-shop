import React from 'react';
import { Spinner } from '@geist-ui/react';
import { Plus, Minus } from '@geist-ui/react-icons';
import { css, cx } from 'linaria';

import { formatRuMoney } from '../../../lib/format-ru-money';

interface AddToCartProps {
  onClick?: React.MouseEventHandler;
  price: number | string;
}

const addButton = css`
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: max-content;
  height: max-content;
  padding: 4px 12px;
  color: var(--success);
  background-color: var(--accents_2);
  border: none;
  border-radius: 50px;

  transition: color 0.25s ease-in, background-color 0.25s ease-in;

  & > * {
    margin: 0;

    &:hover {
      cursor: pointer;
    }
  }

  & > *:first-child {
    margin-right: 4pt;
  }

  &:hover {
    color: var(--alert);
    cursor: pointer;
    background-color: var(--accents_2);
  }
`;

const addButtonActive = css`
  color: var(--accents_1);
  background-color: var(--violet);

  &:hover {
    color: var(--accents_1);
    background-color: var(--alert);
  }
`;

const priceTag = css`
  display: inline-block;
  font-size: 1.65rem !important;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.35px;
`;

const addIcon = css`
  display: inline-block;
  width: 24px;
  max-width: max-content;
  height: 24px;
  max-height: max-content;
  padding: 0;
  background: none;
  border: none;

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: inline-block;
    content: ' ';
  }
`;

const subIcon = css`
  display: inline-block;
  width: 0;
  max-width: max-content;
  height: 24px;
  max-height: max-content;
  padding: 0;
  overflow: hidden;
  background: none;
  border: none;
  transition: width 0.5s ease;
`;

const subIconActive = css`
  width: 24px;

  &::before {
    position: absolute;
    top: 0;
    right: 75%;
    bottom: 0;
    left: 0;
    z-index: 2;
    display: inline-block;
    content: ' ';
  }
`;

const coloredSpin = css`
  & > * > span {
    background-color: currentColor !important;
  }
`;

export const AddToCart: React.FC<AddToCartProps> = ({
  onClick = () => {},
  price,
}) => {
  const [isLoading, setLoading] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const countBig = count > 0;
  const add = () => {
    setCount((s) => s + 1);
  };
  const priceStr = !countBig
    ? `${formatRuMoney(price)}`
    : `${formatRuMoney(price)} x ${count}`;

  return (
    <div className={cx(addButton, countBig && addButtonActive)}>
      <button
        type="button"
        className={cx(subIcon, countBig && subIconActive)}
        onClick={() => setCount((s) => (s === 0 ? 0 : s - 1))}
      >
        <Minus />
      </button>
      <span className={priceTag}>{priceStr}</span>
      <button type="button" className={addIcon} onClick={add}>
        {isLoading ? (
          <Spinner size="medium" className={coloredSpin} />
        ) : (
          <Plus />
        )}
      </button>
    </div>
  );
};
