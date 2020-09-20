import { ShopApiService } from './shop-api-service';

const apiBase = process.env.NEXT_PUBLIC_API_BASE;

export const shopApi = new ShopApiService(apiBase);
export const withStatic = (url: string) =>
  `${process.env.NEXT_PUBLIC_BACK_URL}${url}`;
