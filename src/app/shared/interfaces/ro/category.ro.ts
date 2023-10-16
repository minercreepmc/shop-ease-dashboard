import type { ProductRO } from './product.ro';

export class CategoryRO {
  id: string;
  name: string;
  description: string;
  products: ProductRO[];
}

export class CategoryIncludeProductCountRO {
  id: string;
  name: string;
  product_count: number;
}
