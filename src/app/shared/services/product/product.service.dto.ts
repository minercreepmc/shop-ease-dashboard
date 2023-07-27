import {
  V1CreateProductHttpRequest,
  V1CreateProductHttpResponse,
  V1GetProductsHttpQuery,
  V1GetProductsHttpResponse,
  V1RemoveProductsHttpRequest,
  V1RemoveProductsHttpResponse,
} from '@api/http';

export type CreateProductRequestDto = V1CreateProductHttpRequest;
export type CreateProductResponseDto = V1CreateProductHttpResponse;
export type GetProductsRequestDto = V1GetProductsHttpQuery;
export type GetProductsResponseDto = V1GetProductsHttpResponse;
export type RemoveProductsResponseDto = V1RemoveProductsHttpResponse;
export type RemoveProductsRequestDto = V1RemoveProductsHttpRequest;
