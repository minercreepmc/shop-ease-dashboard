import { OrderModel } from '@model';

export class OrderRO {
  id: string;
  status: string;
  total_price: number;
  fee_name: string;
  fee_price: number;
  address_location: string;
  member_name: string;
  member_phone: string;
  updated_at: Date;
  items?: OrderItemRO[];
}

export class OrderItemRO {
  id: string;
  price: number;
  order_id: string;
  product_id: string;
  amount: number;
  name: string;
  image_urls: string[];
  description: string;
  category_name: string;
}

export class CreateOrderRO extends OrderModel {
  itemIds: string[];
  cartId: string;
}
