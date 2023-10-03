import { ProductRO } from '@ro';

export class DiscountRO {
  id: string;
  name: string;
  description: string;
  percentage: number;
  products: ProductRO[];
}
