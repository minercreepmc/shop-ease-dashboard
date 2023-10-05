export class CreateProductDto {
  name: string;
  price: number;
  description?: string;
  discountId?: string;
  categoryIds?: string[];
  imageUrls: string[];
}

export class DeleteProductDtostos {
  ids: string[];
}

export class UpdateProductDto {
  name: string;
  price: number;
  description?: string;
  discountId?: string;
  categoryIds?: string[];
  sold?: number;
}
