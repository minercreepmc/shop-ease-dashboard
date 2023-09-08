import {
  V1CategoryModel,
  V1CreateCategoryHttpRequest,
  V1CreateCategoryHttpResponse,
  V1GetCategoriesHttpQuery,
  V1GetCategoriesHttpResponse,
  V1GetCategoryHttpResponse,
  V1RemoveCategoriesHttpRequest,
  V1RemoveCategoriesHttpResponse,
  V1RemoveCategoryHttpRequest,
  V1RemoveCategoryHttpResponse,
  V1UpdateCategoryHttpRequest,
  V1UpdateCategoryHttpResponse,
} from '@api/http';

export class CategoryModel extends V1CategoryModel {}
export type CreateCategoryHttpRequest = V1CreateCategoryHttpRequest;
export type CreateCategoryHttpResponse = V1CreateCategoryHttpResponse;
export type GetCategoriesHttpRequest = V1GetCategoriesHttpQuery;
export type GetCategoriesHttpResponse = V1GetCategoriesHttpResponse;

export type GetCategoryHttpResponse = V1GetCategoryHttpResponse;

export type RemoveCategoriesHttpRequest = V1RemoveCategoriesHttpRequest;
export type RemoveCategoriesHttpResponse = V1RemoveCategoriesHttpResponse;

export type RemoveCategoryHttpRequest = V1RemoveCategoryHttpRequest;
export type RemoveCategoryHttpResponse = V1RemoveCategoryHttpResponse;

export interface UpdateCategoryHttpRequest extends V1UpdateCategoryHttpRequest {
  id: string;
}
export type UpdateCategoryHttpResponse = V1UpdateCategoryHttpResponse;
