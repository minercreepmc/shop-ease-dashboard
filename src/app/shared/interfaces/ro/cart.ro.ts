import { CartItemRO } from '@ro';

export class CartRO {
  id: string;
  shippingFee?: number;
  total_price: number;
  items: CartItemRO[];
}
