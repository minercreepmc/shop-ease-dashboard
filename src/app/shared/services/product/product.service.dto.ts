import {
  V1CreateProductHttpRequest,
  V1CreateProductHttpResponse,
  V1GetProductHttpQuery,
  V1GetProductHttpResponse,
  V1GetProductsHttpQuery,
  V1GetProductsHttpResponse,
  V1RemoveProductsHttpRequest,
  V1RemoveProductsHttpResponse,
  V1UpdateProductHttpRequest,
  V1UpdateProductHttpResponse,
} from '@api/http';

export type CreateProductRequestDto = V1CreateProductHttpRequest;
export type CreateProductResponseDto = V1CreateProductHttpResponse;
export type GetProductQueryDto = V1GetProductHttpQuery;
export type GetProductResponseDto = V1GetProductHttpResponse;
export type GetProductsRequestDto = V1GetProductsHttpQuery;
export type GetProductsResponseDto = V1GetProductsHttpResponse;
export type RemoveProductsResponseDto = V1RemoveProductsHttpResponse;
export type RemoveProductsRequestDto = V1RemoveProductsHttpRequest;
export interface UpdateProductRequestDto extends V1UpdateProductHttpRequest {
  id: string;
}
export type UpdateProductResponseDto = V1UpdateProductHttpResponse;
