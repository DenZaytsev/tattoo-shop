export const RUBLE = '₽';

const DELIM = ',';

export const formatRuMoney = (price: number | string): string => {
  let priceStr = `${Number(price).toFixed(2)}`
    .replace(/\d(?=(\d{3})+\.)/g, '$& ')
    .replace('.', DELIM);

  if (priceStr.slice(-2) === '00') {
    priceStr = priceStr.slice(0, -3);
  }

  return `${priceStr} ${RUBLE}`;
};
