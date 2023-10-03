import { ProductIncludeDiscountRO } from '@ro';

export class CategoryRO {
  id: string;
  name: string;
  description: string;
  products: ProductIncludeDiscountRO[];
}
