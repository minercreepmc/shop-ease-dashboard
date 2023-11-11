import { OrderModel } from '@model';
import { PaginateRO } from './paginate.ro';

export class OrderGetAllDataRO {
  id: string;
  status: string;
  total_price: number;
  fee_name: string;
  fee_price: number;
  address_location: string;
  member_name?: string | undefined;
  member_phone?: string | undefined;
  created_at: Date;
}

export class OrderGetAllRO extends PaginateRO<OrderGetAllDataRO> {
  data: OrderGetAllDataRO[];
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

export class OrderGetDetailsRO extends OrderGetAllDataRO {
  items: OrderItemRO[];
}
