export type CreateDiscountRequest = {
  name: string;
  description?: string;
  percentage: number;
};
export interface CreateDiscountResponse {
  id: string;
  name: string;
  description?: string;
  percentage: number;
  active: boolean;
}
export interface UpdateDiscountRequest {
  name?: string;
  description?: string;
  percentage?: number;
}
export interface UpdateDiscountHttpResponse {
  id: string;
  name: string;
  description: string;
  percentage: number;
  active: boolean;
}
export interface DiscountModel {
  id: string;
  name: string;
  description?: string;
  percentage: number;
  active: boolean;
}
