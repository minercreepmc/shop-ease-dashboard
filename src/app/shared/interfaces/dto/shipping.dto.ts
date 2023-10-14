export class UpdateShippingDto {
  shipperId: string;
  deletedAt?: Date;
  dueDate: string;
}

export class CreateShippingDto {
  orderId: string;
  shipperId: string;
  dueDate: string;
}
