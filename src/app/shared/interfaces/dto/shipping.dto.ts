import { PaginationParams } from './pagination.dto';

export class CreateShippingDto {
  orderId: string;
  shipperId: string;
  dueDate: Date;
}
export class UpdateShippingDto {
  shipperId: string;
  deletedAt?: Date;
  dueDate: Date;
}

export class ShippingGetDetailDto {
  id?: string;
  orderId?: string;
}

export class ShippingGetAllDto extends PaginationParams {}
