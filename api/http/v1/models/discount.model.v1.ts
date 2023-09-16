import { V1ProductModel } from './product.model.v1';

export class V1DiscountModel {
  id: string;
  name: string;
  description?: string;
  percentage: number;
  active: boolean;
}
