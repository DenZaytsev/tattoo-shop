export const RUBLE = '₽';

const DELIM = ',';

export const formatRuMoney = (price: number | string): string => {
  const priceStr = `${Number(price).toFixed(2)}`
    .replace(/\d(?=(\d{3})+\.)/g, '$& ')
    .replace('.', DELIM);

  return `${RUBLE} ${priceStr}`;
};
