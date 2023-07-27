export class V1CreateProductHttpRequest {
  name: string;
  description?: string;
  price: number;
  image?: File;
  categoryIds?: string[];
  discountId?: string;
}

export class V1CreateProductHttpResponse {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  categoryIds?: string[];
  discountId?: string;
  message?: string;

  constructor(options: Omit<V1CreateProductHttpResponse, 'message'>) {
    this.id = options.id;
    this.name = options.name;
    this.price = options.price;
    this.description = options.description;
    this.imageUrl = options.imageUrl;
    this.categoryIds = options.categoryIds;
    this.discountId = options.discountId;
    this.message = 'Product created successfully';
  }
}
