import React from 'react';
import { Plus } from '@geist-ui/react-icons';
import { css } from 'linaria';

import { formatRuMoney } from '../../../../lib/format-ru-money';

interface AddToCartProps {
  onClick: React.MouseEventHandler;
  price: number | string;
}

const addButton = css`
  background-color: var(--accents_2);
  color: var(--success);
  border: none;
  border-radius: 50px;

  display: flex;
  padding: 4px 12px;
  width: max-content;

  transition: color 0.25s ease-in, background-color 0.25s ease-in;

  & > * {
    margin: 0;
  }

  & > *:first-child {
    margin-right: 4px;
  }

  &:hover {
    cursor: pointer;
    background-color: var(--accents_2);
    color: var(--alert);
  }
`;

const priceTag = css`
  font-size: 1.65em !important;
  font-weight: 400;
  letter-spacing: 0.35px;
`;

export const AddToCart: React.FC<AddToCartProps> = ({ onClick, price }) => {
  return (
    <button type="button" className={addButton} onClick={onClick}>
      <span className={priceTag}>{formatRuMoney(price)}</span>
      <Plus />
    </button>
  );
};
