export class CreateDiscountDto {
  name: string;
  description?: string;
  percentage: number;
}

export class UpdateDiscountDto {
  name?: string;
  description?: string;
  percentage?: number;
  active?: boolean;
}
