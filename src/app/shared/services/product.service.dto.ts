import { V1CreateProductHttpResponse } from '@protos/api/http/v1/product.http.api.v1';

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
