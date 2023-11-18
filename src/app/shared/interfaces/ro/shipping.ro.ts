import { PaginateRO } from './paginate.ro';

export class ShippingRO {
  id: string;
  order_id: string;
  created_at: Date;
  updated_at: Date;
  member_name: string;
  member_phone: string;
  status: string;
  total_price: number;
  fee_price: number;
  fee_name: string;
  address: string;
  shipper_name: string;
  shipper_phone: string;
  due_date: string;
}

export class ShippingGetDetailRO extends ShippingRO {}
export class ShippingGetAllRO extends PaginateRO<ShippingRO> {
  data: ShippingRO[];
}
