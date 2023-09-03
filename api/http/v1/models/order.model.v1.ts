export enum OrderStatusEnum {
  PROCESSING = 'PROCESSING',
  SHIPPING = 'SHIPPING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export class V1OrderModel {
  product_ids: string[];
  user_id: string;
  address: string;
  status: OrderStatusEnum;
  total_price: number;
  id: string;
}
