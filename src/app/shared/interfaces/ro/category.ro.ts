import { ProductIncludeDiscountRO } from '@ro';

export class CategoryRO {
  id: string;
  name: string;
  description: string;
  products: ProductIncludeDiscountRO[];
}

export class CategoryIncludeProductCountRO {
  id: string;
  name: string;
  product_count: number;
}
