export class GetCartItemsDto {
  cartId: string;
}

export class CreateCartItemDto {
  cartId: string;
  productId: string;
  amount: number;
}

export class UpdateCartItemDto {
  amount: number;
}
