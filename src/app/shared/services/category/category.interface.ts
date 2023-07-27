import {
  V1CategoryModel,
  V1CreateCategoryHttpRequest,
  V1CreateCategoryHttpResponse,
  V1GetCategoriesHttpQuery,
  V1GetCategoriesHttpResponse,
  V1RemoveCategoriesHttpRequest,
  V1RemoveCategoriesHttpResponse,
} from '@api/http';

export class CategoryModel extends V1CategoryModel {}
export type CreateCategoryHttpRequest = V1CreateCategoryHttpRequest;
export type CreateCategoryHttpResponse = V1CreateCategoryHttpResponse;
export type GetCategoriesHttpRequest = V1GetCategoriesHttpQuery;
export type GetCategoriesHttpResponse = V1GetCategoriesHttpResponse;
export type RemoveCategoriesHttpRequest = V1RemoveCategoriesHttpRequest;
export type RemoveCategoriesHttpResponse = V1RemoveCategoriesHttpResponse;
