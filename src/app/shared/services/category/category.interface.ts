export interface CategoryModel {
  id: string;
  name: string;
  description?: string;
}
export interface CreateCategoryDto {
  name: string;
  description?: string;
}
export interface CreateCategoryResponse {
  id: string;
  name: string;
  description?: string;
}

export interface DeleteCategoriesDto {
  ids: string[];
}
export interface DeleteCategoriesResponse {
  ids: string[];
}

export interface DeleteCategoryResponse {
  id: string;
}

export interface UpdateCategoryDto {
  name?: string;
  description?: string;
  productIds?: string[];
}
export interface UpdateCategoryResponse {
  id: string;
  name: string;
  description?: string;
  productIds?: string[];
}
