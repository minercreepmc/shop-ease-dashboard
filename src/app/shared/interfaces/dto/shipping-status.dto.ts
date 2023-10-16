export class CreateShippingStatusDto {
  status: string;
  shippingId: string;
}

export class UpdateShippingStatusDto {
  status: string;
}

export class GetByShippingIdDto {
  shippingId: string;
}
