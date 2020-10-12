import axios from 'axios';

import { AllProducts, BaseProduct } from '../../domain/products';

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
    return `${this.apiBase}${path}`;
  }

  async getAllProducts() {
    const { data } = await makeReq({
      url: this.url('products/'),
      method: Method.GET,
      responseType: 'json',
    });

    const allProducts = AllProducts.check(data);

    return allProducts;
  }

  async getProduct({ category, slug }: ProductData) {
    const { data } = await makeReq({
      url: this.url(`products/${category}/${slug}/`),
      method: Method.GET,
      responseType: 'json',
    });

    const product = BaseProduct.check({ ...data, categoryTitle: category });

    return product;
  }

  async getCart() {
    const { data } = await makeReq({
      url: this.url('cart/'),
      method: Method.GET,
      responseType: 'json',
    });

    return data;
  }

  async clearCart() {
    const { data } = await makeReq({
      url: this.url('cart/clear-cart/'),
      method: Method.POST,
    });

    return data;
  }

  async removeFromCart({ category, slug }: ProductData) {
    const { data } = await makeReq({
      url: this.url(
        `cart/remove-to-cart/?category_title=${category}&product_slug=${slug}`,
      ),
      method: Method.POST,
    });

    return data;
  }

  async addToCart({ quantity, update, category, slug }: AddToCart) {
    const { data } = await makeReq({
      url: this.url(
        `cart/add-to-cart/?quantity=${quantity}&update=${update}&category_title=${category}&product_slug=${slug}`,
      ),
      method: Method.POST,
    });

    return data;
  }
}

interface AddToCart {
  category: string;
  update: boolean;
  quantity: number;
  slug: string;
}

interface ProductData {
  category: string;
  slug: string;
}
