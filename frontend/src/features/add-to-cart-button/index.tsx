import React from 'react';
import { Plus } from '@geist-ui/react-icons';
import { css } from 'linaria';

import { formatRuMoney } from '../../../lib/format-ru-money';

interface AddToCartProps {
  onClick?: React.MouseEventHandler;
  price: number | string;
}

const addButton = css`
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
`;

export const AddToCart: React.FC<AddToCartProps> = ({
  onClick = () => {},
  price,
}) => {
  return (
    <button type="button" className={addButton} onClick={onClick}>
      <span className={priceTag}>{formatRuMoney(price)}</span>
      <span className={addIcon}>
        <Plus />
      </span>
    </button>
  );
};
