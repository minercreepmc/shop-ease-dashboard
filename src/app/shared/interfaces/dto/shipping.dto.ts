export class UpdateShippingDto {
  shipperId: string;
  deletedAt?: Date;
}

export class CreateShippingDto {
  orderId: string;
  shipperId: string;
}
