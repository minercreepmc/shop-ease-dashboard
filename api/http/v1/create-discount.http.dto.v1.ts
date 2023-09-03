export class V1CreateDiscountHttpRequest {
  name: string;
  description?: string;
  percentage: number;
}

export class V1CreateDiscountHttpResponse {
  id: string;
  name: string;
  description?: string;
  percentage: number;
  message?: string;
  active: boolean;

  constructor(options: Omit<V1CreateDiscountHttpResponse, 'message'>) {
    this.id = options.id;
    this.name = options.name;
    this.description = options.description;
    this.active = options.active;
    this.percentage = options.percentage;
    this.message = 'Discount created successfully.';
  }
}
