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
