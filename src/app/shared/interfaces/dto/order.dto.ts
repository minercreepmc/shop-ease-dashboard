import { PaginationParams } from './pagination.dto';

export class CreateOrderDto {
  addressId: string;
  cartId: string;
}

export class UpdateOrderDto {
  status: string;
}

export class GetByMemberDto {
  memberId: string;
}
export class OrderGetAllDto extends PaginationParams {
  status? = 'PROCESSING';
}
