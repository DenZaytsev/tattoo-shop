import axios, { Options } from 'redaxios';

import { AllProducts } from '../../domain/products';

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: Options;
  request?: any;
}

export interface AxiosError<T = any> extends Error {
  config: Options;
  code?: string;
  request?: any;
  response?: AxiosResponse<T>;
  isAxiosError: boolean;
  toJSON: () => object;
}

const Method = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
} as const;

// eslint-disable-next-line no-return-await
const makeReq = async (config: Options) => await axios(config);

export class ShopApiService {
  apiBase: string;

  constructor(base: string) {
    this.apiBase = base;
  }

  url(path: string): string {
    return `${this.apiBase}${path}/`;
  }

  async getAllProducts() {
    const { data } = await makeReq({
      url: this.url('products'),
      method: Method.GET,
      responseType: 'json',
    });

    const allProducts = AllProducts.check(data);

    return allProducts;
  }
}
