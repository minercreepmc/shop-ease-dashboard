export class CreateProductDto {
  name: string;
  price: number;
  description?: string;
  discountId?: string;
  categoryIds?: string[];
}

export class DeleteProducts {
  ids: string[];
}

export class UpdateProductDto {
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  discountId?: string;
  categoryIds?: string[];
  sold?: number;
}
