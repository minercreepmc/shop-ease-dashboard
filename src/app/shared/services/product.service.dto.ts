import { V1CreateProductHttpResponse } from '@protos/api/http/v1/create-product.http.api.v1';
import {
  V1GetProductsHttpRequest,
  V1GetProductsHttpResponse,
} from '@protos/api/http/v1/get-product.http.api.v1';
import {
  V1RemoveProductsHttpRequest,
  V1RemoveProductsHttpResponse,
} from '@protos/api/http/v1/remove-product.http.api.v1';

export interface CreateProductRequestDto {
  image: File;
  name: string;
  price: {
    amount: number;
    currency: string;
  };
  description?: string;
}

export type CreateProductResponseDto = V1CreateProductHttpResponse;

export type GetProductsRequestDto = V1GetProductsHttpRequest;
export type GetProductsResponseDto = V1GetProductsHttpResponse;

export type RemoveProductsResponseDto = V1RemoveProductsHttpResponse;
export type RemoveProductsRequestDto = V1RemoveProductsHttpRequest;
