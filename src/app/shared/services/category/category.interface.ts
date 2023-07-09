import {
  V1CreateCategoryHttpRequest,
  V1CreateCategoryHttpResponse,
} from '@protos/api/http/v1/create-category.http.api.v1';
import {
  V1GetCategoriesHttpRequest,
  V1GetCategoriesHttpResponse,
} from '@protos/api/http/v1/get-categories.http.api.v1';

export class Category {
  id: string;
  name: string;
  description?: string;
}

export type CreateCategoryHttpRequest = V1CreateCategoryHttpRequest;
export type CreateCategoryHttpResponse = V1CreateCategoryHttpResponse;

export type GetCategoriesHttpRequest = V1GetCategoriesHttpRequest;
export type GetCategoriesHttpResponse = V1GetCategoriesHttpResponse;
