export class GetCartItemsDto {}

export class CreateCartItemDto {
  cartId: string;
  productId: string;
  amount: number;
}

export class UpdateCartItemDto {
  amount: number;
}

export class UpsertCartItemDto {
  productId: string;
  amount: number;
}
